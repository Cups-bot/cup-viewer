"""«Имитация картона»: макет — таким, каким его напечатают на картоне.

Тот же куб, что у сайта (js/design/proof.js): профиль типографии из Color
Palette, запечённый scripts/bake-proof.mjs в catalog/proof/<картон>.cube.gz —
цвет макета → цвет печати на этом картоне, узлы 33³, между узлами трилинейно.
Формула и округление — как у сайта, чтобы «Фотореал» совпадал с кадром.

Какой картон у материала — поле proof в catalog/materials.json; у крафта и
пластика профиля нет.
"""

import gzip
import json
import os
from functools import lru_cache
from typing import Optional

import numpy as np

CATALOG = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))),
                       "catalog")


class ProofError(Exception):
    pass


def key_for(board: Optional[str]) -> Optional[str]:
    """Картон стакана (id материала) → ключ профиля; None — профиля нет."""
    with open(os.path.join(CATALOG, "materials.json"), encoding="utf-8") as fh:
        materials = {m["id"]: m for m in json.load(fh)["materials"]}
    return (materials.get(board) or {}).get("proof")


@lru_cache(maxsize=4)
def load_cube(key: str) -> np.ndarray:
    """Куб картона: массив side×side×side×3, uint8, оси r, g, b."""
    path = os.path.join(CATALOG, "proof", f"{key}.cube.gz")
    if not os.path.isfile(path):
        raise ProofError(f"{path}: профиля картона {key!r} нет — scripts/bake-proof.mjs")
    with gzip.open(path, "rb") as fh:
        data = np.frombuffer(fh.read(), dtype=np.uint8)
    side = round((len(data) / 3) ** (1 / 3))
    if side ** 3 * 3 != len(data):
        raise ProofError(f"{path}: размер {len(data)} — не куб")
    return data.reshape(side, side, side, 3)


def apply(rgb: np.ndarray, cube: np.ndarray, chunk: int = 1 << 20) -> np.ndarray:
    """RGB 0…255 (N×3, любые числа) → RGB печати, uint8. По кускам: у крупного
    листа развёртки промежуточные массивы иначе заняли бы гигабайты."""
    side = cube.shape[0]
    scale = (side - 1) / 255.0
    last = side - 2
    lut = cube.astype(np.float64)
    out = np.empty((len(rgb), 3), dtype=np.uint8)
    for start in range(0, len(rgb), chunk):
        p = np.asarray(rgb[start:start + chunk], dtype=np.float64) * scale
        i0 = np.minimum(np.floor(p).astype(np.int64), last)
        f = p - i0
        x, y, z = i0[:, 0], i0[:, 1], i0[:, 2]
        fx, fy, fz = f[:, 0:1], f[:, 1:2], f[:, 2:3]
        # Порядок как у сайта: сначала по b, потом по g, потом по r.
        c00 = lut[x, y, z] + (lut[x, y, z + 1] - lut[x, y, z]) * fz
        c01 = lut[x, y + 1, z] + (lut[x, y + 1, z + 1] - lut[x, y + 1, z]) * fz
        c10 = lut[x + 1, y, z] + (lut[x + 1, y, z + 1] - lut[x + 1, y, z]) * fz
        c11 = lut[x + 1, y + 1, z] + (lut[x + 1, y + 1, z + 1] - lut[x + 1, y + 1, z]) * fz
        c0 = c00 + (c01 - c00) * fy
        c1 = c10 + (c11 - c10) * fy
        # Uint8ClampedArray сайта округляет половинки к чётному — np.rint тоже.
        out[start:start + chunk] = np.clip(np.rint(c0 + (c1 - c0) * fx), 0, 255)
    return out


def _to_srgb(v: np.ndarray) -> np.ndarray:
    return np.where(v <= 0.0031308, v * 12.92, 1.055 * np.power(np.maximum(v, 0), 1 / 2.4) - 0.055)


def image(im, key: str):
    """Картинка Blender → её копия в печати на картоне key (sRGB, упакована).

    У 8-битной картинки pixels — значения файла (sRGB) делённые на 255; у
    float-картинки — линейные, их сначала переводим в sRGB, как видит сайт.
    """
    import bpy

    cube = load_cube(key)
    w, h = im.size
    n = len(im.pixels) // max(w * h, 1)
    px = np.empty(w * h * n, np.float32)
    im.pixels.foreach_get(px)
    px = px.reshape(-1, n)
    rgb = px[:, :3] if n >= 3 else np.repeat(px[:, :1], 3, axis=1)
    if im.is_float:
        rgb = _to_srgb(rgb)
    printed = apply(np.clip(np.rint(rgb * 255.0), 0, 255), cube).astype(np.float32) / 255.0
    alpha = px[:, 3:4] if n == 4 else np.ones((w * h, 1), np.float32)
    out = bpy.data.images.new(f"{im.name[:50]}_{key}", w, h, alpha=n == 4)
    # Пространство — до пикселей: смена colorspace у созданной в памяти
    # картинки генерирует её заново, и записанное стирается (Blender 5.2).
    out.colorspace_settings.name = "sRGB"
    out.pixels.foreach_set(np.concatenate([printed, alpha], axis=1).ravel())
    out.pack()
    return out
