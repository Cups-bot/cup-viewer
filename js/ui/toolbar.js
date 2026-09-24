// Панель инструментов (§21), фон, ракурсы и
// горячие клавиши. Кнопки показывают состояние из ViewerState, нажатия
// уходят в actions.

import { VIEW_NAMES } from '../core/cameraViews.js';

// Буквы — по event.key, поэтому в русской раскладке они не срабатывают: так и
// задумано, иначе «ф» в поиске разворачивала бы сцену.
const SHORTCUTS = {
  b: 'cycleBackground',
  a: 'toggleAutoRotate',
  s: 'screenshot',
  f: 'toggleFullscreen',
};

export const VIEW_LABELS = Object.freeze({
  front: 'Спереди',
  right: 'Справа',
  back: 'Сзади',
  left: 'Слева',
  top: 'Сверху',
  seam: 'Шов',
});

const TEXT_ENTRY = new Set(['INPUT', 'TEXTAREA', 'SELECT', 'OPTION']);

function isTextEntry(target) {
  if (!target || target.nodeType !== 1) return false;
  return TEXT_ENTRY.has(target.tagName) || target.isContentEditable === true;
}

// Выпадающее меню у кнопки: щелчок мимо и Escape закрывают. Ловим щелчок на
// погружении — иначе обработчики, гасящие всплытие, не давали бы закрыться.
export function bindMenu(button, menu, { onOpen } = {}) {
  if (!button || !menu) return { toggle() {}, close() {} };
  const set = (open) => {
    menu.hidden = !open;
    button.setAttribute('aria-expanded', String(open));
    if (open) onOpen?.();
  };
  button.addEventListener('click', () => {
    if (!button.disabled) set(menu.hidden);
  });
  document.addEventListener(
    'click',
    (event) => {
      if (menu.hidden) return;
      if (menu.contains(event.target) || button.contains(event.target)) return;
      set(false);
    },
    true,
  );
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !menu.hidden) {
      set(false);
      button.focus();
    }
  });
  return { toggle: () => !button.disabled && set(menu.hidden), close: () => set(false) };
}

export function initToolbar({ state, catalog, mode, actions }) {
  const autorotate = document.getElementById('autorotate-btn');
  const fullscreen = document.getElementById('fullscreen-btn');

  document.getElementById('reset-btn')?.addEventListener('click', () => actions.resetView());
  autorotate?.addEventListener('click', () => actions.toggleAutoRotate());
  fullscreen?.addEventListener('click', () => actions.toggleFullscreen());
  document.getElementById('screenshot-btn')?.addEventListener('click', () => actions.screenshot());
  document.getElementById('bg-btn')?.addEventListener('click', () => actions.cycleBackground());

  const pressed = (button, on) => {
    if (!button) return;
    button.classList.toggle('is-active', on);
    button.setAttribute('aria-pressed', String(on));
  };
  const render = (s) => {
    pressed(autorotate, s.autoRotate);
    pressed(fullscreen, s.fullscreen);
  };
  state.subscribe(['autoRotate', 'fullscreen'], render);
  render(state.get());

  initSwatches({ state, catalog, mode, actions });
  initViews({ state, actions });

  window.addEventListener('keydown', (event) => {
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    // Буква, набранная в поле поиска, — это текст, а не команда.
    if (isTextEntry(event.target)) return;
    // Идёт набор через IME: клавиши принадлежат ему.
    if (event.isComposing || event.keyCode === 229) return;
    // Открыто модальное окно — клавиши принадлежат ему.
    if (document.querySelector('.dialog:not([hidden])')) return;
    const key = event.key.toLowerCase();
    // V — окно экспорта: его кнопку строит оболочка режима.
    if (key === 'v') {
      document.getElementById('export-btn')?.click();
      return;
    }
    const view = VIEW_NAMES[Number(key) - 1];
    if (/^[1-6]$/.test(key) && view) {
      actions.setView(view);
      return;
    }
    const action = SHORTCUTS[key];
    if (action) actions[action]();
  });

}

// Кружочки фонов: только те, что разрешены режиму (в клиенте — client: true).
function initSwatches({ state, catalog, mode, actions }) {
  const box = document.getElementById('bg-swatches');
  if (!box) return;
  box.replaceChildren();
  const swatches = catalog.backgrounds
    .filter((background) => mode.canUseBackground(background))
    .map((background) => {
      const swatch = document.createElement('button');
      swatch.type = 'button';
      swatch.className = 'swatch';
      swatch.style.background = background.color;
      swatch.dataset.background = background.id;
      swatch.title = background.name;
      swatch.setAttribute('aria-label', `Фон: ${background.name}`);
      swatch.addEventListener('click', () => actions.selectBackground(background.id));
      box.appendChild(swatch);
      return swatch;
    });

  const render = ({ backgroundId }) => {
    for (const swatch of swatches) {
      const active = swatch.dataset.background === backgroundId;
      swatch.classList.toggle('is-active', active);
      swatch.setAttribute('aria-pressed', String(active));
    }
  };
  state.subscribe(['backgroundId'], render);
  render(state.get());
}

// Пресеты ракурса (§12).
function initViews({ state, actions }) {
  const box = document.getElementById('view-presets');
  if (!box) return;
  box.replaceChildren();
  const buttons = VIEW_NAMES.map((name, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'segmented__item view-btn';
    button.setAttribute('aria-checked', 'false');
    button.dataset.view = name;
    button.textContent = VIEW_LABELS[name];
    button.title = `${VIEW_LABELS[name]} · ${index + 1}`;
    button.addEventListener('click', () => actions.setView(name));
    box.appendChild(button);
    return button;
  });
  const render = ({ view }) => {
    for (const button of buttons) button.setAttribute('aria-checked', String(button.dataset.view === view));
  };
  state.subscribe(['view'], render);
  render(state.get());
}
