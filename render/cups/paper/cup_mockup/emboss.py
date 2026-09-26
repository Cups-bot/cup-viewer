"""Relief of the board as a normal map in sheet coordinates.

Everything pressed into the board lives on the same A4 sheet the artwork lies
on: the crimp of the bottom seal, and whatever the client wants embossed.  The
height field is turned into a tangent-space normal map, so the relief travels
in the GLB as `normalTexture` instead of existing only in Blender's shader.

Black in the client's sheet is flat, white is pressed outwards.
"""
from pathlib import Path

import numpy as np

from . import paper

PARAMS_ROOT = Path(__file__).resolve().parent.parent

IMAGE = 'CUPS_Emboss'              # relief of the printed board (wall or sleeve)
INNER_IMAGE = 'CUPS_EmbossInner'   # relief of the unprinted board (DW inner cup)
HEIGHT_IMAGE = 'CUPS_EmbossHeight'  # the client's black and white sheet, kept for rebuilds
PX_PER_MM = 6.0
CRIMP_TEETH = 192


def _grid(px_per_mm, page=paper.A4_MM):
    w = int(round(page[0] * px_per_mm))
    h = int(round(page[1] * px_per_mm))
    x = (np.arange(w) + 0.5) * page[0] / w
    y = (np.arange(h) + 0.5) * page[1] / h
    return np.meshgrid(x, y)


def _sheet_coords(blank, X, Y):
    """Page millimetres -> (R, a) of the blank; a is the position across it."""
    R = np.hypot(X - blank.cx, blank.cy - Y)
    th = np.degrees(np.arctan2(X - blank.cx, blank.cy - Y))
    left = blank._edge(blank.vis['left_deg'], R)
    right = blank._edge(blank.vis['right_deg'], R)
    return R, (th - left) / (right - left)


def crimp(blank, profile, X, Y, depth_mm, teeth=CRIMP_TEETH):
    """Radial pleats of the bottom seal, on the strip that folds under the floor."""
    _, _, _, s = profile.arrays()
    rows = np.array([z == 'RETURN' for z in profile.zone])   # not the heel: that is seen from outside
    if not rows.any() or depth_mm <= 0:
        return np.zeros_like(X)
    R = blank.R(s[rows])
    lo, hi = float(R.min()), float(R.max())
    Rp, a = _sheet_coords(blank, X, Y)
    band = paper.smooth01((Rp - lo) / 0.4) * (1.0 - paper.smooth01((Rp - hi) / 0.4))
    band *= (a > -0.05) & (a < 1.15)
    ribs = 0.5 + 0.5 * np.cos(2 * np.pi * teeth * a)
    return depth_mm * band * ribs ** 2


def _blur(a, px):
    """Separable box blur, twice — a cheap bevel on the edge of the emboss."""
    px = max(1, int(px))
    for _ in range(2):
        for axis in (0, 1):
            c = np.cumsum(np.pad(a, [(px, px) if i == axis else (0, 0) for i in (0, 1)], mode='edge'), axis=axis)
            lo = np.take(c, np.arange(0, a.shape[axis]), axis=axis)
            hi = np.take(c, np.arange(2 * px, a.shape[axis] + 2 * px), axis=axis)
            a = (hi - lo) / (2 * px)
    return a


def client_height(image, X, depth_mm, bevel_mm=0.0, mm_per_px=1.0):
    """The client's sheet: white pressed out by depth_mm, with a bevelled edge."""
    if image is None or depth_mm <= 0:
        return np.zeros_like(X)
    w, h = image.size
    px = np.asarray(image.pixels[:], np.float32).reshape(h, w, -1)
    grey = px[..., :3].mean(axis=2)[::-1]                  # Blender images start at the bottom
    iy = np.clip((np.arange(X.shape[0]) + 0.5) * h / X.shape[0], 0, h - 1).astype(int)
    ix = np.clip((np.arange(X.shape[1]) + 0.5) * w / X.shape[1], 0, w - 1).astype(int)
    h = grey[np.ix_(iy, ix)]
    if bevel_mm > 0:
        h = _blur(h, bevel_mm / mm_per_px / 2)
    return depth_mm * h


def to_normal(height, mm_per_px):
    """Tangent-space normal map, OpenGL convention (+Y up), as float RGB."""
    dhdx = np.gradient(height, mm_per_px, axis=1)
    dhdy = np.gradient(height, mm_per_px, axis=0)
    n = np.stack((-dhdx, dhdy, np.ones_like(height)), axis=-1)
    n /= np.linalg.norm(n, axis=-1, keepdims=True)
    return 0.5 + 0.5 * n


def _store(name, rgb):
    import bpy
    h, w = rgb.shape[:2]
    im = bpy.data.images.get(name)
    if im is None or tuple(im.size) != (w, h):
        if im is not None:
            bpy.data.images.remove(im)
        im = bpy.data.images.new(name, w, h, alpha=False, is_data=True)
    im.colorspace_settings.name = 'Non-Color'
    flat = np.empty((h, w, 4), np.float32)
    flat[..., :3] = rgb[::-1]                              # Blender images start at the bottom
    flat[..., 3] = 1.0
    im.pixels.foreach_set(flat.ravel())
    im.pack()
    return im


def sheet_of(p):
    """The height sheet to press: the one loaded by hand, else the one the model
    brings with it in sources.emboss.  (The EM waffle is not here any more: it
    is pressed into the wrap's mesh, see relief.py.)"""
    import bpy
    im = bpy.data.images.get(HEIGHT_IMAGE)
    if im is not None:
        return im
    rel = (p.get('sources') or {}).get('emboss')
    if not rel:
        return None
    path = PARAMS_ROOT / rel
    if not path.is_file():
        return None
    im = bpy.data.images.load(str(path), check_existing=False)
    im.colorspace_settings.name = 'Non-Color'
    im.name = HEIGHT_IMAGE
    im.pack()
    return im


def build(p, height_image=None, depth_mm=None, px_per_mm=PX_PER_MM):
    """Make (or refresh) the relief maps of one model.

    Returns {material role: image}.  The printed board carries the client's
    emboss; the crimp goes on whichever board is actually crimped — the wall
    of a single-wall cup, the inner cup of a double-wall one."""
    depth = p.get('emboss', {}).get('depth_mm', 0.35) if depth_mm is None else depth_mm
    crimp_mm = p.get('emboss', {}).get('crimp_mm', 0.12)
    bevel = p.get('emboss', {}).get('bevel_mm', 0.45)
    dw = paper.is_double_wall(p)
    body = p['inner'] if dw else p
    # Each map lies on the page of its own template: the printed one on the
    # page of the printed part, the crimp on the page of the crimped cup.
    X, Y = _grid(px_per_mm, paper.page_of(body))
    mm_per_px = X[0, 1] - X[0, 0]
    wall_blank = paper.Blank(body['template'], body['registration'])
    wall_prof = paper.cup_profile(body['cup'], body['construction'], body['mesh'])
    crimp_h = crimp(wall_blank, wall_prof, X, Y, crimp_mm)
    if dw:                                                 # printed sheet is the sleeve / wrap
        Xp, _ = _grid(px_per_mm, paper.page_of(p))
        printed = client_height(height_image, Xp, depth, bevel, Xp[0, 1] - Xp[0, 0])
        return {'print': _store(IMAGE, to_normal(printed, Xp[0, 1] - Xp[0, 0])),
                'inner': _store(INNER_IMAGE, to_normal(crimp_h, mm_per_px))}
    both = _store(IMAGE, to_normal(crimp_h + client_height(height_image, X, depth, bevel, mm_per_px), mm_per_px))
    return {'print': both, 'inner': both}
