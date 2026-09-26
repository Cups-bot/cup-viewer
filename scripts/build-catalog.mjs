// catalog/models.json — производная от catalog/cups.json.
//
// Единый каталог стаканов (catalog/cups.json) — один источник и для сайта, и
// для движка рендера (render/engine). Сайт читает прежний models.json: его
// формат и код, который его читает, не меняются, файл просто собирается
// отсюда. Стакан с "web": null на сайт не попадает (например, PET — до этапа В).
//
//   npm run catalog            пересобрать catalog/models.json
//   node scripts/build-catalog.mjs --check   только сверить (его зовёт check-config)

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CUPS = resolve(root, 'catalog/cups.json');
const MODELS = resolve(root, 'catalog/models.json');

// Поля записи models.json — в этом порядке, как их ждёт js/catalog/validate.js.
function modelOf(cup) {
  return {
    id: cup.id,
    name: cup.name,
    type: cup.type,
    wall: cup.wall,
    volumeMl: cup.volumeMl,
    fullVolumeMl: cup.fullVolumeMl,
    file: cup.web.file,
    size: cup.size,
    textureMapping: cup.web.textureMapping,
    materialCompatibility: cup.materialCompatibility,
    defaultMaterial: cup.defaultMaterial,
    printType: cup.printType,
    searchTerms: cup.searchTerms,
  };
}

export function buildModels(catalog) {
  const models = catalog.cups.filter((cup) => cup.web).map(modelOf);
  // Одна модель — одна строка: diff каталога читается по стаканам.
  const rows = models.map((m) => `    ${JSON.stringify(m)}`).join(',\n');
  return `{\n  "schemaVersion": 1,\n  "defaultModel": ${JSON.stringify(catalog.web.defaultModel)},\n`
    + `  "models": [\n${rows}\n  ]\n}\n`;
}

export function modelsUpToDate() {
  const want = buildModels(JSON.parse(readFileSync(CUPS, 'utf8')));
  return readFileSync(MODELS, 'utf8').replace(/\r\n/g, '\n') === want;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  if (process.argv.includes('--check')) {
    if (!modelsUpToDate()) {
      console.error('catalog/models.json отстал от catalog/cups.json — npm run catalog');
      process.exit(1);
    }
    console.log('catalog/models.json совпадает с catalog/cups.json');
  } else {
    writeFileSync(MODELS, buildModels(JSON.parse(readFileSync(CUPS, 'utf8'))));
    console.log('catalog/models.json собран из catalog/cups.json');
  }
}
