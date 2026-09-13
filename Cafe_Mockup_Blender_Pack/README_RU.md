# Cafe Mockup Pack — Blender

Пакет собран под гибридную сцену: **стакан + стол + ближайшие предметы в 3D, интерьер кофейни — 2D backplate, HDRI — только для света и отражений**.

## Файлы

- `Cafe_Mockup_Blender_Guide_RU.docx` — полный production-гайд.
- `cafe_backplate_4x5_2244x2804.png` — высокий backplate без текста и без стакана.
- `blender_cafe_scene_setup.py` — скрипт, который строит camera/light rig и compositor.
- `assets_manifest.csv` — источники ассетов и лицензии.
- `scene_layout_top.png` — схема размещения.

## Быстрый старт

1. Открой `.blend` со своей 3D-моделью стакана.
2. Выдели основной Mesh стакана.
3. Сохрани `.blend` в отдельную папку проекта.
4. Положи рядом с `.blend` файл `cafe_backplate_4x5_2244x2804.png`.
5. По желанию скачай `Comfy Café` HDRI с Poly Haven и положи `.exr`/`.hdr` рядом с `.blend`, оставив в имени `comfy_cafe`.
6. В Blender: `Scripting` → открой `blender_cafe_scene_setup.py` → `Run Script`.
7. Перетащи скачанные ассеты к Empty-маркерам `DROP_*`.
8. Замени fallback-материал стола на `Wood Table 001` PBR и подними Roughness примерно до 0.58–0.70.
9. Сделай тест 512×384, потом финал 2048×1536 или 4096×3072.

Скрипт масштабирует сцену относительно фактической высоты выбранного стакана. Поэтому для более высокого стакана достаточно выделить новую модель и запустить скрипт заново.
