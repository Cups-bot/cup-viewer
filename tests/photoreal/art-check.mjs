// Сверка макета: куда он ложится на сайте и в рендере (этап В).
//
// Тестовый лист — цветные метки на белом в размер заводского листа стакана —
// того, что дают дизайнерам (catalog/cups.json → render.print: у бумаги лист
// A4 развёртки, у PP поле печати). Сайт получает его как обычный макет (загрузка
// файла), собирает кадр «Фотореала» и снимает макет без света
// (viewer.renderArt); Blender по заданию сайта с тем же листом снимает то же
// (render/engine/tools/preview_mask.py --art). Метки находятся на обоих
// снимках и сравниваются: сдвиг в пикселях и миллиметрах, поворот вокруг оси.
//
//   npm run serve                            (в соседнем терминале)
//   node tests/photoreal/art-check.mjs       всё: сайт → Blender → сравнение
//   node tests/photoreal/art-check.mjs --blender   Blender по снятым заданиям и сравнение
//   node tests/photoreal/art-check.mjs --compare   только сравнить снятое
//
// Blender — один процесс с пониженным приоритетом. Результат — в
// tests/photoreal/out/art/ (не в git).

import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { constants, setPriority } from 'node:os';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PNG } from 'pngjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = resolve(root, 'tests/photoreal/out/art');
const SHEETS = resolve(OUT, 'sheets');
const SITE = resolve(OUT, 'site');
const JOBS = resolve(OUT, 'jobs');
const SHOTS = resolve(OUT, 'blender');
const BASE = process.env.CV_URL ?? 'http://localhost:8000/';
const BLENDER = process.env.BLENDER ?? 'C:\\Program Files\\Blender Foundation\\Blender 5.2\\blender.exe';
const SIZE = 800;
const PX_PER_MM = 8;
const STEP_MM = 15;
const DOT_MM = 6;
// Шесть оттенков: у соседних меток по ряду и по столбцу — разные.
const HUES = [0, 60, 120, 180, 240, 300];

// Заводской лист стакана, мм: бумага — лист развёртки, PP — поле печати.
const catalog = JSON.parse(await readFile(resolve(root, 'catalog/cups.json'), 'utf8'));
const CUPS = new Map((catalog.cups ?? catalog).map((c) => [c.id, c]));
const sheetMm = (id) => {
  const print = CUPS.get(id)?.render?.print ?? {};
  return print.page_mm ?? print.field_mm ?? null;
};

// Все бумажные и PP стаканы сайта лицом к камере, два — ещё и повёрнутыми
// (сверка направления поворота). PET — сторонами А/Б, отдельно.
const ONLY = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const CASES = [...CUPS.values()]
  .filter((c) => c.web && sheetMm(c.id) && (!ONLY.length || ONLY.includes(c.id)))
  .flatMap((c) => [
    { name: `${c.id}_0`, cup: c.id, rotate: 0 },
    ...(['HB80-280', 'BM90-500'].includes(c.id) ? [{ name: `${c.id}_60`, cup: c.id, rotate: 60 }] : []),
  ]);

async function shootSite() {
  await Promise.all([SHEETS, SITE, JOBS].map((d) => mkdir(d, { recursive: true })));
  const browser = await chromium.launch({ args: ['--use-angle=d3d11', '--ignore-gpu-blocklist', '--enable-gpu'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 });
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto(BASE);
  await page.waitForFunction(() => window.cupViewer?.viewer);
  const settle = () => page.evaluate(async () => {
    for (let i = 0; i < 3; i++) {
      await window.cupViewer.viewer.whenReady();
      await new Promise((r) => setTimeout(r, 250));
    }
  });

  const sheets = new Map();
  for (const c of CASES) {
    // Лист в размер развёртки этого стакана на сайте.
    if (!sheets.has(c.cup)) {
      const png = await page.evaluate(({ sheet, PX_PER_MM, STEP_MM, DOT_MM, HUES }) => {
        const [wMm, hMm] = sheet;
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(wMm * PX_PER_MM);
        canvas.height = Math.round(hMm * PX_PER_MM);
        const g = canvas.getContext('2d');
        g.fillStyle = '#fff';
        g.fillRect(0, 0, canvas.width, canvas.height);
        const cols = Math.floor(wMm / STEP_MM);
        const rows = Math.floor(hMm / STEP_MM);
        for (let r = 0; r < rows; r++) {
          for (let k = 0; k < cols; k++) {
            g.fillStyle = `hsl(${HUES[(k + 3 * r) % HUES.length]} 100% 50%)`;
            g.beginPath();
            g.arc((k + 0.5) * STEP_MM * PX_PER_MM, (r + 0.5) * STEP_MM * PX_PER_MM, (DOT_MM / 2) * PX_PER_MM, 0, 2 * Math.PI);
            g.fill();
          }
        }
        return canvas.toDataURL('image/png').split(',')[1];
      }, { sheet: sheetMm(c.cup), PX_PER_MM, STEP_MM, DOT_MM, HUES });
      const file = resolve(SHEETS, `${c.cup}.png`);
      await writeFile(file, Buffer.from(png, 'base64'));
      sheets.set(c.cup, file);
    }

    await page.evaluate(({ cup }) => {
      const { state, catalog } = window.cupViewer;
      state.set({ tab: '3d', modelId: cup, materialId: catalog.model(cup).defaultMaterial, autoRotate: false });
    }, { cup: c.cup });
    await settle();
    await page.setInputFiles('#texture-input', sheets.get(c.cup));
    await page.waitForFunction(() => window.cupViewer.state.get().design !== null, null, { timeout: 60000 });
    await settle();
    await page.evaluate(() => window.cupViewer.state.set({
      tab: 'scene', sceneId: 'studio', photo: { preset: 'front', frame: '1:1', second: null },
    }));
    await settle();
    const result = await page.evaluate(({ rotate, SIZE }) => {
      const { viewer } = window.cupViewer;
      viewer.rotateCupTo(0, rotate);
      const canvas = viewer.renderArt({ width: SIZE, height: SIZE });
      return { job: viewer.photoJob(), png: canvas.toDataURL('image/png').split(',')[1] };
    }, { rotate: c.rotate, SIZE });
    result.job.cups[0].art = `../sheets/${c.cup}.png`;
    await writeFile(resolve(SITE, `${c.name}.png`), Buffer.from(result.png, 'base64'));
    await writeFile(resolve(JOBS, `${c.name}.json`), `${JSON.stringify(result.job, null, 1)}\n`);
    console.log(`сайт  ${c.name}: ${JSON.stringify(result.job.cups)}`);
    await page.evaluate(() => window.cupViewer.state.set({ design: null }));
  }
  await browser.close();
  if (errors.length) throw new Error(errors.join('\n'));
}

function runBlender() {
  const script = resolve(root, 'render/engine/tools/preview_mask.py');
  const args = ['-b', '--factory-startup', '-t', '4', '--python-exit-code', '1', '-P', script, '--',
    '--art', '--out', SHOTS, '--long-side', String(SIZE), ...CASES.flatMap((c) => ['--job', resolve(JOBS, `${c.name}.json`)])];
  return new Promise((ok, fail) => {
    const child = spawn(BLENDER, args, { stdio: ['ignore', 'pipe', 'pipe'] });
    try {
      setPriority(child.pid, constants.priority.PRIORITY_BELOW_NORMAL);
    } catch {
      // без приоритета тоже можно, просто ноутбуку тяжелее
    }
    let out = '';
    child.stdout.on('data', (d) => {
      out += d;
      for (const line of String(d).split('\n')) {
        if (line.startsWith('###') || /Error|ОШИБКА|ConfigError/.test(line)) console.log(`blender ${line.slice(0, 200)}`);
      }
    });
    let err = '';
    child.stderr.on('data', (d) => { err += d; });
    child.on('close', (code) => (code === 0 ? ok() : fail(new Error(`Blender: код ${code}\n${(out + err).slice(-3000)}`))));
  });
}

// Метки на снимке: насыщенные пиксели по оттенку → связные пятна → центры.
async function marks(path) {
  const png = PNG.sync.read(await readFile(path));
  const { width: w, height: h, data } = png;
  const label = new Int16Array(w * h).fill(-1);
  let rows = [];
  let cupTop = h;
  let cupBottom = -1;
  for (let i = 0; i < w * h; i++) {
    const r = data[i * 4];
    const g = data[i * 4 + 1];
    const b = data[i * 4 + 2];
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    if (max > 40) {
      const y = Math.floor(i / w);
      cupTop = Math.min(cupTop, y);
      cupBottom = Math.max(cupBottom, y);
    }
    if (max < 60 || max - min < 0.45 * max) continue;
    let hue;
    if (max === r) hue = (60 * ((g - b) / (max - min)) + 360) % 360;
    else if (max === g) hue = 60 * ((b - r) / (max - min)) + 120;
    else hue = 60 * ((r - g) / (max - min)) + 240;
    label[i] = Math.round(hue / 60) % 6;
  }
  const seen = new Uint8Array(w * h);
  for (let i = 0; i < w * h; i++) {
    if (label[i] < 0 || seen[i]) continue;
    const hue = label[i];
    const stack = [i];
    seen[i] = 1;
    let n = 0;
    let sx = 0;
    let sy = 0;
    while (stack.length) {
      const j = stack.pop();
      const x = j % w;
      const y = (j - x) / w;
      n++;
      sx += x;
      sy += y;
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const X = x + dx;
        const Y = y + dy;
        if (X < 0 || Y < 0 || X >= w || Y >= h) continue;
        const k = Y * w + X;
        if (!seen[k] && label[k] === hue) {
          seen[k] = 1;
          stack.push(k);
        }
      }
    }
    if (n >= 12) rows.push({ hue, x: sx / n, y: sy / n, n });
  }
  return { marks: rows, cupPx: cupBottom - cupTop + 1, cls: classes(png) };
}

const median = (v) => {
  const s = [...v].sort((a, b) => a - b);
  return s.length ? (s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2) : NaN;
};

// Класс пикселя: 0 — фон (чёрный), 1 — лист (белый), 2… — оттенок метки.
function classes(png) {
  const { width: w, height: h, data } = png;
  const out = new Uint8Array(w * h);
  for (let i = 0; i < w * h; i++) {
    const r = data[i * 4];
    const g = data[i * 4 + 1];
    const b = data[i * 4 + 2];
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    if (max < 60) continue;
    if (max - min < 0.45 * max) {
      out[i] = 1;
      continue;
    }
    let hue;
    if (max === r) hue = (60 * ((g - b) / (max - min)) + 360) % 360;
    else if (max === g) hue = 60 * ((b - r) / (max - min)) + 120;
    else hue = 60 * ((r - g) / (max - min)) + 240;
    out[i] = 2 + (Math.round(hue / 60) % 6);
  }
  return out;
}

// Совпадение снимков: доля пикселей стакана (на любом из двух), где класс
// один и тот же. От периода меток не зависит: поворот на четверть круга метки
// путают, а совпадение — нет.
function agreement(A, B) {
  let both = 0;
  let same = 0;
  for (let i = 0; i < A.length; i++) {
    if (!A[i] && !B[i]) continue;
    both++;
    if (A[i] === B[i]) same++;
  }
  return same / Math.max(1, both);
}

async function compare() {
  const models = JSON.parse(await readFile(resolve(root, 'catalog/models.json'), 'utf8'));
  const byId = new Map((models.models ?? models).map((m) => [m.id, m]));
  console.log('\nкадр              совпад.  метки   сдвиг, px (медиана / макс)    Δx, мм  Δy, мм  поворот  итог');
  let failed = 0;
  for (const c of CASES) {
    let S;
    let B;
    try {
      S = await marks(resolve(SITE, `${c.name}.png`));
      B = await marks(resolve(SHOTS, `${c.name}.png`));
    } catch (error) {
      console.log(`${c.name.padEnd(17)} нет снимка: ${error.message.split('\n')[0]}`);
      failed++;
      continue;
    }
    const model = byId.get(c.cup);
    const mmPerPx = model.size.heightMm / S.cupPx;
    // Метка ищет пару не дальше трети шага: дальше — уже соседняя метка того
    // же цвета, и сдвиг «перепрыгнул» бы.
    const radius = (0.3 * STEP_MM) / mmPerPx;
    const pairs = [];
    for (const s of S.marks) {
      let best = null;
      for (const b of B.marks) {
        if (b.hue !== s.hue) continue;
        const d = Math.hypot(b.x - s.x, b.y - s.y);
        if (!best || d < best.d) best = { b, d };
      }
      if (best && best.d <= radius) pairs.push({ s, b: best.b, d: best.d });
    }
    const dx = median(pairs.map((p) => p.b.x - p.s.x));
    const dy = median(pairs.map((p) => p.b.y - p.s.y));
    // Поворот: сдвиг по кругу — дуга на среднем радиусе.
    const rMm = (model.size.topMm + model.size.bottomMm) / 4;
    const turn = ((dx * mmPerPx) / rMm) * (180 / Math.PI);
    const agree = agreement(S.cls, B.cls);
    // Приёмка: снимки совпадают на 95 % пикселей (остальное — сглаживание
    // краёв меток и силуэта), метки нашли пару и сдвинуты не больше 1 мм.
    const shiftMm = median(pairs.map((p) => p.d)) * mmPerPx;
    const pass = agree >= 0.95 && pairs.length >= 0.8 * S.marks.length && shiftMm <= 1;
    if (!pass) failed++;
    const f = (v, n = 2, w = 6) => (Number.isFinite(v) ? v.toFixed(n) : '—').padStart(w);
    console.log(`${c.name.padEnd(17)} ${f(agree * 100, 1)} %  ${String(pairs.length).padStart(3)}/${String(S.marks.length).padEnd(3)} `
      + `${f(median(pairs.map((p) => p.d)), 1, 9)} / ${f(Math.max(0, ...pairs.map((p) => p.d)), 1, 5)}    `
      + `${f(dx * mmPerPx)}  ${f(dy * mmPerPx)}  ${f(turn, 1, 5)}°  ${pass ? 'совпадает' : 'РАСХОДИТСЯ'}`);
  }
  console.log(`\nСовпадает ${CASES.length - failed} из ${CASES.length} (≥ 95 % пикселей, метки сдвинуты ≤ 1 мм)`);
}

if (!process.argv.includes('--compare')) {
  if (!process.argv.includes('--blender')) await shootSite();
  await runBlender();
}
await compare();
