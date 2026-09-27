"""Компоновка кадра: ракурс, места стаканов, кадр камеры.

Один порядок для всех фонов (blend, greybox, authored). Превью в браузере
(web/preview) повторяет его по scene.json, поэтому шаги здесь такие, какие
можно воспроизвести без Blender:

1. Базовая камера — как её собрал построитель фона. От неё берутся оси
   площадки: x — вправо по кадру, y — вглубь, по полу, в миллиметрах
   натуральной величины; начало — место «героя» сцены (дно главного стакана).
2. Ракурс — облёт базовой камеры вокруг центра эталонного стакана (ключ
   camera_presets в файле фона). Дальше камера не двигается: превью кладёт
   под стаканы снимок фона ровно из этой точки.
3. Места стаканов — из задания (pos_mm) или подбором раскладки (пара, рядом);
   опора и помехи проверяются лучами (group.spot_ok).
4. Кадр — окно на плоскости изображения (bk/frame.py): стакан другого роста и
   пара получают кадр вырезом, как кадрирование фотографии.
"""

import math
from typing import List, Optional, Tuple

import bpy
from mathutils import Matrix, Vector

from bk import frame, group, place

UP = Vector((0.0, 0.0, 1.0))
AWAY = Vector((0.0, 0.0, -1000.0))

# Глубина резкости предметной съёмки (владелец, 2026-09-27: «как фото на проф
# камеру»). Авторские камеры сцен снимали флакон и колонку на f/2.8–3.5: при
# 120 мм с метра резко 1–2 см — меньше стакана, край венчика и бока плыли, и
# кадр читался как макет. Закрыть диафрагму на весь кадр нельзя: резким стал бы
# и фон, а это тоже выдаёт 3D. Предметник снимает стакан со склейкой фокуса —
# здесь так же (bk/stack.py): фон с авторской диафрагмой, стакан — с этой.
# Резкость стакана — от передней стенки до оси (SHARP_DEPTH радиусов верха),
# фокус — посередине.
SHARP_DEPTH = 1.1
REF_TOP_RADIUS = 44.5 / 135.3      # BM90-500: радиус верха в долях роста
COC_36 = 0.00003                  # кружок нерезкости на 36-мм кадре, м
MAX_FSTOP = 16.0
FOCUS_INTO = 0.5                  # фокус — на эту долю радиуса вглубь от стенки


def fit_mode(cfg: dict) -> str:
    """crop — кадр вырезом (по умолчанию, совпадает с превью); dolly — прежний
    подъезд камеры (этапы 1–2), превью с ним не совпадает."""
    return cfg.get("camera_fit_mode", "crop")


def presets(shot: dict) -> List[dict]:
    """Ракурсы фона. Первый — кадр фона как он есть."""
    return shot.get("camera_presets") or [{"id": "front", "label": "Как в сцене"}]


def pick_preset(cfg: dict, shot: dict, name: str) -> dict:
    want = cfg.get("_camera")
    ps = presets(shot)
    if not want:
        return ps[0]
    for p in ps:
        if p["id"] == want:
            return p
    raise place.ConfigError(f"{name}: ракурса {want!r} нет; есть {', '.join(p['id'] for p in ps)}")


def _update(scene) -> None:
    with bpy.context.temp_override(scene=scene, view_layer=scene.view_layers[0]):
        bpy.context.view_layer.update()


def run(scene, cam, cups: List[dict], cfg: dict, shot: dict, name: str, st: dict) -> dict:
    """Скомпоновать кадр. st — что знает построитель фона:

    origin   — дно главного стакана в мире (место героя), Vector;
    scale    — единиц сцены в метре;
    holder   — чем двигать главный стакан (пустышка сцены или сам стакан);
    rotation_deg — поворот стакана в сцене (второй получает такой же);
    href     — рост эталонного стакана, м;
    focus    — keep (авторский фокус, пока стакан эталонный и на месте),
               cup (на переднюю стенку), centre (на ось на 0,52 роста), None.
    """
    _update(scene)
    if cam.animation_data:
        cam.animation_data_clear()
    right, fwd = group.floor_axes(cam)
    origin = st["origin"].copy()
    s = st["scale"]
    mm = 0.001 * s
    href = st["href"]

    preset = pick_preset(cfg, shot, name)
    orbit = preset.get("orbit") or (0.0, 0.0)
    if any(orbit):
        place.orbit_camera(cam, origin + UP * href * s * 0.5, orbit[0], orbit[1])
        _update(scene)

    base = frame.window_of(scene, cam)
    aperture = product_aperture(cam, origin + UP * href * s * 0.5, href * s, shot)
    area = frame.backdrop_window(base)
    frame_id = cfg.get("_frame") or "1:1"
    aspect = frame.aspect_of(frame_id)
    long_side = max(scene.render.resolution_x, scene.render.resolution_y)
    cam_inv = cam.matrix_world.inverted()

    def tan_box(b: Vector, c: dict):
        pts = frame.cup_points(tuple(b), c["r_bot"] * s, c["r_top"] * s, c["height"] * s)
        return frame.box(frame.to_tan(cam_inv, Vector(p)) for p in pts)

    def at(pos_mm) -> Vector:
        return origin + (right * pos_mm[0] + fwd * pos_mm[1]) * mm

    hero = cups[0]
    # Одиночный кадр главного — как если бы он стоял на месте героя сцены:
    # от него пара берёт долю высоты и точку кадра.
    hc = frame.to_tan(cam_inv, origin + UP * hero["height"] * s * 0.5)
    rc = frame.to_tan(cam_inv, origin + UP * href * s * 0.5)
    hero_box0 = tan_box(origin, hero)
    single = frame.single(base, rc, hc, hero["height"] / href, aspect, hero_box0)

    def window_for(placed) -> Tuple[frame.Window, Optional[frame.Window]]:
        g = None
        for c, b in placed:
            bb = tan_box(b, c)
            g = bb if g is None else frame.union(g, bb)
        if len(placed) == 1 and (placed[0][1] - origin).length < 1e-9:
            win = single
        else:
            win = frame.group(single, hero_box0, g, aspect)
        return win, frame.fit_into(win, area)

    holder = st["holder"]
    home = holder.location.copy()
    hero_objs = [c["obj"] for c in cups]

    def put_hero(b: Vector) -> None:
        holder.location = home + (b - origin)

    hero_pos = list(hero["spec"].get("pos_mm") or (0.0, 0.0))
    hero_base = at(hero_pos)
    warns = []
    if any(hero_pos):
        holder.location = home + AWAY
        _update(scene)
        ok, why, floor = group.spot_ok(scene, hero_base, hero["r_bot"] * s, hero["r_top"] * s,
                                       hero["height"] * s, hero_objs, allow_step=True)
        if ok:
            hero_base.z = floor
        else:
            warns.append(f"главный стакан в {hero_pos} мм: {why}")
    put_hero(hero_base)

    pair = None
    placed = [(hero, hero_base)]
    if len(cups) > 1:
        pair, placed = _second(scene, cups, cfg, st, at, put_hero, hero_base, tan_box, window_for, warns)
    _update(scene)

    win, fitted = window_for(placed)
    if fitted is None:
        warns.append(f"кадр шире снимка фона для превью (×{frame.zoom_of(win, base):.2f}); "
                     f"рендер верный, превью покажет край серым")
    final = fitted or win
    res = frame.set_window(scene, cam, final, long_side)
    _update(scene)

    focus = _focus(cam, cups, placed, s, st, preset, pair)
    stack = _stack_plan(cam, placed, s, final, tan_box, aperture)
    for w in warns:
        place._warn(w)
    return {
        "preset": preset["id"],
        "orbit_deg": list(orbit),
        "frame": frame_id,
        "window": frame.rounded(final),
        "base_window": frame.rounded(base),
        "backdrop_window": frame.rounded(area),
        "zoom": round(frame.zoom_of(final, base), 4),
        "inside_backdrop": fitted is not None,
        "resolution": list(res),
        "stage": {"origin": [round(v, 6) for v in origin], "right": [round(v, 6) for v in right],
                  "fwd": [round(v, 6) for v in fwd], "units_per_m": round(s, 6)},
        "positions": [{"id": c["entry"]["key"], "pos_mm": _mm(b, origin, right, fwd, mm),
                       "floor_mm": round((b.z - origin.z) / mm, 1)} for c, b in placed],
        "group": pair,
        "focus": focus,
        "stack": stack,
    }


def product_aperture(cam, centre: Vector, href: float, shot: dict) -> Optional[dict]:
    """Диафрагма «весь стакан резкий» — по эталону и камере ракурса, до
    кадрирования (зрачок потом держит frame.set_window). Камеру не трогает:
    выгрузка превью (tools/export_preview.py) идёт тем же путём, и снимок фона
    остаётся с авторской диафрагмой. Фон с "product_dof": false — как у автора."""
    d = cam.data
    if not d.dof.use_dof or not shot.get("product_dof", True):
        return None
    dist = (cam.matrix_world.translation - centre).length
    depth = SHARP_DEPTH * REF_TOP_RADIUS * href
    f = d.lens / 1000.0
    coc = COC_36 * d.sensor_width / 36.0
    need = depth * f * f / (2 * coc * dist * dist) if dist > 0 else 0.0
    return {"scene": d.dof.aperture_fstop, "product": min(MAX_FSTOP, max(d.dof.aperture_fstop, need)), "lens": d.lens}


def _stack_plan(cam, placed, s, win, tan_box, aperture) -> Optional[dict]:
    """Что нужно склейке фокуса (bk/stack.py): стаканы, их рамка в кадре,
    диафрагма и фокус стакана. Камеру оставляет как была."""
    if aperture is None:
        return None
    d = cam.data
    # Кадрирование держало зрачок: диафрагмы — под нынешнее фокусное.
    zoom = d.lens / aperture["lens"]
    hero, hb = placed[0]
    saved = (d.dof.focus_object, d.dof.focus_distance)
    wall = place.focus_on_cup(cam, hero["obj"], hb.z + hero["height"] * s * 0.45)
    d.dof.focus_object, d.dof.focus_distance = saved
    box = None
    for c, b in placed:
        bb = tan_box(b, c)
        box = bb if box is None else frame.union(box, bb)
    x0, x1, y0, y1 = win
    pad = 0.03
    border = [max(0.0, (box[0] - x0) / (x1 - x0) - pad), max(0.0, (box[2] - y0) / (y1 - y0) - pad),
              min(1.0, (box[1] - x0) / (x1 - x0) + pad), min(1.0, (box[3] - y0) / (y1 - y0) + pad)]
    return {
        "cups": [c["obj"].name for c, _b in placed],
        # Склейка — только у непрозрачных: сквозь PET и PP фон во втором проходе
        # вышел бы резким, а в жизни он размыт объективом и сквозь стенку.
        "opaque": all(c["entry"].get("type") == "paper" for c, _b in placed),
        "fstop_scene": round(aperture["scene"] * zoom, 3),
        "fstop_product": round(aperture["product"] * zoom, 3),
        "focus_product": round(wall + FOCUS_INTO * hero["r_top"] * s, 4),
        "border": [round(v, 4) for v in border],
    }


def _mm(b: Vector, origin: Vector, right: Vector, fwd: Vector, mm: float) -> List[float]:
    d = b - origin
    return [round(d.dot(right) / mm, 1), round(d.dot(fwd) / mm, 1)]


def _second(scene, cups, cfg, st, at, put_hero, hero_base, tan_box, window_for, warns):
    """Второй стакан: на место из задания или подбором раскладки."""
    hero, second = cups[0], cups[1]
    s = st["scale"]
    pivot = bpy.data.objects.new(place.PREFIX + "Pivot2", None)
    hero["obj"].users_collection[0].objects.link(pivot)
    pivot.rotation_euler = tuple(math.radians(a) for a in st.get("rotation_deg", (0.0, 0.0, 0.0)))
    pivot.scale = (s, s, s)
    ob = second["obj"]
    ob.parent = pivot
    ob.matrix_parent_inverse = Matrix.Identity(4)
    ob.location = (0.0, 0.0, 0.0)
    objs = [hero["obj"], ob]
    layout = cfg.get("_layout") or "pair"

    def put(h: Vector, b: Vector, floor: float) -> Vector:
        put_hero(h)
        pivot.location = Vector((b.x, b.y, b.z))
        group._settle(scene, pivot, ob, floor)
        return Vector((b.x, b.y, floor))

    def check(b: Vector, cup: dict, allow_step: bool):
        return group.spot_ok(scene, b, cup["r_bot"] * s, cup["r_top"] * s, cup["height"] * s, objs, allow_step)

    pos = second["spec"].get("pos_mm")
    if pos is not None or layout == "free":
        if pos is None:
            raise place.ConfigError("раскладка free: у второго стакана нужен pos_mm")
        b = at(pos)
        pivot.location = b + AWAY
        _update(scene)
        ok, why, floor = check(b, second, True)
        if not ok:
            warns.append(f"второй стакан в {list(pos)} мм: {why}")
            floor = b.z
        sb = put(hero_base, b, floor)
        rec = {"pos_mm": [round(v, 1) for v in pos], "hero_shift_mm": [0.0, 0.0],
               "step_mm": round((hero_base.z - floor) / (0.001 * s), 1), "zoom": None}
        return {"layout": "free", "second": rec, "rejected": [], "focus": None}, \
            [(hero, hero_base), (second, sb)]

    tried, best = [], None
    for allow_step in (False, True):
        for (hx, hy), (sx, sy) in group.candidates(layout, hero, second, second["spec"]):
            hb, b = at((hx, hy)), at((sx, sy))
            # оба стакана убраны, пока лучи проверяют места
            put_hero(hero_base + AWAY)
            pivot.location = b + AWAY
            _update(scene)
            ok, why, _f = (check(hb, hero, False) if (hx or hy) else (True, "", hb.z))
            if not ok:
                why = "главному: " + why
            floor = b.z
            if ok:
                ok, why, floor = check(b, second, allow_step)
            if not ok:
                if not allow_step:
                    tried.append({"pos_mm": [round(sx), round(sy)], "hero_mm": [round(hx), round(hy)], "why": why})
                continue
            sb = put(hb, b, floor)
            win, fitted = window_for([(hero, hb), (second, sb)])
            rec = {"pos_mm": [round(sx, 1), round(sy, 1)], "hero_shift_mm": [round(hx, 1), round(hy, 1)],
                   "step_mm": round((hb.z - floor) / (0.001 * s), 1),
                   "zoom": round(frame.size(win)[1] / frame.size(window_for([(hero, hero_base)])[0])[1], 3)}
            if fitted is not None:
                return {"layout": layout, "second": rec, "rejected": tried, "focus": None}, \
                    [(hero, hb), (second, sb)]
            tried.append({"pos_mm": rec["pos_mm"], "hero_mm": rec["hero_shift_mm"],
                          "why": f"кадр вышел бы за снимок фона (×{rec['zoom']})"})
            if best is None or rec["zoom"] < best[0]["zoom"]:
                best = (dict(rec, fallback=True), hb, b, floor)
    if best is None:
        raise place.ConfigError("второму стакану нет места в этой сцене: " +
                                "; ".join(sorted({t["why"] for t in tried})))
    rec, hb, b, floor = best
    sb = put(hb, b, floor)
    warns.append(f"второй стакан: кадр шире снимка фона (×{rec['zoom']}) — сцена тесновата для пары")
    return {"layout": layout, "second": rec, "rejected": tried, "focus": None}, [(hero, hb), (second, sb)]


def _focus(cam, cups, placed, s, st, preset, pair) -> Optional[dict]:
    """Фокус: авторский, пока главный — эталон на своём месте; иначе на стакан."""
    d = cam.data
    if not d.dof.use_dof or st.get("focus") is None:
        return None
    hero, hb = placed[0]
    z_hero = hb.z + hero["height"] * s * 0.45
    if len(placed) > 1:
        second, sb = placed[1]
        f = group.focus_pair(cam, hero["obj"], second["obj"], z_hero, sb.z + second["height"] * s * 0.45)
        if pair is not None:
            pair["focus"] = f
        return f
    moved = (hb - st["origin"]).length > 1e-9
    if st["focus"] == "centre":
        d.dof.focus_object = None
        d.dof.focus_distance = (cam.matrix_world.translation - (hb + UP * hero["height"] * s * 0.52)).length
        return {"focus_m": round(d.dof.focus_distance, 4), "fstop": round(d.dof.aperture_fstop, 2)}
    if st["focus"] == "cup" or moved or abs(hero["height"] - st["href"]) > 1e-6:
        dist = place.focus_on_cup(cam, hero["obj"], z_hero)
        pull = st.get("focus_pull", 0.0)
        if pull:
            # Сцена в фокусе ближе стакана (сам он резкий склейкой фокуса,
            # bk/stack.py): передний план резкий, дальний — в боке, как в
            # референсе парка (передний лист резкий, капли на спинке — кружки).
            d.dof.focus_distance = max(0.05, dist - pull)
            return {"focus_m": round(d.dof.focus_distance, 4), "fstop": round(d.dof.aperture_fstop, 2),
                    "pull_m": pull}
        return {"focus_m": dist, "fstop": round(d.dof.aperture_fstop, 2)}
    return {"focus_m": round(d.dof.focus_distance, 4), "fstop": round(d.dof.aperture_fstop, 2), "kept": True}
