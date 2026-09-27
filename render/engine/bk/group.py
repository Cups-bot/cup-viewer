"""Два стакана в кадре: кто где стоит, на что опирается, как их видит камера.

Первый стакан — главный: его ставит сцена, как и раньше, на нём фокус. Второй
ставится относительно него в осях камеры на полу: x — вправо по кадру, y —
вглубь, в миллиметрах натуральной величины (в сцене с масштабом — умножаются
на масштаб сцены).

Раскладки (стаканы в одну линию — решение владельца 2026-09-25):
  pair — пара: тот же стакан, развёрнутый на 150°, рядом с главным — видна
         другая сторона дизайна;
  side — рядом: другой стакан (обычно соседний объём);
  free — точное место из задания (pos_mm).

Для pair и side пробуются несколько мест по очереди. Место годится, если под
всем дном второго стакана есть опора на уровне пола главного (не край стола),
над его следом нет помех (лампа, стена, декор) и после подстройки камеры
группа помещается в кадр без слишком большого отъезда.
"""

import copy
import math
from contextlib import contextmanager
from typing import Dict, List, Optional, Sequence, Tuple

import bpy
from mathutils import Matrix, Vector

from bk import place

GAP_MM = 3.0            # зазор между стенками по ТЗ
MAX_DOLLY_OUT = 1.8     # камера может отъехать от одиночного кадра не больше чем в 1,8 раза
SAFE_W = 0.86           # доля ширины кадра, в которую должна влезть группа
CIRCLE_OF_CONFUSION_M = 0.00003


# ---------------------------------------------------------------------------
# задание: какие стаканы
# ---------------------------------------------------------------------------

def specs(cfg: dict) -> List[dict]:
    """Список стаканов задания; одиночный кадр — список из одного."""
    if cfg.get("_cups"):
        return cfg["_cups"]
    return [{"id": cfg.get("cup_key"), "variant": cfg.get("cup_variant"), "board": cfg.get("_board"),
             "art": cfg.get("_art"), "page": cfg.get("_art_page", 1), "rotate": cfg.get("_rotate_deg", 0.0),
             "print": None if cfg["print"].get("enabled", True) else "none"}]


_KEYS = ("cup_key", "cup_variant", "_board", "_art", "_art_page", "_rotate_deg", "_art_given", "_print_variant")


@contextmanager
def use(cfg: dict, spec: dict):
    """На время импорта одного стакана — его ключи в cfg, как в одиночном кадре."""
    saved = {k: cfg.get(k) for k in _KEYS}
    # Глубокая копия: макет PP кладётся во вложенный блок режима печати.
    saved_print = copy.deepcopy(cfg["print"])
    cfg["cup_key"] = spec.get("id") or cfg.get("cup_key")
    cfg["cup_variant"] = spec.get("variant")
    cfg["_board"] = spec.get("board")
    cfg["_art"] = spec.get("art")
    cfg["_art_page"] = spec.get("page", 1)
    cfg["_rotate_deg"] = spec.get("rotate", 0.0)
    # Макет стакана из задания. Бумага берёт его из _art, литой PP — из блока
    # режима печати, как при --art: без этого PP в задании печатал калибровку.
    if spec.get("art"):
        cfg["print"].setdefault(cfg["print"].get("mode", "rect"), {})["image"] = spec["art"]
        cfg["_art_given"] = True
    if spec.get("print") == "none":
        cfg["print"]["enabled"] = False
    # Тампопечать PP: лист сторон от сайта ложится на полосу зоны (place.rect_fit).
    cfg["_print_variant"] = "pad" if spec.get("print") == "pad" else None
    try:
        yield
    finally:
        for k, v in saved.items():
            cfg[k] = v
        cfg["print"].clear()
        cfg["print"].update(saved_print)


def _radii(obj) -> Tuple[float, float]:
    """Радиус по кромке и по дну, в метрах локальных координат стакана."""
    zs = [v.co.z for v in obj.data.vertices]
    z0, z1 = min(zs), max(zs)
    top = max(math.hypot(v.co.x, v.co.y) for v in obj.data.vertices)
    band = [math.hypot(v.co.x, v.co.y) for v in obj.data.vertices if v.co.z < z0 + 0.03 * (z1 - z0)]
    return top, (max(band) if band else top)


def load(cfg: dict, shot: dict, coll) -> List[dict]:
    """Импорт и одевание всех стаканов задания. Первый — главный."""
    cups = []
    for i, spec in enumerate(specs(cfg)):
        with use(cfg, spec):
            obj = place.import_cup(cfg, coll)
            obj.name = place.PREFIX + ("Cup" if i == 0 else f"Cup{i + 1}")
            h = place.local_height(obj)
            printed = place.dress_cup(cfg, shot, obj, h)
            entry = place.resolve_cup(cfg)
        r_top, r_bot = _radii(obj)
        cups.append({"obj": obj, "spec": spec, "entry": entry, "height": h, "printed": printed,
                     "r_top": r_top, "r_bot": r_bot})
    return cups


def check_count(shot_name: str, shot: dict, n: int) -> None:
    limit = int(shot.get("max_cups", 2))
    if n > limit:
        raise place.ConfigError(f"в фоне {shot_name} можно не больше {limit} "
                                f"{'стакана' if limit == 1 else 'стаканов'}; в задании {n}")


# ---------------------------------------------------------------------------
# геометрия на полу
# ---------------------------------------------------------------------------

def floor_axes(cam) -> Tuple[Vector, Vector]:
    """Вправо и вглубь по кадру, спроецированные на пол."""
    fwd = cam.matrix_world.to_quaternion() @ Vector((0.0, 0.0, -1.0))
    fwd.z = 0.0
    fwd.normalize()
    right = Vector((fwd.y, -fwd.x, 0.0))
    return right, fwd


def candidates(layout: str, hero: dict, second: dict, spec: dict):
    """Варианты расстановки, мм (вправо, вглубь): (сдвиг главного, место второго).

    По решению владельца стаканы стоят в одну линию. Сначала пара встаёт по
    центру того места, где стоял один стакан (главный слева, второй справа, и
    наоборот) — сбоку нужно вдвое меньше места. Потом главный остаётся на
    месте, второй — сбоку. Сдвиг вглубь или вперёд — только если в линию не
    встать (край, декор).
    """
    if layout == "free":
        pos = spec.get("pos_mm")
        if not pos:
            raise place.ConfigError("раскладка free: у второго стакана нужен pos_mm")
        return [((0.0, 0.0), tuple(pos))]
    base = (hero["r_top"] + second["r_top"]) * 1000.0 + GAP_MM
    d = base * (1.18 if layout == "pair" else 1.12)
    out = [((-d / 2, 0.0), (d / 2, 0.0)), ((d / 2, 0.0), (-d / 2, 0.0)),
           ((0.0, 0.0), (d, 0.0)), ((0.0, 0.0), (-d, 0.0))]
    for a in (80, -80, 100, -100, 70, -70):
        out.append(((0.0, 0.0), (d * math.sin(math.radians(a)), d * math.cos(math.radians(a)))))
    return out


def _ray(scene, origin: Vector, direction: Vector, dist: float):
    layer = scene.view_layers[0]
    with bpy.context.temp_override(scene=scene, view_layer=layer):
        dg = bpy.context.evaluated_depsgraph_get()
        return scene.ray_cast(dg, origin, direction, distance=dist)


def spot_ok(scene, base: Vector, r_bot: float, r_top: float, height: float,
            cups: Sequence, allow_step: bool = False) -> Tuple[bool, str, float]:
    """Годится ли место: ровная опора под всем дном и пусто над следом стакана.

    base — точка дна в мире на уровне пола главного; радиусы и высота — в
    мировых единицах. allow_step — можно встать на соседнюю, более низкую
    ступеньку (подиум), но не ниже 60 % роста стакана: пол комнаты под
    столом так не пройдёт. Возвращает ещё и высоту опоры.
    """
    own = {c.name for c in cups}
    tol = max(0.02 * height, 0.0015)
    reach = (0.6 if allow_step else 0.0) * height
    zs = []
    for k in range(9):
        a = 2 * math.pi * k / 8
        p = base + (Vector((math.cos(a), math.sin(a), 0.0)) * r_bot * 0.9 if k < 8 else Vector())
        hit, loc, _n, _i, ob, _m = _ray(scene, p + Vector((0, 0, 0.3 * height)), Vector((0, 0, -1)),
                                        0.3 * height + tol + reach)
        if not hit or loc.z > base.z + tol:
            return False, "нет опоры под дном (край стола или ступенька)", base.z
        if ob is not None and ob.name in own:
            return False, "дно попадает на другой стакан", base.z
        zs.append(loc.z)
    if max(zs) - min(zs) > tol:
        return False, "опора неровная: дно встаёт на край ступеньки", base.z
    floor = sum(zs) / len(zs)
    for k in range(12):
        a = 2 * math.pi * k / 12
        p = Vector((base.x, base.y, floor)) + Vector((math.cos(a), math.sin(a), 0.0)) * r_top * 1.05 \
            + Vector((0, 0, 0.02 * height))
        hit, _loc, _n, _i, ob, _m = _ray(scene, p, Vector((0, 0, 1)), 0.97 * height)
        if hit and (ob is None or ob.name not in own):
            return False, f"над местом мешает {ob.name if ob else 'объект сцены'}", floor
    return True, "", floor


# ---------------------------------------------------------------------------
# камера под группу
# ---------------------------------------------------------------------------

def _ndc_box(scene, cam, objs) -> Tuple[float, float, float, float]:
    from bpy_extras.object_utils import world_to_camera_view
    xs, ys = [], []
    for ob in objs:
        for c in ob.bound_box:
            p = world_to_camera_view(scene, cam, ob.matrix_world @ Vector(c))
            xs.append(p.x)
            ys.append(p.y)
    return min(xs), max(xs), min(ys), max(ys)


def _settle(scene, pivot, ob, floor_z: float) -> None:
    """Дно второго стакана — ровно на пол главного: у разных моделей низ сетки
    не всегда в нуле, а висящий или утонувший стакан выдаёт мокап сразу."""
    _update(scene)
    low = min((ob.matrix_world @ Vector(c)).z for c in ob.bound_box)
    pivot.location.z += floor_z - low
    _update(scene)


def _update(scene):
    with bpy.context.temp_override(scene=scene, view_layer=scene.view_layers[0]):
        bpy.context.view_layer.update()


def fit_group(scene, cam, objs, frac_h: float, target: Tuple[float, float]) -> dict:
    """Камера под группу: та же высота в кадре, что у одиночного стакана,
    группа влезает по ширине, центр группы — там, где был главный стакан.
    Камера двигается, не поворачиваясь: горизонт и перспектива сцены целы.
    """
    if cam.animation_data:
        cam.animation_data_clear()
    q = cam.matrix_world.to_quaternion()
    fwd = q @ Vector((0.0, 0.0, -1.0))
    right = q @ Vector((1.0, 0.0, 0.0))
    up = q @ Vector((0.0, 1.0, 0.0))
    start = cam.matrix_world.translation.copy()
    for _ in range(5):
        _update(scene)
        x0, x1, y0, y1 = _ndc_box(scene, cam, objs)
        w, h = x1 - x0, y1 - y0
        s = min(frac_h / max(h, 1e-6), SAFE_W / max(w, 1e-6))
        centre = sum((ob.matrix_world @ (sum((Vector(c) for c in ob.bound_box), Vector()) / 8.0)
                      for ob in objs), Vector()) / len(objs)
        pos = cam.matrix_world.translation.copy()
        dist = (centre - pos).dot(fwd)
        new = dist / s
        pos += fwd * (dist - new)
        # сдвиг вбок/вверх: центр рамки группы — в целевую точку кадра
        cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
        # Центр группы — там, где был главный стакан, но вся рамка группы
        # должна остаться в кадре с полями: главный часто стоит у края.
        half_w, half_h = w * s / 2, h * s / 2
        tx = min(max(target[0], half_w + 0.06), 1.0 - half_w - 0.06)
        ty = min(max(target[1], half_h + 0.06), 1.0 - half_h - 0.06)
        frame_w = cam.data.sensor_width / cam.data.lens * new
        frame_h = frame_w * scene.render.resolution_y / scene.render.resolution_x
        pos += right * (cx - tx) * frame_w + up * (cy - ty) * frame_h
        mw = cam.matrix_world.copy()
        mw.translation = pos
        cam.matrix_world = mw
        if abs(s - 1.0) < 0.01 and abs(cx - tx) < 0.005 and abs(cy - ty) < 0.005:
            break
    _update(scene)
    moved = (cam.matrix_world.translation - start).dot(-fwd)
    d0 = max((sum((ob.matrix_world.translation for ob in objs), Vector()) / len(objs) - start).dot(fwd), 1e-6)
    box = _ndc_box(scene, cam, objs)
    return {"dolly_out": round((d0 + moved) / d0, 3), "ndc": [round(v, 3) for v in box]}


def hero_frame(scene, cam, hero_obj) -> Tuple[float, Tuple[float, float]]:
    """Сколько кадра по высоте занимает главный стакан и где его центр."""
    _update(scene)
    x0, x1, y0, y1 = _ndc_box(scene, cam, [hero_obj])
    return y1 - y0, ((x0 + x1) / 2, (y0 + y1) / 2)


def focus_pair(cam, hero_obj, second_obj, z_hero: float, z_second: float) -> Optional[dict]:
    """Фокус и диафрагма на пару: второй стакан не должен расплыться.

    Стаканы стоят в линию, разница глубины мала. Фокус — на трети пути от
    передней стенки главного к передней стенке второго; диафрагма
    прикрывается до половины нужной для полной резкости, но не больше чем на
    две ступени от авторской и не туже f/11 — иначе пропадёт размытие фона.
    """
    if not cam.data.dof.use_dof:
        return None
    d1 = place.focus_on_cup(cam, second_obj, z_second)
    d0 = place.focus_on_cup(cam, hero_obj, z_hero)
    delta = d1 - d0
    focus = d0 + 0.35 * delta if delta > 0 else d0
    cam.data.dof.focus_object = None
    cam.data.dof.focus_distance = focus
    f = cam.data.lens / 1000.0
    need = abs(delta) * f * f / (2 * CIRCLE_OF_CONFUSION_M * focus * focus) if focus > 0 else 0.0
    before = cam.data.dof.aperture_fstop
    cam.data.dof.aperture_fstop = max(before, min(11.0, 2.0 * before, 0.5 * need))
    return {"focus_m": round(focus, 4), "fstop": round(cam.data.dof.aperture_fstop, 2),
            "fstop_before": round(before, 2), "depth_m": round(delta, 4)}


# ---------------------------------------------------------------------------
# расстановка второго стакана
# ---------------------------------------------------------------------------

def place_second(scene, cam, cups: List[dict], layout: str, scale: float,
                 hero_base: Vector, rotation_deg=(0.0, 0.0, 0.0),
                 coll=None, check_support: bool = True, max_dolly: float = MAX_DOLLY_OUT,
                 hero_holder=None) -> dict:
    """Поставить второй стакан, подстроить камеру. Возвращает отчёт раскладки.

    hero_holder — объект, которым двигают главный стакан (пустышка сцены или
    сам стакан): чтобы пара встала по центру прежнего места. Без него главный
    остаётся где был.
    """
    hero, second = cups[0], cups[1]
    right, fwd = floor_axes(cam)
    frac_h, target = hero_frame(scene, cam, hero["obj"])
    cam_before = cam.matrix_world.copy()
    fstop_before = cam.data.dof.aperture_fstop
    pivot = bpy.data.objects.new(place.PREFIX + "Pivot2", None)
    (coll or hero["obj"].users_collection[0]).objects.link(pivot)
    pivot.rotation_euler = tuple(math.radians(a) for a in rotation_deg)
    pivot.scale = (scale, scale, scale)
    ob = second["obj"]
    ob.parent = pivot
    ob.matrix_parent_inverse = Matrix.Identity(4)
    ob.location = (0.0, 0.0, 0.0)
    tried, best, found = [], None, False
    holder_home = hero_holder.location.copy() if hero_holder is not None else None
    mm = 0.001 * scale
    hero_objs = [hero["obj"], ob]

    def put(h_off: Vector, s_base: Vector, floor: float) -> None:
        if hero_holder is not None:
            hero_holder.location = holder_home + h_off
        pivot.location = s_base
        _settle(scene, pivot, ob, floor)

    # сначала места на уровне главного, потом — соседняя ступенька пониже
    for allow_step in ((False, True) if layout != "free" else (False,)):
        for (hx, hy), (sx, sy) in candidates(layout, hero, second, second["spec"]):
            h_off = (right * hx + fwd * hy) * mm
            if h_off.length > 0 and hero_holder is None:
                continue
            h_base = hero_base + h_off
            s_base = h_base + (right * (sx - hx) + fwd * (sy - hy)) * mm
            pivot.location = s_base + Vector((0, 0, -1000.0))    # второй спрятан, пока проверяем места
            ok, why, floor = True, "", s_base.z
            if check_support and layout != "free":
                if h_off.length > 0:
                    # главный сдвигается вместе со всей парой: его новое место тоже проверяем
                    hero_holder.location = holder_home + Vector((0, 0, -1000.0))
                    _update(scene)
                    ok, why, _f = spot_ok(scene, h_base, hero["r_bot"] * scale, hero["r_top"] * scale,
                                          hero["height"] * scale, hero_objs)
                    why = ("главному: " + why) if not ok else why
                    hero_holder.location = holder_home + h_off
                _update(scene)
                if ok:
                    ok, why, floor = spot_ok(scene, s_base, second["r_bot"] * scale, second["r_top"] * scale,
                                             second["height"] * scale, hero_objs, allow_step)
            if not ok:
                if hero_holder is not None:
                    hero_holder.location = holder_home
                if not allow_step:
                    tried.append({"pos_mm": [round(sx), round(sy)], "hero_mm": [round(hx), round(hy)], "why": why})
                continue
            put(h_off, s_base, floor)
            cam.matrix_world = cam_before
            fit = fit_group(scene, cam, hero_objs, frac_h, target)
            rec = {"pos_mm": [round(sx, 1), round(sy, 1)], "hero_shift_mm": [round(hx, 1), round(hy, 1)],
                   "step_mm": round((h_base.z - floor) / scale * 1000.0, 1), **fit}
            if fit["dolly_out"] <= max_dolly or layout == "free":
                best, found = rec, True
                break
            tried.append({"pos_mm": rec["pos_mm"], "hero_mm": rec["hero_shift_mm"],
                          "why": f"камере пришлось бы отъехать в {fit['dolly_out']}×"})
            if best is None or fit["dolly_out"] < best["dolly_out"]:
                best = dict(rec, fallback=True, _put=(h_off, s_base, floor))
            if hero_holder is not None:
                hero_holder.location = holder_home
        if found:
            break
    if best is None:
        raise place.ConfigError("второму стакану нет места в этой сцене: " +
                                "; ".join(sorted({t["why"] for t in tried})))
    if best.get("fallback"):
        put(*best.pop("_put"))
        cam.matrix_world = cam_before
        best.update(fit_group(scene, cam, hero_objs, frac_h, target))
        place._warn(f"второй стакан: камера отъехала в {best['dolly_out']}× — сцена тесновата для пары")
    _update(scene)
    cam.data.dof.aperture_fstop = fstop_before
    h_z = hero_base.z
    focus = focus_pair(cam, hero["obj"], ob,
                       h_z + hero["height"] * scale * 0.45, pivot.location.z + second["height"] * scale * 0.45)
    return {"layout": layout, "second": best, "rejected": tried, "focus": focus}
