// Движение интерфейса — по принципам Apple (Designing Fluid Interfaces):
// отклик на нажатие, пружины вместо фиксированных кривых, окно раскрывается
// из того места, где по нему нажали, лист телефона тянется пальцем и уходит
// по инерции, любая анимация прерывается и продолжается с текущего места.
//
// Только transform/opacity и отдельные свойства translate/scale: у диалогов
// своё центрирование через transform, и анимация его не трогает. При
// «уменьшить движение» — короткое проявление вместо сдвигов.

// Пружины посчитаны заранее (затухающие колебания, выборка в CSS linear()):
//   SPRING — критическое демпфирование, отклик 0,36 с: без перелёта;
//   SOFT   — демпфирование 0,82, отклик 0,4 с: перелёт ~1 %, для «живых» мест.
const SPRING_CURVE =
  'linear(0, 0.0294, 0.0991, 0.1889, 0.2856, 0.3812, 0.4709, 0.5524, 0.6245, 0.6873, 0.7412, 0.787, 0.8254, 0.8575, 0.8841, 0.906, 0.924, 0.9387, 0.9507, 0.9604, 0.9683, 0.9746, 0.9798, 0.9839, 0.9871, 0.9898, 0.9919, 0.9936, 0.9949, 0.996, 0.9968, 0.9975, 1)';
const SOFT_CURVE =
  'linear(0, 0.0278, 0.0968, 0.1893, 0.2927, 0.3977, 0.4985, 0.5912, 0.6736, 0.7451, 0.8056, 0.8557, 0.8962, 0.9285, 0.9535, 0.9724, 0.9863, 0.9963, 1.003, 1.0073, 1.0098, 1.0109, 1.0111, 1.0106, 1.0097, 1.0087, 1.0075, 1.0064, 1.0053, 1.0043, 1.0034, 1.0026, 1)';

const supportsLinear = typeof CSS !== 'undefined' && CSS.supports?.('animation-timing-function', 'linear(0, 1)');
export const SPRING = { easing: supportsLinear ? SPRING_CURVE : 'cubic-bezier(0.22, 1, 0.36, 1)', duration: 485 };
export const SOFT = { easing: supportsLinear ? SOFT_CURVE : 'cubic-bezier(0.34, 1.3, 0.64, 1)', duration: 515 };
// Уход — короче и с разгоном: закрытие не должно задерживать человека.
const EXIT = { easing: 'cubic-bezier(0.4, 0, 1, 1)', duration: 180 };

export const reducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

// ── Откуда пришло нажатие ───────────────────────────────────────────────
// Окно раскрывается из точки последнего нажатия — пространственная связь
// между кнопкой и тем, что она открыла.
let lastPointer = null;
window.addEventListener(
  'pointerdown',
  (event) => {
    lastPointer = { x: event.clientX, y: event.clientY, time: performance.now() };
  },
  true,
);

function originFor(element) {
  const rect = element.getBoundingClientRect();
  const fresh = lastPointer && performance.now() - lastPointer.time < 1500;
  const x = fresh ? lastPointer.x : rect.left + rect.width / 2;
  const y = fresh ? lastPointer.y : rect.top + rect.height / 2;
  const clamp = (value, max) => Math.max(0, Math.min(max, value));
  return `${clamp(x - rect.left, rect.width)}px ${clamp(y - rect.top, rect.height)}px`;
}

// Лист у нижнего края (узкий экран) — выезжает снизу, а не растёт из точки.
function isSheet(element) {
  const rect = element.getBoundingClientRect();
  return Math.abs(rect.bottom - window.innerHeight) < 2 && rect.width > window.innerWidth * 0.85;
}

// ── Показ и уход слоёв (окна, листы, затемнение) ────────────────────────

const running = new WeakMap();

function stop(element) {
  const animation = running.get(element);
  if (animation) {
    // Прерывание: следующая анимация стартует с того, что сейчас на экране.
    animation.commitStyles?.();
    animation.cancel();
    running.delete(element);
  }
}

// Показывает слой. Затемнение — проявлением, окно — пружиной из точки
// нажатия, лист — снизу.
export function showLayer(element) {
  if (!element) return;
  stop(element);
  element.hidden = false;
  element.style.removeProperty('scale');
  element.style.removeProperty('translate');
  element.style.removeProperty('opacity');
  if (reducedMotion()) {
    running.set(element, element.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 160 }));
    return;
  }
  let animation;
  if (element.classList.contains('dialog-backdrop')) {
    animation = element.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 260, easing: 'ease-out' });
  } else if (isSheet(element)) {
    animation = element.animate([{ translate: '0 100%' }, { translate: '0 0' }], { ...SPRING, duration: 520 });
    enableSheetDrag(element);
  } else {
    element.style.transformOrigin = originFor(element);
    animation = element.animate(
      [
        { opacity: 0, scale: '0.92', filter: 'blur(6px)' },
        { opacity: 1, scale: '1', filter: 'blur(0px)' },
      ],
      SOFT,
    );
  }
  running.set(element, animation);
  animation.finished.then(() => running.get(element) === animation && running.delete(element), () => {});
}

// Убирает слой: анимация ухода, затем hidden. Если слой успели показать
// снова, уход отменяется.
export function hideLayer(element) {
  if (!element || element.hidden) return;
  stop(element);
  if (reducedMotion()) {
    element.hidden = true;
    return;
  }
  let keyframes;
  if (element.classList.contains('dialog-backdrop')) keyframes = [{ opacity: 1 }, { opacity: 0 }];
  else if (isSheet(element)) keyframes = [{ translate: getComputedStyle(element).translate === 'none' ? '0 0' : getComputedStyle(element).translate }, { translate: '0 100%' }];
  else keyframes = [{ opacity: 1, scale: '1' }, { opacity: 0, scale: '0.96' }];
  const animation = element.animate(keyframes, EXIT);
  running.set(element, animation);
  animation.finished.then(
    () => {
      if (running.get(element) !== animation) return;
      running.delete(element);
      element.hidden = true;
      element.style.removeProperty('translate');
    },
    () => {},
  );
}

export const isShown = (element) => Boolean(element) && !element.hidden;

// ── Лист телефона тянется пальцем ───────────────────────────────────────
// Перетаскивание за шапку листа вниз — 1:1 с пальцем, вверх — с
// сопротивлением. При отпускании конечная точка проецируется по скорости
// (как прокрутка): далеко — лист закрывается его же кнопкой, иначе пружиной
// возвращается на место с той скоростью, с какой его отпустили.
const project = (velocity, rate = 0.998) => ((velocity / 1000) * rate) / (1 - rate);
const rubberband = (over, size, k = 0.55) => (over * size * k) / (size + k * Math.abs(over));

function enableSheetDrag(sheet) {
  if (sheet.dataset.sheetDrag) return;
  sheet.dataset.sheetDrag = '1';
  const handle = sheet.querySelector('.dialog__head, .drawer__head') ?? sheet;
  let drag = null;

  handle.addEventListener('pointerdown', (event) => {
    if (!isSheet(sheet) || event.target.closest('button, input, a')) return;
    stop(sheet);
    drag = { id: event.pointerId, start: event.clientY, history: [{ y: event.clientY, t: event.timeStamp }] };
    handle.setPointerCapture(event.pointerId);
  });
  handle.addEventListener('pointermove', (event) => {
    if (!drag || event.pointerId !== drag.id) return;
    const dy = event.clientY - drag.start;
    const offset = dy >= 0 ? dy : rubberband(dy, sheet.offsetHeight);
    sheet.style.translate = `0 ${offset}px`;
    drag.history.push({ y: event.clientY, t: event.timeStamp });
    if (drag.history.length > 5) drag.history.shift();
  });
  const end = (event) => {
    if (!drag || event.pointerId !== drag.id) return;
    const first = drag.history[0];
    const last = drag.history[drag.history.length - 1];
    const velocity = last.t > first.t ? ((last.y - first.y) / (last.t - first.t)) * 1000 : 0;
    const current = Math.max(0, event.clientY - drag.start);
    drag = null;
    const landing = current + project(velocity);
    if (landing > sheet.offsetHeight * 0.4 && velocity >= 0) {
      const close = sheet.querySelector('.dialog__head .icon-btn, .drawer__head .icon-btn, [aria-label="Закрыть"]');
      if (close) {
        close.click();
        return;
      }
    }
    const animation = sheet.animate([{ translate: `0 ${current}px` }, { translate: '0 0' }], SPRING);
    sheet.style.removeProperty('translate');
    running.set(sheet, animation);
  };
  handle.addEventListener('pointerup', end);
  handle.addEventListener('pointercancel', end);
}

// ── Сегменты с бегущей «таблеткой» ──────────────────────────────────────
// Как переключатель iOS: подложка выбранного пункта одна и едет от пункта к
// пункту пружиной, а не гаснет в одном месте и загорается в другом.
const ACTIVE = ':scope > .is-active, :scope > [aria-checked="true"], :scope > [aria-pressed="true"]';

export function initSegments(root = document) {
  const containers = [...root.querySelectorAll('.tabs, .segmented, .theme-toggle')];
  if (root.matches?.('.tabs, .segmented, .theme-toggle')) containers.push(root);
  for (const container of containers) {
    if (container.querySelector(':scope > .seg-thumb')) continue;
    const thumb = document.createElement('span');
    thumb.className = 'seg-thumb';
    thumb.setAttribute('aria-hidden', 'true');
    container.prepend(thumb);
    container.classList.add('has-thumb');
    let placed = false;

    const place = (animate) => {
      const active = container.querySelector(ACTIVE);
      if (!active || active.offsetParent === null) {
        thumb.style.opacity = '0';
        placed = false;
        return;
      }
      const target = {
        x: active.offsetLeft,
        y: active.offsetTop,
        w: active.offsetWidth,
        h: active.offsetHeight,
      };
      const moving = animate && placed && !reducedMotion();
      thumb.style.transition = moving ? '' : 'none';
      thumb.style.opacity = '1';
      thumb.style.width = `${target.w}px`;
      thumb.style.height = `${target.h}px`;
      thumb.style.transform = `translate(${target.x}px, ${target.y}px)`;
      if (!moving) {
        // Первое размещение и смена размеров — без езды.
        void thumb.offsetWidth;
        thumb.style.transition = '';
      }
      placed = true;
    };

    let frame = 0;
    const schedule = (animate) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => place(animate));
    };
    new MutationObserver((records) => {
      const structural = records.some((record) => record.type === 'childList');
      schedule(!structural);
    }).observe(container, { subtree: true, childList: true, attributes: true, attributeFilter: ['class', 'aria-checked', 'aria-pressed'] });
    new ResizeObserver(() => schedule(false)).observe(container);
    schedule(false);
  }
}

// ── Появление списка по очереди ─────────────────────────────────────────
// Каждый следующий элемент — чуть позже: глаз проходит по списку, а не
// получает его разом. Только первые max, чтобы длинный список не ждал.
export function stagger(elements, { max = 14, step = 22, from = 'translateY(10px) scale(0.98)' } = {}) {
  if (reducedMotion()) return;
  [...elements].slice(0, max).forEach((element, index) => {
    element.animate([{ opacity: 0, transform: from }, { opacity: 1, transform: 'none' }], { ...SPRING, delay: index * step, fill: 'backwards' });
  });
}

// FLIP: элементы плавно переезжают на новые места после перестройки.
// before — Map(element → DOMRect), снятая до изменения.
export function flip(before) {
  if (reducedMotion()) return;
  for (const [element, rect] of before) {
    if (element.hidden || element.offsetParent === null) continue;
    const now = element.getBoundingClientRect();
    const dx = rect.left - now.left;
    const dy = rect.top - now.top;
    if (Math.abs(dx) < 1 && Math.abs(dy) < 1) continue;
    element.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'none' }], SPRING);
  }
}

export function snapshot(elements) {
  return new Map([...elements].filter((element) => !element.hidden).map((element) => [element, element.getBoundingClientRect()]));
}

// Смена текста с проявлением — заголовок «перетекает», а не мигает.
export function swapText(element, text) {
  if (!element || element.textContent === text) return;
  element.textContent = text;
  if (reducedMotion()) return;
  element.animate(
    [
      { opacity: 0, filter: 'blur(4px)', transform: 'translateY(4px)' },
      { opacity: 1, filter: 'blur(0px)', transform: 'none' },
    ],
    { ...SPRING, duration: 420 },
  );
}

// Смена темы — светлая раскрывается кругом из кнопки (View Transitions),
// где браузер это умеет; иначе — просто смена.
export function transitionTheme(apply, origin) {
  if (!document.startViewTransition || reducedMotion()) {
    apply();
    return;
  }
  const transition = document.startViewTransition(apply);
  const x = origin?.x ?? window.innerWidth - 60;
  const y = origin?.y ?? 28;
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
  transition.ready
    .then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 560, easing: SPRING.easing, pseudoElement: '::view-transition-new(root)' },
      );
    })
    .catch(() => {});
}
