"""Кадр как окно на плоскости изображения.

Окно — прямоугольник (x0, x1, y0, y1) в тангенсах углов от оси камеры: точка
кадра — это направление луча, x вправо, y вверх. Камера стоит на месте;
фокусное и сдвиг объектива только выбирают, какое окно попадёт в кадр.

Зачем так. Превью в браузере кладёт под стаканы снимок фона из той же точки.
Пока камера не двигается, любое окно — это просто вырез из снимка, и превью
совпадает с рендером. Поэтому стакан другого роста и пара получают кадр
кадрированием, а не подъездом камеры.

Всё, кроме window_of / set_window / to_tan, — чистая математика без Blender:
её же повторяет превью (web/preview/fit.js), числа должны совпадать.
"""

import math
from typing import Iterable, List, Optional, Sequence, Tuple

Window = Tuple[float, float, float, float]

# Форматы кадра (ТЗ §5.5): ширина к высоте.
ASPECTS = {"1:1": 1.0, "3:4": 0.75, "4:5": 0.8}

# Снимок фона для превью шире кадра фона во столько раз по каждой стороне:
# запас на стаканы выше эталона (до 1,25) и на пару рядом.
OVERSCAN = 1.6

# Стакан другого роста занимает в кадре ту же долю, что эталон, но в этих
# пределах: крошечный стакан не раздувается во весь кадр, высокий не мельчит.
ZOOM_LIMITS = (0.55, 1.25)

SAFE_W = 0.86       # доля ширины кадра, в которую должна влезть группа
MAX_W = 0.6         # одиночный стакан не шире этой доли кадра (низкий в 3:4)
MAX_H = 0.8         # одиночный стакан не выше этой доли кадра (655 мл в фотобоксе)
# Масштаб линейки: 1 — кадр сцены один на все стаканы (120 мл выглядит
# маленьким рядом с вещами комнаты, 655 мл — большим), 0 — каждый во весь кадр.
SCALE_FEEL = 1.0
MARGIN = 0.06       # поле от края кадра до группы, доля ширины


def aspect_of(frame: str) -> float:
    if frame not in ASPECTS:
        raise ValueError(f"формат кадра {frame!r}: есть {', '.join(ASPECTS)}")
    return ASPECTS[frame]


# ---------------------------------------------------------------------------
# Blender: окно камеры и обратно
# ---------------------------------------------------------------------------

def window_of(scene, cam) -> Window:
    """Окно, которое камера видит сейчас (с учётом сенсора, сдвига и формата)."""
    corners = cam.data.view_frame(scene=scene)
    xs = [c.x / -c.z for c in corners]
    ys = [c.y / -c.z for c in corners]
    return (min(xs), max(xs), min(ys), max(ys))


def set_window(scene, cam, win: Window, long_side: int, keep_aperture: bool = True) -> Tuple[int, int]:
    """Навести камеру на окно: фокусное, сдвиг объектива и размер кадра.

    keep_aperture — сохранить диаметр зрачка (фокусное / диафрагму): тогда
    размытие фона в новом кадре — ровно вырез из размытия кадра фона, как в
    превью. Возвращает размер кадра в пикселях.
    """
    x0, x1, y0, y1 = win
    w, h = x1 - x0, y1 - y0
    aspect = w / h
    if aspect >= 1.0:
        rx, ry = int(long_side), max(1, int(round(long_side / aspect)))
    else:
        rx, ry = max(1, int(round(long_side * aspect))), int(long_side)
    d = cam.data
    pupil = d.lens / d.dof.aperture_fstop if d.dof.aperture_fstop > 0 else None
    # Горизонтальная привязка сенсора: ширина окна = sensor_width / lens,
    # сдвиг — в долях ширины кадра (так его считает Cycles при этой привязке).
    d.sensor_fit = "HORIZONTAL"
    d.lens = d.sensor_width / w
    d.shift_x = (x0 + x1) / 2.0 / w
    d.shift_y = (y0 + y1) / 2.0 / w
    scene.render.resolution_x, scene.render.resolution_y = rx, ry
    scene.render.pixel_aspect_x = scene.render.pixel_aspect_y = 1.0
    if keep_aperture and pupil:
        d.dof.aperture_fstop = d.lens / pupil
    return rx, ry


def to_tan(cam_inv, p) -> Tuple[float, float]:
    """Точка мира → координаты на плоскости изображения (тангенсы)."""
    q = cam_inv @ p
    z = -q.z if q.z < -1e-9 else 1e-9
    return q.x / z, q.y / z


# ---------------------------------------------------------------------------
# чистая математика окон
# ---------------------------------------------------------------------------

def cup_points(base: Sequence[float], r_bot: float, r_top: float, height: float,
               n: int = 24) -> List[Tuple[float, float, float]]:
    """Точки контура стакана-усечённого конуса: кольцо дна и кольцо кромки.

    По ним считается рамка стакана в кадре; превью берёт те же точки, поэтому
    подгон кадра там и здесь одинаковый.
    """
    bx, by, bz = base
    out = []
    for k in range(n):
        a = 2.0 * math.pi * k / n
        c, s = math.cos(a), math.sin(a)
        out.append((bx + c * r_bot, by + s * r_bot, bz))
        out.append((bx + c * r_top, by + s * r_top, bz + height))
    return out


def box(points: Iterable[Tuple[float, float]]) -> Window:
    pts = list(points)
    xs = [p[0] for p in pts]
    ys = [p[1] for p in pts]
    return (min(xs), max(xs), min(ys), max(ys))


def union(a: Window, b: Window) -> Window:
    return (min(a[0], b[0]), max(a[1], b[1]), min(a[2], b[2]), max(a[3], b[3]))


def centre(win: Window) -> Tuple[float, float]:
    return ((win[0] + win[1]) / 2.0, (win[2] + win[3]) / 2.0)


def size(win: Window) -> Tuple[float, float]:
    return (win[1] - win[0], win[3] - win[2])


def scale_about(win: Window, c: Tuple[float, float], kx: float, ky: float) -> Window:
    x0, x1, y0, y1 = win
    return (c[0] + (x0 - c[0]) * kx, c[0] + (x1 - c[0]) * kx,
            c[1] + (y0 - c[1]) * ky, c[1] + (y1 - c[1]) * ky)


def backdrop_window(base: Window) -> Window:
    """Окно снимка фона для превью: кадр фона с запасом OVERSCAN."""
    return scale_about(base, centre(base), OVERSCAN, OVERSCAN)


def single(base: Window, ref_centre: Tuple[float, float], cup_centre: Tuple[float, float],
           zoom: float, aspect: float, cup_box: Optional[Window] = None) -> Window:
    """Кадр одиночного стакана: композиция кадра фона, перенесённая с эталона.

    zoom — рост стакана к эталону; кадр подстраивается под него лишь на долю
    1 − SCALE_FEEL, чтобы маленький и выглядел маленьким, а большой —
    большим. Стакан стоит в кадре там же, где эталон: окно масштабируется
    вокруг центра
    эталона и сдвигается на центр стакана. (Масштаб прямо вокруг центра
    стакана сдвигал композицию: низкому не хватало воздуха снизу, высокому —
    сверху.) Узкий формат обрезает кадр по бокам, высота кадра та же.

    Стакан шире MAX_W или выше MAX_H кадра — окно раздвигается вокруг него,
    пока он не влезет.
    """
    w0, h0 = size(base)
    k = max(ZOOM_LIMITS[0], min(ZOOM_LIMITS[1], zoom ** (1.0 - SCALE_FEEL)))
    x0, x1, y0, y1 = scale_about(base, ref_centre, aspect * k * h0 / w0, k)
    dx = cup_centre[0] - ref_centre[0]
    dy = cup_centre[1] - ref_centre[1]
    win = (x0 + dx, x1 + dx, y0 + dy, y1 + dy)
    f = 0.0
    if cup_box:
        (cw, ch), (ww, wh) = size(cup_box), size(win)
        f = max(cw / (ww * MAX_W), ch / (wh * MAX_H))
    return scale_about(win, cup_centre, f, f) if f > 1 else win


def group(single_win: Window, hero_box: Window, group_box: Window, aspect: float) -> Window:
    """Кадр под группу: главный — как в одиночном кадре, группа влезает.

    Группа занимает по высоте ту же долю, что главный стакан в одиночном
    кадре, и не шире SAFE_W кадра. Центр группы — там, где был центр главного;
    по ширине группа не ближе MARGIN к краю. По высоте окно не двигается: у
    авторских кадров стакан бывает срезан снизу нарочно.
    """
    sw, sh = size(single_win)
    hw, hh = size(hero_box)
    frac = hh / sh
    hc = centre(hero_box)
    tx, ty = (hc[0] - single_win[0]) / sw, (hc[1] - single_win[2]) / sh
    gw, gh = size(group_box)
    gc = centre(group_box)
    height = max(gh / frac, gw / (SAFE_W * aspect))
    width = height * aspect
    x0 = gc[0] - tx * width
    y0 = gc[1] - ty * height
    if gw <= (1.0 - 2.0 * MARGIN) * width:
        x0 = min(max(x0, group_box[1] - (1.0 - MARGIN) * width), group_box[0] - MARGIN * width)
    return (x0, x0 + width, y0, y0 + height)


def fit_into(win: Window, area: Window) -> Optional[Window]:
    """Сдвинуть окно внутрь области (снимка фона). None — окно больше области."""
    w, h = size(win)
    aw, ah = size(area)
    if w > aw * (1 + 1e-6) or h > ah * (1 + 1e-6):
        return None
    x0 = min(max(win[0], area[0]), area[1] - w)
    y0 = min(max(win[2], area[2]), area[3] - h)
    return (x0, x0 + w, y0, y0 + h)


def zoom_of(win: Window, base: Window) -> float:
    """Во сколько раз кадр больше кадра фона по высоте (>1 — отъехали)."""
    return size(win)[1] / size(base)[1]


def rounded(win: Window, nd: int = 6) -> List[float]:
    return [round(v, nd) for v in win]
