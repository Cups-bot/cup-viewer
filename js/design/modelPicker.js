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
// Силуэт рисуется по числам из каталога, а не картинкой из assets/: новая
// модель не требует ни рендера, ни выкладки файла — только строчку размеров.

// Подписи типов стенки: по ним же разделы окна и поиск.
const WALL_KINDS = Object.freeze({
  single: { label: 'Однослойный', group: 'Однослойные' },
  double: { label: 'Двухслойный', group: 'Двухслойные' },
  embossed: { label: 'С тиснением', group: 'С тиснением' },
  plastic: { label: 'Полипропилен', group: 'Пластиковые' },
});

const groupOf = (model) => WALL_KINDS[model.wall]?.group ?? '';

// Модели, разложенные по разделам в порядке каталога.
function modelGroups(models) {
  const groups = new Map();
  for (const model of models) {
    const name = groupOf(model);
    if (!groups.has(name)) groups.set(name, []);
    groups.get(name).push(model);
  }
  return [...groups].map(([group, cups]) => ({ group, cups }));
}

// Поле рисунка карточки в единицах SVG. Ширина с запасом: самый широкий
// стакан каталога — 89 мм по верху.
const ART = { width: 96, height: 104, padding: 6 };

// Насколько сплюснут эллипс ободка — отношение полуосей. Смотрим на стакан
// чуть сверху, как камера в самой сцене.
const RIM_SQUASH = 0.17;

// Запас высоты под ободок: он выступает над верхней кромкой на свою полуось.
const RIM_HEADROOM = 1.1;

const SVG_NS = 'http://www.w3.org/2000/svg';

// Нормализация для поиска: регистр и «ё» не должны мешать найти стакан.
const norm = (value) => String(value ?? '').toLowerCase().replace(/ё/g, 'е');

// Общий масштаб: самый высокий стакан каталога занимает поле целиком,
// остальные — пропорционально своему росту.
function artScale(models) {
  const tallest = Math.max(...models.map((cup) => cup.size.heightMm), 1);
  return (ART.height - ART.padding * 2) / (tallest * RIM_HEADROOM);
}

function svgEl(name, attrs) {
  const node = document.createElementNS(SVG_NS, name);
  for (const [key, value] of Object.entries(attrs)) node.setAttribute(key, value);
  return node;
}

// Силуэт стакана: тень под дном, стенка, приметы типа и эллипс ободка.
//
// Геометрия честная — из size каталога, — поэтому карточки сравнимы между
// собой: у самого маленького бумажного стенка почти отвесная и низкая, у
// пластикового на 650 мл — высокая и узкая.
function drawCup(cup, scale) {
  const svg = svgEl('svg', {
    class: `cup-card__art cup-card__art--${cup.wall ?? 'single'}`,
    viewBox: `0 0 ${ART.width} ${ART.height}`,
    'aria-hidden': 'true',
  });

  const size = cup.size;
  const h = size.heightMm * scale;
  const topR = (size.topMm / 2) * scale;
  const botR = (size.bottomMm / 2) * scale;
  const cx = ART.width / 2;
  // Все стаканы стоят на одной линии — иначе сравнивать их по росту нельзя.
  const baseY = ART.height - ART.padding;
  const topY = baseY - h;
  const rimRy = topR * RIM_SQUASH;
  const botRy = botR * RIM_SQUASH;

  // Стенка: от левой верхней кромки вниз, по дну и обратно вверх. Верх
  // закрывает эллипс ободка, поэтому здесь он оставлен прямым.
  const bodyPath =
    `M${cx - topR} ${topY} L${cx - botR} ${baseY} ` +
    `A${botR} ${botRy} 0 0 0 ${cx + botR} ${baseY} ` +
    `L${cx + topR} ${topY} Z`;

  svg.append(
    // Линия пола: все стаканы стоят на ней, и разница в росте читается как
    // разница в росте, а не как «мелкая картинка» на карточке.
    svgEl('line', {
      class: 'cup-card__floor',
      x1: ART.padding,
      y1: baseY + botRy,
      x2: ART.width - ART.padding,
      y2: baseY + botRy,
    }),
    svgEl('ellipse', {
      class: 'cup-card__shadow',
      cx,
      cy: baseY + botRy * 0.5,
      rx: botR * 1.25,
      ry: botRy * 1.1,
    }),
    svgEl('path', { class: 'cup-card__body', d: bodyPath }),
  );

  // Приметы типа рисуются ВНУТРИ стенки: обрезаем их её же контуром, иначе
  // рисунок тиснения вылезал бы за силуэт.
  const clipId = `cup-clip-${cup.id}`;
  const defs = svgEl('defs', {});
  const clip = svgEl('clipPath', { id: clipId });
  clip.appendChild(svgEl('path', { d: bodyPath }));
  defs.appendChild(clip);
  svg.appendChild(defs);

  const marks = svgEl('g', { 'clip-path': `url(#${clipId})` });

  if (cup.wall === 'double') {
    // Обёртка двухслойного: она закрывает стенку почти целиком, кроме узкой
    // полосы у дна и самой кромки — по этим двум линиям тип и узнаётся.
    const sleeveTop = topY + h * 0.03;
    const sleeveBottom = baseY - h * 0.11;
    marks.append(
      svgEl('path', {
        class: 'cup-card__sleeve',
        d: `M${cx - topR} ${sleeveTop} L${cx - botR} ${sleeveBottom} L${cx + botR} ${sleeveBottom} L${cx + topR} ${sleeveTop} Z`,
      }),
      svgEl('line', {
        class: 'cup-card__seam',
        x1: cx - botR,
        y1: sleeveBottom,
        x2: cx + botR,
        y2: sleeveBottom,
      }),
    );
  }

  if (cup.wall === 'embossed') {
    // Тиснение: та же сетка ромбов, что на изделии. Рисуется косой решёткой —
    // на карточке в 96 единиц шириной отдельные ромбы уже неразличимы, и важна
    // именно фактура.
    const step = 7;
    const lattice = svgEl('g', { class: 'cup-card__emboss' });
    for (let x = -ART.height; x < ART.width + ART.height; x += step) {
      lattice.append(
        svgEl('line', { x1: x, y1: 0, x2: x + ART.height, y2: ART.height }),
        svgEl('line', { x1: x, y1: ART.height, x2: x + ART.height, y2: 0 }),
      );
    }
    marks.appendChild(lattice);
  }

  svg.appendChild(marks);
  svg.appendChild(
    svgEl('ellipse', { class: 'cup-card__rim', cx, cy: topY, rx: topR, ry: rimRy }),
  );
  return svg;
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
    return this.root.hidden === false;
  }

  #build() {
    const scale = artScale(this.models);
    this.list.replaceChildren();
    this.filters?.replaceChildren();

    const groups = modelGroups(this.models);
    if (this.filters) {
      this.#addFilter('', 'Все', this.models.length);
      for (const { group, cups } of groups) this.#addFilter(group, group, cups.length);
    }

    for (const { group, cups } of groups) {
      const section = document.createElement('section');
      section.className = 'cup-group';

      if (group) {
        const title = document.createElement('h3');
        title.className = 'cup-group__title';
        title.textContent = group;
        section.appendChild(title);
      }

      const grid = document.createElement('div');
      grid.className = 'cup-grid';
      const cards = [];

      for (const cup of cups) {
        const card = document.createElement('button');
        card.type = 'button';
        card.className = 'cup-card';
        card.dataset.id = cup.id;
        card.setAttribute('aria-pressed', 'false');
        // Фокус по карточкам ведут стрелки, а не Tab: иначе до кнопки закрытия
        // пришлось бы протабать два десятка позиций (роving tabindex).
        card.tabIndex = -1;

        const name = document.createElement('span');
        name.className = 'cup-card__name';
        name.textContent = cup.name;

        // Объём и рост — то, чем позиции различаются на деле. Номенклатура их
        // повторяет (диаметр и объём в коде), но читается как код, а выбирают
        // «на 300 мл, повыше».
        const meta = document.createElement('span');
        meta.className = 'cup-card__meta';
        const volume = document.createElement('b');
        volume.className = 'cup-card__volume';
        volume.textContent = `${cup.volumeMl} мл`;
        meta.appendChild(volume);
        meta.append(document.createTextNode(` · ${Math.round(cup.size.heightMm)} мм`));

        card.append(drawCup(cup, scale), name, meta);
        card.addEventListener('click', () => this.#choose(cup.id));

        grid.appendChild(card);
        cards.push(card);
        this.cards.push({ cup, card, grid });
      }

      section.appendChild(grid);
      this.list.appendChild(section);
      this.sections.push({ section, group, cards });
    }
  }

  #addFilter(group, label, count) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'cup-filter';
    button.dataset.group = group;
    button.setAttribute('aria-pressed', String(group === this.group));
    button.classList.toggle('is-active', group === this.group);

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
      const active = button.dataset.group === group;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    }
    this.#filter(this.search?.value ?? '');
  }

  #bind() {
    this.closeButton?.addEventListener('click', () => this.close());
    this.backdrop?.addEventListener('click', () => this.close());
    this.search?.addEventListener('input', () => this.#filter(this.search.value));

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
    const stops = [this.search, ...this.filterButtons, this.closeButton].filter(Boolean);
    // Из карточек в обход участвует только текущая: остальные достаются
    // стрелками (роving tabindex).
    const current = this.#visibleCards().find(({ card }) => card.tabIndex === 0);
    if (current) stops.splice(1, 0, current.card);
    return stops.filter((el) => !el.hidden);
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
    const q = norm(query).trim();
    let visible = 0;

    for (const { cup, card } of this.cards) {
      const wall = WALL_KINDS[cup.wall]?.label ?? '';
      const haystack = norm(
        `${cup.id} ${cup.name} ${groupOf(cup)} ${wall} ${cup.volumeMl} мл ${cup.searchTerms.join(' ')}`,
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
    this.root.hidden = false;
    if (this.backdrop) this.backdrop.hidden = false;

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
    this.onToggle?.(true);
  }

  close() {
    if (!this.isOpen) return;
    this.root.hidden = true;
    if (this.backdrop) this.backdrop.hidden = true;
    this.opener?.focus();
    this.opener = null;
    this.onToggle?.(false);
  }

  toggle(opener = null) {
    if (this.isOpen) this.close();
    else this.open(opener);
  }
}
