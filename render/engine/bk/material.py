"""Материал стакана: молочный полипропилен.

Раньше материал брался из проекта shot500. Тот проект убран, и материал живёт
здесь — вместе со своими параметрами в params/shots.json, раздел pp.

Наполнение стакана (напиток, лёд, конденсат) здесь не строится: заказчик
переделывает его отдельно.
"""

from typing import Tuple

import bpy


class MaterialError(Exception):
    """Ошибка построения материала: сообщение уже содержит ключ конфига."""


def mm(value: float) -> float:
    """Миллиметры -> метры. Единственное место перевода в модуле."""
    return value / 1000.0


def _srgb_to_linear(c: float) -> float:
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def colour(value) -> Tuple[float, float, float, float]:
    """Цвет из конфига в линейное RGBA.

    Строка '#RRGGBB' считается заданной в sRGB и переводится в линейное
    пространство: сокеты Blender линейные, и hex, положенный туда как есть,
    дал бы заметно другой тон. Список чисел считается уже линейным.
    """
    if isinstance(value, str):
        h = value.strip().lstrip("#")
        if len(h) != 6:
            raise MaterialError(f"цвет {value!r}: ожидается #RRGGBB")
        rgb = [int(h[i:i + 2], 16) / 255.0 for i in (0, 2, 4)]
        return tuple(_srgb_to_linear(c) for c in rgb) + (1.0,)
    if len(value) == 3:
        return (float(value[0]), float(value[1]), float(value[2]), 1.0)
    return tuple(float(x) for x in value)


def new_material(name: str):
    mat = bpy.data.materials.get(name)
    if mat is None:
        mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    mat.node_tree.nodes.clear()
    return mat


def principled(mat, location=(0, 0)):
    nt = mat.node_tree
    out = nt.nodes.new("ShaderNodeOutputMaterial")
    out.location = (location[0] + 400, location[1])
    bsdf = nt.nodes.new("ShaderNodeBsdfPrincipled")
    bsdf.location = location
    nt.links.new(bsdf.outputs["BSDF"], out.inputs["Surface"])
    return bsdf, out


def set_input(node, name: str, value) -> bool:
    """Записать значение во вход узла. Отсутствующий вход — не ошибка."""
    sock = node.inputs.get(name)
    if sock is None:
        return False
    try:
        sock.default_value = value
    except (TypeError, ValueError):
        return False
    return True


def assign(obj, mat) -> None:
    obj.data.materials.clear()
    obj.data.materials.append(mat)


def wall_volume(mat, density: float, anisotropy: float):
    """Молочность как рассеяние в толще стенки, а не плёнка на поверхности.

    Литой полипропилен мутный потому, что свет рассеивается внутри материала.
    Если изображать эту мутность непропускающей долей поверхности, пустой
    стакан выйдет похожим, а всё, что за стенкой, закроется ровной белой
    вуалью — на фотографиях изделия сквозь переднюю стенку отлично читается
    печать с задней, зеркально.

    Объём даёт и то, чего поверхность не может дать в принципе: яркость
    зависит от толщины. Рёбра расстыковки сделаны изнутри и утолщают стенку с
    0.5 до примерно 2 мм, снаружи оставаясь гладкими. На фотографии каждое
    такое ребро — светлая вертикальная метка у дна, и она светлая при любом
    направлении света, потому что это не блик, а вчетверо более длинный путь
    света в пластике. Тем же механизмом сами собой выходят плотный свёрнутый
    венчик и белёсый поясок у основания.

    Cycles по умолчанию держит volume_bounces равным нулю. При нуле рассеивающая
    среда только съедает свет, и стакан рендерится чёрным; см. render.volume_bounces
    в params/shots.json.
    """
    if density <= 0:
        return None
    nt = mat.node_tree
    out = next((n for n in nt.nodes if n.bl_idname == "ShaderNodeOutputMaterial"), None)
    if out is None:
        raise MaterialError("в материале нет узла вывода, некуда включить объём")
    scatter = nt.nodes.new("ShaderNodeVolumeScatter")
    scatter.name = "PP_Wall_Translucency"
    scatter.label = "мутность стенки"
    scatter.location = (200, -320)
    scatter.inputs["Color"].default_value = (1.0, 1.0, 1.0, 1.0)
    scatter.inputs["Density"].default_value = float(density)
    scatter.inputs["Anisotropy"].default_value = float(anisotropy)
    nt.links.new(scatter.outputs[0], out.inputs["Volume"])
    return scatter


def polypropylene(pp: dict, cup_height_m: float):
    """Молочный PP: пропускающая поверхность плюс рассеяние в толще стенки.

    Пропускание отвечает за оптику поверхности, объём — за мутность материала.

    Две зоны по высоте. Венчик выше отметки «rim_below_top от верха» глаже
    стенки: свёрнутая кромка на изделии более гладкая, и тонкая светлая линия
    по краю — самая узнаваемая деталь литого PP.

    Маска высоты берётся в координатах объекта, а не в мировых: стакан
    попадает в чужую сцену со своим переносом и масштабом, и мировая маска
    там разъехалась бы.
    """
    for key in ("name", "base_color", "roughness", "rim_roughness",
                "rim_below_top_mm", "ior", "metallic", "transmission",
                "subsurface_weight", "subsurface_radius_mm"):
        if key not in pp:
            raise MaterialError(f"pp.{key} — обязательный ключ отсутствует")

    mat = new_material(pp["name"])
    nt = mat.node_tree
    bsdf, _ = principled(mat)

    set_input(bsdf, "Base Color", colour(pp["base_color"]))
    set_input(bsdf, "IOR", pp["ior"])
    set_input(bsdf, "Metallic", pp["metallic"])
    set_input(bsdf, "Transmission Weight", pp["transmission"])
    set_input(bsdf, "Subsurface Weight", pp["subsurface_weight"])
    set_input(bsdf, "Subsurface Radius",
              tuple(mm(x) for x in pp["subsurface_radius_mm"]))
    if "subsurface_scale" in pp:
        set_input(bsdf, "Subsurface Scale", pp["subsurface_scale"])
    for prop, value in (("subsurface_method", pp.get("subsurface_method", "RANDOM_WALK")),
                        ("distribution", "MULTI_GGX")):
        if hasattr(bsdf, prop):
            try:
                setattr(bsdf, prop, value)
            except TypeError:
                pass

    coord = nt.nodes.new("ShaderNodeTexCoord")
    coord.location = (-1400, -200)
    sep = nt.nodes.new("ShaderNodeSeparateXYZ")
    sep.location = (-1220, -200)
    nt.links.new(coord.outputs["Object"], sep.inputs["Vector"])

    # маска венчика: 0 на стенке, 1 у кромки
    rim = nt.nodes.new("ShaderNodeMapRange")
    rim.location = (-1040, -60)
    rim.inputs["From Min"].default_value = (
        cup_height_m - mm(pp["rim_below_top_mm"]) - mm(0.6))
    rim.inputs["From Max"].default_value = cup_height_m - mm(pp["rim_below_top_mm"])
    rim.inputs["To Min"].default_value = 0.0
    rim.inputs["To Max"].default_value = 1.0
    rim.clamp = True
    nt.links.new(sep.outputs["Z"], rim.inputs["Value"])

    rough = nt.nodes.new("ShaderNodeMix")
    rough.data_type = "FLOAT"
    rough.label = "rim"
    rough.location = (-820, -60)
    rough.inputs["A"].default_value = pp["roughness"]
    rough.inputs["B"].default_value = pp["rim_roughness"]
    nt.links.new(rim.outputs["Result"], rough.inputs["Factor"])
    nt.links.new(rough.outputs["Result"], bsdf.inputs["Roughness"])

    # Микрофактура пресс-формы. Координаты локальные в метрах: фактура
    # переносится вместе со стаканом и не зависит от его UV для печати.
    # Без блока surface_texture старые конфиги дают прежний гладкий материал.
    surface = pp.get("surface_texture") or {}
    if surface.get("enabled", False):
        size_mm = float(surface["size_mm"])
        variation = float(surface["roughness_variation"])
        distance_mm = float(surface["bump_distance_mm"])
        strength = float(surface["bump_strength"])
        if size_mm <= 0 or variation < 0 or distance_mm < 0 or not 0 <= strength <= 1:
            raise MaterialError("pp.surface_texture: size_mm > 0, variation/distance >= 0, strength 0..1")
        noise = nt.nodes.new("ShaderNodeTexNoise")
        noise.name = "PP_Mold_Grain"
        noise.label = "микрофактура пресс-формы (локальные метры)"
        noise.location = (-1200, -540)
        noise.inputs["Scale"].default_value = 1.0 / mm(size_mm)
        noise.inputs["Detail"].default_value = 2.0
        noise.inputs["Roughness"].default_value = 0.55
        nt.links.new(coord.outputs["Object"], noise.inputs["Vector"])

        delta = nt.nodes.new("ShaderNodeMapRange")
        delta.name = "PP_Roughness_Variation"
        delta.location = (-980, -410)
        delta.inputs["To Min"].default_value = -variation
        delta.inputs["To Max"].default_value = variation
        nt.links.new(noise.outputs["Fac"], delta.inputs["Value"])
        wall = nt.nodes.new("ShaderNodeMath")
        wall.operation = "SUBTRACT"
        wall.location = (-980, -230)
        wall.inputs[0].default_value = 1.0
        nt.links.new(rim.outputs["Result"], wall.inputs[1])
        masked = nt.nodes.new("ShaderNodeMath")
        masked.operation = "MULTIPLY"
        masked.location = (-760, -350)
        nt.links.new(delta.outputs["Result"], masked.inputs[0])
        nt.links.new(wall.outputs[0], masked.inputs[1])
        add = nt.nodes.new("ShaderNodeMath")
        add.name = "PP_Surface_Roughness"
        add.operation = "ADD"
        add.use_clamp = True
        add.location = (-500, -70)
        nt.links.new(rough.outputs["Result"], add.inputs[0])
        nt.links.new(masked.outputs[0], add.inputs[1])
        nt.links.new(add.outputs[0], bsdf.inputs["Roughness"])

        bump_weight = nt.nodes.new("ShaderNodeMath")
        bump_weight.operation = "MULTIPLY"
        bump_weight.location = (-740, -570)
        bump_weight.inputs[1].default_value = strength
        nt.links.new(wall.outputs[0], bump_weight.inputs[0])
        bump = nt.nodes.new("ShaderNodeBump")
        bump.name = "PP_Mold_Bump"
        bump.label = "микрорельеф PP; без изменения меша"
        bump.location = (-260, -390)
        bump.inputs["Distance"].default_value = mm(distance_mm)
        nt.links.new(bump_weight.outputs[0], bump.inputs["Strength"])
        nt.links.new(noise.outputs["Fac"], bump.inputs["Height"])
        nt.links.new(bump.outputs["Normal"], bsdf.inputs["Normal"])

    wall_volume(mat, pp.get("wall_scatter_density", 0.0),
                pp.get("wall_scatter_anisotropy", 0.9))
    return mat
