// Оболочка Design Mode поверх общего старта: выбор стакана и материала,
// загрузка макета, пустое состояние, сессия. Импортируется только из
// js/entries/design.js — в клиентский бандл этот код не попадает (§37).

import { CONFIG } from '../config.js';
import { artScale, drawCup } from './cupArt.js';
import { swapText } from '../ui/motion.js';
import { saveSession } from './session.js';
import { DesignError, prepareDesign } from './prepareDesign.js';
import { aspectMismatch } from './fileType.js';
import { MESSAGES } from '../ui/messages.js';
import { initPhotoPanel } from './photoPanel.js';
import { initAccount } from '../account/account.js';

// Подписи полей из каталога. Сами строки UI живут здесь, а не в catalog/.
const KIND_LABELS = Object.freeze({
  single: 'Однослойный бумажный',
  double: 'Двухслойный бумажный',
  embossed: 'Эмбо, двухслойный с рельефом',
  plastic: 'Пластиковый BM',
  pet: 'Прозрачный PET',
});

const kindOf = (model) => KIND_LABELS[model.wall] ?? '';

export function initDesign({ state, mode, catalog, viewer, feedback }) {
  const actions = {
    // Макет на новую модель не переносится: у каждого стакана своя развёртка,
    // и та же картинка на соседней модели съезжает, растёт или обрезается.
    selectModel(modelId) {
      if (!mode.check('changeModel', 'выбрать стакан')) return;
      if (modelId === state.get().modelId) return;
      state.set({ modelId, design: null });
    },
    selectMaterial(materialId) {
      if (!mode.check('changeMaterial', 'выбрать материал')) return;
      state.set({ materialId });
    },
  };

  const picker = initModelPicker({ state, catalog, actions });
  // Кабинет: вход, токены, рендер, «Мои рендеры» (без сервера CupViewer — скрыт).
  const account = initAccount({ catalog, feedback });
  initMaterialSwitch({ state, catalog, actions });
  initUpload({ state, mode, catalog, viewer, feedback });
  initEmptyState({ state, picker });
  initPageHead({ state, catalog });
  const exportCenter = initExport({ state, mode, viewer, feedback });
  initPhotoPanel({ state, viewer, catalog, mode, picker, feedback, account, cupPhoto: railPhoto, describe: (m) => `${m.name} · ${kindOf(m)}` });
  initActionBar({ exportCenter });

  // Кнопки, которым нужна модель в сцене.
  const needsModel = [
    ...['texture-btn', 'export-btn'].map((id) => document.getElementById(id)),
    ...document.querySelectorAll('[data-mobile-nav="design"], [data-mobile-nav="export"]'),
  ];
  const renderNeeds = ({ modelId }) => {
    for (const button of needsModel) if (button) button.disabled = !modelId;
  };
  state.subscribe(['modelId'], renderNeeds);
  renderNeeds(state.get());

  // Сессия (§11): модель, материал и фон. Сам макет не сохраняется.
  state.subscribe(['modelId', 'materialId', 'backgroundId'], (s) => saveSession(s));
  return actions;
}

// Фото стакана в панели — тот же снимок, что в пикере (assets/thumbs/).
// Снимка нет — силуэт во всю высоту поля.
function railPhoto(model) {
  return ['light', 'dark'].map((theme) => {
    const img = document.createElement('img');
    img.className = `cup-current__img cup-current__img--${theme}`;
    img.alt = '';
    img.src = `assets/thumbs/${theme}/${model.id}.webp`;
    img.addEventListener('error', () => img.replaceWith(drawCup(model, artScale([model]), { idSuffix: `-rail-${theme}` })), { once: true });
    return img;
  });
}

// Model Picker (§10) грузится по требованию (§50): модуль и его разметка
// появляются при первом открытии окна.
function initModelPicker({ state, catalog, actions }) {
  const button = document.getElementById('cup-btn');
  const dialog = document.getElementById('cup-dialog');
  const name = document.getElementById('cup-name');
  const meta = document.getElementById('cup-meta');
  const art = document.getElementById('cup-art');
  const barName = document.getElementById('action-cup-name');
  if (!button || !dialog) return null;

  let picker = null;
  const ensure = async () => {
    if (picker) return picker;
    const { CupPicker } = await import('./modelPicker.js');
    picker ??= new CupPicker(dialog, {
      models: catalog.models,
      backdrop: document.getElementById('cup-backdrop'),
      onSelect: (id) => actions.selectModel(id),
      onToggle: (open) => button.setAttribute('aria-expanded', String(open)),
    });
    picker.setActive(state.get().modelId);
    return picker;
  };
  button.addEventListener('click', async () => (await ensure()).toggle(button));

  const render = ({ modelId }) => {
    picker?.setActive(modelId);
    const model = catalog.model(modelId);
    if (name) name.textContent = model ? `${model.volumeMl} мл` : 'Выбрать стакан';
    if (meta) meta.textContent = model ? `${model.name} · ${kindOf(model)}` : 'Однослойные, двухслойные, эмбо, BM';
    if (art) art.replaceChildren(...(model ? railPhoto(model) : []));
    if (barName) barName.textContent = model ? `${model.volumeMl} мл` : 'Стакан';
    button.classList.toggle('is-empty', !model);
  };
  state.subscribe(['modelId'], render);
  render(state.get());

  // То же окно — для второго стакана «Фотореала»: на одно открытие другой
  // заголовок и другой обработчик выбора, потом всё как было.
  // Внизу окна тогда — «Без второго стакана».
  const title = document.getElementById('cup-dialog-title');
  const foot = document.getElementById('cup-dialog-foot');
  const none = document.getElementById('cup-second-none');
  const pickSecond = async ({ activeId, onSelect, onRemove, from }) => {
    const p = await ensure();
    const saved = { onSelect: p.onSelect, onToggle: p.onToggle, title: title?.textContent };
    const remove = () => {
      p.close();
      onRemove?.();
    };
    const restore = () => {
      p.onSelect = saved.onSelect;
      p.onToggle = saved.onToggle;
      if (title) title.textContent = saved.title;
      if (foot) foot.hidden = true;
      none?.removeEventListener('click', remove);
      p.setActive(state.get().modelId);
    };
    if (foot) foot.hidden = !onRemove;
    if (onRemove) none?.addEventListener('click', remove);
    p.onSelect = (id) => onSelect(id);
    // Закрытие приходит раньше выбора (CupPicker#choose) — возвращаем после.
    p.onToggle = (open) => {
      if (!open) queueMicrotask(restore);
    };
    if (title) title.textContent = 'Второй стакан в кадре';
    p.setActive(activeId);
    p.open(from);
  };
  return { open: async (from) => (await ensure()).open(from), pickSecond };
}

// Материал (§14) — переключатель в шапке, как выбор картона на colorcups.ru:
// только совместимые с моделью. Один материал (BM) — показан, но выбирать
// нечего.
function initMaterialSwitch({ state, catalog, actions }) {
  const box = document.getElementById('material-switch');
  if (!box) return;
  let items = [];
  let builtFor;
  const build = (modelId) => {
    builtFor = modelId;
    const materials = modelId ? catalog.materialsFor(modelId) : [];
    items = materials.map((material) => {
      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'segmented__item material-switch__item';
      item.setAttribute('role', 'radio');
      item.dataset.material = material.id;
      item.title = material.note ?? '';
      const swatch = document.createElement('span');
      paintSwatch(swatch, material);
      const text = document.createElement('span');
      text.textContent = material.name;
      item.append(swatch, text);
      item.disabled = materials.length < 2;
      item.addEventListener('click', () => actions.selectMaterial(material.id));
      return item;
    });
    box.replaceChildren(...items);
    box.hidden = materials.length === 0;
  };

  const render = ({ modelId, materialId }) => {
    if (modelId !== builtFor) build(modelId);
    for (const item of items) item.setAttribute('aria-checked', String(item.dataset.material === materialId));
  };
  state.subscribe(['modelId', 'materialId'], render);
  render(state.get());
}

// Образец материала: цвет из каталога, вид поверхности — по параметрам.
export function paintSwatch(node, material) {
  node.className = 'swatch-dot';
  node.style.removeProperty('--swatch');
  if (!material) return;
  const { params } = material;
  node.classList.toggle('is-glossy', params.roughness < 0.4 && !(params.transmission > 0));
  node.classList.toggle('has-fiber', (params.relief ?? 0) > 0.3);
  node.classList.toggle('is-clear', params.transmission > 0);
  if (material.swatch) node.style.setProperty('--swatch', material.swatch);
}

// Пустая сцена (§11): стакан ещё не выбран.
function initEmptyState({ state, picker }) {
  const box = document.getElementById('empty-state');
  if (!box) return;
  document.getElementById('empty-pick')?.addEventListener('click', (event) => picker?.open(event.currentTarget));
  const render = ({ modelId, tab }) => {
    box.hidden = Boolean(modelId) || tab !== '3d';
  };
  state.subscribe(['modelId', 'tab'], render);
  render(state.get());
}

// Заголовок страницы — сам стакан: объём и код крупно, под ними тип,
// материал и габариты. Как «Смешать цвет» на colorcups — страница говорит,
// с чем сейчас работаешь.
function initPageHead({ state, catalog }) {
  const title = document.getElementById('page-title');
  const sub = document.getElementById('page-sub');
  if (!title || !sub) return;
  const render = ({ modelId, materialId }) => {
    const model = catalog.model(modelId);
    if (!model) {
      title.textContent = 'Выберите стакан';
      sub.textContent = 'Затем загрузите макет — он ляжет на развёртку сам.';
      return;
    }
    swapText(title, `${model.volumeMl} мл · ${model.name}`);
    // Материал — со строчной, кроме аббревиатур (PET); повтор вида не пишем.
    const name = catalog.material(materialId)?.name;
    const material = name && !kindOf(model).toLowerCase().includes(name.toLowerCase())
      ? name.charAt(0).toLowerCase() + name.slice(1)
      : null;
    const size = `Ø${Math.round(model.size.topMm)} × ${Math.round(model.size.heightMm)} мм`;
    swapText(sub, [kindOf(model), material, size].filter(Boolean).join(' · '));
  };
  state.subscribe(['modelId', 'materialId'], render);
  render(state.get());
}

// Окно экспорта (§20): модуль грузится при первом открытии (§50).
function initExport(app) {
  const button = document.getElementById('export-btn');
  let center = null;
  const open = async (tab, from = button) => {
    if (!app.state.get().modelId) return;
    if (!center) {
      const { createExportCenter } = await import('../export/exportCenter.js');
      center ??= createExportCenter(app);
    }
    center.open(from, tab);
  };
  button?.addEventListener('click', () => !button.disabled && open());
  return { open };
}

// Нижняя панель узкого экрана (§45): те же шаги, что в левой панели, —
// кнопки панели просто нажимаются за человека.
function initActionBar({ exportCenter }) {
  const click = (id) => document.getElementById(id)?.click();
  const nav = {
    cup: () => click('cup-btn'),
    design: () => click('texture-btn'),
    export: () => exportCenter.open('photo'),
  };
  for (const button of document.querySelectorAll('[data-mobile-nav]')) {
    button.addEventListener('click', () => !button.disabled && nav[button.dataset.mobileNav]?.());
  }
}

// Загрузка макета (§6, бриф 03b): кнопка и перетаскивание. Тип — по
// сигнатуре, PDF — первая страница через pdf.js. Файл остаётся в браузере.
//
// Повторный выбор во время обработки отменяет предыдущий (§17): у каждой
// загрузки своё поколение, и результат устаревшего не применяется.
function initUpload({ state, mode, catalog, viewer, feedback }) {
  const button = document.getElementById('texture-btn');
  const input = document.getElementById('texture-input');
  const overlay = document.getElementById('drop-overlay');
  const targetBox = document.getElementById('art-target');
  const sideBox = document.getElementById('side-slots');
  const clearButton = document.getElementById('art-clear');
  const title = button?.querySelector('.upload-zone__title');
  const hint = button?.querySelector('.upload-zone__hint');
  const defaults = { title: title?.textContent, hint: hint?.textContent };
  let generation = 0;
  let controller = null;

  // Слот макета: чей (главный или второй стакан «Фотореала») и какая сторона
  // (у PET — А или Б). Второй выбирается переключателем «Стакан 1 | 2».
  let target = 'hero';
  let pendingSide = null;
  const photoSecond = () => {
    const s = state.get();
    const scene = catalog.scene(s.sceneId);
    const second = s.tab === 'scene' && (scene?.maxCups ?? 2) > 1 ? s.photo?.second : null;
    return second ? catalog.model(second.modelId) : null;
  };
  const slotModel = (t) => (t === 'second' ? photoSecond() : catalog.model(state.get().modelId));
  const slotKey = (t) => (t === 'second' ? 'design2' : 'design');

  // Растры, которые сделала загрузка: освобождаются, когда на них больше не
  // ссылается ни макет главного, ни макет второго.
  const owned = [];
  const own = (urls, release) => owned.push({ urls: urls.filter(Boolean), release });
  const referenced = (s) => {
    const urls = new Set();
    for (const d of [s.design, s.design2]) {
      if (!d) continue;
      urls.add(d.textureUrl);
      urls.add(d.unwrapUrl);
      for (const part of Object.values(d.sides ?? {})) if (part) urls.add(part.url);
    }
    return urls;
  };
  state.subscribe(['design', 'design2'], (s) => {
    const live = referenced(s);
    for (let i = owned.length - 1; i >= 0; i--) {
      if (owned[i].urls.some((url) => live.has(url))) continue;
      owned[i].release();
      owned.splice(i, 1);
    }
  });

  // Сменился второй стакан — его прежний макет к новому не подходит.
  let secondId = state.get().photo?.second?.modelId ?? null;
  state.subscribe(['photo'], (s) => {
    const id = s.photo?.second?.modelId ?? null;
    if (id === secondId) return;
    secondId = id;
    if (s.design2) state.set({ design2: null });
  });

  const fail = (error) => {
    if (error?.name === 'AbortError') return;
    console.warn('Макет не загрузился:', error);
    const text =
      error instanceof DesignError && error.reason === 'too-big'
        ? MESSAGES.fileTooBig
        : error instanceof DesignError && error.reason === 'unsupported'
          ? MESSAGES.formatUnsupported
          : MESSAGES.designFailed;
    feedback.onToast(text, 'error');
  };

  // Макет в состояние: у PET — лист из сторон (petSides.js), у остальных —
  // растр как есть. Главный стакан ещё и проверяется: лёг ли макет на модель.
  const commit = async (slot, design, notes) => {
    const key = slotKey(slot);
    const previous = state.get()[key];
    state.set({ [key]: design });
    if (key === 'design' && design) {
      const { updated } = await viewer.present({ designUrl: design.textureUrl });
      if (!(updated > 0)) {
        state.set({ design: previous });
        fail(new DesignError('broken', 'макет не лёг на модель'));
        return;
      }
    }
    feedback.onToast(notes.length ? notes.join(' · ') : 'Макет на модели', notes.length ? 'warning' : 'success');
  };

  const composePet = async (model, parts) => {
    const { composePetDesign } = await import('./petSides.js');
    const sheet = await composePetDesign(model.textureMapping.sides, parts);
    own([sheet.textureUrl, sheet.unwrapUrl], sheet.release);
    return { textureUrl: sheet.textureUrl, unwrapUrl: sheet.unwrapUrl, width: sheet.width, height: sheet.height, sides: parts };
  };

  const apply = async (file, slot = target, side = null) => {
    if (!mode.check('uploadDesign', 'загрузить макет')) return;
    const model = slotModel(slot);
    if (!model) return;

    controller?.abort();
    controller = new AbortController();
    const { signal } = controller;
    const token = ++generation;
    const stale = () => token !== generation;

    feedback.onLoading('Обрабатываем макет…');
    let prepared;
    try {
      prepared = await prepareDesign(file, model, {
        signal,
        onStage: (stage) => stage === 'pdf' && feedback.onLoading('Растрируем PDF…'),
      });
    } catch (error) {
      if (!stale()) {
        feedback.onLoaded();
        fail(error);
      }
      return;
    }
    if (stale() || slotModel(slot)?.id !== model.id) {
      prepared.release();
      return;
    }
    own([prepared.textureUrl, prepared.unwrapUrl], prepared.release);

    let design;
    try {
      const spec = model.textureMapping.sides;
      if (spec) {
        const current = state.get()[slotKey(slot)]?.sides ?? {};
        const free = Object.keys(spec.deg).find((s) => !current[s]);
        const parts = { ...current, [side ?? free ?? 'A']: { url: prepared.unwrapUrl, width: prepared.width, height: prepared.height } };
        design = await composePet(model, parts);
      } else {
        design = { textureUrl: prepared.textureUrl, unwrapUrl: prepared.unwrapUrl, width: prepared.width, height: prepared.height };
      }
    } catch (error) {
      feedback.onLoaded();
      fail(error);
      return;
    }
    if (stale()) return;
    feedback.onLoaded();

    // Неблокирующие предупреждения: макет стоит, но стоит проверить.
    const notes = [];
    if (prepared.pages > 1) notes.push(MESSAGES.firstPageUsed);
    if (aspectMismatch([prepared.width, prepared.height], model.textureMapping.unwrapMm) > 0.02) {
      notes.push(MESSAGES.aspectMismatch);
    }
    await commit(slot, design, notes);
  };

  // Убрать сторону PET: лист пересобирается из оставшейся; без сторон — нет макета.
  const removeSide = async (side) => {
    const model = slotModel(target);
    const key = slotKey(target);
    const current = { ...(state.get()[key]?.sides ?? {}) };
    delete current[side];
    if (!Object.values(current).some(Boolean)) {
      state.set({ [key]: null });
      return;
    }
    state.set({ [key]: await composePet(model, current) });
  };

  const pick = (side = null) => {
    pendingSide = side;
    input?.click();
  };

  // ── показ слотов ────────────────────────────────────────────────────────
  const sideButtons = [...(sideBox?.querySelectorAll('[data-side]') ?? [])];
  const targetButtons = [...(targetBox?.querySelectorAll('[data-cup]') ?? [])];
  const render = () => {
    const s = state.get();
    const second = photoSecond();
    if (!second) target = 'hero';
    if (targetBox) targetBox.hidden = !second;
    for (const b of targetButtons) {
      const on = b.dataset.cup === target;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-checked', String(on));
    }
    const model = slotModel(target);
    const design = s[slotKey(target)];
    const pet = Boolean(model?.textureMapping?.sides);
    if (button) button.hidden = pet || CONFIG.ui.uploadButton === false;
    if (sideBox) sideBox.hidden = !pet;
    for (const b of sideButtons) {
      const part = design?.sides?.[b.dataset.side] ?? null;
      b.classList.toggle('is-filled', Boolean(part));
      const art = b.querySelector('.side-slot__art');
      const img = art?.querySelector('img');
      if (part && img?.dataset.src !== part.url) {
        const next = Object.assign(document.createElement('img'), { src: part.url, alt: '' });
        next.dataset.src = part.url;
        art.replaceChildren(next);
      } else if (!part && img) {
        art.replaceChildren();
      }
    }
    // Надписи зоны: у второго — чей макет на нём сейчас.
    const pair = target === 'second' && second?.id === s.modelId;
    if (title && hint) {
      if (target !== 'second') {
        title.textContent = defaults.title;
        hint.textContent = defaults.hint;
      } else if (design) {
        title.textContent = 'Свой макет';
        hint.textContent = 'Нажмите, чтобы заменить';
      } else if (pair) {
        title.textContent = 'Как у первого';
        hint.textContent = 'Нажмите, чтобы загрузить свой';
      } else {
        title.textContent = `Макет для ${second?.volumeMl ?? ''} мл`;
        hint.textContent = 'Без макета стакан будет чистым';
      }
    }
    if (clearButton) {
      clearButton.hidden = !(target === 'second' && s.design2);
      clearButton.textContent = pair ? 'Вернуть макет первого' : 'Убрать макет';
    }
  };
  state.subscribe(['modelId', 'design', 'design2', 'photo', 'tab', 'sceneId'], render);
  render();

  for (const b of targetButtons) {
    b.addEventListener('click', () => {
      target = b.dataset.cup;
      render();
    });
  }
  for (const b of sideButtons) {
    b.addEventListener('click', (event) => {
      if (event.target.closest('.side-slot__remove')) {
        removeSide(b.dataset.side);
        return;
      }
      pick(b.dataset.side);
    });
  }
  clearButton?.addEventListener('click', () => state.set({ design2: null }));

  if (button && input) {
    button.hidden = button.hidden || CONFIG.ui.uploadButton === false;
    button.addEventListener('click', () => pick(null));
    input.addEventListener('change', () => {
      const file = input.files?.[0];
      if (file) apply(file, target, pendingSide);
      pendingSide = null;
      // Сброс — чтобы тот же файл можно было выбрать повторно.
      input.value = '';
    });
  }

  if (CONFIG.ui.dragAndDrop === false || !overlay) return;
  let depth = 0;
  const hide = () => {
    depth = 0;
    overlay.hidden = true;
  };
  window.addEventListener('dragenter', (event) => {
    event.preventDefault();
    if (!state.get().modelId) return;
    if (++depth === 1) overlay.hidden = false;
  });
  window.addEventListener('dragover', (event) => event.preventDefault());
  window.addEventListener('dragleave', (event) => {
    event.preventDefault();
    if (--depth <= 0) hide();
  });
  window.addEventListener('drop', (event) => {
    event.preventDefault();
    hide();
    const file = event.dataTransfer?.files?.[0];
    // На плитку стороны PET — в эту сторону, иначе — в свободную.
    const side = event.target?.closest?.('[data-side]')?.dataset.side ?? null;
    if (file) apply(file, target, side);
  });
}
