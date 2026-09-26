"""Выгрузка фонов для превью (этап 3): снимки, свет, площадка, камеры.

Превью в браузере (web/preview) показывает будущий кадр до рендера: под
настоящими 3D-стаканами лежит снимок фона из той же камеры. Кадр под стаканы
вырезается из снимка (bk/frame.py), поэтому превью совпадает с рендером, пока
камера фона не двигается. На каждый фон уезжает папка web/scenes/<фон>/:

    <ракурс>.webp  снимок фона без стакана и его тени, окно с запасом OVERSCAN
    env.hdr        панорама света из точки, где стоит стакан (линейная)
    scene.json     камеры ракурсов, окна кадров, оси и карта высот площадки

Координаты в scene.json — мировые Blender (Z вверх), как есть: превью кладёт
всю сцену в группу, повёрнутую на −90° вокруг X, и внутри неё живёт в осях
Blender. Модели стаканов (web/cups) выгружены так же, без перевода в Y-вверх.

Карта площадки — сетка в осях сцены (вправо по кадру, вглубь): где опора и
где помеха над полом (heightmap). По ней превью ставит стакан на опору и не
пускает его в декор; окончательно место проверяет рендер лучами
(group.spot_ok).

    blender -b --factory-startup -P engine/tools/export_preview.py -- --all
    blender -b --factory-startup -P engine/tools/export_preview.py -- --set living --quick
    blender -b --factory-startup -P engine/tools/export_preview.py -- --set living --preset high

Ноутбуку полегче: сначала --meta-only (без рендера), потом --quick --missing
--pause 20 — черновые снимки по одному, с передышкой.
"""

import argparse
import base64
import datetime
import io
import json
import math
import os
import struct
import sys
import time

import bpy
from mathutils import Vector

ENGINE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if ENGINE not in sys.path:
    sys.path.insert(0, ENGINE)
PROJECT = os.path.dirname(ENGINE)

BACKDROP_PX = 2400          # сторона снимка: кадр фона в нём — 1500 px, мелкий стакан — 825 px
BACKDROP_SAMPLES = 128         # подложка превью: с шумоподавлением хватает, вдвое быстрее
QUICK_SAMPLES = 48             # черновая подложка (--quick): 1200 px, в разы легче для ноутбука
PANO = (512, 256)
PANO_SAMPLES = 256
GRID_HALF_MM = 320          # площадка ±32 см от места героя
GRID_STEP_MM = 4
GRID_SUPPORT_MM = 60        # опору ищем лучом вниз отсюда (spot_ok — с 0,3 роста, до 54 мм)
GRID_DOWN_MM = 600          # и не глубже этого под полом героя
GRID_TOP_MM = 260           # помехи ищем лучом вверх до этой высоты: выше самого высокого стакана
NO_HIT = -32768             # в карте высот: под лучом ничего


def log(msg: str) -> None:
    print("### " + msg, flush=True)


def vec(v) -> list:
    return [round(float(c), 6) for c in v]


def cup_objects(scene):
    from bk.place import PREFIX
    coll = bpy.data.collections.get(PREFIX + "Cup")
    if coll is None:
        raise RuntimeError("в сцене нет коллекции BK_Cup — стакан не собрался")
    return [ob for ob in coll.all_objects if ob.type == "MESH"]


def render_to(scene, path: str, fmt: str = "WEBP", samples=None) -> float:
    scene.render.image_settings.file_format = fmt
    scene.render.image_settings.color_mode = "RGB"
    if fmt == "WEBP":
        scene.render.image_settings.quality = 90
    if samples is not None:
        scene.cycles.samples = int(samples)
    scene.render.filepath = path
    t0 = time.time()
    with bpy.context.temp_override(scene=scene):
        bpy.ops.render.render(write_still=True)
    return time.time() - t0


def shoot_panorama(scene, origin: Vector, path: str, samples: int) -> None:
    """Панорама из точки стакана — свет сцены для стаканов в превью.

    Снимается без тонмаппинга: превью получает линейный свет и само проводит
    его через тот же конвейер, что и стакан.

    Лампы на время съёмки видимы камере. Иначе панорама видит только то, что
    лампы осветили, а не их самих: в «Тёмной студии» прожектор — главный и
    почти единственный свет, и без него стакан в превью выходил чёрным.
    """
    data = bpy.data.cameras.new("PREVIEW_PANO")
    data.type = "PANO"
    data.panorama_type = "EQUIRECTANGULAR"
    obj = bpy.data.objects.new("PREVIEW_PANO", data)
    obj.location = origin
    obj.rotation_euler = (math.radians(90), 0.0, 0.0)
    scene.collection.objects.link(obj)
    keep = (scene.camera, scene.view_settings.view_transform, scene.view_settings.look,
            scene.view_settings.exposure, scene.render.resolution_x, scene.render.resolution_y)
    lamps = [ob for ob in scene.objects if ob.type == "LIGHT"]
    was_visible = [ob.visible_camera for ob in lamps]
    for ob in lamps:
        ob.visible_camera = True
    scene.camera = obj
    scene.view_settings.view_transform = "Standard"
    scene.view_settings.look = "None"
    scene.view_settings.exposure = 0.0
    scene.render.resolution_x, scene.render.resolution_y = PANO
    t = render_to(scene, path, "HDR", samples)
    log(f"панорама {PANO[0]}x{PANO[1]} -> {os.path.basename(path)} ({t:.0f} с)")
    for ob, visible in zip(lamps, was_visible):
        ob.visible_camera = visible
    (scene.camera, scene.view_settings.view_transform, scene.view_settings.look,
     scene.view_settings.exposure, scene.render.resolution_x, scene.render.resolution_y) = keep
    bpy.data.objects.remove(obj, do_unlink=True)
    bpy.data.cameras.remove(data, do_unlink=True)


def key_light(scene, focus: Vector):
    """Главный источник сцены: направление на него, цвет; у солнца — ещё сила."""
    best = None
    for ob in scene.objects:
        if ob.type != "LIGHT" or not ob.visible_get():
            continue
        light = ob.data
        to_focus = focus - ob.matrix_world.translation
        dist = max(to_focus.length, 1e-6)
        if light.type == "SUN":
            power = light.energy
            direction = (ob.matrix_world.to_quaternion() @ Vector((0.0, 0.0, -1.0))).normalized()
        else:
            power = light.energy / (dist * dist)
            direction = to_focus / dist
        if best is None or power > best["power"]:
            best = {"power": power, "type": light.type, "direction": vec(-direction),
                    "color": [round(c, 4) for c in light.color], "name": ob.name}
            # Солнце в панораму не попадает (оно «на бесконечности»), поэтому
            # превью ставит ему источник по его силе: W/м² Blender — это
            # освещённость, которую three.js примет один в один.
            if light.type == "SUN":
                best["irradiance"] = round(light.energy, 4)
                best["angleDeg"] = round(math.degrees(light.angle), 3)
    if best:
        best.pop("power")
    return best


def heightmap(scene, stage: dict, step_mm: float) -> dict:
    """Площадка сеткой в осях сцены — те же два вопроса, что задаёт group.spot_ok:

    support — где опора: луч вниз с высоты GRID_SUPPORT_MM над полом героя;
    ceil    — где помеха сверху: луч вверх с пола героя (+2 мм) до GRID_TOP_MM.

    Мм от пола героя, шаг 0,25 мм. Абажур над столом виден только в ceil —
    под ним стакан встать может, если помещается по росту. Стаканы на время
    замера выключены (hide_viewport).
    """
    origin = Vector(stage["origin"])
    right, fwd = Vector(stage["right"]), Vector(stage["fwd"])
    mm = 0.001 * stage["units_per_m"]
    n = int(round(2 * GRID_HALF_MM / step_mm)) + 1
    down, up = Vector((0.0, 0.0, -1.0)), Vector((0.0, 0.0, 1.0))
    with bpy.context.temp_override(scene=scene, view_layer=scene.view_layers[0]):
        bpy.context.view_layer.update()
        dg = bpy.context.evaluated_depsgraph_get()

    def cast(start_mm: float, direction: Vector, length_mm: float) -> list:
        vals = []
        for j in range(n):
            y = -GRID_HALF_MM + j * step_mm
            for i in range(n):
                x = -GRID_HALF_MM + i * step_mm
                p = origin + (right * x + fwd * y) * mm + Vector((0.0, 0.0, start_mm * mm))
                hit, loc, _n, _i, _ob, _m = scene.ray_cast(dg, p, direction, distance=length_mm * mm)
                vals.append(max(-32767, min(32767, int(round((loc.z - origin.z) / mm * 4)))) if hit else NO_HIT)
        return vals

    def pack(vals: list) -> str:
        return base64.b64encode(struct.pack("<%dh" % len(vals), *vals)).decode("ascii")

    support = cast(GRID_SUPPORT_MM, down, GRID_SUPPORT_MM + GRID_DOWN_MM)
    ceil = cast(2.0, up, GRID_TOP_MM)
    return {"halfMm": GRID_HALF_MM, "stepMm": step_mm, "n": n, "supportFromMm": GRID_SUPPORT_MM,
            "topMm": GRID_TOP_MM, "scale": 0.25, "noHit": NO_HIT, "encoding": "int16le-base64",
            "heights": pack(support), "ceil": pack(ceil)}


def export_set(cfg: dict, name: str, out_root: str, quick: bool, only=None,
               meta_only: bool = False, missing: bool = False, pause: float = 0.0) -> dict:
    """Выгрузить фон: по ракурсу снимок и камера, один раз — свет и площадка.

    meta_only — без рендера вовсе: камеры, окна и карта площадки (секунды на
    фон); превью без снимка показывает серый фон. only — снимать только эти
    ракурсы; missing — только те, у которых снимка ещё нет. pause — передышка
    видеокарте после каждого снимка, с.
    """
    from bk import authored, compose, frame, greybox, place

    shot = cfg["shots"][name]
    builder = {"greybox": greybox, "blend": place, "authored": authored}[shot.get("source", "blend")]
    folder = os.path.join(out_root, name)
    os.makedirs(folder, exist_ok=True)
    px = BACKDROP_PX // 2 if quick else BACKDROP_PX
    samples = QUICK_SAMPLES if quick else BACKDROP_SAMPLES

    path = os.path.join(folder, "scene.json")
    old = {}
    if os.path.isfile(path):
        with io.open(path, "r", encoding="utf-8") as fh:
            old = json.load(fh)
    old_presets = {p["id"]: p for p in old.get("presets", [])}

    def has_image(pid: str) -> bool:
        e = old_presets.get(pid) or {}
        return bool(e.get("backdrop")) and os.path.isfile(os.path.join(folder, e["backdrop"]))

    all_presets = compose.presets(shot)
    presets = []
    data = None
    for pre in all_presets:
        shoot = not meta_only and (not only or pre["id"] in only) and not (missing and has_image(pre["id"]))
        cfg["_camera"] = pre["id"]
        cfg["_frame"] = "1:1"
        cfg["_cups"] = None
        cfg["cup_key"] = cfg["reference_cup"]
        t0 = time.time()
        info = builder.build(cfg, name, samples, px)
        scene = bpy.data.scenes[info["scene"]]
        cam = scene.camera
        comp = info["compose"]
        cups = cup_objects(scene)
        for ob in cups:
            ob.hide_render = True
        stage = comp["stage"]
        mm = 0.001 * stage["units_per_m"]
        href = info.get("scale_reference_mm", 135.3)

        if data is None:
            origin = Vector(stage["origin"])
            centre = origin + Vector((0.0, 0.0, href * mm * 0.5))
            env = os.path.join(folder, "env.hdr")
            if not meta_only and (not os.path.isfile(env) or not (only or missing)):
                shoot_panorama(scene, centre, env, 64 if quick else PANO_SAMPLES)
            # стаканы вон из сцены, пока лучи меряют площадку
            for ob in cups:
                ob.hide_viewport = True
            t = time.time()
            grid = heightmap(scene, stage, GRID_STEP_MM)
            for ob in cups:
                ob.hide_viewport = False
            log(f"{name}: карта площадки {grid['n']}×{grid['n']} ({time.time() - t:.1f} с)")
            rot = {"blend": shot.get("rotation_deg", (0, 0, 0)), "authored": shot.get("cup_rotation_deg", (0, 0, 0)),
                   "greybox": (0, 0, shot.get("cup_rotation_deg", 0))}[shot.get("source", "blend")]
            data = {
                "schema": 1,
                "id": name,
                "label": shot.get("title", name),
                "source": shot.get("source", "blend"),
                "exported": datetime.date.today().isoformat(),
                "maxCups": int(shot.get("max_cups", 2)),
                "reference": {"id": cfg["reference_cup"], "heightMm": href},
                "unitsPerM": stage["units_per_m"],
                "coords": "blender-z-up",
                "stage": {"origin": vec(stage["origin"]), "right": vec(stage["right"]),
                          "fwd": vec(stage["fwd"]), "cupRotationDeg": list(rot), "grid": grid},
                "environment": "env.hdr" if os.path.isfile(env) else None,
                "key": key_light(scene, centre),
                "color": {"transform": scene.view_settings.view_transform, "look": scene.view_settings.look,
                          "exposure": round(scene.view_settings.exposure, 4)},
                "fit": {"overscan": frame.OVERSCAN, "zoomLimits": list(frame.ZOOM_LIMITS),
                        "safeW": frame.SAFE_W, "margin": frame.MARGIN, "maxW": frame.MAX_W},
            }

        file = f"{pre['id']}.webp"
        prev = old_presets.get(pre["id"]) or {}
        image = {"backdrop": prev.get("backdrop") if has_image(pre["id"]) else None,
                 "backdropPx": prev.get("backdropPx") if has_image(pre["id"]) else None}
        if shoot:
            # снимок: окно с запасом, диаметр зрачка тот же — размытие фона совпадает
            frame.set_window(scene, cam, tuple(comp["backdrop_window"]), px)
            t = render_to(scene, os.path.join(folder, file))
            image = {"backdrop": file, "backdropPx": [px, px]}
            log(f"{name}/{pre['id']}: снимок {px}×{px} ({t:.0f} с)")
        pos = cam.matrix_world.translation
        dist = (pos - Vector(stage["origin"])).length
        presets.append({
            "id": pre["id"], "label": pre.get("label", pre["id"]), "orbit": list(pre.get("orbit") or (0, 0)),
            # матрица камеры по столбцам (как Matrix4.fromArray в three.js)
            "camera": {"matrix": [round(cam.matrix_world[r][c], 8) for c in range(4) for r in range(4)],
                       "near": round(dist * 0.01, 6), "far": round(dist * 100.0, 3)},
            "baseWindow": comp["base_window"], "backdropWindow": comp["backdrop_window"],
            **image,
            "fstop": round(cam.data.dof.aperture_fstop, 3) if cam.data.dof.use_dof else None,
        })
        log(f"{name}/{pre['id']}: готово за {time.time() - t0:.0f} с")
        # после каждого ракурса — на диск: обрыв не стоит уже снятого
        data["presets"] = presets + [old_presets[p["id"]] for p in all_presets[len(presets):]
                                     if p["id"] in old_presets]
        with io.open(path, "w", encoding="utf-8") as fh:
            fh.write(json.dumps(data, ensure_ascii=False, indent=1) + "\n")
        if shoot and pause > 0:
            time.sleep(pause)

    log(f"{name}: scene.json, ракурсов {len(presets)}")
    return data


def repano(cfg: dict, name: str, out_root: str, quick: bool) -> None:
    """Переснять только панораму света (без снимков и карты площадки)."""
    from bk import authored, greybox, place

    shot = cfg["shots"][name]
    builder = {"greybox": greybox, "blend": place, "authored": authored}[shot.get("source", "blend")]
    cfg["_camera"] = None
    cfg["_frame"] = "1:1"
    cfg["_cups"] = None
    cfg["cup_key"] = cfg["reference_cup"]
    info = builder.build(cfg, name, 16, 400)
    scene = bpy.data.scenes[info["scene"]]
    for ob in cup_objects(scene):
        ob.hide_render = True
    stage = info["compose"]["stage"]
    href = info.get("scale_reference_mm", 135.3)
    centre = Vector(stage["origin"]) + Vector((0.0, 0.0, href * 0.001 * stage["units_per_m"] * 0.5))
    shoot_panorama(scene, centre, os.path.join(out_root, name, "env.hdr"), 64 if quick else PANO_SAMPLES)


def regrid(cfg: dict, name: str, out_root: str, quick: bool) -> None:
    """Пересчитать только карту площадки (без снимков и панорамы)."""
    from bk import authored, greybox, place

    shot = cfg["shots"][name]
    builder = {"greybox": greybox, "blend": place, "authored": authored}[shot.get("source", "blend")]
    path = os.path.join(out_root, name, "scene.json")
    with io.open(path, "r", encoding="utf-8") as fh:
        data = json.load(fh)
    cfg["_camera"] = None
    cfg["_frame"] = "1:1"
    cfg["_cups"] = None
    cfg["cup_key"] = cfg["reference_cup"]
    info = builder.build(cfg, name, 16, 400)
    scene = bpy.data.scenes[info["scene"]]
    for ob in cup_objects(scene):
        ob.hide_viewport = True
    t = time.time()
    data["stage"]["grid"] = heightmap(scene, info["compose"]["stage"], GRID_STEP_MM)
    log(f"{name}: карта площадки {data['stage']['grid']['n']}² ({time.time() - t:.1f} с)")
    with io.open(path, "w", encoding="utf-8") as fh:
        fh.write(json.dumps(data, ensure_ascii=False, indent=1) + "\n")


def main() -> int:
    raw = sys.argv[1:]
    argv = raw[raw.index("--") + 1:] if "--" in raw else []
    ap = argparse.ArgumentParser(prog="export_preview.py")
    ap.add_argument("--set", dest="set_name")
    ap.add_argument("--all", action="store_true")
    ap.add_argument("--preset", nargs="*", default=None, help="переснять только эти ракурсы")
    ap.add_argument("--quick", action="store_true", help="черновик: 1200 px, 48 сэмплов, сетка 8 мм")
    # сцены рендера живут в каталоге сайта: catalog/scenes/<фон>/ (CupViewer, этап Б)
    ap.add_argument("--out", default=os.path.join(os.path.dirname(PROJECT), "catalog", "scenes"))
    ap.add_argument("--grid-only", action="store_true", help="пересчитать только карту площадки в scene.json")
    ap.add_argument("--index-only", action="store_true", help="переписать только web/scenes/index.json")
    ap.add_argument("--pano-only", action="store_true", help="переснять только панораму света env.hdr")
    ap.add_argument("--meta-only", action="store_true",
                    help="без рендера: камеры, окна и карта площадки (секунды на фон)")
    ap.add_argument("--missing", action="store_true", help="снять только ракурсы, у которых снимка нет")
    ap.add_argument("--pause", type=float, default=0.0,
                    help="пауза после каждого снимка, с — передышка видеокарте")
    args = ap.parse_args(argv)

    from bk import place
    cfg = place.load_config(os.path.join(ENGINE, "params", "shots.json"))
    cfg["print"]["enabled"] = False
    names = place.enabled_sets(cfg) if args.all else [args.set_name]
    if args.index_only:
        names = []
    if not args.index_only and (not names or names == [None]):
        print("нужен --set <фон> или --all", file=sys.stderr)
        return 2
    out = os.path.abspath(args.out)
    for name in names:
        if name not in cfg["shots"]:
            print(f"фона {name!r} нет", file=sys.stderr)
            return 2
        try:
            place.check_enabled(cfg, name)
        except place.ConfigError as exc:
            print(str(exc), file=sys.stderr)
            return 2
        t0 = time.time()
        if args.grid_only:
            regrid(cfg, name, out, args.quick)
            continue
        if args.pano_only:
            repano(cfg, name, out, args.quick)
            continue
        export_set(cfg, name, out, args.quick, args.preset, meta_only=args.meta_only,
                   missing=args.missing, pause=args.pause)
        log(f"{name}: всё за {time.time() - t0:.0f} с")
    # Список сцен — в формате каталога сайта (catalog/scenes/index.json, схема 2):
    # порядок — ключ order в файле фона, первая сцена открывается по умолчанию.
    index = []
    for name in sorted(place.enabled_sets(cfg), key=lambda n: (cfg["shots"][n].get("order", 99), n)):
        p = os.path.join(out, name, "scene.json")
        if not os.path.isfile(p):
            continue
        with io.open(p, "r", encoding="utf-8") as fh:
            d = json.load(fh)
        row = {"id": name, "name": d["label"]}
        if cfg["shots"][name].get("note"):
            row["note"] = cfg["shots"][name]["note"]
        row["maxCups"] = d["maxCups"]
        row["presets"] = [{"id": x["id"], "label": x["label"]} for x in d["presets"]]
        index.append(row)
    with io.open(os.path.join(out, "index.json"), "w", encoding="utf-8", newline="\n") as fh:
        fh.write(json.dumps({"schemaVersion": 2, "scenes": index}, ensure_ascii=False, indent=2) + "\n")
    return 0


if __name__ == "__main__":
    sys.exit(main())
