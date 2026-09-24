// Оболочка Design Mode поверх общего старта: выбор стакана, материала и
// загрузка макета. Импортируется только из js/entries/design.js — в
// клиентский бандл этот код не попадает (§37).

import { CONFIG } from '../config.js';
import { CupPicker } from './modelPicker.js';

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

  initModelPicker({ state, catalog, actions });
  initMaterialPicker({ state, catalog, actions });
  initUpload({ state, mode, viewer, feedback });
  return actions;
}

function initModelPicker({ state, catalog, actions }) {
  const button = document.getElementById('cup-btn');
  const dialog = document.getElementById('cup-dialog');
  if (!button || !dialog) return;

  const picker = new CupPicker(dialog, {
    models: catalog.models,
    backdrop: document.getElementById('cup-backdrop'),
    onSelect: (id) => actions.selectModel(id),
    onToggle: (open) => {
      button.classList.toggle('is-active', open);
      button.setAttribute('aria-expanded', String(open));
    },
  });
  button.addEventListener('click', () => picker.toggle(button));

  const render = ({ modelId }) => {
    picker.setActive(modelId);
    const model = catalog.model(modelId);
    button.dataset.tip = model ? `Стакан: ${model.name}` : 'Выбрать стакан';
  };
  state.subscribe(['modelId'], render);
  render(state.get());
}

// Переключатель материала: только совместимые с моделью. Одному материалу
// переключатель не нужен — у PP сейчас так и есть.
function initMaterialPicker({ state, catalog, actions }) {
  const box = document.getElementById('paper-picker');
  if (!box) return;

  let chips = new Map();
  let shownFor = null;

  const build = (modelId) => {
    shownFor = modelId;
    box.replaceChildren();
    chips = new Map();
    const materials = catalog.materialsFor(modelId);
    box.hidden = materials.length < 2;
    for (const material of materials) {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'paper-chip';
      chip.dataset.paper = material.id;
      chip.setAttribute('aria-pressed', 'false');
      chip.title = material.note ? `${material.name}: ${material.note.toLowerCase()}` : material.name;

      // Образец: цвет из каталога, блик и волокно — по параметрам материала.
      const dot = document.createElement('span');
      dot.className = 'paper-chip__dot';
      dot.classList.toggle('is-glossy', material.params.roughness < 0.4);
      dot.classList.toggle('has-fiber', (material.params.relief ?? 0) > 0.3);
      if (material.swatch) dot.style.setProperty('--swatch', material.swatch);
      dot.setAttribute('aria-hidden', 'true');

      // Полная подпись и короткая — на узком экране «Мелованный» и
      // «Немелованный» рядом не помещаются (см. stage.css).
      const label = document.createElement('span');
      label.className = 'paper-chip__full';
      label.textContent = material.name;
      const short = document.createElement('span');
      short.className = 'paper-chip__short';
      short.textContent = material.short ?? material.name;

      chip.append(dot, label, short);
      chip.addEventListener('click', () => actions.selectMaterial(material.id));
      box.appendChild(chip);
      chips.set(material.id, chip);
    }
  };

  const render = ({ modelId, materialId }) => {
    if (modelId !== shownFor) build(modelId);
    for (const [id, chip] of chips) {
      const active = id === materialId;
      chip.classList.toggle('is-active', active);
      chip.setAttribute('aria-pressed', String(active));
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
