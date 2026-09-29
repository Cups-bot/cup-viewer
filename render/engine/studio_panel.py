"""«Фотореал» в Blender: панель съёмки (N → Фотореал) для движка render/engine.

Как OPEN_*.cmd в 3D_Cups, только сцены — фотореальные, как у сайта: выбрать
фон и ракурс, стакан, картон, макет, конгрев, «Имитацию картона», второй
стакан — и
  • «Собрать сцену» — движок собирает кадр в фоне, сцена открывается здесь:
    посмотреть, покрутить вид, F12 — быстрый пробный кадр;
  • «Черновик» — настоящий кадр (склейка фокуса и «камера») мелко, ~1 мин,
    вне очереди, откроется сам;
  • «В очередь» — кадр в выбранном качестве в очередь (queue_runner.py):
    по одному, с остыванием видеокарты; Blender можно закрыть.
Кадр считается по настройкам панели тем же конвейером, что и у сайта
(run.py --job); ручные правки открытой сцены в него не попадают.

Запуск: ФОТОРЕАЛ В BLENDER.bat в корне cup-viewer
(blender --python render/engine/studio_panel.py).
"""

import datetime
import json
import os
import subprocess
import sys
import time

import bpy
from bpy.props import BoolProperty, EnumProperty, FloatProperty, IntProperty, PointerProperty, StringProperty

ENGINE = os.path.dirname(os.path.abspath(__file__))
if ENGINE not in sys.path:
    sys.path.insert(0, ENGINE)

from bk import place  # noqa: E402  (после sys.path)

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
    quality: EnumProperty(name="Качество", items=[(k, v[0], MINUTES[k]) for k, v in QUALITY.items()], default="ultra")
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
        for area in window.screen.areas:
            if area.type != "VIEW_3D":
                continue
            space = area.spaces.active
            space.shading.type = "SOLID"
            space.shading.color_type = "TEXTURE"      # макет виден и без рендера
            space.show_region_ui = True
            if space.region_3d:
                space.region_3d.view_perspective = "CAMERA"


def _poll():
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
            bpy.app.timers.register(lambda: _open_built(os.path.join(folder, blends[-1])), first_interval=0.1)
        else:
            why = queue_runner.tail(os.path.join(folder, "err.txt"), 4) or "подробности — log.txt в папке сцены"
            _message[:] = ["Сцена не собралась: " + why.splitlines()[-1][:200], "ERROR"]
    _redraw()
    return 1.0


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
        w, samples = QUALITY["draft"][1], 64
        cmd = [bpy.app.binary_path, "-b", "--factory-startup", "-t", "4", "--python-exit-code", "1", "-P", RUN, "--",
               "--job", os.path.join(folder, "job.json"), "--samples", str(samples), "--resolution", str(w),
               "--output-dir", folder]
        with open(os.path.join(folder, "log.txt"), "w", encoding="utf-8") as log, \
                open(os.path.join(folder, "err.txt"), "w", encoding="utf-8") as err:
            _build["proc"] = subprocess.Popen(cmd, stdout=log, stderr=err, cwd=ENGINE,
                                              creationflags=BELOW_NORMAL | NO_WINDOW)
        _build["folder"] = folder
        _build["t0"] = time.time()
        _message[:] = [f"Собираю сцену: {name}…", "INFO"]
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


class CV_OT_draft(bpy.types.Operator):
    bl_idname = "cv_studio.draft"
    bl_label = "Черновик"
    bl_description = "Кадр целиком, как в очереди, но 1200 px и мало сэмплов (~1 мин), вне очереди; откроется сам"

    def execute(self, context):
        try:
            name = _enqueue(context, "draft", 0, True)
        except ValueError as exc:
            self.report({"ERROR"}, str(exc))
            return {"CANCELLED"}
        _message[:] = [f"Черновик в работе: {name}", "INFO"]
        return {"FINISHED"}


class CV_OT_queue(bpy.types.Operator):
    bl_idname = "cv_studio.queue"
    bl_label = "В очередь"
    bl_description = "Кадр в выбранном качестве — в очередь: по одному, с остыванием видеокарты; Blender можно закрыть"

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
        col = layout.column(align=True)
        col.scale_y = 1.3
        col.operator(CV_OT_build.bl_idname, icon="VIEW_CAMERA")
        if _build.get("proc") is not None:
            layout.label(text=f"Собираю… {time.time() - _build.get('t0', time.time()):.0f} с", icon="TIME")

        box = layout.box()
        box.label(text="Кадр", icon="RENDER_STILL")
        box.prop(s, "quality", text="")
        row = box.row(align=True)
        row.scale_y = 1.3
        row.operator(CV_OT_draft.bl_idname, icon="IMAGE_REFERENCE")
        row.operator(CV_OT_queue.bl_idname, icon="RENDER_ANIMATION")
        if _message[0]:
            box.label(text=_message[0], icon="ERROR" if _message[1] == "ERROR" else "INFO")

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
        layout.operator(CV_OT_open.bl_idname, text="Открыть папку кадров", icon="FILE_FOLDER").path = ""


CLASSES = (CVStudioSettings, CV_OT_build, CV_OT_draft, CV_OT_queue, CV_OT_open, CV_OT_cancel, CV_PT_studio)


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
    bpy.app.timers.register(_show_sidebar, first_interval=0.5)
    bpy.app.timers.register(lambda: _load_settings(bpy.context.window_manager.cv_studio), first_interval=0.3)


if __name__ == "__main__":
    register()
