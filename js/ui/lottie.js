// Lottie-анимации интерфейса (assets/lottie/, генератор — scripts/lottie/).
// Разметка: <span data-lottie="имя" data-lottie-play="loop|hover|once">.
//
//   loop  — крутится, пока видна;
//   hover — стоит на кадре покоя (data-lottie-rest, доля длины) и
//           проигрывается при наведении на кнопку (или при play() из кода);
//   once  — один раз при появлении.
//
// Плеер (lottie-web, облегчённая сборка без eval — проходит CSP) грузится
// отдельным чанком после старта страницы: на первый кадр сцены он не влияет.
// При «уменьшить движение» анимация стоит на кадре покоя.

const INK = '#1d1d1f';
const PAPER = '#ffffff';
const cache = new Map();
let player = null;

function loadPlayer() {
  player ??= import('lottie-web/build/player/esm/lottie_light.min.js').then((module) => module.default);
  return player;
}

async function loadData(name) {
  if (!cache.has(name)) {
    cache.set(
      name,
      fetch(`assets/lottie/${name}.json`).then((response) => {
        if (!response.ok) throw new Error(`анимация ${name}: ${response.status}`);
        return response.json();
      }),
    );
  }
  return cache.get(name);
}

const toRgb = (hex) => [1, 3, 5].map((i) => Math.round((parseInt(hex.slice(i, i + 2), 16) / 255) * 1000) / 1000);
const same = (a, b) => a.length >= 3 && Math.abs(a[0] - b[0]) < 0.004 && Math.abs(a[1] - b[1]) < 0.004 && Math.abs(a[2] - b[2]) < 0.004;

// Цвета-метки контура и «бумаги» — под тему страницы.
function recolor(data, map) {
  const walk = (node) => {
    if (Array.isArray(node)) {
      node.forEach(walk);
      return;
    }
    if (!node || typeof node !== 'object') return;
    if ((node.ty === 'fl' || node.ty === 'st') && node.c?.a === 0) {
      for (const [from, to] of map) {
        if (same(node.c.k, from)) node.c.k = [...to, node.c.k[3] ?? 1];
      }
    }
    for (const value of Object.values(node)) if (value && typeof value === 'object') walk(value);
  };
  const copy = structuredClone(data);
  walk(copy);
  return copy;
}

function themeColors() {
  const style = getComputedStyle(document.documentElement);
  const ink = style.getPropertyValue('--ink').trim() || INK;
  const paper = style.getPropertyValue('--surface').trim() || PAPER;
  return [
    [toRgb(INK), toRgb(ink.startsWith('#') ? ink : INK)],
    [toRgb(PAPER), toRgb(paper.startsWith('#') ? paper : PAPER)],
  ];
}

const reducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

class LottieSlot {
  constructor(element) {
    this.element = element;
    this.name = element.dataset.lottie;
    this.mode = element.dataset.lottiePlay ?? 'loop';
    // palette="light" — рисунок стоит на светлой сцене, а не на странице, и
    // тему страницы не повторяет.
    this.palette = element.dataset.lottiePalette ?? 'theme';
    // Кадр покоя — доля длины, где рисунок собран целиком: циклы кончаются
    // исчезновением, и последний кадр пустой.
    this.rest = Number(element.dataset.lottieRest ?? 0.72);
    this.anim = null;
    this.visible = false;
  }

  async mount() {
    const [lottie, data] = await Promise.all([loadPlayer(), loadData(this.name)]);
    const frame = this.anim ? this.anim.currentFrame : null;
    this.anim?.destroy();
    this.element.replaceChildren();
    this.anim = lottie.loadAnimation({
      container: this.element,
      renderer: 'svg',
      loop: this.mode === 'loop',
      autoplay: false,
      animationData: this.palette === 'light' ? data : recolor(data, themeColors()),
      rendererSettings: { preserveAspectRatio: 'xMidYMid meet', progressiveLoad: true },
    });
    this.element.classList.add('is-ready');
    if (reducedMotion() || this.mode === 'hover') {
      this.#toRest();
    } else if (frame != null) {
      this.anim.goToAndPlay(frame, true);
    } else if (this.visible) {
      this.anim.play();
    }
    if (this.mode === 'once' || this.mode === 'hover') {
      this.anim.addEventListener('complete', () => this.#toRest());
    }
  }

  #toRest() {
    this.anim.goToAndStop(Math.round((this.anim.totalFrames - 1) * this.rest), true);
  }

  setVisible(visible) {
    this.visible = visible;
    if (!this.anim || reducedMotion() || this.mode === 'hover') return;
    if (visible) this.anim.play();
    else this.anim.pause();
  }

  play() {
    if (!this.anim || reducedMotion()) return;
    this.anim.goToAndPlay(0, true);
  }
}

const slots = new WeakMap();

// Находит и оживляет все [data-lottie] внутри root. Повторный вызов на тех же
// элементах ничего не делает — можно звать после появления новой разметки.
export function initLottie(root = document) {
  const elements = [...root.querySelectorAll('[data-lottie]')].filter((el) => !slots.has(el));
  if (elements.length === 0) return;

  const observer =
    'IntersectionObserver' in window
      ? new IntersectionObserver((entries) => {
          for (const entry of entries) slots.get(entry.target)?.setVisible(entry.isIntersecting);
        })
      : null;

  for (const element of elements) {
    const slot = new LottieSlot(element);
    slots.set(element, slot);
    observer?.observe(element);
    if (!observer) slot.visible = true;
    // Наведение на кнопку, в которой живёт анимация, — повтор с начала.
    if (slot.mode === 'hover') {
      const host = element.closest('button, a, label') ?? element;
      host.addEventListener('pointerenter', () => slot.play());
      host.addEventListener('focus', () => slot.play());
    }
    const start = () => slot.mount().catch((error) => console.warn('Анимация не загрузилась:', error.message));
    // Плеер — после первой отрисовки страницы: сцена важнее украшений.
    // eager — сразу: экран загрузки клиента живёт всего пару секунд.
    if ('lottieEager' in element.dataset) start();
    else if ('requestIdleCallback' in window) requestIdleCallback(start, { timeout: 1500 });
    else setTimeout(start, 300);
  }
  watchTheme();
}

// Проигрывает анимацию элемента с начала (например, когда выбран вариант).
export function playLottie(element) {
  slots.get(element)?.play();
}

// Смена темы — перерисовать с новыми цветами контура и «бумаги».
let themeWatch = null;
function watchTheme() {
  if (themeWatch) return;
  themeWatch = new MutationObserver(() => {
    for (const element of document.querySelectorAll('[data-lottie].is-ready')) {
      const slot = slots.get(element);
      if (slot?.palette !== 'light') slot?.mount().catch(() => {});
    }
  });
  themeWatch.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
}
