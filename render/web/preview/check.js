// Сверка превью с рендером: маска из Blender против того же кадра в three.js.
// Итог — в window.__check (его читает и автоматика).

import { Preview } from './preview.js';

const CHECK = '../../out/preview_check';
const LIMIT_PX = 2;
const SNAP = new URLSearchParams(location.search).has('snap');   // ?snap — сохранить и обычный кадр превью

function binarize(data, w, h) {
  const m = new Uint8Array(w * h);
  for (let i = 0; i < w * h; i++) m[i] = data[i * 4] >= 128 ? 1 : 0;
  return m;
}

async function imageMask(url, w, h) {
  const img = new Image();
  img.src = url;
  await img.decode();
  if (img.width !== w || img.height !== h) throw new Error(`${url}: ${img.width}×${img.height}, ждали ${w}×${h}`);
  const c = new OffscreenCanvas(w, h);
  const g = c.getContext('2d');
  g.drawImage(img, 0, 0);
  return binarize(g.getImageData(0, 0, w, h).data, w, h);
}

function canvasMask(canvas, w, h) {
  const c = new OffscreenCanvas(w, h);
  const g = c.getContext('2d');
  g.drawImage(canvas, 0, 0);
  return binarize(g.getImageData(0, 0, w, h).data, w, h);
}

// Расширение маски на r пикселей (квадратом): максимум по строкам, потом по столбцам.
function dilate(m, w, h, r) {
  if (r === 0) return m;
  const t = new Uint8Array(w * h), o = new Uint8Array(w * h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let v = 0;
      for (let k = Math.max(0, x - r); k <= Math.min(w - 1, x + r) && !v; k++) v = m[y * w + k];
      t[y * w + x] = v;
    }
  }
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let v = 0;
      for (let k = Math.max(0, y - r); k <= Math.min(h - 1, y + r) && !v; k++) v = t[k * w + x];
      o[y * w + x] = v;
    }
  }
  return o;
}

const inside = (a, b) => { for (let i = 0; i < a.length; i++) if (a[i] && !b[i]) return false; return true; };

function compare(a, b, w, h) {
  let na = 0, nb = 0, both = 0, xor = 0;
  for (let i = 0; i < a.length; i++) {
    na += a[i]; nb += b[i];
    both += a[i] & b[i]; xor += a[i] ^ b[i];
  }
  let dev = null;
  for (let r = 0; r <= 8; r++) {
    if (inside(a, dilate(b, w, h, r)) && inside(b, dilate(a, w, h, r))) { dev = r; break; }
  }
  return { blender: na, preview: nb, iou: both / Math.max(1, na + nb - both), xor, devPx: dev };
}

function overlay(a, b, w, h) {
  const c = new OffscreenCanvas(w, h);
  const g = c.getContext('2d');
  const im = g.createImageData(w, h);
  for (let i = 0; i < w * h; i++) {
    const [r, gg, bl] = a[i] && b[i] ? [255, 255, 255] : a[i] ? [230, 40, 40] : b[i] ? [40, 200, 80] : [0, 0, 0];
    im.data.set([r, gg, bl, 255], i * 4);
  }
  g.putImageData(im, 0, 0);
  return c.convertToBlob({ type: 'image/png' });
}

const fmt = (v, d = 4) => (v == null ? '—' : Number(v).toFixed(d));

async function run() {
  const canvas = document.getElementById('gl');
  const preview = new Preview(canvas, { root: '..' });
  const { cases } = await (await fetch(`${CHECK}/index.json`, { cache: 'no-store' })).json();
  const results = [];
  const list = document.getElementById('cases');
  for (const c of cases) {
    const row = { name: c.name };
    try {
      if (preview.sceneId !== c.set) await preview.loadScene(c.set);
      await preview.setPreset(c.preset);
      preview.setFrame(c.frame);
      await preview.setCups(c.cups.map((x) => ({ id: x.id, variant: x.variant, posMm: x.posMm, floorMm: x.floorMm, rotate: x.rotate })));
      // кадр, который превью выбрало бы само, — должен совпасть с рендером
      const auto = preview.autoFit();
      row.windowDiff = Math.max(...auto.window.map((v, i) => Math.abs(v - c.window[i])));
      row.windowRel = row.windowDiff / (c.window[3] - c.window[2]);
      preview.setWindow(c.window);
      const [w, h] = preview.render({ longSide: Math.max(...c.px), mask: true });
      const b = canvasMask(canvas, w, h);
      const a = await imageMask(`${CHECK}/${c.mask}`, w, h);
      Object.assign(row, compare(a, b, w, h));
      row.pass = row.devPx != null && row.devPx <= LIMIT_PX && row.windowRel < 1e-3;
      if (SNAP) {
        // тот же кадр в обычном виде — в out/preview_snapshots для сверки глазами
        if (preview.envFor !== c.set) { await preview.loadEnvironment(); preview.envFor = c.set; }
        preview.render({ longSide: Math.max(...c.px) });
        const png = await new Promise((r) => canvas.toBlob(r, 'image/png'));
        await fetch(`/api/snapshot?name=${encodeURIComponent(c.name)}`, { method: 'POST', body: png });
      }
      const url = URL.createObjectURL(await overlay(a, b, w, h));
      const el = document.createElement('section');
      el.className = 'case';
      el.innerHTML = `<img alt="" src="${url}"><div><h2>${c.name}</h2><table>
        <tr><td>фон / ракурс / формат</td><td>${c.set} / ${c.preset} / ${c.frame}, ${w}×${h}</td></tr>
        <tr><td>стаканы</td><td>${c.cups.map((x) => `${x.id} [${x.posMm}] мм`).join(', ')}</td></tr>
        <tr><td>кадр превью vs рендер</td><td>${fmt(row.windowRel * 100, 3)} % высоты кадра</td></tr>
        <tr><td>силуэт: расхождение</td><td class="${row.devPx <= LIMIT_PX ? 'ok' : 'bad'}">${row.devPx ?? '> 8'} px</td></tr>
        <tr><td>IoU, пикселей вне пары</td><td>${fmt(row.iou)} · ${row.xor}</td></tr>
        <tr><td>итог</td><td class="${row.pass ? 'ok' : 'bad'}">${row.pass ? 'совпадает' : 'расходится'}</td></tr>
      </table></div>`;
      list.append(el);
    } catch (err) {
      row.error = String(err.message || err);
      row.pass = false;
      const el = document.createElement('section');
      el.className = 'case';
      el.innerHTML = `<div></div><div><h2>${c.name}</h2><p class="bad">${row.error}</p></div>`;
      list.append(el);
    }
    results.push(row);
  }
  const ok = results.filter((r) => r.pass).length;
  document.getElementById('summary').textContent = `Совпадает ${ok} из ${results.length}` +
    ` (худшее расхождение ${Math.max(...results.map((r) => r.devPx ?? 99))} px)`;
  window.__check = { ok, total: results.length, results };
}

run().catch((err) => {
  document.getElementById('summary').textContent = `Ошибка: ${err.message}`;
  window.__check = { error: String(err) };
});
