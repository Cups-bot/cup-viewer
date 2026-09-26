"""Тесты конической развёртки. Чистый Python, без bpy.

Контрольные случаи посчитаны руками и записаны литералами: реализация с ними
сверяется, а не наоборот.
"""

import math
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import pytest

from src import unwrap


# --------------------------------------------------------------------------
# Ручные контрольные случаи.
#
# Усечённый конус: r1 — больший (верхний) радиус, r2 — меньший (нижний),
# h — высота между этими радиусами.
#
#   l      = sqrt(h^2 + (r1 - r2)^2)          образующая усечённой части
#   alpha  = 360 * (r1 - r2) / l              угол кольцевого сектора
#   R_out  = l * r1 / (r1 - r2)               наружный радиус сектора
#   R_in   = R_out - l                        внутренний радиус сектора
#
# Случай A: r1=6, r2=3, h=4  ->  dr=3, l=sqrt(16+9)=5
#           alpha = 360*3/5 = 216
#           R_out = 5*6/3   = 10
#           R_in  = 10 - 5  = 5
#
# Случай B: r1=13, r2=5, h=15 -> dr=8, l=sqrt(225+64)=sqrt(289)=17
#           alpha = 360*8/17 = 2880/17 = 169.4117647...
#           R_out = 17*13/8  = 27.625
#           R_in  = 27.625-17 = 10.625
# --------------------------------------------------------------------------

CASE_A = dict(r1=6.0, r2=3.0, h=4.0, l=5.0, alpha=216.0, r_out=10.0, r_in=5.0)
CASE_B = dict(r1=13.0, r2=5.0, h=15.0, l=17.0, alpha=2880.0 / 17.0,
              r_out=27.625, r_in=10.625)


@pytest.mark.parametrize("c", [CASE_A, CASE_B])
def test_slant_length(c):
    assert unwrap.slant(c["r1"], c["r2"], c["h"]) == pytest.approx(c["l"], abs=1e-12)


@pytest.mark.parametrize("c", [CASE_A, CASE_B])
def test_sector_angle(c):
    assert unwrap.sector_angle_deg(c["r1"], c["r2"], c["h"]) == pytest.approx(
        c["alpha"], abs=1e-10)


@pytest.mark.parametrize("c", [CASE_A, CASE_B])
def test_sector_radii(c):
    r_in, r_out = unwrap.sector_radii(c["r1"], c["r2"], c["h"])
    assert r_out == pytest.approx(c["r_out"], abs=1e-10)
    assert r_in == pytest.approx(c["r_in"], abs=1e-10)


@pytest.mark.parametrize("c", [CASE_A, CASE_B])
def test_alpha_equals_360_sin_half_angle(c):
    """alpha = 360*sin(beta): не зависит от того, какой пояс конуса взят."""
    beta = math.atan2(c["r1"] - c["r2"], c["h"])
    assert unwrap.sector_angle_deg(c["r1"], c["r2"], c["h"]) == pytest.approx(
        360.0 * math.sin(beta), abs=1e-10)


@pytest.mark.parametrize("c", [CASE_A, CASE_B])
def test_arc_length_equals_circumference(c):
    """Длина наружной дуги сектора равна длине верхней окружности конуса."""
    r_in, r_out = unwrap.sector_radii(c["r1"], c["r2"], c["h"])
    alpha = math.radians(unwrap.sector_angle_deg(c["r1"], c["r2"], c["h"]))
    assert alpha * r_out == pytest.approx(2.0 * math.pi * c["r1"], rel=1e-12)
    assert alpha * r_in == pytest.approx(2.0 * math.pi * c["r2"], rel=1e-12)


def test_sector_is_scale_invariant():
    """Угол сектора зависит только от угла конуса, не от того, где его обрезать."""
    a_full = unwrap.sector_angle_deg(41.711, 28.340, 134.320)
    a_part = unwrap.sector_angle_deg(41.624, 29.027, 126.543)
    assert a_full == pytest.approx(a_part, abs=2e-3)


def test_cup_252214_reference_numbers():
    """Наружный конус стакана 252214, посчитано руками:

    r2 = 28.340 (D56.68/2) при z=0, полуугол 11.37/2 = 5.685 град,
    z_top = 134.320 (касательная R0.40)  ->  r1 = 28.340 + 134.320*tan(5.685)

      tan(5.685 deg) = 0.0995466
      r1    = 28.340 + 134.320*0.0995466 = 41.7107
      dr    = 13.3707
      l     = sqrt(134.320^2 + 13.3707^2) = sqrt(18041.8624 + 178.7756)
            = sqrt(18220.6380) = 134.98384
      alpha = 360*13.3707/134.98384 = 35.6595 град
      R_out = 134.98384*41.7107/13.3707 = 421.079
      R_in  = 421.079 - 134.984 = 286.095
    """
    r2 = 28.340
    h = 134.320
    r1 = r2 + h * math.tan(math.radians(11.37 / 2.0))

    assert r1 == pytest.approx(41.711, abs=2e-3)
    assert unwrap.slant(r1, r2, h) == pytest.approx(134.984, abs=2e-3)
    assert unwrap.sector_angle_deg(r1, r2, h) == pytest.approx(35.660, abs=2e-3)

    r_in, r_out = unwrap.sector_radii(r1, r2, h)
    assert r_out == pytest.approx(421.08, abs=0.02)
    assert r_in == pytest.approx(286.10, abs=0.02)


def test_apex_distance():
    """s = r / sin(beta) — расстояние по образующей от вершины полного конуса."""
    beta = math.atan2(6.0 - 3.0, 4.0)          # sin(beta) = 3/5
    assert unwrap.apex_distance(6.0, beta) == pytest.approx(10.0, abs=1e-12)
    assert unwrap.apex_distance(3.0, beta) == pytest.approx(5.0, abs=1e-12)


# --------------------------------------------------------------------------
# Отображение точки поверхности в UV
# --------------------------------------------------------------------------

def _band():
    return unwrap.ConeBand(r_lo=3.0, r_hi=6.0, h=4.0)


def test_cone_sector_preserves_shape():
    """Сектор в UV не тянет: отношение UV-расстояния к 3D-расстоянию одинаково
    для радиального и для окружного направления."""
    band = _band()
    m = unwrap.cone_sector_mapping(band, seam_azimuth_deg=180.0)

    # два соседних по образующей
    a = m.uv(s=5.0, theta=0.0)
    b = m.uv(s=6.0, theta=0.0)
    radial_uv = math.hypot(b[0] - a[0], b[1] - a[1])
    radial_3d = 1.0

    # два соседних по окружности на s = 10, где радиус в 3D равен s*sin(beta)
    dth = math.radians(1.0)
    c = m.uv(s=10.0, theta=0.0)
    d = m.uv(s=10.0, theta=dth)
    circ_uv = math.hypot(d[0] - c[0], d[1] - c[1])
    circ_3d = 2.0 * (10.0 * math.sin(band.beta)) * math.sin(dth / 2.0)

    assert radial_uv / radial_3d == pytest.approx(circ_uv / circ_3d, rel=1e-4)


def test_cone_sector_inside_unit_square():
    band = _band()
    m = unwrap.cone_sector_mapping(band, seam_azimuth_deg=180.0)
    for i in range(65):
        theta = 2.0 * math.pi * i / 64.0
        for s in (5.0, 7.5, 10.0):
            u, v = m.uv(s=s, theta=theta)
            assert -1e-9 <= u <= 1.0 + 1e-9
            assert -1e-9 <= v <= 1.0 + 1e-9


def test_rect_mapping():
    band = _band()
    m = unwrap.rect_mapping(band, seam_azimuth_deg=180.0)
    u0, v0 = m.uv(s=5.0, theta=math.radians(180.0))
    u1, v1 = m.uv(s=10.0, theta=math.radians(180.0))
    assert u0 == pytest.approx(0.0, abs=1e-9)
    assert v0 == pytest.approx(0.0, abs=1e-9)
    assert v1 == pytest.approx(1.0, abs=1e-9)


def test_seam_is_single_and_at_configured_azimuth():
    band = _band()
    m = unwrap.rect_mapping(band, seam_azimuth_deg=180.0)
    eps = 1e-7
    just_after = m.uv(s=10.0, theta=math.radians(180.0) + eps)[0]
    just_before = m.uv(s=10.0, theta=math.radians(180.0) - eps)[0]
    assert just_after == pytest.approx(0.0, abs=1e-5)
    assert just_before == pytest.approx(1.0, abs=1e-5)


def test_fit_islands_keeps_aspect():
    """Посадка островов в 0..1 — равномерный масштаб + сдвиг, форма сохраняется."""
    island = [(0.0, 0.0), (2.0, 0.0), (2.0, 1.0), (0.0, 1.0)]
    fitted, xf = unwrap.fit_islands([island], box=(0.0, 0.0, 1.0, 1.0), padding=0.0)
    pts = fitted[0]
    w = max(p[0] for p in pts) - min(p[0] for p in pts)
    h = max(p[1] for p in pts) - min(p[1] for p in pts)
    assert w / h == pytest.approx(2.0, rel=1e-12)
    assert xf.scale == pytest.approx(0.5, rel=1e-12)


# --------------------------------------------------------------------------
# печатное поле шелкографии
# --------------------------------------------------------------------------

def _print_band():
    """Пояс конуса стакана 252214 с полями 20 снизу и 15 сверху."""
    beta = math.radians(11.37 / 2.0)
    r_lo = 28.340 + 20.0 * math.tan(beta)
    r_hi = 28.340 + (135.30 - 15.0) * math.tan(beta)
    sb = math.sin(beta)
    return unwrap.PrintBand(z_lo=20.0, z_hi=120.30, r_lo=r_lo, r_hi=r_hi,
                            s_lo=r_lo / sb, s_hi=r_hi / sb,
                            gap_lo=10.0, gap_hi=20.0,
                            seam=math.radians(180.0))


def test_print_band_v_spans_0_1():
    b = _print_band()
    assert b.uv_psi(b.s_lo, math.pi)[1] == pytest.approx(0.0, abs=1e-12)
    assert b.uv_psi(b.s_hi, math.pi)[1] == pytest.approx(1.0, abs=1e-12)


def test_print_band_u_is_0_at_gap_edge_and_1_at_other():
    b = _print_band()
    for v, s in ((0.0, b.s_lo), (1.0, b.s_hi)):
        half = b.half_gap_angle(v)
        assert b.uv_psi(s, half)[0] == pytest.approx(0.0, abs=1e-12)
        assert b.uv_psi(s, unwrap.TAU - half)[0] == pytest.approx(1.0, abs=1e-12)


def test_print_band_gap_is_wider_at_top():
    """Зазор физически разный: 10 мм снизу, 20 сверху."""
    b = _print_band()
    assert b.gap_at_v(0.0) == pytest.approx(10.0)
    assert b.gap_at_v(1.0) == pytest.approx(20.0)
    assert b.gap_at_v(0.5) == pytest.approx(15.0)


def test_print_band_width_matches_circumference_minus_gap():
    b = _print_band()
    for v in (0.0, 0.5, 1.0):
        r = b.r_at_v(v)
        assert b.width_at_v(v) == pytest.approx(2 * math.pi * r - b.gap_at_v(v))


def test_print_band_reference_numbers():
    """Считано руками: r снизу 30.331, сверху 40.315, окружности 190.6 и 253.3."""
    b = _print_band()
    assert b.r_lo == pytest.approx(30.331, abs=0.01)
    assert b.r_hi == pytest.approx(40.315, abs=0.01)
    assert 2 * math.pi * b.r_lo == pytest.approx(190.58, abs=0.1)
    assert 2 * math.pi * b.r_hi == pytest.approx(253.31, abs=0.1)
    assert b.height_mm() == pytest.approx(100.79, abs=0.05)
    assert b.report()["centerline_length_mm"] == pytest.approx(206.94, abs=0.2)

