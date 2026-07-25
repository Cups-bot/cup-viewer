// Интерактив «страницы согласования»: режимы просмотра, поворотный круг,
// согласование с чек-листом, форма правок и подсказка по управлению.
// Логики рендера не касается — только страница вокруг вьювера.

import { Turntable } from './turntable.js';

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

function initTabs() {
  const tabs = Array.from(document.querySelectorAll('.stage-tab'));
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => {
        const active = t === tab;
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-selected', String(active));
      });
      if (tab.textContent.trim() !== '3D-визуализация') {
        toast('Этот режим появится позже', 'error');
      }
    });
  });
}

// Поворотный круг под моделью + двойной клик по сцене возвращает исходный вид.
function initStage() {
  const stage = document.getElementById('stage');
  const button = document.getElementById('turntable-btn');
  if (!stage) return;

  whenViewerReady((viewer) => {
    const turntable = new Turntable({ stage, viewer });
    window.cupTurntable = turntable;

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

  approveBtn.addEventListener('click', () => {
    if (!confirming) {
      confirming = true;
      checklist.hidden = false;
      approveBtn.textContent = 'Подтвердить и отправить в печать';
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
    approveBtn.textContent = 'Согласовано ✓';
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
