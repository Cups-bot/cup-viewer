// Каталог 3D-моделей стаканов.
//
// ЭТО ЕДИНСТВЕННОЕ МЕСТО, КУДА ДОПИСЫВАЕТСЯ НОВАЯ МОДЕЛЬ. Список ниже наполняет
// сразу три вещи:
//
//   • окно выбора стакана на странице (js/ui/cupPicker.js) — карточки в нём
//     рисуются по размерам отсюда, поиск идёт по названию, объёму и типу;
//   • сопоставление «номенклатура из 1С → файл модели» (js/data/order.js);
//   • правила, по которым на модель ложится макет (js/loaders/).
//
// ── Как добавить бумажную позицию ─────────────────────────────────────────
// Модели приходят из конвейера 3D_Cups (D:/Cups_Soft/3D_Cups/output/production):
// на каждую позицию там лежит папка с <ID>_light.glb и checks/model.json, где
// записаны обмеры готовой модели.
//
//   1. Скопируйте <ID>_light.glb в assets/models/cups/<ID>.glb.
//   2. Допишите строку в PAPER_CUPS: размеры берутся из checks/model.json
//      (dimensions_mm: height_drawing, rim_od_drawing, base_od_below_1mm,
//      brim_volume_ml_drawing). Всё остальное у бумажных позиций общее и
//      подставляется само — см. paperCup ниже.
//   3. npm run build.
//   4. Переснимите тени фото-сцены — Cafe_Mockup_Blender_Pack/BUILD_RU.md.
//      Шаг обязателен и при ЗАМЕНЕ .glb: тень снята с конкретной модели. Без
//      неё стакан получит расчётную тень — он не останется без тени вовсе, но
//      она заметно грубее снятой.
// Больше нигде ничего править не нужно: ни разметку, ни стили, ни вьювер.
//
// ── Что нужно от самого файла ─────────────────────────────────────────────
// Размер и единицы не важны: модель нормализуется к config.model.targetSize, а
// в фото-сцене ставится по size.height из каталога. Важно другое:
//
//   • печатная стенка — ОТДЕЛЬНЫЙ материал. По имени этого материала
//     просмотрщик и находит, куда класть макет (поле print.materials);
//   • у конвейера это всегда Paper_Print: печать на стенке (HB), на обёртке
//     двухслойного (DW) или на обёртке с тиснением (EM);
//   • сглаженные нормали и не меньше 256 сегментов по окружности, иначе на
//     блике видны грани;
//   • своя карта нормалей материала сохраняется: на ней держится тиснение EM
//     и волокно бумаги (см. js/core/paperSurface.js);
//   • в файле ОДИН стакан: лишние предметы попадут и в кадр, и в тень.

// Настройки печати «по умолчанию» — для модели, которой нет в каталоге
// (например, брошенной на страницу перетаскиванием).
export const DEFAULT_PRINT = Object.freeze({
  materials: [],
  uv: 0,
  sheet: false,
});

// Печать бумажных позиций. Одна и та же у всех: конвейер 3D_Cups кладёт макет
// на материал Paper_Print по нулевому UV-набору (UVPrint), развёрнутому веером
// по форме вырубки — ровно как в печатном файле типографии.
const PAPER_PRINT = Object.freeze({ materials: ['Paper_Print'], uv: 0, sheet: false });

// Тип стенки — он же различает позиции на глаз: у однослойного печать прямо на
// стенке, у двухслойного она на гладкой обёртке, у EM обёртка с тиснением.
// Подписи отсюда идут в карточку выбора и в поиск.
export const WALL_KINDS = Object.freeze({
  single: { label: 'Однослойный', short: '1 слой' },
  double: { label: 'Двухслойный', short: '2 слоя' },
  embossed: { label: 'С тиснением', short: 'тиснение' },
  plastic: { label: 'Полипропилен', short: 'пластик' },
});

// Бумажная позиция: из обмеров собирается полная запись каталога. Руками в
// таблице ниже держим только то, что у позиций РАЗНОЕ.
function paperCup({ id, group, wall, volume, size }) {
  return {
    // Номенклатура — как в 1С и Битриксе. Она же крупная подпись на карточке.
    id,
    label: id,
    group,
    wall,
    // Объём по кромке, мл. Он же в названии позиции.
    volume,
    // Мелкая подпись под названием. По ней же работает поиск.
    note: `${WALL_KINDS[wall].label} · Ø${Math.round(size.top)} мм`,
    file: `assets/models/cups/${id}.glb`,
    // Габариты изделия в миллиметрах: по ним рисуется силуэт на карточке, по
    // ним же стаканы сравниваются между собой по росту, и по height модель
    // встаёт в фото-сцену в натуральную величину.
    size,
    // Отделка стенки:
    //   'paper'   — шероховатость и фактуру задаёт тип картона (js/data/catalog.js);
    //   'plastic' — молочный полипропилен из того же справочника;
    //   'own'     — материал из файла не трогается вовсе.
    finish: 'paper',
    print: PAPER_PRINT,
  };
}

// Обмеры бумажных позиций — из checks/model.json конвейера 3D_Cups.
// Порядок в таблице = порядок в окне выбора: по типу стенки, внутри — по объёму.
const PAPER_CUPS = [
  { id: 'HB62-120', group: 'Однослойные', wall: 'single', volume: 120, size: { height: 63.0, top: 62.0, bottom: 45.2 } },
  { id: 'HB70-180', group: 'Однослойные', wall: 'single', volume: 180, size: { height: 80.0, top: 70.0, bottom: 45.6 } },
  { id: 'HB70-195', group: 'Однослойные', wall: 'single', volume: 195, size: { height: 79.5, top: 70.4, bottom: 49.4 } },
  { id: 'HB72-205', group: 'Однослойные', wall: 'single', volume: 205, size: { height: 81.0, top: 71.9, bottom: 50.9 } },
  { id: 'HB70-210', group: 'Однослойные', wall: 'single', volume: 210, size: { height: 93.0, top: 70.0, bottom: 45.7 } },
  { id: 'HB73-260', group: 'Однослойные', wall: 'single', volume: 260, size: { height: 103.5, top: 72.7, bottom: 48.1 } },
  { id: 'HB80-280', group: 'Однослойные', wall: 'single', volume: 280, size: { height: 88.0, top: 80.1, bottom: 57.1 } },
  { id: 'HB80-340', group: 'Однослойные', wall: 'single', volume: 340, size: { height: 116.0, top: 80.0, bottom: 50.3 } },
  { id: 'HB80-360', group: 'Однослойные', wall: 'single', volume: 360, size: { height: 116.9, top: 80.8, bottom: 53.7 } },
  { id: 'HB90-430', group: 'Однослойные', wall: 'single', volume: 430, size: { height: 111.6, top: 89.4, bottom: 60.1 } },
  { id: 'HB90-530', group: 'Однослойные', wall: 'single', volume: 530, size: { height: 135.7, top: 89.7, bottom: 60.2 } },
  { id: 'DW80-280', group: 'Двухслойные', wall: 'double', volume: 280, size: { height: 88.0, top: 80.1, bottom: 57.1 } },
  { id: 'DW90-430', group: 'Двухслойные', wall: 'double', volume: 430, size: { height: 111.6, top: 89.4, bottom: 60.1 } },
  { id: 'DW90-530', group: 'Двухслойные', wall: 'double', volume: 530, size: { height: 135.7, top: 89.7, bottom: 60.2 } },
  { id: 'EM80-280', group: 'С тиснением', wall: 'embossed', volume: 280, size: { height: 88.0, top: 80.1, bottom: 57.1 } },
  { id: 'EM90-430', group: 'С тиснением', wall: 'embossed', volume: 430, size: { height: 111.6, top: 89.4, bottom: 60.1 } },
].map(paperCup);

// Пластиковые позиции. Печать у них устроена иначе, поэтому они описаны целиком.
const PLASTIC_CUPS = [
  {
    id: 'PP-410',
    label: 'PP-410',
    group: 'Пластиковые',
    wall: 'plastic',
    volume: 410,
    note: 'Полипропилен · Ø89 мм',
    // Исходник: 3D_plast/product/cup410/out/Cup_410ml.glb
    file: 'assets/models/Cup_410ml.glb',
    size: { height: 112, top: 89, bottom: 57 },
    finish: 'plastic',
    print: {
      materials: ['Cup_PP'],
      // TEXCOORD_1 — это UVPrint, прямоугольная печать по стенке (TEXCOORD_0,
      // он же UVMap, — полная запечатка конусной развёрткой; макет для неё
      // нужно заранее выгнуть веером, чего от клиента ждать нельзя).
      uv: 1,
      // Печать по прямоугольной вырубке. Вся непечатаемая геометрия — венчик,
      // дно, рёбра расстыковки — отставлена в этом наборе за пределы 0…1.
      // Поэтому макет кладётся не «встык», а НА БЕЛЫЙ ЛИСТ С ПОЛЯМИ: в поля
      // попадает всё, что не печатается, и остаётся белым. Без этого браузер
      // растянул бы по венчику и дну крайний пиксель макета.
      sheet: true,
    },
  },
  {
    id: 'PP-500',
    label: 'PP-500',
    group: 'Пластиковые',
    wall: 'plastic',
    volume: 500,
    note: 'Полипропилен · Ø89 мм',
    // Исходник: 3D_plast/product/cup500/out/cup_500ml.glb
    file: 'assets/models/Cup_500ml.glb',
    size: { height: 135, top: 89, bottom: 57 },
    finish: 'plastic',
    print: { materials: ['Cup_PP'], uv: 1, sheet: true },
  },
  {
    id: 'PP-650',
    label: 'PP-650',
    group: 'Пластиковые',
    wall: 'plastic',
    volume: 650,
    note: 'Полипропилен · Ø89 мм',
    // Исходник: 3D_plast/product/cup650/out/Cup_650ml.glb
    file: 'assets/models/Cup_650ml.glb',
    size: { height: 179, top: 89, bottom: 57 },
    finish: 'plastic',
    print: { materials: ['Cup_PP'], uv: 1, sheet: true },
  },
];

export const CUP_MODELS = Object.freeze([...PAPER_CUPS, ...PLASTIC_CUPS]);

// Что показывать, если номенклатуру опознать не удалось.
export const FALLBACK_CUP_ID = 'HB80-280';

// Если точного совпадения по номенклатуре нет, она разбирается по префиксу типа
// стакана. Порядок важен: выигрывает первое совпадение.
const ID_PATTERNS = [
  { test: /^DW/i, id: 'DW80-280' }, // double wall — двухслойный
  { test: /^EM/i, id: 'EM80-280' }, // embossed — с тиснением
  { test: /^HB/i, id: 'HB80-280' }, // hot beverage — однослойный
  { test: /^PP/i, id: 'PP-500' }, // полипропилен
];

const BY_ID = new Map(CUP_MODELS.map((cup) => [cup.id.toUpperCase(), cup]));
const BY_FILE = new Map(CUP_MODELS.map((cup) => [cup.file, cup]));

// Номенклатура из 1С приходит с хвостами: «HB80-280K-0037», «HB80-280 (белый)».
// Сравниваем по буквам и цифрам, игнорируя остальное.
const squash = (value) => String(value ?? '').toUpperCase().replace(/[^A-ZА-Я0-9]/g, '');

export function findCup(id) {
  return BY_ID.get(String(id ?? '').trim().toUpperCase()) ?? null;
}

// Модель по пути к файлу. Нужна, когда заказ задаёт модель напрямую полем
// `model`, минуя номенклатуру: правила печати всё равно нужно взять из каталога.
export function findCupByFile(file) {
  return BY_FILE.get(String(file ?? '').trim()) ?? null;
}

// Номенклатура → модель. Возвращает { cup, matchedBy }: по matchedBy видно,
// опознали позицию точно или свалились в запасной вариант.
export function resolveCup(sku) {
  const key = String(sku ?? '').trim();
  if (!key) return { cup: findCup(FALLBACK_CUP_ID), matchedBy: 'fallback' };

  const exact = findCup(key);
  if (exact) return { cup: exact, matchedBy: 'sku' };

  // «HB80-280K-0037» — это HB80-280 с артикулом макета. Берём самое длинное
  // совпадение, иначе HB80-340 и HB80-360 спорили бы за общее начало.
  const squashed = squash(key);
  const prefixed = CUP_MODELS.filter((cup) => squashed.startsWith(squash(cup.id))).sort(
    (a, b) => b.id.length - a.id.length,
  )[0];
  if (prefixed) return { cup: prefixed, matchedBy: 'sku' };

  const pattern = ID_PATTERNS.find((entry) => entry.test.test(key));
  if (pattern) return { cup: findCup(pattern.id), matchedBy: 'pattern' };

  console.warn(`Каталог: номенклатура "${key}" неизвестна — грузим модель по умолчанию.`);
  return { cup: findCup(FALLBACK_CUP_ID), matchedBy: 'fallback' };
}

// Список для окна выбора: модели, разложенные по разделам в порядке каталога.
// Раздел с единственной моделью тоже остаётся разделом — так список не
// перестраивается, когда в него дописывают соседей.
export function cupGroups() {
  const groups = new Map();
  for (const cup of CUP_MODELS) {
    const name = cup.group ?? '';
    if (!groups.has(name)) groups.set(name, []);
    groups.get(name).push(cup);
  }
  return [...groups].map(([group, cups]) => ({ group, cups }));
}
