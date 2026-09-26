"""Build-only regression for authored scenes, no product/library writes."""
import copy
import hashlib
import json
import sys
from pathlib import Path
import bpy
from mathutils import Vector
from bpy_extras.object_utils import world_to_camera_view

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
sys.path.insert(0, str(ROOT/'tools'))
from bk import authored, place
from validate_material import mesh_signature

cfg = place.load_config(str(ROOT/'params/shots.json'))
results = []
for key in ('410', '500', '650'):
    current = copy.deepcopy(cfg)
    current['cup_key'] = key
    bpy.ops.wm.read_factory_settings(use_empty=True)
    original = mesh_signature(place.import_cup(current, bpy.context.scene.collection).data)
    for name in ('window', 'cream', 'ice'):
        for mode in ('none', 'rect', 'cone'):
            current['print']['enabled'] = mode != 'none'
            if mode != 'none': current['print']['mode'] = mode
            info = authored.build(current, name, 1, 64)
            cup = bpy.data.objects['BK_Cup']
            assert mesh_signature(cup.data) == original, (name, key, mode, 'mesh/UV changed')
            assert tuple(cup.scale) == (1, 1, 1)
            corners = [cup.matrix_world @ Vector(v) for v in cup.bound_box]
            assert abs(min(v.z for v in corners)) < 1e-6
            for v in corners:
                p = world_to_camera_view(bpy.context.scene, bpy.context.scene.camera, v)
                assert .02 < p.x < .98 and .02 < p.y < .98 and p.z > 0, (name,key,'crop',tuple(p))
            if mode != 'none':
                assert info['print']['uv_layer'] == ('UVPrint' if mode == 'rect' else 'UVMap')
            assert all(im.packed_file for im in bpy.data.images if im.source == 'FILE' and im.users)
            assert not info['warnings'], info['warnings']
            results.append(dict(scene=name, cup=key, print=mode, mesh_uv_unchanged=True, grounded=True, inside_camera=True))

# Check supported placement and rotation without deforming the product.
current = copy.deepcopy(cfg)
current['shots']['cream']['cup_position_h'] = [.1, -.1, 0]
current['shots']['cream']['cup_rotation_deg'] = [0, 0, 27]
authored.build(current, 'cream', 1, 64)
cup = bpy.data.objects['BK_Cup']
assert abs(cup.rotation_euler.z - .4712389) < 1e-5
assert abs(min((cup.matrix_world @ Vector(v)).z for v in cup.bound_box)) < 1e-6

workspace = ROOT.parent
snapshot = json.loads((workspace/'_архив/before_scenes_071214_20260907/protected_snapshot.json').read_text(encoding='utf-8-sig'))
snapshot.pop('mockup\\sets\\README.md', None)  # Scene documentation intentionally updated.
changed = [p for p, sha in snapshot.items() if hashlib.sha256((workspace/p).read_bytes()).hexdigest() != sha]
assert not changed, changed
out = ROOT/'out/scene_review/validation.json'
out.write_text(json.dumps(dict(passed=True, builds=results, placement_rotation=True, protected_files=len(snapshot), changed_files=changed, rendered=False), ensure_ascii=False, indent=2), encoding='utf-8')
print('AUTHORED VALIDATION PASSED:',len(results),'builds;',len(snapshot),'protected files unchanged',flush=True)
