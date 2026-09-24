// Оболочка Client Mode (§22–§30, §40–§44). Импортируется только из
// js/entries/view.js; выбора модели, материала и загрузки макета в этом
// бандле нет вовсе.

import { MESSAGES } from '../ui/messages.js';

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
  if (favicon) {
    // Иконка бренда бывает и PNG: заявленный image/svg+xml браузер бы отверг.
    favicon.removeAttribute('type');
    favicon.href = brand.favicon;
  }
  document.title = title ? `${title} — ${brand.name}` : brand.title;
}

const KIND_LABELS = {
  single: 'Однослойный бумажный',
  double: 'Двухслойный бумажный',
  embossed: 'Эмбо, двухслойный с рельефом',
  plastic: 'Пластиковый, матовый',
};
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
    ['Стакан', model && KIND_LABELS[model.wall]],
    ['Размер', model && `Ø${Math.round(model.size.topMm)} × ${Math.round(model.size.heightMm)} мм`],
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

// Скачать (§29): то же окно «Фото / Видео», что у сотрудника. Модуль окна и
// экспорта грузится при первом нажатии (§50).
function initDownloads(app) {
  const button = document.getElementById('download-btn');
  if (!button) return;
  let center = null;
  button.addEventListener('click', async () => {
    if (!center) {
      const { createExportCenter } = await import('../export/exportCenter.js');
      center ??= createExportCenter(app);
    }
    center.open(button, 'photo');
  });
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
