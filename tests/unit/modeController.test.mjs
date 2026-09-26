import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CAPABILITIES, createModeController } from '../../js/state/modeController.js';
import { createViewerState } from '../../js/state/viewerState.js';
import { catalog } from './fixtures.mjs';

const quiet = () => {};

// Ожидаемая таблица §37 — независимая копия: порча CAPABILITIES ломает тест.
// arrangeScene — CupViewer v2, этап Б: раскладку фото-сцены (ракурс, формат,
// второй стакан) собирает пользователь, клиент по ссылке только смотрит.
const EXPECTED = {
  design: {
    changeModel: true, changeMaterial: true, uploadDesign: true, publish: true, export: true,
    changeBackground: true, openScene: true, arrangeScene: true, openUnwrap: true, camera: true, autoRotate: true,
    fullscreen: true,
  },
  client: {
    changeModel: false, changeMaterial: false, uploadDesign: false, publish: false, export: true,
    changeBackground: true, openScene: true, arrangeScene: false, openUnwrap: true, camera: true, autoRotate: true,
    fullscreen: true,
  },
};

for (const mode of ['design', 'client']) {
  for (const [capability, allowed] of Object.entries(EXPECTED[mode])) {
    test(`${mode}: ${capability} — ${allowed ? 'можно' : 'нельзя'}`, () => {
      const warnings = [];
      const controller = createModeController(mode, { warn: (m) => warnings.push(m) });
      assert.equal(controller.can(capability), allowed);
      assert.equal(controller.check(capability), allowed);
      assert.equal(warnings.length, allowed ? 0 : 1, 'отказ пишет предупреждение');
    });
  }
}

test('таблица capabilities заморожена и не содержит лишнего', () => {
  assert.ok(Object.isFrozen(CAPABILITIES) && Object.isFrozen(CAPABILITIES.client));
  for (const mode of ['design', 'client']) {
    assert.deepEqual(Object.keys(CAPABILITIES[mode]).sort(), Object.keys(EXPECTED[mode]).sort());
  }
});

test('экспорт: design — full, client — limited', () => {
  const design = createModeController('design');
  const client = createModeController('client');
  for (const kind of ['photo', 'angles', 'turn', 'unwrap']) {
    assert.ok(design.canExport(kind), kind);
    assert.ok(client.canExport(kind), kind);
  }
  assert.ok(!client.canExport('source') && !design.canExport('source'));
});

test('неизвестный режим — ошибка', () => {
  assert.throws(() => createModeController('admin'));
});

function clientState() {
  const cat = catalog();
  const state = createViewerState({ catalog: cat, warn: quiet });
  const mode = createModeController('client', { warn: quiet });
  mode.attach(state, cat);
  state.set({ modelId: 'HB80-280', materialId: 'uncoated', backgroundId: 'light', design: { textureUrl: 't.png' } });
  mode.lock();
  return state;
}

test('client после lock: модель, материал, дизайн не меняются', () => {
  const state = clientState();
  const before = state.get();
  assert.equal(state.set({ modelId: 'PP-500' }), false);
  assert.equal(state.set({ materialId: 'coated' }), false);
  assert.equal(state.set({ design: { textureUrl: 'other.png' } }), false);
  assert.equal(state.get(), before);
});

test('client: только клиентские фоны; вкладки и автоповорот — можно', () => {
  const state = clientState();
  assert.equal(state.set({ backgroundId: 'gray' }), false);
  assert.equal(state.get().backgroundId, 'light');
  assert.equal(state.set({ tab: 'unwrap', autoRotate: false }), true);
});

test('design после lock: всё можно', () => {
  const cat = catalog();
  const state = createViewerState({ catalog: cat, warn: quiet });
  const mode = createModeController('design', { warn: quiet });
  mode.attach(state, cat);
  mode.lock();
  assert.equal(state.set({ modelId: 'PP-500', backgroundId: 'gray', design: { textureUrl: 'x.png' } }), true);
});

test('client после lock: раскладку фото-сцены не меняет', () => {
  const state = clientState();
  const before = state.get();
  assert.equal(state.set({ photo: { preset: 'high', frame: '4:5' } }), false);
  assert.equal(state.get(), before);
});
