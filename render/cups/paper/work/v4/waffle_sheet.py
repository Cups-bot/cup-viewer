"""Waffle emboss of the EM cups as a black and white A4 sheet.

NOT USED since 25.09.2026: the client supplied the waffle as an SVG on the A4
sheet, and it is pressed into the wrap's mesh — work/v4/relief_from_svg.py and
cup_mockup/relief.py.  Kept for the record of how the first version was made.

py -3.10 work/v4/waffle_sheet.py EM80-280

The pattern is a regular diamond lattice drawn in the coordinates of the
blank, exactly as it is pressed into the flat board: pillows raised, the
grooves between them pressed.  Step and groove width are measured off the
«EMBO Waffle» layer of the Formacia template; the lattice itself is generated,
so it covers the whole visible surface with no torn edges and no bare strips.
"""
import importlib.util
import sys
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
spec = importlib.util.spec_from_file_location('paper', ROOT / 'cup_mockup/paper.py')
paper = importlib.util.module_from_spec(spec)
spec.loader.exec_module(paper)
CELL_MM = 6.6            # side of one diamond cell, measured on the template
FLAT_MM = 10.0           # plain margin at the flap edge: at the seam it lies on top
PX_PER_MM = 8.0


def sheet(model, cell=CELL_MM, flat=FLAT_MM, px_per_mm=PX_PER_MM):
    p = paper.load_params(model)
    blank = paper.make_blank(p, 'wrap' if 'wrap' in p else 'wall')
    w = int(round(paper.A4_MM[0] * px_per_mm))
    h = int(round(paper.A4_MM[1] * px_per_mm))
    X, Y = np.meshgrid((np.arange(w) + .5) * paper.A4_MM[0] / w,
                       (np.arange(h) + .5) * paper.A4_MM[1] / h)
    # Diamond quilt: one smooth pillow per cell, zero along both families of
    # lines, so the relief has no thin ridges to alias against the map.
    u, v = (X + Y) / cell, (X - Y) / cell
    pillow = (np.sin(np.pi * u) ** 2 * np.sin(np.pi * v) ** 2) ** 0.7
    # only where the board is: the die-cut of the blank, softened at the edge
    R = np.hypot(X - blank.cx, blank.cy - Y)
    th = np.degrees(np.arctan2(X - blank.cx, blank.cy - Y))
    hi = paper.Blank._edge(blank.die['right_deg'], R)
    fade = 0.6
    # On the cup the flap lies on top of the strip, and its own edge carries a
    # plain margin about a centimetre wide — that is the flat band you see at
    # the seam on the real cup.  The other edge is embossed right up to the cut.
    left = paper.Blank._edge(blank.vis['left_deg'], R)
    arc = (th - left) * R / 57.2958                     # millimetres from the flap edge
    inside = (paper.smooth01((R - blank.die['R_bottom_mm']) / fade)
              * (1 - paper.smooth01((R - blank.die['R_top_mm']) / fade))
              * paper.smooth01((arc - flat) / fade)
              * (1 - paper.smooth01((th - hi) * R / 57.2958 / fade)))
    out = np.clip(pillow * inside, 0, 1)
    dest = ROOT / 'Mockups/EM' / f'{model}_waffle_A4.png'
    dest.parent.mkdir(parents=True, exist_ok=True)
    Image.fromarray((out * 255).astype(np.uint8)).save(dest)
    print('saved', dest, f'({w}x{h}), ячейка {cell} мм, плоское поле у клапана {flat} мм')
    return dest


if __name__ == '__main__':
    for m in sys.argv[1:]:
        sheet(m)
