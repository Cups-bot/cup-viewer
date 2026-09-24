// Сборка страниц.
//
// Делает три вещи:
//   1. собирает два входа — dist/design.js (Design Mode, index.html) и
//      dist/view.js (Client Mode, view.html). Общий движок уходит в чанк
//      dist/chunks/*-<хеш>.js, модули «по требованию» — в свои чанки;
//   2. кладёт рядом декодер Draco (vendor/draco/) — свою копию, а не с gstatic;
//   3. проставляет в HTML метку версии ?v=<хеш> у входов и стилей.
//
// Зачем сборка, а не import map:
//
//   • Карта импорта тянула three.js с unpkg.com. Для клиентской страницы это
//     и точка отказа (упал CDN — упала страница), и канал подмены кода:
//     подписать карту импорта хешами (SRI) нельзя в принципе.
//   • Карты импорта не поддерживаются Safari до 16.4. На iPhone с iOS 15–16.3
//     страница не показывала НИЧЕГО и молча.
//
// Два входа, а не флаг режима: код выбора модели, материала и загрузки
// макета импортируется только из design-входа и в клиентский бандл не
// попадает вовсе (§37).
//
// Результат сборки (dist/) лежит в репозитории: сайт разворачивается копированием
// файлов, Node на сервере не нужен. Node нужен только тому, кто правит js/.
//
// Запуск:  npm run build   ·   пересборка на лету:  npm run watch

import { build, context } from 'esbuild';
import { createHash } from 'node:crypto';
import { cp, mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const watch = process.argv.includes('--watch');

const OUTDIR = resolve(root, 'dist');

// Страница → файлы, которые получают метку версии.
const PAGES = {
  'index.html': ['js/ui/themeBoot.js', 'css/app.css', 'css/viewer.css', 'css/design.css', 'dist/design.js'],
  'view.html': ['js/ui/themeBoot.js', 'css/app.css', 'css/viewer.css', 'css/client.css', 'dist/view.js'],
};

const options = {
  entryPoints: {
    design: resolve(root, 'js/entries/design.js'),
    view: resolve(root, 'js/entries/view.js'),
  },
  bundle: true,
  splitting: true,
  format: 'esm',
  outdir: OUTDIR,
  // Хеш в имени чанка: его можно кэшировать навсегда (§51). Входы — без
  // хеша, их версию несёт ?v= в HTML.
  entryNames: '[name]',
  chunkNames: 'chunks/[name]-[hash]',
  target: ['es2020', 'chrome90', 'firefox90', 'safari15', 'edge90'],
  sourcemap: watch,
  minify: !watch,
  legalComments: 'none',
  // Модульные скрипты браузер всегда читает как UTF-8: кириллица остаётся
  // кириллицей, а не escape-последовательностями — бандл короче и по нему
  // работает grep.
  charset: 'utf8',
  logLevel: 'info',
  metafile: true,
  banner: {
    js: '/* cup-viewer — собрано npm run build. Исходники в js/, править нужно там. */',
  },
};

// Декодер Draco: из пакета three — ровно той версии, с которой собран вьювер.
const DRACO_FILES = ['draco_decoder.wasm', 'draco_wasm_wrapper.js', 'draco_decoder.js', 'README.md'];

async function vendorDraco() {
  const from = resolve(root, 'node_modules/three/examples/jsm/libs/draco');
  const to = resolve(root, 'vendor/draco');
  await rm(to, { recursive: true, force: true });
  await mkdir(to, { recursive: true });

  for (const name of DRACO_FILES) {
    await cp(resolve(from, name), resolve(to, name));
  }
  console.log(`vendor/draco — декодер на месте (${DRACO_FILES.length} файла)`);
}

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Метка версии — хеш содержимого: браузер берёт новый файл ровно тогда, когда
// он действительно изменился.
async function stampPages() {
  for (const [page, files] of Object.entries(PAGES)) {
    const path = resolve(root, page);
    let html = await readFile(path, 'utf8');
    for (const file of files) {
      const content = await readFile(resolve(root, file));
      const hash = createHash('sha256').update(content).digest('hex').slice(0, 8);
      const pattern = new RegExp(`${escapeRegExp(file)}(\\?v=[a-f0-9]+)?`, 'g');
      html = html.replace(pattern, `${file}?v=${hash}`);
    }
    await writeFile(path, html);
  }
  console.log(`${Object.keys(PAGES).join(', ')} — метки версий обновлены`);
}

// pdf.js: worker и ресурсы (шрифты, кодировки, ICC, wasm) — рядом с сайтом.
// Грузятся только при первом PDF-макете (js/design/pdfRaster.js).
const PDFJS_DIRS = ['cmaps', 'standard_fonts', 'iccs', 'wasm'];
// Скриптинг PDF (quickjs) не нужен: формы и JS в макете не исполняем.
const PDFJS_SKIP = /quickjs/;

async function vendorPdfjs() {
  const from = resolve(root, 'node_modules/pdfjs-dist');
  const to = resolve(root, 'vendor/pdfjs');
  await rm(to, { recursive: true, force: true });
  await mkdir(to, { recursive: true });
  await cp(resolve(from, 'legacy/build/pdf.worker.min.mjs'), resolve(to, 'pdf.worker.min.mjs'));
  for (const dir of PDFJS_DIRS) {
    await cp(resolve(from, dir), resolve(to, dir), {
      recursive: true,
      filter: (source) => !PDFJS_SKIP.test(source),
    });
  }
  await cp(resolve(from, 'LICENSE'), resolve(to, 'LICENSE'));
  console.log('vendor/pdfjs — worker и ресурсы pdf.js на месте');
}

async function run() {
  await vendorDraco();
  await vendorPdfjs();

  if (watch) {
    const ctx = await context(options);
    await ctx.watch();
    console.log('Слежу за js/ — правьте исходники, сборка обновляется сама.');
    return;
  }

  // Старые чанки с прежними хешами убираем: иначе dist/ копил бы их вечно.
  await rm(OUTDIR, { recursive: true, force: true });
  const result = await build(options);
  await writeFile(resolve(OUTDIR, 'meta.json'), JSON.stringify(result.metafile));
  await stampPages();
  console.log('Готово: dist/design.js, dist/view.js');
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
