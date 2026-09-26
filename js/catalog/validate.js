// Проверка каталогов (catalog/*.json) своим кодом, без зависимостей.
//
// Сломанная запись не роняет каталог: она исключается, а в errors уходит
// сообщение с файлом, записью и полем. Остальные записи работают.

const MODEL_TYPES = ['paper', 'pp', 'pet'];
const MATERIAL_KINDS = ['paper', 'plastic'];
const HEX = /^#[0-9a-f]{6}$/i;

const isString = (v) => typeof v === 'string' && v.trim() !== '';
const isPositive = (v) => typeof v === 'number' && Number.isFinite(v) && v > 0;
const isUnit = (v) => typeof v === 'number' && v >= 0 && v <= 1;
const isPair = (v) => Array.isArray(v) && v.length === 2 && v.every((x) => typeof x === 'number' && Number.isFinite(x));
const isStringList = (v) => Array.isArray(v) && v.every(isString);

// Проверяет запись по списку правил [путь, проверка, что ожидается].
// Возвращает текст первой ошибки или null.
function firstProblem(record, rules) {
  for (const [path, test, expected] of rules) {
    const value = path.split('.').reduce((node, key) => node?.[key], record);
    if (!test(value, record)) return `поле ${path} — ожидается ${expected}`;
  }
  return null;
}

function collect(file, list, key, rules, errors) {
  if (!Array.isArray(list)) {
    errors.push(`${file}: нет массива «${key}»`);
    return [];
  }
  const seen = new Set();
  const out = [];
  list.forEach((record, index) => {
    const where = `${file}: ${key}[${index}]${isString(record?.id) ? ` (${record.id})` : ''}`;
    if (!record || typeof record !== 'object') {
      errors.push(`${where}: запись не объект`);
      return;
    }
    const problem = firstProblem(record, [['id', isString, 'непустая строка'], ...rules]);
    if (problem) {
      errors.push(`${where}: ${problem}`);
      return;
    }
    if (seen.has(record.id)) {
      errors.push(`${where}: id повторяется`);
      return;
    }
    seen.add(record.id);
    out.push(record);
  });
  return out;
}

const MATERIAL_RULES = [
  ['name', isString, 'непустая строка'],
  ['kind', (v) => MATERIAL_KINDS.includes(v), MATERIAL_KINDS.join(' | ')],
  ['params', (v) => v && typeof v === 'object' && !Array.isArray(v), 'объект параметров'],
  ['params.roughness', isUnit, 'число 0…1'],
  ['swatch', (v) => v === undefined || (typeof v === 'string' && HEX.test(v)), 'цвет образца #rrggbb'],
];

function modelRules(materialIds) {
  const known = (v) => isStringList(v) && v.length > 0 && v.every((id) => materialIds.has(id));
  return [
    ['name', isString, 'непустая строка'],
    ['type', (v) => MODEL_TYPES.includes(v), MODEL_TYPES.join(' | ')],
    ['volumeMl', isPositive, 'число > 0'],
    ['fullVolumeMl', (v) => v === undefined || isPositive(v), 'число > 0 или без поля'],
    ['file', isString, 'путь к .glb'],
    ['size.heightMm', isPositive, 'число > 0'],
    ['size.topMm', isPositive, 'число > 0'],
    ['size.bottomMm', isPositive, 'число > 0'],
    ['textureMapping.materials', (v) => isStringList(v) && v.length > 0, 'непустой список имён материалов GLB'],
    ['textureMapping.uv', (v) => Number.isInteger(v) && v >= 0, 'целое ≥ 0'],
    ['textureMapping.sheet', (v) => typeof v === 'boolean', 'true | false'],
    ['textureMapping.unwrapMm', (v) => Array.isArray(v) && v.length === 2 && v.every(isPositive), '[ширина, высота] в мм'],
    ['textureMapping.seamDeg', (v) => typeof v === 'number' && v >= 0 && v < 360, 'азимут шва 0…359°'],
    ['textureMapping.field', (v) => v === undefined || (isPair(v?.u) && isPair(v?.v) && v.u[1] > 0 && v.v[1] > v.v[0]),
      '{ u: [начало, доля], v: [низ, верх] } или без поля'],
    ['materialCompatibility', known, 'непустой список известных материалов'],
    ['defaultMaterial', (v, r) => r.materialCompatibility.includes(v), 'материал из materialCompatibility'],
    ['printType', isString, 'непустая строка'],
    ['searchTerms', isStringList, 'список строк'],
  ];
}

const BACKGROUND_RULES = [
  ['name', isString, 'непустая строка'],
  ['color', (v) => typeof v === 'string' && HEX.test(v), 'цвет #rrggbb'],
  ['sweep', isUnit, 'число 0…1'],
];

// Сцены фотореал-рендера (CupViewer v2): ракурсы и сколько стаканов в кадре.
const SCENE_RULES = [
  ['name', isString, 'непустая строка'],
  ['presets', (v) => Array.isArray(v) && v.length > 0 && v.every((p) => isString(p?.id) && isString(p?.label)),
    'непустой список ракурсов { id, label }'],
  ['maxCups', (v) => v === 1 || v === 2, '1 или 2'],
];

// raw — содержимое файлов: { models, materials, backgrounds, scenes }
// (каждое — разобранный JSON или undefined, если файл не загрузился).
export function validateCatalog(raw) {
  const errors = [];
  const materials = collect('catalog/materials.json', raw.materials?.materials, 'materials', MATERIAL_RULES, errors);
  const materialIds = new Set(materials.map((m) => m.id));
  const models = collect('catalog/models.json', raw.models?.models, 'models', modelRules(materialIds), errors);
  const backgrounds = collect('catalog/backgrounds.json', raw.backgrounds?.backgrounds, 'backgrounds', BACKGROUND_RULES, errors);
  const scenes = collect('catalog/scenes/index.json', raw.scenes?.scenes, 'scenes', SCENE_RULES, errors);
  return { models, materials, backgrounds, scenes, errors };
}
