// Данные заказа: всё, что меняется от ссылки к ссылке — модель, дизайн, картон
// и содержимое правой панели. Вьювер сам ничего не знает про заказ: он получает
// уже разобранный объект.
//
// ── Как передать данные из Битрикса ───────────────────────────────────────
// Способ 1 (рекомендуемый). Шаблон Битрикса печатает объект прямо в страницу,
// до подключения dist/cup-viewer.js:
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
// Способ 3 (ТОЛЬКО для ручной проверки). Параметры прямо в адресе, они
// перекрывают всё остальное: ?sku=DW80-280&paper=uncoated&texture=/path/design.png
// По умолчанию канал работает только на localhost — иначе по такой ссылке
// клиенту можно подсунуть чужой макет и любой текст статуса на вашем же домене.
// Режим задаётся в CONFIG.security.urlOverrides.
//
// Приоритет: параметры адреса → window.ORDER_DATA → ответ endpoint → значения
// по умолчанию ниже.
//
// Всё, что пришло снаружи, проходит через js/data/sanitize.js: незнакомые поля
// отбрасываются, строки обрезаются, пути к файлам проверяются по белому списку
// префиксов из CONFIG.security.allowedAssetPrefixes.

import { resolveModel, resolvePaper } from './catalog.js';
import { sanitizeOrder } from './sanitize.js';

// ЕДИНСТВЕННОЕ место, где лежит текст правой панели.
//
// Это значения по умолчанию — то, что видно, пока данных из Битрикса нет.
// Соответствующие места в index.html оставлены пустыми намеренно: дублировать
// текст в разметке нельзя, он всё равно будет перезаписан отсюда.
//
// Текст, который НЕ зависит от заказа (подписи кнопок, вкладки, подсказки,
// заголовок вкладки браузера), правится прямо в index.html.
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

  // Плашка состояния над заголовком.
  status: 'Ожидает вашего согласования',
  // Заголовок панели. На заголовок вкладки браузера не влияет — тот правится
  // в <title> в index.html или ставится шаблоном Битрикса.
  title: 'Оцените будущий стакан',
  // Абзац под заголовком.
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

// Разбор параметров адреса — инструмент отладки, а не рабочий канал данных.
//
// Эти параметры перекрывают и ответ сервера, и напечатанный в страницу заказ.
// На боевом домене это означает, что по ссылке вида
// «?texture=…&title=Заказ+аннулирован» клиенту показывается чужой макет и чужой
// текст — на настоящем домене типографии, без единого признака подделки.
// Поэтому канал по умолчанию открыт только на локальной машине; режим задаётся
// в config.security.urlOverrides.
function urlOverridesAllowed(config) {
  const mode = config.security?.urlOverrides ?? 'never';
  if (mode === 'always') return true;
  if (mode === 'never') return false;
  const { hostname } = window.location;
  return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]';
}

function fromQuery(config) {
  if (!urlOverridesAllowed(config)) return {};

  const params = new URLSearchParams(window.location.search);
  const out = {};
  for (const key of QUERY_KEYS) {
    const value = params.get(key);
    if (value !== null && value !== '') out[key] = value;
  }
  // Параметры адреса проходят ту же проверку, что и остальные источники.
  return sanitizeOrder(out, { allowedAssetPrefixes: config.security?.allowedAssetPrefixes }) ?? {};
}

// Тянет заказ с бэкенда, если задан endpoint и в адресе есть ?order=.
async function fromEndpoint(config) {
  const template = config.order?.endpoint;
  const id = new URLSearchParams(window.location.search).get('order');
  if (!template || !id) return null;

  try {
    const response = await fetch(template.replace('{id}', encodeURIComponent(id)), {
      headers: { Accept: 'application/json' },
      credentials: 'same-origin',
      // Персональная ссылка не должна оседать в промежуточных кешах.
      cache: 'no-store',
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    // Ошибочная настройка сервера легко отдаёт HTML вместо JSON — тогда
    // response.json() падает с невнятной ошибкой парсера.
    const type = response.headers.get('content-type') ?? '';
    if (!type.includes('json')) throw new Error(`неожиданный Content-Type: ${type || 'нет'}`);
    return await response.json();
  } catch (error) {
    // Заказ не пришёл — показываем значения по умолчанию, а не пустую страницу.
    console.warn('Заказ не загружен, работаем на значениях по умолчанию:', error.message);
    return null;
  }
}

// Разворачивает «сырой» заказ в готовый к применению: номенклатура становится
// путём к модели, тип картона — числом roughness.
//
// Отдельная от loadOrder функция нужна затем, чтобы пересчёт можно было
// повторить без сети — при подмене данных на лету (window.applyOrder). Раньше
// подмена применяла патч к уже разобранному объекту и справочники не трогала:
// applyOrder({ paper: 'coated' }) меняло поле, но не шероховатость, а
// applyOrder({ sku: '…' }) — не модель. Обе команды описаны в документации.
//
// Возвращённый объект несёт исходные значения в поле `input` — от них считается
// следующий пересчёт.
export function resolveOrder(raw) {
  const paper = resolvePaper(raw.paper);
  const { model, matchedBy } = raw.model
    ? { model: raw.model, matchedBy: 'explicit' }
    : resolveModel(raw.sku);

  // Явное число важнее типа картона; пустое поле и мусор игнорируем.
  // Проверять только Number() нельзя: Number(null) === 0 — вполне конечное
  // число, и картон каждый раз затирался бы нулём (зеркальная поверхность).
  const override = (value, fallback) => {
    if (value === null || value === undefined || value === '') return fallback;
    const number = Number(value);
    return Number.isFinite(number) ? Math.min(Math.max(number, 0), 1) : fallback;
  };

  const roughness = override(raw.roughness, paper.roughness);
  // Сила фактуры картона. Крупность зерна берётся только из справочника: это
  // свойство самой бумаги, а не заказа.
  const relief = override(raw.relief, paper.relief);
  const reliefScale = paper.reliefScale;

  return {
    ...raw,
    model,
    modelMatchedBy: matchedBy,
    paper,
    roughness,
    relief,
    reliefScale,
    input: raw,
  };
}

// Всё, что доступно без сети: умолчания, напечатанный в страницу объект и
// параметры адреса. Нужно, чтобы правая панель нарисовалась сразу — до сцены и
// до похода на сервер. Иначе клиент видит пустые поля, а раньше вместо них
// мелькали зашитые в разметку чужие характеристики.
export function readLocalOrder(config) {
  const options = { allowedAssetPrefixes: config.security?.allowedAssetPrefixes };
  return resolveOrder({
    ...DEFAULT_ORDER,
    ...(sanitizeOrder(window.ORDER_DATA, options) ?? {}),
    ...fromQuery(config),
  });
}

// Собирает итоговый заказ из всех источников и разворачивает его.
export async function loadOrder(config) {
  const options = { allowedAssetPrefixes: config.security?.allowedAssetPrefixes };

  // window.ORDER_DATA печатается в страницу и всё равно перекроет ответ сервера,
  // поэтому при его наличии за данными не ходим — это лишний запрос на каждое
  // открытие ссылки.
  const inline = sanitizeOrder(window.ORDER_DATA, options);
  const remote = inline ? null : sanitizeOrder(await fromEndpoint(config), options);

  return resolveOrder({
    ...DEFAULT_ORDER,
    ...(remote ?? {}),
    ...(inline ?? {}),
    ...fromQuery(config),
  });
}
