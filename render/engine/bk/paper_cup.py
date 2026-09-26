"""Бумажный стакан в чужой сцене: из готового .blend аддона cup_mockup.

Стакан в файле модели — пустышка CUPS_Product, уже повёрнутая логотипом к
камере (hero_rotation_deg), и под ней 2–3 сетки: стенка и дно, у DW ещё
обечайка, у EM вафельная обёртка. Раннер привык к одному мешу с началом
координат в центре дна, поэтому поворот пустышки запекается, а сетки
сливаются в один объект. Материалы Paper_Print / Paper_Inner / Paper_Edge
и упакованные картинки (макет, конгрев) приезжают вместе с сетками.

Макет — полный лист развёртки, как в аддоне: PDF (через PyMuPDF во внешнем
Python), JPG или PNG. Лист должен совпадать по пропорциям с шаблоном модели.
"""

import hashlib
import os
import shutil
import subprocess
import tempfile
from typing import Optional

import bmesh
import bpy
import numpy as np

PRINT = "Paper_Print"                 # имена как в cups/paper/cup_mockup/materials.py
ART_NODE = "CUPS_Artwork"
PARTS_PREFIX = "Cup_"
RASTERIZE = ("cups", "paper", "cup_mockup", "rasterize.py")


class PaperError(Exception):
    pass


def import_paper(path: str, root_name: str, coll, name: str):
    """Импорт пустышки и её сеток, запекание поворота, слияние в один меш."""
    with bpy.data.libraries.load(path, link=False) as (src, dst):
        if root_name not in src.objects:
            raise PaperError(f"{path}: в файле нет {root_name!r}")
        wanted = [n for n in src.objects if n == root_name or n.startswith(PARTS_PREFIX)]
        # копия: Blender заменяет имена на объекты прямо в переданном списке
        dst.objects = list(wanted)
    loaded = dict(zip(wanted, dst.objects))
    root = loaded[root_name]
    parts = [o for n, o in loaded.items()
             if n != root_name and o is not None and o.type == "MESH" and o.parent == root]
    if not parts:
        raise PaperError(f"{path}: под {root_name} нет сеток стакана")

    mats, bm = [], bmesh.new()
    for ob in parts:
        world = root.matrix_basis @ ob.matrix_parent_inverse @ ob.matrix_basis
        me = ob.data.copy()
        me.transform(world)
        remap = []
        for m in ob.data.materials:
            if m not in mats:
                mats.append(m)
            remap.append(mats.index(m))
        if remap and len(me.polygons):
            idx = np.empty(len(me.polygons), np.int32)
            me.polygons.foreach_get("material_index", idx)
            me.polygons.foreach_set("material_index", np.asarray(remap, np.int32)[idx])
        bm.from_mesh(me)
        bpy.data.meshes.remove(me)
    mesh = bpy.data.meshes.new(name)
    bm.to_mesh(mesh)
    bm.free()
    for m in mats:
        mesh.materials.append(m)
    for ob in loaded.values():
        if ob is not None:
            data = ob.data if ob.type == "MESH" else None
            bpy.data.objects.remove(ob, do_unlink=True)
            if data is not None and data.users == 0:
                bpy.data.meshes.remove(data)
    obj = bpy.data.objects.new(name, mesh)
    coll.objects.link(obj)
    return obj


def _art_node(cup):
    for m in cup.data.materials:
        if m and m.name.startswith(PRINT) and m.node_tree:
            node = m.node_tree.nodes.get(ART_NODE)
            if node is not None:
                return node
    raise PaperError("у стакана нет узла макета CUPS_Artwork в материале Paper_Print")


def _blank():
    im = bpy.data.images.get("CUPS_Blank_White")
    if im is None:
        im = bpy.data.images.new("CUPS_Blank_White", 4, 4, alpha=False)
        im.generated_color = (1, 1, 1, 1)
        im.pack()
    return im


def _python() -> Optional[str]:
    local = os.path.join(os.environ.get("LOCALAPPDATA", ""), "Programs", "Python", "Python310", "python.exe")
    return local if os.path.isfile(local) else shutil.which("python")


def rasterize(project: str, source: str, page: int = 1, dpi: int = 300) -> str:
    """Страница PDF в PNG тем же растеризатором, что у аддона: техслои скрыты."""
    py = _python()
    if not py:
        raise PaperError("для PDF нужен Python с PyMuPDF (fitz); не найден")
    cache = os.path.join(tempfile.gettempdir(), "cups_mockup_cache")
    os.makedirs(cache, exist_ok=True)
    with open(source, "rb") as fh:
        digest = hashlib.sha256(fh.read()).hexdigest()[:16]
    dest = os.path.join(cache, f"{digest}_p{page}_{dpi}_1.png")
    if not os.path.isfile(dest):
        res = subprocess.run([py, os.path.join(project, *RASTERIZE), source, dest, str(page), str(dpi), "1"],
                             capture_output=True, text=True, encoding="utf-8", errors="replace", timeout=180)
        if res.returncode:
            raise PaperError("PDF: " + res.stderr[-600:])
    return dest


def _flatten(im):
    """Прозрачное в макете — белый картон, как на печати."""
    if im.channels < 4:
        return im
    w, h = im.size
    px = np.empty(w * h * 4, np.float32)
    im.pixels.foreach_get(px)
    px = px.reshape(-1, 4)
    if px[:, 3].min() > 0.999:
        return im
    a = px[:, 3:4]
    px[:, :3] = px[:, :3] * a + (1.0 - a)
    px[:, 3] = 1.0
    flat = bpy.data.images.new(im.name + "_flat", w, h, alpha=False)
    flat.pixels.foreach_set(px.ravel())
    bpy.data.images.remove(im)
    return flat


def dress_paper(project: str, entry: dict, cup, art: Optional[str], clean: bool,
                page: int = 1) -> Optional[dict]:
    """Макет на стакан. clean — чистый картон; art — свой лист; иначе — из файла модели."""
    node = _art_node(cup)
    if clean:
        node.image = _blank()
        return None
    if art:
        src = os.path.abspath(art)
        if not os.path.isfile(src):
            raise PaperError(f"{src}: макет не найден")
        path = rasterize(project, src, page) if src.lower().endswith(".pdf") else src
        im = bpy.data.images.load(path, check_existing=False)
        w, h = im.size
        pw, ph = entry["print"]["page_mm"]
        if abs(w / h - pw / ph) > 0.025:
            bpy.data.images.remove(im)
            raise PaperError(f"{entry['key']}: ожидается полный лист развёртки {pw:g}×{ph:g} мм, "
                             f"а у макета пропорции {w}×{h}")
        im = _flatten(im)
        im.name = "CUPS_Art_" + os.path.splitext(os.path.basename(src))[0][:40]
        im.colorspace_settings.name = "sRGB"
        if not im.packed_file:
            im.pack()
        node.image = im
    img = node.image
    return {"mode": "sheet", "type": "paper", "image": img.name if img else None,
            "size_px": list(img.size) if img else None, "page_mm": entry["print"]["page_mm"],
            "source": os.path.basename(art) if art else "из файла модели",
            "variant": entry.get("variant")}
