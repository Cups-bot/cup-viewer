// «Как пользоваться» — пошаговая инструкция с подсветкой, как на colorcups.ru
// (ColorPalette: components/tool/Tour.tsx). По шагу за раз: карточка встаёт
// рядом с тем, о чём говорит, сам элемент обведён рамкой, остальной экран
// размыт, но не затемнён — цвета макета на стакане остаются собой.
//
// Шаг указывает на элемент атрибутом data-tour. Элементов с одним именем может
// быть несколько (кнопка в панели и её двойник в нижней панели телефона) —
// берётся видимый; шаг, чьего элемента сейчас на экране нет, пропускается.

const PANEL_WIDTH = 340;
const GAP = 14;
const RING_RADIUS = 16;
const KEY = 'cupviewer.tour.v1';

const el = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
};

const icon = (name) => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', `icon tour-icon tour-icon--${name}`);
  svg.setAttribute('aria-hidden', 'true');
  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttribute('href', `assets/icons/sprite.svg#${name === 'close' ? 'close' : 'chevron-down'}`);
  svg.append(use);
  return svg;
};

// Видимый элемент шага: есть размер и не спрятан.
export function tourTarget(name) {
  for (const node of document.querySelectorAll(`[data-tour="${name}"]`)) {
    const box = node.getBoundingClientRect();
    if (box.width > 0 && box.height > 0 && getComputedStyle(node).visibility !== 'hidden') return node;
  }
  return null;
}

// Экран с вырезом под элемент — для clip-path: размытие ложится на всё,
// кроме того, о чём сейчас говорит карточка.
function veilPath(box, width, height) {
  const r = Math.min(RING_RADIUS, box.width / 2, box.height / 2);
  const { top: t, left: l, width: w, height: h } = box;
  return `M0 0H${width}V${height}H0Z`
    + `M${l + r} ${t}H${l + w - r}A${r} ${r} 0 0 1 ${l + w} ${t + r}V${t + h - r}A${r} ${r} 0 0 1 ${l + w - r} ${t + h}`
    + `H${l + r}A${r} ${r} 0 0 1 ${l} ${t + h - r}V${t + r}A${r} ${r} 0 0 1 ${l + r} ${t}Z`;
}

// Видел ли человек инструкцию (хоть одну) — тогда знакомство само не приходит.
export function tourSeen() {
  try {
    return localStorage.getItem(KEY) === '1';
  } catch {
    return false;
  }
}

function markSeen() {
  try {
    localStorage.setItem(KEY, '1');
  } catch {
    // Некуда сохранить — знакомство придёт и в следующий визит, не страшно.
  }
}

export function createTour() {
  let ui = null;
  let steps = [];
  let index = 0;
  let label = '';
  let intro = false;
  let restore = null;
  let stop = null;

  const build = () => {
    const veil = el('div', 'tour-veil');
    veil.setAttribute('aria-hidden', 'true');
    const ring = el('div', 'tour-ring');
    ring.setAttribute('aria-hidden', 'true');
    const card = el('div', 'tour-card');
    card.setAttribute('role', 'dialog');
    card.setAttribute('aria-modal', 'false');
    card.setAttribute('aria-labelledby', 'tour-title');
    card.setAttribute('aria-describedby', 'tour-body');
    card.tabIndex = -1;
    const counter = el('span', 'tour-card__counter');
    const close = el('button', 'icon-btn tour-card__close');
    close.type = 'button';
    close.setAttribute('aria-label', 'Закрыть подсказку');
    close.append(icon('close'));
    const top = el('div', 'tour-card__top');
    top.append(counter, close);
    const title = el('h2', 'tour-card__title');
    title.id = 'tour-title';
    const body = el('div', 'tour-card__body');
    body.id = 'tour-body';
    const back = el('button', 'icon-btn tour-card__back');
    back.type = 'button';
    back.setAttribute('aria-label', 'Предыдущий шаг');
    back.append(icon('back'));
    const skip = el('button', 'tour-card__skip', 'Разберусь сам');
    skip.type = 'button';
    const next = el('button', 'btn btn--accent tour-card__next');
    next.type = 'button';
    const actions = el('div', 'tour-card__actions');
    actions.append(back, skip, next);
    card.append(top, title, body, actions);
    document.body.append(veil, ring, card);
    close.addEventListener('click', () => finish());
    skip.addEventListener('click', () => finish());
    back.addEventListener('click', () => go(index - 1));
    next.addEventListener('click', () => (index >= steps.length - 1 ? finish() : go(index + 1)));
    return { veil, ring, card, counter, title, body, back, skip, next };
  };

  const place = (target) => {
    const width = innerWidth;
    const height = innerHeight;
    const panelWidth = ui.card.offsetWidth || PANEL_WIDTH;
    const panelHeight = ui.card.offsetHeight || 200;
    const box = target?.getBoundingClientRect();
    if (!box || box.width === 0) {
      ui.ring.hidden = true;
      ui.veil.style.removeProperty('clip-path');
      ui.card.style.left = `${Math.max(16, width / 2 - panelWidth / 2)}px`;
      ui.card.style.top = `${Math.max(16, height / 2 - panelHeight / 2)}px`;
      return;
    }
    const ring = { top: box.top - 6, left: box.left - 6, width: box.width + 12, height: box.height + 12 };
    ui.ring.hidden = false;
    Object.assign(ui.ring.style, { top: `${ring.top}px`, left: `${ring.left}px`, width: `${ring.width}px`, height: `${ring.height}px` });
    ui.veil.style.clipPath = `path(evenodd, "${veilPath(ring, width, height)}")`;
    const clampLeft = (left) => Math.min(Math.max(16, left), width - panelWidth - 16);
    const clampTop = (top) => Math.min(Math.max(16, top), height - panelHeight - 16);
    let left;
    let top;
    // Телефон: сбоку места нет — карточка во всю ширину (design.css) у того
    // края, где элемента нет.
    if (width <= 600) [left, top] = [16, box.top + box.height / 2 > height / 2 ? 16 : height - panelHeight - 16];
    else if (box.right + GAP + panelWidth < width - 16) [left, top] = [box.right + GAP, clampTop(box.top)];
    else if (box.left - GAP - panelWidth > 16) [left, top] = [box.left - GAP - panelWidth, clampTop(box.top)];
    else if (box.bottom + GAP + panelHeight < height - 16) [left, top] = [clampLeft(box.left), box.bottom + GAP];
    else if (box.top - GAP - panelHeight > 16) [left, top] = [clampLeft(box.left), box.top - GAP - panelHeight];
    // Большой элемент (сцена на телефоне): карточка — у того края экрана, где
    // от элемента больше свободного места, поверх него.
    else [left, top] = [clampLeft(box.left), box.top + box.height / 2 > height / 2 ? 16 : height - panelHeight - 16];
    ui.card.style.left = `${left}px`;
    ui.card.style.top = `${top}px`;
  };

  const show = () => {
    stop?.();
    const step = steps[index];
    const target = step.target ? tourTarget(step.target) : null;
    target?.scrollIntoView({ block: 'nearest' });
    const first = index === 0;
    const last = index === steps.length - 1;
    ui.counter.textContent = `${intro ? 'Первое знакомство' : label} · ${index + 1} из ${steps.length}`;
    ui.title.textContent = step.title;
    const text = el('p', '', step.body);
    const nodes = [text];
    if (step.list) {
      const list = el('ol', 'tour-card__list');
      for (const item of step.list) list.append(el('li', '', item));
      nodes.push(list);
    }
    ui.body.replaceChildren(...nodes);
    ui.card.classList.toggle('is-welcome', Boolean(step.welcome));
    ui.skip.hidden = !(first && intro);
    ui.back.hidden = first && intro;
    ui.back.disabled = first;
    ui.next.textContent = last ? 'Понятно' : first && intro ? 'Показать' : 'Дальше';
    const measure = () => place(target);
    measure();
    ui.card.focus({ preventScroll: true });
    const observer = new ResizeObserver(measure);
    if (target) observer.observe(target);
    observer.observe(ui.card);
    window.addEventListener('resize', measure);
    window.addEventListener('scroll', measure, true);
    stop = () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', measure, true);
    };
  };

  const go = (next) => {
    if (next < 0 || next >= steps.length) return;
    index = next;
    show();
  };

  const onKey = (event) => {
    if (!ui) return;
    if (event.key === 'Escape') {
      // Закрывается только инструкция — лист или окно под ней остаются.
      event.preventDefault();
      event.stopPropagation();
      finish();
    } else if (event.key === 'ArrowRight' && document.activeElement === ui.card) {
      go(index + 1);
    } else if (event.key === 'ArrowLeft' && document.activeElement === ui.card) {
      go(index - 1);
    }
  };

  function finish() {
    if (!ui) return;
    stop?.();
    stop = null;
    document.removeEventListener('keydown', onKey, true);
    ui.veil.remove();
    ui.ring.remove();
    ui.card.remove();
    ui = null;
    delete document.body.dataset.tour;
    markSeen();
    restore?.focus?.({ preventScroll: true });
  }

  // list — шаги { target?, title, body, list?, welcome? }; label — название
  // инструкции над карточкой; welcome — первое знакомство (кнопки «Разберусь
  // сам» и «Показать»). Шаги без элемента на экране отбрасываются.
  function start(list, { title = 'Как пользоваться', welcome = false } = {}) {
    finish();
    steps = list.filter((step) => !step.target || tourTarget(step.target));
    if (!steps.length) return false;
    index = 0;
    label = title;
    intro = welcome;
    restore = document.activeElement;
    ui = build();
    document.body.dataset.tour = 'open';
    document.addEventListener('keydown', onKey, true);
    show();
    return true;
  }

  return {
    start,
    close: finish,
    get open() {
      return Boolean(ui);
    },
  };
}
