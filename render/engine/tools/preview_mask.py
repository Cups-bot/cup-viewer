"""Маска силуэтов стаканов — эталон для проверки превью (этап 3).

Кадр собирается по заданию ровно как в run.py --job, затем стаканы светятся
белым на чёрном, всё остальное спрятано от камеры, размытия нет. Рядом с
маской в index.json ложится всё, что нужно превью, чтобы нарисовать тот же
кадр: фон, ракурс, формат, окно кадра, места и повороты стаканов.
web/preview/check.html рисует маску сам и сравнивает силуэты (приёмка
этапа 3: расхождение не больше 2 px).

    blender -b --factory-startup -P engine/tools/preview_mask.py -- --job a.json [--job b.json ...]
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


def to_mask(scene, cups) -> None:
    """Стаканы — белая эмиссия, остальное — вон из кадра, мир чёрный."""
    white = bpy.data.materials.new("MASK_White")
    white.use_nodes = True
    nt = white.node_tree
    nt.nodes.clear()
    em = nt.nodes.new("ShaderNodeEmission")
    em.inputs["Color"].default_value = (1, 1, 1, 1)
    em.inputs["Strength"].default_value = 1.0
    out = nt.nodes.new("ShaderNodeOutputMaterial")
    nt.links.new(em.outputs[0], out.inputs["Surface"])
    names = {c.name for c in cups}
    keep = set(names) | {scene.camera.name}
    for c in cups:
        p = c.parent
        while p is not None:
            keep.add(p.name)
            p = p.parent
    for ob in scene.objects:
        if ob.name in names:
            for slot in ob.material_slots:
                slot.link = "OBJECT"
                slot.material = white
            if not ob.material_slots:
                ob.data.materials.append(white)
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
    scene.render.image_settings.color_mode = "BW"


def main() -> int:
    raw = sys.argv[1:]
    argv = raw[raw.index("--") + 1:] if "--" in raw else []
    ap = argparse.ArgumentParser(prog="preview_mask.py")
    ap.add_argument("--job", action="append", required=True)
    ap.add_argument("--out", default=os.path.join(PROJECT, "out", "preview_check"))
    ap.add_argument("--long-side", type=int, default=800)
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
    for job_path in args.job:
        cfg = copy.deepcopy(base_cfg)
        job = run.load_job(job_path, cfg, place)
        cfg["print"]["enabled"] = False
        name = os.path.splitext(os.path.basename(job_path))[0]
        set_name = job["set"]
        builder = {"greybox": greybox, "blend": place, "authored": authored}[cfg["shots"][set_name].get("source", "blend")]
        info = builder.build(cfg, set_name, 16, args.long_side)
        scene = bpy.data.scenes[info["scene"]]
        comp = info["compose"]
        coll = bpy.data.collections.get(place.PREFIX + "Cup")
        cups = [ob for ob in coll.all_objects if ob.type == "MESH"]
        to_mask(scene, cups)
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
    return 0


if __name__ == "__main__":
    sys.exit(main())
