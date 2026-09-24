// ModeController — права режимов (§37). Режим задаёт точка входа (design.js
// или view.js), а не параметр адреса: по ссылке клиента Design Mode не открыть.
//
// Запреты логические. Действие, меняющее модель, материал, дизайн, публикацию
// или полный экспорт, спрашивает can()/check(); а охрана на ViewerState
// отклоняет такие патчи и тогда, когда их пытаются сделать в обход UI —
// например, из консоли.

export const CAPABILITIES = Object.freeze({
  design: Object.freeze({
    changeModel: true,
    changeMaterial: true,
    uploadDesign: true,
    publish: true,
    export: 'full',
    changeBackground: 'all',
    openScene: true,
    openUnwrap: true,
    camera: true,
    autoRotate: true,
    fullscreen: true,
  }),
  client: Object.freeze({
    changeModel: false,
    changeMaterial: false,
    uploadDesign: false,
    publish: false,
    export: 'limited',
    changeBackground: 'client',
    openScene: true,
    openUnwrap: true,
    camera: true,
    autoRotate: true,
    fullscreen: true,
  }),
});

// Что можно выгрузить при каждом уровне export (§20, §29). Владелец решил
// дать клиенту тот же простой набор, что и сотруднику: фото 2048×2048,
// 4 ракурса, оборот, развёртка. Уровни оставлены: их различит бэкенд (этап 06).
export const EXPORT_KINDS = Object.freeze({
  full: Object.freeze(['photo', 'angles', 'turn', 'unwrap']),
  limited: Object.freeze(['photo', 'angles', 'turn', 'unwrap']),
});

// Какая capability охраняет какой ключ состояния.
const GUARDED_KEYS = Object.freeze({
  modelId: 'changeModel',
  materialId: 'changeMaterial',
  design: 'uploadDesign',
});

export function createModeController(mode, { warn = console.warn } = {}) {
  const table = CAPABILITIES[mode];
  if (!table) throw new Error(`ModeController: неизвестный режим «${mode}»`);
  let locked = false;

  const api = {
    mode,
    capabilities: table,

    can(capability) {
      const value = table[capability];
      return value !== undefined && value !== false;
    },

    // То же, что can(), плюс предупреждение в консоль при отказе. action —
    // человеческое имя действия для сообщения.
    check(capability, action = capability) {
      if (api.can(capability)) return true;
      warn(`ModeController(${mode}): «${action}» запрещено (${capability})`);
      return false;
    },

    canExport(kind) {
      return EXPORT_KINDS[table.export]?.includes(kind) ?? false;
    },

    canUseBackground(background) {
      if (!background) return false;
      if (table.changeBackground === 'all') return true;
      return table.changeBackground === 'client' && background.client === true;
    },

    // Ставит охрану на состояние. До lock() охрана пропускает всё: клиент
    // сначала разворачивает snapshot, и только потом права вступают в силу.
    attach(state, catalog) {
      state.setGuard((patch, current) => {
        if (!locked) return true;
        for (const [key, capability] of Object.entries(GUARDED_KEYS)) {
          if (key in patch && !Object.is(patch[key], current[key]) && !api.check(capability, `изменить ${key}`)) {
            return false;
          }
        }
        if ('backgroundId' in patch && patch.backgroundId !== current.backgroundId) {
          const background = catalog.background(patch.backgroundId);
          if (!api.canUseBackground(background)) {
            warn(`ModeController(${mode}): фон «${patch.backgroundId}» недоступен`);
            return false;
          }
        }
        return true;
      });
    },

    lock() {
      locked = true;
    },
  };
  return Object.freeze(api);
}
