"""Склейка фокуса: стакан резкий целиком, фон размыт — как у предметника.

Одной диафрагмой этого не снять: у авторских камер сцен (f/2.8–3.5, 120 мм,
метр) резко 1–2 см — стакан плывёт по краям; закрыть до f/13 — резким станет
и фон. Предметный фотограф снимает стакан несколькими кадрами с разным фокусом
и склеивает. Здесь два прохода Cycles (compose._stack_plan даёт план):

A. Фон — авторская диафрагма, стакан невидим для камеры, но отбрасывает тени и
   отражается: контактная тень и рефлексы на месте. Это тот же фон, что в
   снимке превью (tools/export_preview.py), — превью и кадр совпадают.
B. Стакан — диафрагма «весь стакан резкий», фокус посреди глубины, всё прочее
   невидимо для камеры (светит, отражается, затеняет), фон прозрачный, считается
   только рамка вокруг стаканов.

Склейка — B поверх A по прозрачности B (bk/finish.apply_file). Если у сцены
есть фон-снимок (bk/plate.py), фон A снимается прозрачным и снимок ложится под
него — без второго размытия объективом. Только для
непрозрачных стаканов: сквозь PET и PP во втором проходе фон вышел бы резким,
а в жизни он размыт объективом. Им — одна съёмка с диафрагмой посередине по
ступеням между авторской и «весь стакан резкий».
"""

import math
import os
from typing import Optional

import bpy

from bk import plate as backplate


# Фон в склейке размыт объективом: шум в нём сходится раньше, чем на резком
# стакане, — ему хватает этой доли сэмплов (замер 2026-09-27, «Гостиная»).
BACKGROUND_SAMPLES = 0.6


def _render(scene, path: str, rgba: bool) -> str:
    settings = scene.render.image_settings
    settings.file_format = "PNG"
    settings.color_mode = "RGBA" if rgba else "RGB"
    scene.render.filepath = path
    bpy.ops.render.render(write_still=True, scene=scene.name)
    return path


def _background(scene, path: str) -> str:
    """Кадр фона: с фоном-снимком сцены — прозрачный проход и снимок под ним."""
    if backplate.config(scene):
        return backplate.shoot(scene, path, _render)
    return _render(scene, path, False)


def render(scene_name: str, out_dir: str, stem: str, plan: Optional[dict]) -> dict:
    """Кадр со склейкой фокуса. {"image": путь, "over": путь слоя стакана | None,
    "mode": stack | middle | single}."""
    scene = bpy.data.scenes[scene_name]
    os.makedirs(out_dir, exist_ok=True)
    path = os.path.join(out_dir, f"{stem}.png")
    d = scene.camera.data
    if not plan:
        return {"image": _background(scene, path), "over": None, "mode": "single"}
    if not plan["opaque"]:
        d.dof.aperture_fstop = math.sqrt(plan["fstop_scene"] * plan["fstop_product"])
        d.dof.focus_object = None
        d.dof.focus_distance = plan["focus_product"]
        return {"image": _background(scene, path), "over": None, "mode": "middle"}

    cups = {n for n in plan["cups"] if n in scene.objects}
    seen = {ob.name: ob.visible_camera for ob in scene.objects}
    r = scene.render
    was = (r.film_transparent, r.use_border, r.use_crop_to_border, d.dof.aperture_fstop,
           d.dof.focus_object, d.dof.focus_distance,
           (r.border_min_x, r.border_min_y, r.border_max_x, r.border_max_y))
    samples = scene.cycles.samples
    try:
        # A: фон со всеми тенями и отражениями стакана, но без него самого.
        for name in cups:
            scene.objects[name].visible_camera = False
        scene.cycles.samples = max(16, round(samples * BACKGROUND_SAMPLES))
        _background(scene, path)
        scene.cycles.samples = samples
        # B: только стаканы, резкие целиком; фон прозрачный.
        for ob in scene.objects:
            ob.visible_camera = ob.name in cups and seen[ob.name]
        r.film_transparent = True
        d.dof.aperture_fstop = plan["fstop_product"]
        d.dof.focus_object = None
        d.dof.focus_distance = plan["focus_product"]
        # Вырез для проверки (run.py --crop) — тот же у обоих проходов; иначе
        # второй считает только рамку стаканов, в полный кадр.
        if not r.use_border:
            r.use_border, r.use_crop_to_border = True, False
            r.border_min_x, r.border_min_y, r.border_max_x, r.border_max_y = plan["border"]
        over = _render(scene, os.path.join(out_dir, f"{stem}__cup.png"), True)
    finally:
        scene.cycles.samples = samples
        for name, vis in seen.items():
            if name in scene.objects:
                scene.objects[name].visible_camera = vis
        (r.film_transparent, r.use_border, r.use_crop_to_border, d.dof.aperture_fstop,
         d.dof.focus_object, d.dof.focus_distance, border) = was
        r.border_min_x, r.border_min_y, r.border_max_x, r.border_max_y = border
    return {"image": path, "over": over, "mode": "stack"}
