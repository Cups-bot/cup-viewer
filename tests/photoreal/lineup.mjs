// Линейка масштаба: одни и те же стаканы в 3D и в «Фотореале» рядом — видно
// ли, что 120 мл меньше 500 мл (config.model.scaleFeel, SCALE_FEEL в frame.js).
//
//   npm run serve            (в соседнем терминале)
//   node tests/photoreal/lineup.mjs [стакан…]     по умолчанию 120, 280, 500, 655 мл
//
// Результат — tests/photoreal/out/lineup.png (не в git): строка 3D, строки сцен.

import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = resolve(root, 'tests/photoreal/out');
const BASE = process.env.CV_URL ?? 'http://localhost:8000/';
const cups = process.argv.slice(2);
const CUPS = cups.length ? cups : ['HB62-120', 'HB80-280', 'BM90-500', 'BM90-655'];
const ROWS = [
  { label: '3D', tab: '3d' },
  { label: 'Гостиная', tab: 'scene', sceneId: 'living' },
  { label: 'Серый фотобокс', tab: 'scene', sceneId: 'studio' },
];

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch({ args: ['--use-angle=d3d11', '--ignore-gpu-blocklist', '--enable-gpu'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 });
const errors = [];
page.on('pageerror', (error) => errors.push(error.message));
await page.goto(BASE);
await page.waitForFunction(() => window.cupViewer?.viewer);

const shots = [];
for (const row of ROWS) {
  for (const cup of CUPS) {
    await page.evaluate(async ({ row, cup }) => {
      const { viewer, state } = window.cupViewer;
      const settle = async () => {
        for (let i = 0; i < 3; i++) {
          await viewer.whenReady();
          await new Promise((r) => setTimeout(r, 300));
        }
      };
      state.set({ modelId: cup, materialId: 'coated', autoRotate: false });
      await settle();
      state.set(row.tab === '3d'
        ? { tab: '3d' }
        : { tab: 'scene', sceneId: row.sceneId, photo: { preset: null, frame: '1:1', second: null } });
      await settle();
    }, { row, cup });
    const png = await page.locator('#stage').screenshot();
    shots.push({ row: row.label, cup, src: `data:image/png;base64,${png.toString('base64')}` });
  }
}

// Склейка — той же страницей: сетка «строка × стакан».
const sheet = await browser.newPage({ viewport: { width: 1600, height: 400 }, deviceScaleFactor: 1 });
const cells = shots.map((s) => `<figure><img src="${s.src}"><figcaption>${s.row} · ${s.cup}</figcaption></figure>`).join('');
await sheet.setContent(`<style>
  body { margin: 0; padding: 12px; font: 14px system-ui; background: #fff; }
  main { display: grid; grid-template-columns: repeat(${CUPS.length}, 380px); gap: 10px; }
  figure { margin: 0; } img { width: 380px; display: block; border: 1px solid #ddd; }
  figcaption { padding: 4px 2px; color: #444; }
</style><main>${cells}</main>`);
await sheet.screenshot({ path: resolve(OUT, 'lineup.png'), fullPage: true });
await browser.close();
console.log(`lineup.png: ${ROWS.length} × ${CUPS.length}`);
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
