// Сверка «Фотореала» сайта с рендером Blender (этап Б5, приёмка — ≤ 2 px).
//
// Путь тот же, что у настоящего задания: сайт собирает сцену и задание
// (viewer.photoJob — фон, ракурс, формат, стаканы с местами), рисует силуэт
// стаканов (viewer.renderSilhouette); Blender по этому же заданию снимает
// маску (render/engine/tools/preview_mask.py). Совпасть должны и силуэты, и
// окно кадра.
//
//   npm run serve                          (в соседнем терминале)
//   node tests/photoreal/check.mjs         всё: сайт → Blender → сравнение
//   node tests/photoreal/check.mjs --compare   только сравнить снятое
//
// Blender — один процесс с пониженным приоритетом (ноутбук владельца, см.
// CLAUDE.md). Путь к нему — BLENDER или стандартный. Результат — в
// tests/photoreal/out/ (не в git).

import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { constants, setPriority } from 'node:os';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PNG } from 'pngjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = resolve(root, 'tests/photoreal/out');
const SITE = resolve(OUT, 'site');
const JOBS = resolve(OUT, 'jobs');
const MASKS = resolve(OUT, 'blender');
const BASE = process.env.CV_URL ?? 'http://localhost:8000/';
const BLENDER = process.env.BLENDER ?? 'C:\\Program Files\\Blender Foundation\\Blender 5.2\\blender.exe';
const LONG_SIDE = 800;
const LIMIT_PX = 2;

// Все 7 сцен, одиночные и пары, «рядом», три формата, бумага, PP и PET.
const CASES = [
  { name: '01_living_front_120', scene: 'living', preset: 'front', frame: '1:1', hero: 'HB62-120' },
  { name: '02_living_high_pair_4x5', scene: 'living', preset: 'high', frame: '4:5', hero: 'HB80-280', second: 'HB80-280', kind: 'pair' },
  { name: '03_window_low_dw_side_3x4', scene: 'window', preset: 'low', frame: '3:4', hero: 'DW80-280', second: 'DW90-430', kind: 'side' },
  { name: '04_studio_top_mix', scene: 'studio', preset: 'top', frame: '1:1', hero: 'HB62-120', second: 'HB90-530', kind: 'side' },
  { name: '05_window_high_dw_pair', scene: 'window', preset: 'high', frame: '1:1', hero: 'DW80-280', second: 'DW80-280', kind: 'pair' },
  { name: '06_spotlight_left_4x5', scene: 'spotlight', preset: 'left', frame: '4:5', hero: 'HB70-180', second: 'DW90-430', kind: 'side' },
  { name: '07_water_high_655', scene: 'water', preset: 'high', frame: '1:1', hero: 'BM90-655' },
  { name: '08_podium_left_dw_3x4', scene: 'podium', preset: 'left', frame: '3:4', hero: 'DW90-430' },
  { name: '09_cream_low_em', scene: 'cream', preset: 'low', frame: '1:1', hero: 'EM90-430' },
  { name: '10_living_right_pp_pair', scene: 'living', preset: 'right', frame: '1:1', hero: 'BM90-500', second: 'BM90-500', kind: 'pair' },
  { name: '11_studio_front_pet', scene: 'studio', preset: 'front', frame: '1:1', hero: 'PG95-520' },
  { name: '12_window_front_pet_pair', scene: 'window', preset: 'front', frame: '4:5', hero: 'PG95-400', second: 'PG95-400', kind: 'pair' },
];

const ASPECT = { '1:1': 1, '3:4': 0.75, '4:5': 0.8 };
const pixels = (frame) => {
  const a = ASPECT[frame];
  return a >= 1 ? [LONG_SIDE, Math.round(LONG_SIDE / a)] : [Math.round(LONG_SIDE * a), LONG_SIDE];
};

async function shootSite() {
  await mkdir(SITE, { recursive: true });
  await mkdir(JOBS, { recursive: true });
  const browser = await chromium.launch({ args: ['--use-angle=d3d11', '--ignore-gpu-blocklist', '--enable-gpu'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 });
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto(BASE);
  await page.waitForFunction(() => window.cupViewer?.viewer);
  const site = {};
  for (const c of CASES) {
    const [width, height] = pixels(c.frame);
    const result = await page.evaluate(async ({ c, width, height }) => {
      const { viewer, state } = window.cupViewer;
      const settle = async () => {
        for (let i = 0; i < 3; i++) {
          await viewer.whenReady();
          await new Promise((r) => setTimeout(r, 250));
        }
      };
      state.set({ modelId: c.hero, autoRotate: false });
      await settle();
      state.set({
        tab: 'scene',
        sceneId: c.scene,
        photo: { preset: c.preset, frame: c.frame, second: c.second ? { modelId: c.second, kind: c.kind } : null },
      });
      await settle();
      viewer.rotateCupTo(0, 0);
      if (c.second) viewer.rotateCupTo(1, 0);
      const canvas = viewer.renderSilhouette({ width, height });
      return { job: viewer.photoJob(), frame: viewer.photoFrame(), png: canvas.toDataURL('image/png') };
    }, { c, width, height });
    await writeFile(resolve(SITE, `${c.name}.png`), Buffer.from(result.png.split(',')[1], 'base64'));
    await writeFile(resolve(JOBS, `${c.name}.json`), `${JSON.stringify(result.job, null, 1)}\n`);
    site[c.name] = { window: result.frame.window, job: result.job };
    console.log(`сайт  ${c.name}: ${result.job.cups.map((x) => `${x.id} [${x.pos_mm}]`).join(', ')}`);
  }
  await browser.close();
  await writeFile(resolve(SITE, 'index.json'), `${JSON.stringify(site, null, 1)}\n`);
  if (errors.length) throw new Error(errors.join('\n'));
}

function runBlender() {
  const script = resolve(root, 'render/engine/tools/preview_mask.py');
  const args = ['-b', '--factory-startup', '-t', '4', '--python-exit-code', '1', '-P', script, '--',
    '--out', MASKS, '--long-side', String(LONG_SIDE), ...CASES.flatMap((c) => ['--job', resolve(JOBS, `${c.name}.json`)])];
  return new Promise((ok, fail) => {
    const child = spawn(BLENDER, args, { stdio: ['ignore', 'pipe', 'pipe'] });
    try {
      setPriority(child.pid, constants.priority.PRIORITY_BELOW_NORMAL);
    } catch {
      // без приоритета тоже можно, просто ноутбуку тяжелее
    }
    child.stdout.on('data', (d) => {
      for (const line of String(d).split('\n')) if (line.startsWith('###')) console.log(`blender ${line.slice(4, 150)}`);
    });
    let err = '';
    child.stderr.on('data', (d) => { err += d; });
    child.on('close', (code) => (code === 0 ? ok() : fail(new Error(`Blender: код ${code}\n${err.slice(-2000)}`))));
  });
}

const readMask = async (path) => {
  const png = PNG.sync.read(await readFile(path));
  const m = new Uint8Array(png.width * png.height);
  for (let i = 0; i < m.length; i++) m[i] = png.data[i * 4] >= 128 ? 1 : 0;
  return { m, w: png.width, h: png.height };
};

function dilate(m, w, h, r) {
  if (r === 0) return m;
  const t = new Uint8Array(w * h);
  const o = new Uint8Array(w * h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let v = 0;
      for (let k = Math.max(0, x - r); k <= Math.min(w - 1, x + r) && !v; k++) v = m[y * w + k];
      t[y * w + x] = v;
    }
  }
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let v = 0;
      for (let k = Math.max(0, y - r); k <= Math.min(h - 1, y + r) && !v; k++) v = t[k * w + x];
      o[y * w + x] = v;
    }
  }
  return o;
}

const inside = (a, b) => a.every((v, i) => !v || b[i]);

async function compare() {
  const site = JSON.parse(await readFile(resolve(SITE, 'index.json'), 'utf8'));
  const blender = Object.fromEntries(
    JSON.parse(await readFile(resolve(MASKS, 'index.json'), 'utf8')).cases.map((c) => [c.name, c]),
  );
  let failed = 0;
  console.log('\nкадр                              px     IoU     окно   итог');
  for (const c of CASES) {
    const b = blender[c.name];
    const s = site[c.name];
    if (!b || !s) {
      console.log(`${c.name.padEnd(32)} нет снимка ${!b ? 'Blender' : 'сайта'}`);
      failed++;
      continue;
    }
    const A = await readMask(resolve(MASKS, b.mask));
    const B = await readMask(resolve(SITE, `${c.name}.png`));
    if (A.w !== B.w || A.h !== B.h) {
      console.log(`${c.name.padEnd(32)} размер ${A.w}×${A.h} против ${B.w}×${B.h}`);
      failed++;
      continue;
    }
    let both = 0;
    let any = 0;
    for (let i = 0; i < A.m.length; i++) {
      both += A.m[i] & B.m[i];
      any += A.m[i] | B.m[i];
    }
    let dev = null;
    for (let r = 0; r <= 8; r++) {
      if (inside(A.m, dilate(B.m, A.w, A.h, r)) && inside(B.m, dilate(A.m, A.w, A.h, r))) {
        dev = r;
        break;
      }
    }
    const h = b.window[3] - b.window[2];
    const win = Math.max(...s.window.map((v, i) => Math.abs(v - b.window[i]))) / h;
    // Окно — в той же мере, что силуэт: не дальше LIMIT_PX по длинной стороне.
    // Сайт берёт габарит стакана из каталога, рендер — из сетки (с бортиком):
    // кадр пары от этого гуляет на доли пикселя, и 0,1 % (0,8 px) было строже
    // самого силуэта.
    const pass = dev !== null && dev <= LIMIT_PX && win * LONG_SIDE <= LIMIT_PX;
    if (!pass) failed++;
    console.log(`${c.name.padEnd(32)} ${String(dev ?? '>8').padStart(3)}  ${(both / Math.max(1, any)).toFixed(4)}  ${(win * 100).toFixed(3)}%  ${pass ? 'совпадает' : 'РАСХОДИТСЯ'}`);
  }
  console.log(`\nСовпадает ${CASES.length - failed} из ${CASES.length} (порог ${LIMIT_PX} px, окно — доля высоты кадра)`);
  return failed;
}

const onlyCompare = process.argv.includes('--compare');
if (!onlyCompare) {
  await shootSite();
  await runBlender();
}
process.exit((await compare()) ? 1 : 0);
