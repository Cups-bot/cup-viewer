import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CAPABILITIES, createModeController } from '../../js/state/modeController.js';
import { createViewerState } from '../../js/state/viewerState.js';
import { catalog } from './fixtures.mjs';

const quiet = () => {};

// Ожидаемая таблица §37 — независимая копия: порча CAPABILITIES ломает тест.
// Режим один (владелец, 2026-09-27: общий сервис, страницы клиента нет).
const EXPECTED = {
  changeModel: true, changeMaterial: true, uploadDesign: true, export: true,
  changeBackground: true, openScene: true, arrangeScene: true, openUnwrap: true, camera: true, autoRotate: true,
  fullscreen: true,
};

for (const [capability, allowed] of Object.entries(EXPECTED)) {
  test(`design: ${capability} — ${allowed ? 'можно' : 'нельзя'}`, () => {
    const warnings = [];
    const controller = createModeController('design', { warn: (m) => warnings.push(m) });
    assert.equal(controller.can(capability), allowed);
    assert.equal(controller.check(capability), allowed);
    assert.equal(warnings.length, 0);
  });
}

test('таблица capabilities заморожена и не содержит лишнего', () => {
  assert.ok(Object.isFrozen(CAPABILITIES) && Object.isFrozen(CAPABILITIES.design));
  assert.deepEqual(Object.keys(CAPABILITIES), ['design']);
  assert.deepEqual(Object.keys(CAPABILITIES.design).sort(), Object.keys(EXPECTED).sort());
});

test('экспорт: фото, ракурсы, оборот, развёртка; исходника нет', () => {
  const design = createModeController('design');
  for (const kind of ['photo', 'angles', 'turn', 'unwrap']) assert.ok(design.canExport(kind), kind);
  assert.ok(!design.canExport('source'));
});

test('неизвестный режим — ошибка', () => {
  assert.throws(() => createModeController('client'));
  assert.throws(() => createModeController('admin'));
});

test('design после lock: всё можно', () => {
  const cat = catalog();
  const state = createViewerState({ catalog: cat, warn: quiet });
  const mode = createModeController('design', { warn: quiet });
  mode.attach(state, cat);
  mode.lock();
  assert.equal(state.set({ modelId: 'PP-500', backgroundId: 'gray', design: { textureUrl: 'x.png' } }), true);
  assert.equal(state.set({ photo: { preset: 'front', frame: '4:5' } }), true);
});
