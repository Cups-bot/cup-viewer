"""Section of the built cup against the nominal outline of the drawing.

py -3.10 work/v4/profile_vs_drawing.py MODEL [MODEL ...]

Saves output/production/<MODEL>/review/01_profile_vs_drawing.png.  Grey dashes
— the numbers of the drawing (cone of the wall, rim, base, top of the floor,
fill line); black — the two faces of the board as the model builds them, with
the rim and the heel magnified.  Needs no Blender: the same paper.py the
add-on uses.
"""
import importlib.util
import math
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[2]
spec = importlib.util.spec_from_file_location('paper', ROOT / 'cup_mockup/paper.py')
paper = importlib.util.module_from_spec(spec)
spec.loader.exec_module(paper)
PX = 8.0                     # pixels per millimetre in the main view
ZOOM = 7.0                   # magnification of the rim and heel insets
PAD, RIGHT, TOP = 40, 210, 44
GREY, INK, MARK = (150, 150, 150), (20, 20, 20), (0, 120, 200)


def font(size):
    try:
        return ImageFont.truetype('seguisb.ttf', size)
    except OSError:
        return ImageFont.load_default()


def dashes(d, a, b, fill, step=7):
    a, b = np.array(a, float), np.array(b, float)
    n = max(1, int(np.hypot(*(b - a)) / step))
    for i in range(0, n, 2):
        d.line([tuple(a + (b - a) * i / n), tuple(a + (b - a) * min(i + 1, n) / n)], fill=fill)


def sections(model):
    p = paper.load_params(model)
    body = p['inner'] if paper.is_double_wall(p) else p        # DW: the unprinted inner cup
    cup, con, mesh = body['cup'], body['construction'], body['mesh']
    prof = paper.cup_profile(cup, con, mesh)
    P, N, t, _ = prof.arrays()
    faces = [P + N * (side * t / 2)[:, None] for side in (+1, -1)]
    faces.append(np.asarray(paper.floor_section(cup, con, mesh)))
    if paper.is_double_wall(p):                       # the sleeve over the inner cup
        sp = paper.sleeve_profile(p['sleeve'], cup, p['mesh'])
        SP, SN, st, _ = sp.arrays()
        faces += [SP + SN * (side * st / 2)[:, None] for side in (+1, -1)]
    return cup, faces


def draw(model):
    name = model.split('/')[-1]
    cup, curves = sections(model)
    H, R = cup['height_mm'], cup['rim_od_mm'] / 2
    w = int((R + 8) * PX) + PAD + RIGHT
    h = int((H + 10) * PX) + PAD + TOP
    img = Image.new('RGB', (w, h), 'white')
    d = ImageDraw.Draw(img)
    x0, y0 = PAD, h - PAD

    def pt(r, z):
        return x0 + r * PX, y0 - z * PX

    base, taper = cup['base_od_mm'] / 2, math.tan(math.radians(cup['taper_deg']))
    dashes(d, pt(base, 0), pt(base + taper * H, H), GREY)                  # wall cone
    rows = [(0.0, f"Ø{cup['base_od_mm']} опора", GREY), (H, f"Ø{cup['rim_od_mm']} венчик", GREY),
            (cup['floor_top_mm'], f"дно {cup['floor_top_mm']}", GREY)]
    if cup.get('fill_line_z_mm'):
        rows.append((cup['fill_line_z_mm'], f"{cup['fill_volume_ml']:.0f} мл на {cup['fill_line_z_mm']}", MARK))
    for z, label, col in rows:
        dashes(d, pt(0, z), pt(R + 6, z), col)
        d.text((x0 + (R + 6) * PX + 6, y0 - z * PX - 8), label, col, font=font(14))
    dashes(d, pt(0, -4), pt(0, H + 6), GREY)
    for c in curves:
        d.line([pt(*q) for q in c], fill=INK, width=2)

    # ---- magnified rim and heel, drawn where the main view has free space
    def inset(cz, cr, box, title):
        """Same two curves, magnified, on a white patch pasted over the view."""
        bx, by, size = box
        sub = Image.new('RGB', (size, size), 'white')
        sd = ImageDraw.Draw(sub)
        cx, cy = size / 2, size / 2 + 9

        def q(r, z):
            return cx + (r - cr) * ZOOM, cy - (z - cz) * ZOOM
        dashes(sd, q(base + taper * cz - 9, cz), q(base + taper * cz + 9, cz), GREY)
        reach = size / 2 / ZOOM + 2
        for c in curves:
            m = (np.abs(c[:, 1] - cz) < reach) & (np.abs(c[:, 0] - cr) < reach)
            if m.sum() > 1:
                sd.line([q(*x) for x in c[m]], fill=INK, width=2)
        img.paste(sub, (bx, by))
        d.rectangle([bx, by, bx + size - 1, by + size - 1], outline=GREY)
        d.text((bx + 6, by + 5), title, GREY, font=font(13))

    size = int(min(26 * ZOOM, R * PX - 10))
    inset(H - cup['curl_d_mm'] / 2, R - cup['curl_d_mm'] / 2, (PAD + 8, TOP + 16, size), f'венчик ×{ZOOM:.0f}')
    inset(cup['floor_top_mm'] / 2, base, (PAD + 8, h - PAD - 16 - size, size), f'пятка и дно ×{ZOOM:.0f}')
    d.text((PAD, 14), f'{name}: пунктир — чертёж, чёрное — модель (сечение картона)', INK, font=font(17))
    out = ROOT / 'output/production' / name / 'review'
    out.mkdir(parents=True, exist_ok=True)
    img.save(out / '01_profile_vs_drawing.png')
    print('saved', out / '01_profile_vs_drawing.png')


for m in sys.argv[1:] or ['HB80-280']:
    draw(m)
