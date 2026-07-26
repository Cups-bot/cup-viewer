// Данные заказа: всё, что меняется от ссылки к ссылке — модель, дизайн, картон
// и содержимое правой панели. Вьювер сам ничего не знает про заказ: он получает
// уже разобранный объект.
//
// ── Как передать данные из Битрикса ───────────────────────────────────────
// Способ 1 (рекомендуемый). Шаблон Битрикса печатает объект прямо в страницу,
// до подключения js/main.js:
//
//   <script>
//     window.ORDER_DATA = {
//       sku: 'DW80-280',
//       paper: 'uncoated',
//       texture: '/upload/orders/2431/design.png',
//       unwrap:  '/upload/orders/2431/design-print.png',   // необязательно
//       title: 'Посмотрите свой стакан вживую',
//       spec: [
//         { label: 'Тип',    value: 'Двухслойный' },
//         { label: 'Объём',  value: '250 мл (до 280 мл)' },
//         { label: 'Печать', value: 'Офсет' }
//       ]
//     };
//   </script>
//
// Способ 2. Ссылка вида /viewer/?order=2431 — данные подтягиваются запросом с
// endpoint, заданного в CONFIG.order.endpoint ('{id}' заменяется на номер).
//
// Способ 3 (для ручной проверки). Параметры прямо в адресе, они перекрывают всё
// остальное: ?sku=DW80-280&paper=uncoated&texture=/path/design.png
//
// Приоритет: параметры адреса → window.ORDER_DATA → ответ endpoint → значения
// по умолчанию ниже.

import { resolveModel, resolvePaper } from './catalog.js';

// Значения по умолчанию — то, что видно без данных из Битрикса. Правится руками.
export const DEFAULT_ORDER = Object.freeze({
  // Номенклатура: по ней подбирается 3D-модель (см. js/data/catalog.js).
  sku: 'DW80-280',
  // Прямой путь к модели. Задан — важнее номенклатуры.
  model: null,
  // Дизайн (он же развёртка). Показывается и на модели, и во вкладке «Развёртка».
  texture: 'assets/textures/design.png',
  // Отдельный файл развёртки — крупнее того, что ложится на модель. Для 3D
  // текстуру ужимают (видеопамять), а во вкладке «Развёртка» мелкий текст на
  // ужатом файле не проверить. Не задан — берётся texture.
  unwrap: null,
  // 'coated' | 'uncoated' — задаёт шероховатость поверхности.
  paper: 'uncoated',
  // Явная шероховатость 0…1. Задана — важнее типа картона.
  roughness: null,

  status: 'Ожидает вашего согласования',
    title: 'Оцените будущий стакан',
    lead: 'Это финальный вид вашего стакана. Осмотрите его со всех сторон и согласуйте, если всё в порядке.',

  // Строки таблицы характеристик. Порядок и количество — любые.
  spec: [
    { label: 'Тип', value: 'Двухслойный' },
    { label: 'Объём', value: '250 мл (до 280 мл)' },
    { label: 'Печать', value: 'Офсет' },
  ],

  // Пункты чек-листа перед печатью.
  checklist: [
    'Расположение элементов меня устраивает',
    'Цветовое исполнение соответствует ожиданиям',
    'Текст, контакты и другие данные указаны верно',
  ],

  note: 'Согласование фиксирует макет: после запуска в печать правки невозможны.',
});

// Ключи, которые разрешено передавать через адресную строку.
const QUERY_KEYS = ['sku', 'model', 'texture', 'unwrap', 'paper', 'roughness', 'title', 'status'];

function fromQuery() {
  const params = new URLSearchParams(window.location.search);
  const out = {};
  for (const key of QUERY_KEYS) {
    const value = params.get(key);
    if (value !== null && value !== '') out[key] = value;
  }
  return out;
}

// Тянет заказ с бэкенда, если задан endpoint и в адресе есть ?order=.
async function fromEndpoint(config) {
  const template = config.order?.endpoint;
  const id = new URLSearchParams(window.location.search).get('order');
  if (!template || !id) return {};

  try {
    const response = await fetch(template.replace('{id}', encodeURIComponent(id)), {
      headers: { Accept: 'application/json' },
      credentials: 'same-origin',
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    // Заказ не пришёл — показываем значения по умолчанию, а не пустую страницу.
    console.warn('Заказ не загружен, работаем на значениях по умолчанию:', error.message);
    return {};
  }
}

// Собирает итоговый заказ и доводит его до вида, готового к применению:
// номенклатура уже развёрнута в путь к модели, картон — в число roughness.
export async function loadOrder(config) {
  const merged = {
    ...DEFAULT_ORDER,
    ...(await fromEndpoint(config)),
    ...(window.ORDER_DATA ?? {}),
    ...fromQuery(),
  };

  const paper = resolvePaper(merged.paper);
  const { model, matchedBy } = merged.model
    ? { model: merged.model, matchedBy: 'explicit' }
    : resolveModel(merged.sku);

  // Явное число важнее типа картона; пустое поле и мусор игнорируем.
  // Проверять только Number() нельзя: Number(null) === 0 — вполне конечное
  // число, и картон каждый раз затирался бы нулём (зеркальная поверхность).
  const hasExplicit = merged.roughness !== null && merged.roughness !== undefined && merged.roughness !== '';
  const explicitRoughness = Number(merged.roughness);
  const roughness = hasExplicit && Number.isFinite(explicitRoughness)
    ? Math.min(Math.max(explicitRoughness, 0), 1)
    : paper.roughness;

  return { ...merged, model, modelMatchedBy: matchedBy, paper, roughness };
}
