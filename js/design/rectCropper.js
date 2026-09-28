// Окно «Разместить рисунок» (владелец, 2026-09-28): картинка не в пропорциях
// прямоугольника SIZE — клиент сам двигает и масштабирует её в рамке, а не
// получает растянутый рисунок. Поверх — направляющие SIZE, как в самом файле:
// видимая зона, линия крышки, отступ снизу, центральные линии.
//
// placement — где картинка в прямоугольнике, мм от его левого верхнего угла:
// { cx, cy, w, rectMm } — центр, ширина (высота — по пропорции картинки) и
// размер прямоугольника, для которого это посчитано.
//
// Модуль грузится по требованию (§50): окно строится при первом открытии.

import { hideLayer, showLayer } from '../ui/motion.js';
import { PRINT_DPI, dpiOf } from './fileType.js';

// Поле вокруг рамки — доля её ширины с каждой стороны: видно, что обрезано.
const MARGIN = 0.07;
const ZOOM_MIN = 0.1;
const ZOOM_MAX = 8;
// Подписи направляющих из каталога (textureMapping.rect.guides[].id).
const GUIDE_LABELS = Object.freeze({
  visible: 'видимая зона',
  lid: 'линия крышки',
  safe: 'ниже — без важного',
  centre: 'центральные линии',
});

// Вписать (fit) — картинка целиком в рамке; заполнить (fill) — рамка целиком
// под картинкой. По центру рамки.
export function fitPlacement(aspect, rect, how = 'fill') {
  const [rw, rh] = rect.sizeMm;
  const w = how === 'fill' ? Math.max(rw, rh * aspect) : Math.min(rw, rh * aspect);
  return { cx: rw / 2, cy: rh / 2, w, rectMm: [rw, rh] };
}

let ui = null;

function build() {
  const backdrop = Object.assign(document.createElement('div'), { className: 'dialog-backdrop', hidden: true });
  const dialog = document.createElement('div');
  dialog.className = 'dialog crop-dialog';
  dialog.hidden = true;
  dialog.setAttribute('role', 'dialog');
  dialog.setAttribute('aria-modal', 'true');
  dialog.setAttribute('aria-labelledby', 'crop-title');
  dialog.innerHTML = `
    <div class="dialog__head">
      <div>
        <p class="dialog__title" id="crop-title">Разместить рисунок в прямоугольнике</p>
        <p class="dialog__sub">Тяните картинку, масштаб — колесом, щипком или ползунком. Что за рамкой — не печатается.</p>
      </div>
      <button class="icon-btn" type="button" data-act="cancel" aria-label="Закрыть">
        <svg class="icon" aria-hidden="true"><use href="assets/icons/sprite.svg#close" /></svg>
      </button>
    </div>
    <canvas class="crop-dialog__stage" tabindex="0" aria-label="Рисунок в прямоугольнике: стрелки — сдвиг, плюс и минус — масштаб"></canvas>
    <ul class="crop-dialog__legend"></ul>
    <div class="crop-dialog__tools">
      <div class="segmented crop-dialog__fit" role="group" aria-label="Положение">
        <button class="segmented__item" type="button" data-act="fit">Вписать</button>
        <button class="segmented__item" type="button" data-act="fill">Заполнить</button>
        <button class="segmented__item" type="button" data-act="centre">По центру</button>
      </div>
      <label class="crop-dialog__zoom">
        <span>Масштаб</span>
        <input type="range" min="10" max="400" step="1" value="100" />
      </label>
      <span class="crop-dialog__dpi" aria-live="polite"></span>
    </div>
    <div class="crop-dialog__foot">
      <button class="btn btn--ghost" type="button" data-act="cancel">Отмена</button>
      <button class="btn btn--accent" type="button" data-act="done">Готово</button>
    </div>`;
  document.body.append(backdrop, dialog);
  return {
    backdrop,
    dialog,
    stage: dialog.querySelector('.crop-dialog__stage'),
    legend: dialog.querySelector('.crop-dialog__legend'),
    zoom: dialog.querySelector('.crop-dialog__zoom input'),
    dpi: dialog.querySelector('.crop-dialog__dpi'),
  };
}

// image — ImageBitmap или canvas; width/height — его пиксели; rect — из
// каталога (textureMapping.rect). Возвращает placement или null (отмена).
export function openCropper({ image, width, height, rect, placement }) {
  ui ??= build();
  const { backdrop, dialog, stage, zoom, dpi, legend } = ui;
  const [rw, rh] = rect.sizeMm;
  // Цвет — через CSSOM: атрибут style в разметке запрещает CSP страницы.
  legend.replaceChildren(...(rect.guides ?? []).filter((g) => GUIDE_LABELS[g.id]).map((g) => {
    const mark = document.createElement('i');
    mark.style.setProperty('--c', g.color);
    const item = document.createElement('li');
    item.append(mark, GUIDE_LABELS[g.id]);
    return item;
  }));
  const aspect = width / height;
  const fill = fitPlacement(aspect, rect, 'fill');
  let p = { ...(placement ?? fill), rectMm: [rw, rh] };
  const sw = rw * (1 + 2 * MARGIN);
  const sh = rh + rw * 2 * MARGIN;
  const g = stage.getContext('2d');
  let k = 1;

  const size = () => {
    const cssW = stage.clientWidth || 700;
    const ratio = window.devicePixelRatio || 1;
    stage.style.height = `${(cssW * sh) / sw}px`;
    stage.width = Math.round(cssW * ratio);
    stage.height = Math.round(((cssW * sh) / sw) * ratio);
    k = stage.width / sw;
    draw();
  };
  // Мм прямоугольника → пиксели холста.
  const X = (mm) => (mm + rw * MARGIN) * k;
  const Y = (mm) => (mm + rw * MARGIN) * k;

  const draw = () => {
    const ph = p.w / aspect;
    g.setTransform(1, 0, 0, 1, 0, 0);
    g.fillStyle = '#d8dbe0';
    g.fillRect(0, 0, stage.width, stage.height);
    // Бумага под рисунком — белая.
    g.fillStyle = '#ffffff';
    g.fillRect(X(0), Y(0), rw * k, rh * k);
    g.imageSmoothingQuality = 'high';
    g.drawImage(image, X(p.cx - p.w / 2), Y(p.cy - ph / 2), p.w * k, ph * k);
    // Всё за рамкой — притушено: это не печатается.
    g.fillStyle = 'rgba(28, 30, 36, 0.55)';
    g.beginPath();
    g.rect(0, 0, stage.width, stage.height);
    g.rect(X(0), Y(rh), rw * k, -rh * k);
    g.fill('evenodd');
    const line = (color, width, dash, path) => {
      g.strokeStyle = color;
      g.lineWidth = width * k;
      g.setLineDash(dash.map((mm) => mm * k));
      g.beginPath();
      path();
      g.stroke();
    };
    const [ax, ay] = rect.atMm;
    for (const guide of rect.guides ?? []) {
      line(guide.color, 0.45, [3, 1.5], () => {
        for (const x of guide.x ?? []) {
          g.moveTo(X(x - ax), Y(0));
          g.lineTo(X(x - ax), Y(rh));
        }
        for (const y of guide.y ?? []) {
          g.moveTo(X(0), Y(y - ay));
          g.lineTo(X(rw), Y(y - ay));
        }
      });
    }
    line('#ed1c24', 0.6, [], () => g.rect(X(0), Y(0), rw * k, rh * k));
    zoom.value = String(Math.round((p.w / fill.w) * 100));
    const perInch = dpiOf(width, p.w);
    const low = perInch < PRINT_DPI;
    dpi.textContent = low ? `≈ ${perInch} dpi — для печати нужно ${PRINT_DPI}, посмотреть можно` : `≈ ${perInch} dpi — годится для печати`;
    dpi.classList.toggle('is-low', low);
  };

  // Масштаб вокруг точки (мм прямоугольника): она остаётся под курсором.
  const scaleAt = (factor, fx, fy) => {
    const w = Math.min(Math.max(p.w * factor, fill.w * ZOOM_MIN), fill.w * ZOOM_MAX);
    const f = w / p.w;
    p = { ...p, w, cx: fx + (p.cx - fx) * f, cy: fy + (p.cy - fy) * f };
    draw();
  };
  const toMm = (event) => {
    const box = stage.getBoundingClientRect();
    const s = stage.width / box.width;
    return [((event.clientX - box.left) * s) / k - rw * MARGIN, ((event.clientY - box.top) * s) / k - rw * MARGIN];
  };

  const pointers = new Map();
  let pinch = null;
  const onDown = (event) => {
    stage.setPointerCapture(event.pointerId);
    pointers.set(event.pointerId, toMm(event));
    if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      pinch = Math.hypot(a[0] - b[0], a[1] - b[1]);
    }
  };
  const onMove = (event) => {
    if (!pointers.has(event.pointerId)) return;
    const prev = pointers.get(event.pointerId);
    const next = toMm(event);
    pointers.set(event.pointerId, next);
    if (pointers.size === 1) {
      p = { ...p, cx: p.cx + next[0] - prev[0], cy: p.cy + next[1] - prev[1] };
      draw();
    } else if (pointers.size === 2 && pinch) {
      const [a, b] = [...pointers.values()];
      const d = Math.hypot(a[0] - b[0], a[1] - b[1]);
      scaleAt(d / pinch, (a[0] + b[0]) / 2, (a[1] + b[1]) / 2);
      pinch = d;
    }
  };
  const onUp = (event) => {
    pointers.delete(event.pointerId);
    if (pointers.size < 2) pinch = null;
  };
  const onWheel = (event) => {
    event.preventDefault();
    const [fx, fy] = toMm(event);
    scaleAt(Math.exp(-event.deltaY * 0.0015), fx, fy);
  };
  const onZoom = () => scaleAt((fill.w * Number(zoom.value)) / 100 / p.w, p.cx, p.cy);

  return new Promise((resolve) => {
    const opener = document.activeElement;
    const observer = new ResizeObserver(size);
    const finish = (result) => {
      observer.disconnect();
      stage.removeEventListener('pointerdown', onDown);
      stage.removeEventListener('pointermove', onMove);
      stage.removeEventListener('pointerup', onUp);
      stage.removeEventListener('pointercancel', onUp);
      stage.removeEventListener('wheel', onWheel);
      zoom.removeEventListener('input', onZoom);
      dialog.removeEventListener('click', onClick);
      backdrop.removeEventListener('click', onCancel);
      window.removeEventListener('keydown', onKey, true);
      hideLayer(dialog);
      hideLayer(backdrop);
      opener?.focus?.();
      resolve(result);
    };
    const onCancel = () => finish(null);
    const onClick = (event) => {
      const act = event.target.closest('[data-act]')?.dataset.act;
      if (act === 'cancel') finish(null);
      else if (act === 'done') finish(p);
      else if (act === 'fit' || act === 'fill') {
        p = fitPlacement(aspect, rect, act);
        draw();
      } else if (act === 'centre') {
        p = { ...p, cx: rw / 2, cy: rh / 2 };
        draw();
      }
    };
    const onKey = (event) => {
      // Окно модальное: горячие клавиши страницы (A, S, F, B…) под ним молчат.
      event.stopPropagation();
      if (event.key === 'Escape') {
        finish(null);
        return;
      }
      if (event.key === 'Enter' && event.target === stage) {
        finish(p);
        return;
      }
      if (event.target !== stage) return;
      const step = event.shiftKey ? 10 : 1;
      const moves = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
      if (moves[event.key]) {
        event.preventDefault();
        p = { ...p, cx: p.cx + moves[event.key][0], cy: p.cy + moves[event.key][1] };
        draw();
      } else if (event.key === '+' || event.key === '=' || event.key === '-') {
        event.preventDefault();
        scaleAt(event.key === '-' ? 1 / 1.05 : 1.05, p.cx, p.cy);
      }
    };
    stage.addEventListener('pointerdown', onDown);
    stage.addEventListener('pointermove', onMove);
    stage.addEventListener('pointerup', onUp);
    stage.addEventListener('pointercancel', onUp);
    stage.addEventListener('wheel', onWheel, { passive: false });
    zoom.addEventListener('input', onZoom);
    dialog.addEventListener('click', onClick);
    backdrop.addEventListener('click', onCancel);
    window.addEventListener('keydown', onKey, true);
    showLayer(backdrop);
    showLayer(dialog);
    observer.observe(stage);
    size();
    stage.focus();
  });
}
