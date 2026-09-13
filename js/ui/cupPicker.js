// Окно выбора стакана: карточки моделей с силуэтом, поиск по названию и
// подсветка того, что сейчас стоит в сцене. Каталог — js/data/models.js,
// оттуда же берутся габариты для силуэта.
//
// ПОЧЕМУ НЕ ВЫПАДАЮЩИЙ СПИСОК, с которого всё начиналось. В нём видно только
// строчку текста, а стаканы различаются не строчкой, а ростом и формой:
// пластиковый на 650 мл вдвое выше бумажного на 280. Выбирать по коду
// номенклатуры вслепую неудобно, а когда позиций станет два десятка — будет
// невозможно. Карточка рисует силуэт в ОБЩЕМ для всех масштабе, поэтому
// разница в размере видна глазом, а поиск отсекает лишнее по названию, объёму
// или слову «пластик».
//
// Силуэт рисуется по числам из каталога, а не картинкой из assets/: новая
// модель не требует ни рендера, ни выкладки файла — только строчку размеров.

import { CUP_MODELS, cupGroups } from '../data/models.js';

// Поле рисунка карточки в единицах SVG. Ширина с запасом: самый широкий
// стакан каталога — 89 мм по верху.
const ART = { width: 96, height: 108, padding: 7 };

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
function artScale() {
  const tallest = Math.max(...CUP_MODELS.map((cup) => cup.size?.height ?? 0), 1);
  return (ART.height - ART.padding * 2) / (tallest * RIM_HEADROOM);
}

// Силуэт стакана: тень под дном, стенка и эллипс ободка.
function drawCup(cup, scale) {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('class', 'cup-card__art');
  svg.setAttribute('viewBox', `0 0 ${ART.width} ${ART.height}`);
  svg.setAttribute('aria-hidden', 'true');

  const size = cup.size;
  if (!size) return svg;

  const h = size.height * scale;
  const topR = (size.top / 2) * scale;
  const botR = (size.bottom / 2) * scale;
  const cx = ART.width / 2;
  // Все стаканы стоят на одной линии — иначе сравнивать их по росту нельзя.
  const baseY = ART.height - ART.padding;
  const topY = baseY - h;
  const rimRy = topR * RIM_SQUASH;
  const botRy = botR * RIM_SQUASH;

  const shadow = document.createElementNS(SVG_NS, 'ellipse');
  shadow.setAttribute('class', 'cup-card__shadow');
  shadow.setAttribute('cx', cx);
  shadow.setAttribute('cy', baseY + botRy * 0.5);
  shadow.setAttribute('rx', botR * 1.25);
  shadow.setAttribute('ry', botRy * 1.1);

  // Стенка: от левой верхней кромки вниз, по дну и обратно вверх. Верх
  // закрывает эллипс ободка, поэтому здесь он оставлен прямым.
  const body = document.createElementNS(SVG_NS, 'path');
  body.setAttribute('class', 'cup-card__body');
  body.setAttribute(
    'd',
    `M${cx - topR} ${topY} L${cx - botR} ${baseY} ` +
      `A${botR} ${botRy} 0 0 0 ${cx + botR} ${baseY} ` +
      `L${cx + topR} ${topY} Z`,
  );

  const rim = document.createElementNS(SVG_NS, 'ellipse');
  rim.setAttribute('class', 'cup-card__rim');
  rim.setAttribute('cx', cx);
  rim.setAttribute('cy', topY);
  rim.setAttribute('rx', topR);
  rim.setAttribute('ry', rimRy);

  svg.append(shadow, body, rim);
  return svg;
}

export class CupPicker {
  // root — карточка окна, backdrop — затемнение под ней. onSelect получает id
  // выбранной модели, onToggle — состояние окна: закрыть его можно и мимо
  // кнопки (Escape, щелчок по затемнению), а кнопке об этом знать нужно.
  constructor(root, { backdrop, onSelect, onToggle } = {}) {
    this.root = root;
    this.backdrop = backdrop ?? null;
    this.onSelect = onSelect ?? null;
    this.onToggle = onToggle ?? null;

    this.search = root.querySelector('.cup-search');
    this.list = root.querySelector('.cup-list');
    this.empty = root.querySelector('.cup-empty');
    this.closeButton = root.querySelector('.cup-dialog__close');

    // Кнопка, которой окно открыли: ей возвращается фокус при закрытии.
    this.opener = null;
    this.cards = [];
    this.sections = [];
    this.activeId = null;

    this.#build();
    this.#bind();
  }

  get isOpen() {
    return this.root.hidden === false;
  }

  #build() {
    const scale = artScale();
    this.list.replaceChildren();

    for (const { group, cups } of cupGroups()) {
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

        const name = document.createElement('span');
        name.className = 'cup-card__name';
        name.textContent = cup.label ?? cup.id;

        const note = document.createElement('span');
        note.className = 'cup-card__note';
        note.textContent = cup.note ?? '';

        card.append(drawCup(cup, scale), name, note);
        card.addEventListener('click', () => this.#choose(cup.id));

        grid.appendChild(card);
        cards.push(card);
        this.cards.push({ cup, card });
      }

      section.appendChild(grid);
      this.list.appendChild(section);
      this.sections.push({ section, cards });
    }
  }

  #bind() {
    this.closeButton?.addEventListener('click', () => this.close());
    this.backdrop?.addEventListener('click', () => this.close());
    this.search?.addEventListener('input', () => this.#filter(this.search.value));

    // Enter в поиске выбирает единственный оставшийся стакан — обычный способ
    // добраться до модели, не снимая рук с клавиатуры.
    this.search?.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter') return;
      const shown = this.cards.filter(({ card }) => !card.hidden);
      if (shown.length === 1) this.#choose(shown[0].cup.id);
    });

    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && this.isOpen) this.close();
    });
  }

  #choose(id) {
    this.close();
    this.onSelect?.(id);
  }

  #filter(query) {
    const q = norm(query).trim();
    let visible = 0;

    for (const { cup, card } of this.cards) {
      const haystack = norm(`${cup.id} ${cup.label} ${cup.note} ${cup.group}`);
      const hit = q === '' || haystack.includes(q);
      card.hidden = !hit;
      if (hit) visible += 1;
    }

    // Раздел, в котором ничего не осталось, прячется вместе с заголовком.
    for (const { section, cards } of this.sections) {
      section.hidden = cards.every((card) => card.hidden);
    }
    if (this.empty) this.empty.hidden = visible > 0;
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
    this.#filter('');

    // Фокус в поиск — только там, где есть настоящая клавиатура. На телефоне
    // от него выезжает экранная, закрывая собой половину карточек.
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      this.search?.focus();
    }

    const active = this.cards.find(({ cup }) => cup.id === this.activeId);
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
