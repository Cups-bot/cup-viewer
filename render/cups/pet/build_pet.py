"""PET-стаканы Polyer Ø95 (MyCups PG95-400 / 520 / 600) по профилю из шаблонов.

Стенка — настоящая тонкая оболочка 0,3 мм, а не поверхность: прозрачный PET
преломляет на обеих сторонах, и без толщины он выглядит как мыльный пузырь.
Кромка завальцована валиком в габарите шаблона (там она нарисована плоской
полкой 2 × 3 мм).

Печать — две стороны, А и Б, как в шаблоне MyCups. Обе стороны сводятся в одну
текстуру на развёртке UVMap (u — азимут по кругу, v — высота z/H), поэтому
один и тот же файл годится и для Cycles, и для GLB просмотрщика. Макет каждой
стороны — картинка в размер поля (ширина × высота в мм), кладётся без
искажений: ширина считается по дуге на своём радиусе.

    blender -b --factory-startup -P cups/pet/build_pet.py
    blender -b --factory-startup -P cups/pet/build_pet.py -- --only PG95-520 --art-a a.png --art-b b.png

На выходе на каждый стакан: <id>.blend, <id>.glb, verify.json в cups/pet/<id>/.
"""

import argparse
import json
import math
import os
import sys

import bmesh
import bpy
import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
MM = 0.001


def _argv():
    raw = sys.argv[1:]
    return raw[raw.index("--") + 1:] if "--" in raw else []


# ---------------------------------------------------------------------------
# профиль
# ---------------------------------------------------------------------------

def left_normals(pts):
    """Нормали полилинии влево по ходу; влево — это внутрь стакана."""
    p = np.asarray(pts, float)
    seg = np.diff(p, axis=0)
    seg /= np.linalg.norm(seg, axis=1)[:, None]
    nseg = np.stack([-seg[:, 1], seg[:, 0]], axis=1)
    n = np.zeros_like(p)
    n[0], n[-1] = nseg[0], nseg[-1]
    for i in range(1, len(p) - 1):
        m = nseg[i - 1] + nseg[i]
        m /= np.linalg.norm(m)
        # миттер: на изломе смещение длиннее, иначе толщина проседает
        n[i] = m / max(0.5, float(np.dot(m, nseg[i])))
    return n


def fillet(pts, radii):
    """Скруглить изломы. radii: {индекс: радиус мм}; остальные точки как есть."""
    out = [tuple(pts[0])]
    for i in range(1, len(pts) - 1):
        r = radii.get(i)
        if not r:
            out.append(tuple(pts[i]))
            continue
        p, a, b = (np.asarray(pts[k], float) for k in (i, i - 1, i + 1))
        da, db = a - p, b - p
        la, lb = np.linalg.norm(da), np.linalg.norm(db)
        da, db = da / la, db / lb
        ang = math.acos(max(-1.0, min(1.0, float(np.dot(da, db)))))
        if ang > math.radians(178):
            out.append(tuple(p))
            continue
        d = min(r / math.tan(ang / 2), 0.45 * la, 0.45 * lb)
        t1, t2 = p + da * d, p + db * d
        for k in range(7):
            s = k / 6
            q = (1 - s) ** 2 * t1 + 2 * (1 - s) * s * p + s * s * t2
            out.append((float(q[0]), float(q[1])))
    out.append(tuple(pts[-1]))
    return out


def midline(cup, wall, curl_r, bottom):
    """Средняя линия листа PET от оси по дну, вверх по стенке и в завиток кромки."""
    H = cup["height_mm"]
    outer = [tuple(p) for p in cup["outer"]]
    rb = outer[0][0]
    # По фото образцов: стакан стоит на плоском кольце, внутри — утопленный
    # диск с клеймом, чуть выгнутый внутрь.
    foot, rec = bottom["foot_width_mm"], bottom["recess_mm"]
    ext = [(0.0, rec + 0.15), (rb - foot - 1.2, rec), (rb - foot, 0.0)] + outer
    corner = 3                                   # точка (rb, 0) — угол дна
    n = left_normals(ext)
    mid = [(float(x), float(z)) for x, z in (np.asarray(ext) + n * wall / 2)]
    mid[0] = (0.0, mid[0][1])
    radii = {1: 0.6, 2: 0.5, corner: 1.2}
    for i in range(corner + 1, len(mid) - 1):
        radii[i] = 0.5
    mid = fillet(mid, radii)

    # завиток: центр так, чтобы наружный габарит валика был Ø95 по верху и
    # 2 мм по высоте — ровно как полка на шаблоне
    cr = 47.5 - curl_r - wall / 2
    cz = H - curl_r - wall / 2
    arc = []
    for k in range(0, 24):
        a = math.radians(180 - k * (315 / 23))   # от 180° через верх, наружу, вниз до -135°
        arc.append((cr + curl_r * math.cos(a), cz + curl_r * math.sin(a)))
    joined = mid + arc
    return fillet(joined, {len(mid) - 1: 0.25, len(mid): 0.25}), len(ext)


def section(mid, wall):
    n = left_normals(mid)
    m = np.asarray(mid, float)
    inner = m + n * wall / 2
    outer = m - n * wall / 2
    inner[0, 0] = outer[0, 0] = 0.0
    return outer, inner


# ---------------------------------------------------------------------------
# сетка
# ---------------------------------------------------------------------------

def build_mesh(name, outer, inner, H, seg, mark_r):
    """Вращение замкнутого сечения. Точки на оси — полюса, а не кольца.

    UVMap — развёртка стенки по кругу для печати. UVBottom — плоская проекция
    дна для клейма: снаружи оно читается прямо, если перевернуть стакан вверх
    дном к зрителю стороной А (как держат образец на фото).
    """
    pts = [(float(r), float(z), True) for r, z in outer] + \
          [(float(r), float(z), False) for r, z in inner[::-1]]
    bm = bmesh.new()
    uv = bm.loops.layers.uv.new("UVMap")
    uvb = bm.loops.layers.uv.new("UVBottom")
    rings = []
    for r, z, _ in pts:
        if r < 1e-6:
            rings.append([bm.verts.new((0.0, 0.0, z * MM))])
        else:
            rings.append([bm.verts.new((r * math.cos(2 * math.pi * j / seg) * MM,
                                        r * math.sin(2 * math.pi * j / seg) * MM, z * MM))
                          for j in range(seg)])
    faces = []
    for i in range(len(pts) - 1):
        a, b = rings[i], rings[i + 1]
        if len(a) == 1 and len(b) == 1:
            continue                             # оба на оси: отрезок оси, грани нет
        exterior = pts[i][2] and pts[i + 1][2]
        zmid = (pts[i][1] + pts[i + 1][1]) / 2
        for j in range(seg):
            j2 = (j + 1) % seg
            if len(a) == 1:
                vs, cols = [a[0], b[j], b[j2]], [j + 0.5, j, j + 1]
            elif len(b) == 1:
                vs, cols = [a[j], a[j2], b[0]], [j, j + 1, j + 0.5]
            else:
                vs, cols = [a[j], a[j2], b[j2], b[j]], [j, j + 1, j + 1, j]
            f = bm.faces.new(vs)
            f.smooth = True
            f.material_index = 1 if (exterior and 0.5 < zmid < H - 2.5) else 0
            for loop, c in zip(f.loops, cols):
                loop[uv].uv = (c / seg, loop.vert.co.z / (H * MM))
                co = loop.vert.co
                loop[uvb].uv = (0.5 + co.x / (2 * mark_r * MM), 0.5 - co.y / (2 * mark_r * MM))
            faces.append(f)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me)
    bm.free()
    return me


# ---------------------------------------------------------------------------
# печать
# ---------------------------------------------------------------------------

def load_rgba(path):
    img = bpy.data.images.load(path, check_existing=False)
    w, h = img.size
    px = np.empty(w * h * 4, np.float32)
    img.pixels.foreach_get(px)
    bpy.data.images.remove(img)
    return px.reshape(h, w, 4)                  # строка 0 — низ картинки


def sample(img, x, y):
    """Билинейная выборка; x, y в [0, 1), y снизу вверх."""
    h, w = img.shape[:2]
    fx, fy = x * w - 0.5, y * h - 0.5
    x0, y0 = np.floor(fx).astype(int), np.floor(fy).astype(int)
    tx, ty = (fx - x0)[..., None], (fy - y0)[..., None]
    c = lambda yy, xx: img[np.clip(yy, 0, h - 1), np.clip(xx, 0, w - 1)]
    return (c(y0, x0) * (1 - tx) * (1 - ty) + c(y0, x0 + 1) * tx * (1 - ty)
            + c(y0 + 1, x0) * (1 - tx) * ty + c(y0 + 1, x0 + 1) * tx * ty)


def compose_print(cup, prof, arts, tex_w=4096):
    """Свести стороны А и Б в одну текстуру на развёртке UVMap."""
    H = cup["height_mm"]
    tex_h = int(round(tex_w * H / (math.pi * 95) / 64) * 64)
    u = (np.arange(tex_w) + 0.5) / tex_w
    v = (np.arange(tex_h) + 0.5) / tex_h
    phi = (u * 2 * math.pi)[None, :]
    z = (v * H)[:, None]
    zs = np.array([p[1] for p in cup["outer"]])
    rs = np.array([p[0] for p in cup["outer"]])
    r = np.interp(z, zs, rs)                    # выше последней точки — радиус под кромкой
    z0, z1 = cup["print_z_mm"]
    w_mm = prof["print"]["width_mm"]
    out = np.zeros((tex_h, tex_w, 4), np.float32)
    for side, deg in prof["print"]["sides_deg"].items():
        art = arts.get(side)
        if art is None:
            continue
        d = (phi - math.radians(deg) + math.pi) % (2 * math.pi) - math.pi
        x = r * d / w_mm + 0.5
        y = (z - z0) / (z1 - z0)
        inside = (x >= 0) & (x < 1) & (y >= 0) & (y < 1)
        x = np.broadcast_to(x, inside.shape)
        y = np.broadcast_to(y, inside.shape)
        rgba = sample(art, x[inside], y[inside])
        a = rgba[:, 3:4]
        prev = out[inside]
        # сторон две и они не перекрываются, но «поверх» честнее, чем «заменить»
        out[inside] = np.concatenate([rgba[:, :3] * a + prev[:, :3] * (1 - a),
                                      a + prev[:, 3:4] * (1 - a)], axis=1)
    rgb = out[..., :3] / np.maximum(out[..., 3:4], 1e-6)
    out[..., :3] = np.where(out[..., 3:4] > 0, rgb, 0)
    img = bpy.data.images.new(f"{cup['id']}_print", tex_w, tex_h, alpha=True)
    img.pixels.foreach_set(out.ravel())
    img.alpha_mode = "STRAIGHT"
    return img


# ---------------------------------------------------------------------------
# материалы
# ---------------------------------------------------------------------------

def _principled(nt):
    return next(n for n in nt.nodes if n.bl_idname == "ShaderNodeBsdfPrincipled")


def pet_bsdf(node):
    node.inputs["Base Color"].default_value = (0.985, 0.99, 0.995, 1.0)
    node.inputs["Roughness"].default_value = 0.015
    node.inputs["IOR"].default_value = 1.575
    node.inputs["Transmission Weight"].default_value = 1.0


def emboss(nt, bsdf, img, height_mm):
    """Рельеф клейма на дне: карта высот по UVBottom, вне диска — ноль."""
    uvn = nt.nodes.new("ShaderNodeUVMap")
    uvn.uv_map = "UVBottom"
    tex = nt.nodes.new("ShaderNodeTexImage")
    tex.image = img
    tex.extension = "CLIP"
    tex.interpolation = "Cubic"
    bump = nt.nodes.new("ShaderNodeBump")
    bump.inputs["Distance"].default_value = height_mm * MM
    nt.links.new(uvn.outputs["UV"], tex.inputs["Vector"])
    nt.links.new(tex.outputs["Color"], bump.inputs["Height"])
    nt.links.new(bump.outputs["Normal"], bsdf.inputs["Normal"])


def materials(img, marks, emboss_mm):
    pet = bpy.data.materials.new("PET")
    pet.use_nodes = True
    pet_bsdf(_principled(pet.node_tree))
    if marks is not None:
        emboss(pet.node_tree, _principled(pet.node_tree), marks, emboss_mm)

    pr = bpy.data.materials.new("PET_Print")
    pr.use_nodes = True
    nt = pr.node_tree
    glass = _principled(nt)
    pet_bsdf(glass)
    out = next(n for n in nt.nodes if n.bl_idname == "ShaderNodeOutputMaterial")
    ink = nt.nodes.new("ShaderNodeBsdfPrincipled")
    ink.inputs["Roughness"].default_value = 0.38
    tex = nt.nodes.new("ShaderNodeTexImage")
    tex.image = img
    tex.extension = "CLIP"
    tex.interpolation = "Cubic"
    uvn = nt.nodes.new("ShaderNodeUVMap")
    uvn.uv_map = "UVMap"
    mix = nt.nodes.new("ShaderNodeMixShader")
    nt.links.new(uvn.outputs["UV"], tex.inputs["Vector"])
    nt.links.new(tex.outputs["Color"], ink.inputs["Base Color"])
    nt.links.new(tex.outputs["Alpha"], mix.inputs["Fac"])
    nt.links.new(glass.outputs["BSDF"], mix.inputs[1])
    nt.links.new(ink.outputs["BSDF"], mix.inputs[2])
    nt.links.new(mix.outputs["Shader"], out.inputs["Surface"])
    return pet, pr


# ---------------------------------------------------------------------------
# проверка
# ---------------------------------------------------------------------------

def brim_volume_ml(inner, H):
    """Объём до края по внутренней поверхности: от дна до верха завитка."""
    pts = [(r, z) for r, z in inner if z < H - 1.0]
    pts.sort(key=lambda p: p[1])
    wall = []
    for r, z in pts:                             # внутренняя стенка: радиус растёт с высотой
        if not wall or z > wall[-1][1] + 1e-6:
            wall.append((r, z))
    v = 0.0
    for (r1, z1), (r2, z2) in zip(wall, wall[1:]):
        v += math.pi * (z2 - z1) / 3 * (r1 * r1 + r1 * r2 + r2 * r2)
    return v / 1000.0


def build(cup_id, prof, art_a, art_b, out_root):
    cup = dict(prof["cups"][cup_id], id=cup_id)
    wall, curl = prof["wall_mm"], prof["curl_radius_mm"]
    bpy.ops.wm.read_factory_settings(use_empty=True)
    bottom = prof["bottom"]
    mid, _ = midline(cup, wall, curl, bottom)
    outer, inner = section(mid, wall)
    mark_r = cup["outer"][0][0] - bottom["mark_inset_mm"]
    me = build_mesh(cup_id, outer, inner, cup["height_mm"], prof["segments"], mark_r)
    ob = bpy.data.objects.new(cup_id, me)
    bpy.context.scene.collection.objects.link(ob)

    arts = {"A": load_rgba(art_a), "B": load_rgba(art_b)}
    img = compose_print(cup, prof, arts)
    folder = os.path.join(out_root, cup_id)
    os.makedirs(folder, exist_ok=True)
    img.filepath_raw = os.path.join(folder, f"{cup_id}_print.png")
    img.file_format = "PNG"
    img.save()
    img.pack()
    marks_path = os.path.join(HERE, "art", f"{cup_id}_bottom.png")
    marks = None
    if os.path.isfile(marks_path):
        marks = bpy.data.images.load(marks_path, check_existing=False)
        marks.name = f"{cup_id}_bottom"
        marks.colorspace_settings.name = "Non-Color"
        marks.pack()
    pet, pr = materials(img, marks, bottom["emboss_mm"])
    me.materials.append(pet)
    me.materials.append(pr)

    xs = [v.co.x for v in me.vertices]
    zs = [v.co.z for v in me.vertices]
    # габарит дна — над скруглением угла (1,2 мм), как его меряют штангенциркулем
    bottom = [math.hypot(v.co.x, v.co.y) for v in me.vertices if 0.0012 < v.co.z < 0.0025]
    report = {
        "id": cup_id,
        "nominal_ml": cup["nominal_ml"],
        "brim_ml_by_code": cup["brim_ml"],
        "brim_ml_by_model": round(brim_volume_ml(inner, cup["height_mm"]), 1),
        "height_mm": round((max(zs) - min(zs)) / MM, 2),
        "top_d_mm": round((max(xs) - min(xs)) / MM, 2),
        "bottom_d_mm": round(2 * max(bottom) / MM, 2) if bottom else None,
        "wall_mm": wall,
        "print_z_mm": cup["print_z_mm"],
        "print_width_mm": prof["print"]["width_mm"],
        "art": {"A": os.path.basename(art_a), "B": os.path.basename(art_b)},
        "verts": len(me.vertices),
        "source": cup["source"],
    }
    bpy.ops.wm.save_as_mainfile(filepath=os.path.join(folder, f"{cup_id}.blend"), compress=True)
    bpy.ops.object.select_all(action="DESELECT")
    ob.select_set(True)
    bpy.ops.export_scene.gltf(filepath=os.path.join(folder, f"{cup_id}.glb"),
                              export_format="GLB", use_selection=True, export_apply=True)
    with open(os.path.join(folder, "verify.json"), "w", encoding="utf-8") as fh:
        json.dump(report, fh, ensure_ascii=False, indent=2)
    print("### " + json.dumps(report, ensure_ascii=False))
    return report


def main():
    ap = argparse.ArgumentParser(prog="build_pet.py")
    ap.add_argument("--only", default=None)
    ap.add_argument("--art-a", default=None, help="макет стороны А (иначе тестовый)")
    ap.add_argument("--art-b", default=None, help="макет стороны Б (иначе тестовый)")
    ap.add_argument("--out", default=HERE)
    args = ap.parse_args(_argv())
    with open(os.path.join(HERE, "profiles.json"), encoding="utf-8") as fh:
        prof = json.load(fh)
    ids = [args.only] if args.only else list(prof["cups"])
    for cup_id in ids:
        a = args.art_a or os.path.join(HERE, "art", f"{cup_id}_test_A.png")
        b = args.art_b or os.path.join(HERE, "art", f"{cup_id}_test_B.png")
        build(cup_id, prof, a, b, args.out)
    return 0


if __name__ == "__main__":
    sys.exit(main())
