"""Съёмка мокапа: один вход для всех фонов, объёмов и макетов печати.

Фоны бывают трёх видов, и снаружи это неразличимо:

  source = blend    — готовая сцена из mockup/scenes/4.blend, стакан встаёт
                      на место убранного «героя» и наследует свет сцены;
  source = greybox  — серый фотобокс, циклорама и свет строятся кодом под
                      высоту стакана.
  source = authored — авторское окружение с отдельными камерой и светом.

Один и тот же стакан, один и тот же материал и одна и та же система печати во
всех кадрах: отличается только окружение.

    blender -b -P run.py -- --list
    blender -b -P run.py -- --set studio --render
    blender -b -P run.py -- --set living --cup 650 --print rect --render
    blender -b -P run.py -- --all --render

Коды возврата: 0 — успех, 2 — ошибка конфига.
"""

import argparse
import io
import json
import os
import sys
import time

ROOT = os.path.dirname(os.path.abspath(__file__))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

PROJECT = os.path.dirname(ROOT)
DEFAULT_PARAMS = os.path.join(ROOT, "params", "shots.json")
OUT_DIR = os.path.join(PROJECT, "out")
LIBRARY = os.path.join(PROJECT, "cups", "plastic", "library")
EXIT_CONFIG = 2


def _argv(argv=None):
    if argv is not None:
        return list(argv)
    raw = sys.argv[1:]
    return raw[raw.index("--") + 1:] if "--" in raw else []


def _remember(params: str, key: str, value) -> None:
    """Записать выбор в конфиг, чтобы следующий запуск начинался с него."""
    import collections
    with io.open(params, "r", encoding="utf-8") as fh:
        cfg = json.load(fh, object_pairs_hook=collections.OrderedDict)
    if key == "print_mode":
        cfg["print"]["mode"] = value
    else:
        cfg[key] = value
    with io.open(params, "w", encoding="utf-8") as fh:
        fh.write(json.dumps(cfg, ensure_ascii=False, indent=2) + "\n")


def load_job(path: str, cfg: dict, place) -> dict:
    """Задание от панели: фон, 1–2 стакана, раскладка, качество.

    {"set": "living", "camera": {"preset": "front", "frame": "4:5"},
     "samples": 200, "resolution": 1200,
     "cups": [{"id": "HB80-280", "board": "coated", "art": "макет.pdf", "rotate": 20,
               "pos_mm": [-47, 0]},
              {"id": "HB80-280", "board": "coated", "art": "макет.pdf", "rotate": 170,
               "pos_mm": [47, 0]}]}
    pos_mm — место дна в мм от места героя сцены: вправо по кадру фона, вглубь.
    Без pos_mm у второго стакана место подбирает раскладка (layout: pair/side).
    Пути к макетам — от файла задания: папку задания можно отдать на другой компьютер.
    """
    with io.open(path, "r", encoding="utf-8") as fh:
        job = json.load(fh)
    base = os.path.dirname(os.path.abspath(path))
    cups = job.get("cups") or []
    if not 1 <= len(cups) <= 2:
        raise place.ConfigError(f"{path}: в задании должно быть 1 или 2 стакана, а не {len(cups)}")
    for c in cups:
        if c.get("id") not in cfg["cups"]:
            raise place.ConfigError(f"{path}: стакана {c.get('id')!r} нет в каталоге")
        if c.get("art"):
            c["art"] = os.path.normpath(os.path.join(base, c["art"]))
            if not os.path.isfile(c["art"]):
                raise place.ConfigError(f"{c['art']}: макет не найден")
    hero = cups[0]
    cfg["cup_key"] = hero["id"]
    cfg["cup_variant"] = hero.get("variant")
    cfg["_board"] = hero.get("board")
    cfg["_art"] = hero.get("art")
    cfg["_art_page"] = hero.get("page", 1)
    cfg["_rotate_deg"] = hero.get("rotate", 0.0)
    if hero.get("print") == "none":
        cfg["print"]["enabled"] = False
    cfg["_print_variant"] = "pad" if hero.get("print") == "pad" else None
    cfg["_proof"] = bool(hero.get("proof"))
    cfg["_cups"] = cups
    cfg["_layout"] = job.get("layout") or ("pair" if len(cups) > 1 and cups[1]["id"] == hero["id"] else "side")
    cam = job.get("camera") or {}
    if isinstance(cam, str):
        cam = {"preset": cam}
    cfg["_camera"] = cam.get("preset") or cfg.get("_camera")
    cfg["_frame"] = cam.get("frame") or job.get("frame") or cfg.get("_frame")
    place.check_cup(place.resolve_cup(cfg))
    return job


def describe(cfg: dict) -> None:
    from bk import place
    print("Фоны (sets/):")
    for name in sorted(cfg["shots"]):
        shot = cfg["shots"][name]
        if not shot.get("enabled", True):
            print(f"  {name:<12} выключен   {shot.get('title', '')}")
            continue
        kind = {"blend": "фотосцена", "greybox": "фотобокс", "authored": "авторская сцена"}.get(shot.get("source", "blend"), "сцена")
        print(f"  {name:<12} {kind:<10} {shot.get('title', '')}")
    print("\nСтаканы (catalog/cups.json):")
    for cid in place.cup_ids(cfg):
        e = cfg["cups"][cid]
        extra = f"  варианты: {', '.join(e['variants'])}" if e.get("variants") else ""
        alias = f"  ({', '.join(e['aliases'])})" if e.get("aliases") else ""
        print(f"  {cid:<10} {e.get('label', '')}{alias}{extra}")
    print("\nПечать PP: none, rect, cone   (сейчас в конфиге: "
          f"{cfg['print'].get('mode')}, включена: {bool(cfg['print'].get('enabled'))})")


def write_asset(info: dict, cup_key: str) -> str:
    """Стакан отдельным файлом: положить в чужую сцену через File > Append."""
    import bpy
    os.makedirs(LIBRARY, exist_ok=True)
    coll = bpy.data.collections.get("BK_Cup")
    if coll is None:
        raise RuntimeError("в сцене нет коллекции BK_Cup")
    coll.name = f"CUP_{cup_key}"
    for ob in coll.all_objects:
        if ob.type == "MESH":
            ob["asset_units"] = "meters"
    path = os.path.join(LIBRARY, f"CUP_{cup_key}.blend")
    bpy.data.libraries.write(path, {coll}, path_remap="RELATIVE",
                             fake_user=True, compress=True)
    coll.name = "BK_Cup"
    return path


def report(name: str, info: dict) -> None:
    print(f"### {name}: стакан {info['cup']}, сцена {info['scene']!r}, камера {info['camera']}")
    comp = info.get("compose")
    if comp:
        print(f"###   кадр: ракурс {comp['preset']}, формат {comp['frame']}, "
              f"×{comp['zoom']} от кадра фона"
              + ("" if comp["inside_backdrop"] else " — шире снимка фона для превью"))
        if any(p["pos_mm"][0] or p["pos_mm"][1] for p in comp["positions"][:1]):
            print(f"###   главный: {comp['positions'][0]['pos_mm']} мм от места героя")
    if info.get("camera_fit", 1.0) != 1.0:
        print(f"###   камера подведена к стакану: x{info['camera_fit']} от эталона "
              f"{info.get('scale_reference_mm')} мм")
    if info["removed"]:
        print(f"###   герой убран: {len(info['removed'])} об., высота героя "
              f"{info['hero_height_mm']:.0f} мм -> стакан {info['cup_height_mm']:.1f} мм "
              f"x{info['scale']:.3f}, посадка {info['placed_at']}")
    else:
        print(f"###   стакан {info['cup_height_mm']:.1f} мм в натуральную величину")
    if info["hidden_from_camera"]:
        print(f"###   от камеры спрятано: {info['hidden_from_camera']}")
    pr = info["print"]
    grp = info.get("group")
    if grp:
        two = info["cups"][1]
        pos = grp["second"]["pos_mm"]
        print(f"###   второй стакан: {two['id']} ({grp['layout']}), {pos[0]:+.0f} мм вправо, "
              f"{pos[1]:+.0f} мм вглубь, поворот {two['rotate_deg']:.0f}°"
              + (f"; камера x{grp['second']['dolly_out']}" if grp["second"].get("dolly_out") else "")
              + (f"; кадр x{grp['second']['zoom']} к одиночному" if grp["second"].get("zoom") else"")
              + (f"; на ступеньке ниже на {grp['second']['step_mm']:.0f} мм" if grp["second"].get("step_mm", 0) > 1 else "")
              + (f"; главный сдвинут на {grp['second']['hero_shift_mm'][0]:+.0f} мм" if any(grp["second"].get("hero_shift_mm", [0, 0])) else ""))
        for r in grp.get("rejected", []):
            print(f"###     отвергнуто место {r['pos_mm']}: {r['why']}")
        if grp.get("focus"):
            fo = grp["focus"]
            print(f"###   фокус на пару: {fo['focus_m']} м, диафрагма f/{fo['fstop_before']} → f/{fo['fstop']}")
    if pr and pr.get("type") == "paper":
        var = f", вариант {pr['variant']}" if pr.get("variant") else ""
        print(f"###   бумага{var}, картон: {pr.get('label')}")
    if pr and pr["mode"] == "clean":
        print("###   печать выключена, чистый картон")
    elif pr and pr["mode"] == "sheet" and "page_mm" in pr:
        print(f"###   лист {pr['page_mm'][0]:g}×{pr['page_mm'][1]:g} мм, "
              f"макет {pr['source']} ({pr['image']}, {pr['size_px'][0]}×{pr['size_px'][1]})")
    elif pr and pr["mode"] == "sheet":
        # PET: лист сторон от сайта вместо печати из файла (place.dress_cup) —
        # страницы у него нет; прежде отчёт падал на page_mm, и кадр PET с
        # макетом из задания не считался вовсе.
        print(f"###   лист сторон из задания ({pr.get('type')}): {', '.join(pr.get('images', []))}")
    elif pr and pr["mode"] == "own":
        print(f"###   материал и печать из файла стакана ({pr.get('type')}): "
              f"{', '.join(pr['images']) or 'без печати'}")
    elif pr:
        print(f"###   печать [{pr['mode']}]: {pr['image']} "
              f"{pr['size_px'][0]}x{pr['size_px'][1]} по слою {pr['uv_layer']}")
        fit = pr["fit"]
        if pr["mode"] == "rect":
            print(f"###   макет {fit['field_mm'][0]:.0f}x{fit['field_mm'][1]:.0f} мм -> на стенке "
                  f"{fit['on_wall_mm'][0]}x{fit['on_wall_mm'][1]} мм, "
                  f"зазор {fit['seam_gap_mm']} мм, искажение {fit['distortion_pct']:+.2f} %")
        else:
            print(f"###   сектор {fit['alpha_deg']} град., радиусы "
                  f"{fit['r_in_mm']}..{fit['r_out_mm']} мм, стыка нет")
    else:
        print("###   печать выключена, чистый стакан")
    for line in info["retuned"]:
        print("###   пересчёт: " + line)
    for line in info["warnings"]:
        print("###   WARN: " + line)
    print(f"###   {info['engine']}, {info['samples']} сэмплов, "
          f"{info['resolution'][0]}x{info['resolution'][1]}, "
          f"{info['view_transform']}/{info['look']}")


def main(argv=None) -> int:
    ap = argparse.ArgumentParser(prog="run.py", description="Мокап стакана на любом фоне")
    ap.add_argument("--params", default=DEFAULT_PARAMS)
    ap.add_argument("--set", dest="set_name", default=None, help="имя фона из sets/")
    ap.add_argument("--all", action="store_true", help="все фоны подряд")
    ap.add_argument("--list", action="store_true", help="показать фоны и стаканы")
    ap.add_argument("--cup", default=None, help="ID из catalog/cups.json (HB80-280, BM90-500, PG95-520…) или 410/500/650")
    ap.add_argument("--variant", default=None, help="вариант стакана: у EM — mesh (вафля в сетке) или nm (картой нормалей)")
    ap.add_argument("--board", default=None, choices=("coated", "uncoated", "soft-touch", "kraft"),
                    help="картон бумажного стакана; по умолчанию — из каталога (немелованный)")
    ap.add_argument("--print", dest="print_mode", choices=("none", "rect", "cone"),
                    default=None, help="режим печати только для этого запуска; none — чистый стакан")
    ap.add_argument("--art", default=None, help="свой макет: PP — поле печати, бумага — полный лист PDF/JPG/PNG")
    ap.add_argument("--proof", action="store_true",
                    help="«Имитация картона»: печать бумаги через профиль картона (catalog/proof, bk/proof.py)")
    ap.add_argument("--page", type=int, default=1, help="страница PDF макета бумаги")
    ap.add_argument("--legacy-color", action="store_true",
                    help="служебное: прежний цветовой конвейер сцены (для калибровки экспозиции)")
    ap.add_argument("--rotate", type=float, default=0.0,
                    help="повернуть стакан вокруг оси, градусы (+ — против часовой, если смотреть сверху)")
    ap.add_argument("--second", default=None,
                    help="второй стакан в кадре: ID из каталога; same — такой же, как главный; "
                         "bigger / smaller — соседний объём той же серии")
    ap.add_argument("--layout", default=None, choices=("pair", "side", "free"),
                    help="раскладка пары: pair — такой же, развёрнутый, сзади-сбоку (по умолчанию для same); "
                         "side — рядом, чуть глубже (по умолчанию для другого стакана); free — по --second-pos")
    ap.add_argument("--second-board", default=None, choices=("coated", "uncoated", "soft-touch", "kraft"))
    ap.add_argument("--second-art", default=None, help="макет второго стакана; для same — тот же, что у главного")
    ap.add_argument("--second-variant", default=None)
    ap.add_argument("--second-rotate", type=float, default=None,
                    help="поворот второго стакана, градусы; для пары по умолчанию главный + 150")
    ap.add_argument("--second-pos", default=None, help="для free: «x,y» в мм от главного — вправо по кадру, вглубь")
    ap.add_argument("--job", default=None, help="задание JSON: фон, стаканы, раскладка, качество (для панели)")
    ap.add_argument("--camera", default=None, help="ракурс из camera_presets фона (по умолчанию первый — как в сцене)")
    ap.add_argument("--frame", default=None, choices=("1:1", "3:4", "4:5"), help="формат кадра, по умолчанию 1:1")
    ap.add_argument("--fit-mode", default=None, choices=("crop", "dolly"),
                    help="служебное: как подгонять кадр под стакан — crop (вырез, как в превью) "
                         "или dolly (прежний подъезд камеры)")
    ap.add_argument("--remember", action="store_true",
                    help="запомнить --cup и --print в конфиге")
    ap.add_argument("--samples", type=int, default=None)
    ap.add_argument("--resolution", type=int, default=None)
    ap.add_argument("--render", action="store_true")
    ap.add_argument("--no-save", action="store_true", help="не писать .blend кадра")
    ap.add_argument("--asset", action="store_true",
                    help="положить стакан отдельным файлом в library")
    ap.add_argument("--output-dir", default=OUT_DIR)
    args = ap.parse_args(_argv(argv))
    if args.samples is not None and args.samples < 1:
        ap.error("--samples must be > 0")
    if args.resolution is not None and args.resolution < 1:
        ap.error("--resolution must be > 0")

    from bk import authored, compose, greybox, place

    try:
        cfg = place.load_config(args.params)
    except place.ConfigError as exc:
        print(str(exc), file=sys.stderr)
        return EXIT_CONFIG

    if args.list:
        describe(cfg)
        return 0

    if args.cup is not None:
        if args.cup not in cfg["cups"]:
            print(f"--cup {args.cup} — такого нет; есть: {', '.join(place.cup_ids(cfg))}", file=sys.stderr)
            return EXIT_CONFIG
        cfg["cup_key"] = args.cup
    cfg["cup_variant"] = args.variant
    cfg["_rotate_deg"] = args.rotate
    cfg["_board"] = args.board
    cfg["_proof"] = args.proof
    cfg["_legacy_color"] = args.legacy_color
    cfg["_camera"] = args.camera
    cfg["_frame"] = args.frame
    if args.fit_mode:
        cfg["camera_fit_mode"] = args.fit_mode
    try:
        place.check_cup(place.resolve_cup(cfg))
    except place.ConfigError as exc:
        print(str(exc), file=sys.stderr)
        return EXIT_CONFIG
    if args.print_mode is not None:
        cfg["print"]["enabled"] = args.print_mode != "none"
        if args.print_mode != "none":
            cfg["print"]["mode"] = args.print_mode
    if args.art:
        art = os.path.abspath(args.art)
        if not os.path.isfile(art):
            print(f"{art}: макет не найден", file=sys.stderr)
            return EXIT_CONFIG
        cfg["print"][cfg["print"]["mode"]]["image"] = art
        cfg["_art_given"] = True
        cfg["_art"] = art
        cfg["_art_page"] = args.page
    if args.job:
        try:
            job = load_job(args.job, cfg, place)
        except place.ConfigError as exc:
            print(str(exc), file=sys.stderr)
            return EXIT_CONFIG
        args.set_name = args.set_name or job.get("set")
        args.samples = args.samples or job.get("samples")
        args.resolution = args.resolution or job.get("resolution")
    elif args.second:
        hero = {"id": cfg["cup_key"], "variant": args.variant, "board": args.board,
                "art": cfg.get("_art"), "page": args.page, "rotate": args.rotate,
                "print": None if cfg["print"].get("enabled", True) else "none", "proof": args.proof}
        if args.second in ("bigger", "smaller"):
            # «Два объёма»: соседний объём той же серии (тип и стенка — как у главного)
            me = place.resolve_cup(cfg)
            row = sorted((cfg["cups"][c] for c in place.cup_ids(cfg)
                          if cfg["cups"][c]["type"] == me["type"] and cfg["cups"][c]["group"] == me["group"]),
                         key=lambda e: e["brim_ml"])
            ids = [e["id"] for e in row]
            k = ids.index(me["key"]) + (1 if args.second == "bigger" else -1)
            if not 0 <= k < len(ids):
                print(f"--second {args.second}: у {me['key']} нет объёма "
                      f"{'больше' if args.second == 'bigger' else 'меньше'} в той же серии", file=sys.stderr)
                return EXIT_CONFIG
            args.second = ids[k]
        same = args.second in ("same", cfg["cup_key"])
        if args.second != "same" and args.second not in cfg["cups"]:
            print(f"--second {args.second} — такого нет; есть: {', '.join(place.cup_ids(cfg))}", file=sys.stderr)
            return EXIT_CONFIG
        second = {"id": cfg["cup_key"] if same else args.second,
                  "variant": args.second_variant or (args.variant if same else None),
                  "board": args.second_board or args.board,
                  # макет-лист сделан под шаблон своей модели: чужой модели его не отдаём
                  "art": os.path.abspath(args.second_art) if args.second_art else (cfg.get("_art") if same else None),
                  "page": args.page,
                  "rotate": args.second_rotate if args.second_rotate is not None
                  else (args.rotate + 150.0 if same else args.rotate),
                  "print": hero["print"], "proof": args.proof}
        if args.second_pos:
            second["pos_mm"] = [float(v) for v in args.second_pos.split(",")]
        cfg["_cups"] = [hero, second]
        cfg["_layout"] = args.layout or ("free" if args.second_pos else ("pair" if same else "side"))
    if args.remember:
        if args.cup is not None:
            _remember(args.params, "cup_key", args.cup)
        if args.print_mode is not None and args.print_mode != "none":
            _remember(args.params, "print_mode", args.print_mode)
        print(f"### запомнено в {args.params}")

    if args.all:
        names = place.enabled_sets(cfg)
    elif args.set_name:
        if args.set_name not in cfg["shots"]:
            print(f"фона {args.set_name!r} нет; есть: {', '.join(sorted(cfg['shots']))}",
                  file=sys.stderr)
            return EXIT_CONFIG
        try:
            place.check_enabled(cfg, args.set_name)
        except place.ConfigError as exc:
            print(str(exc), file=sys.stderr)
            return EXIT_CONFIG
        names = [args.set_name]
    else:
        print("нужен --set <имя> или --all; список: --list", file=sys.stderr)
        return EXIT_CONFIG

    out = os.path.abspath(args.output_dir)
    os.makedirs(out, exist_ok=True)
    for name in names:
        t0 = time.time()
        builder = {"greybox": greybox, "blend": place, "authored": authored}[cfg["shots"][name].get("source", "blend")]
        try:
            info = builder.build(cfg, name, args.samples, args.resolution)
        except place.ConfigError as exc:
            print(str(exc), file=sys.stderr)
            return EXIT_CONFIG
        report(name, info)
        # Save the actual material alongside the frame: future config edits
        # must not make an older comparison impossible to reproduce.
        info["pp"] = cfg["pp"]
        mode = info["print"]["mode"] if info["print"] else "clean"
        cup_tag = f"{info['cup']}ml" if str(info["cup"]).isdigit() else str(info["cup"])
        if info["print"] and info["print"].get("variant"):
            cup_tag += "-" + info["print"]["variant"]
        if info["print"] and info["print"].get("board"):
            cup_tag += "-" + info["print"]["board"]
        cups = info.get("cups") or []
        if len(cups) > 1:
            two = cups[1]
            cup_tag += "+" + str(two["id"]) + (f"-{two['variant']}" if two.get("variant") else "") \
                + (f"-{two['board']}" if two.get("board") else "")
            mode += "_" + (info.get("group") or {}).get("layout", "pair")
        stem = f"{name}_{cup_tag}_{mode}"
        comp = info.get("compose") or {}
        if comp and comp["preset"] != compose.presets(cfg["shots"][name])[0]["id"]:
            stem += "_" + comp["preset"]
        if comp and comp["frame"] != "1:1":
            stem += "_" + comp["frame"].replace(":", "x")
        info["files"] = {}
        if args.asset and abs(info["scale"] - 1.0) > 1e-9:
            print("###   ассет не пишется: в этом фоне стакан отмасштабирован "
                  "под сцену; берите его из фотобокса")
        elif args.asset:
            info["files"]["asset"] = write_asset(info, info["cup"])
            print("###   ассет: " + info["files"]["asset"])
        if not args.no_save:
            info["files"]["blend"] = place.save(out, stem)
            print("###   blend: " + info["files"]["blend"])
        if args.render:
            info["files"]["image"] = place.render(info["scene"], out, stem)
            print("###   кадр: " + info["files"]["image"])
        with io.open(os.path.join(out, stem + ".json"), "w", encoding="utf-8") as fh:
            fh.write(json.dumps(info, ensure_ascii=False, indent=2) + "\n")
        print(f"###   итого {time.time() - t0:.1f} с")
    return 0


if __name__ == "__main__":
    sys.exit(main())
