// «Ссылка клиенту» (§31). Модуль грузится при первом открытии окна.
//
// На сервер уходят только производные растры: 3D-текстура (≤ 2048) и
// развёртка. Исходный файл макета (PDF, имя файла) не отправляется никогда.
// Ссылка с токеном возвращается один раз — сервер хранит только его хеш.

import { encodeCanvas } from '../utils/encode.js';
import { MESSAGES } from '../ui/messages.js';
import { hideLayer, showLayer } from '../ui/motion.js';

const API = { asset: 'api/snapshot-assets', publish: 'api/publish-snapshot' };
const TEXTURE_MAX = 2048;

async function postJson(url, body) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'same-origin',
    body: JSON.stringify(body),
  });
  if (!response.ok) throw Object.assign(new Error(`${url}: HTTP ${response.status}`), { status: response.status });
  return response.json();
}

async function uploadAsset(blob) {
  const response = await fetch(API.asset, {
    method: 'POST',
    headers: { 'Content-Type': blob.type || 'application/octet-stream' },
    credentials: 'same-origin',
    body: blob,
  });
  if (!response.ok) throw Object.assign(new Error(`upload: HTTP ${response.status}`), { status: response.status });
  return (await response.json()).assetId;
}

// 3D-текстура ≤ 2048 по длинной стороне — из того же источника, что на модели.
async function textureRaster(url) {
  const source = await (await fetch(url)).blob();
  const probe = await createImageBitmap(source);
  const scale = Math.min(1, TEXTURE_MAX / Math.max(probe.width, probe.height));
  const width = Math.max(1, Math.round(probe.width * scale));
  const height = Math.max(1, Math.round(probe.height * scale));
  probe.close();
  if (scale === 1 && /image\/(png|jpeg)/.test(source.type)) return source;
  const bitmap = await createImageBitmap(source, { resizeWidth: width, resizeHeight: height, resizeQuality: 'high' });
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  canvas.getContext('2d').drawImage(bitmap, 0, 0);
  bitmap.close();
  try {
    return await encodeCanvas(canvas, 'image/png');
  } finally {
    canvas.width = 0;
  }
}

export async function publishSnapshot({ state, viewer, brandId, title, onStage }) {
  const s = state.get();
  // Фото-сцена: клиент видит её такой, какой её собрал пользователь, — с той
  // же стороной дизайна к камере (углы стаканов в движке, а не в состоянии).
  const angles = viewer?.photo
    ? [viewer.getCupRotation(0), ...(viewer.companion ? [viewer.getCupRotation(1)] : [])].map((a) => Math.round(a * 10) / 10)
    : null;
  const photo = s.photo || angles ? { ...(s.photo ?? {}), angles } : null;
  let textureAsset = null;
  let unwrapAsset = null;
  if (s.design) {
    onStage?.('Готовим растры');
    const texture = await textureRaster(s.design.textureUrl);
    const unwrap = await (await fetch(s.design.unwrapUrl)).blob();
    onStage?.('Загружаем растры');
    textureAsset = await uploadAsset(texture);
    unwrapAsset = s.design.unwrapUrl === s.design.textureUrl && texture.size === unwrap.size ? textureAsset : await uploadAsset(unwrap);
  }
  // Свой макет второго стакана «Фотореала» — только если второй в кадре.
  let texture2Asset = null;
  let unwrap2Asset = null;
  if (s.design2 && s.photo?.second) {
    const texture = await textureRaster(s.design2.textureUrl);
    const unwrap = await (await fetch(s.design2.unwrapUrl)).blob();
    texture2Asset = await uploadAsset(texture);
    unwrap2Asset = s.design2.unwrapUrl === s.design2.textureUrl && texture.size === unwrap.size ? texture2Asset : await uploadAsset(unwrap);
  }
  onStage?.('Создаём ссылку');
  const { token } = await postJson(API.publish, {
    state: {
      modelId: s.modelId,
      materialId: s.materialId,
      backgroundId: s.backgroundId,
      sceneId: s.sceneId,
      photo,
      brandId,
      title: title || null,
    },
    textureAsset,
    unwrapAsset,
    texture2Asset,
    unwrap2Asset,
  });
  return new URL(`view.html?v=${encodeURIComponent(token)}`, window.location.href).href;
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

export function createPublishDialog({ state, mode, catalog, feedback, viewer, account }) {
  const backdrop = el('div', { class: 'dialog-backdrop', hidden: '' });
  const close = el('button', { class: 'icon-btn', type: 'button', 'aria-label': 'Закрыть' });
  close.innerHTML = '<svg class="icon" aria-hidden="true"><use href="assets/icons/sprite.svg#close" /></svg>';

  const brands = el('div', { class: 'segmented', role: 'radiogroup', 'aria-label': 'Бренд' });
  let brandId = catalog.brands[0]?.id ?? null;
  const brandButtons = catalog.brands.map((brand) => {
    const button = el('button', { type: 'button', role: 'radio', class: 'segmented__item', text: brand.name });
    button.addEventListener('click', () => {
      brandId = brand.id;
      renderBrands();
    });
    brands.append(button);
    return [brand.id, button];
  });
  const renderBrands = () => brandButtons.forEach(([id, button]) => button.setAttribute('aria-checked', String(id === brandId)));
  renderBrands();

  const titleInput = el('input', { class: 'text-input', type: 'text', maxlength: '80', placeholder: 'Например, «Кофейня Зерно — стакан 400 мл»', 'aria-label': 'Название для клиента' });
  const status = el('p', { class: 'export-note' });
  const go = el('button', { class: 'btn btn--accent btn--block', type: 'button', text: 'Создать ссылку' });
  const linkInput = el('input', { class: 'text-input', type: 'text', readonly: '', 'aria-label': 'Ссылка для клиента' });
  const copy = el('button', { class: 'btn', type: 'button', text: 'Скопировать' });
  const open = el('a', { class: 'btn', target: '_blank', rel: 'noopener', text: 'Открыть' });
  const result = el('div', { class: 'publish-result', hidden: '' },
    el('p', { class: 'field-label', text: 'Ссылка готова — она показывается один раз' }),
    el('div', { class: 'publish-link' }, linkInput, copy, open));

  const dialog = el('div', { class: 'dialog publish-dialog', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'publish-title', hidden: '' },
    el('div', { class: 'dialog__head' }, el('p', { class: 'dialog__title', id: 'publish-title', text: 'Ссылка клиенту' }), close),
    el('p', { class: 'field-label', text: 'Бренд страницы' }), brands,
    el('p', { class: 'field-label', text: 'Название (необязательно)' }), titleInput,
    el('p', { class: 'export-note', text: 'Клиент увидит стакан с этим макетом, материалом и фоном. Уходят только растры для 3D и развёртки — исходный файл макета не отправляется.' }),
    status, go, result);
  document.body.append(backdrop, dialog);

  let busy = false;
  go.addEventListener('click', async () => {
    if (busy || !mode.check('publish', 'создать ссылку')) return;
    busy = true;
    go.disabled = true;
    result.hidden = true;
    // Ссылка — после входа (§3 концепции): на сервере CupViewer без входа 401.
    const publish = () => publishSnapshot({
      viewer,
      state,
      brandId,
      title: titleInput.value.trim(),
      onStage: (text) => (status.textContent = `${text}…`),
    });
    try {
      let link;
      try {
        link = await publish();
      } catch (error) {
        if (error.status !== 401 || !(await account?.requireLogin(go))) throw error;
        link = await publish();
      }
      status.textContent = '';
      linkInput.value = link;
      open.href = link;
      result.hidden = false;
      linkInput.select();
    } catch (error) {
      console.error('Ссылка не создалась:', error);
      status.textContent = '';
      feedback.onToast(MESSAGES.publishFailed, 'error');
    } finally {
      busy = false;
      go.disabled = false;
    }
  });
  copy.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(linkInput.value);
      feedback.onToast('Ссылка скопирована');
    } catch {
      linkInput.select();
    }
  });

  let opener = null;
  let shown = false;
  const hide = () => {
    shown = false;
    hideLayer(dialog);
    hideLayer(backdrop);
    opener?.focus?.();
  };
  close.addEventListener('click', hide);
  backdrop.addEventListener('click', hide);
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && shown) hide();
  });

  return {
    open(from) {
      opener = from;
      result.hidden = true;
      status.textContent = '';
      shown = true;
      showLayer(backdrop);
      showLayer(dialog);
      titleInput.focus();
    },
  };
}
