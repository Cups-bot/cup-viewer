"""Addon entry points: build the cup, load artwork, update registration, studio."""
import hashlib
import os
import shutil
import subprocess
import tempfile
from pathlib import Path

import bpy
import numpy as np

from . import build, materials, paper, studio

COLLECTION = build.COLLECTION
MODELS = ('HB80-280', 'DW80-280')


def find_python():
    candidate = Path(os.environ.get('LOCALAPPDATA', '')) / 'Programs/Python/Python310/python.exe'
    return str(candidate) if candidate.exists() else (shutil.which('python') or '')


def collection(name):
    return build.collection(name)


def clear_owned(name):
    build.clear_owned(name)


def product():
    return bpy.data.objects.get('CUPS_Product')


def printed_objects():
    root = product()
    return [o for o in (root.children if root else []) if o.type == 'MESH' and o.get('cups_print')]


def update_uv(scene):
    for obj in printed_objects():
        build.update_uv(obj, scene.cups)


def build_cup(scene):
    root = build.build(scene, scene.cups.model)
    materials.set_artwork_visible(scene.cups.show_artwork)
    return root


def _flatten_alpha(im):
    """Artwork with transparency is laid on white paper, as in print."""
    if im.channels < 4 or im.file_format not in {'PNG', 'TIFF', 'TARGA', 'WEBP', 'OPEN_EXR'}:
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
    flat = bpy.data.images.new(im.name + '_flat', w, h, alpha=False)
    flat.pixels.foreach_set(px.ravel())
    flat.update()
    bpy.data.images.remove(im)
    return flat


def _rasterize(scene, source):
    """One page of a PDF as a PNG, through the outside Python with PyMuPDF."""
    s = scene.cups
    if not Path(s.python_path).is_file():
        raise ValueError('Укажите Python с PyMuPDF и Pillow в настройках PDF.')
    cache = Path(tempfile.gettempdir()) / 'cups_mockup_cache'
    cache.mkdir(exist_ok=True)
    digest = hashlib.sha256(source.read_bytes()).hexdigest()[:16]
    raster = cache / f'{digest}_p{s.page}_{s.dpi}_{int(s.hide_guides)}.png'
    args = [s.python_path, str(Path(__file__).with_name('rasterize.py')), str(source), str(raster),
            str(s.page), str(s.dpi), '1' if s.hide_guides else '0']
    result = subprocess.run(args, capture_output=True, text=True, encoding='utf-8', errors='replace', timeout=120,
                            creationflags=getattr(subprocess, 'CREATE_NO_WINDOW', 0))
    if result.returncode:
        raise ValueError('PDF: ' + result.stderr[-600:])
    return str(raster)


def import_emboss(scene, path):
    """Load the client's black and white sheet and press it into the board.

    Same sheet as the artwork: the full page of the template (landscape A4 for
    all but EM90-530).  White is pressed outwards,
    black stays flat.  Passing None drops the emboss and leaves only the crimp
    of the bottom seal."""
    from . import emboss, materials
    old = bpy.data.images.get(emboss.HEIGHT_IMAGE)
    if path is None:
        image = None
    else:
        source = Path(path).resolve()
        if not source.is_file():
            raise ValueError('Файл не найден: ' + str(source))
        if source.suffix.lower() == '.pdf':
            path = _rasterize(scene, source)
        image = bpy.data.images.load(str(path), check_existing=False)
        w, h = image.size
        pw, ph = paper.page_of(paper.load_params(scene.cups.model))
        if abs(w / h - pw / ph) > .025:
            bpy.data.images.remove(image)
            raise ValueError(f'Конгрев ожидается на полном листе развёртки {pw:g}×{ph:g} мм')
        image.colorspace_settings.name = 'Non-Color'
        image.pack()
    p = paper.load_params(scene.cups.model)
    materials.set_emboss(emboss.build(p, image, scene.cups.emboss_depth))
    if old is not None and old is not image:
        bpy.data.images.remove(old)
    if image is not None:
        image.name = emboss.HEIGHT_IMAGE
    scene.cups.emboss_source = str(path) if path else ''
    return image


def import_art(scene, path):
    s = scene.cups
    source = Path(path).resolve()
    if not source.is_file():
        raise ValueError('Файл не найден: ' + str(source))
    if source.suffix.lower() == '.pdf':
        path = _rasterize(scene, source)
    im = bpy.data.images.load(str(path), check_existing=False)
    w, h = im.size
    pw, ph = paper.page_of(paper.load_params(s.model))
    if s.mapping == 'A4' and abs(w / h - pw / ph) > .025:
        bpy.data.images.remove(im)
        raise ValueError(f'Ожидается полный лист развёртки {pw:g}×{ph:g} мм. Для обрезанного файла нужна другая привязка.')
    # Validate first; mutate the scene only after successful decoding.
    root = product()
    if not root or root.get('model') != s.model or root.get('geometry_version') != build.GEOMETRY_VERSION:
        build_cup(scene)
    im = _flatten_alpha(im)
    old = bpy.data.images.get(materials.ART_IMAGE)
    if old:
        old.name = 'CUPS_PreviousArtwork'
    im.name = materials.ART_IMAGE
    im.colorspace_settings.name = 'sRGB'
    if not im.packed_file:
        im.pack()
    materials.set_artwork_visible(s.show_artwork)
    s.source = str(source)
    s.status = 'Загружено: ' + source.name
    return im


SEAM_VIEWS = {'CUPS_Seam_macro', 'CUPS_Rim_macro', 'CUPS_Bottom_macro', 'CUPS_Sleeve_macro'}


def apply_view(scene):
    """Camera of the selected view; seam close-ups turn the seam to the lens,
    catalogue views turn the logo to it (params: hero_rotation_deg)."""
    s = scene.cups
    if s.inspection_view not in bpy.data.objects:
        return
    if s.inspection_view in SEAM_VIEWS:
        s.rotation = 0.0
    elif s.inspection_view in {'CUPS_Hero', 'CUPS_Print'}:
        import math
        s.rotation = math.radians(paper.load_params(s.model).get('hero_rotation_deg', 0.0))
    root = product()
    if root:
        root.rotation_euler.z = s.rotation
    studio.select_view(scene, s.inspection_view)


def setup_studio(scene):
    cam = studio.setup(scene)
    apply_view(scene)
    return scene.camera or cam
