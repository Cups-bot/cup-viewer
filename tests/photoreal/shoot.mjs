// Снимки фото-сцены сайта — глазами посмотреть кадр целиком (встроенный
// браузер при эмуляции ширины снимает четверть кадра, см. CLAUDE.md).
//
//   npm run serve            (в соседнем терминале)
//   node tests/photoreal/shoot.mjs living:front:1:1:HB80-280 living:high:4:5:HB80-280+HB80-280
//
// Кадр — «сцена:ракурс:формат:главный[+второй]» («+» — пара, «~» — рядом).
// Результат — tests/photoreal/out/<кадр>.png (не в git).

import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = resolve(root, 'tests/photoreal/out');
const BASE = process.env.CV_URL ?? 'http://localhost:8000/';

function parse(spec) {
  const [scene, preset, a, b, cups] = spec.split(':');
  const frame = `${a}:${b}`;
  const kind = cups.includes('+') ? 'pair' : cups.includes('~') ? 'side' : null;
  const [hero, second] = cups.split(/[+~]/);
  return { spec, scene, preset, frame, hero, second, kind };
}

const shots = process.argv.slice(2).map(parse);
if (!shots.length) {
  console.error('нужен хотя бы один кадр: сцена:ракурс:формат:стакан[+второй]');
  process.exit(2);
}
await mkdir(OUT, { recursive: true });

// Настоящий GPU: на SwiftShader кадр идёт минуты.
const browser = await chromium.launch({ args: ['--use-angle=d3d11', '--ignore-gpu-blocklist', '--enable-gpu'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 });
const errors = [];
page.on('pageerror', (error) => errors.push(error.message));
await page.goto(BASE);
await page.waitForFunction(() => window.cupViewer?.viewer);

for (const shot of shots) {
  const job = await page.evaluate(async (s) => {
    const { viewer, state } = window.cupViewer;
    const settle = async () => {
      for (let i = 0; i < 3; i++) {
        await viewer.whenReady();
        await new Promise((r) => setTimeout(r, 250));
      }
    };
    state.set({ modelId: s.hero, autoRotate: false });
    await settle();
    viewer.rotateModelTo(0);
    state.set({
      tab: 'scene',
      sceneId: s.scene,
      photo: { preset: s.preset, frame: s.frame, second: s.second ? { modelId: s.second, kind: s.kind } : null },
    });
    await settle();
    viewer.invalidateModel();
    await settle();
    return viewer.photoJob();
  }, shot);
  const name = shot.spec.replace(/[:+~]/g, '_');
  await page.locator('#canvas-container canvas').first().screenshot({ path: resolve(OUT, `${name}.png`) });
  console.log(`${name}: ${JSON.stringify(job)}`);
}

await browser.close();
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
