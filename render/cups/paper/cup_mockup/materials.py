"""Three paper materials, named like the models of cup-viewer.

Paper_Print  printed face; its image node is the artwork (UV 'UVPrint').
Paper_Inner  unprinted coated board: inside, rim top, bottom blank, DW inner cup.
Paper_Edge   cut edges of the board.

The node trees stay export-friendly: glTF receives the artwork as
baseColorTexture and the paper tint as baseColorFactor.  The fibre relief is a
Blender-only bump (cup-viewer draws its own paper relief).
"""
import bpy

from . import emboss

PRINT, INNER, EDGE = 'Paper_Print', 'Paper_Inner', 'Paper_Edge'
ART_NODE = 'CUPS_Artwork'
EMBOSS_NODE = 'CUPS_EmbossTex'
EMBOSS_NORMAL = 'CUPS_EmbossNormal'
ART_IMAGE = 'CUPS_CurrentArtwork'
BLANK_IMAGE = 'CUPS_BlankSheet'
UV_NAME = 'UVPrint'

LOOK = {
    PRINT: {'color': (0.94, 0.93, 0.90), 'roughness': 0.55, 'specular': 0.35, 'bump': 0.18},
    INNER: {'color': (0.93, 0.92, 0.88), 'roughness': 0.42, 'specular': 0.40, 'bump': 0.10},
    EDGE: {'color': (0.86, 0.82, 0.74), 'roughness': 0.85, 'specular': 0.20, 'bump': 0.35},
}


def blank_image():
    im = bpy.data.images.get(BLANK_IMAGE)
    if im is None:
        im = bpy.data.images.new(BLANK_IMAGE, 4, 4, alpha=False)
        im.generated_color = (1, 1, 1, 1)
        im.pack()
    return im


def _fibre(nt, strength):
    n, links = nt.nodes, nt.links
    co = n.new('ShaderNodeTexCoord')
    co.location = (-900, -380)
    noise = n.new('ShaderNodeTexNoise')
    noise.location = (-700, -380)
    noise.inputs['Scale'].default_value = 6500.0     # object space is metres: ~0.15 mm grain
    noise.inputs['Detail'].default_value = 2.5
    noise.inputs['Roughness'].default_value = 0.7
    links.new(co.outputs['Object'], noise.inputs['Vector'])
    bump = n.new('ShaderNodeBump')
    bump.location = (-480, -380)
    bump.inputs['Strength'].default_value = strength
    bump.inputs['Distance'].default_value = 0.00004
    links.new(noise.outputs['Fac'], bump.inputs['Height'])
    return bump


def _relief(nt, bump):
    """Pressed relief of the board: an image normal map in sheet coordinates.

    Carries the crimp of the bottom seal and the client's emboss.  Unlike the
    old procedural knurl this travels in the GLB, because glTF can only take
    image textures."""
    n, links = nt.nodes, nt.links
    uv = n.new('ShaderNodeUVMap')
    uv.uv_map = UV_NAME
    uv.location = (-1100, -700)
    tex = n.new('ShaderNodeTexImage')
    tex.name = EMBOSS_NODE
    tex.label = 'ЗАМЕНА КОНГРЕВА'
    tex.location = (-880, -700)
    tex.extension = 'EXTEND'
    tex.image = bpy.data.images.get(emboss.IMAGE)
    if tex.image is not None:
        tex.image.colorspace_settings.name = 'Non-Color'
    links.new(uv.outputs['UV'], tex.inputs['Vector'])
    nm = n.new('ShaderNodeNormalMap')
    nm.name = EMBOSS_NORMAL
    nm.uv_map = UV_NAME
    nm.location = (-620, -700)
    links.new(tex.outputs['Color'], nm.inputs['Color'])
    links.new(nm.outputs['Normal'], bump.inputs['Normal'])
    return bump


def make(name):
    look = LOOK[name]
    mat = bpy.data.materials.get(name) or bpy.data.materials.new(name)
    mat.use_nodes = True
    nt = mat.node_tree
    old_image = None
    art = nt.nodes.get(ART_NODE)
    if art is not None:
        old_image = art.image
    nt.nodes.clear()
    out = nt.nodes.new('ShaderNodeOutputMaterial')
    out.location = (400, 0)
    bsdf = nt.nodes.new('ShaderNodeBsdfPrincipled')
    bsdf.location = (100, 0)
    nt.links.new(bsdf.outputs['BSDF'], out.inputs['Surface'])
    bsdf.inputs['Roughness'].default_value = look['roughness']
    bsdf.inputs['Specular IOR Level'].default_value = look['specular']
    bsdf.inputs['Metallic'].default_value = 0.0
    bump = _fibre(nt, look['bump'])
    if name in (PRINT, INNER):
        bump = _relief(nt, bump)
    nt.links.new(bump.outputs['Normal'], bsdf.inputs['Normal'])
    if name == PRINT:
        uv = nt.nodes.new('ShaderNodeUVMap')
        uv.uv_map = UV_NAME
        uv.location = (-900, 200)
        tex = nt.nodes.new('ShaderNodeTexImage')
        tex.name = ART_NODE
        tex.label = 'ЗАМЕНА ДИЗАЙНА'
        tex.location = (-650, 200)
        tex.extension = 'EXTEND'
        tex.interpolation = 'Cubic'
        tex.image = old_image or bpy.data.images.get(ART_IMAGE) or blank_image()
        nt.links.new(uv.outputs['UV'], tex.inputs['Vector'])
        # No tint: cup-viewer multiplies the client's artwork by this factor,
        # so it must stay white (see the viewer README, «Цвет стенки»).
        nt.links.new(tex.outputs['Color'], bsdf.inputs['Base Color'])
    else:
        bsdf.inputs['Base Color'].default_value = (*look['color'], 1.0)
    mat.diffuse_color = (*look['color'], 1.0)
    return mat


def ensure():
    return {name: make(name) for name in (PRINT, INNER, EDGE)}


def set_artwork_visible(visible):
    mat = bpy.data.materials.get(PRINT)
    if not mat or not mat.use_nodes:
        return
    node = mat.node_tree.nodes.get(ART_NODE)
    if node is None:
        return
    art = bpy.data.images.get(ART_IMAGE)
    node.image = art if (visible and art) else blank_image()


def set_emboss(images):
    """Hand each material its relief map ({'print': image, 'inner': image})."""
    for name, key in ((PRINT, 'print'), (INNER, 'inner')):
        mat = bpy.data.materials.get(name)
        if not mat or not mat.use_nodes:
            continue
        node = mat.node_tree.nodes.get(EMBOSS_NODE)
        if node is None:
            continue
        node.image = images.get(key)
        if node.image is not None:
            node.image.colorspace_settings.name = 'Non-Color'
