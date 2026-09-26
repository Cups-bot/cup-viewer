"""Экспорт фона для веб-просмотрщика: кадр без стакана, панорама света, камера.

Просмотрщик (Cups-bot/cup-viewer) показывает стакан в настоящей снятой сцене:
фон приезжает картинкой, а сам стакан живёт в браузере и крутится. Чтобы он
встал в кадр ровно на своё место и был освещён тем же светом, отсюда уезжают
четыре файла на сцену:

    backdrop.webp       кадр сцены БЕЗ стакана (и без его тени) — десктоп
    backdrop-tall.webp  тот же кадр вертикальным — телефон
    env.hdr             панорама из точки, где стоял стакан, — это и есть свет
    scene.json          камера, пол, масштаб сцены
    shadow-<объём>.webp тень стакана отдельным слоем, с прозрачностью

Стакан не удаляется, а прячется от рендера: сцена собирается ровно так же, как
для мокапа (тот же bk/place, тот же свет, та же камера), поэтому кадр
гарантированно совпадает с эталонным мокапом до пикселя.

ТЕНЬ СНИМАЕТСЯ ОТДЕЛЬНЫМ СЛОЕМ (--shadows). Считать её в браузере дешевле —
она работает с любой моделью каталога, — но настоящая тень из Cycles мягче и
честнее, особенно там, где свет сложный. Слой снимается для КАЖДОГО объёма
отдельно: тень зависит от того, что её отбрасывает. В браузере он кладётся
поверх фона, а расчётная тень на это время выключается.

Запуск:

    blender -b --factory-startup -P tools/export_web_scene.py -- --set cream
    blender -b --factory-startup -P tools/export_web_scene.py -- --all --out ../../Cups-bot/cup-viewer/assets/scenes
    blender -b --factory-startup -P tools/export_web_scene.py -- --set cream --quick

`--quick` — черновик для проверки пайплайна: мало сэмплов и половинный размер.

Тени стаканов:

    blender -b -P tools/export_web_scene.py -- --set living --catalog-shadows

снимает слой тени каждой модели из каталога просмотрщика и переснимает только
те, у которых файл модели или рост в каталоге изменились. ЭТУ КОМАНДУ НАДО
ПРОГНАТЬ ПОСЛЕ ЛЮБОГО ДОБАВЛЕНИЯ ИЛИ ЗАМЕНЫ .glb: без снятой тени стакан
встанет на снимок с расчётной, а она заметно грубее. `--force` переснимает всё.
"""

import argparse
import hashlib
import io
import json
import math
import os
import re
import sys
import time

import bpy
from mathutils import Vector

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

# Сцены, которые едут в веб. Остальные фоны из mockup/sets остаются мокапами.
# Сцена сейчас одна: кремовую и тёмную студию из просмотрщика убрали. Вернуть
# любую из них — дописать сюда имя фона и в js/data/scenes.js подпись.
WEB_SETS = ("living",)

# Код возврата при ошибке в аргументах — как у run.py.
EXIT_CONFIG = 2

# Размеры кадров. Квадрат — потому что сцены сняты квадратными; вертикальный
# кадр нужен телефону, где сцена на странице выше, чем шире.
WIDE = (1600, 1600)
TALL = (1200, 1800)

# Панорама света. Она уходит в отражения и заполняющий свет, где всё равно
# размывается, поэтому большего разрешения не нужно — а вес имеет значение.
PANO = (512, 256)
PANO_SAMPLES = 256

# Объём стакана, по которому снимается сцена. От него зависит только масштаб
# (mmPerUnit): в браузере на это место встанет любая модель каталога.
REFERENCE_CUP = "500"

# Объёмы, для которых снимается слой тени.
SHADOW_CUPS = ("410", "500", "650")

# Тень мягкая и всё равно уходит под денойзер, поэтому сэмплов ей нужно
# заметно меньше, чем кадру: время съёмки сцены иначе утраивается.
SHADOW_SAMPLES = 128


def log(message):
    print("### " + message, flush=True)


def fov_deg(cam_data, width, height):
    """Углы обзора кадра в градусах — так же, как их считает сам Blender."""
    sensor_w, sensor_h = cam_data.sensor_width, cam_data.sensor_height
    aspect = width / height
    fit = cam_data.sensor_fit

    if fit == "AUTO":
        # Размер сенсора ложится на БОЛЬШУЮ сторону кадра: у вертикального
        # кадра тот же объектив даёт другой горизонтальный угол.
        if aspect >= 1.0:
            sx, sy = sensor_w, sensor_w / aspect
        else:
            sx, sy = sensor_w * aspect, sensor_w
    elif fit == "HORIZONTAL":
        sx, sy = sensor_w, sensor_w / aspect
    else:
        sx, sy = sensor_h * aspect, sensor_h

    return (
        round(math.degrees(2 * math.atan(sx / (2 * cam_data.lens))), 4),
        round(math.degrees(2 * math.atan(sy / (2 * cam_data.lens))), 4),
    )


def to_three(vec):
    """Blender (Z вверх) → three.js (Y вверх)."""
    return [round(vec.x, 5), round(vec.z, 5), round(-vec.y, 5)]


def cup_objects(scene):
    """Объекты стакана: коллекция BK_Cup, которую собирает bk/place."""
    from bk.place import PREFIX

    coll = bpy.data.collections.get(PREFIX + "Cup")
    if coll is None:
        raise RuntimeError("в сцене нет коллекции BK_Cup — стакан не собрался")
    return [ob for ob in coll.all_objects if ob.type == "MESH"]


def hide_from_render(objects):
    """Убрать стакан из кадра вместе с его тенью и отражением."""
    for ob in objects:
        ob.hide_render = True
        # visible_shadow не трогаем: hide_render убирает объект из трассировки
        # целиком, а частичная видимость оставила бы тень без предмета.


def render_frame(scene, path, width, height, samples=None):
    scene.render.resolution_x = width
    scene.render.resolution_y = height
    scene.render.resolution_percentage = 100
    scene.render.image_settings.file_format = "WEBP"
    scene.render.image_settings.color_mode = "RGB"
    scene.render.image_settings.quality = 92
    scene.render.filepath = path
    if samples is not None:
        scene.cycles.samples = int(samples)

    t0 = time.time()
    with bpy.context.temp_override(scene=scene):
        bpy.ops.render.render(write_still=True)
    log(f"кадр {width}x{height} -> {os.path.basename(path)} ({time.time() - t0:.0f} с)")


def shoot_panorama(scene, origin, path, samples=PANO_SAMPLES):
    """Панорама из точки, где стоял стакан: это и есть свет сцены.

    Снимается БЕЗ view transform — панорама должна остаться линейной, иначе в
    браузере свет приедет уже пожатым и второй раз пройдёт через тонмаппинг.
    """
    data = bpy.data.cameras.new("WEB_PANO")
    data.type = "PANO"
    data.panorama_type = "EQUIRECTANGULAR"
    obj = bpy.data.objects.new("WEB_PANO", data)
    obj.location = origin
    # Панораму снимаем «стоя»: у равнопромежуточной камеры горизонт лежит по
    # середине кадра, когда камера смотрит вдоль -Y и не завалена.
    obj.rotation_euler = (math.radians(90), 0.0, 0.0)
    scene.collection.objects.link(obj)

    previous_cam = scene.camera
    previous = (
        scene.view_settings.view_transform,
        scene.view_settings.look,
        scene.render.resolution_x,
        scene.render.resolution_y,
        scene.render.image_settings.file_format,
        scene.cycles.samples,
    )

    scene.camera = obj
    scene.view_settings.view_transform = "Standard"
    scene.view_settings.look = "None"
    scene.render.resolution_x, scene.render.resolution_y = PANO
    scene.render.image_settings.file_format = "HDR"
    scene.cycles.samples = int(samples)
    scene.render.filepath = path

    t0 = time.time()
    with bpy.context.temp_override(scene=scene):
        bpy.ops.render.render(write_still=True)
    log(f"панорама {PANO[0]}x{PANO[1]} -> {os.path.basename(path)} ({time.time() - t0:.0f} с)")

    scene.camera = previous_cam
    (
        scene.view_settings.view_transform,
        scene.view_settings.look,
        scene.render.resolution_x,
        scene.render.resolution_y,
        scene.render.image_settings.file_format,
        scene.cycles.samples,
    ) = previous
    bpy.data.objects.remove(obj, do_unlink=True)
    bpy.data.cameras.remove(data, do_unlink=True)


def describe_key_light(scene, focus):
    """Главный источник сцены: направление, цвет и относительная сила.

    ЗАЧЕМ, если есть панорама. Панорама — это то, что ВИДНО из точки стакана, а
    лампы в рендере не видны: в неё попадают только освещённые ими поверхности.
    Прямой свет прожектора в ней поэтому отсутствует, и в тёмной студии стакан
    оставался почти чёрным, хотя в мокапе он в световом пятне.

    Сила считается как освещённость в точке стакана (энергия, делённая на
    квадрат расстояния) — она нужна лишь для того, чтобы выбрать среди ламп
    главную и соотнести их между собой; окончательную яркость в браузере
    задаёт коэффициент сцены.
    """
    best = None
    for ob in scene.objects:
        if ob.type != "LIGHT" or not ob.visible_get():
            continue
        light = ob.data
        origin = ob.matrix_world.translation
        to_focus = focus - origin
        distance = max(to_focus.length, 1e-6)

        if light.type == "SUN":
            # У солнца затухания нет, и направление задаёт сам объект.
            power = light.energy
            direction = (ob.matrix_world.to_quaternion() @ Vector((0.0, 0.0, -1.0))).normalized()
        else:
            power = light.energy / (distance * distance)
            direction = (to_focus / distance)

        if best is None or power > best["power"]:
            best = {
                "power": power,
                "type": light.type,
                # Направление, откуда светит, — как его ждёт просмотрщик.
                "direction": to_three(-direction),
                "color": [round(c, 4) for c in light.color],
                "energy": round(light.energy, 2),
                "distance": round(distance, 4),
                "name": ob.name,
            }

    if best is None:
        return None
    best.pop("power")
    return best


def render_shadow_layer(scene, cup, path, size, samples):
    """Тень стакана отдельным слоем: прозрачный кадр, где есть только она.

    Приём стандартный для композитинга: всё, что было в сцене, объявляется
    ловушкой тени (shadow catcher) и потому само не рисуется — Cycles выводит
    лишь то, НАСКОЛЬКО эти поверхности потемнели от постороннего предмета.
    Сам стакан из кадра убран, но в трассировке остаётся, иначе тени не от чего
    было бы взяться.
    """
    catchers = []
    for ob in scene.objects:
        if ob.type != "MESH" or ob in cup:
            continue
        if not ob.is_shadow_catcher:
            ob.is_shadow_catcher = True
            catchers.append(ob)

    for ob in cup:
        ob.hide_render = False
        ob.visible_camera = False

    previous = (
        scene.render.film_transparent,
        scene.render.image_settings.color_mode,
        scene.render.image_settings.file_format,
        scene.cycles.samples,
        scene.render.resolution_x,
        scene.render.resolution_y,
    )

    scene.render.film_transparent = True
    scene.render.image_settings.file_format = "WEBP"
    scene.render.image_settings.color_mode = "RGBA"
    scene.render.image_settings.quality = 92
    scene.render.resolution_x, scene.render.resolution_y = size
    scene.cycles.samples = int(samples)
    scene.render.filepath = path

    t0 = time.time()
    with bpy.context.temp_override(scene=scene):
        bpy.ops.render.render(write_still=True)
    log(f"тень {size[0]}x{size[1]} -> {os.path.basename(path)} ({time.time() - t0:.0f} с)")

    (
        scene.render.film_transparent,
        scene.render.image_settings.color_mode,
        scene.render.image_settings.file_format,
        scene.cycles.samples,
        scene.render.resolution_x,
        scene.render.resolution_y,
    ) = previous
    for ob in catchers:
        ob.is_shadow_catcher = False
    for ob in cup:
        ob.visible_camera = True
        ob.hide_render = True


def import_web_cup(scene, path, mm_per_unit, origin_xy, base_z, height_mm=None):
    """Ставит в сцену модель из каталога просмотрщика.

    Тень нужна и тем стаканам, которых в этом проекте нет: бумажные живут в
    соседнем (3D_HB80-280), а в вебе они в одном каталоге с пластиком. Файл
    берётся тот же самый, что показывает браузер, — тогда и тень будет от него,
    а не от похожей модели.

    Модель в .glb лежит в метрах, сцена живёт в своих единицах: отсюда
    единственный множитель — сколько метров в единице сцены.
    """
    from bk import place

    before = set(bpy.data.objects)
    with bpy.context.temp_override(scene=scene):
        bpy.ops.import_scene.gltf(filepath=path)
    fresh = [ob for ob in bpy.data.objects if ob not in before]
    if not fresh:
        raise RuntimeError(f"{path}: модель не импортировалась")

    # Импорт кладёт объекты в активную коллекцию — переносим их в нужную сцену.
    for ob in fresh:
        for coll in list(ob.users_collection):
            coll.objects.unlink(ob)
        scene.collection.objects.link(ob)

    roots = [ob for ob in fresh if ob.parent not in fresh]
    meshes = [ob for ob in fresh if ob.type == "MESH"]

    with bpy.context.temp_override(scene=scene, view_layer=scene.view_layers[0]):
        bpy.context.view_layer.update()

    # Рост берётся из каталога просмотрщика, а не из файла: браузер ставит
    # стакан ровно по нему (ModelLoader.setNaturalHeight), и тень обязана быть
    # от предмета того же роста. Единицы самого файла при этом не важны вовсе —
    # среди моделей есть и заглушка в условных единицах.
    raw = place.world_bbox(meshes)
    raw_height = raw["max"][2] - raw["min"][2]
    if not height_mm:
        # Одиночная съёмка без каталога: единицы определяются по файлу. Стакан
        # бывает и в метрах (0.135), и в миллиметрах (88) — между ними три
        # порядка, спутать нельзя.
        height_mm = raw_height * (1.0 if raw_height > 10 else 1000.0)

    scale = (height_mm / mm_per_unit) / raw_height
    for ob in roots:
        ob.scale = (ob.scale[0] * scale, ob.scale[1] * scale, ob.scale[2] * scale)

    with bpy.context.temp_override(scene=scene, view_layer=scene.view_layers[0]):
        bpy.context.view_layer.update()

    box = place.world_bbox(meshes)
    shift = (
        origin_xy[0] - (box["min"][0] + box["max"][0]) / 2,
        origin_xy[1] - (box["min"][1] + box["max"][1]) / 2,
        base_z - box["min"][2],
    )
    for ob in roots:
        ob.location = (ob.location[0] + shift[0], ob.location[1] + shift[1], ob.location[2] + shift[2])

    with bpy.context.temp_override(scene=scene, view_layer=scene.view_layers[0]):
        bpy.context.view_layer.update()

    box = place.world_bbox(meshes)
    log(f"модель {os.path.basename(path)}: высота {(box['max'][2] - box['min'][2]) * mm_per_unit:.1f} мм, "
        f"основание {box['min'][2]:.4f}")
    return fresh, meshes


def shadow_stage(cfg, name, out_root, quick=False):
    """Готовит сцену к съёмке теней и отдаёт всё, что для этого нужно.

    Сборка сцены — самая долгая часть, а от стакана к стакану она не меняется:
    свет, мебель и камера те же. Поэтому она вынесена сюда и делается один раз
    на весь каталог.
    """
    from bk import authored, greybox, place as place_mod

    shot = cfg["shots"][name]
    builder = {"greybox": greybox, "blend": place_mod, "authored": authored}[shot.get("source", "blend")]
    folder = os.path.join(out_root, name)
    os.makedirs(folder, exist_ok=True)

    size = WIDE if not quick else (WIDE[0] // 2, WIDE[1] // 2)
    tall = TALL if not quick else (TALL[0] // 2, TALL[1] // 2)
    samples = 32 if quick else SHADOW_SAMPLES

    info = builder.build(cfg, name, samples, max(size))
    scene = bpy.data.scenes[info["scene"]]

    # Родной стакан сцены нужен только как мерка: по нему берутся точка
    # постановки и масштаб. Из кадра он уходит целиком.
    native = cup_objects(scene)
    box = place_mod.world_bbox(native)
    base_z = box["min"][2]
    origin_xy = ((box["min"][0] + box["max"][0]) / 2, (box["min"][1] + box["max"][1]) / 2)
    mm_per_unit = info["cup_height_mm"] / (box["max"][2] - base_z)
    for ob in native:
        ob.hide_render = True

    return {
        "scene": scene,
        "folder": folder,
        "size": size,
        "tall": tall,
        "samples": samples,
        "base_z": base_z,
        "origin_xy": origin_xy,
        "mm_per_unit": mm_per_unit,
    }


def shoot_cup_shadow(stage, glb, cup_id, height_mm=None, reference=False):
    """Два слоя тени (горизонтальный и вертикальный кадр) для одной модели."""
    fresh, meshes = import_web_cup(
        stage["scene"], glb, stage["mm_per_unit"], stage["origin_xy"], stage["base_z"], height_mm
    )

    written = {}
    wide_path = os.path.join(stage["folder"], f"shadow-{cup_id}.webp")
    render_shadow_layer(stage["scene"], meshes, wide_path, stage["size"], stage["samples"])
    written["wide"] = os.path.basename(wide_path)

    tall_path = os.path.join(stage["folder"], f"shadow-{cup_id}-tall.webp")
    render_shadow_layer(stage["scene"], meshes, tall_path, stage["tall"], stage["samples"])
    written["tall"] = os.path.basename(tall_path)

    if reference:
        # Контрольный кадр СО стаканом: по нему сверяют посадку и свет.
        for ob in meshes:
            ob.hide_render = False
            ob.visible_camera = True
        render_frame(
            stage["scene"],
            os.path.join(stage["folder"], f"reference-{cup_id}.webp"),
            *stage["size"],
            samples=stage["samples"],
        )

    for ob in fresh:
        bpy.data.objects.remove(ob, do_unlink=True)
    return written


def update_scene_json(stage, name, shadows, sources=None):
    """Дописывает снятые тени в описание сцены, не трогая остального."""
    scene_json = os.path.join(stage["folder"], "scene.json")
    if not os.path.isfile(scene_json):
        log(f"{name}: scene.json рядом не найден — тени сняты, список не обновлён")
        return
    with io.open(scene_json, "r", encoding="utf-8") as fh:
        data = json.load(fh)
    data.setdefault("shadows", {}).update(shadows)
    if sources:
        data.setdefault("shadowSources", {}).update(sources)
    data["shadowFrames"] = {"wide": list(stage["size"]), "tall": list(stage["tall"])}
    with io.open(scene_json, "w", encoding="utf-8") as fh:
        fh.write(json.dumps(data, ensure_ascii=False, indent=2) + "\n")


def export_web_cup_shadow(cfg, name, out_root, glb, cup_id, quick=False, reference=False):
    """Слой тени для одной модели, указанной файлом. Разовая съёмка."""
    stage = shadow_stage(cfg, name, out_root, quick=quick)
    written = shoot_cup_shadow(stage, glb, cup_id, reference=reference)
    update_scene_json(stage, name, {cup_id: written})
    log(f"{name}: тень снята для {cup_id}")
    return written


def viewer_root(out_root):
    """Корень просмотрщика: assets/scenes лежит внутри него."""
    return os.path.dirname(os.path.dirname(os.path.abspath(out_root)))


def read_cup_catalog(root):
    """Каталог стаканов из js/data/models.js — id, файл модели и рост.

    Каталог читается из самого просмотрщика, а не дублируется здесь: тень
    нужна ровно тем моделям, которые он показывает, и ровно того роста, с
    которым он их ставит. Разбор простой — файл наш, формат в нём один и тот
    же (см. шапку models.js).
    """
    path = os.path.join(root, "js", "data", "models.js")
    with io.open(path, "r", encoding="utf-8") as fh:
        text = fh.read()

    body = text[text.index("CUP_MODELS"):]
    body = body[:body.index("]);")]

    marks = list(re.finditer(r"^\s*id:\s*'([^']+)'", body, re.M))
    cups = []
    for i, mark in enumerate(marks):
        chunk = body[mark.end(): marks[i + 1].start() if i + 1 < len(marks) else len(body)]
        file_mark = re.search(r"^\s*file:\s*'([^']+)'", chunk, re.M)
        height_mark = re.search(r"height:\s*([\d.]+)", chunk)
        if not file_mark or not height_mark:
            log(f"каталог: у {mark.group(1)} не нашлось файла или высоты — пропускаю")
            continue
        cups.append({
            "id": mark.group(1),
            "file": os.path.join(root, file_mark.group(1).replace("/", os.sep)),
            "height_mm": float(height_mark.group(1)),
        })
    if not cups:
        raise RuntimeError(f"{path}: каталог не разобрался")
    return cups


def model_fingerprint(cup, stage_size):
    """Отпечаток модели: по нему видно, что тень устарела.

    Меняется вместе с самим файлом (побайтово), с ростом из каталога и с
    размером кадра — то есть со всем, от чего тень зависит.
    """
    digest = hashlib.sha1()
    with io.open(cup["file"], "rb") as fh:
        for block in iter(lambda: fh.read(1 << 20), b""):
            digest.update(block)
    return f"{digest.hexdigest()[:16]}:{cup['height_mm']:g}:{stage_size}"


def export_catalog_shadows(cfg, name, out_root, quick=False, force=False, only=None, root=None):
    """Тени всем стаканам каталога — и только тем, у кого они устарели.

    ЗАЧЕМ ПРОВЕРКА СВЕЖЕСТИ. Съёмка одной тени — это два рендера Cycles, и
    гонять их на весь каталог из-за одной новой модели незачем. Отпечаток
    файла лежит в scene.json рядом со списком теней: добавили модель или
    заменили .glb — отпечаток разошёлся, и эта модель переснимается сама.
    """
    cups = read_cup_catalog(root or viewer_root(out_root))
    if only:
        wanted = set(only)
        missing = wanted - {cup["id"] for cup in cups}
        if missing:
            raise RuntimeError(f"в каталоге нет: {', '.join(sorted(missing))}")
        cups = [cup for cup in cups if cup["id"] in wanted]

    folder = os.path.join(out_root, name)
    scene_json = os.path.join(folder, "scene.json")
    known, sources = {}, {}
    if os.path.isfile(scene_json):
        with io.open(scene_json, "r", encoding="utf-8") as fh:
            data = json.load(fh)
        known = data.get("shadows", {}) or {}
        sources = data.get("shadowSources", {}) or {}

    size_key = f"{WIDE[0]}x{WIDE[1]}+{TALL[0]}x{TALL[1]}" + ("q" if quick else "")
    stale = []
    for cup in cups:
        if not os.path.isfile(cup["file"]):
            log(f"{cup['id']}: файла {cup['file']} нет — пропускаю")
            continue
        entry = known.get(cup["id"])
        ready = isinstance(entry, dict) and bool(entry.get("wide")) and bool(entry.get("tall")) and all(
            os.path.isfile(os.path.join(folder, entry[frame])) for frame in ("wide", "tall")
        )
        mark = model_fingerprint(cup, size_key)
        if force or not ready or sources.get(cup["id"]) != mark:
            cup["mark"] = mark
            stale.append(cup)

    if not stale:
        log(f"{name}: тени всех {len(cups)} моделей свежие — снимать нечего")
        return {}

    log(f"{name}: переснимаю тени — {', '.join(cup['id'] for cup in stale)}")
    stage = shadow_stage(cfg, name, out_root, quick=quick)

    written, marks = {}, {}
    for cup in stale:
        written[cup["id"]] = shoot_cup_shadow(stage, cup["file"], cup["id"], height_mm=cup["height_mm"])
        marks[cup["id"]] = cup["mark"]
        # Пишем после каждой модели: съёмка каталога длинная, и обрыв на
        # середине не должен стоить уже снятого.
        update_scene_json(stage, name, written, marks)
    log(f"{name}: тени сняты для {', '.join(written)}")
    return written


def export_shadows(cfg, name, out_root, cups=SHADOW_CUPS, quick=False):
    """Слой тени на каждый объём. Сцена пересобирается: тень зависит от того,
    что её отбрасывает."""
    from bk import authored, greybox, place

    shot = cfg["shots"][name]
    builder = {"greybox": greybox, "blend": place, "authored": authored}[shot.get("source", "blend")]
    folder = os.path.join(out_root, name)
    os.makedirs(folder, exist_ok=True)

    size = WIDE if not quick else (WIDE[0] // 2, WIDE[1] // 2)
    samples = 32 if quick else SHADOW_SAMPLES
    written = {}

    for cup_key in cups:
        cfg["cup_key"] = cup_key
        info = builder.build(cfg, name, samples, max(size))
        scene = bpy.data.scenes[info["scene"]]
        cup = cup_objects(scene)
        hide_from_render(cup)

        path = os.path.join(folder, f"shadow-{cup_key}.webp")
        render_shadow_layer(scene, cup, path, size, samples)
        written[cup_key] = os.path.basename(path)

    # Дописываем в готовое описание сцены: сам кадр и панорама не менялись.
    scene_json = os.path.join(folder, "scene.json")
    with io.open(scene_json, "r", encoding="utf-8") as fh:
        data = json.load(fh)
    data["shadows"] = written
    data["shadowFrame"] = list(size)
    with io.open(scene_json, "w", encoding="utf-8") as fh:
        fh.write(json.dumps(data, ensure_ascii=False, indent=2) + "\n")
    log(f"{name}: тени сняты для объёмов {', '.join(written)}")
    return written


def export_set(cfg, name, out_root, quick=False, meta_only=False):
    from bk import authored, greybox, place

    shot = cfg["shots"][name]
    builder = {"greybox": greybox, "blend": place, "authored": authored}[shot.get("source", "blend")]

    samples = 64 if quick else None
    resolution = 800 if quick else max(WIDE)
    info = builder.build(cfg, name, samples, resolution)

    scene = bpy.data.scenes[info["scene"]]
    cam = scene.camera
    cup = cup_objects(scene)

    # Габарит стакана снимается ДО того, как он исчезнет из кадра: по нему
    # считается масштаб сцены и точка съёмки панорамы.
    box = place.world_bbox(cup)
    if box is None:
        raise RuntimeError("не удалось замерить стакан")
    base_z = box["min"][2]
    height_units = box["max"][2] - base_z
    center = ((box["min"][0] + box["max"][0]) / 2, (box["min"][1] + box["max"][1]) / 2)
    mm_per_unit = info["cup_height_mm"] / height_units

    hide_from_render(cup)
    log(f"{name}: стакан убран из кадра, высота {info['cup_height_mm']:.1f} мм = "
        f"{height_units:.4f} ед. ({mm_per_unit:.1f} мм/ед.)")

    folder = os.path.join(out_root, name)
    os.makedirs(folder, exist_ok=True)

    wide = WIDE if not quick else (WIDE[0] // 2, WIDE[1] // 2)
    tall = TALL if not quick else (TALL[0] // 2, TALL[1] // 2)

    if not meta_only:
        render_frame(scene, os.path.join(folder, "backdrop.webp"), *wide, samples=samples)
        render_frame(scene, os.path.join(folder, "backdrop-tall.webp"), *tall, samples=samples)
        shoot_panorama(
            scene,
            (center[0], center[1], base_z + height_units / 2),
            os.path.join(folder, "env.hdr"),
            samples=64 if quick else PANO_SAMPLES,
        )

    # ── Описание сцены для браузера ──────────────────────────────────────
    matrix = cam.matrix_world
    position = matrix.translation
    forward = matrix.to_quaternion() @ Vector((0.0, 0.0, -1.0))
    focus = Vector((center[0], center[1], base_z + height_units / 2))
    target = position + forward * max(1.0, (position - focus).length)


    data = {
        "id": name,
        "label": shot.get("title", name),
        "backdrop": {"wide": "backdrop.webp", "tall": "backdrop-tall.webp"},
        "environment": "env.hdr",
        "camera": {
            "position": to_three(position),
            "target": to_three(target),
            "fov": {
                "wide": dict(zip(("x", "y"), fov_deg(cam.data, *wide))),
                "tall": dict(zip(("x", "y"), fov_deg(cam.data, *tall))),
            },
            "lens_mm": round(cam.data.lens, 2),
            "shift": [round(cam.data.shift_x, 4), round(cam.data.shift_y, 4)],
            "fstop": round(cam.data.dof.aperture_fstop, 2) if cam.data.dof.use_dof else None,
        },
        "floor": {
            "y": round(base_z, 5),
            "mmPerUnit": round(mm_per_unit, 3),
        },
        "cup": {"origin": to_three(Vector((center[0], center[1], base_z)))},
        # Главный источник сцены: панорама его не содержит (лампы в рендер не
        # попадают), поэтому направленный свет в браузере ставится по нему.
        "key": describe_key_light(scene, focus),
        "view": {
            "transform": scene.view_settings.view_transform,
            "look": scene.view_settings.look,
            "exposure": round(scene.view_settings.exposure, 4),
        },
        "reference": {
            "cup": info["cup"],
            "cupHeightMm": round(info["cup_height_mm"], 2),
            "mockup": f"{name}_{info['cup']}ml_clean.png",
        },
        "frames": {"wide": list(wide), "tall": list(tall)},
        "quick": bool(quick),
    }

    path = os.path.join(folder, "scene.json")
    # Слои теней снимаются отдельным прогоном — их список не теряем.
    # shadowOpacity к рендеру не относится вовсе: это плотность тени в
    # браузере, подобранная там по эталонному кадру, и переписать её здесь
    # значило бы стереть ручную настройку.
    if os.path.isfile(path):
        with io.open(path, "r", encoding="utf-8") as fh:
            previous = json.load(fh)
        for key in ("shadows", "shadowFrame", "shadowFrames", "shadowOpacity"):
            if key in previous:
                data[key] = previous[key]
        if meta_only:
            data["frames"] = previous.get("frames", data["frames"])
            data["quick"] = previous.get("quick", data["quick"])

    with io.open(path, "w", encoding="utf-8") as fh:
        fh.write(json.dumps(data, ensure_ascii=False, indent=2) + "\n")
    log(f"{name}: scene.json записан, камера {data['camera']['position']}, "
        f"угол {data['camera']['fov']['wide']['y']}°")
    return data


def main(argv=None):
    raw = sys.argv[1:]
    argv = raw[raw.index("--") + 1:] if "--" in raw else (argv or [])

    ap = argparse.ArgumentParser(prog="export_web_scene.py")
    ap.add_argument("--set", dest="set_name", default=None, help="имя сцены из WEB_SETS")
    ap.add_argument("--all", action="store_true", help="все сцены веба")
    ap.add_argument("--out", default=None, help="куда класть assets/scenes")
    ap.add_argument("--quick", action="store_true", help="черновик: мало сэмплов, половинный размер")
    ap.add_argument("--shadows", nargs="*", default=None,
                    help="снять слой тени; без значений — для 410, 500 и 650")
    ap.add_argument("--only-shadows", action="store_true",
                    help="не переснимать фон и панораму, только тени")
    ap.add_argument("--only-meta", action="store_true",
                    help="ничего не рендерить, переписать только scene.json")
    ap.add_argument("--shadow-glb", default=None,
                    help="снять тень для модели из каталога просмотрщика (.glb)")
    ap.add_argument("--shadow-id", default=None,
                    help="под каким именем сохранить эту тень, как в js/data/models.js")
    ap.add_argument("--catalog-shadows", nargs="*", default=None, metavar="ID",
                    help="снять тени моделям из каталога просмотрщика (js/data/models.js); "
                         "без значений — всем, у кого тень устарела или её нет")
    ap.add_argument("--force", action="store_true",
                    help="переснять тени каталога, даже если они свежие")
    ap.add_argument("--viewer", default=None,
                    help="корень просмотрщика, если он не над --out (нужен для --catalog-shadows)")
    ap.add_argument("--reference", action="store_true",
                    help="снять ещё и контрольный кадр со стаканом — для сверки")
    args = ap.parse_args(argv)

    from bk import place

    cfg = place.load_config(os.path.join(ROOT, "params", "shots.json"))
    # Печать сцене не нужна: стакан всё равно уходит из кадра, а подготовка
    # макета стоит времени.
    cfg["print"]["enabled"] = False
    cfg["cup_key"] = REFERENCE_CUP

    if args.all:
        names = list(WEB_SETS)
    elif args.set_name:
        if args.set_name not in WEB_SETS:
            print(f"для веба снимаются только {', '.join(WEB_SETS)}", file=sys.stderr)
            return 2
        names = [args.set_name]
    else:
        print("нужен --set <имя> или --all", file=sys.stderr)
        return 2

    out_root = os.path.abspath(
        args.out or os.path.join(ROOT, "..", "..", "Cups-bot", "cup-viewer", "assets", "scenes")
    )
    os.makedirs(out_root, exist_ok=True)
    log(f"выгрузка в {out_root}")

    for name in names:
        t0 = time.time()
        if not args.only_shadows and args.catalog_shadows is None:
            export_set(cfg, name, out_root, quick=args.quick, meta_only=args.only_meta)
        if args.catalog_shadows is not None:
            export_catalog_shadows(cfg, name, out_root, quick=args.quick, force=args.force,
                                   only=args.catalog_shadows or None,
                                   root=os.path.abspath(args.viewer) if args.viewer else None)
        elif args.shadow_glb:
            if not args.shadow_id:
                print("--shadow-glb требует --shadow-id", file=sys.stderr)
                return EXIT_CONFIG
            export_web_cup_shadow(cfg, name, out_root, os.path.abspath(args.shadow_glb),
                                  args.shadow_id, quick=args.quick, reference=args.reference)
        elif args.shadows is not None or args.only_shadows:
            cups = tuple(args.shadows) if args.shadows else SHADOW_CUPS
            export_shadows(cfg, name, out_root, cups=cups, quick=args.quick)
        log(f"{name}: готово за {time.time() - t0:.0f} с")
    return 0


if __name__ == "__main__":
    sys.exit(main())
