// ViewerState — единственный источник истины Viewer (§36). Без зависимостей:
// каталог передаётся снаружи объектом с методами model(id) и material(id).
//
//   const state = createViewerState({ catalog });
//   state.set({ modelId: 'HB80-280' });
//   const off = state.subscribe(['modelId', 'materialId'], (s, changed) => …);
//
// Уведомления батчатся: все set() одного такта дают один вызов подписчика в
// микротаске — и один кадр рендера на пачку изменений.

import { printModesOf } from '../catalog/printModes.js';

export const STATE_KEYS = Object.freeze([
  'modelId',
  'materialId',
  // Вид печати пластика (js/catalog/printModes.js): 'silk' | 'pad' | null.
  'printMode',
  // «Имитация картона» (js/design/proof.js): печать бумаги — через профиль
  // картона материала. Выключена — цвет как в файле (§15).
  'proof',
  'backgroundId',
  'sceneId',
  'design',
  // Макет второго стакана «Фотореала» (CupViewer v2): того же вида, что design.
  // null — у пары макет главного, у другого стакана — чистый лист.
  'design2',
  'tab',
  'autoRotate',
  'view',
  'fullscreen',
  'photo',
]);

export const TABS = Object.freeze(['3d', 'unwrap', 'scene']);

// Фото-сцена (CupViewer v2, этап Б): ракурс сцены, формат кадра и второй
// стакан. null — как в сцене: первый ракурс, 1:1, один стакан. Стаканы в
// сцене не двигаются — места выбирает раскладка, как у рендера.
export const PHOTO_FRAMES = Object.freeze(['1:1', '3:4', '4:5']);
export const PHOTO_KINDS = Object.freeze(['pair', 'side']);

const DEFAULTS = Object.freeze({
  modelId: null,
  materialId: null,
  printMode: null,
  proof: false,
  backgroundId: null,
  sceneId: null,
  design: null,
  design2: null,
  tab: '3d',
  autoRotate: true,
  view: null,
  fullscreen: false,
  photo: null,
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
    if ('proof' in out && typeof out.proof !== 'boolean') fail('proof — ожидается true | false');
    if ('tab' in out && !TABS.includes(out.tab)) fail(`вкладка «${out.tab}» — ожидается ${TABS.join(' | ')}`);
    if ('photo' in out && out.photo !== null) {
      const p = out.photo;
      if (typeof p !== 'object') fail('photo — ожидается { preset, frame, second } или null');
      const frame = p.frame ?? '1:1';
      if (!PHOTO_FRAMES.includes(frame)) fail(`формат кадра «${frame}» — ожидается ${PHOTO_FRAMES.join(' | ')}`);
      let second = null;
      if (p.second) {
        if (!catalog?.model(p.second.modelId)) fail(`второго стакана «${p.second.modelId}» нет в каталоге`);
        const kind = p.second.kind ?? 'pair';
        if (!PHOTO_KINDS.includes(kind)) fail(`раскладка «${kind}» — ожидается ${PHOTO_KINDS.join(' | ')}`);
        second = Object.freeze({ modelId: p.second.modelId, kind });
      }
      // angles — углы стаканов, как их повернул пользователь: пишет публикация
      // ссылки, чтобы клиент увидел ту же сторону дизайна.
      let angles = null;
      if (p.angles != null) {
        if (!Array.isArray(p.angles) || p.angles.length > 2 || !p.angles.every(Number.isFinite)) {
          fail('photo.angles — ожидается [угол главного, угол второго?] в градусах');
        }
        angles = Object.freeze([...p.angles]);
      }
      out.photo = Object.freeze({ preset: p.preset ?? null, frame, second, angles });
    }
    for (const key of ['design', 'design2']) {
      if (key in out && out[key] !== null) {
        if (typeof out[key] !== 'object' || typeof out[key].textureUrl !== 'string') {
          fail(`${key} — ожидается { textureUrl, unwrapUrl, width, height } или null`);
        }
        out[key] = Object.freeze({ ...out[key] });
      }
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
    // Вид печати обязан подходить стакану: BM — шелкотрафарет или
    // тампопечать, PET — тампопечать, бумага — без вида. Смена стакана без
    // явного вида — его вид по умолчанию.
    if (model && ('modelId' in out || 'printMode' in out)) {
      const modes = printModesOf(model);
      const wanted = 'printMode' in out ? out.printMode : current.printMode;
      out.printMode = modes.includes(wanted) ? wanted : (modes[0] ?? null);
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
