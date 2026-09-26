"""Стакан 650 мл. Движок берётся из cup500, здесь только свои параметры.

Код построения общий для всех объёмов: в cup500/src нет ни одного размерного
литерала, всё приходит из JSON. Поэтому здесь не копия проекта, а тонкая
обёртка — она подменяет каталог вывода и имена файлов экспорта, а сам движок
импортирует как библиотеку.

    blender -b -P run.py -- --verify
    blender -b -P run.py -- --verify --render --export
"""

import os
import sys

ROOT = os.path.dirname(os.path.abspath(__file__))
ENGINE = os.path.normpath(os.path.join(ROOT, "..", "cup500"))

if not os.path.isdir(os.path.join(ENGINE, "src")):
    raise SystemExit(f"{ENGINE}: не найден движок cup500")
if ENGINE not in sys.path:
    sys.path.insert(0, ENGINE)

import run as engine                                     # noqa: E402

engine.ROOT = ROOT
engine.OUT_DIR = os.path.join(ROOT, "out")
engine.DEFAULT_PARAMS = os.path.join(ROOT, "params", "cup_650ml.json")


def export(params: dict):
    """То же, что в движке, но имена файлов из конфига, а не зашиты."""
    import bpy
    os.makedirs(engine.OUT_DIR, exist_ok=True)
    name = params["mesh"]["object_name"]
    obj = bpy.data.objects[name]
    # в списке вьюлэйера попадаются пустые ссылки, отсюда фильтр
    view_objects = [o for o in bpy.context.view_layer.objects if o is not None]
    prev_selected = [o for o in view_objects if o.select_get()]
    prev_active = bpy.context.view_layer.objects.active
    written = []
    try:
        for o in view_objects:
            o.select_set(False)
        obj.select_set(True)
        bpy.context.view_layer.objects.active = obj
        glb = os.path.join(engine.OUT_DIR, name + ".glb")
        bpy.ops.export_scene.gltf(filepath=glb, export_format="GLB",
                                  use_selection=True, export_materials="EXPORT")
        written.append(glb)
        obj_path = os.path.join(engine.OUT_DIR, name + ".obj")
        bpy.ops.wm.obj_export(filepath=obj_path, export_selected_objects=True,
                              export_uv=True, export_normals=True,
                              export_materials=True)
        written.append(obj_path)
    finally:
        for o in view_objects:
            o.select_set(o in prev_selected)
        bpy.context.view_layer.objects.active = prev_active
    return written


engine.export = export
main = engine.main

if __name__ == "__main__":
    sys.exit(main())
