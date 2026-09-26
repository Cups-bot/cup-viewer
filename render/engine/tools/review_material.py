"""Render one existing studio view with optional PP overrides, without changing defaults.

blender -b --factory-startup -P mockup/tools/review_material.py -- --label trial --pp '{...}'
Outputs are isolated under mockup/out/material_review; no batch rendering.
"""
import argparse
import json
import sys
from pathlib import Path

import bpy

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
from bk import greybox, place


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--label', required=True)
    ap.add_argument('--pp', default='{}')
    ap.add_argument('--params', default=str(ROOT / 'params/shots.json'))
    ap.add_argument('--samples', type=int, default=96)
    ap.add_argument('--resolution', type=int, default=900)
    ap.add_argument('--max-bounces', type=int)
    ap.add_argument('--save', action='store_true')
    ap.add_argument('--probe', action='store_true', help='temporary color target behind the cup')
    ap.add_argument('--gray', type=float, help='review-only backdrop reflectance')
    args = ap.parse_args(sys.argv[sys.argv.index('--') + 1:])
    if Path(args.label).name != args.label or args.label in ('.', '..'):
        ap.error('label must be a directory name')
    cfg = place.load_config(args.params)
    cfg['cup_key'] = '650'
    cfg['print']['enabled'] = False
    cfg['pp'].update(json.loads(args.pp))
    if args.gray is not None:
        cfg['shots']['studio']['gray_linear'] = args.gray
    info = greybox.build(cfg, 'studio', args.samples, args.resolution)
    scene = bpy.context.scene
    if args.probe:
        # A measured target outside the rear wall: its silhouette must blur
        # through two PP walls, while the portion beside the cup stays sharp.
        for i, color in enumerate(((0.015, 0.04, 0.22, 1), (0.65, 0.025, 0.012, 1))):
            bpy.ops.mesh.primitive_cube_add(size=1, location=(0.023, 0.06, 0.071 + i * 0.03))
            ob = bpy.context.object
            ob.name = 'REVIEW_Transmission_Target_' + str(i)
            ob.dimensions = (0.095, 0.001, 0.018)
            mat = bpy.data.materials.new(ob.name)
            mat.use_nodes = True
            bsdf = mat.node_tree.nodes.get('Principled BSDF')
            bsdf.inputs['Base Color'].default_value = color
            bsdf.inputs['Roughness'].default_value = 0.8
            ob.data.materials.append(mat)
    if args.max_bounces is not None:
        scene.cycles.max_bounces = args.max_bounces
    out = ROOT / 'out/material_review' / args.label
    out.mkdir(parents=True, exist_ok=True)
    info['pp'] = cfg['pp']
    info['max_bounces'] = scene.cycles.max_bounces
    info['probe'] = args.probe
    info['stage'] = cfg['shots']['studio']
    info['files'] = {}
    if args.save:
        info['files']['blend'] = place.save(str(out), 'studio_650ml_clean')
    info['files']['image'] = place.render(scene.name, str(out), 'studio_650ml_clean')
    (out / 'studio_650ml_clean.json').write_text(json.dumps(info, ensure_ascii=False, indent=2), encoding='utf-8')
    print('REVIEW:', out, flush=True)


if __name__ == '__main__':
    main()
