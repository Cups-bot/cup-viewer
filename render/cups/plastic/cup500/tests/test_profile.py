"""Тесты 2D-профиля сечения C-C. Чистый Python, без bpy.

Числа-эталоны взяты с чертежа 252214 (проставленные размеры и величины,
снятые с векторной геометрии PDF), а не из реализации.
"""

import math
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import pytest

from src import profile

PARAMS = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
                      "params", "cup_500ml.json")


@pytest.fixture(scope="module")
def params():
    return profile.load_params(PARAMS)


@pytest.fixture(scope="module")
def prof(params):
    return profile.build_profile(params)


# --------------------------------------------------------------------------
# структура контура
# --------------------------------------------------------------------------

def test_contour_starts_and_ends_on_axis(prof):
    """Замкнутый контур половины сечения: оба конца лежат на оси вращения,
    поэтому замыкающий отрезок проходит по оси и объёма не добавляет."""
    assert prof.points[0][1] == pytest.approx(0.0, abs=1e-9)
    assert prof.points[-1][1] == pytest.approx(0.0, abs=1e-9)
    assert prof.points[0][0] != pytest.approx(prof.points[-1][0], abs=1e-6)


def test_contour_has_no_duplicate_points(prof):
    for i in range(len(prof.points) - 1):
        a, b = prof.points[i], prof.points[i + 1]
        assert math.hypot(b[0] - a[0], b[1] - a[1]) > 1e-9, f"дубль в точке {i}"


def test_contour_is_simple(prof):
    """Контур не самопересекается."""
    pts = prof.points
    n = len(pts)

    def cross(o, a, b):
        return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])

    def seg_hit(p1, p2, p3, p4):
        d1 = cross(p3, p4, p1)
        d2 = cross(p3, p4, p2)
        d3 = cross(p1, p2, p3)
        d4 = cross(p1, p2, p4)
        return ((d1 > 0) != (d2 > 0)) and ((d3 > 0) != (d4 > 0))

    for i in range(n - 1):
        for j in range(i + 2, n - 1):
            assert not seg_hit(pts[i], pts[i + 1], pts[j], pts[j + 1]), \
                f"самопересечение отрезков {i} и {j}"


def test_all_radii_non_negative(prof):
    assert min(r for _, r in prof.points) >= -1e-9


def test_section_area_positive(prof):
    assert profile.polygon_area(prof.points) > 0.0


def test_tags_cover_every_point(prof):
    assert len(prof.tags) == len(prof.points)
    assert set(prof.tags) <= {
        "bottom_out", "wall_out", "rim", "wall_in", "bottom_in"}
    for tag in ("bottom_out", "wall_out", "rim", "wall_in", "bottom_in"):
        assert tag in prof.tags, f"нет ни одной точки с тегом {tag}"


# --------------------------------------------------------------------------
# монотонность наружного обвода
# --------------------------------------------------------------------------

def test_outer_wall_is_monotonic(prof):
    """Прямой наружный борт строго растёт и по высоте, и по радиусу."""
    wall = [p for p, t in zip(prof.points, prof.tags) if t == "wall_out"]
    assert len(wall) >= 2
    for a, b in zip(wall, wall[1:]):
        assert b[0] > a[0], f"z не растёт: {a} -> {b}"
        assert b[1] > a[1], f"r не растёт: {a} -> {b}"


def test_inner_wall_is_monotonic(prof):
    wall = [p for p, t in zip(prof.points, prof.tags) if t == "wall_in"]
    assert len(wall) >= 2
    for a, b in zip(wall, wall[1:]):
        assert b[0] < a[0], f"внутренний обвод идёт сверху вниз: {a} -> {b}"
        assert b[1] < a[1]


# --------------------------------------------------------------------------
# толщина стенки
# --------------------------------------------------------------------------

def test_wall_thickness_matches_config(params):
    lo = min(t for _, t in params["geometry"]["wall"]["thickness"])
    hi = max(t for _, t in params["geometry"]["wall"]["thickness"])
    for i in range(41):
        z = params["geometry"]["height_mm"] * i / 40.0
        t = profile.wall_thickness_at(params, z)
        assert lo - 1e-9 <= t <= hi + 1e-9


def test_wall_thickness_is_interpolated_linearly():
    p = {"geometry": {"height_mm": 10.0,
                      "wall": {"thickness": [[0.0, 1.0], [10.0, 3.0]]}}}
    assert profile.wall_thickness_at(p, 0.0) == pytest.approx(1.0)
    assert profile.wall_thickness_at(p, 5.0) == pytest.approx(2.0)
    assert profile.wall_thickness_at(p, 10.0) == pytest.approx(3.0)


def test_measured_wall_thickness_is_0_50(prof):
    """Чертёж, DETAIL E: стенка борта 0.50 мм, допуск прим.2 +-0.03."""
    tmin, tmax = profile.wall_thickness_range(prof)
    assert tmin == pytest.approx(0.50, abs=0.03)
    assert tmax == pytest.approx(0.50, abs=0.03)


def test_wall_is_continuous_at_rib_height(prof, params):
    """Вне рёбер стенка на высоте ребра обычная, 0.50 мм.

    Сплошного уступа-кольца нет: в виде сверху радиусы 26.26/26.95/27.65/28.52
    есть только на четырёх азимутах, а сплошные окружности — 27.765 и 28.064.
    """
    z = 4.0
    radii = profile.contour_radii_at(prof, z)
    assert len(radii) == 4          # ось, поясок литника, внутренний и наружный конус
    beta = profile.cone_half_angle(params)
    assert (radii[-1] - radii[-2]) * math.cos(beta) == pytest.approx(0.50, abs=0.01)


def test_rib_offset_is_2_00(params):
    """Поверхность ребра смещена на 2.00 мм по нормали от наружного конуса."""
    rb = params["geometry"]["ribs"]
    assert rb["offset_from_outer_mm"] == pytest.approx(2.00, abs=1e-9)
    z = 4.0
    beta = profile.cone_half_angle(params)
    r_rib = profile.cone_r_out(params, z) - rb["offset_from_outer_mm"] / math.cos(beta)
    # то, что читается в SECTION C-C через ребро
    assert r_rib == pytest.approx(26.728, abs=0.01)


def test_rib_widths_from_drawing(params):
    """Вид сверху: 0.64-4X у пола и 0.46-4X у полки, четыре штуки."""
    rb = params["geometry"]["ribs"]
    assert rb["count"] == 4
    assert rb["width_base_mm"] == pytest.approx(0.64, abs=0.01)
    assert rb["width_top_mm"] == pytest.approx(0.46, abs=0.01)
    z0 = params["geometry"]["bottom"]["floor_z_mm"]
    z1 = rb["top_z_mm"]
    assert profile.rib_width_at(params, z0) == pytest.approx(rb["width_base_mm"])
    assert profile.rib_width_at(params, z1) == pytest.approx(rb["width_top_mm"])
    mid = profile.rib_width_at(params, (z0 + z1) / 2.0)
    assert rb["width_top_mm"] < mid < rb["width_base_mm"]


def test_rib_section_is_simple_and_triangulates_exactly(params):
    sec = profile.rib_section(params)
    assert len(sec) >= 8
    area = profile.polygon_area(sec)
    assert area == pytest.approx(7.30, abs=0.05)
    tris = profile.triangulate_polygon(sec)
    total = 0.0
    for i, j, k in tris:
        a, b, c = sec[i], sec[j], sec[k]
        total += abs((b[0] - a[0]) * (c[1] - a[1])
                     - (b[1] - a[1]) * (c[0] - a[0])) / 2.0
    assert total == pytest.approx(area, rel=1e-9)


def test_general_floor_fillet_matches_top_view(params):
    """Сплошные окружности вида сверху 27.765 и 28.064 — касательные R0.30."""
    z_floor = params["geometry"]["bottom"]["floor_z_mm"]
    R = params["geometry"]["fillets"]["floor_outer"]
    beta = profile.cone_half_angle(params)
    r_corner = profile.cone_r_in(params, z_floor)
    t = R * math.tan((math.pi / 2 - beta) / 2.0)
    assert r_corner - t == pytest.approx(27.765, abs=0.02)
    assert r_corner + t * math.sin(beta) == pytest.approx(28.064, abs=0.02)


# --------------------------------------------------------------------------
# сверка с проставленными размерами чертежа
# --------------------------------------------------------------------------

def test_height_135_30(prof):
    assert max(z for z, _ in prof.points) == pytest.approx(135.30, abs=1e-6)


def test_outer_diameter_at_bottom_is_56_68(prof):
    at_zero = [r for z, r in prof.points if abs(z) < 1e-9]
    assert max(at_zero) * 2.0 == pytest.approx(56.68, abs=1e-6)


def test_max_outer_diameter_is_89_00(prof, params):
    zmax = params["geometry"]["height_mm"] - \
        params["geometry"]["rim"]["d_max_below_top_mm"]
    assert max(r for _, r in prof.points) * 2.0 == pytest.approx(89.00, abs=1e-6)
    on_plane = [r for z, r in prof.points if abs(z - zmax) < 1e-6]
    assert max(on_plane) * 2.0 == pytest.approx(89.00, abs=1e-6)


def test_cone_half_angle_is_5_685(params):
    assert math.degrees(profile.cone_half_angle(params)) == pytest.approx(
        11.37 / 2.0, abs=1e-9)


def test_rim_inner_corner_is_82_61(prof, params):
    """SECTION C-C, D82.61 — острый угол внутреннего обвода в плоскости кромки."""
    c = profile.corner_at(prof, "rim_top_inner")
    assert c[0] == pytest.approx(135.30, abs=1e-6)
    assert c[1] * 2.0 == pytest.approx(82.61, abs=0.02)


def test_rim_outer_corner_is_88_78(prof):
    """SECTION C-C, D88.78 — острый угол наружного обвода в плоскости кромки."""
    c = profile.corner_at(prof, "rim_top_outer")
    assert c[0] == pytest.approx(135.30, abs=1e-6)
    assert c[1] * 2.0 == pytest.approx(88.78, abs=0.02)


def test_foot_ring_is_55_30(prof):
    """SECTION C-C, D55.30 в плоскости поднутрения 1.500."""
    c = profile.corner_at(prof, "foot_top")
    assert c[0] == pytest.approx(1.500, abs=1e-6)
    assert c[1] * 2.0 == pytest.approx(55.30, abs=1e-6)


def test_gate_land_is_5_00(prof):
    """DETAIL D, D5.00 — след литника."""
    c = profile.corner_at(prof, "gate_land_inner")
    assert c[1] * 2.0 == pytest.approx(5.00, abs=1e-6)


def test_rim_slab_and_lip(params):
    assert params["geometry"]["rim"]["slab_t_mm"] == pytest.approx(0.62)
    assert params["geometry"]["rim"]["lip_t_mm"] == pytest.approx(0.45)


def test_gate_dome_height_is_0_60(prof, params):
    """DETAIL D: купол R5.5 поднимается на 0.60 над пояском D5.00."""
    land_z = params["geometry"]["bottom"]["gate_land_z_mm"]
    apex_z = max(z for z, r in prof.points if r < 1e-6)
    assert apex_z - land_z == pytest.approx(0.60, abs=0.01)


def test_rib_top_and_floor(params):
    """SECTION C-C: полка ребра 6.90, пол 2.00, между ними 4.90."""
    g = params["geometry"]
    assert g["ribs"]["top_z_mm"] == pytest.approx(6.90)
    assert g["bottom"]["floor_z_mm"] == pytest.approx(2.00)
    assert g["ribs"]["top_z_mm"] - g["bottom"]["floor_z_mm"] == pytest.approx(4.90, abs=1e-9)


def test_bottom_thickness_is_0_50_and_0_70(params):
    """SECTION C-C: кольцевое дно 0.50, средняя ступень 0.70."""
    g = params["geometry"]
    assert g["bottom"]["floor_z_mm"] - g["foot"]["recess_z_mm"] == \
        pytest.approx(0.50, abs=1e-9)
    assert g["bottom"]["step_z_in_mm"] - g["bottom"]["step_z_out_mm"] == \
        pytest.approx(0.70, abs=1e-9)


# --------------------------------------------------------------------------
# объёмы
# --------------------------------------------------------------------------

def test_material_volume(params, prof):
    """Объём детали: тело вращения 16.88 см3 плюс рёбра и рельеф клейма."""
    body = profile.revolve_volume(prof.points) / 1000.0
    assert body == pytest.approx(16.88, abs=0.05)
    total = profile.total_material_volume(params, prof) / 1000.0
    assert total == pytest.approx(16.91, abs=0.06)


def test_mass_matches_drawing(params, prof):
    """Part weight: 15.38 g при PP 0.905 г/см3 — допуск готовности +-0.30 г."""
    assert profile.total_mass_g(params, prof) == pytest.approx(15.38, abs=0.30)


def test_brim_volume(params, prof):
    """Внутренний объём до плоскости кромки: 507.4 мл."""
    v = profile.brim_volume(params, prof) / 1000.0
    assert v == pytest.approx(508.7, abs=1.0)


def test_nominal_500ml_is_below_brim(params, prof):
    z = profile.fill_level_for_volume(params, prof, 500_000.0)
    assert 0.0 < params["geometry"]["height_mm"] - z < 5.0


# --------------------------------------------------------------------------
# валидация конфига
# --------------------------------------------------------------------------

def test_negative_thickness_is_rejected(params):
    bad = profile.deep_copy(params)
    bad["geometry"]["wall"]["thickness"][1][1] = -0.1
    with pytest.raises(profile.ConfigError) as e:
        profile.validate(bad, "params/cup_500ml.json")
    assert "wall.thickness[1]" in str(e.value)
    assert "must be > 0" in str(e.value)


def test_r_top_not_greater_than_r_bottom_is_rejected(params):
    bad = profile.deep_copy(params)
    bad["geometry"]["cone"]["included_angle_deg"] = 0.0
    with pytest.raises(profile.ConfigError) as e:
        profile.validate(bad, "params/cup_500ml.json")
    assert "r_top" in str(e.value)


def test_missing_key_is_rejected(params):
    bad = profile.deep_copy(params)
    del bad["geometry"]["rim"]["slab_t_mm"]
    with pytest.raises(profile.ConfigError) as e:
        profile.validate(bad, "params/cup_500ml.json")
    assert "slab_t_mm" in str(e.value)


def test_missing_src_annotation_is_rejected(params):
    bad = profile.deep_copy(params)
    del bad["geometry"]["rim"]["_src"]["lip_t_mm"]
    with pytest.raises(profile.ConfigError) as e:
        profile.validate(bad, "params/cup_500ml.json")
    assert "_src" in str(e.value)


def test_thickness_table_must_span_height(params):
    bad = profile.deep_copy(params)
    bad["geometry"]["wall"]["thickness"][-1][0] = 100.0
    with pytest.raises(profile.ConfigError) as e:
        profile.validate(bad, "params/cup_500ml.json")
    assert "height" in str(e.value)


def test_fillet_that_does_not_fit_is_rejected(params):
    bad = profile.deep_copy(params)
    bad["geometry"]["fillets"]["rim_slab_to_lip"] = 5.0
    with pytest.raises(profile.ConfigError) as e:
        profile.validate(bad, "params/cup_500ml.json")
    assert "rim_slab_to_lip" in str(e.value)


def test_mm_to_m():
    assert profile.mm_to_m(135.30) == pytest.approx(0.13530, abs=1e-15)
    assert profile.mm_to_m(1.0) == pytest.approx(0.001, abs=1e-15)


# --------------------------------------------------------------------------
# клеймо дна и печатное поле
# --------------------------------------------------------------------------

def test_marking_loops_are_closed_and_plausible(params):
    loops = profile.marking_loops(params)
    assert len(loops) > 20
    for loop in loops:
        assert len(loop) >= 3
    rs = [math.hypot(x, y) for loop in loops for x, y in loop]
    assert 8.0 < min(rs) and max(rs) < 27.2      # кольцо поднутрения дна
    assert profile.marking_area(params) == pytest.approx(60.7, abs=2.0)


def test_marking_fits_on_bottom_recess(params):
    """Знаки должны лежать внутри плоскости поднутрения дна."""
    g = params["geometry"]
    r_out = g["bottom"]["chamfer_outer_r_out_mm"]
    ring = g["foot"]["ring_r_mm"]
    rs = [math.hypot(x, y) for loop in profile.marking_loops(params) for x, y in loop]
    assert min(rs) > r_out
    assert max(rs) < ring
    assert params["marking"]["plane_z_mm"] == pytest.approx(g["foot"]["recess_z_mm"])


def test_marking_relief_does_not_reach_standing_plane(params):
    """Рельеф выпуклый, но не должен доставать до опорной плоскости z=0."""
    mk = params["marking"]
    assert mk["raised"] is True
    assert mk["plane_z_mm"] - mk["relief_mm"] > 0.5


def test_print_band_margins(params):
    pr = params["print"]
    h = params["geometry"]["height_mm"]
    assert pr["bottom_margin_mm"] == pytest.approx(20.0)
    assert pr["top_margin_mm"] == pytest.approx(15.0)
    assert 0.0 < pr["bottom_margin_mm"] < h - pr["top_margin_mm"] < h
