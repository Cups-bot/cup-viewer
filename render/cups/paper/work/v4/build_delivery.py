"""Build the delivery of one model into output/production/<MODEL>.

blender -b --factory-startup -P work/v4/build_delivery.py -- MODEL [--renders]

Scene: v4 cup + Taste Quality artwork + grey photo box (plastic 'studio'
settings: 512 samples, 1600 px, AgX), catalogue view with the logo to the
lens.  Then the GLB for cup-viewer and, with --renders, the review images.
"""
import shutil
import sys
from pathlib import Path

import bpy

sys.path.insert(0, str(Path(__file__).resolve().parent))
import review  # noqa: E402

argv = sys.argv[sys.argv.index('--') + 1:]
model = argv[0]
renders = '--renders' in argv
OUT = review.ROOT / 'output/production' / model
OUT.mkdir(parents=True, exist_ok=True)

review.fresh(model)
scene = bpy.context.scene
from cup_mockup import gltf_export, studio  # noqa: E402

scene.cups.inspection_view = 'CUPS_Hero'
studio.render_settings(scene)
scene.render.filepath = '//renders/hero.png'
blend = OUT / f'{model}.blend'
bpy.ops.wm.save_as_mainfile(filepath=str(blend), compress=True)
for old in OUT.glob('*.blend1'):
    old.unlink()
print('SAVED', blend, flush=True)
print('GLB', gltf_export.export(scene, OUT / f'{model}.glb'), flush=True)
tex = OUT / 'textures'
if tex.exists():
    shutil.rmtree(tex)
tex.mkdir()
art = review.artwork(model)
if art is not None:
    shutil.copy2(art, tex / art.name)

if renders:
    review.OUT = OUT / 'renders'
    review.OUT.mkdir(exist_ok=True)
    plan = [('CUPS_Hero', 1600, 256), ('CUPS_Print', 1200, 128), ('CUPS_Seam_macro', 1200, 128),
            ('CUPS_Rim_macro', 1200, 128), ('CUPS_Bottom_macro', 1200, 128), ('CUPS_Underside', 1200, 128),
            ('CUPS_Interior', 1200, 128)]
    if model.startswith('DW'):
        plan.append(('CUPS_Sleeve_macro', 1200, 128))
    for view, res, samples in plan:
        for p in review.shots([view], '', res, samples):
            print('RENDERED', p, flush=True)
