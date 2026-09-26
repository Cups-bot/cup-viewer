// Панель «Фотореал» (CupViewer v2): сцена, ракурс, формат кадра, второй
// стакан и задание рендера. Только Design Mode: раскладку собирает
// пользователь, клиент по ссылке её только смотрит (право arrangeScene).
//
// Источник истины — ViewerState: сцена — sceneId, остальное — photo { preset,
// frame, second }. Панель показывает состояние и пишет в него намерения,
// движок доводит сцену (bindEngine). Стаканы в сцене не двигаются — места
// выбирает раскладка, как у рендера; повернуть стакан можно жестом по кадру.

import { PHOTO_FRAMES } from '../state/viewerState.js';
import { sceneFolder } from '../catalog/catalog.js';

// Соседний объём той же серии (тип и стенка — как у стакана), как у рендера
// (run.py --second bigger/smaller).
export function neighbour(catalog, modelId, step) {
  const me = catalog.model(modelId);
  if (!me) return null;
  const row = catalog.models
    .filter((m) => m.type === me.type && m.wall === me.wall)
    .sort((a, b) => a.fullVolumeMl - b.fullVolumeMl);
  return row[row.findIndex((m) => m.id === me.id) + step]?.id ?? null;
}

const el = (tag, attrs = {}, ...children) => {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (key === 'class') node.className = value;
    else if (key === 'text') node.textContent = value;
    else node.setAttribute(key, value);
  }
  node.append(...children.filter(Boolean));
  return node;
};

function radio(button, on) {
  button.setAttribute('aria-checked', String(on));
  button.classList.toggle('is-active', on);
}

function download(name, text) {
  const url = URL.createObjectURL(new Blob([text], { type: 'application/json' }));
  const a = Object.assign(document.createElement('a'), { href: url, download: name });
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// Снимок стакана для строки выбора — те же, что в окне выбора (обе темы).
function cupThumb(model) {
  const box = el('span', { class: 'second-row__art', 'aria-hidden': 'true' });
  if (!model) return box;
  for (const theme of ['light', 'dark']) {
    box.append(el('img', {
      class: `second-row__img second-row__img--${theme}`,
      src: `assets/thumbs/${theme}/${model.id}.webp`,
      alt: '',
      loading: 'lazy',
      decoding: 'async',
    }));
  }
  return box;
}

export function initPhotoPanel({ state, viewer, catalog, mode, picker }) {
  const root = document.getElementById('photo-panel');
  if (!root) return;
  if (!mode.can('arrangeScene')) {
    root.remove();
    return;
  }
  const sceneBox = document.getElementById('photo-scenes');
  const presetBox = document.getElementById('photo-presets');
  const frameBox = document.getElementById('photo-frames');
  const secondBox = document.getElementById('photo-second');

  // ── вкладки узкого экрана ────────────────────────────────────────────────
  // На широком экране вкладки спрятаны и открыты все группы (CSS).
  const tabs = [...root.querySelectorAll('#photo-tabs [data-group]')];
  const groups = [...root.querySelectorAll('.photo-panel__group')];
  const openGroup = (id) => {
    for (const tab of tabs) {
      const on = tab.dataset.group === id;
      tab.setAttribute('aria-selected', String(on));
      tab.classList.toggle('is-active', on);
    }
    for (const group of groups) group.classList.toggle('is-open', group.dataset.group === id);
  };
  for (const tab of tabs) tab.addEventListener('click', () => openGroup(tab.dataset.group));
  openGroup('scene');

  const photo = () => state.get().photo ?? { preset: null, frame: '1:1', second: null };
  const patch = (next) => state.set({ photo: { ...photo(), ...next } });

  // ── сцены карточками ────────────────────────────────────────────────────
  const sceneButtons = catalog.scenes.map((scene) => {
    const button = el('button', { type: 'button', class: 'scene-card', role: 'radio', title: scene.note ?? '' },
      el('img', { class: 'scene-card__img', src: `${sceneFolder(scene.id)}/thumb.webp`, alt: '', loading: 'lazy', decoding: 'async' }),
      el('span', { class: 'scene-card__name', text: scene.name }));
    button.dataset.id = scene.id;
    button.addEventListener('click', () => state.set({ sceneId: scene.id, tab: 'scene' }));
    sceneBox.append(button);
    return button;
  });

  // ── формат ──────────────────────────────────────────────────────────────
  const frameButtons = PHOTO_FRAMES.map((id) => {
    const button = el('button', { type: 'button', class: 'segmented__item', role: 'radio', text: id });
    button.dataset.id = id;
    button.addEventListener('click', () => patch({ frame: id }));
    frameBox.append(button);
    return button;
  });

  // ── второй стакан ───────────────────────────────────────────────────────
  // Что выбрано, помним сами: при смене главного «такой же» и «больше /
  // меньше» следуют за ним, а «другой» остаётся тем, что выбрали.
  let choice = 'none';
  const secondFor = (id, heroId, otherId = null) => {
    if (id === 'pair') return { modelId: heroId, kind: 'pair' };
    if (id === 'bigger' || id === 'smaller') {
      const other = neighbour(catalog, heroId, id === 'bigger' ? 1 : -1);
      return other ? { modelId: other, kind: 'side' } : null;
    }
    if (id === 'other' && otherId) return { modelId: otherId, kind: otherId === heroId ? 'pair' : 'side' };
    return null;
  };
  const choose = (id, otherId = null) => {
    const second = secondFor(id, state.get().modelId, otherId);
    if (id !== 'none' && !second) return;
    choice = id;
    patch({ second });
  };

  const rows = {};
  const row = (id, title, onClick) => {
    const sub = el('span', { class: 'second-row__sub' });
    const button = el('button', { type: 'button', class: 'second-row', role: 'radio' },
      el('span', { class: 'second-row__dot', 'aria-hidden': 'true' }),
      el('span', { class: 'second-row__text' }, el('span', { class: 'second-row__title', text: title }), sub));
    button.addEventListener('click', onClick);
    secondBox.append(button);
    rows[id] = { button, sub };
  };
  row('none', 'Нет', () => choose('none'));
  row('pair', 'Такой же', () => choose('pair'));
  row('bigger', 'Объём больше', () => choose('bigger'));
  row('smaller', 'Объём меньше', () => choose('smaller'));
  row('other', 'Другой стакан…', (event) => {
    picker?.pickSecond({
      activeId: photo().second?.modelId ?? null,
      from: event.currentTarget,
      onSelect: (id) => choose('other', id),
    });
  });

  // ── ракурс и общий показ ────────────────────────────────────────────────
  let presetButtons = [];
  let shownScene = null;
  const render = () => {
    const s = state.get();
    const scene = catalog.scene(s.sceneId);
    root.hidden = s.tab !== 'scene';
    const p = photo();

    for (const button of sceneButtons) radio(button, button.dataset.id === s.sceneId);

    if (scene && scene.id !== shownScene) {
      shownScene = scene.id;
      presetBox.replaceChildren();
      presetButtons = (scene.presets ?? []).map((preset) => {
        const button = el('button', { type: 'button', class: 'segmented__item', role: 'radio', text: preset.label });
        button.dataset.id = preset.id;
        button.addEventListener('click', () => patch({ preset: preset.id }));
        presetBox.append(button);
        return button;
      });
    }
    const presetId = p.preset && scene?.presets?.some((x) => x.id === p.preset) ? p.preset : scene?.presets?.[0]?.id;
    for (const button of presetButtons) radio(button, button.dataset.id === presetId);
    for (const button of frameButtons) radio(button, button.dataset.id === (p.frame ?? '1:1'));

    // Второй стакан: что доступно и что выбрано.
    const hero = catalog.model(s.modelId);
    const oneCup = (scene?.maxCups ?? 2) < 2;
    const bigger = catalog.model(neighbour(catalog, s.modelId, 1));
    const smaller = catalog.model(neighbour(catalog, s.modelId, -1));
    // Какой пункт выбран — по состоянию: оно могло прийти из сессии или ссылки.
    const matches = (id) => p.second && secondFor(id, s.modelId, p.second.modelId)?.modelId === p.second.modelId;
    let current = 'none';
    if (p.second) {
      current = choice !== 'none' && matches(choice) ? choice : (['pair', 'bigger', 'smaller'].find(matches) ?? 'other');
    }
    const other = current === 'other' ? catalog.model(p.second.modelId) : null;
    const subs = {
      none: oneCup ? 'В этой сцене — один стакан' : '',
      pair: hero ? `${hero.name}, другой стороной` : '',
      bigger: bigger ? `${bigger.name} · ${bigger.fullVolumeMl} мл` : 'В серии нет больше',
      smaller: smaller ? `${smaller.name} · ${smaller.fullVolumeMl} мл` : 'В серии нет меньше',
      other: other ? `${other.name} · ${other.fullVolumeMl} мл` : 'Любой из каталога',
    };
    const available = { none: true, pair: !oneCup, bigger: !oneCup && Boolean(bigger), smaller: !oneCup && Boolean(smaller), other: !oneCup };
    const active = oneCup ? 'none' : current;
    choice = current;
    for (const [id, { button, sub }] of Object.entries(rows)) {
      sub.textContent = subs[id];
      button.disabled = !available[id];
      radio(button, id === active);
    }
    const art = rows.other.button.querySelector('.second-row__art');
    if (other && !art) rows.other.button.append(cupThumb(other));
    else if (art && (!other || !art.querySelector(`img[src*="/${other.id}.webp"]`))) {
      art.remove();
      if (other) rows.other.button.append(cupThumb(other));
    }
  };

  // Сменился главный стакан — второй следует за ним («другой» — остаётся).
  state.subscribe(['modelId'], (s) => {
    const p = photo();
    if (!p.second) return;
    patch({ second: secondFor(choice, s.modelId, p.second.modelId) });
  });
  state.subscribe(['tab', 'sceneId', 'photo', 'modelId'], render);
  render();

  document.getElementById('photo-job')?.addEventListener('click', () => {
    const job = viewer.photoJob();
    if (!job) return;
    const stamp = new Date().toISOString().slice(0, 16).replace(/[-:T]/g, '');
    download(`job_${job.set}_${stamp}.json`, `${JSON.stringify(job, null, 1)}\n`);
  });
}
