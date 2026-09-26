"""Картон бумажного стакана: мелованный, немелованный, soft-touch, крафт.

Меняется только поверхность лицевой стороны — блеск, лак, бархат, волокно.
Цвет макета не трогается, кроме крафта: там печать без белил умножается на
бурый картон, как на оттиске. Параметры — engine/params/boards.json.

Материалы копируются на каждый стакан: в кадре из двух стаканов у каждого
может быть свой картон.
"""

import json
import os
from typing import Dict, Optional

import bpy

from bk import place

PRINT, INNER, EDGE = "Paper_Print", "Paper_Inner", "Paper_Edge"
ART_NODE = "CUPS_Artwork"


def load_boards() -> dict:
    with open(os.path.join(place.ROOT, "params", "boards.json"), encoding="utf-8") as fh:
        return json.load(fh)


def _srgb(hexstr: str):
    """#RRGGBB → линейный RGBA: Base Color в Blender линейный."""
    h = hexstr.lstrip("#")
    out = []
    for i in (0, 2, 4):
        c = int(h[i:i + 2], 16) / 255.0
        out.append(c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4)
    return (*out, 1.0)


def _bsdf(mat):
    return next(n for n in mat.node_tree.nodes if n.bl_idname == "ShaderNodeBsdfPrincipled")


def _fibre_bump(mat):
    """Бамп волокна — тот, в высоту которого подан шум (cup_mockup/materials.py)."""
    for n in mat.node_tree.nodes:
        if n.bl_idname == "ShaderNodeBump":
            h = n.inputs["Height"]
            if h.is_linked and h.links[0].from_node.bl_idname == "ShaderNodeTexNoise":
                return n
    return None


def _sock(node, name, kind):
    return next(s for s in node.inputs if s.name == name and s.type == kind)


def _mix_multiply(nt, a_color=None):
    m = nt.nodes.new("ShaderNodeMix")
    m.data_type = "RGBA"
    m.blend_type = "MULTIPLY"
    m.inputs["Factor"].default_value = 1.0
    if a_color is not None:
        _sock(m, "A", "RGBA").default_value = a_color
    out = next(s for s in m.outputs if s.type == "RGBA")
    return m, out


def _speckled(nt, color, amount):
    """Цвет картона с крапинкой волокна: шум по координатам объекта, ±amount."""
    if amount <= 0:
        return None, color
    tc = nt.nodes.new("ShaderNodeTexCoord")
    noise = nt.nodes.new("ShaderNodeTexNoise")
    noise.inputs["Scale"].default_value = 900.0      # метры объекта: пятно ~1 мм
    noise.inputs["Detail"].default_value = 4.0
    nt.links.new(tc.outputs["Object"], noise.inputs["Vector"])
    rng = nt.nodes.new("ShaderNodeMapRange")
    rng.inputs["From Min"].default_value = 0.3
    rng.inputs["From Max"].default_value = 0.7
    rng.inputs["To Min"].default_value = 1.0 - amount
    rng.inputs["To Max"].default_value = 1.0 + amount
    nt.links.new(noise.outputs["Fac"], rng.inputs["Value"])
    mix, out = _mix_multiply(nt, color)
    nt.links.new(rng.outputs["Result"], _sock(mix, "B", "RGBA"))
    return out, None


def _surface(mat, p: dict, fibre=None) -> None:
    b = _bsdf(mat)
    b.inputs["Roughness"].default_value = p["roughness"]
    b.inputs["Specular IOR Level"].default_value = p["specular"]
    b.inputs["Coat Weight"].default_value = p.get("coat", 0.0)
    b.inputs["Coat Roughness"].default_value = p.get("coat_roughness", 0.3)
    b.inputs["Sheen Weight"].default_value = p.get("sheen", 0.0)
    b.inputs["Sheen Roughness"].default_value = p.get("sheen_roughness", 0.5)
    bump = _fibre_bump(mat)
    if bump is not None and fibre is not None:
        bump.inputs["Strength"].default_value = fibre


def _tint(mat, color, speckle: float, roughness: Optional[float] = None) -> None:
    """Непечатная сторона в цвет картона (крафт внутри однослойного, срез)."""
    nt = mat.node_tree
    b = _bsdf(mat)
    out, flat = _speckled(nt, color, speckle)
    if out is not None:
        nt.links.new(out, b.inputs["Base Color"])
    else:
        b.inputs["Base Color"].default_value = flat
    if roughness is not None:
        b.inputs["Roughness"].default_value = roughness


def _multiply_art(mat, color, speckle: float) -> None:
    """Печать без белил: макет × картон. Белое в макете становится картоном."""
    nt = mat.node_tree
    b = _bsdf(mat)
    art = nt.nodes.get(ART_NODE)
    board, flat = _speckled(nt, color, speckle)
    mix, out = _mix_multiply(nt)
    if art is not None:
        nt.links.new(art.outputs["Color"], _sock(mix, "A", "RGBA"))
    if board is not None:
        nt.links.new(board, _sock(mix, "B", "RGBA"))
    else:
        _sock(mix, "B", "RGBA").default_value = flat
    nt.links.new(out, b.inputs["Base Color"])


def apply(cup, board_id: str, group: str, boards: Optional[dict] = None) -> Dict:
    boards = boards or load_boards()
    if board_id not in boards["boards"]:
        raise place.ConfigError(f"картона {board_id!r} нет; есть: {', '.join(boards['boards'])}")
    p = boards["boards"][board_id]
    # своя копия материалов у каждого стакана
    slots = {}
    for i, m in enumerate(cup.data.materials):
        if m is None:
            continue
        base = m.name.split(".")[0]
        copy = m.copy()
        copy.name = f"{base}__{board_id}"
        cup.data.materials[i] = copy
        slots[base] = copy
    pr, inner, edge = slots.get(PRINT), slots.get(INNER), slots.get(EDGE)
    if pr is None:
        raise place.ConfigError("у бумажного стакана нет материала Paper_Print")
    _surface(pr, p, fibre=p.get("fibre"))
    if p.get("multiply"):
        color = _srgb(p["board_color"])
        speckle = p.get("speckle", 0.0)
        _multiply_art(pr, color, speckle)
        if group == "single" and p.get("inner_single") and inner is not None:
            _tint(inner, color, speckle, roughness=0.5)   # внутри — крафт под ПЭ
        if edge is not None:
            dark = tuple(c * 0.75 for c in color[:3]) + (1.0,)
            _tint(edge, dark, 0.0)
    return {"board": board_id, "label": p.get("label", board_id)}
