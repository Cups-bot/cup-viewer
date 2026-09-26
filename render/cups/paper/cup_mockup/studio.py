"""Grey photo box, ported from 3D_plast/mockup/bk/greybox.py (set 'studio').

Same cyclorama, three soft boxes and 90 mm catalogue camera, scaled by the cup
height exactly as in the plastic project, so paper and plastic shots compare
side by side.  On top of that: close-up inspection cameras for the rim, the
side seam, the heel, the underside, the interior and the DW sleeve roll.
"""
import math

import bpy
from mathutils import Vector

from . import build

STUDIO = 'CUPS_Studio'
SHOT = {
    'lens_mm': 90.0, 'sensor_mm': 36.0, 'distance_in_heights': 3.75,
    'cameras': {'CUPS_Hero': 8.0, 'CUPS_Print': 2.0},
    'gray_linear': 0.14, 'world_strength': 0.08,
    'view_transform': 'AgX', 'look': 'AgX - Medium High Contrast',
    # Plastic shots use 0.0; opaque printed board needs -0.7 so that the
    # half-lit brown of the artwork renders at its file value (114, 89, 85).
    'exposure': -0.7,
    'key_w_at_135mm': 14.0, 'fill_w_at_135mm': 2.8, 'rim_w_at_135mm': 6.0,
    'samples': 512, 'resolution': 1600,
}
UNDER_VIEWS = {'CUPS_Bottom_macro', 'CUPS_Underside'}


def _aim(obj, target):
    obj.rotation_euler = (Vector(target) - obj.location).to_track_quat('-Z', 'Y').to_euler()


def _owned(obj, coll):
    coll.objects.link(obj)
    obj['cups_owned'] = True
    return obj


def _flat(name, grey):
    mat = bpy.data.materials.get(name) or bpy.data.materials.new(name)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get('Principled BSDF')
    bsdf.inputs['Base Color'].default_value = (grey, grey, grey, 1.0)
    bsdf.inputs['Roughness'].default_value = 0.82
    mat.diffuse_color = (grey, grey, grey, 1.0)
    return mat


def cyclorama(H, D, grey, coll):
    radius, back = 2 * H, 3 * H
    half = max(6 * D, 4 * H)
    section = [(-6 * H, 0.0), (back, 0.0)]
    section += [(back + radius * math.sin(i * math.pi / 128), radius * (1 - math.cos(i * math.pi / 128))) for i in range(1, 65)]
    section += [(back + radius, 6 * H)]
    verts = [(x, y, z) for y, z in section for x in (-half, half)]
    faces = [(2 * i, 2 * i + 1, 2 * i + 3, 2 * i + 2) for i in range(len(section) - 1)]
    me = bpy.data.meshes.new('CUPS_Background')
    me.from_pydata(verts, [], faces)
    me.materials.append(_flat('CUPS_Neutral_Gray', grey))
    return _owned(bpy.data.objects.new('CUPS_Background', me), coll)


def lights(H, coll):
    scale = (H / 0.1353) ** 2
    roles = [('CUPS_Key', (-2.1, -2.2, 2.7), (1.3, 3.4), SHOT['key_w_at_135mm']),
             ('CUPS_Fill', (2.4, -1.6, 2.0), (2.5, 3.3), SHOT['fill_w_at_135mm']),
             ('CUPS_Rim', (0.0, 1.7, 3.3), (2.0, 1.2), SHOT['rim_w_at_135mm'])]
    for name, xyz, size, watt in roles:
        data = bpy.data.lights.new(name, 'AREA')
        data.shape = 'RECTANGLE'
        data.energy = watt * scale
        data.size, data.size_y = size[0] * H, size[1] * H
        obj = _owned(bpy.data.objects.new(name, data), coll)
        obj.location = tuple(v * H for v in xyz)
        _aim(obj, (0.0, 0.0, 0.5 * H))
    for name, energy, size, loc, target in [
            ('CUPS_UnderLight', .02, 1.0, (0, -0.45, -1.1), (0, 0, .03)),
            ('CUPS_UnderRake', .35, .3, (-.85, .45, -.35), (0, .28, .03))]:
        data = bpy.data.lights.new(name, 'AREA')
        data.shape = 'DISK'
        data.energy = energy * scale / .423
        data.size = size * H
        obj = _owned(bpy.data.objects.new(name, data), coll)
        obj.location = tuple(v * H for v in loc)
        _aim(obj, tuple(v * H for v in target))
        obj.hide_render = obj.hide_viewport = True


def _camera(name, coll, lens=None, ortho=None):
    cam = bpy.data.objects.get(name)
    if cam is None:
        cam = _owned(bpy.data.objects.new(name, bpy.data.cameras.new(name)), coll)
    data = cam.data
    data.display_size = 0.015      # default 1 m pyramids cut across a 9 cm cup in the viewport
    data.sensor_width = SHOT['sensor_mm']
    data.clip_start, data.clip_end = 0.0005, 100.0
    if ortho:
        data.type, data.ortho_scale = 'ORTHO', ortho
    else:
        data.type, data.lens = 'PERSP', lens or SHOT['lens_mm']
    return cam


def cameras(H, D, coll, model):
    for name, angle in SHOT['cameras'].items():
        th = math.radians(angle)
        framing = (math.cos(th) + D / H * math.sin(th)) / (math.cos(th) + 0.089 / 0.17885 * math.sin(th))
        dist = SHOT['distance_in_heights'] * H * framing
        cam = _camera(name, coll)
        cam.location = (0.0, -dist * math.cos(th), 0.51 * H + dist * math.sin(th))
        _aim(cam, (0.0, 0.0, 0.51 * H))
    # Close-ups: the seam is at +Y (back) when the cup rotation is zero.
    z_rim = H - .0017
    views = [
        ('CUPS_Rim_macro', (-.030, .085, H + .020), (-.010, .036, z_rim - .004), 70),
        ('CUPS_Seam_macro', (-.075, .200, .075), (-.002, .033, .042), 90),
        ('CUPS_Bottom_macro', (-.045, .085, -.030), (-.004, .028, .004), 70),
        ('CUPS_Underside', (0.0, -.060, -.150), (0.0, 0.0, .006), 70),
        ('CUPS_Interior', (0.0, -.080, .230), (0.0, 0.0, .030), 70),
    ]
    if model.startswith('DW'):
        views.append(('CUPS_Sleeve_macro', (-.050, .105, .000), (-.004, .031, .011), 90))
    for name, loc, target, lens in views:
        cam = _camera(name, coll, lens=lens)
        cam.location = loc
        _aim(cam, target)


def use_gpu(scene):
    """Cycles on the GPU when the preferences offer one (OptiX, then CUDA/HIP/oneAPI)."""
    try:
        prefs = bpy.context.preferences.addons['cycles'].preferences
    except KeyError:
        return False
    if prefs.compute_device_type != 'NONE':
        prefs.refresh_devices()
        if any(d.use and d.type != 'CPU' for d in prefs.devices):
            scene.cycles.device = 'GPU'
            return True
    if not bpy.app.background:
        # Interactive session: never touch the user's preferences.
        scene.cycles.device = 'CPU'
        return False
    for kind in ('OPTIX', 'CUDA', 'HIP', 'ONEAPI'):
        try:
            prefs.compute_device_type = kind
        except TypeError:
            continue
        prefs.refresh_devices()
        gpus = [d for d in prefs.devices if d.type == kind]
        if gpus:
            for d in prefs.devices:
                d.use = d.type == kind
            scene.cycles.device = 'GPU'
            return True
    scene.cycles.device = 'CPU'
    return False


def render_settings(scene):
    scene.render.engine = 'CYCLES'
    use_gpu(scene)
    scene.cycles.samples = SHOT['samples']
    scene.cycles.use_denoising = True
    scene.cycles.volume_bounces = 4
    scene.render.resolution_x = scene.render.resolution_y = SHOT['resolution']
    scene.render.resolution_percentage = 100
    scene.render.film_transparent = False
    scene.render.image_settings.file_format = 'PNG'
    scene.render.image_settings.color_mode = 'RGB'
    scene.view_settings.view_transform = SHOT['view_transform']
    scene.view_settings.look = SHOT['look']
    scene.view_settings.exposure = SHOT['exposure']
    scene.view_settings.gamma = 1.0


def cup_size():
    root = bpy.data.objects.get('CUPS_Product')
    H, D = 0.088, 0.0801
    if root:
        zs, rs = [], []
        for o in root.children:
            if o.type == 'MESH':
                zs += [v.co.z for v in o.data.vertices]
                rs += [math.hypot(v.co.x, v.co.y) for v in o.data.vertices]
        if zs:
            H, D = max(zs) - min(zs), 2 * max(rs)
    return H, D


def setup(scene):
    build.clear_owned(STUDIO)
    for name in ('CUPS_Background',):
        me = bpy.data.meshes.get(name)
        if me and me.users == 0:
            bpy.data.meshes.remove(me)
    coll = build.collection(STUDIO)
    H, D = cup_size()
    cyclorama(H, D, SHOT['gray_linear'], coll)
    lights(H, coll)
    root = bpy.data.objects.get('CUPS_Product')
    cameras(H, D, coll, root['model'] if root else 'HB80-280')
    world = bpy.data.worlds.get('CUPS_World') or bpy.data.worlds.new('CUPS_World')
    world.use_nodes = True
    bg = world.node_tree.nodes['Background']
    bg.inputs['Color'].default_value = (1, 1, 1, 1)
    bg.inputs['Strength'].default_value = SHOT['world_strength']
    scene.world = world
    render_settings(scene)
    scene.camera = bpy.data.objects['CUPS_Hero']
    for screen in bpy.data.screens:
        for area in screen.areas:
            if area.type == 'VIEW_3D':
                sp = area.spaces.active
                sp.region_3d.view_perspective = 'CAMERA'
                sp.clip_start = 0.0005
                sp.shading.type = 'MATERIAL'
                sp.shading.use_scene_world = True
                sp.shading.use_scene_lights = True
                # Light guides and camera pyramids are metres long next to a
                # 9 cm cup and cross the whole view: Overlays > Extras shows them.
                sp.overlay.show_extras = False
                sp.overlay.show_wireframes = False
    return scene.camera


def select_view(scene, name, hero_rotation=None):
    """Switch camera; underside views hide the floor and light the recess."""
    cam = bpy.data.objects.get(name)
    if cam is None:
        return
    scene.camera = cam
    under = name in UNDER_VIEWS
    floor = bpy.data.objects.get('CUPS_Background')
    if floor:
        floor.hide_render = floor.hide_viewport = under
    for light in ('CUPS_UnderLight', 'CUPS_UnderRake'):
        obj = bpy.data.objects.get(light)
        if obj:
            obj.hide_render = obj.hide_viewport = not under
    if scene.world and scene.world.name == 'CUPS_World':
        scene.world.node_tree.nodes['Background'].inputs['Strength'].default_value = .02 if under else SHOT['world_strength']
