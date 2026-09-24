// Сцена вокруг холста: вкладки, выбор фото-сцены, развёртка, поворотный круг,
// сброс вида и подсказка. Источник истины — ViewerState: DOM только
// показывает state и передаёт намерения в actions.

import { UnwrapView } from './unwrap.js';

export function initStage({ state, viewer, catalog, actions }) {
  initTabs(state, actions);
  initScenes(state, catalog, actions);
  const unwrap = initUnwrap();
  initTurntable(viewer);
  initHelp();
  document.getElementById('stage')?.addEventListener('dblclick', () => actions.resetView());
  return { unwrap };
}

// Переключение режимов сцены: 3D и развёртка живут в одном контейнере, поэтому
// показываем нужный слой и прячем лишние элементы управления.
function initTabs(state, actions) {
  const tabs = Array.from(document.querySelectorAll('.stage-tab'));
  const stage = document.querySelector('.stage');
  const unwrapEl = document.getElementById('unwrap');
  const controls = document.querySelector('.stage-controls');
  const swatches = document.querySelector('.stage-swatches');
  const scenes = document.getElementById('scene-picker');

  tabs.forEach((tab) => tab.addEventListener('click', () => actions.setTab(tab.dataset.tab)));

  const render = ({ tab: mode }) => {
    for (const tab of tabs) {
      const active = tab.dataset.tab === mode;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
    }
    // Фото-сцену панели не перекрывают: холст сжимается до области между ними
    // (см. .stage.is-photo в stage.css), и снимок вписывается уже туда.
    stage?.classList.toggle('is-photo', mode === 'scene');
    // На развёртке скрывается и выбор картона: там макет лежит плоско, без
    // света и материала (см. .stage.is-unwrap в stage.css).
    stage?.classList.toggle('is-unwrap', mode === 'unwrap');
    if (unwrapEl) unwrapEl.hidden = mode !== 'unwrap';
    // В развёртке вращать и менять фон нечего.
    if (controls) controls.hidden = mode === 'unwrap';
    // Кружочки фона и выбор сцены делят одно место и меняются местами: в
    // фото-сцене фон — это снятая комната, плоский цвет там выбирать нечего.
    if (swatches) swatches.hidden = mode !== '3d';
    if (scenes) scenes.hidden = mode !== 'scene';
  };
  state.subscribe(['tab'], render);
  render(state.get());
}

// Ряд выбора сцены — со второй сцены в каталоге: одна кнопка, которую некуда
// переключить, была бы лишним элементом.
function initScenes(state, catalog, actions) {
  const box = document.getElementById('scene-picker');
  if (!box) return;

  if (catalog.scenes.length === 0) {
    document.querySelector('.stage-tab[data-tab="scene"]')?.remove();
    box.remove();
    return;
  }
  if (catalog.scenes.length < 2) {
    box.remove();
    return;
  }

  box.replaceChildren();
  const buttons = catalog.scenes.map((scene) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'scene-chip';
    button.dataset.scene = scene.id;
    button.title = scene.note ?? '';
    const label = document.createElement('span');
    label.className = 'scene-chip__label';
    label.textContent = scene.name;
    button.appendChild(label);
    button.addEventListener('click', () => actions.selectScene(scene.id));
    box.appendChild(button);
    return button;
  });

  const render = ({ sceneId }) => {
    for (const button of buttons) {
      const active = button.dataset.scene === sceneId;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    }
  };
  state.subscribe(['sceneId'], render);
  render(state.get());
}

function initUnwrap() {
  const root = document.getElementById('unwrap');
  return root ? new UnwrapView(root) : null;
}

// Круг показывается ТОЛЬКО кнопкой — по наведению на сцену он не появляется.
// Совсем выключить его можно флагом turntable.enabled в js/config.js.
function initTurntable(viewer) {
  const button = document.getElementById('turntable-btn');
  const turntable = viewer.turntable;
  if (!button) return;
  if (!turntable) {
    button.hidden = true;
    return;
  }
  button.addEventListener('click', () => {
    const pinned = turntable.togglePinned();
    button.classList.toggle('is-active', pinned);
    button.setAttribute('aria-pressed', String(pinned));
  });
}

// Подсказка «как управлять». Карточка лежит вне сцены — у сцены overflow:
// hidden, и внутри неё подсказка обрезалась краем. Значит, позицию под кнопкой
// считаем сами; на телефоне она разворачивается снизу во всю ширину, и считать
// нечего (см. stage.css).
function initHelp() {
  const button = document.getElementById('info-btn');
  const popover = document.getElementById('help-popover');
  const backdrop = document.getElementById('help-backdrop');
  const closeBtn = document.getElementById('help-close');
  if (!button || !popover) return;

  const isPhone = () => window.matchMedia('(max-width: 640px)').matches;

  // Карточка над кнопкой, прижата к правому краю, но не вылезает за окно.
  const place = () => {
    if (isPhone()) return;
    const anchor = button.getBoundingClientRect();
    const card = popover.getBoundingClientRect();
    const margin = 12;

    let left = anchor.right - card.width;
    left = Math.min(Math.max(left, margin), window.innerWidth - card.width - margin);

    // Не хватает места сверху — показываем под кнопкой.
    const above = anchor.top - card.height - margin;
    const top = above >= margin ? above : Math.min(anchor.bottom + margin, window.innerHeight - card.height - margin);

    popover.style.left = `${Math.round(left)}px`;
    popover.style.top = `${Math.round(top)}px`;
  };

  const open = () => {
    popover.hidden = false;
    if (backdrop) backdrop.hidden = false;
    // Размеры карточки известны только после показа — позицию считаем следом.
    place();
    requestAnimationFrame(() => {
      popover.classList.add('is-open');
      place();
    });
    button.setAttribute('aria-expanded', 'true');
  };

  const close = () => {
    popover.classList.remove('is-open');
    button.setAttribute('aria-expanded', 'false');
    if (backdrop) backdrop.hidden = true;
    setTimeout(() => {
      if (!popover.classList.contains('is-open')) popover.hidden = true;
    }, 180);
  };

  button.addEventListener('click', (event) => {
    event.stopPropagation();
    if (popover.hidden) open();
    else close();
  });
  closeBtn?.addEventListener('click', close);
  backdrop?.addEventListener('click', close);

  document.addEventListener('click', (event) => {
    if (popover.hidden) return;
    if (popover.contains(event.target) || button.contains(event.target)) return;
    close();
  });
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !popover.hidden) close();
  });
  window.addEventListener('resize', () => {
    if (!popover.hidden) place();
  });
  window.addEventListener('scroll', () => {
    if (!popover.hidden) place();
  }, { passive: true });
}
