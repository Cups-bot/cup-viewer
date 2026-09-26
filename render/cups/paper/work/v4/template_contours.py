"""Extract die-cut (green), visible (blue) and print (red) contours from the
supplied Formacia templates and fit concentric arcs and side edges.

Page frame: millimetres, origin top-left of the A4 landscape page, y down —
the same frame as the artwork JPG/PNG exported on that page.
Angles: degrees about the apex, 0 = straight up (towards smaller y), positive
to the right.
"""
import json, math
import numpy as np
import fitz

PT = 25.4 / 72
COLOURS = {'green': (0.17, 0.58, 0.31), 'blue': (0.28, 0.38, 0.68), 'red': (0.93, 0.11, 0.14)}

def close(c, ref):
    return c is not None and len(c) == 3 and all(abs(a - b) < .03 for a, b in zip(c, ref))

def sample(item, step=.5):
    kind = item[0]
    if kind == 'l':
        a, b = item[1], item[2]
        n = max(2, int(math.hypot(b.x - a.x, b.y - a.y) / step))
        return [(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t) for t in np.linspace(0, 1, n)]
    if kind == 'c':
        p0, p1, p2, p3 = item[1:5]
        n = max(4, int((math.hypot(p1.x - p0.x, p1.y - p0.y) + math.hypot(p2.x - p1.x, p2.y - p1.y) + math.hypot(p3.x - p2.x, p3.y - p2.y)) / step))
        out = []
        for t in np.linspace(0, 1, n):
            u = 1 - t
            out.append((u**3*p0.x + 3*u*u*t*p1.x + 3*u*t*t*p2.x + t**3*p3.x,
                        u**3*p0.y + 3*u*u*t*p1.y + 3*u*t*t*p2.y + t**3*p3.y))
        return out
    return []

def fit_circle(pts):
    p = np.asarray(pts)
    A = np.column_stack((2 * p[:, 0], 2 * p[:, 1], np.ones(len(p))))
    b = (p ** 2).sum(1)
    cx, cy, c = np.linalg.lstsq(A, b, rcond=None)[0]
    r = math.sqrt(c + cx * cx + cy * cy)
    res = np.abs(np.hypot(p[:, 0] - cx, p[:, 1] - cy) - r)
    return [float(cx), float(cy), float(r)], float(res.max())

def extract(pdf):
    page = fitz.open(pdf)[0]
    out = {}
    for name, ref in COLOURS.items():
        pts = []
        for d in page.get_drawings():
            if close(d.get('color'), ref) and d.get('width', 0) >= .99:
                for it in d['items']:
                    pts += sample(it, .5 / PT)
        out[name] = np.array(pts) * PT
    return out

def polar(pts, c):
    r = np.hypot(pts[:, 0] - c[0], pts[:, 1] - c[1])
    a = np.degrees(np.arctan2(pts[:, 0] - c[0], -(pts[:, 1] - c[1])))
    return r, a

def analyse(pdf):
    c = extract(pdf)
    # Provisional apex from the lower half of the green contour (longest clean arc).
    g = c['green']
    apex = [g[:, 0].mean(), g[:, 1].min() + 380]
    for _ in range(4):
        r, a = polar(g, apex)
        lo = g[(r < r.min() + 2) & (np.abs(a) < 14)]
        hi = g[(r > r.max() - 2) & (np.abs(a) < 14)]
        (bx, by, br), _ = fit_circle(lo); (tx, ty, tr), _ = fit_circle(hi)
        apex = [(bx + tx) / 2, (by + ty) / 2]
    res = {'apex_mm': apex}
    for name, pts in c.items():
        r, a = polar(pts, apex)
        rmin, rmax = np.percentile(r, .5), np.percentile(r, 99.5)
        lo = pts[(r < rmin + 1.2) & (np.abs(a) < 12)]
        hi = pts[(r > rmax - 1.2) & (np.abs(a) < 12)]
        bot, berr = fit_circle(lo); top, terr = fit_circle(hi)
        rb = float(np.median(polar(lo, apex)[0])); rt = float(np.median(polar(hi, apex)[0]))
        side = (r > rb + 4) & (r < rt - 4)
        edges = {}
        for key, sel in (('left', side & (a < 0)), ('right', side & (a > 0))):
            s = pts[sel]
            if len(s) < 6: continue
            rr, aa = polar(s, apex)
            # Straight edge in the page: fit x,y line, report its angle at several radii.
            k, a0 = np.polyfit(rr, aa, 1)
            # perpendicular distance of the edge line from the apex (0 = radial line)
            vx, vy = np.polyfit(s[:, 1], s[:, 0], 1)  # x = vx*y + vy
            d = abs(apex[0] - (vx * apex[1] + vy)) / math.hypot(1, vx)
            edges[key] = {'deg_at': {str(int(x)): float(a0 + k * x) for x in (rb, (rb + rt) / 2, rt)},
                          'line_offset_from_apex_mm': float(d), 'r_span': [float(rr.min()), float(rr.max())]}
        res[name] = {'r_top': rt, 'r_bottom': rb, 'fit_top': top, 'fit_top_err': terr,
                     'fit_bottom': bot, 'fit_bottom_err': berr, 'edges': edges}
    return res

if __name__ == '__main__':
    out = {}
    for model, pdf in (('HB80-280', 'Mockups/_HB80-280-0000.pdf'), ('DW80-280', 'Mockups/_DW80-280-0000.pdf')):
        out[model] = analyse(pdf)
    json.dump(out, open('work/v4/template_contours.json', 'w'), indent=1)
    print(json.dumps(out, indent=1))

def compact(res):
    """Linear edge angles theta(R) = theta0 + k*(R - R0) for the params file."""
    out = {'apex_mm': [round(res['apex_mm'][0], 3), round(res['apex_mm'][1], 3)]}
    for name, key in (('blue', 'visible'), ('green', 'die')):
        c = res[name]
        block = {'R_top_mm': round(c['r_top'], 2), 'R_bottom_mm': round(c['r_bottom'], 2)}
        for side, e in c['edges'].items():
            (r0, a0), (_, _), (r1, a1) = sorted((float(k), v) for k, v in e['deg_at'].items())
            block[side + '_deg'] = [round(a0, 4), round((a1 - a0) / (r1 - r0), 7), round(r0, 2)]
        out[key] = block
    return out

if __name__ == '__main__':
    data = json.load(open('work/v4/template_contours.json'))
    print('COMPACT', json.dumps({m: compact(v) for m, v in data.items()}, indent=1))
