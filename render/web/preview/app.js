// Превью кадра: сцена, ракурс, формат, 1–2 стакана, расстановка мышью.
// Всё, что здесь выбрано, уходит в задание для рендера (engine/run.py --job):
// рендер ставит стаканы в те же места и режет тот же кадр.

import { Preview } from './preview.js';
import { ASPECTS, candidates, frameFor, spotOk } from './fit.js';

const $ = (id) => document.getElementById(id);
const canvas = $('view');
const preview = new Preview(canvas, { root: '..' });

const state = { scene: null, preset: null, frame: '1:1', cups: [], warn: [], fit: null };
let catalog = null;
let drag = null;

const info = (id) => catalog.get(id);

function segmented(el, items, current, onPick) {
  el.replaceChildren(...items.map(([id, label]) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = label;
    b.setAttribute('aria-pressed', String(id === current));
    b.addEventListener('click', () => onPick(id));
    return b;
  }));
}

function cupOptions(select, current) {
  const groups = new Map();
  for (const c of catalog.values()) {
    const g = { single: 'Однослойные', double: 'Двухслойные', embossed: 'Вафельные', plastic: 'Пластик PP', pet: 'PET' }[c.group] || c.group;
    if (!groups.has(g)) groups.set(g, []);
    groups.get(g).push(c);
  }
  select.replaceChildren(...[...groups].map(([g, list]) => {
    const og = document.createElement('optgroup');
    og.label = g;
    og.append(...list.map((c) => new Option(`${c.id} · ${c.brimMl} мл`, c.id, false, c.id === current)));
    return og;
  }));
}

// Соседний объём той же серии — как run.py --second bigger/smaller.
function neighbour(id, step) {
  const me = info(id);
  const row = [...catalog.values()].filter((c) => c.type === me.type && c.group === me.group)
    .sort((a, b) => a.brimMl - b.brimMl);
  const k = row.findIndex((c) => c.id === id) + step;
  return row[k]?.id || null;
}

// Раскладка второго стакана — как compose._second: в линию по центру
// прежнего места, потом сбоку; место по карте высот, кадр — в снимке фона.
function layout(kind) {
  const sc = preview.scene;
  const hero = state.cups[0], second = state.cups[1];
  const hi = info(hero.id), si = info(second.id);
  let best = null, found = false;
  for (const allowStep of [false, true]) {
    for (const [h, s] of candidates(kind, hi, si)) {
      if ((h[0] || h[1]) && !spotOk(sc, hi, h, [], false).ok) continue;
      const chk = spotOk(sc, si, s, [{ posMm: h, info: hi }], allowStep);
      if (!chk.ok) continue;
      const cups = [{ info: hi, posMm: h, floorMm: 0 }, { info: si, posMm: s, floorMm: chk.floorMm }];
      const fit = frameFor(sc, preview.preset, cups, state.frame);
      const rec = { h, s, floor: chk.floorMm, zoom: fit.zoom };
      if (fit.insideBackdrop) { best = rec; found = true; break; }
      if (!best || rec.zoom < best.zoom) best = rec;
    }
    if (found) break;
  }
  if (!best) {
    state.warn.push('второму стакану нет места в этой сцене');
    state.cups.length = 1;
    return;
  }
  Object.assign(hero, { posMm: best.h, floorMm: 0 });
  Object.assign(second, { posMm: best.s, floorMm: best.floor });
}

function setSecond(id, kind, rotate) {
  const maxCups = preview.scene.maxCups;
  if (maxCups < 2) {
    state.warn = [`в сцене «${preview.scene.label}» один стакан`];
    return render();
  }
  state.cups = [{ ...state.cups[0], posMm: [0, 0], floorMm: 0 }, { id, rotate, posMm: [0, 0], floorMm: 0 }];
  state.warn = [];
  layout(kind);
  return rebuild();
}

function syncControls() {
  const [hero, second] = state.cups;
  $('hero').value = hero.id;
  $('rot0').value = hero.rotate;
  $('rot0v').textContent = `${hero.rotate}°`;
  $('secondBox').hidden = !second;
  if (second) {
    cupOptions($('second'), second.id);
    $('rot1').value = second.rotate;
    $('rot1v').textContent = `${second.rotate}°`;
  }
  const one = preview.scene.maxCups < 2;
  for (const b of ['pair', 'bigger', 'smaller']) $(b).disabled = one;
  $('bigger').disabled ||= !neighbour(hero.id, 1);
  $('smaller').disabled ||= !neighbour(hero.id, -1);
}

function jobText() {
  const job = {
    set: state.scene,
    camera: { preset: state.preset, frame: state.frame },
    cups: state.cups.map((c) => ({ id: c.id, rotate: c.rotate, pos_mm: c.posMm.map((v) => Math.round(v * 10) / 10) })),
  };
  return JSON.stringify(job, null, 1);
}

function safeZone() {
  const m = preview.scene.fit.margin * 100;
  $('safe').innerHTML = `<rect x="${m}" y="${m}" width="${100 - 2 * m}" height="${100 - 2 * m}" fill="none"
    stroke="rgba(255,255,255,.55)" stroke-width=".25" stroke-dasharray="1 1" vector-effect="non-scaling-stroke"/>`;
}

function layoutCanvas() {
  const a = ASPECTS[state.frame];
  const box = $('frame').parentElement;
  const maxW = box.clientWidth - 32;
  const maxH = Math.max(320, window.innerHeight * 0.78);
  const w = Math.min(maxW, maxH * a);
  $('frame').style.width = `${Math.round(w)}px`;
  return Math.min(1600, Math.round(Math.max(w, w / a) * (window.devicePixelRatio || 1)));
}

function render(refit = true) {
  if (!preview.cups.length) return;
  if (refit) {
    state.fit = preview.autoFit();
  }
  preview.render({ longSide: layoutCanvas() });
  const f = state.fit;
  const bad = state.cups.map((c, i) => {
    const others = state.cups.filter((_, j) => j !== i).map((o) => ({ posMm: o.posMm, info: info(o.id) }));
    const r = (c.posMm[0] || c.posMm[1] || c.floorMm) ? spotOk(preview.scene, info(c.id), c.posMm, others, true) : { ok: true };
    preview.markCup(i, !r.ok);
    return r.ok ? null : `${c.id}: ${r.why}`;
  }).filter(Boolean);
  const notes = [...state.warn, ...bad];
  if (f && !f.insideBackdrop) notes.push('кадр шире снимка фона — по краям серое, рендер при этом верный');
  $('status').innerHTML = `${preview.scene.label} · ${state.preset} · ${state.frame} · кадр ×${f ? f.zoom.toFixed(2) : '—'}`
    + (notes.length ? ` · <span class="bad">${notes.join('; ')}</span>` : '');
  $('job').value = jobText();
}

async function rebuild() {
  await preview.setCups(state.cups);
  syncControls();
  render();
}

async function openScene(id) {
  $('loading').classList.add('on');
  try {
    await preview.loadScene(id);
    state.scene = id;
    state.preset = preview.preset.id;
    state.warn = [];
    const hero = state.cups[0] || { id: 'HB80-280', rotate: 0 };
    state.cups = [{ ...hero, posMm: [0, 0], floorMm: 0 }];
    segmented($('presets'), preview.scene.presets.map((p) => [p.id, p.label]), state.preset, pickPreset);
    safeZone();
    await rebuild();
    preview.loadEnvironment().then(() => render(false)).catch(() => {});
  } finally {
    $('loading').classList.remove('on');
  }
}

async function pickPreset(id) {
  $('loading').classList.add('on');
  await preview.setPreset(id);
  state.preset = id;
  segmented($('presets'), preview.scene.presets.map((p) => [p.id, p.label]), id, pickPreset);
  $('loading').classList.remove('on');
  render();
}

function pickFrame(id) {
  state.frame = id;
  preview.setFrame(id);
  segmented($('frames'), Object.keys(ASPECTS).map((k) => [k, k]), id, pickFrame);
  render();
}

// ── мышь: перетаскивание и поворот ─────────────────────────────────────────

function local(ev) {
  const r = canvas.getBoundingClientRect();
  return [(ev.clientX - r.left) / r.width * canvas.width, (ev.clientY - r.top) / r.height * canvas.height];
}

canvas.addEventListener('pointerdown', (ev) => {
  const [x, y] = local(ev);
  const i = preview.pick(x, y, canvas.width, canvas.height);
  if (i < 0) return;
  const at = preview.stageAt(x, y, canvas.width, canvas.height, state.cups[i].floorMm);
  if (!at) return;
  drag = { i, grab: [state.cups[i].posMm[0] - at[0], state.cups[i].posMm[1] - at[1]] };
  canvas.setPointerCapture(ev.pointerId);
  canvas.classList.add('dragging');
});

canvas.addEventListener('pointermove', (ev) => {
  if (!drag) return;
  const [x, y] = local(ev);
  const c = state.cups[drag.i];
  const at = preview.stageAt(x, y, canvas.width, canvas.height, c.floorMm);
  if (!at) return;
  const pos = [at[0] + drag.grab[0], at[1] + drag.grab[1]];
  const others = state.cups.filter((_, j) => j !== drag.i).map((o) => ({ posMm: o.posMm, info: info(o.id) }));
  const chk = spotOk(preview.scene, info(c.id), pos, others, true, 0);
  c.posMm = pos;
  if (chk.ok) c.floorMm = Math.abs(chk.floorMm) < 0.05 ? 0 : chk.floorMm;
  preview.moveCup(drag.i, c.posMm, c.floorMm);
  render(false);                                     // кадр не плывёт, пока тянем
});

function drop() {
  if (!drag) return;
  drag = null;
  canvas.classList.remove('dragging');
  render();
}
canvas.addEventListener('pointerup', drop);
canvas.addEventListener('pointercancel', drop);

canvas.addEventListener('wheel', (ev) => {
  const [x, y] = local(ev);
  const i = preview.pick(x, y, canvas.width, canvas.height);
  if (i < 0) return;
  ev.preventDefault();
  const c = state.cups[i];
  const step = (ev.shiftKey ? 1 : 5) * Math.sign(ev.deltaY || ev.deltaX);
  c.rotate = ((((c.rotate + step) + 180) % 360) + 360) % 360 - 180;
  preview.moveCup(i, c.posMm, c.floorMm, c.rotate);
  syncControls();
  render(false);
}, { passive: false });

// ── панель ─────────────────────────────────────────────────────────────────

$('scene').addEventListener('change', (ev) => openScene(ev.target.value));
$('hero').addEventListener('change', (ev) => {
  state.cups[0].id = ev.target.value;
  if (state.cups[1]) return setSecond(state.cups[1].id === state.cups[0].id ? ev.target.value : state.cups[1].id, 'side', state.cups[1].rotate);
  state.cups[0].posMm = [0, 0];
  state.cups[0].floorMm = 0;
  rebuild();
});
$('second').addEventListener('change', (ev) => setSecond(ev.target.value, ev.target.value === state.cups[0].id ? 'pair' : 'side', state.cups[1].rotate));
for (const k of [0, 1]) {
  $(`rot${k}`).addEventListener('input', (ev) => {
    const c = state.cups[k];
    c.rotate = Number(ev.target.value);
    $(`rot${k}v`).textContent = `${c.rotate}°`;
    preview.moveCup(k, c.posMm, c.floorMm, c.rotate);
    render(false);
  });
}
$('pair').addEventListener('click', () => setSecond(state.cups[0].id, 'pair', ((state.cups[0].rotate + 150 + 180) % 360) - 180));
$('bigger').addEventListener('click', () => setSecond(neighbour(state.cups[0].id, 1), 'side', state.cups[0].rotate));
$('smaller').addEventListener('click', () => setSecond(neighbour(state.cups[0].id, -1), 'side', state.cups[0].rotate));
$('single').addEventListener('click', () => {
  state.cups = [{ ...state.cups[0], posMm: [0, 0], floorMm: 0 }];
  state.warn = [];
  rebuild();
});
$('copy').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText($('job').value);
    $('copy').textContent = 'Скопировано';
  } catch {
    $('job').select();
    $('copy').textContent = 'Выделено — Ctrl+C';
  }
  setTimeout(() => { $('copy').textContent = 'Скопировать'; }, 1500);
});
window.addEventListener('resize', () => render(false));

async function boot() {
  catalog = await preview.loadCatalog();
  const { scenes } = await preview.json('scenes/index.json');
  $('scene').replaceChildren(...scenes.map((s) => new Option(s.label, s.id)));
  cupOptions($('hero'), 'HB80-280');
  segmented($('frames'), Object.keys(ASPECTS).map((k) => [k, k]), state.frame, pickFrame);
  const first = scenes.find((s) => s.id === 'living') ? 'living' : scenes[0].id;
  $('scene').value = first;
  await openScene(first);
  window.__preview = { preview, state };
}

boot().catch((err) => {
  $('status').innerHTML = `<span class="bad">Ошибка: ${err.message}</span>`;
  console.error(err);
});
