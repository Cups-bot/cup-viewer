// Плавающая панель управления, кружочки фонов и горячие клавиши. Кнопки
// показывают состояние из ViewerState, нажатия уходят в actions.

// Горячие клавиши. Буквы — по physical-независимому event.key, поэтому в
// русской раскладке они не срабатывают: так и задумано, иначе «ф» в поиске
// разворачивала бы сцену.
const SHORTCUTS = {
  b: 'cycleBackground',
  a: 'toggleAutoRotate',
  s: 'screenshot',
  f: 'toggleFullscreen',
};

const TEXT_ENTRY = new Set(['INPUT', 'TEXTAREA', 'SELECT', 'OPTION']);

function isTextEntry(target) {
  if (!target || target.nodeType !== 1) return false;
  return TEXT_ENTRY.has(target.tagName) || target.isContentEditable === true;
}

export function initToolbar({ state, catalog, mode, actions }) {
  const autorotate = document.getElementById('autorotate-btn');
  const fullscreen = document.getElementById('fullscreen-btn');
  const menu = initExportMenu(actions);

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

  window.addEventListener('keydown', (event) => {
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    // Буква, набранная в поле поиска, — это текст, а не команда.
    if (isTextEntry(event.target)) return;
    // Идёт набор через IME: клавиши принадлежат ему.
    if (event.isComposing || event.keyCode === 229) return;
    const key = event.key.toLowerCase();
    if (key === 'v') {
      menu.toggle();
      return;
    }
    const action = SHORTCUTS[key];
    if (action) actions[action]();
  });

  return { setExportBusy: menu.setBusy };
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
      swatch.setAttribute('role', 'menuitem');
      swatch.setAttribute('aria-label', `Фон: ${background.name}`);
      swatch.addEventListener('click', () => actions.selectBackground(background.id));
      box.appendChild(swatch);
      return swatch;
    });

  const render = ({ backgroundId }) => {
    for (const swatch of swatches) swatch.classList.toggle('is-active', swatch.dataset.background === backgroundId);
  };
  state.subscribe(['backgroundId'], render);
  render(state.get());
}

// Меню выгрузки оборота раскрывается вверх прямо от кнопки.
function initExportMenu(actions) {
  const button = document.getElementById('export-btn');
  const popover = document.getElementById('export-popover');
  const photos = document.getElementById('export-photos');
  const start = document.getElementById('export-start');

  const toggle = (open) => {
    if (!button || !popover || button.disabled) return;
    const next = open ?? popover.hidden;
    popover.hidden = !next;
    button.classList.toggle('is-active', next);
    button.setAttribute('aria-expanded', String(next));
  };

  if (button && popover) {
    button.addEventListener('click', () => toggle());
    start?.addEventListener('click', () => {
      toggle(false);
      actions.exportTurn({ photos: photos?.checked === true });
    });
    // Щелчок мимо меню закрывает его. Ловим на погружении: подсказка гасит
    // всплытие у себя, и на всплытии этот обработчик до неё не доходил бы.
    document.addEventListener(
      'click',
      (event) => {
        if (popover.hidden) return;
        if (popover.contains(event.target) || button.contains(event.target)) return;
        toggle(false);
      },
      true,
    );
    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !popover.hidden) toggle(false);
    });
  }

  return {
    toggle: () => toggle(),
    setBusy(busy) {
      if (busy) toggle(false);
      if (button) button.disabled = busy;
      if (start) start.disabled = busy;
    },
  };
}
