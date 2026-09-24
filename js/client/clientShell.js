// Оболочка Client Mode (§22–§30, §40–§44). Импортируется только из
// js/entries/view.js; выбора модели, материала и загрузки макета в этом
// бандле нет вовсе.

import { MESSAGES } from '../ui/messages.js';
import { bindMenu } from '../ui/toolbar.js';

// Проверка до загрузки ассетов (§42): без WebGL — экран с объяснением, а не
// чёрный холст.
export function hasWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

export function showError(text) {
  document.getElementById('client-loader')?.classList.add('is-done');
  const box = document.getElementById('client-error');
  const label = document.getElementById('client-error-text');
  if (label) label.textContent = text;
  if (box) box.hidden = false;
}

// Этапы загрузки (§40). Процент — только реальный: нет размера — нет цифры.
export function createLoader() {
  const root = document.getElementById('client-loader');
  const steps = new Map([...root.querySelectorAll('[data-step]')].map((li) => [li.dataset.step, li]));
  let current = null;
  return {
    step(name) {
      for (const [key, li] of steps) {
        const order = [...steps.keys()];
        li.classList.toggle('is-done', order.indexOf(key) < order.indexOf(name));
        li.classList.toggle('is-active', key === name);
        if (key !== name) li.querySelector('.client-loader__pct').textContent = '';
      }
      current = name;
    },
    percent(share) {
      const li = steps.get(current);
      if (!li) return;
      li.querySelector('.client-loader__pct').textContent =
        share == null || !Number.isFinite(share) ? '' : `${Math.round(Math.min(1, share) * 100)}%`;
    },
    done() {
      for (const li of steps.values()) {
        li.classList.remove('is-active');
        li.classList.add('is-done');
      }
      root.classList.add('is-done');
    },
  };
}

// Бренд (§24): логотип, акцент, favicon, <title>.
export function applyBrand(brand, title) {
  if (!brand) return;
  for (const id of ['brand-logo', 'loader-logo']) {
    const img = document.getElementById(id);
    if (!img) continue;
    img.src = brand.logo;
    img.alt = brand.name;
    img.hidden = false;
  }
  document.documentElement.style.setProperty('--accent', brand.accent);
  const favicon = document.getElementById('favicon');
  if (favicon) favicon.href = brand.favicon;
  document.title = title ? `${title} — ${brand.name}` : brand.title;
}

const WALL_LABELS = {
  single: 'Однослойный',
  double: 'Двухслойный',
  embossed: 'С тиснением',
  plastic: 'Литой',
};
const TYPE_LABELS = { paper: 'бумажный', pp: 'полипропилен', pet: 'PET' };
const PRINT_LABELS = { offset: 'Офсет', 'dry-offset': 'Сухой офсет', flexo: 'Флексография' };

// Информация (§25): объём, стакан, материал, печать. Номенклатуры (SKU) нет.
function initInfo({ state, catalog }) {
  const button = document.getElementById('info-toggle');
  const drawer = document.getElementById('info-drawer');
  const spec = document.getElementById('info-spec');
  if (!button || !drawer || !spec) return;
  const { modelId, materialId } = state.get();
  const model = catalog.model(modelId);
  const material = catalog.material(materialId);
  const rows = [
    ['Объём', model && `${model.volumeMl} мл`],
    ['Стакан', model && `${WALL_LABELS[model.wall] ?? ''} ${TYPE_LABELS[model.type] ?? ''}`.trim()],
    ['Материал', material?.name],
    ['Тип печати', model && (PRINT_LABELS[model.printType] ?? model.printType)],
  ];
  spec.replaceChildren(
    ...rows
      .filter(([, value]) => value)
      .map(([label, value]) => {
        const row = document.createElement('div');
        row.className = 'spec__row';
        const dt = document.createElement('dt');
        dt.textContent = label;
        const dd = document.createElement('dd');
        dd.textContent = value;
        row.append(dt, dd);
        return row;
      }),
  );
  const set = (open) => {
    drawer.hidden = !open;
    button.setAttribute('aria-expanded', String(open));
    if (open) document.getElementById('info-close')?.focus();
  };
  button.addEventListener('click', () => set(drawer.hidden));
  document.getElementById('info-close')?.addEventListener('click', () => {
    set(false);
    button.focus();
  });
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !drawer.hidden) set(false);
  });
}

// Автооборот (§23): первое касание, колесо или клавиша камеры — стоп
// навсегда; снова — только кнопкой ↻, после неё правило действует заново.
function initAutoRotate({ state }) {
  const stage = document.getElementById('stage');
  const button = document.getElementById('autorotate-btn');
  const stop = () => {
    if (state.get().autoRotate) state.set({ autoRotate: false });
    disarm();
  };
  const onKey = (event) => {
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', '+', '-'].includes(event.key)) stop();
  };
  const arm = () => {
    stage.addEventListener('pointerdown', stop, { passive: true });
    stage.addEventListener('wheel', stop, { passive: true });
    stage.addEventListener('touchstart', stop, { passive: true });
    window.addEventListener('keydown', onKey);
  };
  const disarm = () => {
    stage.removeEventListener('pointerdown', stop);
    stage.removeEventListener('wheel', stop);
    stage.removeEventListener('touchstart', stop);
    window.removeEventListener('keydown', onKey);
  };
  // Кнопка переключает через общий обработчик панели (toolbar.js); здесь —
  // только повторное взведение «стопа на касание» после включения.
  button?.addEventListener('click', () => {
    if (state.get().autoRotate) arm();
  });
  return { arm };
}

// Скачать (§29): текущий кадр, развёртка, 360°, превью. Модуль экспорта
// грузится при первом открытии меню (§50).
function initDownloads(app) {
  const button = document.getElementById('download-btn');
  const menu = document.getElementById('download-menu');
  const progress = document.getElementById('download-progress');
  if (!button || !menu) return;
  let exporter = null;
  const load = async () => {
    if (exporter) return exporter;
    const { createExporter } = await import('../export/exporter.js');
    exporter ??= createExporter(app);
    exporter.on((event) => {
      if (event.type === 'busy') {
        progress.hidden = !event.busy;
        for (const item of menu.querySelectorAll('[data-download]')) item.disabled = event.busy;
      }
      if (event.type === 'progress') {
        progress.querySelector('.progress__bar').style.width = `${Math.round((event.total ? event.done / event.total : 0) * 100)}%`;
        progress.querySelector('.progress__text').textContent =
          event.total > 1 ? `${event.label} · кадр ${event.done} из ${event.total}` : event.label;
      }
    });
    return exporter;
  };
  bindMenu(button, menu, { onOpen: () => load() });
  for (const item of menu.querySelectorAll('[data-download]')) {
    item.addEventListener('click', async () => {
      const ex = await load();
      const kind = item.dataset.download;
      if (kind === 'current') ex.current();
      if (kind === 'unwrap') ex.unwrap(app.unwrap?.image);
      if (kind === 'turn') ex.turn();
      if (kind === 'preview') ex.preview();
    });
  }
}

const ONBOARDING_KEY = 'cv.onboarding.v1';

// Подсказка жестов (§44) — один раз. localStorage недоступен (приватный
// режим, запрет) — показываем каждый раз и не падаем.
function showOnboarding() {
  let seen = false;
  try {
    seen = localStorage.getItem(ONBOARDING_KEY) === '1';
  } catch {
    seen = false;
  }
  if (seen) return;
  const box = document.getElementById('onboarding');
  const ok = document.getElementById('onboarding-ok');
  if (!box) return;
  box.hidden = false;
  ok?.focus();
  const close = () => {
    box.hidden = true;
    try {
      localStorage.setItem(ONBOARDING_KEY, '1');
    } catch {
      // Сохранить не вышло — покажем и в следующий раз.
    }
  };
  ok?.addEventListener('click', close, { once: true });
  box.addEventListener('click', (event) => event.target === box && close());
}

export function initClient(app, { title }) {
  const brandTitle = document.getElementById('client-title');
  if (brandTitle && title) {
    brandTitle.textContent = title;
    brandTitle.hidden = false;
  }
  initInfo(app);
  initDownloads(app);
  return { autoRotate: initAutoRotate(app), showOnboarding };
}

export { MESSAGES };
