"""Подстановка стакана вместо «героя» готовой сцены BlenderKit.

Ни один файл cup500 и 4.blend этим кодом не переписывается: исходная
сцена открывается, правится в памяти и сохраняется под новым именем в out/.
"""

import importlib.util
import json
import math
import os
import sys
from typing import Dict, List, Optional, Sequence, Tuple

import bpy
from mathutils import Matrix, Vector

from bk import material

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# Пути в конфиге и каталоге — от корня render/ (движок рендера CupViewer), а не от папки движка:
# сцены, фоны, стаканы и макеты лежат рядом с engine/, а не внутри.
PROJECT = os.path.dirname(ROOT)
PREFIX = "BK_"
WARNINGS: List[str] = []


class ConfigError(Exception):
    """Ошибка конфига: сообщение уже содержит путь к файлу и ключ."""


def _warn(msg: str) -> None:
    WARNINGS.append(msg)
    print("WARN: " + msg)


def _abs(rel: str) -> str:
    return os.path.normpath(os.path.join(PROJECT, rel))


def _render_entry(cup: dict) -> dict:
    """Стакан единого каталога CupViewer (schemaVersion 2) → запись движка.

    Каталог общий с сайтом: общие поля там в стиле сайта (volumeMl, size.heightMm,
    wall), а движок читает прежние имена (brim_ml, size_mm, group). Переходник
    держит всё остальное в движке нетронутым; раздел render — как было.
    """
    size = cup.get("size") or {}
    e = {
        "id": cup["id"], "aliases": cup.get("aliases", []), "label": cup.get("label", cup["id"]),
        "type": cup["type"], "group": cup["wall"],
        "volume_ml": cup.get("volumeMl"), "brim_ml": cup.get("fullVolumeMl"),
        "size_mm": {"height": size.get("heightMm"), "top": size.get("topMm"), "bottom": size.get("bottomMm")},
    }
    e.update(cup["render"])
    if cup["type"] == "paper":
        e.setdefault("boards", cup.get("materialCompatibility"))
        e.setdefault("board_default", cup.get("defaultMaterial"))
    return e


def load_catalog(cfg: dict) -> None:
    """Реестр стаканов из единого каталога: по ID и по псевдонимам (410/500/650).

    Каталог один на сайт и рендер (catalog/cups.json в корне репозитория);
    стакан без раздела render движку не виден. Для PP поле печати
    раскладывается туда, где его ждёт код печати (field_mm, band).
    """
    rel = cfg.get("catalog")
    if not rel:
        return
    path = _abs(rel)
    if not os.path.isfile(path):
        raise ConfigError(f"{path}: каталог стаканов не найден")
    with open(path, "r", encoding="utf-8") as fh:
        data = json.load(fh)
    cups = {}
    for c in data["cups"]:
        if data.get("schemaVersion", 1) >= 2:
            if not c.get("render"):
                continue
            c = _render_entry(c)
        e = dict(c)
        pr = e.get("print") or {}
        if pr.get("mode") == "pp":
            e["field_mm"], e["band"] = pr["field_mm"], pr["band"]
        cups[e["id"]] = e
        for alias in e.get("aliases", []):
            cups[str(alias)] = e
    cfg["cups"] = cups
    cfg["reference_cup"] = data.get("reference")


def cup_ids(cfg: dict) -> List[str]:
    """ID стаканов без псевдонимов, в порядке каталога."""
    seen = []
    for key, e in cfg.get("cups", {}).items():
        if key.startswith("_"):
            continue
        cid = e.get("id", key)
        if cid not in seen:
            seen.append(cid)
    return seen


def resolve_cup(cfg: dict) -> dict:
    """Какой стакан ставим в сцену: ID или псевдоним из cup_key, плюс вариант.

    Вариант есть у вафельных EM: вафля в сетке (mesh) или картой нормалей (nm).
    """
    cups = cfg.get("cups")
    if not cups:
        if "cup" in cfg:
            return cfg["cup"]
        raise ConfigError("в конфиге нет ни каталога, ни cups")
    key = str(cfg.get("cup_key", "500"))
    if key not in cups:
        raise ConfigError(f"стакан {key!r} — такого нет; есть: {', '.join(cup_ids(cfg))}")
    entry = dict(cups[key])
    entry["key"] = entry.get("id", key)
    variants = entry.get("variants")
    if variants:
        v = cfg.get("cup_variant") or entry.get("variant_default")
        if v not in variants:
            raise ConfigError(f"{entry['key']}: варианта {v!r} нет; есть {', '.join(variants)}")
        entry["blend"] = variants[v]["blend"]
        entry["variant"] = v
    elif cfg.get("cup_variant"):
        _warn(f"{entry['key']}: вариантов у стакана нет, --variant пропущен")
    return entry


def reference_height(cfg: dict, height: float) -> float:
    """Рост эталонного стакана, м. По нему считается масштаб сцены.

    Все стаканы встают 1:1 к эталону: 120 мл ниже 500 мл, как в жизни.
    Когда в сцене сам эталон, берётся его точный рост — кадры 500 мл
    совпадают с прежними до пикселя.
    """
    if cfg.get("reference_cup") and resolve_cup(cfg)["key"] == cfg["reference_cup"]:
        return height
    return cfg.get("scale_reference_mm", 135.3) / 1000.0


def fit_camera(cam, centre: Vector, factor: float) -> float:
    """Подвести камеру к стакану: вдоль линии камера — центр стакана.

    Центр стакана остаётся в той же точке кадра, стакан занимает ту же долю
    кадра, что эталон. Направление взгляда не меняется, поэтому композиция и
    горизонт сцены сохраняются. Возвращает применённый коэффициент.
    """
    f = max(0.55, min(1.25, factor))
    if abs(f - 1.0) < 1e-4:
        return 1.0
    mw = cam.matrix_world.copy()
    if cam.animation_data:
        cam.animation_data_clear()
    loc = centre + (mw.translation - centre) * f
    mw.translation = loc
    cam.matrix_world = mw
    return round(f, 4)


# ---------------------------------------------------------------------------
# конфиг
# ---------------------------------------------------------------------------

_REQUIRED = ("source_blend", "render.engine", "pp.name", "shots")

# Какие ключи обязаны быть у фона каждого типа. blend — сцена из готового
# файла, greybox — циклорама, которую собирает код.
SET_KEYS = {
    "authored": ("environment", "camera", "cup_position_h", "cup_rotation_deg"),
    "blend": ("scene", "camera", "hero", "fit_ref", "height_scale"),
    "greybox": ("camera", "gray_linear", "world_strength",
                "key_w_at_135mm", "fill_w_at_135mm", "rim_w_at_135mm"),
}


def check_cup(entry: dict) -> None:
    """Что нужно стакану, зависит от того, кто его одевает."""
    need = {"paper": ("blend", "root"), "plastic": ("blend", "object", "verify"),
            "own": ("blend", "object")}.get(entry.get("adapter", "plastic"), ("blend",))
    for key in need:
        if key not in entry:
            raise ConfigError(f"{entry.get('key')}: в каталоге нет ключа {key!r}")


def _dig(obj, path: str):
    cur = obj
    for part in path.split("."):
        if not isinstance(cur, dict) or part not in cur:
            raise KeyError(path)
        cur = cur[part]
    return cur


def load_config(path: str) -> dict:
    if not os.path.isfile(path):
        raise ConfigError(f"{path}: файл конфига не найден")
    try:
        with open(path, "r", encoding="utf-8") as fh:
            cfg = json.load(fh)
    except json.JSONDecodeError as exc:
        raise ConfigError(f"{path}: некорректный JSON — {exc}") from exc
    for key in _REQUIRED:
        try:
            _dig(cfg, key)
        except KeyError:
            raise ConfigError(f"{path}: {key} — обязательный ключ отсутствует")
    load_catalog(cfg)
    try:
        check_cup(resolve_cup(cfg))
    except ConfigError as exc:
        raise ConfigError(f"{path}: {exc}")

    load_sets(cfg, path)
    for name, shot in cfg["shots"].items():
        kind = shot.get("source", "blend")
        if kind not in SET_KEYS:
            raise ConfigError(f"{path}: фон {name}: source = {kind!r} — бывает только "
                              f"{', '.join(sorted(SET_KEYS))}")
        for key in SET_KEYS[kind]:
            if key not in shot:
                raise ConfigError(f"{path}: фон {name}: {key} — обязательный ключ отсутствует")
        if kind == "blend" and shot["height_scale"] <= 0:
            raise ConfigError(f"{path}: фон {name}: height_scale = "
                              f"{shot['height_scale']} — must be > 0")
    return cfg


def load_sets(cfg: dict, config_path: str) -> dict:
    """Один файл на фон.

    Фоны лежат отдельными файлами, а не общим списком внутри конфига: добавить
    новый фон тогда значит положить рядом ещё один json, ничего не редактируя,
    и ни один существующий кадр от этого не может измениться.
    """
    directory = cfg.get("sets_dir")
    if not directory:
        return cfg["shots"]
    directory = _abs(directory)
    if not os.path.isdir(directory):
        raise ConfigError(f"{directory}: папка с фонами не найдена")
    for filename in sorted(os.listdir(directory)):
        if not filename.endswith(".json"):
            continue
        name = filename[:-5]
        full = os.path.join(directory, filename)
        try:
            with open(full, "r", encoding="utf-8") as fh:
                cfg["shots"][name] = json.load(fh)
        except json.JSONDecodeError as exc:
            raise ConfigError(f"{full}: некорректный JSON — {exc}") from exc
    if not cfg["shots"]:
        raise ConfigError(f"{directory}: не найдено ни одного фона")
    return cfg["shots"]


def enabled_sets(cfg: dict) -> List[str]:
    """Фоны в работе. "enabled": false — фон выключен: файлы на месте, но ни
    раннер (--all), ни превью, ни выгрузки его не берут (так выключен ice)."""
    return sorted(n for n, s in cfg["shots"].items() if s.get("enabled", True))


def check_enabled(cfg: dict, name: str) -> None:
    if name in cfg["shots"] and not cfg["shots"][name].get("enabled", True):
        raise ConfigError(f"фон {name} выключен ({cfg['shots'][name].get('_disabled', 'enabled: false')}); "
                          f"в работе: {', '.join(enabled_sets(cfg))}")


# ---------------------------------------------------------------------------
# габариты и уборка героя
# ---------------------------------------------------------------------------

def world_bbox(objs: Sequence) -> Optional[dict]:
    pts: List[Vector] = []
    for ob in objs:
        pts += [ob.matrix_world @ Vector(c) for c in ob.bound_box]
    if not pts:
        return None
    lo = Vector((min(p.x for p in pts), min(p.y for p in pts), min(p.z for p in pts)))
    hi = Vector((max(p.x for p in pts), max(p.y for p in pts), max(p.z for p in pts)))
    return {"min": lo, "max": hi, "size": hi - lo, "centre": (lo + hi) / 2.0}


def remove_hero(scene, names: Sequence[str]) -> Tuple[List[str], List[str]]:
    """Убрать объекты героя из сцены целиком, вместе с их детьми.

    Именно удалить, а не спрятать: спрятанный объект всё ещё виден в отражениях
    и в преломлении соседних поверхностей, а сцены здесь стеклянные.
    """
    wanted = set(names)
    doomed = []
    for ob in scene.objects:
        if ob.name in wanted:
            doomed.append(ob)
            continue
        parent = ob.parent
        while parent is not None:
            if parent.name in wanted:
                doomed.append(ob)
                break
            parent = parent.parent
    removed = [ob.name for ob in doomed]
    missing = sorted(wanted - set(removed))
    for ob in doomed:
        bpy.data.objects.remove(ob, do_unlink=True)
    return removed, missing


# ---------------------------------------------------------------------------
# стакан
# ---------------------------------------------------------------------------

def import_cup(cfg: dict, coll):
    obj = _import_cup(cfg, coll)
    # front_deg — поправка модели: после неё к камере смотрит середина листа
    # развёртки, как у стакана на сайте при повороте 0. В трёх файлах аддона
    # (HB80-280, DW80-280, DW90-430) поворот к логотипу тестового макета
    # запечён в пустышку CUPS_Product — сайт и рендер из-за этого смотрели на
    # разные стороны одного макета (tests/photoreal/art-check.mjs).
    turn = (cfg.get("_rotate_deg") or 0.0) + (resolve_cup(cfg).get("front_deg") or 0.0)
    if turn:
        # Поворот вокруг оси — в самой сетке: сцены задают свой поворот
        # объекту и перезаписали бы его, а сетку не трогают. Маски материалов
        # считаются по высоте и UV, поворот вокруг Z их не сбивает.
        obj.data.transform(Matrix.Rotation(math.radians(turn), 4, "Z"))
    return obj


def _import_cup(cfg: dict, coll):
    cup = resolve_cup(cfg)
    path = _abs(cup["blend"])
    if not os.path.isfile(path):
        raise ConfigError(f"{path}: файл со стаканом не найден")
    if cup.get("adapter") == "paper":
        from bk import paper_cup
        try:
            return paper_cup.import_paper(path, cup["root"], coll, PREFIX + "Cup")
        except paper_cup.PaperError as exc:
            raise ConfigError(str(exc))
    name = cup["object"]
    with bpy.data.libraries.load(path, link=False) as (src, dst):
        if name not in src.objects:
            raise ConfigError(f"{path}: в файле нет объекта {name!r}")
        dst.objects = [name]
    obj = dst.objects[0]
    obj.name = PREFIX + "Cup"
    obj.data.name = PREFIX + "Cup"
    for c in list(obj.users_collection):
        c.objects.unlink(obj)
    coll.objects.link(obj)
    if cup.get("adapter") == "own" or cup.get("material") == "own":
        return obj
    obj.data.materials.clear()
    for mat in list(bpy.data.materials):
        if mat.users == 0 and mat.name.startswith("Cup_PP"):
            bpy.data.materials.remove(mat)
    return obj


def dress_cup(cfg: dict, shot: dict, cup, height: float) -> Optional[dict]:
    """Материал и печать стакана — единственное место, где тип стакана важен.

    plastic — литой PP одевается общим материалом из shots.json и печатью по
    его режимам. paper — материалы бумаги из файла модели, макет — лист
    развёртки (свой через --art, чистый картон через --print none). own (PET) —
    приезжает из своего файла с материалом и сведённой печатью сторон А и Б: их
    не трогаем, иначе прозрачный PET станет молочным PP.
    """
    entry = resolve_cup(cfg)
    if entry.get("adapter") == "paper":
        from bk import board, paper_cup
        try:
            printed = paper_cup.dress_paper(PROJECT, entry, cup, cfg.get("_art"),
                                            clean=not cfg["print"].get("enabled", True),
                                            page=cfg.get("_art_page", 1))
        except paper_cup.PaperError as exc:
            raise ConfigError(str(exc))
        boards = board.load_boards()
        board_id = cfg.get("_board") or entry.get("board_default") or boards["default"]
        if entry.get("boards") and board_id not in entry["boards"]:
            raise ConfigError(f"{entry['key']}: картон {board_id!r} для этой модели не бывает; "
                              f"есть {', '.join(entry['boards'])}")
        info = board.apply(cup, board_id, entry.get("group", "single"), boards)
        if printed is None:
            printed = {"mode": "clean", "type": "paper"}
        printed.update(info)
        return printed
    if entry.get("adapter") == "own" or entry.get("material") == "own":
        images = sorted({n.image.name for m in cup.data.materials if m and m.node_tree
                         for n in m.node_tree.nodes
                         if n.bl_idname == "ShaderNodeTexImage" and n.image})
        if cfg["print"].get("enabled") and cfg.get("_art_given"):
            _warn(f"{entry['key']}: свой макет для этого стакана задаётся при его сборке "
                  f"(cups/pet/build_pet.py --art-a/--art-b); --art пропущен")
        return {"mode": "own", "images": images, "type": entry.get("type", "own")}
    pp_mat = material.polypropylene(cfg["pp"], height)
    printed = apply_print(cfg, shot, pp_mat, cup, height * 1000.0)
    material.assign(cup, pp_mat)
    return printed


def local_height(obj) -> float:
    """Высота меша без учёта трансформации объекта.

    Маски материала работают в координатах объекта, поэтому пороги по высоте
    надо считать по локальной геометрии, а не по мировому габариту.
    """
    zs = [v.co.z for v in obj.data.vertices]
    return max(zs) - min(zs)


# ---------------------------------------------------------------------------
# материал стакана
# ---------------------------------------------------------------------------

def print_band(cfg: dict) -> dict:
    """Геометрия печатного поля из отчёта сборки стакана (только чтение)."""
    path = _abs(resolve_cup(cfg)["verify"])
    if not os.path.isfile(path):
        raise ConfigError(f"{path}: не найден отчёт cup500, из него берутся "
                          f"размеры печатного поля (соберите cup500 с --verify)")
    with open(path, "r", encoding="utf-8") as fh:
        report = json.load(fh)
    try:
        return report["print_band"]["value"]
    except (KeyError, TypeError):
        raise ConfigError(f"{path}: в отчёте нет раздела print_band")


def visible_band(cfg: dict) -> Optional[dict]:
    """Видимая часть стенки из отчёта сборки стакана.

    Стаканы вкладываются друг в друга, и низ стенки уходит внутрь соседнего.
    Отступ печати заказчик меряет от того края, который видно на полке, а не
    от кромки: это разные точки, у 500 мл они расходятся почти на два
    миллиметра.
    """
    path = _abs(resolve_cup(cfg)["verify"])
    if not os.path.isfile(path):
        return None
    with open(path, "r", encoding="utf-8") as fh:
        report = json.load(fh)
    try:
        return report["uv_bands"]["value"]["visible"]
    except (KeyError, TypeError):
        return None


def place_band(band: dict, spec: dict, cup_height_mm: float,
               visible: Optional[dict] = None) -> dict:
    """Пересчитать печатное поле под заданные отступ снизу и высоту.

    Слой UVPrint покрывает всю стенку: v линейно по высоте и выходит за
    пределы 0..1 выше и ниже штатного поля. Поэтому поле переставляется
    пересчётом координат в материале, а модель cup500 пересобирать не нужно.

    Высота задаётся по образующей — так меряется сам макет, когда его
    оборачивают вокруг конуса. Отступ снизу задаётся по вертикали от дна:
    так его меряют на изделии.

    Возвращает и доли для узла Mapping, и все размеры в мм — числа должны
    быть видны в отчёте, а не только в шейдере.
    """
    z0, z1 = band["z_range_mm"]
    dz = z1 - z0
    gen_per_z = band["height_along_generator_mm"] / dz
    r0, r1 = band["r_range_mm"]
    drdz = (r1 - r0) / dz
    gap0 = band["seam_gap_mm"]["bottom"]
    dgapdz = (band["seam_gap_mm"]["top"] - gap0) / dz

    bottom = float(spec.get("bottom_margin_mm", z0))

    # Верхний край поля: либо от видимого края стенки, либо от кромки.
    # Отступ задан по образующей, как меряют сам макет.
    top = None
    if "top_margin_from_visible_mm" in spec:
        if not visible:
            raise ConfigError("print.band.top_margin_from_visible_mm: в отчёте "
                              "стакана нет видимой части стенки (uv_bands.visible)")
        top = visible["z_range_mm"][1] - float(spec["top_margin_from_visible_mm"]) / gen_per_z
    elif "top_margin_mm" in spec:
        top = cup_height_mm - float(spec["top_margin_mm"])

    if "height_mm" in spec:
        # Высота задана числом: поле висит на том крае, который задан явно.
        height_gen = float(spec["height_mm"])
        if top is not None:
            zt = top
            zb = zt - height_gen / gen_per_z
        else:
            zb = bottom
            zt = zb + height_gen / gen_per_z
    elif top is not None:
        # Поле, заданное двумя отступами, переносится между объёмами само:
        # высота считается от высоты выбранного стакана. Заданное числом —
        # не переносится, на низком стакане отступ сверху уходит в минус.
        zb, zt = bottom, top
        height_gen = (zt - zb) * gen_per_z
    else:
        zb = bottom
        height_gen = band["height_along_generator_mm"]
        zt = zb + height_gen / gen_per_z
    if height_gen <= 0:
        raise ConfigError(f"print.band.height_mm = {height_gen} — must be > 0")
    if visible:
        v0, v1 = visible["z_range_mm"]
        if zb < v0 - 1e-6:
            _warn(f"низ печатного поля z={zb:.2f} мм ниже видимой части стенки "
                  f"({v0:.2f} мм): при вложении стаканов эта полоса скрыта")
        if zt > v1 + 1e-6:
            _warn(f"верх печатного поля z={zt:.2f} мм выше видимой части стенки "
                  f"({v1:.2f} мм)")
    zm = (zb + zt) / 2.0
    circ_m = 2.0 * math.pi * (r0 + drdz * (zm - z0))
    gap_m = gap0 + dgapdz * (zm - z0)
    return {
        "bottom_margin_mm": round(zb, 2),
        "top_margin_mm": round(cup_height_mm - zt, 2),
        "top_margin_from_visible_mm": (round((visible["z_range_mm"][1] - zt) * gen_per_z, 2)
                                       if visible else None),
        "visible_z_range_mm": ([round(v, 2) for v in visible["z_range_mm"]] if visible else None),
        "z_range_mm": [round(zb, 2), round(zt, 2)],
        "height_gen_mm": round(height_gen, 2),
        "mid_z_mm": round(zm, 2),
        "circumference_mid_mm": round(circ_m, 2),
        "seam_gap_mid_mm": round(gap_m, 2),
        "printed_width_mid_mm": round(circ_m - gap_m, 2),
        "v_a": (zb - z0) / dz,
        "v_b": (zt - z0) / dz,
    }


def fit_field(geo: dict, field_mm: Sequence[float], width_ref: str) -> dict:
    """Совместить макет по ширине. Высота уже прибита к полю.

    width_ref = "band"   — ширина макета занимает всю запечатываемую ширину,
                           зазор на стыке остаётся штатным для этой высоты;
    width_ref = "arc_mm" — объявленная ширина макета означает настоящие
                           миллиметры дуги по центральной линии поля. Если она
                           больше доступной, макет заходит в зазор, и об этом
                           выдаётся предупреждение.
    """
    fw, fh = float(field_mm[0]), float(field_mm[1])
    if fw <= 0 or fh <= 0:
        raise ConfigError(f"print.field_mm = {list(field_mm)} — must be > 0")
    printed = geo["printed_width_mid_mm"]
    if width_ref == "band":
        width_frac = 1.0
        on_wall = printed
    elif width_ref == "arc_mm":
        width_frac = fw / printed
        on_wall = fw
    else:
        raise ConfigError(f"print.width_ref = {width_ref!r} — ожидается band или arc_mm")

    gap = geo["circumference_mid_mm"] - on_wall
    if gap < 0:
        _warn(f"макет шириной {on_wall:.2f} мм не помещается на окружность "
              f"{geo['circumference_mid_mm']:.2f} мм по центральной линии поля: "
              f"перехлёст {-gap:.2f} мм, стыка не будет")
    elif width_ref == "arc_mm" and width_frac > 1.0:
        _warn(f"макет шире запечатываемого поля на "
              f"{on_wall - printed:.2f} мм и заходит в зазор на стыке")

    scale_h = fh / geo["height_gen_mm"]
    return {
        "width_ref": width_ref,
        "field_mm": [fw, fh],
        "on_wall_mm": [round(on_wall, 2), round(geo["height_gen_mm"], 2)],
        "seam_gap_mm": round(gap, 2),
        "width_scale": round(on_wall / fw, 4),
        "height_scale": round(1.0 / scale_h, 4),
        "distortion_pct": round(((on_wall / fw) / (1.0 / scale_h) - 1.0) * 100.0, 2),
        "width_frac": width_frac,
    }


def _mix_over(nt, socket, mask, b_value, data_type: str, label: str):
    """Вклинить Mix перед входом BSDF: A — то, что там было, B — краска.

    То, что было, может быть как значением, так и связью (шероховатость в
    приходит из маски венчика), поэтому связь переносится на вход A,
    а не затирается.
    """
    mix = nt.nodes.new("ShaderNodeMix")
    mix.data_type = data_type
    mix.label = label
    mix.location = (socket.node.location.x - 260, socket.node.location.y - 300)
    if socket.is_linked:
        link = socket.links[0]
        nt.links.new(link.from_socket, mix.inputs["A"])
        nt.links.remove(link)
    else:
        mix.inputs["A"].default_value = socket.default_value
    if hasattr(b_value, "node"):
        nt.links.new(b_value, mix.inputs["B"])
    else:
        mix.inputs["B"].default_value = b_value
    nt.links.new(mask, mix.inputs["Factor"])
    nt.links.new(mix.outputs["Result"], socket)
    return mix


def cone_sector(cfg: dict) -> dict:
    """Геометрия развёртки конуса из отчёта cup500 (только чтение).

    Возвращает полосы развёртки, границы острова стенки в атласе и посадку
    сектора внутри него. Развёртка запечена в модели по полосе full, поэтому
    рисовать макет надо в её координатах; visible — это ориентир внутри неё,
    та часть стенки, которая остаётся видна, когда стаканы вложены друг в
    друга.
    """
    path = _abs(resolve_cup(cfg)["verify"])
    if not os.path.isfile(path):
        raise ConfigError(f"{path}: не найден отчёт сборки стакана")
    with open(path, "r", encoding="utf-8") as fh:
        report = json.load(fh)
    try:
        return {"bands": report["uv_bands"]["value"],
                "island": report["uv_island_bounds"]["value"]["wall"],
                "fit": report["uv_fit"]["value"]["wall"]}
    except (KeyError, TypeError):
        raise ConfigError(f"{path}: в отчёте нет разделов uv_bands, "
                          f"uv_island_bounds или uv_fit")


def print_spec(cfg: dict, shot: dict) -> dict:
    """Настройки печати кадра: общие, поверх — фона, поверх — блока режима."""
    spec = dict(cfg.get("print") or {})
    spec.update(shot.get("print") or {})
    spec.update(spec.get(spec.get("mode", "rect")) or {})
    return spec


def rect_fit(cfg: dict, spec: dict, cup_height_mm: float) -> dict:
    """Поле печати PP (режим rect) в развёртке UVPrint — ровно то, что ставит
    узел Mapping: u — [начало, доля ширины], v — [низ, верх] поля (оси
    Blender, v снизу вверх). Эти же числа берёт сайт (catalog/cups.json →
    web.textureMapping.field, render/engine/tools/site_print_fields.py), чтобы
    макет лёг на его модель так же.
    """
    # Полоса печати задаётся общая, а объём может её переопределить: у 410,
    # 500 и 650 разные высоты поля при одной и той же длине макета.
    band_spec = dict(spec.get("band") or {})
    band_spec.update(resolve_cup(cfg).get("band") or {})
    geo = place_band(print_band(cfg), band_spec, cup_height_mm, visible_band(cfg))
    # Формат макета по умолчанию равен реальной области печати этого
    # стакана: тогда рисунок ложится один в один. Явный формат нужен
    # только там, где принята своя договорённость — например 220 x 110
    # у 500 мл, ради которой мирятся со сжатием.
    field = (resolve_cup(cfg).get("field_mm") or spec.get("field_mm")
             or [geo["printed_width_mid_mm"], geo["height_gen_mm"]])
    fit = fit_field(geo, field, spec.get("width_ref", "band"))
    fit["band"] = geo
    fit["field_mm"] = [float(field[0]), float(field[1])]
    wf = fit["width_frac"]
    fit["u"] = [(1.0 - wf) / 2.0, wf]
    fit["v"] = [geo["v_a"], geo["v_b"]]
    return fit


def apply_print(cfg: dict, shot: dict, mat, cup, cup_height_mm: float) -> Optional[dict]:
    """Наложить макет на стенку. Два режима, переключаются ключом mode.

    rect — прямоугольное поле шелкографии на слое UVPrint. Так отдают макеты
           на засветку сеток: поле с отступами сверху и снизу и зазором на
           стыке, стакан запечатан не полностью.
    cone — полная запечатка развёрткой конуса на слое UVMap. Стенка развёрнута
           кольцевым сектором, стыка нет, рисунок идёт вокруг целиком.

    В обоих режимах макет — картинка с альфой: альфа и есть маска краски. Вне
    её остаётся матовый полупрозрачный PP, как на непечатных участках
    реального изделия; под краской шероховатость падает до глянца, а
    пропускание — до нуля, потому что краска укрывистая.

    Растяжка стоит в CLIP: в режиме rect зазор на стыке лежит за пределами
    0..1 по u, в режиме cone за пределами сектора лежат венчик и дно. При
    повторе картинка заползла бы и туда и туда.
    """
    spec = print_spec(cfg, shot)
    if not spec.get("enabled"):
        return None

    mode = spec.get("mode", "rect")
    if mode not in ("rect", "cone"):
        raise ConfigError(f"print.mode = {mode!r} — ожидается rect или cone")

    layer = spec.get("uv_layer", "UVPrint" if mode == "rect" else "UVMap")
    if layer not in [l.name for l in cup.data.uv_layers]:
        raise ConfigError(f"в стакане нет UV-слоя {layer!r} "
                          f"(есть: {[l.name for l in cup.data.uv_layers]})")
    image = spec.get("image")
    # Built-in calibration sectors have different proportions for each cup.
    # A user-supplied artwork path is always used literally.
    cup_key = resolve_cup(cfg).get("key", "500")
    if mode == "cone" and image == "art/cone_template.png" and cup_key in ("410", "650"):
        image = f"art/cone_template_{cup_key}.png"
    if not image:
        raise ConfigError("print.enabled = true, но print.image не задан")
    path = _abs(image)
    if not os.path.isfile(path):
        raise ConfigError(f"{path}: файл макета не найден")

    nt = mat.node_tree
    bsdf = next((n for n in nt.nodes if n.bl_idname == "ShaderNodeBsdfPrincipled"), None)
    if bsdf is None:
        raise ConfigError(f"в материале {mat.name} нет узла Principled BSDF")

    img = bpy.data.images.load(path, check_existing=True)
    try:
        img.colorspace_settings.name = "sRGB"
    except TypeError:
        _warn("не удалось выставить цветовое пространство sRGB для макета")
    # макет упаковывается внутрь blend: иначе он остаётся внешней ссылкой и
    # отваливается, как только файл переносят на другую машину
    try:
        img.pack()
    except (RuntimeError, AttributeError) as exc:
        _warn(f"не удалось упаковать макет в файл: {exc}")
    tex = nt.nodes.new("ShaderNodeTexImage")
    tex.image = img
    tex.extension = "CLIP"
    tex.location = (bsdf.location.x - 900, bsdf.location.y - 300)
    uvnode = nt.nodes.new("ShaderNodeUVMap")
    uvnode.uv_map = layer
    uvnode.location = (tex.location.x - 500, tex.location.y)

    if mode == "rect":
        fit = rect_fit(cfg, spec, cup_height_mm)
        geo = fit["band"]
        # Макет занимает не всё поле, а его долю, и стоит по центру. Пересчёт
        # координат делает Mapping, а не правка развёртки: сама развёртка
        # лежит в меше из cup500 и здесь не трогается.
        mapping = nt.nodes.new("ShaderNodeMapping")
        mapping.vector_type = "POINT"
        mapping.location = (tex.location.x - 260, tex.location.y)
        u0 = (1.0 - fit["width_frac"]) / 2.0
        v_a, v_b = geo["v_a"], geo["v_b"]
        mapping.inputs["Scale"].default_value = (1.0 / fit["width_frac"],
                                                 1.0 / (v_b - v_a), 1.0)
        mapping.inputs["Location"].default_value = (-u0 / fit["width_frac"],
                                                    -v_a / (v_b - v_a), 0.0)
        nt.links.new(uvnode.outputs["UV"], mapping.inputs["Vector"])
        nt.links.new(mapping.outputs["Vector"], tex.inputs["Vector"])
    else:
        # Развёртка стенки лежит в атласе вместе с венчиком и дном. Если
        # подать макет как есть, краска ляжет и на них. Поэтому остров стенки
        # растягивается на 0..1, и всё остальное уходит за границы CLIP.
        geo = cone_sector(cfg)
        b = geo["bands"]["full"]
        vis = geo["bands"].get("visible")
        u0, v0, u1, v1 = geo["island"]
        w, h = u1 - u0, v1 - v0
        mapping = nt.nodes.new("ShaderNodeMapping")
        mapping.vector_type = "POINT"
        mapping.location = (tex.location.x - 260, tex.location.y)
        mapping.inputs["Scale"].default_value = (1.0 / w, 1.0 / h, 1.0)
        mapping.inputs["Location"].default_value = (-u0 / w, -v0 / h, 0.0)
        nt.links.new(uvnode.outputs["UV"], mapping.inputs["Vector"])
        nt.links.new(mapping.outputs["Vector"], tex.inputs["Vector"])
        fit = {"sector": "full",
               "alpha_deg": round(b["alpha_deg"], 3),
               "r_in_mm": round(b["r_in_mm"], 2),
               "r_out_mm": round(b["r_out_mm"], 2),
               "slant_mm": round(b["slant_mm"], 2),
               "z_range_mm": [round(v, 2) for v in b["z_range_mm"]],
               "canvas_aspect": round(w / h, 4),
               "visible_r_mm": ([round(vis["r_in_mm"], 2), round(vis["r_out_mm"], 2)]
                                if vis else None)}

    ink = spec.get("ink") or {}
    mask = tex.outputs["Alpha"]
    done = ["Base Color"]
    _mix_over(nt, bsdf.inputs["Base Color"], mask, tex.outputs["Color"], "RGBA", "ink colour")
    for socket_name, key, default in (("Roughness", "roughness", 0.10),
                                      ("Transmission Weight", "transmission", 0.0)):
        sock = bsdf.inputs.get(socket_name)
        if sock is None:
            _warn(f"в этой сборке нет входа {socket_name!r}, краска его не переключает")
            continue
        _mix_over(nt, sock, mask, float(ink.get(key, default)), "FLOAT", "ink " + key)
        done.append(socket_name)
    return {"mode": mode, "image": os.path.basename(path), "uv_layer": layer,
            "size_px": [img.size[0], img.size[1]], "sockets": done, "fit": fit}


# ---------------------------------------------------------------------------
# пересчёт материалов под масштаб сцены
# ---------------------------------------------------------------------------

def retune_for_scale(materials: Sequence, scale: float) -> List[str]:
    """Привести размерные параметры шейдеров к масштабу чужой сцены.

    Сцены BlenderKit смоделированы в разных масштабах — от натурального до
    примерно 17:1. Стакан вставляется целиком с одним коэффициентом, и два
    вида величин от этого ломаются:

      * плотность объёмного поглощения имеет размерность 1/длина, поэтому при
        увеличении тела луч проходит через него в scale раз больший путь —
        плотность делится на scale, иначе кофе и лёд становятся чёрными;
      * радиус подповерхностного рассеяния задан в мировых единицах —
        умножается на scale, иначе молоко перестаёт светиться;
      * плотность рассеяния в стенке стакана — по той же причине, что и
        поглощение: делится на scale.

    Возвращает список того, что поправлено, чтобы это попало в отчёт.
    """
    if abs(scale - 1.0) < 1e-6:
        return []
    touched = []
    for mat in materials:
        if mat is None or not mat.use_nodes:
            continue
        for node in mat.node_tree.nodes:
            if node.bl_idname == "ShaderNodeVolumeScatter":
                # Плотность имеет размерность 1/длина. Уменьшенный стакан имеет
                # и более тонкую стенку, поэтому без поправки мутность падает
                # вместе с масштабом и пластик в чужой сцене светлеет.
                sock = node.inputs["Density"]
                if not sock.is_linked:
                    sock.default_value /= scale
                    touched.append(f"{mat.name}: рассеяние в стенке /{scale:.3g}")
                else:
                    _warn(f"{mat.name}: плотность рассеяния подана узлом, "
                          f"пересчёт под масштаб не сделан")
            elif node.bl_idname == "ShaderNodeVolumeAbsorption":
                sock = node.inputs["Density"]
                if not sock.is_linked:
                    sock.default_value /= scale
                    touched.append(f"{mat.name}: плотность объёма /{scale:.3g}")
                    continue
                src = sock.links[0].from_node
                if src.bl_idname == "ShaderNodeMath" and src.operation == "MULTIPLY":
                    for inp in src.inputs[:2]:
                        if not inp.is_linked:
                            inp.default_value /= scale
                            touched.append(f"{mat.name}: множитель плотности /{scale:.3g}")
                            break
                else:
                    _warn(f"{mat.name}: плотность объёма подана узлом "
                          f"{src.bl_idname}, пересчёт под масштаб не сделан")
            elif node.bl_idname == "ShaderNodeBsdfPrincipled":
                sock = node.inputs.get("Subsurface Radius")
                if sock is not None and not sock.is_linked:
                    sock.default_value = tuple(v * scale for v in sock.default_value)
                    touched.append(f"{mat.name}: радиус SSS x{scale:.3g}")
            elif node.bl_idname == "ShaderNodeBump" and node.name == "PP_Mold_Bump":
                # Bump Distance измеряется в мировых единицах; сами координаты
                # зерна локальные и масштабируются вместе с изделием.
                node.inputs["Distance"].default_value *= scale
                touched.append(f"{mat.name}: микрорельеф PP x{scale:.3g}")
    return touched


# ---------------------------------------------------------------------------
# сборка кадра
# ---------------------------------------------------------------------------

def configure_render(cfg: dict, scene, samples: Optional[int], resolution: Optional[int]) -> None:
    r = cfg["render"]
    try:
        scene.render.engine = r["engine"]
    except TypeError:
        raise ConfigError(f"движок {r['engine']} недоступен в этой сборке Blender")
    if scene.render.engine != "CYCLES":
        raise ConfigError(f"движок {scene.render.engine} — требуется CYCLES")

    device = "CPU"
    prefs = bpy.context.preferences.addons.get("cycles")
    if prefs is not None and r["device"] == "GPU":
        cp = prefs.preferences
        try:
            cp.compute_device_type = r["compute_device_type"]
            cp.refresh_devices()
            for dev in cp.devices:
                dev.use = dev.type == r["compute_device_type"]
            if any(dev.use and dev.type != "CPU" for dev in cp.devices):
                device = "GPU"
            else:
                _warn("совместимый GPU не найден; считаю на CPU")
        except (TypeError, AttributeError, RuntimeError) as exc:
            _warn(f"не удалось выбрать {r['compute_device_type']}: {exc}; считаю на CPU")

    cy = scene.cycles
    cy.device = device
    cy.use_adaptive_sampling = True
    cy.adaptive_threshold = r["adaptive_threshold"]
    cy.use_denoising = bool(r["use_denoising"])
    try:
        cy.denoiser = r["denoiser"]
    except TypeError:
        _warn(f"денойзер {r['denoiser']} недоступен, оставлен {cy.denoiser}")
    cy.transmission_bounces = max(cy.transmission_bounces, int(r["transmission_bounces"]))
    # Blender по умолчанию держит volume_bounces равным нулю: рассеянный в
    # объёме луч тогда просто гибнет, и мутная стенка выходит чёрной.
    cy.volume_bounces = max(cy.volume_bounces, int(r.get("volume_bounces", 0)))
    # Общий предел отражений обрезает путь раньше частных: при стандартных 12
    # луч в молочной стенке PP гибнет, не выйдя наружу, и стенка сереет.
    if "max_bounces" in r:
        cy.max_bounces = max(cy.max_bounces, int(r["max_bounces"]))
    cy.caustics_refractive = bool(r["caustics_refractive"])
    if samples is not None:
        if int(samples) < 1:
            raise ConfigError("samples must be > 0")
        cy.samples = int(samples)
    if resolution is not None:
        if int(resolution) < 1:
            raise ConfigError("resolution must be > 0")
        width, height = scene.render.resolution_x, scene.render.resolution_y
        factor = int(resolution) / max(width, height)
        scene.render.resolution_x = max(1, int(round(width * factor)))
        scene.render.resolution_y = max(1, int(round(height * factor)))
    scene.render.resolution_percentage = 100
    scene.render.image_settings.file_format = "PNG"


def build(cfg: dict, shot_name: str, samples: Optional[int] = None,
          resolution: Optional[int] = None) -> dict:
    WARNINGS.clear()
    if shot_name not in cfg["shots"]:
        raise ConfigError(f"shots.{shot_name} — такого кадра нет в конфиге "
                          f"(есть: {', '.join(sorted(cfg['shots']))})")
    shot = cfg["shots"][shot_name]

    source = _abs(cfg["source_blend"])
    if not os.path.isfile(source):
        raise ConfigError(f"{source}: файл со сценами BlenderKit не найден")
    bpy.ops.wm.open_mainfile(filepath=source)

    scene = bpy.data.scenes.get(shot["scene"])
    if scene is None:
        raise ConfigError(f"{source}: нет сцены {shot['scene']!r} "
                          f"(есть: {', '.join(s.name for s in bpy.data.scenes)})")
    cam = scene.objects.get(shot["camera"])
    if cam is None or cam.type != "CAMERA":
        raise ConfigError(f"{shot['scene']}: нет камеры {shot['camera']!r}")
    scene.camera = cam

    # Открытый файл отдаёт matrix_world такой, какой он был сохранён, и для
    # сцены, которая не была активной, он не пересчитан: объект, привязанный
    # к пустышке, показывает габарит в нуле вместо своего места в комнате.
    # Без этого пересчёта стакан уезжает под пол.
    with bpy.context.temp_override(scene=scene, view_layer=scene.view_layers[0]):
        bpy.context.view_layer.update()

    # габарит героя снимается до его удаления — именно он задаёт посадку
    refs = [scene.objects[n] for n in shot["fit_ref"] if n in scene.objects]
    if not refs:
        raise ConfigError(f"{shot['scene']}: ни один объект из fit_ref не найден "
                          f"({shot['fit_ref']})")
    ref_bb = world_bbox(refs)
    ref_rot = [round(math.degrees(a), 1)
               for a in refs[0].matrix_world.to_euler()]
    removed, missing = remove_hero(scene, shot["hero"])
    if missing:
        _warn(f"{shot['scene']}: в сцене нет объектов героя {missing}")

    # Светящиеся карточки в этих сценах — обычные объекты, а не лампы. Пока
    # на их месте стоял «герой», они были им закрыты; стакан уже другой формы,
    # и карточка вылезает в кадр. Гасим её только для камеры: сцену она
    # по-прежнему освещает.
    hidden = []
    for name in shot.get("hide_from_camera", ()):
        ob = scene.objects.get(name)
        if ob is None:
            _warn(f"{shot['scene']}: нечего прятать от камеры, нет объекта {name!r}")
            continue
        ob.visible_camera = False
        hidden.append(name)

    coll = bpy.data.collections.new(PREFIX + "Cup")
    scene.collection.children.link(coll)

    from bk import group
    cups = group.load(cfg, shot, coll)
    group.check_count(shot_name, shot, len(cups))
    cup, height, printed = cups[0]["obj"], cups[0]["height"], cups[0]["printed"]

    # всё содержимое собрано в натуральную величину у начала координат;
    # в сцену оно въезжает одним пустышкой-родителем, поэтому координаты
    # объектов остаются нетронутыми и маски материалов продолжают работать
    # Масштаб сцены — по эталонному стакану, а не по текущему: иначе 120 мл
    # встал бы ростом с 500 мл. Для самого эталона всё как раньше.
    ref_h = reference_height(cfg, height)
    scale = ref_bb["size"].z * shot["height_scale"] / ref_h
    pivot = bpy.data.objects.new(PREFIX + "Pivot", None)
    coll.objects.link(pivot)
    pivot.empty_display_size = ref_bb["size"].z * 0.5
    off = Vector(shot.get("offset", (0.0, 0.0, 0.0)))
    pivot.location = Vector((ref_bb["centre"].x, ref_bb["centre"].y, ref_bb["min"].z)) + off
    pivot.rotation_euler = tuple(math.radians(a) for a in shot.get("rotation_deg", (0.0, 0.0, 0.0)))
    pivot.scale = (scale, scale, scale)
    for ob in list(coll.objects):
        if ob is pivot:
            continue
        ob.parent = pivot
        ob.matrix_parent_inverse = Matrix.Identity(4)

    with bpy.context.temp_override(scene=scene, view_layer=scene.view_layers[0]):
        bpy.context.view_layer.update()
    from bk import compose
    crop = compose.fit_mode(cfg) == "crop"
    # Облёт авторской камеры — вокруг центра эталона: камера фона одна на все
    # стаканы, превью снимает фон из неё же.
    centre = pivot.location + Vector((0.0, 0.0, (ref_h if crop else height) * scale * 0.5))
    orbit = shot.get("camera_orbit_deg")
    if orbit:
        orbit_camera(cam, centre, orbit[0], orbit[1])
    fit = 1.0
    focus = None
    pair = None
    comp = None
    if crop:
        comp = compose.run(scene, cam, cups, cfg, shot, shot_name, {
            "origin": pivot.location.copy(), "scale": scale, "holder": pivot,
            "rotation_deg": shot.get("rotation_deg", (0.0, 0.0, 0.0)), "href": ref_h,
            "focus": "cup" if shot.get("focus") == "cup" else "keep"})
        pair = comp["group"]
        focus = (comp["focus"] or {}).get("focus_m")
    else:
        if shot.get("camera_fit", True):
            fit = fit_camera(cam, centre, height / ref_h)
        # авторский фокус смотрел на эталонное место; после подъезда камеры он мимо
        if shot.get("focus") == "cup" or fit != 1.0:
            focus = focus_on_cup(cam, cup, pivot.location.z + height * scale * 0.45)
        if len(cups) > 1:
            from bk import group
            pair = group.place_second(scene, cam, cups, cfg.get("_layout") or "pair", scale,
                                      hero_base=pivot.location.copy(),
                                      rotation_deg=shot.get("rotation_deg", (0.0, 0.0, 0.0)), coll=coll,
                                      hero_holder=pivot)

    # по одному разу на материал: лёд и пузыри общие для всех кубиков, и
    # повторный пересчёт делил бы их плотность столько раз, сколько объектов
    mats = {}
    for ob in coll.objects:
        if getattr(ob, "data", None) is not None and hasattr(ob.data, "materials"):
            for m in ob.data.materials:
                if m is not None:
                    mats[m.name] = m
    retuned = retune_for_scale(list(mats.values()), scale)

    configure_render(cfg, scene, samples or shot.get("samples"),
                     resolution or shot.get("resolution"))
    was_color = [scene.view_settings.view_transform, scene.view_settings.look,
                 round(scene.view_settings.exposure, 3)]
    color = apply_color(cfg, shot, scene)
    face = face_pixel(scene, cam, cup, pivot.location.z + height * scale * 0.45)

    dropped = isolate_scene(scene.name)
    purged = purge_orphans()

    return {
        "cup": resolve_cup(cfg).get("key", "500"),
        "shot": shot_name,
        "scene": scene.name,
        "camera": cam.name,
        "color": color,
        "color_in_source_scene": was_color,
        "face_px": face,
        "cups": cups_report(cups),
        "group": pair,
        "compose": comp,
        "camera_orbit_deg": list(orbit) if orbit else None,
        "camera_fit": fit,
        "scale_reference_mm": round(ref_h * 1000.0, 2),
        "camera_location": [round(v, 4) for v in cam.matrix_world.translation],
        "focus_distance_m": focus,
        "removed": removed,
        "hidden_from_camera": hidden,
        "dropped_scenes": dropped,
        "purged": purged,
        "cup_height_mm": height * 1000.0,
        "hero_height_mm": ref_bb["size"].z * 1000.0,
        "hero_rotation_deg": ref_rot,
        "scale": scale,
        "placed_at": [round(v, 4) for v in pivot.location],
        "retuned": retuned,
        "print": printed,
        "engine": scene.render.engine,
        "samples": scene.cycles.samples,
        "resolution": [scene.render.resolution_x, scene.render.resolution_y],
        "view_transform": scene.view_settings.view_transform,
        "look": scene.view_settings.look,
        "warnings": list(WARNINGS),
    }


def orbit_camera(cam, centre: Vector, azimuth_deg: float, elevation_deg: float) -> None:
    """Повернуть камеру вокруг стакана как жёсткое тело.

    Двигается вся камера вместе с направлением взгляда, поэтому стакан остаётся
    на том же месте в кадре, что и в авторской композиции. Наклон идёт вокруг
    горизонтальной оси «вправо» камеры: горизонт при этом не заваливается.
    """
    mw = cam.matrix_world.copy()
    right = mw.to_quaternion() @ Vector((1.0, 0.0, 0.0))
    right.z = 0.0
    right.normalize()
    # Поворот вокруг «вправо» на +угол опускает камеру (правый винт), поэтому
    # знак у наклона обратный: положительный elevation поднимает камеру.
    rot = (Matrix.Rotation(math.radians(azimuth_deg), 4, "Z")
           @ Matrix.Rotation(-math.radians(elevation_deg), 4, right))
    about = Matrix.Translation(centre) @ rot @ Matrix.Translation(-centre)
    # У камер из 4.blend есть анимация (в living — CameraAction.003): при
    # рендере она вернула бы камеру на авторскую точку поверх нашей правки.
    # Положение уже снято выше на текущем кадре, поэтому анимацию снимаем.
    cam.animation_data_clear()
    cam.matrix_world = about @ mw


def focus_on_cup(cam, cup, z: float) -> float:
    """Фокус на передней стенке стакана на высоте z.

    Авторский фокус смотрел на переднюю грань убранного героя. Если стакан
    переставлен, прежняя точка уже мимо: при 120 мм и f/3.5 резкость
    держится всего около полутора сантиметров.
    """
    cam_pos = cam.matrix_world.translation
    fwd = (cam.matrix_world.to_quaternion() @ Vector((0.0, 0.0, -1.0))).normalized()
    # Луч от камеры к оси стакана на высоте z: попадает в переднюю стенку при
    # любой сетке. У PET рабочая стенка — один пояс без промежуточных вершин.
    inv = cup.matrix_world.inverted()
    axis = cup.matrix_world.translation
    target = Vector((axis.x, axis.y, z))
    o_local = inv @ cam_pos
    d_local = (inv @ target - o_local).normalized()
    hit, loc, _n, _i = _cup_ray(cup, o_local, d_local)
    if hit:
        cam.data.dof.focus_object = None
        cam.data.dof.focus_distance = ((cup.matrix_world @ loc) - cam_pos).dot(fwd)
        return round(cam.data.dof.focus_distance, 4)
    best = None
    band = max(0.004, (cup.dimensions.z * cup.matrix_world.to_scale().z) * 0.04)
    for v in cup.data.vertices:
        p = cup.matrix_world @ v.co
        if abs(p.z - z) > band:
            continue
        d = (p - cam_pos).dot(fwd)
        if best is None or d < best:
            best = d
    if best is None:
        raise ConfigError("фокус на стакан: на заданной высоте нет вершин стакана")
    cam.data.dof.focus_object = None
    cam.data.dof.focus_distance = best
    return round(best, 4)


def cups_report(cups) -> list:
    """Короткий отчёт по стаканам кадра: кто, на каком картоне, где стоит."""
    out = []
    for i, c in enumerate(cups):
        pr = c.get("printed") or {}
        loc = c["obj"].matrix_world.translation
        out.append({"id": c["entry"].get("key"), "hero": i == 0, "variant": c["entry"].get("variant"),
                    "board": pr.get("board"), "print": pr.get("mode"),
                    "rotate_deg": c["spec"].get("rotate", 0.0),
                    "height_mm": round(c["height"] * 1000.0, 1),
                    "world": [round(v, 4) for v in loc]})
    return out


def apply_color(cfg: dict, shot: dict, scene) -> dict:
    """Цветовой конвейер один на все сцены: печать на рендере — как в файле.

    Khronos PBR Neutral выводит цвет материала почти как есть и сжимает только
    самые яркие блики. Экспозиция своя у каждого фона и подобрана по серой
    карте (engine/tools/calibrate_exposure.py): освещённая сторона стакана с
    листом 18 % серого даёт 118 из 255. Фон может переопределить конвейер
    ключами view_transform / look, но так делать не стоит.
    """
    color = cfg.get("color") or {}
    vs = scene.view_settings
    if cfg.get("_legacy_color"):
        # прежний, одобренный вид сцены — только для калибровки по яркости кадра
        old = shot.get("_color_before_pbn")
        if old is not None or shot.get("source", "blend") != "blend":
            old = old or {}
            vs.view_transform = old.get("view_transform", "AgX")
            vs.look = old.get("look", "AgX - Medium High Contrast")
            vs.exposure = old.get("exposure", 0.0)
        return {"view_transform": vs.view_transform, "look": vs.look,
                "exposure": vs.exposure, "legacy": True}
    vs.view_transform = shot.get("view_transform", color.get("view_transform", "AgX"))
    vs.look = shot.get("look", color.get("look", "None"))
    vs.exposure = shot.get("exposure", 0.0) + cfg.get("_exposure_offset", 0.0)
    vs.gamma = 1.0
    return {"view_transform": vs.view_transform, "look": vs.look, "exposure": vs.exposure}


def _cup_ray(cup, origin_local, dir_local):
    """ray_cast по стакану в графе его собственной сцены.

    В 4.blend активной может оказаться другая сцена, и тогда у стакана нет
    вычисленной сетки: ray_cast без явного графа падает.
    """
    try:
        return cup.ray_cast(origin_local, dir_local)
    except RuntimeError:
        scene = cup.users_scene[0]
        layer = scene.view_layers[0]
        with bpy.context.temp_override(scene=scene, view_layer=layer):
            dg = bpy.context.evaluated_depsgraph_get()
            dg.update()
            return cup.ray_cast(origin_local, dir_local, depsgraph=dg)


def face_pixel(scene, cam, cup, z: float):
    """Пиксель кадра, где передняя стенка стакана на высоте z (для калибровки)."""
    from bpy_extras.object_utils import world_to_camera_view
    inv = cup.matrix_world.inverted()
    axis = cup.matrix_world.translation
    origin = cam.matrix_world.translation
    hit, loc, _n, _i = _cup_ray(cup, inv @ origin, (inv @ Vector((axis.x, axis.y, z)) - inv @ origin).normalized())
    point = cup.matrix_world @ loc if hit else Vector((axis.x, axis.y, z))
    co = world_to_camera_view(scene, cam, point)
    w, h = scene.render.resolution_x, scene.render.resolution_y
    return [round(co.x * w), round((1.0 - co.y) * h)]


def render(scene_name: str, out_dir: str, shot_name: str) -> str:
    scene = bpy.data.scenes[scene_name]
    os.makedirs(out_dir, exist_ok=True)
    path = os.path.join(out_dir, f"{shot_name}.png")
    scene.render.filepath = path
    bpy.ops.render.render(write_still=True, scene=scene.name)
    return path


def isolate_scene(keep: str) -> List[str]:
    """Выкинуть из файла все прочие сцены.

    Источник накопительный: в нём лежат все пять ассетов сразу. Если сохранить
    его как есть, каждый кадр утащит с собой чужие сцены на две сотни мегабайт.
    """
    dropped = []
    for sc in list(bpy.data.scenes):
        if sc.name != keep:
            dropped.append(sc.name)
            bpy.data.scenes.remove(sc, do_unlink=True)
    return dropped


def purge_orphans(rounds: int = 8) -> int:
    """Вычистить датаблоки, оставшиеся без пользователей, до неподвижной точки.

    За один проход не получается: удаление объекта освобождает меш, меш —
    материал, материал — картинку.
    """
    total = 0
    for _ in range(rounds):
        n = bpy.data.orphans_purge(do_local_ids=True, do_linked_ids=True,
                                   do_recursive=False)
        total += n
        if n == 0:
            break
    return total


def save(out_dir: str, shot_name: str) -> str:
    """Свой .blend на каждый кадр, как просил заказчик."""
    os.makedirs(out_dir, exist_ok=True)
    path = os.path.join(out_dir, f"{shot_name}.blend")
    bpy.ops.wm.save_as_mainfile(filepath=path, copy=True, compress=True)
    return path
