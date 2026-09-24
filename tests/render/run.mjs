// render:baseline / render:check.
//
//   node tests/render/run.mjs baseline [--only id,id]   снять эталоны в tests/render/baseline/
//   node tests/render/run.mjs check    [--only id,id]   сравнить с эталонами → tests/render/out/
//   node tests/render/run.mjs check --strict            любое отличие от эталона — провал
//   node tests/render/run.mjs candidates                кадры новых материалов → tests/render/candidates/
//
// Строгий режим — для рефакторингов: рендер детерминирован бит в бит, и кадр,
// который «не должен был измениться», обязан совпасть с эталоном точно. Пороги
// §58 допускают тонкие сдвиги (roughness бумаги +0,1 даёт p99 ΔE00 ≈ 1,7) и
// нужны там, где изменение рендера ожидаемо.
//
// Кадры снимает headless Chromium на SwiftShader: рендер идёт на CPU и
// повторяется бит в бит. Эталон валиден только для того же GL-бэкенда —
// при другом UNMASKED_RENDERER_WEBGL проверка падает, а не сравнивает.
import { build } from 'esbuild';
import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import { dirname, extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import { deltaEStats } from './color.mjs';
import { CANDIDATE_FRAMES, CANVAS, FRAMES, THRESHOLDS } from './matrix.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '../..');
const BASELINE = resolve(here, 'baseline');
const CANDIDATES = resolve(here, 'candidates');
const OUT = resolve(here, 'out');
const BROWSER_ARGS = ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--disable-gpu-rasterization'];
const FRAME_TIMEOUT = 180_000;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.glb': 'model/gltf-binary',
  '.hdr': 'application/octet-stream',
  '.wasm': 'application/wasm',
};

function serve() {
  const server = createServer(async (req, res) => {
    const path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    const file = normalize(join(root, path));
    if (!file.startsWith(root)) return res.writeHead(403).end();
    try {
      const info = await stat(file);
      if (info.isDirectory()) throw new Error('dir');
      res.writeHead(200, {
        'Content-Type': TYPES[extname(file)] ?? 'application/octet-stream',
        'Content-Length': info.size,
      });
      createReadStream(file).pipe(res);
    } catch {
      res.writeHead(404).end();
    }
  });
  return new Promise((ok) => server.listen(0, '127.0.0.1', () => ok(server)));
}

async function bundle() {
  await build({
    entryPoints: [resolve(here, 'capture.js')],
    bundle: true,
    format: 'esm',
    outfile: resolve(here, '.build/capture.js'),
    logLevel: 'warning',
  });
}

async function shoot(page, base, frame) {
  await page.goto(`${base}/tests/render/capture.html?frame=${frame.id}`);
  await page.waitForFunction(() => window.__capture?.status, null, { timeout: FRAME_TIMEOUT });
  const result = await page.evaluate(() => window.__capture);
  if (result.status !== 'done') throw new Error(`${frame.id}: ${result.message}`);
  const png = PNG.sync.read(Buffer.from(result.png.split(',')[1], 'base64'));
  return { png, meta: result.meta };
}

async function captureAll(frames) {
  await bundle();
  const server = await serve();
  const base = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch({ args: BROWSER_ARGS });
  const context = await browser.newContext({
    viewport: { width: CANVAS.width, height: CANVAS.height },
    deviceScaleFactor: 1,
  });
  const shots = [];
  try {
    for (const frame of frames) {
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', (error) => errors.push(error.message));
      const started = Date.now();
      try {
        shots.push({ frame, ...(await shoot(page, base, frame)) });
      } catch (error) {
        throw new Error(`${error.message}\n${errors.join('\n')}`);
      }
      console.log(`  снят ${frame.id.padEnd(22)} ${((Date.now() - started) / 1000).toFixed(1)} с`);
      await page.close();
    }
  } finally {
    await browser.close();
    server.close();
  }
  return shots;
}

function selectFrames(list = FRAMES) {
  const index = process.argv.indexOf('--only');
  if (index < 0) return list;
  const ids = new Set(process.argv[index + 1].split(','));
  return list.filter((frame) => ids.has(frame.id));
}

// Кандидаты в эталоны: снимаются и складываются рядом, но не сравниваются.
async function candidates() {
  const shots = await captureAll(selectFrames(CANDIDATE_FRAMES));
  await mkdir(CANDIDATES, { recursive: true });
  for (const { frame, png } of shots) await writeFile(resolve(CANDIDATES, `${frame.id}.png`), PNG.sync.write(png));
  // Для глаз: попарно спереди | сверху.
  const rows = [];
  for (let i = 0; i < shots.length; i += 2) rows.push(shots.slice(i, i + 2).map((shot) => shot.png));
  await writeFile(resolve(CANDIDATES, 'contact-sheet.png'), PNG.sync.write(contactSheet(rows)));
  console.log(`Кандидаты: ${shots.length} кадров → tests/render/candidates/ (эталонами станут после «ок»)`);
}

async function baseline() {
  // Кадры со сравнением «против другого эталона» своих эталонов не имеют.
  const frames = selectFrames().filter((frame) => !frame.compareTo);
  const shots = await captureAll(frames);
  await mkdir(BASELINE, { recursive: true });
  for (const { frame, png } of shots) {
    await writeFile(resolve(BASELINE, `${frame.id}.png`), PNG.sync.write(png));
  }
  const metaFile = resolve(BASELINE, 'meta.json');
  const previous = await readFile(metaFile, 'utf8').then(JSON.parse, () => ({ frames: {} }));
  const meta = { ...shots[0].meta, frames: previous.frames ?? {} };
  for (const { frame } of shots) meta.frames[frame.id] = new Date().toISOString();
  await writeFile(metaFile, `${JSON.stringify(meta, null, 2)}\n`);
  console.log(`Эталоны: ${shots.length} кадров → tests/render/baseline/`);
}

// Уменьшение в целое число раз усреднением — для contact sheet.
function shrink(png, factor) {
  const width = Math.floor(png.width / factor);
  const height = Math.floor(png.height / factor);
  const out = new PNG({ width, height });
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const sum = [0, 0, 0];
      for (let dy = 0; dy < factor; dy++) {
        for (let dx = 0; dx < factor; dx++) {
          const i = ((y * factor + dy) * png.width + x * factor + dx) * 4;
          sum[0] += png.data[i];
          sum[1] += png.data[i + 1];
          sum[2] += png.data[i + 2];
        }
      }
      const o = (y * width + x) * 4;
      const n = factor * factor;
      out.data[o] = sum[0] / n;
      out.data[o + 1] = sum[1] / n;
      out.data[o + 2] = sum[2] / n;
      out.data[o + 3] = 255;
    }
  }
  return out;
}

function contactSheet(rows) {
  const FACTOR = 4;
  const cellW = CANVAS.width / FACTOR;
  const cellH = CANVAS.height / FACTOR;
  const GAP = 8;
  const sheet = new PNG({ width: cellW * 3 + GAP * 4, height: rows.length * (cellH + GAP) + GAP });
  sheet.data.fill(40);
  rows.forEach((images, r) => {
    images.forEach((image, c) => {
      const small = shrink(image, FACTOR);
      const ox = GAP + c * (cellW + GAP) + Math.floor((cellW - small.width) / 2);
      const oy = GAP + r * (cellH + GAP) + Math.floor((cellH - small.height) / 2);
      PNG.bitblt(small, sheet, 0, 0, small.width, small.height, ox, oy);
    });
  });
  return sheet;
}

// Тепловая карта для глаз: эталон приглушённо серым, поверх — красный по ΔE00
// (полная яркость с ΔE00 = 2, порог p99 §58). Видны и сдвиги ниже порогов.
function paintHeatmap(out, ref, perPixel) {
  for (let p = 0; p < perPixel.length; p++) {
    const i = p * 4;
    const gray = (0.2126 * ref.data[i] + 0.7152 * ref.data[i + 1] + 0.0722 * ref.data[i + 2]) * 0.3;
    const heat = Math.min(1, perPixel[p] / 2);
    out.data[i] = gray + (255 - gray) * heat;
    out.data[i + 1] = gray * (1 - heat);
    out.data[i + 2] = gray * (1 - heat);
    out.data[i + 3] = 255;
  }
}

async function check() {
  const metaFile = resolve(BASELINE, 'meta.json');
  const meta = await readFile(metaFile, 'utf8').then(JSON.parse, () => null);
  if (!meta) throw new Error('Эталонов нет: сначала npm run render:baseline (только с «ок» человека).');

  const strict = process.argv.includes('--strict');
  const frames = selectFrames();
  const shots = await captureAll(frames);
  const renderer = shots[0]?.meta.renderer;
  if (renderer !== meta.renderer) {
    console.error(
      `GL-бэкенд не совпадает с эталонным — сравнение бессмысленно.\n` +
        `  эталон:  ${meta.renderer}\n  сейчас:  ${renderer}\n` +
        'Снимайте на том же бэкенде (SwiftShader) или переснимите эталоны с «ок» человека.',
    );
    process.exit(2);
  }

  await mkdir(OUT, { recursive: true });
  const report = { ...shots[0].meta, baselineRenderer: meta.renderer, strict, thresholds: THRESHOLDS, frames: [] };
  const sheetRows = [];
  for (const { frame, png } of shots) {
    const ref = PNG.sync.read(await readFile(resolve(BASELINE, `${frame.compareTo ?? frame.id}.png`)));
    await writeFile(resolve(OUT, `${frame.id}.png`), PNG.sync.write(png));
    if (ref.width !== png.width || ref.height !== png.height) {
      report.frames.push({ id: frame.id, pass: false, reason: `размер ${png.width}×${png.height} ≠ ${ref.width}×${ref.height}` });
      continue;
    }
    const diff = new PNG({ width: png.width, height: png.height });
    const differing = pixelmatch(ref.data, png.data, diff.data, png.width, png.height, {
      threshold: THRESHOLDS.pixelmatch,
    });
    const share = differing / (png.width * png.height);
    const stats = deltaEStats(ref.data, png.data);
    const changed = stats.max > 0;
    // Кадр, сравниваемый с чужим эталоном, бит в бит совпасть не обязан:
    // для него всегда действуют пороги §58.
    const pass = strict && !frame.compareTo
      ? !changed
      : share <= THRESHOLDS.diffShare &&
        stats.mean <= THRESHOLDS.meanDeltaE &&
        stats.p99 <= THRESHOLDS.p99DeltaE;
    report.frames.push({
      id: frame.id,
      pass,
      changed,
      diffShare: share,
      meanDeltaE: stats.mean,
      p99DeltaE: stats.p99,
      maxDeltaE: stats.max,
    });
    paintHeatmap(diff, ref, stats.perPixel);
    await writeFile(resolve(OUT, `${frame.id}.diff.png`), PNG.sync.write(diff));
    sheetRows.push([ref, png, diff]);
  }

  report.pass = report.frames.every((frame) => frame.pass);
  const worst = [...report.frames].sort((a, b) => (b.meanDeltaE ?? Infinity) - (a.meanDeltaE ?? Infinity))[0];
  report.worst = worst?.id ?? null;
  await writeFile(resolve(OUT, 'report.json'), `${JSON.stringify(report, null, 2)}\n`);
  if (sheetRows.length) await writeFile(resolve(OUT, 'contact-sheet.png'), PNG.sync.write(contactSheet(sheetRows)));

  console.log(`\nrender:check — ${report.frames.length} кадров, GL: ${renderer}`);
  console.log('кадр                    доля пикс.   mean ΔE00   p99 ΔE00');
  for (const f of report.frames) {
    if (f.reason) {
      console.log(`${f.pass ? 'PASS' : 'FAIL'} ${f.id.padEnd(22)} ${f.reason}`);
      continue;
    }
    console.log(
      `${f.pass ? 'PASS' : 'FAIL'} ${f.id.padEnd(22)} ${(f.diffShare * 100).toFixed(4).padStart(8)} %` +
        `   ${f.meanDeltaE.toFixed(4).padStart(8)}   ${f.p99DeltaE.toFixed(4).padStart(8)}` +
        `   ${f.maxDeltaE.toFixed(2).padStart(8)}${f.changed ? '  изменён' : ''}`,
    );
  }
  console.log(`худший кадр: ${report.worst}`);
  console.log(`отчёт: tests/render/out/report.json, contact-sheet.png`);
  console.log(report.pass ? 'ИТОГ: ЗЕЛЁНЫЙ' : 'ИТОГ: КРАСНЫЙ');
  if (!report.pass) process.exit(1);
}

const command = process.argv[2];
const run = { baseline, check, candidates }[command];
if (!run) {
  console.error('использование: node tests/render/run.mjs baseline|check|candidates [--only id,id]');
  process.exit(2);
}
run().catch((error) => {
  console.error(error);
  process.exit(1);
});
