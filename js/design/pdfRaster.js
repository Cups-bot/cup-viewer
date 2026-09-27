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

// file — Blob PDF; targetWidthPx — ширина растра, посчитанная от развёртки
// модели; fit(width, height) → [w, h] — вписывание в пределы canvas;
// transparent — без белой подложки (у пластика альфа — это маска краски).
// Возвращает { canvas, pages, pagePt, layers: { names, used } }; canvas
// освобождает вызывающий. used — ART_LAYER, если он есть и показан один.
export async function rasterizePdf(file, { targetWidthPx, fit, signal, transparent = false }) {
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

    // Слои (optional content): есть слой рисунка — показываем только его.
    const config = await pdf.getOptionalContentConfig();
    const groups = [...config];
    const names = groups.map(([, group]) => group.name ?? '');
    const art = groups.find(([, group]) => (group.name ?? '').trim().toLowerCase() === ART_LAYER);
    if (art) for (const [id] of groups) config.setVisibility(id, id === art[0]);

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const render = page.render({
      canvas,
      canvasContext: canvas.getContext('2d'),
      viewport,
      optionalContentConfigPromise: Promise.resolve(config),
      background: transparent ? 'rgba(0,0,0,0)' : undefined,
    });
    signal?.addEventListener('abort', () => render.cancel(), { once: true });
    await render.promise;
    return { canvas, pages: pdf.numPages, pagePt: [base.width, base.height], layers: { names, used: art ? ART_LAYER : null } };
  } finally {
    signal?.removeEventListener('abort', abort);
    task.destroy();
  }
}

export const DPI_FOR_UNWRAP = 300;
export const mmToPx = (mm, dpi = DPI_FOR_UNWRAP) => Math.round((mm / 25.4) * dpi);
export const ptToMm = (pt) => (pt / POINTS_PER_INCH) * 25.4;
