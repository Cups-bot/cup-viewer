// Раздел «Отделка»: маски конгрева, фольги и металлик-краски для бумажного
// стакана. Маска — файл той же развёртки, что макет: чёрное — где отделка.
// В состояние уходит finish = { emboss: {url, depth}, foil: {url, color}, ink: {url, color} };
// движок собирает из масок текстуру отделок (core/finishMap.js).

import { EMBOSS_DEPTHS, FINISH_KINDS, FINISH_LABELS, FOILS, INKS, isHex } from '../catalog/finishes.js';
import { EMBOSS_DEPTH_MM } from '../core/finishMap.js';
import { DesignError, prepareDesign } from './prepareDesign.js';
import { MESSAGES } from '../ui/messages.js';

const HINTS = {
  emboss: 'Выпуклый рисунок без краски',
  foil: 'Блестит сильнее всего, вдавлена на 0,2 мм',
  ink: 'Металлизированный пантон — мягкий блеск',
};

const mm = (value) => `${String(value).replace('.', ',')} мм`;

export function initFinishPanel({ state, mode, catalog, feedback }) {
  const section = document.getElementById('finish');
  const rows = document.getElementById('finish-rows');
  const input = document.getElementById('finish-input');
  if (!section || !rows || !input) return;

  // Имя файла маски и освобождение её blob-URL — по виду отделки.
  const files = {};
  let loadingKind = null;
  let seq = 0;

  const model = () => catalog.model(state.get().modelId);
  const finish = () => state.get().finish ?? {};

  const release = (kind) => {
    files[kind]?.release();
    delete files[kind];
  };

  const write = (next) => {
    const clean = Object.fromEntries(Object.entries(next).filter(([, v]) => v));
    state.set({ finish: Object.keys(clean).length ? clean : null });
  };

  const setPart = (kind, part) => write({ ...finish(), [kind]: part });

  const swatch = (option, active, onPick) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `swatch${active ? ' is-active' : ''}`;
    button.style.background = option.swatch;
    button.setAttribute('aria-label', option.label);
    button.setAttribute('aria-pressed', String(active));
    button.dataset.tip = option.label;
    button.addEventListener('click', onPick);
    return button;
  };

  const options = (kind, part) => {
    const box = document.createElement('div');
    box.className = 'finish-row__opts';
    if (kind === 'foil') {
      const own = isHex(part.color) ? part.color : null;
      for (const foil of FOILS) {
        box.append(swatch(foil, part.color === foil.id, () => setPart('foil', { ...part, color: foil.id })));
      }
      // Свой цвет фольги — любой: системный выбор цвета под кружком.
      const label = document.createElement('label');
      label.className = `swatch finish-row__custom${own ? ' is-active' : ''}`;
      label.dataset.tip = 'Свой цвет';
      if (own) label.style.background = own;
      const picker = document.createElement('input');
      picker.type = 'color';
      picker.value = own ?? '#c0392b';
      picker.setAttribute('aria-label', 'Свой цвет фольги');
      picker.addEventListener('change', () => setPart('foil', { ...part, color: picker.value }));
      label.append(picker);
      box.append(label);
    } else if (kind === 'ink') {
      for (const ink of INKS) {
        box.append(swatch(ink, part.color === ink.id, () => setPart('ink', { ...part, color: ink.id })));
      }
    } else {
      const group = document.createElement('div');
      group.className = 'segmented finish-row__depth';
      group.setAttribute('role', 'radiogroup');
      group.setAttribute('aria-label', 'Высота конгрева');
      for (const depth of EMBOSS_DEPTHS) {
        const item = document.createElement('button');
        item.type = 'button';
        item.className = 'segmented__item';
        item.setAttribute('role', 'radio');
        item.setAttribute('aria-checked', String(part.depth === depth));
        item.textContent = mm(depth);
        item.addEventListener('click', () => setPart('emboss', { ...part, depth }));
        group.append(item);
      }
      box.append(group);
    }
    return box;
  };

  const render = () => {
    const paper = model()?.type === 'paper';
    section.hidden = !paper;
    if (!paper) return;
    const current = finish();
    rows.replaceChildren(
      ...FINISH_KINDS.map((kind) => {
        const part = current[kind];
        const row = document.createElement('div');
        row.className = `finish-row${part ? ' is-set' : ''}`;
        row.dataset.kind = kind;

        const load = document.createElement('button');
        load.type = 'button';
        load.className = 'finish-row__file';
        const name = document.createElement('span');
        name.className = 'finish-row__name';
        name.textContent = FINISH_LABELS[kind];
        const hint = document.createElement('span');
        hint.className = 'finish-row__hint';
        hint.textContent = loadingKind === kind ? 'Обрабатываем маску…' : part ? files[kind]?.name ?? 'Маска загружена' : HINTS[kind];
        load.append(name, hint);
        load.addEventListener('click', () => pick(kind));
        row.append(load);

        if (part) {
          const remove = document.createElement('button');
          remove.type = 'button';
          remove.className = 'icon-btn finish-row__remove';
          remove.setAttribute('aria-label', `Убрать: ${FINISH_LABELS[kind].toLowerCase()}`);
          remove.dataset.tip = 'Убрать';
          remove.dataset.tipSide = 'left';
          remove.innerHTML = '<svg class="icon" aria-hidden="true"><use href="assets/icons/sprite.svg#trash" /></svg>';
          remove.addEventListener('click', () => {
            release(kind);
            setPart(kind, null);
          });
          row.append(remove, options(kind, part));
        } else {
          const add = document.createElement('span');
          add.className = 'finish-row__add';
          add.setAttribute('aria-hidden', 'true');
          add.innerHTML = '<svg class="icon"><use href="assets/icons/sprite.svg#plus" /></svg>';
          load.append(add);
        }
        return row;
      }),
    );
  };

  let pending = null;
  const pick = (kind) => {
    if (!mode.check('uploadDesign', 'загрузить маску')) return;
    pending = kind;
    input.value = '';
    input.click();
  };

  input.addEventListener('change', async () => {
    const file = input.files?.[0];
    const kind = pending;
    const cup = model();
    if (!file || !kind || !cup) return;
    const token = ++seq;
    loadingKind = kind;
    render();
    let prepared;
    try {
      // Прозрачное в маске — без отделки, и у PDF тоже.
      prepared = await prepareDesign(file, cup, { transparent: true });
    } catch (error) {
      if (token === seq) {
        loadingKind = null;
        render();
      }
      console.warn('Маска не загрузилась:', error);
      const text =
        error instanceof DesignError && error.reason === 'too-big'
          ? MESSAGES.fileTooBig
          : error instanceof DesignError && error.reason === 'unsupported'
            ? MESSAGES.formatUnsupported
            : MESSAGES.designFailed;
      feedback.onToast(text, 'error');
      return;
    }
    if (token !== seq || model() !== cup) {
      prepared.release();
      return;
    }
    loadingKind = null;
    release(kind);
    files[kind] = { name: file.name, release: prepared.release };
    const before = finish()[kind];
    const part =
      kind === 'emboss'
        ? { url: prepared.unwrapUrl, depth: before?.depth ?? EMBOSS_DEPTH_MM }
        : { url: prepared.unwrapUrl, color: before?.color ?? (kind === 'foil' ? FOILS[0].id : INKS[0].id) };
    setPart(kind, part);
  });

  // Маски — под развёртку стакана: на другом стакане они легли бы мимо.
  let modelId = state.get().modelId;
  state.subscribe(['modelId'], (s) => {
    if (s.modelId === modelId) return;
    modelId = s.modelId;
    seq++;
    loadingKind = null;
    for (const kind of FINISH_KINDS) release(kind);
    if (s.finish) state.set({ finish: null });
    else render();
  });
  state.subscribe(['finish'], render);
  render();
}
