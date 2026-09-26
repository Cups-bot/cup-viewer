import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createViewerState } from '../../js/state/viewerState.js';
import { catalog } from './fixtures.mjs';

const tick = () => new Promise((resolve) => queueMicrotask(resolve));
const quiet = () => {};

test('несколько set() одного такта — один вызов подписчика', async () => {
  const state = createViewerState({ catalog: catalog(), warn: quiet });
  const calls = [];
  state.subscribe(null, (s, changed) => calls.push([...changed].sort()));
  state.set({ modelId: 'HB80-280' });
  state.set({ backgroundId: 'gray' });
  state.set({ tab: 'unwrap' });
  assert.equal(calls.length, 0, 'до микротаска подписчик молчит');
  await tick();
  assert.equal(calls.length, 1);
  assert.deepEqual(calls[0], ['backgroundId', 'materialId', 'modelId', 'tab']);
});

test('подписка по ключам срабатывает только на свои ключи', async () => {
  const state = createViewerState({ catalog: catalog(), warn: quiet });
  let hits = 0;
  state.subscribe(['tab'], () => hits++);
  state.set({ backgroundId: 'gray' });
  await tick();
  assert.equal(hits, 0);
  state.set({ tab: 'scene' });
  await tick();
  assert.equal(hits, 1);
});

test('отписка прекращает уведомления', async () => {
  const state = createViewerState({ catalog: catalog(), warn: quiet });
  let hits = 0;
  const off = state.subscribe(null, () => hits++);
  off();
  state.set({ tab: 'unwrap' });
  await tick();
  assert.equal(hits, 0);
});

test('одинаковое значение не считается изменением', async () => {
  const state = createViewerState({ catalog: catalog(), warn: quiet });
  let hits = 0;
  state.subscribe(null, () => hits++);
  assert.equal(state.set({ tab: '3d' }), false);
  await tick();
  assert.equal(hits, 0);
});

test('неизвестный ключ: throw в dev, warn и пропуск в prod', () => {
  const dev = createViewerState({ catalog: catalog(), dev: true, warn: quiet });
  assert.throws(() => dev.set({ colour: 'red' }), /неизвестный ключ/);
  const warnings = [];
  const prod = createViewerState({ catalog: catalog(), dev: false, warn: (m) => warnings.push(m) });
  prod.set({ colour: 'red', tab: 'unwrap' });
  assert.equal(warnings.length, 1);
  assert.equal(prod.get().tab, 'unwrap');
  assert.equal('colour' in prod.get(), false);
});

test('modelId не из каталога — throw', () => {
  const state = createViewerState({ catalog: catalog(), warn: quiet });
  assert.throws(() => state.set({ modelId: 'NOPE-1' }), /нет в каталоге/);
  assert.equal(state.get().modelId, null);
});

test('несовместимый материал → материал модели по умолчанию + warn', () => {
  const warnings = [];
  const state = createViewerState({ catalog: catalog(), warn: (m) => warnings.push(m) });
  state.set({ modelId: 'PP-500', materialId: 'coated' });
  assert.equal(state.get().materialId, 'pp-frosted');
  assert.equal(warnings.length, 1);
});

test('смена модели уводит с чужого материала без предупреждения', () => {
  const warnings = [];
  const state = createViewerState({ catalog: catalog(), warn: (m) => warnings.push(m) });
  state.set({ modelId: 'HB80-280', materialId: 'coated' });
  state.set({ modelId: 'PP-500' });
  assert.equal(state.get().materialId, 'pp-frosted');
  assert.equal(warnings.length, 0);
});

test('состояние заморожено: мутация снаружи невозможна', () => {
  const state = createViewerState({ catalog: catalog(), warn: quiet });
  state.set({ design: { textureUrl: 'a.png', unwrapUrl: 'b.png', width: 1, height: 1 } });
  assert.throws(() => {
    state.get().tab = 'scene';
  }, TypeError);
  assert.ok(Object.isFrozen(state.get().design));
});

test('охрана отклоняет патч целиком', () => {
  const state = createViewerState({ catalog: catalog(), warn: quiet });
  state.setGuard((patch) => !('modelId' in patch));
  assert.equal(state.set({ modelId: 'HB80-280', tab: 'unwrap' }), false);
  assert.equal(state.get().tab, '3d');
});

test('photo: формат и второй стакан проверяются, значения замораживаются', () => {
  const state = createViewerState({ catalog: catalog(), warn: quiet });
  assert.throws(() => state.set({ photo: { frame: '16:9' } }), /формат кадра/);
  assert.throws(() => state.set({ photo: { second: { modelId: 'NOPE' } } }), /второго стакана/);
  assert.throws(() => state.set({ photo: { second: { modelId: 'HB80-280', kind: 'stack' } } }), /раскладка/);
  state.set({ photo: { preset: 'high', second: { modelId: 'HB80-280' } } });
  const { photo } = state.get();
  assert.deepEqual(photo, { preset: 'high', frame: '1:1', second: { modelId: 'HB80-280', kind: 'pair' }, angles: null });
  assert.throws(() => state.set({ photo: { angles: [0, 1, 2] } }), /angles/);
  assert.ok(Object.isFrozen(photo) && Object.isFrozen(photo.second));
  state.set({ photo: null });
  assert.equal(state.get().photo, null);
});
