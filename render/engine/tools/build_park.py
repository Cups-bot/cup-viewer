"""Сцена «Осенний парк» (park): мокрая скамейка, клёны, низкое солнце.

    blender -b --factory-startup -P engine/tools/build_park.py

Собирает render/scenes/park.blend — фон для run.py (sets/park.json, "blend").
Реальный масштаб, метры. Стакан ставит движок на место заглушки CUP_HERO
(конус эталона BM90-500), как у фонов из 4.blend.

Ассеты (render/scenes/assets/park/, список — render/assets.json):
- user/ — владельца (2026-09-27): референс, фон-снимок (user_bokeh.png и тот
  же кадр в 4K — подкладка под кадр, bk/plate.py), текстура скамейки без
  бликов (bench_green_basecolor/normal), атлас листьев на белом с нормалями
  (маска и номера — tools/prep_leaf_atlas.py);
- панорама sunny_vondelpark 4K (Poly Haven, CC0) — свет и отражения;
- металл green_metal_rust, земля leaves_forest_ground (Poly Haven, CC0).

Скамейка — своя геометрия: готовые модели парковых скамеек (Sketchfab,
BlenderKit) только с аккаунтом, а у Poly Haven — церковная.
"""

import math
import os
import random
import sys

import bpy
from mathutils import Euler, Matrix, Vector

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
ASSETS = os.path.join(ROOT, "scenes", "assets", "park")
OUT = os.path.join(ROOT, "scenes", "park.blend")

# ── раскладка ────────────────────────────────────────────────────────────────
# Кадр владельца (2026-09-27, «почти 1 в 1»). Камера и габариты скамейки
# подогнаны по линиям референса (camfit3: кромки планок спинки и сиденья,
# венчик и дно DW90-430). Камера — на ~2,5 см выше венчика: видна внутренняя
# кромка горловины, как в референсе (разбор владельца, п. 4; на 1 см — лишь
# полоска). За это спинка положе, чем в референсе: AI нарисовал спинку и
# сиденье с разной перспективой.
SEAT_Z = 0.45                     # верх сиденья, м
SLAT_T = 0.032                    # толщина планок
SEAT_SLATS = 3                    # передняя, под стаканом, дальняя
SEAT_SLAT_W = 0.1200             # широкие планки, как в референсе
SEAT_GAP = 0.0319
CUP_OFF = 0.0525               # ось стакана за передней кромкой его планки
CUP_X, CUP_Y = 0.10, 0.0          # место стакана; сиденье строится от него
SEAT_Y0 = CUP_Y - CUP_OFF - SEAT_GAP - SEAT_SLAT_W   # передняя кромка сиденья
SEAT_DEPTH = SEAT_SLATS * SEAT_SLAT_W + (SEAT_SLATS - 1) * SEAT_GAP
# Скамейка кончается в 28 см правее стакана: в референсе там конец сиденья
# (тёмный торец справа от стакана) и конец спинки — стакан стоит у края.
BENCH_X = (-1.45, CUP_X + 0.28)
BENCH_LEN = BENCH_X[1] - BENCH_X[0]
BACK_SLATS = 2
BACK_TILT = 14.0                  # наклон спинки назад, °
# Спинка: две планки по 61 мм через 23 мм, верх в 19 см над сиденьем,
# лицо спинки у сиденья — в 30 см за осью стакана; кончается у торца сиденья.
BACK_SLAT_W, BACK_GAP, BACK_TOP = 0.0598, 0.0221, 0.1771
BACK_DY = 0.3000
BACK_END_DX = 0.275
REF_H, REF_TOP, REF_BOT = 0.1353, 0.089, 0.057   # эталон BM90-500
CAM_YAW = 41.249                 # взгляд правее оси +Y на столько, °
CAM_DIST = 0.5349               # по полу от цели до камеры, м
CAM_UP = 0.0650                   # камера над целью, м (≈ 2,5 см над венчиком DW90-430)
AIM = 0.0075                      # цель над центром эталона, м
# Фокус — на стакане (sets/park.json), f/5.6 на 70 мм: передний лист и
# передняя кромка скамейки мягче стакана, спинка и лес — в боке (п. 5).
# Фон — подложенный снимок (bk/plate.py), диафрагма размывает только геометрию.
LENS, FSTOP = 70.00, 5.6
# Солнце — главный свет, сбоку-справа: 75° правее оси взгляда, 24° над
# горизонтом. Перебор на глянцевой скамейке (второй разбор владельца, п. 2):
# лицо спинки параллельно оси скамейки и смотрит к камере — солнце ближе к
# оси взгляда оказывается за плоскостью спинки, и она тонет в тени (v3); с
# 75° спинка освещена, верх досок и скруглённые кромки ловят длинные блики,
# стакан получает свет справа. Зеркальный блик в мокрых досках — за кадром
# (белая «простыня» при солнце по оси, v3a). Солнце снимка — на 10° правее
# оси; размытый снимок расхождения не выдаёт.
SUN_AZ = -26.2
SUN_ELEV = 24.0
# Фон для камеры — снимок владельца (user_bokeh_4k.png — тот же кадр, что
# user_bokeh.png, в 4K): золотое боке, стволы, солнце справа сверху. Снимок =
# кадр референса для DW90-430: полуширина — тангенс кадра объектива, центр —
# со сдвигом кадра DW90-430 относительно эталона (frame.single).
PLATE_TAN = 0.2571
PLATE_SHIFT = (0.0000, -0.0217)
PLATE_GAIN = 1.0
# Свет (разбор владельца, п. 1–2): главный — тёплое контровое солнце сзади
# справа (объём стакана, светлая кромка, золото на мокрых досках, просвет
# листьев); спереди — слабое мягкое заполнение для надписи. «Второе солнце»
# спереди делало стакан плоским, а печать — «неоновой».
SUN_STRENGTH = 4.5                # Вт/м²
PAINT_DARKEN = 0.7                # мокрая краска темнее текстуры (сухой)
SUN_COLOR = (1.0, 0.84, 0.64)     # ~4000 K: тёплый, без оранжевой заливки
SUN_SPECULAR = 0.9                # доля солнца в бликах: кромки досок и спинки ловят длинные блики
FILL_W = 22.0                     # отражатель сбоку-слева, Вт
CAM_FILL_W = 14.0                 # большое слабое заполнение от камеры, чуть справа, Вт
SKY_CLAMP = 25.0                  # всё ярче — солнце панорамы, его заменяет лампа
REFLECT_GAIN = 1.0                # яркость панорамы в отражениях
WORLD_DIFFUSE = 0.55              # панорама в рассеянном свете
GLOSSY_CLAMP = 0.5                # потолок панорамы в отражениях (солнце и небо у него)
PLATE_REFLECT = 0.45              # снимок-фон в отражениях
HDRI_SUN_AZ = -34.0               # солнце в панораме (Cycles: u = 0.5 − atan2(y, x) / 2π)
# Капли (п. 6): группами и почти сухими участками, разные размер и
# приплюснутость; под стаканом капель нет.
DROPS_DENSITY, DROP_R, DROP_ISLANDS = 26000.0, 0.0020, 4.5
MIST_DENSITY, MIST_R = 50000.0, 0.0007
DROP_FREE_R = 0.042               # свободный круг под стаканом, м (дно DW90-430 — 30 мм)
VIEW_AZ = 48.75                  # азимут взгляда (atan2), °
random.seed(27)


def reset():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    scene = bpy.context.scene
    scene.name = "Autumn Park"
    scene.unit_settings.system = "METRIC"
    scene.render.engine = "CYCLES"
    scene.cycles.samples = 256
    scene.render.resolution_x = scene.render.resolution_y = 1600
    return scene


def img(path, color=True):
    im = bpy.data.images.load(path, check_existing=True)
    im.colorspace_settings.name = "sRGB" if color else "Non-Color"
    return im


def node(nt, kind, **inputs):
    n = nt.nodes.new(kind)
    for k, v in inputs.items():
        n.inputs[k].default_value = v
    return n


def link(nt, a, b):
    nt.links.new(a, b)


def principled(name):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    return m, m.node_tree, m.node_tree.nodes["Principled BSDF"]


def planks_material():
    """Зелёная краска по дереву, мокрая: текстура владельца без нарисованных
    бликов (bench_green_basecolor/normal), блестит плёнка воды полосами вдоль
    волокна, под ней эмаль почти без своего блика."""
    m, nt, b = principled("Park bench paint")
    base = os.path.join(ASSETS, "user")
    uv = nt.nodes.new("ShaderNodeUVMap")
    diff = nt.nodes.new("ShaderNodeTexImage"); diff.image = img(os.path.join(base, "bench_green_basecolor.png"))
    nor = nt.nodes.new("ShaderNodeTexImage"); nor.image = img(os.path.join(base, "bench_green_normal_generated.png"), False)
    for t in (diff, nor):
        link(nt, uv.outputs["UV"], t.inputs["Vector"])
    # Мокрая краска темнее сухой, а боковое солнце делало скамейку пастельной
    # (v4a): свет на досках должен читаться бликами, не заливкой.
    darker = nt.nodes.new("ShaderNodeMix"); darker.data_type = "RGBA"; darker.blend_type = "MULTIPLY"
    darker.inputs["Factor"].default_value = 1.0
    darker.inputs[7].default_value = (PAINT_DARKEN, PAINT_DARKEN, PAINT_DARKEN, 1.0)
    link(nt, diff.outputs["Color"], darker.inputs[6]); link(nt, darker.outputs[2], b.inputs["Base Color"])
    # Сколы — светлое дерево в текстуре: там матово.
    hsv = nt.nodes.new("ShaderNodeSeparateColor"); hsv.mode = "HSV"
    link(nt, diff.outputs["Color"], hsv.inputs["Color"])
    chip = node(nt, "ShaderNodeMapRange", **{"From Min": 0.30, "From Max": 0.45, "To Min": 0.0, "To Max": 1.0})
    link(nt, hsv.outputs[2], chip.inputs["Value"])
    r = node(nt, "ShaderNodeMapRange", **{"From Min": 0.0, "From Max": 1.0, "To Min": 0.45, "To Max": 0.75})
    link(nt, chip.outputs["Result"], r.inputs["Value"])
    link(nt, r.outputs["Result"], b.inputs["Roughness"])
    nmap = node(nt, "ShaderNodeNormalMap", Strength=0.3)
    link(nt, nor.outputs["Color"], nmap.inputs["Color"])
    link(nt, nmap.outputs["Normal"], b.inputs["Normal"])
    # Влажность — неоднородность на трёх масштабах (второй разбор, п. 3):
    # крупные протяжённые мокрые участки (чуть вытянуты вдоль волокна) ×
    # средние разрывы × мелкая дрожь шероховатости. Одна сильно вытянутая
    # полоса читалась лаком с длинными параллельными полосами (v3).
    tc = nt.nodes.new("ShaderNodeTexCoord")
    mp = node(nt, "ShaderNodeMapping"); mp.inputs["Scale"].default_value = (1.6, 4.0, 4.0)
    link(nt, tc.outputs["Object"], mp.inputs["Vector"])
    big = node(nt, "ShaderNodeTexNoise", Scale=2.2, Detail=4.0, Roughness=0.55)
    link(nt, mp.outputs["Vector"], big.inputs["Vector"])
    bigm = node(nt, "ShaderNodeMapRange", **{"From Min": 0.40, "From Max": 0.60, "To Min": 0.0, "To Max": 1.0})
    link(nt, big.outputs["Fac"], bigm.inputs["Value"])
    mid = node(nt, "ShaderNodeTexNoise", Scale=16.0, Detail=5.0, Roughness=0.6)
    link(nt, tc.outputs["Object"], mid.inputs["Vector"])
    midm = node(nt, "ShaderNodeMapRange", **{"From Min": 0.32, "From Max": 0.68, "To Min": 0.25, "To Max": 1.0})
    link(nt, mid.outputs["Fac"], midm.inputs["Value"])
    wetv = nt.nodes.new("ShaderNodeMath"); wetv.operation = "MULTIPLY"
    link(nt, bigm.outputs["Result"], wetv.inputs[0]); link(nt, midm.outputs["Result"], wetv.inputs[1])

    wet = wetv.outputs[0]                      # маска влажности 0…1
    cw = node(nt, "ShaderNodeMapRange", **{"From Min": 0.0, "From Max": 1.0, "To Min": 0.1, "To Max": 0.9})
    link(nt, wet, cw.inputs["Value"]); link(nt, cw.outputs["Result"], b.inputs["Coat Weight"])
    cr = node(nt, "ShaderNodeMapRange", **{"From Min": 0.0, "From Max": 1.0, "To Min": 0.20, "To Max": 0.04})
    link(nt, wet, cr.inputs["Value"])
    fine = node(nt, "ShaderNodeTexNoise", Scale=90.0, Detail=2.0)
    link(nt, tc.outputs["Object"], fine.inputs["Vector"])
    jit = node(nt, "ShaderNodeMapRange", **{"From Min": 0.3, "From Max": 0.7, "To Min": 0.0, "To Max": 0.06})
    link(nt, fine.outputs["Fac"], jit.inputs["Value"])
    crj = nt.nodes.new("ShaderNodeMath"); crj.operation = "ADD"
    link(nt, cr.outputs["Result"], crj.inputs[0]); link(nt, jit.outputs["Result"], crj.inputs[1])
    link(nt, crj.outputs[0], b.inputs["Coat Roughness"])
    b.inputs["Coat IOR"].default_value = 1.33
    # Под водой свой блик эмали почти пропадает (граница краска/вода); где
    # подсохло — обычный атласный блик. Шершавый блик эмали от солнца давал
    # бежевую «простыню» на всём сиденье (d15–d22).
    sp = node(nt, "ShaderNodeMapRange", **{"From Min": 0.0, "From Max": 1.0, "To Min": 0.35, "To Max": 0.05})
    link(nt, wet, sp.inputs["Value"]); link(nt, sp.outputs["Result"], b.inputs["Specular IOR Level"])
    # Плёнка сглаживает рельеф дерева: у неё нормаль слабее.
    cn = node(nt, "ShaderNodeNormalMap", Strength=0.1)
    link(nt, nor.outputs["Color"], cn.inputs["Color"])
    link(nt, cn.outputs["Normal"], b.inputs["Coat Normal"])
    return m


def metal_material():
    m, nt, b = principled("Park bench iron")
    base = os.path.join(ASSETS, "metal")
    tc = nt.nodes.new("ShaderNodeTexCoord")
    mp = node(nt, "ShaderNodeMapping"); mp.inputs["Scale"].default_value = (4.0, 4.0, 4.0)
    link(nt, tc.outputs["Object"], mp.inputs["Vector"])
    tex = {}
    for k, f, c in (("diff", "green_metal_rust_diff_4k.jpg", True), ("rough", "green_metal_rust_rough_4k.jpg", False),
                    ("nor", "green_metal_rust_nor_gl_4k.jpg", False)):
        t = nt.nodes.new("ShaderNodeTexImage"); t.image = img(os.path.join(base, f), c)
        t.projection = "BOX"; t.projection_blend = 0.3
        link(nt, mp.outputs["Vector"], t.inputs["Vector"]); tex[k] = t
    dark = nt.nodes.new("ShaderNodeMix"); dark.data_type = "RGBA"; dark.blend_type = "MULTIPLY"
    # Чугун в тени скамейки почти чёрный (светлая зелёная стойка у конца спинки
    # спорила со стаканом, d29).
    dark.inputs["Factor"].default_value = 1.0; dark.inputs[7].default_value = (0.12, 0.16, 0.13, 1.0)
    link(nt, tex["diff"].outputs["Color"], dark.inputs[6]); link(nt, dark.outputs[2], b.inputs["Base Color"])
    link(nt, tex["rough"].outputs["Color"], b.inputs["Roughness"])
    nmap = nt.nodes.new("ShaderNodeNormalMap"); link(nt, tex["nor"].outputs["Color"], nmap.inputs["Color"])
    link(nt, nmap.outputs["Normal"], b.inputs["Normal"])
    b.inputs["Metallic"].default_value = 0.0
    b.inputs["Coat Weight"].default_value = 0.7
    b.inputs["Coat Roughness"].default_value = 0.08
    return m


def ground_material():
    m, nt, b = principled("Park ground leaves")
    base = os.path.join(ASSETS, "ground")
    tc = nt.nodes.new("ShaderNodeTexCoord")
    mp = node(nt, "ShaderNodeMapping"); mp.inputs["Scale"].default_value = (0.5, 0.5, 0.5)
    link(nt, tc.outputs["Object"], mp.inputs["Vector"])
    for k, f, c in (("Base Color", "leaves_forest_ground_diff_2k.jpg", True),
                    ("Roughness", "leaves_forest_ground_rough_2k.jpg", False)):
        t = nt.nodes.new("ShaderNodeTexImage"); t.image = img(os.path.join(base, f), c)
        link(nt, mp.outputs["Vector"], t.inputs["Vector"]); link(nt, t.outputs["Color"], b.inputs[k])
    t = nt.nodes.new("ShaderNodeTexImage"); t.image = img(os.path.join(base, "leaves_forest_ground_nor_gl_2k.jpg"), False)
    link(nt, mp.outputs["Vector"], t.inputs["Vector"])
    nmap = nt.nodes.new("ShaderNodeNormalMap"); link(nt, t.outputs["Color"], nmap.inputs["Color"])
    link(nt, nmap.outputs["Normal"], b.inputs["Normal"])
    return m


def leaf_material():
    """Листья из атласа владельца (сухой клён и дуб на белом, ChatGPT): цвет как
    есть, маска и номер листа — tools/prep_leaf_atlas.py, нормаль — его
    нормаль атласа. Рельеф прожилок слабый (п. 7: «тиснёная кожа»), матовый,
    умеренный просвет в контровом солнце."""
    base = os.path.join(ASSETS, "user")
    m = bpy.data.materials.new("Leaf (owner atlas)")
    m.use_nodes = True
    nt = m.node_tree
    nt.nodes.clear()
    out = nt.nodes.new("ShaderNodeOutputMaterial")
    uv = nt.nodes.new("ShaderNodeUVMap")
    atlas = [f for f in os.listdir(base) if "ChatGPT" in f and f.endswith(".png")][0]
    tex = {}
    # Цвет без белой каймы: полупрозрачный край брал белый фон атласа
    # (светлая кайма на листе, второй разбор, п. 4) — tools/prep_leaf_atlas.py.
    atlas = "leaf_atlas_color.png"
    for k, f, c in (("Color", atlas, True), ("Alpha", "leaf_atlas_alpha.png", False),
                    ("Normal", "leaf_atlas_normal_generated.png", False), ("Id", "leaf_atlas_ids.png", False)):
        t = nt.nodes.new("ShaderNodeTexImage"); t.image = img(os.path.join(base, f), c)
        link(nt, uv.outputs["UV"], t.inputs["Vector"]); tex[k] = t
    tex["Id"].interpolation = "Closest"
    # Лист показывает только свою область атласа: рамки соседей перекрываются.
    att = nt.nodes.new("ShaderNodeAttribute"); att.attribute_type = "OBJECT"; att.attribute_name = "leaf_id"
    idv = nt.nodes.new("ShaderNodeMath"); idv.operation = "MULTIPLY"; idv.inputs[1].default_value = 255.0
    link(nt, tex["Id"].outputs["Color"], idv.inputs[0])
    same = nt.nodes.new("ShaderNodeMath"); same.operation = "COMPARE"; same.inputs[2].default_value = 0.5
    link(nt, idv.outputs[0], same.inputs[0]); link(nt, att.outputs["Fac"], same.inputs[1])
    cut_a = nt.nodes.new("ShaderNodeMath"); cut_a.operation = "MULTIPLY"
    link(nt, tex["Alpha"].outputs["Color"], cut_a.inputs[0]); link(nt, same.outputs[0], cut_a.inputs[1])
    b = nt.nodes.new("ShaderNodeBsdfPrincipled")
    link(nt, tex["Color"].outputs["Color"], b.inputs["Base Color"])
    b.inputs["Roughness"].default_value = 0.68
    b.inputs["Specular IOR Level"].default_value = 0.2
    nmap = node(nt, "ShaderNodeNormalMap", Strength=0.35)
    link(nt, tex["Normal"].outputs["Color"], nmap.inputs["Color"])
    link(nt, nmap.outputs["Normal"], b.inputs["Normal"])
    trans = nt.nodes.new("ShaderNodeBsdfTranslucent")
    link(nt, tex["Color"].outputs["Color"], trans.inputs["Color"])
    mix = nt.nodes.new("ShaderNodeMixShader"); mix.inputs["Fac"].default_value = 0.15
    link(nt, b.outputs[0], mix.inputs[1]); link(nt, trans.outputs[0], mix.inputs[2])
    clear = nt.nodes.new("ShaderNodeBsdfTransparent")
    cut = nt.nodes.new("ShaderNodeMixShader")
    link(nt, cut_a.outputs[0], cut.inputs["Fac"])
    link(nt, clear.outputs[0], cut.inputs[1]); link(nt, mix.outputs[0], cut.inputs[2])
    link(nt, cut.outputs[0], out.inputs["Surface"])
    return m


# ── геометрия ────────────────────────────────────────────────────────────────

def box(name, size, loc, mat, bevel=0.004, rot=(0, 0, 0)):
    bpy.ops.mesh.primitive_cube_add(size=1.0, location=loc, rotation=rot)
    ob = bpy.context.object
    ob.name = name
    ob.scale = size
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    if bevel:
        mod = ob.modifiers.new("Rounded edges", "BEVEL")
        mod.width = bevel; mod.segments = 4; mod.limit_method = "NONE"; mod.harden_normals = True
    ob.data.materials.append(mat)
    for p in ob.data.polygons:
        p.use_smooth = True
    return ob


def board_uv(ob, board, length):
    """Развёртка планки на текстуру владельца (2172×724, волокно вдоль): вдоль
    доски 0,9 м на ширину текстуры, поперёк — своя полоса высотой 0,42 (лицо
    и кромки продолжают друг друга), у каждой планки свой сдвиг."""
    me = ob.data
    uv = me.uv_layers.new(name="UVMap")
    size = ob.dimensions
    rnd = random.Random(board * 7919 + 13)
    u_off, v0 = rnd.random(), rnd.uniform(0.02, 0.56)
    for poly in me.polygons:
        for li in poly.loop_indices:
            co = me.vertices[me.loops[li].vertex_index].co
            u = u_off + (co.x + length / 2) / 0.9
            t = (co.y / size.y + 0.5) * 0.8 + (co.z / size.z + 0.5) * 0.2
            uv.data[li].uv = (u, v0 + 0.42 * min(max(t, 0.0), 1.0))


MID = (BENCH_X[0] + BENCH_X[1]) / 2
# Спинка кончается у торца сиденья, за стаканом (референс).
BACK_END = CUP_X + BACK_END_DX
BACK_LEN = BACK_END - BENCH_X[0]
BACK_MID = (BENCH_X[0] + BACK_END) / 2
SUPPORTS = (BENCH_X[0] + 0.06, -0.60, BENCH_X[1] - 0.06)     # чугунные рамы: торцы и середина


def back_face_y(zc):
    """Лицо спинки на высоте zc над сиденьем (наклон назад)."""
    return CUP_Y + BACK_DY + zc * math.tan(math.radians(BACK_TILT))


def bench(paint, iron):
    """Скамейка как в референсе: продольные широкие планки сиденья и спинки,
    чугунные рамы на торцах и посередине; стакан стоит у правого торца.

    (Поперечные планки сиденья были ошибкой подгонки v1 — см. журнал сцены.)"""
    parts = []
    tilt = math.radians(BACK_TILT)
    seat_y = [SEAT_Y0 + SEAT_SLAT_W / 2 + i * (SEAT_SLAT_W + SEAT_GAP) for i in range(SEAT_SLATS)]
    for i, y in enumerate(seat_y):
        z = SEAT_Z - SLAT_T / 2 + random.uniform(-0.0008, 0.0)
        ob = box(f"Seat slat {i + 1}", (BENCH_LEN, SEAT_SLAT_W, SLAT_T), (MID, y, z), paint, 0.009,
                 rot=(math.radians(random.uniform(-0.3, 0.3)), 0, math.radians(random.uniform(-0.04, 0.04))))
        board_uv(ob, i, BENCH_LEN)
        parts.append(ob)
    for i in range(BACK_SLATS):
        zc = BACK_TOP - BACK_SLAT_W / 2 - i * (BACK_SLAT_W + BACK_GAP)   # центр планки над сиденьем
        ob = box(f"Back slat {i + 1}", (BACK_LEN, SLAT_T, BACK_SLAT_W),
                 (BACK_MID, back_face_y(zc) + SLAT_T / 2, SEAT_Z + zc), paint, 0.010, rot=(-tilt, 0, 0))
        board_uv(ob, i + 3, BACK_LEN)
        parts.append(ob)
    # Чугун: продольные балки под сиденьем, на опорах — ножки, поперечина до
    # спинки и стойка спинки.
    y_front, y_back = SEAT_Y0, SEAT_Y0 + SEAT_DEPTH
    rail_y = (y_front + 0.05, y_back - 0.05)
    under = SEAT_Z - SLAT_T
    for y in rail_y:
        parts.append(box("Iron seat rail", (BENCH_LEN - 0.06, 0.03, 0.04), (MID, y, under - 0.02), iron, 0.006))
    post_y = back_face_y(0.0) + SLAT_T + 0.0225
    for x in SUPPORTS:
        w = 0.024
        y_end = post_y + 0.02 if x < BACK_END else y_back - 0.02
        parts += [
            box("Iron front leg", (w, 0.05, under - 0.04), (x, y_front + 0.05, (under - 0.04) / 2), iron, 0.006),
            box("Iron rear leg", (w, 0.05, under - 0.04), (x, y_back - 0.05, (under - 0.04) / 2), iron, 0.006),
            box("Iron cross", (w, y_end - y_front - 0.03, 0.045), (x, (y_front + 0.03 + y_end) / 2, under - 0.04), iron, 0.006),
        ]
        if x < BACK_END:
            zc = (BACK_TOP - 0.11) / 2
            parts.append(box("Iron back post", (w, 0.045, BACK_TOP + 0.09),
                             (x, post_y + zc * math.tan(tilt), SEAT_Z + zc), iron, 0.006, rot=(-tilt, 0, 0)))
    # Каретные болты: на планках сиденья и спинки — над опорами.
    for x in SUPPORTS:
        for y in seat_y:
            bpy.ops.mesh.primitive_uv_sphere_add(radius=0.0085, location=(x, y, SEAT_Z - 0.004), segments=24, ring_count=12)
            ob = bpy.context.object; ob.name = "Carriage bolt"; ob.scale.z = 0.5
            ob.data.materials.append(paint); bpy.ops.object.shade_smooth(); parts.append(ob)
        if x >= BACK_END:
            continue
        for i in range(BACK_SLATS):
            zc = BACK_TOP - BACK_SLAT_W / 2 - i * (BACK_SLAT_W + BACK_GAP)
            bpy.ops.mesh.primitive_uv_sphere_add(radius=0.011, location=(x, back_face_y(zc), SEAT_Z + zc),
                                                 segments=24, ring_count=12)
            ob = bpy.context.object; ob.name = "Back carriage bolt"; ob.scale = (1.0, 0.45, 1.0)
            ob.rotation_euler = (-tilt, 0, 0)
            ob.data.materials.append(iron); bpy.ops.object.shade_smooth(); parts.append(ob)
    return parts, SEAT_DEPTH


def water_material():
    """Вода капель. Нарисованный блик (d29–d30) читался россыпью одинаковых
    бусин (разбор владельца, п. 6) — искры только от настоящего света:
    контрового солнца и неба."""
    m, nt, b = principled("Rain water")
    b.inputs["Base Color"].default_value = (1.0, 1.0, 1.0, 1.0)
    b.inputs["Roughness"].default_value = 0.02
    b.inputs["IOR"].default_value = 1.333
    b.inputs["Transmission Weight"].default_value = 1.0
    return m


def drops(parts, water):
    """Капли дождя — геометрия: приплюснутые купола воды на всём, что смотрит
    вверх или на небо (сиденье, скругления кромок, лицо спинки).

    Рельефом капли читались шагренью; настоящая капля — линза: преломляет
    лак под собой, собирает блик солнца в искру. Островами: где капель много,
    где только плёнка. Узлы геометрии: раскладка по Пуассону (капли не
    слипаются), купол по нормали грани, мелких больше, чем крупных.

    (Частицы-волосы не годятся: копию объекта они масштабируют ещё и на длину
    волоса — капля 2 мм становилась 2 мкм.)

    Капли — отдельные объекты (коллекция Rain drops), по одному на планку."""
    bpy.ops.mesh.primitive_uv_sphere_add(segments=24, ring_count=12, radius=1.0)
    bead = bpy.context.object
    bead.name = "Rain drop"
    # Открытый приплюснутый купол, кромкой чуть в плёнке воды. Плоское дно
    # лежало вровень с доской (совпадающие грани), и капли светились
    # бирюзой изнутри (d27).
    import bmesh
    bm = bmesh.new(); bm.from_mesh(bead.data)
    bmesh.ops.delete(bm, geom=[v for v in bm.verts if v.co.z < -1e-6], context="VERTS")
    for v in bm.verts:
        v.co.z = v.co.z * 0.55 - 0.04
    bm.to_mesh(bead.data); bm.free()
    bead.data.materials.append(water)
    bpy.ops.object.shade_smooth()
    bead.hide_render = True
    bead.hide_viewport = True

    coll = bpy.data.collections.new("Rain drops")
    bpy.context.scene.collection.children.link(coll)
    count = 0
    for ob in parts:
        if not ob.name.startswith(("Seat slat", "Back slat")):
            continue
        holder = bpy.data.objects.new(ob.name + " drops", bpy.data.meshes.new(ob.name + " drops"))
        coll.objects.link(holder)
        holder.modifiers.new("Rain drops", "NODES").node_group = _drops_nodes(ob, bead)
        count += 1
    return coll, count


def _drops_nodes(slat, bead):
    """Узлы капель одной планки: планка берётся в мировых осях (объект-держатель в нуле)."""
    ng = bpy.data.node_groups.new(f"Rain drops · {slat.name}", "GeometryNodeTree")
    ng.interface.new_socket("Geometry", in_out="INPUT", socket_type="NodeSocketGeometry")
    ng.interface.new_socket("Geometry", in_out="OUTPUT", socket_type="NodeSocketGeometry")
    n, L = ng.nodes, ng.links.new
    gi, go = n.new("NodeGroupInput"), n.new("NodeGroupOutput")
    src = n.new("GeometryNodeObjectInfo"); src.transform_space = "RELATIVE"
    src.inputs["Object"].default_value = slat
    # Куда садятся капли: грани, смотрящие вверх (лицо спинки — z ≈ 0,24).
    # Нормаль — мировая: планка взята в осях держателя, а он в нуле мира. (На
    # самой планке нормаль была бы в её осях — у наклонённой спинки лицо
    # «смотрело вбок», и капель на нём не было, d21.)
    nrm = n.new("GeometryNodeInputNormal")
    sep = n.new("ShaderNodeSeparateXYZ"); L(nrm.outputs[0], sep.inputs[0])
    face_up = n.new("FunctionNodeCompare"); face_up.data_type = "FLOAT"; face_up.operation = "GREATER_THAN"
    face_up.inputs[1].default_value = 0.2
    L(sep.outputs["Z"], face_up.inputs[0])
    # Под стаканом капель нет: дно стоит на сухом, иначе капли прошивают его.
    cpos = n.new("GeometryNodeInputPosition")
    rel = n.new("ShaderNodeVectorMath"); rel.operation = "SUBTRACT"
    rel.inputs[1].default_value = (CUP_X, CUP_Y, 0.0)
    L(cpos.outputs[0], rel.inputs[0])
    flat = n.new("ShaderNodeVectorMath"); flat.operation = "MULTIPLY"
    flat.inputs[1].default_value = (1.0, 1.0, 0.0)
    L(rel.outputs[0], flat.inputs[0])
    rad = n.new("ShaderNodeVectorMath"); rad.operation = "LENGTH"
    L(flat.outputs[0], rad.inputs[0])
    away = n.new("FunctionNodeCompare"); away.data_type = "FLOAT"; away.operation = "GREATER_THAN"
    away.inputs[1].default_value = DROP_FREE_R
    L(rad.outputs["Value"], away.inputs[0])
    up = n.new("FunctionNodeBooleanMath"); up.operation = "AND"
    L(face_up.outputs[0], up.inputs[0]); L(away.outputs[0], up.inputs[1])
    # Острова: шум по месту → доля капель.
    pos = n.new("GeometryNodeInputPosition")
    noise = n.new("ShaderNodeTexNoise"); noise.inputs["Scale"].default_value = DROP_ISLANDS
    noise.inputs["Detail"].default_value = 3.0
    # Свой узор у каждой планки: шум и зерно раскладки — от места планки.
    me = src
    shift = n.new("ShaderNodeVectorMath"); shift.operation = "SCALE"
    shift.inputs["Scale"].default_value = 7.0
    L(me.outputs["Location"], shift.inputs[0])
    key = n.new("ShaderNodeVectorMath"); key.operation = "DOT_PRODUCT"
    key.inputs[1].default_value = (0.0, 1000.0, 1000.0)
    L(me.outputs["Location"], key.inputs[0])
    to_int = n.new("FunctionNodeFloatToInt")
    L(key.outputs["Value"], to_int.inputs[0])
    moved = n.new("ShaderNodeVectorMath"); moved.operation = "ADD"
    L(pos.outputs[0], moved.inputs[0]); L(shift.outputs[0], moved.inputs[1])
    L(moved.outputs[0], noise.inputs["Vector"])
    isl = n.new("ShaderNodeMapRange")
    # Острова резче и крупнее: плотные группы и почти сухие места.
    isl.inputs["From Min"].default_value, isl.inputs["From Max"].default_value = 0.44, 0.60
    isl.inputs["To Min"].default_value, isl.inputs["To Max"].default_value = 0.0, 1.0
    L(noise.outputs["Fac"], isl.inputs["Value"])
    dist = n.new("GeometryNodeDistributePointsOnFaces"); dist.distribute_method = "POISSON"
    dist.inputs["Distance Min"].default_value = DROP_R * 1.6
    dist.inputs["Density Max"].default_value = DROPS_DENSITY
    L(to_int.outputs[0], dist.inputs["Seed"])
    L(src.outputs["Geometry"], dist.inputs["Mesh"]); L(up.outputs[0], dist.inputs["Selection"])
    L(isl.outputs["Result"], dist.inputs["Density Factor"])
    # Размер: r ∈ [0,35..1] · DROP_R, мелких больше (r = 0,35 + 0,65·u²).
    rnd = n.new("FunctionNodeRandomValue"); rnd.data_type = "FLOAT"
    rnd.inputs["Seed"].default_value = 5
    sq = n.new("ShaderNodeMath"); sq.operation = "POWER"; sq.inputs[1].default_value = 2.0
    L(rnd.outputs["Value"], sq.inputs[0])
    sc = n.new("ShaderNodeMath"); sc.operation = "MULTIPLY_ADD"
    sc.inputs[1].default_value = 0.65 * DROP_R; sc.inputs[2].default_value = 0.35 * DROP_R
    L(sq.outputs[0], sc.inputs[0])
    # Приплюснутость своя у каждой капли (0,55–1,2 высоты купола) — одинаковые
    # полусферы читались бусинами.
    flatr = n.new("FunctionNodeRandomValue"); flatr.data_type = "FLOAT"
    flatr.inputs["Min"].default_value, flatr.inputs["Max"].default_value = 0.55, 1.2
    flatr.inputs["Seed"].default_value = 11
    hz = n.new("ShaderNodeMath"); hz.operation = "MULTIPLY"
    L(sc.outputs[0], hz.inputs[0]); L(flatr.outputs["Value"], hz.inputs[1])
    svec = n.new("ShaderNodeCombineXYZ")
    L(sc.outputs[0], svec.inputs["X"]); L(sc.outputs[0], svec.inputs["Y"]); L(hz.outputs[0], svec.inputs["Z"])
    obi = n.new("GeometryNodeObjectInfo"); obi.inputs["Object"].default_value = bead
    inst = n.new("GeometryNodeInstanceOnPoints")
    L(dist.outputs["Points"], inst.inputs["Points"]); L(obi.outputs["Geometry"], inst.inputs["Instance"])
    L(dist.outputs["Rotation"], inst.inputs["Rotation"]); L(svec.outputs[0], inst.inputs["Scale"])
    # Морось: капли 0,3–0,7 мм гуще, островами слабее крупных.
    mist = n.new("GeometryNodeDistributePointsOnFaces"); mist.distribute_method = "POISSON"
    mist.inputs["Distance Min"].default_value = MIST_R * 2.6
    mist.inputs["Density Max"].default_value = MIST_DENSITY
    L(src.outputs["Geometry"], mist.inputs["Mesh"]); L(up.outputs[0], mist.inputs["Selection"])
    mfac = n.new("ShaderNodeMath"); mfac.operation = "MULTIPLY_ADD"
    mfac.inputs[1].default_value = 0.7; mfac.inputs[2].default_value = 0.3
    L(isl.outputs["Result"], mfac.inputs[0]); L(mfac.outputs[0], mist.inputs["Density Factor"])
    mseed = n.new("ShaderNodeMath"); mseed.operation = "ADD"; mseed.inputs[1].default_value = 101.0
    L(to_int.outputs[0], mseed.inputs[0])
    L(mseed.outputs[0], mist.inputs["Seed"])
    mrnd = n.new("FunctionNodeRandomValue"); mrnd.data_type = "FLOAT"
    mrnd.inputs["Min"].default_value = 0.4 * MIST_R; mrnd.inputs["Max"].default_value = MIST_R
    minst = n.new("GeometryNodeInstanceOnPoints")
    L(mist.outputs["Points"], minst.inputs["Points"]); L(obi.outputs["Geometry"], minst.inputs["Instance"])
    L(mist.outputs["Rotation"], minst.inputs["Rotation"]); L(mrnd.outputs["Value"], minst.inputs["Scale"])
    join = n.new("GeometryNodeJoinGeometry")
    L(inst.outputs[0], join.inputs[0]); L(minst.outputs[0], join.inputs[0])
    L(join.outputs[0], go.inputs[0])
    return ng


def shape_leaf(me, width, aspect, rect, shape, bend, seed):
    """Форма сухого листа (второй разбор, п. 4): половинки подняты от главной
    жилки (одна прижата к доске), кончик завёрнут, лопасти на разной высоте.
    Жилка — главная ось маски листа (tools/prep_leaf_atlas.py)."""
    x0, y0, x1, y1 = rect
    rnd = random.Random(seed)
    cx = ((shape["centre"][0] - x0) / (x1 - x0) - 0.5) * width
    cy = (0.5 - (shape["centre"][1] - y0) / (y1 - y0)) * width * aspect
    a = math.radians(shape["axis_deg"])
    ax, ay = math.cos(a), math.sin(a)
    R = width * 0.42
    fold = 0.16 + (bend - 25.0) * 0.012            # подъём половинок от жилки
    pressed = rnd.uniform(0.2, 0.5)               # одна половинка прижата
    side = rnd.choice((-1.0, 1.0))
    curl = rnd.uniform(0.25, 0.45)                # завёрнутый кончик
    tip = rnd.choice((-1.0, 1.0))
    waves = [(rnd.uniform(18, 40), rnd.uniform(0, 2 * math.pi), rnd.uniform(0, 2 * math.pi)) for _ in range(3)]
    for v in me.vertices:
        px, py = v.co.x - cx, v.co.y - cy
        along = px * ax + py * ay
        perp = -px * ay + py * ax
        r = min(math.hypot(px, py) / R, 1.4)
        k = 1.0 if perp * side > 0 else pressed
        z = fold * k * perp * perp / R
        t = max(0.0, tip * along / R - 0.35)
        z += curl * t * t * R
        lobe = sum(0.5 + 0.5 * math.sin(f * (px * math.cos(ph) + py * math.sin(ph)) + ph2) for f, ph, ph2 in waves) / 3
        z += 0.14 * R * r * r * lobe
        v.co.z = z


def leaf(name, mat, atlas_size, rect, width, loc, yaw, bend, lift=0.0, tilt=(0.0, 0.0), raise_deg=0.0, blade=None,
         shape=None):
    """Лист из атласа: сетка по пропорции листа, изгиб вдоль жилки, лежит на опоре."""
    x0, y0, x1, y1 = rect
    W, H = atlas_size
    aspect = (y1 - y0) / (x1 - x0)
    bpy.ops.mesh.primitive_grid_add(x_subdivisions=40, y_subdivisions=40, size=1.0)
    ob = bpy.context.object
    ob.name = name
    ob.scale = (width, width * aspect, 1.0)
    bpy.ops.object.transform_apply(scale=True)
    me = ob.data
    uv = me.uv_layers.active
    for poly in me.polygons:
        for li in poly.loop_indices:
            co = me.vertices[me.loops[li].vertex_index].co
            u = (x0 + (co.x / width + 0.5) * (x1 - x0)) / W
            v = 1.0 - (y0 + (0.5 - co.y / (width * aspect)) * (y1 - y0)) / H
            uv.data[li].uv = (u, v)
    if shape:
        shape_leaf(me, width, aspect, rect, shape, bend, sum(map(ord, name)))
    else:
        # Сухой лист выгнут вдоль и чуть смят.
        mod = ob.modifiers.new("Curl", "SIMPLE_DEFORM")
        mod.deform_method = "BEND"; mod.deform_axis = "Y"; mod.angle = math.radians(bend)
    tex = bpy.data.textures.new(name + " crinkle", "CLOUDS"); tex.noise_scale = 0.02
    dis = ob.modifiers.new("Crinkle", "DISPLACE"); dis.texture = tex; dis.strength = 0.002; dis.mid_level = 0.5
    ob.rotation_euler = Euler((math.radians(tilt[0]), math.radians(tilt[1]), math.radians(yaw)))
    ob.location = loc
    bpy.context.view_layer.update()
    if raise_deg:
        # дальний край листа приподнят: вращение вокруг оси «вправо по кадру»
        _fwd, right = view_axes()
        rot = Matrix.Rotation(math.radians(raise_deg), 4, right)
        ob.matrix_world = Matrix.Translation(loc) @ rot @ Matrix.Translation(-Vector(loc)) @ ob.matrix_world
    bpy.context.view_layer.update()
    dg = bpy.context.evaluated_depsgraph_get()
    ev = ob.evaluated_get(dg)
    # Опора — сам лист, а не прозрачные поля ячейки атласа: иначе приподнятый
    # лист висел над сиденьем на невидимом углу ячейки (d13–d14).
    keep = range(len(ev.data.vertices))
    if blade:
        bx0, by0, bx1, by1 = blade
        mx, my = (bx1 - bx0) * 0.08, (by1 - by0) * 0.08
        keep = [i for i, v in enumerate(me.vertices)
                if bx0 + mx <= x0 + (v.co.x / width + 0.5) * (x1 - x0) <= bx1 - mx
                and by0 + my <= y0 + (0.5 - v.co.y / (width * aspect)) * (y1 - y0) <= by1 - my] or keep
    low = min((ob.matrix_world @ ev.data.vertices[i].co).z for i in keep)
    ob.location.z += loc[2] - low + lift
    ob.data.materials.append(mat)
    for p in ob.data.polygons:
        p.use_smooth = True
    return ob


def leaves(depth):
    import json
    info = json.load(open(os.path.join(ASSETS, "user", "leaf_atlas_boxes.json"), encoding="utf-8"))
    boxes, size, shapes = info["boxes"], tuple(info["size"]), info["shape"]
    mat = leaf_material()
    top = SEAT_Z
    obs = []
    cup = Vector((CUP_X, CUP_Y, 0.0))

    def put(name, k, width_m, dx, dy, yaw_leaf, bend, raise_deg=0.0, z=None, camera=True):
        bx = boxes[k][:4]
        # ширина листа в метрах — по рамке листа в атласе
        ob = leaf(name, mat, size, bx, width_m, (cup.x + dx, cup.y + dy, top if z is None else z),
                  yaw_leaf + VIEW_AZ - 15.0, bend, raise_deg=raise_deg, blade=bx, shape=shapes[k])
        ob["leaf_id"] = k + 1
        ob.visible_camera = camera
        obs.append(ob)
        return ob

    # Места — от обратной проекции листьев референса (camfit3) с правками
    # разбора владельца (п. 3, 7): крупный лист отодвинут от дна стакана к
    # камере (он в нерезкости), у дна видна доска; правый лист компактнее, с
    # приподнятым краем на солнце. Номера — leaf_atlas_idx.jpg.
    # (№ в атласе, ширина м, x, y от оси стакана, поворот, изгиб, подъём)
    # Второй разбор (п. 5): крупный лист ближе к стакану (вверх и вправо в
    # кадре, больше видно формы), задние — не россыпью: один у стакана слева,
    # два маленьких вместе у торца.
    plan = [
        (12, 0.105, -0.123, -0.012, -30, 30, 5),     # крупный красно-оранжевый клён слева спереди
        (1, 0.088, 0.070, -0.075, 140, 32, 8),       # оранжевый клён справа, край на солнце
        (5, 0.068, 0.000, 0.130, 70, 34, 4),         # жёлтый клён за стаканом слева
        (18, 0.045, 0.190, 0.085, 200, 34, 0),       # два маленьких у торца, вместе
        (20, 0.050, 0.215, 0.050, 95, 32, 3),
    ]
    for i, (k, w, dx, dy, yaw_leaf, bend, raise_deg) in enumerate(plan):
        put(f"Leaf seat {i + 1}", k, w, dx, dy, yaw_leaf, bend, raise_deg)
    # На земле под скамейкой и перед ней — ковёр (в кадре его даёт снимок-фон;
    # сами листья светят и отражаются).
    for i in range(70):
        put(f"Leaf ground {i + 1}", random.randrange(len(boxes)), random.uniform(0.07, 0.13),
            random.uniform(-1.7, 1.2), random.uniform(-1.4, 1.5), random.uniform(0, 360),
            random.uniform(15, 50), z=0.0, camera=False)
    return obs


def ground():
    bpy.ops.mesh.primitive_plane_add(size=16.0, location=(0, 0, 0))
    ob = bpy.context.object
    ob.name = "Ground"
    ob.data.materials.append(ground_material())
    ob.visible_camera = False
    return ob


def world(scene):
    w = bpy.data.worlds.new("Autumn park sky")
    scene.world = w
    w.use_nodes = True
    nt = w.node_tree
    nt.nodes.clear()
    out = nt.nodes.new("ShaderNodeOutputWorld")
    # Рассеянный свет неба — слабее панорамы как есть: в референсе скамейка
    # в контровом свете тёмная, а полная панорама делала эмаль мятной (d17–d19).
    bg = node(nt, "ShaderNodeBackground", Strength=WORLD_DIFFUSE)
    env = nt.nodes.new("ShaderNodeTexEnvironment")
    env.image = bpy.data.images.load(os.path.join(ASSETS, "hdri", "sunny_vondelpark_4k.hdr"))
    tc = nt.nodes.new("ShaderNodeTexCoord")
    mp = nt.nodes.new("ShaderNodeMapping")
    # Солнце панорамы — на азимуте 146° (от +X против часовой, как atan2(y, x)).
    # Mapping поворачивает вектор до выборки: солнце окажется на HDRI_SUN_AZ − θ.
    mp.inputs["Rotation"].default_value = (0.0, 0.0, math.radians(HDRI_SUN_AZ - SUN_AZ))
    link(nt, tc.outputs["Generated"], mp.inputs["Vector"])
    link(nt, mp.outputs["Vector"], env.inputs["Vector"])
    # Панорама — ранняя осень, листва жёлто-зелёная; кадр владельца — золотой.
    # Сдвиг тона к оранжевому и чуть больше насыщенности; свет теплеет вместе с ней.
    hue = node(nt, "ShaderNodeHueSaturation", Hue=0.47, Saturation=1.25, Value=1.0, Fac=1.0)
    clamp = nt.nodes.new("ShaderNodeMix"); clamp.data_type = "RGBA"; clamp.blend_type = "DARKEN"
    clamp.inputs["Factor"].default_value = 1.0; clamp.inputs[7].default_value = (SKY_CLAMP, SKY_CLAMP, SKY_CLAMP, 1.0)
    link(nt, env.outputs["Color"], clamp.inputs[6])
    link(nt, clamp.outputs[2], hue.inputs["Color"])
    warm = nt.nodes.new("ShaderNodeMix"); warm.data_type = "RGBA"; warm.blend_type = "MULTIPLY"
    warm.inputs["Factor"].default_value = 1.0; warm.inputs[7].default_value = (1.0, 0.86, 0.66, 1.0)
    link(nt, hue.outputs["Color"], warm.inputs[6])
    link(nt, warm.outputs[2], bg.inputs["Color"])
    # Лучи камеры видят снимок-фон, прочие (свет, отражения) — панораму.
    # Снимок привязан к направлению в осях камеры: кадрирование режет его как
    # фото, облёт ракурсов уносит его с камерой (фон размыт, параллакса не видно).
    vt = nt.nodes.new("ShaderNodeVectorTransform")
    vt.vector_type = "VECTOR"; vt.convert_from = "WORLD"; vt.convert_to = "CAMERA"
    link(nt, tc.outputs["Generated"], vt.inputs["Vector"])
    sep = nt.nodes.new("ShaderNodeSeparateXYZ"); link(nt, vt.outputs["Vector"], sep.inputs["Vector"])
    # В пространстве камеры Cycles взгляд — +Z (у объекта-камеры Blender −Z):
    # с −1/Z снимок выходил перевёрнутым на 180° (ковёр листьев — в небе).
    inv = nt.nodes.new("ShaderNodeMath"); inv.operation = "DIVIDE"; inv.inputs[0].default_value = 1.0
    link(nt, sep.outputs["Z"], inv.inputs[1])
    uvs = []
    for axis in ("X", "Y"):
        m = nt.nodes.new("ShaderNodeMath"); m.operation = "MULTIPLY"
        link(nt, sep.outputs[axis], m.inputs[0]); link(nt, inv.outputs[0], m.inputs[1])
        k = nt.nodes.new("ShaderNodeMath"); k.operation = "MULTIPLY_ADD"
        shift = PLATE_SHIFT[0] if axis == "X" else PLATE_SHIFT[1]
        k.inputs[1].default_value = 0.5 / PLATE_TAN; k.inputs[2].default_value = 0.5 - shift * 0.5 / PLATE_TAN
        link(nt, m.outputs[0], k.inputs[0]); uvs.append(k.outputs[0])
    comb = nt.nodes.new("ShaderNodeCombineXYZ")
    link(nt, uvs[0], comb.inputs["X"]); link(nt, uvs[1], comb.inputs["Y"])
    plate = nt.nodes.new("ShaderNodeTexImage")
    plate.image = img(os.path.join(ASSETS, "user", "user_bokeh.png"))
    plate.extension = "MIRROR"; plate.interpolation = "Cubic"
    link(nt, comb.outputs["Vector"], plate.inputs["Vector"])
    pbg = node(nt, "ShaderNodeBackground", Strength=PLATE_GAIN)
    link(nt, plate.outputs["Color"], pbg.inputs["Color"])
    # Отражения (блики лака, капли): в пределах кадра — сам снимок-фон,
    # спроецированный на сферу окружения (мокрое сиденье отражает парк за
    # скамейкой, как в референсе); вне кадра — та же тёплая панорама с низким
    # потолком яркости (небо у солнца в мокром лаке — белое зеркало, d8).
    # Зеркальное продолжение снимка за краем кадра давало мусор (d12).
    gcl = nt.nodes.new("ShaderNodeMix"); gcl.data_type = "RGBA"; gcl.blend_type = "DARKEN"
    gcl.inputs["Factor"].default_value = 1.0
    gcl.inputs[7].default_value = (GLOSSY_CLAMP, GLOSSY_CLAMP, GLOSSY_CLAMP, 1.0)
    link(nt, warm.outputs[2], gcl.inputs[6])
    # По вертикали снимок продолжен зеркально на высоту кадра: мокрое сиденье
    # внизу кадра отражает то, что выше верхнего края, — ту же золотую крону,
    # а не бледное небо панорамы (d18).
    edge = []
    for uv_axis, reach in zip(uvs, (1.0, 2.0)):
        c = nt.nodes.new("ShaderNodeMath"); c.operation = "MULTIPLY_ADD"
        c.inputs[1].default_value = 2.0 / reach; c.inputs[2].default_value = -1.0 / reach
        link(nt, uv_axis, c.inputs[0])
        a = nt.nodes.new("ShaderNodeMath"); a.operation = "ABSOLUTE"
        link(nt, c.outputs[0], a.inputs[0]); edge.append(a.outputs[0])
    far = nt.nodes.new("ShaderNodeMath"); far.operation = "MAXIMUM"
    link(nt, edge[0], far.inputs[0]); link(nt, edge[1], far.inputs[1])
    inside = node(nt, "ShaderNodeMapRange", **{"From Min": 1.0, "From Max": 0.8, "To Min": 0.0, "To Max": 1.0})
    link(nt, far.outputs[0], inside.inputs["Value"])
    ahead = nt.nodes.new("ShaderNodeMath"); ahead.operation = "GREATER_THAN"; ahead.inputs[1].default_value = 0.0
    link(nt, sep.outputs["Z"], ahead.inputs[0])
    mask = nt.nodes.new("ShaderNodeMath"); mask.operation = "MULTIPLY"
    link(nt, inside.outputs["Result"], mask.inputs[0]); link(nt, ahead.outputs[0], mask.inputs[1])
    pgain = nt.nodes.new("ShaderNodeMix"); pgain.data_type = "RGBA"; pgain.blend_type = "MULTIPLY"
    pgain.inputs["Factor"].default_value = 1.0
    pgain.inputs[7].default_value = (PLATE_REFLECT, PLATE_REFLECT, PLATE_REFLECT, 1.0)
    link(nt, plate.outputs["Color"], pgain.inputs[6])
    genv = nt.nodes.new("ShaderNodeMix"); genv.data_type = "RGBA"
    link(nt, mask.outputs[0], genv.inputs["Factor"])
    link(nt, gcl.outputs[2], genv.inputs[6]); link(nt, pgain.outputs[2], genv.inputs[7])
    rbg = node(nt, "ShaderNodeBackground", Strength=REFLECT_GAIN)
    link(nt, genv.outputs[2], rbg.inputs["Color"])
    lp = nt.nodes.new("ShaderNodeLightPath")
    glossy = nt.nodes.new("ShaderNodeMixShader")
    link(nt, lp.outputs["Is Glossy Ray"], glossy.inputs["Fac"])
    link(nt, bg.outputs[0], glossy.inputs[1]); link(nt, rbg.outputs[0], glossy.inputs[2])
    mixw = nt.nodes.new("ShaderNodeMixShader")
    link(nt, lp.outputs["Is Camera Ray"], mixw.inputs["Fac"])
    link(nt, glossy.outputs[0], mixw.inputs[1]); link(nt, pbg.outputs[0], mixw.inputs[2])
    link(nt, mixw.outputs[0], out.inputs["Surface"])
    return w


def cup_hero(depth):
    """Заглушка эталона на средней планке — движок уберёт её и поставит стакан."""
    y = CUP_Y
    bpy.ops.mesh.primitive_cone_add(vertices=64, radius1=REF_BOT / 2, radius2=REF_TOP / 2, depth=REF_H,
                                    location=(CUP_X, y, SEAT_Z + REF_H / 2))
    ob = bpy.context.object
    ob.name = "CUP_HERO"
    return ob, Vector((CUP_X, y, SEAT_Z))


def view_axes():
    """Взгляд камеры по полу (правее +Y на CAM_YAW) и «вправо по кадру»."""
    yaw = math.radians(CAM_YAW)
    return Vector((math.sin(yaw), math.cos(yaw), 0.0)), Vector((math.cos(yaw), -math.sin(yaw), 0.0))


def camera(scene, base):
    cam_data = bpy.data.cameras.new("CAM_MAIN")
    cam_data.lens = LENS
    cam_data.sensor_width = 36.0
    cam_data.dof.use_dof = True
    cam_data.dof.aperture_fstop = FSTOP
    cam_data.dof.aperture_blades = 9
    cam_data.dof.aperture_rotation = math.radians(10)
    cam = bpy.data.objects.new("CAM_MAIN", cam_data)
    scene.collection.objects.link(cam)
    target = base + Vector((0.0, 0.0, REF_H * 0.5 + AIM))
    view, _right = view_axes()
    cam.location = target - view * CAM_DIST + Vector((0.0, 0.0, CAM_UP))
    d = target - cam.location
    cam.rotation_euler = d.to_track_quat("-Z", "Y").to_euler()
    cam_data.dof.focus_distance = (target - cam.location).length - REF_TOP / 2
    scene.camera = cam
    return cam


def sun_lamp():
    """Солнце: азимут и высота как у солнца в фоне-снимке (справа сверху кадра)."""
    sun = bpy.data.lights.new("Sun", "SUN")
    sun.energy = SUN_STRENGTH
    sun.color = SUN_COLOR
    sun.angle = math.radians(0.8)
    # Контровое солнце в мокрой плёнке — белая «простыня» на передней планке
    # (v3a): в отражениях солнце слабее, объём, тени и просвет листьев — полные.
    sun.specular_factor = SUN_SPECULAR
    ob = bpy.data.objects.new("Sun", sun)
    bpy.context.scene.collection.objects.link(ob)
    az, el = math.radians(SUN_AZ), math.radians(SUN_ELEV)
    to_sun = Vector((math.cos(az) * math.cos(el), math.sin(az) * math.cos(el), math.sin(el)))
    ob.rotation_euler = (-to_sun).to_track_quat("-Z", "Y").to_euler()
    return ob


def fill_light(base):
    """Отражатель сбоку-слева (~65° от оси взгляда) — главный свет на печати:
    левая боковина светлее, середина и правый край темнее, контровое солнце
    даёт кромку справа (разбор владельца, п. 1; серый стакан в v3b–v3c был
    ровным при отражателе почти по оси). Тёплый: белое — кремовое, зелень
    печати не «неоновая» (п. 2)."""
    light = bpy.data.lights.new("Fill reflector", "AREA")
    light.shape = "RECTANGLE"; light.size = 0.6; light.size_y = 0.5
    light.energy = FILL_W
    light.color = (1.0, 0.85, 0.68)
    ob = bpy.data.objects.new("Fill reflector", light)
    bpy.context.scene.collection.objects.link(ob)
    view, right = view_axes()
    ob.location = base - view * 0.42 - right * 0.85 + Vector((0.0, 0.0, 0.28))
    ob.rotation_euler = ((base + Vector((0, 0, 0.07))) - ob.location).to_track_quat("-Z", "Y").to_euler()
    # Как белый щит фотографа: светит, но в мокром лаке огромным окном не отражается.
    ob.visible_glossy = False
    ob.visible_camera = False
    return ob


def camera_fill(base):
    """Большое слабое заполнение со стороны камеры, чуть правее: правая
    сторона стакана — не почти чёрная, конец надписи и сердечко читаются, а
    переход света по корпусу остаётся (второй разбор, п. 1). В мокрых
    досках не отражается."""
    light = bpy.data.lights.new("Camera fill", "AREA")
    light.shape = "RECTANGLE"; light.size = 1.4; light.size_y = 1.0
    light.energy = CAM_FILL_W
    light.color = (1.0, 0.92, 0.82)
    ob = bpy.data.objects.new("Camera fill", light)
    bpy.context.scene.collection.objects.link(ob)
    view, right = view_axes()
    target = base + Vector((0.0, 0.0, 0.06))
    ob.location = target - view * 0.9 + right * 0.3 + Vector((0.0, 0.0, 0.15))
    ob.rotation_euler = (target - ob.location).to_track_quat("-Z", "Y").to_euler()
    ob.visible_glossy = False
    ob.visible_camera = False
    return ob


def main() -> int:
    scene = reset()
    paint, iron = planks_material(), metal_material()
    parts, depth = bench(paint, iron)
    drops_coll, n_drops = drops(parts, water_material())
    print(f"### park: капли на {n_drops} планках")
    ground()
    leaves(depth)
    world(scene)
    hero, base = cup_hero(depth)
    camera(scene, base)
    fill_light(base)
    camera_fill(base)
    sun_lamp()
    # Фон-снимок для камеры подкладывается после рендера (bk/plate.py): через мир
    # сцены диафрагма размыла бы уже размытый снимок второй раз.
    scene["cups_plate"] = bpy.path.relpath(os.path.join(ASSETS, "user", "user_bokeh_4k.png"), start=os.path.dirname(OUT))
    scene["cups_plate_tan"] = PLATE_TAN
    scene["cups_plate_shift"] = list(PLATE_SHIFT)
    scene["cups_plate_gain"] = PLATE_GAIN
    # Фон спокойнее (второй разбор, п. 6): чуть меньше насыщенность и
    # контраст, самые яркие пятна боке прижаты — взгляд сначала на стакан.
    scene["cups_plate_sat"] = 0.86
    scene["cups_plate_contrast"] = 0.9
    scene["cups_plate_knee"] = 0.82
    scene.view_settings.view_transform = "Khronos PBR Neutral"
    scene.view_settings.exposure = 0.0
    for im in bpy.data.images:
        if im.source == "FILE":
            im.filepath = bpy.path.relpath(im.filepath, start=os.path.dirname(OUT))
    bpy.ops.wm.save_as_mainfile(filepath=OUT, relative_remap=True)
    print(f"### park: {OUT}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
