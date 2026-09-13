# -*- coding: utf-8 -*-
"""
Стакан в готовое фото: 3D только продукт, всё остальное — снимок.

    blender -b -P build_photo_composite.py -- --plate base.png --cup ../assets/models/HB80-280.glb

Схема другая, чем в build_cafe_mockup.py: там 3D-сцена с backplate только позади
стола, здесь фотография — ВЕСЬ кадр, включая стол и предметы. В 3D остаётся
стакан и невидимая плоскость-shadow catcher, которая ловит его тень. Дальше
компоситор перемножает фон на пасс Shadow Catcher и кладёт стакан поверх.

Камера подгоняется под фотографию: параметры lens/elev/dist задают её так, чтобы
эллипс основания стакана и масштаб совпали с предметами на снимке. Режим
--calib рисует на плоскости стола сетку и контрольные круги — по ним видно,
сходится перспектива или нет.
"""

import bpy
import bmesh
import json
import math
import os
import sys

from mathutils import Euler, Matrix, Vector

PACK = os.path.dirname(os.path.abspath(__file__))
PROJ = os.path.dirname(PACK)
HDRI = os.path.join(PACK, "comfy_cafe_2k.exr")

PARAMS = {
    "res": [1122, 1402],
    "samples": 128,
    "denoise": True,
    "pixel_filter": 1.0,
    "view_transform": "Standard",   # фон уже display-referred, тон-маппинг не нужен
    "exposure": 0.0,

    # ── камера ────────────────────────────────────────────────────────────
    # Подгонка под подложку. Эллипсы на снимке между собой не согласованы
    # (кромка держателя даёт подъём ~17°, дно стакана во второй картинке пары —
    # 8.7°), поэтому взята середина правдоподобного диапазона, а дистанция
    # подобрана так, чтобы наш стакан 88 мм занял те же ~376 px по высоте,
    # что и стакан во второй картинке.
    "lens": 85.0,
    # Выставлено по единственному надёжному замеру на плоскости стола: нижний
    # эллипс держателя мешалок. По снимку его полуоси ≈137 и ≈38 px, то есть
    # сжатие 0.28. Камера подобрана так, чтобы В ТОЙ ЖЕ ТОЧКЕ кадра давать ровно
    # 0.28 — проверяется скриптом, а не на глаз.
    #
    # Тарелку как ориентир использовать нельзя: она обрезана с обеих сторон,
    # видимая дуга слишком короткая, и подгонка коники вырождается (центр
    # уходит за кадр). Раскрытая кромка тарелки против закрытой кромки стакана —
    # это не ошибка: обод тарелки лежит на столе, а кромка стакана на 154 мм
    # выше, ближе к уровню глаза, и обязана быть площе.
    "elev": 7.73,
    "dist": 1.8392,
    "base_px": [590, 1118],   # куда в кадре должно попасть основание стакана
    "fstop": 0.0,        # 0 — DOF выключен
    "focus_front": True,

    # ── стакан ────────────────────────────────────────────────────────────
    # 90° уводит шов склейки за кадр: на модели он реальный, и в кадре
    # читался вертикальной линией по центру внутренней стенки.
    "cup_rot": 90.0,
    # Высота изделия в мм из каталога (js/data/models.js). Единицы в .glb
    # не нормированы: HB80-280 лежит в миллиметрах, Cup_500ml — в метрах,
    # 8cups.glb вообще в условных. Браузер берёт размер из каталога, и здесь
    # должно быть так же, иначе тень снимется не с того размера.
    "cup_height_mm": 0.0,
    # Ровный цвет вместо макета на всех материалах стакана, [R, G, B] линейно.
    # Нужен для эталона веб-сцены: браузер показывает стакан без печати белым
    # (альбедо 1), и сверять его свет и тень надо с таким же стаканом.
    "cup_albedo": None,
    "clean_mesh": True,   # merge by distance + пересчёт нормалей + smooth
    # 1.0 — истинный размер относительно предметов на снимке. Больше 1 —
    # «геройский» стакан: в кадре крупнее, но физически уже не в масштабе
    # с круассаном и держателем.
    "cup_scale": 1.435,   # −18% относительно прежней посадки

    # ── свет ──────────────────────────────────────────────────────────────
    # Окно слева-сзади — главный источник; практики в кафе тёплые и слабые.
    # Окно слева-сверху и чуть спереди — широкий мягкий блик по левой трети.
    # Размер увеличен намеренно: на софтбоксе 0.9×1.15 его отражение садилось
    # на завальцованный кант чёткой светлой лопастью — тем самым «дефектом на
    # верхней кромке». Затемнение материалов его не убирало, потому что это
    # спекуляр, а не диффуз; лечится только размером источника.
    "key":    {"power": 19.0, "size": [1.90, 2.30], "pos": [-0.70, -0.26, 0.88],
               "k": 5000, "aim": 0.05},
    # Тёплый интерьер справа: на ~1.8 стопа слабее ключа.
    # Опущен: с высоты он светил прямо в раскрыв стакана, и ближний кант резал
    # на дальней стенке жёсткое пятно с вырезом. Теперь скользит по корпусу.
    "fill":   {"power": 3.6,  "size": [0.80, 0.70], "pos": [0.68, -0.22, 0.14],
               "k": 3000, "aim": 0.045},
    # Слабая тёплая кромка сзади-справа — отделяет силуэт от тёмного фона.
    "rim":    {"power": 1.6,  "size": [0.25, 0.45], "pos": [0.55, 0.55, 0.34],
               "k": 2900, "aim": 0.07},
    # Отскок от деревянного стола в нижнюю четверть корпуса: широкий и слабый.
    "bounce": {"power": 2.4,  "size": [0.70, 0.35], "pos": [0.10, -0.38, 0.020],
               "k": 2700, "aim": 0.018},
    # Широкий потолочный слой: внутренность стакана должна получать ровный
    # градиент от помещения, а не пятно от конкретной лампы.
    "sky":    {"power": 3.5,  "size": [2.00, 2.00], "pos": [-0.10, 0.10, 1.30],
               "k": 4600, "aim": 0.05},
    "wb_kelvin": 6100.0,   # замер: белое на стакане холоднее белого в кадре
    "hdri_strength": 0.12,
    "hdri_rotation": 0.0,

    # Слои вместо готового композита: стакан (RGBA) и пасс тени пишутся
    # отдельными файлами, чтобы свести их с фотографией самостоятельно —
    # с лёгким размытием и зерном ТОЛЬКО на 3D-слое.
    "layers_dir": "",
    # Режимы выгрузки для веб-сцены (assets/scenes/<id>/):
    #   shadow_pass — вместо композита пишется голый пасс Shadow Catcher;
    #   panorama    — равнопромежуточная HDR-панорама из точки стакана,
    #                 она же становится источником света для браузера.
    "shadow_pass": False,
    # Путь к json: выгрузить геометрию камеры и точку стакана для scene.json
    # веб-сцены и выйти, ничего не рендеря.
    "camera_dump": "",
    "panorama": False,
    "panorama_res": [2048, 1024],
    # Множитель яркости ТОЛЬКО для панорамы. Физически верно 1: панорама
    # несёт ровно тот свет, которым освещён стакан в композите. Прежние 6.5
    # компенсировали лампы, не попадавшие в панораму (см. visible_camera ниже),
    # и заодно убивали светотень.
    "pano_gain": 1.0,
    "supersample": 2.0,
    "shadow_gain": 1.0,    # доля подмешивания тени: 1 — как посчиталась
    # Ключ поднят с 0.52 до 0.88 м: при низком источнике тень уходила далеко вбок
    # плотным пятном, тогда как в кадре у всех предметов тени короткие и мягкие.
    "shadow_power": 1.35,
    # Замер по снимку: в тени тарелки синий падает до 0.32 от чистого стола, а
    # в моей тени — только до 0.51. Тени на этом фото заметно теплее. Коэффициенты
    # углубляют пасс по каналам: shadow = 1 − (1 − shadow)·tint.
    # Сильная покональная тонировка даёт красную кайму по краю тени: в ядре
    # синий и зелёный проваливаются, а красный остаётся. В кадре такого нет —
    # у тарелки и держателя тени тёплые, но без цветного канта. Оставлен мягкий
    # сдвиг, а тёплый характер набирается самой плотностью.
    "shadow_tint": [1.00, 1.05, 1.10],
    "calib": False,
}


def deep_update(dst, src):
    for k, v in src.items():
        if isinstance(v, dict) and isinstance(dst.get(k), dict):
            deep_update(dst[k], v)
        else:
            dst[k] = v
    return dst


def parse_args():
    a = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
    out = {"plate": "", "cup": os.path.join(PROJ, "assets", "models", "HB80-280.glb"),
           "out": os.path.join(PACK, "renders", "photo_composite.png"),
           "blend": "", "params": {}}
    i = 0
    while i < len(a):
        if a[i] in ("--plate", "--cup", "--out", "--blend"):
            out[a[i][2:]] = a[i + 1]; i += 2
        elif a[i] == "--params":
            out["params"] = json.loads(a[i + 1]); i += 2
        else:
            i += 1
    return out


# ── утварь ──────────────────────────────────────────────────────────────────
def world_bbox(obj):
    cs = [obj.matrix_world @ Vector(c) for c in obj.bound_box]
    return (Vector((min(c.x for c in cs), min(c.y for c in cs), min(c.z for c in cs))),
            Vector((max(c.x for c in cs), max(c.y for c in cs), max(c.z for c in cs))))


def group_bbox(objs):
    mn = Vector((1e9,) * 3); mx = Vector((-1e9,) * 3)
    for o in objs:
        if o.type != 'MESH':
            continue
        a, b = world_bbox(o)
        mn = Vector((min(mn.x, a.x), min(mn.y, a.y), min(mn.z, a.z)))
        mx = Vector((max(mx.x, b.x), max(mx.y, b.y), max(mx.z, b.z)))
    return mn, mx


def look_at(obj, target):
    obj.rotation_euler = (target - obj.location).to_track_quat('-Z', 'Y').to_euler()


def kelvin_rgb(k):
    t = max(1000.0, min(40000.0, k)) / 100.0
    if t <= 66:
        r, g = 255.0, 99.4708025861 * math.log(t) - 161.1195681661
        b = 0.0 if t <= 19 else 138.5177312231 * math.log(t - 10) - 305.0447927307
    else:
        r = 329.698727446 * ((t - 60) ** -0.1332047592)
        g = 288.1221695283 * ((t - 60) ** -0.0755148492)
        b = 255.0
    return tuple(max(0.0, min(255.0, v)) / 255.0 for v in (r, g, b))


def kelvin_rgb_wb(k, wb):
    c, w = kelvin_rgb(k), kelvin_rgb(wb)
    r = [c[i] / max(1e-4, w[i]) for i in range(3)]
    lum = 0.2126 * r[0] + 0.7152 * r[1] + 0.0722 * r[2]
    return tuple(v / max(1e-4, lum) for v in r)


def add_area(name, loc, target, power, size, k, wb, col):
    d = bpy.data.lights.new(name, 'AREA')
    d.energy = power
    d.shape = 'RECTANGLE'
    d.size, d.size_y = size
    try:
        d.use_temperature = False
    except Exception:
        pass
    d.color = kelvin_rgb_wb(k, wb)
    o = bpy.data.objects.new(name, d)
    col.objects.link(o)
    o.location = loc
    look_at(o, target)
    return o


def frame_ray(cam, px, py, rx, ry):
    """Луч через пиксель кадра (px слева, py сверху). Возвращает (начало, направление)."""
    cd = cam.data
    sw = cd.sensor_width
    sh = sw * ry / rx
    d = Vector(((px / rx - 0.5) * sw, (0.5 - py / ry) * sh, -cd.lens))
    return cam.matrix_world.translation, (cam.matrix_world.to_3x3() @ d).normalized()


def hit_z(o, d, z=0.0):
    if abs(d.z) < 1e-9:
        return None
    t = (z - o.z) / d.z
    return None if t <= 0 else o + d * t


def project(cam, scene, pt):
    """Мировая точка → пиксели кадра."""
    from bpy_extras.object_utils import world_to_camera_view
    v = world_to_camera_view(scene, cam, pt)
    rx, ry = scene.render.resolution_x, scene.render.resolution_y
    return v.x * rx, (1.0 - v.y) * ry


def mesh_from_bmesh(name, bm, col):
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me); bm.free()
    o = bpy.data.objects.new(name, me)
    col.objects.link(o)
    return o


def flat_material(name, color, emit=True):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    nt = mat.node_tree
    out = next(n for n in nt.nodes if n.type == 'OUTPUT_MATERIAL')
    if emit:
        for n in list(nt.nodes):
            if n.type == 'BSDF_PRINCIPLED':
                nt.nodes.remove(n)
        e = nt.nodes.new('ShaderNodeEmission')
        e.inputs['Color'].default_value = tuple(color) + (1.0,)
        e.inputs['Strength'].default_value = 1.0
        nt.links.new(e.outputs['Emission'], out.inputs['Surface'])
    return mat


# ── сборка ──────────────────────────────────────────────────────────────────
def tune_print_material(mat):
    """Печатная стенка: микрошероховатость и разница «бумага / краска».

    Голая бумага шероховатее запечатки, поэтому roughness ведём от светлоты
    самого макета: тёмная плашка краски — глаже, белые участки — матовее.
    Сверху очень слабый шум, чтобы разрушить идеально ровный компьютерный блик.
    """
    nt = mat.node_tree
    bsdf = next((n for n in nt.nodes if n.type == 'BSDF_PRINCIPLED'), None)
    tex = next((n for n in nt.nodes if n.type == 'TEX_IMAGE'), None)
    if not bsdf:
        return
    bsdf.inputs['IOR'].default_value = 1.45
    for k in ('Specular IOR Level', 'Specular'):
        if k in bsdf.inputs:
            bsdf.inputs[k].default_value = 0.30
            break

    x, y = bsdf.location.x, bsdf.location.y
    coord = nt.nodes.new('ShaderNodeTexCoord'); coord.location = (x - 1100, y - 420)
    noise = nt.nodes.new('ShaderNodeTexNoise'); noise.location = (x - 900, y - 420)
    noise.inputs['Scale'].default_value = 260.0
    noise.inputs['Detail'].default_value = 2.0
    noise.inputs['Roughness'].default_value = 0.60
    nt.links.new(coord.outputs['Generated'], noise.inputs['Vector'])

    jitter = nt.nodes.new('ShaderNodeMapRange'); jitter.location = (x - 700, y - 420)
    jitter.inputs['To Min'].default_value = -0.022
    jitter.inputs['To Max'].default_value = 0.022
    nt.links.new(noise.outputs['Fac'], jitter.inputs['Value'])

    if tex:
        bw = nt.nodes.new('ShaderNodeRGBToBW'); bw.location = (x - 900, y - 250)
        nt.links.new(tex.outputs['Color'], bw.inputs['Color'])
        base = nt.nodes.new('ShaderNodeMapRange'); base.location = (x - 700, y - 250)
        base.inputs['To Min'].default_value = 0.48   # плотная краска
        base.inputs['To Max'].default_value = 0.62   # голая бумага
        nt.links.new(bw.outputs['Val'], base.inputs['Value'])
        rough_src = base.outputs['Result']
    else:
        val = nt.nodes.new('ShaderNodeValue'); val.location = (x - 700, y - 250)
        val.outputs[0].default_value = 0.55
        rough_src = val.outputs[0]

    add = nt.nodes.new('ShaderNodeMath'); add.location = (x - 480, y - 300)
    add.operation = 'ADD'
    add.use_clamp = True
    nt.links.new(rough_src, add.inputs[0])
    nt.links.new(jitter.outputs['Result'], add.inputs[1])
    nt.links.new(add.outputs['Value'], bsdf.inputs['Roughness'])

    bump = nt.nodes.new('ShaderNodeBump'); bump.location = (x - 250, y - 480)
    bump.inputs['Strength'].default_value = 0.022
    bump.inputs['Distance'].default_value = 0.00003   # десятки микрон
    nt.links.new(noise.outputs['Fac'], bump.inputs['Height'])
    nt.links.new(bump.outputs['Normal'], bsdf.inputs['Normal'])


def tune_inner_material(mat, cup_h_mm):
    """Кант и внутренняя стенка: тёплое молочное вместо белого, с падением
    светлоты вниз — сейчас внутри ровная заливка, и это упрощает форму."""
    nt = mat.node_tree
    bsdf = next((n for n in nt.nodes if n.type == 'BSDF_PRINCIPLED'), None)
    if not bsdf:
        return
    # Внутренняя стенка матовая: на гладкой софтбокс отражается чёткой
    # лопастной кляксой и читается как дефект геометрии.
    bsdf.inputs['Roughness'].default_value = 0.68
    for k in ('Specular IOR Level', 'Specular'):
        if k in bsdf.inputs:
            bsdf.inputs[k].default_value = 0.25
            break
    x, y = bsdf.location.x, bsdf.location.y

    coord = nt.nodes.new('ShaderNodeTexCoord'); coord.location = (x - 900, y + 150)
    sep = nt.nodes.new('ShaderNodeSeparateXYZ'); sep.location = (x - 720, y + 150)
    nt.links.new(coord.outputs['Object'], sep.inputs['Vector'])
    mr = nt.nodes.new('ShaderNodeMapRange'); mr.location = (x - 540, y + 150)
    mr.inputs['From Min'].default_value = cup_h_mm * 0.45
    mr.inputs['From Max'].default_value = cup_h_mm
    nt.links.new(sep.outputs['Z'], mr.inputs['Value'])

    ramp = nt.nodes.new('ShaderNodeValToRGB'); ramp.location = (x - 350, y + 150)
    ramp.color_ramp.elements[0].position = 0.0
    ramp.color_ramp.elements[0].color = (0.255, 0.233, 0.203, 1.0)  # низ, ~1.1 стопа темнее
    ramp.color_ramp.elements[1].position = 1.0
    ramp.color_ramp.elements[1].color = (0.560, 0.513, 0.445, 1.0)  # кант; светлее уходил в клиппинг
    nt.links.new(mr.outputs['Result'], ramp.inputs['Fac'])
    nt.links.new(ramp.outputs['Color'], bsdf.inputs['Base Color'])

    # Замер по рендеру: у канта детализация 4 и зерно 0.5 — стерильная
    # плоскость, какой в кадре нет ни у одного предмета. Добавляем ту же
    # микрофактуру, что и на печатной стенке, только слабее.
    coord2 = nt.nodes.new('ShaderNodeTexCoord'); coord2.location = (x - 900, y - 320)
    noise = nt.nodes.new('ShaderNodeTexNoise'); noise.location = (x - 700, y - 320)
    noise.inputs['Scale'].default_value = 240.0
    noise.inputs['Detail'].default_value = 2.0
    bump = nt.nodes.new('ShaderNodeBump'); bump.location = (x - 300, y - 320)
    bump.inputs['Strength'].default_value = 0.016
    bump.inputs['Distance'].default_value = 0.00003
    nt.links.new(coord2.outputs['Generated'], noise.inputs['Vector'])
    nt.links.new(noise.outputs['Fac'], bump.inputs['Height'])
    nt.links.new(bump.outputs['Normal'], bsdf.inputs['Normal'])


def paint_cup(meshes, albedo):
    """Ровное альбедо на всех материалах стакана — связь с текстурой макета
    рвётся, шероховатость и нормали остаются как в модели."""
    done = set()
    for o in meshes:
        for m in o.data.materials:
            if not m or not m.node_tree or m.name in done:
                continue
            done.add(m.name)
            for n in m.node_tree.nodes:
                if n.type != 'BSDF_PRINCIPLED':
                    continue
                sock = n.inputs['Base Color']
                for link in list(sock.links):
                    m.node_tree.links.remove(link)
                sock.default_value = tuple(albedo) + (1.0,)
    print(f"[PC] альбедо стакана: {albedo}")


def build_cup(path, col, rot_deg, clean=True, height_mm=0.0):
    before = set(bpy.data.objects)
    bpy.ops.import_scene.gltf(filepath=path)
    fresh = [o for o in bpy.data.objects if o not in before]
    meshes = [o for o in fresh if o.type == 'MESH']
    if not meshes:
        raise RuntimeError("в GLB нет мешей")
    root = bpy.data.objects.new("CUP", None)
    col.objects.link(root)
    for o in fresh:
        if o.parent is None:
            o.parent = root
        if o.name not in col.objects:
            for c in list(o.users_collection):
                c.objects.unlink(o)
            col.objects.link(o)
    bpy.context.view_layer.update()
    mn, mx = group_bbox(meshes)
    root.scale = (0.001,) * 3 if (mx.z - mn.z) > 1.0 else (1.0,) * 3
    bpy.context.view_layer.update()
    mn, mx = group_bbox(meshes)
    root.location = (-(mn.x + mx.x) / 2, -(mn.y + mx.y) / 2, -mn.z)
    root.rotation_euler[2] = math.radians(rot_deg)
    bpy.context.view_layer.update()
    mn, mx = group_bbox(meshes)
    h = mx.z - mn.z
    if height_mm and h > 1e-6:
        k = (height_mm / 1000.0) / h
        root.scale = tuple(v * k for v in root.scale)
        root.location = tuple(v * k for v in root.location)
        bpy.context.view_layer.update()
        mn, mx = group_bbox(meshes)
        root.location = (root.location.x - (mn.x + mx.x) / 2,
                         root.location.y - (mn.y + mx.y) / 2,
                         root.location.z - mn.z)
        bpy.context.view_layer.update()
        mn, mx = group_bbox(meshes)
        h = mx.z - mn.z
        print(f"[PC] нормализовано по каталогу: ×{k:.4f} → H={h*1000:.1f} мм")
    print(f"[PC] стакан: {os.path.basename(path)} H={h*1000:.1f} мм "
          f"D={max(mx.x-mn.x, mx.y-mn.y)*1000:.1f} мм")

    if clean:
        # Импорт из glTF оставляет расщеплённые вершины и местами вывернутые
        # нормали — на внутренней стенке это читалось светлым пятном, которое
        # светилось даже при выключенном ключе.
        for o in meshes:
            bm = bmesh.new()
            bm.from_mesh(o.data)
            before = len(bm.verts)
            bmesh.ops.remove_doubles(bm, verts=bm.verts[:], dist=1e-4)
            bmesh.ops.recalc_face_normals(bm, faces=bm.faces[:])
            bm.to_mesh(o.data)
            bm.free()
            o.data.update()
            for poly in o.data.polygons:
                poly.use_smooth = True
            print(f"[PC] чистка {o.name}: вершин {before} → {len(o.data.vertices)}")

    h_mm = h * 1000.0
    done = set()
    for o in meshes:
        for m in o.data.materials:
            if not m or not m.node_tree or m.name in done:
                continue
            done.add(m.name)
            if 'Print' in m.name:
                tune_print_material(m)
                print(f"[PC] печатная стенка: {m.name}")
            elif 'Inner' in m.name or 'Edge' in m.name:
                tune_inner_material(m, h_mm)
                print(f"[PC] кант/внутренняя стенка: {m.name}")
    return root, meshes, h


def build_catcher(col, size=4.0):
    bm = bmesh.new()
    bmesh.ops.create_grid(bm, x_segments=1, y_segments=1, size=size / 2)
    o = mesh_from_bmesh("SHADOW_CATCHER", bm, col)
    o.is_shadow_catcher = True
    mat = bpy.data.materials.new("MAT_CATCHER")
    mat.use_nodes = True
    b = next((n for n in mat.node_tree.nodes if n.type == 'BSDF_PRINCIPLED'), None)
    if b:
        # Альбедо стола со снимка: тёплое дерево. От него зависит цвет
        # отражённого света, который стол подкидывает обратно на стакан.
        b.inputs['Base Color'].default_value = (0.22, 0.125, 0.062, 1.0)
        b.inputs['Roughness'].default_value = 0.85
        for k in ('Specular IOR Level', 'Specular'):
            if k in b.inputs:
                b.inputs[k].default_value = 0.0
                break
    o.data.materials.append(mat)
    return o


def build_calib(col, cam, scene, p):
    """Сетка 50 мм и контрольные круги на плоскости стола."""
    rx, ry = p["res"]
    bm = bmesh.new()
    step, n = 0.05, 16
    for i in range(-n, n + 1):
        for a, b in (((i * step, -n * step, 0.0005), (i * step, n * step, 0.0005)),
                     ((-n * step, i * step, 0.0005), (n * step, i * step, 0.0005))):
            v1 = bm.verts.new(a); v2 = bm.verts.new(b)
            bm.edges.new((v1, v2))
    bmesh.ops.extrude_edge_only(bm, edges=bm.edges[:])
    o = mesh_from_bmesh("CALIB_GRID", bm, col)
    o.display_type = 'WIRE'
    mod = o.modifiers.new("W", 'WIREFRAME')
    mod.thickness = 0.0012
    o.data.materials.append(flat_material("MAT_GRID", (0.0, 1.0, 0.2)))
    return o


def build_calib_disc(col, cam, scene, px, py, radius, name, color):
    """Круг радиуса radius (м) на столе, центр — в пикселе (px, py)."""
    rx, ry = scene.render.resolution_x, scene.render.resolution_y
    o_, d_ = frame_ray(cam, px, py, rx, ry)
    hit = hit_z(o_, d_, 0.0)
    if hit is None:
        print(f"[PC][WARN] {name}: луч не попал в плоскость стола")
        return None
    bm = bmesh.new()
    bmesh.ops.create_circle(bm, cap_ends=True, cap_tris=True, segments=128, radius=radius)
    ob = mesh_from_bmesh(name, bm, col)
    ob.location = (hit.x, hit.y, 0.001)
    ob.data.materials.append(flat_material("MAT_" + name, color))
    print(f"[PC] {name}: центр мира ({hit.x*1000:.0f}, {hit.y*1000:.0f}) мм, R={radius*1000:.0f} мм")
    return ob


def setup_camera(col, scene, p):
    """Камера смотрит в мировой ноль. Положение стакана в кадре задаётся не
    доворотом камеры (итерация по пикселю расходится при сильном смещении от
    центра), а тем, что сам стакан ставится лучом через нужный пиксель."""
    cd = bpy.data.cameras.new("CAM")
    cam = bpy.data.objects.new("CAM", cd)
    col.objects.link(cam)
    scene.camera = cam
    cd.lens = p["lens"]
    cd.sensor_width = 36.0
    cd.sensor_fit = 'HORIZONTAL'
    cd.dof.use_dof = p["fstop"] > 0
    if cd.dof.use_dof:
        cd.dof.aperture_fstop = p["fstop"]
        cd.dof.aperture_blades = 8

    el = math.radians(p["elev"])
    d = p["dist"]
    cam.location = (0.0, -d * math.cos(el), d * math.sin(el))
    look_at(cam, Vector((0.0, 0.0, 0.0)))
    bpy.context.view_layer.update()
    print(f"[PC] камера: {cd.lens:.0f} мм, подъём {p['elev']:.1f}°, "
          f"высота над столом {cam.location.z*1000:.0f} мм")
    return cam


def place_on_table(cam, scene, px, py):
    """Мировая точка на столе под пикселем (px, py)."""
    rx, ry = scene.render.resolution_x, scene.render.resolution_y
    o, d = frame_ray(cam, px, py, rx, ry)
    hit = hit_z(o, d, 0.0)
    if hit is None:
        raise RuntimeError(f"луч через ({px}, {py}) не попадает в плоскость стола")
    return hit


def setup_world(p):
    scene = bpy.context.scene
    w = bpy.data.worlds.new("W")
    scene.world = w
    w.use_nodes = True
    nt = w.node_tree
    nt.nodes.clear()
    out = nt.nodes.new('ShaderNodeOutputWorld')
    bg = nt.nodes.new('ShaderNodeBackground')
    bg.inputs['Strength'].default_value = p["hdri_strength"]
    nt.links.new(bg.outputs['Background'], out.inputs['Surface'])
    if os.path.isfile(HDRI):
        coord = nt.nodes.new('ShaderNodeTexCoord')
        mp = nt.nodes.new('ShaderNodeMapping')
        mp.inputs['Rotation'].default_value[2] = math.radians(p["hdri_rotation"])
        tex = nt.nodes.new('ShaderNodeTexEnvironment')
        tex.image = bpy.data.images.load(HDRI, check_existing=True)
        nt.links.new(coord.outputs['Generated'], mp.inputs['Vector'])
        nt.links.new(mp.outputs['Vector'], tex.inputs['Vector'])
        nt.links.new(tex.outputs['Color'], bg.inputs['Color'])
    else:
        bg.inputs['Color'].default_value = (0.09, 0.065, 0.045, 1.0)


def setup_layers_output(p, out_dir):
    """Пишет слой стакана (RGBA) и пасс тени — по ним композит собирается вне
    Blender, чтобы размытие и зерно легли только на 3D."""
    scene = bpy.context.scene
    ng = bpy.data.node_groups.new("PC_LAYERS", "CompositorNodeTree")
    scene.compositing_node_group = ng
    scene.use_nodes = True
    ng.interface.new_socket("Image", in_out='OUTPUT', socket_type='NodeSocketColor')

    rl = ng.nodes.new('CompositorNodeRLayers'); rl.location = (-300, 0)
    out = ng.nodes.new('NodeGroupOutput'); out.location = (500, 0)
    ng.links.new(rl.outputs['Image'], out.inputs['Image'])

    fo = ng.nodes.new('CompositorNodeOutputFile'); fo.location = (200, -250)
    fo.base_path = out_dir
    fo.format.file_format = 'PNG'
    fo.format.color_mode = 'RGBA'
    fo.format.color_depth = '16'
    while fo.file_slots:
        fo.file_slots.remove(fo.inputs[0])
    fo.file_slots.new("cup")
    ng.links.new(rl.outputs['Image'], fo.inputs['cup'])
    sc_name = next((k for k in ('Shadow Catcher',) if k in rl.outputs), None)
    if sc_name:
        fo.file_slots.new("shadow")
        ng.links.new(rl.outputs[sc_name], fo.inputs['shadow'])
    os.makedirs(out_dir, exist_ok=True)
    print(f"[PC] слои пишутся в {out_dir} (cup / shadow), "
          f"{scene.render.resolution_x}×{scene.render.resolution_y}")


def setup_compositor(plate_path, p):
    """фон × Shadow Catcher, сверху — стакан."""
    scene = bpy.context.scene
    ng = bpy.data.node_groups.new("PC_COMP", "CompositorNodeTree")
    scene.compositing_node_group = ng
    scene.use_nodes = True
    ng.interface.new_socket("Image", in_out='OUTPUT', socket_type='NodeSocketColor')

    rl = ng.nodes.new('CompositorNodeRLayers'); rl.location = (-400, 200)
    out = ng.nodes.new('NodeGroupOutput'); out.location = (700, 100)

    if not plate_path or not os.path.isfile(plate_path):
        ng.links.new(rl.outputs['Image'], out.inputs['Image'])
        print("[PC][WARN] фон не найден — рендер без подложки")
        return

    img = ng.nodes.new('CompositorNodeImage'); img.location = (-400, -220)
    img.image = bpy.data.images.load(plate_path, check_existing=True)
    print(f"[PC] фон: {os.path.basename(plate_path)} {tuple(img.image.size)}")

    sc_name = next((k for k in ('Shadow Catcher', 'Shadow_Catcher', 'ShadowCatcher')
                    if k in rl.outputs), None)
    over = ng.nodes.new('CompositorNodeAlphaOver'); over.location = (450, 100)
    over.inputs['Factor'].default_value = 1.0

    if sc_name:
        # Пасс Shadow Catcher — это множитель освещённости: 1 там, где тени нет.
        mixer = ng.nodes.new('ShaderNodeMix'); mixer.location = (120, -160)
        mixer.data_type = 'RGBA'
        mixer.blend_type = 'MULTIPLY'
        # У ShaderNodeMix сокеты A/B продублированы под каждый тип данных, и
        # выбор по имени попадает во float-версию — связи молча уходят в никуда.
        # Берём именно цветные.
        ca, cb = [x for x in mixer.inputs if x.type == 'RGBA'][:2]
        cout = [x for x in mixer.outputs if x.type == 'RGBA'][0]
        fac = next(x for x in mixer.inputs if x.type == 'VALUE')
        # Result = A·(1 − k + k·B): при k > 1 тень углубляется сверх расчётной,
        # поэтому зажим фактора снимаем.
        try:
            mixer.clamp_factor = False
        except Exception:
            pass
        fac.default_value = p["shadow_gain"] * p["shadow_power"]
        src = rl.outputs[sc_name]
        tint = p.get("shadow_tint")
        if tint and any(abs(v - 1.0) > 1e-3 for v in tint):
            inv1 = ng.nodes.new('CompositorNodeInvert'); inv1.location = (-160, -340)
            inv1.inputs['Invert Color'].default_value = True
            inv1.inputs['Invert Alpha'].default_value = False
            ng.links.new(src, inv1.inputs['Color'])
            tn = ng.nodes.new('ShaderNodeMix'); tn.location = (-20, -340)
            tn.data_type = 'RGBA'; tn.blend_type = 'MULTIPLY'
            ta, tb = [q for q in tn.inputs if q.type == 'RGBA'][:2]
            tf = next(q for q in tn.inputs if q.type == 'VALUE')
            tf.default_value = 1.0
            tb.default_value = tuple(tint) + (1.0,)
            ng.links.new(inv1.outputs['Color'], ta)
            inv2 = ng.nodes.new('CompositorNodeInvert'); inv2.location = (120, -340)
            inv2.inputs['Invert Color'].default_value = True
            inv2.inputs['Invert Alpha'].default_value = False
            ng.links.new([q for q in tn.outputs if q.type == 'RGBA'][0], inv2.inputs['Color'])
            src = inv2.outputs['Color']
            print(f"[PC] тень тонирована по каналам: {tint}")
        ng.links.new(img.outputs['Image'], ca)
        ng.links.new(src, cb)
        ng.links.new(cout, over.inputs['Background'])
        print(f"[PC] тень: пасс «{sc_name}» × фон, gain {p['shadow_gain']}, "
              f"плотность {p['shadow_power']}")
    else:
        ng.links.new(img.outputs['Image'], over.inputs['Background'])
        print("[PC][WARN] пасс Shadow Catcher недоступен — тени в композит не попадут")

    ng.links.new(rl.outputs['Image'], over.inputs['Foreground'])
    ng.links.new(over.outputs['Image'], out.inputs['Image'])


def setup_render(p, out_path):
    scene = bpy.context.scene
    scene.render.engine = 'CYCLES'
    scene.render.resolution_x, scene.render.resolution_y = p["res"]
    scene.render.resolution_percentage = 100
    scene.render.film_transparent = True
    scene.render.filter_size = p["pixel_filter"]
    scene.render.image_settings.file_format = 'PNG'
    scene.render.image_settings.color_mode = 'RGB'
    scene.render.image_settings.color_depth = '8'

    vl = bpy.context.view_layer
    vl.cycles.use_pass_shadow_catcher = True

    c = scene.cycles
    c.samples = p["samples"]
    c.use_adaptive_sampling = True
    c.adaptive_threshold = 0.01
    c.use_denoising = p["denoise"]
    for prop, val in (('denoiser', 'OPENIMAGEDENOISE'),
                      ('denoising_input_passes', 'RGB_ALBEDO_NORMAL'),
                      ('denoising_quality', 'HIGH')):
        try:
            setattr(c, prop, val)
        except Exception:
            pass
    c.max_bounces = 8

    prefs = bpy.context.preferences.addons['cycles'].preferences
    for kind in ('OPTIX', 'CUDA', 'HIP', 'ONEAPI'):
        try:
            prefs.compute_device_type = kind
        except Exception:
            continue
        prefs.get_devices()
        if any(d.type == kind for d in prefs.devices):
            for d in prefs.devices:
                d.use = (d.type == kind)
            scene.cycles.device = 'GPU'
            print(f"[PC] рендер: GPU {kind}")
            break

    for cand in (p["view_transform"], 'Standard'):
        try:
            scene.view_settings.view_transform = cand
            break
        except Exception:
            continue
    scene.view_settings.exposure = p["exposure"]
    scene.view_settings.gamma = 1.0


def main():
    args = parse_args()
    p = deep_update(json.loads(json.dumps(PARAMS)), args["params"])

    bpy.ops.wm.read_factory_settings(use_empty=True)
    scene = bpy.context.scene
    scene.unit_settings.system = 'METRIC'
    col = bpy.data.collections.new("PC")
    scene.collection.children.link(col)

    setup_render(p, args["out"])
    cam = setup_camera(col, scene, p)

    if p["camera_dump"]:
        P = place_on_table(cam, scene, *p["base_px"])
        target = Vector((0.0, 0.0, 0.0))
        dump = {
            'lens': cam.data.lens,
            'sensor': cam.data.sensor_width,
            'fstop': p["fstop"],
            'position': list(cam.matrix_world.translation),
            'target': list(target),
            'cup_origin': [P.x, P.y, P.z],
            'elev': p["elev"],
            'dist': p["dist"],
            'base_px': p["base_px"],
            'res': p["res"],
            'cup_scale': p["cup_scale"],
            # Как тень вмешивается в фон (см. setup_compositor): веб-слой тени
            # обязан повторять ровно это, иначе в браузере она светлее рендера.
            'shadow_gain': p["shadow_gain"],
            'shadow_power': p["shadow_power"],
            'shadow_tint': p.get("shadow_tint") or [1.0, 1.0, 1.0],
        }
        os.makedirs(os.path.dirname(p["camera_dump"]) or ".", exist_ok=True)
        with open(p["camera_dump"], 'w', encoding='utf-8') as fh:
            json.dump(dump, fh, ensure_ascii=False, indent=1)
        print(f"[PC] камера выгружена: {p['camera_dump']}")
        return

    build_catcher(col)

    if p["calib"]:
        build_calib(col, cam, scene, p)
        for spec in p.get("calib_discs", []):
            build_calib_disc(col, cam, scene, spec["px"], spec["py"],
                             spec["r"], spec["name"], spec["color"])
    else:
        cup_root, cup_meshes, h = build_cup(args["cup"], col, p["cup_rot"], p["clean_mesh"], p["cup_height_mm"])
        if p["cup_albedo"]:
            paint_cup(cup_meshes, p["cup_albedo"])
        P = place_on_table(cam, scene, *p["base_px"])
        k = p["cup_scale"]
        if abs(k - 1.0) > 1e-6:
            cup_root.scale = tuple(v * k for v in cup_root.scale)
            cup_root.location = (cup_root.location.x * k, cup_root.location.y * k,
                                 cup_root.location.z * k)
            bpy.context.view_layer.update()
            h = h * k
        cup_root.location = (cup_root.location.x + P.x,
                             cup_root.location.y + P.y,
                             cup_root.location.z)
        bpy.context.view_layer.update()
        top = project(cam, scene, Vector((P.x, P.y, h)))
        bot = project(cam, scene, Vector((P.x, P.y, 0.0)))

        # Контроль перспективы: эллипсы дна и кромки — то, по чему глаз решает,
        # стоит стакан на столе или висит. Сверяются с замерами по снимку.
        def ellipse(z, r):
            pts = [project(cam, scene, Vector((P.x + r*math.cos(a),
                                               P.y + r*math.sin(a), z)))
                   for a in [i*math.tau/96 for i in range(96)]]
            xs = [q[0] for q in pts]; ys = [q[1] for q in pts]
            ea = (max(xs)-min(xs))/2; eb = (max(ys)-min(ys))/2
            return ea, eb, eb/max(ea, 1e-6)
        mn, mx = group_bbox(cup_meshes)
        r_base = 0.0285
        r_rim = max(mx.x - P.x, mx.y - P.y)
        ba, bb, br = ellipse(0.0, r_base)
        ra, rb, rr = ellipse(h, r_rim)
        cpos = cam.matrix_world.translation
        horiz = math.hypot(cpos.x - P.x, cpos.y - P.y)
        loc_elev = math.degrees(math.atan2(cpos.z, horiz))
        print(f"[PC] стакан на столе: ({P.x*1000:.0f}, {P.y*1000:.0f}) мм, "
              f"дно в ({bot[0]:.0f}, {bot[1]:.0f}), высота в кадре "
              f"{bot[1]-top[1]:.0f} px, масштаб {(bot[1]-top[1])/(h*1000):.2f} px/мм")
        print(f"[PC] перспектива: подъём над столом в точке стакана "
              f"{loc_elev:.1f}°, эллипс дна {br:.3f}, "
              f"эллипс кромки {rr:.3f}, полуось дна {ba:.0f} px")
        if p["fstop"] > 0 and p["focus_front"]:
            dg = bpy.context.evaluated_depsgraph_get()
            o_ = cam.matrix_world.translation
            d_ = (Vector((0, 0, 0.55 * h)) - o_).normalized()
            hit, loc, *_ = scene.ray_cast(dg, o_, d_)
            if hit:
                f = bpy.data.objects.new("FOCUS_CUP", None)
                f.location = loc
                f.hide_render = True
                col.objects.link(f)
                cam.data.dof.focus_object = f

    for key in ("key", "fill", "rim", "bounce", "sky"):
        s = p[key]
        add_area(f"L_{key.upper()}", Vector(s["pos"]), Vector((0, 0, s["aim"])),
                 s["power"], s["size"], s["k"], p["wb_kelvin"], col)
    import math as _m
    stops = _m.log2(p["key"]["power"] / max(p["fill"]["power"], 1e-6))
    print("[PC] свет: KEY {0[power]:.0f} Вт {0[k]:.0f}K / FILL {1[power]:.0f} Вт "
          "{1[k]:.0f}K ({4:.1f} стопа ниже) / RIM {2[power]:.0f} / BOUNCE "
          "{3[power]:.0f} Вт {3[k]:.0f}K, WB {5:.0f}K"
          .format(p["key"], p["fill"], p["rim"], p["bounce"], stops, p["wb_kelvin"]))

    setup_world(p)

    if p["panorama"]:
        # Свет сцены для браузера: там нет ни одного источника, кроме env.hdr,
        # поэтому в панораму должны попасть все наши area-лампы и отсвет стола.
        # Сам стакан прячем — панорама снимается из точки, где он стоит.
        for o in col.objects:
            if o.type == 'MESH' and o.name.startswith(('Cup_', 'CUP')):
                o.hide_render = True
        if 'cup_root' in dir():
            for o in cup_root.children_recursive:
                o.hide_render = True
        # ЛАМПЫ ДОЛЖНЫ БЫТЬ ВИДНЫ КАМЕРЕ. В Blender 5 у источника по умолчанию
        # visible_camera = False: сцену он освещает, а в кадр не попадает. Для
        # панорамы это значит, что в ней нет ни окна, ни заполняющего — один
        # слабый HDRI. Именно так и вышло: панорама была вчетверо темнее нужного,
        # её «вытягивали» множителем, и стакан в браузере светился ровным
        # серым со всех сторон, без светотени.
        for o in col.objects:
            if o.type == 'LIGHT':
                o.visible_camera = True
        # Ловец теней для камеры прозрачен — сквозь стол виден HDRI. В панораме
        # нужен сам стол: снизу стакан подсвечивает тёплое дерево.
        for o in col.objects:
            if getattr(o, 'is_shadow_catcher', False):
                o.is_shadow_catcher = False
        g = p["pano_gain"]
        if abs(g - 1.0) > 1e-3:
            for o in col.objects:
                if o.type == 'LIGHT':
                    o.data.energy *= g
            bg = next((n for n in scene.world.node_tree.nodes
                       if n.type == 'BACKGROUND'), None)
            if bg:
                bg.inputs['Strength'].default_value *= g
            print(f"[PC] яркость панорамы ×{g}")

        pano = bpy.data.cameras.new("PANO")
        pcam = bpy.data.objects.new("PANO", pano)
        col.objects.link(pcam)
        pano.type = 'PANO'
        for attr, val in (('panorama_type', 'EQUIRECTANGULAR'),):
            try:
                setattr(pano, attr, val)
            except Exception:
                try:
                    setattr(pano.cycles, attr, val)
                except Exception:
                    pass
        P = place_on_table(cam, scene, *p["base_px"])
        pcam.location = (P.x, P.y, 0.05)
        # Смотрит вдоль +X. Cycles совмещает панорамную камеру с развёрткой
        # окружения (центр кадра = +X мира) только в этом положении, и тогда
        # же она совпадает с развёрткой three.js. Камера вдоль +Y поворачивала
        # панораму на четверть оборота: окно оказывалось сбоку, и светотень на
        # стакане в браузере ложилась не с той стороны.
        pcam.rotation_euler = (math.radians(90), 0.0, math.radians(-90))
        scene.camera = pcam
        scene.render.resolution_x, scene.render.resolution_y = p["panorama_res"]
        scene.render.image_settings.file_format = 'HDR'
        scene.render.image_settings.color_mode = 'RGB'
        scene.use_nodes = False
        scene.compositing_node_group = None
        scene.render.film_transparent = False
        out = args["out"]
        os.makedirs(os.path.dirname(out) or ".", exist_ok=True)
        bpy.ops.render.render(write_still=False)
        bpy.data.images['Render Result'].save_render(filepath=out)
        print(f"[PC] панорама из точки стакана: {out} {p['panorama_res']}")
        return

    if p["shadow_pass"]:
        # Голый пасс: из него собирается слой тени для браузера.
        ng = bpy.data.node_groups.new("PC_SHADOW", "CompositorNodeTree")
        scene.compositing_node_group = ng
        scene.use_nodes = True
        ng.interface.new_socket("Image", in_out='OUTPUT', socket_type='NodeSocketColor')
        rl = ng.nodes.new('CompositorNodeRLayers')
        go = ng.nodes.new('NodeGroupOutput')
        key = next((k for k in ('Shadow Catcher',) if k in rl.outputs), None)
        if not key:
            raise RuntimeError("пасс Shadow Catcher недоступен")
        ng.links.new(rl.outputs[key], go.inputs['Image'])
        scene.view_settings.view_transform = 'Standard'
        scene.view_settings.exposure = 0.0
        out = args["out"]
        os.makedirs(os.path.dirname(out) or ".", exist_ok=True)
        bpy.ops.render.render(write_still=False)
        bpy.data.images['Render Result'].save_render(filepath=out)
        print(f"[PC] пасс тени: {out}")
        return

    if p["layers_dir"]:
        ss = p["supersample"]
        scene.render.resolution_x = int(p["res"][0] * ss)
        scene.render.resolution_y = int(p["res"][1] * ss)
        setup_layers_output(p, p["layers_dir"])
    else:
        setup_compositor(args["plate"], p)

    if args["blend"]:
        os.makedirs(os.path.dirname(args["blend"]) or ".", exist_ok=True)
        bpy.ops.wm.save_as_mainfile(filepath=args["blend"])
        print(f"[PC] сцена: {args['blend']}")

    out = args["out"] if args["out"].lower().endswith(".png") else args["out"] + ".png"
    os.makedirs(os.path.dirname(out) or ".", exist_ok=True)
    bpy.ops.render.render(write_still=False)
    bpy.data.images['Render Result'].save_render(filepath=out)
    print(f"[PC] готово: {out}")


if __name__ == '__main__':
    main()
