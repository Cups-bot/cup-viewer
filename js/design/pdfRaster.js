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

// file — Blob PDF; targetWidthPx — ширина растра, посчитанная от развёртки
// модели; fit(width, height) → [w, h] — вписывание в пределы canvas.
// Возвращает { canvas, pages }; canvas освобождает вызывающий.
export async function rasterizePdf(file, { targetWidthPx, fit, signal }) {
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
    const page = await pdf.getPage(1);
    const base = page.getViewport({ scale: 1 });
    const [width, height] = fit(targetWidthPx, (targetWidthPx * base.height) / base.width);
    const viewport = page.getViewport({ scale: width / base.width });

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const render = page.render({ canvas, canvasContext: canvas.getContext('2d'), viewport });
    signal?.addEventListener('abort', () => render.cancel(), { once: true });
    await render.promise;
    return { canvas, pages: pdf.numPages, pagePt: [base.width, base.height] };
  } finally {
    signal?.removeEventListener('abort', abort);
    task.destroy();
  }
}

export const DPI_FOR_UNWRAP = 300;
export const mmToPx = (mm, dpi = DPI_FOR_UNWRAP) => Math.round((mm / 25.4) * dpi);
export const ptToMm = (pt) => (pt / POINTS_PER_INCH) * 25.4;
