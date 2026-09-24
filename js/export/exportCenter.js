// Окно «Экспорт» Design Mode (§20): изображение, 4 ракурса, 360° — в одном
// окне. Разметку строит сам модуль: пока окно не открывали, в странице его нет.

import { ANGLE_SIZE, ANGLE_VIEWS, IMAGE_SIZES, createExporter } from './exporter.js';

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

// Сегментированный выбор: [{ value, label }] → { node, value }.
function segmented(name, options, initial, onChange) {
  const node = el('div', { class: 'segmented', role: 'radiogroup', 'aria-label': name });
  const control = { node, value: initial };
  const buttons = options.map(({ value, label }) => {
    const button = el('button', { type: 'button', role: 'radio', class: 'segmented__item', text: label });
    button.dataset.value = value;
    button.addEventListener('click', () => {
      if (button.disabled) return;
      control.value = value;
      render();
      onChange?.(value);
    });
    node.append(button);
    return button;
  });
  const render = () => {
    for (const button of buttons) button.setAttribute('aria-checked', String(button.dataset.value === control.value));
  };
  control.set = (value) => {
    control.value = value;
    render();
  };
  control.disable = (value, disabled) => {
    const button = buttons.find((b) => b.dataset.value === value);
    if (button) button.disabled = disabled;
  };
  render();
  return control;
}

export function createExportCenter(app) {
  const { viewer } = app;
  const exporter = createExporter(app);
  let opener = null;

  // ── разметка ───────────────────────────────────────────────────────────
  const backdrop = el('div', { class: 'dialog-backdrop', hidden: '' });
  const close = el('button', { class: 'icon-btn', type: 'button', 'aria-label': 'Закрыть' });
  close.innerHTML = '<svg class="icon" aria-hidden="true"><use href="assets/icons/sprite.svg#close" /></svg>';
  const tabs = segmented('Что выгрузить', [
    { value: 'image', label: 'Изображение' },
    { value: 'angles', label: '4 ракурса' },
    { value: 'turn', label: '360°' },
  ], 'image', () => renderTab());
  tabs.node.classList.add('segmented--tabs');

  // Изображение
  const format = segmented('Формат', [{ value: 'png', label: 'PNG' }, { value: 'jpg', label: 'JPG' }], 'png');
  const size = segmented(
    'Размер',
    Object.entries(IMAGE_SIZES).map(([value, { label }]) => ({ value, label })),
    'square',
    () => refreshPreview(),
  );
  const preview = el('img', { class: 'export-preview__img', alt: 'Превью кадра' });
  const imageNote = el('p', { class: 'export-note' });
  const imageGo = el('button', { class: 'btn btn--accent btn--block', type: 'button', text: 'Скачать изображение' });
  const imagePanel = el(
    'div',
    { class: 'export-panel' },
    el('div', { class: 'export-grid' },
      el('div', { class: 'export-fields' },
        el('p', { class: 'field-label', text: 'Формат' }), format.node,
        el('p', { class: 'field-label', text: 'Размер' }), size.node,
        imageNote),
      el('div', { class: 'export-preview' }, preview)),
    imageGo,
  );

  // 4 ракурса
  const thumbs = el('div', { class: 'angle-thumbs' });
  const angleImages = ANGLE_VIEWS.map((view) => {
    const img = el('img', { alt: VIEW_LABELS[view] });
    thumbs.append(el('figure', {}, img, el('figcaption', { text: VIEW_LABELS[view] })));
    return img;
  });
  const anglesGo = el('button', { class: 'btn btn--accent btn--block', type: 'button', text: 'Скачать ZIP' });
  const anglesPanel = el('div', { class: 'export-panel', hidden: '' },
    thumbs,
    el('p', { class: 'export-note', text: `4 PNG ${ANGLE_SIZE} × ${ANGLE_SIZE}: одна дистанция, фон и свет. Имена — модель_материал_ракурс.png.` }),
    anglesGo);

  // 360°
  const photos = el('input', { type: 'checkbox', id: 'export-photos' });
  const { fps, duration, photoStep } = viewer.config.turnExport;
  const turnGo = el('button', { class: 'btn btn--accent btn--block', type: 'button', text: 'Записать оборот' });
  const turnPanel = el('div', { class: 'export-panel', hidden: '' },
    el('p', { class: 'export-note', text: `Стакан сделает полный круг: ${duration} с, ${fps} кадр/с — ${fps * duration} кадров. Пока идёт запись, вкладку лучше не переключать.` }),
    el('label', { class: 'export-option', for: 'export-photos' }, photos,
      el('span', {}, `Плюс фото каждые ${photoStep}°`, el('small', { text: 'Ролик и кадры придут одним ZIP' }))),
    turnGo);

  // Прогресс — общий: операция одна за раз.
  const bar = el('div', { class: 'progress__bar' });
  const progressText = el('span', { class: 'progress__text' });
  const progress = el('div', { class: 'progress', hidden: '', role: 'progressbar', 'aria-valuemin': '0' },
    el('div', { class: 'progress__track' }, bar), progressText);

  const dialog = el('div', { class: 'dialog export-dialog', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'export-title', hidden: '' },
    el('div', { class: 'dialog__head' }, el('p', { class: 'dialog__title', id: 'export-title', text: 'Экспорт' }), close),
    tabs.node, imagePanel, anglesPanel, turnPanel, progress);
  document.body.append(backdrop, dialog);

  // ── поведение ──────────────────────────────────────────────────────────
  const panels = { image: imagePanel, angles: anglesPanel, turn: turnPanel };
  const goButtons = [imageGo, anglesGo, turnGo];

  function renderTab() {
    for (const [key, panel] of Object.entries(panels)) panel.hidden = key !== tabs.value;
    if (tabs.value === 'image') refreshPreview();
    if (tabs.value === 'angles') refreshAngles();
  }

  // Превью рисуется тем же конвейером, маленьким кадром той же формы.
  function refreshPreview() {
    const photo = Boolean(viewer.photo);
    for (const value of ['hd', 'square']) size.disable(value, photo);
    if (photo && size.value !== 'current') size.set('current');
    const canvas = viewer.renderer.domElement;
    const { width, height } = IMAGE_SIZES[size.value].width ? IMAGE_SIZES[size.value] : canvas;
    const scale = 360 / Math.max(width, height);
    preview.src = exporter.thumbnail({ width: Math.round(width * scale), height: Math.round(height * scale) }) ?? '';
    imageNote.textContent = photo
      ? 'В фото-сцене кадр сохраняет формат снимка.'
      : `${width} × ${height} px, без интерфейса. Цвет — как на экране.`;
  }

  function refreshAngles() {
    const photo = Boolean(viewer.photo);
    anglesGo.disabled = photo || exporter.busy;
    ANGLE_VIEWS.forEach((view, index) => {
      angleImages[index].src = photo ? '' : exporter.thumbnail({ width: 240, height: 240, view }) ?? '';
    });
    if (photo) anglesGo.textContent = 'Ракурсы — во вкладке 3D';
    else anglesGo.textContent = 'Скачать ZIP';
  }

  exporter.on((event) => {
    if (event.type === 'busy') {
      for (const button of goButtons) button.disabled = event.busy;
      tabs.node.classList.toggle('is-locked', event.busy);
      progress.hidden = !event.busy;
      if (!event.busy && tabs.value === 'angles') refreshAngles();
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

  imageGo.addEventListener('click', () => exporter.image({ format: format.value, size: size.value }));
  anglesGo.addEventListener('click', () => exporter.angles());
  turnGo.addEventListener('click', () => exporter.turn({ photos: photos.checked }));

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
    open(from) {
      opener = from ?? document.activeElement;
      dialog.hidden = false;
      backdrop.hidden = false;
      renderTab();
      close.focus();
    },
    get isOpen() {
      return !dialog.hidden;
    },
  };
}

