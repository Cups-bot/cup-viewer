// Панель «Фотореал» (CupViewer v2, этап Б): ракурс сцены, формат кадра,
// стаканы в кадре и задание рендера. Только Design Mode: раскладку собирает
// пользователь, клиент по ссылке её только смотрит (право arrangeScene).
//
// Источник истины — ViewerState.photo { preset, frame, second }: панель
// показывает его и пишет в него намерения; движок доводит сцену (bindEngine).
// Стаканы в сцене не двигаются — места выбирает раскладка, как у рендера;
// повернуть стакан можно жестом по кадру.

import { PHOTO_FRAMES } from '../state/viewerState.js';

const CUP_CHOICES = [
  { id: 'one', label: 'Один', title: 'Один стакан' },
  { id: 'pair', label: 'Пара', title: 'Такой же рядом, развёрнут другой стороной' },
  { id: 'bigger', label: 'Больше', title: 'Рядом — соседний объём больше' },
  { id: 'smaller', label: 'Меньше', title: 'Рядом — соседний объём меньше' },
];

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

function segmented(box, items, onPick) {
  box.replaceChildren();
  return items.map((item) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'segmented__item';
    button.setAttribute('role', 'radio');
    button.setAttribute('aria-checked', 'false');
    button.dataset.id = item.id;
    button.textContent = item.label;
    if (item.title) button.title = item.title;
    button.addEventListener('click', () => onPick(item.id));
    box.appendChild(button);
    return button;
  });
}

function mark(buttons, id) {
  for (const button of buttons) button.setAttribute('aria-checked', String(button.dataset.id === id));
}

function download(name, text) {
  const url = URL.createObjectURL(new Blob([text], { type: 'application/json' }));
  const a = Object.assign(document.createElement('a'), { href: url, download: name });
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function initPhotoPanel({ state, viewer, catalog, mode }) {
  const root = document.getElementById('photo-foot');
  if (!root) return;
  if (!mode.can('arrangeScene')) {
    root.remove();
    return;
  }
  const presetBox = document.getElementById('photo-presets');
  const frameBox = document.getElementById('photo-frames');
  const cupBox = document.getElementById('photo-cups');
  const jobButton = document.getElementById('photo-job');

  const photo = () => state.get().photo ?? { preset: null, frame: '1:1', second: null };
  const patch = (next) => state.set({ photo: { ...photo(), ...next } });

  // Какой выбор «Стаканы» сейчас. Выбор «больше/меньше» помним сами: при смене
  // главного стакана второй должен остаться соседним объёмом нового.
  let choice = 'one';
  const secondFor = (id, modelId) => {
    if (id === 'pair') return { modelId, kind: 'pair' };
    if (id === 'bigger' || id === 'smaller') {
      const other = neighbour(catalog, modelId, id === 'bigger' ? 1 : -1);
      return other ? { modelId: other, kind: 'side' } : null;
    }
    return null;
  };

  let presetButtons = [];
  const frameButtons = segmented(frameBox, PHOTO_FRAMES.map((id) => ({ id, label: id })), (frame) => patch({ frame }));
  const cupButtons = segmented(cupBox, CUP_CHOICES, (id) => {
    const second = secondFor(id, state.get().modelId);
    if (id !== 'one' && !second) return;
    choice = id;
    patch({ second });
  });

  let shownScene = null;
  const render = () => {
    const s = state.get();
    const scene = catalog.scene(s.sceneId);
    root.hidden = s.tab !== 'scene';
    if (scene && scene.id !== shownScene) {
      shownScene = scene.id;
      presetButtons = segmented(presetBox, scene.presets ?? [], (preset) => patch({ preset }));
    }
    const p = photo();
    mark(presetButtons, p.preset && scene?.presets?.some((x) => x.id === p.preset) ? p.preset : scene?.presets?.[0]?.id);
    mark(frameButtons, p.frame ?? '1:1');
    const oneCup = (scene?.maxCups ?? 2) < 2;
    for (const button of cupButtons) {
      const id = button.dataset.id;
      button.disabled = id !== 'one' && (oneCup || !secondFor(id, s.modelId));
      if (id !== 'one' && button.disabled) {
        button.title = oneCup ? 'В этой сцене — один стакан' : 'В серии нет такого объёма';
      } else {
        button.title = CUP_CHOICES.find((c) => c.id === id).title;
      }
    }
    mark(cupButtons, oneCup || !p.second ? 'one' : choice);
  };

  // Сменился главный стакан — второй следует за ним: копия для пары, соседний
  // объём для «больше/меньше» (или один, если соседа нет).
  state.subscribe(['modelId'], (s) => {
    const p = photo();
    if (!p.second) return;
    patch({ second: secondFor(choice, s.modelId) });
  });
  state.subscribe(['tab', 'sceneId', 'photo', 'modelId'], render);
  render();

  jobButton?.addEventListener('click', () => {
    const job = viewer.photoJob();
    if (!job) return;
    const stamp = new Date().toISOString().slice(0, 16).replace(/[-:T]/g, '');
    download(`job_${job.set}_${stamp}.json`, `${JSON.stringify(job, null, 1)}\n`);
  });
}
