# -*- coding: utf-8 -*-
"""
Сборка сцены кофейни для мокапов стаканов — из ничего, одной командой.

    blender -b -P build_cafe_mockup.py -- --cup ../assets/models/HB80-280.glb

Скрипт делает всё, что в гайде (Cafe_Mockup_Blender_Guide_RU.docx) расписано
руками: строит камеру/свет/стол по высоте стакана, приносит пропсы из .blend
пакета, вешает backplate в компоситор, HDRI в World, и рендерит.

Отличие от blender_cafe_scene_setup.py из пакета — в двух местах, оба
намеренные:

  • Пропсы стоят НЕ по DROP_*-маркерам. Маркеры пакета (тарелка на −3.45H)
    рассчитаны на широкий угол, а камера там же задана 72 мм: при 72 мм полкадра
    по ширине — ±0.25H·d ≈ ±127 мм, и тарелка на −449 мм не попадает в кадр
    вообще. Позиции ниже сняты с самого референса (раздел 2.1 гайда), маркеры
    DROP_* при этом всё равно создаются — по ним видно расхождение.

  • Стол не 8.6H в глубину, а обрезан так, чтобы его дальний край встал на
    заданную долю кадра (table_edge_frac). Гайд требует «нижние 35–40% кадра —
    стол»; при 8.6H стол занимает ~60% и съедает backplate.

Все числа, которые захочется покрутить, вынесены в PARAMS и переопределяются
через --params '{"key":{"power":22}}'.
"""

import bpy
import bmesh
import json
import math
import os
import random
import sys

from mathutils import Euler, Matrix, Vector

# ── пути ────────────────────────────────────────────────────────────────────
PACK = os.path.dirname(os.path.abspath(__file__))
PROJ = os.path.dirname(PACK)

BACKPLATE = os.path.join(PACK, "cafe_backplate_4x5_2244x2804.png")
HDRI = os.path.join(PACK, "comfy_cafe_2k.exr")

# Две столешницы из манифеста. wood_table_001 — тёмный насыщенный орех
# (средний цвет 62,25,10 sRGB), под референс он слишком красный и тёмный;
# wood_table — «более грубая тёплая сосна» (99,63,40), она и берётся по
# умолчанию. Переключается параметром table_asset.
TABLE_ASSETS = {
    "wood_table": (os.path.join(PACK, "wood_table_4k.blend", "wood_table_4k.blend"),
                   "wood_table"),
    "wood_table_001": (os.path.join(PACK, "wood_table_001_4k.blend",
                                    "wood_table_001_4k.blend"), "wood_table_001"),
}
CROISSANT_BLEND = os.path.join(PACK, "croissant_4k.blend", "croissant_4k.blend")
PLATE_BLEND = os.path.join(PACK, "Platte_2.blend")
NOTEBOOK_BLEND = os.path.join(PACK, "Notebook_2.blend")

# ── параметры ───────────────────────────────────────────────────────────────
# Позиции пропсов — в метрах, от основания стакана (стакан стоит в 0,0,0).
PARAMS = {
    "res": [1024, 768],
    "samples": 96,
    "engine_device": "GPU",
    "view_transform": "Khronos PBR Neutral",   # PRESET A — MOCKUP_COLOR
    "exposure": 0.15,

    "lens": 72.0,
    # ГРИП при 72 мм / f/3.4 / 471 мм — всего 8.9 мм, а передняя стенка стакана
    # лежит в 38 мм от его оси. Фокус на оси = печать заведомо мягкая. Теперь
    # фокус ставится на саму переднюю стенку, а диафрагма прижата: фон и так
    # размыт в backplate, боке оптикой здесь не нужно.
    "fstop": 16.0,
    "dof": True,
    "blades": 8,
    # Гайд даёт −5.7H/1.82H — стакан выходит на 45% высоты кадра. В референсе
    # он занимает ровно половину, поэтому риг пододвинут на 10% с сохранением
    # наклона (≈11.5°, гайд просит 10–13°).
    "cam_y": -5.15,     # ×H
    "cam_z": 1.40,      # ×H — ниже, чем 1.645: верхний эллипс перестаёт быть
                        #      главным геометрическим элементом кадра
    "cam_x": 0.05,      # ×H
    "focus_z": 0.55,    # ×H — высота точки фокуса на передней стенке
    "aim_z": 0.50,      # ×H — куда смотрит камера

    # Свет. Позиции и размеры — В МЕТРАХ для стакана 88 мм; для другой
    # высоты весь риг масштабируется вместе с ним, поэтому схема переносится
    # на любой формат. Мощности подобраны замером по рендеру, а не по ТЗ:
    # 350–650 Вт из ТЗ на дистанции 0.8 м дают засветку в разы.
    #
    # KEY стоит слева и ЗА стаканом: при камере в 10° тень от переднего света
    # целиком прячется за сам стакан, и контактной тени в кадре нет вовсе.
    # FRONT — большой нейтральный софтбокс почти от камеры: он не про яркость,
    # а про читаемость печати, белый кант и мягкий specular бумаги.
    "key":    {"power": 11.0, "size": [0.70, 0.50], "pos": [-0.50, 0.35, 0.58],
               "k": 3400, "aim": 0.55},
    "front":  {"power": 7.0,  "size": [1.30, 0.95], "pos": [0.06, -0.78, 0.30],
               "k": 5000, "aim": 0.50},
    "rim":    {"power": 4.0,  "size": [0.20, 0.60], "pos": [0.46, 0.46, 0.42],
               "k": 3000, "aim": 0.62},
    "hdri_strength": 0.15,
    "hdri_rotation": 0.0,
    # Баланс белого камеры. Цвета ламп задаются АБСОЛЮТНОЙ температурой (как в
    # гайде), но снимает их камера, сбалансированная на wb_kelvin — иначе
    # 3300 K чёрного тела красит всю сцену в оранжевый.
    "wb_kelvin": 3400.0,


    # Стол.
    "table_edge_frac": 0.60,   # доля кадра сверху, на которой стоит дальний край
    "table_rot_deg": 6.0,
    "table_width": 2.0,
    "table_depth": 1.2,
    "table_thickness": 0.028,
    "table_bevel": 0.0025,
    "table_rough": [0.62, 0.70],
    "table_tex_metres": 1.5,
    "table_normal": 0.32,     # стол — фон продукта, а не самостоятельный объект
    "table_asset": "wood_table",
    "table_hsv": [0.5, 0.80, 0.94],   # Hue / Saturation / Value поверх Base Color

    # Backplate: сдвиг и зум кадрирования внутри 4:5.
    # Сдвиг — в ДОЛЯХ высоты кадра, а не в пикселях: иначе тест 1024×768 и
    # финал 2048×1536 кадрируют фон по-разному.
    "bp_shift": 0.117,      # + показывает более низкую часть backplate
    # Backplate сгенерирован широким углом, а камера — 72 мм: фон читается
    # снятым другим объективом, отсюда ощущение вклеенности. Кадрирование
    # сужает угол зрения (перспективу оно не меняет — для этого фон надо
    # генерировать заново под 75 мм). 1.35 — предел, за которым из кадра
    # уходят растения слева и витрина справа.
    "bp_zoom": 1.35,
    "bp_exposure": -0.15,   # ступени экспозиции фона относительно 3D

    # Пропсы.
    "plate":     {"pos": [-0.158, 0.010], "diam": 0.180, "rot": 0.0},
    "croissant": {"pos": [-0.125, 0.000], "len": 0.125, "rot": 22.0, "z": 0.010},
    # Блокнот — лёгкая подсказка переднего плана, а не тёмная масса внизу:
    # мельче, дальше от камеры и коричневый вместо почти чёрного.
    "notebook":  {"pos": [-0.085, -0.078], "rot": -22.0, "scale": 0.68,
                  "basecolor": [0.140, 0.100, 0.082], "rough": 0.70,
                  "normal": 0.25, "pen": False},
    # Держатель: высота ≈0.5H стакана, ширина ≈0.45 его диаметра, и стоит
    # чуть ЗА плоскостью стакана, а не на переднем плане.
    "holder":    {"pos": [0.112, 0.085], "r": 0.018, "h": 0.044,
                  "sticks": 12, "stick_len": 0.062},
    # Стакан ПУСТОЙ: мокап показывает печать, а не напиток. Поверхность латте
    # осталась в скрипте и включается coffee=true, если понадобится.
    "coffee": True,
    "props": True,          # false — диагностический кадр: стол, стакан, свет
    "denoise": True,
    "pixel_filter": 1.0,    # мягкая фильтрация съедает мелкую типографику
    "seed": 7,
}


def deep_update(dst, src):
    for k, v in src.items():
        if isinstance(v, dict) and isinstance(dst.get(k), dict):
            deep_update(dst[k], v)
        else:
            dst[k] = v
    return dst


def argv_after_ddash():
    return sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []


def parse_args():
    args = argv_after_ddash()
    out = {"cup": os.path.join(PROJ, "assets", "models", "HB80-280.glb"),
           "out": os.path.join(PACK, "renders", "cafe_mockup"),
           "blend": "", "params": {}}
    i = 0
    while i < len(args):
        a = args[i]
        if a == "--cup":
            out["cup"] = args[i + 1]; i += 2
        elif a == "--out":
            out["out"] = args[i + 1]; i += 2
        elif a == "--blend":
            out["blend"] = args[i + 1]; i += 2
        elif a == "--params":
            out["params"] = json.loads(args[i + 1]); i += 2
        else:
            i += 1
    return out


# ── мелкая утварь ───────────────────────────────────────────────────────────
def world_bbox(obj):
    cs = [obj.matrix_world @ Vector(c) for c in obj.bound_box]
    return (Vector((min(c.x for c in cs), min(c.y for c in cs), min(c.z for c in cs))),
            Vector((max(c.x for c in cs), max(c.y for c in cs), max(c.z for c in cs))))


def group_bbox(objs):
    mn = Vector((1e9, 1e9, 1e9))
    mx = Vector((-1e9, -1e9, -1e9))
    for o in objs:
        if o.type != 'MESH':
            continue
        a, b = world_bbox(o)
        mn = Vector((min(mn.x, a.x), min(mn.y, a.y), min(mn.z, a.z)))
        mx = Vector((max(mx.x, b.x), max(mx.y, b.y), max(mx.z, b.z)))
    return mn, mx


def look_at(obj, target):
    obj.rotation_euler = (target - obj.location).to_track_quat('-Z', 'Y').to_euler()


def link(obj, col):
    for c in list(obj.users_collection):
        c.objects.unlink(obj)
    col.objects.link(obj)


def new_collection(name):
    col = bpy.data.collections.new(name)
    bpy.context.scene.collection.children.link(col)
    return col


def append_objects(path, names, col):
    """Приносит объекты из .blend вместе с детьми и материалами."""
    with bpy.data.libraries.load(path, link=False) as (src, dst):
        want = set(names)
        # тянем и детей: у BlenderKit-ассетов меши висят на пустышке-родителе
        dst.objects = [n for n in src.objects if n in want]
    brought = [o for o in dst.objects if o is not None]
    # дети приезжают сами (parent — жёсткая ссылка), но в коллекцию их линкуем мы
    seen, queue = [], list(brought)
    while queue:
        o = queue.pop()
        if o in seen:
            continue
        seen.append(o)
        for child in (o.children or ()):
            queue.append(child)
    for o in seen:
        if o.name not in col.objects:
            col.objects.link(o)
    return seen


def frame_ray(cam, fx, fy, res_x, res_y):
    """Луч через точку кадра (fx слева, fy сверху, обе 0..1). Мир."""
    cd = cam.data
    sw = cd.sensor_width
    sh = sw * res_y / res_x
    d_local = Vector(((fx - 0.5) * sw, (0.5 - fy) * sh, -cd.lens))
    return cam.matrix_world.translation, (cam.matrix_world.to_3x3() @ d_local).normalized()


def hit_z(origin, direction, z):
    if abs(direction.z) < 1e-9:
        return None
    t = (z - origin.z) / direction.z
    return None if t <= 0 else origin + direction * t


def kelvin_rgb(kelvin):
    t = max(1000.0, min(40000.0, kelvin)) / 100.0
    if t <= 66:
        r, g = 255.0, 99.4708025861 * math.log(t) - 161.1195681661
        b = 0.0 if t <= 19 else 138.5177312231 * math.log(t - 10) - 305.0447927307
    else:
        r = 329.698727446 * ((t - 60) ** -0.1332047592)
        g = 288.1221695283 * ((t - 60) ** -0.0755148492)
        b = 255.0
    return tuple(max(0.0, min(255.0, v)) / 255.0 for v in (r, g, b))


def kelvin_rgb_wb(kelvin, wb):
    """Цвет лампы ГЛАЗАМИ камеры, сбалансированной на wb.

    Возвращает отношение чёрных тел, нормированное по яркости: лампа, равная
    балансу белого, становится ровно белой, более тёплая — тёплой, и мощность
    в ваттах при этом не уезжает.
    """
    c = kelvin_rgb(kelvin)
    w = kelvin_rgb(wb)
    r = [c[i] / max(1e-4, w[i]) for i in range(3)]
    lum = 0.2126 * r[0] + 0.7152 * r[1] + 0.0722 * r[2]
    return tuple(v / max(1e-4, lum) for v in r)


def add_area(name, loc, target, power, size, kelvin, wb, col):
    d = bpy.data.lights.new(name, 'AREA')
    d.energy = power
    d.shape = 'RECTANGLE'
    d.size, d.size_y = size
    try:
        d.use_temperature = False
    except Exception:
        pass
    d.color = kelvin_rgb_wb(kelvin, wb)
    o = bpy.data.objects.new(name, d)
    col.objects.link(o)
    o.location = loc
    look_at(o, target)
    return o


def mesh_from_bmesh(name, bm, col):
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me)
    bm.free()
    o = bpy.data.objects.new(name, me)
    col.objects.link(o)
    return o


def set_enum(owner, prop, candidates):
    for c in candidates:
        try:
            setattr(owner, prop, c)
            return c
        except Exception:
            continue
    return None


# ── материалы ───────────────────────────────────────────────────────────────
def tune_table_material(mat, p):
    """PBR-стол из Poly Haven: объектные координаты, матовость, bump вместо disp."""
    nt = mat.node_tree
    mat.displacement_method = 'BUMP'

    coord = next((n for n in nt.nodes if n.type == 'TEX_COORD'), None)
    mapping = next((n for n in nt.nodes if n.type == 'MAPPING'), None)
    if coord and mapping:
        for l in list(nt.links):
            if l.to_node is mapping and l.to_socket.name == 'Vector':
                nt.links.remove(l)
        nt.links.new(coord.outputs['Object'], mapping.inputs['Vector'])
        s = 1.0 / max(0.05, p["table_tex_metres"])
        mapping.inputs['Scale'].default_value = (s, s, s)

    nrm = next((n for n in nt.nodes if n.type == 'NORMAL_MAP'), None)
    if nrm:
        nrm.inputs['Strength'].default_value = p["table_normal"]

    bsdf = next((n for n in nt.nodes if n.type == 'BSDF_PRINCIPLED'), None)
    if bsdf:
        rough_link = next((l for l in nt.links if l.to_node is bsdf
                           and l.to_socket.name == 'Roughness'), None)
        if rough_link:
            src = rough_link.from_socket
            nt.links.remove(rough_link)
            mr = nt.nodes.new('ShaderNodeMapRange')
            mr.location = (bsdf.location.x - 260, bsdf.location.y - 320)
            mr.inputs['To Min'].default_value = p["table_rough"][0]
            mr.inputs['To Max'].default_value = p["table_rough"][1]
            nt.links.new(src, mr.inputs['Value'])
            nt.links.new(mr.outputs['Result'], bsdf.inputs['Roughness'])
        else:
            bsdf.inputs['Roughness'].default_value = sum(p["table_rough"]) / 2
        if 'Coat Weight' in bsdf.inputs:
            bsdf.inputs['Coat Weight'].default_value = 0.02

        base_link = next((l for l in nt.links if l.to_node is bsdf
                          and l.to_socket.name == 'Base Color'), None)
        if base_link:
            src = base_link.from_socket
            nt.links.remove(base_link)
            hsv = nt.nodes.new('ShaderNodeHueSaturation')
            hsv.location = (bsdf.location.x - 260, bsdf.location.y + 120)
            hsv.inputs['Hue'].default_value = p["table_hsv"][0]
            hsv.inputs['Saturation'].default_value = p["table_hsv"][1]
            hsv.inputs['Value'].default_value = p["table_hsv"][2]
            nt.links.new(src, hsv.inputs['Color'])
            nt.links.new(hsv.outputs['Color'], bsdf.inputs['Base Color'])

    disp = next((n for n in nt.nodes if n.type == 'DISPLACEMENT'), None)
    if disp:
        disp.inputs['Scale'].default_value = 0.0005      # 0.5 мм микрорельефа
    return mat


def tune_paper_print(mat):
    """Бумага под печатью: матовость, микрофактура, слабый лак."""
    nt = mat.node_tree
    bsdf = next((n for n in nt.nodes if n.type == 'BSDF_PRINCIPLED'), None)
    if not bsdf:
        return
    bsdf.inputs['Roughness'].default_value = 0.50
    bsdf.inputs['IOR'].default_value = 1.46
    if 'Coat Weight' in bsdf.inputs:
        bsdf.inputs['Coat Weight'].default_value = 0.03
    if 'Coat Roughness' in bsdf.inputs:
        bsdf.inputs['Coat Roughness'].default_value = 0.50

    coord = nt.nodes.new('ShaderNodeTexCoord')
    coord.location = (bsdf.location.x - 900, bsdf.location.y - 520)
    noise = nt.nodes.new('ShaderNodeTexNoise')
    noise.location = (bsdf.location.x - 680, bsdf.location.y - 520)
    noise.inputs['Scale'].default_value = 700.0
    noise.inputs['Detail'].default_value = 2.0
    noise.inputs['Roughness'].default_value = 0.65
    bump = nt.nodes.new('ShaderNodeBump')
    bump.location = (bsdf.location.x - 430, bsdf.location.y - 520)
    # Если фактуру бумаги видно с дистанции камеры — её уже слишком много.
    bump.inputs['Strength'].default_value = 0.035
    bump.inputs['Distance'].default_value = 0.00008
    nt.links.new(coord.outputs['Generated'], noise.inputs['Vector'])
    nt.links.new(noise.outputs['Fac'], bump.inputs['Height'])
    nt.links.new(bump.outputs['Normal'], bsdf.inputs['Normal'])


def make_latte_material():
    mat = bpy.data.materials.new("CAF_MAT_COFFEE")
    mat.use_nodes = True
    nt = mat.node_tree
    bsdf = nt.nodes['Principled BSDF']
    bsdf.inputs['Roughness'].default_value = 0.24
    bsdf.inputs['IOR'].default_value = 1.33
    if 'Coat Weight' in bsdf.inputs:
        bsdf.inputs['Coat Weight'].default_value = 0.0

    coord = nt.nodes.new('ShaderNodeTexCoord'); coord.location = (-1000, 0)
    grad = nt.nodes.new('ShaderNodeTexGradient'); grad.location = (-800, 0)
    grad.gradient_type = 'SPHERICAL'
    ramp = nt.nodes.new('ShaderNodeValToRGB'); ramp.location = (-600, 0)
    ramp.color_ramp.elements[0].position = 0.02
    ramp.color_ramp.elements[0].color = (0.048, 0.022, 0.011, 1.0)  # кофе у стенки
    ramp.color_ramp.elements[1].position = 0.60
    ramp.color_ramp.elements[1].color = (0.165, 0.090, 0.045, 1.0)  # крема в центре
    noise = nt.nodes.new('ShaderNodeTexNoise'); noise.location = (-800, -320)
    noise.inputs['Scale'].default_value = 180.0
    noise.inputs['Detail'].default_value = 4.0
    bump = nt.nodes.new('ShaderNodeBump'); bump.location = (-380, -320)
    bump.inputs['Strength'].default_value = 0.03
    bump.inputs['Distance'].default_value = 0.0002

    nt.links.new(coord.outputs['Generated'], grad.inputs['Vector'])
    nt.links.new(grad.outputs['Fac'], ramp.inputs['Fac'])
    nt.links.new(ramp.outputs['Color'], bsdf.inputs['Base Color'])
    nt.links.new(coord.outputs['Generated'], noise.inputs['Vector'])
    nt.links.new(noise.outputs['Fac'], bump.inputs['Height'])
    nt.links.new(bump.outputs['Normal'], bsdf.inputs['Normal'])
    return mat


def make_wood_material(name, base, rough, grain_scale):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    nt = mat.node_tree
    bsdf = nt.nodes['Principled BSDF']
    bsdf.inputs['Roughness'].default_value = rough
    # Необработанное дерево почти не бликует. Без этого спекуляр окружения
    # вымывает цвет: тёмно-коричневый держатель уезжает в светло-серый.
    for key in ('Specular IOR Level', 'Specular'):
        if key in bsdf.inputs:
            bsdf.inputs[key].default_value = 0.16
            break

    coord = nt.nodes.new('ShaderNodeTexCoord'); coord.location = (-1100, 0)
    mapping = nt.nodes.new('ShaderNodeMapping'); mapping.location = (-900, 0)
    mapping.inputs['Scale'].default_value = (grain_scale, grain_scale * 0.06, grain_scale)
    noise = nt.nodes.new('ShaderNodeTexNoise'); noise.location = (-700, 0)
    noise.inputs['Scale'].default_value = 6.0
    noise.inputs['Detail'].default_value = 6.0
    ramp = nt.nodes.new('ShaderNodeValToRGB'); ramp.location = (-500, 0)
    ramp.color_ramp.elements[0].position = 0.38
    ramp.color_ramp.elements[0].color = tuple(c * 0.72 for c in base) + (1.0,)
    ramp.color_ramp.elements[1].position = 0.62
    ramp.color_ramp.elements[1].color = tuple(base) + (1.0,)
    bump = nt.nodes.new('ShaderNodeBump'); bump.location = (-300, -260)
    bump.inputs['Strength'].default_value = 0.10
    bump.inputs['Distance'].default_value = 0.0004

    nt.links.new(coord.outputs['Object'], mapping.inputs['Vector'])
    nt.links.new(mapping.outputs['Vector'], noise.inputs['Vector'])
    nt.links.new(noise.outputs['Fac'], ramp.inputs['Fac'])
    nt.links.new(ramp.outputs['Color'], bsdf.inputs['Base Color'])
    nt.links.new(noise.outputs['Fac'], bump.inputs['Height'])
    nt.links.new(bump.outputs['Normal'], bsdf.inputs['Normal'])
    return mat


# ── мир и компоситор ────────────────────────────────────────────────────────
def setup_world(p):
    scene = bpy.context.scene
    world = bpy.data.worlds.new("CAF_WORLD")
    scene.world = world
    world.use_nodes = True
    nt = world.node_tree
    nt.nodes.clear()
    out = nt.nodes.new('ShaderNodeOutputWorld'); out.location = (300, 0)
    bg = nt.nodes.new('ShaderNodeBackground'); bg.location = (100, 0)
    bg.inputs['Strength'].default_value = p["hdri_strength"]
    nt.links.new(bg.outputs['Background'], out.inputs['Surface'])

    if not os.path.isfile(HDRI):
        bg.inputs['Color'].default_value = (0.055, 0.038, 0.028, 1.0)
        print("[CAF] HDRI не найден, World остался тёплой заливкой")
        return
    coord = nt.nodes.new('ShaderNodeTexCoord'); coord.location = (-600, 0)
    mapping = nt.nodes.new('ShaderNodeMapping'); mapping.location = (-400, 0)
    mapping.inputs['Rotation'].default_value[2] = math.radians(p["hdri_rotation"])
    tex = nt.nodes.new('ShaderNodeTexEnvironment'); tex.location = (-200, 0)
    tex.image = bpy.data.images.load(HDRI, check_existing=True)
    nt.links.new(coord.outputs['Generated'], mapping.inputs['Vector'])
    nt.links.new(mapping.outputs['Vector'], tex.inputs['Vector'])
    nt.links.new(tex.outputs['Color'], bg.inputs['Color'])
    print(f"[CAF] HDRI: {os.path.basename(HDRI)} @ {p['hdri_strength']}")


def setup_compositor(p):
    """Render Layers (прозрачный foreground) поверх backplate.

    Blender 5 выбросил scene.node_tree: компоситор теперь — обычная node-группа
    в scene.compositing_node_group, а вместо Composite-ноды — Group Output.
    Режим Scale «Render Size» стал menu-сокетом, поэтому коэффициент
    считаем сами — так надёжнее и видно, что именно происходит.
    """
    scene = bpy.context.scene
    ng = bpy.data.node_groups.new("CAF_COMP", "CompositorNodeTree")
    scene.compositing_node_group = ng
    scene.use_nodes = True
    ng.interface.new_socket("Image", in_out='OUTPUT', socket_type='NodeSocketColor')

    rl = ng.nodes.new('CompositorNodeRLayers'); rl.location = (-200, 250)
    out = ng.nodes.new('NodeGroupOutput'); out.location = (700, 150)

    if not os.path.isfile(BACKPLATE):
        ng.links.new(rl.outputs['Image'], out.inputs['Image'])
        print("[CAF] backplate не найден — фон пустой")
        return

    img = ng.nodes.new('CompositorNodeImage'); img.location = (-600, -180)
    img.image = bpy.data.images.load(BACKPLATE, check_existing=True)
    bw, bh = img.image.size
    rx, ry = p["res"]

    # «Cover»: по ширине, чтобы 4:5 гарантированно перекрыл 4:3 по высоте.
    fit = max(rx / bw, ry / bh) * p["bp_zoom"]
    scale = ng.nodes.new('CompositorNodeScale'); scale.location = (-380, -180)
    scale.inputs['X'].default_value = fit
    scale.inputs['Y'].default_value = fit

    move = ng.nodes.new('CompositorNodeTranslate'); move.location = (-120, -180)
    move.inputs['X'].default_value = 0.0
    move.inputs['Y'].default_value = p["bp_shift"] * ry

    gain = ng.nodes.new('CompositorNodeExposure'); gain.location = (60, -180)
    gain.inputs['Exposure'].default_value = p["bp_exposure"]

    over = ng.nodes.new('CompositorNodeAlphaOver'); over.location = (280, 100)
    over.inputs['Factor'].default_value = 1.0

    ng.links.new(img.outputs['Image'], scale.inputs['Image'])
    ng.links.new(scale.outputs['Image'], move.inputs['Image'])
    ng.links.new(move.outputs['Image'], gain.inputs['Image'])
    ng.links.new(gain.outputs['Image'], over.inputs['Background'])
    ng.links.new(rl.outputs['Image'], over.inputs['Foreground'])
    ng.links.new(over.outputs['Image'], out.inputs['Image'])
    print(f"[CAF] backplate: {os.path.basename(BACKPLATE)} {bw}×{bh} → ×{fit:.4f}, "
          f"сдвиг {p['bp_shift'] * ry:+.0f} px, экспозиция {p['bp_exposure']:+.2f} ст.")


# ── сборка ──────────────────────────────────────────────────────────────────
def build_cup(cup_path, rig):
    """Импорт стакана, приведение к метрам, посадка на 0."""
    before = set(bpy.data.objects)
    bpy.ops.import_scene.gltf(filepath=cup_path)
    fresh = [o for o in bpy.data.objects if o not in before]
    meshes = [o for o in fresh if o.type == 'MESH']
    if not meshes:
        raise RuntimeError("в GLB нет мешей")

    root = bpy.data.objects.new("CAF_CUP", None)
    root.empty_display_type = 'PLAIN_AXES'
    rig.objects.link(root)
    for o in fresh:
        if o.parent is None:
            o.parent = root
        if o.name not in rig.objects:
            link(o, rig)

    bpy.context.view_layer.update()
    mn, mx = group_bbox(meshes)
    h_raw = mx.z - mn.z
    # Модели проекта лежат в миллиметрах; приводим к метрам по факту.
    scale = 0.001 if h_raw > 1.0 else 1.0
    root.scale = (scale, scale, scale)
    bpy.context.view_layer.update()

    mn, mx = group_bbox(meshes)
    root.location = (-(mn.x + mx.x) / 2, -(mn.y + mx.y) / 2, -mn.z)
    bpy.context.view_layer.update()
    mn, mx = group_bbox(meshes)
    h = mx.z - mn.z
    print(f"[CAF] стакан: {os.path.basename(cup_path)}  H={h*1000:.1f} мм  "
          f"D={max(mx.x-mn.x, mx.y-mn.y)*1000:.1f} мм  (scale {scale})")

    for o in meshes:
        for m in o.data.materials:
            if m and m.use_nodes and 'Print' in m.name:
                tune_paper_print(m)
                print(f"[CAF] печатная стенка: материал {m.name}")
    return root, meshes, h


def inner_radius_at(meshes, z, band=0.004):
    """Внутренний радиус стенки на высоте z — мерим по самой геометрии."""
    best = None
    for o in meshes:
        mw = o.matrix_world
        for v in o.data.vertices:
            p = mw @ v.co
            if abs(p.z - z) <= band:
                r = math.hypot(p.x, p.y)
                if best is None or r < best:
                    best = r
    return best


def build_table(rig, cam, p, res):
    """Плита с дальним краем на заданной доле кадра."""
    o, d = frame_ray(cam, 0.5, p["table_edge_frac"], res[0], res[1])
    hit = hit_z(o, d, 0.0)
    if hit is None:
        raise RuntimeError("дальний край стола не попадает на плоскость стола")
    y_back = hit.y
    print(f"[CAF] дальний край стола: Y={y_back*1000:.0f} мм ({p['table_edge_frac']*100:.0f}% кадра сверху)")

    w, dep, th = p["table_width"], p["table_depth"], p["table_thickness"]
    bm = bmesh.new()
    bmesh.ops.create_cube(bm, size=1.0)
    for v in bm.verts:
        v.co.x *= w
        v.co.y = (v.co.y - 0.5) * dep          # дальний край в локальном y = 0
        v.co.z = (v.co.z - 0.5) * th           # верх в локальном z = 0
    table = mesh_from_bmesh("CAF_TABLE", bm, rig)
    table.location = (0.0, y_back, 0.0)
    table.rotation_euler[2] = math.radians(p["table_rot_deg"])

    bev = table.modifiers.new("CAF_Bevel", 'BEVEL')
    bev.width = p["table_bevel"]
    bev.segments = 3
    bev.limit_method = 'ANGLE'

    blend_path, mat_name = TABLE_ASSETS[p["table_asset"]]
    with bpy.data.libraries.load(blend_path, link=False) as (src, dst):
        dst.materials = [m for m in src.materials if m == mat_name]
    mat = bpy.data.materials.get(mat_name)
    if mat:
        tune_table_material(mat, p)
        table.data.materials.append(mat)
        print(f"[CAF] стол: Poly Haven {mat_name}, roughness "
              f"{p['table_rough'][0]}…{p['table_rough'][1]}, "
              f"HSV {p['table_hsv']}")
    else:
        fb = bpy.data.materials.new("CAF_MAT_TABLE_FALLBACK")
        fb.use_nodes = True
        fb.node_tree.nodes['Principled BSDF'].inputs['Base Color'].default_value = (0.24, 0.115, 0.055, 1)
        fb.node_tree.nodes['Principled BSDF'].inputs['Roughness'].default_value = 0.64
        table.data.materials.append(fb)
        print("[CAF][WARN] материал стола не найден, поставлен fallback")

    for poly in table.data.polygons:
        poly.use_smooth = False
    return table


def build_plate(rig, p):
    got = append_objects(PLATE_BLEND, ["plate.002"], rig)
    plate = next((o for o in got if o.type == 'MESH'), None)
    if not plate:
        print("[CAF][WARN] тарелка не найдена")
        return None
    plate.name = "CAF_PLATE"
    bpy.context.view_layer.update()
    mn, mx = world_bbox(plate)
    diam = max(mx.x - mn.x, mx.y - mn.y)
    s = p["plate"]["diam"] / diam
    plate.scale = (s, s, s)
    bpy.context.view_layer.update()
    mn, _ = world_bbox(plate)
    plate.location = (p["plate"]["pos"][0], p["plate"]["pos"][1], -mn.z)
    plate.rotation_euler[2] = math.radians(p["plate"]["rot"])
    print(f"[CAF] тарелка: Ø{p['plate']['diam']*1000:.0f} мм")
    return plate


def build_croissant(rig, p):
    got = append_objects(CROISSANT_BLEND, ["croissant"], rig)
    cr = next((o for o in got if o.type == 'MESH'), None)
    if not cr:
        print("[CAF][WARN] круассан не найден")
        return None
    cr.name = "CAF_CROISSANT"
    bpy.context.view_layer.update()
    mn, mx = world_bbox(cr)
    s = p["croissant"]["len"] / max(mx.x - mn.x, mx.y - mn.y)
    cr.scale = (s, s, s)
    cr.rotation_euler[2] = math.radians(p["croissant"]["rot"])
    bpy.context.view_layer.update()
    mn, _ = world_bbox(cr)
    cr.location = (p["croissant"]["pos"][0], p["croissant"]["pos"][1],
                   p["croissant"]["z"] - mn.z)
    print(f"[CAF] круассан: {p['croissant']['len']*1000:.0f} мм")
    return cr


def build_notebook(rig, p):
    got = append_objects(NOTEBOOK_BLEND,
                         ["Notebook black leather and Pen", "body_low.003", "pen_low.003"], rig)
    root = next((o for o in got if o.type == 'EMPTY'), None) or (got[0] if got else None)
    if not root:
        print("[CAF][WARN] блокнот не найден")
        return None
    np_ = p["notebook"]
    root.name = "CAF_NOTEBOOK"
    root.rotation_euler[2] = math.radians(np_["rot"])
    root.scale = (np_["scale"],) * 3
    for o in got:
        if o.type != 'MESH':
            continue
        for m in o.data.materials:
            if not m or not m.node_tree:
                continue
            b = next((n for n in m.node_tree.nodes if n.type == 'BSDF_PRINCIPLED'), None)
            if not b:
                continue
            for l in list(m.node_tree.links):
                if l.to_node is b and l.to_socket.name in ('Base Color', 'Roughness'):
                    m.node_tree.links.remove(l)
            b.inputs['Base Color'].default_value = tuple(np_["basecolor"]) + (1.0,)
            b.inputs['Roughness'].default_value = np_["rough"]
            nrm = next((n for n in m.node_tree.nodes if n.type == 'NORMAL_MAP'), None)
            if nrm:
                nrm.inputs['Strength'].default_value = np_["normal"]
    if not np_["pen"]:
        # Хромированная ручка бьёт бликом на переднем плане и тянет взгляд
        # на себя; в референсе её нет.
        for o in got:
            if o.type == 'MESH' and 'pen' in o.name.lower():
                o.hide_render = True
    bpy.context.view_layer.update()
    mn, _ = group_bbox([o for o in got if o.type == 'MESH'])
    root.location = (np_["pos"][0], np_["pos"][1], -mn.z)
    print("[CAF] блокнот: BlenderKit Notebook black leather and Pen")
    return root


def build_stirrer_holder(rig, p):
    """Деревянный стакан с мешалками — правый баланс кадра, режется краем."""
    hp = p["holder"]
    r, h = hp["r"], hp["h"]
    rng = random.Random(p["seed"])

    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, cap_tris=False, segments=64,
                          radius1=r * 0.86, radius2=r, depth=h)
    for v in bm.verts:
        v.co.z += h / 2
    top = [f for f in bm.faces if len(f.verts) > 4 and f.calc_center_median().z > h * 0.9]
    if top:
        bmesh.ops.inset_individual(bm, faces=top, thickness=0.0035)
        bmesh.ops.translate(bm, verts=[v for f in top for v in f.verts],
                            vec=Vector((0, 0, -h * 0.22)))
    bmesh.ops.bevel(bm, geom=list(bm.edges) + list(bm.verts), offset=0.0008,
                    segments=2, affect='EDGES')
    holder = mesh_from_bmesh("CAF_STIRRER_HOLDER", bm, rig)
    holder.location = (hp["pos"][0], hp["pos"][1], 0.0)
    holder.data.materials.append(make_wood_material("CAF_MAT_HOLDER", (0.175, 0.105, 0.052), 0.75, 2.2))
    for poly in holder.data.polygons:
        poly.use_smooth = True

    sticks = bmesh.new()
    for _ in range(hp["sticks"]):
        sb = bmesh.new()
        bmesh.ops.create_cube(sb, size=1.0)
        L = hp["stick_len"] * rng.uniform(0.95, 1.05)
        for v in sb.verts:
            v.co.x *= 0.0048
            v.co.y *= 0.0012
            v.co.z = (v.co.z + 0.5) * L
        bmesh.ops.bevel(sb, geom=list(sb.edges) + list(sb.verts), offset=0.0006,
                        segments=2, affect='EDGES')
        a = rng.uniform(0, math.tau)
        rad = rng.uniform(0, r * 0.72)
        rot = Euler((math.radians(rng.uniform(-4, 4)),
                     math.radians(rng.uniform(-4, 4)),
                     rng.uniform(0, math.tau)), 'XYZ').to_matrix().to_4x4()
        loc = Matrix.Translation(Vector((hp["pos"][0] + math.cos(a) * rad,
                                         hp["pos"][1] + math.sin(a) * rad,
                                         h * 0.12)))
        bmesh.ops.transform(sb, matrix=rot, verts=sb.verts)
        bmesh.ops.transform(sb, matrix=loc, verts=sb.verts)
        me_tmp = bpy.data.meshes.new("tmp")
        sb.to_mesh(me_tmp)
        sb.free()
        sticks.from_mesh(me_tmp)
        bpy.data.meshes.remove(me_tmp)
    st = mesh_from_bmesh("CAF_STIRRERS", sticks, rig)
    st.data.materials.append(make_wood_material("CAF_MAT_STIRRER", (0.260, 0.175, 0.088), 0.80, 9.0))
    for poly in st.data.polygons:
        poly.use_smooth = False
    print(f"[CAF] держатель мешалок: Ø{r*2*1000:.0f} мм, {hp['sticks']} шт.")
    return holder, st


def build_coffee(rig, meshes, h, p_drop=0.003):
    """Поверхность кофе почти вровень с кромкой: радиус снят с самой стенки."""
    z = h - p_drop          # 2–4 мм ниже внутренней кромки, а не 6
    r = inner_radius_at(meshes, z)
    if r is None:
        print("[CAF][WARN] не нашёл стенку на уровне напитка")
        return None
    r += 0.0004                                  # заходим в стенку, чтобы не было щели
    bm = bmesh.new()
    bmesh.ops.create_circle(bm, cap_ends=True, cap_tris=True, segments=128, radius=r)
    cof = mesh_from_bmesh("CAF_COFFEE", bm, rig)
    cof.location = (0, 0, z)
    cof.data.materials.append(make_latte_material())
    print(f"[CAF] напиток: Ø{r*2*1000:.1f} мм на высоте {z*1000:.0f} мм")
    return cof


def build_markers(rig, h):
    """DROP_* из пакета — оставляем как есть, чтобы расхождение было видно."""
    for name, rel in (('DROP_PLATE', (-3.45, 0.45, 0.02)),
                      ('DROP_CROISSANT', (-3.35, 0.40, 0.12)),
                      ('DROP_NOTEBOOK', (-3.15, -2.10, 0.02)),
                      ('DROP_STIRRER_HOLDER', (4.10, 0.30, 0.02)),
                      ('DROP_FLOWER_VASE_OPTIONAL', (-5.05, 1.50, 0.02))):
        e = bpy.data.objects.new(name, None)
        e.empty_display_type = 'CUBE'
        e.empty_display_size = 0.24 * h
        e.location = Vector(rel) * h
        e.hide_render = True
        rig.objects.link(e)


def setup_render(p, out_path):
    scene = bpy.context.scene
    scene.render.engine = 'CYCLES'
    scene.render.resolution_x, scene.render.resolution_y = p["res"]
    scene.render.resolution_percentage = 100
    scene.render.film_transparent = True
    scene.render.filepath = out_path
    scene.render.image_settings.file_format = 'PNG'
    scene.render.image_settings.color_mode = 'RGB'
    scene.render.image_settings.color_depth = '16'

    c = scene.cycles
    c.samples = p["samples"]
    c.preview_samples = 32
    c.use_adaptive_sampling = True
    c.adaptive_threshold = 0.01
    scene.render.filter_size = p["pixel_filter"]
    c.use_denoising = p["denoise"]
    set_enum(c, 'denoiser', ('OPENIMAGEDENOISE', 'OPTIX'))
    set_enum(c, 'denoising_input_passes', ('RGB_ALBEDO_NORMAL',))
    set_enum(c, 'denoising_quality', ('HIGH',))
    c.max_bounces = 8
    c.diffuse_bounces = 3
    c.glossy_bounces = 4
    c.transmission_bounces = 4
    c.transparent_max_bounces = 8

    if p["engine_device"] == 'GPU':
        prefs = bpy.context.preferences.addons['cycles'].preferences
        kind = set_enum(prefs, 'compute_device_type', ('OPTIX', 'CUDA', 'HIP', 'ONEAPI'))
        if kind:
            prefs.get_devices()
            on = 0
            for d in prefs.devices:
                d.use = (d.type == kind)
                on += 1 if d.use else 0
            if on:
                scene.cycles.device = 'GPU'
                print(f"[CAF] рендер: GPU {kind} ({on} устр.)")
            else:
                print("[CAF] рендер: CPU (GPU-устройств нет)")
        else:
            print("[CAF] рендер: CPU")

    vt = set_enum(scene.view_settings, 'view_transform',
                  (p["view_transform"], 'AgX', 'Standard'))
    if vt == 'AgX':
        set_enum(scene.view_settings, 'look',
                 ('AgX - Medium High Contrast', 'Medium High Contrast', 'None'))
    scene.view_settings.exposure = p["exposure"]
    scene.view_settings.gamma = 1.0
    print(f"[CAF] color: {vt}, exposure {p['exposure']}, samples {p['samples']}, "
          f"{p['res'][0]}×{p['res'][1]}")


def main():
    args = parse_args()
    p = deep_update(json.loads(json.dumps(PARAMS)), args["params"])
    random.seed(p["seed"])

    bpy.ops.wm.read_factory_settings(use_empty=True)
    scene = bpy.context.scene
    scene.unit_settings.system = 'METRIC'
    scene.unit_settings.scale_length = 1.0

    rig = new_collection("CAF_MOCKUP_RIG")
    res = p["res"]

    cup_root, cup_meshes, h = build_cup(args["cup"], rig)
    mn_cup, mx_cup = group_bbox(cup_meshes)

    # Камера — по относительным коэффициентам гайда.
    cd = bpy.data.cameras.new("CAF_CAMERA")
    cam = bpy.data.objects.new("CAF_CAMERA", cd)
    rig.objects.link(cam)
    scene.camera = cam
    cd.lens = p["lens"]
    cd.sensor_width = 36.0
    cd.sensor_fit = 'HORIZONTAL'
    cd.dof.use_dof = p["dof"]
    cd.dof.aperture_fstop = p["fstop"]
    cd.dof.aperture_blades = p["blades"]
    cam.location = (p["cam_x"] * h, p["cam_y"] * h, p["cam_z"] * h)
    look_at(cam, Vector((0.0, 0.0, p["aim_z"] * h)))
    bpy.context.view_layer.update()

    # Фокус — на НАРУЖНОЙ стенке, обращённой к камере, а не на оси стакана.
    # Точка снимается с самой геометрии: ищем ближний к камере вертекс на
    # высоте focus_z. На оси ошибка равна радиусу (≈38 мм), а вся ГРИП при
    # f/6.3 — около 16 мм, то есть печать гарантированно уходила из фокуса.
    fz = p["focus_z"] * h
    # Рейкастом из камеры: это ровно та точка передней поверхности, которую
    # камера видит на этой высоте. По вертексам искать нельзя — у hero-модели
    # рёбра сгущены у канта и дна, а середина стенки почти без них.
    dg = bpy.context.evaluated_depsgraph_get()
    origin = cam.matrix_world.translation
    direction = (Vector((0.0, 0.0, fz)) - origin).normalized()
    hit, loc, _, _, obj, _ = scene.ray_cast(dg, origin, direction)
    if hit and obj in cup_meshes:
        focus_pt = loc
    else:
        focus_pt = Vector((0.0, -0.5 * max(mx_cup.x - mn_cup.x, 0.0), fz))
        print("[CAF][WARN] рейкаст не попал в стакан, фокус поставлен по габариту")
    focus = bpy.data.objects.new("FOCUS_CUP", None)
    focus.empty_display_type = 'SPHERE'
    focus.empty_display_size = 0.10 * h
    focus.location = focus_pt
    focus.hide_render = True
    rig.objects.link(focus)
    cd.dof.focus_object = focus
    fd = (cam.location - focus_pt).length
    # Тонкая линза: полная ГРИП ≈ 2·N·c·(1+m)/m², c = 0.03 мм для FF.
    m = cd.lens / max(1.0, (fd * 1000 - cd.lens))
    dof_mm = 2 * p["fstop"] * 0.03 * (1 + m) / (m * m) if p["dof"] else float('inf')
    print(f"[CAF] фокус: передняя стенка Y={focus_pt.y*1000:.1f} мм, дистанция "
          f"{fd*1000:.0f} мм, f/{p['fstop']}, ГРИП ≈ {dof_mm:.1f} мм"
          if p["dof"] else "[CAF] фокус: DOF ВЫКЛЮЧЕН (диагностика резкости)")

    target = Vector((0.0, 0.0, p["aim_z"] * h))
    half_w = (cam.location - target).length * (cd.sensor_width / 2) / cd.lens
    print(f"[CAF] камера: {p['lens']:.0f} мм, f/{p['fstop']}, дистанция "
          f"{(cam.location - target).length*1000:.0f} мм, ширина кадра "
          f"{half_w*2*1000:.0f} мм, стакан = {h/(half_w*2*res[1]/res[0])*100:.0f}% высоты кадра")

    build_table(rig, cam, p, res)
    if p["props"]:
        build_plate(rig, p)
        build_croissant(rig, p)
        build_notebook(rig, p)
        build_stirrer_holder(rig, p)
    else:
        print("[CAF] пропсы выключены — диагностический кадр")
    if p["coffee"]:
        build_coffee(rig, cup_meshes, h)
    build_markers(rig, h)

    # Свет. Риг задан в метрах для стакана 88 мм и целиком масштабируется
    # вместе с высотой модели, поэтому схема переносится на любой формат.
    k = h / 0.088
    for key in ("key", "front", "rim"):
        s = p[key]
        add_area(f"CAF_{key.upper()}_{s['k']:.0f}K",
                 Vector(s["pos"]) * k, Vector((0.0, 0.0, s["aim"] * h)),
                 s["power"] * k * k, [v * k for v in s["size"]],
                 s["k"], p["wb_kelvin"], rig)
    print("[CAF] свет: KEY {0[power]:.0f} Вт {0[k]:.0f}K / FRONT {1[power]:.0f} Вт "
          "{1[k]:.0f}K / RIM {2[power]:.0f} Вт {2[k]:.0f}K, WB камеры {3:.0f}K"
          .format(p["key"], p["front"], p["rim"], p["wb_kelvin"]))

    setup_world(p)
    setup_compositor(p)
    setup_render(p, args["out"])

    missing = sorted({os.path.basename(i.filepath) for i in bpy.data.images
                      if i.source == 'FILE' and i.filepath and not i.packed_file
                      and not os.path.isfile(bpy.path.abspath(i.filepath,
                                                              library=i.library))})
    if missing:
        print(f"[CAF][WARN] не подгрузились текстуры: {missing}")

    if args["blend"]:
        os.makedirs(os.path.dirname(args["blend"]) or ".", exist_ok=True)
        bpy.ops.wm.save_as_mainfile(filepath=args["blend"])
        print(f"[CAF] сцена сохранена: {args['blend']}")

    out = args["out"] if args["out"].lower().endswith(".png") else args["out"] + ".png"
    os.makedirs(os.path.dirname(out) or ".", exist_ok=True)
    bpy.ops.render.render(write_still=False)
    bpy.data.images['Render Result'].save_render(filepath=out)
    print(f"[CAF] готово: {out}")


if __name__ == '__main__':
    main()
