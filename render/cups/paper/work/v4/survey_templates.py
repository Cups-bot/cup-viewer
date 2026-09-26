"""Survey of every Formacia template in Mockups/: contours, apex, arcs, edges.

py -3.10 work/v4/survey_templates.py

For each PDF: vector paths grouped by stroke colour (green die-cut, blue
visible area, red print area), a common apex fitted to the die-cut arcs, arc
radii about that apex, straight-edge angles as linear functions of R, and the
derived cone: half-angle from the visible span (one full turn), radii on the
cup.  Writes work/v4/survey/templates.json and a QA overlay per template.
"""
import json
import math
import re
from pathlib import Path

import fitz
import numpy as np
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'work/v4/survey'
PT = 25.4 / 72
COLOURS = {'green': (0.17, 0.58, 0.31), 'blue': (0.28, 0.38, 0.68), 'red': (0.93, 0.11, 0.14)}


def close(c, ref, tol=.06):
    return c is not None and len(c) == 3 and all(abs(a - b) < tol for a, b in zip(c, ref))


def sample(item, step):
    kind = item[0]
    if kind == 'l':
        a, b = item[1], item[2]
        n = max(2, int(math.hypot(b.x - a.x, b.y - a.y) / step))
        return [(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t) for t in np.linspace(0, 1, n)]
    if kind == 'c':
        p0, p1, p2, p3 = item[1:5]
        n = max(4, int((math.hypot(p1.x - p0.x, p1.y - p0.y) + math.hypot(p2.x - p1.x, p2.y - p1.y) + math.hypot(p3.x - p2.x, p3.y - p2.y)) / step))
        return [(( 1 - t)**3 * p0.x + 3 * (1 - t)**2 * t * p1.x + 3 * (1 - t) * t * t * p2.x + t**3 * p3.x,
                 (1 - t)**3 * p0.y + 3 * (1 - t)**2 * t * p1.y + 3 * (1 - t) * t * t * p2.y + t**3 * p3.y) for t in np.linspace(0, 1, n)]
    return []


def fit_circle(pts):
    p = np.asarray(pts)
    A = np.column_stack((2 * p[:, 0], 2 * p[:, 1], np.ones(len(p))))
    cx, cy, c = np.linalg.lstsq(A, (p ** 2).sum(1), rcond=None)[0]
    r = math.sqrt(c + cx * cx + cy * cy)
    return (cx, cy, r), float(np.abs(np.hypot(p[:, 0] - cx, p[:, 1] - cy) - r).max())


def polar(pts, c):
    return np.hypot(pts[:, 0] - c[0], pts[:, 1] - c[1]), np.degrees(np.arctan2(pts[:, 0] - c[0], -(pts[:, 1] - c[1])))


def extract(page):
    out = {k: [] for k in COLOURS}
    for d in page.get_drawings():
        col = d.get('color')
        for name, ref in COLOURS.items():
            if close(col, ref) and d.get('width', 0) >= .9:
                for it in d['items']:
                    out[name] += sample(it, .5 / PT)
    return {k: np.array(v) * PT for k, v in out.items() if len(v) > 20}


def analyse(pdf):
    doc = fitz.open(pdf)
    page = doc[0]
    c = extract(page)
    res = {'file': pdf.name, 'page_mm': [round(page.rect.width * PT, 2), round(page.rect.height * PT, 2)], 'found': list(c)}
    text = page.get_text()
    m = re.search(r'(\d+)\s*ml\s*\(([^)]+)\)', text)
    res['label'] = m.group(0) if m else None
    t = re.search(r'Тип стакана:\s*([^\n]+)', text)
    res['type_text'] = t.group(1).strip() if t else None
    res['layers'] = [v['name'] for v in doc.get_ocgs().values()]
    if 'green' not in c:
        res['error'] = 'no die-cut contour'
        return res, c
    g = c['green']
    # Central strip holds only the top and bottom arcs: fit each, average the centres.
    xc = (g[:, 0].min() + g[:, 0].max()) / 2
    strip = g[np.abs(g[:, 0] - xc) < 35]
    ymid = (strip[:, 1].min() + strip[:, 1].max()) / 2
    (t1x, t1y, _), _ = fit_circle(strip[strip[:, 1] < ymid])
    (b1x, b1y, _), _ = fit_circle(strip[strip[:, 1] > ymid])
    apex = [(t1x + b1x) / 2, (t1y + b1y) / 2]
    for _ in range(6):
        r, a = polar(g, apex)
        lo = g[(r < r.min() + 2) & (np.abs(a) < 14)]
        hi = g[(r > r.max() - 2) & (np.abs(a) < 14)]
        (bx, by, _), _ = fit_circle(lo)
        (tx, ty, _), _ = fit_circle(hi)
        apex = [(bx + tx) / 2, (by + ty) / 2]
    res['apex_mm'] = [round(apex[0], 3), round(apex[1], 3)]
    for name, pts in c.items():
        r, a = polar(pts, apex)
        rmin, rmax = np.percentile(r, .5), np.percentile(r, 99.5)
        lo = r[(r < rmin + 1.2) & (np.abs(a) < 12)]
        hi = r[(r > rmax - 1.2) & (np.abs(a) < 12)]
        rb, rt = float(np.median(lo)), float(np.median(hi))
        side = (r > rb + 4) & (r < rt - 4)
        block = {'R_top_mm': round(rt, 2), 'R_bottom_mm': round(rb, 2)}
        for key, sel in (('left', side & (a < 0)), ('right', side & (a > 0))):
            if sel.sum() < 6:
                continue
            k, a0 = np.polyfit(r[sel], a[sel], 1)
            block[key + '_deg'] = [round(float(a0 + k * rb), 4), round(float(k), 7), round(rb, 2)]
        res[name] = block
    return res, c


def derive(res):
    """Cone of the cup from the template alone."""
    v, g = res.get('blue'), res.get('green')
    if not v or 'left_deg' not in v or 'right_deg' not in v:
        return
    span = v['right_deg'][0] - v['left_deg'][0]
    beta = math.degrees(math.asin(span / 360.0))
    sb = math.sin(math.radians(beta))
    d = {'visible_span_deg': round(span, 3), 'cone_half_angle_deg': round(beta, 3),
         'r_at_visible_bottom_mm': round(v['R_bottom_mm'] * sb, 2), 'r_at_visible_top_mm': round(v['R_top_mm'] * sb, 2),
         'visible_slant_mm': round(v['R_top_mm'] - v['R_bottom_mm'], 2),
         'visible_height_mm': round((v['R_top_mm'] - v['R_bottom_mm']) * math.cos(math.radians(beta)), 2)}
    if g:
        d['blank_slant_mm'] = round(g['R_top_mm'] - g['R_bottom_mm'], 2)
        d['hidden_bottom_mm'] = round(v['R_bottom_mm'] - g['R_bottom_mm'], 2)
        d['hidden_top_mm'] = round(g['R_top_mm'] - v['R_top_mm'], 2)
        if 'right_deg' in g:
            d['overlap_strip_mm_at_bottom'] = round(math.radians(g['right_deg'][0] - v['right_deg'][0]) * v['R_bottom_mm'], 2)
            d['blank_angle_deg'] = round(g['right_deg'][0] - g.get('left_deg', v['left_deg'])[0], 3)
    res['derived'] = d


def overlay(pdf, res, c):
    pix = fitz.open(pdf)[0].get_pixmap(dpi=60, alpha=False)
    img = Image.frombytes('RGB', (pix.width, pix.height), pix.samples)
    s = 60 / 25.4
    dr = ImageDraw.Draw(img)
    cols = {'green': (0, 160, 60), 'blue': (40, 60, 220), 'red': (220, 20, 20)}
    if 'apex_mm' in res:
        ax, ay = res['apex_mm']
        for name in ('green', 'blue'):
            b = res.get(name)
            if not b:
                continue
            for R in (b['R_top_mm'], b['R_bottom_mm']):
                for side in ('left_deg', 'right_deg'):
                    pass
                a0 = b.get('left_deg', [-20])[0]
                a1 = b.get('right_deg', [20])[0]
                pts = [((ax + R * math.sin(math.radians(t))) * s, (ay - R * math.cos(math.radians(t))) * s) for t in np.linspace(a0, a1, 60)]
                dr.line(pts, fill=cols[name], width=2)
    dr.text((6, 6), res['file'], fill=(0, 0, 0))
    img.save(OUT / (Path(pdf).stem + '_qa.png'))


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    allres = {}
    for pdf in sorted((ROOT / 'Mockups').glob('*.pdf')):
        res, c = analyse(pdf)
        derive(res)
        overlay(pdf, res, c)
        allres[pdf.stem.strip('_').replace('_0000', '').replace('-0000', '')] = res
    (OUT / 'templates.json').write_text(json.dumps(allres, indent=1, ensure_ascii=False), encoding='utf-8')
    for k, r in allres.items():
        d = r.get('derived', {})
        print(f"{k:12s} {str(r.get('found')):28s} beta {d.get('cone_half_angle_deg')}  vis {d.get('visible_slant_mm')}  blank {d.get('blank_slant_mm')}  "
              f"hid b/t {d.get('hidden_bottom_mm')}/{d.get('hidden_top_mm')}  r_vis {d.get('r_at_visible_bottom_mm')}-{d.get('r_at_visible_top_mm')}  lap {d.get('overlap_strip_mm_at_bottom')}")


if __name__ == '__main__':
    main()
