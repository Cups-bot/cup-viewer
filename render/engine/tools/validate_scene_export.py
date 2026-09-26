"""Round-trip authored product export in a separate test directory."""
import json
import sys
from pathlib import Path
import bpy

ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT));sys.path.insert(0,str(ROOT/'tools'))
import run
from validate_material import mesh_signature

folder=ROOT/'out/scene_review/export_check';folder.mkdir(exist_ok=True)
bpy.ops.wm.open_mainfile(filepath=str(ROOT/'out/scene_review/print_check/cream_650ml_rect.blend'))
cup=bpy.data.objects['BK_Cup'];before=mesh_signature(cup.data)
assert all(im.packed_file for im in bpy.data.images if im.source=='FILE' and im.users)
run.LIBRARY=str(folder)
path=run.write_asset({},'650')
bpy.ops.wm.read_factory_settings(use_empty=True)
with bpy.data.libraries.load(path,link=False) as (source,target):
    assert source.collections==['CUP_650'],source.collections
    target.collections=source.collections
bpy.context.scene.collection.children.link(target.collections[0])
cup=bpy.data.objects['BK_Cup']
assert mesh_signature(cup.data)==before
assert not any(o.type in {'LIGHT','CAMERA'} or o.name.startswith('ENV_') for o in bpy.data.objects)
assert all(im.packed_file for im in bpy.data.images if im.source=='FILE' and im.users)
(folder/'validation.json').write_text(json.dumps(dict(passed=True, product_only=True, geometry_uv_unchanged=True, packed_print=True, library_destination=path),indent=2),encoding='utf-8')
print('SCENE EXPORT ROUND-TRIP PASSED:',path,flush=True)
