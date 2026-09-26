"""Камера, трёхточечный свет, вывод preview.png и uv_layout.png.

Всё создаётся внутри коллекции CUP500 и при повторном запуске переиспользуется,
объекты пользователя не трогаются.
"""

import math
import os
from typing import List

import bpy
from mathutils import Vector

from src import profile as P

WARNINGS: List[str] = []


def _warn(msg: str) -> None:
    WARNINGS.append(msg)
    print("WARN: " + msg)


def _get_or_new(coll, name: str, make):
    obj = bpy.data.objects.get(name)
    if obj is None:
        obj = make()
        obj.name = name
    if obj.name not in coll.objects:
        for c in list(obj.users_collection):
            c.objects.unlink(obj)
        coll.objects.link(obj)
    return obj


def _aim(obj, target: Vector) -> None:
    direction = target - obj.location
    obj.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()


def setup(params: dict, coll):
    r = params["render"]
    cam_cfg = r["camera"]
    target = Vector(cam_cfg["look_at_m"])

    cam = _get_or_new(coll, "CUP500_Camera",
                      lambda: bpy.data.objects.new(
                          "CUP500_Camera", bpy.data.cameras.new("CUP500_Camera")))
    cam.data.lens = cam_cfg["focal_mm"]
    cam.data.clip_start = cam_cfg["clip_start_m"]
    cam.data.clip_end = cam_cfg["clip_end_m"]
    cam.location = Vector(cam_cfg["location_m"])
    _aim(cam, target)

    for spec in r["lights"]:
        name = spec["name"]
        lamp = _get_or_new(coll, name,
                           lambda n=name: bpy.data.objects.new(n, bpy.data.lights.new(n, "AREA")))
        lamp.data.type = "AREA"
        lamp.data.energy = spec["power_w"]
        sx, sy = spec["size_m"]
        # узкий высокий источник читается на глянцевой краске вертикальным
        # бликом — так же, как отражение окна на референсных фото
        lamp.data.shape = "SQUARE" if abs(sx - sy) < 1e-9 else "RECTANGLE"
        lamp.data.size = sx
        if lamp.data.shape == "RECTANGLE":
            lamp.data.size_y = sy
        lamp.location = Vector(spec["location_m"])
        _aim(lamp, target)
    return cam


def _studio(params: dict, coll):
    """Пол студии. Нужен не для красоты: стенка конуса наклонена наружу, её
    зеркальное направление уходит вниз, и блик на глянцевой краске — это
    отражение светлой поверхности под стаканом, как на референсных фото."""
    st = params["render"]["studio"]
    name = "CUP500_Floor"
    old = bpy.data.objects.get(name)
    if not st["enabled"]:
        if old is not None:
            data = old.data
            bpy.data.objects.remove(old, do_unlink=True)
            if data.users == 0:
                bpy.data.meshes.remove(data)
        return None
    half = st["floor_size_m"] / 2.0
    if old is not None:
        data = old.data
        bpy.data.objects.remove(old, do_unlink=True)
        if data.users == 0:
            bpy.data.meshes.remove(data)
    me = bpy.data.meshes.new(name)
    me.from_pydata([(-half, -half, 0.0), (half, -half, 0.0),
                    (half, half, 0.0), (-half, half, 0.0)], [], [(0, 1, 2, 3)])
    me.update()
    obj = bpy.data.objects.new(name, me)
    coll.objects.link(obj)
    mat = bpy.data.materials.get("CUP500_Floor") or bpy.data.materials.new("CUP500_Floor")
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get("Principled BSDF")
    if bsdf is not None:
        bsdf.inputs["Base Color"].default_value = tuple(st["floor_color"])
        bsdf.inputs["Roughness"].default_value = st["floor_roughness"]
    obj.data.materials.clear()
    obj.data.materials.append(mat)
    return obj


def _configure_scene(params: dict, scene, cam) -> None:
    r = params["render"]
    engine = r["engine"]
    available = [i.identifier for i in scene.render.bl_rna.properties["engine"].enum_items]
    if engine not in available:
        _warn(f"движок {engine} недоступен в этой сборке (есть {available}); "
              f"использую {available[0]}")
        engine = available[0]
    scene.render.engine = engine
    scene.camera = cam
    scene.render.resolution_x, scene.render.resolution_y = r["resolution"]
    scene.render.resolution_percentage = 100
    scene.render.image_settings.file_format = "PNG"

    if hasattr(scene, "eevee") and hasattr(scene.eevee, "use_raytracing"):
        # без трассировки EEVEE не считает преломление, и полупрозрачный PP
        # выглядел бы плоским
        scene.eevee.use_raytracing = bool(r["use_raytracing"])

    samples = int(r["samples"])
    if hasattr(scene, "cycles"):
        scene.cycles.samples = samples
    if hasattr(scene, "eevee"):
        for attr in ("taa_render_samples", "taa_samples"):
            if hasattr(scene.eevee, attr):
                setattr(scene.eevee, attr, samples)

    # собственный мир, чтобы не переписывать настройки мира пользователя
    world = bpy.data.worlds.get("CUP500_World") or bpy.data.worlds.new("CUP500_World")
    world.use_nodes = True
    bg = world.node_tree.nodes.get("Background")
    if bg is not None:
        bg.inputs["Color"].default_value = tuple(r["world_color"])
        bg.inputs["Strength"].default_value = r["world_strength"]
    scene.world = world


def render_preview(params: dict, out_dir: str) -> str:
    WARNINGS.clear()
    coll = bpy.data.collections[params["mesh"]["collection_name"]]
    cam = setup(params, coll)
    _studio(params, coll)
    scene = bpy.context.scene
    _configure_scene(params, scene, cam)

    os.makedirs(out_dir, exist_ok=True)
    path = os.path.join(out_dir, "preview.png")
    scene.render.filepath = path

    # чужие объекты прячутся только на время кадра и возвращаются как были
    hidden = []
    if params["render"]["isolate_collection"]:
        ours = set(coll.objects)
        for obj in scene.objects:
            if obj not in ours and not obj.hide_render:
                obj.hide_render = True
                hidden.append(obj)
    try:
        bpy.ops.render.render(write_still=True)
    finally:
        for obj in hidden:
            obj.hide_render = False
    return path


def render_uv_layout(params: dict, out_dir: str) -> str:
    """PNG раскладки UVMap. Оператор экспорта читает реальный выбор во
    вьюлэйере, поэтому выбор выставляется явно и возвращается на место."""
    obj = bpy.data.objects[params["mesh"]["object_name"]]
    os.makedirs(out_dir, exist_ok=True)
    path = os.path.join(out_dir, "uv_layout.png")
    size = int(params["uv"]["texture_size_px"])

    view_objects = list(bpy.context.view_layer.objects)
    prev_selected = [o for o in view_objects if o.select_get()]
    prev_active = bpy.context.view_layer.objects.active
    prev_mode = obj.mode
    active_index = obj.data.uv_layers.active_index
    for i, layer in enumerate(obj.data.uv_layers):
        if layer.name == "UVMap":
            obj.data.uv_layers.active_index = i

    try:
        for o in view_objects:
            o.select_set(False)
        obj.select_set(True)
        bpy.context.view_layer.objects.active = obj
        bpy.ops.object.mode_set(mode="EDIT")
        bpy.ops.mesh.select_all(action="SELECT")
        bpy.ops.uv.select_all(action="SELECT")
        bpy.ops.uv.export_layout(filepath=path, export_all=True,
                                 mode="PNG", size=(size, size), opacity=0.6)
        bpy.ops.object.mode_set(mode="OBJECT")
    except RuntimeError as exc:
        _warn(f"uv.export_layout не отработал: {exc}")
        path = ""
    finally:
        try:
            if obj.mode != prev_mode:
                bpy.ops.object.mode_set(mode=prev_mode)
        except RuntimeError:
            pass
        obj.data.uv_layers.active_index = active_index
        for o in view_objects:
            o.select_set(o in prev_selected)
        bpy.context.view_layer.objects.active = prev_active
    return path
