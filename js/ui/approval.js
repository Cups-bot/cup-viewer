// Интерактив «страницы согласования»: режимы просмотра, поворотный круг,
// согласование с чек-листом, форма правок и подсказка по управлению.
// Логики рендера не касается — только страница вокруг вьювера.

import { UnwrapView } from './unwrap.js';

// Тосты берём у вьювера, если он уже поднялся.
function toast(message, type = 'success') {
  window.cupViewer?.ui?.showToast?.(message, type);
}

// Вьювер создаётся в js/main.js; ждём, пока он появится в window.
function whenViewerReady(callback, attempts = 120) {
  if (window.cupViewer) return callback(window.cupViewer);
  if (attempts <= 0) return undefined;
  return requestAnimationFrame(() => whenViewerReady(callback, attempts - 1));
}

// Переключение режимов сцены: 3D и развёртка живут в одном контейнере, поэтому
// показываем нужный слой и прячем лишние элементы управления.
function initTabs() {
  const tabs = Array.from(document.querySelectorAll('.stage-tab'));
  const unwrapEl = document.getElementById('unwrap');
  const controls = document.querySelector('.stage-controls');
  const swatches = document.querySelector('.stage-swatches');

  const show = (mode) => {
    if (unwrapEl) unwrapEl.hidden = mode !== 'unwrap';
    // В развёртке вращать и менять фон нечего.
    if (controls) controls.hidden = mode === 'unwrap';
    if (swatches) swatches.hidden = mode === 'unwrap';
    // Автоповорот в фоне только жрёт кадры, пока смотрят картинку.
    const viewer = window.cupViewer;
    if (viewer) viewer.setManualRotate(mode !== '3d');
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const mode = tab.dataset.tab;
      // Нереализованный режим не должен «съедать» текущую вкладку.
      if (mode === 'scene') {
        toast('Этот режим появится позже', 'error');
        return;
      }

      tabs.forEach((t) => {
        const active = t === tab;
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-selected', String(active));
      });
      show(mode);
    });
  });
}

// Просмотр развёртки. Картинку берём из данных заказа — они могут прийти позже
// самого интерфейса, поэтому слушаем событие загрузки.
function initUnwrap() {
  const root = document.getElementById('unwrap');
  if (!root) return;

  const view = new UnwrapView(root);
  window.cupUnwrap = view;

  const apply = (order) => view.setSource(order?.texture);
  if (window.cupOrder) apply(window.cupOrder);
  window.addEventListener('cup:order', (event) => apply(event.detail));
}

// Поворотный круг живёт в сцене (js/core/turntable.js) — здесь только показ по
// наведению, закрепление кнопкой и сброс вида двойным кликом.
function initStage() {
  const stage = document.getElementById('stage');
  const button = document.getElementById('turntable-btn');
  if (!stage) return;

  whenViewerReady((viewer) => {
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

// Согласование в два шага: первый клик раскрывает чек-лист, второй —
// подтверждает. Незакрытые пункты не дают отправить макет в печать.
function initApproveFlow() {
  const approveBtn = document.getElementById('approve-btn');
  const checklist = document.getElementById('checklist');
  const chip = document.getElementById('status-chip');
  if (!approveBtn || !checklist) return;

  let confirming = false;

  // Подписи меняем по частям: у кнопки две — полная и короткая для телефона.
  const setLabel = (full, short) => {
    const fullEl = approveBtn.querySelector('.cta__full');
    const shortEl = approveBtn.querySelector('.cta__short');
    if (fullEl) fullEl.textContent = full;
    if (shortEl) shortEl.textContent = short;
    if (!fullEl && !shortEl) approveBtn.textContent = full;
  };

  approveBtn.addEventListener('click', () => {
    if (!confirming) {
      confirming = true;
      checklist.hidden = false;
      setLabel('Подтвердить и отправить в печать', 'Подтвердить');
      return;
    }

    const boxes = Array.from(checklist.querySelectorAll('input[type="checkbox"]'));
    if (!boxes.every((box) => box.checked)) {
      toast('Снятая галочка — значит, нужны правки', 'error');
      return;
    }

    if (chip) {
      chip.classList.add('is-done');
      const text = chip.querySelector('.status-chip__text');
      if (text) text.textContent = 'Согласовано — макет отправлен в печать';
    }
    checklist.hidden = true;
    approveBtn.disabled = true;
    setLabel('Согласовано ✓', 'Согласовано ✓');
    document.getElementById('edits-btn')?.setAttribute('disabled', '');
    toast('Заказ согласован и отправлен в печать');
  });
}

// Форма правок: подменяет собой блок действий, «Отмена» возвращает обратно.
function initEditsFlow() {
  const actions = document.getElementById('approve-actions');
  const form = document.getElementById('edits-form');
  const openBtn = document.getElementById('edits-btn');
  const cancelBtn = document.getElementById('edits-cancel');
  const input = document.getElementById('edits-text');
  if (!actions || !form) return;

  const close = () => {
    form.hidden = true;
    actions.hidden = false;
  };

  openBtn?.addEventListener('click', () => {
    actions.hidden = true;
    form.hidden = false;
    input?.focus();
  });

  cancelBtn?.addEventListener('click', close);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!input?.value.trim()) {
      toast('Напишите, что поправить', 'error');
      input?.focus();
      return;
    }
    close();
    if (input) input.value = '';
    toast('Правки отправлены менеджеру');
  });
}

// Ссылка на заказ в буфер обмена.
function initShare() {
  document.getElementById('share-btn')?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast('Ссылка скопирована');
    } catch {
      toast('Не удалось скопировать ссылку', 'error');
    }
  });
}

function init() {
  initTabs();
  initUnwrap();
  initStage();
  initApproveFlow();
  initEditsFlow();
  initShare();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
