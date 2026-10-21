// Отделки стакана: конгрев, тиснение фольгой, металлизированная краска.
// Маски — файлы клиента той же развёртки, что макет: рисунок на прозрачном
// фоне или чёрное на белом — где отделка.
//
// color — цвет отражения металла (sRGB; движок переводит в линейный, как
// любой цвет каталога); у золота и серебра — по отражательной способности
// металла, у краски — тусклее фольги: металлик-пантон блестит мягче.
// swatch — как показать вариант кружком в интерфейсе.

export const FOILS = Object.freeze([
  { id: 'gold', label: 'Золото', color: '#ffe39d', swatch: '#d9b45a' },
  { id: 'silver', label: 'Серебро', color: '#fcfbf6', swatch: '#c9ccd1' },
  { id: 'pearl', label: 'Перламутр', color: '#f4f0f7', swatch: '#ece4f2', iridescence: true },
]);

export const INKS = Object.freeze([
  { id: 'silver', label: 'Серебро', color: '#cfd0d2', swatch: '#b7babe' },
  { id: 'gold', label: 'Золото', color: '#ecc489', swatch: '#c9a35a' },
]);

export const EMBOSS_DEPTHS = Object.freeze([0.25, 0.35, 0.5]);

export const FINISH_KINDS = Object.freeze(['emboss', 'foil', 'ink']);

export const FINISH_LABELS = Object.freeze({
  emboss: 'Конгрев',
  foil: 'Фольга',
  ink: 'Металлик-краска',
});

// Цвет фольги: id из FOILS или свой (#rrggbb).
export function foilOf(color) {
  return FOILS.find((foil) => foil.id === color) ?? { id: 'custom', label: 'Свой цвет', color, swatch: color };
}

export function inkOf(color) {
  return INKS.find((ink) => ink.id === color) ?? INKS[0];
}

export const isHex = (value) => typeof value === 'string' && /^#[0-9a-f]{6}$/i.test(value);
