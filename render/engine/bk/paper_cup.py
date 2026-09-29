"""Бумажный стакан в чужой сцене: из готового .blend аддона cup_mockup.

Стакан в файле модели — пустышка CUPS_Product, уже повёрнутая логотипом к
камере (hero_rotation_deg), и под ней 2–3 сетки: стенка и дно, у DW ещё
обечайка, у EM вафельная обёртка. Раннер привык к одному мешу с началом
координат в центре дна, поэтому поворот пустышки запекается, а сетки
сливаются в один объект. Материалы Paper_Print / Paper_Inner / Paper_Edge
и упакованные картинки (макет, конгрев) приезжают вместе с сетками.

Макет — полный лист развёртки, как в аддоне: PDF или AI (через PyMuPDF во
внешнем Python), JPG или PNG. Лист должен совпадать по пропорциям с шаблоном модели.

Конгрев — свой лист на том же шаблоне, что и макет (как у Формации: чёрное
выдавливается): картой нормалей в материале печати, как вафля у EM-NM
(emboss_paper).
"""

import hashlib
import os
import shutil
import subprocess
import tempfile
import types
from typing import Optional

import bmesh
import bpy
import numpy as np

PRINT = "Paper_Print"                 # имена как в cups/paper/cup_mockup/materials.py
ART_NODE = "CUPS_Artwork"
PARTS_PREFIX = "Cup_"
CUP_MOCKUP = ("cups", "paper", "cup_mockup")
RASTERIZE = CUP_MOCKUP + ("rasterize.py",)
EMBOSS_TEX = "CUPS_EmbossTex"         # узел карты рельефа (cup_mockup/materials.py EMBOSS_NODE)
INNER = "Paper_Inner"
VECTOR = (".pdf", ".ai")              # AI сохраняется PDF-совместимым — PyMuPDF читает его так же
EMBOSS_PX_PER_MM = 12.0               # карта рельефа: 0,08 мм на пиксель — кромка чистая и в Ultra


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


def rasterize(project: str, source: str, page: int = 1, dpi: int = 300, hide: bool = True) -> str:
    """Страница PDF в PNG тем же растеризатором, что у аддона: техслои скрыты
    (hide=False — все слои: у листа конгрева Формации рисунок в слое Info)."""
    py = _python()
    if not py:
        raise PaperError("для PDF нужен Python с PyMuPDF (fitz); не найден")
    cache = os.path.join(tempfile.gettempdir(), "cups_mockup_cache")
    os.makedirs(cache, exist_ok=True)
    with open(source, "rb") as fh:
        digest = hashlib.sha256(fh.read()).hexdigest()[:16]
    dest = os.path.join(cache, f"{digest}_p{page}_{dpi}_{int(hide)}.png")
    if not os.path.isfile(dest):
        res = subprocess.run([py, os.path.join(project, *RASTERIZE), source, dest, str(page), str(dpi), str(int(hide))],
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
                page: int = 1, proof: Optional[str] = None) -> Optional[dict]:
    """Макет на стакан. clean — чистый картон; art — свой лист; иначе — из файла модели.

    proof — ключ профиля картона («Имитация картона», bk/proof.py): лист
    печатается через куб, у чистого картона — белый лист тоже, как на сайте.
    """
    node = _art_node(cup)
    if clean:
        node.image = _blank()
        if proof:
            from bk import proof as proofing
            node.image = proofing.image(node.image, proof)
            return {"mode": "clean", "type": "paper", "proof": proof}
        return None
    if art:
        src = os.path.abspath(art)
        if not os.path.isfile(src):
            raise PaperError(f"{src}: макет не найден")
        path = rasterize(project, src, page) if src.lower().endswith(VECTOR) else src
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
    if proof and node.image:
        from bk import proof as proofing
        node.image = proofing.image(node.image, proof)
    img = node.image
    return {"mode": "sheet", "type": "paper", "image": img.name if img else None,
            "size_px": list(img.size) if img else None, "page_mm": entry["print"]["page_mm"],
            "source": os.path.basename(art) if art else "из файла модели",
            "variant": entry.get("variant"), "proof": proof}


# ---------------------------------------------------------------------------
# конгрев
# ---------------------------------------------------------------------------

def _cup_mockup(project: str):
    """Модули аддона cup_mockup (emboss, paper) без его __init__: регистрация
    панели аддона раннеру не нужна."""
    import importlib
    import sys
    import types
    name = "cup_mockup_core"
    if name not in sys.modules:
        pkg = types.ModuleType(name)
        pkg.__path__ = [os.path.join(project, *CUP_MOCKUP)]
        sys.modules[name] = pkg
    return importlib.import_module(name + ".emboss"), importlib.import_module(name + ".paper")


def _shift(a: np.ndarray, dy: int, dx: int) -> np.ndarray:
    out = np.zeros_like(a)
    h, w = a.shape
    out[max(dy, 0):h + min(dy, 0), max(dx, 0):w + min(dx, 0)] = a[max(-dy, 0):h + min(-dy, 0), max(-dx, 0):w + min(-dx, 0)]
    return out


def _open(mask: np.ndarray, r: int) -> np.ndarray:
    """Сужение и расширение на r пикселей: линии тоньше 2r (контур шаблона,
    волоски) пропадают, крупный рисунок остаётся прежним."""
    m = mask
    for op in (np.logical_and, np.logical_or):
        for axis_shift in ((1, 0), (0, 1)):
            acc = m.copy()
            for k in range(1, r + 1):
                acc = op(acc, _shift(m, axis_shift[0] * k, axis_shift[1] * k))
                acc = op(acc, _shift(m, -axis_shift[0] * k, -axis_shift[1] * k))
            m = acc
    return m


def relief_mask(path: str, project: str, page: int = 1, dpi: int = 400) -> tuple:
    """Лист конгрева → маска рельефа (True — выдавлено), мм на пиксель.

    Как принято у Формации, рельеф нарисован на белом листе чёрным; лист в
    обратных цветах (белое на чёрном, как вафля аддона) тоже годится —
    рельеф то, чего на листе меньше. Контур шаблона и тонкие линии отброшены.
    """
    src = os.path.abspath(path)
    if not os.path.isfile(src):
        raise PaperError(f"{src}: лист конгрева не найден")
    raster = rasterize(project, src, page, dpi, hide=False) if src.lower().endswith(VECTOR) else src
    im = bpy.data.images.load(raster, check_existing=False)
    try:
        w, h = im.size
        px = np.empty(w * h * im.channels, np.float32)
        im.pixels.foreach_get(px)
        px = px.reshape(h, w, im.channels)
    finally:
        bpy.data.images.remove(im)
    grey = px[..., :3].mean(axis=2)
    if px.shape[2] == 4:                                  # прозрачное — пустой лист
        grey = grey * px[..., 3] + (1.0 - px[..., 3])
    dark = grey < 0.5
    mask = dark if dark.mean() < 0.5 else ~dark
    mm_per_px = 25.4 / dpi if src.lower().endswith(VECTOR) else None
    r = max(1, int(round(0.15 / mm_per_px))) if mm_per_px else 2
    return _open(mask, r), (w, h)


def emboss_paper(project: str, entry: dict, cup, path: str, depth_mm: Optional[float] = None,
                 page: int = 1) -> dict:
    """Свой конгрев стакана: лист клиента → карта нормалей в материале печати.

    Как вафля у EM-NM (аддон cup_mockup, emboss.build): тот же шаблон и
    привязка, что у макета, фаска по краю; у EM-NM заменяет вафлю, у HB и DW
    ложится на гладкую стенку (обечайку). Глубина — мм, по умолчанию из
    параметров модели (0,35).
    """
    emboss, paper = _cup_mockup(project)
    model = os.path.splitext(os.path.basename(entry["blend"]))[0]
    try:
        p = paper.load_params(model)
    except FileNotFoundError:
        raise PaperError(f"{entry['key']}: нет параметров модели {model} для конгрева")
    mask, (w, h) = relief_mask(path, project, page)
    pw, ph = paper.page_of(p)
    if abs(w / h - pw / ph) > 0.025:
        raise PaperError(f"{entry['key']}: конгрев ожидается на полном листе развёртки {pw:g}×{ph:g} мм, "
                         f"а у листа пропорции {w}×{h}")
    # emboss.build берёт у листа только size и pixels: отдаём маску numpy-массивом
    # (снизу вверх, как у картинки Blender) — pixels[:] картинки на 16 млн
    # пикселей был бы кортежем в гигабайты.
    sheet = types.SimpleNamespace(size=(w, h), pixels=mask.astype(np.float32).ravel())
    # emboss.build пишет карты под постоянными именами — прежние (вафля,
    # обжим дна, карты другого стакана кадра) убираем с дороги.
    parked = {}
    for name in (emboss.IMAGE, emboss.INNER_IMAGE):
        old = bpy.data.images.get(name)
        if old is not None:
            old.name = name + "_parked"
            parked[old.name] = name
    try:
        maps = emboss.build(p, sheet, depth_mm, px_per_mm=EMBOSS_PX_PER_MM)
        tag = hashlib.sha256(f"{os.path.abspath(path)}|{depth_mm}|{model}".encode()).hexdigest()[:8]
        for im in set(maps.values()):
            im.name = f"{im.name}_{tag}"
    finally:
        for parked_name, name in parked.items():
            bpy.data.images[parked_name].name = name
    placed = 0
    for m in cup.data.materials:
        if not (m and m.node_tree):
            continue
        role = "print" if m.name.startswith(PRINT) else "inner" if m.name.startswith(INNER) else None
        node = m.node_tree.nodes.get(EMBOSS_TEX) if role else None
        if node is not None and maps.get(role) is not None:
            node.image = maps[role]
            placed += role == "print"
    if not placed:
        raise PaperError(f"{entry['key']}: в материале печати нет узла рельефа {EMBOSS_TEX}")
    depth = depth_mm if depth_mm is not None else p.get("emboss", {}).get("depth_mm", 0.35)
    return {"source": os.path.basename(path), "depth_mm": depth, "relief_share": round(float(mask.mean()), 3),
            "px_per_mm": EMBOSS_PX_PER_MM}

