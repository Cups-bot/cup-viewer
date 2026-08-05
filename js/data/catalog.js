// Справочники производства: по какой номенклатуре какую 3D-модель грузить и
// какая шероховатость у какого картона. Это единственное место, куда нужно
// дописывать новые позиции — логика вьювера сюда не заглядывает.

// ── Картон ────────────────────────────────────────────────────────────────
// ЗДЕСЬ НАСТРАИВАЕТСЯ ВНЕШНИЙ ВИД КАРТОНА. Три числа на тип, все уходят в
// материал меша под дизайном (см. Viewer.setSurfaceFinish).
//
//   roughness — как собран блик. 0 — зеркало, 1 — полностью матовая.
//       Мелованный лощёный отражает собранно, немелованный впитывает свет и
//       рассеивает его.
//
//   relief — сила фактуры («рябь»): микрорельеф волокна, из-за которого блик
//       чуть дрожит. 0 — идеально гладко, 0.5 — грубая крафт-бумага.
//       У мелованного поверх волокна лежит меловой слой и каландрирование,
//       поэтому рельефа почти нет; у немелованного волокно открыто.
//
//   reliefScale — крупность зерна: сколько раз рисунок волокна укладывается по
//       стенке. БОЛЬШЕ ЗНАЧЕНИЕ — МЕЛЬЧЕ зерно. У мелованного зерно тоньше.
//
// Подобрать вживую, не пересобирая: см. cupViewer.setRelief() в README.
//
// Картон — не металл, поэтому metalness одинаков для всех типов и в справочнике
// не повторяется.
export const PAPER_METALNESS = 0;

export const PAPER_TYPES = {
  coated: {
    label: 'Мелованный',
    // 0.2 — это почти зеркало: стенка ловила отражение всей студии, и чёрная
    // заливка выходила серой. У лакированного картона блик собранный, но не
    // зеркальный; 0.4 держит и глянец, и цвет.
    roughness: 0.4,
    relief: 0.009,
    reliefScale: 90,
  },
  uncoated: {
    label: 'Немелованный',
    roughness: 0.8,
    relief: 0.1,
    reliefScale: 10,
  },
};

// КАКОЙ КАРТОН ПОКАЗЫВАТЬ, ПОКА ЗАКАЗ НЕ СКАЗАЛ ИНОГО.
//
// Это единственное место, где задан картон по умолчанию: отсюда его берёт и
// DEFAULT_ORDER (js/data/order.js), и запасная отделка при загрузке модели.
// Поменяйте на 'coated' — страница откроется мелованной.
export const DEFAULT_PAPER = 'uncoated';

// Отделка «по умолчанию» одним объектом — тем же, что уходит в материал.
// Нужна на момент, когда модель уже загрузилась, а заказ ещё не применён.
export function defaultPaperFinish() {
  const paper = PAPER_TYPES[DEFAULT_PAPER];
  return {
    roughness: paper.roughness,
    metalness: PAPER_METALNESS,
    relief: paper.relief,
    reliefScale: paper.reliefScale,
  };
}

// Синонимы: Битрикс может прислать что угодно из этого списка.
const PAPER_ALIASES = {
  coated: 'coated',
  мелованный: 'coated',
  мелованная: 'coated',
  глянцевый: 'coated',
  uncoated: 'uncoated',
  немелованный: 'uncoated',
  немелованная: 'uncoated',
  крафт: 'uncoated',
  матовый: 'uncoated',
};

// ── Модели ────────────────────────────────────────────────────────────────
// Точное соответствие номенклатуры и файла модели. Ключ — как в 1С/Битриксе.
export const MODELS = {
  'DW80-280': 'assets/models/8cups.glb',
  'DW90-430': 'assets/models/8cups.glb',
  'DW90-530': 'assets/models/8cups.glb',
};

// Если точного ключа нет, номенклатура разбирается по префиксу типа стакана.
// Порядок важен: первое совпадение выигрывает.
const MODEL_PATTERNS = [
  { test: /^DW/i, model: 'assets/models/8cups.glb' }, // double wall — двухслойный
  { test: /^HB/i, model: 'assets/models/8cups.glb' }, // single wall — однослойный
];

// Модель, которая грузится, если номенклатуру опознать не удалось.
export const FALLBACK_MODEL = 'assets/models/8cups.glb';

// Номенклатура → путь к модели. Возвращает { model, matchedBy } — по matchedBy
// видно, опознали позицию точно или свалились в запасной вариант.
export function resolveModel(sku) {
  const key = String(sku ?? '').trim();
  if (!key) return { model: FALLBACK_MODEL, matchedBy: 'fallback' };

  const exact = MODELS[key] ?? MODELS[key.toUpperCase()];
  if (exact) return { model: exact, matchedBy: 'sku' };

  const pattern = MODEL_PATTERNS.find((entry) => entry.test.test(key));
  if (pattern) return { model: pattern.model, matchedBy: 'pattern' };

  console.warn(`Каталог: номенклатура "${key}" неизвестна — грузим модель по умолчанию.`);
  return { model: FALLBACK_MODEL, matchedBy: 'fallback' };
}

// Тип картона → { key, label, roughness }. Принимает и ключ, и русское название.
export function resolvePaper(paper) {
  const raw = String(paper ?? '').trim().toLowerCase();
  const key = PAPER_ALIASES[raw] ?? (PAPER_TYPES[raw] ? raw : DEFAULT_PAPER);
  return { key, ...PAPER_TYPES[key] };
}
