"""Поле печати PP для сайта — те же числа, что ставит рендер (этап В).

Рендер кладёт макет PP на стенку через узел Mapping поверх развёртки
UVPrint (place.rect_fit): поле с отступами от дна и от видимого края, высота
по образующей, ширина дугой. Модель сайта несёт ту же развёртку, и чтобы макет
лёг на неё так же, сайту нужны эти числа: u — [начало, доля ширины], v —
[низ, верх] поля (оси Blender, v снизу вверх). Они пишутся в единый каталог:
catalog/cups.json → web.textureMapping.field, а размер листа макета
(unwrapMm) — формат поля, как в заводском шаблоне. Затем npm run catalog.

    blender -b --factory-startup -P render/engine/tools/site_print_fields.py
"""

import io
import json
import os
import sys

import bpy

ENGINE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if ENGINE not in sys.path:
    sys.path.insert(0, ENGINE)
REPO = os.path.dirname(os.path.dirname(ENGINE))
CATALOG = os.path.join(REPO, "catalog", "cups.json")


def log(msg: str) -> None:
    print("### " + msg, flush=True)


def main() -> int:
    from bk import place

    cfg = place.load_config(os.path.join(ENGINE, "params", "shots.json"))
    with io.open(CATALOG, "r", encoding="utf-8") as fh:
        catalog = json.load(fh)
    cups = catalog["cups"] if isinstance(catalog, dict) else catalog
    changed = 0
    for cup in cups:
        if cup.get("render", {}).get("adapter") != "plastic" or not cup.get("web"):
            continue
        bpy.ops.wm.read_factory_settings(use_empty=True)
        coll = bpy.data.collections.new(place.PREFIX + "Cup")
        bpy.context.scene.collection.children.link(coll)
        cfg["cup_key"] = cup["id"]
        cfg["cup_variant"] = None
        cfg["_rotate_deg"] = 0.0
        obj = place.import_cup(cfg, coll)
        height_mm = place.local_height(obj) * 1000.0
        fit = place.rect_fit(cfg, place.print_spec(cfg, {}), height_mm)
        tm = cup["web"]["textureMapping"]
        tm["field"] = {"u": [round(v, 6) for v in fit["u"]], "v": [round(v, 6) for v in fit["v"]]}
        tm["unwrapMm"] = [round(v, 1) for v in fit["field_mm"]]
        changed += 1
        log(f"{cup['id']}: поле {tm['unwrapMm']} мм, u {tm['field']['u']}, v {tm['field']['v']}")
    with io.open(CATALOG, "w", encoding="utf-8", newline="\n") as fh:
        fh.write(json.dumps(catalog, ensure_ascii=False, indent=2) + "\n")
    log(f"каталог: {changed} стакан(ов) PP")
    return 0


if __name__ == "__main__":
    sys.exit(main())
