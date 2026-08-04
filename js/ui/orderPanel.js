// Заполняет правую панель данными заказа: статус, заголовок, описание, таблицу
// характеристик, чек-лист и текст-оговорку.
//
// В index.html эти места оставлены ПУСТЫМИ намеренно. Текст, зависящий от
// заказа, живёт в одном месте — DEFAULT_ORDER в js/data/order.js (и приходит
// из Битрикса поверх умолчаний). Раньше он был продублирован в разметке:
// правка в HTML ничего не давала, а при загрузке успевала мелькнуть строка от
// прошлого заказа.
//
// Всё, что не зависит от заказа (подписи кнопок, вкладки, подсказки, заголовок
// вкладки браузера), правится прямо в index.html и сюда не попадает.

// Подставляет текст, если он задан и элемент существует.
function setText(selector, value) {
  if (value == null || value === '') return;
  const el = document.querySelector(selector);
  if (el) el.textContent = value;
}

// Пересобирает таблицу характеристик: строк может быть сколько угодно.
function renderSpec(rows) {
  const spec = document.querySelector('.spec');
  if (!spec || !Array.isArray(rows)) return;

  spec.replaceChildren(
    ...rows
      .filter((row) => row && (row.label || row.value))
      .map(({ label, value }) => {
        const div = document.createElement('div');
        div.className = 'spec__row';
        const dt = document.createElement('dt');
        dt.textContent = label ?? '';
        const dd = document.createElement('dd');
        dd.textContent = value ?? '';
        div.append(dt, dd);
        return div;
      }),
  );
}

// Пересобирает чек-лист перед печатью. Заголовок и пояснение над пунктами
// остаются из разметки — они от заказа не зависят.
function renderChecklist(items) {
  const checklist = document.getElementById('checklist');
  if (!checklist || !Array.isArray(items)) return;

  checklist.querySelectorAll('.check').forEach((el) => el.remove());

  for (const text of items.filter(Boolean)) {
    const label = document.createElement('label');
    label.className = 'check';

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = true;

    const box = document.createElement('span');
    box.className = 'check__box';
    box.setAttribute('aria-hidden', 'true');

    const caption = document.createElement('span');
    caption.className = 'check__text';
    caption.textContent = text;

    label.append(input, box, caption);
    checklist.appendChild(label);
  }
}

// Весь текст ставится через textContent, а не innerHTML: разметка из данных
// заказа не исполняется, даже если в неё что-то подмешали.
export function renderOrderPanel(order) {
  setText('.status-chip__text', order.status);
  setText('.approve-panel__title', order.title);
  setText('.approve-panel__lead', order.lead);
  setText('.approve-panel__note', order.note);
  renderSpec(order.spec);
  renderChecklist(order.checklist);
}
