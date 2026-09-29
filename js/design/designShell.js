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
import { clearDesignSource, loadDesignSource, saveDesignSource } from './designStore.js';
import { PRINT_LABELS, asPrinted, printModesOf, zoneMmOf } from '../catalog/printModes.js';
import { PRINT_DPI, SIGNATURE_BYTES, detectFileType } from './fileType.js';
import { createTour, tourSeen } from '../ui/tour.js';
import { HELP_STEP, TOURS, WELCOME } from './tours.js';

// Подписи полей из каталога. Сами строки UI живут здесь, а не в catalog/.
const KIND_LABELS = Object.freeze({
  single: 'Однослойный бумажный',
  double: 'Двухслойный бумажный',
  embossed: 'Эмбо, двухслойный с рельефом',
  plastic: 'Пластиковый BM',
  pet: 'Прозрачный PET',
});

const kindOf = (model) => KIND_LABELS[model.wall] ?? '';

// Предупреждения прямоугольника SIZE (sizeRect.js → notes).
const RECT_NOTES = Object.freeze({
  firstPage: MESSAGES.firstPageUsed,
});

// Предупреждение о разрешении: «≈ 184 dpi — меньше 300: …».
const lowDpiNote = (dpi) => `≈ ${dpi} dpi — ${MESSAGES.lowDpi}`;

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
  // «В редактор» из «Моих рендеров»: сцена кадра и его макеты — обратно на сайт.
  let upload = null;
  const account = initAccount({
    catalog,
    feedback,
    onOpenJob: (spec) => restoreJob(spec, { state, catalog, feedback, upload }),
    onOpenScene: () => {
      if (!mode.check('openScene')) return;
      state.set({ tab: 'scene', sceneId: state.get().sceneId ?? catalog.scenes[0]?.id ?? null });
    },
  });
  initMaterialSwitch({ state, catalog, actions });
  const sheet = initRailSheet();
  upload = initUpload({ state, mode, catalog, viewer, feedback, sheet });
  initEmptyState({ state, picker });
  initPageHead({ state, catalog });
  initProofToggle({ state, catalog });
  const exportCenter = initExport({ state, mode, viewer, feedback });
  initPhotoPanel({ state, viewer, catalog, mode, picker, feedback, account, cupPhoto: railPhoto, describe: (m) => `${m.name} · ${kindOf(m)}` });
  initActionBar({ state, exportCenter, sheet });
  initTour({ state, sheet });

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

  // Сессия (§11): модель, материал и фон; макет главного — designStore.js.
  state.subscribe(['modelId', 'materialId', 'backgroundId', 'printMode', 'proof'], (s) => saveSession(s));
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
    if (meta) meta.textContent = model ? `${model.name} · ${kindOf(model)}` : 'Бумажные, пластиковые BM и PET';
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
// Картон — как «Картон для печати» на colorcups.ru: все варианты видны сразу
// и подписаны целиком (кружки без подписей приходилось перебирать наведением —
// владелец, 2026-09-29). На узком экране — короткие названия из каталога
// (short), полное — в подсказке. Только совместимые с моделью; у BM один —
// показан как факт, а подпись — «Материал».
function initMaterialSwitch({ state, catalog, actions }) {
  const box = document.getElementById('material-switch');
  const pick = document.getElementById('material-pick');
  const kind = document.getElementById('material-kind');
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
      item.title = material.note ? `${material.name} — ${material.note}` : material.name;
      const swatch = document.createElement('span');
      paintSwatch(swatch, material);
      const long = Object.assign(document.createElement('span'), { className: 'material-switch__long', textContent: material.name });
      const short = Object.assign(document.createElement('span'), { className: 'material-switch__short', textContent: material.short ?? material.name });
      item.append(swatch, long, short);
      item.disabled = materials.length < 2;
      item.addEventListener('click', () => actions.selectMaterial(material.id));
      return item;
    });
    // Подложку выбранного (motion.js initSegments) не выбрасываем вместе с
    // пунктами — без неё выбранный картон не выделен.
    box.replaceChildren(...box.querySelectorAll(':scope > .seg-thumb'), ...items);
    if (pick) pick.hidden = materials.length === 0;
    const paper = catalog.model(modelId)?.type === 'paper';
    if (kind) kind.textContent = paper ? 'Картон' : 'Материал';
    box.setAttribute('aria-label', paper ? 'Картон для печати' : 'Материал стакана');
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

// «Имитация картона» (js/design/proof.js): подписанный тумблер над сценой во
// всех вкладках, и на развёртке тоже — рядом с «Направляющими», одной группой
// «как показывать» (владелец, 2026-09-29: значок без слов был не очевиден).
// Только у материала с профилем картона (proof в catalog/materials.json) — у
// крафта и пластика его нет.
function initProofToggle({ state, catalog }) {
  const button = document.getElementById('proof-toggle');
  if (!button) return;
  button.addEventListener('click', () => state.set({ proof: !state.get().proof }));
  const render = ({ modelId, materialId, proof }) => {
    const material = catalog.material(materialId);
    button.hidden = !modelId || !material?.proof;
    button.setAttribute('aria-pressed', String(Boolean(proof)));
    button.title = `Как напечатается на картоне «${material?.name ?? ''}» — по профилю типографии. Выключено — цвета файла на идеально белом`;
  };
  state.subscribe(['modelId', 'materialId', 'proof'], render);
  render(state.get());
}

// «Как пользоваться» — пошаговая инструкция с подсветкой (js/ui/tour.js), у
// каждой вкладки своя (tours.js). При самом первом входе приходит сама и
// начинается со знакомства — как на colorcups.ru: кнопку справки замечают не
// все. Не мешает: ждёт, пока закроется окно или лист поверх страницы.
function initTour({ state, sheet }) {
  const tour = createTour();
  const button = document.getElementById('info-btn');
  const run = (welcome = false) => {
    sheet?.hide();
    const current = TOURS[state.get().tab] ?? TOURS['3d'];
    const steps = welcome ? [WELCOME, ...current.steps, HELP_STEP] : current.steps;
    tour.start(steps, { title: current.title, welcome });
  };
  button?.addEventListener('click', () => (tour.open ? tour.close() : run()));
  if (tourSeen()) return;
  const busy = () => document.querySelector('.dialog:not([hidden]), .crop-dialog:not([hidden])') || document.getElementById('rail')?.classList.contains('is-open');
  const welcome = () => {
    if (tourSeen() || tour.open) return;
    if (busy()) {
      setTimeout(welcome, 1500);
      return;
    }
    run(true);
  };
  // Пауза: пусть страница дорисуется, иначе рамке не за что зацепиться.
  setTimeout(welcome, 1200);
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

// Узкий экран: панель шагов — нижний лист с одним разделом («Стакан» с
// картоном или «Макет»), как панели инструментов Canva и Pacdora на телефоне:
// сцене — весь экран, инструменты выезжают по кнопке. Элементы те же, что в
// панели на широком экране, — ничего не дублируется.
function initRailSheet() {
  const rail = document.getElementById('rail');
  const backdrop = document.getElementById('rail-backdrop');
  const title = document.getElementById('rail-sheet-title');
  const close = document.getElementById('rail-close');
  const narrow = window.matchMedia('(max-width: 1023px)');
  const TITLES = { cup: 'Стакан и картон', art: 'Макет' };
  let opener = null;
  const isOpen = () => Boolean(rail?.classList.contains('is-open'));
  const hide = () => {
    if (!isOpen()) return;
    rail.classList.remove('is-open');
    delete rail.dataset.section;
    if (backdrop) backdrop.hidden = true;
    opener?.focus?.();
  };
  const show = (section, from) => {
    if (!rail || !narrow.matches) return false;
    opener = from ?? null;
    rail.dataset.section = section;
    if (title) title.textContent = TITLES[section] ?? '';
    rail.classList.add('is-open');
    rail.scrollTop = 0;
    if (backdrop) backdrop.hidden = false;
    close?.focus();
    return true;
  };
  close?.addEventListener('click', hide);
  backdrop?.addEventListener('click', hide);
  // Escape закрывает лист, если поверх него нет окна (выбор стакана, кадр).
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !document.querySelector('.dialog:not([hidden])')) hide();
  });
  narrow.addEventListener('change', () => !narrow.matches && hide());
  return { show, hide, get open() { return isOpen(); } };
}

// Нижняя панель узкого экрана (§45): «Стакан» и «Макет» открывают свой
// раздел панели шагов листом; пока стакан не выбран, «Стакан» — сразу выбор.
function initActionBar({ state, exportCenter, sheet }) {
  const click = (id) => document.getElementById(id)?.click();
  const nav = {
    cup: (from) => (state.get().modelId ? sheet.show('cup', from) : click('cup-btn')),
    design: (from) => sheet.show('art', from),
    export: () => exportCenter.open('photo'),
  };
  for (const button of document.querySelectorAll('[data-mobile-nav]')) {
    button.addEventListener('click', () => !button.disabled && nav[button.dataset.mobileNav]?.(button));
  }
}

// Загрузка макета (§6, бриф 03b): кнопка и перетаскивание. Тип — по
// сигнатуре, PDF — первая страница через pdf.js. Файл остаётся в браузере.
//
// Повторный выбор во время обработки отменяет предыдущий (§17): у каждой
// загрузки своё поколение, и результат устаревшего не применяется.
function initUpload({ state, mode, catalog, viewer, feedback, sheet }) {
  const button = document.getElementById('texture-btn');
  const input = document.getElementById('texture-input');
  const overlay = document.getElementById('drop-overlay');
  const targetBox = document.getElementById('art-target');
  const sideBox = document.getElementById('side-slots');
  const clearButton = document.getElementById('art-clear');
  const title = button?.querySelector('.upload-zone__title');
  const hint = button?.querySelector('.upload-zone__hint');
  const anim = button?.querySelector('.upload-zone__anim');
  const defaults = { title: title?.textContent, hint: hint?.textContent };
  // Загруженный макет виден в самой зоне: миниатюра и имя файла, а не снова
  // «Загрузить макет», будто ничего не произошло.
  const thumb = Object.assign(document.createElement('img'), { className: 'upload-zone__thumb', alt: '', hidden: true });
  anim?.after(thumb);
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
    return second ? asPrinted(catalog.model(second.modelId), s.printMode) : null;
  };
  // Модель слота — такой, какой её печатают сейчас: у тампопечати BM — со
  // сторонами А/Б на своей полосе (catalog/printModes.js).
  const slotModel = (t) => (t === 'second' ? photoSecond() : asPrinted(catalog.model(state.get().modelId), state.get().printMode));
  const slotKey = (t) => (t === 'second' ? 'design2' : 'design');

  // Бумага с прямоугольником SIZE (catalog: textureMapping.rect): макет — готовый
  // конус или рисунок в прямоугольнике, который сайт гнёт сам (sizeRect.js).
  // У каждого вида свой файл: переключение не переносит картинку из одного в
  // другой (владелец, 2026-09-29) — можно держать два разных макета.
  const rectOf = (model) => (model?.textureMapping?.sides ? null : model?.textureMapping?.rect ?? null);
  const FORM_KEY = 'cupviewer.artForm';
  let form = (() => {
    try {
      return localStorage.getItem(FORM_KEY) === 'rect' ? 'rect' : 'sheet';
    } catch {
      return 'sheet';
    }
  })();
  const saveForm = () => {
    try {
      localStorage.setItem(FORM_KEY, form);
    } catch {
      // не запомнили — в следующий раз откроется «Готовый макет»
    }
  };
  // Вид главного стакана сейчас: прямоугольник — только у стакана, где он есть.
  const which = () => (form === 'rect' && rectOf(slotModel('hero')) ? 'rect' : 'sheet');
  // Исходники макета главного стакана по видам — ими макет переносится на
  // другой стакан и возвращается после перезагрузки (designStore):
  // { kind: 'file', file }, у тампопечати { kind: 'sides', sides: { A, B } },
  // шаблон Формации { kind: 'template', file, as } — всё это вид «sheet»;
  // рисунок в прямоугольнике SIZE { kind: 'rect', file, placement } — «rect».
  const sources = { sheet: null, rect: null };
  // Готовые макеты тех же видов для текущего стакана: переключение между ними
  // мгновенное, без повторной обработки файла.
  const kept = { sheet: null, rect: null };

  // Растры, которые сделала загрузка: освобождаются, когда на них больше не
  // ссылается ни макет главного (в том числе отложенный второго вида), ни
  // макет второго стакана.
  const owned = [];
  const own = (urls, release) => owned.push({ urls: urls.filter(Boolean), release });
  const referenced = (s) => {
    const urls = new Set();
    for (const d of [s.design, s.design2, kept.sheet, kept.rect]) {
      if (!d) continue;
      urls.add(d.textureUrl);
      urls.add(d.unwrapUrl);
      for (const part of Object.values(d.sides ?? {})) if (part) urls.add(part.url);
    }
    return urls;
  };
  state.subscribe(['design', 'design2'], (s) => {
    kept[which()] = s.design;
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
  const commit = async (slot, design, notes, done = 'Макет на модели') => {
    const key = slotKey(slot);
    const previous = state.get()[key];
    state.set({ [key]: design });
    if (key === 'design' && design) {
      const { updated } = await viewer.present({ designUrl: design.textureUrl });
      if (!(updated > 0)) {
        state.set({ design: previous });
        fail(new DesignError('broken', 'макет не лёг на модель'));
        return false;
      }
    }
    feedback.onToast(notes.length ? [done, ...notes].join(' · ') : done, notes.length ? 'warning' : 'success');
    // Телефон: макет ради того и грузили, чтобы увидеть на стакане.
    sheet?.hide();
    return true;
  };

  // Направляющие SIZE поверх 3D: только вид — в рендер уходит лист без них.
  // Видны только во вкладке 3D: в «Фотореале» кадр такой, каким его посчитает
  // Blender, на развёртке — лист, как уйдёт в печать.
  let guides = false;
  const showGuides = () => guides && state.get().tab === '3d';
  const guided = async (design, model) => {
    const { withGuides } = await import('./sizeRect.js');
    const sheet = await withGuides(design.rect.url, model);
    own([sheet.url], sheet.release);
    return { ...design, textureUrl: sheet.url };
  };
  // Запомнить исходник вида (по умолчанию — текущего): в памяти и в браузере.
  const remember = (next, slot = which()) => {
    sources[slot] = next;
    const key = slot === 'rect' ? 'hero-rect' : 'hero';
    if (next) saveDesignSource(next, key);
    else clearDesignSource(key);
  };
  const DONE = { user: 'Макет на модели', switch: 'Макет перенесён на этот стакан', restore: 'Макет с прошлого раза' };

  const composePet = async (model, parts) => {
    const { composePetDesign } = await import('./petSides.js');
    const sheet = await composePetDesign(model.textureMapping.sides, parts);
    own([sheet.textureUrl, sheet.unwrapUrl], sheet.release);
    return { textureUrl: sheet.textureUrl, unwrapUrl: sheet.unwrapUrl, width: sheet.width, height: sheet.height, sides: parts };
  };

  // Картинка стороны в форме зоны: вырезка шаблона — как есть, логотип — по
  // центру без растяжения (владелец, 2026-09-27).
  const sidePart = async (model, url, fit) => {
    const { fitToZone } = await import('./petSides.js');
    const part = await fitToZone(url, zoneMmOf(model.textureMapping.sides), fit);
    own([part.url], part.release);
    return { url: part.url, width: part.width, height: part.height };
  };

  const isPdf = async (file) => detectFileType(new Uint8Array(await file.slice(0, SIGNATURE_BYTES).arrayBuffer())) === 'pdf';

  // Шаблон Формации для пластика: рамки на листе → поле шелкотрафарета или
  // стороны тампопечати, рисунок — из слоя conus. null — не шаблон.
  const fromTemplate = async (file, model, signal) => {
    if (model.type === 'paper' || !(await isPdf(file))) return null;
    const { readTemplate } = await import('./templateRead.js');
    const spec = model.textureMapping.sides;
    feedback.onLoading('Ищем зоны печати в шаблоне…');
    const found = await readTemplate(file, { kind: spec ? 'sides' : 'field', signal });
    if (!found) return null;
    if (found.kind === 'field') {
      const url = URL.createObjectURL(found.field.blob);
      own([url], () => URL.revokeObjectURL(url));
      const bitmap = await createImageBitmap(found.field.blob);
      const design = { textureUrl: url, unwrapUrl: url, width: bitmap.width, height: bitmap.height };
      bitmap.close();
      return { design, mm: found.field.mm, layer: found.layer, note: `Поле из шаблона ${Math.round(found.field.mm[0])} × ${Math.round(found.field.mm[1])} мм` };
    }
    const parts = {};
    for (const [side, cut] of Object.entries(found.sides)) {
      const raw = URL.createObjectURL(cut.blob);
      try {
        parts[side] = await sidePart(model, raw, 'fill');
      } finally {
        URL.revokeObjectURL(raw);
      }
    }
    const names = Object.keys(parts).map((side) => (side === 'A' ? 'А' : 'Б'));
    return {
      design: await composePet(model, parts),
      layer: found.layer,
      note: names.length > 1 ? 'Стороны А и Б из шаблона' : `Сторона ${names[0]} из шаблона — без Б печать с одной стороны`,
    };
  };

  // Рисунок прямоугольника SIZE → конус на листе, дальше — как обычный макет.
  // Картинку не в пропорциях рамки клиент размещает сам (rectCropper.js);
  // placement — уже выбранное место (перенос, «Кадрировать»).
  const applyRect = async (file, slot, model, { origin, signal, stale, placement = null }) => {
    const rect = rectOf(model);
    let prepared;
    try {
      const { prepareRect, readRectSource } = await import('./sizeRect.js');
      const art = await readRectSource(file, model, { signal });
      let place = null;
      if (art.kind !== 'page') {
        const { fitPlacement, openCropper } = await import('./rectCropper.js');
        const same = placement && placement.rectMm?.[0] === rect.sizeMm[0] && placement.rectMm?.[1] === rect.sizeMm[1];
        place = same ? placement : fitPlacement(art.width / art.height, rect, 'fill');
        if (art.kind === 'free' && !same) {
          feedback.onLoaded();
          place = stale() ? null : await openCropper({ image: art.image, width: art.width, height: art.height, rect, placement: place });
          // Отмена — остаётся прежний макет.
          if (!place || stale()) {
            art.close();
            return;
          }
        }
      }
      feedback.onLoading('Гнём прямоугольник в конус…');
      prepared = await prepareRect(art, model, { placement: place, signal });
      prepared.placement = place;
    } catch (error) {
      if (!stale()) {
        feedback.onLoaded();
        fail(error);
      }
      return;
    }
    if (stale() || slotModel(slot) !== model) {
      prepared.release();
      return;
    }
    own([prepared.unwrapUrl, prepared.rectUrl], prepared.release);
    let design = {
      textureUrl: prepared.textureUrl,
      unwrapUrl: prepared.unwrapUrl,
      width: prepared.width,
      height: prepared.height,
      // file и placement — для «Кадрировать»: окно открывается с тем же местом.
      rect: { url: prepared.rectUrl, file, kind: prepared.kind, placement: prepared.placement },
      dpi: prepared.dpi,
    };
    if (showGuides()) {
      try {
        design = await guided(design, model);
      } catch (error) {
        console.warn('Направляющие не нарисовались:', error);
      }
    }
    if (stale()) return;
    feedback.onLoaded();
    const notes = prepared.notes.map((note) => (note === 'lowDpi' ? lowDpiNote(prepared.dpi) : RECT_NOTES[note]));
    const done = [
      DONE[origin],
      'прямоугольник согнут в конус',
      prepared.erased ? 'направляющие SIZE стёрты' : null,
      prepared.layer ? 'взят слой conus' : null,
    ].filter(Boolean).join(' · ');
    const ok = await commit(slot, design, notes, done);
    if (ok && slot === 'hero') {
      remember({ kind: 'rect', file, placement: prepared.placement }, 'rect');
      render();
    }
  };

  // as — как понимать файл у бумаги с прямоугольником SIZE: 'sheet' — готовый
  // конус, 'rect' — рисунок в прямоугольнике; по умолчанию — выбор у зоны.
  const apply = async (file, slot = target, side = null, { origin = 'user', as = form, placement = null } = {}) => {
    if (!mode.check('uploadDesign', 'загрузить макет')) return;
    const model = slotModel(slot);
    if (!model) return;

    controller?.abort();
    controller = new AbortController();
    const { signal } = controller;
    const token = ++generation;
    const stale = () => token !== generation;

    feedback.onLoading('Обрабатываем макет…');
    if (as === 'rect' && rectOf(model)) {
      await applyRect(file, slot, model, { origin, signal, stale, placement });
      return;
    }
    // Шаблон Формации — сразу поле или обе стороны; иначе — обычный макет.
    let template = null;
    try {
      template = await fromTemplate(file, model, signal);
    } catch (error) {
      if (error?.name === 'AbortError' || stale()) return;
      console.warn('Шаблон не прочитан, файл — как обычный макет:', error);
    }
    if (stale() || slotModel(slot) !== model) return;
    if (template) {
      feedback.onLoaded();
      const notes = [template.note];
      if (!template.layer) notes.push(MESSAGES.templateFlattened);
      const ok = await commit(slot, template.design, notes.filter((n) => n !== template.note),
        `${DONE[origin]} · ${template.note}${template.layer ? ' · взят слой conus' : ''}`);
      if (ok && slot === 'hero') {
        remember({ kind: 'template', file, as: model.textureMapping.sides ? 'sides' : 'field' }, 'sheet');
        render();
      }
      return;
    }
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
    if (stale() || slotModel(slot) !== model) {
      prepared.release();
      return;
    }
    own([prepared.textureUrl, prepared.unwrapUrl], prepared.release);

    let design;
    let placed = null;
    try {
      const spec = model.textureMapping.sides;
      if (spec) {
        const current = state.get()[slotKey(slot)]?.sides ?? {};
        const free = Object.keys(spec.deg).find((s) => !current[s]);
        placed = side ?? free ?? 'A';
        const parts = { ...current, [placed]: await sidePart(model, prepared.unwrapUrl, 'center') };
        design = await composePet(model, parts);
      } else {
        design = { textureUrl: prepared.textureUrl, unwrapUrl: prepared.unwrapUrl, width: prepared.width, height: prepared.height, dpi: prepared.dpi };
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
    // Шаблон Формации со слоями: взят только слой рисунка (conus). Слои есть,
    // а его нет — на стакан ушёл весь лист с контурами и пометками.
    if (prepared.layers?.used) notes.push(MESSAGES.artLayerUsed);
    else if (prepared.layers?.names.length) notes.push(MESSAGES.artLayerMissing);
    if (!placed && aspectMismatch([prepared.width, prepared.height], model.textureMapping.unwrapMm) > 0.02) {
      notes.push(MESSAGES.aspectMismatch);
    }
    // На пластике краска — только там, где картинка непрозрачна: у JPG
    // прозрачности нет, и белый фон тоже ляжет краской.
    if (model.type !== 'paper' && prepared.type === 'jpeg') notes.push(MESSAGES.jpegOnPlastic);
    // Картинка на всю развёртку: меньше 300 dpi в печать не примут. У сторон
    // PET логотип встаёт по центру своей зоны — там проверка не эта.
    if (!placed && prepared.dpi && prepared.dpi < PRINT_DPI) notes.push(lowDpiNote(prepared.dpi));
    const ok = await commit(slot, design, notes.filter((note) => note !== MESSAGES.artLayerUsed), `${DONE[origin]}${prepared.layers?.used ? ' · взят слой conus' : ''}`);
    if (ok && slot === 'hero') {
      const sides = sources.sheet?.kind === 'sides' ? sources.sheet.sides : {};
      // Логотип стороны — поверх сторон; прочее (файл целиком) — заново.
      remember(placed ? { kind: 'sides', sides: { ...sides, [placed]: file } } : { kind: 'file', file }, 'sheet');
      // Имя файла в зоне — из исходника, а он запомнен после показа макета.
      render();
    }
  };

  // Сменили стакан — макет переносится на новый (там же предупреждение, если
  // пропорции развёртки другие). Между печатью сторонами (PET) и развёрткой
  // целиком не переносится: у них разный смысл макета.
  const carry = async (origin) => {
    const model = slotModel('hero');
    const source = sources[which()];
    if (!model || !source) return;
    const pad = Boolean(model.textureMapping.sides);
    if (source.kind === 'rect') {
      if (rectOf(model)) await apply(source.file, 'hero', null, { origin, as: 'rect', placement: source.placement ?? null });
      else if (origin === 'switch') feedback.onToast('Макет не перенесён: у этого стакана пока нет прямоугольника SIZE — загрузите готовый макет', 'warning');
      return;
    }
    if (source.kind === 'template' && (source.as === 'sides') === pad) {
      await apply(source.file, 'hero', null, { origin });
    } else if (pad && source.kind === 'sides') {
      for (const [side, file] of Object.entries(source.sides)) if (file) await apply(file, 'hero', side, { origin });
    } else if (!pad && source.kind === 'file') {
      await apply(source.file, 'hero', null, { origin, as: 'sheet' });
    } else if (origin === 'switch') {
      feedback.onToast('Макет не перенесён: у этого стакана или вида печати другой макет — загрузите его', 'warning');
    }
  };
  // Сменился стакан или вид печати — макет переносится, если подходит.
  let heroKey = `${state.get().modelId}|${state.get().printMode}`;
  state.subscribe(['modelId', 'printMode'], (s) => {
    const key = `${s.modelId}|${s.printMode}`;
    if (key === heroKey) return;
    heroKey = key;
    // Готовые макеты — под прежний стакан; исходники переносятся заново.
    kept.sheet = null;
    kept.rect = null;
    if (sources[which()] && !s.design) carry('switch');
  });

  // Убрать сторону PET: лист пересобирается из оставшейся; без сторон — нет макета.
  const removeSide = async (side) => {
    const model = slotModel(target);
    const key = slotKey(target);
    const current = { ...(state.get()[key]?.sides ?? {}) };
    delete current[side];
    if (target === 'hero' && sources.sheet?.kind === 'sides') {
      const sides = { ...sources.sheet.sides, [side]: null };
      remember(Object.values(sides).some(Boolean) ? { kind: 'sides', sides } : null, 'sheet');
    }
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
  const sideNote = sideBox?.querySelector('.side-slots__note');
  // Вид печати: у BM — переключатель, у PET — подпись (только тампопечать).
  const modeBox = document.getElementById('print-mode');
  const modeNote = document.getElementById('print-mode-note');
  const modeButtons = [...(modeBox?.querySelectorAll('[data-mode]') ?? [])];
  // Вид макета (готовый конус или прямоугольник SIZE) с пояснением, действия с
  // загруженным макетом и направляющие. Панель действий — у карточки макета,
  // как у Canva и Printful; на узком экране всё это — в листе «Макет».
  const formBox = document.getElementById('art-form');
  const formButtons = [...(formBox?.querySelectorAll('[data-form]') ?? [])];
  const formNote = document.getElementById('art-form-note');
  const actionsBox = document.getElementById('art-actions');
  const replaceButton = document.getElementById('art-replace');
  const guidesButton = document.getElementById('rect-guides');
  const cropButton = document.getElementById('rect-crop');
  // Направляющие на готовом макете прямоугольника — как сейчас выбрано.
  const withGuidesState = async (design, model) => {
    if (!design?.rect) return design;
    if (!showGuides()) return { ...design, textureUrl: design.unwrapUrl };
    return design.textureUrl === design.unwrapUrl ? guided(design, model) : design;
  };
  for (const b of formButtons) {
    b.addEventListener('click', async () => {
      if (b.dataset.form === form) return;
      form = b.dataset.form;
      saveForm();
      render();
      if (target !== 'hero') return;
      // У каждого вида свой макет: готовый — сразу, только файл (после
      // перезагрузки, смены стакана) — обработать заново, ничего — пусто.
      const slot = which();
      if (kept[slot]) {
        state.set({ design: await withGuidesState(kept[slot], slotModel('hero')) });
      } else {
        state.set({ design: null });
        if (sources[slot]) carry('user');
      }
    });
  }
  // Наложить или снять направляющие на готовых макетах-прямоугольниках — как
  // сейчас нужно (showGuides): по нажатию и при смене вкладки.
  const syncGuides = async () => {
    const want = showGuides();
    for (const slot of ['hero', 'second']) {
      const key = slotKey(slot);
      const design = state.get()[key];
      if (!design?.rect || (design.textureUrl !== design.unwrapUrl) === want) continue;
      let next = { ...design, textureUrl: design.unwrapUrl };
      if (want) {
        try {
          next = await guided(design, slotModel(slot));
        } catch (error) {
          console.warn('Направляющие не нарисовались:', error);
          continue;
        }
      }
      if (state.get()[key] === design) state.set({ [key]: next });
    }
  };
  guidesButton?.addEventListener('click', () => {
    guides = !guides;
    render();
    syncGuides();
  });
  state.subscribe(['tab'], syncGuides);
  // «Кадрировать»: то же окно, с тем местом картинки, что сейчас на стакане.
  cropButton?.addEventListener('click', async () => {
    const slot = target;
    const design = state.get()[slotKey(slot)];
    const model = slotModel(slot);
    if (!design?.rect?.file || design.rect.kind === 'page' || !model) return;
    let placement = null;
    try {
      const { readRectSource } = await import('./sizeRect.js');
      const { openCropper } = await import('./rectCropper.js');
      const source = await readRectSource(design.rect.file, model);
      try {
        placement = await openCropper({ image: source.image, width: source.width, height: source.height, rect: rectOf(model), placement: design.rect.placement });
      } finally {
        source.close();
      }
    } catch (error) {
      fail(error);
      return;
    }
    if (placement && state.get()[slotKey(slot)] === design) apply(design.rect.file, slot, null, { as: 'rect', placement });
  });
  replaceButton?.addEventListener('click', () => pick(null));
  for (const b of modeButtons) {
    b.addEventListener('click', () => {
      const s = state.get();
      if (s.printMode === b.dataset.mode) return;
      // Макет одного вида другому не подходит (поле и стороны) — снимается;
      // исходник переносится, если он того же вида (carry).
      state.set({ printMode: b.dataset.mode, design: null, design2: null });
    });
  }
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
    const modes = printModesOf(catalog.model(s.modelId));
    if (modeBox) modeBox.hidden = modes.length < 2;
    if (modeNote) {
      modeNote.hidden = modes.length !== 1;
      modeNote.textContent = modes.length === 1 ? `${PRINT_LABELS[modes[0]]} · стороны А и Б` : '';
    }
    for (const b of modeButtons) {
      const on = b.dataset.mode === s.printMode;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-checked', String(on));
    }
    if (pet && sideNote) {
      const [zw, zh] = zoneMmOf(model.textureMapping.sides);
      sideNote.textContent = `Зона стороны — ${Math.round(zw)} × ${Math.round(zh)} мм, логотип встаёт по центру. Шаблон Формации (PDF, AI) — обе стороны сразу. Без Б — печать с одной стороны.`;
    }
    if (button) button.hidden = pet || CONFIG.ui.uploadButton === false;
    if (sideBox) sideBox.hidden = !pet;
    const rect = rectOf(model);
    const asRect = Boolean(rect) && form === 'rect';
    if (formBox) formBox.hidden = !rect;
    for (const b of formButtons) {
      const on = b.dataset.form === form;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-checked', String(on));
    }
    const rectShown = asRect && Boolean(design?.rect);
    if (formNote) {
      // Пояснение — только там, где без него не обойтись: прямоугольник до
      // загрузки (что грузить и где шаблон SIZE).
      formNote.hidden = !asRect || Boolean(design);
      if (formNote.hidden) formNote.replaceChildren();
      else {
        const link = Object.assign(document.createElement('a'), { className: 'art-form__link', href: rect.template ?? '#', textContent: 'Шаблон SIZE (PDF)' });
        link.setAttribute('download', '');
        formNote.replaceChildren('Рисунок в прямоугольнике из файла SIZE — согнём в конус сами. ', ...(rect.template ? [link] : []));
      }
    }
    if (guidesButton) {
      // Только на 3D (showGuides): на развёртке и в «Фотореале» их не видно.
      guidesButton.hidden = !rectShown || s.tab !== '3d';
      guidesButton.setAttribute('aria-pressed', String(guides));
    }
    if (cropButton) cropButton.hidden = !rectShown || design.rect.kind === 'page';
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
    // Надписи зоны: у главного — загружен ли макет и какой; у второго — чей
    // макет на нём сейчас.
    const pair = target === 'second' && second?.id === s.modelId;
    const shown = Boolean(design) && !pet;
    // Загруженный макет — карточка файла: миниатюра того, что рисовал клиент
    // (у прямоугольника — сам прямоугольник, а не согнутый конус), имя, статус.
    button?.classList.toggle('is-loaded', shown);
    thumb.hidden = !shown;
    if (anim) anim.hidden = shown;
    const thumbUrl = design?.rect?.url ?? design?.textureUrl;
    if (shown && thumb.dataset.src !== thumbUrl) {
      thumb.src = thumbUrl;
      thumb.dataset.src = thumbUrl;
    }
    // Статус карточки — разрешение для печати: меньше 300 dpi в печать не примут.
    const lowDpi = Boolean(design?.dpi && design.dpi < PRINT_DPI);
    const dpiText = design?.dpi ? `≈ ${design.dpi} dpi${lowDpi ? ` — для печати нужно ${PRINT_DPI}` : ''}` : null;
    hint?.classList.toggle('is-warning', shown && lowDpi);
    if (title && hint) {
      if (target !== 'second') {
        const source = sources[which()];
        const name = source?.kind === 'file' || source?.kind === 'rect' ? source.file.name : null;
        title.textContent = design ? (name ?? 'Макет на стакане') : asRect ? 'Загрузить прямоугольник' : defaults.title;
        // Длинное имя обрезается многоточием — целиком оно в подсказке.
        if (button) button.title = design && name ? name : '';
        hint.textContent = !design
          ? asRect ? 'PDF, AI, PNG или JPG — рисунок в рамке SIZE или картинка, её можно кадрировать' : defaults.hint
          : design.rect
            ? ['Прямоугольник', dpiText].filter(Boolean).join(' · ')
            : ['Готовый макет', dpiText].filter(Boolean).join(' · ');
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
    // Панель действий — когда макет есть: нижняя строка карточки макета. У
    // тампопечати заменяют по стороне (плитки А/Б), «Убрать» снимает обе.
    if (actionsBox) actionsBox.hidden = !design;
    button?.classList.toggle('has-actions', Boolean(design) && !pet);
    if (replaceButton) replaceButton.hidden = pet;
    // У пары «Убрать» свой макет второго — значит вернуть макет первого.
    const clearText = pair ? 'Вернуть макет первого' : 'Убрать макет';
    clearButton?.setAttribute('aria-label', clearText);
    if (clearButton) clearButton.dataset.tip = clearText;
  };
  state.subscribe(['modelId', 'printMode', 'design', 'design2', 'photo', 'tab', 'sceneId'], render);
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
  clearButton?.addEventListener('click', () => {
    if (target === 'second') {
      state.set({ design2: null });
      return;
    }
    remember(null);
    state.set({ design: null });
  });

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

  // Макет с прошлого раза: кладётся, как только стакан выбран (сессия его
  // уже выбрала — сразу).
  Promise.all([loadDesignSource('hero'), loadDesignSource('hero-rect')]).then(([sheetSaved, rectSaved]) => {
    if (sources.sheet || sources.rect || state.get().design) return;
    // До двух видов прямоугольник хранился в той же записи «hero».
    if (sheetSaved?.kind === 'rect' && !rectSaved) [sheetSaved, rectSaved] = [null, sheetSaved];
    sources.sheet = sheetSaved ?? null;
    sources.rect = rectSaved ?? null;
    if (state.get().modelId && sources[which()]) carry('restore');
    render();
  });

  const api = { apply };
  if (CONFIG.ui.dragAndDrop === false || !overlay) return api;
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
  return api;
}

// Сцена кадра из «Моих рендеров» — обратно в «Фотореал»: стаканы, картон,
// сцена, ракурс, формат, углы; макеты — те растры, что ушли в рендер (сервер
// хранит их 30 дней). У PET на сервере сведённый лист сторон — разобрать его
// на А и Б нельзя, такой макет загружается заново.
async function restoreJob({ job, arts }, { state, catalog, feedback, upload }) {
  const [hero, second] = job.cups;
  const heroModel = catalog.model(hero?.id);
  if (!heroModel) {
    feedback.onToast('Этого стакана больше нет на сайте', 'error');
    return;
  }
  const secondModel = second ? catalog.model(second.id) : null;
  const materialId = hero.board && heroModel.materialCompatibility.includes(hero.board) ? hero.board : heroModel.defaultMaterial;
  state.set({
    modelId: heroModel.id,
    materialId,
    // Кадр снимали с имитацией картона — в редакторе она тоже включена.
    proof: Boolean(hero.proof),
    design: null,
    design2: null,
    tab: 'scene',
    sceneId: job.set,
    photo: {
      preset: job.camera.preset,
      frame: job.camera.frame,
      second: secondModel ? { modelId: secondModel.id, kind: secondModel.id === heroModel.id ? 'pair' : 'side' } : null,
      angles: job.cups.map((cup) => cup.rotate ?? 0),
    },
  });
  const fetchArt = async (url) => {
    const res = await fetch(url, { credentials: 'same-origin' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const blob = await res.blob();
    return new File([blob], blob.type.includes('png') ? 'макет.png' : 'макет.jpg', { type: blob.type });
  };
  const notes = [];
  try {
    const first = arts[0] ? await fetchArt(arts[0]) : null;
    if (first && heroModel.textureMapping?.sides) notes.push('макет прозрачного стакана загрузите заново');
    else if (first) await upload?.apply(first, 'hero');
    // У пары без своего макета на сервере лежит копия главного — свой не нужен.
    const other = arts[1] ? await fetchArt(arts[1]) : null;
    const same = Boolean(other && first) && other.size === first.size && secondModel?.id === heroModel.id
      && sameBytes(new Uint8Array(await first.arrayBuffer()), new Uint8Array(await other.arrayBuffer()));
    if (other && !same) {
      if (secondModel?.textureMapping?.sides) notes.push('макет второго (прозрачного) загрузите заново');
      else await upload?.apply(other, 'second');
    }
  } catch (error) {
    console.warn('Макет кадра не вернулся:', error);
    notes.push('макет уже не хранится — загрузите заново');
  }
  feedback.onToast(notes.length ? `Сцена кадра открыта · ${notes.join(' · ')}` : 'Сцена кадра открыта — поправьте и нажмите «Рендер»',
    notes.length ? 'warning' : 'success');
}

const sameBytes = (a, b) => a.length === b.length && a.every((value, index) => value === b[index]);
