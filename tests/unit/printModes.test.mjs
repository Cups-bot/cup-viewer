import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { asPrinted, defaultPrintMode, printModesOf, zoneMmOf } from '../../js/catalog/printModes.js';
import { createViewerState } from '../../js/state/viewerState.js';
import { createCatalog } from '../../js/catalog/catalog.js';

const read = (path) => JSON.parse(readFileSync(new URL(`../../${path}`, import.meta.url), 'utf8'));
const catalog = createCatalog({
  models: read('catalog/models.json'),
  materials: read('catalog/materials.json'),
  backgrounds: read('catalog/backgrounds.json'),
  scenes: read('catalog/scenes/index.json'),
});

test('виды печати: BM — шелкотрафарет и тампопечать, PET — тампопечать, бумага — нет', () => {
  assert.deepEqual(printModesOf(catalog.model('BM90-410')), ['silk', 'pad']);
  assert.deepEqual(printModesOf(catalog.model('PG95-400')), ['pad']);
  assert.deepEqual(printModesOf(catalog.model('HB80-280')), []);
  assert.equal(defaultPrintMode(catalog.model('BM90-500')), 'silk');
});

test('шелкотрафарет BM — поле 204 × 77 / 100 / 110 (владелец, 2026-09-27)', () => {
  assert.deepEqual(catalog.model('BM90-410').textureMapping.unwrapMm, [204, 77]);
  assert.deepEqual(catalog.model('BM90-500').textureMapping.unwrapMm, [204, 100]);
  assert.deepEqual(catalog.model('BM90-655').textureMapping.unwrapMm, [204, 110]);
});

test('тампопечать: зона 25 мм, высота по шаблонам Формации', () => {
  const zones = Object.fromEntries(['BM90-410', 'BM90-500', 'BM90-655', 'PG95-400', 'PG95-520', 'PG95-600']
    .map((id) => [id, zoneMmOf(asPrinted(catalog.model(id), 'pad').textureMapping.sides).map((v) => Math.round(v))]));
  assert.deepEqual(zones, {
    'BM90-410': [25, 80], 'BM90-500': [25, 81], 'BM90-655': [25, 85],
    'PG95-400': [25, 45], 'PG95-520': [25, 64], 'PG95-600': [25, 80],
  });
});

test('модель в виде печати — один объект (движок узнаёт модель по ссылке)', () => {
  const bm = catalog.model('BM90-410');
  assert.equal(asPrinted(bm, 'pad'), asPrinted(bm, 'pad'));
  assert.equal(asPrinted(bm, 'silk'), bm);
  const padded = asPrinted(bm, 'pad').textureMapping;
  assert.deepEqual(padded.field, bm.textureMapping.pad.field);
  // Стороны BM — в четверти окружности от середины полосы (центральные линии шаблона).
  assert.ok(Math.abs(padded.sides.offsetMm.A + bm.textureMapping.pad.circumferenceMm / 4) < 1e-9);
});

test('состояние: вид печати подходит стакану', () => {
  const state = createViewerState({ catalog, warn: () => {} });
  state.set({ modelId: 'BM90-410' });
  assert.equal(state.get().printMode, 'silk');
  state.set({ printMode: 'pad' });
  assert.equal(state.get().printMode, 'pad');
  state.set({ modelId: 'PG95-400' });
  assert.equal(state.get().printMode, 'pad');
  state.set({ printMode: 'silk' });
  assert.equal(state.get().printMode, 'pad', 'PET — только тампопечать');
  state.set({ modelId: 'HB80-280' });
  assert.equal(state.get().printMode, null);
});
