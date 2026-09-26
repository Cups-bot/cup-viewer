"""Замеры построенного меша -> out/verify.json.

Объём считается по треугольникам через сумму знаковых объёмов тетраэдров,
не-манифольдность — через bmesh (edge.is_manifold), вывернутые грани — через
согласованность обхода общих рёбер. Никаких «свойств меша», которых в API нет.
"""

import json
import math
import os
import statistics
from typing import Dict, List, Optional, Tuple

import bmesh
import bpy

from src import profile as P
from src import unwrap as U


# ---------------------------------------------------------------------------
# низкоуровневые замеры по мешу
# ---------------------------------------------------------------------------

def _bmesh_of(obj):
    bm = bmesh.new()
    bm.from_mesh(obj.data)
    bm.normal_update()
    return bm


def _signed_volume_m3(bm) -> float:
    """Сумма знаковых объёмов тетраэдров по треугольникам граней, м^3."""
    work = bm.copy()
    bmesh.ops.triangulate(work, faces=work.faces[:])
    total = 0.0
    for face in work.faces:
        a, b, c = (v.co for v in face.verts)
        total += a.dot(b.cross(c)) / 6.0
    work.free()
    return total


def _flipped_faces(bm) -> int:
    """Грани, чей обход совпадает с обходом соседа по общему ребру."""
    directed: Dict[Tuple[int, int], List[int]] = {}
    for face in bm.faces:
        verts = [v.index for v in face.verts]
        for a, b in zip(verts, verts[1:] + verts[:1]):
            directed.setdefault((a, b), []).append(face.index)
    bad = set()
    for (a, b), faces in directed.items():
        if len(faces) > 1:
            bad.update(faces)
    return len(bad)


def _face_counts(bm) -> Dict[str, int]:
    tri = quad = ngon = 0
    for face in bm.faces:
        n = len(face.verts)
        if n == 3:
            tri += 1
        elif n == 4:
            quad += 1
        else:
            ngon += 1
    return {"tri": tri, "quad": quad, "ngon": ngon, "total": len(bm.faces)}


def _count_ribs(bm, params: dict) -> int:
    """Сколько рёбер реально есть в меше: вершины внутри стенки, сгруппированные
    по азимуту. Считается по геометрии, а не по конфигу."""
    g = params["geometry"]
    z0 = P.mm_to_m(g["bottom"]["floor_z_mm"] + 0.5)
    z1 = P.mm_to_m(g["ribs"]["top_z_mm"] - 0.5)
    angles = []
    for v in bm.verts:
        if not (z0 < v.co.z < z1):
            continue
        z_mm = P.m_to_mm(v.co.z)
        r_mm = P.m_to_mm(math.hypot(v.co.x, v.co.y))
        r_in = P.cone_r_in(params, z_mm)
        r_rib = P.cone_r_out(params, z_mm) - g["ribs"]["offset_from_outer_mm"] /             math.cos(P.cone_half_angle(params))
        if r_rib - 0.5 < r_mm < r_in - 0.2:
            angles.append(math.degrees(math.atan2(v.co.y, v.co.x)) % 360.0)
    if not angles:
        return 0
    angles.sort()
    groups = 1
    for a, b in zip(angles, angles[1:]):
        if b - a > 10.0:
            groups += 1
    if (angles[0] + 360.0) - angles[-1] <= 10.0 and groups > 1:
        groups -= 1
    return groups


def _max_radius_at(bm, z_m: float, tol_m: float) -> Optional[float]:
    rs = [math.hypot(v.co.x, v.co.y) for v in bm.verts if abs(v.co.z - z_m) <= tol_m]
    return max(rs) if rs else None


def _cone_half_angle_from_mesh(bm, params: dict) -> Optional[float]:
    """Полуугол наружного конуса по нормалям граней прямого борта.

    У наружной поверхности конуса, раскрытого вверх, нормаль наклонена вниз
    ровно на beta: n_z = -sin(beta). Берём грани внутри печатного пояса,
    смотрящие наружу по радиусу, и считаем медиану — она не зависит от того,
    на сколько рядов разбит борт.
    """
    z_lo, z_hi = params["uv"]["bands"]["visible"]
    lo, hi = P.mm_to_m(z_lo), P.mm_to_m(z_hi)
    nz = []
    for face in bm.faces:
        c = face.calc_center_median()
        if not (lo < c.z < hi):
            continue
        rad = math.hypot(c.x, c.y)
        if rad < 1e-9:
            continue
        radial = (face.normal.x * c.x + face.normal.y * c.y) / rad
        if radial > 0.5:
            nz.append(face.normal.z)
    if len(nz) < 8:
        return None
    return math.degrees(math.asin(max(-1.0, min(1.0, -statistics.median(nz)))))


# ---------------------------------------------------------------------------
# UV
# ---------------------------------------------------------------------------

def _uv_stats(obj, params: dict, prof: P.Profile) -> dict:
    me = obj.data
    layer = me.uv_layers.get("UVMap")
    if layer is None:
        return {"error": "нет UV-слоя UVMap"}

    from src import build as B          # раскладка островов живёт в build.py

    classify = B.island_classifier(params, prof)
    island_of: List[str] = [
        classify(P.m_to_mm(v.co.z), P.m_to_mm(math.hypot(v.co.x, v.co.y)))[0]
        for v in me.vertices]

    bounds: Dict[str, List[float]] = {}
    ratios: List[float] = []
    outside = 0

    for poly in me.polygons:
        votes: Dict[str, int] = {}
        for vi in poly.vertices:
            votes[island_of[vi]] = votes.get(island_of[vi], 0) + 1
        island = max(sorted(votes), key=lambda k: votes[k])

        loops = list(poly.loop_indices)
        uvs = [tuple(layer.data[li].uv) for li in loops]
        cos = [me.vertices[me.loops[li].vertex_index].co for li in loops]

        b = bounds.setdefault(island, [1e9, 1e9, -1e9, -1e9])
        for u, v in uvs:
            b[0] = min(b[0], u)
            b[1] = min(b[1], v)
            b[2] = max(b[2], u)
            b[3] = max(b[3], v)
            if not (-1e-6 <= u <= 1.0 + 1e-6 and -1e-6 <= v <= 1.0 + 1e-6):
                outside += 1

        # растяжение меряем только по граням, целиком лежащим на прямом борте:
        # на переходных гранях у скруглений точка уже не на конусе, и метрика
        # там ничего не сказала бы о печатном поле
        if island != "wall" or any(island_of[vi] != "wall" for vi in poly.vertices):
            continue
        for i in range(len(loops)):
            j = (i + 1) % len(loops)
            d3 = (cos[j] - cos[i]).length
            duv = math.hypot(uvs[j][0] - uvs[i][0], uvs[j][1] - uvs[i][1])
            if d3 > 1e-9 and duv > 1e-12:
                ratios.append(duv / d3)

    stretch = max(ratios) / min(ratios) if ratios else float("nan")

    names = sorted(bounds)
    gaps = []
    for i in range(len(names)):
        for j in range(i + 1, len(names)):
            a, b2 = bounds[names[i]], bounds[names[j]]
            dx = max(a[0] - b2[2], b2[0] - a[2])
            dy = max(a[1] - b2[3], b2[1] - a[3])
            gaps.append(max(dx, dy))
    tex = params["uv"]["texture_size_px"]

    return {
        "max_stretch": stretch,
        "uv_outside_0_1": outside,
        "island_bounds": {k: [round(x, 6) for x in v] for k, v in bounds.items()},
        "islands_disjoint": all(g > 0.0 for g in gaps) if gaps else True,
        "min_island_gap_px": (min(gaps) * tex) if gaps else None,
        # ratios считаны по 3D-длинам в метрах, поэтому /1000 -> px на мм
        "texel_density_px_per_mm": (statistics.median(ratios) * tex / 1000.0
                                    if ratios else None),
    }


# ---------------------------------------------------------------------------
# отчёт
# ---------------------------------------------------------------------------

def _checked(values: dict, tolerances: dict) -> dict:
    out = {}
    for key, value in values.items():
        entry = {"value": value}
        if key in tolerances:
            expected, tol = tolerances[key]
            entry["expected"] = expected
            entry["tolerance"] = tol
            entry["pass"] = (value is not None
                             and isinstance(value, (int, float))
                             and abs(value - expected) <= tol + 1e-9)
        out[key] = entry
    return out


def run(params: dict, out_dir: str, uv_info: Optional[dict] = None) -> dict:
    obj = bpy.data.objects.get(params["mesh"]["object_name"])
    if obj is None:
        raise RuntimeError(f"объект {params['mesh']['object_name']} не найден — сначала build")

    # --no-build must not erase the baked sector metadata used by bkshots.
    # The mesh is only measured here: UVs are never reassigned by verification.
    if uv_info is None:
        prior_path = os.path.join(out_dir, "verify.json")
        if os.path.isfile(prior_path):
            with open(prior_path, encoding="utf-8") as fh:
                prior = json.load(fh)
            uv_info = {key: (prior.get("uv_" + key) or {}).get("value")
                       for key in ("bands", "fit")}

    prof = P.build_profile(params)
    bm = _bmesh_of(obj)
    try:
        counts = _face_counts(bm)
        vol_m3 = _signed_volume_m3(bm)
        vol_cm3 = abs(vol_m3) * 1e6
        zs = [v.co.z for v in bm.verts]
        rs = [math.hypot(v.co.x, v.co.y) for v in bm.verts]
        height_mm = P.m_to_mm(max(zs) - min(zs))
        d_top_mm = P.m_to_mm(max(rs)) * 2.0
        d_bottom = _max_radius_at(bm, min(zs), P.mm_to_m(1e-4))
        d_bottom_mm = P.m_to_mm(d_bottom) * 2.0 if d_bottom else None
        half_angle = _cone_half_angle_from_mesh(bm, params)
        non_manifold = sum(1 for e in bm.edges if not e.is_manifold)
        flipped = _flipped_faces(bm)
        normals_outward = vol_m3 > 0.0
        rib_count = _count_ribs(bm, params)
    finally:
        bm.free()

    uv = _uv_stats(obj, params, prof)
    band_name = params["uv"]["band"]
    z_lo, z_hi, r_lo, r_hi = P.uv_band(params, band_name)
    band = U.ConeBand(r_lo=r_lo, r_hi=r_hi, h=z_hi - z_lo)

    wall_min, wall_max = P.wall_thickness_range(prof)
    from src import build as B
    pband = B.print_band(params)
    brim_ml = P.brim_volume(params, prof) / 1000.0
    # Номинальный объём — свойство изделия, а не константа кода: у 410 и 650
    # он другой. Ключа может не быть в старых конфигах, тогда 500 мл.
    nominal_ml = float(params.get("verify", {}).get("nominal_volume_ml", 500.0))
    fill_z = P.fill_level_for_volume(params, prof, nominal_ml * 1000.0)
    g = params["geometry"]

    values = {
        "height_mm": height_mm,
        "d_top_mm": d_top_mm,
        "d_bottom_mm": d_bottom_mm,
        "cone_half_angle_deg": half_angle,
        "volume_to_brim_ml": brim_ml,
        "volume_nominal_ml": nominal_ml,
        "material_volume_cm3": vol_cm3,
        "mass_g": vol_cm3 * params["material"]["density_g_cm3"],
        "wall_min_mm": wall_min,
        "wall_max_mm": wall_max,
        "rib_count": rib_count,
        "rib_offset_mm": g["ribs"]["offset_from_outer_mm"],
        "rib_section_area_mm2": P.polygon_area(P.rib_section(params)),
        "rib_volume_mm3": P.rib_volume(params),
        "marking_area_mm2": P.marking_area(params),
        "marking_volume_mm3": P.marking_volume(params),
        "marking_relief_mm": params["marking"]["relief_mm"],
        "bottom_thickness_mm": g["bottom"]["floor_z_mm"] - g["foot"]["recess_z_mm"],
        "step_thickness_mm": g["bottom"]["step_z_in_mm"] - g["bottom"]["step_z_out_mm"],
        "rim_slab_mm": g["rim"]["slab_t_mm"],
        "rim_lip_mm": g["rim"]["lip_t_mm"],
        "nesting_pitch_mm": g["ribs"]["top_z_mm"],
        "uv_sector_angle_deg": band.alpha_deg,
        "uv_r_in_mm": band.r_in,
        "uv_r_out_mm": band.r_out,
        "uv_max_stretch": uv.get("max_stretch"),
        "uv_outside_0_1": uv.get("uv_outside_0_1"),
        "poly_count": counts["total"],
        "quad_count": counts["quad"],
        "tri_count": counts["tri"],
        "ngon_count": counts["ngon"],
        "vert_count": len(obj.data.vertices),
        "non_manifold_edges": non_manifold,
        "flipped_faces": flipped,
    }

    report = _checked(values, params["verify"]["tolerances"])
    report["fill_level_nominal_mm"] = {"value": fill_z}
    report["headspace_at_nominal_mm"] = {"value": g["height_mm"] - fill_z}
    if abs(nominal_ml - 500.0) < 1e-9:
        # прежние имена сохраняются, чтобы отчёт 500-го остался совместимым
        report["fill_level_500ml_mm"] = {"value": fill_z}
        report["headspace_at_500ml_mm"] = {"value": g["height_mm"] - fill_z}
    report["normals_outward"] = {"value": normals_outward, "expected": True,
                                 "tolerance": 0, "pass": bool(normals_outward)}
    report["uv_islands_disjoint"] = {"value": uv.get("islands_disjoint"),
                                     "expected": True, "tolerance": 0,
                                     "pass": bool(uv.get("islands_disjoint"))}
    report["uv_min_island_gap_px"] = {"value": uv.get("min_island_gap_px"),
                                      "expected": ">= 4 (ТЗ п.4.3.9)",
                                      "tolerance": None,
                                      "pass": (uv.get("min_island_gap_px") or 0.0) >= 4.0}
    report["uv_texel_density_px_per_mm"] = {"value": uv.get("texel_density_px_per_mm")}
    report["uv_island_bounds"] = {"value": uv.get("island_bounds")}
    report["uv_bands"] = {"value": (uv_info or {}).get("bands")}
    report["print_band"] = {"value": pband.report()}
    report["uv_fit"] = {"value": (uv_info or {}).get("fit")}

    checks = [v["pass"] for v in report.values() if isinstance(v, dict) and "pass" in v]
    out = {"pass": all(checks), "failed": [k for k, v in report.items()
                                           if isinstance(v, dict) and v.get("pass") is False]}
    out.update(report)
    out["_notes"] = _notes(params, values)

    os.makedirs(out_dir, exist_ok=True)
    path = os.path.join(out_dir, "verify.json")
    with open(path, "w", encoding="utf-8") as fh:
        json.dump(out, fh, ensure_ascii=False, indent=2)
    return out


def _notes(params: dict, values: dict) -> List[str]:
    notes = []
    stated = params["drawing"]["part_weight_g_stated"]
    rho = params["material"]["density_g_cm3"]
    notes.append(
        "масса %.3f г при плотности %.3f г/см3; надпись листа Part weight %.2f г, "
        "расхождение %+.3f г." % (values["mass_g"], rho, stated,
                                  values["mass_g"] - stated))
    notes.append(
        "SECTION C-C режет два из четырёх рёбер расстыковки: сплошного уступа-кольца "
        "нет. Рёбра: %d шт, %.2f мм у пола и %.2f мм у полки."
        % (values["rib_count"], params["geometry"]["ribs"]["width_base_mm"],
           params["geometry"]["ribs"]["width_top_mm"]))
    notes.append(
        "Размеры вложенных стаканов на SECTION C-C не являются высотой одного изделия. "
        "Высота одного стакана %.4f мм; шаг вложения %.3f мм; толщина стенки "
        "в середине высоты %.3f мм."
        % (params['geometry']['height_mm'],params['geometry']['ribs']['top_z_mm'],
           P.wall_thickness_at(params,params['geometry']['height_mm']/2)))
    notes.append(
        "клеймо дна построено выпуклым рельефом %.2f мм по векторам нижнего вида: "
        "площадь знаков %.1f мм2, объём %.1f мм3."
        % (params["marking"]["relief_mm"], values["marking_area_mm2"],
           values["marking_volume_mm3"]))
    notes.append(
        "печатное поле шелкографии живёт в отдельном UV-слое %s; UVMap остаётся "
        "геометрической развёрткой и целиком лежит в 0..1."
        % params["print"]["uv_layer"])
    notes.append(
        "Не смоделированы: следы толкателей и допуски формы; расположение сверять по чертежу своего объёма.")
    return notes
