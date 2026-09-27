import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isGreen, isRed, pairFrames, refineEdges, verticalLines } from '../../js/design/templateFrames.js';

// Лист в памяти: белый, pxPerMm = 10. Рисуем пунктиры, как в шаблонах
// Формации: штрих 1,7 мм, промежуток 1,7 мм.
const PX = 10;
function sheet(wMm, hMm) {
  const width = wMm * PX;
  const height = hMm * PX;
  return { width, height, data: new Uint8ClampedArray(width * height * 4).fill(255) };
}
function dot(img, x, y, [r, g, b]) {
  if (x < 0 || y < 0 || x >= img.width || y >= img.height) return;
  const i = (y * img.width + x) * 4;
  img.data.set([r, g, b, 255], i);
}
function dashedV(img, xMm, y0Mm, y1Mm, color) {
  const x = Math.round(xMm * PX);
  for (let y = Math.round(y0Mm * PX); y <= Math.round(y1Mm * PX); y++) {
    if (Math.floor((y - y0Mm * PX) / 17) % 2 === 0) for (let dx = 0; dx < 3; dx++) dot(img, x + dx, y, color);
  }
}
function dashedH(img, yMm, x0Mm, x1Mm, color) {
  const y = Math.round(yMm * PX);
  for (let x = Math.round(x0Mm * PX); x <= Math.round(x1Mm * PX); x++) {
    if (Math.floor((x - x0Mm * PX) / 17) % 2 === 0) for (let dy = 0; dy < 3; dy++) dot(img, x, y + dy, color);
  }
}
function frame(img, x0, y0, x1, y1, color) {
  dashedV(img, x0, y0, y1, color);
  dashedV(img, x1, y0, y1, color);
  dashedH(img, y0, x0, x1, color);
  dashedH(img, y1, x0, x1, color);
}
const GREEN = [0, 166, 81];
const RED = [237, 28, 36];

test('цвета шаблона: яркий пунктир — да, тёмный логотип (Pantone 3425 C, 1805 C) — нет', () => {
  assert.ok(isGreen(...GREEN));
  assert.ok(isRed(...RED));
  assert.ok(!isGreen(0, 104, 71));
  assert.ok(!isRed(175, 38, 41));
});

test('тампопечать: две зоны 25 × 80 мм — стороны А и Б слева направо, точная высота', () => {
  const img = sheet(210, 260);
  frame(img, 40, 82.7, 65, 162.8, GREEN);
  frame(img, 136, 82.7, 161, 162.8, GREEN);
  // Логотип тёмно-зелёный — не рамка.
  for (let y = 900; y < 1200; y++) for (let x = 450; x < 600; x++) dot(img, x, y, [0, 104, 71]);
  const lines = verticalLines(img, isGreen, { pxPerMm: PX, minLenMm: 20 });
  const frames = pairFrames(lines, { pxPerMm: PX, widthMm: 25, tolMm: 2.5 }).map((f) => refineEdges(img, f, isGreen, { pxPerMm: PX }));
  assert.equal(frames.length, 2);
  const mm = frames.map((f) => [(f.x1 - f.x0) / PX, (f.y1 - f.y0) / PX, f.x0 / PX]);
  for (const [w, h] of mm) {
    assert.ok(Math.abs(w - 25) < 0.5, `ширина ${w}`);
    assert.ok(Math.abs(h - 80.1) < 0.5, `высота ${h}`);
  }
  assert.ok(mm[0][2] < mm[1][2], 'А левее Б');
});

test('шелкотрафарет: поле 204 × 77 мм по красному пунктиру; центральные зелёные линии не мешают', () => {
  const img = sheet(297, 210);
  frame(img, 45.1, 55.9, 249.1, 132.9, RED);
  for (const x of [92.6, 147.1, 201.6]) dashedV(img, x, 55.9, 132.9, GREEN);
  const lines = verticalLines(img, isRed, { pxPerMm: PX, minLenMm: 40 });
  const [f] = pairFrames(lines, { pxPerMm: PX, widthMm: 204, tolMm: 4 }).map((fr) => refineEdges(img, fr, isRed, { pxPerMm: PX }));
  assert.ok(f, 'поле найдено');
  assert.ok(Math.abs((f.x1 - f.x0) / PX - 204) < 0.5);
  assert.ok(Math.abs((f.y1 - f.y0) / PX - 77) < 0.5);
  // Зелёные центральные линии идут через 54,5 мм — в зоны 25 мм не складываются.
  const green = pairFrames(verticalLines(img, isGreen, { pxPerMm: PX, minLenMm: 20 }), { pxPerMm: PX, widthMm: 25, tolMm: 2.5 });
  assert.equal(green.length, 0);
});

test('обычный лист без рамок — рамок нет', () => {
  const img = sheet(100, 100);
  for (let y = 100; y < 400; y++) for (let x = 100; x < 400; x++) dot(img, x, y, RED);
  assert.equal(pairFrames(verticalLines(img, isRed, { pxPerMm: PX, minLenMm: 40 }), { pxPerMm: PX, widthMm: 204, tolMm: 4 }).length, 0);
});
