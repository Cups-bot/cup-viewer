"""Build-only material regression checks. No renders and no product writes.

blender -b --factory-startup -P mockup/tools/validate_material.py
"""
import array
import copy
import hashlib
import json
import math
import sys
from pathlib import Path

import bpy

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
from bk import greybox, material, place


def mesh_signature(mesh):
    result = {}
    for key, collection, prop, kind, count in (
        ('vertices', mesh.vertices, 'co', 'f', 3),
        ('loops', mesh.loops, 'vertex_index', 'i', 1),
        ('polygons', mesh.polygons, 'loop_total', 'i', 1),
    ):
        data = array.array(kind, [0]) * (len(collection) * count)
        collection.foreach_get(prop, data)
        result[key] = hashlib.sha256(data.tobytes()).hexdigest()
    for uv in mesh.uv_layers:
        data = array.array('f', [0]) * (len(uv.data) * 2)
        uv.data.foreach_get('uv', data)
        result['uv_' + uv.name] = hashlib.sha256(data.tobytes()).hexdigest()
    return result


def main():
    cfg = place.load_config(str(ROOT / 'params/shots.json'))
    results = []
    originals = {}
    for key in ('410', '500', '650'):
        current = copy.deepcopy(cfg)
        current['cup_key'] = key
        bpy.ops.wm.read_factory_settings(use_empty=True)
        originals[key] = mesh_signature(place.import_cup(current, bpy.context.scene.collection).data)
        for mode in ('none', 'rect', 'cone'):
            current['print']['enabled'] = mode != 'none'
            if mode != 'none':
                current['print']['mode'] = mode
            info = greybox.build(current, 'studio', 1, 64)
            cup = bpy.data.objects['BK_Cup']
            assert mesh_signature(cup.data) == originals[key], (key, mode, 'mesh or UV changed')
            mat = cup.data.materials[0]
            nodes = mat.node_tree.nodes
            volume = nodes['PP_Wall_Translucency']
            assert math.isclose(volume.inputs['Density'].default_value, cfg['pp']['wall_scatter_density'], rel_tol=1e-6)
            assert nodes['PP_Mold_Bump'].inputs['Distance'].default_value > 0
            bsdf = next(n for n in nodes if n.type == 'BSDF_PRINCIPLED')
            assert bsdf.inputs['Roughness'].is_linked
            if mode != 'none':
                assert info['print']['uv_layer'] == ('UVPrint' if mode == 'rect' else 'UVMap')
                assert bsdf.inputs['Transmission Weight'].is_linked
                textures = [n for n in nodes if n.type == 'TEX_IMAGE']
                assert textures and all(n.image.packed_file for n in textures)
            results.append({'set': 'studio', 'cup': key, 'print': mode, 'mesh_uv_unchanged': True, 'warnings': info['warnings']})
    # Each borrowed background exercises its own import, placement and scaling.
    for name in ('living', 'water', 'podium', 'spotlight'):
        current = copy.deepcopy(cfg)
        current['cup_key'] = '650'
        info = place.build(current, name, 1, 64)
        cup = bpy.data.objects['BK_Cup']
        assert mesh_signature(cup.data) == originals['650'], name
        nodes = cup.data.materials[0].node_tree.nodes
        scale = info['scale']
        assert math.isclose(nodes['PP_Wall_Translucency'].inputs['Density'].default_value * scale, cfg['pp']['wall_scatter_density'], rel_tol=1e-5)
        assert math.isclose(nodes['PP_Mold_Bump'].inputs['Distance'].default_value / scale, cfg['pp']['surface_texture']['bump_distance_mm'] / 1000, rel_tol=1e-5)
        results.append({'set': name, 'cup': '650', 'scale': scale, 'mesh_uv_unchanged': True, 'optical_scale_correct': True, 'warnings': info['warnings']})
    # Older configs are still accepted and omit the optional texture.
    old = copy.deepcopy(cfg['pp'])
    old.pop('surface_texture', None)
    mat = material.polypropylene(old, 0.17885)
    assert mat.node_tree.nodes.get('PP_Mold_Bump') is None
    out = ROOT / 'out/material_review/validation.json'
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps({'passed': True, 'builds': results, 'source_mesh_signatures': originals, 'legacy_config': 'passed', 'rendered': False}, ensure_ascii=False, indent=2), encoding='utf-8')
    print('MATERIAL VALIDATION PASSED:', len(results), 'builds; report:', out, flush=True)


if __name__ == '__main__':
    main()
