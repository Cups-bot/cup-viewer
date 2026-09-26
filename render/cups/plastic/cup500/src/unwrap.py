"""Математика конической развёртки боковой стенки.

Чистый Python: ни одного импорта bpy, модуль запускается и тестируется обычным
интерпретатором.

Боковая стенка стакана — усечённый конус. Его точная (неискажённая) развёртка на
плоскость — кольцевой сектор. Для конуса с бОльшим радиусом r1, меньшим r2 и
высотой h между ними:

    l      = sqrt(h^2 + (r1 - r2)^2)          длина образующей усечённой части
    beta   = atan2(r1 - r2, h)                полуугол конуса
    alpha  = 360 * (r1 - r2) / l = 360*sin(beta)   угол сектора, градусы
    R_out  = l * r1 / (r1 - r2)               наружный радиус сектора
    R_in   = R_out - l                        внутренний радиус сектора

Точка поверхности задаётся парой (s, theta), где s = r / sin(beta) — расстояние
по образующей от вершины полного конуса, theta — азимут. Развёртка переводит её
в полярную точку (s, phi) с phi = alpha * (theta - theta_шва) / 2pi. Именно
потому, что радиус в развёртке равен s, а не чему-то ещё, отображение не тянет.
"""

import math
from dataclasses import dataclass
from typing import Iterable, List, Sequence, Tuple

Point = Tuple[float, float]

TAU = 2.0 * math.pi


# ---------------------------------------------------------------------------
# базовые формулы
# ---------------------------------------------------------------------------

def slant(r1: float, r2: float, h: float) -> float:
    """Длина образующей усечённого конуса между радиусами r1 и r2."""
    return math.hypot(h, r1 - r2)


def half_angle(r1: float, r2: float, h: float) -> float:
    """Полуугол конуса (радианы)."""
    return math.atan2(r1 - r2, h)


def sector_angle_deg(r1: float, r2: float, h: float) -> float:
    """Угол кольцевого сектора развёртки, градусы."""
    return 360.0 * (r1 - r2) / slant(r1, r2, h)


def sector_radii(r1: float, r2: float, h: float) -> Tuple[float, float]:
    """(R_in, R_out) кольцевого сектора развёртки."""
    l = slant(r1, r2, h)
    dr = r1 - r2
    r_out = l * r1 / dr
    return r_out - l, r_out


def apex_distance(r: float, beta: float) -> float:
    """s = r / sin(beta) — расстояние по образующей от вершины полного конуса."""
    return r / math.sin(beta)


# ---------------------------------------------------------------------------
# пояс конуса
# ---------------------------------------------------------------------------

@dataclass(frozen=True)
class ConeBand:
    """Пояс наружного конуса: r_lo — нижний радиус, r_hi — верхний, h — высота."""

    r_lo: float
    r_hi: float
    h: float

    @property
    def beta(self) -> float:
        return half_angle(self.r_hi, self.r_lo, self.h)

    @property
    def alpha_deg(self) -> float:
        return sector_angle_deg(self.r_hi, self.r_lo, self.h)

    @property
    def alpha(self) -> float:
        return math.radians(self.alpha_deg)

    @property
    def slant_len(self) -> float:
        return slant(self.r_hi, self.r_lo, self.h)

    @property
    def r_in(self) -> float:
        return sector_radii(self.r_hi, self.r_lo, self.h)[0]

    @property
    def r_out(self) -> float:
        return sector_radii(self.r_hi, self.r_lo, self.h)[1]

    def s_of_r(self, r: float) -> float:
        return apex_distance(r, self.beta)


# ---------------------------------------------------------------------------
# отображения поверхность -> UV
# ---------------------------------------------------------------------------

def _wrap(theta: float, seam: float) -> float:
    """Азимут относительно шва, приведённый к [0, 2pi)."""
    t = math.fmod(theta - seam, TAU)
    if t < 0.0:
        t += TAU
    return t


@dataclass(frozen=True)
class ConeSectorMapping:
    """UV повторяет реальную развёртку: остров — кольцевой сектор.

        u = 0.5 + (s / R_out) * sin(phi) / 2
        v = 0.5 + (s / R_out) * cos(phi) / 2
        phi = alpha * (theta - theta_шва) / 2pi - alpha/2

    Вершина полного конуса попадает в (0.5, 0.5), наружная дуга сектора ложится
    на окружность радиуса 0.5. Сектор целиком лежит в квадрате 0..1, но занимает
    его лишь частично — плотную посадку делает fit_islands, равномерным
    масштабом, поэтому неискажённость сохраняется.
    """

    band: ConeBand
    seam: float

    def uv_psi(self, s: float, psi: float) -> Point:
        """psi — азимут относительно шва, уже приведённый вызывающим.

        Граням, которые сидят на шве, нужен psi чуть больше 2pi: иначе одна
        сторона грани уедет к началу острова и грань растянется на весь сектор.
        Поэтому здесь psi не заворачивается.
        """
        phi = self.band.alpha * (psi / TAU) - self.band.alpha / 2.0
        k = 0.5 * s / self.band.r_out
        return (0.5 + k * math.sin(phi), 0.5 + k * math.cos(phi))

    def uv(self, s: float, theta: float) -> Point:
        return self.uv_psi(s, _wrap(theta, self.seam))


@dataclass(frozen=True)
class RectMapping:
    """Прямоугольная развёртка: u = theta/2pi, v = (s - R_in)/(R_out - R_in)."""

    band: ConeBand
    seam: float

    def uv_psi(self, s: float, psi: float) -> Point:
        v = (s - self.band.r_in) / (self.band.r_out - self.band.r_in)
        return (psi / TAU, v)

    def uv(self, s: float, theta: float) -> Point:
        return self.uv_psi(s, _wrap(theta, self.seam))


def cone_sector_mapping(band: ConeBand, seam_azimuth_deg: float) -> ConeSectorMapping:
    return ConeSectorMapping(band=band, seam=math.radians(seam_azimuth_deg))


def rect_mapping(band: ConeBand, seam_azimuth_deg: float) -> RectMapping:
    return RectMapping(band=band, seam=math.radians(seam_azimuth_deg))


def mapping_for(mode: str, band: ConeBand, seam_azimuth_deg: float):
    if mode == "cone_sector":
        return cone_sector_mapping(band, seam_azimuth_deg)
    if mode == "rect":
        return rect_mapping(band, seam_azimuth_deg)
    raise ValueError(f"unknown uv mode: {mode!r} (ожидается cone_sector или rect)")


# ---------------------------------------------------------------------------
# посадка островов в 0..1
# ---------------------------------------------------------------------------

@dataclass(frozen=True)
class Fit:
    """Равномерное преобразование UV: (u, v) -> (u*scale + dx, v*scale + dy)."""

    scale: float
    dx: float
    dy: float

    def apply(self, p: Point) -> Point:
        return (p[0] * self.scale + self.dx, p[1] * self.scale + self.dy)


def bounds(points: Iterable[Point]) -> Tuple[float, float, float, float]:
    xs = [p[0] for p in points]
    ys = [p[1] for p in points]
    return min(xs), min(ys), max(xs), max(ys)


def fit_islands(islands: Sequence[Sequence[Point]],
                box: Tuple[float, float, float, float],
                padding: float) -> Tuple[List[List[Point]], Fit]:
    """Вписать острова в box одним равномерным масштабом со сдвигом.

    Масштаб один на все переданные острова, поэтому их взаимные пропорции и
    относительный размер сохраняются: растяжения не вносится.
    """
    flat = [p for isl in islands for p in isl]
    if not flat:
        return [list(isl) for isl in islands], Fit(1.0, 0.0, 0.0)

    x0, y0, x1, y1 = bounds(flat)
    bx0, by0, bx1, by1 = box
    bw = (bx1 - bx0) - 2.0 * padding
    bh = (by1 - by0) - 2.0 * padding
    if bw <= 0.0 or bh <= 0.0:
        raise ValueError("box меньше двойного padding")

    w = x1 - x0
    h = y1 - y0
    sx = bw / w if w > 0.0 else float("inf")
    sy = bh / h if h > 0.0 else float("inf")
    scale = min(sx, sy)
    if not math.isfinite(scale):
        scale = 1.0

    dx = bx0 + padding + (bw - w * scale) / 2.0 - x0 * scale
    dy = by0 + padding + (bh - h * scale) / 2.0 - y0 * scale
    fit = Fit(scale, dx, dy)
    return [[fit.apply(p) for p in isl] for isl in islands], fit


def report(band: ConeBand) -> str:
    """Строка для лога: угол и радиусы сектора в мм."""
    return ("развёртка стенки: alpha = %.3f град, R_in = %.2f мм, "
            "R_out = %.2f мм, образующая = %.2f мм"
            % (band.alpha_deg, band.r_in, band.r_out, band.slant_len))

# ---------------------------------------------------------------------------
# печатное поле шелкографии: прямоугольный макет с полями и зазором на стыке
# ---------------------------------------------------------------------------

@dataclass(frozen=True)
class PrintBand:
    """Пояс запечатки на наружном конусе.

    Макет отдаётся прямоугольником, поэтому по горизонтали он раскладывается
    на доступную дугу, а зазор на стыке задаётся отдельно снизу и сверху:
    на конусе он физически разный, потому что окружность растёт с высотой.
    """

    z_lo: float
    z_hi: float
    r_lo: float
    r_hi: float
    s_lo: float
    s_hi: float
    gap_lo: float
    gap_hi: float
    seam: float

    def v_of_s(self, s: float) -> float:
        return (s - self.s_lo) / (self.s_hi - self.s_lo)

    def r_at_v(self, v: float) -> float:
        return self.r_lo + (self.r_hi - self.r_lo) * v

    def gap_at_v(self, v: float) -> float:
        return self.gap_lo + (self.gap_hi - self.gap_lo) * v

    def half_gap_angle(self, v: float) -> float:
        r = self.r_at_v(v)
        return 0.0 if r <= 0.0 else self.gap_at_v(v) / (2.0 * r)

    def uv_psi(self, s: float, psi: float) -> Point:
        v = self.v_of_s(s)
        half = self.half_gap_angle(v)
        span = TAU - 2.0 * half
        return ((psi - half) / span if span > 0.0 else 0.0, v)

    def uv(self, s: float, theta: float) -> Point:
        return self.uv_psi(s, _wrap(theta, self.seam))

    def width_at_v(self, v: float) -> float:
        """Физическая длина печати по окружности на этой высоте, мм."""
        return TAU * self.r_at_v(v) - self.gap_at_v(v)

    def height_mm(self) -> float:
        """Высота поля по образующей, мм."""
        return self.s_hi - self.s_lo

    def report(self) -> dict:
        return {
            "z_range_mm": [self.z_lo, self.z_hi],
            "r_range_mm": [self.r_lo, self.r_hi],
            "s_range_mm": [self.s_lo, self.s_hi],
            "height_along_generator_mm": self.height_mm(),
            "circumference_mm": {
                "bottom": TAU * self.r_lo,
                "middle": TAU * self.r_at_v(0.5),
                "top": TAU * self.r_hi,
            },
            "seam_gap_mm": {"bottom": self.gap_lo,
                            "middle": self.gap_at_v(0.5),
                            "top": self.gap_hi},
            "print_width_mm": {"bottom": self.width_at_v(0.0),
                               "middle": self.width_at_v(0.5),
                               "top": self.width_at_v(1.0)},
            "centerline_length_mm": self.width_at_v(0.5),
            "artwork_aspect_w_h": self.width_at_v(0.5) / self.height_mm(),
        }

