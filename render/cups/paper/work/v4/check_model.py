"""Numerical acceptance of the v4 cups.

blender -b --factory-startup -P work/v4/check_model.py -- MODEL [OUT_JSON]

Topology, face intersections (inside each mesh and between meshes), drawing
dimensions, and artwork registration: where template lines land on the cup.
"""
import json
import math
import sys
from pathlib import Path

import bmesh
import bpy
import numpy as np
from mathutils.bvhtree import BVHTree

sys.path.insert(0, str(Path(__file__).resolve().parent))
import review  # noqa: E402

argv = sys.argv[sys.argv.index('--') + 1:]
model = argv[0]
out_path = Path(argv[1]) if len(argv) > 1 else None
root = review.fresh(model, art=False)
from cup_mockup import paper  # noqa: E402

report = {'model': model, 'objects': {}, 'pairs': [], 'dimensions_mm': {}, 'registration': {}, 'pass': True}


def fail(msg):
    report['pass'] = False
    report.setdefault('failures', []).append(msg)


def world_verts(o):
    M = o.matrix_world
    return [M @ v.co for v in o.data.vertices]


def tree(o):
    return BVHTree.FromPolygons(world_verts(o), [tuple(p.vertices) for p in o.data.polygons], all_triangles=False, epsilon=0.0)


meshes = [o for o in root.children if o.type == 'MESH']
trees = {}
for o in meshes:
    me = o.data
    bm = bmesh.new()
    bm.from_mesh(me)
    sizes = {}
    for f in bm.faces:
        sizes[len(f.verts)] = sizes.get(len(f.verts), 0) + 1
    nonman = sum(not e.is_manifold for e in bm.edges)
    degenerate = sum(f.calc_area() < 1e-14 for f in bm.faces)
    volume = bm.calc_volume(signed=True) * 1e9
    bm.free()
    t = tree(o)
    trees[o.name] = t
    polys = [set(p.vertices) for p in me.polygons]
    pairs = [(a, b) for a, b in t.overlap(t) if a < b and not (polys[a] & polys[b])]
    info = {'vertices': len(me.vertices), 'faces': len(me.polygons), 'face_sizes': sizes,
            'triangles_after_export': sum((n - 2) * c for n, c in sizes.items()),
            'non_manifold_edges': nonman, 'degenerate_faces': degenerate,
            'self_intersections': len(pairs), 'volume_mm3': round(volume, 1),
            'materials': [m.name for m in me.materials], 'uv_layers': [u.name for u in me.uv_layers]}
    report['objects'][o.name] = info
    if nonman or degenerate or pairs or volume <= 0:
        fail(f'{o.name}: non-manifold {nonman}, degenerate {degenerate}, self-intersections {len(pairs)}')
    if any(n > 4 for n in sizes):
        fail(f'{o.name}: n-gons present')
for i, a in enumerate(meshes):
    for b in meshes[i + 1:]:
        hits = trees[a.name].overlap(trees[b.name])
        report['pairs'].append({'a': a.name, 'b': b.name, 'intersections': len(hits)})
        if hits:
            fail(f'{a.name} x {b.name}: {len(hits)} intersecting faces')

# ---- dimensions against the drawings
p = paper.load_params(model)
dw = paper.is_double_wall(p)
cup = p['inner']['cup'] if dw else p['cup']
allv = np.array([tuple(v) for o in meshes for v in world_verts(o)])
r = np.hypot(allv[:, 0], allv[:, 1])
wall = next(o for o in meshes if o.name == 'Cup_Wall')
wv = np.array([tuple(v) for v in world_verts(wall)])
wr = np.hypot(wv[:, 0], wv[:, 1])
dims = {'height': allv[:, 2].max() * 1000, 'rim_od': 2 * wr.max() * 1000,
        'base_od_below_1mm': 2 * wr[wv[:, 2] < allv[:, 2].min() + .001].max() * 1000,
        'floor_top_z': max(v.z for v in world_verts(next(o for o in meshes if o.name == 'Cup_Bottom'))) * 1000}
checks = [('height', cup['height_mm'], .5), ('rim_od', cup['rim_od_mm'], .3), ('floor_top_z', cup['floor_top_mm'], .15)]
outer = next((o for o in meshes if o.name in ('Cup_Sleeve', 'Cup_Wrap')), None)
if dw and 'wrap' in p:                    # EM: the wrap runs the whole visible height
    wv = np.array([tuple(v) for v in world_verts(outer)])
    dims['wrap_bottom_z'] = wv[:, 2].min() * 1000
    dims['wrap_top_z'] = wv[:, 2].max() * 1000
    checks += [('wrap_bottom_z', p['wrap']['bottom_z_mm'], .3),
               ('wrap_top_z', p['wrap']['top_z_mm'], .3)]
elif dw:
    sl = outer
    sv = np.array([tuple(v) for v in world_verts(sl)])
    sr = np.hypot(sv[:, 0], sv[:, 1])
    top = sv[:, 2].max()
    dims['sleeve_bottom_z'] = sv[:, 2].min() * 1000
    dims['sleeve_height'] = (top - sv[:, 2].min()) * 1000
    from mathutils import Vector

    def od(z):
        """Sleeve diameter from two horizontal rays at the front and the side."""
        hits = []
        for d in (Vector((0, 1, 0)), Vector((1, 0, 0))):
            loc, *_ = trees['Cup_Sleeve'].ray_cast(-d * 0.2 + Vector((0, 0, z)), d)
            hits.append((loc.xy.length) if loc else float('nan'))
        return 2 * float(np.mean(hits)) * 1000
    dims['sleeve_top_z'] = top * 1000
    dims['sleeve_top_od'] = od(p['sleeve'].get('visible_top_z_mm', top * 1000) / 1000 - .0003)
    dims['sleeve_od_at_12.5'] = od(.0125)
    checks += [('sleeve_bottom_z', p['sleeve']['bottom_z_mm'], .3)]
    if 'top_od_drawing_mm' in p['sleeve']:
        checks += [('sleeve_top_od', p['sleeve']['top_od_drawing_mm'], .6)]
# ---- inner diameter at the top of the floor, where the drawings give one
if cup.get('floor_id_drawing_mm'):
    from mathutils import Vector
    z = dims['floor_top_z'] / 1000
    rr = []
    for k in range(36):
        psi = 2 * math.pi * k / 36
        loc, *_ = trees['Cup_Wall'].ray_cast(Vector((0.0, 0.0, z)), Vector((math.cos(psi), math.sin(psi), 0.0)), 0.2)
        rr.append(loc.xy.length if loc else float('nan'))
    dims['floor_id'] = 2 * float(np.nanmedian(rr)) * 1000
    checks += [('floor_id', cup['floor_id_drawing_mm'], 0.3)]

# ---- capacity: what the cup holds, by rays along the inner surface
def poured_ml(z0, z1, steps=161, rays=72):
    """Volume between two heights, metres in, millilitres out."""
    from mathutils import Vector
    zs = np.linspace(z0, z1, steps)
    area = np.empty(len(zs))
    for i, z in enumerate(zs):
        rr = []
        for k in range(rays):                     # inner face of the wall, by ray from the axis
            psi = 2 * math.pi * k / rays
            loc, *_ = trees['Cup_Wall'].ray_cast(Vector((0.0, 0.0, float(z))), Vector((math.cos(psi), math.sin(psi), 0.0)), 0.2)
            rr.append(loc.xy.length if loc else float('nan'))
        area[i] = math.pi * float(np.nanmean(np.square(rr)))
    return float(np.sum((area[1:] + area[:-1]) / 2 * np.diff(zs))) * 1e6


if cup.get('fill_line_z_mm'):                     # the drawing marks a fill line
    dims['fill_volume_ml'] = poured_ml(dims['floor_top_z'] / 1000, cup['fill_line_z_mm'] / 1000)
    checks += [('fill_volume_ml', cup['fill_volume_ml'], cup['fill_volume_ml'] * 0.02)]
if cup.get('brim_volume_ml'):                     # filled to the very top: the number in the article
    dims['brim_volume_ml'] = poured_ml(dims['floor_top_z'] / 1000, (cup['height_mm'] - 0.05) / 1000)
    # the number in the article is a rounded nominal: eight cups land within 1 %,
    # HB70-180 and HB70-210 within 3 %. The guard is against a wrong board, not a rounding.
    checks += [('brim_volume_ml', cup['brim_volume_ml'], cup['brim_volume_ml'] * 0.04)]

for k, v in dims.items():
    report['dimensions_mm'][k] = round(float(v), 3)
for k, want, tol in checks:
    got = dims[k]
    report['dimensions_mm'][k + '_drawing'] = want
    if abs(got - want) > tol:
        fail(f'{k}: {got:.3f} mm vs drawing {want} ±{tol}')

# ---- registration: template lines on the printed surface, front meridian a = 0.5
printed = next(o for o in meshes if o.get('cups_print'))
me = printed.data
n = len(me.vertices)
s = np.empty(n, np.float32)
a = np.empty(n, np.float32)
me.attributes['cup_s'].data.foreach_get('value', s)
me.attributes['cup_a'].data.foreach_get('value', a)
co = np.array([tuple(v) for v in world_verts(printed)])
pp = paper.load_params(model)
blank = paper.make_blank(pp, printed.get('cups_part', 'wall'))
# Front meridian of the printed face: sweep_sheet writes that face first, so
# the first half of the vertices is the side the artwork is on.  A wrap meshed
# along the waffle has no column at a = 0.5: take the vertices next to it.
lattice = 'relief_quads' in printed
front = (np.abs(a - 0.5) < (0.003 if lattice else 1e-6)) & (np.arange(n) < n // 2)
order = np.argsort(s[front])
s_f = s[front][order]
z_f = co[front][order][:, 2]
r_f = np.hypot(co[front][order][:, 0], co[front][order][:, 1])


def z_at(s_val):
    return float(np.interp(s_val, s_f, z_f)) * 1000


def r_at(s_val):
    return float(np.interp(s_val, s_f, r_f)) * 1000


vis = pp['template']['visible']
reg = {}
for name, R in (('visible_bottom', vis['R_bottom_mm']), ('visible_top', vis['R_top_mm']),
                ('die_bottom', pp['template']['die']['R_bottom_mm']), ('die_top', pp['template']['die']['R_top_mm'])):
    sv_ = float(blank.s_at(R))
    reg[name] = {'R_mm': R, 's_mm': round(sv_, 3), 'z_on_cup_mm': round(z_at(sv_), 3) if s_f.min() <= sv_ <= s_f.max() else None}
# The modelled board may stop inside the die-cut (the crimped return gathers
# the paper), but it must never reach past it.
reg['board_s_min_mm'] = round(float(s.min()), 3)
if s.min() < reg['die_bottom']['s_mm'] - 0.005:
    fail(f"board goes {reg['die_bottom']['s_mm'] - s.min():.3f} mm past the die-cut below the reference")
reg['design_shift_mm'] = pp['registration'].get('design_shift_mm', 0.0)
reg['print_scale_along_board'] = round(blank.scale, 5)
# Seam: the left and right visible edges of the artwork meet exactly under the flap edge.
u_layer = me.uv_layers[0]
ids = np.empty(len(me.loops), np.int32)
me.loops.foreach_get('vertex_index', ids)
uv = np.empty(len(me.loops) * 2, np.float32)
u_layer.data.foreach_get('uv', uv)
uv = uv.reshape(-1, 2)
vuv = np.zeros((n, 2))
vuv[ids] = uv
x_mm, y_mm = vuv[:, 0] * blank.page[0], (1 - vuv[:, 1]) * blank.page[1]
exp_x, exp_y = blank.page_mm(s, a)
err = np.hypot(x_mm - exp_x, y_mm - exp_y)
reg['uv_vs_template_max_err_mm'] = round(float(err.max()), 5)
col0 = np.abs(a) < 1e-9
col1 = np.abs(a - 1) < 1e-9
xl, yl = blank.page_mm(s[col0], 0.0)
xr, yr = blank.page_mm(s[col1], 1.0)
L = pp['template']['visible']
ang_l = np.degrees(np.arctan2(xl - blank.cx, blank.cy - yl))
ang_r = np.degrees(np.arctan2(xr - blank.cx, blank.cy - yr))
Rl = blank.R(s[col0])
Rr = blank.R(s[col1])
exp_l = paper.Blank._edge(L['left_deg'], Rl)
exp_r = paper.Blank._edge(L['right_deg'], Rr)
reg['seam_left_edge_err_deg'] = round(float(np.abs(ang_l - exp_l).max()), 6)
# (a lattice wrap has no line at a = 1: the visible end runs on under the flap)
reg['seam_right_edge_err_deg'] = round(float(np.abs(ang_r - exp_r).max()), 6) if col1.any() else None
report['registration'] = reg
if reg['uv_vs_template_max_err_mm'] > 0.01:
    fail('UV differs from the template mapping')
if not dw:
    # The lower blue line marks where the cup stops being seen from outside:
    # the widest point at the bottom, where the wall turns under into the heel.
    widest = float(r_f[z_f < 0.002].max()) * 1000
    reg['visible_bottom']['r_mm'] = round(r_at(0.0), 3)
    reg['widest_at_heel_mm'] = round(widest, 3)
    if abs(reg['visible_bottom']['r_mm'] - widest) > 0.02:
        fail(f"HB: blue bottom line is not at the turn of the heel "
             f"(r {reg['visible_bottom']['r_mm']:.3f} vs widest {widest:.3f})")
    if abs(blank.scale - 1) > 1e-9:
        fail('HB artwork must be isometric')
if 'R_at_visible_top_mm' in pp['registration'] and 'sleeve' in pp:
    want = pp['registration']['R_at_visible_top_mm']
    z_line = z_at(float(blank.s_at(want)))
    reg['visible_top_line_z_mm'] = round(z_line, 3)
    reg['R_at_sleeve_top_edge_mm'] = round(float(blank.R(s_f.max())), 3)
    if abs(z_line - pp['sleeve']['visible_top_z_mm'] - root.get('base_offset_mm', 0.0)) > 0.02:
        fail('requested template line is not at the visible top of the sleeve')
    # The tuck under the rim curl may stop inside the die-cut, never past it.
    if reg['R_at_sleeve_top_edge_mm'] > pp['template']['die']['R_top_mm'] + 0.02:
        fail(f"sleeve top edge is {reg['R_at_sleeve_top_edge_mm'] - pp['template']['die']['R_top_mm']:.3f} mm past the die-cut")
out = json.dumps(report, indent=1, ensure_ascii=False)
print('CHECK', out, flush=True)
if out_path:
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(out, encoding='utf-8')
