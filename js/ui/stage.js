// Сцена вокруг холста: вкладки, выбор фото-сцены, развёртка,
// сброс вида и подсказка. Источник истины — ViewerState: DOM только
// показывает state и передаёт намерения в actions.

import { UnwrapView } from './unwrap.js';
import { hideLayer, showLayer } from './motion.js';

export function initStage({ state, viewer, catalog, actions }) {
  initTabs(state, actions);
  initScenes(state, catalog, actions);
  const unwrap = initUnwrap(actions);
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
  const studioFoot = document.getElementById('studio-foot');
  const card = document.querySelector('.stage-card');

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
    // В «Фотореале» ракурсы студии уступают место панели сцены (photoPanel):
    // карточка становится сеткой «кадр | панель». На развёртке ракурсов нет —
    // она плоская.
    const panel = document.getElementById('photo-panel');
    if (studioFoot && panel) studioFoot.hidden = mode === 'scene' || mode === 'unwrap';
    card?.classList.toggle('is-photo', Boolean(panel) && mode === 'scene');
  };
  state.subscribe(['tab'], render);
  render(state.get());

  // Стакан не выбран — на сцене только приглашение выбрать его: вкладки,
  // ракурсы, фон и кнопки вида ещё не к чему применить (место под ними
  // сохраняется — карточка не прыгает, когда стакан появится).
  const renderEmpty = ({ modelId }) => card?.classList.toggle('is-empty', !modelId);
  state.subscribe(['modelId'], renderEmpty);
  renderEmpty(state.get());
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

// Развёртка (§16) и её панель: зум, «по размеру», полный экран, скачать.
function initUnwrap(actions) {
  const root = document.getElementById('unwrap');
  if (!root) return null;
  const view = new UnwrapView(root);
  const label = document.getElementById('unwrap-zoom');
  const byId = (id) => document.getElementById(id);

  view.onChange = () => {
    if (!label) return;
    const percent = view.nativePercent;
    label.textContent = percent == null ? '—' : `${Math.round(percent)}%`;
  };
  byId('unwrap-zoom-in')?.addEventListener('click', () => view.zoomBy(1.5));
  byId('unwrap-zoom-out')?.addEventListener('click', () => view.zoomBy(1 / 1.5));
  byId('unwrap-fit')?.addEventListener('click', () => view.reset());
  byId('unwrap-fullscreen')?.addEventListener('click', () => actions.toggleFullscreen());
  byId('unwrap-download')?.addEventListener('click', () => actions.downloadUnwrap(view));
  // Кнопки панели не должны начинать перетаскивание развёртки.
  root.querySelector('.unwrap-bar')?.addEventListener('pointerdown', (event) => event.stopPropagation());
  root.querySelector('.unwrap-bar')?.addEventListener('dblclick', (event) => event.stopPropagation());
  return view;
}

// Подсказка «как управлять» — модальное окно: Escape и щелчок по затемнению
// закрывают, фокус возвращается на кнопку, которой окно открыли.
function initHelp() {
  const button = document.getElementById('info-btn');
  const dialog = document.getElementById('help-popover');
  const backdrop = document.getElementById('help-backdrop');
  const closeBtn = document.getElementById('help-close');
  if (!button || !dialog) return;

  let opener = null;
  let open = false;
  const show = () => {
    opener = document.activeElement;
    open = true;
    showLayer(backdrop);
    showLayer(dialog);
    closeBtn?.focus();
  };
  const close = () => {
    if (!open) return;
    open = false;
    hideLayer(dialog);
    hideLayer(backdrop);
    opener?.focus?.();
  };

  button.addEventListener('click', show);
  closeBtn?.addEventListener('click', close);
  backdrop?.addEventListener('click', close);
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') close();
  });
}
