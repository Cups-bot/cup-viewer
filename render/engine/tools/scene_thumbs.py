"""Миниатюры сцен для панели «Фотореал»: catalog/scenes/<сцена>/thumb.webp.

Берётся снимок первого ракурса («как в сцене») и из него вырезается кадр фона
(baseWindow внутри backdropWindow — снимок снят с запасом), 240×240. Карточке
сцены полный снимок (до 2400 px) не нужен.

    python render/engine/tools/scene_thumbs.py            # все сцены каталога
    python render/engine/tools/scene_thumbs.py living     # только эти

Обычный Python с Pillow, без Blender. Переснять после export_preview.py.
"""

import json
import os
import sys

from PIL import Image

REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
SCENES = os.path.join(REPO, "catalog", "scenes")
SIZE = 240


def thumb(scene_id: str) -> str:
    folder = os.path.join(SCENES, scene_id)
    with open(os.path.join(folder, "scene.json"), encoding="utf-8") as fh:
        data = json.load(fh)
    preset = data["presets"][0]
    base, area = preset["baseWindow"], preset["backdropWindow"]
    img = Image.open(os.path.join(folder, preset["backdrop"])).convert("RGB")
    w, h = img.size
    aw, ah = area[1] - area[0], area[3] - area[2]
    # окно в тангенсах → пиксели снимка (y снимка — сверху вниз)
    box = (
        round((base[0] - area[0]) / aw * w),
        round((area[3] - base[3]) / ah * h),
        round((base[1] - area[0]) / aw * w),
        round((area[3] - base[2]) / ah * h),
    )
    out = os.path.join(folder, "thumb.webp")
    img.crop(box).resize((SIZE, SIZE), Image.LANCZOS).save(out, "WEBP", quality=82)
    return out


def main() -> int:
    with open(os.path.join(SCENES, "index.json"), encoding="utf-8") as fh:
        ids = [s["id"] for s in json.load(fh)["scenes"]]
    wanted = sys.argv[1:] or ids
    for scene_id in wanted:
        path = thumb(scene_id)
        print(f"{scene_id}: {os.path.relpath(path, REPO)} ({os.path.getsize(path) // 1024} КБ)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
