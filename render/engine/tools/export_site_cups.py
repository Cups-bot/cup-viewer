"""Модели стаканов из рендера — для сайта: assets/models/cups/<ID>.glb.

Нужна тем стаканам, у которых своей модели для сайта нет, — сейчас PET
(PG95-400/520/600). Модель берётся ровно так, как её берёт рендер
(place.import_cup): тот же файл, те же размеры, дно в нуле, ось в начале
координат. Оси — как принято в glTF (Y вверх): сайт читает модели каталога
именно так.

Что делается с PET под сайт:
  * материалы: PET_Print — печатная стенка (на неё сайт кладёт «прозрачный
    PET» и макет), PET — дно, внутренняя сторона, кромка: простой прозрачный
    материал без печати. Текстуры из файла модели (тестовая печать А/Б) не
    выгружаются;
  * развёртка печатной стенки сжимается в [0,1; 0,9]: сайт кладёт макет
    на середину «печатного листа» с полями SHEET_MARGIN = 0,1
    (js/loaders/TextureManager.js), как у пластика BM;
  * в едином каталоге (catalog/cups.json) стакан получает раздел web: файл,
    развёртку (u — по кругу, v — по высоте; ширина — окружность средней
    высоты), шов (u = 0 смотрит по +X). Затем npm run catalog.

    blender -b --factory-startup -P render/engine/tools/export_site_cups.py -- --cup PG95-400 PG95-520 PG95-600
"""

import argparse
import io
import json
import math
import os
import sys

import bpy
from mathutils import Matrix, Vector

ENGINE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if ENGINE not in sys.path:
    sys.path.insert(0, ENGINE)
RENDER = os.path.dirname(ENGINE)
REPO = os.path.dirname(RENDER)

SHEET_MARGIN = 0.1          # как в js/loaders/TextureManager.js
PRINT_MATERIAL = "PET_Print"


def log(msg: str) -> None:
    print("### " + msg, flush=True)


def plain_material(mat, alpha: float, roughness: float) -> None:
    """Простой PBR без текстур: сайт всё равно кладёт свой материал на печать."""
    mat.use_nodes = True
    nt = mat.node_tree
    nt.nodes.clear()
    bsdf = nt.nodes.new("ShaderNodeBsdfPrincipled")
    bsdf.inputs["Base Color"].default_value = (1.0, 1.0, 1.0, 1.0)
    bsdf.inputs["Roughness"].default_value = roughness
    bsdf.inputs["Alpha"].default_value = alpha
    out = nt.nodes.new("ShaderNodeOutputMaterial")
    nt.links.new(bsdf.outputs[0], out.inputs["Surface"])
    if alpha < 1.0:
        try:
            mat.surface_render_method = "BLENDED"
        except (AttributeError, TypeError):
            mat.blend_method = "BLEND"


def export_cup(cfg: dict, cid: str, out: str) -> dict:
    from bk import place

    bpy.ops.wm.read_factory_settings(use_empty=True)
    scene = bpy.context.scene
    coll = bpy.data.collections.new(place.PREFIX + "Cup")
    scene.collection.children.link(coll)
    cfg["cup_key"] = cid
    cfg["cup_variant"] = None
    cfg["_rotate_deg"] = 0.0
    entry = place.resolve_cup(cfg)
    obj = place.import_cup(cfg, coll)
    obj.data.transform(obj.matrix_basis)
    obj.matrix_basis = Matrix.Identity(4)
    me = obj.data
    xs = [v.co.x for v in me.vertices]
    ys = [v.co.y for v in me.vertices]
    zs = [v.co.z for v in me.vertices]
    shift = Vector(((min(xs) + max(xs)) / 2, (min(ys) + max(ys)) / 2, min(zs)))
    me.transform(Matrix.Translation(-shift))

    names = [m.name if m else None for m in me.materials]
    if PRINT_MATERIAL not in names:
        raise RuntimeError(f"{cid}: в модели нет материала {PRINT_MATERIAL} (есть {names})")
    printed = names.index(PRINT_MATERIAL)
    for m in me.materials:
        if m is None:
            continue
        if m.name == PRINT_MATERIAL:
            plain_material(m, 1.0, 0.03)
        else:
            plain_material(m, 0.12, 0.05)

    # Печатная стенка — в середину «листа» сайта; остальная геометрия печать не получает.
    uv = me.uv_layers.get("UVMap") or me.uv_layers[0]
    inner = 1.0 - 2.0 * SHEET_MARGIN
    for poly in me.polygons:
        if poly.material_index != printed:
            continue
        for li in poly.loop_indices:
            u, v = uv.data[li].uv
            uv.data[li].uv = (SHEET_MARGIN + u * inner, SHEET_MARGIN + v * inner)
    # Вторая развёртка (клеймо на дне) сайту не нужна.
    for layer in [l for l in me.uv_layers if l.name != uv.name]:
        me.uv_layers.remove(layer)
    uv.active = True
    me.update()

    for ob in list(scene.objects):
        ob.select_set(ob == obj)
    bpy.context.view_layer.objects.active = obj
    path = os.path.join(out, cid + ".glb")
    kw = dict(filepath=path, export_format="GLB", use_selection=True, export_yup=True,
              export_apply=True, export_texcoords=True, export_normals=True,
              export_materials="EXPORT", export_animations=False)
    try:
        bpy.ops.export_scene.gltf(export_draco_mesh_compression_enable=True,
                                  export_draco_mesh_compression_level=6, **kw)
    except (TypeError, RuntimeError):
        bpy.ops.export_scene.gltf(**kw)

    size = entry["size_mm"]
    height_mm = (max(zs) - min(zs)) * 1000
    mid_d = (size["top"] + size["bottom"]) / 2
    web = {
        "file": f"assets/models/cups/{cid}.glb",
        "textureMapping": {
            "materials": [PRINT_MATERIAL],
            "uv": 0,
            "sheet": True,
            # u — полный круг, v — вся высота стенки; ширина — окружность на
            # средней высоте (стакан — конус, точного значения у развёртки нет).
            "unwrapMm": [round(math.pi * mid_d, 1), round(height_mm, 1)],
            # u = 0 смотрит по +X Blender, в осях сайта — азимут 90°.
            "seamDeg": 90,
        },
    }
    log(f"{cid}: {os.path.getsize(path) // 1024} КБ, развёртка {web['textureMapping']['unwrapMm']} мм")
    return web


def main() -> int:
    raw = sys.argv[1:]
    argv = raw[raw.index("--") + 1:] if "--" in raw else []
    ap = argparse.ArgumentParser(prog="export_site_cups.py")
    ap.add_argument("--cup", nargs="+", required=True, help="ID стаканов (сейчас — PET)")
    ap.add_argument("--out", default=os.path.join(REPO, "assets", "models", "cups"))
    args = ap.parse_args(argv)

    from bk import place
    cfg = place.load_config(os.path.join(ENGINE, "params", "shots.json"))
    out = os.path.abspath(args.out)
    os.makedirs(out, exist_ok=True)
    catalog_path = os.path.join(REPO, "catalog", "cups.json")
    with io.open(catalog_path, "r", encoding="utf-8") as fh:
        catalog = json.load(fh)
    by_id = {c["id"]: c for c in catalog["cups"]}
    for cid in args.cup:
        if cid not in by_id:
            print(f"стакана {cid!r} нет в catalog/cups.json", file=sys.stderr)
            return 2
        by_id[cid]["web"] = export_cup(cfg, cid, out)
    with io.open(catalog_path, "w", encoding="utf-8", newline="\n") as fh:
        fh.write(json.dumps(catalog, ensure_ascii=False, indent=2) + "\n")
    log("catalog/cups.json: раздел web обновлён — теперь npm run catalog")
    return 0


if __name__ == "__main__":
    sys.exit(main())
