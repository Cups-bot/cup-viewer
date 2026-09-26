"""Where do two meshes of a model intersect?  blender -b -P ... -- MODEL"""
import math
import sys
from pathlib import Path

import bpy
import numpy as np
from mathutils.bvhtree import BVHTree

sys.path.insert(0, str(Path(__file__).resolve().parent))
import review  # noqa: E402

model = sys.argv[sys.argv.index('--') + 1]
root = review.fresh(model, art=False)
meshes = [o for o in root.children if o.type == 'MESH']
trees, data = {}, {}
for o in meshes:
    verts = [o.matrix_world @ v.co for v in o.data.vertices]
    trees[o.name] = BVHTree.FromPolygons(verts, [tuple(p.vertices) for p in o.data.polygons], all_triangles=False, epsilon=0.0)
    data[o.name] = (o, np.array([tuple(v) for v in verts]))
for i, a in enumerate(meshes):
    for b in meshes[i + 1:]:
        hits = trees[a.name].overlap(trees[b.name])
        if not hits:
            continue
        for name, idx in ((a.name, [h[0] for h in hits]), (b.name, [h[1] for h in hits])):
            obj, V = data[name]
            pts = np.array([V[list(obj.data.polygons[i].vertices)].mean(0) for i in set(idx)])
            z = pts[:, 2] * 1000
            psi = np.degrees(np.arctan2(pts[:, 1], pts[:, 0])) % 360
            print(f'{a.name} x {b.name}: {len(hits)} pairs | {name}: z {z.min():.2f}..{z.max():.2f} mm, azimuth {psi.min():.0f}..{psi.max():.0f}°, r {np.hypot(pts[:,0],pts[:,1]).min()*1000:.2f}..{np.hypot(pts[:,0],pts[:,1]).max()*1000:.2f}', flush=True)
