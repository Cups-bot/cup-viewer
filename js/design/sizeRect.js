// Макет «Прямоугольник SIZE» (владелец, 2026-09-28): клиент рисует в файле
// SIZE, сайт гнёт рисунок в конус, как оболочка в Illustrator (rectWarp.js).
// Дальше это обычный лист макета: 3D, развёртка, «Фотореал» и рендер его не
// отличают от загруженного конуса.
//
// Что можно загрузить (PNG, JPG, PDF, AI):
//   страницу SIZE целиком — рисунок в рамке, направляющие поверх стираются;
//   сам прямоугольник — картинку или PDF в его пропорциях;
//   другое — клиент размещает его в рамке сам (окно rectCropper.js).
//
// Файл никуда не отправляется: всё происходит в браузере (как prepareDesign.js).

import { MAX_FILE_BYTES, RECOGNIZED_UNSUPPORTED, SIGNATURE_BYTES, SUPPORTED_TYPES, UNWRAP_LIMITS, detectFileType, fitWithin } from './fileType.js';
import { DesignError } from './prepareDesign.js';
import { eraseGuides, warpRectToSheet } from './rectWarp.js';
import { encodeCanvas } from '../utils/encode.js';

// Рисунок прямоугольника — 12 px/мм (около 300 dpi), лист — 300 dpi, как PDF-макет.
const RECT_PX_PER_MM = 12;
const SHEET_DPI = 300;
// Страница SIZE узнаётся по размеру (PDF) или пропорции (картинка).
const PAGE_TOL_MM = 3;
const ASPECT_TOL = 0.02;
// Картинка реже 270 dpi в печати заметно мягче.
const LOW_DPI = 270;
// Направляющие поверх 3D: пунктир, мм.
const GUIDE_WIDTH_MM = 0.45;
const GUIDE_DASH_MM = [3, 1.5];

const abortError = () => new DOMException('Загрузка отменена', 'AbortError');
const throwIfAborted = (signal) => {
  if (signal?.aborted) throw abortError();
};

const toBlob = (canvas) => encodeCanvas(canvas, 'image/png').catch(() => {
  throw new DesignError('broken', 'растр не закодировался');
});

const near = (a, b, tol) => Math.abs(a - b) <= tol;
const aspectNear = (a, b) => Math.abs(a - b) / b <= ASPECT_TOL;

// Что за источник: страница SIZE, сам прямоугольник или картинка других
// пропорций ('free' — её размещает клиент).
function classify({ mm, px }, rect, pageMm) {
  if (mm) {
    if (near(mm[0], pageMm[0], PAGE_TOL_MM) && near(mm[1], pageMm[1], PAGE_TOL_MM)) return 'page';
    if (aspectNear(mm[0] / mm[1], rect.sizeMm[0] / rect.sizeMm[1])) return 'rect';
    return 'free';
  }
  if (aspectNear(px[0] / px[1], pageMm[0] / pageMm[1])) return 'page';
  if (aspectNear(px[0] / px[1], rect.sizeMm[0] / rect.sizeMm[1])) return 'rect';
  return 'free';
}

// Файл → источник: { image (canvas или ImageBitmap), width, height, kind:
// 'page' | 'rect' | 'free', pages, layer, type, vector, close() }. close()
// освобождает растр — после prepareRect он уже закрыт.
export async function readRectSource(file, model, { signal } = {}) {
  const rect = model.textureMapping.rect;
  if (file.size > MAX_FILE_BYTES) throw new DesignError('too-big');
  const head = new Uint8Array(await file.slice(0, SIGNATURE_BYTES).arrayBuffer());
  const type = detectFileType(head);
  if (RECOGNIZED_UNSUPPORTED.includes(type)) throw new DesignError('unsupported');
  if (!SUPPORTED_TYPES.includes(type)) throw new DesignError('broken', 'сигнатура не распознана');
  const pageMm = model.textureMapping.unwrapMm;
  throwIfAborted(signal);

  if (type === 'pdf') {
    const { ART_LAYER, openPdf, pdfLayers, ptToMm, renderPage } = await import('./pdfRaster.js');
    const { pdf, close } = await openPdf(file, signal);
    try {
      const page = await pdf.getPage(1);
      const base = page.getViewport({ scale: 1 });
      const mm = [ptToMm(base.width), ptToMm(base.height)];
      const kind = classify({ mm }, rect, pageMm);
      const { art } = await pdfLayers(pdf);
      const [width] = fitWithin(mm[0] * RECT_PX_PER_MM, mm[1] * RECT_PX_PER_MM, UNWRAP_LIMITS);
      const { canvas } = await renderPage(pdf, {
        width,
        show: art ? (name) => name === ART_LAYER : null,
        // Бумага под рисунком белая сама; у пластика вне рисунка — пластик.
        transparent: model.type !== 'paper',
        signal,
      });
      return { image: canvas, width: canvas.width, height: canvas.height, kind, pages: pdf.numPages, layer: art ? ART_LAYER : null, type, vector: true, close: () => (canvas.width = 0) };
    } finally {
      close();
    }
  }

  let bitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    throw new DesignError('broken', 'картинка не декодируется');
  }
  const kind = classify({ px: [bitmap.width, bitmap.height] }, rect, pageMm);
  return { image: bitmap, width: bitmap.width, height: bitmap.height, kind, pages: 1, layer: null, type, vector: false, close: () => bitmap.close() };
}

// Рисунок прямоугольника в canvas RECT_PX_PER_MM: со страницы SIZE — вырезка
// рамки, иначе — картинка там, куда её поставили (placement, rectCropper.js).
function cutRect(source, rect, pageMm, placement) {
  const [rw, rh] = rect.sizeMm;
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(rw * RECT_PX_PER_MM);
  canvas.height = Math.round(rh * RECT_PX_PER_MM);
  const g = canvas.getContext('2d', { willReadFrequently: true });
  g.imageSmoothingQuality = 'high';
  if (source.kind === 'page') {
    const kx = source.width / pageMm[0];
    const ky = source.height / pageMm[1];
    g.drawImage(source.image, rect.atMm[0] * kx, rect.atMm[1] * ky, rw * kx, rh * ky, 0, 0, canvas.width, canvas.height);
  } else {
    const k = canvas.width / rw;
    const h = placement.w * (source.height / source.width);
    g.drawImage(source.image, (placement.cx - placement.w / 2) * k, (placement.cy - h / 2) * k, placement.w * k, h * k);
  }
  return canvas;
}

// Прямоугольник (canvas) → лист с конусом: { canvas, width, height }.
function warpToSheet(rectCanvas, model) {
  const rect = model.textureMapping.rect;
  const pageMm = model.textureMapping.unwrapMm;
  const [width, height] = fitWithin(pageMm[0] / 25.4 * SHEET_DPI, pageMm[1] / 25.4 * SHEET_DPI, UNWRAP_LIMITS);
  const src = rectCanvas.getContext('2d', { willReadFrequently: true }).getImageData(0, 0, rectCanvas.width, rectCanvas.height);
  const sheet = document.createElement('canvas');
  sheet.width = width;
  sheet.height = height;
  const g = sheet.getContext('2d');
  const out = g.createImageData(width, height);
  // Лист бумаги — белый, как у PDF-макета; у пластика вне рисунка — пусто.
  if (model.type === 'paper') out.data.fill(255);
  warpRectToSheet(src, out, rect, width / pageMm[0]);
  g.putImageData(out, 0, 0);
  return sheet;
}

// Источник (readRectSource) → макет: { textureUrl, unwrapUrl, width, height,
// rectUrl, kind, pages, type, layer, dpi, notes: [...], erased, release() }.
// placement — где картинка в рамке (не у страницы SIZE: там рамка своя).
// rectUrl — рисунок прямоугольника без направляющих: от него строится вид с
// направляющими (withGuides). Источник закрывается здесь же.
export async function prepareRect(source, model, { placement = null, signal } = {}) {
  const rect = model.textureMapping.rect;
  const pageMm = model.textureMapping.unwrapMm;
  const urls = [];
  const release = () => urls.forEach((url) => URL.revokeObjectURL(url));
  let rectCanvas = null;
  let sheet = null;
  try {
    throwIfAborted(signal);
    const place = placement ?? { cx: rect.sizeMm[0] / 2, cy: rect.sizeMm[1] / 2, w: rect.sizeMm[0] };
    rectCanvas = cutRect(source, rect, pageMm, place);
    const notes = [];
    let erased = 0;
    // Направляющие шаблона стираются только на странице SIZE без слоя рисунка.
    if (source.kind === 'page' && !source.layer) {
      const g = rectCanvas.getContext('2d', { willReadFrequently: true });
      const image = g.getImageData(0, 0, rectCanvas.width, rectCanvas.height);
      erased = eraseGuides(image, rect.guides ?? [], RECT_PX_PER_MM, { originMm: rect.atMm });
      if (erased) g.putImageData(image, 0, 0);
    }
    // Разрешение рисунка в печати. У PDF растр — 12 px/мм от его страницы:
    // увеличенный в рамке, он тоже мягче; страница SIZE в PDF — вектор.
    let dpi = null;
    if (!source.vector || source.kind !== 'page') {
      const pxPerMm = source.kind === 'page' ? source.width / pageMm[0] : source.width / place.w;
      dpi = Math.round(pxPerMm * 25.4);
      if (dpi < LOW_DPI) notes.push('rectLowRes');
    }
    if (source.pages > 1) notes.push('firstPage');
    throwIfAborted(signal);
    sheet = warpToSheet(rectCanvas, model);
    const sheetUrl = URL.createObjectURL(await toBlob(sheet));
    urls.push(sheetUrl);
    const rectUrl = URL.createObjectURL(await toBlob(rectCanvas));
    urls.push(rectUrl);
    throwIfAborted(signal);
    return {
      textureUrl: sheetUrl,
      unwrapUrl: sheetUrl,
      width: sheet.width,
      height: sheet.height,
      rectUrl,
      kind: source.kind,
      pages: source.pages,
      type: source.type,
      layer: source.layer,
      dpi,
      notes,
      erased,
      release,
    };
  } catch (error) {
    release();
    throw error;
  } finally {
    source.close();
    if (rectCanvas) rectCanvas.width = 0;
    if (sheet) sheet.width = 0;
  }
}

// Направляющие SIZE на рисунке прямоугольника: видимая зона, крышка, отступ
// снизу, центральные линии — пунктиром своего цвета, как в самом SIZE.
function drawGuides(canvas, rect) {
  const g = canvas.getContext('2d');
  const k = canvas.width / rect.sizeMm[0];
  const [ax, ay] = rect.atMm;
  g.save();
  g.lineWidth = GUIDE_WIDTH_MM * k;
  g.setLineDash(GUIDE_DASH_MM.map((mm) => mm * k));
  for (const guide of rect.guides ?? []) {
    g.strokeStyle = guide.color;
    g.beginPath();
    for (const x of guide.x ?? []) {
      g.moveTo((x - ax) * k, 0);
      g.lineTo((x - ax) * k, canvas.height);
    }
    for (const y of guide.y ?? []) {
      g.moveTo(0, (y - ay) * k);
      g.lineTo(canvas.width, (y - ay) * k);
    }
    g.stroke();
  }
  g.restore();
}

// Тот же лист, но с направляющими — только для 3D: { url, release() }.
// В рендер и «Скачать конус» уходит лист без них.
export async function withGuides(rectUrl, model) {
  const bitmap = await createImageBitmap(await (await fetch(rectUrl)).blob());
  const canvas = document.createElement('canvas');
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  canvas.getContext('2d', { willReadFrequently: true }).drawImage(bitmap, 0, 0);
  bitmap.close();
  let sheet = null;
  try {
    drawGuides(canvas, model.textureMapping.rect);
    sheet = warpToSheet(canvas, model);
    const url = URL.createObjectURL(await toBlob(sheet));
    return { url, release: () => URL.revokeObjectURL(url) };
  } finally {
    canvas.width = 0;
    if (sheet) sheet.width = 0;
  }
}
