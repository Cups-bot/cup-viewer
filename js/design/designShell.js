// Оболочка Design Mode поверх общего старта: выбор стакана и материала,
// загрузка макета, пустое состояние, сессия. Импортируется только из
// js/entries/design.js — в клиентский бандл этот код не попадает (§37).

import { CONFIG } from '../config.js';
import { CupPicker } from './modelPicker.js';
import { bindMenu } from '../ui/toolbar.js';
import { saveSession } from './session.js';

// Подписи полей из каталога. Сами строки UI живут здесь, а не в catalog/.
const WALL_LABELS = Object.freeze({
  single: 'однослойный',
  double: 'двухслойный',
  embossed: 'с тиснением',
  plastic: 'литой пластик',
});

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
  initMaterialMenu({ state, catalog, actions });
  initUpload({ state, mode, viewer, feedback });
  initEmptyState({ state, picker });
  initModelMeta({ state, catalog });

  // Кнопки, которым нужна модель в сцене.
  const needsModel = ['texture-btn', 'export-btn'].map((id) => document.getElementById(id));
  const renderNeeds = ({ modelId }) => {
    for (const button of needsModel) if (button) button.disabled = !modelId;
  };
  state.subscribe(['modelId'], renderNeeds);
  renderNeeds(state.get());

  // Сессия (§11): модель, материал и фон. Сам макет не сохраняется.
  state.subscribe(['modelId', 'materialId', 'backgroundId'], (s) => saveSession(s));
  return actions;
}

function initModelPicker({ state, catalog, actions }) {
  const button = document.getElementById('cup-btn');
  const dialog = document.getElementById('cup-dialog');
  const name = document.getElementById('cup-name');
  if (!button || !dialog) return null;

  const picker = new CupPicker(dialog, {
    models: catalog.models,
    backdrop: document.getElementById('cup-backdrop'),
    onSelect: (id) => actions.selectModel(id),
    onToggle: (open) => button.setAttribute('aria-expanded', String(open)),
  });
  button.addEventListener('click', () => picker.toggle(button));

  const render = ({ modelId }) => {
    picker.setActive(modelId);
    const model = catalog.model(modelId);
    if (name) name.textContent = model ? model.name : 'Выбрать';
    button.classList.toggle('is-empty', !model);
  };
  state.subscribe(['modelId'], render);
  render(state.get());
  return picker;
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

// Замена макета: кнопка и перетаскивание картинки на страницу. Файл остаётся
// в браузере — ссылка blob: живёт, пока макет стоит на модели.
function initUpload({ state, mode, viewer, feedback }) {
  const button = document.getElementById('texture-btn');
  const input = document.getElementById('texture-input');
  const overlay = document.getElementById('drop-overlay');
  let ownedUrl = null;

  const apply = async (file) => {
    if (!mode.check('uploadDesign', 'загрузить макет')) return;
    if (!state.get().modelId) return;
    if (!file.type.startsWith('image/')) {
      feedback.onToast('Неподдерживаемый тип файла', 'error');
      return;
    }
    const previous = state.get().design;
    const url = URL.createObjectURL(file);
    state.set({ design: { textureUrl: url, unwrapUrl: url, width: null, height: null } });
    const { updated } = await viewer.present({ designUrl: url });
    if (updated > 0) {
      if (ownedUrl) URL.revokeObjectURL(ownedUrl);
      ownedUrl = url;
      feedback.onToast(`Дизайн применён: ${file.name}`);
      return;
    }
    feedback.onToast(updated === 0 ? 'В модели нет поверхности для дизайна' : 'Не удалось применить дизайн', 'error');
    state.set({ design: previous });
    URL.revokeObjectURL(url);
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
