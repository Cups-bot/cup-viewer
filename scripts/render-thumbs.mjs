// Превью стаканов для окна выбора: каждая модель каталога снимается тем же
// движком, что и сцена, — белый лист, материал по умолчанию, вид спереди.
// Два набора: на светлом и на тёмном фоне, под тему страницы.
//
//   npm run serve            (в соседнем терминале)
//   node scripts/render-thumbs.mjs [--only HB80-280,DW80-280]
//
// Результат — assets/thumbs/{light,dark}/<id>.webp. Пересобирать после
// правки света, материалов или каталога моделей.

import { chromium } from 'playwright';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const BASE = process.env.CV_URL ?? 'http://localhost:8000/';
// Под карточку 3:4 при плотности 2×.
const SIZE = { width: 360, height: 480 };
// Во сколько раз камера дальше, чем при кадрировании сцены.
const AIR = 1.32;
const SETS = [
  { name: 'light', background: 'light' },
  { name: 'dark', background: 'dark' },
];

const onlyArg = process.argv.indexOf('--only');
const only = onlyArg > 0 ? process.argv[onlyArg + 1].split(',') : null;
const catalog = JSON.parse(await readFile(resolve(root, 'catalog/models.json'), 'utf8'));
const models = catalog.models.filter((model) => !only || only.includes(model.id));

// Настоящий GPU: SwiftShader снимал бы минуты и без сглаживания.
const browser = await chromium.launch({ args: ['--use-angle=d3d11', '--ignore-gpu-blocklist', '--enable-gpu'] });
const page = await browser.newPage({ viewport: { width: 900, height: 900 }, deviceScaleFactor: 1 });
const errors = [];
page.on('pageerror', (error) => errors.push(error.message));
await page.goto(BASE);
await page.waitForFunction(() => window.cupViewer?.viewer && window.ViewerState);

for (const set of SETS) {
  await mkdir(resolve(root, 'assets/thumbs', set.name), { recursive: true });
}

for (const model of models) {
  await page.evaluate((id) => window.ViewerState.set({ modelId: id, autoRotate: false, design: null }), model.id);
  await page.evaluate(() => window.cupViewer.viewer.whenReady());
  for (const set of SETS) {
    await page.evaluate((bg) => window.ViewerState.set({ backgroundId: bg }), set.background);
    await page.waitForTimeout(400);
    const url = await page.evaluate(({ width, height, air }) => {
      const viewer = window.cupViewer.viewer;
      viewer.setView('front', { animate: false });
      // Воздух вокруг стакана: камера отъезжает от кадрирования сцены.
      const { camera, controls } = viewer;
      camera.position.sub(controls.target).multiplyScalar(air).add(controls.target);
      controls.update();
      return viewer.renderStill({ width, height }).toDataURL('image/webp', 0.9);
    }, { ...SIZE, air: AIR });
    const file = resolve(root, 'assets/thumbs', set.name, `${model.id}.webp`);
    await writeFile(file, Buffer.from(url.split(',')[1], 'base64'));
  }
  console.log(model.id);
}

await browser.close();
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
