"""Построение меша стакана в Blender: профиль -> тело вращения -> рёбра ->
клеймо -> UV -> материал.

Единственный модуль, который создаёт геометрию. Всё, что можно посчитать без
Blender, посчитано в profile.py и unwrap.py.

Оси: ось вращения — Z, дно в z=0. Геометрия строится в метрах (1 unit = 1 m),
перевод мм->м делает profile.mm_to_m и только он.
"""

import json
import math
import os
from typing import Dict, List, Optional, Sequence, Tuple

import bmesh
import bpy

from src import profile as P
from src import unwrap as U

WARNINGS: List[str] = []


def _warn(msg: str) -> None:
    WARNINGS.append(msg)
    print("WARN: " + msg)


# ---------------------------------------------------------------------------
# сцена
# ---------------------------------------------------------------------------

def apply_units(scene, params: dict) -> None:
    """Метрическая система, отображение в миллиметрах.

    scale_length = 1.0: геометрия строится в метрах, а length_unit отвечает
    только за то, в чём Blender показывает числа.
    """
    us = scene.unit_settings
    us.system = "METRIC"
    us.scale_length = float(params["mesh"]["unit_scale_length"])
    try:
        us.length_unit = "MILLIMETERS"
    except TypeError as exc:
        _warn(f"не удалось выставить length_unit='MILLIMETERS': {exc}")


def ensure_collection(params: dict):
    name = params["mesh"]["collection_name"]
    coll = bpy.data.collections.get(name)
    if coll is None:
        coll = bpy.data.collections.new(name)
    if name not in {c.name for c in bpy.context.scene.collection.children}:
        bpy.context.scene.collection.children.link(coll)
    return coll


def _is_ours(name: str, base: str) -> bool:
    return (name == base or name.startswith(base + ".")
            or name.startswith(base + "_profile") or name.startswith(base + "_marking"))


def purge(params: dict) -> None:
    """Убрать прошлый результат: повторный запуск обязан быть идемпотентен."""
    base = params["mesh"]["object_name"]
    for obj in list(bpy.data.objects):
        if obj.type in {"MESH", "CURVE"} and _is_ours(obj.name, base):
            bpy.data.objects.remove(obj, do_unlink=True)
    for me in list(bpy.data.meshes):
        if me.users == 0 and _is_ours(me.name, base):
            bpy.data.meshes.remove(me)
    for cu in list(bpy.data.curves):
        if cu.users == 0 and _is_ours(cu.name, base):
            bpy.data.curves.remove(cu)


# ---------------------------------------------------------------------------
# тело вращения
# ---------------------------------------------------------------------------

def _profile_object(params: dict, prof: P.Profile, coll):
    """Открытая ломаная профиля в плоскости XZ (r -> x, z -> z), в метрах."""
    me = bpy.data.meshes.new(params["mesh"]["object_name"] + "_profile")
    verts = [(P.mm_to_m(r), 0.0, P.mm_to_m(z)) for z, r in prof.points]
    edges = [(i, i + 1) for i in range(len(verts) - 1)]
    me.from_pydata(verts, edges, [])
    me.update()
    obj = bpy.data.objects.new(params["mesh"]["object_name"] + "_profile", me)
    coll.objects.link(obj)
    return obj


def _revolve(obj, params: dict):
    """Screw-модификатор на 360 градусов, запечённый через depsgraph.

    Модификатор, а не bpy.ops.mesh.spin: не нужен ни режим правки, ни подмена
    контекста, результат детерминирован.
    """
    mod = obj.modifiers.new("Revolve", "SCREW")
    mod.axis = "Z"
    mod.angle = 2.0 * math.pi
    mod.screw_offset = 0.0
    mod.steps = int(params["mesh"]["segments"])
    mod.render_steps = int(params["mesh"]["segments"])
    mod.iterations = 1
    mod.use_merge_vertices = True
    mod.merge_threshold = P.mm_to_m(params["mesh"]["merge_distance_mm"])
    mod.use_normal_calculate = True
    mod.use_smooth_shade = True

    dg = bpy.context.evaluated_depsgraph_get()
    baked = bpy.data.meshes.new_from_object(obj.evaluated_get(dg), depsgraph=dg)
    obj.modifiers.remove(mod)
    return baked


# ---------------------------------------------------------------------------
# рёбра расстыковки
# ---------------------------------------------------------------------------

def add_ribs(bm, params: dict) -> int:
    """Четыре тонких радиальных ребра на дне — отдельные замкнутые оболочки.

    В SECTION C-C они выглядят сплошным уступом только потому, что плоскость
    разреза проходит через два из них. Ребро чуть утоплено в стенку и пол
    (ribs.embed_mm), чтобы не появлялись совпадающие грани.
    """
    g = params["geometry"]
    rb = g["ribs"]
    sec = P.rib_section(params)
    tris = P.triangulate_polygon(sec)
    covered = 0.0
    for i, j, k in tris:
        a, b, c = sec[i], sec[j], sec[k]
        covered += abs((b[0] - a[0]) * (c[1] - a[1])
                       - (b[1] - a[1]) * (c[0] - a[0])) / 2.0
    exact = P.polygon_area(sec)
    if abs(covered - exact) > 1e-6 * max(1.0, exact):
        _warn("триангуляция сечения ребра покрыла %.4f мм2 из %.4f" % (covered, exact))
    z_floor = g["bottom"]["floor_z_mm"]
    embed = rb["embed_mm"]
    count = int(rb["count"])
    made = 0

    for k in range(count):
        th0 = math.radians(rb["azimuth_start_deg"] + 360.0 * k / count)
        rings = []
        for sgn in (-1.0, 1.0):
            ring = []
            for z, r in sec:
                rr = r + embed
                zz = z - embed if z <= z_floor + 1e-9 else z
                half = 0.5 * P.rib_width_at(params, z) / rr
                a = th0 + sgn * half
                ring.append(bm.verts.new((P.mm_to_m(rr * math.cos(a)),
                                          P.mm_to_m(rr * math.sin(a)),
                                          P.mm_to_m(zz))))
            rings.append(ring)
        a_ring, b_ring = rings
        for i, j, l in tris:
            bm.faces.new((a_ring[i], a_ring[j], a_ring[l]))
            bm.faces.new((b_ring[l], b_ring[j], b_ring[i]))
        n = len(sec)
        for i in range(n):
            j = (i + 1) % n
            bm.faces.new((a_ring[i], a_ring[j], b_ring[j], b_ring[i]))
        made += 1
    return made


# ---------------------------------------------------------------------------
# клеймо дна
# ---------------------------------------------------------------------------

def _marking_mesh(params: dict, coll):
    """Выпуклый рельеф клейма: замкнутые петли -> 2D-кривая -> тело.

    Заливка с дырками (внутренние петли букв) — штатное поведение 2D-кривой
    Blender, поэтому триангулировать с отверстиями вручную не нужно.
    """
    mk = params["marking"]
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    path = mk["source"]
    if not os.path.isabs(path):
        path = os.path.join(root, path)
    if not os.path.isfile(path):
        _warn(f"клеймо: файл {path} не найден, рельеф не построен")
        return None
    with open(path, "r", encoding="utf-8") as fh:
        loops = json.load(fh)["loops"]
    if not loops:
        _warn("клеймо: в файле нет ни одной петли")
        return None

    name = params["mesh"]["object_name"] + "_marking"
    cu = bpy.data.curves.new(name, "CURVE")
    cu.dimensions = "2D"
    cu.fill_mode = "BOTH"
    cu.resolution_u = 1
    cu.extrude = P.mm_to_m(mk["relief_mm"] + mk["embed_mm"]) / 2.0
    sx = -1.0 if mk["mirror_x"] else 1.0
    for loop in loops:
        sp = cu.splines.new("POLY")
        sp.points.add(len(loop) - 1)
        for i, (x, y) in enumerate(loop):
            sp.points[i].co = (P.mm_to_m(sx * x), P.mm_to_m(y), 0.0, 1.0)
        sp.use_cyclic_u = True

    obj = bpy.data.objects.new(name, cu)
    coll.objects.link(obj)
    obj.location = (0.0, 0.0,
                    P.mm_to_m(mk["plane_z_mm"] + (mk["embed_mm"] - mk["relief_mm"]) / 2.0))
    dg = bpy.context.evaluated_depsgraph_get()
    me = bpy.data.meshes.new_from_object(obj.evaluated_get(dg), depsgraph=dg)
    matrix = obj.matrix_world.copy()
    bpy.data.objects.remove(obj, do_unlink=True)
    bpy.data.curves.remove(cu)
    return me, matrix


def add_marking(bm, params: dict, coll) -> int:
    got = _marking_mesh(params, coll)
    if got is None:
        return 0
    me, matrix = got
    me.transform(matrix)
    tmp = bmesh.new()
    tmp.from_mesh(me)
    lookup = {}
    for v in tmp.verts:
        lookup[v.index] = bm.verts.new(v.co)
    faces = 0
    for f in tmp.faces:
        try:
            bm.faces.new(tuple(lookup[v.index] for v in f.verts))
            faces += 1
        except ValueError:
            pass          # дубль грани от совпавших петель — пропускаем
    tmp.free()
    bpy.data.meshes.remove(me)
    return faces


# ---------------------------------------------------------------------------
# чистка меша
# ---------------------------------------------------------------------------

def _clean(bm, params: dict) -> None:
    bmesh.ops.remove_doubles(bm, verts=bm.verts[:],
                             dist=P.mm_to_m(params["mesh"]["merge_distance_mm"]))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces[:])
    if _signed_volume(bm) < 0.0:
        bmesh.ops.reverse_faces(bm, faces=bm.faces[:])


def _signed_volume(bm) -> float:
    total = 0.0
    for face in bm.faces:
        verts = [v.co for v in face.verts]
        for i in range(1, len(verts) - 1):
            a, b, c = verts[0], verts[i], verts[i + 1]
            total += a.dot(b.cross(c)) / 6.0
    return total


def _shade_smooth(obj, params: dict) -> None:
    """Сглаживание с изломом по углу, без операторов.

    bpy.ops.object.shade_smooth_by_angle требует контекста 3D-вида и при
    вызове из MCP не проходит poll(). То же самое делается данными: все грани
    smooth, а рёбра с углом больше порога помечаются острыми — с 4.1 именно
    острые рёбра разрывают нормали.
    """
    limit = math.radians(params["mesh"]["shade_smooth_angle_deg"])
    bm = bmesh.new()
    bm.from_mesh(obj.data)
    bm.normal_update()
    for face in bm.faces:
        face.smooth = True
    for edge in bm.edges:
        edge.smooth = not (len(edge.link_faces) == 2
                           and edge.calc_face_angle(0.0) > limit)
    bm.to_mesh(obj.data)
    bm.free()
    obj.data.update()


# ---------------------------------------------------------------------------
# UV
# ---------------------------------------------------------------------------

_BOXES = {
    "wall": (0.00, 0.26, 1.00, 1.00),
    "rim": (0.00, 0.00, 0.62, 0.25),
    "body": (0.63, 0.00, 1.00, 0.25),
}

_ISLAND_OF_TAG = {
    "wall_out": "wall",
    "rim": "rim",
    "wall_in": "body",
    "bottom_in": "body",
    "bottom_out": "body",
}


def _tag_lookup(prof: P.Profile):
    """Функция «точка (z_мм, r_мм) -> индекс точки профиля»."""
    buckets: Dict[int, List[int]] = {}
    for i, (z, r) in enumerate(prof.points):
        buckets.setdefault(int(round(z * 10.0)), []).append(i)

    def find(z: float, r: float) -> int:
        key = int(round(z * 10.0))
        best_i, best_d = -1, float("inf")
        for k in (key - 1, key, key + 1):
            for i in buckets.get(k, ()):
                pz, pr = prof.points[i]
                d = (pz - z) ** 2 + (pr - r) ** 2
                if d < best_d:
                    best_i, best_d = i, d
        if best_i < 0:                      # рёбра и клеймо вне рядов профиля
            best_i = min(range(len(prof.points)),
                         key=lambda i: (prof.points[i][0] - z) ** 2
                         + (prof.points[i][1] - r) ** 2)
        return best_i

    return find


def island_classifier(params: dict, prof: P.Profile):
    """Вершина меша -> остров UV.

    Ближайшая точка профиля не годится сама по себе: рёбра и клеймо лежат вне
    профиля, и «ближайшей» для них иногда оказывается точка борта. Поэтому в
    остров стенки попадают только вершины, реально лежащие на наружном конусе.
    """
    find = _tag_lookup(prof)
    wall_top = params["uv"]["bands"]["full"][1]
    tol = params["mesh"]["merge_distance_mm"] * 20.0

    def classify(z: float, r: float) -> Tuple[str, int]:
        i = find(z, r)
        island = _ISLAND_OF_TAG[prof.tags[i]]
        if island == "wall" and (abs(r - P.cone_r_out(params, z)) > tol
                                 or not -1e-6 <= z <= wall_top + 1e-6):
            island = "body"
        return island, i

    return classify


def _arclen_by_index(prof: P.Profile) -> List[float]:
    out = [0.0]
    for a, b in zip(prof.points, prof.points[1:]):
        out.append(out[-1] + math.hypot(b[0] - a[0], b[1] - a[1]))
    return out


def print_band(params: dict) -> U.PrintBand:
    """Пояс запечатки шелкографии по параметрам конфига."""
    pr = params["print"]
    height = params["geometry"]["height_mm"]
    beta = P.cone_half_angle(params)
    z_lo = pr["bottom_margin_mm"]
    z_hi = height - pr["top_margin_mm"]
    r_lo = P.cone_r_out(params, z_lo)
    r_hi = P.cone_r_out(params, z_hi)
    sin_b = math.sin(beta)
    return U.PrintBand(z_lo=z_lo, z_hi=z_hi, r_lo=r_lo, r_hi=r_hi,
                       s_lo=r_lo / sin_b, s_hi=r_hi / sin_b,
                       gap_lo=pr["seam_gap_bottom_mm"], gap_hi=pr["seam_gap_top_mm"],
                       seam=math.radians(pr["seam_azimuth_deg"]))


def assign_uv(obj, params: dict, prof: P.Profile) -> dict:
    """Две аналитические развёртки. Никакого Smart UV Project.

    UVMap   — геометрическая: стенка кольцевым сектором (или прямоугольником),
              венчик и дно отдельными островами, всё внутри 0..1.
    UVPrint — печатное поле шелкографии: прямоугольный макет с полями сверху и
              снизу и зазором на стыке. За пределами поля u выходит за 0..1 —
              там текстура обрезается, и запечатки нет.
    """
    me = obj.data
    uv_layer = me.uv_layers.get("UVMap") or me.uv_layers.new(name="UVMap")
    print_name = params["print"]["uv_layer"]
    uv_print = me.uv_layers.get(print_name) or me.uv_layers.new(name=print_name)

    band_name = params["uv"]["band"]
    z_lo, z_hi, r_lo, r_hi = P.uv_band(params, band_name)
    band = U.ConeBand(r_lo=r_lo, r_hi=r_hi, h=z_hi - z_lo)
    mapping = U.mapping_for(params["uv"]["mode"], band, params["uv"]["seam_azimuth_deg"])
    seam = math.radians(params["uv"]["seam_azimuth_deg"])
    sin_beta = math.sin(band.beta)

    pband = print_band(params)
    pseam = pband.seam

    classify = island_classifier(params, prof)
    arclen = _arclen_by_index(prof)

    vert_island: List[str] = []
    vert_index: List[int] = []
    for v in me.vertices:
        island, i = classify(P.m_to_mm(v.co.z), P.m_to_mm(math.hypot(v.co.x, v.co.y)))
        vert_index.append(i)
        vert_island.append(island)

    span: Dict[str, Tuple[float, float]] = {}
    for i, tag in enumerate(prof.tags):
        isl = _ISLAND_OF_TAG[tag]
        if isl == "wall" and prof.points[i][0] > params["uv"]["bands"]["full"][1] + 1e-6:
            isl = "body"
        lo, hi = span.get(isl, (arclen[i], arclen[i]))
        span[isl] = (min(lo, arclen[i]), max(hi, arclen[i]))

    raw: Dict[str, List[Tuple[int, Tuple[float, float]]]] = {k: [] for k in _BOXES}
    outside_uv = (-0.5, -0.5)

    for poly in me.polygons:
        votes: Dict[str, int] = {}
        for vi in poly.vertices:
            isl = vert_island[vi]
            votes[isl] = votes.get(isl, 0) + 1
        island = max(sorted(votes), key=lambda k: votes[k])

        psis = []
        for li in poly.loop_indices:
            co = me.vertices[me.loops[li].vertex_index].co
            psis.append(U._wrap(math.atan2(co.y, co.x), seam))
        if max(psis) - min(psis) > math.pi:
            psis = [p + U.TAU if p < math.pi else p for p in psis]

        ppsis = []
        for li in poly.loop_indices:
            co = me.vertices[me.loops[li].vertex_index].co
            ppsis.append(U._wrap(math.atan2(co.y, co.x), pseam))
        if max(ppsis) - min(ppsis) > math.pi:
            ppsis = [p + U.TAU if p < math.pi else p for p in ppsis]

        for li, psi, ppsi in zip(poly.loop_indices, psis, ppsis):
            vi = me.loops[li].vertex_index
            co = me.vertices[vi].co
            z = P.m_to_mm(co.z)
            r = P.m_to_mm(math.hypot(co.x, co.y))
            if island == "wall":
                s = r / sin_beta
                raw[island].append((li, mapping.uv_psi(s, psi)))
                uv_print.data[li].uv = pband.uv_psi(r / sin_beta, ppsi)
            else:
                lo, hi = span[island]
                t = (arclen[vert_index[vi]] - lo) / (hi - lo) if hi > lo else 0.0
                raw[island].append((li, (psi / U.TAU, t)))
                uv_print.data[li].uv = outside_uv

    pad = params["uv"]["padding_px"] / float(params["uv"]["texture_size_px"])
    fits: Dict[str, U.Fit] = {}
    for island, entries in raw.items():
        if not entries:
            continue
        pts = [uv for _, uv in entries]
        fitted, fit = U.fit_islands([pts], box=_BOXES[island], padding=pad)
        fits[island] = fit
        for (li, _), uv in zip(entries, fitted[0]):
            uv_layer.data[li].uv = uv

    return {
        "band": band_name,
        "bands": {name: _band_report(params, name) for name in params["uv"]["bands"]},
        "mode": params["uv"]["mode"],
        "seam_azimuth_deg": params["uv"]["seam_azimuth_deg"],
        "fit": {k: {"scale": f.scale, "dx": f.dx, "dy": f.dy} for k, f in fits.items()},
        "boxes": _BOXES,
        "padding_uv": pad,
        "print": pband.report(),
        "print_uv_layer": print_name,
    }


def _band_report(params: dict, name: str) -> dict:
    z_lo, z_hi, r_lo, r_hi = P.uv_band(params, name)
    band = U.ConeBand(r_lo=r_lo, r_hi=r_hi, h=z_hi - z_lo)
    return {
        "z_range_mm": [z_lo, z_hi],
        "r_range_mm": [r_lo, r_hi],
        "alpha_deg": band.alpha_deg,
        "r_in_mm": band.r_in,
        "r_out_mm": band.r_out,
        "slant_mm": band.slant_len,
    }


# ---------------------------------------------------------------------------
# материал
# ---------------------------------------------------------------------------

def _set(socket_owner, name: str, value) -> bool:
    sock = socket_owner.inputs.get(name)
    if sock is None:
        return False
    sock.default_value = value
    return True


def make_material(params: dict):
    """Матовый полупрозрачный PP плюс глянцевая укрывистая краска.

    По референсам заказчика: неокрашенный PP — фрост, сквозь стенку видно руку,
    резкого блика нет; краска шелкографии наоборот глянцевая и непрозрачная.
    Поэтому шероховатость и пропускание не константы, а смешиваются по альфе
    макета: где есть краска — глянец и ноль пропускания.

    Стенка 0.5 мм, поэтому Thin Wall = 1: преломление считается как на тонкой
    оболочке, а не как в толстом стекле.
    """
    sh = params["shader"]
    ink = sh["ink"]
    mat = bpy.data.materials.get(sh["name"])
    if mat is None:
        mat = bpy.data.materials.new(sh["name"])
    mat.use_nodes = True
    nt = mat.node_tree
    nt.nodes.clear()

    out = nt.nodes.new("ShaderNodeOutputMaterial")
    out.location = (400, 0)
    bsdf = nt.nodes.new("ShaderNodeBsdfPrincipled")
    bsdf.location = (0, 0)
    nt.links.new(bsdf.outputs["BSDF"], out.inputs["Surface"])

    _set(bsdf, "Base Color", tuple(sh["base_color"]))
    _set(bsdf, "Roughness", sh["roughness"])
    _set(bsdf, "IOR", sh["ior"])
    _set(bsdf, "Metallic", sh["metallic"])
    if not _set(bsdf, "Transmission Weight", sh["transmission"]):
        _warn("в этой сборке нет входа 'Transmission Weight' — прозрачность не задана")
    if not _set(bsdf, "Thin Wall", bool(sh["thin_wall"])):
        _warn("в этой сборке нет входа 'Thin Wall' — тонкая стенка не задана")
    _set(bsdf, "Subsurface Weight", sh["subsurface_weight"])
    _set(bsdf, "Subsurface Radius",
         tuple(P.mm_to_m(x) for x in sh["subsurface_radius_mm"]))

    for attr, value in (("use_backface_culling", False),
                        ("use_transparent_shadow", True),
                        ("use_raytrace_refraction", True),
                        ("use_screen_refraction", True)):
        if hasattr(mat, attr):
            setattr(mat, attr, value)

    maps = sh.get("maps") or {}
    uv_of = {"design": params["print"]["uv_layer"]}
    slots = (("design", "Base Color", "sRGB"),
             ("roughness", "Roughness", "Non-Color"),
             ("normal", None, "Non-Color"))
    y = 300
    for key, socket, colorspace in slots:
        path = maps.get(key)
        if not path:
            continue
        abspath = bpy.path.abspath(path)
        if not os.path.isfile(abspath):
            _warn(f"текстура {key}: файл не найден, слот не подключён — {path}")
            continue
        img = bpy.data.images.load(abspath, check_existing=True)
        tex = nt.nodes.new("ShaderNodeTexImage")
        tex.image = img
        tex.extension = "CLIP"
        tex.location = (-560, y)
        try:
            img.colorspace_settings.name = colorspace
        except TypeError:
            pass
        uvnode = nt.nodes.new("ShaderNodeUVMap")
        uvnode.uv_map = uv_of.get(key, "UVMap")
        uvnode.location = (-780, y)
        nt.links.new(uvnode.outputs["UV"], tex.inputs["Vector"])

        if key == "normal":
            nm = nt.nodes.new("ShaderNodeNormalMap")
            nm.location = (-250, y)
            nt.links.new(tex.outputs["Color"], nm.inputs["Color"])
            nt.links.new(nm.outputs["Normal"], bsdf.inputs["Normal"])
        elif key == "design":
            # альфа макета = маска краски: вне её остаётся матовый прозрачный PP
            mask = tex.outputs["Alpha"]
            colour = nt.nodes.new("ShaderNodeMix")
            colour.data_type = "RGBA"
            colour.blend_type = "MIX"
            colour.location = (-260, y)
            colour.inputs["A"].default_value = tuple(sh["base_color"])
            nt.links.new(mask, colour.inputs["Factor"])
            nt.links.new(tex.outputs["Color"], colour.inputs["B"])
            nt.links.new(colour.outputs["Result"], bsdf.inputs["Base Color"])

            for name, socket_name, sub, ink_value in (
                    ("Roughness", "Roughness", sh["roughness"], ink["roughness"]),
                    ("Transmission", "Transmission Weight", sh["transmission"],
                     ink["transmission"])):
                if socket_name not in bsdf.inputs:
                    continue
                mix = nt.nodes.new("ShaderNodeMix")
                mix.data_type = "FLOAT"
                mix.label = name
                mix.location = (-260, y - 200 - 160 * (name == "Transmission"))
                mix.inputs["A"].default_value = sub
                mix.inputs["B"].default_value = ink_value
                nt.links.new(mask, mix.inputs["Factor"])
                nt.links.new(mix.outputs["Result"], bsdf.inputs[socket_name])
        else:
            nt.links.new(tex.outputs["Color"], bsdf.inputs[socket])
        y -= 340
    return mat


# ---------------------------------------------------------------------------
# сборка
# ---------------------------------------------------------------------------

def build(params: dict) -> dict:
    """Собрать объект. При любой ошибке коллекция CUP500 очищается."""
    WARNINGS.clear()
    apply_units(bpy.context.scene, params)
    coll = ensure_collection(params)
    purge(params)

    try:
        prof = P.build_profile(params)
        src = _profile_object(params, prof, coll)
        baked = _revolve(src, params)
        src_data = src.data
        bpy.data.objects.remove(src, do_unlink=True)
        bpy.data.meshes.remove(src_data)

        bm = bmesh.new()
        bm.from_mesh(baked)
        ribs = add_ribs(bm, params)
        marks = add_marking(bm, params, coll) if params["marking"]["enabled"] else 0
        _clean(bm, params)
        bm.to_mesh(baked)
        bm.free()
        baked.update()

        obj = bpy.data.objects.new(params["mesh"]["object_name"], baked)
        baked.name = params["mesh"]["object_name"]
        coll.objects.link(obj)

        uv_info = assign_uv(obj, params, prof)
        _shade_smooth(obj, params)

        obj.data.materials.clear()
        obj.data.materials.append(make_material(params))
        obj.location = (0.0, 0.0, 0.0)
        return {"object": obj.name, "uv": uv_info, "ribs": ribs,
                "marking_faces": marks, "warnings": list(WARNINGS)}
    except Exception:
        purge(params)
        raise
