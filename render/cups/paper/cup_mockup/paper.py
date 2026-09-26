"""Paper cups, geometry version 4.

A cup wall is ONE board blank swept around the axis as a thick sheet: printed
face, unprinted face and cut edges, quads only.  The coordinate that places a
vertex also places the artwork:

    s  distance along the board, mm (0 at the registration line, + upwards);
    a  position across the blank: 0 at the visible flap edge, 1 at the far end
       of the visible area, >1 on the strip hidden under the flap.

The blank is developable, so the printed file lands on the cone isometrically:
R = R_reference + s on the template, and the visible arc of the template
covers exactly one turn.  Nothing dimensional lives here — every number comes
from params/<model>.json.

Axes: Z up, cup base at z = 0, geometry in metres (1 unit = 1 m).
"""
import json
import math
from pathlib import Path

import numpy as np

PARAMS_DIR = Path(__file__).with_name('params')
A4_MM = (297.0, 210.0)     # artwork page: landscape A4, like the supplied templates


def page_of(p):
    """Page of a model's template, mm.  Landscape A4 unless the template says
    otherwise (EM90-530 is drawn on 297 x 235)."""
    return tuple((p.get('template') or {}).get('page_mm', A4_MM))
MM = 0.001


def _merge(base, over):
    for k, v in over.items():
        if k.startswith('_'):
            continue
        if isinstance(v, dict) and isinstance(base.get(k), dict):
            _merge(base[k], v)
        else:
            base[k] = v
    return base


FIRST = ('HB80-280', 'DW80-280')         # enum numbers 0 and 1 are kept for old scenes
STATUS = {'verified': ('', 'проверено по фото, чертежу и развёртке'),
          'drawing': (' · по чертежу', 'сверено с чертежом и развёрткой; фотографий изделия не было'),
          'template': (' · по развёртке', 'чертежа на этот артикул нет: размеры сняты с развёртки, сечение картона взято у родственного артикула'),
          'draft': (' · черновик', 'черновик по развёртке и чертежу, вручную не разбирался')}


def _item(key, path, ident):
    p = json.loads(path.read_text(encoding='utf-8'))
    suffix, tip = STATUS[p.get('status', 'verified')]
    return key, p.get('label', path.stem) + suffix, tip, ident


def list_models():
    """Panel items: full models first (params/*.json), then drafts."""
    import zlib
    ident = lambda key: (zlib.crc32(key.encode()) & 0x3FFFFFFF) | 0x100
    items = [_item(n, PARAMS_DIR / f'{n}.json', i) for i, n in enumerate(FIRST)]
    items += [_item(f.stem, f, ident(f.stem)) for f in sorted(PARAMS_DIR.glob('*.json'))
              if f.stem not in FIRST]
    items += [_item(f'drafts/{f.stem}', f, ident(f'drafts/{f.stem}'))
              for f in sorted((PARAMS_DIR / 'drafts').glob('*.json'))]
    return items


def is_double_wall(p):
    return 'sleeve' in p or 'wrap' in p


def load_params(model):
    p = json.loads((PARAMS_DIR / f'{model}.json').read_text(encoding='utf-8'))
    if p.get('base'):                      # a variant: the base model with a few keys changed
        p = _merge(load_params(p['base']), p)
        p.pop('inner', None)
    p['_key'] = model                      # file key, e.g. 'drafts/HB90-430'
    if p.get('inner_from'):
        inner = json.loads((PARAMS_DIR / f"{p['inner_from']}.json").read_text(encoding='utf-8'))
        inner['_key'] = p['inner_from']
        p['inner'] = _merge(inner, p.get('inner_overrides', {}))
    return p


def smooth01(x):
    x = np.clip(x, 0.0, 1.0)
    return x * x * (3.0 - 2.0 * x)


# ---------------------------------------------------------------- template

class Blank:
    """Template registration: sheet coordinates (s, a) -> page millimetres."""

    def __init__(self, template, registration, scale=1.0):
        self.cx, self.cy = template['apex_mm']
        self.vis = template['visible']
        self.die = template['die']
        self.page = tuple(template.get('page_mm', A4_MM))
        self.R_phys = registration['R_at_reference_mm']
        self.R_print = self.R_phys + registration.get('design_shift_mm', 0.0)
        # Millimetres of artwork per millimetre of board along s; 1.0 = isometric.
        self.scale = scale

    def R(self, s):
        return self.R_print + self.scale * np.asarray(s, float)

    def s_at(self, R):
        return (np.asarray(R, float) - self.R_print) / self.scale

    @staticmethod
    def _edge(edge, R):
        a0, k, r0 = edge
        return a0 + k * (np.asarray(R, float) - r0)

    def a_end(self, s):
        """Far end of the die-cut in units of the visible width (> 1: hidden strip)."""
        R = self.R_phys + np.asarray(s, float)
        left = self._edge(self.vis['left_deg'], R)
        right = self._edge(self.vis['right_deg'], R)
        die = self._edge(self.die['right_deg'], R)
        return 1.0 + (die - right) / (right - left)

    def page_mm(self, s, a):
        R = self.R(s)
        left = self._edge(self.vis['left_deg'], R)
        right = self._edge(self.vis['right_deg'], R)
        th = np.radians(left + np.asarray(a, float) * (right - left))
        return self.cx + R * np.sin(th), self.cy - R * np.cos(th)

    def centre_mm(self):
        R = 0.5 * (self.vis['R_top_mm'] + self.vis['R_bottom_mm'])
        return self.page_mm(self.s_at(R), 0.5)

    def uv(self, s, a, mapping='A4', offset_x=0.0, offset_y=0.0, scale=1.0):
        """Blender UV (v up).  Offsets move the sampling window on the sheet, mm."""
        s = np.asarray(s, float)
        a = np.asarray(a, float)
        if mapping == 'RECT':
            lo = self.s_at(self.vis['R_bottom_mm'])
            hi = self.s_at(self.vis['R_top_mm'])
            u = (np.clip(a, 0, 1) - .5) * scale + .5 + offset_x / self.page[0]
            v = (np.clip((s - lo) / (hi - lo), 0, 1) - .5) * scale + .5 - offset_y / self.page[1]
            return u, v
        x, y = self.page_mm(s, a)
        cx, cy = self.centre_mm()
        x = cx + (x - cx) * scale + offset_x
        y = cy + (y - cy) * scale + offset_y
        return x / self.page[0], 1.0 - y / self.page[1]


# ---------------------------------------------------------------- profiles

class Profile:
    """Centre line of the board in the r/z half plane, millimetres."""

    def __init__(self):
        self.pts, self.th, self.zone, self.ref = [], [], [], None
        self.marks = {}

    def mark(self, name):
        self.marks[name] = len(self.pts) - 1

    def add(self, p, t, zone):
        p = (float(p[0]), float(p[1]))
        if self.pts and math.dist(p, self.pts[-1]) < 1e-6:
            return
        self.pts.append(p)
        self.th.append(float(t))
        self.zone.append(zone)

    def mark_reference(self):
        self.ref = len(self.pts) - 1

    def arrays(self):
        P = np.array(self.pts)
        T = np.empty_like(P)
        T[1:-1] = P[2:] - P[:-2]
        T[0] = P[1] - P[0]
        T[-1] = P[-1] - P[-2]
        T /= np.linalg.norm(T, axis=1)[:, None]
        N = np.column_stack((T[:, 1], -T[:, 0]))      # printed side
        seg = np.linalg.norm(np.diff(P, axis=0), axis=1)
        s = np.concatenate(([0.0], np.cumsum(seg)))
        s -= s[self.ref]
        return P, N, np.array(self.th), s


def _frame(deg):
    b = math.radians(deg)
    return np.array([math.sin(b), math.cos(b)]), np.array([math.cos(b), -math.sin(b)])


def cone_radius(cup, z):
    """Outer surface of the wall on the drawing cone (no heel rounding)."""
    return cup['base_od_mm'] / 2 + math.tan(math.radians(cup['taper_deg'])) * np.asarray(z, float)


def cup_layout(cup, con):
    """Shared construction points of wall, heel, return and floor."""
    d, n = _frame(cup['taper_deg'])
    t, tf, g = cup['wall_mm'], cup['floor_mm'], con['heel_gap_mm']
    O0 = np.array([cup['base_od_mm'] / 2, 0.0])
    rho_h = (t / 2 + g + tf + g + t / 2) / 2
    sb = math.sin(math.radians(cup['taper_deg']))
    cb = math.cos(math.radians(cup['taper_deg']))
    # Heel centre so that the outer face of the fold touches z = 0.
    q_h = (rho_h + t / 2 - sb * (t / 2 + rho_h)) / cb
    wall = lambda q: O0 - n * t / 2 + d * q
    H = wall(q_h) - n * rho_h
    return {'d': d, 'n': n, 't': t, 'tf': tf, 'g': g, 'rho_h': rho_h, 'q_h': q_h,
            'wall': wall, 'H': H, 'sb': sb, 'cb': cb}


def cup_profile(cup, con, mesh):
    """Return -> heel -> wall -> neck -> outward curl.

    Reference (s = 0, the template's lower blue line): the tangent where the
    straight wall starts to turn under into the heel.  Below it nothing of the
    cup is seen from outside, which is what the "visible area" of the template
    means; the quarter of the fold under that point already belongs to the
    hidden strip."""
    L = cup_layout(cup, con)
    d, n, t, wall, H, rho_h = L['d'], L['n'], L['t'], L['wall'], L['H'], L['rho_h']
    sb, cb = L['sb'], L['cb']
    pr = Profile()
    # Return: rises inside the floor skirt, printed face towards the axis.
    ret = lambda q: wall(q) + (-n) * 2 * rho_h
    q_top = (con['return_top_mm'] - (ret(0.0)[1])) / cb
    for q in np.linspace(q_top, L['q_h'], mesh['return_rows'] + 1)[:-1]:
        pr.add(ret(q), t, 'RETURN')
    # Heel: 180 degree fold around the skirt of the floor.
    for i, g in enumerate(np.linspace(math.pi, 0.0, mesh['heel_rows'] + 1)):
        pr.add(H + rho_h * (math.cos(g) * n + math.sin(g) * (-d)), t, 'HEEL')
        if i == mesh['heel_rows']:
            pr.mark_reference()                     # wall tangent = template reference
    # Wall: straight cone up to the neck.
    q_neck = (con['neck_start_mm'] - wall(0.0)[1]) / cb
    rows = max(2, round((q_neck - L['q_h']) / mesh['wall_row_mm']))
    for q in np.linspace(L['q_h'], q_neck, rows + 1)[1:]:
        pr.add(wall(q), t, 'WALL')
    # Curl geometry.
    rc = cup['rim_od_mm'] / 2 - cup['curl_d_mm'] / 2
    zc = cup['height_mm'] - cup['curl_d_mm'] / 2
    tc = cup['curl_sheet_mm']
    rho1 = cup['curl_d_mm'] / 2 - tc / 2
    start = np.array([rc - rho1, zc])
    # Neck: cubic Hermite from the wall line into the curl, tangent-continuous.
    p0, p1 = wall(q_neck), start
    m0, m1 = d * (p1[1] - p0[1]), np.array([0.0, p1[1] - p0[1]])
    for u in np.linspace(0, 1, mesh['neck_rows'] + 1)[1:]:
        h00, h10 = 2 * u**3 - 3 * u**2 + 1, u**3 - 2 * u**2 + u
        h01, h11 = -2 * u**3 + 3 * u**2, u**3 - u**2
        pr.add(h00 * p0 + h10 * m0 + h01 * p1 + h11 * m1, t + (tc - t) * smooth01(u), 'NECK')
    # Curl: clockwise from the inner side, over the top, out and under; tucks in at the end.
    turn = math.radians(con['curl_turn_deg'])
    for u in np.linspace(0, 1, mesh['curl_rows'] + 1)[1:]:
        al = math.pi - turn * u
        rho = rho1 - (rho1 - con['curl_end_radius_mm']) * float(smooth01((u - .55) / .45))
        pr.add((rc + rho * math.cos(al), zc + rho * math.sin(al)), tc, 'CURL')
    return pr


def floor_section(cup, con, mesh):
    """Closed section of the separate bottom blank: plate, rounded shoulder, skirt."""
    L = cup_layout(cup, con)
    d, n, wall = L['d'], L['n'], L['wall']
    t, tf, g = L['t'], L['tf'], L['g']
    top = cup['floor_top_mm']
    rb = con['floor_bend_outer_mm']
    skirt = lambda q: wall(q) - n * (t / 2 + g + tf / 2)
    outer = lambda q: skirt(q) + n * tf / 2
    # Bend centre: rb inside the outer skirt face and rb below the plate top.
    q_b = (top - rb - (outer(0.0) - n * rb)[1]) / L['cb']
    B = outer(q_b) - n * rb
    a1 = math.atan2(n[1], n[0])                     # direction of the skirt face normal
    q_end = (L['H'][1] + con['skirt_end_above_heel_mm'] - skirt(0.0)[1]) / L['cb']
    sec = []
    ring = mesh['floor_ring_mm']
    for r in np.linspace(0.0, B[0], max(2, round(B[0] / ring)) + 1):
        sec.append((r, top))
    for al in np.linspace(math.pi / 2, a1, 7)[1:]:
        sec.append(tuple(B + rb * np.array([math.cos(al), math.sin(al)])))
    rows = max(2, round((q_b - q_end) / 3.0))
    for q in np.linspace(q_b, q_end, rows + 1)[1:]:
        sec.append(tuple(outer(q)))
    for q in np.linspace(q_end, q_b, rows + 1):
        sec.append(tuple(outer(q) - n * tf))
    ri = rb - tf
    for al in np.linspace(a1, math.pi / 2, 7)[1:]:
        sec.append(tuple(B + ri * np.array([math.cos(al), math.sin(al)])))
    for r in np.linspace(B[0], 0.0, max(2, round(B[0] / ring)) + 1)[1:]:
        sec.append((r, top - tf))
    return sec


def sleeve_profile(sl, cup, mesh):
    """DW outer sleeve: inward bottom roll -> straight wall -> top cut edge.

    The sleeve rests against the inner cup at fit_z_mm and continues up to
    top_z_mm inside the hollow of the rim curl, so the print runs on under the
    curl instead of ending in a visible edge.  Reference: lowest point of the
    roll (lower edge of the visible print); mark 'visible_top' at
    visible_top_z_mm (where the curl starts to hide the sleeve)."""
    d, n = _frame(sl['taper_deg'])
    ts = sl['sheet_mm']
    z_top = sl['top_z_mm']
    fit = sl.get('fit_z_mm', z_top)
    r_fit = float(cone_radius(cup, fit)) + sl['top_gap_mm'] + ts / 2
    top = np.array([r_fit + math.tan(math.radians(sl['taper_deg'])) * (z_top - fit), z_top])
    line = lambda q: top - d * q                      # q measured downwards
    rho0, rho_e = sl['roll_radius_mm'], sl['roll_end_radius_mm']
    sb, cb = d
    Qz = sl['bottom_z_mm'] + rho0 + ts / 2
    q0 = (z_top + sb * rho0 - Qz) / cb
    Q = line(q0) - n * rho0
    turn = math.radians(sl['roll_turn_deg'])
    beta = math.radians(sl['taper_deg'])
    g_low = math.pi / 2 - beta                        # lowest point of the roll
    rows = mesh['roll_rows']
    gam = np.unique(np.concatenate((np.linspace(turn, 0.0, rows + 1), [g_low])))[::-1]
    pr = Profile()
    for g in gam:
        rho = rho0 - (rho0 - rho_e) * float(smooth01((g / turn - .45) / .55))
        e = math.cos(g) * n - math.sin(g) * d
        pr.add(Q + rho * e, ts, 'ROLL')
        if abs(g - g_low) < 1e-12:
            pr.mark_reference()
    wall_rows = max(2, round(q0 / mesh['wall_row_mm']))
    q_vis = (z_top - sl.get('visible_top_z_mm', z_top)) / cb
    qs = np.linspace(q0, 0.0, wall_rows + 1)[1:]
    qs = qs[np.abs(qs - q_vis) > 0.4]                  # keep rows even around the added one
    for q in sorted(set(qs.tolist()) | {q_vis}, reverse=True):
        pr.add(line(q), ts, 'SLEEVE')
        if abs(q - q_vis) < 1e-12:
            pr.mark('visible_top')
    return pr


def wrap_profile(wrap, cup, mesh):
    """EM outer wrap: a plain cone lying on the wall of the inner cup.

    Unlike the DW sleeve it runs the whole visible height and has plain cut
    edges — the blank ends where the board ends, there is no roll and no tuck.
    Reference (s = 0): the bottom edge."""
    ts = wrap['sheet_mm']
    gap = wrap.get('gap_mm', 0.02)
    z0, z1 = wrap['bottom_z_mm'], wrap['top_z_mm']
    rows = max(2, round((z1 - z0) / mesh['wall_row_mm']))
    pr = Profile()
    for i, z in enumerate(np.linspace(z0, z1, rows + 1)):
        pr.add((float(cone_radius(cup, z)) + gap + ts / 2, z), ts, 'WRAP')
        if i == 0:
            pr.mark_reference()
    return pr


def make_blank(p, part='wall'):
    """Template registration for a printed part.

    If registration gives R_at_visible_top_mm (the template line that must sit
    where the rim curl starts to hide the sleeve), the artwork scale along the
    board is derived so that both the reference line and that line land where
    they are asked to."""
    reg = p['registration']
    blank = Blank(p['template'], reg)
    if part == 'sleeve' and 'R_at_visible_top_mm' in reg:
        prof = sleeve_profile(p['sleeve'], p['inner']['cup'], p['mesh'])
        _, _, _, s = prof.arrays()
        blank.scale = (reg['R_at_visible_top_mm'] - blank.R_print) / float(s[prof.marks['visible_top']])
    return blank


# ---------------------------------------------------------------- sweeps

def compression(profile, s, seam):
    """0..1 along the board: 1 in pressed zones, fading over compress_fade_mm."""
    zones = seam.get('compress_zones', {})
    if not isinstance(zones, dict):
        zones = {z: 1.0 for z in zones}
    out = np.zeros(len(s))
    for zone, weight in zones.items():
        hot = np.array([z == zone for z in profile.zone])
        if hot.any():
            dist = np.min(np.abs(s[:, None] - s[hot][None, :]), axis=1)
            out = np.maximum(out, weight * (1.0 - smooth01(dist / seam.get('compress_fade_mm', 2.0))))
    return out


def sheet_columns(blank, s, mesh):
    """Position across the blank of every column of the swept sheet, per row."""
    seg, M = mesh['segments'], mesh['strip_columns']
    a_end = blank.a_end(s)
    A = np.empty((len(s), seg + 1 + M))
    A[:, :seg + 1] = np.arange(seg + 1) / seg
    A[:, seg + 1:] = 1.0 + (np.arange(1, M + 1) / M)[None, :] * (a_end - 1.0)[:, None]
    return A


def place_sheet(profile, blank, seam, psi0_deg, s, a, lift=0.0, drape=None):
    """sweep_sheet for points of the blank that do not lie on a grid.

    Same overlap as there — the flap lifted over the hidden strip, the lap
    squeezed where the seam is pressed — plus `lift`, mm, pushing both faces
    of the board outwards (an emboss moves the board, it does not thicken
    it).  `drape(s, a)` is the sleeve's shift over the inner cup's lap.
    Returns the printed and the inner face, metres."""
    P, N, t, sp = profile.arrays()
    s, a = np.asarray(s, float), np.asarray(a, float)
    pr, pz = np.interp(s, sp, P[:, 0]), np.interp(s, sp, P[:, 1])
    nr, nz = np.interp(s, sp, N[:, 0]), np.interp(s, sp, N[:, 1])
    nl = np.hypot(nr, nz)
    nr, nz = nr / nl, nz / nl
    th = np.interp(s, sp, t)
    ct = seam.get('compress', 0.0) * np.interp(s, sp, compression(profile, sp, seam)) * th
    a_end = blank.a_end(s)
    w = seam['ramp_mm'] / (2 * math.pi * np.maximum(pr, 1.0))
    lam = np.where(a < 1.0, 1.0 - smooth01((a - (a_end - 1.0)) / w), 0.0)
    h = th + seam['layer_gap_mm']
    o_out = th / 2 + lam * (h - 2 * ct) - ct * smooth01((a - (1.0 - w)) / w) + lift
    o_in = -th / 2 + lam * (h - ct) + lift
    psi = math.radians(psi0_deg) + 2 * math.pi * a
    faces = []
    for o in (o_out, o_in):
        r, z = pr + nr * o, pz + nz * o
        if drape is not None:
            r = r + drape(s, a)
        faces.append(np.column_stack((r * np.cos(psi), r * np.sin(psi), z)) * MM)
    return faces


def grid_lookup(rows_s, A, values):
    """(s, a) -> value, bilinear over a swept sheet's rows and per-row columns."""
    rows_s = np.asarray(rows_s, float)

    def at(s, a):
        per_row = np.array([np.interp(a, A[j], values[j]) for j in range(len(rows_s))])
        j = np.clip(np.searchsorted(rows_s, s) - 1, 0, len(rows_s) - 2)
        f = np.clip((s - rows_s[j]) / (rows_s[j + 1] - rows_s[j]), 0, 1)
        k = np.arange(len(s))
        return per_row[j, k] * (1 - f) + per_row[j + 1, k] * f
    return at


def sweep_sheet(profile, blank, seam, mesh, psi0_deg, drape=None):
    """Thick sheet around the axis with a real overlap.

    Columns 0..segments cover the visible turn (column 0 = flap edge, lifted
    over the hidden strip); `strip_columns` more continue under the flap to the
    die-cut edge.  Returns plain arrays; the Blender mesh is made elsewhere."""
    P, N, t, s = profile.arrays()
    n = len(P)
    a_end = blank.a_end(s)
    A = sheet_columns(blank, s, mesh)
    C = A.shape[1]
    # Flap lift: full over the hidden strip, then the board settles on the wall.
    r_safe = np.maximum(P[:, 0], 1.0)
    w = seam['ramp_mm'] / (2 * math.pi * r_safe)
    h = t + seam['layer_gap_mm']
    lam = np.where(A < 1.0, 1.0 - smooth01((A - (a_end - 1.0)[:, None]) / w[:, None]), 0.0)
    # Where the bottom is pressed (heel, sleeve roll) both layers of the lap are
    # squeezed, so the doubled seam does not stand out of the silhouette.
    comp = seam.get('compress', 0.0) * compression(profile, s, seam)
    ct = (comp * t)[:, None]
    eps = seam['ramp_mm'] / (2 * math.pi * r_safe)[:, None]
    # Strip under the flap loses ct from its printed face (eased in just before
    # the flap edge); the flap loses ct from each face side.
    o_out = t[:, None] / 2 + lam * (h[:, None] - 2 * ct) - ct * smooth01((A - (1.0 - eps)) / eps)
    o_in = -t[:, None] / 2 + lam * (h[:, None] - ct)
    faces_rz = [P[:, None, :] + N[:, None, :] * o_out[..., None],
                P[:, None, :] + N[:, None, :] * o_in[..., None]]
    psi = math.radians(psi0_deg) + 2 * math.pi * A
    verts = []
    for rz in faces_rz:
        r, z = rz[..., 0], rz[..., 1]
        if drape is not None:
            r = r + drape(z, psi)
        verts.append(np.stack((r * np.cos(psi), r * np.sin(psi), z), axis=-1).reshape(-1, 3))
    V = np.concatenate(verts)
    p = lambda j, c: j * C + c
    b = lambda j, c: n * C + j * C + c
    J, K = np.meshgrid(np.arange(n - 1), np.arange(C - 1), indexing='ij')
    J, K = J.ravel(), K.ravel()
    quads = [np.stack((p(J, K), p(J, K + 1), p(J + 1, K + 1), p(J + 1, K)), 1),
             np.stack((b(J, K), b(J + 1, K), b(J + 1, K + 1), b(J, K + 1)), 1)]
    mats = [np.zeros(len(J), int), np.ones(len(J), int)]
    c = np.arange(C - 1)
    for j, flip in ((0, False), (n - 1, True)):          # free ends of the board
        q = np.stack((p(j, c), b(j, c), b(j, c + 1), p(j, c + 1)), 1)
        quads.append(q[:, ::-1] if flip else q)
        mats.append(np.full(len(c), 2))
    jj = np.arange(n - 1)
    for k, flip in ((0, False), (C - 1, True)):          # flap edge and strip edge
        q = np.stack((p(jj, k), p(jj + 1, k), b(jj + 1, k), b(jj, k)), 1)
        quads.append(q[:, ::-1] if flip else q)
        mats.append(np.full(len(jj), 2))
    S = np.tile(np.repeat(s, C), 2)
    Aa = np.tile(A.ravel(), 2)
    zone = [profile.zone[j] for j in range(n)]
    return {'verts': V * MM, 'faces': np.concatenate(quads), 'mats': np.concatenate(mats),
            's': S, 'a': Aa, 'rows': n, 'cols': C, 'zones': zone}


def revolve_loop(section, segments, psi0_deg=0.0):
    """Closed r/z loop revolved 360 degrees; points on the axis become poles."""
    ring_ids, verts = [], []
    psi = math.radians(psi0_deg) + 2 * math.pi * np.arange(segments) / segments
    for r, z in section:
        if r < 1e-9:
            ring_ids.append([len(verts)] * segments)
            verts.append((0.0, 0.0, z))
        else:
            ids = list(range(len(verts), len(verts) + segments))
            verts.extend(zip(r * np.cos(psi), r * np.sin(psi), np.full(segments, z)))
            ring_ids.append(ids)
    faces = []
    m = len(section)
    for j in range(m):
        A, B = ring_ids[j], ring_ids[(j + 1) % m]
        if A[0] == A[1] and B[0] == B[1]:
            continue
        for k in range(segments):
            f = [A[k], A[(k + 1) % segments], B[(k + 1) % segments], B[k]]
            f = list(dict.fromkeys(f))
            if len(f) >= 3:
                faces.append(f)
    return {'verts': np.array(verts) * MM, 'faces': faces}


# ---------------------------------------------------------------- DW drape

def lap_rise(t, seam, zone):
    """How far the glued lap stands out of the wall after the press.

    Two layers of board minus what the seam press takes out of each of them."""
    weight = (seam.get('compress_zones') or {}).get(zone, 0.0)
    return t + seam['layer_gap_mm'] - 2 * seam.get('compress', 0.0) * t * weight


def inner_lift_function(blank, seam, t, psi0_deg, gap, soft_mm=1.5, zone='WALL'):
    """Outward bump of the inner cup's overlap, as a smooth function of azimuth.

    The outer sleeve drapes over it instead of cutting through."""
    a_hid = float(blank.a_end(0.0)) - 1.0
    h = lap_rise(t, seam, zone)

    def bump(r, psi):
        a = np.mod(psi - math.radians(psi0_deg), 2 * math.pi) / (2 * math.pi)
        w = seam['ramp_mm'] / (2 * math.pi * r)
        e = soft_mm / (2 * math.pi * r)
        up = smooth01((a - (1 - e)) / e)                    # sleeve rides up onto the flap edge
        flap = 1 - smooth01((a - a_hid) / w)
        return h * np.maximum(up, np.where(a < 0.5, flap, 0.0))
    return bump


def bridge(x, ds, darc):
    """Spread a required push-out over the board's own surface.

    Board does not follow a step, it bridges over it: the field is dilated with
    a cone of unit slope in the sheet's metric (`ds` along the board and `darc`
    around it, both already divided by the bridging length), so the bulge keeps
    the height it needs where the sleeve touches and dies away on every side
    without a crease."""
    out = np.array(x, float)
    for j in range(1, out.shape[0]):
        np.maximum(out[j], out[j - 1] - ds[j - 1], out[j])
    for j in range(out.shape[0] - 2, -1, -1):
        np.maximum(out[j], out[j + 1] - ds[j], out[j])
    for k in range(1, out.shape[1]):
        np.maximum(out[:, k], out[:, k - 1] - darc[:, k - 1], out[:, k])
    for k in range(out.shape[1] - 2, -1, -1):
        np.maximum(out[:, k], out[:, k + 1] - darc[:, k], out[:, k])
    return out
