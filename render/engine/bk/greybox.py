"""Серый фотобокс: сцена строится кодом, а не берётся из готового файла.

Второй тип фона в проекте. Заимствованные сцены приходят из mockup/scenes,
здесь же циклорама, свет и камеры собираются с нуля под высоту конкретного
стакана — поэтому 410, 500 и 650 мл занимают в кадре одинаковую долю, а сам
стакан остаётся в натуральную величину.

Стакан, его материал и печать — те же, что и во всех остальных кадрах: этот
модуль только ставит свет и камеру, а изделие берёт из общего place.
"""

import math
from typing import Optional

import bpy
from mathutils import Vector

from . import material, place

PREFIX = place.PREFIX


def _aim(obj, target) -> None:
    obj.rotation_euler = (Vector(target) - obj.location).to_track_quat("-Z", "Y").to_euler()


def _flat_material(name: str, grey: float):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = (grey, grey, grey, 1.0)
    bsdf.inputs["Roughness"].default_value = 0.82
    mat.diffuse_color = (grey, grey, grey, 1.0)
    return mat


def cyclorama(height: float, diameter: float, grey: float, coll):
    """Бесшовный фон: пол, галтель и задник одной поверхностью.

    Радиус галтели и размеры считаются от высоты изделия, чтобы стык пола и
    задника никогда не попадал в кадр и не давал видимой линии за стаканом.
    """
    radius = 2 * height
    back = 3 * height
    half_width = max(6 * diameter, 4 * height)
    section = [(-6 * height, 0.0), (back, 0.0)]
    section += [(back + radius * math.sin(i * math.pi / 2 / 64),
                 radius * (1 - math.cos(i * math.pi / 2 / 64))) for i in range(1, 65)]
    section += [(back + radius, 6 * height)]
    verts = [(x, y, z) for y, z in section for x in (-half_width, half_width)]
    faces = [(2 * i, 2 * i + 1, 2 * i + 3, 2 * i + 2) for i in range(len(section) - 1)]
    mesh = bpy.data.meshes.new(PREFIX + "Cyclorama")
    mesh.from_pydata(verts, [], faces)
    mesh.update()
    mesh.materials.append(_flat_material(PREFIX + "Neutral_Gray", grey))
    obj = bpy.data.objects.new(PREFIX + "Cyclorama", mesh)
    coll.objects.link(obj)
    return obj


def lights(height: float, shot: dict, coll):
    """Три роли: рисующий слева, заполняющий справа, контурный сверху-сзади.

    Мощности заданы для стакана 135 мм и пересчитываются по квадрату высоты:
    источник отодвигается вместе с ростом изделия, и без этого пересчёта
    650 мл вышел бы темнее 410 мл при одинаковых числах в конфиге.
    """
    power_scale = (height / 0.1353) ** 2
    roles = [
        ("KEY_Left_Softbox", (-2.1, -2.2, 2.7), (1.3, 3.4), shot["key_w_at_135mm"]),
        ("FILL_Right_Softbox", (2.4, -1.6, 2.0), (2.5, 3.3), shot["fill_w_at_135mm"]),
        ("RIM_Overhead", (0.0, 1.7, 3.3), (2.0, 1.2), shot["rim_w_at_135mm"]),
    ]
    made = []
    for name, xyz, size, watt in roles:
        data = bpy.data.lights.new(PREFIX + name, "AREA")
        data.shape = "RECTANGLE"
        data.energy = watt * power_scale
        data.size = size[0] * height
        data.size_y = size[1] * height
        obj = bpy.data.objects.new(PREFIX + name, data)
        coll.objects.link(obj)
        obj.location = tuple(v * height for v in xyz)
        _aim(obj, (0.0, 0.0, height * 0.5))
        made.append(obj.name)
    return made


def cameras(height: float, diameter: float, shot: dict, coll):
    """Длиннофокусная оптика, дистанция подобрана под высоту изделия.

    Наклон камеры меняет видимую высоту стакана, поэтому дистанция домножается
    на поправку: иначе 8 градусов каталога и 2 градуса печати дали бы разный
    масштаб одного и того же изделия.
    """
    lens = shot.get("lens_mm", 90.0)
    sensor = shot.get("sensor_mm", 36.0)
    made = {}
    for key, angle in shot.get("cameras", {"catalog": 8, "print": 2}).items():
        data = bpy.data.cameras.new(PREFIX + "CAM_" + key.upper())
        data.lens = lens
        data.sensor_width = sensor
        data.clip_start = 0.001
        data.clip_end = 100.0
        theta = math.radians(float(angle))
        framing = ((math.cos(theta) + diameter / height * math.sin(theta))
                   / (math.cos(theta) + 0.089 / 0.17885 * math.sin(theta)))
        distance = shot.get("distance_in_heights", 3.75) * height * framing
        obj = bpy.data.objects.new(data.name, data)
        coll.objects.link(obj)
        obj.location = (0.0, -distance * math.cos(theta), height * 0.51 + distance * math.sin(theta))
        _aim(obj, (0.0, 0.0, height * 0.51))
        # Каталогу нужны резкими и кромка, и печать, и основание разом.
        data.dof.use_dof = False
        data.dof.aperture_fstop = 11.0
        data.dof.focus_distance = distance
        made[key] = obj
    return made


def build(cfg: dict, shot_name: str, samples: Optional[int] = None,
          resolution: Optional[int] = None) -> dict:
    """Собрать кадр целиком. Возвращает тот же отчёт, что и place.build."""
    place.WARNINGS.clear()
    shot = cfg["shots"][shot_name]
    bpy.ops.wm.read_factory_settings(use_empty=True)
    scene = bpy.context.scene
    scene.name = "GREYBOX"

    stage = bpy.data.collections.new(PREFIX + "Set")
    scene.collection.children.link(stage)
    coll = bpy.data.collections.new(PREFIX + "Cup")
    scene.collection.children.link(coll)

    from bk import group
    cups = group.load(cfg, shot, coll)
    group.check_count(shot_name, shot, len(cups))
    cup, height, printed = cups[0]["obj"], cups[0]["height"], cups[0]["printed"]
    diameter = max(max(v.co.x for v in cup.data.vertices) - min(v.co.x for v in cup.data.vertices),
                   max(v.co.y for v in cup.data.vertices) - min(v.co.y for v in cup.data.vertices))
    cup.rotation_euler.z = math.radians(shot.get("cup_rotation_deg", 0.0))

    from bk import compose
    crop = compose.fit_mode(cfg) == "crop"
    # Кадр вырезом: фотобокс строится по эталону, один на все стаканы, — его
    # снимок и кладёт превью. Прежний режим строил бокс под рост стакана.
    href = place.reference_height(cfg, height) if crop else height
    ref = cfg["cups"].get(cfg.get("reference_cup") or "", {}).get("size_mm", {})
    dref = ref.get("top", 89.0) / 1000.0 if crop and href != height else diameter
    cyclorama(href, dref, shot["gray_linear"], stage)
    lit = lights(href, shot, stage)
    world = bpy.data.worlds.new(PREFIX + "Neutral_World")
    world.use_nodes = True
    scene.world = world
    world.node_tree.nodes["Background"].inputs["Color"].default_value = (1, 1, 1, 1)
    world.node_tree.nodes["Background"].inputs["Strength"].default_value = shot["world_strength"]

    made = cameras(href, dref, shot, stage)
    key = shot.get("camera", "catalog")
    if key not in made:
        raise place.ConfigError(f"{shot_name}: камеры {key!r} нет, есть {', '.join(made)}")
    scene.camera = made[key]

    side = int(shot.get("resolution", 1600))
    scene.render.resolution_x = scene.render.resolution_y = side
    pair = None
    comp = None
    if crop:
        bpy.context.view_layer.update()
        low = min((cup.matrix_world @ Vector(c)).z for c in cup.bound_box)
        comp = compose.run(scene, scene.camera, cups, cfg, shot, shot_name, {
            "origin": Vector((0.0, 0.0, low)), "scale": 1.0, "holder": cup,
            "rotation_deg": (0.0, 0.0, shot.get("cup_rotation_deg", 0.0)), "href": href, "focus": None})
        pair = comp["group"]
    elif len(cups) > 1:
        bpy.context.view_layer.update()
        low = min((cup.matrix_world @ Vector(c)).z for c in cup.bound_box)
        pair = group.place_second(scene, scene.camera, cups, cfg.get("_layout") or "pair", 1.0,
                                  hero_base=Vector((0.0, 0.0, low)),
                                  rotation_deg=(0.0, 0.0, shot.get("cup_rotation_deg", 0.0)), coll=coll,
                                  max_dolly=3.0, hero_holder=cup)   # циклорама бесконечная: отъезжать можно смело
    scene.render.film_transparent = False
    scene.unit_settings.system = "METRIC"
    scene.unit_settings.scale_length = 1.0
    place.configure_render(cfg, scene, samples or shot.get("samples"),
                           resolution or shot.get("resolution"))
    color = place.apply_color(cfg, shot, scene)
    bpy.context.view_layer.update()
    face = place.face_pixel(scene, scene.camera, cup, height * 0.45)

    return {
        "cup": place.resolve_cup(cfg).get("key", "500"),
        "shot": shot_name,
        "scene": scene.name,
        "camera": scene.camera.name,
        "color": color,
        "face_px": face,
        "cups": place.cups_report(cups),
        "group": pair,
        "compose": comp,
        "scale_reference_mm": round(href * 1000.0, 2),
        "removed": [],
        "hidden_from_camera": [],
        "dropped_scenes": [],
        "purged": 0,
        "cup_height_mm": height * 1000.0,
        "hero_height_mm": height * 1000.0,
        "hero_rotation_deg": [0.0, 0.0, 0.0],
        "scale": 1.0,
        "placed_at": [0.0, 0.0, 0.0],
        "lights": lit,
        "retuned": [],
        "print": printed,
        "engine": scene.render.engine,
        "samples": scene.cycles.samples,
        "resolution": [scene.render.resolution_x, scene.render.resolution_y],
        "view_transform": scene.view_settings.view_transform,
        "look": scene.view_settings.look,
        "warnings": list(place.WARNINGS),
    }
