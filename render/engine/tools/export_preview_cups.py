"""Модели стаканов для превью (этап 3): web/cups/<ID>.glb и index.json.

Модель берётся ровно так, как её берёт рендер (place.import_cup): тот же файл,
тот же поворот, те же размеры — поэтому силуэт в превью совпадает с кадром.
У вафельных EM — оба варианта (variantFiles), по умолчанию вафля в сетке, как
в рендере.
Оси остаются Blender (Z вверх, метры), дно в нуле, ось стакана — в начале
координат. В index.json — рост и радиусы (для подгона кадра и раскладки, как
в bk/group.py), серия и объём (кнопка «Два объёма»).

    blender -b --factory-startup -P engine/tools/export_preview_cups.py
    blender -b --factory-startup -P engine/tools/export_preview_cups.py -- --cup HB80-280 PG95-520
"""

import argparse
import datetime
import io
import json
import os
import sys

import bpy
from mathutils import Matrix, Vector

ENGINE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if ENGINE not in sys.path:
    sys.path.insert(0, ENGINE)
PROJECT = os.path.dirname(ENGINE)


def log(msg: str) -> None:
    print("### " + msg, flush=True)


def export_cup(cfg: dict, cid: str, variant, out: str) -> dict:
    from bk import group, place

    bpy.ops.wm.read_factory_settings(use_empty=True)
    scene = bpy.context.scene
    coll = bpy.data.collections.new(place.PREFIX + "Cup")
    scene.collection.children.link(coll)
    cfg["cup_key"] = cid
    cfg["cup_variant"] = variant
    cfg["_rotate_deg"] = 0.0
    entry = place.resolve_cup(cfg)
    obj = place.import_cup(cfg, coll)
    basis = obj.matrix_basis.copy()
    # Сетка — в осях объекта, как её ставит рендер (пустышка сцены @ объект);
    # затем дно в ноль и ось в начало координат.
    obj.data.transform(basis)
    obj.matrix_basis = Matrix.Identity(4)
    xs = [v.co.x for v in obj.data.vertices]
    ys = [v.co.y for v in obj.data.vertices]
    zs = [v.co.z for v in obj.data.vertices]
    shift = Vector(((min(xs) + max(xs)) / 2, (min(ys) + max(ys)) / 2, min(zs)))
    obj.data.transform(Matrix.Translation(-shift))
    obj.data.update()
    r_top, r_bot = group._radii(obj)
    height = place.local_height(obj)

    for ob in list(scene.objects):
        ob.select_set(ob == obj)
    bpy.context.view_layer.objects.active = obj
    name = cid + (f"-{variant}" if variant else "")
    path = os.path.join(out, name + ".glb")
    kw = dict(filepath=path, export_format="GLB", use_selection=True, export_yup=False,
              export_apply=True, export_texcoords=True, export_normals=True,
              export_materials="PLACEHOLDER", export_animations=False)
    try:
        bpy.ops.export_scene.gltf(export_draco_mesh_compression_enable=True,
                                  export_draco_mesh_compression_level=6, **kw)
        draco = True
    except (TypeError, RuntimeError):
        bpy.ops.export_scene.gltf(**kw)
        draco = False
    kb = os.path.getsize(path) // 1024
    log(f"{name}: {height * 1000:.1f} мм, кромка ⌀{r_top * 2000:.1f}, дно ⌀{r_bot * 2000:.1f}, "
        f"{len(obj.data.vertices)} вершин, {kb} КБ{' (draco)' if draco else ''}; "
        f"сдвиг к оси {[round(v * 1000, 2) for v in shift]} мм, "
        f"место в файле {[round(v, 4) for v in basis.translation]}")
    return {
        "id": cid, "variant": variant, "file": name + ".glb", "label": entry.get("label", cid),
        "type": entry.get("type"), "group": entry.get("group"), "brimMl": entry.get("brim_ml"),
        "heightMm": round(height * 1000, 2), "rTopMm": round(r_top * 1000, 2), "rBotMm": round(r_bot * 1000, 2),
        "materials": [m.name for m in obj.data.materials if m],
        "shiftMm": [round(v * 1000, 3) for v in shift],
        "draco": draco,
    }


def main() -> int:
    raw = sys.argv[1:]
    argv = raw[raw.index("--") + 1:] if "--" in raw else []
    ap = argparse.ArgumentParser(prog="export_preview_cups.py")
    ap.add_argument("--cup", nargs="*", default=None, help="только эти ID (по умолчанию весь каталог)")
    ap.add_argument("--out", default=os.path.join(PROJECT, "web", "cups"))
    ap.add_argument("--variant", default=None, help="только этот вариант для всех --cup (у EM: mesh или nm)")
    args = ap.parse_args(argv)

    from bk import place
    cfg = place.load_config(os.path.join(ENGINE, "params", "shots.json"))
    out = os.path.abspath(args.out)
    os.makedirs(out, exist_ok=True)
    index_path = os.path.join(out, "index.json")
    known = {}
    if os.path.isfile(index_path):
        with io.open(index_path, "r", encoding="utf-8") as fh:
            known = {c["id"]: c for c in json.load(fh).get("cups", [])}
    ids = args.cup or place.cup_ids(cfg)
    for cid in ids:
        if cid not in cfg["cups"]:
            print(f"стакана {cid!r} нет в каталоге", file=sys.stderr)
            return 2
        entry = cfg["cups"][cid]
        if args.variant or not entry.get("variants"):
            known[entry["id"]] = export_cup(cfg, entry["id"], args.variant, out)
            continue
        # У вафельных EM — оба варианта: по умолчанию тот же, что берёт рендер
        # (вафля в сетке, силуэт с рельефом), и лёгкий с картой нормалей.
        files = {v: export_cup(cfg, entry["id"], v, out) for v in entry["variants"]}
        default = place.resolve_cup(dict(cfg, cup_key=entry["id"], cup_variant=None)).get("variant") or "mesh"
        rec = dict(files[default])
        rec["variant"] = default
        rec["variantFiles"] = {v: f["file"] for v, f in files.items()}
        known[entry["id"]] = rec
    order = {c: i for i, c in enumerate(place.cup_ids(cfg))}
    cups = sorted(known.values(), key=lambda c: order.get(c["id"], 999))
    with io.open(index_path, "w", encoding="utf-8") as fh:
        fh.write(json.dumps({"schema": 1, "exported": datetime.date.today().isoformat(),
                             "reference": cfg["reference_cup"], "coords": "blender-z-up, metres",
                             "cups": cups}, ensure_ascii=False, indent=1) + "\n")
    log(f"стаканов в index.json: {len(cups)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
