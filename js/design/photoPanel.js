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
import { api, errorText, tokensText } from '../account/account.js';

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

// Задание рендера с макетами: раскладка сцены (viewer.photoJob), картон
// бумажных стаканов и растры макетов — те же, что легли на 3D-модели
// (развёртка в полном размере, у PET — сведённый лист сторон), исходник не
// уходит. У главного — свой макет; у второго — свой (design2), у пары без
// своего — главного. Стакан без макета — чистый: иначе рендер взял бы печать из
// файла модели (там тестовый рисунок).
export function buildJob({ viewer, state, catalog }) {
  const job = viewer.photoJob();
  if (!job) return null;
  const s = state.get();
  // Задание — то, что в кадре. Кадр ещё не догнал выбор (стакан грузится или
  // не загрузился) — такое задание ушло бы с другими стаканами, чем на экране.
  const scene = catalog.scene(s.sceneId);
  const second = (scene?.maxCups ?? 2) > 1 ? s.photo?.second?.modelId ?? null : null;
  if (job.cups[0]?.id !== s.modelId || (job.cups[1]?.id ?? null) !== second) return null;
  // Картон — тот же набор, что у рендера (render/engine/params/boards.json).
  for (const cup of job.cups) {
    if (catalog.model(cup.id)?.type === 'paper') cup.board = s.materialId;
  }
  const raster = (d) => d?.unwrapUrl ?? d?.textureUrl ?? null;
  const rasters = [raster(s.design)];
  if (job.cups[1]) rasters.push(raster(s.design2) ?? (job.cups[1].id === job.cups[0].id ? rasters[0] : null));
  job.cups.forEach((cup, index) => {
    if (!rasters[index]) cup.print = 'none';
  });
  return { job, rasters };
}

const blobOf = async (url) => (await fetch(url)).blob();

// Рендер за токены: задание и растры — на сервер (server/app/jobs.py).
async function submitRender({ viewer, state, catalog }, size) {
  const built = buildJob({ viewer, state, catalog });
  if (!built) return null;
  const form = new FormData();
  form.append('job', JSON.stringify(built.job));
  form.append('size', size);
  const blobs = new Map();
  for (const [index, url] of built.rasters.entries()) {
    if (!url) continue;
    if (!blobs.has(url)) blobs.set(url, await blobOf(url));
    const blob = blobs.get(url);
    form.append(`art${index}`, blob, `art-${index + 1}.${blob.type.includes('png') ? 'png' : 'jpg'}`);
  }
  return api('api/jobs', { method: 'POST', body: form });
}

// Ручное задание (dev-сервер без кабинета, scripts/renderJobApi.mjs): папка
// render/jobs/<время>/ для run.py --job.
async function uploadRaster(url) {
  const res = await fetch('api/render-art', { method: 'POST', body: await blobOf(url) });
  if (!res.ok) throw new Error(`растр: ${res.status}`);
  return (await res.json()).assetId;
}

export async function sendRenderJob({ viewer, state, catalog }) {
  const built = buildJob({ viewer, state, catalog });
  if (!built) return null;
  const arts = {};
  const ids = new Map();
  for (const [index, url] of built.rasters.entries()) {
    if (!url) continue;
    if (!ids.has(url)) ids.set(url, await uploadRaster(url));
    arts[index] = ids.get(url);
  }
  const res = await fetch('api/render-job', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ job: built.job, arts }),
  });
  if (!res.ok) throw new Error(`задание: ${res.status}`);
  return res.json();
}

export function initPhotoPanel({ state, viewer, catalog, mode, picker, feedback, account, cupPhoto, describe }) {
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

  // ── рендер за токены ────────────────────────────────────────────────────
  const renderButton = document.getElementById('photo-render');
  const renderNote = document.getElementById('photo-render-note');
  const sizeButtons = [...document.querySelectorAll('#render-size [data-size]')];
  const jobButton = document.getElementById('photo-job');
  let size = '1600';
  let busy = false;
  const price = () => account?.me?.prices?.[size] ?? (size === '3000' ? 3 : 1);
  const showRender = () => {
    for (const button of sizeButtons) radio(button, button.dataset.size === size);
    const me = account?.me;
    const cost = price();
    const b = me?.balance;
    const enough = Boolean(b) && (b.paid >= cost || b.welcome >= cost);
    // Без сервера (dev) — ручное задание вместо рендера.
    const server = Boolean(account?.available);
    if (jobButton) jobButton.hidden = server;
    renderButton.disabled = busy || !server;
    renderButton.textContent = me && !enough ? 'Пополнить токены' : `Рендер · ${tokensText(cost)}`;
    if (!server) renderNote.textContent = 'Рендер — с сервером CupViewer (python -m server)';
    else if (!me) renderNote.textContent = 'Войдите — 3 кадра бесплатно';
    else if (!enough) renderNote.textContent = `На балансе ${tokensText(b.paid + b.welcome)} — не хватает на кадр`;
    else if (b.paid >= cost) renderNote.textContent = `Кадр без знака · останется ${tokensText(b.paid - cost)}`;
    else renderNote.textContent = `Приветственный токен: кадр с небольшим знаком · осталось ${b.welcome}`;
  };
  for (const button of sizeButtons) {
    button.addEventListener('click', () => {
      size = button.dataset.size;
      showRender();
    });
  }
  account?.onChange(showRender);
  showRender();

  renderButton.addEventListener('click', async () => {
    if (busy || !account?.available) return;
    if (!(await account.requireLogin(renderButton))) return;
    const b = account.me.balance;
    if (b.paid < price() && b.welcome < price()) {
      account.openBuy(renderButton);
      return;
    }
    busy = true;
    showRender();
    try {
      const job = await submitRender({ viewer, state, catalog }, size);
      if (job) {
        const minutes = Math.max(1, Math.round((job.etaSeconds ?? 60) / 60));
        feedback?.onToast(`В очереди${job.position > 1 ? ` · ${job.position}-й` : ''} · готово примерно через ${minutes} мин`, 'success');
        account.watchJobs();
      } else {
        feedback?.onToast('Кадр ещё собирается — нажмите «Рендер» через пару секунд', 'warning');
      }
    } catch (error) {
      if (error.code === 'not_enough_tokens') account.openBuy(renderButton);
      feedback?.onToast(errorText(error, 'Задание не ушло — попробуйте ещё раз'), 'error');
    } finally {
      busy = false;
      await account.refresh();
    }
  });

  jobButton?.addEventListener('click', async () => {
    jobButton.disabled = true;
    try {
      const saved = await sendRenderJob({ viewer, state, catalog });
      if (saved) {
        await navigator.clipboard?.writeText(saved.command).catch(() => {});
        feedback?.onToast(`Задание в ${saved.dir} — команда рендера скопирована`, 'success');
      }
    } catch {
      // Совсем без API (статический хостинг) — задание без макета, файлом.
      const built = buildJob({ viewer, state, catalog });
      if (built) {
        const stamp = new Date().toISOString().slice(0, 16).replace(/[-:T]/g, '');
        download(`job_${built.job.set}_${stamp}.json`, `${JSON.stringify(built.job, null, 1)}\n`);
      }
    } finally {
      jobButton.disabled = false;
    }
  });
}
