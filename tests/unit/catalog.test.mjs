import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { validateCatalog } from '../../js/catalog/validate.js';
import { rawCatalog, model } from './fixtures.mjs';

test('исправный каталог — без ошибок', () => {
  const result = validateCatalog(rawCatalog());
  assert.deepEqual(result.errors, []);
  assert.equal(result.models.length, 2);
});

test('битая запись исключается, остальные остаются', () => {
  const raw = rawCatalog();
  raw.models.models.push('это не объект');
  const result = validateCatalog(raw);
  assert.equal(result.models.length, 2);
  assert.equal(result.errors.length, 1);
  assert.match(result.errors[0], /catalog\/models\.json: models\[2\]: запись не объект/);
});

test('пропущенное поле — сообщение с файлом, записью и полем', () => {
  const raw = rawCatalog();
  delete raw.models.models[0].size.heightMm;
  const result = validateCatalog(raw);
  assert.deepEqual(result.models.map((m) => m.id), ['PP-500']);
  assert.match(result.errors[0], /catalog\/models\.json: models\[0\] \(HB80-280\): поле size\.heightMm/);
});

test('неизвестный материал в совместимости — запись исключается', () => {
  const raw = rawCatalog();
  raw.models.models.push(model({ id: 'DW80-280', type: 'paper', compat: ['coated', 'velvet'], def: 'coated' }));
  const result = validateCatalog(raw);
  assert.ok(!result.models.some((m) => m.id === 'DW80-280'));
  assert.match(result.errors[0], /\(DW80-280\): поле materialCompatibility/);
});

test('defaultMaterial вне совместимости — ошибка', () => {
  const raw = rawCatalog();
  raw.models.models[1].defaultMaterial = 'coated';
  const result = validateCatalog(raw);
  assert.match(result.errors[0], /\(PP-500\): поле defaultMaterial/);
});

test('повтор id — вторая запись исключается', () => {
  const raw = rawCatalog();
  raw.backgrounds.backgrounds.push({ id: 'light', name: 'Дубль', color: '#000000', sweep: 0 });
  const result = validateCatalog(raw);
  assert.equal(result.backgrounds.length, 2);
  assert.match(result.errors[0], /id повторяется/);
});

test('нет файла — ошибка, но остальные каталоги целы', () => {
  const raw = rawCatalog();
  delete raw.brands;
  const result = validateCatalog(raw);
  assert.equal(result.brands.length, 0);
  assert.equal(result.models.length, 2);
  assert.match(result.errors[0], /brands\.json: нет массива/);
});

test('настоящие файлы catalog/ проходят проверку', () => {
  const read = (path) => JSON.parse(readFileSync(new URL(`../../${path}`, import.meta.url), 'utf8'));
  const result = validateCatalog({
    models: read('catalog/models.json'),
    materials: read('catalog/materials.json'),
    backgrounds: read('catalog/backgrounds.json'),
    scenes: read('catalog/scenes/index.json'),
    brands: read('catalog/brands.json'),
  });
  assert.deepEqual(result.errors, []);
  assert.equal(result.models.length, 19);
});
