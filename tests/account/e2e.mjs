// Кабинет глазами человека (этапы Г–Е): свой сервер на временной базе, вход по
// коду из его консоли, рендер из «Фотореала», исполнитель — запросами (Blender
// проверяется отдельно, server/worker.py), «Мои рендеры», знак, пакет, админка.
//
//   node tests/account/e2e.mjs            исполнитель — запросами (быстро)
//   node tests/account/e2e.mjs --real     настоящий server/worker.py и Blender (черновик)
//
// Снимки — tests/account/out/ (не в git).

import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdir, mkdtemp, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = resolve(root, 'tests/account/out');
const PORT = 8010;
const BASE = `http://127.0.0.1:${PORT}/`;
const EMAIL = 'owner@example.ru';
const PYTHON = process.platform === 'win32' ? resolve(root, 'server/.venv/Scripts/python.exe') : resolve(root, 'server/.venv/bin/python');
const ART = process.env.CV_ART ?? 'D:/Cups_Soft/3D_Cups/Mockups/HB80-280/design_HB80-280_A4.jpg';

await mkdir(OUT, { recursive: true });
const data = await mkdtemp(join(tmpdir(), 'cv-e2e-'));
const server = spawn(PYTHON, [resolve(root, 'server/run.py')], {
  env: { ...process.env, CV_PORT: String(PORT), CV_DATA: data, CV_ADMINS: EMAIL, PYTHONIOENCODING: 'utf-8' },
});
let log = '';
server.stdout.on('data', (d) => (log += d));
server.stderr.on('data', (d) => (log += d));
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
for (let i = 0; i < 100 && !log.includes('CupViewer: http'); i++) await wait(100);

const codeFor = async (email) => {
  for (let i = 0; i < 50; i++) {
    const m = [...log.matchAll(new RegExp(`Код входа для ${email.replace('.', '\\.')}: (\\d{6})`, 'g'))].pop();
    if (m) return m[1];
    await wait(100);
  }
  throw new Error('кода нет в консоли сервера');
};
const key = (await readFile(join(data, 'worker.key'), 'utf8')).trim();
const REAL = process.argv.includes('--real');
let workerProc = null;
let workerLog = '';
if (REAL) {
  workerProc = spawn(PYTHON, [resolve(root, 'server/worker.py')], {
    env: { ...process.env, CV_SERVER: BASE, CV_DATA: data, CV_PAUSE: '2', PYTHONIOENCODING: 'utf-8' },
  });
  workerProc.stdout.on('data', (d) => (workerLog += d));
  workerProc.stderr.on('data', (d) => (workerLog += d));
}
const worker = (path, init = {}) => fetch(BASE + path, { ...init, headers: { 'X-Worker-Key': key, ...(init.headers ?? {}) } });

const browser = await chromium.launch({ args: ['--use-angle=d3d11', '--ignore-gpu-blocklist', '--enable-gpu'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
const step = (text) => console.log(`· ${text}`);
const settle = () => page.evaluate(async () => {
  for (let i = 0; i < 3; i++) {
    await window.cupViewer.viewer.whenReady();
    await new Promise((r) => setTimeout(r, 300));
  }
});

try {
  await page.goto(BASE);
  await page.waitForFunction(() => window.cupViewer?.viewer);
  await page.waitForSelector('.account__login:not([hidden])');
  step('шапка: «Войти»');

  await page.evaluate(() => window.cupViewer.state.set({ modelId: 'HB80-280', materialId: 'coated', autoRotate: false }));
  await settle();
  await page.setInputFiles('#texture-input', ART);
  await page.waitForFunction(() => window.cupViewer.state.get().design !== null, null, { timeout: 90000 });
  await page.evaluate(() => window.cupViewer.state.set({ tab: 'scene', sceneId: 'living', photo: { preset: 'front', frame: '4:5', second: { modelId: 'HB80-280', kind: 'pair' } } }));
  await settle();
  await page.screenshot({ path: resolve(OUT, '1-before-login.png') });

  // Рендер без входа — окно входа.
  await page.click('#photo-render');
  await page.waitForSelector('.login-dialog:not([hidden])');
  await page.fill('.login-dialog input[type=email]', EMAIL);
  await page.click('text=Получить код');
  const code = await codeFor(EMAIL);
  await page.screenshot({ path: resolve(OUT, '2-code.png') });
  await page.fill('.login-code', code);
  await page.waitForSelector('.account__me:not([hidden])');
  step(`вход по коду ${code}: ${await page.textContent('.account__me')}`);

  // Теперь рендер уходит в очередь.
  await page.click('#photo-render');
  await page.waitForFunction(() => window.cupViewer && document.querySelector('.account__me')?.textContent.includes('2'));
  step('задание в очереди, 1 токен зарезервирован');
  if (REAL) {
    step('считает настоящий исполнитель (Blender, черновик)…');
  } else {
    const claim = await (await worker('api/worker/claim', { method: 'POST' })).json();
    step(`исполнитель взял кадр ${claim.id}: ${claim.job.cups.map((c) => `${c.id}${c.art ? ' + макет' : ''}`).join(', ')}`);
    // Кадр от «исполнителя» — снимок превью сайта того же размера, что черновик.
    const frame = await page.evaluate(() => new Promise((ok) => {
      window.cupViewer.viewer.renderStill({ width: 640, height: 800 }).toBlob((b) => b.arrayBuffer().then((a) => ok([...new Uint8Array(a)])), 'image/png');
    }));
    const form = new FormData();
    form.append('seconds', '21');
    form.append('image', new Blob([new Uint8Array(frame)], { type: 'image/png' }), 'frame.png');
    const done = await worker(`api/worker/jobs/${claim.id}/done`, { method: 'POST', body: form });
    step(`исполнитель отдал кадр: ${done.status}`);
  }

  await page.waitForSelector('.account__dot', { timeout: REAL ? 600000 : 30000 });
  if (REAL) step(`исполнитель: ${workerLog.trim().split(/\r?\n/).slice(-1)[0]}`);
  step('в шапке — метка «Кадр готов»');
  await page.click('.account__me');
  await page.screenshot({ path: resolve(OUT, '3-menu.png') });
  await page.click('text=/Мои рендеры/');
  await page.waitForSelector('.render--done');
  await page.waitForTimeout(800);
  await page.screenshot({ path: resolve(OUT, '4-renders.png') });
  if (REAL) {
    // Сам кадр — рядом с превью сайта: так видно, что рендер — та же сцена.
    const img = await page.$eval('.render__img', (i) => i.src.replace('kind=thumb', 'kind=full'));
    const res = await page.evaluate(async (u) => [...new Uint8Array(await (await fetch(u)).arrayBuffer())], img);
    await writeFile(resolve(OUT, 'real-frame.png'), Buffer.from(res));
  }
  // Знак снимается только купленными: без них «Убрать знак» ведёт к пакетам.
  await page.click('text=/Убрать знак/');
  await page.waitForSelector('.buy-dialog:not([hidden]) .pack');
  step('«Убрать знак» без купленных — окно пакетов');
  await page.screenshot({ path: resolve(OUT, '5-buy.png') });
  await page.click('.pack >> nth=0');
  await page.waitForFunction(() => document.querySelector('.account__me')?.textContent.includes('12'));
  step(`пакет куплен: ${await page.textContent('.account__me')}`);
  const thumbBefore = await page.$eval('.render__img', (i) => i.src);
  await page.click('text=/Убрать знак/');
  await page.waitForFunction(() => !document.querySelector('.render__mark'));
  await page.waitForFunction(() => document.querySelector('.account__me')?.textContent.includes('11'));
  const thumbAfter = await page.$eval('.render__img', (i) => i.src);
  if (thumbAfter === thumbBefore) throw new Error('миниатюра не сменилась после «Убрать знак»');
  await page.waitForFunction(() => {
    const img = document.querySelector('.render__img');
    return img?.complete && img.naturalWidth > 0;
  }, null, { timeout: 10000 });
  step('«Убрать знак» — кадр без знака, списан купленный токен, миниатюра новая');
  await page.screenshot({ path: resolve(OUT, '6-unmarked.png') });
  await page.keyboard.press('Escape');

  const admin = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await admin.context().addCookies(await page.context().cookies());
  await admin.goto(`${BASE}admin.html`);
  await admin.waitForSelector('#users-table tr:nth-child(2)');
  await admin.screenshot({ path: resolve(OUT, '7-admin.png') });
  await admin.click('[data-tab="queue"]');
  await admin.waitForSelector('#queue-table tr:nth-child(2)');
  await admin.screenshot({ path: resolve(OUT, '8-admin-queue.png') });
  step('админка: пользователи и очередь');
} finally {
  await browser.close();
  workerProc?.kill();
  server.kill();
}
if (REAL) await writeFile(resolve(OUT, 'worker.log'), workerLog);
await writeFile(resolve(OUT, 'server.log'), log);
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('готово, снимки в tests/account/out/');
