// Вид печати стакана (владелец, 2026-09-27). Бумага — развёртка целиком, вид
// не выбирается; BM — шелкотрафарет (поле 204 × H) или тампопечать (стороны А
// и Б в зонах 25 мм); PET — только тампопечать. Всё — из каталога
// (textureMapping: field — шелкотрафарет, pad — полоса тампопечати BM, sides —
// стороны PET).

export const PRINT_MODES = Object.freeze(['silk', 'pad']);
export const PRINT_LABELS = Object.freeze({ silk: 'Шелкотрафарет', pad: 'Тампопечать' });

export function printModesOf(model) {
  const tm = model?.textureMapping;
  if (tm?.sides) return ['pad'];
  if (tm?.pad) return ['silk', 'pad'];
  return [];
}

// Вид по умолчанию: у BM — шелкотрафарет, у PET — тампопечать, у бумаги — нет.
export const defaultPrintMode = (model) => printModesOf(model)[0] ?? null;

// Стороны тампопечати BM на полосе зоны (UVPrint, та же развёртка, что у
// шелкотрафарета): А и Б — в четверти окружности от середины полосы, как
// центральные линии в шаблонах Формации (у 410 мл — 47,5 мм от края поля).
// deg — только имена сторон (как у PET); где стоит сторона, решает offsetMm.
function bandSides(pad) {
  const quarter = pad.circumferenceMm / 4;
  return Object.freeze({
    kind: 'band',
    fieldMm: pad.fieldMm,
    zoneMm: pad.zoneMm,
    offsetMm: Object.freeze({ A: -quarter, B: quarter }),
    deg: Object.freeze({ A: 0, B: 180 }),
  });
}

// Модель, как её видят движок и загрузка макета в выбранном виде печати: у
// тампопечати BM — полоса зоны вместо поля шелкотрафарета и стороны А/Б.
// Объект один на модель: движок узнаёт модель по ссылке (Viewer.present), и
// новый объект на каждый вызов перезагружал бы её.
const padded = new WeakMap();
export function asPrinted(model, printMode) {
  const tm = model?.textureMapping;
  if (!tm?.pad || printMode !== 'pad') return model;
  if (!padded.has(model)) {
    padded.set(model, Object.freeze({
      ...model,
      textureMapping: Object.freeze({ ...tm, field: tm.pad.field, unwrapMm: tm.pad.fieldMm, sides: bandSides(tm.pad) }),
    }));
  }
  return padded.get(model);
}

// Размер зоны стороны, мм: [ширина, высота].
export function zoneMmOf(spec) {
  if (spec.kind === 'band') return spec.zoneMm;
  return [spec.widthMm, spec.zMm[1] - spec.zMm[0]];
}
