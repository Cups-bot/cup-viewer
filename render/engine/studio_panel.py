"""«Фотореал» в Blender: панель съёмки (N → Фотореал) для движка render/engine.

Как OPEN_*.cmd в 3D_Cups, только сцены — фотореальные, как у сайта:
  1. выбрать фон, ракурс, стакан, картон, макет, конгрев, «Имитацию картона»,
     второй стакан и качество — «Собрать сцену»: движок собирает кадр в фоне
     (тем же путём, что для сайта), сцена открывается здесь уже с размером
     кадра и сэмплами выбранного качества;
  2. двигать камеру и стаканы, крутить, менять что угодно; макет, конгрев и
     имитацию — «Применить к сцене», без пересборки: правки не теряются;
  3. «Рендер кадра» (или F12) — кадр того, что сейчас в сцене: склейка фокуса
     (стакан резкий целиком, фон размыт — bk/stack.py) по нынешним камере и
     стаканам, потом «камера» (bk/finish.py); ход — в окне рендера, готовый
     кадр сохраняется в папку кадров и показывается там же.
Для длинных серий — «Очередь на ночь» (queue_runner.py): кадры по настройкам
панели считаются в отдельном окне, Blender можно закрыть.

Запуск: ФОТОРЕАЛ В BLENDER.bat в корне cup-viewer
(blender --python render/engine/studio_panel.py).
"""

import datetime
import json
import math
import os
import shutil
import subprocess
import sys
import tempfile
import time

import bpy
from bpy.props import BoolProperty, EnumProperty, FloatProperty, IntProperty, PointerProperty, StringProperty

ENGINE = os.path.dirname(os.path.abspath(__file__))
if ENGINE not in sys.path:
    sys.path.insert(0, ENGINE)

from bk import place  # noqa: E402  (после sys.path)

PROJECT = os.path.dirname(ENGINE)

PARAMS = os.path.join(ENGINE, "params", "shots.json")
RUN = os.path.join(ENGINE, "run.py")
RUNNER = os.path.join(ENGINE, "queue_runner.py")
import queue_runner  # noqa: E402

# Папка кадров по умолчанию — рядом с проектами: D:\Cups_Soft\Рендеры.
DEFAULT_ROOT = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(ENGINE)))), "Рендеры")
SETTINGS = "панель.json"
TAB = "Фотореал"
BELOW_NORMAL = 0x00004000
NO_WINDOW = getattr(subprocess, "CREATE_NO_WINDOW", 0)
NEW_CONSOLE = getattr(subprocess, "CREATE_NEW_CONSOLE", 0)

# Качество: длинная сторона кадра и сэмплы (профиль laptop исполнителя сайта).
QUALITY = {
    "draft": ("Черновик · 1200 px", 1200, 48),
    "standard": ("Standard · 2000 px", 2000, 256),
    "ultra": ("Ultra · 4000 px", 4000, 256),
    "ultra_plus": ("Ultra+ · 4000 px, 512 сэмплов", 4000, 512),
}
MINUTES = {"draft": "~1 мин", "standard": "~5 мин", "ultra": "~20–25 мин", "ultra_plus": "~45 мин"}
BOARDS = [("uncoated", "Немелованный", ""), ("coated", "Мелованный", ""),
          ("soft-touch", "Soft Touch", ""), ("kraft", "Крафт", "")]
STATES = {"waiting": "ждёт", "rendering": "считается", "done": "готово", "failed": "ошибка", "cancelled": "снят"}

_cfg = None
_items = {}                      # ссылки на списки перечислений: Blender их не копирует
_build = {}                      # сборка сцены в фоне
_message = ["", "INFO"]          # строка состояния под кнопками
_chain = {}                      # рендер кадра здесь: проходы склейки фокуса
_last = [""]                     # последний готовый кадр
_keymaps = []


def cfg():
    global _cfg
    if _cfg is None:
        _cfg = place.load_config(PARAMS)
    return _cfg


def cup_entry(cup_id):
    return cfg()["cups"].get(cup_id) or {}


def is_paper(cup_id):
    return cup_entry(cup_id).get("adapter") == "paper"


def set_items(self, context):
    c = cfg()
    _items["sets"] = [(n, c["shots"][n].get("title") or n, "") for n in place.enabled_sets(c)]
    return _items["sets"]


def preset_items(self, context):
    from bk import compose
    shot = cfg()["shots"].get(self.scene_set) or {}
    _items["presets"] = [(p["id"], p.get("label") or p["id"], "") for p in compose.presets(shot)]
    return _items["presets"]


def cup_items(self, context):
    c = cfg()
    _items["cups"] = [(i, c["cups"][i].get("label") or i, "") for i in place.cup_ids(c)]
    return _items["cups"]


def second_items(self, context):
    _items["second"] = [("none", "Нет", ""), ("same", "Такой же, с тем же макетом", "")] + cup_items(self, context)
    return _items["second"]


def _save_settings(context):
    s = context.window_manager.cv_studio
    data = {k: getattr(s, k) for k in CVStudioSettings.__annotations__}
    try:
        # Настройки — всегда в папке по умолчанию: оттуда они и читаются при запуске.
        os.makedirs(DEFAULT_ROOT, exist_ok=True)
        with open(os.path.join(DEFAULT_ROOT, SETTINGS), "w", encoding="utf-8") as fh:
            json.dump(data, fh, ensure_ascii=False, indent=1)
    except OSError:
        pass


def _load_settings(s):
    data = queue_runner.read(os.path.join(DEFAULT_ROOT, SETTINGS), {})
    for k, v in data.items():
        try:
            setattr(s, k, v)
        except (TypeError, AttributeError, ValueError):
            pass       # поле переименовано или значения больше нет в каталоге


def _apply_quality(scene, quality):
    """Размер кадра (длинная сторона, пропорции те же) и сэмплы качества."""
    _, long_side, samples = QUALITY[quality]
    r = scene.render
    w, h = r.resolution_x, r.resolution_y
    if w >= h:
        r.resolution_x, r.resolution_y = long_side, max(1, round(long_side * h / w))
    else:
        r.resolution_x, r.resolution_y = max(1, round(long_side * w / h)), long_side
    r.resolution_percentage = 100
    scene.cycles.samples = samples


def _quality_changed(self, context):
    scene = context.scene
    if scene is not None and "cv_plan" in scene:
        _apply_quality(scene, self.quality)


class CVStudioSettings(bpy.types.PropertyGroup):
    scene_set: EnumProperty(name="Фон", items=set_items)
    camera: EnumProperty(name="Ракурс", items=preset_items)
    frame: EnumProperty(name="Формат", items=[("4:5", "4 : 5", ""), ("1:1", "1 : 1", ""), ("3:4", "3 : 4", "")])
    cup: EnumProperty(name="Стакан", items=cup_items)
    variant: EnumProperty(name="Вафля", items=[("nm", "Картой нормалей", "Гладкая обёртка, вафля картой — меняется на свой конгрев"),
                                               ("mesh", "В сетке", "Вафля выдавлена в самой сетке")])
    board: EnumProperty(name="Картон", items=BOARDS)
    art: StringProperty(name="Макет", subtype="FILE_PATH",
                        description="Бумага — полный лист шаблона: PDF, AI, PNG, JPG. Пластик — поле печати PNG")
    page: IntProperty(name="Страница", default=1, min=1)
    clean: BoolProperty(name="Без печати", description="Чистый картон — например, для слепого конгрева")
    emboss: StringProperty(name="Конгрев", subtype="FILE_PATH",
                           description="Лист на том же шаблоне, что и макет: чёрное выдавливается (как у Формации)")
    emboss_depth: FloatProperty(name="Глубина, мм", default=0.35, min=0.05, max=1.5, step=5, precision=2)
    proof: BoolProperty(name="Имитация картона", default=True,
                        description="Цвета — как напечатаются на выбранном картоне (профиль типографии)")
    rotate: FloatProperty(name="Поворот, °", default=0.0, min=-180.0, max=180.0, step=500, precision=0)
    second: EnumProperty(name="Второй стакан", items=second_items)
    second_art: StringProperty(name="Макет второго", subtype="FILE_PATH")
    second_rotate: FloatProperty(name="Поворот второго, °", default=60.0, min=-180.0, max=360.0, step=500, precision=0)
    quality: EnumProperty(name="Качество", items=[(k, v[0], MINUTES[k]) for k, v in QUALITY.items()], default="ultra",
                          update=_quality_changed)
    root: StringProperty(name="Папка кадров", subtype="DIR_PATH", default=DEFAULT_ROOT)


# ---------------------------------------------------------------------------
# задание
# ---------------------------------------------------------------------------

def _path(p):
    return os.path.abspath(bpy.path.abspath(p)) if p else ""


def make_job(s):
    """Задание run.py --job из настроек панели; (задание, имя кадра) или ошибка."""
    c = cfg()
    shot = c["shots"].get(s.scene_set) or {}
    entry = cup_entry(s.cup)
    paper = is_paper(s.cup)
    hero = {"id": s.cup, "rotate": s.rotate}
    if paper:
        hero["board"] = s.board
        hero["proof"] = s.proof and s.board != "kraft"
    if entry.get("variants"):
        # Свой конгрев ложится картой нормалей — только на гладкую обёртку (nm).
        hero["variant"] = "nm" if s.emboss else s.variant
    if s.clean:
        hero["print"] = "none"
    elif s.art:
        art = _path(s.art)
        if not os.path.isfile(art):
            raise ValueError(f"Макет не найден: {art}")
        hero["art"] = art
        hero["page"] = s.page
    if s.emboss:
        if not paper:
            raise ValueError("Конгрев бывает только у бумажных стаканов")
        emboss = _path(s.emboss)
        if not os.path.isfile(emboss):
            raise ValueError(f"Лист конгрева не найден: {emboss}")
        hero["emboss"] = emboss
        hero["emboss_depth"] = round(s.emboss_depth, 3)
    cups = [hero]
    name = f"{shot.get('title') or s.scene_set} — {s.cup}"
    if s.second != "none" and shot.get("max_cups") != 1:
        if s.second == "same":
            two = dict(hero, rotate=s.rotate + s.second_rotate)
        else:
            two = {"id": s.second, "rotate": s.second_rotate}
            if is_paper(s.second):
                two["board"] = s.board
                two["proof"] = hero.get("proof", False)
            if cup_entry(s.second).get("variants"):
                two["variant"] = s.variant
            if s.second_art:
                art2 = _path(s.second_art)
                if not os.path.isfile(art2):
                    raise ValueError(f"Макет второго стакана не найден: {art2}")
                two["art"] = art2
        cups.append(two)
        name += f" + {two['id']}"
    presets = [p[0] for p in preset_items(s, None)]
    job = {"set": s.scene_set, "camera": {"preset": s.camera if s.camera in presets else presets[0],
                                          "frame": s.frame}, "cups": cups}
    return job, name


def _stamp(name):
    safe = "".join(ch if ch.isalnum() or ch in " +-_." else "_" for ch in name).strip()
    return f"{datetime.datetime.now():%Y%m%d-%H%M%S} {safe}"[:120]


# ---------------------------------------------------------------------------
# сборка сцены в фоне и открытие здесь
# ---------------------------------------------------------------------------

def _redraw():
    # Только боковая панель: вид сцены (в том числе рендер во вьюпорте) не трогаем.
    for window in bpy.context.window_manager.windows:
        for area in window.screen.areas:
            if area.type == "VIEW_3D":
                for region in area.regions:
                    if region.type == "UI":
                        region.tag_redraw()


def _open_built(path):
    window = bpy.context.window_manager.windows[0] if bpy.context.window_manager.windows else None
    if window is None:
        bpy.ops.wm.open_mainfile(filepath=path, load_ui=False)
    else:
        with bpy.context.temp_override(window=window):
            bpy.ops.wm.open_mainfile(filepath=path, load_ui=False)
    return None


@bpy.app.handlers.persistent
def _after_load(_):
    # Собранная сцена: вид — через камеру кадра, заливка без рендера (не грузить видеокарту).
    scene = _build.pop("opened", False)
    if not scene:
        return
    # Заливка «по текстуре» берёт активный узел картинки — пусть это будет макет.
    for mat in bpy.data.materials:
        art = mat.node_tree.nodes.get("CUPS_Artwork") if mat.node_tree else None
        if art is not None:
            mat.node_tree.nodes.active = art
    for window in bpy.context.window_manager.windows:
        if isinstance(scene, str) and scene in bpy.data.scenes:
            window.scene = bpy.data.scenes[scene]
    target = bpy.data.scenes.get(scene) if isinstance(scene, str) else bpy.context.scene
    if target is not None and _build.get("plan"):
        target["cv_plan"] = json.dumps(_build.pop("plan"), ensure_ascii=False)
        target["cv_job"] = json.dumps(_build.pop("job", {}), ensure_ascii=False)
    for window in bpy.context.window_manager.windows:
        for area in window.screen.areas:
            if area.type != "VIEW_3D":
                continue
            space = area.spaces.active
            space.shading.type = "SOLID"
            for region in area.regions:
                if region.type == "UI":
                    try:
                        region.active_panel_category = TAB
                    except (AttributeError, TypeError):
                        pass
            space.shading.color_type = "TEXTURE"      # макет виден и без рендера
            space.show_region_ui = True
            if space.region_3d:
                space.region_3d.view_perspective = "CAMERA"


def _poll():
    _chain_tick()
    proc = _build.get("proc")
    if proc is not None and proc.poll() is not None:
        folder = _build.pop("folder")
        _build.pop("proc")
        blends = sorted((f for f in os.listdir(folder) if f.endswith(".blend")),
                        key=lambda f: os.path.getmtime(os.path.join(folder, f)))
        if proc.returncode == 0 and blends:
            _message[:] = [f"Сцена собрана за {time.time() - _build.pop('t0', time.time()):.0f} с", "INFO"]
            # В файле фона бывает несколько сцен (ассеты): открыть надо сцену кадра.
            info = queue_runner.read(os.path.join(folder, blends[-1][:-6] + ".json"), {})
            _build["opened"] = info.get("scene") or True
            # Что нужно рендеру здесь: склейка фокуса, масштаб эталона, имя кадра.
            _build["plan"] = {"stack": (info.get("compose") or {}).get("stack"), "scale": info.get("scale", 1.0),
                              "scale_reference_mm": info.get("scale_reference_mm", 135.3),
                              "name": _build.get("name", "кадр")}
            bpy.app.timers.register(lambda: _open_built(os.path.join(folder, blends[-1])), first_interval=0.1)
        else:
            why = queue_runner.tail(os.path.join(folder, "err.txt"), 4) or "подробности — log.txt в папке сцены"
            _message[:] = ["Сцена не собралась: " + why.splitlines()[-1][:200], "ERROR"]
    _redraw()
    return 0.5


class CV_OT_build(bpy.types.Operator):
    bl_idname = "cv_studio.build"
    bl_label = "Собрать сцену"
    bl_description = "Движок собирает кадр в фоне (как для сайта) и открывает сцену здесь; F12 — пробный кадр"

    def execute(self, context):
        s = context.window_manager.cv_studio
        if _build.get("proc") is not None:
            self.report({"WARNING"}, "Сцена уже собирается")
            return {"CANCELLED"}
        try:
            job, name = make_job(s)
        except ValueError as exc:
            self.report({"ERROR"}, str(exc))
            return {"CANCELLED"}
        _save_settings(context)
        folder = os.path.join(bpy.path.abspath(s.root), "сцены", _stamp(name))
        os.makedirs(folder, exist_ok=True)
        queue_runner.write(os.path.join(folder, "job.json"), job)
        _, w, samples = QUALITY[s.quality]
        cmd = [bpy.app.binary_path, "-b", "--factory-startup", "-t", "4", "--python-exit-code", "1", "-P", RUN, "--",
               "--job", os.path.join(folder, "job.json"), "--samples", str(samples), "--resolution", str(w),
               "--output-dir", folder]
        with open(os.path.join(folder, "log.txt"), "w", encoding="utf-8") as log, \
                open(os.path.join(folder, "err.txt"), "w", encoding="utf-8") as err:
            _build["proc"] = subprocess.Popen(cmd, stdout=log, stderr=err, cwd=ENGINE,
                                              creationflags=BELOW_NORMAL | NO_WINDOW)
        _build["folder"] = folder
        _build["name"] = name
        _build["job"] = job
        _build["t0"] = time.time()
        _message[:] = [f"Собираю сцену: {name}…", "INFO"]
        return {"FINISHED"}


# ---------------------------------------------------------------------------
# рендер кадра здесь, в Blender
# ---------------------------------------------------------------------------

def _plan_cups(scene, plan):
    names = (plan.get("stack") or {}).get("cups") or ["BK_Cup", "BK_Cup2"]
    return [scene.objects[n] for n in names if n in scene.objects]


def _corners(obj):
    from mathutils import Vector
    return [obj.matrix_world @ Vector(c) for c in obj.bound_box]


def fresh_plan(scene, plan):
    """План склейки фокуса по нынешним камере и стаканам (их могли подвинуть):
    диафрагма «весь стакан резкий», фокус в стакане, рамка стаканов в кадре.
    Та же арифметика, что у сборки (compose._stack_plan)."""
    from bpy_extras.object_utils import world_to_camera_view
    from mathutils import Vector
    from bk import compose
    cam = scene.camera
    cups = _plan_cups(scene, plan)
    stack = plan.get("stack")
    if cam is None or not cups or not stack or not cam.data.dof.use_dof:
        return None
    d = cam.data
    hero = _corners(cups[0])
    z0, z1 = min(p.z for p in hero), max(p.z for p in hero)
    cx, cy = sum(p.x for p in hero) / 8, sum(p.y for p in hero) / 8
    r_top = max(max(p.x for p in hero) - min(p.x for p in hero), max(p.y for p in hero) - min(p.y for p in hero)) / 2
    href = plan.get("scale_reference_mm", 135.3) / 1000.0 * plan.get("scale", 1.0)
    ap = compose.product_aperture(cam, Vector((cx, cy, z0 + href * 0.5)), href, {"product_dof": True})
    saved = (d.dof.focus_object, d.dof.focus_distance)
    wall = place.focus_on_cup(cam, cups[0], z0 + (z1 - z0) * 0.45)
    d.dof.focus_object, d.dof.focus_distance = saved
    if wall is None:
        fwd = (cam.matrix_world.to_quaternion() @ Vector((0.0, 0.0, -1.0))).normalized()
        wall = (Vector((cx, cy, z0)) - cam.matrix_world.translation).dot(fwd) - r_top
    xs, ys = [], []
    for obj in cups:
        for p in _corners(obj):
            v = world_to_camera_view(scene, cam, p)
            xs.append(v.x)
            ys.append(v.y)
    pad = 0.03
    border = [max(0.0, min(xs) - pad), max(0.0, min(ys) - pad), min(1.0, max(xs) + pad), min(1.0, max(ys) + pad)]
    return {"cups": [c.name for c in cups], "opaque": bool(stack.get("opaque")),
            "fstop_scene": d.dof.aperture_fstop, "fstop_product": ap["product"] if ap else d.dof.aperture_fstop,
            "focus_product": wall + compose.FOCUS_INTO * r_top,
            "border": border if max(xs) > min(xs) and max(ys) > min(ys) else None}


def _snapshot(scene):
    r, d = scene.render, scene.camera.data
    s = r.image_settings
    return {"r": (r.film_transparent, r.use_border, r.use_crop_to_border, r.border_min_x, r.border_min_y,
                  r.border_max_x, r.border_max_y, r.filepath),
            "img": (s.file_format, s.color_mode, s.color_depth),
            "dof": (d.dof.aperture_fstop, d.dof.focus_object, d.dof.focus_distance),
            "samples": scene.cycles.samples,
            "seen": {ob.name: ob.visible_camera for ob in scene.objects}}


def _restore(scene, snap):
    r, d = scene.render, scene.camera.data
    (r.film_transparent, r.use_border, r.use_crop_to_border, r.border_min_x, r.border_min_y,
     r.border_max_x, r.border_max_y, r.filepath) = snap["r"]
    s = r.image_settings
    s.file_format, s.color_mode, s.color_depth = snap["img"]
    d.dof.aperture_fstop, d.dof.focus_object, d.dof.focus_distance = snap["dof"]
    scene.cycles.samples = snap["samples"]
    for name, vis in snap["seen"].items():
        if name in scene.objects:
            scene.objects[name].visible_camera = vis


def _pass(scene, step):
    """Настроить сцену на проход step: A — фон со всеми тенями и отражениями
    стаканов, но без них самих; B — только стаканы, резкие целиком, фон
    прозрачный; single — один кадр (PET, PP: диафрагма посередине)."""
    c, p, snap = _chain, _chain["plan"], _chain["snap"]
    _restore(scene, snap)
    r, d = scene.render, scene.camera.data
    r.image_settings.file_format = "PNG"
    r.image_settings.color_depth = "16"          # 16 бит до склейки и «камеры», как у движка
    if step == "A":
        for name in p["cups"]:
            scene.objects[name].visible_camera = False
        scene.cycles.samples = max(16, round(snap["samples"] * 0.6))   # bk/stack.BACKGROUND_SAMPLES
        r.image_settings.color_mode = "RGB"
        r.filepath = c["A"]
    elif step == "B":
        cups = set(p["cups"])
        for ob in scene.objects:
            ob.visible_camera = ob.name in cups and snap["seen"].get(ob.name, True)
        r.film_transparent = True
        d.dof.aperture_fstop = p["fstop_product"]
        d.dof.focus_object = None
        d.dof.focus_distance = p["focus_product"]
        if p["border"]:
            r.use_border, r.use_crop_to_border = True, False
            r.border_min_x, r.border_min_y, r.border_max_x, r.border_max_y = p["border"]
        r.image_settings.color_mode = "RGBA"
        r.filepath = c["B"]
    else:
        if p and not p["opaque"]:
            d.dof.aperture_fstop = math.sqrt(p["fstop_scene"] * p["fstop_product"])
            d.dof.focus_object = None
            d.dof.focus_distance = p["focus_product"]
        r.image_settings.color_mode = "RGB"
        r.filepath = c["A"]


def _invoke():
    window = bpy.context.window_manager.windows[0]
    with bpy.context.temp_override(window=window):
        bpy.ops.render.render("INVOKE_DEFAULT", write_still=True)


def _run_step():
    scene = bpy.data.scenes[_chain["scene"]]
    step = _chain["steps"][_chain["i"]]
    _pass(scene, step)
    _chain["started"] = time.time()
    _chain["out"] = _chain["B"] if step == "B" else _chain["A"]
    total = len(_chain["steps"])
    _message[:] = [f"Рендер: проход {_chain['i'] + 1} из {total}…" if total > 1 else "Рендер…", "INFO"]
    _invoke()
    return None


def _show(path):
    img = bpy.data.images.load(path, check_existing=False)
    img.name = "Кадр " + os.path.basename(path)[:50]
    for window in bpy.context.window_manager.windows:
        for area in window.screen.areas:
            if area.type == "IMAGE_EDITOR":
                area.spaces.active.image = img


def _finish_chain():
    from bk import finish
    scene = bpy.data.scenes[_chain["scene"]]
    _restore(scene, _chain["snap"])
    c = dict(_chain)
    _chain.clear()
    over = c["B"] if "B" in c["steps"] else None
    finish.apply_file(c["A"], seed=sum(map(ord, c["stem"])), over=over, camera=True)
    if over and os.path.isfile(over):
        os.remove(over)
    day = os.path.join(c["root"], datetime.date.today().isoformat())
    os.makedirs(day, exist_ok=True)
    dest = os.path.join(day, f"{datetime.datetime.now():%H-%M} {c['name']}.png")
    shutil.copy2(c["A"], dest)
    _last[0] = dest
    _show(dest)
    _message[:] = [f"Кадр готов за {(time.time() - c['t0']) / 60:.1f} мин — в папке кадров", "INFO"]


def _chain_tick():
    """Проход кончился — следующий или склейка; файла нет — рендер прервали."""
    if not _chain or not _chain.get("started") or bpy.app.is_job_running("RENDER"):
        return
    out = _chain["out"]
    done = os.path.isfile(out) and os.path.getmtime(out) >= _chain["started"] - 1
    if not done:
        _restore(bpy.data.scenes[_chain["scene"]], _chain["snap"])
        _chain.clear()
        _message[:] = ["Рендер прерван", "ERROR"]
        return
    _chain["started"] = None
    _chain["i"] += 1
    if _chain["i"] < len(_chain["steps"]):
        bpy.app.timers.register(_run_step, first_interval=0.2)
    else:
        try:
            _finish_chain()
        except Exception as exc:          # кадр не должен пропасть молча
            _message[:] = [f"Склейка не удалась: {exc}", "ERROR"]


class CV_OT_render(bpy.types.Operator):
    bl_idname = "cv_studio.render"
    bl_label = "Рендер кадра"
    bl_description = ("Кадр того, что сейчас в сцене: стакан резкий целиком, фон размыт, «камера»; "
                      "сохраняется в папку кадров. В чужой сцене — обычный F12")

    def execute(self, context):
        scene = context.scene
        if "cv_plan" not in scene or scene.camera is None:
            return bpy.ops.render.render("INVOKE_DEFAULT")
        if _chain or bpy.app.is_job_running("RENDER"):
            self.report({"WARNING"}, "Рендер уже идёт")
            return {"CANCELLED"}
        s = context.window_manager.cv_studio
        plan = json.loads(scene["cv_plan"])
        fresh = fresh_plan(scene, plan)
        quality = next((k for k, v in QUALITY.items() if v[1] == max(scene.render.resolution_x, scene.render.resolution_y)
                        and v[2] == scene.cycles.samples), None)
        name = plan.get("name", "кадр") + (f" — {QUALITY[quality][0].split(' ·')[0]}" if quality else "")
        tmp = os.path.join(tempfile.gettempdir(), "cv_render")
        os.makedirs(tmp, exist_ok=True)
        stem = _stamp(name)
        _chain.update({"scene": scene.name, "snap": _snapshot(scene), "plan": fresh, "name": name, "stem": stem,
                       "A": os.path.join(tmp, stem + ".png"), "B": os.path.join(tmp, stem + "__cup.png"),
                       "steps": ["A", "B"] if fresh and fresh["opaque"] else ["single"], "i": 0,
                       "t0": time.time(), "root": bpy.path.abspath(s.root)})
        _run_step()
        return {"FINISHED"}


class CV_OT_apply(bpy.types.Operator):
    bl_idname = "cv_studio.apply"
    bl_label = "Применить к сцене"
    bl_description = ("Макет, конгрев и имитацию картона — в открытую сцену, без пересборки: "
                      "положение камеры и стаканов остаётся")

    def execute(self, context):
        from bk import paper_cup, proof
        scene = context.scene
        s = context.window_manager.cv_studio
        if "cv_job" not in scene:
            self.report({"WARNING"}, "Сначала «Собрать сцену»")
            return {"CANCELLED"}
        job = json.loads(scene["cv_job"])
        hero = job["cups"][0]
        if s.scene_set != job.get("set") or s.cup != hero["id"] or (is_paper(s.cup) and s.board != hero.get("board")):
            self.report({"WARNING"}, "Фон, стакан и картон меняются сборкой — «Собрать сцену»")
            return {"CANCELLED"}
        if not is_paper(s.cup):
            self.report({"WARNING"}, "Без пересборки меняется только бумажный стакан")
            return {"CANCELLED"}
        art = _path(s.art) if s.art and not s.clean else None
        if not s.clean and not (art and os.path.isfile(art)):
            self.report({"ERROR"}, "Укажите файл макета")
            return {"CANCELLED"}
        emboss = _path(s.emboss) if s.emboss else None
        if emboss and not os.path.isfile(emboss):
            self.report({"ERROR"}, f"Лист конгрева не найден: {emboss}")
            return {"CANCELLED"}
        c = dict(cfg(), cup_key=hero["id"], cup_variant=hero.get("variant"))
        entry = place.resolve_cup(c)
        key = proof.key_for(s.board) if s.proof and s.board != "kraft" else None
        objs = [scene.objects.get("BK_Cup")]
        if len(job["cups"]) > 1 and job["cups"][1]["id"] == hero["id"] and s.second == "same":
            objs.append(scene.objects.get("BK_Cup2"))
        try:
            for obj in filter(None, objs):
                paper_cup.dress_paper(PROJECT, entry, obj, art, clean=s.clean, page=s.page, proof=key)
                if emboss:
                    paper_cup.emboss_paper(PROJECT, entry, obj, emboss, s.emboss_depth)
                else:
                    paper_cup.emboss_reset(obj)
        except (paper_cup.PaperError, proof.ProofError) as exc:
            self.report({"ERROR"}, str(exc))
            return {"CANCELLED"}
        for cup in job["cups"][:len(objs)]:
            cup.update({"art": art, "emboss": emboss, "emboss_depth": s.emboss_depth, "proof": bool(key)})
            if s.clean:
                cup["print"] = "none"
            else:
                cup.pop("print", None)
        scene["cv_job"] = json.dumps(job, ensure_ascii=False)
        _message[:] = ["Применено к сцене", "INFO"]
        return {"FINISHED"}


# ---------------------------------------------------------------------------
# очередь
# ---------------------------------------------------------------------------

def _ensure_runner(root):
    if queue_runner.alive(root):
        return
    subprocess.Popen([sys.executable, RUNNER, root, bpy.app.binary_path], cwd=ENGINE, creationflags=NEW_CONSOLE)


def _enqueue(context, quality, priority, open_when_done):
    s = context.window_manager.cv_studio
    job, name = make_job(s)
    label, resolution, samples = QUALITY[quality]
    name = f"{name} — {label.split(' ·')[0]}"
    root = bpy.path.abspath(s.root)
    folder = os.path.join(root, queue_runner.QUEUE, _stamp(name))
    os.makedirs(folder, exist_ok=True)
    queue_runner.write(os.path.join(folder, "job.json"), job)
    queue_runner.write(os.path.join(folder, "meta.json"), {
        "name": name, "quality": quality, "resolution": resolution, "samples": samples,
        "priority": priority, "created": datetime.datetime.now().isoformat(timespec="seconds"),
        "open": open_when_done})
    _save_settings(context)
    _ensure_runner(root)
    return name


class CV_OT_queue(bpy.types.Operator):
    bl_idname = "cv_studio.queue"
    bl_label = "В очередь"
    bl_description = ("Кадр по настройкам панели (не по открытой сцене) — в очередь: считается в отдельном окне "
                      "по одному, с остыванием видеокарты; Blender можно закрыть")

    def execute(self, context):
        q = context.window_manager.cv_studio.quality
        try:
            name = _enqueue(context, q, 1, False)
        except ValueError as exc:
            self.report({"ERROR"}, str(exc))
            return {"CANCELLED"}
        _message[:] = [f"В очереди: {name}", "INFO"]
        return {"FINISHED"}


class CV_OT_open(bpy.types.Operator):
    bl_idname = "cv_studio.open"
    bl_label = "Открыть"
    bl_description = "Открыть файл или папку"
    path: StringProperty()

    def execute(self, context):
        target = self.path
        if not target:
            target = bpy.path.abspath(context.window_manager.cv_studio.root)
            os.makedirs(target, exist_ok=True)
        os.startfile(target)
        return {"FINISHED"}


class CV_OT_cancel(bpy.types.Operator):
    bl_idname = "cv_studio.cancel"
    bl_label = "Снять ждущие"
    bl_description = "Убрать из очереди кадры, которые ещё не начали считаться"

    def execute(self, context):
        q = os.path.join(bpy.path.abspath(context.window_manager.cv_studio.root), queue_runner.QUEUE)
        n = 0
        for _, _, folder, _ in queue_runner.pending(os.path.dirname(q)):
            queue_runner.write(os.path.join(folder, "status.json"), {"state": "cancelled"})
            n += 1
        self.report({"INFO"}, f"Снято: {n}")
        return {"FINISHED"}


def _recent(root, n=6):
    q = os.path.join(root, queue_runner.QUEUE)
    rows = []
    for name in os.listdir(q) if os.path.isdir(q) else []:
        folder = os.path.join(q, name)
        meta = queue_runner.read(os.path.join(folder, "meta.json"))
        if meta:
            rows.append((meta.get("created", ""), meta, queue_runner.read(os.path.join(folder, "status.json")) or {}))
    rows.sort(key=lambda r: r[0], reverse=True)
    return rows[:n]


# ---------------------------------------------------------------------------
# панель
# ---------------------------------------------------------------------------

class CV_PT_studio(bpy.types.Panel):
    bl_label = "Фотореал"
    bl_idname = "CV_PT_studio"
    bl_space_type = "VIEW_3D"
    bl_region_type = "UI"
    bl_category = TAB

    def draw(self, context):
        s = context.window_manager.cv_studio
        layout = self.layout
        layout.use_property_split = True
        layout.use_property_decorate = False
        shot = cfg()["shots"].get(s.scene_set) or {}
        entry = cup_entry(s.cup)
        paper = is_paper(s.cup)

        box = layout.box()
        box.label(text="Сцена", icon="SCENE_DATA")
        box.prop(s, "scene_set")
        box.prop(s, "camera")
        box.row().prop(s, "frame", expand=True)

        box = layout.box()
        box.label(text="Стакан", icon="MESH_CYLINDER")
        box.prop(s, "cup")
        if entry.get("variants"):
            row = box.row()
            row.enabled = not s.emboss
            row.prop(s, "variant")
        if paper:
            box.prop(s, "board")
        box.prop(s, "rotate")

        box = layout.box()
        box.label(text="Макет", icon="IMAGE_DATA")
        row = box.row()
        row.enabled = not s.clean
        row.prop(s, "art", text="Файл")
        if s.art.lower().endswith((".pdf", ".ai")) and not s.clean:
            box.prop(s, "page")
        if paper:
            box.prop(s, "clean")
        else:
            box.label(text="Пластик: поле печати PNG, как отдаёт сайт", icon="INFO")

        if paper:
            box = layout.box()
            box.label(text="Конгрев", icon="MOD_DISPLACE")
            box.prop(s, "emboss", text="Лист")
            row = box.row()
            row.enabled = bool(s.emboss)
            row.prop(s, "emboss_depth")
            col = box.column(align=True)
            col.scale_y = 0.8
            col.label(text="Чёрное на листе — рельеф")
            if entry.get("variants"):
                col.label(text="У EM — вместо вафли")
            row = layout.row()
            row.enabled = s.board != "kraft"
            row.prop(s, "proof")
            if s.board == "kraft":
                layout.label(text="У крафта профиля печати нет", icon="INFO")

        box = layout.box()
        box.label(text="Второй стакан", icon="DUPLICATE")
        if shot.get("max_cups") == 1:
            box.label(text="В этой сцене помещается один стакан", icon="INFO")
        else:
            box.prop(s, "second", text="")
            if s.second not in ("none", "same"):
                box.prop(s, "second_art", text="Макет")
            if s.second != "none":
                box.prop(s, "second_rotate", text="Поворот, °" if s.second != "same" else "Разворот к первому, °")

        layout.separator()
        opened = "cv_plan" in context.scene
        col = layout.column(align=True)
        col.scale_y = 1.3
        col.operator(CV_OT_build.bl_idname, icon="VIEW_CAMERA")
        if _build.get("proc") is not None:
            layout.label(text=f"Собираю… {time.time() - _build.get('t0', time.time()):.0f} с", icon="TIME")
        row = layout.row()
        row.enabled = opened
        row.operator(CV_OT_apply.bl_idname, icon="FILE_REFRESH")

        box = layout.box()
        box.label(text="Рендер", icon="RENDER_STILL")
        box.prop(s, "quality", text="")
        if opened:
            r = context.scene.render
            box.label(text=f"{r.resolution_x}×{r.resolution_y}, {context.scene.cycles.samples} сэмплов · "
                           f"{MINUTES.get(s.quality, '')}")
        col = box.column()
        col.scale_y = 1.5
        col.enabled = opened and not _chain
        col.operator(CV_OT_render.bl_idname, text="Рендер кадра  (F12)", icon="RENDER_STILL")
        if not opened:
            box.label(text="Сначала «Собрать сцену»", icon="INFO")
        if _message[0]:
            box.label(text=_message[0], icon="ERROR" if _message[1] == "ERROR" else "INFO")
        row = box.row(align=True)
        if _last[0]:
            row.operator(CV_OT_open.bl_idname, text="Последний кадр", icon="FILE_IMAGE").path = _last[0]
        row.operator(CV_OT_open.bl_idname, text="Папка кадров", icon="FILE_FOLDER").path = ""


class CV_PT_queue(bpy.types.Panel):
    bl_label = "Очередь на ночь"
    bl_idname = "CV_PT_queue"
    bl_space_type = "VIEW_3D"
    bl_region_type = "UI"
    bl_category = TAB
    bl_parent_id = "CV_PT_studio"
    bl_options = {"DEFAULT_CLOSED"}

    def draw(self, context):
        s = context.window_manager.cv_studio
        layout = self.layout
        col = layout.column(align=True)
        col.scale_y = 0.8
        col.label(text="Кадры по настройкам панели — в отдельном")
        col.label(text="окне, по одному; Blender можно закрыть.")
        layout.prop(s, "quality", text="")
        layout.operator(CV_OT_queue.bl_idname, icon="RENDER_ANIMATION")
        root = bpy.path.abspath(s.root)
        rows = _recent(root)
        box = layout.box()
        head = box.row()
        head.label(text="Очередь" + (" — считается" if queue_runner.alive(root) else ""), icon="SORTTIME")
        head.operator(CV_OT_cancel.bl_idname, text="", icon="X")
        for _, meta, st in rows:
            state = st.get("state", "waiting")
            line = box.row(align=True)
            text = STATES.get(state, state)
            if state == "done":
                text += f", {st.get('minutes')} мин"
            elif state == "rendering":
                text += f", {(time.time() - st.get('started', time.time())) / 60:.0f} мин"
            line.label(text=f"{text} · {meta['name']}",
                       icon={"done": "CHECKMARK", "failed": "ERROR", "rendering": "RENDER_STILL"}.get(state, "TIME"))
            if state == "done" and st.get("image"):
                line.operator(CV_OT_open.bl_idname, text="", icon="FILE_IMAGE").path = st["image"]
            elif state == "failed":
                box.label(text=st.get("error", "").splitlines()[-1][:120] if st.get("error") else "")
        if not rows:
            box.label(text="Пусто")
        layout.prop(s, "root")


CLASSES = (CVStudioSettings, CV_OT_build, CV_OT_render, CV_OT_apply, CV_OT_queue, CV_OT_open, CV_OT_cancel,
           CV_PT_studio, CV_PT_queue)


def _show_sidebar():
    try:
        for window in bpy.context.window_manager.windows:
            for area in window.screen.areas:
                if area.type == "VIEW_3D":
                    area.spaces.active.show_region_ui = True
    except Exception:
        pass
    return None


def register():
    for cls in CLASSES:
        bpy.utils.register_class(cls)
    bpy.types.WindowManager.cv_studio = PointerProperty(type=CVStudioSettings)
    if _after_load not in bpy.app.handlers.load_post:
        bpy.app.handlers.load_post.append(_after_load)
    bpy.app.timers.register(_poll, first_interval=1.0, persistent=True)
    kc = bpy.context.window_manager.keyconfigs.addon
    if kc is not None:
        km = kc.keymaps.new(name="Screen", space_type="EMPTY")
        _keymaps.append((km, km.keymap_items.new(CV_OT_render.bl_idname, "F12", "PRESS")))
    bpy.app.timers.register(_show_sidebar, first_interval=0.5)
    bpy.app.timers.register(lambda: _load_settings(bpy.context.window_manager.cv_studio), first_interval=0.3)


if __name__ == "__main__":
    register()
