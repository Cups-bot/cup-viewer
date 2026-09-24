// ViewerState — единственный источник истины Viewer (§36). Без зависимостей:
// каталог передаётся снаружи объектом с методами model(id) и material(id).
//
//   const state = createViewerState({ catalog });
//   state.set({ modelId: 'HB80-280' });
//   const off = state.subscribe(['modelId', 'materialId'], (s, changed) => …);
//
// Уведомления батчатся: все set() одного такта дают один вызов подписчика в
// микротаске — и один кадр рендера на пачку изменений.

export const STATE_KEYS = Object.freeze([
  'modelId',
  'materialId',
  'backgroundId',
  'sceneId',
  'brandId',
  'title',
  'design',
  'tab',
  'autoRotate',
  'view',
  'fullscreen',
]);

export const TABS = Object.freeze(['3d', 'unwrap', 'scene']);

const DEFAULTS = Object.freeze({
  modelId: null,
  materialId: null,
  backgroundId: null,
  sceneId: null,
  brandId: null,
  title: null,
  design: null,
  tab: '3d',
  autoRotate: true,
  view: null,
  fullscreen: false,
});

const KNOWN = new Set(STATE_KEYS);

export function createViewerState({ catalog, initial = {}, dev = false, warn = console.warn } = {}) {
  let state = Object.freeze({ ...DEFAULTS });
  let guard = null;
  const subscribers = new Set();
  let pending = null;

  function fail(message) {
    throw new Error(`ViewerState: ${message}`);
  }

  // Проверяет патч и приводит его к допустимому виду. Возвращает новый патч.
  function normalize(patch, current) {
    const out = {};
    for (const [key, value] of Object.entries(patch)) {
      if (!KNOWN.has(key)) {
        if (dev) fail(`неизвестный ключ «${key}»`);
        warn(`ViewerState: неизвестный ключ «${key}» пропущен`);
        continue;
      }
      out[key] = value;
    }

    if ('modelId' in out && out.modelId !== null && !catalog?.model(out.modelId)) {
      fail(`модели «${out.modelId}» нет в каталоге`);
    }
    if ('backgroundId' in out && out.backgroundId !== null && !catalog?.background?.(out.backgroundId)) {
      fail(`фона «${out.backgroundId}» нет в каталоге`);
    }
    if ('tab' in out && !TABS.includes(out.tab)) fail(`вкладка «${out.tab}» — ожидается ${TABS.join(' | ')}`);
    if ('design' in out && out.design !== null) {
      if (typeof out.design !== 'object' || typeof out.design.textureUrl !== 'string') {
        fail('design — ожидается { textureUrl, unwrapUrl, width, height } или null');
      }
      out.design = Object.freeze({ ...out.design });
    }

    // Материал обязан подходить модели: несовместимый заменяется материалом
    // модели по умолчанию. Предупреждаем, только если материал просили явно —
    // смена модели сама по себе законно уводит с чужого материала.
    const modelId = 'modelId' in out ? out.modelId : current.modelId;
    const model = modelId ? catalog?.model(modelId) : null;
    const materialId = 'materialId' in out ? out.materialId : current.materialId;
    if (model && !model.materialCompatibility.includes(materialId)) {
      if ('materialId' in out && materialId !== null) {
        warn(`ViewerState: материал «${materialId}» не подходит модели «${model.id}» — взят «${model.defaultMaterial}»`);
      }
      out.materialId = model.defaultMaterial;
    }
    return out;
  }

  function flush() {
    const changed = pending;
    pending = null;
    for (const subscriber of [...subscribers]) {
      if (!subscribers.has(subscriber)) continue;
      if (subscriber.keys && !subscriber.keys.some((key) => changed.has(key))) continue;
      subscriber.fn(state, changed);
    }
  }

  function apply(patch) {
    const next = { ...state };
    const changed = [];
    for (const [key, value] of Object.entries(patch)) {
      if (Object.is(state[key], value)) continue;
      next[key] = value;
      changed.push(key);
    }
    if (changed.length === 0) return false;
    state = Object.freeze(next);
    if (!pending) {
      pending = new Set();
      queueMicrotask(flush);
    }
    for (const key of changed) pending.add(key);
    return true;
  }

  const api = {
    get: () => state,

    // Возвращает true, если состояние изменилось; false — если патч отклонён
    // охраной режима или ничего не поменял.
    set(patch) {
      if (!patch || typeof patch !== 'object') fail('set() ждёт объект');
      const normalized = normalize(patch, state);
      if (guard && !guard(normalized, state)) return false;
      return apply(normalized);
    },

    // keys — массив ключей или null (любое изменение). fn(state, changedKeys).
    subscribe(keys, fn) {
      const subscriber = { keys: keys ? [...keys] : null, fn };
      subscribers.add(subscriber);
      return () => subscribers.delete(subscriber);
    },

    // Охрана режима (ModeController): получает нормализованный патч и текущее
    // состояние, false — отказ. Одна на состояние.
    setGuard(fn) {
      guard = fn;
    },
  };

  if (Object.keys(initial).length) api.set(initial);
  return Object.freeze(api);
}
