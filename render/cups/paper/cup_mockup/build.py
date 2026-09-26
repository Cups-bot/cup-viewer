"""Blender objects for the v4 paper cups: Cup_Wall, Cup_Bottom and (DW) Cup_Sleeve.

Geometry and registration come from paper.py; this module only turns the
arrays into meshes, assigns the three viewer materials, writes the UV and the
sheet coordinates the UV is recomputed from.
"""
import math

import bmesh
import bpy
import numpy as np

from . import emboss, materials, paper, relief

COLLECTION = 'CUPS_Mockup'
GEOMETRY_VERSION = '4.0'


def collection(name):
    coll = bpy.data.collections.get(name)
    if coll is None:
        coll = bpy.data.collections.new(name)
    if coll.name not in bpy.context.scene.collection.children:
        bpy.context.scene.collection.children.link(coll)
    return coll


def clear_owned(name):
    coll = bpy.data.collections.get(name)
    if not coll:
        return
    for obj in list(coll.objects):
        if obj.get('cups_owned'):
            data = obj.data
            bpy.data.objects.remove(obj, do_unlink=True)
            if isinstance(data, bpy.types.Mesh) and data.users == 0:
                bpy.data.meshes.remove(data)


def _mesh(name, verts, faces, mats, slots):
    me = bpy.data.meshes.new(name)
    if isinstance(faces, np.ndarray) and faces.ndim == 2:
        me.vertices.add(len(verts))
        me.vertices.foreach_set('co', np.asarray(verts, np.float32).ravel())
        me.loops.add(faces.size)
        me.loops.foreach_set('vertex_index', faces.astype(np.int32).ravel())
        me.polygons.add(len(faces))
        k = faces.shape[1]
        me.polygons.foreach_set('loop_start', (np.arange(len(faces)) * k).astype(np.int32))
        me.update(calc_edges=True)
    else:
        me.from_pydata([tuple(v) for v in verts], [], [list(f) for f in faces])
    for mat in slots:
        me.materials.append(mat)
    me.polygons.foreach_set('material_index', np.asarray(mats, np.int32))
    me.validate(clean_customdata=False)
    bm = bmesh.new()
    bm.from_mesh(me)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces[:])
    bm.to_mesh(me)
    bm.free()
    return me


def _shade(me, limit_deg=None):
    """Smooth faces, sharp edges above the angle limit (as the plastic cups).

    Without a limit only the cut edges are sharp (where the material changes):
    the embossed wrap is all soft bevels, and a limit would facet them."""
    limit = math.radians(limit_deg) if limit_deg is not None else None
    bm = bmesh.new()
    bm.from_mesh(me)
    bm.normal_update()
    for f in bm.faces:
        f.smooth = True
    for e in bm.edges:
        lf = e.link_faces
        if limit is None:
            e.smooth = len(lf) == 2 and lf[0].material_index == lf[1].material_index
        else:
            e.smooth = not (len(lf) == 2 and e.calc_face_angle(0.0) > limit)
    bm.to_mesh(me)
    bm.free()
    me.update()


def _attrs(me, s, a):
    me.attributes.new('cup_s', 'FLOAT', 'POINT').data.foreach_set('value', np.asarray(s, np.float32))
    me.attributes.new('cup_a', 'FLOAT', 'POINT').data.foreach_set('value', np.asarray(a, np.float32))


def set_uv(me, u, v):
    layer = me.uv_layers.get(materials.UV_NAME) or me.uv_layers.new(name=materials.UV_NAME)
    ids = np.empty(len(me.loops), np.int32)
    me.loops.foreach_get('vertex_index', ids)
    layer.data.foreach_set('uv', np.column_stack((u[ids], v[ids])).astype(np.float32).ravel())
    me.uv_layers.active = layer
    layer.active_render = True


def blank_for(obj):
    p = paper.load_params(obj['cups_params'])
    return paper.make_blank(p, obj.get('cups_part', 'wall'))


def update_uv(obj, settings):
    """Recompute the artwork UV from the stored sheet coordinates (vectorised)."""
    me = obj.data
    n = len(me.vertices)
    s = np.empty(n, np.float32)
    a = np.empty(n, np.float32)
    me.attributes['cup_s'].data.foreach_get('value', s)
    me.attributes['cup_a'].data.foreach_get('value', a)
    if obj.get('cups_print'):
        u, v = blank_for(obj).uv(s, a, settings.mapping, settings.offset_x, settings.offset_y, settings.scale)
    else:
        u, v = blank_for(obj).uv(s, a)
    set_uv(me, np.asarray(u), np.asarray(v))
    me.update()


def _object(name, me, coll, root):
    obj = bpy.data.objects.new(name, me)
    coll.objects.link(obj)
    obj.parent = root
    obj['cups_owned'] = True
    return obj


def _wall(name, p, psi0, coll, root, mats, printed, drape=None):
    prof = paper.cup_profile(p['cup'], p['construction'], p['mesh'])
    blank = paper.make_blank(p, 'wall')
    sw = paper.sweep_sheet(prof, blank, p['seam'], p['mesh'], psi0, drape)
    if printed:
        slots, idx = [mats[materials.PRINT], mats[materials.INNER], mats[materials.EDGE]], sw['mats']
    else:                                   # unprinted board: one material for both faces
        slots, idx = [mats[materials.INNER], mats[materials.EDGE]], np.array([0, 0, 1])[sw['mats']]
    me = _mesh(name, sw['verts'], sw['faces'], idx, slots)
    _attrs(me, sw['s'], sw['a'])
    # Crimped return under the floor: drives the knurl relief in the shader.
    press = np.array([1.0 if z == 'RETURN' else 0.0 for z in sw['zones']])
    me.attributes.new('cup_press', 'FLOAT', 'POINT').data.foreach_set(
        'value', np.tile(np.repeat(press, sw['cols']), 2).astype(np.float32))
    u, v = blank.uv(sw['s'], sw['a'])
    set_uv(me, np.asarray(u), np.asarray(v))
    _shade(me, p['mesh']['smooth_angle_deg'])
    obj = _object(name, me, coll, root)
    obj['cups_params'] = p['_key']
    obj['cups_print'] = printed
    obj['rows'] = sw['rows']
    obj['columns'] = sw['cols']
    return obj


def _bottom(p, coll, root, mats):
    sec = paper.floor_section(p['cup'], p['construction'], p['mesh'])
    rv = paper.revolve_loop(sec, p['mesh']['segments'])
    me = _mesh('Cup_Bottom', rv['verts'], rv['faces'], np.zeros(len(rv['faces']), int), [mats[materials.INNER]])
    # The disc carries no artwork; its UV only samples the relief map, so keep
    # it on a small patch of the sheet margin, which is always flat.
    x = rv['verts'][:, 0] / paper.MM
    y = rv['verts'][:, 1] / paper.MM
    set_uv(me, 0.02 + x / 6000.0, 0.02 + y / 6000.0)
    _shade(me, p['mesh']['smooth_angle_deg'])
    obj = _object('Cup_Bottom', me, coll, root)
    obj['cups_print'] = False
    return obj


def _outer(p, coll, root, mats):
    """Printed outer layer of a double-wall cup: the DW sleeve or the EM wrap."""
    inner = p['inner']
    wrap = 'wrap' in p
    sl = p['wrap'] if wrap else p['sleeve']
    prof = (paper.wrap_profile(sl, inner['cup'], p['mesh']) if wrap
            else paper.sleeve_profile(sl, inner['cup'], p['mesh']))
    blank = paper.make_blank(p, 'wrap' if wrap else 'sleeve')
    iblank = paper.Blank(inner['template'], inner['registration'])
    bump = paper.inner_lift_function(iblank, inner['seam'], inner['cup']['wall_mm'], p['inner_seam_azimuth_deg'], sl['drape_gap_mm'])
    tan_s = math.tan(math.radians(sl.get('taper_deg', inner['cup']['taper_deg'])))
    fit = sl.get('fit_z_mm', sl['top_z_mm'])
    r_in_fit = float(paper.cone_radius(inner['cup'], fit)) + sl.get('top_gap_mm', sl.get('gap_mm', 0.02))
    bridge_mm = sl.get('drape_bridge_mm', 25.0)
    pp, pn, pt, ps = prof.arrays()
    # Smallest radius of each station of the sleeve section, both faces: in the
    # bottom roll this is well inside the nominal wall line.
    r_station = (pp[:, 0] - np.abs(pn[:, 0]) * pt / 2)[:, None]

    def drape(z, psi):
        """Outward shift of the sleeve where the inner cup's lap is in the way.

        The sleeve only touches the inner cup near the fit line: lower down the
        gap between the two cones opens faster than the doubled seam is thick,
        so there is nothing to ride over and the sleeve stays a clean cone.
        Where it does touch, the board bridges the step instead of folding over
        it, so the requirement is spread over `drape_bridge_mm` of the sheet in
        both directions and the bulge dies away without a crease."""
        r_inner = paper.cone_radius(inner['cup'], np.minimum(z, fit))
        need = r_inner + bump(np.maximum(r_inner, 1.0), psi) + sl['drape_gap_mm']
        have = np.minimum(r_in_fit - tan_s * (fit - z), r_station)
        return paper.bridge(np.maximum(need - have, 0.0),
                            np.abs(np.diff(ps)) / bridge_mm,
                            np.abs(np.diff(psi, axis=1)) * pp[:, :1] / bridge_mm)
    name = 'Cup_Wrap' if wrap else 'Cup_Sleeve'
    slots = [mats[materials.PRINT], mats[materials.INNER], mats[materials.EDGE]]
    data = relief.load(p) if wrap else None
    if data is not None:
        # EM: the waffle is in the mesh.  The drape is worked out on the plain
        # swept grid as before and read off it at the lattice vertices.
        A = paper.sheet_columns(blank, ps, p['mesh'])
        psi = np.radians(p['seam']['azimuth_deg']) + 2 * np.pi * A
        lap = paper.grid_lookup(ps, A, drape(np.broadcast_to(pp[:, 1:2], A.shape), psi))
        dom = relief.Domain(blank, ps.max())
        sh = relief.sheet(dom, data)
        if sh['flipped']:
            raise RuntimeError(f"{p['_key']}: {sh['flipped']} folded quads where the waffle meets the cut")
        s, a = sh['s'], sh['a']
        out, inn = paper.place_sheet(prof, blank, p['seam'], p['seam']['azimuth_deg'], s, a,
                                     relief.lift(dom, data, s, a, p['emboss']['depth_mm']), lap)
        n, q = len(s), sh['quads']
        e0, e1 = sh['loop'], np.roll(sh['loop'], -1)
        # inner face reversed about vertex 0, so both faces split each quad on
        # the same diagonal and stay parallel where the relief bends a quad
        faces = np.concatenate((q, q[:, [0, 3, 2, 1]] + n, np.stack((e0, e0 + n, e1 + n, e1), 1)))
        idx = np.concatenate((np.zeros(len(q), int), np.ones(len(q), int), np.full(len(e0), 2)))
        me = _mesh(name, np.concatenate((out, inn)), faces, idx, slots)
        s, a = np.tile(s, 2), np.tile(a, 2)
        shape = {'relief_quads': int(len(q)), 'lattice_loops': sh['loops_per_period']}
    else:
        sw = paper.sweep_sheet(prof, blank, p['seam'], p['mesh'], p['seam']['azimuth_deg'], drape)
        me = _mesh(name, sw['verts'], sw['faces'], sw['mats'], slots)
        s, a = sw['s'], sw['a']
        shape = {'rows': sw['rows'], 'columns': sw['cols']}
    _attrs(me, s, a)
    u, v = blank.uv(s, a)
    set_uv(me, np.asarray(u), np.asarray(v))
    _shade(me, None if data is not None else p['mesh']['smooth_angle_deg'])
    obj = _object(name, me, coll, root)
    obj['cups_params'] = p['_key']
    obj['cups_part'] = 'wrap' if wrap else 'sleeve'
    obj['print_scale'] = blank.scale
    obj['cups_print'] = True
    for k, v in shape.items():
        obj[k] = v
    return obj


def build(scene, model):
    p = paper.load_params(model)
    clear_owned(COLLECTION)
    coll = collection(COLLECTION)
    root = bpy.data.objects.new('CUPS_Product', None)
    coll.objects.link(root)
    root['cups_owned'] = True
    root['model'] = model
    root['geometry_version'] = GEOMETRY_VERSION
    root.empty_display_size = 0.02
    mats = materials.ensure()
    materials.set_emboss(emboss.build(p, emboss.sheet_of(p),
                                  getattr(getattr(scene, 'cups', None), 'emboss_depth', None)))
    if paper.is_double_wall(p):
        inner = p['inner']
        objs = [_wall('Cup_Wall', inner, p['inner_seam_azimuth_deg'], coll, root, mats, False),
                _bottom(inner, coll, root, mats),
                _outer(p, coll, root, mats)]
    else:
        objs = [_wall('Cup_Wall', p, p['seam']['azimuth_deg'], coll, root, mats, True),
                _bottom(p, coll, root, mats)]
    # The whole product stands on its lowest point (the doubled heel at the seam).
    zmin = min(min(v.co.z for v in o.data.vertices) for o in objs)
    for o in objs:
        o.data.transform(__import__('mathutils').Matrix.Translation((0, 0, -zmin)))
        o.data.update()
    root['base_offset_mm'] = -zmin / paper.MM
    root.rotation_euler.z = scene.cups.rotation if hasattr(scene, 'cups') else 0.0
    for o in objs:
        if o.get('cups_print') and hasattr(scene, 'cups'):
            update_uv(o, scene.cups)
    scene.unit_settings.system = 'METRIC'
    scene.unit_settings.scale_length = 1.0
    scene.unit_settings.length_unit = 'MILLIMETERS'
    return root
