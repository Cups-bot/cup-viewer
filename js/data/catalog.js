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
export const PAPER_TYPES = {
  coated: {
    label: 'Мелованный',
    roughness: 0.2,
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

export const DEFAULT_PAPER = 'uncoated';

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
