// Растр первой страницы PDF для макета. Модуль грузится динамическим
// импортом при первом PDF (§50) — вместе с pdf.js и его worker'ом.
//
// Цвет — ровно тот, что даёт pdf.js (CMYK → RGB его собственным ICC-путём):
// поверх ничего не пересчитываем (бриф 03b, не-цели).

import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';

// Ресурсы pdf.js лежат рядом с сайтом (scripts/build.mjs копирует их из
// пакета): шрифты, таблицы кодировок, ICC-профили и wasm-декодеры.
const VENDOR = new URL('vendor/pdfjs/', document.baseURI).href;
GlobalWorkerOptions.workerSrc = `${VENDOR}pdf.worker.min.mjs`;

const POINTS_PER_INCH = 72;

// Слой рисунка в шаблонах Формации (PDF и AI со слоями): остальные слои —
// контуры, размеры, пометки — на стакан не идут.
export const ART_LAYER = 'conus';

// Открыть PDF: { pdf, close }. Прерывание — через signal (закрывает документ).
export async function openPdf(file, signal) {
  const data = new Uint8Array(await file.arrayBuffer());
  const task = getDocument({
    data,
    cMapUrl: `${VENDOR}cmaps/`,
    cMapPacked: true,
    standardFontDataUrl: `${VENDOR}standard_fonts/`,
    wasmUrl: `${VENDOR}wasm/`,
    iccUrl: `${VENDOR}iccs/`,
    // CSP страницы запрещает eval — pdf.js обходится без него.
    isEvalSupported: false,
    enableXfa: false,
  });
  const abort = () => task.destroy();
  signal?.addEventListener('abort', abort, { once: true });
  try {
    const pdf = await task.promise;
    return {
      pdf,
      close: () => {
        signal?.removeEventListener('abort', abort);
        task.destroy();
      },
    };
  } catch (error) {
    signal?.removeEventListener('abort', abort);
    task.destroy();
    throw error;
  }
}

// Слои первой страницы: имена и есть ли слой рисунка.
export async function pdfLayers(pdf) {
  const config = await pdf.getOptionalContentConfig();
  const names = [...config].map(([, group]) => group.name ?? '');
  return { names, art: names.some((name) => name.trim().toLowerCase() === ART_LAYER) };
}

// Первая страница в canvas: width — ширина в пикселях; show(name) → видим ли
// слой (null — как в файле); transparent — без белой подложки.
export async function renderPage(pdf, { width, show = null, transparent = false, signal }) {
  const page = await pdf.getPage(1);
  const base = page.getViewport({ scale: 1 });
  const viewport = page.getViewport({ scale: width / base.width });
  const config = await pdf.getOptionalContentConfig();
  if (show) for (const [id, group] of config) config.setVisibility(id, show((group.name ?? '').trim().toLowerCase()));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(viewport.width);
  canvas.height = Math.round(viewport.height);
  const render = page.render({
    canvas,
    canvasContext: canvas.getContext('2d', { willReadFrequently: true }),
    viewport,
    optionalContentConfigPromise: Promise.resolve(config),
    background: transparent ? 'rgba(0,0,0,0)' : undefined,
  });
  signal?.addEventListener('abort', () => render.cancel(), { once: true });
  await render.promise;
  return { canvas, pageMm: [ptToMm(base.width), ptToMm(base.height)] };
}

// file — Blob PDF; targetWidthPx — ширина растра, посчитанная от развёртки
// модели; fit(width, height) → [w, h] — вписывание в пределы canvas;
// transparent — без белой подложки (у пластика альфа — это маска краски).
// Возвращает { canvas, pages, pagePt, layers: { names, used } }; canvas
// освобождает вызывающий. used — ART_LAYER, если он есть и показан один.
export async function rasterizePdf(file, { targetWidthPx, fit, signal, transparent = false }) {
  const { pdf, close } = await openPdf(file, signal);
  try {
    const page = await pdf.getPage(1);
    const base = page.getViewport({ scale: 1 });
    const [width] = fit(targetWidthPx, (targetWidthPx * base.height) / base.width);
    // Слои (optional content): есть слой рисунка — показываем только его.
    const { names, art } = await pdfLayers(pdf);
    const { canvas } = await renderPage(pdf, { width, show: art ? (name) => name === ART_LAYER : null, transparent, signal });
    return { canvas, pages: pdf.numPages, pagePt: [base.width, base.height], layers: { names, used: art ? ART_LAYER : null } };
  } finally {
    close();
  }
}

export const DPI_FOR_UNWRAP = 300;
export const mmToPx = (mm, dpi = DPI_FOR_UNWRAP) => Math.round((mm / 25.4) * dpi);
export const ptToMm = (pt) => (pt / POINTS_PER_INCH) * 25.4;
