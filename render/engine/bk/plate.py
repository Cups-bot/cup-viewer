"""Фон-снимок под кадром: подкладывается после рендера, а не светит в камеру.

Сцены по AI-референсу (парк) берут дальний фон готовым снимком владельца —
уже размытым, как у объектива. Через мир сцены камера видит его сквозь свою
диафрагму, и размытие ложится второй раз (парк, 50 мм f/5.6 с 39 см: пятно
~46 px на 1254 — стволы и боке превращаются в кашу). Здесь проход рендерится
с прозрачным фоном, а снимок подкладывается по той же привязке, что и в
шейдере мира: по направлению в осях камеры (полуширина — тангенс, центр —
сдвиг, края — зеркально), с той же экспозицией и тонмаппингом. Свет и
отражения снимок по-прежнему даёт через мир сцены.

Сцена объявляет снимок своими свойствами (engine/tools/build_*.py):
  cups_plate        путь к снимку («//…» — от .blend)
  cups_plate_tan    полуширина снимка — тангенс угла от оси камеры
  cups_plate_shift  центр снимка (tx, ty) в тех же тангенсах
  cups_plate_gain   яркость (как Strength фона в мире), по умолчанию 1
  cups_plate_sat, cups_plate_contrast, cups_plate_knee — спокойнее фон
                    (насыщенность, контраст, с какой яркости прижимать пятна
                    боке); по умолчанию 1 — снимок как есть
"""

from typing import Optional

import numpy as np

from bk.finish import to_linear, to_srgb


def config(scene) -> Optional[dict]:
    path = scene.get("cups_plate")
    if not path:
        return None
    import bpy

    return {"image": bpy.path.abspath(path), "tan": float(scene["cups_plate_tan"]),
            "shift": tuple(float(v) for v in scene["cups_plate_shift"]),
            "gain": float(scene.get("cups_plate_gain", 1.0)),
            "sat": float(scene.get("cups_plate_sat", 1.0)),
            "contrast": float(scene.get("cups_plate_contrast", 1.0)),
            "knee": float(scene.get("cups_plate_knee", 1.0))}


def grade(disp: np.ndarray, sat: float = 1.0, contrast: float = 1.0, knee: float = 1.0) -> np.ndarray:
    """Экранный снимок (sRGB 0…1) спокойнее: насыщенность к яркости, контраст к
    середине шкалы, выше knee — мягкое прижатие (tanh) к единице."""
    if sat == 1.0 and contrast == 1.0 and knee >= 1.0:
        return disp
    L = (disp[..., 0] * 0.2126 + disp[..., 1] * 0.7152 + disp[..., 2] * 0.0722)[..., None]
    out = L + (disp - L) * sat
    out = 0.5 + (out - 0.5) * contrast
    if knee < 1.0:
        room = 1.0 - knee
        out = np.where(out > knee, knee + room * np.tanh((out - knee) / room), out)
    return np.clip(out, 0.0, 1.0)


def pbr_neutral(c: np.ndarray) -> np.ndarray:
    """Khronos PBR Neutral (как вид «Khronos PBR Neutral» Blender), линейный Rec.709 → линейный."""
    start = 0.8 - 0.04
    desat = 0.15
    x = c.min(axis=-1, keepdims=True)
    offset = np.where(x < 0.08, x - 6.25 * x * x, 0.04)
    c = c - offset
    peak = c.max(axis=-1, keepdims=True)
    d = 1.0 - start
    new_peak = 1.0 - d * d / np.maximum(peak + d - start, 1e-6)
    scaled = c * (new_peak / np.maximum(peak, 1e-6))
    g = 1.0 - 1.0 / (desat * (peak - new_peak) + 1.0)
    compressed = scaled + (new_peak - scaled) * g
    return np.where(peak < start, c, compressed)


def display(scene, lin: np.ndarray) -> np.ndarray:
    """Сцена → экран (sRGB 0…1) так же, как вид сцены: экспозиция, тонмаппинг."""
    vs = scene.view_settings
    if vs.look not in ("None", "") or vs.use_curve_mapping or abs(vs.gamma - 1.0) > 1e-6:
        raise ValueError("фон-снимок: вид сцены с look/кривой/гаммой не поддержан")
    lin = lin * (2.0 ** vs.exposure)
    if vs.view_transform == "Khronos PBR Neutral":
        lin = pbr_neutral(lin)
    elif vs.view_transform != "Standard":
        raise ValueError(f"фон-снимок: тонмаппинг «{vs.view_transform}» не поддержан")
    return np.clip(to_srgb(np.clip(lin, 0.0, None)), 0.0, 1.0)


def tangents(scene, w: int, h: int):
    """Тангенсы направлений центров пикселей кадра (ряд 0 — низ, как у bpy),
    с учётом рамки вырезки (use_border + use_crop_to_border)."""
    r = scene.render
    cam = scene.camera
    X = r.resolution_x * r.resolution_percentage // 100
    Y = r.resolution_y * r.resolution_percentage // 100
    frame = cam.data.view_frame(scene=scene)       # tr, br, bl, tl в осях камеры
    tx = [v.x / -v.z for v in frame]
    ty = [v.y / -v.z for v in frame]
    left, right = min(tx), max(tx)
    bottom, top = min(ty), max(ty)
    x0 = y0 = 0
    if r.use_border and r.use_crop_to_border:
        x0, y0 = int(r.border_min_x * X), int(r.border_min_y * Y)
    u = (x0 + np.arange(w) + 0.5) / X
    v = (y0 + np.arange(h) + 0.5) / Y
    return left + u * (right - left), bottom + v * (top - bottom)


def _mirror(i: np.ndarray, n: int) -> np.ndarray:
    i = np.mod(i, 2 * n)
    return np.where(i >= n, 2 * n - 1 - i, i)


def sample(img: np.ndarray, px: np.ndarray, py: np.ndarray) -> np.ndarray:
    """Билинейная выборка с зеркальными краями (как extension MIRROR). img — ряд 0 внизу."""
    H, W = img.shape[:2]
    x0 = np.floor(px).astype(np.int64)
    y0 = np.floor(py).astype(np.int64)
    fx = (px - x0)[..., None]
    fy = (py - y0)[..., None]
    xa, xb = _mirror(x0, W), _mirror(x0 + 1, W)
    ya, yb = _mirror(y0, H), _mirror(y0 + 1, H)
    top = img[yb, xa] * (1 - fx) + img[yb, xb] * fx
    bot = img[ya, xa] * (1 - fx) + img[ya, xb] * fx
    return bot * (1 - fy) + top * fy


def layer(scene, cfg: dict, w: int, h: int) -> np.ndarray:
    """Снимок в кадре: линейные значения экрана (display → linear), h×w×3, ряд 0 внизу."""
    from bk.finish import _load

    px, linear = _load(cfg["image"])
    plate = px[..., :3] if linear else to_linear(px[..., :3])
    PH, PW = plate.shape[:2]
    tx, ty = tangents(scene, w, h)
    sx, sy = cfg["shift"]
    k = 0.5 / cfg["tan"]
    u = 0.5 + (tx - sx) * k
    v = 0.5 + (ty - sy) * k
    gx, gy = np.meshgrid(u * PW - 0.5, v * PH - 0.5)
    lin = sample(plate, gx, gy) * cfg["gain"]
    disp = grade(display(scene, lin), cfg.get("sat", 1.0), cfg.get("contrast", 1.0), cfg.get("knee", 1.0))
    return to_linear(disp)


def under(path: str, scene, cfg: dict) -> str:
    """PNG прохода с прозрачным фоном → тот же PNG (RGB, 8 бит sRGB) со снимком под ним."""
    import bpy
    from bk.finish import _load

    px, linear = _load(path)
    h, w = px.shape[:2]
    a = px[..., 3:4]
    # 16 бит Blender читает линейным и уже умноженным на прозрачность; 8 бит — как в файле.
    fg = px[..., :3] if linear else to_linear(px[..., :3]) * a
    rgb = fg + layer(scene, cfg, w, h) * (1.0 - a)
    out = bpy.data.images.new("CUPS_Plate", w, h, alpha=True)
    # Пространство — до пикселей: смена colorspace стирает записанное (Blender 5.2).
    out.colorspace_settings.name = "sRGB"
    rgba = np.concatenate([to_srgb(np.clip(rgb, 0, 1)), np.ones((h, w, 1), np.float32)], axis=-1)
    out.pixels.foreach_set(rgba.astype(np.float32).ravel())
    out.filepath_raw = path
    out.file_format = "PNG"
    out.save()
    bpy.data.images.remove(out)
    return path


def shoot(scene, path: str, render) -> str:
    """Проход с прозрачным фоном и снимком под ним. render(scene, path, rgba) — снимает кадр."""
    cfg = config(scene)
    r = scene.render
    was = r.film_transparent
    try:
        r.film_transparent = True
        render(scene, path, True)
    finally:
        r.film_transparent = was
    return under(path, scene, cfg)
