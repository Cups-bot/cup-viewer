# -*- coding: utf-8 -*-
"""
Cafe Mockup Scene Rig for Blender 4.5 LTS–5.x

Что делает скрипт:
- ищет выделенную 3D-модель стакана (или объект с cup/стакан в имени);
- строит камеру, DOF, стол, свет и маркеры для ассетов в масштабе стакана;
- включает Cycles, прозрачный Film и production-настройки;
- подключает cafe_backplate_4x5_2244x2804.png в compositor, если файл лежит рядом с .blend;
- пытается подключить Comfy Cafe HDRI, если EXR/HDR лежит рядом с .blend.

Важно: скрипт НЕ удаляет пользовательскую сцену. Он заменяет только коллекцию CAF_MOCKUP_RIG,
если она была создана предыдущим запуском этого же скрипта.
"""

import bpy
import math
import os
from mathutils import Vector

RIG_COLLECTION = "CAF_MOCKUP_RIG"
BACKPLATE_NAMES = (
    "cafe_backplate_4x5_2244x2804.png",
    "cafe_backplate_4x5_original.png",
)
HDRI_KEYWORDS = ("comfy_cafe", "comfy cafe", "decor_shop", "decor shop")


def safe_remove_collection(name: str):
    col = bpy.data.collections.get(name)
    if not col:
        return
    for obj in list(col.objects):
        bpy.data.objects.remove(obj, do_unlink=True)
    bpy.data.collections.remove(col)


def new_collection(name: str):
    col = bpy.data.collections.new(name)
    bpy.context.scene.collection.children.link(col)
    return col


def link_only_to(obj, collection):
    for c in list(obj.users_collection):
        c.objects.unlink(obj)
    collection.objects.link(obj)


def look_at(obj, target: Vector, up_axis='Y', track_axis='-Z'):
    direction = target - obj.location
    obj.rotation_euler = direction.to_track_quat(track_axis, up_axis).to_euler()


def find_cup_object():
    active = bpy.context.view_layer.objects.active
    if active and active.type == 'MESH':
        return active
    selected = [o for o in bpy.context.selected_objects if o.type == 'MESH']
    if selected:
        return selected[0]
    keywords = ("cup", "paper_cup", "coffee_cup", "стакан", "стаканчик")
    for obj in bpy.context.scene.objects:
        if obj.type == 'MESH' and any(k in obj.name.lower() for k in keywords):
            return obj
    return None


def world_bbox(obj):
    corners = [obj.matrix_world @ Vector(c) for c in obj.bound_box]
    mins = Vector((min(v.x for v in corners), min(v.y for v in corners), min(v.z for v in corners)))
    maxs = Vector((max(v.x for v in corners), max(v.y for v in corners), max(v.z for v in corners)))
    return mins, maxs


def kelvin_to_rgb(kelvin: float):
    # Практичная аппроксимация Tanner Helland, результат 0..1.
    t = max(1000.0, min(40000.0, kelvin)) / 100.0
    if t <= 66:
        r = 255
        g = 99.4708025861 * math.log(t) - 161.1195681661
        if t <= 19:
            b = 0
        else:
            b = 138.5177312231 * math.log(t - 10) - 305.0447927307
    else:
        r = 329.698727446 * ((t - 60) ** -0.1332047592)
        g = 288.1221695283 * ((t - 60) ** -0.0755148492)
        b = 255
    def clamp(v):
        return max(0.0, min(255.0, v)) / 255.0
    return (clamp(r), clamp(g), clamp(b))


def add_area(name, loc, target, power, size, kelvin, collection):
    data = bpy.data.lights.new(name=name, type='AREA')
    data.energy = power
    data.shape = 'RECTANGLE'
    data.size = size
    data.size_y = size * 0.72
    if hasattr(data, "use_temperature"):
        try:
            data.use_temperature = True
            data.temperature = kelvin
        except Exception:
            data.color = kelvin_to_rgb(kelvin)
    else:
        data.color = kelvin_to_rgb(kelvin)
    obj = bpy.data.objects.new(name, data)
    collection.objects.link(obj)
    obj.location = loc
    look_at(obj, target)
    return obj


def add_empty(name, loc, collection, size=0.04, display='PLAIN_AXES'):
    e = bpy.data.objects.new(name, None)
    e.empty_display_type = display
    e.empty_display_size = size
    e.location = loc
    collection.objects.link(e)
    return e


def set_enum_if_available(obj, prop_name, preferred_values):
    if not hasattr(obj, prop_name):
        return None
    try:
        enum_items = obj.bl_rna.properties[prop_name].enum_items
        valid = {item.identifier for item in enum_items}
        for value in preferred_values:
            if value in valid:
                setattr(obj, prop_name, value)
                return value
    except Exception:
        pass
    return None


def find_file_near_blend(names=(), keywords=(), extensions=()):
    roots = []
    blend_dir = bpy.path.abspath("//")
    if blend_dir and os.path.isdir(blend_dir):
        roots.append(blend_dir)
    roots.append(os.getcwd())
    checked = set()
    for root in roots:
        root = os.path.abspath(root)
        if root in checked or not os.path.isdir(root):
            continue
        checked.add(root)
        for name in names:
            p = os.path.join(root, name)
            if os.path.isfile(p):
                return p
        if keywords:
            for fn in os.listdir(root):
                low = fn.lower()
                if extensions and not any(low.endswith(ext.lower()) for ext in extensions):
                    continue
                if any(k.lower() in low for k in keywords):
                    return os.path.join(root, fn)
    return None


def setup_world_hdri():
    scene = bpy.context.scene
    world = scene.world or bpy.data.worlds.new("CAF_WORLD")
    scene.world = world
    world.use_nodes = True
    nt = world.node_tree
    nt.nodes.clear()
    out = nt.nodes.new('ShaderNodeOutputWorld')
    bg = nt.nodes.new('ShaderNodeBackground')
    bg.inputs['Strength'].default_value = 0.28
    nt.links.new(bg.outputs['Background'], out.inputs['Surface'])

    hdri = find_file_near_blend(keywords=HDRI_KEYWORDS, extensions=(".exr", ".hdr"))
    if not hdri:
        bg.inputs['Color'].default_value = (0.055, 0.038, 0.028, 1.0)
        print("[CAF] HDRI не найден рядом с .blend — установлен мягкий тёплый World.")
        return None

    tex = nt.nodes.new('ShaderNodeTexEnvironment')
    tex.image = bpy.data.images.load(hdri, check_existing=True)
    tex.interpolation = 'Linear'
    mapping = nt.nodes.new('ShaderNodeMapping')
    coord = nt.nodes.new('ShaderNodeTexCoord')
    nt.links.new(coord.outputs['Generated'], mapping.inputs['Vector'])
    nt.links.new(mapping.outputs['Vector'], tex.inputs['Vector'])
    nt.links.new(tex.outputs['Color'], bg.inputs['Color'])
    mapping.inputs['Rotation'].default_value[2] = math.radians(0.0)
    print(f"[CAF] HDRI подключён: {hdri}")
    return hdri


def setup_compositor_backplate():
    scene = bpy.context.scene
    scene.use_nodes = True
    nt = scene.node_tree
    nt.nodes.clear()

    rl = nt.nodes.new('CompositorNodeRLayers')
    rl.location = (-420, 120)
    comp = nt.nodes.new('CompositorNodeComposite')
    comp.location = (380, 120)

    bg_path = find_file_near_blend(names=BACKPLATE_NAMES)
    if not bg_path:
        nt.links.new(rl.outputs['Image'], comp.inputs['Image'])
        print("[CAF] Backplate не найден рядом с .blend — compositor оставлен без фона.")
        return None

    img = bpy.data.images.load(bg_path, check_existing=True)
    img_node = nt.nodes.new('CompositorNodeImage')
    img_node.image = img
    img_node.location = (-420, -140)

    scale = nt.nodes.new('CompositorNodeScale')
    scale.location = (-160, -140)
    if hasattr(scale, 'space'):
        try:
            scale.space = 'RENDER_SIZE'
        except Exception:
            pass
    if hasattr(scale, 'frame_method'):
        try:
            scale.frame_method = 'CROP'
        except Exception:
            pass

    alpha = nt.nodes.new('CompositorNodeAlphaOver')
    alpha.location = (100, 100)
    alpha.inputs[0].default_value = 1.0

    nt.links.new(img_node.outputs['Image'], scale.inputs['Image'])
    nt.links.new(scale.outputs['Image'], alpha.inputs[1])
    nt.links.new(rl.outputs['Image'], alpha.inputs[2])
    nt.links.new(alpha.outputs['Image'], comp.inputs['Image'])

    print(f"[CAF] Backplate подключён: {bg_path}")
    return bg_path


def make_table_material():
    mat = bpy.data.materials.get("MAT_TABLE_FALLBACK") or bpy.data.materials.new("MAT_TABLE_FALLBACK")
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get('Principled BSDF')
    if bsdf:
        bsdf.inputs['Base Color'].default_value = (0.24, 0.115, 0.055, 1.0)
        bsdf.inputs['Roughness'].default_value = 0.64
        if 'IOR' in bsdf.inputs:
            bsdf.inputs['IOR'].default_value = 1.46
        if 'Coat Weight' in bsdf.inputs:
            bsdf.inputs['Coat Weight'].default_value = 0.02
    return mat


def main():
    scene = bpy.context.scene
    cup = find_cup_object()
    if cup:
        mn, mx = world_bbox(cup)
        h = max(0.001, mx.z - mn.z)
        cup_center = (mn + mx) * 0.5
        table_z = mn.z
        if h < 0.03 or h > 0.40:
            print(f"[CAF][WARN] Высота стакана {h:.4f} м выглядит необычно. Проверь единицы/Scale.")
    else:
        h = 0.13
        cup_center = Vector((0, 0, h * 0.5))
        table_z = 0.0
        print("[CAF][WARN] Стакан не найден. Риг построен по стандартной высоте 130 мм.")

    safe_remove_collection(RIG_COLLECTION)
    rig = new_collection(RIG_COLLECTION)

    # Render
    scene.render.engine = 'CYCLES'
    scene.render.resolution_x = 2048
    scene.render.resolution_y = 1536
    scene.render.resolution_percentage = 100
    scene.render.film_transparent = True
    scene.render.image_settings.file_format = 'PNG'
    scene.render.image_settings.color_mode = 'RGBA'
    scene.render.image_settings.color_depth = '16'
    scene.render.filepath = "//renders/cafe_mockup_"

    if hasattr(scene, 'cycles'):
        scene.cycles.samples = 512
        if hasattr(scene.cycles, 'preview_samples'):
            scene.cycles.preview_samples = 64
        if hasattr(scene.cycles, 'use_denoising'):
            scene.cycles.use_denoising = True
        if hasattr(scene.cycles, 'adaptive_threshold'):
            scene.cycles.adaptive_threshold = 0.01
        for prop, value in (
            ('max_bounces', 8),
            ('diffuse_bounces', 3),
            ('glossy_bounces', 4),
            ('transmission_bounces', 4),
            ('transparent_max_bounces', 8),
        ):
            if hasattr(scene.cycles, prop):
                setattr(scene.cycles, prop, value)

    # Color management: сначала точность мокапа, затем AgX как fallback.
    vt = set_enum_if_available(scene.view_settings, 'view_transform', ('Khronos PBR Neutral', 'AgX'))
    if vt == 'AgX':
        set_enum_if_available(scene.view_settings, 'look', ('Medium High Contrast', 'Medium High Contrast - AgX', 'None'))
    scene.view_settings.exposure = 0.15
    scene.view_settings.gamma = 1.0

    # Camera from cup scale.
    cam_data = bpy.data.cameras.new('CAF_CAMERA')
    cam = bpy.data.objects.new('CAF_CAMERA', cam_data)
    rig.objects.link(cam)
    scene.camera = cam
    cam_data.lens = 72.0
    cam_data.sensor_width = 36.0
    cam_data.dof.use_dof = True
    cam_data.dof.aperture_fstop = 3.4
    if hasattr(cam_data.dof, 'aperture_blades'):
        cam_data.dof.aperture_blades = 7

    target = Vector((cup_center.x, cup_center.y + 0.10*h, table_z + 0.58*h))
    cam.location = Vector((cup_center.x + 0.05*h, cup_center.y - 5.7*h, table_z + 1.82*h))
    look_at(cam, target)

    focus = add_empty('CAF_FOCUS', target, rig, size=0.18*h, display='SPHERE')
    cam_data.dof.focus_object = focus

    # Table slab - only minimal geometry; replace material with CC0 PBR from Poly Haven.
    bpy.ops.mesh.primitive_cube_add(location=(cup_center.x, cup_center.y + 0.35*h, table_z - 0.09*h))
    table = bpy.context.active_object
    table.name = 'CAF_TABLE'
    link_only_to(table, rig)
    table.dimensions = (12.5*h, 8.6*h, 0.18*h)
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    bev = table.modifiers.new('CAF_Table_Bevel', 'BEVEL')
    bev.width = 0.02*h
    bev.segments = 3
    table.data.materials.append(make_table_material())
    table['PBR_RECOMMENDATION'] = 'Poly Haven Wood Table 001; raise roughness to approx 0.58-0.70.'

    # Light rig
    light_target = Vector((cup_center.x, cup_center.y, table_z + 0.58*h))
    add_area('CAF_KEY_3300K', Vector((cup_center.x-4.1*h, cup_center.y-3.0*h, table_z+6.6*h)), light_target, 430, 4.7*h, 3300, rig)
    add_area('CAF_FILL_4300K', Vector((cup_center.x+4.0*h, cup_center.y-2.2*h, table_z+3.6*h)), light_target, 95, 4.0*h, 4300, rig)
    add_area('CAF_RIM_2900K', Vector((cup_center.x+3.1*h, cup_center.y+2.5*h, table_z+5.0*h)), Vector((cup_center.x, cup_center.y, table_z+0.75*h)), 165, 2.6*h, 2900, rig)
    add_area('CAF_TABLE_ACCENT_3000K', Vector((cup_center.x+4.8*h, cup_center.y+0.7*h, table_z+2.1*h)), Vector((cup_center.x+1.0*h, cup_center.y, table_z)), 55, 1.7*h, 3000, rig)

    # Asset drop markers. Position is relative to cup height, so the scene adapts to larger cups.
    markers = [
        ('DROP_PLATE', (-3.45, 0.45, 0.02), 12.0),
        ('DROP_CROISSANT', (-3.35, 0.40, 0.12), 5.0),
        ('DROP_NOTEBOOK', (-3.15, -2.10, 0.02), 10.0),
        ('DROP_STIRRER_HOLDER', (4.10, 0.30, 0.02), -4.0),
        ('DROP_FLOWER_VASE_OPTIONAL', (-5.05, 1.50, 0.02), 0.0),
    ]
    for name, rel, rz in markers:
        e = add_empty(name, Vector((cup_center.x + rel[0]*h, cup_center.y + rel[1]*h, table_z + rel[2]*h)), rig, size=0.24*h, display='CUBE')
        e.rotation_euler[2] = math.radians(rz)
        e['recommended_rotation_z_deg'] = rz

    setup_world_hdri()
    setup_compositor_backplate()

    # Helpful custom properties for automation/MCP agents.
    rig['scene_purpose'] = 'Cafe paper-cup mockup hybrid 3D foreground + 2D backplate'
    rig['camera_lens_mm'] = 72.0
    rig['camera_fstop'] = 3.4
    rig['reference_cup_height_m'] = h
    rig['recommended_table_roughness'] = '0.58–0.70'
    rig['recommended_view_transform'] = 'Khronos PBR Neutral for color-faithful mockups; AgX for beauty renders'

    print("[CAF] Готово. Проверь кадрирование камеры, затем перетащи ассеты на DROP_* markers.")
    print("[CAF] Если меняется размер стакана: выдели новый стакан и запусти скрипт снова — риг масштабируется от его высоты.")


if __name__ == '__main__':
    main()
