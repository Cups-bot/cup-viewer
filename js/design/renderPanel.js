// Кнопка «Рендер»: фотореалистичный кадр стакана на сером фотофоне.
// Задание — то, что на экране: стакан, картон, макет, отделки, поворот к
// камере и наклон камеры; считает Blender на этом компьютере (server/ +
// server/worker.py, start-local.bat). Кадр без знака, хранится на сервере.

import { sceneFolder } from '../catalog/catalog.js';
import { foilOf, inkOf } from '../catalog/finishes.js';

// Серый фотобокс рендера (render/: сцена studio): ракурсы камеры — в его scene.json.
const SCENE = 'studio';
const SIZE = 'standard';
const POLL_MS = 3000;

const ERRORS = {
  too_many_jobs: 'Уже считаются три кадра — дождитесь их',
  bad_finish: 'Отделка не принята: проверьте маски',
  unsupported_media: 'Макет или маска не приняты: нужен PNG или JPG',
  too_large: 'Макет или маска слишком большие для рендера',
};

const minutes = (seconds) => `~${Math.max(1, Math.round((seconds ?? 60) / 60))} мин`;

async function call(url, options) {
  let res;
  try {
    res = await fetch(url, options);
  } catch {
    throw new Error('offline');
  }
  const body = await res.json().catch(() => null);
  if (!res.ok) throw new Error(body?.error ?? (res.status === 404 || res.status === 405 ? 'offline' : `http_${res.status}`));
  return body;
}

// Наклон камеры каждого ракурса сцены, градусы: по матрице камеры (Blender,
// столбцы; третий — ось «назад» камеры, Z — вверх).
let presetsCache = null;
async function presets() {
  presetsCache ??= fetch(`${sceneFolder(SCENE)}/scene.json`)
    .then((res) => res.json())
    .then((scene) =>
      (scene.presets ?? []).map((p) => ({ id: p.id, elevation: (Math.asin(p.camera.matrix[10]) * 180) / Math.PI })),
    )
    .catch(() => [{ id: 'front', elevation: 8 }]);
  return presetsCache;
}

export function initRenderPanel({ state, catalog, viewer, feedback }) {
  const button = document.getElementById('render-btn');
  const dialog = document.getElementById('render-dialog');
  const backdrop = document.getElementById('render-backdrop');
  const frame = document.getElementById('render-frame');
  const status = document.getElementById('render-status');
  const download = document.getElementById('render-download');
  const sub = document.getElementById('render-sub');
  if (!button || !dialog) return;

  let timer = null;
  let current = null;
  const stop = () => {
    clearInterval(timer);
    timer = null;
  };

  const open = () => {
    dialog.hidden = false;
    backdrop.hidden = false;
  };
  const close = () => {
    dialog.hidden = true;
    backdrop.hidden = true;
  };
  document.getElementById('render-close')?.addEventListener('click', close);
  backdrop?.addEventListener('click', close);
  window.addEventListener('keydown', (event) => event.key === 'Escape' && !dialog.hidden && close());

  const spinner = () => {
    const node = document.createElement('span');
    node.className = 'spinner';
    node.setAttribute('aria-hidden', 'true');
    frame.replaceChildren(node);
  };

  const show = (job) => {
    download.hidden = job.status !== 'done';
    if (job.status === 'done') {
      stop();
      const img = document.createElement('img');
      img.className = 'render-dialog__img';
      img.alt = 'Готовый кадр';
      img.src = job.imageUrl;
      frame.replaceChildren(img);
      download.href = `${job.imageUrl}&download=1`;
      status.textContent = 'Готово';
      button.disabled = false;
      return;
    }
    if (job.status === 'failed' || job.status === 'expired') {
      stop();
      frame.replaceChildren();
      status.textContent = job.error ?? 'Не получилось посчитать кадр';
      button.disabled = false;
      return;
    }
    if (job.status === 'rendering') status.textContent = `Считается · ${minutes(job.etaSeconds)}`;
    else if (job.workerOnline === false) status.textContent = 'Ждёт Blender: исполнитель рендера не запущен (start-local.bat)';
    else status.textContent = `В очереди${job.position > 1 ? ` · ${job.position}-й` : ''} · ${minutes(job.etaSeconds)}`;
  };

  const poll = async () => {
    try {
      const { jobs } = await call('api/jobs');
      const job = jobs.find((j) => j.id === current);
      if (job) show(job);
    } catch {
      // Сервер на мгновение недоступен — спросим ещё раз.
    }
  };

  const blobOf = async (url) => (await fetch(url)).blob();
  const ext = (blob) => (blob.type.includes('png') ? 'png' : 'jpg');

  const build = async () => {
    const s = state.get();
    const model = catalog.model(s.modelId);
    const pose = viewer.studioPose();
    if (!model || !pose) return null;
    const list = await presets();
    const preset = list.reduce((best, p) => (Math.abs(p.elevation - pose.elevation) < Math.abs(best.elevation - pose.elevation) ? p : best), list[0]);
    const cup = { id: model.id, rotate: pose.rotate };
    const files = {};
    if (model.type === 'paper') {
      cup.board = s.materialId;
      if (s.proof && catalog.material(s.materialId)?.proof) cup.proof = true;
      const finish = {};
      const f = s.finish ?? {};
      if (f.emboss) {
        finish.emboss = { depth: f.emboss.depth };
        files.emboss0 = f.emboss.url;
      }
      if (f.foil) {
        const foil = foilOf(f.foil.color);
        finish.foil = { color: foil.color, ...(foil.iridescence ? { iridescence: true } : {}) };
        files.foil0 = f.foil.url;
      }
      if (f.ink) {
        finish.ink = { color: inkOf(f.ink.color).color };
        files.ink0 = f.ink.url;
      }
      if (Object.keys(finish).length) cup.finish = finish;
    }
    if (model.textureMapping?.pad && s.printMode === 'pad') cup.print = 'pad';
    const art = s.design?.unwrapUrl ?? s.design?.textureUrl ?? null;
    if (art) files.art0 = art;
    else cup.print = 'none';
    const form = new FormData();
    form.append('job', JSON.stringify({ set: SCENE, camera: { preset: preset.id, frame: '1:1' }, cups: [cup] }));
    form.append('size', SIZE);
    for (const [field, url] of Object.entries(files)) {
      const blob = await blobOf(url);
      form.append(field, blob, `${field}.${ext(blob)}`);
    }
    return { form, name: `${model.volumeMl} мл · ${catalog.material(s.materialId)?.name ?? model.name}` };
  };

  button.addEventListener('click', async () => {
    if (button.disabled) return;
    button.disabled = true;
    stop();
    download.hidden = true;
    spinner();
    status.textContent = 'Отправляем задание…';
    open();
    try {
      const built = await build();
      if (!built) throw new Error('no_model');
      sub.textContent = built.name;
      const job = await call('api/jobs', { method: 'POST', body: built.form });
      current = job.id;
      show(job);
      timer = setInterval(poll, POLL_MS);
    } catch (error) {
      console.warn('Рендер не запустился:', error);
      frame.replaceChildren();
      status.textContent =
        error.message === 'offline'
          ? 'Рендер работает, когда сайт запущен через start-local.bat'
          : ERRORS[error.message] ?? 'Не получилось отправить задание';
      button.disabled = false;
      feedback.onToast(status.textContent, 'error');
    }
  });

  const renderNeeds = ({ modelId }) => {
    if (!timer) button.disabled = !modelId;
  };
  state.subscribe(['modelId'], renderNeeds);
  renderNeeds(state.get());
}
