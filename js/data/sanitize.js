// Проверка и очистка данных заказа, пришедших извне.
//
// Данные приходят из трёх недоверенных источников: объекта window.ORDER_DATA,
// который печатает шаблон Битрикса, ответа endpoint и адресной строки. Ни один
// из них нельзя расплющивать в заказ как есть:
//
//   • поле model/texture с чужим адресом подменяет клиенту согласуемый макет
//     или заставляет парсер glTF читать произвольный бинарник с чужого домена;
//   • строка в title/status на доверенном домене — готовый инструмент
//     социальной инженерии («Заказ аннулирован, оплатите повторно»);
//   • массив spec на 10 000 строк кладёт страницу.
//
// Здесь заказ приводится к известной форме: незнакомые поля отбрасываются,
// строки обрезаются по длине, числа зажимаются в диапазон, а пути к файлам
// проходят проверку по белому списку префиксов. Всё, что не прошло, молча
// заменяется значением по умолчанию — страница обязана открыться в любом случае.

// Ограничения длины. Взяты с запасом относительно реальных данных: заголовок
// панели ~40 знаков, оговорка под кнопками ~90.
const LIMITS = {
  sku: 64,
  paper: 64,
  status: 160,
  title: 200,
  lead: 1000,
  note: 1000,
  url: 2048,
  specRows: 24,
  specText: 160,
  checklistItems: 24,
  checklistText: 400,
};

// Поля, которые вообще разрешено принимать снаружи. Всё остальное отбрасывается.
// Два списка вместо одного затем, что путь к файлу проверяется принципиально
// иначе, чем текст, и при ревью это должно быть видно с одного взгляда.
const TEXT_FIELDS = ['sku', 'paper', 'status', 'title', 'lead', 'note'];
const MULTILINE_FIELDS = new Set(['lead', 'note']);
const ASSET_FIELDS = ['model', 'texture', 'unwrap'];

// Управляющие символы в однострочных полях не нужны никогда: перевод строки в
// заголовке ломает вёрстку, а невидимые U+0000…U+001F мешают и логам, и
// сравнению строк.
//
// Констант две — с флагом g для замены и без него для проверки: регулярка с /g
// помнит lastIndex, и повторный .test() на той же строке вернул бы false.
const CONTROL_ALL = /[\u0000-\u001F\u007F]/g;
const CONTROL_TEST = /[\u0000-\u001F\u007F]/;
// Для многострочных полей табуляция (09) и переводы строк (0A, 0D) допустимы.
const CONTROL_EXCEPT_BREAKS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

function cleanText(value, maxLength) {
  if (typeof value !== 'string') return null;
  const text = value.replace(CONTROL_ALL, ' ').trim();
  return text ? text.slice(0, maxLength) : null;
}

// Многострочные поля (описание, пункт чек-листа): переводы строк оставляем.
function cleanMultiline(value, maxLength) {
  if (typeof value !== 'string') return null;
  const text = value.replace(CONTROL_EXCEPT_BREAKS, ' ').trim();
  return text ? text.slice(0, maxLength) : null;
}

// Путь к ассету. Пропускаются только те адреса, по которым заведомо лежат наши
// же файлы: относительные пути и абсолютные пути того же сайта, начинающиеся с
// разрешённого префикса.
//
// Отсекаются: javascript:, data:, blob:, file: и прочие схемы; протокол-
// относительные адреса вида //evil.example/x.png; любой чужой хост; обход
// каталогов через «..».
export function isSafeAssetUrl(value, allowedPrefixes = []) {
  if (typeof value !== 'string') return false;

  const url = value.trim();
  if (!url || url.length > LIMITS.url) return false;
  if (CONTROL_TEST.test(url)) return false;
  // Протокол-относительный адрес: «//host/…» уводит на чужой домен.
  if (url.startsWith('//')) return false;
  // Обход каталогов — и в сыром виде, и в процентной кодировке.
  if (url.includes('..') || /%2e%2e/i.test(url)) return false;

  // Схема указана явно — разрешаем только http(s) и только свой origin.
  if (/^[a-z][a-z0-9+.-]*:/i.test(url)) {
    let parsed;
    try {
      parsed = new URL(url, window.location.href);
    } catch {
      return false;
    }
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return false;
    if (parsed.origin !== window.location.origin) return false;
    return matchesPrefix(parsed.pathname, allowedPrefixes);
  }

  return matchesPrefix(url, allowedPrefixes);
}

// Пустой белый список означает «префиксы не ограничиваем» — так удобно
// разрабатывать локально; в продакшене список задан в js/config.js.
function matchesPrefix(path, allowedPrefixes) {
  if (!allowedPrefixes || allowedPrefixes.length === 0) return true;
  return allowedPrefixes.some((prefix) => path.startsWith(prefix));
}

// Числовые поля, которые разрешено принимать снаружи. Все — доли от 0 до 1.
const UNIT_FIELDS = ['roughness', 'relief'];

function clampUnit(value) {
  if (value === null || value === undefined || value === '') return null;
  const number = Number(value);
  if (!Number.isFinite(number)) return null;
  return Math.min(Math.max(number, 0), 1);
}

// Строки таблицы характеристик: [{ label, value }, …].
function cleanSpec(value) {
  if (!Array.isArray(value)) return null;
  const rows = value
    .slice(0, LIMITS.specRows)
    .map((row) => {
      if (!row || typeof row !== 'object') return null;
      const label = cleanText(row.label, LIMITS.specText);
      const text = cleanText(row.value, LIMITS.specText);
      return label || text ? { label: label ?? '', value: text ?? '' } : null;
    })
    .filter(Boolean);
  return rows.length > 0 ? rows : null;
}

// Пункты чек-листа: массив строк.
function cleanChecklist(value) {
  if (!Array.isArray(value)) return null;
  const items = value
    .slice(0, LIMITS.checklistItems)
    .map((item) => cleanMultiline(item, LIMITS.checklistText))
    .filter(Boolean);
  return items.length > 0 ? items : null;
}

// Приводит недоверенный объект к форме заказа. Возвращает null, если на входе
// не объект (данных просто нет — это не ошибка), и объект только из прошедших
// проверку полей в остальных случаях.
export function sanitizeOrder(input, { allowedAssetPrefixes = [] } = {}) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return null;

  const out = {};

  for (const field of TEXT_FIELDS) {
    const value = MULTILINE_FIELDS.has(field)
      ? cleanMultiline(input[field], LIMITS[field])
      : cleanText(input[field], LIMITS[field]);
    if (value !== null) out[field] = value;
  }

  for (const field of ASSET_FIELDS) {
    const value = typeof input[field] === 'string' ? input[field].trim() : null;
    if (!value) continue;
    if (isSafeAssetUrl(value, allowedAssetPrefixes)) {
      out[field] = value;
    } else {
      console.warn(`Заказ: поле "${field}" отклонено — недопустимый путь к файлу.`);
    }
  }

  for (const field of UNIT_FIELDS) {
    const value = clampUnit(input[field]);
    if (value !== null) out[field] = value;
  }

  const spec = cleanSpec(input.spec);
  if (spec) out.spec = spec;

  const checklist = cleanChecklist(input.checklist);
  if (checklist) out.checklist = checklist;

  return out;
}
