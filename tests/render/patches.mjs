// Таблица ΔE00 по плашкам фикстуры (b) на фронтальных кадрах (бриф 04, п. 4).
//
//   node tests/render/patches.mjs
//
// Точки замера берутся из кадра coated той же модели: по горизонтали через
// середину стакана ищутся ровные отрезки (соседние пиксели почти одного
// цвета) — это плашки; в центре каждого усредняется окно 5×5. Для каждого
// материала — ΔE00 к coated в тех же точках (у бумаги) и к исходному цвету
// плашки (у всех). Кадры: эталоны, а для новых материалов — кандидаты.
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PNG } from 'pngjs';
import { deltaE00, srgbToLab } from './color.mjs';
import { PATCHES } from './fixtures/make.mjs';

const here = dirname(fileURLToPath(import.meta.url));

const FRAMES = {
  'HB80-280': ['coated', 'uncoated', 'soft-touch', 'kraft'],
  'BM90-500': ['pp-frosted', 'pet-clear'],
};
const FILE = {
  coated: 'paper-coated-front',
  uncoated: 'paper-uncoated-front',
  'soft-touch': 'paper-softtouch-front',
  kraft: 'paper-kraft-front',
  'pp-frosted': 'pp-frosted-front',
  'pet-clear': 'pet-clear-front',
};

async function load(material) {
  for (const dir of ['baseline', 'candidates', 'out']) {
    const path = resolve(here, dir, `${FILE[material]}.png`);
    if (existsSync(path)) return PNG.sync.read(await readFile(path));
  }
  return null;
}

const at = (png, x, y) => {
  const sum = [0, 0, 0];
  for (let dy = -2; dy <= 2; dy++) {
    for (let dx = -2; dx <= 2; dx++) {
      const i = ((y + dy) * png.width + (x + dx)) * 4;
      sum[0] += png.data[i];
      sum[1] += png.data[i + 1];
      sum[2] += png.data[i + 2];
    }
  }
  return sum.map((v) => Math.round(v / 25));
};

const lab = ([r, g, b]) => srgbToLab(r, g, b);

// Ровные отрезки вдоль строки: соседи отличаются меньше чем на ΔE 2.
function samplePoints(png, y) {
  const points = [];
  let start = 0;
  let prev = lab(at(png, 2, y));
  for (let x = 3; x < png.width - 3; x++) {
    const current = lab(at(png, x, y));
    if (deltaE00(prev, current) > 2 || x === png.width - 4) {
      if (x - start >= 14) points.push(Math.round((start + x) / 2));
      start = x;
    }
    prev = current;
  }
  return points;
}

const nearestPatch = (rgb) => {
  const target = lab(rgb);
  return PATCHES.map(([name, color]) => [name, color, deltaE00(target, lab(color))]).sort((a, b) => a[2] - b[2])[0];
};

for (const [model, materials] of Object.entries(FRAMES)) {
  const reference = await load(materials[0]);
  if (!reference) continue;
  const y = Math.round(reference.height * 0.55);
  // Точки — только на стакане: отбрасываем отрезки цвета фона.
  const background = lab(at(reference, 20, y));
  const points = samplePoints(reference, y).filter((x) => deltaE00(lab(at(reference, x, y)), background) > 3);
  console.log(`\n${model}: ${points.length} плашек по строке y=${y}; эталон сравнения — ${materials[0]}`);
  console.log('материал      ΔE к эталону (mean / max)   ΔE к цвету плашки (mean)');
  for (const material of materials) {
    const png = await load(material);
    if (!png) {
      console.log(`${material.padEnd(12)}  — кадра нет`);
      continue;
    }
    const toRef = points.map((x) => deltaE00(lab(at(png, x, y)), lab(at(reference, x, y))));
    const toPatch = points.map((x) => {
      const [, color] = nearestPatch(at(reference, x, y));
      return deltaE00(lab(at(png, x, y)), lab(color));
    });
    const mean = (list) => list.reduce((a, b) => a + b, 0) / list.length;
    if (process.argv.includes('--detail')) {
      console.log(`  ${material}:`, points.map((x, i) => `${nearestPatch(at(reference, x, y))[0]} ${toRef[i].toFixed(1)}`).join(', '));
    }
    console.log(
      `${material.padEnd(12)}  ${mean(toRef).toFixed(2).padStart(6)} / ${Math.max(...toRef).toFixed(2).padStart(6)}` +
        `                ${mean(toPatch).toFixed(2).padStart(6)}`,
    );
  }
  console.log('по плашкам:', points.map((x) => nearestPatch(at(reference, x, y))[0]).join(' '));
}
