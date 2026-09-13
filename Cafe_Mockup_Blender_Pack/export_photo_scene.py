# -*- coding: utf-8 -*-
"""
Сборка фото-сцены для вьювера из снятой подложки.

    python export_photo_scene.py --plate base.png --id cafe

Делает всё, что просит assets/scenes/<id>/ (формат описан в
js/core/photoScene.js и js/data/scenes.js):

    backdrop.webp / backdrop-tall.webp   кадр БЕЗ стакана и без тени
    env.hdr                              панорама из точки, где стоит стакан:
                                         в браузере это ЕДИНСТВЕННЫЙ источник
                                         света, поэтому в неё запечены все
                                         area-лампы сцены и отсвет стола
    shadow-<модель>.webp (+ -tall)       слой запечённой тени, СВОЙ НА КАЖДУЮ
                                         модель: тень зависит от высоты и
                                         формы стакана
    scene.json                           камера, пол, масштаб, список теней

Почему тень нельзя снять один раз: у DW80-280 (92 мм) и PP-650 (179 мм) при
одном и том же свете тени различаются и по длине, и по плотности. Поэтому
скрипт гоняет Blender по каждой позиции каталога.

Про кадры. Вьювер держит два: широкий и вертикальный, и переключает их по форме
колонки на странице. Оба вырезаются из одной подложки ЦЕНТРИРОВАННО относительно
оптической оси — иначе симметричная камера в three.js не совпадёт с проекцией.
"""

import argparse
import json
import math
import os
import re
import subprocess
import sys

from PIL import Image, ImageFilter

PACK = os.path.dirname(os.path.abspath(__file__))
PROJ = os.path.dirname(PACK)
BLENDER = os.environ.get(
    'BLENDER_EXE',
    r'C:\Program Files\Blender Foundation\Blender 5.2\blender.exe')
BUILD = os.path.join(PACK, 'build_photo_composite.py')


def read_catalog():
    """Модели каталога прямо из js/data/models.js — второго списка заводить
    нельзя, разъедутся."""
    src = open(os.path.join(PROJ, 'js', 'data', 'models.js'), encoding='utf-8').read()
    cups = []
    for m in re.finditer(r"id:\s*'([^']+)'.*?file:\s*'([^']+)'.*?"
                         r"size:\s*\{\s*height:\s*([\d.]+)", src, re.S):
        cups.append({'id': m.group(1), 'file': m.group(2), 'height': float(m.group(3))})
    return cups


def srgb_to_linear(v):
    return v / 12.92 if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4


def linear_to_srgb(v):
    v = max(0.0, min(1.0, v))
    return v * 12.92 if v <= 0.0031308 else 1.055 * (v ** (1 / 2.4)) - 0.055


S2L = [srgb_to_linear(i / 255.0) for i in range(256)]


def run_blender(plate, out, params, cup=None):
    cmd = [BLENDER, '-b', '--factory-startup', '-P', BUILD, '--',
           '--plate', plate, '--out', out, '--params', json.dumps(params)]
    if cup:
        cmd += ['--cup', cup]
    r = subprocess.run(cmd, capture_output=True, text=True, encoding='utf-8', errors='replace')
    if r.returncode != 0:
        sys.stderr.write(r.stdout[-3000:] + r.stderr[-3000:])
        raise RuntimeError(f'Blender вернул {r.returncode}')
    for line in r.stdout.splitlines():
        if line.startswith('[PC]') and ('пасс' in line or 'панорама' in line or 'стакан:' in line):
            print('   ' + line)
    return r.stdout


def crops(width, height):
    """Два кадра, оба центрированы на оптической оси: вертикальный — вся
    подложка, широкий — квадрат из её середины."""
    side = min(width, height)
    top = (height - side) // 2
    return {
        'wide': (0, top, width, top + side),
        'tall': (0, 0, width, height),
    }


def shadow_layer(plate, shadow_png, box, gain=1.0, tint=(1.0, 1.0, 1.0),
                 smooth=1.4, floor_alpha=5):
    """Пасс тени → слой RGBA для three.js.

    Вьювер рисует слой ПОВЕРХ фона обычным alpha-blend, а нам нужно умножение.
    Решается покадрово: alpha = 1 − min(s), цвет подбирается так, чтобы
    alpha-over дал ровно plate·s. Считается в ЛИНЕЙНОМ пространстве — three
    декодирует sRGB-текстуру перед смешиванием.

    gain и tint — те же, что у композита в build_photo_composite.py
    (shadow_gain·shadow_power и shadow_tint): там тень вмешивается как
    plate·(1 − gain·tint·(1 − s)). Без них слой выходил в 1.35 раза светлее
    согласованного рендера, и стакан в браузере висел над столом.
    """
    pl = plate.crop(box).convert('RGB')
    # Пасс приходит с шумом рендера. Тень всё равно мягкая, а шум в альфе
    # ломает сжатие webp — слой раздувается в разы. Слегка размываем.
    sh = Image.open(shadow_png).convert('RGB').crop(box)
    if smooth > 0:
        sh = sh.filter(ImageFilter.GaussianBlur(smooth))
    w, h = pl.size
    out = Image.new('RGBA', (w, h))
    pp, sp, op = pl.load(), sh.load(), out.load()
    for y in range(h):
        for x in range(w):
            s = [min(1.0, max(0.0, 1.0 - gain * tint[c] * (1.0 - S2L[sp[x, y][c]])))
                 for c in range(3)]
            smin = min(s)
            a = 1.0 - smin
            # Еле заметное затенение по всему столу только весит: обрезаем.
            if a * 255 <= floor_alpha:
                op[x, y] = (0, 0, 0, 0)
                continue
            px = [S2L[pp[x, y][c]] for c in range(3)]
            rgb = tuple(int(round(linear_to_srgb(px[c] * (s[c] - smin) / a) * 255))
                        for c in range(3))
            op[x, y] = rgb + (int(round(a * 255)),)
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--plate', required=True)
    ap.add_argument('--id', default='cafe')
    ap.add_argument('--label', default='Кофейня')
    ap.add_argument('--note', default='Утренний свет из окна')
    ap.add_argument('--samples', type=int, default=512)
    ap.add_argument('--pano-samples', type=int, default=256)
    ap.add_argument('--pano-gain', type=float, default=1.0,
                    help='яркость панорамы; 1 — ровно свет композита')
    ap.add_argument('--pano-res', default='512x256')
    ap.add_argument('--reuse', action='store_true',
                    help='не пересчитывать пассы теней, взять готовые из --work')
    ap.add_argument('--work', default=os.path.join(PACK, 'build', 'scene'))
    ap.add_argument('--only', default='', help='собрать тень только для этой модели')
    a = ap.parse_args()

    dest = os.path.join(PROJ, 'assets', 'scenes', a.id)
    os.makedirs(dest, exist_ok=True)
    os.makedirs(a.work, exist_ok=True)

    plate = Image.open(a.plate).convert('RGB')
    W, H = plate.size
    box = crops(W, H)
    print(f'подложка {W}×{H}; кадры: wide {box["wide"]}, tall {box["tall"]}')

    # ── фон ────────────────────────────────────────────────────────────────
    for frame, name in (('wide', 'backdrop.webp'), ('tall', 'backdrop-tall.webp')):
        plate.crop(box[frame]).save(os.path.join(dest, name), 'WEBP', quality=94, method=6)
        print(f'фон {frame}: {name}')

    # ── панорама = свет сцены для браузера ─────────────────────────────────
    pw, ph = (int(v) for v in a.pano_res.split('x'))
    env = os.path.join(dest, 'env.hdr')
    print('панорама...')
    run_blender(a.plate, env, {'samples': a.pano_samples, 'panorama': True,
                               'panorama_res': [pw, ph], 'pano_gain': a.pano_gain})

    # ── геометрия камеры из той же сборки ──────────────────────────────────
    probe = os.path.join(a.work, '_probe.json')
    # Разрешение обязано быть рабочим: точка стакана берётся лучом через
    # пиксель base_px, а он считается относительно кадра.
    run_blender(a.plate, os.path.join(a.work, '_probe.png'),
                {'samples': 1, 'res': [W, H], 'camera_dump': probe})
    cam = json.load(open(probe, encoding='utf-8'))

    f_px = cam['lens'] / cam['sensor'] * W
    fov = {}
    for frame in ('wide', 'tall'):
        x0, y0, x1, y1 = box[frame]
        fov[frame] = {
            'x': round(math.degrees(2 * math.atan((x1 - x0) / 2 / f_px)), 4),
            'y': round(math.degrees(2 * math.atan((y1 - y0) / 2 / f_px)), 4),
        }

    # Blender Z-вверх → three.js Y-вверх
    def to_three(p):
        return [round(p[0], 5), round(p[2], 5), round(-p[1], 5)]

    scene = {
        'id': a.id,
        'label': a.label,
        'backdrop': {'wide': 'backdrop.webp', 'tall': 'backdrop-tall.webp'},
        'environment': 'env.hdr',
        'camera': {
            'position': to_three(cam['position']),
            'target': to_three(cam['target']),
            'fov': fov,
            'lens_mm': cam['lens'],
            'shift': [0.0, 0.0],
            'fstop': cam.get('fstop', 0.0) or 0.0,
        },
        # Сцена собрана в метрах, пол на нуле. Но тень снимается со стакана,
        # увеличенного на cup_scale (подобранный в кадре размер), а браузер
        # ставит стакан по миллиметрам каталога. Чтобы в браузере он вышел
        # ровно таким же, как тот, что отбросил тень, миллиметров в единице
        # сцены должно быть в cup_scale раз меньше. Иначе стакан оказывается
        # меньше собственной тени, и из-под него торчит незатенённое пятно.
        'floor': {'y': 0.0, 'mmPerUnit': round(1000.0 / cam.get('cup_scale', 1.0), 3)},
        'cup': {'origin': to_three(cam['cup_origin'])},
        'view': {'transform': 'Standard', 'look': 'None', 'exposure': 0.0},
        'frames': {
            'wide': [box['wide'][2] - box['wide'][0], box['wide'][3] - box['wide'][1]],
            'tall': [box['tall'][2] - box['tall'][0], box['tall'][3] - box['tall'][1]],
        },
        'quick': False,
        # Яркость панорамы на стакане. Два замера:
        #   • против эталона Blender (белый DW80-280, build/gt_*.png) браузер
        #     сходится при 1.25 — светотень и уровни стенки в пределах 5–10
        #     единиц из 255 (недостающие 25 % — переотражения, которых three не
        #     считает);
        #   • но сами лампы композита подбирались под тёмно-коричневую печать и
        #     белый стакан недосвечивают: центр стенки выходит на 79, тогда как
        #     белая бумага на картинке 2 (кант и внутренность стакана) лежит на
        #     200–235, а держатель мешалок в той же точке снимка получает света
        #     примерно втрое больше. Белый стакан при 1.25 читался серым
        #     пластиком.
        # Ориентир — фотография: 2.8 ставит стенку на 115–190, кант и
        # внутренность — на 160–180, вровень с белым на снимке.
        'environmentIntensity': 2.8,
        # Ключевой источник вьювер наводит на ярчайшую точку панорамы, а здесь
        # это солнце в HDRI с другой стороны от окна. Тень запечена, светит
        # панорама — источник не нужен вовсе.
        'shadow': {'keyScale': 0.0},
        'shadows': {},
        # Плотность тени в браузере. Слой уже несёт плотность композита, а кадр
        # с тенью вьювер кладёт под стакан после тонмаппинга, как есть, —
        # поэтому ровно 1, без подгонки.
        'shadowOpacity': 1.0,
    }
    scene['shadowFrame'] = scene['frames']['wide']
    scene['shadowFrames'] = dict(scene['frames'])

    # ── тени: по одной на каждую модель каталога ───────────────────────────
    cups = read_catalog()
    if a.only:
        cups = [c for c in cups if c['id'] == a.only]
    for cup in cups:
        glb = os.path.join(PROJ, cup['file'].replace('/', os.sep))
        if not os.path.isfile(glb):
            print(f"[!] {cup['id']}: нет файла {cup['file']} — пропуск")
            continue
        raw = os.path.join(a.work, f"shadow-{cup['id']}.png")
        if a.reuse and os.path.isfile(raw):
            print(f"тень {cup['id']} ({cup['height']:.0f} мм): готовый пасс")
        else:
            print(f"тень {cup['id']} ({cup['height']:.0f} мм)...")
            run_blender(a.plate, raw, {'samples': a.samples, 'shadow_pass': True,
                                       'cup_height_mm': cup['height']}, cup=glb)
        entry = {}
        gain = cam.get('shadow_gain', 1.0) * cam.get('shadow_power', 1.0)
        tint = cam.get('shadow_tint', [1.0, 1.0, 1.0])
        for frame, suffix in (('wide', ''), ('tall', '-tall')):
            name = f"shadow-{cup['id']}{suffix}.webp"
            shadow_layer(plate, raw, box[frame], gain, tint).save(
                os.path.join(dest, name), 'WEBP', quality=92, method=6, lossless=False)
            entry[frame] = name
        scene['shadows'][cup['id']] = entry

    json.dump(scene, open(os.path.join(dest, 'scene.json'), 'w', encoding='utf-8'),
              ensure_ascii=False, indent=2)
    print(f"\nсцена собрана: assets/scenes/{a.id}/")
    for f in sorted(os.listdir(dest)):
        print('  ', f, os.path.getsize(os.path.join(dest, f)) // 1024, 'КБ')


if __name__ == '__main__':
    main()
