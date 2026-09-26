"""Portable GLB for cup-viewer: the same meshes and material names as in Blender.

Paper_Print carries the artwork as baseColorTexture on TEXCOORD_0 (the A4
page UV) and the pressed relief as normalTexture on the same UV; Paper_Inner
carries the relief of the crimped bottom, Paper_Edge is a plain PBR colour.  The cup is written
in its canonical pose (seam at the back) whatever the panel rotation is.
"""
from pathlib import Path

import bpy

from . import materials


def _normal_direct(restore=None):
    """glTF takes a Normal Map node only straight on the BSDF, so the fibre bump
    is unhooked for the length of the export and put back afterwards."""
    if restore is not None:
        for mat_name, node_name in restore:
            nt = bpy.data.materials[mat_name].node_tree
            bsdf = next(n for n in nt.nodes if n.type == 'BSDF_PRINCIPLED')
            nt.links.new(nt.nodes[node_name].outputs['Normal'], bsdf.inputs['Normal'])
        return None
    undo = []
    for mat_name in (materials.PRINT, materials.INNER):
        mat = bpy.data.materials.get(mat_name)
        if not mat or not mat.use_nodes:
            continue
        nt = mat.node_tree
        nm = nt.nodes.get(materials.EMBOSS_NORMAL)
        bsdf = next((n for n in nt.nodes if n.type == 'BSDF_PRINCIPLED'), None)
        if nm is None or bsdf is None or not bsdf.inputs['Normal'].links:
            continue
        undo.append((mat_name, bsdf.inputs['Normal'].links[0].from_node.name))
        nt.links.new(nm.outputs['Normal'], bsdf.inputs['Normal'])
    return undo


def export(scene, filepath):
    root = bpy.data.objects.get('CUPS_Product')
    if not root or root.get('geometry_version') != '4.0':
        raise ValueError('Сначала создайте стакан текущей версии (кнопка «Создать / обновить»).')
    meshes = [o for o in root.children if o.type == 'MESH']
    if not meshes:
        raise ValueError('В сцене нет геометрии стакана.')
    filepath = Path(filepath).with_suffix('.glb')
    filepath.parent.mkdir(parents=True, exist_ok=True)
    selected = list(bpy.context.selected_objects)
    active = bpy.context.view_layer.objects.active
    rotation = root.rotation_euler.copy()
    hidden = {o.name: o.hide_get() for o in meshes}
    undo = _normal_direct()
    try:
        root.rotation_euler = (0.0, 0.0, 0.0)
        bpy.context.view_layer.update()
        bpy.ops.object.select_all(action='DESELECT')
        for o in meshes:
            o.hide_set(False)
            o.select_set(True)
        bpy.context.view_layer.objects.active = meshes[0]
        bpy.ops.export_scene.gltf(
            filepath=str(filepath), export_format='GLB', use_selection=True, export_apply=True,
            export_texcoords=True, export_normals=True, export_tangents=True,
            export_materials='EXPORT', export_image_format='AUTO', export_jpeg_quality=92,
            export_attributes=False, export_extras=False, export_yup=True,
            export_animations=False, export_cameras=False, export_lights=False)
        return str(filepath)
    finally:
        _normal_direct(undo)
        root.rotation_euler = rotation
        for o in meshes:
            o.hide_set(hidden[o.name])
        bpy.ops.object.select_all(action='DESELECT')
        for o in selected:
            if o.name in scene.objects:
                o.select_set(True)
        if active and active.name in scene.objects:
            bpy.context.view_layer.objects.active = active
