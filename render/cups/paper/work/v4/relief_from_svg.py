"""Waffle emboss of an EM cup, from the client's vector sheet to relief data.

py -3.10 work/v4/relief_from_svg.py EM80-280 [EM90-430 ...]

Input: `sources.emboss_svg` of the model — the EMBO layer saved as SVG on the
artboard of the template page (landscape A4; 297 x 235 for EM90-530), so its
coordinates are the sheet's and nothing has to be registered.  Black is the
pressed net of grooves, white stays up.

Output: `emboss.relief` of the model (an .npz next to the SVG) with
  * the lattice of the net — two smooth fields u, v on the sheet, polynomials
    of degree 4 in page millimetres, whole numbers along the groove centre
    lines.  The mesh is laid along them, so its edges follow the grooves
    instead of cutting them diagonally;
  * the width of the grooves in lattice units;
  * the height field, white = 1, sampled at 12 px/mm with the same bevel the
    normal map had (two box blurs of 1/3 mm), so the relief looks as before.

Also writes `<model>_waffle.png` next to it: the same net as a black and white
sheet at 300 dpi, the default emboss of the normal-map variant (EMxx-xxx-NM).

Needs numpy, OpenCV and Pillow; Blender only reads the .npz.
"""
import collections
import importlib.util
import json
import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

import cv2
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
spec = importlib.util.spec_from_file_location('paper', ROOT / 'cup_mockup/paper.py')
paper = importlib.util.module_from_spec(spec)
spec.loader.exec_module(paper)

PX_PER_MM = 12            # height field stored in the .npz
SUPER = 4                 # supersampling of the vector fill
BEVEL_BOX_MM = 1 / 3      # one box of the normal map's bevel (2 px at 6 px/mm), applied twice
DEG = 4                   # degree of the lattice polynomials
TOK = re.compile(r'[MmLlHhVvCcSsZz]|-?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?')


# ---------------------------------------------------------------- SVG

def _bezier(p0, p1, p2, p3, n=8):
    t = np.linspace(0, 1, n + 1)[1:, None]
    return (1 - t) ** 3 * p0 + 3 * (1 - t) ** 2 * t * p1 + 3 * (1 - t) * t * t * p2 + t ** 3 * p3


def _path(d):
    """Subpaths of an SVG path as polylines (Illustrator output: M L H V C S Z)."""
    toks = TOK.findall(d)
    i, cmd = 0, None
    cur, start, last = np.zeros(2), np.zeros(2), None
    subs, pts = [], []

    def num():
        nonlocal i
        i += 1
        return float(toks[i - 1])
    while i < len(toks):
        if toks[i].isalpha():
            cmd = toks[i]
            i += 1
            if cmd in 'Zz':
                if pts:
                    subs.append(np.array(pts))
                pts, cur, last = [], start.copy(), None
                continue
        c, base = cmd.upper(), (cur if cmd.islower() else np.zeros(2))
        if c == 'M':
            if pts:
                subs.append(np.array(pts))
            cur = base + (num(), num())
            start, pts, last = cur.copy(), [cur.copy()], None
            cmd = 'l' if cmd.islower() else 'L'
        elif c == 'L':
            cur = base + (num(), num())
            pts.append(cur.copy())
            last = None
        elif c == 'H':
            x = num()
            cur = np.array([cur[0] + x if cmd.islower() else x, cur[1]])
            pts.append(cur.copy())
            last = None
        elif c == 'V':
            y = num()
            cur = np.array([cur[0], cur[1] + y if cmd.islower() else y])
            pts.append(cur.copy())
            last = None
        elif c in 'CS':
            p1 = (2 * cur - last if last is not None else cur.copy()) if c == 'S' else base + (num(), num())
            p2, p3 = base + (num(), num()), base + (num(), num())
            pts.extend(_bezier(cur, p1, p2, p3))
            last, cur = p2, p3
        else:
            raise ValueError(f'SVG command {cmd} is not supported')
    if pts:
        subs.append(np.array(pts))
    return subs


def load_svg(path, page=paper.A4_MM):
    """Filled outlines of the net in page millimetres, one list per <path>."""
    root = ET.parse(path).getroot()
    vb = [float(v) for v in root.get('viewBox').split()]
    mm = page[0] / vb[2]
    if abs(vb[3] * mm - page[1]) > 0.5:
        raise ValueError(f'{path.name}: artboard {vb[2]}x{vb[3]} is not the template page {page[0]:g}x{page[1]:g} mm'
                         ' — save the SVG with the artboard of the template')
    return [[(s - vb[:2]) * mm for s in _path(el.get('d')) if len(s) >= 3]
            for el in root.iter('{http://www.w3.org/2000/svg}path')]


def _area(s):
    return 0.5 * abs(np.sum(s[:, 0] * np.roll(s[:, 1], -1) - np.roll(s[:, 0], -1) * s[:, 1]))


def _corners(s):
    return cv2.approxPolyDP(s.astype(np.float32).reshape(-1, 1, 2), 0.15, True).reshape(-1, 2).astype(float)


def pick_net(paths, name):
    """The one <path> that is the whole net: an outline with the cells as holes.

    Illustrator sometimes leaves the net twice, one copy over the other (the
    EM90-430 sheet has two, 0.1 mm apart, one with a damaged cell).  Filled
    together they would cancel by parity, so exactly one copy is used: the one
    whose every cell is a clean four-cornered diamond."""
    nets = []
    for polys in paths:
        areas = np.array([_area(s) for s in polys])
        if len(polys) < 20:
            continue                                   # stray dots and hairlines of the export
        outer = int(np.argmax(areas))
        typical = np.median(np.delete(areas, outer))
        cells = [s for k, s in enumerate(polys) if k != outer and 0.4 * typical < areas[k] < 2.5 * typical]
        bad = [s.mean(0).round(1).tolist() for s in cells if len(_corners(s)) != 4]
        nets.append((len(bad), -len(cells), polys, outer, cells, bad))
    if not nets:
        raise ValueError(f'{name}: no net of cells found')
    nets.sort(key=lambda n: n[:2])
    for n in nets[1:]:
        print(f'{name}: another copy of the net skipped ({-n[1]} cells, damaged at {n[5][:3]} mm)')
    if nets[0][0]:
        raise ValueError(f'{name}: cells that are not diamonds at {nets[0][5][:5]} mm')
    return nets[0][2], nets[0][3], nets[0][4]


# ---------------------------------------------------------------- lattice

def features(X, Y, apex, deg=DEG):
    x = (np.asarray(X, float) - apex[0]) / 100.0
    y = (apex[1] - np.asarray(Y, float)) / 100.0
    return np.stack([x ** i * y ** j for i in range(deg + 1) for j in range(deg + 1 - i)], axis=-1)


def label_cells(C, apex):
    """Whole-number lattice position of every cell, by walking the neighbours.

    Neighbours sit about 45 degrees off the radius of the fan: +u up and to the
    right, +v up and to the left."""
    th = np.arctan2(C[:, 0] - apex[0], apex[1] - C[:, 1])
    rad = np.column_stack((np.sin(th), -np.cos(th)))
    tan = np.column_stack((np.cos(th), np.sin(th)))
    eu, ev = (rad + tan) / np.sqrt(2), (rad - tan) / np.sqrt(2)
    d = np.linalg.norm(C[:, None] - C[None], axis=2)
    np.fill_diagonal(d, np.inf)
    step = np.median(np.sort(d, axis=1)[:, 0])
    R = np.hypot(C[:, 0] - apex[0], apex[1] - C[:, 1])
    start = int(np.argmin(np.abs(th) + np.abs(R - np.median(R)) / 100))
    lab, queue, conflicts = {start: (0, 0)}, collections.deque([start]), 0
    while queue:
        a = queue.popleft()
        i, j = lab[a]
        for b in np.argsort(d[a])[:8]:
            if d[a, b] > 1.4 * step:
                break
            v = C[b] - C[a]
            pu, pv = v @ eu[a], v @ ev[a]
            if abs(abs(pu) - abs(pv)) < 0.35 * step:        # diagonal neighbour, skip
                continue
            want = (i + int(np.sign(pu)), j) if abs(pu) > abs(pv) else (i, j + int(np.sign(pv)))
            if b in lab:
                conflicts += lab[b] != want
                continue
            lab[b] = want
            queue.append(b)
    return lab, conflicts


def fit(model):
    p = paper.load_params(model)
    src = ROOT / p['sources']['emboss_svg']
    apex = p['template']['apex_mm']
    polys, outer, cells = pick_net(load_svg(src, paper.page_of(p)), src.name)
    C = np.array([_corners(s) for s in cells]).mean(axis=1)
    lab, conflicts = label_cells(C, apex)
    if conflicts or len(lab) != len(C):
        raise ValueError(f'{src.name}: lattice walk failed ({len(lab)}/{len(C)} cells, {conflicts} conflicts)')
    idx = np.array(sorted(lab))
    IJ = np.array([lab[k] for k in idx], float) + 0.5          # cell centres sit at half-integers
    F = features(C[idx, 0], C[idx, 1], apex)
    cu = np.linalg.lstsq(F, IJ[:, 0], rcond=None)[0]
    cv = np.linalg.lstsq(F, IJ[:, 1], rcond=None)[0]
    res = np.hypot(F @ cu - IJ[:, 0], F @ cv - IJ[:, 1])
    # groove: the cell is a square in (u, v); its half side is where the black starts
    half = []
    for n, k in enumerate(idx):
        Fs = features(cells[k][:, 0], cells[k][:, 1], apex)
        u, v = Fs @ cu - IJ[n, 0], Fs @ cv - IJ[n, 1]
        half += [np.median(np.abs(u[np.abs(u) > np.abs(v) + 0.1])), np.median(np.abs(v[np.abs(v) > np.abs(u) + 0.1]))]
    groove_half = 0.5 - float(np.median(half))
    eps = 0.01
    gx = (features(C[:, 0] + eps, C[:, 1], apex) - features(C[:, 0] - eps, C[:, 1], apex)) @ cu / (2 * eps)
    gy = (features(C[:, 0], C[:, 1] + eps, apex) - features(C[:, 0], C[:, 1] - eps, apex)) @ cu / (2 * eps)
    pitch = 1.0 / np.hypot(gx, gy)
    # inverse map (u, v) -> page, the starting point of the Newton steps in the build
    X, Y = np.meshgrid(np.linspace(C[:, 0].min() - 40, C[:, 0].max() + 40, 120),
                       np.linspace(C[:, 1].min() - 40, C[:, 1].max() + 40, 60))
    Fg = features(X.ravel(), Y.ravel(), apex)
    U, V = Fg @ cu, Fg @ cv
    G = features_uv(U, V)
    ix = np.linalg.lstsq(G, X.ravel(), rcond=None)[0]
    iy = np.linalg.lstsq(G, Y.ravel(), rcond=None)[0]
    return {'p': p, 'src': src, 'polys': polys, 'cu': cu, 'cv': cv, 'ix': ix, 'iy': iy, 'apex': np.array(apex, float),
            'groove_half': groove_half, 'pitch': pitch, 'fit_rms_mm': float(np.sqrt(np.mean(res ** 2)) * np.median(pitch)),
            'fit_max_mm': float(res.max() * np.median(pitch)), 'cells': len(C)}


def features_uv(U, V, deg=DEG):
    u, v = np.asarray(U, float) / 50.0, np.asarray(V, float) / 50.0
    return np.stack([u ** i * v ** j for i in range(deg + 1) for j in range(deg + 1 - i)], axis=-1)


# ---------------------------------------------------------------- height

def height(polys, page, px_per_mm=PX_PER_MM):
    """White = 1 on the whole sheet, the net pressed to 0, bevelled as the normal map was."""
    w, h = round(page[0] * px_per_mm), round(page[1] * px_per_mm)
    allp = np.concatenate(polys)
    x0, y0 = np.floor(allp.min(0) * px_per_mm).astype(int) - 8
    x1, y1 = np.ceil(allp.max(0) * px_per_mm).astype(int) + 8
    x0, y0, x1, y1 = max(x0, 0), max(y0, 0), min(x1, w), min(y1, h)
    k = px_per_mm * SUPER
    big = np.zeros(((y1 - y0) * SUPER, (x1 - x0) * SUPER), np.uint8)
    # OpenCV fills pixels by their centres at whole numbers; page pixels have them at +0.5
    pts = [np.round((s * k - (x0 * SUPER, y0 * SUPER) - 0.5) * 16).astype(np.int32) for s in polys]
    cv2.fillPoly(big, pts, 255, lineType=cv2.LINE_8, shift=4)   # several contours: holes by parity
    black = cv2.resize(big.astype(np.float32) / 255, (x1 - x0, y1 - y0), interpolation=cv2.INTER_AREA)
    out = np.ones((h, w), np.float32)
    out[y0:y1, x0:x1] = 1.0 - black
    return cv2.sepFilter2D(out, -1, KERNEL, KERNEL, borderType=cv2.BORDER_REPLICATE)


# The bevel: a box of 1/3 mm applied twice, a triangle at 12 px/mm.  Its edge
# runs from white to black over 0.5 mm with the steepest slope (46 degrees at
# 0.35 mm) in the middle — the same slope the normal map had.
_n = round(BEVEL_BOX_MM * PX_PER_MM)
KERNEL = np.convolve(np.ones(_n), np.ones(_n))
KERNEL /= KERNEL.sum()
BEVEL_MM = (len(KERNEL) - 1) / PX_PER_MM          # full width of the edge, white to black


def main(model):
    f = fit(model)
    hgt = height(f['polys'], paper.page_of(f['p']))
    dest = ROOT / f['p']['emboss']['relief']
    dest.parent.mkdir(parents=True, exist_ok=True)
    np.savez_compressed(dest, cu=f['cu'], cv=f['cv'], ix=f['ix'], iy=f['iy'], apex=f['apex'], deg=DEG,
                        groove_half=f['groove_half'], pitch_mm=float(np.median(f['pitch'])),
                        bevel_mm=BEVEL_MM, height=np.round(hgt * 65535).astype(np.uint16),
                        px_per_mm=PX_PER_MM, source=str(f['src'].relative_to(ROOT)))
    info = {'model': model, 'cells': f['cells'], 'fit_rms_mm': round(f['fit_rms_mm'], 4), 'fit_max_mm': round(f['fit_max_mm'], 4),
            'groove_width_mm': round(2 * f['groove_half'] * float(np.median(f['pitch'])), 3),
            'pitch_mm': [round(float(x), 3) for x in np.percentile(f['pitch'], [0, 50, 100])]}
    print('saved', dest, json.dumps(info, ensure_ascii=False))
    # the same net as a black and white sheet: the emboss of the normal-map variant
    page = paper.page_of(f['p'])
    k = 300 / 25.4 * SUPER                   # supersampled, pixel centres at +0.5 as in the page
    w, h = round(page[0] * 300 / 25.4), round(page[1] * 300 / 25.4)
    big = np.full((h * SUPER, w * SUPER), 255, np.uint8)
    cv2.fillPoly(big, [np.round((s * k - 0.5) * 16).astype(np.int32) for s in f['polys']], 0, lineType=cv2.LINE_8, shift=4)
    sheet = cv2.resize(big, (w, h), interpolation=cv2.INTER_AREA)
    bw = dest.parent / f'{model}_waffle.png'
    Image.fromarray(sheet).save(bw, dpi=(300, 300))
    print('sheet', bw, sheet.shape[::-1])
    # review: lattice lines over the net
    review = ROOT / 'output/production' / model / 'review'
    review.mkdir(parents=True, exist_ok=True)
    shade = (np.clip(hgt, 0, 1) * 255).astype(np.uint8)
    img = cv2.cvtColor(shade, cv2.COLOR_GRAY2BGR)
    Xg, Yg = np.meshgrid(np.arange(img.shape[1]) / PX_PER_MM, np.arange(img.shape[0]) / PX_PER_MM)
    for lo in range(0, img.shape[0], 400):                        # chunks: the page is 9 Mpx
        Fg = features(Xg[lo:lo + 400].ravel(), Yg[lo:lo + 400].ravel(), f['apex'])
        for coef, col in ((f['cu'], (0, 0, 255)), (f['cv'], (255, 0, 0))):
            val = (Fg @ coef).reshape(-1, img.shape[1])
            edge = np.abs(val - np.round(val)) * f['pitch'].mean() < 0.06
            img[lo:lo + 400][edge] = col
    cv2.imwrite(str(review / '10_relief_lattice.png'), img)
    print('review', review / '10_relief_lattice.png')


if __name__ == '__main__':
    for m in sys.argv[1:]:
        main(m)
