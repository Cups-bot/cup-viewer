// Кабинет глазами человека: свой сервер на временной базе, сайт закрыт —
// регистрация по почте и паролю, выбор тарифа и оплата (тестовая), рендер из
// «Фотореала», исполнитель — запросами (Blender проверяется отдельно,
// server/worker.py), «Мои рендеры», пакет токенов, админка (отдельный аккаунт).
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
const CLIENT = 'client@example.ru';
const PASSWORD = 'e2e-password-1';
const PYTHON = process.platform === 'win32' ? resolve(root, 'server/.venv/Scripts/python.exe') : resolve(root, 'server/.venv/bin/python');
const ART = process.env.CV_ART ?? 'D:/Cups_Soft/3D_Cups/Mockups/HB80-280/design_HB80-280_A4.jpg';

await mkdir(OUT, { recursive: true });
const data = await mkdtemp(join(tmpdir(), 'cv-e2e-'));
const server = spawn(PYTHON, [resolve(root, 'server/run.py')], {
  // Сценарий ниже — на экономике «кадр Standard за 1 токен, тариф «Месяц» —
  // 3 стартовых».
  env: { ...process.env, CV_PORT: String(PORT), CV_DATA: data, CV_ADMINS: EMAIL, PYTHONIOENCODING: 'utf-8',
    CV_PRICE_STANDARD: '1', CV_PRICE_ULTRA: '3' },
});
let log = '';
server.stdout.on('data', (d) => (log += d));
server.stderr.on('data', (d) => (log += d));
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
for (let i = 0; i < 100 && !log.includes('CupViewer: http'); i++) await wait(100);

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

// Регистрация на login.html и оплата тарифа — сайт открывается после неё.
const signup = async (p, email, { pay = true } = {}) => {
  await p.goto(BASE);
  await p.waitForSelector('#auth:not([hidden])');
  await p.click('[data-mode="register"]');
  await p.fill('#register-form [name=email]', email);
  await p.fill('#register-form [name=password]', PASSWORD);
  await p.click('#register-form [type=submit]');
  if (pay) {
    await p.waitForSelector('#plans:not([hidden]) .plan');
    await p.screenshot({ path: resolve(OUT, '0-plans.png') });
    await p.locator('.plan').first().getByRole('button').click();
  }
  await p.waitForURL(BASE, { timeout: 30000 });
  await p.waitForFunction(() => window.cupViewer?.viewer);
};

try {
  await signup(page, CLIENT);
  await page.waitForSelector('.account__me:not([hidden])');
  step(`регистрация и тариф «Месяц»: ${await page.textContent('.account__me')}`);

  await page.evaluate(() => window.cupViewer.state.set({ modelId: 'HB80-280', materialId: 'coated', autoRotate: false }));
  await settle();
  await page.setInputFiles('#texture-input', ART);
  await page.waitForFunction(() => window.cupViewer.state.get().design !== null, null, { timeout: 90000 });
  await page.evaluate(() => window.cupViewer.state.set({ tab: 'scene', sceneId: 'living', photo: { preset: 'front', frame: '4:5', second: { modelId: 'HB80-280', kind: 'pair' } } }));
  await settle();
  await page.screenshot({ path: resolve(OUT, '1-scene.png') });

  // Рендер уходит в очередь.
  await page.click('#photo-render');
  await page.waitForFunction(() => window.cupViewer && document.querySelector('.account__me')?.textContent.includes('2'));
  step('задание в очереди, 1 стартовый токен зарезервирован');
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
  // Кадр — без знака, «Убрать знак» больше нет.
  if (await page.$('text=/Убрать знак/')) throw new Error('в «Моих рендерах» осталось «Убрать знак»');
  await page.keyboard.press('Escape');
  // Пакет внутри подписки — из меню.
  await page.click('.account__me');
  await page.getByRole('menuitem', { name: 'Пополнить токены' }).click();
  await page.waitForSelector('.buy-dialog:not([hidden]) .pack');
  await page.screenshot({ path: resolve(OUT, '5-buy.png') });
  await page.click('.pack >> nth=0');
  await page.waitForFunction(() => document.querySelector('.account__me')?.textContent.includes('12'));
  step(`пакет куплен: ${await page.textContent('.account__me')}`);

  // Много кадров: выбрать нужные — архивом, лишние — удалить разом. В работе
  // у каждого — не больше трёх, поэтому ставим и считаем по одному.
  if (!REAL) {
    const frame = await page.evaluate(() => new Promise((ok) => {
      window.cupViewer.viewer.renderStill({ width: 320, height: 400 }).toBlob((b) => b.arrayBuffer().then((a) => ok([...new Uint8Array(a)])), 'image/png');
    }));
    const ids = [];
    for (let i = 0; i < 5; i++) {
      ids.push(await page.evaluate(async () => {
        const form = new FormData();
        form.append('job', JSON.stringify(window.cupViewer.viewer.photoJob()));
        form.append('size', 'standard');
        const res = await fetch('api/jobs', { method: 'POST', body: form });
        return (await res.json()).id;
      }));
      const claim = await (await worker('api/worker/claim', { method: 'POST' })).json();
      const form = new FormData();
      form.append('seconds', '9');
      form.append('image', new Blob([new Uint8Array(frame)], { type: 'image/png' }), 'frame.png');
      await worker(`api/worker/jobs/${claim.id}/done`, { method: 'POST', body: form });
    }
    await page.click('.account__me');
    await page.click('text=/Мои рендеры/');
    await page.waitForFunction((n) => document.querySelectorAll('.render--done').length >= n, ids.length + 1);
    // Одиночное удаление спрашивает; «Не надо» — кадр на месте.
    await page.click('.render__remove >> nth=0');
    await page.waitForSelector('.render__confirm');
    await page.click('.render__confirm >> text=Не надо');
    await page.waitForFunction(() => !document.querySelector('.render__confirm'));
    step('удаление кадра переспрашивает, «Не надо» — кадр на месте');
    await page.click('.renders__select');
    for (let i = 0; i < 3; i++) await page.click(`.render.is-selecting >> nth=${i}`);
    await page.screenshot({ path: resolve(OUT, '7-select.png') });
    const href = await page.getAttribute('.renders__bulk a', 'href');
    const zip = await page.evaluate(async (u) => {
      const res = await fetch(u);
      return { status: res.status, type: res.headers.get('content-type'), size: (await res.arrayBuffer()).byteLength };
    }, href);
    if (zip.status !== 200 || !zip.type.includes('zip')) throw new Error(`архив: ${JSON.stringify(zip)}`);
    step(`выбрано 3 — архив ${Math.round(zip.size / 1024)} КБ (${href.split('?')[1]})`);
    const before = await page.$$eval('.render', (n) => n.length);
    await page.click('.renders__bulk >> text=/Удалить · 3/');
    await page.waitForSelector('.renders__bulk >> text=Да, удалить');
    await page.click('.renders__bulk >> text=Да, удалить');
    await page.waitForFunction((n) => document.querySelectorAll('.render').length === n - 3, before);
    step('«Удалить · 3» → «Да, удалить» — три кадра удалены');

    // «В редактор»: сцена кадра и макет возвращаются в «Фотореал».
    await page.evaluate(() => window.cupViewer.state.set({ tab: '3d', design: null, photo: null }));
    // Последний — первый кадр, с макетом (задания выше тест ставил без макета).
  await page.click('.render--done >> nth=-1 >> text=В редактор');
    await page.waitForFunction(() => {
      const s = window.cupViewer.state.get();
      return s.tab === 'scene' && s.design && s.photo?.angles;
    }, null, { timeout: 60000 });
    const restored = await page.evaluate(() => {
      const s = window.cupViewer.state.get();
      return `${s.sceneId} · ${s.modelId} + ${s.photo.second?.modelId ?? '—'} · ${s.photo.frame} · углы ${s.photo.angles.join('/')}`;
    });
    step(`«В редактор»: ${restored}, макет на месте`);
    await settle();
    await page.screenshot({ path: resolve(OUT, '8-reopened.png') });
  }

  // Админ — свой аккаунт: сайт открыт ему и без тарифа.
  const admin = await (await browser.newContext({ viewport: { width: 1280, height: 800 } })).newPage();
  await signup(admin, EMAIL, { pay: false });
  await admin.goto(`${BASE}admin.html`);
  await admin.waitForSelector('#users-table tr:nth-child(2)');
  await admin.screenshot({ path: resolve(OUT, '9-admin.png') });
  await admin.click('[data-tab="queue"]');
  await admin.waitForSelector('#queue-table tr:nth-child(2)');
  await admin.screenshot({ path: resolve(OUT, '10-admin-queue.png') });
  await admin.click('[data-tab="plans"]');
  await admin.waitForSelector('#plans-table tr:nth-child(2)');
  step('админка: пользователи, очередь, тарифы');
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
