"""Тестовый макет для PET: сторона А и сторона Б в размер поля печати каждого стакана.

Макет нужен, чтобы видеть на рендере, где кончается поле и не тянется ли
картинка по стенке. Рамка поля — тонкая линия по краю, в центре знак и надпись.

    py -3 cups/pet/make_test_art.py
"""

import json
import os

from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
DPI = 300
BLUE = (0, 113, 227, 255)
INK = (29, 29, 31, 255)


def font(size, bold=False):
    for name in (("segoeuib.ttf", "arialbd.ttf") if bold else ("segoeui.ttf", "arial.ttf")):
        try:
            return ImageFont.truetype(name, size)
        except OSError:
            continue
    return ImageFont.load_default()


def centred(d, y, text, f, fill, w):
    box = d.textbbox((0, 0), text, font=f)
    d.text(((w - (box[2] - box[0])) / 2, y), text, font=f, fill=fill)


def side(cup_id, letter, w_mm, h_mm):
    w, h = round(w_mm / 25.4 * DPI), round(h_mm / 25.4 * DPI)
    im = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    d.rectangle([2, 2, w - 3, h - 3], outline=BLUE, width=3)
    ring = min(w, h) * 0.32
    cx, cy = w / 2, h * 0.40
    d.ellipse([cx - ring, cy - ring, cx + ring, cy + ring], outline=BLUE, width=max(8, int(ring * 0.16)))
    centred(d, cy - ring * 0.45, letter, font(int(ring * 0.9), True), INK, w)
    centred(d, h * 0.72, cup_id, font(int(h * 0.075), True), INK, w)
    centred(d, h * 0.82, "сторона " + letter, font(int(h * 0.055)), BLUE, w)
    return im


def main():
    with open(os.path.join(HERE, "profiles.json"), encoding="utf-8") as fh:
        cfg = json.load(fh)
    out = os.path.join(HERE, "art")
    os.makedirs(out, exist_ok=True)
    w_mm = cfg["print"]["width_mm"]
    for cup_id, cup in cfg["cups"].items():
        z0, z1 = cup["print_z_mm"]
        for letter in ("А", "Б"):
            tag = "A" if letter == "А" else "B"
            path = os.path.join(out, f"{cup_id}_test_{tag}.png")
            side(cup_id, letter, w_mm, z1 - z0).save(path, dpi=(DPI, DPI))
            print(path)


if __name__ == "__main__":
    main()
