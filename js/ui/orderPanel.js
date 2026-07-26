// Наполняет правую панель данными заказа: статус, заголовок, описание, таблицу
// характеристик, чек-лист и текст-оговорку. Разметка в index.html — это только
// каркас со значениями по умолчанию; здесь они заменяются пришедшими данными.

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

// Пересобирает чек-лист перед печатью, сохраняя разметку пункта.
function renderChecklist(items) {
  const checklist = document.getElementById('checklist');
  if (!checklist || !Array.isArray(items)) return;

  // Заголовок и подпись остаются, меняются только пункты.
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

export function renderOrderPanel(order) {
  setText('.status-chip__text', order.status);
  setText('.approve-panel__title', order.title);
  setText('.approve-panel__lead', order.lead);
  setText('.approve-panel__note', order.note);
  renderSpec(order.spec);
  renderChecklist(order.checklist);

  if (order.title) document.title = order.title;
}
