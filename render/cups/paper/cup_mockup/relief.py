"""Waffle emboss of an EM wrap as geometry.

The relief data (work/v4/relief_from_svg.py) holds the lattice of the net —
two smooth fields u, v on the sheet, whole numbers along the groove centres —
and the height field of the sheet (white = 1).  The wrap is meshed along the
lattice: every groove gets its own loops across the bevel, the cells get a
single loop in the middle, so the quads follow the grooves instead of cutting
them diagonally, and a few hundred cells need tens of thousands of quads, not
a million.  Where the lattice meets the cut edges of the blank a strip of
quads carries it onto the edge.

Coordinates are those of the blank (s along the board, a across it, see
paper.py), page millimetres in between; nothing here knows about Blender.
"""
import math
from pathlib import Path

import numpy as np

from . import paper

ROOT = Path(__file__).resolve().parent.parent
EDGE_MARGIN_MM = 0.1       # lattice quads keep this far from the cut; the strip covers the rest


def load(p):
    rel = (p.get('emboss') or {}).get('relief')
    if not rel or not (ROOT / rel).is_file():
        return None
    with np.load(ROOT / rel) as z:
        d = {k: z[k] for k in z.files}
    d['height'] = d['height'].astype(np.float32) / 65535.0
    d['deg'] = int(d['deg'])
    return d


# ---------------------------------------------------------------- lattice

def _powers(x, y, deg):
    return [(i, j) for i in range(deg + 1) for j in range(deg + 1 - i)]


def _fields(d, X, Y):
    """u, v and their derivatives by page x, y."""
    ax, ay = d['apex']
    x, y = (X - ax) / 100.0, (ay - Y) / 100.0
    u = np.zeros_like(x); v = np.zeros_like(x)
    ux = np.zeros_like(x); uy = np.zeros_like(x); vx = np.zeros_like(x); vy = np.zeros_like(x)
    for k, (i, j) in enumerate(_powers(x, y, d['deg'])):
        t = x ** i * y ** j
        tx = i * x ** max(i - 1, 0) * y ** j / 100.0
        ty = -j * x ** i * y ** max(j - 1, 0) / 100.0
        u += d['cu'][k] * t; v += d['cv'][k] * t
        ux += d['cu'][k] * tx; uy += d['cu'][k] * ty
        vx += d['cv'][k] * tx; vy += d['cv'][k] * ty
    return u, v, ux, uy, vx, vy


def to_page(d, U, V, steps=12):
    """Page millimetres of lattice points (u, v): polynomial guess + Newton."""
    u0, v0 = np.asarray(U, float) / 50.0, np.asarray(V, float) / 50.0
    X = np.zeros_like(u0); Y = np.zeros_like(u0)
    for k, (i, j) in enumerate(_powers(u0, v0, d['deg'])):
        t = u0 ** i * v0 ** j
        X += d['ix'][k] * t; Y += d['iy'][k] * t
    for _ in range(steps):
        u, v, ux, uy, vx, vy = _fields(d, X, Y)
        ru, rv = u - U, v - V
        det = ux * vy - uy * vx
        dX, dY = (vy * ru - uy * rv) / det, (-vx * ru + ux * rv) / det
        X -= dX; Y -= dY
        if max(np.abs(dX).max(), np.abs(dY).max()) < 1e-7:
            break
    return X, Y


def height(d, X, Y):
    """Height field of the sheet (0..1) at page millimetres, bilinear."""
    hmap, k = d['height'], float(d['px_per_mm'])
    h, w = hmap.shape
    fx = np.clip(np.asarray(X) * k - 0.5, 0, w - 1.001)
    fy = np.clip(np.asarray(Y) * k - 0.5, 0, h - 1.001)
    x0, y0 = fx.astype(int), fy.astype(int)
    tx, ty = fx - x0, fy - y0
    return ((hmap[y0, x0] * (1 - tx) + hmap[y0, x0 + 1] * tx) * (1 - ty)
            + (hmap[y0 + 1, x0] * (1 - tx) + hmap[y0 + 1, x0 + 1] * tx) * ty)


def loops(d, cell_step_mm=0.9):
    """Fractions of one lattice period where the mesh lines go: across the
    bevel on each side of the groove (four lines, the S of the bevel), a
    support line just past its top, and lines across the flat of the cell no
    more than cell_step_mm apart.

    Without the support line the vertex at the top of the bevel averages the
    slope into the flat quad of the cell and the cell shades like a pillow.
    The lines across the cell are for the ends of the grooves at the plain
    fields: a groove may end anywhere along the cell, and it can only end on
    a mesh line, so the spacing is what its end gets smeared over.  The
    pointed tips the net is cut with there run across the lattice and are
    narrower than the bevel: a mesh along the grooves rounds them off at any
    spacing (0.6 mm looked the same as 0.9 and weighed 40 % more)."""
    g = float(d['groove_half'])
    pitch = float(d['pitch_mm'])
    c = 0.5 * float(d['bevel_mm']) / pitch
    side = [g - c, g - c / 3, g + c / 3, g + c, g + 1.25 * c]
    side = [f for f in side if f > 0.004] or [0.0]
    if side[0] > 0.004 and g - c <= 0.004:
        side = [0.0] + side
    flat0, flat1 = side[-1], 1 - side[-1]
    n = max(2, math.ceil((flat1 - flat0) * pitch / cell_step_mm))
    cell = list(np.linspace(flat0, flat1, n + 1)[1:-1])
    fr = sorted(set([round(f, 6) for f in side + cell] + [round(1 - f, 6) for f in side if f > 0]))
    return np.array([f for f in fr if 0 <= f < 1])


# ---------------------------------------------------------------- blank

class Domain:
    """The wrap blank in (s, a): 0 <= s <= S, 0 <= a <= a_end(s); lengths in mm."""

    def __init__(self, blank, S):
        self.blank, self.S = blank, float(S)

    def width(self, s):
        """Millimetres of arc per unit of a at s."""
        b = self.blank
        R = b.R(s)
        return R * np.radians(b._edge(b.vis['right_deg'], R) - b._edge(b.vis['left_deg'], R))

    def from_page(self, X, Y):
        b = self.blank
        R = np.hypot(X - b.cx, b.cy - Y)
        th = np.degrees(np.arctan2(X - b.cx, b.cy - Y))
        left, right = b._edge(b.vis['left_deg'], R), b._edge(b.vis['right_deg'], R)
        return b.s_at(R), (th - left) / (right - left)

    def distances(self, s, a):
        """To the bottom, right, top and left cut, mm (negative outside)."""
        W = self.width(s)
        return np.stack((s, (self.blank.a_end(s) - a) * W, self.S - s, a * W))

    def corners(self):
        b = self.blank
        return np.array([(0.0, 0.0), (0.0, float(b.a_end(0.0))), (self.S, float(b.a_end(self.S))), (self.S, 0.0)])

    def project(self, side, s, a):
        """Foot on one cut: generators and rings of the cone are orthogonal."""
        if side == 0:
            return np.zeros_like(s), np.clip(a, 0, self.blank.a_end(0.0))
        if side == 2:
            return np.full_like(s, self.S), np.clip(a, 0, self.blank.a_end(self.S))
        s = np.clip(s, 0, self.S)
        return s, (self.blank.a_end(s) if side == 1 else np.zeros_like(s))

    def xy(self, s, a):
        """Flat millimetres for area checks: arc from the flap edge, board length."""
        return np.column_stack((a * self.width(s), s))


def _monotone(t, t0, t1):
    """Parameters along one cut, strictly from t0 to t1 in the given order."""
    t = np.asarray(t, float)
    sgn = 1.0 if t1 >= t0 else -1.0
    q = np.clip(sgn * t, sgn * t0 if sgn > 0 else sgn * t0, sgn * t1)
    q = np.maximum.accumulate(q)
    gap = 1e-4 * abs(t1 - t0) + 1e-9
    for k in range(1, len(q)):                         # spread ties evenly
        if q[k] <= q[k - 1] + gap:
            q[k] = q[k - 1] + gap
    return sgn * q


def _clean(keep, depth):
    """Drop cells that would pinch the surface (two cells meeting at a corner
    only) or float apart from the main piece."""
    keep = keep.copy()
    while True:
        k00, k10, k01, k11 = keep[:-1, :-1], keep[1:, :-1], keep[:-1, 1:], keep[1:, 1:]
        pinch_a = k00 & k11 & ~k10 & ~k01
        pinch_b = k10 & k01 & ~k00 & ~k11
        if not (pinch_a.any() or pinch_b.any()):
            break
        for i, j in zip(*np.nonzero(pinch_a)):
            keep[(i, j) if depth[i, j] < depth[i + 1, j + 1] else (i + 1, j + 1)] = False
        for i, j in zip(*np.nonzero(pinch_b)):
            keep[(i + 1, j) if depth[i + 1, j] < depth[i, j + 1] else (i, j + 1)] = False
    from collections import deque
    seen = np.zeros_like(keep)
    start = np.unravel_index(np.argmax(np.where(keep, depth, -np.inf)), keep.shape)
    seen[start] = True
    todo = deque([start])
    while todo:
        i, j = todo.popleft()
        for m, n in ((i + 1, j), (i - 1, j), (i, j + 1), (i, j - 1)):
            if 0 <= m < keep.shape[0] and 0 <= n < keep.shape[1] and keep[m, n] and not seen[m, n]:
                seen[m, n] = True
                todo.append((m, n))
    return keep & seen


def _edge(dom, s, a, keep):
    """Kept lattice cells plus the strip of quads from their edge onto the cut."""
    nu, nv = s.shape
    used = np.zeros((nu, nv), bool)
    used[:-1, :-1] |= keep
    used[1:, :-1] |= keep
    used[1:, 1:] |= keep
    used[:-1, 1:] |= keep
    vid = -np.ones((nu, nv), np.int64)
    vid[used] = np.arange(used.sum())
    node = np.argwhere(used)                                   # grid index of every vertex
    S_v, A_v = s[used], a[used]
    I, J = np.nonzero(keep)
    quads = np.stack((vid[I, J], vid[I + 1, J], vid[I + 1, J + 1], vid[I, J + 1]), 1)
    # edge of the kept cells, counter-clockwise in (u, v): directed edges with no kept cell across
    kp = np.pad(keep, 1)
    src, dst = [], []
    for across, a0, a1 in (((I + 1, J), (I, J), (I + 1, J)),                 # below
                           ((I + 2, J + 1), (I + 1, J), (I + 1, J + 1)),     # right
                           ((I + 1, J + 2), (I + 1, J + 1), (I, J + 1)),     # above
                           ((I, J + 1), (I, J + 1), (I, J))):                # left
        m = ~kp[across]
        src.append(vid[a0][m])
        dst.append(vid[a1][m])
    src, dst = np.concatenate(src), np.concatenate(dst)
    if len(np.unique(src)) != len(src):
        raise RuntimeError('relief: the edge of the lattice touches itself')
    nxt = dict(zip(src.tolist(), dst.tolist()))
    loop = [int(src[0])]
    while nxt[loop[-1]] != loop[0]:
        loop.append(nxt[loop[-1]])
        if len(loop) > len(nxt):
            raise RuntimeError('relief: the edge of the lattice does not close')
    if len(loop) != len(nxt):
        raise RuntimeError(f'relief: the lattice edge splits into loops ({len(loop)} of {len(nxt)} edges)')
    loop = np.array(loop)
    # counter-clockwise in the flat blank as well
    P = dom.xy(S_v[loop], A_v[loop])
    if np.sum(P[:, 0] * np.roll(P[:, 1], -1) - np.roll(P[:, 0], -1) * P[:, 1]) < 0:
        loop = loop[::-1]
        quads = quads[:, ::-1]
    # every edge vertex gets a foot on its cut; the one nearest to each corner
    # of the blank goes to the corner itself.  The loop runs bottom, right,
    # top, left: start it at the bottom-left corner.
    Pxy = dom.xy(S_v[loop], A_v[loop])
    corners = dom.corners()
    cxy = dom.xy(corners[:, 0], corners[:, 1])
    at = [int(np.argmin(np.hypot(*(Pxy - c).T))) for c in cxy]
    loop = np.roll(loop, -at[0])
    at = [(k - at[0]) % len(loop) for k in at]
    if not (0 == at[0] < at[1] < at[2] < at[3]):
        raise RuntimeError(f'relief: corners of the blank out of order on the lattice edge {at}')
    fs, fa = np.empty(len(loop)), np.empty(len(loop))
    for side in range(4):
        k0, k1 = at[side], (at[side + 1] if side < 3 else len(loop))
        seg = np.arange(k0, k1 + 1) % len(loop)
        c0, c1 = corners[side], corners[(side + 1) % 4]
        ps, pa = dom.project(side, S_v[loop[seg]], A_v[loop[seg]])
        if side in (0, 2):
            pa = _monotone(pa, c0[1], c1[1])
            pa[0], pa[-1] = c0[1], c1[1]
            ps = np.full_like(pa, c0[0])
        else:
            ps = _monotone(ps, c0[0], c1[0])
            ps[0], ps[-1] = c0[0], c1[0]
            pa = dom.blank.a_end(ps) if side == 1 else np.zeros_like(ps)
        fs[seg[:-1]], fa[seg[:-1]] = ps[:-1], pa[:-1]
    foot = len(S_v) + np.arange(len(loop))
    k = np.arange(len(loop))
    k1 = (k + 1) % len(loop)
    strip = np.stack((loop[k], foot[k], foot[k1], loop[k1]), 1)
    S_v, A_v = np.concatenate((S_v, fs)), np.concatenate((A_v, fa))
    allq = np.concatenate((quads, strip))
    # every quad keeps the orientation of the blank: no fold at the cut
    Q = dom.xy(S_v, A_v)[allq]

    def area(p, q, r):
        return (q[:, 0] - p[:, 0]) * (r[:, 1] - p[:, 1]) - (q[:, 1] - p[:, 1]) * (r[:, 0] - p[:, 0])
    a1, a2 = area(Q[:, 0], Q[:, 1], Q[:, 2]), area(Q[:, 0], Q[:, 2], Q[:, 3])
    bad = (a1 <= 1e-8) | (a2 <= 1e-8)
    culprits = np.unique(np.concatenate((quads[bad[:len(quads)]].ravel(),
                                         strip[bad[len(quads):]][:, [0, 3]].ravel())))
    culprits = culprits[culprits < len(node)]
    return {'s': S_v, 'a': A_v, 'quads': allq, 'loop': foot, 'flipped': int(bad.sum()),
            'culprits': node[culprits], 'lattice_quads': len(quads), 'strip_quads': len(strip)}


def sheet(dom, d):
    """Quads of the wrap's printed face on the blank.

    Returns s, a per vertex, the quads, and the boundary loop (vertex ids on
    the cut, in order) for the cut faces."""
    fr = loops(d)
    # lattice range over the blank
    ss = np.linspace(0, dom.S, 60)
    aa = np.linspace(0, 1.05, 200)
    bs = np.concatenate((ss, ss, np.zeros_like(aa), np.full_like(aa, dom.S)))
    ba = np.concatenate((np.zeros_like(ss), dom.blank.a_end(ss), aa, aa))
    X, Y = dom.blank.page_mm(bs, ba)
    u, v, *_ = _fields(d, X, Y)
    ku = np.arange(math.floor(u.min()) - 1, math.ceil(u.max()) + 1)
    kv = np.arange(math.floor(v.min()) - 1, math.ceil(v.max()) + 1)
    UL = (ku[:, None] + fr[None, :]).ravel()
    VL = (kv[:, None] + fr[None, :]).ravel()
    UU, VV = np.meshgrid(UL, VL, indexing='ij')
    with np.errstate(all='ignore'):
        X, Y = to_page(d, UU.ravel(), VV.ravel())
        s, a = dom.from_page(X, Y)
        s, a = s.reshape(UU.shape), a.reshape(UU.shape)
        dist = np.nan_to_num(dom.distances(s, a).min(axis=0), nan=-1.0)
    ok = dist >= EDGE_MARGIN_MM
    keep = ok[:-1, :-1] & ok[1:, :-1] & ok[1:, 1:] & ok[:-1, 1:]
    depth = np.minimum(np.minimum(dist[:-1, :-1], dist[1:, :-1]), np.minimum(dist[1:, 1:], dist[:-1, 1:]))
    for _ in range(40):
        keep = _clean(keep, depth)
        out = _edge(dom, s, a, keep)
        if not out['flipped']:
            break
        # a step of the lattice edge that runs back along the cut: give up the
        # cells at it, the strip grows a little there instead
        for i, j in out['culprits']:
            keep[max(i - 1, 0):i + 1, max(j - 1, 0):j + 1] = False
    out['loops_per_period'] = len(fr)
    return out


def _floor(d, X, Y, guard_mm):
    """Lowest height within guard_mm of each point (square window), bilinear."""
    k = float(d['px_per_mm'])
    r = int(math.ceil(guard_mm * k))
    hmap = d['height']
    x0 = max(int(np.floor(X.min() * k)) - r - 2, 0)
    y0 = max(int(np.floor(Y.min() * k)) - r - 2, 0)
    x1 = min(int(np.ceil(X.max() * k)) + r + 3, hmap.shape[1])
    y1 = min(int(np.ceil(Y.max() * k)) + r + 3, hmap.shape[0])
    crop = hmap[y0:y1, x0:x1]
    for axis in (0, 1):
        pad = np.pad(crop, [(r, r) if i == axis else (0, 0) for i in (0, 1)], mode='edge')
        low = crop.copy()
        for sh in range(2 * r + 1):
            np.minimum(low, np.take(pad, np.arange(sh, sh + crop.shape[axis]), axis=axis), out=low)
        crop = low
    sub = dict(d, height=crop)
    return height(sub, X - x0 / k, Y - y0 / k)


def lift(dom, d, s, a, depth_mm, guard_mm=4.0, drop_mm=0.03):
    """Outward push of the board, mm.

    The strip under the flap (a > 1) is hidden and must stay under the flap
    lying on it.  The two are meshed along different parts of the lattice, so
    matching them vertex by vertex is not enough: the strip takes the lowest
    height of the flap within guard_mm, and drops drop_mm more to clear the
    chord of the flap's larger quads (the lap itself is only 0.015 mm)."""
    X, Y = dom.blank.page_mm(s, a)
    h = depth_mm * height(d, X, Y)
    under = a > 1.0
    if under.any():
        Xf, Yf = dom.blank.page_mm(s[under], a[under] - 1.0)
        W = dom.width(s[under])
        ease = paper.smooth01((a[under] - 1.0) * W / 0.5)
        h[under] = np.minimum(h[under], depth_mm * _floor(d, Xf, Yf, guard_mm)) - drop_mm * ease
    return h
