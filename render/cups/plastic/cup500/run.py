"""Оркестратор: build -> verify -> [render] -> [export].

Запуск из Blender через MCP делается тонким вызовом, тело скрипта через MCP
не гоняется:

    import sys, importlib
    sys.path.insert(0, "<abs>/cup500")
    import run; importlib.reload(run)
    run.main(["--verify"])

Порядок sys.path и reload обязателен: без него Blender отдаст закэшированную
версию модуля. Подмодули из src перезагружаются здесь же, в _reload_src().

Из командной строки:

    blender -b -P run.py -- --verify
"""

import argparse
import importlib
import json
import os
import sys
import time

ROOT = os.path.dirname(os.path.abspath(__file__))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

DEFAULT_PARAMS = os.path.join(ROOT, "params", "cup_500ml.json")
OUT_DIR = os.path.join(ROOT, "out")

EXIT_CONFIG = 2
EXIT_VERIFY = 3


def _reload_src():
    """Перезагрузить чистые модули и, если есть bpy, модули Blender."""
    import src.profile
    import src.unwrap
    importlib.reload(src.profile)
    importlib.reload(src.unwrap)
    mods = {"profile": src.profile, "unwrap": src.unwrap}
    try:
        import bpy                                   # noqa: F401
    except ImportError:
        return mods
    import src.build
    import src.verify
    import src.render
    importlib.reload(src.build)
    importlib.reload(src.verify)
    importlib.reload(src.render)
    mods.update(build=src.build, verify=src.verify, render=src.render)
    return mods


def _argv(argv=None):
    if argv is not None:
        return list(argv)
    raw = sys.argv[1:]
    if "--" in raw:
        raw = raw[raw.index("--") + 1:]
    elif os.path.basename(sys.argv[0]).lower().startswith("blender"):
        raw = []
    return raw


def main(argv=None) -> int:
    args_list = _argv(argv)
    ap = argparse.ArgumentParser(prog="run.py", description="Стакан 500 мл, чертёж 252214")
    ap.add_argument("--params", default=DEFAULT_PARAMS, help="путь к JSON-конфигу")
    ap.add_argument("--verify", action="store_true", help="замерить и записать out/verify.json")
    ap.add_argument("--render", action="store_true", help="preview.png и uv_layout.png")
    ap.add_argument("--export", action="store_true", help="glb и obj в out/")
    ap.add_argument("--blend", action="store_true",
                    help="сохранить сцену в out/<объект>.blend")
    ap.add_argument("--no-build", action="store_true", help="не перестраивать меш")
    args = ap.parse_args(args_list)

    mods = _reload_src()
    P = mods["profile"]
    U = mods["unwrap"]

    try:
        params = P.load_params(args.params)
    except P.ConfigError as exc:
        print(str(exc), file=sys.stderr)
        return EXIT_CONFIG

    if "build" not in mods:
        print("bpy недоступен: запускать из Blender", file=sys.stderr)
        return 1

    t0 = time.time()
    uv_info = None
    if not args.no_build:
        info = mods["build"].build(params)
        uv_info = info["uv"]
        band = uv_info["bands"][uv_info["band"]]
        print("построен объект %s за %.2f с" % (info["object"], time.time() - t0))
        print("развёртка стенки (%s, пояс %s): alpha = %.3f град, "
              "R_in = %.2f мм, R_out = %.2f мм, образующая = %.2f мм"
              % (uv_info["mode"], uv_info["band"], band["alpha_deg"],
                 band["r_in_mm"], band["r_out_mm"], band["slant_mm"]))
        for name, b in uv_info["bands"].items():
            if name != uv_info["band"]:
                print("  альтернативный пояс %s: alpha = %.3f град, "
                      "R_in = %.2f мм, R_out = %.2f мм"
                      % (name, b["alpha_deg"], b["r_in_mm"], b["r_out_mm"]))

    status = 0
    if args.verify:
        report = mods["verify"].run(params, OUT_DIR, uv_info)
        print(json.dumps({k: v for k, v in report.items()
                          if k in ("pass", "failed")}, ensure_ascii=False))
        for key in report["failed"]:
            entry = report[key]
            print("  FAIL %s: %s (ожидалось %s +- %s)"
                  % (key, entry["value"], entry.get("expected"), entry.get("tolerance")),
                  file=sys.stderr)
        for note in report["_notes"]:
            print("  прим.: " + note)
        if not report["pass"]:
            status = EXIT_VERIFY

    if args.render:
        preview = mods["render"].render_preview(params, OUT_DIR)
        layout = mods["render"].render_uv_layout(params, OUT_DIR)
        print("рендер: %s" % preview)
        print("развёртка: %s" % (layout or "не сохранена"))

    if args.export:
        for path in export(params):
            print("экспорт: %s" % path)

    if args.blend:
        print("blend: %s" % save_blend(params))

    print("итого %.2f с" % (time.time() - t0))
    return status


def save_blend(params: dict) -> str:
    """Сохранить копию сцены рядом с остальным выводом.

    Именно copy=True: путь текущего файла не подменяется, и повторный запуск
    из открытого Blender не уводит пользователя в чужой файл.
    """
    import bpy
    os.makedirs(OUT_DIR, exist_ok=True)
    path = os.path.join(OUT_DIR, params["mesh"]["object_name"] + ".blend")
    bpy.ops.wm.save_as_mainfile(filepath=path, copy=True, compress=True)
    return path


def export(params: dict):
    """glb и obj с UV и материалом. Не часть основного прогона.

    Экспортёры читают реальный выбор во вьюлэйере, а не подменённый контекст,
    поэтому выбор выставляется явно и возвращается на место в finally.
    """
    import bpy
    os.makedirs(OUT_DIR, exist_ok=True)
    obj = bpy.data.objects[params["mesh"]["object_name"]]
    view_objects = list(bpy.context.view_layer.objects)
    prev_selected = [o for o in view_objects if o.select_get()]
    prev_active = bpy.context.view_layer.objects.active

    written = []
    try:
        for o in view_objects:
            o.select_set(False)
        obj.select_set(True)
        bpy.context.view_layer.objects.active = obj

        glb = os.path.join(OUT_DIR, "cup_500ml.glb")
        bpy.ops.export_scene.gltf(filepath=glb, export_format="GLB",
                                  use_selection=True, export_materials="EXPORT")
        written.append(glb)

        obj_path = os.path.join(OUT_DIR, "cup_500ml.obj")
        bpy.ops.wm.obj_export(filepath=obj_path, export_selected_objects=True,
                              export_uv=True, export_normals=True,
                              export_materials=True)
        written.append(obj_path)
    finally:
        for o in view_objects:
            o.select_set(o in prev_selected)
        bpy.context.view_layer.objects.active = prev_active
    return written


if __name__ == "__main__":
    sys.exit(main())
