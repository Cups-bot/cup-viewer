# -*- coding: utf-8 -*-
"""
Доводка композита: согласовать 3D-слой с оптикой и зерном фотографии.

    python finish_composite.py --render out.png --plate base.png --out final.png

Рендер выходит математически чистым: края и мелкий текст режутся ровнее, чем
всё остальное в кадре, и на нём нет зерна. Глаз ловит именно это несоответствие,
а не геометрию. Скрипт находит, где в кадре лежит 3D (по расхождению с исходной
фотографией), и только туда добавляет лёгкое смягчение и зерно той же величины,
что на снимке.

Зерно меряется по самой подложке, а не задаётся на глаз: берётся разница между
гладким участком и его размытой версией.
"""

import argparse
import math
import os
import random

from PIL import Image, ImageChops, ImageFilter


def measure_grain(img, box):
    """sigma шума на ровном участке: разница с сильно размытой копией."""
    c = img.convert('L').crop(box)
    d = ImageChops.difference(c, c.filter(ImageFilter.GaussianBlur(2.0)))
    vals = list(d.getdata())
    m = sum(vals) / len(vals)
    return math.sqrt(sum((v - m) ** 2 for v in vals) / len(vals))


def build_mask(render, plate, threshold, grow, feather):
    """Где в кадре 3D: там, где композит разошёлся с исходной фотографией.

    Захватывает и стакан, и его тень — тень тоже часть 3D-слоя и тоже должна
    получить зерно, иначе она выглядит чище окружающего стола.
    """
    diff = ImageChops.difference(render.convert('RGB'), plate.convert('RGB')).convert('L')
    mask = diff.point(lambda v: 255 if v > threshold else 0)
    if grow > 0:
        mask = mask.filter(ImageFilter.MaxFilter(grow * 2 + 1))
    return mask.filter(ImageFilter.GaussianBlur(feather))


def apply_grade(img, mask, gains):
    """Покональный множитель только на 3D-слой.

    Тёплую интеграцию нельзя делать по самой текстуре макета — иначе поедет
    цвет печати. Поэтому лёгкий грейд кладётся в самом конце и только туда,
    где лежит 3D.
    """
    if all(abs(g - 1.0) < 1e-3 for g in gains):
        return img
    src = img.convert('RGB').split()
    out = []
    for ch, g in zip(src, gains):
        adj = ch.point(lambda v, g=g: max(0, min(255, int(v * g + 0.5))))
        out.append(Image.composite(adj, ch, mask))
    return Image.merge('RGB', out)


def apply_grain(img, mask, sigma, seed=3):
    if sigma <= 0.01:
        return img
    rnd = random.Random(seed)
    w, h = img.size
    noise = Image.new('L', (w, h))
    # Один канал шума на все три: плёночное зерно ближе к яркостному, чем к
    # цветному, и цветной шум сразу читается как «цифра».
    noise.putdata([max(0, min(255, int(128 + rnd.gauss(0, sigma)))) for _ in range(w * h)])
    src = img.convert('RGB').split()
    out = []
    for ch in src:
        grained = ImageChops.add(ImageChops.subtract(ch, noise, scale=1, offset=128),
                                 noise, scale=1, offset=-128)
        out.append(Image.composite(grained, ch, mask))
    return Image.merge('RGB', out)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--render', required=True, help='композит из Blender')
    ap.add_argument('--plate', required=True, help='исходная фотография')
    ap.add_argument('--out', required=True)
    ap.add_argument('--soften', type=float, default=0.45,
                    help='радиус смягчения 3D-слоя, px')
    ap.add_argument('--grain', type=float, default=-1.0,
                    help='sigma зерна; -1 — замерить по подложке')
    ap.add_argument('--grain-box', default='700,1230,900,1330',
                    help='ровный участок подложки для замера зерна')
    ap.add_argument('--grade', default='1.0,1.0,1.0',
                    help='множители R,G,B для 3D-слоя (интеграция по белому)')
    ap.add_argument('--threshold', type=int, default=8)
    ap.add_argument('--grow', type=int, default=2)
    ap.add_argument('--feather', type=float, default=1.5)
    a = ap.parse_args()

    render = Image.open(a.render).convert('RGB')
    plate = Image.open(a.plate).convert('RGB')
    if render.size != plate.size:
        plate = plate.resize(render.size, Image.LANCZOS)

    sigma = a.grain
    if sigma < 0:
        box = tuple(int(v) for v in a.grain_box.split(','))
        sigma = measure_grain(plate, box)
        print(f'зерно подложки: sigma = {sigma:.2f}')

    mask = build_mask(render, plate, a.threshold, a.grow, a.feather)
    covered = sum(mask.point(lambda v: 1 if v > 8 else 0).getdata())
    print(f'3D занимает {covered} px ({covered / (render.width * render.height) * 100:.1f}% кадра)')

    if a.soften > 0:
        blurred = render.filter(ImageFilter.GaussianBlur(a.soften))
        render = Image.composite(blurred, render, mask)
        print(f'смягчение 3D-слоя: {a.soften} px')

    gains = tuple(float(v) for v in a.grade.split(','))
    if any(abs(g - 1.0) > 1e-3 for g in gains):
        render = apply_grade(render, mask, gains)
        print(f'грейд 3D-слоя: R×{gains[0]} G×{gains[1]} B×{gains[2]}')
    render = apply_grain(render, mask, sigma)
    os.makedirs(os.path.dirname(os.path.abspath(a.out)) or '.', exist_ok=True)
    render.save(a.out)
    print(f'готово: {a.out}')


if __name__ == '__main__':
    main()
