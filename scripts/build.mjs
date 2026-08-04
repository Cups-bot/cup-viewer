// Сборка страницы.
//
// Делает три вещи:
//   1. собирает весь JS в один файл dist/cup-viewer.js;
//   2. кладёт рядом декодер Draco (vendor/draco/) — свою копию, а не с gstatic;
//   3. проставляет в index.html метку версии ?v=<хеш> у скриптов и стилей.
//
// Зачем сборка, а не import map, как было раньше:
//
//   • Карта импорта тянула three.js с unpkg.com. Для клиентской страницы это
//     и точка отказа (упал CDN — упала страница), и канал подмены кода:
//     подписать карту импорта хешами (SRI) нельзя в принципе.
//   • Карты импорта не поддерживаются Safari до 16.4. На iPhone с iOS 15–16.3
//     страница не показывала НИЧЕГО и молча.
//   • Двадцать с лишним модулей превращаются в один запрос.
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

const ENTRY = resolve(root, 'js/main.js');
const OUTFILE = resolve(root, 'dist/cup-viewer.js');
const INDEX = resolve(root, 'index.html');

// Файлы, у которых index.html должен получить метку версии.
const VERSIONED = ['css/style.css', 'css/approve.css', 'dist/cup-viewer.js'];

const options = {
  entryPoints: [ENTRY],
  bundle: true,
  format: 'esm',
  // Цель — браузеры, которые точно встретятся у клиентов типографии.
  // Safari 15 здесь принципиален: именно он не понимает карты импорта.
  target: ['es2020', 'chrome90', 'firefox90', 'safari15', 'edge90'],
  outfile: OUTFILE,
  // Карта исходников только в режиме слежения: в репозитории она весила бы
  // 2,7 МБ при 650 КБ самой сборки, а исходники и так лежат рядом, в js/.
  sourcemap: watch,
  minify: !watch,
  legalComments: 'none',
  logLevel: 'info',
  banner: {
    js: '/* cup-viewer — собрано npm run build. Исходники в js/, править нужно там. */',
  },
};

// Декодер Draco. Грузится лениво и только если модель действительно сжата,
// но лежать обязан на своём домене.
//
// Берём ровно те три файла, которые запрашивает DRACOLoader: wasm-декодер, его
// обёртку и js-вариант на случай браузера без WebAssembly. Подпапка gltf/ из
// поставки three — второй такой же комплект под другой путь декодера, нам он не
// нужен; кодировщик на клиенте не нужен тем более.
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

// Метка версии в адресе файла. Без неё браузеры и кеш Битрикса продолжают
// отдавать старый bundle после выкладки, и «у меня не обновилось» становится
// постоянным сопровождением каждого релиза.
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

async function stampIndex() {
  let html = await readFile(INDEX, 'utf8');

  for (const file of VERSIONED) {
    const content = await readFile(resolve(root, file));
    const hash = createHash('sha256').update(content).digest('hex').slice(0, 8);
    // Ловим и адрес без метки, и адрес с уже проставленной.
    const pattern = new RegExp(`${escapeRegExp(file)}(\\?v=[a-f0-9]+)?`, 'g');
    html = html.replace(pattern, `${file}?v=${hash}`);
  }

  await writeFile(INDEX, html);
  console.log('index.html — метки версий обновлены');
}

async function run() {
  await mkdir(dirname(OUTFILE), { recursive: true });
  await vendorDraco();

  if (watch) {
    const ctx = await context(options);
    await ctx.watch();
    console.log('Слежу за js/ — правьте исходники, сборка обновляется сама.');
    return;
  }

  await build(options);
  await stampIndex();
  console.log('Готово: dist/cup-viewer.js');
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
