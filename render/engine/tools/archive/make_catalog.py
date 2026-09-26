"""АРХИВ (2026-09-26): так собирался каталог 3DCupRender до переезда в CupViewer.
Теперь каталог один на сайт и рендер — catalog/cups.json в корне репозитория,
он правится руками; models.json для сайта собирает npm run catalog.

Собрать единый каталог стаканов catalog/cups.json.

Источники — то, что уже есть в проекте, руками каталог не пишется:

  * PP (литой полипропилен) — реестр cups из engine/params/shots.json;
  * бумага — параметры аддона cups/paper/cup_mockup/params/*.json и готовые
    .blend в cups/paper/<артикул>/;
  * PET — cups/pet/profiles.json;
  * номинальный объём и габариты — каталог просмотрщика
    source/viewer/catalog/models.json, там же ID пластика (BM90-…).

Пути в каталоге — от корня 3DCupRender.

    py -3 engine/tools/make_catalog.py
"""

import json
import os
import re
import sys

PROJECT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


def _load(rel):
    with open(os.path.join(PROJECT, rel), encoding="utf-8") as fh:
        return json.load(fh)


def _exists(rel):
    return os.path.isfile(os.path.join(PROJECT, rel))


def viewer_models():
    rel = "source/viewer/catalog/models.json"
    return {m["id"]: m for m in _load(rel)["models"]} if _exists(rel) else {}


def plastic(shots, viewer):
    # ID как в просмотрщике; ключи раннера (410/500/650) остаются псевдонимами
    ids = {"410": "BM90-410", "500": "BM90-500", "650": "BM90-655"}
    out = []
    for key, cup in shots["cups"].items():
        if key.startswith("_") or key not in ids:
            continue
        vid = ids[key]
        v = viewer.get(vid, {})
        folder = re.sub(r"^\.\./product/", "cups/plastic/", os.path.dirname(os.path.dirname(cup["blend"])))
        out.append({
            "id": vid, "aliases": [key], "label": f"{vid} · пластик PP",
            "type": "pp", "group": "plastic", "adapter": "plastic",
            "volume_ml": v.get("volumeMl"), "brim_ml": int(key),
            "size_mm": _size(v),
            "blend": f"{folder}/out/{os.path.basename(cup['blend'])}",
            "object": cup["object"],
            "verify": f"{folder}/out/verify.json",
            "params": f"{folder}/params/{os.path.basename(cup['params'])}",
            "print": {"mode": "pp", "field_mm": cup["field_mm"], "band": cup["band"]},
        })
    return out


def _size(v):
    s = v.get("size") or {}
    return {"height": s.get("heightMm"), "top": s.get("topMm"), "bottom": s.get("bottomMm")} if s else None


def paper(viewer):
    pdir = "cups/paper/cup_mockup/params"
    names = sorted(f[:-5] for f in os.listdir(os.path.join(PROJECT, pdir)) if f.endswith(".json"))
    base = [n for n in names if not n.endswith("-NM")]
    out = []
    for n in base:
        p = _load(f"{pdir}/{n}.json")
        blend = f"cups/paper/{n}/{n}.blend"
        if not _exists(blend):
            print(f"пропуск {n}: нет {blend}", file=sys.stderr)
            continue
        group = {"HB": "single", "DW": "double", "EM": "embossed"}[n[:2]]
        v = viewer.get(n) or viewer.get("DW" + n[2:]) or {}
        page = (p.get("template") or {}).get("page_mm", [297.0, 210.0])
        entry = {
            "id": n, "aliases": [], "label": p.get("label", n),
            "type": "paper", "group": group, "adapter": "paper",
            "volume_ml": v.get("volumeMl"), "brim_ml": int(n.split("-")[1]),
            "size_mm": _size(v),
            "blend": blend, "root": "CUPS_Product",
            "hero_rotation_deg": p.get("hero_rotation_deg", 0.0),
            "print": {"mode": "sheet", "page_mm": page},
            # картоны — как у просмотрщика, чтобы панель и рендер предлагали одно и то же
            "boards": v.get("materialCompatibility") or ["coated", "uncoated", "soft-touch", "kraft"],
            "board_default": v.get("defaultMaterial") or "uncoated",
        }
        nm = f"cups/paper/{n}-NM/{n}-NM.blend"
        if group == "embossed" and _exists(nm):
            entry["variants"] = {
                "mesh": {"label": "вафля в сетке", "blend": blend},
                "nm": {"label": "вафля картой нормалей", "blend": nm},
            }
            entry["variant_default"] = "mesh"
        out.append(entry)
    return out


def pet():
    prof = _load("cups/pet/profiles.json")
    out = []
    for cid, c in prof["cups"].items():
        outer = c["outer"]
        out.append({
            "id": cid, "aliases": [], "label": f"{cid} · PET прозрачный",
            "type": "pet", "group": "pet", "adapter": "own",
            "volume_ml": c["nominal_ml"], "brim_ml": c["brim_ml"],
            "size_mm": {"height": c["height_mm"], "top": 95.0, "bottom": round(2 * outer[0][0], 1)},
            "blend": f"cups/pet/{cid}/{cid}.blend", "object": cid,
            "verify": f"cups/pet/{cid}/verify.json",
            "print": {"mode": "sides", "sides": ["A", "B"], "width_mm": prof["print"]["width_mm"],
                      "z_mm": c["print_z_mm"]},
        })
    return out


def main():
    shots = _load("engine/params/shots.json")
    viewer = viewer_models()
    if "cups" in shots:
        pp = plastic(shots, viewer)
    else:
        # реестр PP уже переехал в каталог — берём его оттуда как есть
        pp = [c for c in _load("catalog/cups.json")["cups"] if c.get("type") == "pp"]
    cups = pp + paper(viewer) + pet()
    catalog = {
        "schemaVersion": 1,
        "_about": [
            "Единый каталог стаканов 3DCupRender. Собирается engine/tools/make_catalog.py — руками не править.",
            "adapter — кто одевает стакан в сцене: plastic (общий PP из shots.json и печать по полю),",
            "paper (материалы и лист развёртки из файла модели), own (свой материал и печать из файла, PET).",
            "reference — стакан, по которому считается масштаб сцены: все остальные ставятся 1:1 к нему.",
        ],
        "reference": "BM90-500",
        "cups": cups,
    }
    os.makedirs(os.path.join(PROJECT, "catalog"), exist_ok=True)
    path = os.path.join(PROJECT, "catalog", "cups.json")
    with open(path, "w", encoding="utf-8") as fh:
        fh.write(json.dumps(catalog, ensure_ascii=False, indent=2) + "\n")
    counts = {}
    for c in cups:
        counts[c["group"]] = counts.get(c["group"], 0) + 1
    print(path, len(cups), counts)


if __name__ == "__main__":
    main()
