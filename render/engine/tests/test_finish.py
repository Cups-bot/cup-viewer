"""«Камера» (bk/finish.py) без Blender: python -m unittest render/engine/tests/test_finish.py"""

import os
import sys
import unittest

import numpy as np

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from bk import finish  # noqa: E402


def srgb2lab(rgb):
    lin = finish.to_linear(np.asarray(rgb, np.float64))
    m = np.array([[0.4124, 0.3576, 0.1805], [0.2126, 0.7152, 0.0722], [0.0193, 0.1192, 0.9505]])
    xyz = lin @ m.T / np.array([0.95047, 1.0, 1.08883])
    f = np.where(xyz > 0.008856, np.cbrt(xyz), 7.787 * xyz + 16 / 116)
    return np.stack([116 * f[..., 1] - 16, 500 * (f[..., 0] - f[..., 1]), 200 * (f[..., 1] - f[..., 2])], -1)


class Curve(unittest.TestCase):
    def test_pivot_and_ends_stay(self):
        L = np.array([0.0, finish.PIVOT, 1.0])
        self.assertTrue(np.allclose(finish.curve(L, 0.14), L, atol=1e-6))

    def test_monotonic_and_contrast(self):
        L = np.linspace(0, 1, 1001)
        y = finish.curve(L, 0.14)
        self.assertTrue(np.all(np.diff(y) > 0))
        i = int(finish.PIVOT * 1000)
        self.assertAlmostEqual((y[i + 1] - y[i - 1]) / (L[i + 1] - L[i - 1]), 1.14, places=2)

    def test_grey_card_keeps_value(self):
        card = np.full((8, 8, 3), finish.PIVOT, np.float32)
        out = finish.tone(card, 0.14)
        self.assertTrue(np.allclose(out, card, atol=1e-4))

    def test_print_hue_kept(self):
        # Типичные плашки печати: оттенок (угол в Lab) после кривой почти тот же.
        colors = np.array([[0.13, 0.15, 0.30], [0.80, 0.10, 0.20], [0.20, 0.55, 0.25],
                           [0.95, 0.75, 0.10], [0.45, 0.45, 0.45], [0.10, 0.45, 0.75]], np.float32)
        out = finish.tone(colors[None], 0.14)[0]
        a, b = srgb2lab(colors), srgb2lab(out)
        hue = np.degrees(np.arctan2(a[:, 2], a[:, 1]))
        hue2 = np.degrees(np.arctan2(b[:, 2], b[:, 1]))
        chroma = np.hypot(a[:, 1], a[:, 2])
        d = np.abs((hue - hue2 + 180) % 360 - 180)[chroma > 5]
        self.assertLess(d.max(), 3.0, d)


class Finish(unittest.TestCase):
    def setUp(self):
        y, x = np.mgrid[0:200, 0:240].astype(np.float32)
        self.img = np.stack([x / 240, y / 200, np.full_like(x, 0.4)], -1)

    def test_range_and_determinism(self):
        a = finish.finish(self.img, seed=3)
        b = finish.finish(self.img, seed=3)
        self.assertEqual(a.shape, self.img.shape)
        self.assertTrue(np.array_equal(a, b))
        self.assertGreaterEqual(a.min(), 0.0)
        self.assertLessEqual(a.max(), 1.0)

    def test_vignette_darkens_corners_only(self):
        grey = np.full((300, 300, 3), 0.5, np.float32)
        v = finish.vignette(grey, 0.30)
        self.assertAlmostEqual(float(v[150, 150, 0]), 0.5, places=3)
        self.assertLess(float(v[0, 0, 0]), 0.46)

    def test_grain_level_in_midtones(self):
        grey = np.full((400, 400, 3), 0.5, np.float32)
        g = finish.grain(grey, 0.007, 1.0, seed=1)
        self.assertAlmostEqual(float(g[..., 0].std()), 0.007, delta=0.0015)
        self.assertAlmostEqual(float(g.mean()), 0.5, delta=0.001)

    def test_alpha_passes_through(self):
        rgba = np.concatenate([self.img, np.full((200, 240, 1), 0.7, np.float32)], -1)
        out = finish.finish(rgba, seed=1)
        self.assertTrue(np.allclose(out[..., 3], 0.7))


if __name__ == "__main__":
    unittest.main()
