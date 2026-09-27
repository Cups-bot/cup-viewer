"""«Камера»: готовый кадр — таким, каким его отдала бы профессиональная камера.

Рендер после PBR Neutral честен к цвету, но слишком чист: ровная тональность,
ни зерна, ни виньетки, ни ореола у бликов — глаз читает это как 3D. Здесь то,
что добавляет к снимку сама съёмка (владелец, 2026-09-27: «как фото на проф
камеру»):

1. Тональная кривая камеры — S-кривая по яркости с опорой на 18 % серого:
   серая карта калибровки (engine/tools/calibrate_exposure.py) остаётся на
   месте, тени глубже, света ярче. Цвет — отношением, оттенок печати не уходит.
2. Ореол ярких бликов (halation) — тёплое свечение объектива вокруг самого
   яркого.
3. Виньетка объектива — чуть темнее к углам.
4. Резкость на выходе — возвращает то, что сгладил шумодав.
5. Зерно сенсора — яркостное, сильнее в полутонах, размер привязан к кадру:
   одинаково выглядит и на 2000, и на 4000 px.

Всё детерминировано (зерно — от seed), без bpy: считается numpy, проверяется
render/engine/tests/test_finish.py. Кадр — display-значения sRGB, 0…1.
"""

from typing import Optional

import numpy as np

# Опора кривой — 18 % серого в sRGB (118 из 255).
PIVOT = 0.4613
PARAMS = {
    "contrast": 0.14,       # прибавка контраста в опоре кривой
    "halation": 0.30,       # сила ореола
    "halation_from": 0.86,  # с какой яркости блик светится
    "vignette_ev": 0.30,    # потеря в углах, EV
    "sharpen": 0.35,        # резкость на выходе
    "grain": 0.007,         # зерно в полутонах, доля шкалы (ISO 100–200 полного кадра)
}
REF_WIDTH = 2000.0          # под этот кадр подобраны радиусы; больше кадр — больше радиусы


def to_linear(v: np.ndarray) -> np.ndarray:
    return np.where(v <= 0.04045, v / 12.92, np.power((np.maximum(v, 0) + 0.055) / 1.055, 2.4))


def to_srgb(v: np.ndarray) -> np.ndarray:
    return np.where(v <= 0.0031308, v * 12.92, 1.055 * np.power(np.maximum(v, 0), 1 / 2.4) - 0.055)


def luma(img: np.ndarray) -> np.ndarray:
    return img[..., 0] * 0.2126 + img[..., 1] * 0.7152 + img[..., 2] * 0.0722


def curve(L: np.ndarray, contrast: float) -> np.ndarray:
    """S-кривая: концы 0 и 1 и опора на месте, наклон в опоре — 1 + contrast."""
    k = contrast / (4 * PIVOT * (1 - PIVOT))
    return L + k * 4 * L * (1 - L) * (L - PIVOT)


def tone(img: np.ndarray, contrast: float) -> np.ndarray:
    L = luma(img)
    L2 = curve(np.clip(L, 0, 1), contrast)
    out = img * (L2 / np.maximum(L, 1e-4))[..., None]
    # Канал ушёл за край — к серому той же яркости, а не обрезкой: иначе
    # насыщенный блик меняет оттенок.
    over = out.max(axis=2)
    t = np.clip((over - 1.0) / np.maximum(over - L2, 1e-4), 0, 1)[..., None]
    return out + (L2[..., None] - out) * t


def box(a: np.ndarray, r: int, axis: int) -> np.ndarray:
    """Среднее по окну 2r+1 вдоль оси — через накопленную сумму, края продлены."""
    if r < 1:
        return a
    pad = [(0, 0)] * a.ndim
    pad[axis] = (r + 1, r)
    c = np.cumsum(np.pad(a, pad, mode="edge"), axis=axis, dtype=np.float64)
    n = a.shape[axis]
    hi = np.take(c, np.arange(2 * r + 1, 2 * r + 1 + n), axis=axis)
    lo = np.take(c, np.arange(0, n), axis=axis)
    return ((hi - lo) / (2 * r + 1)).astype(np.float32)


def blur(a: np.ndarray, sigma: float) -> np.ndarray:
    """Гаусс тремя проходами коробки по каждой оси (ошибка — доли процента)."""
    if sigma < 0.3:
        return a
    r = max(1, int(round(np.sqrt(12 * sigma * sigma / 3 + 1) / 2 - 0.5)))
    for axis in (0, 1):
        for _ in range(3):
            a = box(a, r, axis)
    return a


def halation(img: np.ndarray, strength: float, start: float, scale: float) -> np.ndarray:
    h, w = img.shape[:2]
    f = 8
    bright = np.clip(img - start, 0, None)[: h - h % f, : w - w % f]
    small = bright.reshape(bright.shape[0] // f, f, bright.shape[1] // f, f, 3).mean(axis=(1, 3))
    small = blur(small, 12.0 * scale / f * 4)
    big = np.repeat(np.repeat(small, f, axis=0), f, axis=1)
    big = blur(big, f / 2)
    glow = np.zeros_like(img)
    glow[: big.shape[0], : big.shape[1]] = big
    return img + glow * (strength * np.array([1.0, 0.82, 0.62], np.float32))


def vignette(img: np.ndarray, ev: float) -> np.ndarray:
    h, w = img.shape[:2]
    y = (np.arange(h, dtype=np.float32) - (h - 1) / 2) / (h / 2)
    x = (np.arange(w, dtype=np.float32) - (w - 1) / 2) / (w / 2)
    r2 = (y[:, None] ** 2 + x[None, :] ** 2) / 2.0   # угол — 1
    gain = np.power(2.0, -ev * r2 ** 1.5).astype(np.float32)
    return to_srgb(to_linear(img) * gain[..., None]).astype(np.float32)


def sharpen(img: np.ndarray, amount: float, scale: float) -> np.ndarray:
    soft = blur(img, 0.7 * scale)
    return img + (img - soft) * amount


def grain(img: np.ndarray, amount: float, scale: float, seed: int) -> np.ndarray:
    h, w = img.shape[:2]
    rng = np.random.default_rng(seed)
    n = rng.standard_normal((h, w), dtype=np.float32)
    size = 0.45 * scale
    if size >= 0.3:
        n = blur(n, size)
        n /= max(float(n.std()), 1e-6)
    L = np.clip(luma(img), 0, 1)
    sigma = amount * 2.0 * np.sqrt(L * (1 - L))
    return img + (n * sigma)[..., None]


def finish(img: np.ndarray, seed: int = 0, params: Optional[dict] = None) -> np.ndarray:
    """Кадр (H×W×3 или ×4, display sRGB 0…1) → кадр после «камеры», float32 0…1."""
    p = {**PARAMS, **(params or {})}
    rgb = img[..., :3].astype(np.float32)
    scale = max(rgb.shape[1], rgb.shape[0]) / REF_WIDTH
    rgb = tone(rgb, p["contrast"])
    rgb = halation(rgb, p["halation"], p["halation_from"], scale)
    rgb = vignette(np.clip(rgb, 0, None), p["vignette_ev"])
    rgb = sharpen(rgb, p["sharpen"], scale)
    rgb = grain(rgb, p["grain"], scale, seed)
    rgb = np.clip(rgb, 0, 1)
    if img.shape[-1] == 4:
        return np.concatenate([rgb, img[..., 3:4].astype(np.float32)], axis=-1)
    return rgb


def _load(path: str):
    """PNG Blender → (H×W×4 float32, линейный ли). 16-битный Blender читает
    линейным и с прозрачностью, умноженной на цвет; 8-битный — как в файле."""
    import bpy

    im = bpy.data.images.load(path, check_existing=False)
    w, h = im.size
    n = im.channels
    px = np.empty(w * h * n, np.float32)
    im.pixels.foreach_get(px)
    linear = im.is_float
    bpy.data.images.remove(im)
    px = px.reshape(h, w, n)
    if n == 3:
        px = np.concatenate([px, np.ones((h, w, 1), np.float32)], axis=-1)
    return px, linear


def apply_file(path: str, seed: int = 0, over: Optional[str] = None, camera: bool = True) -> str:
    """PNG кадра (Blender) → тот же PNG, 8 бит sRGB: сначала склейка фокуса
    (over — слой стакана, bk/stack.py), потом «камера» (camera=False — без неё)."""
    import bpy

    px, linear = _load(path)
    rgb = px[..., :3] if linear else to_linear(px[..., :3])
    if over:
        top, top_linear = _load(over)
        if top.shape != px.shape:
            raise ValueError(f"слой стакана {top.shape[:2]} не совпал с кадром {px.shape[:2]}")
        if not top_linear:
            top[..., :3] = to_linear(top[..., :3]) * top[..., 3:4]
        rgb = top[..., :3] + rgb * (1.0 - top[..., 3:4])
    img = np.concatenate([to_srgb(rgb).astype(np.float32), np.ones_like(px[..., 3:4])], axis=-1)
    h, w = img.shape[:2]
    out_px = finish(img, seed) if camera else img
    if out_px.shape[-1] == 3:
        out_px = np.concatenate([out_px, np.ones((h, w, 1), np.float32)], axis=-1)
    # Сдвиг на полшага до округления — вместо ступенек в плавных переходах.
    out_px[..., :3] += (np.random.default_rng(seed + 1).random((h, w, 1), dtype=np.float32) - 0.5) / 255.0
    out = bpy.data.images.new("CUPS_Finish", w, h, alpha=True)
    # Пространство — до пикселей: смена colorspace стирает записанное (Blender 5.2).
    out.colorspace_settings.name = "sRGB"
    out.pixels.foreach_set(np.clip(out_px, 0, 1).ravel())
    out.filepath_raw = path
    out.file_format = "PNG"
    out.save()
    bpy.data.images.remove(out)
    return path
