"""2D-профиль сечения C-C стакана 500 мл (чертёж 252214).

Чистый Python: ни одного импорта bpy. Вся геометрия живёт здесь, build.py
только вращает готовый контур.

Контур строится как замкнутый обвод половины сечения: от оси по наружному дну
наружу, вверх по наружному борту, через венчик, вниз по внутреннему борту,
внутрь по внутреннему дну и обратно на ось. Скругления не «навешиваются»
модификатором, а вставляются касательными дугами в острые углы, как на чертеже:
конфиг хранит координаты острых углов и радиус в каждом.

Числовых литералов размеров в модуле нет — всё приходит из JSON.
"""

import json
import math
import os
from dataclasses import dataclass, field
from typing import Dict, List, Optional, Sequence, Tuple

Point = Tuple[float, float]          # (z, r) в миллиметрах


class ConfigError(Exception):
    """Ошибка конфига: сообщение уже содержит путь к файлу и ключ."""


# ---------------------------------------------------------------------------
# единицы: единственное место перевода мм -> метры
# ---------------------------------------------------------------------------

_MM_IN_M = 1000.0


def mm_to_m(value: float) -> float:
    """Миллиметры -> метры. Единственная функция перевода во всём проекте."""
    return value / _MM_IN_M


def m_to_mm(value: float) -> float:
    return value * _MM_IN_M


# ---------------------------------------------------------------------------
# конфиг
# ---------------------------------------------------------------------------

def deep_copy(obj):
    return json.loads(json.dumps(obj))


#: числовые ключи, обязательные в конфиге: путь -> правило
#: ('>0', '>=0', 'any')
_REQUIRED: Dict[str, str] = {
    "geometry.height_mm": ">0",
    "geometry.cone.r_bottom_mm": ">0",
    "geometry.cone.included_angle_deg": ">=0",
    "geometry.ribs.count": ">0",
    "geometry.ribs.azimuth_start_deg": ">=0",
    "geometry.ribs.top_z_mm": ">0",
    "geometry.ribs.offset_from_outer_mm": ">0",
    "geometry.ribs.width_base_mm": ">0",
    "geometry.ribs.width_top_mm": ">0",
    "geometry.ribs.embed_mm": ">=0",
    "geometry.foot.recess_z_mm": ">0",
    "geometry.foot.ring_r_mm": ">0",
    "geometry.foot.draft_deg": ">=0",
    "geometry.bottom.floor_z_mm": ">0",
    "geometry.bottom.step_z_out_mm": ">0",
    "geometry.bottom.step_z_in_mm": ">0",
    "geometry.bottom.chamfer_outer_deg": ">0",
    "geometry.bottom.chamfer_outer_r_out_mm": ">0",
    "geometry.bottom.chamfer_outer_r_in_mm": ">0",
    "geometry.bottom.chamfer_gate_deg": ">0",
    "geometry.bottom.gate_pad_z_mm": ">0",
    "geometry.bottom.gate_pad_r_mm": ">0",
    "geometry.bottom.gate_land_z_mm": ">0",
    "geometry.bottom.gate_land_r_mm": ">0",
    "geometry.bottom.gate_chamfer_r_mm": ">0",
    "geometry.bottom.gate_dome_r_mm": ">0",
    "geometry.rim.slab_t_mm": ">0",
    "geometry.rim.lip_t_mm": ">0",
    "geometry.rim.lip_draft_deg": ">=0",
    "geometry.rim.d_max_mm": ">0",
    "geometry.rim.d_max_below_top_mm": ">0",
    "material.density_g_cm3": ">0",
    "mesh.segments": ">0",
    "mesh.arc_segments": ">0",
    "mesh.wall_rows": ">0",
    "mesh.merge_distance_mm": ">0",
    "mesh.shade_smooth_angle_deg": ">=0",
    "mesh.unit_scale_length": ">0",
    "uv.seam_azimuth_deg": ">=0",
    "uv.texture_size_px": ">0",
    "uv.padding_px": ">=0",
    "shader.roughness": ">=0",
    "shader.transmission": ">=0",
    "shader.ink.roughness": ">=0",
    "shader.ink.transmission": ">=0",
    "shader.ior": ">0",
    "shader.metallic": ">=0",
    "render.samples": ">0",
    "marking.relief_mm": ">0",
    "marking.embed_mm": ">=0",
    "marking.plane_z_mm": ">0",
    "print.top_margin_mm": ">=0",
    "print.bottom_margin_mm": ">=0",
    "print.seam_gap_bottom_mm": ">=0",
    "print.seam_gap_top_mm": ">=0",
    "print.seam_azimuth_deg": ">=0",
}

#: нечисловые ключи, которые обязаны присутствовать: их отсутствие должно
#: падать на старте с кодом 2, а не KeyError-ом посреди рендера
_REQUIRED_PRESENT = (
    "drawing.part_weight_g_stated",
    "material.name",
    "mesh.object_name",
    "mesh.collection_name",
    "uv.mode", "uv.band", "uv.bands",
    "shader.name", "shader.base_color", "shader.maps", "shader.thin_wall", "shader.ink",
    "render.use_raytracing",
    "render.engine", "render.resolution", "render.world_strength",
    "render.world_color", "render.isolate_collection",
    "render.camera.clip_start_m", "render.camera.clip_end_m",
    "render.camera.focal_mm", "render.camera.location_m", "render.camera.look_at_m",
    "render.lights", "render.studio",
    "verify.tolerances",
    "marking.enabled", "marking.source", "marking.mirror_x", "marking.raised",
)

#: имена скруглений; порядок здесь роли не играет, ключи должны совпадать
#: с именами углов в outer_corners()/inner_corners()
_FILLET_KEYS = (
    "bottom_gate_chamfer_out", "bottom_step_out", "bottom_recess_out",
    "foot_top", "foot_bottom",
    "rim_wall_to_slab", "rim_slab_to_lip", "rim_top_outer", "rim_top_inner",
    "rib_top", "rib_base", "floor_outer", "floor_step_in", "bottom_step_in",
    "bottom_gate_chamfer_in", "gate_land",
)


def _dig(obj, path: str):
    cur = obj
    for part in path.split("."):
        if not isinstance(cur, dict) or part not in cur:
            raise KeyError(path)
        cur = cur[part]
    return cur


def _fail(path_hint: str, key: str, value, msg: str) -> None:
    raise ConfigError(f"{path_hint}: {key} = {value!r} — {msg}")


def load_params(path: str) -> dict:
    """Прочитать и провалидировать конфиг. Отсутствие файла — фатально."""
    if not os.path.isfile(path):
        raise ConfigError(f"{path}: файл конфига не найден")
    try:
        with open(path, "r", encoding="utf-8") as fh:
            params = json.load(fh)
    except json.JSONDecodeError as exc:
        raise ConfigError(f"{path}: некорректный JSON — {exc}") from exc
    validate(params, path)
    # Откуда пришёл конфиг: относительные пути внутри него (клеймо) разрешаются
    # относительно его папки, а не относительно движка. Иначе стакан другого
    # объёма молча подхватил бы чужое клеймо.
    params["_config_dir"] = os.path.dirname(os.path.abspath(path))
    return params


def validate(params: dict, path_hint: str) -> None:
    """Проверить конфиг. Нарушение -> ConfigError, никаких молчаливых дефолтов."""
    # 1. обязательные числовые ключи и их знаки
    for key, rule in _REQUIRED.items():
        try:
            value = _dig(params, key)
        except KeyError:
            raise ConfigError(f"{path_hint}: {key} — обязательный ключ отсутствует")
        if not isinstance(value, (int, float)) or isinstance(value, bool):
            _fail(path_hint, key, value, "must be a number")
        if rule == ">0" and not value > 0:
            _fail(path_hint, key, value, "must be > 0")
        if rule == ">=0" and not value >= 0:
            _fail(path_hint, key, value, "must be >= 0")

    for key in _REQUIRED_PRESENT:
        try:
            _dig(params, key)
        except KeyError:
            raise ConfigError(f"{path_hint}: {key} — обязательный ключ отсутствует")

    # 2. у каждого числового ключа должна быть запись в _src своего объекта
    for key in list(_REQUIRED) + [f"geometry.fillets.{k}" for k in _FILLET_KEYS]:
        parent_path, _, leaf = key.rpartition(".")
        try:
            parent = _dig(params, parent_path)
        except KeyError:
            raise ConfigError(f"{path_hint}: {parent_path} — обязательный раздел отсутствует")
        src = parent.get("_src")
        if not isinstance(src, dict) or leaf not in src:
            raise ConfigError(
                f"{path_hint}: {parent_path}._src.{leaf} — нет пометки _src "
                f"(откуда значение взято на чертеже)")

    # 3. скругления
    fillets = params["geometry"].get("fillets")
    if not isinstance(fillets, dict):
        raise ConfigError(f"{path_hint}: geometry.fillets — обязательный раздел отсутствует")
    for key in _FILLET_KEYS:
        if key not in fillets:
            raise ConfigError(f"{path_hint}: geometry.fillets.{key} — обязательный ключ отсутствует")
        value = fillets[key]
        if not isinstance(value, (int, float)) or value < 0:
            _fail(path_hint, f"geometry.fillets.{key}", value, "must be >= 0")

    # 4. толщина стенки
    height = params["geometry"]["height_mm"]
    table = params["geometry"]["wall"]["thickness"]
    if not isinstance(table, list) or len(table) < 2:
        _fail(path_hint, "wall.thickness", table,
              "must be a list of at least 2 pairs [height_mm, thickness_mm]")
    prev_z: Optional[float] = None
    for i, pair in enumerate(table):
        if not isinstance(pair, list) or len(pair) != 2:
            _fail(path_hint, f"wall.thickness[{i}]", pair, "must be [height_mm, thickness_mm]")
        z, t = pair
        if not t > 0:
            _fail(path_hint, f"wall.thickness[{i}]", t, "must be > 0")
        if prev_z is not None and not z > prev_z:
            _fail(path_hint, f"wall.thickness[{i}]", z, "heights must strictly increase")
        prev_z = z
    if abs(table[0][0]) > 0.01:
        _fail(path_hint, "wall.thickness[0]", table[0][0], "must start at height 0")
    if abs(table[-1][0] - height) > 0.01:
        _fail(path_hint, f"wall.thickness[{len(table) - 1}]", table[-1][0],
              f"must reach geometry.height_mm = {height} (+-0.01)")

    # 5. производные: r_top > r_bottom > 0
    r_bottom = params["geometry"]["cone"]["r_bottom_mm"]
    r_top = cone_r_out(params, height)
    if not r_top > r_bottom:
        _fail(path_hint, "r_top", r_top,
              f"must be > r_bottom = {r_bottom} (проверьте cone.included_angle_deg)")

    # 6. уровни дна по возрастанию
    g = params["geometry"]
    levels = [
        ("foot.recess_z_mm", g["foot"]["recess_z_mm"]),
        ("bottom.floor_z_mm", g["bottom"]["floor_z_mm"]),
        ("bottom.step_z_out_mm", g["bottom"]["step_z_out_mm"]),
        ("bottom.gate_pad_z_mm", g["bottom"]["gate_pad_z_mm"]),
        ("bottom.step_z_in_mm", g["bottom"]["step_z_in_mm"]),
        ("bottom.gate_land_z_mm", g["bottom"]["gate_land_z_mm"]),
        ("ribs.top_z_mm", g["ribs"]["top_z_mm"]),
    ]
    for name, value in levels:
        if not 0.0 < value < height:
            _fail(path_hint, name, value, f"must be between 0 and height {height}")

    # 6a. рёбра
    rb = g["ribs"]
    if rb["offset_from_outer_mm"] <= wall_thickness_at(params, rb["top_z_mm"]):
        _fail(path_hint, "ribs.offset_from_outer_mm", rb["offset_from_outer_mm"],
              "must be > толщины стенки: иначе ребро не выступает внутрь")
    if rb["top_z_mm"] <= g["bottom"]["floor_z_mm"]:
        _fail(path_hint, "ribs.top_z_mm", rb["top_z_mm"],
              f"must be > bottom.floor_z_mm = {g['bottom']['floor_z_mm']}")
    if int(rb["count"]) < 1:
        _fail(path_hint, "ribs.count", rb["count"], "must be >= 1")

    # 6b. клеймо
    mk = params["marking"]
    if mk["enabled"] and not mk["raised"]:
        raise ConfigError(
            f"{path_hint}: marking.raised = false — углублённая гравировка "
            f"требует булевой операции и пока не реализована; поставьте true "
            f"(выпуклый рельеф) или marking.enabled = false")

    # 6c. печатное поле
    pr = params["print"]
    if pr["top_margin_mm"] + pr["bottom_margin_mm"] >= height:
        _fail(path_hint, "print.top_margin_mm", pr["top_margin_mm"],
              f"сумма отступов не должна превышать высоту {height}")
    r_lo = cone_r_out(params, pr["bottom_margin_mm"])
    for side, gap, r in (("bottom", pr["seam_gap_bottom_mm"], r_lo),
                         ("top", pr["seam_gap_top_mm"],
                          cone_r_out(params, height - pr["top_margin_mm"]))):
        if gap >= 2.0 * math.pi * r:
            _fail(path_hint, f"print.seam_gap_{side}_mm", gap,
                  f"зазор больше длины окружности {2.0 * math.pi * r:.1f} мм")

    # 7. купол литника должен доставать до оси
    dome_r = g["bottom"]["gate_dome_r_mm"]
    land_r = g["bottom"]["gate_land_r_mm"]
    if dome_r <= land_r:
        _fail(path_hint, "bottom.gate_dome_r_mm", dome_r,
              f"must be > gate_land_r_mm = {land_r}")

    # 8. UV
    uv = params.get("uv")
    if not isinstance(uv, dict):
        raise ConfigError(f"{path_hint}: uv — обязательный раздел отсутствует")
    if uv.get("mode") not in ("cone_sector", "rect"):
        _fail(path_hint, "uv.mode", uv.get("mode"), "must be 'cone_sector' or 'rect'")
    bands = uv.get("bands")
    if not isinstance(bands, dict) or uv.get("band") not in bands:
        _fail(path_hint, "uv.band", uv.get("band"),
              f"must be one of {sorted(bands) if isinstance(bands, dict) else '<uv.bands>'}")
    for name, rng in bands.items():
        if not isinstance(rng, list) or len(rng) != 2 or not rng[0] < rng[1]:
            _fail(path_hint, f"uv.bands.{name}", rng, "must be [z_lo, z_hi] with z_lo < z_hi")
        if rng[0] < -1e-9 or rng[1] > height + 1e-9:
            _fail(path_hint, f"uv.bands.{name}", rng, f"must lie inside 0..{height}")

    # 9. скругления должны физически помещаться в углы
    _validate_fillets_fit(params, path_hint)


def _validate_fillets_fit(params: dict, path_hint: str) -> None:
    corners = _all_corners(params)
    for i in range(1, len(corners) - 1):
        c = corners[i]
        if c.radius <= 0.0:
            continue
        d_in = _unit(_sub(c.p, corners[i - 1].p))
        d_out = _unit(_sub(corners[i + 1].p, c.p))
        turn = _angle_between(d_in, d_out)
        if turn < 1e-9 or abs(turn - math.pi) < 1e-9:
            _fail(path_hint, f"geometry.fillets.{c.name}", c.radius,
                  "угол вырожден, скругление поставить некуда")
        tangent = c.radius * math.tan(turn / 2.0)
        avail_prev = _dist(c.p, corners[i - 1].p)
        avail_next = _dist(c.p, corners[i + 1].p)
        # соседний угол тоже съедает свою касательную
        limit = min(avail_prev, avail_next)
        if tangent > limit - 1e-9:
            _fail(path_hint, f"geometry.fillets.{c.name}", c.radius,
                  f"не помещается в угол: нужна касательная {tangent:.3f} мм, "
                  f"доступно {limit:.3f} мм")


# ---------------------------------------------------------------------------
# производные величины конуса
# ---------------------------------------------------------------------------

def cone_half_angle(params: dict) -> float:
    """Полуугол наружного конуса, радианы."""
    return math.radians(params["geometry"]["cone"]["included_angle_deg"] / 2.0)


def cone_r_out(params: dict, z: float) -> float:
    """Радиус наружного конуса на высоте z."""
    cone = params["geometry"]["cone"]
    return cone["r_bottom_mm"] + z * math.tan(cone_half_angle(params))


def wall_thickness_at(params: dict, z: float) -> float:
    """Толщина борта на высоте z: линейная интерполяция таблицы (высота, толщина)."""
    table = params["geometry"]["wall"]["thickness"]
    if z <= table[0][0]:
        return table[0][1]
    if z >= table[-1][0]:
        return table[-1][1]
    for (z0, t0), (z1, t1) in zip(table, table[1:]):
        if z0 <= z <= z1:
            if z1 == z0:
                return t1
            return t0 + (t1 - t0) * (z - z0) / (z1 - z0)
    return table[-1][1]


def cone_r_in(params: dict, z: float) -> float:
    """Радиус внутренней поверхности борта на высоте z (толщина — по нормали)."""
    return cone_r_out(params, z) - wall_thickness_at(params, z) / math.cos(
        cone_half_angle(params))


# ---------------------------------------------------------------------------
# углы профиля
# ---------------------------------------------------------------------------

@dataclass(frozen=True)
class Corner:
    name: str
    p: Point            # (z, r) острого угла
    radius: float       # радиус скругления, 0 = острый
    tag: str            # тег исходящего сегмента
    rows: int = 1       # на сколько частей делить исходящий прямой участок


def outer_corners(params: dict) -> List[Corner]:
    """Наружный обвод: от оси по дну наружу, вверх по борту, через венчик."""
    g = params["geometry"]
    b, f, r, fl = g["bottom"], g["foot"], g["rim"], g["fillets"]
    height = g["height_mm"]
    rows = params["mesh"]["wall_rows"]

    tan_ch1 = math.tan(math.radians(b["chamfer_outer_deg"]))
    tan_ch2 = math.tan(math.radians(b["chamfer_gate_deg"]))
    tan_draft = math.tan(math.radians(f["draft_deg"]))
    tan_lip = math.tan(math.radians(r["lip_draft_deg"]))

    z_dmax = height - r["d_max_below_top_mm"]
    r_dmax = r["d_max_mm"] / 2.0
    z_slab = height - r["slab_t_mm"]

    def lip_inner_r(z: float) -> float:
        return (r_dmax - r["lip_t_mm"]) - (z - z_dmax) * tan_lip

    return [
        Corner("axis_bottom_out", (b["gate_pad_z_mm"], 0.0), 0.0, "bottom_out"),
        Corner("gate_pad_edge", (b["gate_pad_z_mm"], b["gate_pad_r_mm"]), 0.0, "bottom_out"),
        Corner("bottom_gate_chamfer_out",
               (b["step_z_out_mm"],
                b["gate_pad_r_mm"] + (b["gate_pad_z_mm"] - b["step_z_out_mm"]) * tan_ch2),
               fl["bottom_gate_chamfer_out"], "bottom_out"),
        Corner("bottom_step_out",
               (b["step_z_out_mm"],
                b["chamfer_outer_r_out_mm"]
                - (b["step_z_out_mm"] - f["recess_z_mm"]) * tan_ch1),
               fl["bottom_step_out"], "bottom_out"),
        Corner("bottom_recess_out",
               (f["recess_z_mm"], b["chamfer_outer_r_out_mm"]),
               fl["bottom_recess_out"], "bottom_out"),
        Corner("foot_top", (f["recess_z_mm"], f["ring_r_mm"]), fl["foot_top"], "bottom_out"),
        Corner("foot_bottom",
               (0.0, f["ring_r_mm"] + f["recess_z_mm"] * tan_draft),
               fl["foot_bottom"], "bottom_out"),
        Corner("bottom_edge", (0.0, g["cone"]["r_bottom_mm"]), 0.0, "wall_out", rows),
        Corner("rim_wall_to_slab", (z_slab, cone_r_out(params, z_slab)),
               fl["rim_wall_to_slab"], "rim"),
        Corner("rim_slab_to_lip", (z_slab, lip_inner_r(z_slab)), fl["rim_slab_to_lip"], "rim"),
        Corner("lip_inner_bottom", (z_dmax, lip_inner_r(z_dmax)), 0.0, "rim"),
        Corner("lip_outer_bottom", (z_dmax, r_dmax), 0.0, "rim"),
        Corner("rim_top_outer", (height, r_dmax - r["d_max_below_top_mm"] * tan_lip),
               fl["rim_top_outer"], "rim"),
        Corner("rim_top_inner", (height, cone_r_in(params, height)),
               fl["rim_top_inner"], "wall_in", rows),
    ]


def inner_corners(params: dict) -> List[Corner]:
    """Внутренний обвод: вниз по борту, пол, ступень, поясок литника.

    Уступа-кольца здесь нет. В SECTION C-C он есть только потому, что плоскость
    разреза проходит через два из четырёх рёбер: в виде сверху радиусы
    26.26 / 26.95 / 27.65 / 28.52 присутствуют лишь на четырёх азимутах, а
    сплошными по всем 360 градусам идут только 27.765 и 28.064 — касательные
    скругления R0.30 между полом и внутренним конусом. Рёбра строит
    rib_section() и build.py ставит их отдельными телами.
    """
    g = params["geometry"]
    b, fl = g["bottom"], g["fillets"]
    tan_ch1 = math.tan(math.radians(b["chamfer_outer_deg"]))
    tan_ch2 = math.tan(math.radians(b["chamfer_gate_deg"]))
    z_floor = b["floor_z_mm"]

    return [
        Corner("floor_outer", (z_floor, cone_r_in(params, z_floor)),
               fl["floor_outer"], "bottom_in"),
        Corner("floor_step_in", (z_floor, b["chamfer_outer_r_in_mm"]),
               fl["floor_step_in"], "bottom_in"),
        Corner("bottom_step_in",
               (b["step_z_in_mm"],
                b["chamfer_outer_r_in_mm"] - (b["step_z_in_mm"] - z_floor) * tan_ch1),
               fl["bottom_step_in"], "bottom_in"),
        Corner("bottom_gate_chamfer_in",
               (b["step_z_in_mm"],
                b["gate_chamfer_r_mm"] + (b["gate_land_z_mm"] - b["step_z_in_mm"]) * tan_ch2),
               fl["bottom_gate_chamfer_in"], "bottom_in"),
        Corner("gate_land", (b["gate_land_z_mm"], b["gate_chamfer_r_mm"]),
               fl["gate_land"], "bottom_in"),
        Corner("gate_land_inner", (b["gate_land_z_mm"], b["gate_land_r_mm"]),
               0.0, "bottom_in"),
    ]


def rib_section(params: dict) -> List[Point]:
    """Замкнутое сечение одного рёбра расстыковки в плоскости (z, r), мм.

    Ребро заполняет объём между общей внутренней поверхностью (конус + R0.30 +
    пол) и своей поверхностью, смещённой внутрь от наружного конуса на
    ribs.offset_from_outer_mm, с горизонтальной полкой на ribs.top_z_mm.
    Ровно это и попало в SECTION C-C.
    """
    g = params["geometry"]
    rb, fl = g["ribs"], g["fillets"]
    beta = cone_half_angle(params)
    z_floor = g["bottom"]["floor_z_mm"]
    z_top = rb["top_z_mm"]
    off = rb["offset_from_outer_mm"] / math.cos(beta)
    seg = int(params["mesh"]["arc_segments"])

    d_floor = (0.0, 1.0)
    d_wall = (math.cos(beta), math.sin(beta))

    def r_rib(z):
        return cone_r_out(params, z) - off

    p1_gen, p2_gen, arc_gen = _fillet_arc((z_floor, cone_r_in(params, z_floor)),
                                          d_floor, d_wall, fl["floor_outer"], seg)
    p1_base, p2_base, arc_base = _fillet_arc((z_floor, r_rib(z_floor)),
                                             d_floor, d_wall, fl["rib_base"], seg)
    p1_top, p2_top, arc_top = _fillet_arc((z_top, r_rib(z_top)),
                                          d_wall, (0.0, 1.0), fl["rib_top"], seg)

    poly: List[Point] = [(z_floor, p1_base[1])]          # пол, край ребра
    poly.append((z_floor, p1_gen[1]))                    # пол, край общей поверхности
    poly += arc_gen                                      # R0.30 на конус
    poly.append((z_top, cone_r_in(params, z_top)))       # вверх по конусу до полки
    poly.append(p2_top)                                  # полка внутрь до касательной
    poly += list(reversed(arc_top))                      # R0.70 вниз на конус ребра
    poly.append(p2_base)                                 # вниз по конусу ребра
    poly += list(reversed(arc_base))                     # R0.30 обратно на пол
    return poly


def rib_width_at(params: dict, z: float) -> float:
    """Тангенциальная ширина ребра на высоте z: 0.64 у пола -> 0.46 у полки."""
    rb = params["geometry"]["ribs"]
    z0 = params["geometry"]["bottom"]["floor_z_mm"]
    z1 = rb["top_z_mm"]
    t = 0.0 if z1 <= z0 else max(0.0, min(1.0, (z - z0) / (z1 - z0)))
    return rb["width_base_mm"] + (rb["width_top_mm"] - rb["width_base_mm"]) * t


def _fillet_arc(corner: Point, d_in: Point, d_out: Point, radius: float,
                segments: int):
    """Касательная дуга в углу: (точка входа, точка выхода, точки дуги)."""
    turn = _angle_between(d_in, d_out)
    t = radius * math.tan(turn / 2.0)
    p1 = (corner[0] - d_in[0] * t, corner[1] - d_in[1] * t)
    p2 = (corner[0] + d_out[0] * t, corner[1] + d_out[1] * t)
    cross = d_in[0] * d_out[1] - d_in[1] * d_out[0]
    side = 1.0 if cross > 0.0 else -1.0
    normal = (-d_in[1] * side, d_in[0] * side)
    centre = (p1[0] + normal[0] * radius, p1[1] + normal[1] * radius)
    a1 = math.atan2(p1[1] - centre[1], p1[0] - centre[0])
    pts = [(centre[0] + radius * math.cos(a1 + side * turn * k / segments),
            centre[1] + radius * math.sin(a1 + side * turn * k / segments))
           for k in range(segments + 1)]
    pts[0], pts[-1] = p1, p2
    return p1, p2, pts


def _all_corners(params: dict) -> List[Corner]:
    return outer_corners(params) + inner_corners(params)


# ---------------------------------------------------------------------------
# векторная мелочь
# ---------------------------------------------------------------------------

def _sub(a: Point, b: Point) -> Point:
    return (a[0] - b[0], a[1] - b[1])


def _add(a: Point, b: Point) -> Point:
    return (a[0] + b[0], a[1] + b[1])


def _mul(a: Point, k: float) -> Point:
    return (a[0] * k, a[1] * k)


def _dist(a: Point, b: Point) -> float:
    return math.hypot(a[0] - b[0], a[1] - b[1])


def _unit(a: Point) -> Point:
    n = math.hypot(a[0], a[1])
    if n == 0.0:
        return (0.0, 0.0)
    return (a[0] / n, a[1] / n)


def _angle_between(a: Point, b: Point) -> float:
    dot = max(-1.0, min(1.0, a[0] * b[0] + a[1] * b[1]))
    return math.acos(dot)


# ---------------------------------------------------------------------------
# профиль
# ---------------------------------------------------------------------------

@dataclass
class Profile:
    points: List[Point]
    tags: List[str]
    corners: Dict[str, Point] = field(default_factory=dict)
    tangent_in: Dict[str, int] = field(default_factory=dict)
    tangent_out: Dict[str, int] = field(default_factory=dict)

    def index_of_tag_run(self, tag: str) -> Tuple[int, int]:
        idx = [i for i, t in enumerate(self.tags) if t == tag]
        return (idx[0], idx[-1]) if idx else (-1, -1)


def _subdivide(a: Point, b: Point, rows: int) -> List[Point]:
    """Точки строго между a и b, плюс b. Первую точку (a) не повторяем."""
    return [(a[0] + (b[0] - a[0]) * i / rows, a[1] + (b[1] - a[1]) * i / rows)
            for i in range(1, rows + 1)]


def build_profile(params: dict) -> Profile:
    """Замкнутый контур половины сечения. Единицы — миллиметры."""
    corners = _all_corners(params)
    arc_seg = int(params["mesh"]["arc_segments"])

    pts: List[Point] = [corners[0].p]
    tags: List[str] = [corners[0].tag]
    marks_c: Dict[str, Point] = {c.name: c.p for c in corners}
    t_in: Dict[str, int] = {}
    t_out: Dict[str, int] = {}

    for i in range(1, len(corners)):
        c = corners[i]
        prev = corners[i - 1]
        seg_tag = prev.tag
        rows = max(1, int(prev.rows))

        if i == len(corners) - 1 or c.radius <= 0.0:
            target = c.p
            for p in _subdivide(pts[-1], target, rows):
                pts.append(p)
                tags.append(seg_tag)
            # острый угол принадлежит и следующему участку: тег берём исходящий,
            # иначе первая точка длинного борта осталась бы в теге дна
            tags[-1] = c.tag
            t_in[c.name] = len(pts) - 1
            t_out[c.name] = len(pts) - 1
            continue

        nxt = corners[i + 1]
        d_in = _unit(_sub(c.p, prev.p))
        d_out = _unit(_sub(nxt.p, c.p))
        turn = _angle_between(d_in, d_out)
        tangent = c.radius * math.tan(turn / 2.0)

        p1 = _add(c.p, _mul(d_in, -tangent))
        p2 = _add(c.p, _mul(d_out, tangent))

        for p in _subdivide(pts[-1], p1, rows):
            pts.append(p)
            tags.append(seg_tag)
        t_in[c.name] = len(pts) - 1

        arc_tag = seg_tag if seg_tag == "rim" else c.tag
        cross = d_in[0] * d_out[1] - d_in[1] * d_out[0]
        side = 1.0 if cross > 0.0 else -1.0
        normal = (-d_in[1] * side, d_in[0] * side)
        centre = _add(p1, _mul(normal, c.radius))
        a1 = math.atan2(p1[1] - centre[1], p1[0] - centre[0])
        sweep = side * turn
        for k in range(1, arc_seg + 1):
            a = a1 + sweep * k / arc_seg
            pts.append((centre[0] + c.radius * math.cos(a),
                        centre[1] + c.radius * math.sin(a)))
            tags.append(arc_tag)
        pts[-1] = p2                      # снять накопленную ошибку в точке касания
        t_out[c.name] = len(pts) - 1

    # купол литника R5.5 от пояска D5.00 до оси
    b = params["geometry"]["bottom"]
    dome_r = b["gate_dome_r_mm"]
    land_r = b["gate_land_r_mm"]
    land_z = b["gate_land_z_mm"]
    z_centre = land_z - math.sqrt(dome_r * dome_r - land_r * land_r)
    a_start = math.atan2(land_r, land_z - z_centre)
    n_dome = max(arc_seg * 2, 8)
    for k in range(1, n_dome + 1):
        a = a_start * (1.0 - k / n_dome)
        pts.append((z_centre + dome_r * math.cos(a), dome_r * math.sin(a)))
        tags.append("bottom_in")
    pts[-1] = (z_centre + dome_r, 0.0)
    marks_c["gate_dome_apex"] = pts[-1]

    return Profile(points=pts, tags=tags, corners=marks_c,
                   tangent_in=t_in, tangent_out=t_out)


def corner_at(prof: Profile, name: str) -> Point:
    if name not in prof.corners:
        raise KeyError(f"нет угла с именем {name!r}")
    return prof.corners[name]


# ---------------------------------------------------------------------------
# замеры по контуру
# ---------------------------------------------------------------------------

def polygon_area(points: Sequence[Point]) -> float:
    """Площадь замкнутого контура (замыкание неявное), мм^2."""
    s = 0.0
    n = len(points)
    for i in range(n):
        z0, r0 = points[i]
        z1, r1 = points[(i + 1) % n]
        s += z0 * r1 - z1 * r0
    return abs(s) / 2.0


def revolve_volume(points: Sequence[Point]) -> float:
    """Объём тела вращения замкнутого контура вокруг оси r=0, мм^3."""
    return abs(_revolve_signed(points, None))


def _revolve_signed(points: Sequence[Point], z_max: Optional[float]) -> float:
    """pi * integral r^2 dz по замкнутому контуру, при z_max — только часть z<=z_max.

    Горизонтальные «крышки» дают dz=0 и в интеграл не входят, поэтому обрезка
    плоскостью не требует явного достраивания крышки.
    """
    total = 0.0
    n = len(points)
    for i in range(n):
        z0, r0 = points[i]
        z1, r1 = points[(i + 1) % n]
        if z1 == z0:
            continue
        t_lo, t_hi = 0.0, 1.0
        if z_max is not None:
            t_cut = (z_max - z0) / (z1 - z0)
            if z1 > z0:
                t_hi = min(t_hi, t_cut)
            else:
                t_lo = max(t_lo, t_cut)
            if t_hi <= t_lo:
                continue
        ra = r0 + t_lo * (r1 - r0)
        rb = r0 + t_hi * (r1 - r0)
        total += (ra * ra + ra * rb + rb * rb) / 3.0 * ((t_hi - t_lo) * (z1 - z0))
    return math.pi * total


def contour_radii_at(prof: Profile, z: float) -> List[float]:
    """Радиусы пересечений контура горизонталью z, по возрастанию."""
    out: List[float] = []
    pts = prof.points
    n = len(pts)
    for i in range(n):
        z0, r0 = pts[i]
        z1, r1 = pts[(i + 1) % n]
        if z0 == z1:
            continue
        if (z0 - z) * (z1 - z) < 0.0:
            out.append(r0 + (r1 - r0) * (z - z0) / (z1 - z0))
    return sorted(out)


def _point_segment_distance(p: Point, a: Point, b: Point) -> float:
    az, ar = a
    bz, br = b
    dz, dr = bz - az, br - ar
    denom = dz * dz + dr * dr
    if denom == 0.0:
        return _dist(p, a)
    t = ((p[0] - az) * dz + (p[1] - ar) * dr) / denom
    t = max(0.0, min(1.0, t))
    return math.hypot(p[0] - (az + t * dz), p[1] - (ar + t * dr))


def wall_thickness_range(prof: Profile) -> Tuple[float, float]:
    """Мин. и макс. толщина конического борта: расстояние от каждой точки
    внутреннего борта до ломаной наружного борта."""
    outer = [p for p, t in zip(prof.points, prof.tags) if t == "wall_out"]
    inner = [p for p, t in zip(prof.points, prof.tags) if t == "wall_in"]
    if len(outer) < 2 or not inner:
        raise ValueError("в профиле нет размеченного борта")
    values = [min(_point_segment_distance(p, a, b) for a, b in zip(outer, outer[1:]))
              for p in inner]
    return min(values), max(values)


def inner_surface(params: dict, prof: Profile) -> List[Point]:
    """Ломаная внутренней поверхности от плоскости кромки до вершины купола."""
    start = prof.tangent_in["rim_top_inner"]
    return prof.points[start:]


def _inner_closed(params: dict, prof: Profile) -> List[Point]:
    height = params["geometry"]["height_mm"]
    return inner_surface(params, prof) + [(height, 0.0)]


def brim_volume(params: dict, prof: Profile) -> float:
    """Внутренний объём до плоскости кромки, мм^3."""
    return abs(_revolve_signed(_inner_closed(params, prof), None))


def volume_to_level(params: dict, prof: Profile, z: float) -> float:
    """Внутренний объём до уровня z, мм^3."""
    return abs(_revolve_signed(_inner_closed(params, prof), z))


def fill_level_for_volume(params: dict, prof: Profile, target_mm3: float) -> float:
    """Высота, на которой внутренний объём равен target_mm3."""
    lo = 0.0
    hi = params["geometry"]["height_mm"]
    for _ in range(80):
        mid = (lo + hi) / 2.0
        if volume_to_level(params, prof, mid) < target_mm3:
            lo = mid
        else:
            hi = mid
    return (lo + hi) / 2.0


def material_volume(prof: Profile) -> float:
    """Объём материала детали, мм^3."""
    return revolve_volume(prof.points)


def mass_g(params: dict, prof: Profile) -> float:
    return material_volume(prof) / 1000.0 * params["material"]["density_g_cm3"]


def uv_band(params: dict, name: Optional[str] = None) -> Tuple[float, float, float, float]:
    """(z_lo, z_hi, r_lo, r_hi) выбранного печатного пояса наружного конуса."""
    name = name or params["uv"]["band"]
    z_lo, z_hi = params["uv"]["bands"][name]
    return z_lo, z_hi, cone_r_out(params, z_lo), cone_r_out(params, z_hi)

def triangulate_polygon(points: Sequence[Point]) -> List[Tuple[int, int, int]]:
    """Триангуляция простого многоугольника отсечением ушей.

    Нужна торцам рёбер: их контур невыпуклый, наивный веер дал бы вывернутые
    треугольники. Возвращает индексы в исходном списке точек. Сумма площадей
    треугольников равна площади многоугольника — это проверяется тестом.
    """
    n = len(points)
    if n < 3:
        return []

    def cross(o, a, b):
        return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])

    signed = sum(points[i][0] * points[(i + 1) % n][1]
                 - points[(i + 1) % n][0] * points[i][1] for i in range(n))
    idx = list(range(n))
    if signed < 0.0:
        idx.reverse()

    eps = 1e-12

    def strictly_inside(p, a, b, c):
        return (cross(a, b, p) > eps and cross(b, c, p) > eps
                and cross(c, a, p) > eps)

    tris: List[Tuple[int, int, int]] = []
    while len(idx) > 3:
        best = None
        for k in range(len(idx)):
            i0, i1, i2 = idx[k - 1], idx[k], idx[(k + 1) % len(idx)]
            a, b, c = points[i0], points[i1], points[i2]
            area2 = cross(a, b, c)
            if area2 <= eps:
                continue
            if any(strictly_inside(points[j], a, b, c)
                   for j in idx if j not in (i0, i1, i2)):
                continue
            tris.append((i0, i1, i2))
            idx.pop(k)
            best = k
            break
        if best is None:
            # вырожденная вершина: убираем самую «плоскую», чтобы не зациклиться
            k = min(range(len(idx)),
                    key=lambda k: abs(cross(points[idx[k - 1]], points[idx[k]],
                                            points[idx[(k + 1) % len(idx)]])))
            idx.pop(k)
            if len(idx) < 3:
                break
    if len(idx) == 3:
        tris.append((idx[0], idx[1], idx[2]))
    return tris


def rib_volume(params: dict) -> float:
    """Объём всех рёбер, мм^3: площадь сечения с весом тангенциальной ширины."""
    sec = rib_section(params)
    tris = triangulate_polygon(sec)
    total = 0.0
    for i, j, k in tris:
        a, b, c = sec[i], sec[j], sec[k]
        area = abs((b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0])) / 2.0
        z_mid = (a[0] + b[0] + c[0]) / 3.0
        total += area * rib_width_at(params, z_mid)
    return total * int(params["geometry"]["ribs"]["count"])


def marking_loops(params: dict) -> List[List[Point]]:
    """Замкнутые петли клейма из отдельного файла данных."""
    path = params["marking"]["source"]
    if not os.path.isabs(path):
        base = params.get("_config_dir")
        if base:
            # конфиг лежит в <проект>/params, клеймо задаётся от корня проекта
            candidate = os.path.join(os.path.dirname(base), path)
            if os.path.isfile(candidate):
                path = candidate
        if not os.path.isabs(path):
            path = os.path.join(
                os.path.dirname(os.path.dirname(os.path.abspath(__file__))), path)
    if not os.path.isfile(path):
        return []
    with open(path, "r", encoding="utf-8") as fh:
        return [[tuple(p) for p in loop] for loop in json.load(fh)["loops"]]


def marking_area(params: dict, samples: int = 2000) -> float:
    """Площадь знаков клейма по правилу чётности, мм^2 (численно, по строкам)."""
    loops = marking_loops(params)
    if not loops:
        return 0.0
    edges = [(a, b) for loop in loops for a, b in zip(loop, loop[1:] + loop[:1])]
    ys = [p[1] for loop in loops for p in loop]
    y0, y1 = min(ys), max(ys)
    step = (y1 - y0) / samples
    total = 0.0
    for k in range(samples):
        y = y0 + (k + 0.5) * step
        xs = sorted(a[0] + (y - a[1]) * (b[0] - a[0]) / (b[1] - a[1])
                    for a, b in edges if (a[1] > y) != (b[1] > y))
        total += sum(xs[i + 1] - xs[i] for i in range(0, len(xs) - 1, 2)) * step
    return total


def marking_volume(params: dict) -> float:
    """Объём выпуклого рельефа клейма, мм^3."""
    if not params["marking"]["enabled"]:
        return 0.0
    return marking_area(params) * params["marking"]["relief_mm"]


def total_material_volume(params: dict, prof: "Profile") -> float:
    """Объём детали целиком: тело вращения + рёбра + рельеф клейма, мм^3."""
    return revolve_volume(prof.points) + rib_volume(params) + marking_volume(params)


def total_mass_g(params: dict, prof: "Profile") -> float:
    return total_material_volume(params, prof) / 1000.0 * params["material"]["density_g_cm3"]

