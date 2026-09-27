// Окно выбора стакана: карточки моделей с силуэтом, разделы каталога кнопками,
// поиск и подсветка того, что сейчас стоит в сцене. Каталог — catalog/models.json,
// оттуда же берутся габариты для силуэта.
//
// ПОЧЕМУ НЕ ВЫПАДАЮЩИЙ СПИСОК, с которого всё начиналось. В нём видно только
// строчку текста, а стаканы различаются не строчкой, а ростом и формой:
// пластиковый на 650 мл вдвое выше бумажного на 120. Выбирать по коду
// номенклатуры вслепую неудобно, а позиций уже два десятка. Карточка рисует
// силуэт в ОБЩЕМ для всех масштабе, поэтому разница в размере видна глазом.
//
// ЧТО ДОБАВИЛОСЬ, КОГДА ПОЗИЦИЙ СТАЛО 19. Один длинный список пролистывать
// утомительно, поэтому:
//
//   • кнопки разделов сверху («Однослойные 11», «Двухслойные 3» …) — они же
//     показывают, сколько позиций в каждом типе;
//   • силуэт различает типы: у двухслойного видна обёртка, у стакана с
//     тиснением — его рисунок, у пластикового стенка светлее и полупрозрачна;
//   • карточки обходятся стрелками, Enter выбирает, Esc закрывает — с
//     клавиатуры до дальней позиции добираться быстрее, чем мышью.
//
// Силуэт — js/design/cupArt.js.

import { artScale, drawCup } from './cupArt.js';
import { flip, hideLayer, showLayer, snapshot, stagger } from '../ui/motion.js';

// Разделы окна (§10) — как их называет производство: однослойные,
// двухслойные, эмбо (двухслойные с рельефом) и пластиковые BM. Пустой раздел
// не показывается.
const GROUPS = Object.freeze([
  { key: 'single', label: 'Однослойные', note: 'Одна стенка картона', match: (m) => m.type === 'paper' && m.wall === 'single' },
  { key: 'double', label: 'Двухслойные', note: 'Вторая стенка держит тепло', match: (m) => m.type === 'paper' && m.wall === 'double' },
  { key: 'embossed', label: 'Эмбо', note: 'Двухслойные с рельефом «вафля»', match: (m) => m.type === 'paper' && m.wall === 'embossed' },
  { key: 'bm', label: 'BM', note: 'Матовый пластик для холодных напитков', match: (m) => m.type === 'pp' },
  { key: 'pet', label: 'PET', note: 'Прозрачный пластик', match: (m) => m.type === 'pet' },
]);

const groupOf = (model) => GROUPS.find((group) => group.match(model))?.label ?? '';

// Внутри раздела — по объёму, при равном объёме — по росту: так три разных
// стакана «на 300» стоят рядом и различаются силуэтом.
function modelGroups(models) {
  return GROUPS.map((group) => ({
    ...group,
    cups: models
      .filter(group.match)
      .sort((a, b) => a.volumeMl - b.volumeMl || a.size.heightMm - b.size.heightMm),
  })).filter((group) => group.cups.length > 0);
}

// Нормализация для поиска: регистр и «ё» не должны мешать найти стакан.
const norm = (value) => String(value ?? '').toLowerCase().replace(/ё/g, 'е');

// Фото стакана — снимок тем же движком (scripts/render-thumbs.mjs), под обе
// темы. Снимка нет (новая модель, ещё не сняли) — силуэт по габаритам.
function cupPhoto(cup, scale) {
  const frame = document.createElement('span');
  frame.className = 'cup-card__photo';
  for (const theme of ['light', 'dark']) {
    const img = document.createElement('img');
    img.className = `cup-card__img cup-card__img--${theme}`;
    img.alt = '';
    img.loading = 'lazy';
    img.decoding = 'async';
    img.src = `assets/thumbs/${theme}/${cup.id}.webp`;
    img.addEventListener('error', () => {
      if (frame.querySelector('.cup-card__art')) return;
      frame.replaceChildren(drawCup(cup, scale));
      frame.classList.add('is-drawn');
    });
    frame.appendChild(img);
  }
  return frame;
}

export class CupPicker {
  // root — карточка окна, backdrop — затемнение под ней. onSelect получает id
  // выбранной модели, onToggle — состояние окна: закрыть его можно и мимо
  // кнопки (Escape, щелчок по затемнению), а кнопке об этом знать нужно.
  constructor(root, { models, backdrop, onSelect, onToggle } = {}) {
    this.root = root;
    this.models = models;
    this.backdrop = backdrop ?? null;
    this.onSelect = onSelect ?? null;
    this.onToggle = onToggle ?? null;

    this.search = root.querySelector('.cup-search');
    this.filters = root.querySelector('.cup-filters');
    this.list = root.querySelector('.cup-list');
    this.empty = root.querySelector('.cup-empty');
    this.closeButton = root.querySelector('.cup-dialog__close');

    // Кнопка, которой окно открыли: ей возвращается фокус при закрытии.
    this.opener = null;
    this.cards = [];
    this.sections = [];
    this.filterButtons = [];
    this.activeId = null;
    // Выбранный раздел: '' — все.
    this.group = '';

    this.#build();
    this.#bind();
  }

  get isOpen() {
    return this.root.hidden === false && !this.closing;
  }

  #build() {
    const scale = artScale(this.models);
    this.list.replaceChildren();
    // Кнопки фильтров — заново, а бегунок подсветки (initSegments) остаётся:
    // без него у контейнера has-thumb выбранная кнопка прозрачна и не видна.
    this.filters?.querySelectorAll(':scope > .cup-filter').forEach((button) => button.remove());

    const groups = modelGroups(this.models);
    if (this.filters) {
      this.#addFilter('', 'Все', this.models.length);
      for (const { label, cups } of groups) this.#addFilter(label, label, cups.length);
    }

    for (const { label, note, cups } of groups) {
      const section = document.createElement('section');
      section.className = 'cup-group';

      const head = document.createElement('div');
      head.className = 'cup-group__head';
      const title = document.createElement('h3');
      title.className = 'cup-group__title';
      title.textContent = label;
      const hint = document.createElement('span');
      hint.className = 'cup-group__note';
      hint.textContent = note;
      head.append(title, hint);
      section.appendChild(head);

      const grid = document.createElement('div');
      grid.className = 'cup-grid';
      const cards = [];

      for (const cup of cups) {
        const card = document.createElement('button');
        card.type = 'button';
        card.className = 'cup-card';
        card.dataset.id = cup.id;
        card.setAttribute('aria-pressed', 'false');
        card.setAttribute('aria-label', `${cup.volumeMl} мл, ${cup.name}`);
        // Фокус по карточкам ведут стрелки, а не Tab: иначе до кнопки закрытия
        // пришлось бы протабать два десятка позиций (roving tabindex).
        card.tabIndex = -1;

        // Выбирают «на 250, повыше» — поэтому крупно объём, а код и габариты
        // мельче: код совпадает с каталогом Формации, габариты различают
        // стаканы одного объёма.
        const volume = document.createElement('span');
        volume.className = 'cup-card__volume';
        volume.textContent = `${cup.volumeMl} мл`;
        const name = document.createElement('span');
        name.className = 'cup-card__name';
        name.textContent = cup.name;
        const size = document.createElement('span');
        size.className = 'cup-card__size';
        size.textContent = `Ø${Math.round(cup.size.topMm)} · ${Math.round(cup.size.heightMm)} мм`;

        const info = document.createElement('span');
        info.className = 'cup-card__info';
        info.append(volume, name, size);
        card.append(cupPhoto(cup, scale), info);
        card.addEventListener('click', () => this.#choose(cup.id));

        grid.appendChild(card);
        cards.push(card);
        this.cards.push({ cup, card, grid });
      }

      section.appendChild(grid);
      this.list.appendChild(section);
      this.sections.push({ section, group: label, cards });
    }
  }

  #addFilter(group, label, count) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'segmented__item cup-filter';
    button.dataset.group = group;
    button.setAttribute('aria-pressed', String(group === this.group));

    const text = document.createElement('span');
    text.textContent = label;
    const badge = document.createElement('span');
    badge.className = 'cup-filter__count';
    badge.textContent = String(count);

    button.append(text, badge);
    button.addEventListener('click', () => this.#setGroup(group));
    this.filters.appendChild(button);
    this.filterButtons.push(button);
  }

  #setGroup(group) {
    this.group = group;
    for (const button of this.filterButtons) {
      button.setAttribute('aria-pressed', String(button.dataset.group === group));
    }
    this.#filter(this.search?.value ?? '');
  }

  #bind() {
    this.closeButton?.addEventListener('click', () => this.close());
    this.root.querySelector('#cup-reset-search')?.addEventListener('click', () => {
      if (this.search) this.search.value = '';
      this.#setGroup('');
      this.search?.focus();
    });
    this.backdrop?.addEventListener('click', () => this.close());
    // Поиск — по всем стаканам: внутри выбранного раздела «250» в PET давало
    // «Ничего не нашлось», хотя стакан на 250 мл есть.
    this.search?.addEventListener('input', () => {
      if (this.search.value.trim() && this.group !== '') this.#setGroup('');
      else this.#filter(this.search.value);
    });

    // Enter в поиске выбирает единственный оставшийся стакан — обычный способ
    // добраться до модели, не снимая рук с клавиатуры. Стрелка вниз из поиска
    // переводит фокус на карточки.
    this.search?.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        const shown = this.#visibleCards();
        if (shown.length === 1) this.#choose(shown[0].cup.id);
        return;
      }
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        this.#focusCard(0);
      }
    });

    this.list.addEventListener('keydown', (event) => this.#onListKey(event));

    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && this.isOpen) this.close();
    });

    // Модальное окно не отпускает фокус: Tab по кругу внутри него. Иначе
    // фокус уходит на страницу под затемнением, и с клавиатуры непонятно, где
    // ты находишься.
    this.root.addEventListener('keydown', (event) => {
      if (event.key !== 'Tab') return;
      const stops = this.#tabStops();
      if (stops.length === 0) return;
      const first = stops[0];
      const last = stops[stops.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || !this.root.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    });
  }

  // Видимые карточки в порядке списка.
  #visibleCards() {
    return this.cards.filter(({ card }) => !card.hidden);
  }

  #tabStops() {
    const reset = this.empty?.hidden ? null : this.root.querySelector('#cup-reset-search');
    const stops = [this.closeButton, this.search, ...this.filterButtons, reset].filter(Boolean);
    // Из карточек в обход участвует только текущая: остальные достаются
    // стрелками (роving tabindex).
    const current = this.#visibleCards().find(({ card }) => card.tabIndex === 0);
    if (current) stops.push(current.card);
    return stops.filter((el) => !el.hidden && !el.disabled);
  }

  // Стрелки водят по карточкам, как по сетке: вправо-влево — соседняя,
  // вверх-вниз — та же позиция строкой выше или ниже. Число столбцов берётся
  // из самой сетки, поэтому шаг верен и на узком экране.
  #onListKey(event) {
    const keys = ['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Home', 'End'];
    if (!keys.includes(event.key)) return;

    const shown = this.#visibleCards();
    if (shown.length === 0) return;
    const index = shown.findIndex(({ card }) => card === document.activeElement);
    if (index < 0) return;

    event.preventDefault();
    const columns = this.#columnsOf(shown[index].grid);
    const next = {
      ArrowRight: index + 1,
      ArrowLeft: index - 1,
      ArrowDown: index + columns,
      ArrowUp: index - columns,
      Home: 0,
      End: shown.length - 1,
    }[event.key];

    this.#focusCard(Math.min(Math.max(next, 0), shown.length - 1));
  }

  #columnsOf(grid) {
    const columns = getComputedStyle(grid).gridTemplateColumns.split(' ').filter(Boolean);
    return Math.max(1, columns.length);
  }

  #focusCard(index) {
    const shown = this.#visibleCards();
    const target = shown[index];
    if (!target) return;
    for (const { card } of this.cards) card.tabIndex = -1;
    target.card.tabIndex = 0;
    target.card.focus();
    target.card.scrollIntoView({ block: 'nearest' });
  }

  #choose(id) {
    this.close();
    this.onSelect?.(id);
  }

  #filter(query) {
    // Карточки переезжают на новые места, а не перескакивают (FLIP).
    const before = this.isOpen ? snapshot(this.cards.map(({ card }) => card)) : null;
    const q = norm(query).trim();
    let visible = 0;

    for (const { cup, card } of this.cards) {
      const haystack = norm(
        `${cup.id} ${cup.name} ${groupOf(cup)} ${cup.volumeMl} мл ${cup.searchTerms.join(' ')}`,
      );
      const hit = (q === '' || haystack.includes(q)) && (this.group === '' || groupOf(cup) === this.group);
      card.hidden = !hit;
      if (hit) visible += 1;
    }

    // Раздел, в котором ничего не осталось, прячется вместе с заголовком.
    for (const { section, cards } of this.sections) {
      section.hidden = cards.every((card) => card.hidden);
    }
    if (this.empty) this.empty.hidden = visible > 0;

    // Обход стрелками начинается с выбранного стакана, а если его отфильтровали —
    // с первой оставшейся карточки.
    const shown = this.#visibleCards();
    for (const { card } of this.cards) card.tabIndex = -1;
    const start = shown.find(({ cup }) => cup.id === this.activeId) ?? shown[0];
    if (start) start.card.tabIndex = 0;
    if (before) {
      flip(before);
      stagger(shown.filter(({ card }) => !before.has(card)).map(({ card }) => card), { step: 16 });
    }
  }

  // Отмечает модель, которая стоит в сцене. null — модель не из каталога.
  setActive(id) {
    this.activeId = id ?? null;
    for (const { cup, card } of this.cards) {
      const active = cup.id === id;
      card.classList.toggle('is-active', active);
      card.setAttribute('aria-pressed', String(active));
    }
  }

  open(opener = null) {
    if (this.isOpen) return;
    this.opener = opener;
    this.closing = false;
    showLayer(this.backdrop);
    showLayer(this.root);

    if (this.search) this.search.value = '';
    // Открывается ВЕСЬ каталог, а не раздел текущего стакана: раздел скрыл бы
    // остальные типы, а про них клиент может и не знать. Нужный стакан виден
    // сразу — к нему список и подкручивается.
    this.#setGroup('');
    const active = this.cards.find(({ cup }) => cup.id === this.activeId);

    // Фокус в поиск — только там, где есть настоящая клавиатура. На телефоне
    // от него выезжает экранная, закрывая собой половину карточек.
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      this.search?.focus();
    }

    active?.card.scrollIntoView({ block: 'nearest' });
    // Карточки, что видны в окне, проявляются по очереди.
    const listTop = this.list.getBoundingClientRect();
    stagger(
      this.#visibleCards()
        .map(({ card }) => card)
        .filter((card) => {
          const rect = card.getBoundingClientRect();
          return rect.bottom > listTop.top && rect.top < listTop.bottom;
        }),
    );
    this.onToggle?.(true);
  }

  close() {
    if (!this.isOpen) return;
    this.closing = true;
    hideLayer(this.root);
    hideLayer(this.backdrop);
    this.opener?.focus();
    this.opener = null;
    this.onToggle?.(false);
  }

  toggle(opener = null) {
    if (this.isOpen) this.close();
    else this.open(opener);
  }
}
