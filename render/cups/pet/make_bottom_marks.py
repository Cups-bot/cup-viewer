"""Клеймо на дне PET-стакана: карта высот для рельефа.

По фото образцов (2026-09-25): на утопленном диске дна выдавлены объём
(«500ml»), знак PET-1, «бокал-вилка» и номер гнезда формы («16», «27»), в центре
знак производителя. Знак производителя здесь не рисуется: без исходного
вектора это была бы подделка чужого товарного знака. Центр оставлен пустым,
вектор можно положить в art/<id>_bottom_logo.png — он встанет в центр.

Картинка — квадрат со стороной 2R, где R — радиус диска клейма из профиля.
Белое — выпуклое. Читается снаружи, снизу стакана: зеркалит развёртка UVBottom.

    py -3 cups/pet/make_bottom_marks.py
"""

import json
import os

from PIL import Image, ImageDraw, ImageFilter, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
SIZE = 1024


def font(size, bold=True):
    for name in (("segoeuib.ttf", "arialbd.ttf") if bold else ("segoeui.ttf", "arial.ttf")):
        try:
            return ImageFont.truetype(name, size)
        except OSError:
            continue
    return ImageFont.load_default()


def text_c(d, cx, cy, s, f):
    b = d.textbbox((0, 0), s, font=f)
    d.text((cx - (b[2] - b[0]) / 2 - b[0], cy - (b[3] - b[1]) / 2 - b[1]), s, font=f, fill=255)


def pet_symbol(d, cx, cy, s, px_mm):
    """Треугольник из трёх стрелок, «1» внутри, «PET» под ним."""
    try:
        sym = ImageFont.truetype("seguisym.ttf", int(s * 1.25))
        text_c(d, cx, cy, "♳", sym)       # ♳ — стандартный знак PET-1
    except OSError:
        h = s * 0.9
        d.polygon([(cx, cy - h / 2), (cx - h / 2, cy + h / 2), (cx + h / 2, cy + h / 2)],
                  outline=255, width=max(2, int(0.35 * px_mm)))
        text_c(d, cx, cy + h * 0.1, "1", font(int(s * 0.45)))
    text_c(d, cx, cy + s * 0.85, "PET", font(int(s * 0.38)))


def glass_fork(d, cx, cy, s, px_mm):
    """Знак «для пищевых продуктов»: бокал и вилка."""
    w = max(2, int(0.35 * px_mm))
    g = cx - s * 0.25
    d.line([(g - s * 0.28, cy - s * 0.45), (g + s * 0.28, cy - s * 0.45)], fill=255, width=w)
    d.line([(g - s * 0.28, cy - s * 0.45), (g - s * 0.12, cy)], fill=255, width=w)
    d.line([(g + s * 0.28, cy - s * 0.45), (g + s * 0.12, cy)], fill=255, width=w)
    d.line([(g - s * 0.12, cy), (g + s * 0.12, cy)], fill=255, width=w)
    d.line([(g, cy), (g, cy + s * 0.38)], fill=255, width=w)
    d.line([(g - s * 0.2, cy + s * 0.4), (g + s * 0.2, cy + s * 0.4)], fill=255, width=w)
    f = cx + s * 0.38
    d.line([(f, cy - s * 0.2), (f, cy + s * 0.45)], fill=255, width=w)
    for dx in (-0.12, 0.0, 0.12):
        d.line([(f + dx * s, cy - s * 0.48), (f + dx * s, cy - s * 0.2)], fill=255, width=max(1, w - 1))
    d.line([(f - 0.12 * s, cy - s * 0.2), (f + 0.12 * s, cy - s * 0.2)], fill=255, width=w)


def marks(cup_id, cup, radius_mm):
    px_mm = SIZE / (2 * radius_mm)
    im = Image.new("L", (SIZE, SIZE), 0)
    d = ImageDraw.Draw(im)
    c = SIZE / 2
    m = cup["marking"]
    text_c(d, c, c - 0.62 * radius_mm * px_mm, m["volume"], font(int(4.2 * px_mm)))
    pet_symbol(d, c - 0.55 * radius_mm * px_mm, c - 0.06 * radius_mm * px_mm, 5.0 * px_mm, px_mm)
    glass_fork(d, c + 0.55 * radius_mm * px_mm, c, 5.2 * px_mm, px_mm)
    text_c(d, c, c + 0.58 * radius_mm * px_mm, m["cavity"], font(int(3.8 * px_mm)))
    logo = os.path.join(HERE, "art", f"{cup_id}_bottom_logo.png")
    if os.path.isfile(logo):
        lg = Image.open(logo).convert("L")
        side = int(0.62 * radius_mm * px_mm)
        lg.thumbnail((side, side))
        im.paste(255, (int(c - lg.width / 2), int(c - lg.height / 2)), lg)
    # штамп даёт мягкую кромку, а не ступеньку
    return im.filter(ImageFilter.GaussianBlur(0.25 * px_mm))


def main():
    with open(os.path.join(HERE, "profiles.json"), encoding="utf-8") as fh:
        cfg = json.load(fh)
    out = os.path.join(HERE, "art")
    os.makedirs(out, exist_ok=True)
    for cup_id, cup in cfg["cups"].items():
        rb = cup["outer"][0][0]
        radius = rb - cfg["bottom"]["mark_inset_mm"]
        path = os.path.join(out, f"{cup_id}_bottom.png")
        marks(cup_id, cup, radius).save(path)
        print(path, f"R={radius:.1f} мм")


if __name__ == "__main__":
    main()
