"""Фон-снимок под кадром (bk/plate.py) без Blender: python -m unittest render/engine/tests/test_plate.py

Сверка с Blender (шейдер мира ↔ подкладка, без диафрагмы, «Осенний парк»,
2026-09-27): средняя разница по пикселям фона 1,1/255, p99 — 6/255."""

import os
import sys
import unittest

import numpy as np

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from bk import plate  # noqa: E402


class Neutral(unittest.TestCase):
    def test_midtones_pass_through(self):
        # ниже порога сжатия — только сдвиг чёрного (offset 0,04)
        c = np.array([[0.3, 0.2, 0.5]])
        self.assertTrue(np.allclose(plate.pbr_neutral(c), c - 0.04, atol=1e-6))

    def test_highlights_compress_below_one(self):
        c = np.array([[4.0, 3.0, 2.0], [1.0, 1.0, 1.0]])
        out = plate.pbr_neutral(c)
        self.assertTrue(np.all(out < 1.0))
        # пик — у самой единицы, порядок каналов сохранён, яркий блик светлеет к белому
        self.assertGreater(out[0].max(), 0.95)
        self.assertTrue(out[0, 0] > out[0, 1] > out[0, 2])
        self.assertGreater(out[0, 2] / out[0, 0], 2.0 / 4.0)

    def test_monotonic_grey(self):
        g = np.linspace(0, 8, 400)
        out = plate.pbr_neutral(np.stack([g, g, g], -1))[:, 0]
        self.assertTrue(np.all(np.diff(out) >= -1e-7))


class Grade(unittest.TestCase):
    def test_identity_by_default(self):
        d = np.random.default_rng(1).random((8, 8, 3))
        self.assertIs(plate.grade(d), d)

    def test_calmer(self):
        d = np.array([[[0.9, 0.5, 0.1], [0.98, 0.97, 0.95], [0.2, 0.2, 0.2]]])
        g = plate.grade(d, sat=0.8, contrast=0.9, knee=0.85)
        self.assertLess(np.ptp(g[0, 0]), np.ptp(d[0, 0]))       # меньше насыщенность
        self.assertLess(g[0, 1].max(), d[0, 1].max())            # яркое пятно прижато
        self.assertGreater(g[0, 2, 0], d[0, 2, 0])               # тени к середине
        self.assertTrue(np.all((g >= 0) & (g <= 1)))


class Sample(unittest.TestCase):
    def setUp(self):
        self.img = np.arange(12, dtype=np.float32).reshape(3, 4, 1).repeat(3, axis=2)

    def test_pixel_centres_exact(self):
        px, py = np.array([[1.0]]), np.array([[2.0]])
        self.assertAlmostEqual(float(plate.sample(self.img, px, py)[0, 0, 0]), float(self.img[2, 1, 0]))

    def test_mirror_edges(self):
        # за правым краем — зеркально: x = 4 → столбец 3, x = 5 → столбец 2
        px, py = np.array([[4.0, 5.0]]), np.array([[0.0, 0.0]])
        v = plate.sample(self.img, px, py)[0, :, 0]
        self.assertTrue(np.allclose(v, [self.img[0, 3, 0], self.img[0, 2, 0]]))

    def test_bilinear_midpoint(self):
        px, py = np.array([[0.5]]), np.array([[0.0]])
        self.assertAlmostEqual(float(plate.sample(self.img, px, py)[0, 0, 0]), 0.5)


if __name__ == "__main__":
    unittest.main()
