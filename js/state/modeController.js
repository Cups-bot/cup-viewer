// ModeController — права режима (§37). Режим задаёт точка входа (design.js),
// а не параметр адреса. Страницы клиента по ссылке больше нет (владелец,
// 2026-09-27: общий сервис) — режим один, но охрана осталась: действие
// спрашивает can()/check(), а охрана на ViewerState отклоняет патчи в обход
// UI до lock() и после него — по таблице.

export const CAPABILITIES = Object.freeze({
  design: Object.freeze({
    changeModel: true,
    changeMaterial: true,
    uploadDesign: true,
    export: 'full',
    changeBackground: 'all',
    openScene: true,
    arrangeScene: true,
    openUnwrap: true,
    camera: true,
    autoRotate: true,
    fullscreen: true,
  }),
});

// Что можно выгрузить при уровне export (§20, §29): фото 2048×2048,
// 4 ракурса, оборот, развёртка.
export const EXPORT_KINDS = Object.freeze({
  full: Object.freeze(['photo', 'angles', 'turn', 'unwrap']),
});

// Какая capability охраняет какой ключ состояния.
const GUARDED_KEYS = Object.freeze({
  modelId: 'changeModel',
  materialId: 'changeMaterial',
  design: 'uploadDesign',
  design2: 'uploadDesign',
  photo: 'arrangeScene',
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
      return Boolean(background) && table.changeBackground === 'all';
    },

    // Ставит охрану на состояние. До lock() охрана пропускает всё: сначала
    // разворачивается стартовое состояние (сессия), потом права в силе.
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
