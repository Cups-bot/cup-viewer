// Оболочка Design Mode поверх общего старта: выбор стакана и материала,
// загрузка макета, пустое состояние, сессия. Импортируется только из
// js/entries/design.js — в клиентский бандл этот код не попадает (§37).

import { CONFIG } from '../config.js';
import { bindMenu } from '../ui/toolbar.js';
import { saveSession } from './session.js';
import { DesignError, prepareDesign } from './prepareDesign.js';
import { aspectMismatch } from './fileType.js';
import { MESSAGES } from '../ui/messages.js';

// Подписи полей из каталога. Сами строки UI живут здесь, а не в catalog/.
const WALL_LABELS = Object.freeze({
  single: 'однослойный',
  double: 'двухслойный',
  embossed: 'с тиснением',
  plastic: 'литой пластик',
});

export function initDesign({ state, mode, catalog, viewer, feedback, actions: common }) {
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
  initMaterialMenu({ state, catalog, actions });
  initUpload({ state, mode, catalog, viewer, feedback });
  initEmptyState({ state, picker });
  initModelMeta({ state, catalog });
  const exportCenter = initExport({ state, mode, viewer, feedback });
  initPublish({ state, mode, catalog, feedback });
  initMobileNav({ state, catalog, common, exportCenter });

  // Кнопки, которым нужна модель в сцене.
  const needsModel = [
    ...['texture-btn', 'export-btn', 'publish-btn'].map((id) => document.getElementById(id)),
    ...document.querySelectorAll('[data-mobile-nav="design"], [data-mobile-action]'),
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

// Model Picker (§10) грузится по требованию (§50): модуль и его разметка
// появляются при первом открытии окна.
function initModelPicker({ state, catalog, actions }) {
  const button = document.getElementById('cup-btn');
  const dialog = document.getElementById('cup-dialog');
  const name = document.getElementById('cup-name');
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
    if (name) name.textContent = model ? model.name : 'Выбрать';
    button.classList.toggle('is-empty', !model);
  };
  state.subscribe(['modelId'], render);
  render(state.get());
  return { open: async (from) => (await ensure()).open(from) };
}

// Материал (§14): только совместимые с моделью. Один материал — выбирать
// нечего, кнопка показывает его и не раскрывается.
function initMaterialMenu({ state, catalog, actions }) {
  const button = document.getElementById('material-btn');
  const menu = document.getElementById('material-menu');
  const dot = document.getElementById('material-dot');
  const name = document.getElementById('material-name');
  if (!button || !menu) return;
  const controls = bindMenu(button, menu, {
    onOpen: () => menu.querySelector('[aria-checked="true"]')?.focus(),
  });

  let items = [];
  let builtFor;
  const build = (modelId) => {
    builtFor = modelId;
    menu.replaceChildren();
    const materials = modelId ? catalog.materialsFor(modelId) : [];
    items = materials.map((material) => {
      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'menu-item';
      item.setAttribute('role', 'menuitemradio');
      item.dataset.material = material.id;
      const swatch = document.createElement('span');
      paintSwatch(swatch, material);
      const text = document.createElement('span');
      text.textContent = material.name;
      const check = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      check.setAttribute('class', 'icon menu-item__check');
      check.innerHTML = '<use href="assets/icons/sprite.svg#check" />';
      item.append(swatch, text, check);
      item.title = material.note ?? '';
      item.addEventListener('click', () => {
        actions.selectMaterial(material.id);
        controls.close();
      });
      menu.appendChild(item);
      return item;
    });
    button.disabled = materials.length < 2;
  };

  const render = ({ modelId, materialId }) => {
    if (modelId !== builtFor) build(modelId);
    const material = catalog.material(materialId);
    if (name) name.textContent = material && modelId ? material.name : '—';
    if (dot) paintSwatch(dot, modelId ? material : null);
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

// Сведения о модели в углу сцены: номенклатура, объём, тип, материал.
function initModelMeta({ state, catalog }) {
  const box = document.getElementById('model-meta');
  if (!box) return;
  const render = ({ modelId, materialId }) => {
    const model = catalog.model(modelId);
    box.hidden = !model;
    if (!model) return;
    const parts = [`${model.volumeMl} мл`, WALL_LABELS[model.wall], catalog.material(materialId)?.name?.toLowerCase()];
    const name = document.createElement('b');
    name.textContent = model.name;
    box.replaceChildren(name);
    for (const part of parts.filter(Boolean)) {
      const dot = document.createElement('span');
      dot.className = 'model-meta__dot';
      box.append(dot, document.createTextNode(part));
    }
  };
  state.subscribe(['modelId', 'materialId'], render);
  render(state.get());
}

// «Ссылка клиенту» (§31): окно грузится при первом открытии.
function initPublish(app) {
  const button = document.getElementById('publish-btn');
  if (!button) return;
  if (!app.mode.can('publish')) {
    button.remove();
    return;
  }
  let dialog = null;
  button.addEventListener('click', async () => {
    if (button.disabled) return;
    if (!dialog) {
      const { createPublishDialog } = await import('./publish.js');
      dialog ??= createPublishDialog(app);
    }
    dialog.open(button);
  });
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

// Нижняя панель телефона и планшета в портрете (§45): те же действия, что в
// верхней панели, — кнопки верхней панели просто нажимаются за человека.
function initMobileNav({ state, catalog, common, exportCenter }) {
  const click = (id) => document.getElementById(id)?.click();
  const moreMenu = document.getElementById('more-menu');
  const closeMore = () => {
    if (moreMenu) moreMenu.hidden = true;
    document.getElementById('more-btn')?.setAttribute('aria-expanded', 'false');
  };
  const nav = {
    cup: () => click('cup-btn'),
    design: () => click('texture-btn'),
    material: () => click('material-btn'),
    more: () => click('more-btn'),
  };
  for (const button of document.querySelectorAll('[data-mobile-nav]')) {
    button.addEventListener('click', () => nav[button.dataset.mobileNav]?.());
  }
  const more = {
    scene: () => common.setTab('scene'),
    export: () => exportCenter.open('image'),
    turn: () => exportCenter.open('turn'),
    publish: () => click('publish-btn'),
  };
  for (const button of document.querySelectorAll('[data-mobile-action]')) {
    button.addEventListener('click', () => {
      closeMore();
      more[button.dataset.mobileAction]?.();
    });
  }

  // Материал в нижней панели: образец текущего и недоступность, если выбора нет.
  const dot = document.getElementById('mobile-material-dot');
  const materialButton = document.querySelector('[data-mobile-nav="material"]');
  const render = ({ modelId, materialId }) => {
    if (dot) paintSwatch(dot, modelId ? catalog.material(materialId) : null);
    if (materialButton) materialButton.disabled = catalog.materialsFor(modelId).length < 2;
  };
  state.subscribe(['modelId', 'materialId'], render);
  render(state.get());
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
  let generation = 0;
  let controller = null;
  // Растры, которые сделала загрузка: освобождаются, когда макет сменился.
  const owned = new Map();

  state.subscribe(['design'], (s) => {
    for (const [url, release] of owned) {
      if (url === s.design?.textureUrl) continue;
      release();
      owned.delete(url);
    }
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

  const apply = async (file) => {
    if (!mode.check('uploadDesign', 'загрузить макет')) return;
    const model = catalog.model(state.get().modelId);
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
    if (stale() || state.get().modelId !== model.id) {
      prepared.release();
      return;
    }

    const previous = state.get().design;
    owned.set(prepared.textureUrl, prepared.release);
    state.set({
      design: {
        textureUrl: prepared.textureUrl,
        unwrapUrl: prepared.unwrapUrl,
        width: prepared.width,
        height: prepared.height,
      },
    });
    const { updated } = await viewer.present({ designUrl: prepared.textureUrl });
    if (stale()) return;
    feedback.onLoaded();
    if (!(updated > 0)) {
      state.set({ design: previous });
      fail(new DesignError('broken', 'макет не лёг на модель'));
      return;
    }

    // Неблокирующие предупреждения: макет стоит, но стоит проверить.
    const notes = [];
    if (prepared.pages > 1) notes.push(MESSAGES.firstPageUsed);
    if (aspectMismatch([prepared.width, prepared.height], model.textureMapping.unwrapMm) > 0.02) {
      notes.push(MESSAGES.aspectMismatch);
    }
    feedback.onToast(notes.length ? notes.join(' · ') : 'Макет на модели', notes.length ? 'warning' : 'success');
  };

  if (button && input) {
    button.hidden = CONFIG.ui.uploadButton === false;
    button.addEventListener('click', () => input.click());
    input.addEventListener('change', () => {
      const file = input.files?.[0];
      if (file) apply(file);
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
    if (file) apply(file);
  });
}
