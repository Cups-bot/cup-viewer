"""Стороны печати PET для сайта — те же, что у сборки (этап В).

PET печатается с одной или двух сторон, А и Б (cups/pet/build_pet.py,
compose_print): поле шириной width_mm по дуге на своём радиусе, по высоте
print_z_mm, центр стороны — азимут от +X (А смотрит в камеру). Сайт сводит
стороны в развёртку сам (js/design/petSides.js) по этим числам и профилю
стенки; модель сайта несёт ту же развёртку UVMap (tools/export_site_cups.py),
поэтому сведённый лист ложится так же, как у рендера, и уходит в задание.

Пишет catalog/cups.json → web.textureMapping.sides и unwrapMm = поле одной
стороны. Blender не нужен:

    python render/engine/tools/site_pet_sides.py
"""

import io
import json
import os

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))
CATALOG = os.path.join(REPO, "catalog", "cups.json")
PROFILES = os.path.join(REPO, "render", "cups", "pet", "profiles.json")


def sides_for(prof: dict, cup: dict) -> dict:
    z0, z1 = cup["print_z_mm"]
    return {
        "widthMm": prof["print"]["width_mm"],
        "zMm": [z0, z1],
        "heightMm": cup["height_mm"],
        "deg": dict(prof["print"]["sides_deg"]),
        # профиль наружной стенки: [радиус, высота] мм, как в compose_print
        "profileMm": [list(p) for p in cup["outer"]],
    }


def main() -> int:
    with io.open(PROFILES, "r", encoding="utf-8") as fh:
        prof = json.load(fh)
    with io.open(CATALOG, "r", encoding="utf-8") as fh:
        catalog = json.load(fh)
    n = 0
    for cup in catalog["cups"]:
        if (cup.get("render") or {}).get("adapter") != "own" or not cup.get("web"):
            continue
        pet = prof["cups"][cup["id"]]
        tm = cup["web"]["textureMapping"]
        tm["sides"] = sides_for(prof, pet)
        z0, z1 = pet["print_z_mm"]
        tm["unwrapMm"] = [float(prof["print"]["width_mm"]), round(float(z1 - z0), 1)]
        n += 1
        print(f"{cup['id']}: поле стороны {tm['unwrapMm']} мм, стороны {tm['sides']['deg']}")
    with io.open(CATALOG, "w", encoding="utf-8", newline="\n") as fh:
        fh.write(json.dumps(catalog, ensure_ascii=False, indent=2) + "\n")
    print(f"каталог: {n} PET")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
