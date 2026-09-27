import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { gunzipSync } from 'node:zlib';
import { applyCube } from '../../js/design/proof.js';
import { createViewerState } from '../../js/state/viewerState.js';
import { createCatalog } from '../../js/catalog/catalog.js';

const read = (path) => JSON.parse(readFileSync(new URL(`../../${path}`, import.meta.url), 'utf8'));
const catalog = createCatalog({
  models: read('catalog/models.json'),
  materials: read('catalog/materials.json'),
  backgrounds: read('catalog/backgrounds.json'),
  scenes: read('catalog/scenes/index.json'),
});
const manifest = read('catalog/proof/manifest.json');
const cubeOf = (key) => {
  const data = new Uint8Array(gunzipSync(readFileSync(new URL(`../../catalog/proof/${key}.cube.gz`, import.meta.url))));
  return { side: manifest.side, data };
};

test('профиль картона: мелованный, немелованный, Soft Touch — есть; крафт и пластик — нет', () => {
  const keys = Object.fromEntries(catalog.materials.map((m) => [m.id, m.proof ?? null]));
  assert.deepEqual(keys, {
    coated: 'coated', uncoated: 'uncoated', 'soft-touch': 'varnish', kraft: null, 'pp-frosted': null, 'pet-clear': null,
  });
  for (const key of Object.values(keys).filter(Boolean)) {
    const cube = cubeOf(key);
    assert.equal(cube.data.length, manifest.side ** 3 * 3, key);
  }
});

test('куб: белый — цвет картона из паспорта, чёрный — первый узел, прозрачность не трогается', () => {
  for (const paper of manifest.papers) {
    const cube = cubeOf(paper.key);
    const px = new Uint8ClampedArray([255, 255, 255, 77, 0, 0, 0, 255]);
    applyCube(px, cube);
    assert.deepEqual([...px.slice(0, 4)], [...paper.paperWhite, 77], paper.key);
    assert.deepEqual([...px.slice(4, 7)], [...cube.data.slice(0, 3)], `${paper.key}: чёрный — первый узел`);
  }
});

test('имитация меняет цвет: белый лист на картоне не белый, насыщенный синий глуше', () => {
  const cube = cubeOf('uncoated');
  const px = new Uint8ClampedArray([255, 255, 255, 255, 0, 0, 255, 255]);
  applyCube(px, cube);
  assert.ok(px[2] < 250, 'белый картон — тёплый');
  assert.ok(px[6] < 200, 'синий сRGB на немелованном не печатается');
});

test('состояние: proof — только да или нет, по умолчанию выключено', () => {
  const state = createViewerState({ catalog, warn: () => {} });
  assert.equal(state.get().proof, false);
  state.set({ proof: true });
  assert.equal(state.get().proof, true);
  assert.throws(() => state.set({ proof: 'uncoated' }), /proof/);
});
