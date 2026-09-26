// «Фотореал» (CupViewer v2) в Design Mode: фон сцены (панель справа от кадра),
// ракурс и формат (строка над кадром), второй стакан (левая панель, на
// телефоне — нижняя) и задание рендера. Раскладку собирает пользователь,
// клиент по ссылке её только смотрит (право arrangeScene).
//
// Источник истины — ViewerState: сцена — sceneId, остальное — photo { preset,
// frame, second }. Здесь только показ состояния и намерения, сцену доводит
// движок (bindEngine). Стаканы в сцене не двигаются — места выбирает
// раскладка, как у рендера; повернуть стакан можно жестом по кадру.

import { PHOTO_FRAMES } from '../state/viewerState.js';
import { sceneFolder } from '../catalog/catalog.js';

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

// Раскладка второго: тот же стакан — пара в линию (другой стороной), другой —
// сбоку от главного, как у рендера (run.py --second).
const secondFor = (modelId, heroId) => ({ modelId, kind: modelId === heroId ? 'pair' : 'side' });

// Задание рендера с макетами. Растр макета — тот же, что лёг на 3D-модель
// (развёртка в полном размере, design.unwrapUrl), исходник не уходит. Пока
// сервера нет (этап Г), задание принимает dev-сервер (scripts/renderJobApi.mjs)
// и кладёт папкой в render/jobs/; без него — JSON скачивается как раньше.
async function uploadRaster(url) {
  const blob = await (await fetch(url)).blob();
  const res = await fetch('api/snapshot-assets', { method: 'POST', body: blob });
  if (!res.ok) throw new Error(`растр: ${res.status}`);
  return (await res.json()).assetId;
}

export async function sendRenderJob({ viewer, state, catalog }) {
  const job = viewer.photoJob();
  if (!job) return null;
  const s = state.get();
  // Картон бумажного стакана — тот же набор, что у рендера (render/engine/params/boards.json).
  for (const cup of job.cups) {
    if (catalog.model(cup.id)?.type === 'paper') cup.board = s.materialId;
  }
  // Макеты: у главного — свой; у второго — свой (design2), у пары без своего —
  // главного. Стакан без макета — чистый: иначе рендер взял бы печать из файла
  // модели (там тестовый рисунок).
  const arts = {};
  const raster = (d) => d?.unwrapUrl ?? d?.textureUrl ?? null;
  const hero = raster(s.design);
  if (hero) arts[0] = await uploadRaster(hero);
  if (job.cups[1]) {
    const own = raster(s.design2);
    if (own) arts[1] = await uploadRaster(own);
    else if (hero && job.cups[1].id === job.cups[0].id) arts[1] = arts[0];
  }
  job.cups.forEach((cup, index) => {
    if (!arts[index]) cup.print = 'none';
  });
  const res = await fetch('api/render-job', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ job, arts }),
  });
  if (!res.ok) throw new Error(`задание: ${res.status}`);
  return res.json();
}

export function initPhotoPanel({ state, viewer, catalog, mode, picker, feedback, cupPhoto, describe }) {
  const panel = document.getElementById('photo-panel');
  const bar = document.getElementById('photo-bar');
  const secondBox = document.getElementById('second-cup');
  const secondItem = document.getElementById('action-second');
  if (!mode.can('arrangeScene')) {
    for (const node of [panel, bar, secondBox, secondItem]) node?.remove();
    return;
  }
  if (!panel) return;

  const photo = () => state.get().photo ?? { preset: null, frame: '1:1', second: null };
  const patch = (next) => state.set({ photo: { ...photo(), ...next } });

  // ── фон: сцены карточками ───────────────────────────────────────────────
  const sceneBox = document.getElementById('photo-scenes');
  const sceneButtons = catalog.scenes.map((scene) => {
    const button = el('button', { type: 'button', class: 'scene-card', role: 'radio', title: scene.note ?? '' },
      el('img', { class: 'scene-card__img', src: `${sceneFolder(scene.id)}/thumb.webp`, alt: '', loading: 'lazy', decoding: 'async' }),
      el('span', { class: 'scene-card__name', text: scene.name }));
    button.dataset.id = scene.id;
    button.addEventListener('click', () => state.set({ sceneId: scene.id, tab: 'scene' }));
    sceneBox.append(button);
    return button;
  });

  // ── ракурс: стрелки по кругу и точки ────────────────────────────────────
  const dotBox = document.getElementById('photo-angles');
  const arrows = [...(bar?.querySelectorAll('[data-step]') ?? [])];
  let presets = [];
  let dots = [];
  const presetId = () => {
    const id = photo().preset;
    return presets.some((p) => p.id === id) ? id : presets[0]?.id ?? null;
  };
  for (const arrow of arrows) {
    arrow.addEventListener('click', () => {
      if (presets.length < 2) return;
      const i = presets.findIndex((p) => p.id === presetId());
      const next = (i + Number(arrow.dataset.step) + presets.length) % presets.length;
      patch({ preset: presets[next].id });
    });
  }

  // ── формат ──────────────────────────────────────────────────────────────
  const frameBox = document.getElementById('photo-frames');
  const frameButtons = PHOTO_FRAMES.map((id) => {
    const button = el('button', { type: 'button', class: 'segmented__item', role: 'radio', text: id });
    button.dataset.id = id;
    button.addEventListener('click', () => patch({ frame: id }));
    frameBox?.append(button);
    return button;
  });

  // ── второй стакан ───────────────────────────────────────────────────────
  // Выбор — то же окно, что у главного; тот же стакан — пара.
  const addButton = document.getElementById('second-add');
  const card = document.getElementById('second-card');
  const note = document.getElementById('second-note');
  const art = document.getElementById('second-art');
  const name = document.getElementById('second-name');
  const meta = document.getElementById('second-meta');
  const itemIcon = document.getElementById('action-second-icon');
  const itemName = document.getElementById('action-second-name');
  const pick = (from) => picker?.pickSecond({
    activeId: photo().second?.modelId ?? null,
    from,
    onSelect: (id) => patch({ second: secondFor(id, state.get().modelId) }),
    onRemove: photo().second ? () => patch({ second: null }) : null,
  });
  addButton?.addEventListener('click', (event) => pick(event.currentTarget));
  document.getElementById('second-btn')?.addEventListener('click', (event) => pick(event.currentTarget));
  document.getElementById('second-remove')?.addEventListener('click', () => patch({ second: null }));
  secondItem?.addEventListener('click', (event) => !secondItem.disabled && pick(event.currentTarget));

  // Сменился главный: пара следует за ним, другой стакан остаётся собой.
  state.subscribe(['modelId'], (s) => {
    const second = photo().second;
    if (!second) return;
    patch({ second: secondFor(second.kind === 'pair' ? s.modelId : second.modelId, s.modelId) });
  });

  // ── показ ───────────────────────────────────────────────────────────────
  let shownScene = null;
  let shownSecond = null;
  const render = () => {
    const s = state.get();
    const on = s.tab === 'scene';
    for (const node of [panel, bar, secondBox, secondItem]) if (node) node.hidden = !on;
    const scene = catalog.scene(s.sceneId);
    const p = photo();

    for (const button of sceneButtons) radio(button, button.dataset.id === s.sceneId);

    if (scene && scene.id !== shownScene) {
      shownScene = scene.id;
      presets = scene.presets ?? [];
      dots = presets.map((preset, i) => {
        const dot = el('button', { type: 'button', class: 'angle-switch__dot', role: 'radio', 'aria-label': `Ракурс ${i + 1} из ${presets.length}` });
        dot.dataset.id = preset.id;
        dot.addEventListener('click', () => patch({ preset: preset.id }));
        return dot;
      });
      dotBox?.replaceChildren(...dots);
      for (const arrow of arrows) arrow.disabled = presets.length < 2;
    }
    for (const dot of dots) radio(dot, dot.dataset.id === presetId());
    for (const button of frameButtons) radio(button, button.dataset.id === (p.frame ?? '1:1'));

    // В сцене на один стакан второй не показывается, но желание остаётся —
    // в другой сцене он вернётся (движок делает так же).
    const oneCup = (scene?.maxCups ?? 2) < 2;
    const second = oneCup ? null : catalog.model(p.second?.modelId);
    if (card) card.hidden = !second;
    if (addButton) {
      addButton.hidden = Boolean(second);
      addButton.disabled = oneCup;
    }
    if (note) note.hidden = !oneCup;
    const pair = second?.id === s.modelId;
    if (second && second.id !== shownSecond) {
      art?.replaceChildren(...cupPhoto(second));
      if (name) name.textContent = `${second.volumeMl} мл`;
    }
    if (second && meta) meta.textContent = pair ? 'Такой же, другой стороной' : describe(second);
    shownSecond = second?.id ?? null;
    if (secondItem) {
      secondItem.disabled = oneCup;
      itemIcon?.setAttribute('href', `assets/icons/sprite.svg#${second ? 'cup' : 'plus'}`);
      if (itemName) itemName.textContent = pair ? 'Пара' : second ? `${second.volumeMl} мл` : 'Второй';
    }
  };
  state.subscribe(['tab', 'sceneId', 'photo', 'modelId'], render);
  render();

  const jobButton = document.getElementById('photo-job');
  jobButton?.addEventListener('click', async () => {
    jobButton.disabled = true;
    try {
      const saved = await sendRenderJob({ viewer, state, catalog });
      if (saved) {
        await navigator.clipboard?.writeText(saved.command).catch(() => {});
        feedback?.onToast(`Задание в ${saved.dir} — команда рендера скопирована`, 'success');
      }
    } catch {
      // Без dev-сервера (статический хостинг) — задание без макета, файлом.
      const job = viewer.photoJob();
      if (job) {
        const stamp = new Date().toISOString().slice(0, 16).replace(/[-:T]/g, '');
        download(`job_${job.set}_${stamp}.json`, `${JSON.stringify(job, null, 1)}\n`);
      }
    } finally {
      jobButton.disabled = false;
    }
  });
}
