// Текстура отделок для шейдера печати (core/printShading.js): маски клиента
// (чёрное — где отделка, как лист конгрева у Формации) → одна RGBA-текстура
// в координатах листа макета.
//
//   R — фольга, G — металлизированная краска,
//   B — высота: 0,5 + h/2, h в мм (±1 мм): конгрев выдавлен вверх, фольга
//       вдавлена на FOIL_DEPTH_MM;
//   A — фактура фольги: мелкая неровность вокруг 0,5.
//
// DataTexture, а не canvas: canvas хранит цвет премультиплицированным по
// альфе, и при альфе-фактуре фольги каналы маски теряли бы точность.

import * as THREE from 'three';

export const FOIL_DEPTH_MM = 0.2;
export const EMBOSS_DEPTH_MM = 0.35;
// Фаска по краю: у конгрева штамп скруглён, у фольги край резче.
const EMBOSS_BEVEL_MM = 0.4;
const FOIL_BEVEL_MM = 0.08;
// Фактура фольги: зерно ~0,25 мм, высота ±0,01 мм.
const FOIL_GRAIN_MM = 0.25;
const FOIL_GRAIN_HEIGHT_MM = 0.01;
const MAX_SIDE = 2048;

async function loadBitmap(url) {
  const blob = await (await fetch(url)).blob();
  return createImageBitmap(blob);
}

// Покрытие маски 0…1: чёрное — 1, белое и прозрачное — 0.
async function coverage(url, width, height) {
  if (!url) return null;
  const bitmap = await loadBitmap(url);
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close?.();
  const { data } = ctx.getImageData(0, 0, width, height);
  canvas.width = 0;
  const out = new Float32Array(width * height);
  for (let i = 0, p = 0; i < out.length; i++, p += 4) {
    const lum = (0.2126 * data[p] + 0.7152 * data[p + 1] + 0.0722 * data[p + 2]) / 255;
    const alpha = data[p + 3] / 255;
    // Мягкий порог: сглаженный край маски остаётся сглаженным.
    out[i] = alpha * Math.min(1, Math.max(0, (0.85 - lum) / 0.7));
  }
  return out;
}

// Двойное прямоугольное размытие по строкам и столбцам — дешёвая фаска.
function blur(src, width, height, radius) {
  const r = Math.round(radius);
  if (r < 1) return src;
  const a = Float32Array.from(src);
  const t = new Float32Array(a.length);
  const n = 2 * r + 1;
  for (let pass = 0; pass < 2; pass++) {
    for (let y = 0; y < height; y++) {
      const row = y * width;
      let sum = 0;
      for (let x = -r; x <= r; x++) sum += a[row + Math.min(width - 1, Math.max(0, x))];
      for (let x = 0; x < width; x++) {
        t[row + x] = sum / n;
        sum += a[row + Math.min(width - 1, x + r + 1)] - a[row + Math.max(0, x - r)];
      }
    }
    for (let x = 0; x < width; x++) {
      let sum = 0;
      for (let y = -r; y <= r; y++) sum += t[Math.min(height - 1, Math.max(0, y)) * width + x];
      for (let y = 0; y < height; y++) {
        a[y * width + x] = sum / n;
        sum += t[Math.min(height - 1, y + r + 1) * width + x] - t[Math.max(0, y - r) * width + x];
      }
    }
  }
  return a;
}

// Значение шума в узлах сетки — детерминированное: кадр одинаков от запуска к запуску.
function hash(x, y) {
  let h = (x * 374761393 + y * 668265263) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

function valueNoise(x, y) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const fx = x - xi;
  const fy = y - yi;
  const sx = fx * fx * (3 - 2 * fx);
  const sy = fy * fy * (3 - 2 * fy);
  const a = hash(xi, yi);
  const b = hash(xi + 1, yi);
  const c = hash(xi, yi + 1);
  const d = hash(xi + 1, yi + 1);
  return (a + (b - a) * sx) * (1 - sy) + (c + (d - c) * sx) * sy;
}

// masks — { emboss, foil, ink }: URL растров полного листа (или null);
// sheetMm — [ширина, высота] развёртки в мм; embossDepthMm — глубина конгрева.
// Возвращает DataTexture или null, если масок нет.
export async function buildFinishMap({ masks, sheetMm, embossDepthMm = EMBOSS_DEPTH_MM }) {
  if (!masks?.emboss && !masks?.foil && !masks?.ink) return null;
  const width = MAX_SIDE;
  const height = Math.max(1, Math.round((MAX_SIDE * sheetMm[1]) / sheetMm[0]));
  const pxPerMm = width / sheetMm[0];
  const [emboss, foil, ink] = await Promise.all([
    coverage(masks.emboss, width, height),
    coverage(masks.foil, width, height),
    coverage(masks.ink, width, height),
  ]);
  const embossH = emboss ? blur(emboss, width, height, (EMBOSS_BEVEL_MM * pxPerMm) / 2) : null;
  const foilH = foil ? blur(foil, width, height, (FOIL_BEVEL_MM * pxPerMm) / 2) : null;
  const grainScale = 1 / (FOIL_GRAIN_MM * pxPerMm);

  const data = new Uint8Array(width * height * 4);
  for (let y = 0, i = 0; y < height; y++) {
    for (let x = 0; x < width; x++, i++) {
      const f = foil ? foil[i] : 0;
      const grain = f > 0 ? valueNoise(x * grainScale, y * grainScale) * 2 - 1 : 0;
      let h = 0;
      if (embossH) h += embossH[i] * embossDepthMm;
      if (foilH) h -= foilH[i] * FOIL_DEPTH_MM - f * grain * FOIL_GRAIN_HEIGHT_MM;
      const p = i * 4;
      data[p] = Math.round(f * 255);
      data[p + 1] = Math.round((ink ? ink[i] : 0) * 255);
      data[p + 2] = Math.round(Math.min(1, Math.max(0, 0.5 + h / 2)) * 255);
      data[p + 3] = Math.round((0.5 + 0.5 * grain * f) * 255);
    }
  }

  const texture = new THREE.DataTexture(data, width, height, THREE.RGBAFormat, THREE.UnsignedByteType);
  texture.colorSpace = THREE.NoColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}
