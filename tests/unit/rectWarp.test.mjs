import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { eraseGuides, rectPoint, sheetPoint, warpRectToSheet } from '../../js/design/rectWarp.js';
import { createCatalog } from '../../js/catalog/catalog.js';

const read = (path) => JSON.parse(readFileSync(new URL(`../../${path}`, import.meta.url), 'utf8'));
const catalog = createCatalog({
  models: read('catalog/models.json'),
  materials: read('catalog/materials.json'),
  backgrounds: read('catalog/backgrounds.json'),
  scenes: read('catalog/scenes/index.json'),
});
const model = catalog.model('DW80-280');
const rect = model.textureMapping.rect;
const guide = (id) => rect.guides.find((g) => g.id === id);

// Контуры шаблона Формации DW80-280 (Malina, слой Masks), мм листа: оболочка
// дизайнеров кладёт линии SIZE ровно на них.
const TEMPLATE = {
  visibleTop: [144.908, 50.707],
  visibleBottom: [144.908, 124.497],
  lid: [144.908, 55.407],
  visibleLeft: [[24.942, 66.568], [43.236, 137.808]],
  visibleRight: [[255.249, 63.858], [237.344, 135.448]],
  centre: [[144.867, 55.327], [144.867, 123.479]],
};

test('DW80-280: прямоугольник SIZE 221,14 × 88,57 в каталоге', () => {
  assert.ok(rect, 'нет textureMapping.rect');
  assert.deepEqual(rect.sizeMm, [221.14, 88.57]);
  assert.deepEqual(model.textureMapping.unwrapMm, [297, 210]);
});

test('туда и обратно — та же точка', () => {
  for (const [x, y] of [[30.49, 53.48], [141.06, 97.76], [251.63, 142.05], [33.63, 133.77]]) {
    const [X, Y] = sheetPoint(rect, x, y);
    const [bx, by] = rectPoint(rect, X, Y);
    assert.ok(Math.abs(bx - x) < 1e-9 && Math.abs(by - y) < 1e-9, `${x}, ${y} → ${bx}, ${by}`);
  }
});

test('линии SIZE ложатся на контуры шаблона ≤ 0,6 мм', () => {
  const [visTop, visBottom] = guide('visible').y;
  const [visLeft, visRight] = guide('visible').x;
  const check = (point, axis, want, what) => {
    const got = rectPoint(rect, ...point)[axis];
    assert.ok(Math.abs(got - want) <= 0.6, `${what}: ${got.toFixed(2)} вместо ${want}`);
  };
  check(TEMPLATE.visibleTop, 1, visTop, 'верх видимой зоны');
  check(TEMPLATE.visibleBottom, 1, visBottom, 'низ видимой зоны');
  check(TEMPLATE.lid, 1, guide('lid').y[0], 'линия крышки');
  for (const p of TEMPLATE.visibleLeft) check(p, 0, visLeft, 'левый край видимой зоны');
  for (const p of TEMPLATE.visibleRight) check(p, 0, visRight, 'правый край видимой зоны');
  for (const p of TEMPLATE.centre) check(p, 0, guide('centre').x[1], 'центральная линия');
});

// Точки шва на развёртке модели DW80-280.glb (UV × лист 297 × 210), мм: азимут
// начала полосы и он же через полный оборот (под нахлёстом) — на трёх высотах.
const SEAM = [
  [[35.947, 109.469], [244.448, 107.046]],
  [[30.219, 87.111], [250.049, 84.663]],
  [[24.509, 64.758], [255.669, 62.297]],
];

test('шов сходится: оборот стакана — ширина видимой зоны SIZE', () => {
  const [left, right] = guide('visible').x;
  for (const [a, b] of SEAM) {
    const [xa, ya] = rectPoint(rect, ...a);
    const [xb, yb] = rectPoint(rect, ...b);
    assert.ok(Math.abs(xb - xa - (right - left)) < 0.1, `оборот ${(xb - xa).toFixed(2)} мм вместо ${(right - left).toFixed(2)}`);
    assert.ok(Math.abs(yb - ya) < 0.2, `высота по разные стороны шва: ${ya.toFixed(2)} и ${yb.toFixed(2)}`);
    assert.ok(Math.abs(xa - left) < 0.5, `шов на ${xa.toFixed(2)} мм, а видимая зона начинается на ${left}`);
  }
});

test('растр: четверти прямоугольника встают на свои места конуса, вне конуса — не тронуто', () => {
  const colors = [[255, 0, 0], [0, 255, 0], [0, 0, 255], [255, 255, 0]];
  const sw = 40;
  const sh = 16;
  const src = { width: sw, height: sh, data: new Uint8ClampedArray(sw * sh * 4) };
  for (let j = 0; j < sh; j++) {
    for (let i = 0; i < sw; i++) {
      const c = colors[(j < sh / 2 ? 0 : 2) + (i < sw / 2 ? 0 : 1)];
      src.data.set([...c, 255], (j * sw + i) * 4);
    }
  }
  const pxPerMm = 2;
  const out = { width: 297 * pxPerMm, height: 210 * pxPerMm, data: new Uint8ClampedArray(297 * pxPerMm * 210 * pxPerMm * 4) };
  warpRectToSheet(src, out, rect, pxPerMm);
  const [ax, ay] = rect.atMm;
  const [rw, rh] = rect.sizeMm;
  const at = (x, y) => {
    const [X, Y] = sheetPoint(rect, x, y);
    const q = (Math.floor(Y * pxPerMm) * out.width + Math.floor(X * pxPerMm)) * 4;
    return [...out.data.slice(q, q + 4)];
  };
  assert.deepEqual(at(ax + rw * 0.25, ay + rh * 0.25), [255, 0, 0, 255]);
  assert.deepEqual(at(ax + rw * 0.75, ay + rh * 0.25), [0, 255, 0, 255]);
  assert.deepEqual(at(ax + rw * 0.25, ay + rh * 0.75), [0, 0, 255, 255]);
  assert.deepEqual(at(ax + rw * 0.75, ay + rh * 0.75), [255, 255, 0, 255]);
  assert.deepEqual([...out.data.slice(0, 4)], [0, 0, 0, 0], 'угол листа — вне конуса');
});

test('направляющие SIZE поверх рисунка стираются, рисунок и цвет вне линий — нет', () => {
  const pxPerMm = 10;
  const width = 200;
  const height = 120;
  const img = { width, height, data: new Uint8ClampedArray(width * height * 4) };
  const put = (i, j, c) => img.data.set([...c, 255], (j * width + i) * 4);
  for (let j = 0; j < height; j++) for (let i = 0; i < width; i++) put(i, j, i < 100 ? [250, 250, 250] : [30, 40, 60]);
  // Красный квадрат рисунка — далеко от линий.
  for (let j = 80; j < 100; j++) for (let i = 20; i < 40; i++) put(i, j, [237, 28, 36]);
  // Синяя направляющая по y = 4 мм: пунктир, с полупрозрачным краем.
  const blue = [71, 97, 172];
  for (let i = 0; i < width; i++) {
    if (i % 30 > 20) continue;
    for (const [dj, a] of [[39, 0.5], [40, 1], [41, 0.5]]) {
      const q = (dj * width + i) * 4;
      for (let c = 0; c < 3; c++) img.data[q + c] = img.data[q + c] * (1 - a) + blue[c] * a;
    }
  }
  const erased = eraseGuides(img, [{ color: '#4761ac', y: [4.05] }], pxPerMm);
  assert.ok(erased > 0);
  const px = (i, j) => [...img.data.slice((j * width + i) * 4, (j * width + i) * 4 + 3)];
  for (const i of [5, 50, 105, 150]) {
    const want = i < 100 ? [250, 250, 250] : [30, 40, 60];
    for (const j of [39, 40, 41]) {
      const got = px(i, j);
      assert.ok(got.every((v, c) => Math.abs(v - want[c]) <= 3), `пиксель ${i},${j}: ${got}`);
    }
  }
  assert.deepEqual(px(30, 90), [237, 28, 36]);
});
