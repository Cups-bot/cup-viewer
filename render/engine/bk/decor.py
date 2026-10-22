"""Отделки бумажного стакана — как на сайте (js/core/printShading.js,
js/core/finishMap.js): металлизированный картон, тиснение фольгой,
металлизированная краска и конгрев.

Маски — файлы клиента той же развёртки, что макет: рисунок на прозрачном
фоне или чёрное на белом — где отделка
(прозрачное — без отделки). Лист растягивается на развёртку, как на сайте.

  конгрев — выдавлен вверх на свою высоту, фаска 0,4 мм;
  фольга  — вдавлена на 0,2 мм, край резче (0,08 мм), чуть фактурная
            (зерно ~0,25 мм); блестит сильнее всего: металл, почти зеркало;
  краска  — металлик-пантон: металл с широким мягким бликом;
  металлизированный картон — прозрачное в макете голый металл, белое —
            белила (глухой белый), цветное — краска по металлу.

Рельеф обеих отделок — одна карта высоты через cup_mockup/emboss.build
(paper_cup.press_height), к ней добавляется обжим дна модели.
"""

import hashlib
import os
from typing import Optional

import bpy
import numpy as np

from bk import paper_cup

PRINT = "Paper_Print"
ART_NODE = "CUPS_Artwork"
RELIEF_NODE = "CUPS_EmbossNormal"      # карта нормалей рельефа (cup_mockup/materials.py EMBOSS_NORMAL)
FOIL_DEPTH_MM = 0.2
EMBOSS_BEVEL_MM = 0.4
FOIL_BEVEL_MM = 0.08
FOIL_GRAIN_MM = 0.25
# Перламутр (голография): плёнка, толщина в нм — полный круг радуги; вклад
# направления отражения и полос по листу; частота полос по ширине листа.
HOLO_IOR = 1.9
HOLO_RANGE = (250.0, 650.0)
HOLO_VIEW = 1.6
HOLO_STREAK = 2.2
HOLO_STREAKS_BOARD = 3.5
HOLO_STREAKS_FOIL = 18.0
# Тоньше, чем на сайте: в Blender зерно рисуется по-настоящему, и при 0,01 мм
# фольга выглядела мятой.
FOIL_GRAIN_HEIGHT_MM = 0.003
SHEET_PX_PER_MM = 12.0                 # как карта рельефа (paper_cup.EMBOSS_PX_PER_MM)


class DecorError(Exception):
    pass


def linear(hexstr: str):
    h = hexstr.lstrip("#")
    out = []
    for i in (0, 2, 4):
        c = int(h[i:i + 2], 16) / 255.0
        out.append(c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4)
    return (*out, 1.0)


# ---------------------------------------------------------------------------
# маски → покрытие и высота
# ---------------------------------------------------------------------------

def coverage(path: str, size) -> np.ndarray:
    """Покрытие маски 0…1 (снизу вверх), как на сайте (core/finishMap.js):
    отделка — то, что отличается от основного тона маски (серое или чёрное на
    белом, светлое на тёмном); маска одного тона на прозрачном фоне — по
    силуэту. Прозрачное — без отделки."""
    if not os.path.isfile(path):
        raise DecorError(f"{path}: маска отделки не найдена")
    im = bpy.data.images.load(path, check_existing=False)
    try:
        im.colorspace_settings.name = "Non-Color"
        w, h = size
        if tuple(im.size) != (w, h):
            im.scale(w, h)
        px = np.empty(w * h * 4, np.float32)
        im.pixels.foreach_get(px)
    finally:
        bpy.data.images.remove(im)
    px = px.reshape(h, w, 4)
    alpha = px[..., 3]
    lum = 0.2126 * px[..., 0] + 0.7152 * px[..., 1] + 0.0722 * px[..., 2]
    if alpha.sum() < 1:
        return np.zeros_like(alpha)
    hist, _ = np.histogram(np.clip(lum, 0, 1), bins=64, range=(0, 1), weights=alpha)
    bg = (hist.argmax() + 0.5) / 64
    diff = np.abs(lum - bg)
    if ((alpha >= 0.5) & (diff > 0.25)).sum() < alpha.sum() * 0.0005:
        return alpha.copy()
    return alpha * np.clip((diff - 0.05) / 0.25, 0.0, 1.0)


def _blur(a: np.ndarray, radius_px: float) -> np.ndarray:
    """Двойное прямоугольное размытие — фаска, как на сайте."""
    r = int(round(radius_px))
    if r < 1:
        return a
    for _ in range(2):
        for axis in (0, 1):
            pad = [(r + 1, r) if i == axis else (0, 0) for i in (0, 1)]
            c = np.cumsum(np.pad(a, pad, mode="edge"), axis=axis)
            n = a.shape[axis]
            a = (np.take(c, np.arange(2 * r + 1, n + 2 * r + 1), axis=axis)
                 - np.take(c, np.arange(0, n), axis=axis)) / (2 * r + 1)
    return a


def _grain(shape, px_per_mm: float) -> np.ndarray:
    """Зерно фольги −1…1: шум по сетке ~0,25 мм, детерминированный."""
    h, w = shape
    step = FOIL_GRAIN_MM * px_per_mm
    gh, gw = int(h / step) + 2, int(w / step) + 2
    grid = np.random.default_rng(7).random((gh, gw)).astype(np.float32) * 2 - 1
    y = np.arange(h) / step
    x = np.arange(w) / step
    y0, x0 = y.astype(int), x.astype(int)
    fy = (y - y0)[:, None]
    fx = (x - x0)[None, :]
    fy, fx = fy * fy * (3 - 2 * fy), fx * fx * (3 - 2 * fx)
    a = grid[np.ix_(y0, x0)]
    b = grid[np.ix_(y0, x0 + 1)]
    c = grid[np.ix_(y0 + 1, x0)]
    d = grid[np.ix_(y0 + 1, x0 + 1)]
    return (a + (b - a) * fx) * (1 - fy) + (c + (d - c) * fx) * fy


# ---------------------------------------------------------------------------
# узлы
# ---------------------------------------------------------------------------

def _print_materials(cup):
    return [m for m in cup.data.materials if m and m.name.startswith(PRINT) and m.node_tree]


def _bsdf(nt):
    return next(n for n in nt.nodes if n.bl_idname == "ShaderNodeBsdfPrincipled")


def _sock(node, name, kind):
    return next(s for s in node.inputs if s.name == name and s.type == kind)


def _math(nt, op, a, b=0.0):
    m = nt.nodes.new("ShaderNodeMath")
    m.operation = op
    for i, v in enumerate((a, b)):
        if isinstance(v, (int, float)):
            m.inputs[i].default_value = v
        else:
            nt.links.new(v, m.inputs[i])
    return m.outputs[0]


def _mix_rgb(nt, fac, a, b, blend="MIX"):
    m = nt.nodes.new("ShaderNodeMix")
    m.data_type = "RGBA"
    m.blend_type = blend
    for sock, v in ((m.inputs["Factor"], fac), (_sock(m, "A", "RGBA"), a), (_sock(m, "B", "RGBA"), b)):
        if isinstance(v, (int, float, tuple)):
            sock.default_value = v
        else:
            nt.links.new(v, sock)
    return m.outputs["Result"]


def _uv(nt):
    """Координаты листа макета — те же, что у узла макета."""
    art = nt.nodes.get(ART_NODE)
    vec = art.inputs["Vector"] if art is not None else None
    if vec is None or not vec.is_linked:
        raise DecorError("у материала печати нет развёртки макета")
    return vec.links[0].from_socket


def _holo(nt, streaks: float):
    """Перламутр — голографическая плёнка (образец владельца — стакан CHIN CHIN,
    2026-10-22): радуга вертикальными полосами по светлому серебру, бежит при
    повороте. Цвет — по направлению отражения (как на сайте, printShading.js)
    плюс вытянутые вдоль высоты полосы по листу; streaks — их частота по ширине.
    0…1, по кругу радуги туда и обратно."""
    tc = nt.nodes.new("ShaderNodeTexCoord")
    refl = nt.nodes.new("ShaderNodeSeparateXYZ")
    nt.links.new(tc.outputs["Reflection"], refl.inputs["Vector"])
    mp = nt.nodes.new("ShaderNodeMapping")
    mp.inputs["Scale"].default_value = (streaks, streaks * 0.08, 1.0)
    nt.links.new(_uv(nt), mp.inputs["Vector"])
    noise = nt.nodes.new("ShaderNodeTexNoise")
    noise.inputs["Scale"].default_value = 1.0
    noise.inputs["Detail"].default_value = 2.0
    noise.inputs["Roughness"].default_value = 0.5
    nt.links.new(mp.outputs["Vector"], noise.inputs["Vector"])
    v = _math(nt, "ADD", _math(nt, "MULTIPLY", refl.outputs["X"], HOLO_VIEW),
              _math(nt, "MULTIPLY", noise.outputs["Fac"], HOLO_STREAK))
    return _math(nt, "PINGPONG", v, 1.0)


def _thin_film(nt, bsdf, ior: float, lo: float, hi: float, streaks: float, mask=None):
    rng = nt.nodes.new("ShaderNodeMapRange")
    nt.links.new(_holo(nt, streaks), rng.inputs["Value"])
    rng.inputs["To Min"].default_value = lo
    rng.inputs["To Max"].default_value = hi
    out = rng.outputs["Result"]
    if mask is not None:
        out = _math(nt, "MULTIPLY", out, mask)
    nt.links.new(out, bsdf.inputs["Thin Film Thickness"])
    bsdf.inputs["Thin Film IOR"].default_value = ior


def metal_board(cup, metal: dict) -> None:
    """Металлизированный картон: металл там, где макет прозрачен; белила глушат
    металл; краска окрашивает металл, просвечивающий сквозь неё."""
    for mat in _print_materials(cup):
        nt = mat.node_tree
        b = _bsdf(nt)
        art = nt.nodes.get(ART_NODE)
        if art is None:
            raise DecorError("у материала печати нет узла макета")
        art.image.alpha_mode = "STRAIGHT"
        sep = nt.nodes.new("ShaderNodeSeparateColor")
        nt.links.new(art.outputs["Color"], sep.inputs["Color"])
        low = _math(nt, "MINIMUM", _math(nt, "MINIMUM", sep.outputs[0], sep.outputs[1]), sep.outputs[2])
        # Порог белил — в sRGB, как на сайте: картинка макета линейная.
        low = _math(nt, "POWER", low, 1 / 2.2)
        rng = nt.nodes.new("ShaderNodeMapRange")
        rng.interpolation_type = "SMOOTHSTEP"
        rng.inputs["From Min"].default_value = 0.72
        rng.inputs["From Max"].default_value = 0.9
        nt.links.new(low, rng.inputs["Value"])
        alpha = art.outputs["Alpha"]
        white = _math(nt, "MULTIPLY", rng.outputs["Result"], alpha)
        tinted = _mix_rgb(nt, alpha, (1, 1, 1, 1), art.outputs["Color"])
        board = _mix_rgb(nt, 1.0, linear(metal["tone"]), tinted, "MULTIPLY")
        nt.links.new(_mix_rgb(nt, white, board, art.outputs["Color"]), b.inputs["Base Color"])
        not_white = _math(nt, "SUBTRACT", 1.0, white)
        # Металл сквозь краску — по её светлоте (как boardSee на сайте): тёмная
        # краска закрывает металл и перелив, чёрное остаётся чёрным.
        lum = nt.nodes.new("ShaderNodeRGBToBW")
        nt.links.new(art.outputs["Color"], lum.inputs["Color"])
        ink = _math(nt, "MULTIPLY", alpha, not_white)
        see = nt.nodes.new("ShaderNodeMix")
        see.data_type = "FLOAT"
        nt.links.new(ink, see.inputs["Factor"])
        _sock(see, "A", "VALUE").default_value = 1.0
        nt.links.new(_math(nt, "SQRT", lum.outputs["Val"]), _sock(see, "B", "VALUE"))
        visible = _math(nt, "MULTIPLY", not_white, see.outputs["Result"])
        nt.links.new(_math(nt, "MULTIPLY", visible, metal["metalness"]), b.inputs["Metallic"])
        rough = _math(nt, "ADD", metal["roughness"], _math(nt, "MULTIPLY", alpha, 0.08))
        mix = nt.nodes.new("ShaderNodeMix")
        mix.data_type = "FLOAT"
        nt.links.new(white, mix.inputs["Factor"])
        nt.links.new(rough, _sock(mix, "A", "VALUE"))
        _sock(mix, "B", "VALUE").default_value = 0.6
        nt.links.new(mix.outputs["Result"], b.inputs["Roughness"])
        b.inputs["Coat Weight"].default_value = 0.0
        b.inputs["Sheen Weight"].default_value = 0.0
        ir = metal.get("iridescence")
        if ir:
            _thin_film(nt, b, ir["ior"], ir["range"][0], ir["range"][1], ir.get("streaks", HOLO_STREAKS_BOARD), visible)


def _mask_image(foil: Optional[np.ndarray], ink: Optional[np.ndarray], shape, tag: str):
    h, w = shape
    px = np.zeros((h, w, 4), np.float32)
    if foil is not None:
        px[..., 0] = foil
    if ink is not None:
        px[..., 1] = ink
    px[..., 3] = 1.0
    name = f"CUPS_Decor_{tag}"
    im = bpy.data.images.new(name, w, h, alpha=False, is_data=True)
    im.colorspace_settings.name = "Non-Color"
    im.pixels.foreach_set(px.ravel())
    im.pack()
    return im


def _metal_bsdf(nt, normal_from, color, metallic: float, roughness: float):
    b = nt.nodes.new("ShaderNodeBsdfPrincipled")
    b.inputs["Base Color"].default_value = color
    b.inputs["Metallic"].default_value = metallic
    b.inputs["Roughness"].default_value = roughness
    if normal_from is not None:
        nt.links.new(normal_from, b.inputs["Normal"])
    return b


def _layer(nt, surface, fac, shader):
    mix = nt.nodes.new("ShaderNodeMixShader")
    nt.links.new(fac, mix.inputs[0])
    nt.links.new(surface, mix.inputs[1])
    nt.links.new(shader, mix.inputs[2])
    return mix.outputs[0]


def apply(project: str, entry: dict, cup, finish: dict, page_mm) -> dict:
    """Отделки из задания: {"emboss": {"mask", "depth"}, "foil": {"mask", "color",
    "iridescence"}, "ink": {"mask", "color"}} — пути масок уже абсолютные."""
    pw, ph = page_mm
    w = max(16, int(round(pw * SHEET_PX_PER_MM)))
    h = max(16, int(round(ph * SHEET_PX_PER_MM)))
    px_per_mm = w / pw
    emboss = finish.get("emboss")
    foil = finish.get("foil")
    ink = finish.get("ink")
    cov = {k: coverage(v["mask"], (w, h)) for k, v in finish.items() if v and v.get("mask")}

    height = np.zeros((h, w), np.float32)
    if "emboss" in cov:
        height += _blur(cov["emboss"], EMBOSS_BEVEL_MM * px_per_mm / 2) * float(emboss.get("depth", 0.35))
    if "foil" in cov:
        f = cov["foil"]
        height -= _blur(f, FOIL_BEVEL_MM * px_per_mm / 2) * FOIL_DEPTH_MM
        height += f * _grain((h, w), px_per_mm) * FOIL_GRAIN_HEIGHT_MM
    tag = hashlib.sha256(repr(sorted((k, v.get("mask"), v.get("depth"), v.get("color")) for k, v in finish.items()
                                     if v)).encode()).hexdigest()[:8]
    if height.any():
        paper_cup.press_height(project, entry, cup, height, tag)

    if "foil" in cov or "ink" in cov:
        im = _mask_image(cov.get("foil"), cov.get("ink"), (h, w), tag)
        for mat in _print_materials(cup):
            nt = mat.node_tree
            b = _bsdf(nt)
            out = next(n for n in nt.nodes if n.bl_idname == "ShaderNodeOutputMaterial")
            surface = out.inputs["Surface"].links[0].from_socket
            # Фольга и краска гладкие — ворс картона не повторяют: им только
            # рельеф листа (конгрев, вдавливание, зерно фольги), без бампа
            # волокна. С ним зеркало становилось шершавым и размыто отражало
            # софтбоксы — фольга выходила светло-серой, как краска.
            relief = nt.nodes.get(RELIEF_NODE)
            normal = relief.outputs["Normal"] if relief is not None else (
                b.inputs["Normal"].links[0].from_socket if b.inputs["Normal"].is_linked else None)
            tex = nt.nodes.new("ShaderNodeTexImage")
            tex.image = im
            tex.extension = "EXTEND"
            tex.interpolation = "Linear"
            nt.links.new(_uv(nt), tex.inputs["Vector"])
            sep = nt.nodes.new("ShaderNodeSeparateColor")
            nt.links.new(tex.outputs["Color"], sep.inputs["Color"])
            if "ink" in cov:
                # Металлик-пантон — сатиновый: широкий мягкий блик, без зеркала.
                paint = _metal_bsdf(nt, normal, linear(ink["color"]), 0.85, 0.42)
                surface = _layer(nt, surface, sep.outputs[1], paint.outputs["BSDF"])
            if "foil" in cov:
                sheen = _metal_bsdf(nt, normal, linear(foil["color"]), 1.0, 0.1)
                if foil.get("iridescence"):
                    # Перламутровая фольга — тот же радужный перелив, что у перламутрового картона.
                    # Полосы чаще, чем у картона: фольга — буквы и знаки, на них
                    # широкая полоса легла бы одним оттенком.
                    _thin_film(nt, sheen, HOLO_IOR, HOLO_RANGE[0], HOLO_RANGE[1], HOLO_STREAKS_FOIL)
                surface = _layer(nt, surface, sep.outputs[0], sheen.outputs["BSDF"])
            nt.links.new(surface, out.inputs["Surface"])
    return {k: {"share": round(float(c.mean()), 3)} for k, c in cov.items()}


# ---------------------------------------------------------------------------
# студия для металла
# ---------------------------------------------------------------------------

# Отражения металла. Белый мир фотобокса за камерой зеркальная фольга отражала
# как белую бумагу — металл пропадал. Металл в студии снимают с чёрными флагами
# и узкими софтбоксами: блеск — это их отражения. Кольцо вокруг стакана видно
# только отражениям (не камере, не свету): фон кадра и освещение прежние.
# (угол от направления на камеру, градусы; яркость 0…1) — симметрично.
REFLECTION_STRIPS = ((0, 0.55), (12, 0.5), (19, 1.0), (27, 1.0), (34, 0.4), (62, 0.4), (70, 0.85), (78, 0.85), (86, 0.3), (180, 0.2))
REFLECTION_STRENGTH = 5.0


def is_metallic(printed: Optional[dict]) -> bool:
    return bool(printed and printed.get("metal"))


def reflection_set(height: float, camera, coll, prefix: str = "BK_"):
    """Кольцо отражений вокруг стакана (начало координат), лицом к камере.

    Стенка стакана расширяется кверху: зеркало смотрит чуть вниз и отражало
    ярко освещённый пол фотобокса перед стаканом. Как чёрная карта у
    фотографа: пол отражениям не виден (greybox), а кольцо уходит глубоко
    под пол и закрывает эти направления."""
    import math
    segments = 128
    radius = 8.0 * height
    lo, hi = -12.0 * height, 10.0 * height
    verts, faces = [], []
    for i in range(segments):
        a = 2 * math.pi * i / segments
        x, y = radius * math.sin(a), -radius * math.cos(a)
        verts += [(x, y, lo), (x, y, hi)]
        j = (i + 1) % segments
        faces.append((2 * i, 2 * j, 2 * j + 1, 2 * i + 1))
    mesh = bpy.data.meshes.new(prefix + "Metal_Reflections")
    mesh.from_pydata(verts, [], faces)
    mesh.update()
    mat = bpy.data.materials.new(prefix + "Metal_Reflections")
    mat.use_nodes = True
    nt = mat.node_tree
    nt.nodes.clear()
    out = nt.nodes.new("ShaderNodeOutputMaterial")
    emit = nt.nodes.new("ShaderNodeEmission")
    emit.inputs["Strength"].default_value = REFLECTION_STRENGTH
    tc = nt.nodes.new("ShaderNodeTexCoord")
    sep = nt.nodes.new("ShaderNodeSeparateXYZ")
    nt.links.new(tc.outputs["Object"], sep.inputs["Vector"])
    # Угол от направления на камеру (−Y кольца): atan2(x, −y) → 0…1, 0,5 — камера.
    angle = _math(nt, "ARCTAN2", sep.outputs["X"], _math(nt, "MULTIPLY", sep.outputs["Y"], -1.0))
    t = _math(nt, "MULTIPLY_ADD", angle, 1.0 / (2 * math.pi))
    t.node.inputs[2].default_value = 0.5
    ramp = nt.nodes.new("ShaderNodeValToRGB")
    els = ramp.color_ramp.elements
    stops = sorted({(0.5 + s * deg / 360.0, v) for deg, v in REFLECTION_STRIPS for s in (-1, 1)})
    while len(els) < len(stops):
        els.new(0.0)
    for el, (pos, v) in zip(els, stops):
        el.position = pos
        el.color = (v, v, v, 1.0)
    nt.links.new(t, ramp.inputs["Fac"])
    nt.links.new(ramp.outputs["Color"], emit.inputs["Color"])
    nt.links.new(emit.outputs["Emission"], out.inputs["Surface"])
    # Не источник света: прямым светом его не выбирать — только отражения.
    mat.cycles.emission_sampling = "NONE"
    mesh.materials.append(mat)
    obj = bpy.data.objects.new(prefix + "Metal_Reflections", mesh)
    coll.objects.link(obj)
    obj.visible_camera = False
    obj.visible_diffuse = False
    obj.visible_shadow = False
    obj.visible_transmission = False
    obj.visible_volume_scatter = False
    obj.visible_glossy = True
    # matrix_world камеры только что поставленной ещё не пересчитан.
    bpy.context.view_layer.update()
    cam = camera.matrix_world.translation
    obj.rotation_euler.z = math.atan2(cam.x, -cam.y)
    return obj
