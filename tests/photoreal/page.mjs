// Снимок страницы «Фотореал» целиком: как выглядит панель на десктопе и на
// телефоне (§45). Встроенный браузер при эмуляции ширины снимает четверть
// кадра, поэтому — свой Playwright.
//
//   npm run serve            (в соседнем терминале)
//   node tests/photoreal/page.mjs [ширина…]      по умолчанию 1280 и 390
//
// Результат — tests/photoreal/out/page-<ширина>.png (не в git).

import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = resolve(root, 'tests/photoreal/out');
const BASE = process.env.CV_URL ?? 'http://localhost:8000/';
const widths = process.argv.slice(2).map(Number).filter(Boolean);

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch({ args: ['--use-angle=d3d11', '--ignore-gpu-blocklist', '--enable-gpu'] });
const errors = [];
for (const width of widths.length ? widths : [1280, 390]) {
  const page = await browser.newPage({ viewport: { width, height: width < 600 ? 844 : 900 }, deviceScaleFactor: 1 });
  page.on('pageerror', (error) => errors.push(`${width}: ${error.message}`));
  await page.goto(BASE);
  await page.waitForFunction(() => window.cupViewer?.viewer);
  await page.evaluate(async () => {
    const { viewer, state } = window.cupViewer;
    const settle = async () => {
      for (let i = 0; i < 3; i++) {
        await viewer.whenReady();
        await new Promise((r) => setTimeout(r, 300));
      }
    };
    state.set({ modelId: 'HB80-280', materialId: 'coated', autoRotate: false });
    await settle();
    state.set({ tab: 'scene', sceneId: 'living' });
    await settle();
  });
  // Выбор делаем кнопками панели — как человек: пара, формат 4:5. На узком
  // экране группы панели открываются вкладками.
  const tab = async (id) => {
    const button = page.locator(`#photo-tabs [data-group="${id}"]`);
    if (await button.isVisible()) await button.click();
  };
  await tab('second');
  await page.locator('#photo-second .second-row').nth(1).click();
  await tab('frame');
  await page.locator('#photo-frames [data-id="4:5"]').click();
  await tab('scene');
  await page.waitForTimeout(1500);
  await page.evaluate(() => window.cupViewer.viewer.whenReady());
  await page.screenshot({ path: resolve(OUT, `page-${width}.png`) });
  // И та же страница в тёмной теме.
  await page.locator('[data-theme-set="dark"]').first().click();
  await page.waitForTimeout(800);
  await page.screenshot({ path: resolve(OUT, `page-${width}-dark.png`) });
  console.log(`page-${width}: ${JSON.stringify(await page.evaluate(() => window.cupViewer.viewer.photoJob()))}`);
  await page.close();
}
await browser.close();
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
