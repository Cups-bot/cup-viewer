"""Exercise the addon operators on a saved and reopened v4 scene.

blender -b --factory-startup -P work/v4/test_workflow.py -- MODEL OUT_JSON
"""
import json
import math
import sys
import tempfile
import time
from pathlib import Path

import bpy
import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))
import review  # noqa: E402

argv = sys.argv[sys.argv.index('--') + 1:]
model, out_json = argv[0], Path(argv[1])
ROOT = review.ROOT
passed = []

review.fresh(model)
from cup_mockup import paper as _paper                   # variants (EMxx-xxx-NM) inherit the template
TPL = ROOT / _paper.load_params(model)['sources']['template']
if materials_art_missing := (review.artwork(model) is None):
    from cup_mockup import engine as _e                  # EM brings no artwork of its own
    _e.import_art(bpy.context.scene, str(TPL))
tmp = Path(tempfile.gettempdir()) / f'cups_v4_test_{model}.blend'
bpy.ops.wm.save_as_mainfile(filepath=str(tmp), compress=True)
bpy.ops.wm.open_mainfile(filepath=str(tmp))
cm = review.reload_addon()
from cup_mockup import engine, materials, paper  # noqa: E402

scene = bpy.context.scene
s = scene.cups
root = bpy.data.objects['CUPS_Product']
assert root['geometry_version'] == '4.0' and root['model'] == model
art = bpy.data.images[materials.ART_IMAGE]
assert art.packed_file
names = {o.name for o in root.children}
outer = {'DW': 'Cup_Sleeve', 'EM': 'Cup_Wrap'}.get(model[:2])
assert names == ({'Cup_Wall', 'Cup_Bottom', outer} if outer else {'Cup_Wall', 'Cup_Bottom'})
mats = {m.name for o in root.children for m in o.data.materials}
assert mats == {'Paper_Print', 'Paper_Inner', 'Paper_Edge'}
passed.append('saved scene reopens with v4 geometry, packed artwork and the three viewer materials')

p = paper.load_params(model)
for view in ['CUPS_Seam_macro', 'CUPS_Underside', 'CUPS_Interior', 'CUPS_Hero']:
    s.inspection_view = view
    assert scene.camera.name == view
    under = view in {'CUPS_Underside', 'CUPS_Bottom_macro'}
    assert bpy.data.objects['CUPS_Background'].hide_render == under
    assert bpy.data.objects['CUPS_UnderLight'].hide_render != under
    if view == 'CUPS_Seam_macro':
        assert abs(root.rotation_euler.z) < 1e-9
    if view == 'CUPS_Hero':
        assert abs(root.rotation_euler.z - math.radians(p['hero_rotation_deg'])) < 1e-6
passed.append('views switch camera, floor and underside light; seam views turn the seam, catalogue view turns the logo to the lens')

node = bpy.data.materials['Paper_Print'].node_tree.nodes[materials.ART_NODE]
s.show_artwork = False
assert node.image.name == materials.BLANK_IMAGE
s.show_artwork = True
assert node.image == art
passed.append('artwork visibility swaps the image only')

obj = next(o for o in root.children if o.get('cups_print'))


def uv0():
    uv = np.empty(len(obj.data.loops) * 2, np.float32)
    obj.data.uv_layers[0].data.foreach_get('uv', uv)
    return uv.reshape(-1, 2)


pw, ph = paper.page_of(p)
before = uv0()
t0 = time.perf_counter()
s.offset_x = 1.0
elapsed = time.perf_counter() - t0
after = uv0()
assert np.allclose(after[:, 0] - before[:, 0], 1 / pw, atol=2e-6) and np.allclose(after[:, 1], before[:, 1], atol=1e-6)
s.offset_x = 0.0
s.offset_y = 1.0
after = uv0()
assert np.allclose(before[:, 1] - after[:, 1], 1 / ph, atol=2e-6)
s.offset_y = 0.0
assert np.allclose(uv0(), before, atol=1e-6)
passed.append('1 mm sheet offsets move the sampling window by exactly 1 mm (X and Y) and reset cleanly')
s.mapping = 'RECT'
r = uv0()
assert r.min() >= -1e-6 and r.max() <= 1 + 1e-6
s.mapping = 'A4'
passed.append('rectangle mode keeps the wall inside the picture')

for bad in ['work/missing_art.jpg', 'images/DW80-280/mdklinik.jpg']:
    try:
        engine.import_art(scene, str(ROOT / bad))
    except ValueError:
        pass
    else:
        raise AssertionError('accepted ' + bad)
    assert bpy.data.images[materials.ART_IMAGE] == art
passed.append('missing file and non-A4 picture are refused, current artwork kept')

pdf = ROOT / 'work/inspection/import_test_2pages.pdf'
a4 = paper.page_of(p) == paper.A4_MM
if pdf.exists() and Path(s.python_path).is_file() and not a4:
    keep = bpy.data.images[materials.ART_IMAGE]          # EM90-530: its template is 297 x 235
    s.page, s.dpi = 2, 150
    try:
        engine.import_art(scene, str(pdf))
    except ValueError:
        pass
    else:
        raise AssertionError('an A4 sheet accepted on a non-A4 template')
    assert bpy.data.images[materials.ART_IMAGE] == keep
    s.page, s.dpi = 1, 150
    assert bpy.ops.cups.import_art(filepath=str(TPL)) == {'FINISHED'}
    passed.append('PDF: an A4 sheet is refused on this template page, the template PDF itself accepted')
elif pdf.exists() and Path(s.python_path).is_file():
    s.page, s.dpi = 2, 150
    assert bpy.ops.cups.import_art(filepath=str(pdf)) == {'FINISHED'}
    assert bpy.data.images[materials.ART_IMAGE].packed_file
    keep = bpy.data.images[materials.ART_IMAGE]
    s.page = 3
    try:
        engine.import_art(scene, str(pdf))
    except ValueError:
        pass
    else:
        raise AssertionError('absent PDF page accepted')
    assert bpy.data.images[materials.ART_IMAGE] == keep
    s.page, s.dpi = 1, 150
    assert bpy.ops.cups.import_art(filepath=str(TPL)) == {'FINISHED'}
    passed.append('PDF: page choice, absent page refused, supplied template PDF accepted')
assert bpy.ops.cups.import_art(filepath=str(review.artwork(model) or TPL)) == {'FINISHED'}
art = bpy.data.images[materials.ART_IMAGE]
passed.append('JPG artwork import through the operator')

keep = bpy.data.objects.new('USER_KeepMe', None)
scene.collection.objects.link(keep)
s.inspection_view = 'CUPS_Underside'
assert bpy.ops.cups.build() == {'FINISHED'}
root = bpy.data.objects['CUPS_Product']
assert bpy.data.objects.get('USER_KeepMe') is keep
assert bpy.data.materials['Paper_Print'].node_tree.nodes[materials.ART_NODE].image == art
zmin = min(v.co.z for o in root.children for v in o.data.vertices)
assert abs(zmin) < 1e-9
passed.append('rebuild keeps foreign objects and the artwork; the cup stands on z = 0')
assert bpy.ops.cups.studio() == {'FINISHED'}
assert scene.camera.name == 'CUPS_Underside'
assert bpy.data.objects['CUPS_Background'].hide_render
passed.append('studio rebuild keeps the selected view')

objs = {o.name: (o.data.name if o.data else None) for o in scene.objects}
slots = {o.name: [m.name for m in o.data.materials] for o in scene.objects if o.type == 'MESH'}
rot = root.rotation_euler.z
glb = Path(tempfile.gettempdir()) / f'cups_v4_test_{model}.glb'
assert bpy.ops.cups.export_glb(filepath=str(glb)) == {'FINISHED'}
assert objs == {o.name: (o.data.name if o.data else None) for o in scene.objects}
assert slots == {o.name: [m.name for m in o.data.materials] for o in scene.objects if o.type == 'MESH'}
assert abs(root.rotation_euler.z - rot) < 1e-9 and glb.stat().st_size > 100000
passed.append('GLB export leaves the scene untouched and restores the panel rotation')

other = 'DW80-280' if model == 'HB80-280' else 'HB80-280'
s.model = other
assert bpy.ops.cups.build() == {'FINISHED'}
assert bpy.data.objects['CUPS_Product']['model'] == other
assert ('Cup_Sleeve' in bpy.data.objects) == other.startswith('DW')
passed.append(f'switching the panel model to {other} rebuilds the right construction')

out_json.parent.mkdir(parents=True, exist_ok=True)
out_json.write_text(json.dumps({'model': model, 'passed': passed, 'uv_update_seconds': round(elapsed, 4)}, indent=2, ensure_ascii=False), encoding='utf-8')
print('WORKFLOW_PASS', len(passed), flush=True)
