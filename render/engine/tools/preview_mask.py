"""Маска силуэтов стаканов — эталон для проверки превью (этап 3).

Кадр собирается по заданию ровно как в run.py --job, затем стаканы светятся
белым на чёрном, всё остальное спрятано от камеры, размытия нет. Рядом с
маской в index.json ложится всё, что нужно превью, чтобы нарисовать тот же
кадр: фон, ракурс, формат, окно кадра, места и повороты стаканов.
web/preview/check.html рисует маску сам и сравнивает силуэты (приёмка
этапа 3: расхождение не больше 2 px).

--art — вместо маски макет без света: стенка светится ровно цветами макета,
как он лёг по развёртке, остальное чёрное. Так сайт и рендер сверяют, куда
ложится макет и какой стороной стакан смотрит в камеру (этап В,
tests/photoreal/art-check.mjs).

    blender -b --factory-startup -P engine/tools/preview_mask.py -- --job a.json [--job b.json ...] [--art]
"""

import argparse
import copy
import io
import json
import os
import sys

import bpy

ENGINE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if ENGINE not in sys.path:
    sys.path.insert(0, ENGINE)
PROJECT = os.path.dirname(ENGINE)


def log(msg: str) -> None:
    print("### " + msg, flush=True)


def _emission(name, rgb):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    nt = mat.node_tree
    nt.nodes.clear()
    em = nt.nodes.new("ShaderNodeEmission")
    em.inputs["Color"].default_value = (*rgb, 1)
    em.inputs["Strength"].default_value = 1.0
    out = nt.nodes.new("ShaderNodeOutputMaterial")
    nt.links.new(em.outputs[0], out.inputs["Surface"])
    return mat


def _art_node(mat, art):
    """Узел макета в материале: у бумаги — CUPS_Artwork, у PP — картинка из файла макета."""
    if not (mat and mat.node_tree):
        return None
    node = mat.node_tree.nodes.get("CUPS_Artwork")
    if node is not None and node.image is not None:
        return node
    want = os.path.normcase(os.path.abspath(art)) if art else None
    for n in mat.node_tree.nodes:
        if n.bl_idname == "ShaderNodeTexImage" and n.image is not None and want and                 os.path.normcase(os.path.abspath(bpy.path.abspath(n.image.filepath))) == want:
            return n
    return None


def to_art(mat, art, black):
    """Материал стакана → эмиссия цветом макета через ту же развёртку; без макета — чёрный."""
    node = _art_node(mat, art)
    if node is None:
        return black
    art_mat = mat.copy()
    art_mat.name = "ART_" + mat.name
    nt = art_mat.node_tree
    node = nt.nodes.get(node.name)
    em = nt.nodes.new("ShaderNodeEmission")
    em.inputs["Strength"].default_value = 1.0
    nt.links.new(node.outputs["Color"], em.inputs["Color"])
    out = next((n for n in nt.nodes if n.bl_idname == "ShaderNodeOutputMaterial" and n.is_active_output), None)         or nt.nodes.new("ShaderNodeOutputMaterial")
    for link in list(out.inputs["Surface"].links):
        nt.links.remove(link)
    nt.links.new(em.outputs[0], out.inputs["Surface"])
    if "Volume" in out.inputs:
        for link in list(out.inputs["Volume"].links):
            nt.links.remove(link)
    if "Displacement" in out.inputs:
        for link in list(out.inputs["Displacement"].links):
            nt.links.remove(link)
    return art_mat


def to_mask(scene, cups, arts=None) -> None:
    """Стаканы — белая эмиссия (или макет без света), остальное — вон из кадра, мир чёрный."""
    white = _emission("MASK_White", (1, 1, 1))
    black = _emission("MASK_Black", (0, 0, 0))
    names = {c.name for c in cups}
    keep = set(names) | {scene.camera.name}
    for c in cups:
        p = c.parent
        while p is not None:
            keep.add(p.name)
            p = p.parent
    for ob in scene.objects:
        if ob.name in names:
            art = (arts or {}).get(ob.name)
            for slot in ob.material_slots:
                source = slot.material
                slot.link = "OBJECT"
                slot.material = to_art(source, art, black) if arts is not None else white
            if not ob.material_slots:
                ob.data.materials.append(black if arts is not None else white)
        elif ob.name not in keep:
            ob.hide_render = True       # и пустышки с коллекциями-экземплярами тоже
    world = bpy.data.worlds.new("MASK_Black")
    world.use_nodes = True
    world.node_tree.nodes["Background"].inputs["Strength"].default_value = 0.0
    scene.world = world
    vs = scene.view_settings
    vs.view_transform = "Standard"
    vs.look = "None"
    vs.exposure = 0.0
    vs.gamma = 1.0
    scene.camera.data.dof.use_dof = False
    cy = scene.cycles
    cy.samples = 16
    cy.use_adaptive_sampling = False
    cy.use_denoising = False
    scene.render.film_transparent = False
    scene.render.image_settings.file_format = "PNG"
    scene.render.image_settings.color_mode = "BW" if arts is None else "RGB"


def main() -> int:
    raw = sys.argv[1:]
    argv = raw[raw.index("--") + 1:] if "--" in raw else []
    ap = argparse.ArgumentParser(prog="preview_mask.py")
    ap.add_argument("--job", action="append", required=True)
    ap.add_argument("--out", default=os.path.join(PROJECT, "out", "preview_check"))
    ap.add_argument("--long-side", type=int, default=800)
    ap.add_argument("--art", action="store_true", help="макет без света вместо маски")
    args = ap.parse_args(argv)

    import run
    from bk import authored, greybox, place

    out = os.path.abspath(args.out)
    os.makedirs(out, exist_ok=True)
    index_path = os.path.join(out, "index.json")
    cases = {}
    if os.path.isfile(index_path):
        with io.open(index_path, "r", encoding="utf-8") as fh:
            cases = {c["name"]: c for c in json.load(fh).get("cases", [])}

    base_cfg = place.load_config(os.path.join(ENGINE, "params", "shots.json"))
    failed = 0
    for job_path in args.job:
        cfg = copy.deepcopy(base_cfg)
        name = os.path.splitext(os.path.basename(job_path))[0]
        try:
            job = run.load_job(job_path, cfg, place)
            cfg["print"]["enabled"] = bool(args.art)
            set_name = job["set"]
            builder = {"greybox": greybox, "blend": place, "authored": authored}[cfg["shots"][set_name].get("source", "blend")]
            info = builder.build(cfg, set_name, 16, args.long_side)
        except place.ConfigError as exc:
            # Одно задание с ошибкой не обрывает остальные: сверка покажет, где.
            log(f"ОШИБКА {name}: {exc}")
            failed += 1
            continue
        scene = bpy.data.scenes[info["scene"]]
        comp = info["compose"]
        coll = bpy.data.collections.get(place.PREFIX + "Cup")
        cups = [ob for ob in coll.all_objects if ob.type == "MESH"]
        arts = None
        if args.art:
            # Стакан → его макет: главный — «Cup», второй — «Cup2» (group.load).
            arts = {}
            for ob in cups:
                top = ob
                while top.parent is not None and top.parent.name.startswith(place.PREFIX + "Cup"):
                    top = top.parent
                i = 1 if top.name.endswith("Cup2") or ob.name.endswith("Cup2") else 0
                arts[ob.name] = job["cups"][min(i, len(job["cups"]) - 1)].get("art")
        to_mask(scene, cups, arts)
        file = name + ".png"
        scene.render.filepath = os.path.join(out, file)
        with bpy.context.temp_override(scene=scene):
            bpy.ops.render.render(write_still=True)
        specs = job["cups"]
        cases[name] = {
            "name": name, "set": set_name, "preset": comp["preset"], "frame": comp["frame"],
            "window": comp["window"], "insideBackdrop": comp["inside_backdrop"],
            "px": [scene.render.resolution_x, scene.render.resolution_y],
            "cups": [{"id": p["id"], "variant": specs[i].get("variant"), "posMm": p["pos_mm"], "floorMm": p["floor_mm"],
                      "rotate": float(specs[i].get("rotate", 0.0)),
                      "placed": "job" if specs[i].get("pos_mm") is not None or i == 0 else "layout"}
                     for i, p in enumerate(comp["positions"])],
            "mask": file,
            "warnings": info.get("warnings", []),
        }
        log(f"{name}: {set_name}/{comp['preset']} {comp['frame']} {scene.render.resolution_x}×"
            f"{scene.render.resolution_y}, окно {comp['window']}, стаканы "
            f"{[(p['id'], p['pos_mm'], p['floor_mm']) for p in comp['positions']]}")
        with io.open(index_path, "w", encoding="utf-8") as fh:
            fh.write(json.dumps({"schema": 1, "cases": sorted(cases.values(), key=lambda c: c["name"])},
                                ensure_ascii=False, indent=1) + "\n")
    return 1 if failed == len(args.job) else 0


if __name__ == "__main__":
    sys.exit(main())
