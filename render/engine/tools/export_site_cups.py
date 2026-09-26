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
  * развёртка печатной стенки остаётся как у рендера (UVMap, 0…1): поля
    «печатного листа» (SHEET_MARGIN, js/loaders/TextureManager.js) сайт
    добавляет сам. Прежнее сжатие в [0,1; 0,9] считало поля дважды — лист на
    PET растягивался в 1,25 раза (найдено сверкой tests/photoreal/art-check.mjs);
  * в едином каталоге (catalog/cups.json) стакан получает раздел web: файл,
    стороны печати А/Б (tools/site_pet_sides.py: поле, высота, азимуты,
    профиль стенки), лист макета — поле одной стороны, шов (u = 0 смотрит по
    +X). Затем npm run catalog.

    blender -b --factory-startup -P render/engine/tools/export_site_cups.py -- --cup PG95-400 PG95-520 PG95-600
"""

import argparse
import io
import json
import os
import sys

import bpy
from mathutils import Matrix, Vector

ENGINE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if ENGINE not in sys.path:
    sys.path.insert(0, ENGINE)
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
RENDER = os.path.dirname(ENGINE)
REPO = os.path.dirname(RENDER)

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

    # Развёртка печатной стенки — как у рендера: лист из сторон ложится так же.
    uv = me.uv_layers.get("UVMap") or me.uv_layers[0]
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

    from site_pet_sides import PROFILES, sides_for
    with io.open(PROFILES, "r", encoding="utf-8") as fh:
        prof = json.load(fh)
    sides = sides_for(prof, prof["cups"][cid])
    web = {
        "file": f"assets/models/cups/{cid}.glb",
        "textureMapping": {
            "materials": [PRINT_MATERIAL],
            "uv": 0,
            "sheet": True,
            # Лист макета — поле одной стороны; стороны сводит сайт (petSides.js).
            "unwrapMm": [float(sides["widthMm"]), round(float(sides["zMm"][1] - sides["zMm"][0]), 1)],
            # u = 0 смотрит по +X Blender, в осях сайта — азимут 90°.
            "seamDeg": 90,
            "sides": sides,
        },
    }
    log(f"{cid}: {os.path.getsize(path) // 1024} КБ, развёртка {web['textureMapping']['unwrapMm']} мм")
    return web


def seam_deg(objs) -> float:
    """Азимут шва в осях сайта: нахлёст, где сходятся края листа развёртки.

    Шов бумажного стакана — нахлёст: концы сектора заходят друг на друга, общих
    точек у них нет. Поэтому шов ищется по краям печати на развёртке: точки с
    крайними u (оба края листа) лежат у шва. Сайт поворачивает стакан на
    −seamDeg, чтобы шов встал к камере (Viewer.viewCamera): азимут —
    atan2(x, z) в осях three, то есть atan2(x, −y) в осях Blender.
    """
    import math
    pts = []
    for ob in objs:
        me = ob.data
        names = [m.name if m else "" for m in me.materials]
        uv = me.uv_layers.active
        if uv is None:
            continue
        mw = ob.matrix_world
        for poly in me.polygons:
            if not names[poly.material_index].startswith("Paper_Print"):
                continue
            for li in poly.loop_indices:
                co = mw @ me.vertices[me.loops[li].vertex_index].co
                pts.append((uv.data[li].uv[0], co.x, co.y))
    if not pts:
        raise RuntimeError("печатной стенки (Paper_Print) нет")
    u0 = min(p[0] for p in pts)
    u1 = max(p[0] for p in pts)
    band = 0.01 * (u1 - u0)
    edge = [p for p in pts if p[0] < u0 + band or p[0] > u1 - band]
    x = sum(p[1] for p in edge) / len(edge)
    y = sum(p[2] for p in edge) / len(edge)
    return round(math.degrees(math.atan2(x, -y)) % 360.0)


def export_paper(cfg: dict, cid: str, out: str) -> dict:
    """Бумажный стакан из файла аддона — как сайтовые модели этого семейства.

    Эмбо — вариант «вафля картой нормалей» (у сетки вафли 240 тыс. граней —
    не для браузера): три сетки Cup_Bottom / Cup_Wall / Cup_Wrap, материалы
    Paper_Print / Paper_Inner / Paper_Edge, карта нормалей рельефа остаётся,
    тестовая картинка печати (узел CUPS_Artwork) — нет. Поворот пустышки
    CUPS_Product выгружается вместе с сетками: у рендера он тот же
    (place.import_cup), поэтому макет на сайте смотрит в ту же сторону.
    """
    from bk import place

    cfg["cup_key"] = cid
    cfg["cup_variant"] = "nm"
    entry = place.resolve_cup(cfg)
    blend = place._abs(entry["blend"])
    bpy.ops.wm.open_mainfile(filepath=blend)
    root = bpy.data.objects[entry["root"]]
    meshes = [o for o in root.children_recursive if o.type == "MESH"]
    for mat in {m for o in meshes for m in o.data.materials if m and m.node_tree}:
        nt = mat.node_tree
        art = nt.nodes.get("CUPS_Artwork")
        if art is not None:
            for link in list(art.outputs[0].links) + list(art.outputs[1].links):
                nt.links.remove(link)
            nt.nodes.remove(art)
    # Карта нормалей рельефа — как у сайтовых моделей семейства, до 1024 px.
    for img in {n.image for o in meshes for m in o.data.materials if m and m.node_tree
                for n in m.node_tree.nodes if n.bl_idname == "ShaderNodeTexImage" and n.image}:
        w, h = img.size
        if max(w, h) > 1024:
            k = 1024 / max(w, h)
            img.scale(max(1, round(w * k)), max(1, round(h * k)))
    for ob in bpy.context.scene.objects:
        ob.select_set(ob in meshes or ob == root)
    bpy.context.view_layer.objects.active = meshes[0]
    seam = seam_deg(meshes)
    path = os.path.join(out, cid + ".glb")
    kw = dict(filepath=path, export_format="GLB", use_selection=True, export_yup=True,
              export_apply=True, export_texcoords=True, export_normals=True,
              export_materials="EXPORT", export_animations=False, export_image_format="AUTO")
    try:
        bpy.ops.export_scene.gltf(export_draco_mesh_compression_enable=True,
                                  export_draco_mesh_compression_level=6, **kw)
    except (TypeError, RuntimeError):
        bpy.ops.export_scene.gltf(**kw)
    page = entry["print"]["page_mm"]
    web = {
        "file": f"assets/models/cups/{cid}.glb",
        "textureMapping": {
            "materials": ["Paper_Print"],
            "uv": 0,
            "sheet": False,
            # Лист макета — заводской (render.print.page_mm), как у остальных бумажных.
            "unwrapMm": [float(page[0]), float(page[1])],
            "seamDeg": seam,
        },
    }
    log(f"{cid}: {os.path.getsize(path) // 1024} КБ, шов {seam}°, лист {web['textureMapping']['unwrapMm']} мм")
    return web


def main() -> int:
    raw = sys.argv[1:]
    argv = raw[raw.index("--") + 1:] if "--" in raw else []
    ap = argparse.ArgumentParser(prog="export_site_cups.py")
    ap.add_argument("--cup", nargs="+", required=True, help="ID стаканов: PET и бумажные (EM90-530)")
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
        adapter = (by_id[cid].get("render") or {}).get("adapter")
        by_id[cid]["web"] = export_paper(cfg, cid, out) if adapter == "paper" else export_cup(cfg, cid, out)
    with io.open(catalog_path, "w", encoding="utf-8", newline="\n") as fh:
        fh.write(json.dumps(catalog, ensure_ascii=False, indent=2) + "\n")
    log("catalog/cups.json: раздел web обновлён — теперь npm run catalog")
    return 0


if __name__ == "__main__":
    sys.exit(main())
