// Интерактив вокруг вьювера: режимы просмотра, фото-сцены, развёртка,
// поворотный круг и подсказка по управлению. Логики рендера не касается.

import { UnwrapView } from './unwrap.js';
import { blankSheetUrl } from '../utils/blankSheet.js';
import { DEFAULT_SCENE_ID, PHOTO_SCENES } from '../data/scenes.js';
import { CONFIG } from '../config.js';
import { getViewer, whenViewer, setUnwrap } from '../appState.js';

// Переключение режимов сцены: 3D и развёртка живут в одном контейнере, поэтому
// показываем нужный слой и прячем лишние элементы управления.
function initTabs() {
  const tabs = Array.from(document.querySelectorAll('.stage-tab'));
  const unwrapEl = document.getElementById('unwrap');
  const controls = document.querySelector('.stage-controls');
  const swatches = document.querySelector('.stage-swatches');
  const scenes = document.getElementById('scene-picker');

  const stage = document.querySelector('.stage');

  const show = (mode) => {
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
    // Автоповорот в фоне только жрёт кадры, пока смотрят картинку.
    getViewer()?.setManualRotate(mode === 'unwrap');
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const mode = tab.dataset.tab;

      tabs.forEach((t) => {
        const active = t === tab;
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-selected', String(active));
      });
      show(mode);

      // Фото-сцена грузится с первым открытием вкладки и дальше остаётся в
      // памяти: возвращаться к ней можно бесплатно.
      const viewer = getViewer();
      if (!viewer) return;
      if (mode === 'scene') openScene(viewer, currentSceneId);
      else viewer.exitPhotoScene();
    });
  });
}

// Какая сцена выбрана. Между открытиями вкладки помним: клиент вернулся к 3D
// и обратно — показываем ту же комнату, а не начинаем сначала.
let currentSceneId = DEFAULT_SCENE_ID;

async function openScene(viewer, id) {
  currentSceneId = id;
  markScene(id);
  await viewer.enterPhotoScene(id);
  // Пока сцена грузилась, клиент мог уйти на другую вкладку: выход тогда
  // уже отработал вхолостую, и сцена встала бы поверх 3D.
  if (!document.querySelector('.stage')?.classList.contains('is-photo')) {
    viewer.exitPhotoScene();
  }
}

function markScene(id) {
  for (const button of document.querySelectorAll('.scene-chip')) {
    const active = button.dataset.scene === id;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  }
}

// Кнопки выбора сцены. Строятся один раз из каталога js/data/scenes.js.
function initPhotoScenes() {
  const box = document.getElementById('scene-picker');
  if (!box) return;

  // Режим выключен настройкой — вкладки нет вовсе: показывать её и отвечать
  // «недоступно» хуже, чем не показывать.
  if (CONFIG.ui.photoScene === false) {
    document.querySelector('.stage-tab[data-tab="scene"]')?.remove();
    box.remove();
    return;
  }

  // Выбирать не из чего — ряда кнопок нет. Сцена при этом работает: она
  // откроется по DEFAULT_SCENE_ID, как только нажмут вкладку.
  if (PHOTO_SCENES.length < 2) {
    box.remove();
    return;
  }

  box.replaceChildren();
  for (const scene of PHOTO_SCENES) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'scene-chip';
    button.dataset.scene = scene.id;
    button.setAttribute('aria-pressed', String(scene.id === currentSceneId));
    button.title = scene.note ?? '';

    const label = document.createElement('span');
    label.className = 'scene-chip__label';
    label.textContent = scene.label;
    button.appendChild(label);

    button.addEventListener('click', () => {
      const viewer = getViewer();
      if (viewer) openScene(viewer, scene.id);
    });
    box.appendChild(button);
  }
  markScene(currentSceneId);
}

// Просмотр развёртки.
function initUnwrap() {
  const root = document.getElementById('unwrap');
  if (!root) return;

  const view = new UnwrapView(root);
  setUnwrap(view);

  // Макета нет — показываем тот же чистый лист, что лежит на модели: пустая
  // вкладка выглядела бы как не загрузившаяся страница.
  view.setSource(blankSheetUrl());
}

// Поворотный круг живёт в сцене (js/core/turntable.js) — здесь только показ по
// наведению, закрепление кнопкой и сброс вида двойным кликом.
function initStage() {
  const stage = document.getElementById('stage');
  const button = document.getElementById('turntable-btn');
  if (!stage) return;

  whenViewer((viewer) => {
    const turntable = viewer.turntable;
    if (!turntable) return;

    // Круг показывается ТОЛЬКО этой кнопкой — по наведению на сцену он больше
    // не появляется. Совсем выключить его можно флагом turntable.enabled
    // в js/config.js, там же radiusScale задаёт его размер.
    button?.addEventListener('click', () => {
      const pinned = turntable.togglePinned();
      button.classList.toggle('is-active', pinned);
      button.setAttribute('aria-pressed', String(pinned));
    });

    stage.addEventListener('dblclick', () => viewer.resetView());
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

  const toggle = () => (popover.hidden ? open() : close());

  button.addEventListener('click', (event) => {
    event.stopPropagation();
    toggle();
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

function init() {
  initTabs();
  initPhotoScenes();
  initUnwrap();
  initStage();
  initHelp();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
