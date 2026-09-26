"""Review helpers used from a running Blender (MCP) or blender -b.

    import sys; sys.path.insert(0, r'D:/Cups_Soft/3D_Cups/work/v4'); import review
    review.fresh('HB80-280'); review.shots(['CUPS_Hero', 'CUPS_Seam_macro'], 'hb_')
"""
import importlib
import json
import math
import sys
from pathlib import Path

import bpy

ROOT = Path(__file__).resolve().parents[2]


def artwork(model):
    """Sheet to lay on the cup: the client's design if there is one, else the
    Formacia template itself (blank board with the footer line)."""
    f = ROOT / 'cup_mockup/params' / f'{model}.json'
    src = json.loads(f.read_text(encoding='utf-8')).get('sources') or {}
    if src.get('artwork'):
        return ROOT / src['artwork']
    if src.get('emboss') or src.get('emboss_svg'):
        return None          # EM: the template draws only contours, the cup is plain
    return ROOT / src['template']
OUT = Path(r'C:/Users/79815/AppData/Local/Temp/claude/D--Cups-Soft-3D-Cups/61d568bb-7045-40a1-9eb8-6e5eda102395/scratchpad')


def reload_addon():
    if str(ROOT) not in sys.path:
        sys.path.insert(0, str(ROOT))
    if hasattr(bpy.types.Scene, 'cups'):
        try:
            sys.modules['cup_mockup'].unregister()
        except Exception as exc:
            print('unregister:', exc)
    for name in [k for k in list(sys.modules) if k.startswith('cup_mockup')]:
        del sys.modules[name]
    import cup_mockup
    cup_mockup.register()
    return cup_mockup


def fresh(model, art=True, empty=True):
    # Always start from an empty scene: with --factory-startup the default
    # Cube / Camera / Light would otherwise end up around the studio.
    bpy.ops.wm.read_homefile(use_empty=True)
    reload_addon()
    from cup_mockup import engine
    scene = bpy.context.scene
    scene.cups.model = model
    root = engine.build_cup(scene)
    sheet = artwork(model) if art else None
    if sheet is not None:
        engine.import_art(scene, str(sheet))
    engine.setup_studio(scene)
    return root


def shots(views, prefix, res=900, samples=64, rotation=None):
    scene = bpy.context.scene
    paths = []
    for view in views:
        if view not in bpy.data.objects:
            continue
        scene.cups.inspection_view = view
        if rotation is not None and view in {'CUPS_Hero', 'CUPS_Print'}:
            scene.cups.rotation = math.radians(rotation)
        scene.cycles.samples = samples
        scene.render.resolution_x = scene.render.resolution_y = res
        path = OUT / f'{prefix}{view.replace("CUPS_", "").lower()}.png'
        scene.render.filepath = str(path)
        bpy.ops.render.render(write_still=True)
        paths.append(str(path))
    scene.cups.inspection_view = 'CUPS_Hero'
    return paths
