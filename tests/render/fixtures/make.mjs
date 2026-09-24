// Фикстуры для render:check — генерируются, руками не рисуются.
//
//   (a) lines    — белое поле, линии 0,5 pt и текст 5 pt чёрным;
//   (b) patches  — плашки sRGB (белый, чёрный, C, M, Y, R, G, B, серый 50 %);
//   (c) gradient — горизонтальный градиент чёрный → белый.
//
// Размер — под развёртку каждой модели матрицы (tests/render/matrix.mjs), 300 dpi.
//   node tests/render/fixtures/make.mjs
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PNG } from 'pngjs';
import { FIXTURE_MODELS } from '../matrix.mjs';
import { fixtureName } from './names.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const DPI = 300;
const PX_PER_MM = DPI / 25.4;
const PT_MM = 25.4 / 72;

export const PATCHES = [
  ['white', [255, 255, 255]],
  ['black', [0, 0, 0]],
  ['cyan', [0, 174, 239]],
  ['magenta', [236, 0, 140]],
  ['yellow', [255, 242, 0]],
  ['red', [255, 0, 0]],
  ['green', [0, 255, 0]],
  ['blue', [0, 0, 255]],
  ['gray50', [128, 128, 128]],
];

// Растровый шрифт 5×7: только то, что пишем на фикстуре.
const GLYPHS = {
  '0': ['01110', '10001', '10011', '10101', '11001', '10001', '01110'],
  '1': ['00100', '01100', '00100', '00100', '00100', '00100', '01110'],
  '2': ['01110', '10001', '00001', '00010', '00100', '01000', '11111'],
  '3': ['11110', '00001', '00001', '01110', '00001', '00001', '11110'],
  '4': ['00010', '00110', '01010', '10010', '11111', '00010', '00010'],
  '5': ['11111', '10000', '11110', '00001', '00001', '10001', '01110'],
  '6': ['00110', '01000', '10000', '11110', '10001', '10001', '01110'],
  '7': ['11111', '00001', '00010', '00100', '01000', '01000', '01000'],
  '8': ['01110', '10001', '10001', '01110', '10001', '10001', '01110'],
  '9': ['01110', '10001', '10001', '01111', '00001', '00010', '01100'],
  A: ['01110', '10001', '10001', '11111', '10001', '10001', '10001'],
  C: ['01110', '10001', '10000', '10000', '10000', '10001', '01110'],
  E: ['11111', '10000', '10000', '11110', '10000', '10000', '11111'],
  K: ['10001', '10010', '10100', '11000', '10100', '10010', '10001'],
  P: ['11110', '10001', '10001', '11110', '10000', '10000', '10000'],
  R: ['11110', '10001', '10001', '11110', '10100', '10010', '10001'],
  T: ['11111', '00100', '00100', '00100', '00100', '00100', '00100'],
  U: ['10001', '10001', '10001', '10001', '10001', '10001', '01110'],
  V: ['10001', '10001', '10001', '10001', '10001', '01010', '00100'],
  W: ['10001', '10001', '10001', '10101', '10101', '10101', '01010'],
  X: ['10001', '10001', '01010', '00100', '01010', '10001', '10001'],
  ' ': ['00000', '00000', '00000', '00000', '00000', '00000', '00000'],
  '-': ['00000', '00000', '00000', '11111', '00000', '00000', '00000'],
};

function canvas(width, height, fill = [255, 255, 255]) {
  const png = new PNG({ width, height });
  for (let i = 0; i < width * height; i++) {
    png.data[i * 4] = fill[0];
    png.data[i * 4 + 1] = fill[1];
    png.data[i * 4 + 2] = fill[2];
    png.data[i * 4 + 3] = 255;
  }
  return png;
}

function rect(png, x0, y0, w, h, color) {
  const x1 = Math.min(png.width, Math.round(x0 + w));
  const y1 = Math.min(png.height, Math.round(y0 + h));
  for (let y = Math.max(0, Math.round(y0)); y < y1; y++) {
    for (let x = Math.max(0, Math.round(x0)); x < x1; x++) {
      const i = (y * png.width + x) * 4;
      png.data[i] = color[0];
      png.data[i + 1] = color[1];
      png.data[i + 2] = color[2];
    }
  }
}

// Текст высотой capMm (высота заглавной = 7 точек шрифта).
function text(png, x, y, string, capMm) {
  const dot = (capMm * PX_PER_MM) / 7;
  let cursor = x;
  for (const char of string) {
    const glyph = GLYPHS[char] ?? GLYPHS[' '];
    glyph.forEach((row, gy) => {
      [...row].forEach((bit, gx) => {
        if (bit === '1') rect(png, cursor + gx * dot, y + gy * dot, dot, dot, [0, 0, 0]);
      });
    });
    cursor += 6 * dot;
  }
  return cursor - x;
}

function lines(width, height) {
  const png = canvas(width, height);
  const line = Math.max(1, 0.5 * PT_MM * PX_PER_MM);
  // Кегль 5 pt ≈ высота прописной 0,7 кегля.
  const cap = 5 * PT_MM * 0.7;
  const pitch = 8 * PX_PER_MM;
  for (let y = pitch / 2; y < height; y += pitch) rect(png, 0, y, width, line, [0, 0, 0]);
  for (let x = pitch / 2; x < width; x += pitch * 2) rect(png, x, 0, line, height, [0, 0, 0]);
  const label = '5PT TEXT 0123456789 ';
  for (let row = 0, y = pitch / 2 + 1.2 * PX_PER_MM; y < height - cap * PX_PER_MM; row++, y += pitch) {
    for (let x = (row % 2) * 20 * PX_PER_MM; x < width; ) x += text(png, x, y, label, cap);
  }
  return png;
}

function patches(width, height) {
  const png = canvas(width, height);
  // Четыре ряда плашек по развёртке: спереди видны все девять целиком.
  const columns = PATCHES.length * 4;
  const step = width / columns;
  for (let c = 0; c < columns; c++) {
    rect(png, Math.floor(c * step), 0, Math.ceil(step), height, PATCHES[c % PATCHES.length][1]);
  }
  return png;
}

function gradient(width, height) {
  const png = canvas(width, height);
  for (let x = 0; x < width; x++) {
    const v = Math.round((x / (width - 1)) * 255);
    rect(png, x, 0, 1, height, [v, v, v]);
  }
  return png;
}

export const FIXTURES = { lines, patches, gradient };

async function main() {
  await mkdir(here, { recursive: true });
  for (const { id, unwrapMm } of FIXTURE_MODELS) {
    const width = Math.round(unwrapMm[0] * PX_PER_MM);
    const height = Math.round(unwrapMm[1] * PX_PER_MM);
    for (const [kind, draw] of Object.entries(FIXTURES)) {
      const file = resolve(here, fixtureName(id, kind));
      await writeFile(file, PNG.sync.write(draw(width, height)));
      console.log(`${fixtureName(id, kind)}  ${width}×${height}`);
    }
  }
}

if (resolve(process.argv[1] ?? '') === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
