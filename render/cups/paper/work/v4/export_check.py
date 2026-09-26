"""Export the GLB through the addon operator, re-import it into an empty scene
and report what cup-viewer will receive.

blender -b --factory-startup -P work/v4/export_check.py -- MODEL OUT.glb
"""
import json
import sys
from pathlib import Path

import bpy

sys.path.insert(0, str(Path(__file__).resolve().parent))
import review  # noqa: E402

argv = sys.argv[sys.argv.index('--') + 1:]
model, out = argv[0], Path(argv[1])
review.fresh(model)
scene = bpy.context.scene
scene.cups.rotation = 1.0                     # export must still be in the canonical pose
assert bpy.ops.cups.export_glb(filepath=str(out)) == {'FINISHED'}
bpy.ops.wm.read_homefile(use_empty=True)
bpy.ops.import_scene.gltf(filepath=str(out))
info = {'file_kb': round(out.stat().st_size / 1024), 'nodes': []}
for o in bpy.context.scene.objects:
    if o.type != 'MESH':
        continue
    me = o.data
    tris = sum(len(p.vertices) - 2 for p in me.polygons)
    info['nodes'].append({'name': o.name, 'materials': [m.name for m in me.materials], 'uv': [u.name for u in me.uv_layers],
                          'vertices': len(me.vertices), 'triangles': tris,
                          'dims_mm': [round(d * 1000, 2) for d in o.dimensions],
                          'rotation': [round(r, 4) for r in o.rotation_euler]})
mat = bpy.data.materials.get('Paper_Print')
if mat:
    bsdf = next(n for n in mat.node_tree.nodes if n.type == 'BSDF_PRINCIPLED')
    link = bsdf.inputs['Base Color'].links
    info['Paper_Print_base_color'] = link[0].from_node.bl_idname if link else 'constant'
    imgs = [n.image.name for n in mat.node_tree.nodes if n.type == 'TEX_IMAGE' and n.image]
    info['Paper_Print_images'] = imgs
print('EXPORT', json.dumps(info, ensure_ascii=False), flush=True)
