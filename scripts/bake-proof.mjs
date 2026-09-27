// Кубы «Имитации картона»: цвет макета → цвет на картоне, по профилям типографии.
//
//   node scripts/bake-proof.mjs [путь к ColorPalette]
//
// Профили и сам расчёт — из Color Palette (Cups-bot/ColorPalette): таблицы
// data/lut/<картон>.*.bin и lib/color/proof.ts. Код оттуда не копируется, а
// собирается здесь же esbuild'ом — куб выходит тем же, что на её вкладке
// «Изображение»: подбор красок по ΔE2000, печать — Absolute Colorimetric
// (картон не белый). Сайт и рендер берут готовые кубы из catalog/proof/, так
// что считать их в браузере (полторы секунды на картон) не нужно.
//
// Пересобрать после новой выпечки таблиц в Color Palette (npm run data:lut там).
import { build } from 'esbuild';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const palette = resolve(process.argv[2] ?? join(root, '..', 'ColorPalette'));
const out = join(root, 'catalog', 'proof');

const bundle = await build({
  stdin: {
    contents: `export { buildProofCube } from './lib/color/proof';
               export { decodePaper } from './lib/color/tables';`,
    resolveDir: palette,
    loader: 'ts',
  },
  absWorkingDir: palette,
  bundle: true,
  write: false,
  format: 'esm',
  platform: 'node',
  logLevel: 'warning',
});
const url = `data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString('base64')}`;
const { buildProofCube, decodePaper } = await import(url);

const manifest = JSON.parse(await readFile(join(palette, 'data', 'lut', 'manifest.json'), 'utf8'));
await mkdir(out, { recursive: true });
const papers = [];
for (const paper of manifest.papers) {
  const read = (table) => readFile(join(palette, 'data', 'lut', `${paper.key}.${table}.bin`));
  const [print, screen, lab] = await Promise.all(['print', 'screen', 'lab'].map(read));
  const started = performance.now();
  const tables = await decodePaper(paper.n, { print, screen, lab });
  const cube = buildProofCube(tables);
  const file = `${paper.key}.cube.gz`;
  await writeFile(join(out, file), gzipSync(Buffer.from(cube.data), { level: 9 }));
  // Белый лист на этом картоне — для проверки глазом и для подписи.
  const last = (cube.side ** 3 - 1) * 3;
  const paperWhite = Array.from(cube.data.slice(last, last + 3));
  papers.push({ key: paper.key, file, paperWhite });
  console.log(`${paper.key}: куб ${cube.side}³ за ${((performance.now() - started) / 1000).toFixed(1)} с, белый лист ${paperWhite.join(', ')}`);
}

await writeFile(join(out, 'manifest.json'), `${JSON.stringify({
  format: 'proof-cube/1',
  side: 33,
  // Узел ((r·side + g)·side + b)·3 — RGB печати для цвета макета (r, g, b)
  // на сетке 0…255 с шагом 255/(side−1); между узлами — трилинейно.
  layout: 'rgb8, r-major',
  source: { project: 'ColorPalette', lut: manifest.version, bakedAt: manifest.bakedAt },
  papers,
}, null, 2)}\n`);
console.log(`→ ${out}`);
