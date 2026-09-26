"""Close-ups of the DW sleeve edges with the template guide lines printed on it.

blender -b --factory-startup -P work/v4/guides_check.py -- MODEL OUTDIR
The Formacia PDF is rasterised WITH its Masks layer (red print area, blue
visible area, green die-cut), so the lines show where the cut edges fall.
"""
import sys
from pathlib import Path

import bpy
from mathutils import Vector

sys.path.insert(0, str(Path(__file__).resolve().parent))
import review  # noqa: E402

argv = sys.argv[sys.argv.index('--') + 1:]
model, outdir = argv[0], Path(argv[1])
outdir.mkdir(parents=True, exist_ok=True)
review.fresh(model, art=False)
from cup_mockup import engine  # noqa: E402

scene = bpy.context.scene
s = scene.cups
s.hide_guides = False
s.dpi = 300
art = argv[2] if len(argv) > 2 else str(review.ROOT / f'Mockups/_{model}-0000.pdf')
engine.import_art(scene, art)
tag = Path(art).stem[:12]
s.inspection_view = 'CUPS_Hero'
s.rotation = 0.0
root = engine.product()
root.rotation_euler.z = 0.0
scene.cycles.samples = 96
scene.render.resolution_x, scene.render.resolution_y = 1400, 700
views = {'top_edge': ((0, -.20, .100), (0, -.036, .080)), 'bottom_edge': ((0, -.20, .030), (0, -.032, .013)),
         'under_rim': ((0, -.110, .055), (0, -.036, .0845))}
cam_data = bpy.data.cameras.new('GuideCam')
cam_data.lens = 90
cam_data.clip_start = 0.001
cam = bpy.data.objects.new('GuideCam', cam_data)
scene.collection.objects.link(cam)
scene.camera = cam
for name, (loc, target) in views.items():
    cam.location = loc
    cam.rotation_euler = (Vector(target) - Vector(loc)).to_track_quat('-Z', 'Y').to_euler()
    scene.render.filepath = str(outdir / f'{model}_{tag}_{name}.png')
    bpy.ops.render.render(write_still=True)
    print('RENDERED', scene.render.filepath, flush=True)
