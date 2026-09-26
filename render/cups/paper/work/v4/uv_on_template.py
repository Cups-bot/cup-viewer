"""Draw the printed-face mesh of a model on its Formacia template.

py -3.10 work/v4/uv_on_template.py [MODEL ...]   (needs PyMuPDF; no Blender)

Rows of the mesh (profile stations) and every 8th column are drawn in page
millimetres over the template raster: green die-cut, blue visible area, red
print area.  Orange = flap edge (a = 0) and visible end (a = 1), magenta =
end of the hidden strip, cyan = registration line (s = 0).
"""
import importlib.util
import sys
from pathlib import Path

import fitz
import numpy as np
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[2]
spec = importlib.util.spec_from_file_location('paper', ROOT / 'cup_mockup/paper.py')
paper = importlib.util.module_from_spec(spec)
spec.loader.exec_module(paper)
DPI = 200
S = DPI / 25.4


def draw(model):
    p = paper.load_params(model)
    name = model.split('/')[-1]
    if name.startswith('DW'):
        prof = paper.sleeve_profile(p['sleeve'], p['inner']['cup'], p['mesh'])
    else:
        prof = paper.cup_profile(p['cup'], p['construction'], p['mesh'])
    _, _, _, s = prof.arrays()
    blank = paper.make_blank(p, 'sleeve' if name.startswith('DW') else 'wall')
    doc = fitz.open(ROOT / p['sources']['template'])
    pix = doc[0].get_pixmap(dpi=DPI, alpha=False)
    img = Image.frombytes('RGB', (pix.width, pix.height), pix.samples)
    if p['sources'].get('artwork'):      # blank templates are shown as they are
        art = Image.open(ROOT / p['sources']['artwork']).convert('RGB').resize(img.size)
        img = Image.blend(img, art, 0.35)
    d = ImageDraw.Draw(img)
    seg = p['mesh']['segments']
    a_end = blank.a_end(s)
    cols = np.arange(seg + 1) / seg

    def pt(sv, av):
        x, y = blank.page_mm(sv, av)
        return float(x) * S, float(y) * S
    for j, sv in enumerate(s):
        line = [pt(sv, a) for a in np.concatenate((cols, np.linspace(1, a_end[j], 6)[1:]))]
        d.line(line, fill=(0, 190, 255) if abs(sv) < 1e-9 else (60, 60, 60), width=3 if abs(sv) < 1e-9 else 1)
    for k in range(0, seg + 1, 8):
        d.line([pt(sv, cols[k]) for sv in s], fill=(60, 60, 60), width=1)
    d.line([pt(sv, 0.0) for sv in s], fill=(255, 140, 0), width=4)
    d.line([pt(sv, 1.0) for sv in s], fill=(255, 140, 0), width=4)
    d.line([pt(sv, a) for sv, a in zip(s, a_end)], fill=(230, 0, 200), width=4)
    out = ROOT / 'output/production' / name / 'review'
    out.mkdir(parents=True, exist_ok=True)
    img.save(out / '00_mesh_on_template.jpg', quality=88)
    print('saved', out / '00_mesh_on_template.jpg')


for m in (sys.argv[1:] or ['HB80-280', 'DW80-280']):
    draw(m)
