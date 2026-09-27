"""Сцена «Осенний парк» (park): мокрая скамейка, клёны, низкое солнце.

    blender -b --factory-startup -P engine/tools/build_park.py

Собирает render/scenes/park.blend — фон для run.py (sets/park.json, "blend").
Реальный масштаб, метры. Стакан ставит движок на место заглушки CUP_HERO
(конус эталона BM90-500), как у фонов из 4.blend.

Ассеты (CC0, render/scenes/assets/park/, список — render/assets.json):
- панорама sunny_vondelpark 4K (Poly Haven) — осенний парк, солнце 12° над
  горизонтом сквозь крону: свет, отражения мокрой краски, фон в размытии;
- доски green_rough_planks, металл green_metal_rust, земля leaves_forest_ground
  (Poly Haven, 4K / 2K);
- листья — сканы LeafSet027 и LeafSet028 (ambientCG, 4K): цвет, прозрачность,
  нормали, просвет (Scattering) — контровое солнце светит сквозь лист;
- user/ — текстуры и референс владельца (2026-09-27).

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
# подогнаны по линиям референса (camfit3: кромки двух планок спинки и её
# конец, кромки трёх планок сиденья, венчик и дно DW90-430) — обе группы линий
# сходятся к одной точке схода справа за кадром; ошибка по линиям до 10 px,
# по стакану до 24 px (у AI стакан чуть приземистее DW90-430).
SEAT_Z = 0.45                     # верх сиденья, м
SLAT_T = 0.032                    # толщина планок
SEAT_SLATS = 3                    # передняя, под стаканом, дальняя
SEAT_SLAT_W = 0.1200             # широкие планки, как в референсе
SEAT_GAP = 0.0340
CUP_OFF = 0.0499                # ось стакана за передней кромкой его планки
CUP_X, CUP_Y = 0.10, 0.0          # место стакана; сиденье строится от него
SEAT_Y0 = CUP_Y - CUP_OFF - SEAT_GAP - SEAT_SLAT_W   # передняя кромка сиденья
SEAT_DEPTH = SEAT_SLATS * SEAT_SLAT_W + (SEAT_SLATS - 1) * SEAT_GAP
BENCH_X = (-1.45, 1.05)           # скамейка вдоль X; справа сиденье уходит за край кадра
BENCH_LEN = BENCH_X[1] - BENCH_X[0]
BACK_SLATS = 2
BACK_TILT = 14.0                  # наклон спинки назад, °
# Спинка: две планки по 74 мм через 30 мм, верх в 25 см над сиденьем,
# лицо спинки у сиденья — в 30 см за осью стакана.
BACK_SLAT_W, BACK_GAP, BACK_TOP = 0.0742, 0.0295, 0.2458
BACK_DY = 0.3000
BACK_END_DX = 0.3264      # конец спинки правее стакана вдоль скамейки
REF_H, REF_TOP, REF_BOT = 0.1353, 0.089, 0.057   # эталон BM90-500
CAM_YAW = 49.889                  # взгляд правее оси +Y на столько, °
CAM_DIST = 0.3884                # по полу от цели до камеры, м
CAM_UP = -0.0005                    # камера над целью, м
AIM = 0.0075                      # цель над центром эталона, м
# Фон — подложенный снимок (bk/plate.py), диафрагма размывает только
# геометрию. Фокус сцены — на 4 см ближе стакана (sets/park.json,
# focus_pull_m): передний лист резкий, капли на спинке — небольшие кружки
# боке (f/5.6 размывала спинку в кашу, d24; f/14 — искры точками, d23).
LENS, FSTOP = 50.00, 11.0
# Солнце — в кадре справа сверху: 14.6° правее и 18° выше оси взгляда.
SUN_AZ = 25.5
# Лампа выше солнца снимка (18°): зеркальный блик солнца в плёнке воды на
# сиденье ложится на столько же ниже горизонта — при 18° он попадал в кадр и
# давал яркость ~30 (белая простыня на передней планке, d16); при 30° он за
# нижним краем кадра (24° — у самого края, ореол блика заходит в кадр снизу
# справа, как в референсе). Размытый снимок расхождения не выдаёт.
SUN_ELEV = 24.0
# Фон для камеры — снимок владельца (user_bokeh.png): золотое боке, стволы,
# солнце справа сверху. Размыт уже в снимке. Снимок = кадр референса для
# DW90-430: полуширина — тангенс кадра объектива, центр — со сдвигом кадра
# DW90-430 относительно эталона (frame.single).
PLATE_TAN = 0.3600
PLATE_SHIFT = (-0.0000, -0.0305)
PLATE_GAIN = 1.0
# Свет: солнце — отдельная лампа (резкие искры в каплях, тени), из панорамы
# оно срезано (SKY_CLAMP), панорама даёт только небо и отражённый свет.
SUN_STRENGTH = 3.5                # Вт/м²
SUN_COLOR = (1.0, 0.80, 0.58)     # ~3300 K, золотой час
SKY_CLAMP = 25.0                  # всё ярче — солнце панорамы, его заменяет лампа
REFLECT_GAIN = 1.0                # яркость панорамы в отражениях
WORLD_DIFFUSE = 0.55              # панорама в рассеянном свете
GLOSSY_CLAMP = 0.5                # потолок панорамы в отражениях (солнце и небо у него)
PLATE_REFLECT = 0.35              # снимок-фон в отражениях (солнце в нём — белое пятно)
PAINT = (0.011, 0.050, 0.045, 1.0)  # эмаль, линейный цвет
# Нарисованный блик капли (water_material): узость (степень) и яркость. Кружок
# боке 10–13 px на спинке требует энергии блика ~65 px·ед. — яркость ~100.
GLINT_EXP, GLINT_GAIN = 400.0, 160.0
KEY_STRENGTH, KEY_ELEV, KEY_SIDE = 1.6, 38.0, 35.0   # «второе солнце»: Вт/м², высота °, левее оси °
BOUNCE_W = 400.0                  # тёплый отражённый свет листвы сверху-спереди, Вт
HDRI_SUN_AZ = -34.0               # солнце в панораме (Cycles: u = 0.5 − atan2(y, x) / 2π)
# Листья на сиденье: обратная проекция центров листьев референса той же
# камерой; поворот листа задан относительно взгляда камеры.
# Капли: плотность на м² (островами — половина площади сухая) и радиус.
DROPS_DENSITY, DROP_R, DROP_ISLANDS = 30000.0, 0.0021, 9.0
MIST_DENSITY, MIST_R = 90000.0, 0.0007
VIEW_AZ = 40.11                   # азимут взгляда (atan2), °
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


def droplets(nt, scale, size, mask_scale, coverage):
    """Капли дождя на лаке: полусферы по ячейкам Вороного, островами."""
    tc = nt.nodes.new("ShaderNodeTexCoord")
    vor = nt.nodes.new("ShaderNodeTexVoronoi")
    vor.feature = "F1"
    vor.inputs["Scale"].default_value = scale
    vor.inputs["Randomness"].default_value = 1.0
    link(nt, tc.outputs["Object"], vor.inputs["Vector"])
    # Разный размер капель: радиус из цвета ячейки.
    r = node(nt, "ShaderNodeMapRange", **{"From Min": 0.0, "From Max": 1.0, "To Min": size * 0.45, "To Max": size})
    sep = nt.nodes.new("ShaderNodeSeparateColor")
    link(nt, vor.outputs["Color"], sep.inputs["Color"])
    link(nt, sep.outputs[0], r.inputs["Value"])
    d = nt.nodes.new("ShaderNodeMath"); d.operation = "DIVIDE"
    link(nt, vor.outputs["Distance"], d.inputs[0]); link(nt, r.outputs["Result"], d.inputs[1])
    one = nt.nodes.new("ShaderNodeMath"); one.operation = "SUBTRACT"; one.inputs[0].default_value = 1.0
    sq = nt.nodes.new("ShaderNodeMath"); sq.operation = "POWER"; sq.inputs[1].default_value = 2.0
    link(nt, d.outputs[0], sq.inputs[0]); link(nt, sq.outputs[0], one.inputs[1])
    cap = nt.nodes.new("ShaderNodeMath"); cap.operation = "MAXIMUM"; cap.inputs[1].default_value = 0.0
    link(nt, one.outputs[0], cap.inputs[0])
    dome = nt.nodes.new("ShaderNodeMath"); dome.operation = "SQRT"
    link(nt, cap.outputs[0], dome.inputs[0])
    # Острова: где капли есть, где стекло.
    noise = node(nt, "ShaderNodeTexNoise", Scale=mask_scale, Detail=3.0)
    link(nt, tc.outputs["Object"], noise.inputs["Vector"])
    isl = node(nt, "ShaderNodeMapRange", **{"From Min": 1.0 - coverage - 0.08, "From Max": 1.0 - coverage + 0.08,
                                             "To Min": 0.0, "To Max": 1.0})
    link(nt, noise.outputs["Fac"], isl.inputs["Value"])
    h = nt.nodes.new("ShaderNodeMath"); h.operation = "MULTIPLY"
    link(nt, dome.outputs[0], h.inputs[0]); link(nt, isl.outputs["Result"], h.inputs[1])
    return h.outputs[0], tc


def planks_material():
    """Лак бутылочного цвета поверх дерева, сколы до дерева, мокрый, в каплях."""
    m, nt, b = principled("Park bench paint")
    base = os.path.join(ASSETS, "planks")
    uv = nt.nodes.new("ShaderNodeUVMap")
    diff = nt.nodes.new("ShaderNodeTexImage"); diff.image = img(os.path.join(base, "green_rough_planks_diff_4k.jpg"))
    rough = nt.nodes.new("ShaderNodeTexImage"); rough.image = img(os.path.join(base, "green_rough_planks_rough_4k.jpg"), False)
    nor = nt.nodes.new("ShaderNodeTexImage"); nor.image = img(os.path.join(base, "green_rough_planks_nor_gl_4k.jpg"), False)
    for t in (diff, rough, nor):
        link(nt, uv.outputs["UV"], t.inputs["Vector"])
    # Сколы: в текстуре — светлый грунт (яркий, бесцветный); у нас под ними дерево.
    hsv = nt.nodes.new("ShaderNodeSeparateColor"); hsv.mode = "HSV"
    link(nt, diff.outputs["Color"], hsv.inputs["Color"])
    chip = node(nt, "ShaderNodeMapRange", **{"From Min": 0.56, "From Max": 0.66, "To Min": 0.0, "To Max": 1.0})
    link(nt, hsv.outputs[2], chip.inputs["Value"])
    # Краска — глубокий зелёный с вариацией яркости текстуры.
    shade = node(nt, "ShaderNodeMapRange", **{"From Min": 0.25, "From Max": 0.5, "To Min": 0.75, "To Max": 1.15})
    link(nt, hsv.outputs[2], shade.inputs["Value"])
    paint = nt.nodes.new("ShaderNodeMix"); paint.data_type = "RGBA"; paint.blend_type = "MULTIPLY"
    paint.inputs["Factor"].default_value = 1.0
    # Тёмная бирюзово-зелёная эмаль: в тёплом свете зелёная без бирюзы уходит
    # в оливу (черновик d11 — (32, 28, 4) против (54, 73, 60) у референса).
    paint.inputs[6].default_value = PAINT
    link(nt, shade.outputs["Result"], paint.inputs[7])
    # В сколах — мокрое потемневшее дерево и ржавый грунт: светлое сухое
    # дерево читалось царапинами мела (d20).
    wood = (0.055, 0.030, 0.016, 1.0)
    mix = nt.nodes.new("ShaderNodeMix"); mix.data_type = "RGBA"
    link(nt, chip.outputs["Result"], mix.inputs["Factor"])
    link(nt, paint.outputs[2], mix.inputs[6]); mix.inputs[7].default_value = wood
    link(nt, mix.outputs[2], b.inputs["Base Color"])
    # Лак блестит, дерево в сколах матовое.
    r = node(nt, "ShaderNodeMapRange", **{"From Min": 0.0, "From Max": 1.0, "To Min": 0.42, "To Max": 0.8})
    link(nt, chip.outputs["Result"], r.inputs["Value"])
    link(nt, r.outputs["Result"], b.inputs["Roughness"])
    nmap = node(nt, "ShaderNodeNormalMap", Strength=1.0)
    link(nt, nor.outputs["Color"], nmap.inputs["Color"])
    # Мелкая морось между каплями — рельефом; сами капли — геометрия (drops()).
    drops, _tc = droplets(nt, 900.0, 0.45, 14.0, 0.55)
    bump = node(nt, "ShaderNodeBump", Strength=0.35, Distance=0.0004)
    link(nt, drops, bump.inputs["Height"]); link(nt, nmap.outputs["Normal"], bump.inputs["Normal"])
    link(nt, bump.outputs["Normal"], b.inputs["Normal"])
    # Мокрая плёнка: лак покрыт водой, капли — выпуклые линзы в ней.
    # Плёнка воды пятнами: где лужица — зеркало, где подсохло — атлас. Сплошное
    # зеркало давало белое отражение стакана и неба (черновик d11).
    wet = node(nt, "ShaderNodeTexNoise", Scale=6.0, Detail=4.0, Roughness=0.6)
    link(nt, _tc.outputs["Object"], wet.inputs["Vector"])
    # Мокрая краска: вода заполняет шероховатость — свой блик эмали почти
    # пропадает (граница краска/вода вместо краска/воздух), блестит плёнка.
    # Шершавый блик эмали давал бледную «атласную» простыню на всём сиденье (d15).
    # Разложение d22 (диагностика выключением): 0,37 из 0,6 яркости передней
    # планки — широкий блик солнца в шершавой эмали; под водой его почти нет.
    b.inputs["Specular IOR Level"].default_value = 0.05
    # Плёнка — не зеркало во всю планку (d20: бежевое зеркало кроны на
    # передней планке): эмаль видна, блеск — пятнами и в каплях.
    cw = node(nt, "ShaderNodeMapRange", **{"From Min": 0.3, "From Max": 0.7, "To Min": 0.2, "To Max": 0.6})
    link(nt, wet.outputs["Fac"], cw.inputs["Value"]); link(nt, cw.outputs["Result"], b.inputs["Coat Weight"])
    cr = node(nt, "ShaderNodeMapRange", **{"From Min": 0.3, "From Max": 0.7, "To Min": 0.12, "To Max": 0.04})
    link(nt, wet.outputs["Fac"], cr.inputs["Value"]); link(nt, cr.outputs["Result"], b.inputs["Coat Roughness"])
    b.inputs["Coat IOR"].default_value = 1.33
    cbump = node(nt, "ShaderNodeBump", Strength=0.35, Distance=0.0004)
    link(nt, drops, cbump.inputs["Height"])
    link(nt, cbump.outputs["Normal"], b.inputs["Coat Normal"])
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
    b.inputs["Coat Roughness"].default_value = 0.05
    drops, _tc = droplets(nt, 300.0, 0.42, 7.0, 0.5)
    cbump = node(nt, "ShaderNodeBump", Strength=1.0, Distance=0.0012)
    link(nt, drops, cbump.inputs["Height"]); link(nt, cbump.outputs["Normal"], b.inputs["Coat Normal"])
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


def leaf_material(atlas):
    """Лист-скан: цвет, вырез, нормали, просвет на контровом солнце, влажный."""
    base = os.path.join(ASSETS, "leaves", atlas, f"{atlas}_4K-JPG_")
    m = bpy.data.materials.new(f"Leaf {atlas}")
    m.use_nodes = True
    nt = m.node_tree
    nt.nodes.clear()
    out = nt.nodes.new("ShaderNodeOutputMaterial")
    uv = nt.nodes.new("ShaderNodeUVMap")
    tex = {}
    for k, c in (("Color", True), ("Opacity", False), ("NormalGL", False), ("Roughness", False), ("Scattering", True)):
        t = nt.nodes.new("ShaderNodeTexImage"); t.image = img(base + k + ".jpg", c)
        link(nt, uv.outputs["UV"], t.inputs["Vector"]); tex[k] = t
    b = nt.nodes.new("ShaderNodeBsdfPrincipled")
    # Сканы — свежая осень, зелень с розовым; в референсе листья сухие,
    # рыже-коричневые: тон к оранжевому, зелень гасится, темнее.
    # Поворот оттенка давал розовый (черновик d11) — вместо него градиент по
    # яркости скана: тёмное — бурое, среднее — ржаво-оранжевое, светлое — охра.
    # Прожилки и пятна скана сохраняются, цвет — как у листьев владельца.
    lum = nt.nodes.new("ShaderNodeRGBToBW")
    link(nt, tex["Color"].outputs["Color"], lum.inputs["Color"])
    info = nt.nodes.new("ShaderNodeObjectInfo")
    jit = node(nt, "ShaderNodeMapRange", **{"From Min": 0.0, "From Max": 1.0, "To Min": -0.08, "To Max": 0.08})
    link(nt, info.outputs["Random"], jit.inputs["Value"])
    t = nt.nodes.new("ShaderNodeMath"); t.operation = "ADD"; t.use_clamp = True
    link(nt, lum.outputs[0], t.inputs[0]); link(nt, jit.outputs["Result"], t.inputs[1])
    ramp = nt.nodes.new("ShaderNodeValToRGB")
    els = ramp.color_ramp.elements
    stops = [(0.05, (0.020, 0.006, 0.002)), (0.22, (0.10, 0.025, 0.005)), (0.38, (0.30, 0.085, 0.012)),
             (0.55, (0.50, 0.19, 0.025)), (0.75, (0.62, 0.34, 0.050))]
    els[0].position, els[0].color = stops[0][0], (*stops[0][1], 1.0)
    els[1].position, els[1].color = stops[-1][0], (*stops[-1][1], 1.0)
    for pos, col in stops[1:-1]:
        e = els.new(pos); e.color = (*col, 1.0)
    link(nt, t.outputs[0], ramp.inputs["Fac"])
    link(nt, ramp.outputs["Color"], b.inputs["Base Color"])
    # Сухой лист матовый: с шероховатостью скана как есть лист на мокрой
    # скамейке блестел медной фольгой (d20).
    lr = node(nt, "ShaderNodeMapRange", **{"From Min": 0.0, "From Max": 1.0, "To Min": 0.55, "To Max": 0.9})
    link(nt, tex["Roughness"].outputs["Color"], lr.inputs["Value"]); link(nt, lr.outputs["Result"], b.inputs["Roughness"])
    nmap = node(nt, "ShaderNodeNormalMap", Strength=0.6); link(nt, tex["NormalGL"].outputs["Color"], nmap.inputs["Color"])
    link(nt, nmap.outputs["Normal"], b.inputs["Normal"])
    # Сухой лист матовый: лак на нём ловил небо у солнца, и лист белел.
    b.inputs["Specular IOR Level"].default_value = 0.15
    trans = nt.nodes.new("ShaderNodeBsdfTranslucent")
    link(nt, ramp.outputs["Color"], trans.inputs["Color"])
    mix = nt.nodes.new("ShaderNodeMixShader"); mix.inputs["Fac"].default_value = 0.12
    link(nt, b.outputs[0], mix.inputs[1]); link(nt, trans.outputs[0], mix.inputs[2])
    clear = nt.nodes.new("ShaderNodeBsdfTransparent")
    cut = nt.nodes.new("ShaderNodeMixShader")
    link(nt, tex["Opacity"].outputs["Color"], cut.inputs["Fac"])
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


def board_uv(ob, board, length, along="X"):
    """Развёртка планки на одну доску текстуры: вдоль — волокно, поперёк — своя доска.

    В green_rough_planks доски лежат полосами; планка берёт одну целиком, без
    шва посредине. Вдоль доски текстура растянута вдвое: сколы и так вытянуты
    по волокну, а повтор реже."""
    boards = [(0.02, 0.15), (0.17, 0.32), (0.34, 0.53), (0.55, 0.73), (0.76, 0.93)]
    v0, v1 = boards[board % len(boards)]
    me = ob.data
    uv = me.uv_layers.new(name="UVMap")
    size = ob.dimensions
    u_off = random.random()
    for poly in me.polygons:
        for li in poly.loop_indices:
            co = me.vertices[me.loops[li].vertex_index].co
            lx, wy, wsize = (co.x, co.y, size.y) if along == "X" else (co.y, co.x, size.x)
            u = u_off + (lx + length / 2) / 0.7
            # поперёк: и ширина, и толщина идут в высоту доски — рёбра продолжают лицо
            t = (wy / wsize + 0.5) * 0.8 + (co.z / size.z + 0.5) * 0.2
            uv.data[li].uv = (u, 1.0 - (v0 + (v1 - v0) * min(max(t, 0.0), 1.0)))


MID = (BENCH_X[0] + BENCH_X[1]) / 2
# Спинка кончается за стаканом, сиденье идёт дальше вправо (референс).
BACK_END = CUP_X + BACK_END_DX
BACK_LEN = BACK_END - BENCH_X[0]
BACK_MID = (BENCH_X[0] + BACK_END) / 2
SUPPORTS = (BENCH_X[0] + 0.12, -0.60, BACK_END - 0.05, BENCH_X[1] - 0.12)


def back_face_y(zc):
    """Лицо спинки на высоте zc над сиденьем (наклон назад)."""
    return CUP_Y + BACK_DY + zc * math.tan(math.radians(BACK_TILT))


def bench(paint, iron):
    """Скамейка как в референсе: продольные широкие планки сиденья и спинки,
    чугунные опоры. Спинка кончается за стаканом, сиденье идёт дальше вправо.

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
    """Вода капель + нарисованный блик. Честный блик капли несёт ~1 % света её
    пятна: в размытии диафрагмы он гаснет, шумодав стирает точки (d26). В
    референсе (AI) капли — яркие искры и кружки боке. Блик — по полувектору
    к «второму солнцу» (key_light): есть только на каплях и ничего не
    освещает. (Связь света не годится: в Cycles она протекает сквозь
    прозрачную каплю — краска под ней светилась бирюзой, d27–d28.)"""
    m, nt, b = principled("Rain water")
    b.inputs["Base Color"].default_value = (1.0, 1.0, 1.0, 1.0)
    b.inputs["Roughness"].default_value = 0.0
    b.inputs["IOR"].default_value = 1.333
    b.inputs["Transmission Weight"].default_value = 1.0
    out = nt.nodes["Material Output"]
    geo = nt.nodes.new("ShaderNodeNewGeometry")
    to_light = key_direction()
    h = nt.nodes.new("ShaderNodeVectorMath"); h.operation = "ADD"
    h.inputs[1].default_value = tuple(to_light)
    link(nt, geo.outputs["Incoming"], h.inputs[0])
    hn = nt.nodes.new("ShaderNodeVectorMath"); hn.operation = "NORMALIZE"
    link(nt, h.outputs[0], hn.inputs[0])
    d = nt.nodes.new("ShaderNodeVectorMath"); d.operation = "DOT_PRODUCT"
    link(nt, geo.outputs["Normal"], d.inputs[0]); link(nt, hn.outputs[0], d.inputs[1])
    pos = nt.nodes.new("ShaderNodeMath"); pos.operation = "MAXIMUM"; pos.inputs[1].default_value = 0.0
    link(nt, d.outputs["Value"], pos.inputs[0])
    pw = nt.nodes.new("ShaderNodeMath"); pw.operation = "POWER"; pw.inputs[1].default_value = GLINT_EXP
    link(nt, pos.outputs[0], pw.inputs[0])
    # Не у всех капель искра одинакова (форма, плёнка): яркость — от случайного
    # числа капли, у трети блика нет. Ровная россыпь белых точек выглядела
    # узором (d29). Цвет — золотой, как у искр референса.
    info = nt.nodes.new("ShaderNodeObjectInfo")
    vary = node(nt, "ShaderNodeMapRange", **{"From Min": 0.35, "From Max": 1.0, "To Min": 0.0, "To Max": 1.0})
    link(nt, info.outputs["Random"], vary.inputs["Value"])
    vary2 = nt.nodes.new("ShaderNodeMath"); vary2.operation = "POWER"; vary2.inputs[1].default_value = 2.0
    link(nt, vary.outputs["Result"], vary2.inputs[0])
    gain = nt.nodes.new("ShaderNodeMath"); gain.operation = "MULTIPLY"; gain.inputs[1].default_value = GLINT_GAIN
    link(nt, pw.outputs[0], gain.inputs[0])
    gv = nt.nodes.new("ShaderNodeMath"); gv.operation = "MULTIPLY"
    link(nt, gain.outputs[0], gv.inputs[0]); link(nt, vary2.outputs[0], gv.inputs[1])
    gain = gv
    em = nt.nodes.new("ShaderNodeEmission"); em.inputs["Color"].default_value = (1.0, 0.78, 0.48, 1.0)
    link(nt, gain.outputs[0], em.inputs["Strength"])
    add = nt.nodes.new("ShaderNodeAddShader")
    link(nt, b.outputs[0], add.inputs[0]); link(nt, em.outputs[0], add.inputs[1])
    link(nt, add.outputs[0], out.inputs["Surface"])
    # 100 тыс. светящихся капель — не источники света: иначе они в дереве
    # источников и считаются дольше, а светить им нечего.
    m.cycles.emission_sampling = "NONE"
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
    up = n.new("FunctionNodeCompare"); up.data_type = "FLOAT"; up.operation = "GREATER_THAN"
    up.inputs[1].default_value = 0.2
    L(sep.outputs["Z"], up.inputs[0])
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
    isl.inputs["From Min"].default_value, isl.inputs["From Max"].default_value = 0.38, 0.58
    isl.inputs["To Min"].default_value, isl.inputs["To Max"].default_value = 0.15, 1.0
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
    obi = n.new("GeometryNodeObjectInfo"); obi.inputs["Object"].default_value = bead
    inst = n.new("GeometryNodeInstanceOnPoints")
    L(dist.outputs["Points"], inst.inputs["Points"]); L(obi.outputs["Geometry"], inst.inputs["Instance"])
    L(dist.outputs["Rotation"], inst.inputs["Rotation"]); L(sc.outputs[0], inst.inputs["Scale"])
    # Морось: капли 0,3–0,7 мм гуще и без островов — россыпь искр по всей
    # поверхности, как в референсе (крупные капли её не дают).
    mist = n.new("GeometryNodeDistributePointsOnFaces"); mist.distribute_method = "POISSON"
    mist.inputs["Distance Min"].default_value = MIST_R * 2.6
    mist.inputs["Density Max"].default_value = MIST_DENSITY
    L(src.outputs["Geometry"], mist.inputs["Mesh"]); L(up.outputs[0], mist.inputs["Selection"])
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


def leaf(name, mat, atlas_size, rect, width, loc, yaw, bend, lift=0.0, tilt=(0.0, 0.0), raise_deg=0.0, blade=None):
    """Лист из атласа: сетка по пропорции листа, изгиб вдоль, лежит на опоре."""
    x0, y0, x1, y1 = rect
    W, H = atlas_size
    aspect = (y1 - y0) / (x1 - x0)
    bpy.ops.mesh.primitive_grid_add(x_subdivisions=24, y_subdivisions=24, size=1.0)
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
    # Сухой лист выгнут вдоль и чуть смят.
    mod = ob.modifiers.new("Curl", "SIMPLE_DEFORM")
    mod.deform_method = "BEND"; mod.deform_axis = "Y"; mod.angle = math.radians(bend)
    tex = bpy.data.textures.new(name + " crinkle", "CLOUDS"); tex.noise_scale = 0.02
    dis = ob.modifiers.new("Crinkle", "DISPLACE"); dis.texture = tex; dis.strength = 0.004; dis.mid_level = 0.5
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
    boxes = json.load(open(os.path.join(ASSETS, "leaves", "boxes.json")))
    m27, m28 = leaf_material("LeafSet027"), leaf_material("LeafSet028")
    # Листья — по ячейкам сетки атласа (027: 3×3, 028: 4×4): контуры по
    # прозрачности теряли тонкие черешки. Номер — порядок контуров в boxes.json.
    def cells(bx, cols, rows, W, H):
        cw, ch = W / cols, H / rows
        return [[int(b[0] // cw * cw), int(b[1] // ch * ch), int((b[0] // cw + 1) * cw), int((b[1] // ch + 1) * ch)]
                for b in bx]
    sets = {"27": (m27, (4096, 4096), cells(boxes["LeafSet027"], 3, 3, 4096, 4096), boxes["LeafSet027"]),
            "28": (m28, (4096, 2048), cells(boxes["LeafSet028"], 4, 4, 4096, 2048), boxes["LeafSet028"])}
    top = SEAT_Z
    obs = []
    # Места листьев — от стакана в осях камеры (вправо по кадру, вглубь), вне
    # места стаканов (±0.17 м вправо-влево, вся глубина за стаканом свободна до
    # спинки) и не между камерой и стаканом.
    cup = Vector((CUP_X, CUP_Y, 0.0))
    # Места — обратная проекция центров листьев референса на сиденье той же
    # камерой (camfit3): x, y от оси стакана, м; размер — по размеру в кадре.
    # Поворот листа — от взгляда камеры (0° — черешок к камере).
    # (атлас, №, лист м, x, y, поворот, изгиб)
    # Лист в референсе виден почти в полный рост (400×280 px), плоский при
    # взгляде в 13° вышел бы 450×107 (d12): крупные листья приподняты к
    # камере на raise, как подпёртые своим изгибом.
    # Место приподнятого листа — по его нижней кромке: обратная проекция
    # кромки из референса на сиденье, центр — на полдлины дальше от камеры.
    plan = [
        ("27", 2, 0.100, -0.1117, -0.0245, -35, 30, 10),  # крупный оранжевый клён слева спереди
        ("28", 4, 0.092, 0.0100, 0.1250, 75, 45, 14),     # жёлтый слева, на дальней планке
        ("27", 6, 0.100, 0.0350, -0.0880, 145, 28, 14),   # оранжевый справа, через щель
        ("28", 14, 0.035, 0.3636, 0.1132, 20, 40, 0),     # маленький справа глубже
        ("28", 9, 0.072, 0.3541, 0.0416, 110, 40, 8),     # справа вдали
    ]
    back_edge = SEAT_Y0 + SEAT_DEPTH
    for i, (st, k, size_m, dx, dy, yaw_leaf, bend, raise_deg) in enumerate(plan):
        mat, sz, bx, blades = sets[st]
        # лист занимает ~65 % ячейки атласа (027) или ~50 % (028: черешок вбок)
        cell = size_m / (0.65 if st == "27" else 0.5)
        x, y = cup.x + dx, min(cup.y + dy, back_edge - 0.02)
        obs.append(leaf(f"Leaf seat {i + 1}", mat, sz, bx[k % len(bx)][:4], cell, (x, y, top),
                        yaw_leaf + VIEW_AZ - 15.0, bend, raise_deg=raise_deg, blade=blades[k % len(blades)][:4]))
    # На земле под скамейкой и перед ней — размытый ковёр.
    for i in range(60):
        s = random.choice(("27", "28"))
        mat, size, bx, _blades = sets[s]
        x = random.uniform(-1.6, 1.8)
        y = random.uniform(-1.4, 1.5)
        ob = leaf(f"Leaf ground {i + 1}", mat, size, random.choice(bx)[:4], random.uniform(0.07, 0.14),
                  (x, y, 0.0), random.uniform(0, 360), random.uniform(15, 60))
        # Земля и её листья в кадре — это снимок-фон; сами они светят и отражаются.
        ob.visible_camera = False
        obs.append(ob)
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
    sun.angle = math.radians(0.6)
    ob = bpy.data.objects.new("Sun", sun)
    bpy.context.scene.collection.objects.link(ob)
    az, el = math.radians(SUN_AZ), math.radians(SUN_ELEV)
    to_sun = Vector((math.cos(az) * math.cos(el), math.sin(az) * math.cos(el), math.sin(el)))
    ob.rotation_euler = (-to_sun).to_track_quat("-Z", "Y").to_euler()
    return ob


def fill_light(base):
    """Отражатель слева спереди: печать на освещённой стороне (контровое солнце её не освещает)."""
    light = bpy.data.lights.new("Fill reflector", "AREA")
    light.shape = "RECTANGLE"; light.size = 0.9; light.size_y = 0.7
    light.energy = 55.0
    light.color = (1.0, 0.93, 0.84)
    ob = bpy.data.objects.new("Fill reflector", light)
    bpy.context.scene.collection.objects.link(ob)
    view, right = view_axes()
    ob.location = base - view * 1.0 - right * 0.55 + Vector((0.0, 0.0, 0.32))
    ob.rotation_euler = ((base + Vector((0, 0, 0.07))) - ob.location).to_track_quat("-Z", "Y").to_euler()
    # Как белый щит фотографа: светит, но в мокром лаке огромным окном не отражается.
    ob.visible_glossy = False
    ob.visible_camera = False
    return ob


def key_direction():
    """Направление на «второе солнце»: от камеры назад-влево, вверх."""
    view, _right = view_axes()
    az = math.atan2(-view.y, -view.x) - math.radians(KEY_SIDE)
    el = math.radians(KEY_ELEV)
    return Vector((math.cos(az) * math.cos(el), math.sin(az) * math.cos(el), math.sin(el)))


def key_light(base):
    """Второе «солнце» спереди-слева-сверху. В референсе (AI) свет двойной:
    солнце — контровое в фоне, а стакан, листья и лицо спинки освещены
    спереди, капли на спинке и сиденье искрят к камере. Без него капли
    ничего яркого не отражают — спинка тёмная и сухая (d21–d24)."""
    sun = bpy.data.lights.new("Key sun", "SUN")
    sun.energy = KEY_STRENGTH
    sun.color = (1.0, 0.84, 0.64)
    sun.angle = math.radians(3.0)
    ob = bpy.data.objects.new("Key sun", sun)
    bpy.context.scene.collection.objects.link(ob)
    ob.rotation_euler = (-key_direction()).to_track_quat("-Z", "Y").to_euler()
    return ob


def bounce_light(base):
    """Тёплый отражённый свет сверху из-за спины фотографа — освещённая солнцем
    листва. В референсе лицо спинки светлое и капли на нём искрят, хотя солнце
    за скамейкой: спинка отражает яркое тёплое сверху-спереди (угол отражения
    лица спинки — ~45° вверх за камеру)."""
    light = bpy.data.lights.new("Foliage bounce", "AREA")
    light.shape = "RECTANGLE"; light.size = 0.7; light.size_y = 0.45
    light.energy = BOUNCE_W
    light.color = (1.0, 0.78, 0.50)
    ob = bpy.data.objects.new("Foliage bounce", light)
    bpy.context.scene.collection.objects.link(ob)
    view, right = view_axes()
    ob.location = base - view * 1.1 + right * 0.3 + Vector((0.0, 0.0, 1.0))
    aim = Vector((CUP_X - 0.25, back_face_y(0.15), SEAT_Z + 0.15))
    ob.rotation_euler = (aim - ob.location).to_track_quat("-Z", "Y").to_euler()
    ob.visible_camera = False
    # Только блики: светлое пятно в мокром лаке спинки и искры в каплях. В
    # рассеянном свете она красила эмаль в мятный (d17).
    ob.visible_diffuse = False
    ob.visible_transmission = False
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
    key_light(base)
    sun_lamp()
    # Фон-снимок для камеры подкладывается после рендера (bk/plate.py): через мир
    # сцены диафрагма размыла бы уже размытый снимок второй раз.
    scene["cups_plate"] = bpy.path.relpath(os.path.join(ASSETS, "user", "user_bokeh.png"), start=os.path.dirname(OUT))
    scene["cups_plate_tan"] = PLATE_TAN
    scene["cups_plate_shift"] = list(PLATE_SHIFT)
    scene["cups_plate_gain"] = PLATE_GAIN
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
