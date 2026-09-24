// Окно «Скачать» (§20): два переключателя — «Фото» и «Видео». Фото — один
// кадр 2048×2048 или 4 ракурса; видео — оборот 360°, по желанию с кадрами
// через каждые 45°. Одно окно для сотрудника и клиента: права проверяет
// exporter. Разметку строит сам модуль — пока окно не открывали, его нет.

import { ANGLE_VIEWS, PHOTO_SIZE, createExporter } from './exporter.js';
import { initLottie, playLottie } from '../ui/lottie.js';

const VIEW_LABELS = { front: 'Спереди', right: 'Справа', back: 'Сзади', left: 'Слева' };

const el = (tag, attrs = {}, ...children) => {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (key === 'class') node.className = value;
    else if (key === 'text') node.textContent = value;
    else node.setAttribute(key, value);
  }
  node.append(...children.filter(Boolean));
  return node;
};

// Значок варианта — Lottie: проигрывается при выборе и наведении.
const icon = (name) => {
  const span = el('span', { class: 'choice__icon', 'aria-hidden': 'true' });
  span.append(el('span', { class: 'choice__anim', 'data-lottie': name, 'data-lottie-play': 'hover' }));
  return span;
};

// Выбор из вариантов-карточек: [{ value, label, hint, icon }] → { node, value, set }.
function choices(name, options, initial, onChange) {
  const node = el('div', { class: 'choices', role: 'radiogroup', 'aria-label': name });
  const control = { node, value: initial };
  const buttons = options.map((option) => {
    const button = el(
      'button',
      { type: 'button', role: 'radio', class: 'choice' },
      option.icon && icon(option.icon),
      el('span', { class: 'choice__text' },
        el('b', { text: option.label }),
        option.hint && el('small', { text: option.hint })),
    );
    button.dataset.value = option.value;
    button.addEventListener('click', () => {
      if (button.disabled) return;
      control.set(option.value);
      const anim = button.querySelector('[data-lottie]');
      if (anim) playLottie(anim);
      onChange?.(option.value);
    });
    node.append(button);
    return button;
  });
  control.set = (value) => {
    control.value = value;
    for (const button of buttons) button.setAttribute('aria-checked', String(button.dataset.value === value));
  };
  control.set(initial);
  return control;
}

export function createExportCenter(app) {
  const { viewer } = app;
  const exporter = createExporter(app);
  const { fps, duration, photoStep } = viewer.config.turnExport;
  let opener = null;

  // ── разметка ───────────────────────────────────────────────────────────
  const backdrop = el('div', { class: 'dialog-backdrop', hidden: '' });
  const close = el('button', { class: 'icon-btn', type: 'button', 'aria-label': 'Закрыть' });
  close.innerHTML = '<svg class="icon" aria-hidden="true"><use href="assets/icons/sprite.svg#close" /></svg>';

  const kind = choices('Что скачать', [
    { value: 'photo', label: 'Фото', hint: `PNG ${PHOTO_SIZE} × ${PHOTO_SIZE}`, icon: 'shot' },
    { value: 'video', label: 'Видео', hint: `Оборот 360°, ${duration} с`, icon: 'turn' },
  ], 'photo', () => render());
  kind.node.classList.add('choices--kind');

  // Фото: один кадр или 4 ракурса.
  const photoMode = el('div', { class: 'segmented', role: 'radiogroup', 'aria-label': 'Сколько кадров' });
  let photoValue = 'single';
  const photoButtons = [
    ['single', 'Один кадр'],
    ['angles', '4 ракурса'],
  ].map(([value, label]) => {
    const button = el('button', { type: 'button', role: 'radio', class: 'segmented__item', text: label });
    button.dataset.value = value;
    button.addEventListener('click', () => {
      photoValue = value;
      render();
    });
    photoMode.append(button);
    return button;
  });
  const single = el('img', { class: 'export-shot', alt: 'Кадр' });
  const thumbs = el('div', { class: 'angle-thumbs' });
  const angleImages = ANGLE_VIEWS.map((view) => {
    const img = el('img', { alt: VIEW_LABELS[view] });
    thumbs.append(el('figure', {}, img, el('figcaption', { text: VIEW_LABELS[view] })));
    return img;
  });
  const photoNote = el('p', { class: 'export-note' });
  const photoPanel = el('div', { class: 'export-panel' }, photoMode, single, thumbs, photoNote);

  // Видео: галочка «плюс фото через 45°».
  const photos = el('input', { type: 'checkbox', id: 'export-photos' });
  const videoPanel = el('div', { class: 'export-panel', hidden: '' },
    el('p', { class: 'export-note', text: `Стакан сделает полный оборот: ${duration} с, ${fps} кадров в секунду. Пока идёт запись, вкладку лучше не переключать.` }),
    el('label', { class: 'export-option', for: 'export-photos' }, photos,
      el('span', {}, `С поворотом на ${photoStep}°`,
        el('small', { text: `Плюс ${Math.round(360 / photoStep)} фото — через каждые ${photoStep}°; всё придёт одним ZIP` }))));

  const go = el('button', { class: 'btn btn--accent btn--block btn--lg', type: 'button' });

  // Прогресс — общий: операция одна за раз.
  const bar = el('div', { class: 'progress__bar' });
  const progressText = el('span', { class: 'progress__text' });
  const progress = el('div', { class: 'progress', hidden: '', role: 'progressbar', 'aria-valuemin': '0' },
    el('div', { class: 'progress__track' }, bar), progressText);

  const dialog = el('div', { class: 'dialog export-dialog', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'export-title', hidden: '' },
    el('div', { class: 'dialog__head' }, el('p', { class: 'dialog__title', id: 'export-title', text: 'Скачать' }), close),
    kind.node, photoPanel, videoPanel, progress, go);
  document.body.append(backdrop, dialog);
  initLottie(dialog);

  // ── поведение ──────────────────────────────────────────────────────────
  function render() {
    const photo = kind.value === 'photo';
    photoPanel.hidden = !photo;
    videoPanel.hidden = photo;
    for (const button of photoButtons) button.setAttribute('aria-checked', String(button.dataset.value === photoValue));
    if (photo) {
      const angles = photoValue === 'angles';
      single.hidden = angles;
      thumbs.hidden = !angles;
      // Превью рисуется тем же конвейером, маленьким кадром той же формы.
      if (angles) {
        ANGLE_VIEWS.forEach((view, index) => {
          angleImages[index].src = exporter.thumbnail({ width: 240, height: 240, view }) ?? '';
        });
        photoNote.textContent = `4 PNG ${PHOTO_SIZE} × ${PHOTO_SIZE} одним ZIP. Поворачивается стакан — свет и тень у всех кадров одни.`;
        go.textContent = 'Скачать 4 ракурса';
      } else {
        single.src = exporter.thumbnail({ width: 480, height: 480 }) ?? '';
        photoNote.textContent = `PNG ${PHOTO_SIZE} × ${PHOTO_SIZE}, как на экране, без интерфейса.`;
        go.textContent = 'Скачать фото';
      }
    } else {
      go.textContent = 'Записать видео';
    }
  }

  exporter.on((event) => {
    if (event.type === 'busy') {
      go.disabled = event.busy;
      kind.node.classList.toggle('is-locked', event.busy);
      progress.hidden = !event.busy;
      return;
    }
    if (event.type === 'progress') {
      const share = event.total ? event.done / event.total : 0;
      bar.style.width = `${Math.round(share * 100)}%`;
      progress.setAttribute('aria-valuenow', String(event.done));
      progress.setAttribute('aria-valuemax', String(event.total));
      progressText.textContent = event.total > 1 ? `${event.label} · кадр ${event.done} из ${event.total}` : event.label;
    }
  });

  go.addEventListener('click', () => {
    if (kind.value === 'video') exporter.turn({ photos: photos.checked });
    else if (photoValue === 'angles') exporter.angles();
    else exporter.photo();
  });

  const hide = () => {
    // Запись оборота идёт по часам: закрыть окно можно, отменить — нет.
    dialog.hidden = true;
    backdrop.hidden = true;
    opener?.focus?.();
  };
  close.addEventListener('click', hide);
  backdrop.addEventListener('click', hide);
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !dialog.hidden) hide();
  });

  return {
    exporter,
    // tab: 'photo' | 'video' — с чего открыть.
    open(from, tab) {
      opener = from ?? document.activeElement;
      if (tab && !exporter.busy) kind.set(tab);
      dialog.hidden = false;
      backdrop.hidden = false;
      render();
      close.focus();
    },
    get isOpen() {
      return !dialog.hidden;
    },
  };
}
