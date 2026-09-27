// Шаблон Формации для пластика (PDF или AI): где на листе печать и что в ней.
//
//   шелкотрафарет — поле печати: красный пунктир «Область печати» (204 × H);
//   тампопечать   — зоны сторон: зелёный пунктир «Безопасная зона печати»
//                   (25 мм шириной), сторона А — левая, Б — правая.
//
// Рамки ищутся по вертикальным пунктирным линиям своего цвета: логотип,
// текст и наклонные стенки стакана таких длинных прямых линий не дают. Рисунок
// берётся из слоя conus (без контуров и пометок), а у сведённого файла без
// слоёв — со всего листа: тогда пунктиры шаблона внутри вырезки стираются.
//
// Модуль грузится вместе с pdf.js (pdfRaster.js), только для PDF/AI.

import { ART_LAYER, openPdf, pdfLayers, renderPage } from './pdfRaster.js';
import { isGreen, isRed, pairFrames, refineEdges, verticalLines } from './templateFrames.js';

// Поиск рамок — 10 пикселей на мм; вырезка рисунка — 12 (около 300 dpi).
const FIND_PX_PER_MM = 10;
const ART_PX_PER_MM = 12;

const toBlob = (canvas) => new Promise((resolve, reject) => {
  canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('вырезка не закодировалась'))), 'image/png');
});

// Вырезка рамки из рисунка: frame — в пикселях поиска. Без слоя рисунка —
// поля в полмиллиметра внутрь (там сама рамка) и стирание пунктиров шаблона.
async function cut(art, frame, { flattened }) {
  const k = ART_PX_PER_MM / FIND_PX_PER_MM;
  const inset = flattened ? 0.5 * ART_PX_PER_MM : 0;
  const sx = frame.x0 * k + inset;
  const sy = frame.y0 * k + inset;
  const sw = Math.max(1, (frame.x1 - frame.x0) * k - 2 * inset);
  const sh = Math.max(1, (frame.y1 - frame.y0) * k - 2 * inset);
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(sw);
  canvas.height = Math.round(sh);
  const g = canvas.getContext('2d', { willReadFrequently: true });
  g.drawImage(art, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
  const image = g.getImageData(0, 0, canvas.width, canvas.height);
  const { data } = image;
  let inked = 0;
  for (let i = 0; i < data.length; i += 4) {
    if (flattened && (isRed(data[i], data[i + 1], data[i + 2]) || isGreen(data[i], data[i + 1], data[i + 2]))) data[i + 3] = 0;
    if (data[i + 3] >= 8) inked += 1;
  }
  if (flattened) g.putImageData(image, 0, 0);
  // Пустая зона (сторона Б без рисунка) — стороны нет.
  const empty = inked < 0.0005 * canvas.width * canvas.height;
  const blob = empty ? null : await toBlob(canvas);
  const mm = [canvas.width / ART_PX_PER_MM, canvas.height / ART_PX_PER_MM];
  canvas.width = 0;
  return { blob, mm, empty };
}

// kind — 'field' (шелкотрафарет) или 'sides' (тампопечать). Возвращает
//   { kind: 'field', field: { blob, mm }, layer }
//   { kind: 'sides', sides: { A: { blob, mm }, B?: … }, layer }
// или null — рамок шаблона на листе нет (обычный PDF: он и есть макет).
export async function readTemplate(file, { kind, signal }) {
  const { pdf, close } = await openPdf(file, signal);
  try {
    const { art: hasArt } = await pdfLayers(pdf);
    const page = await pdf.getPage(1);
    const base = page.getViewport({ scale: 1 });
    const pageMm = (base.width / 72) * 25.4;
    // Рамки — на служебных слоях (всё, кроме рисунка); без слоёв — весь лист.
    const find = await renderPage(pdf, {
      width: Math.round(pageMm * FIND_PX_PER_MM),
      show: hasArt ? (name) => name !== ART_LAYER : null,
      signal,
    });
    const image = find.canvas.getContext('2d', { willReadFrequently: true })
      .getImageData(0, 0, find.canvas.width, find.canvas.height);
    find.canvas.width = 0;
    const options = { pxPerMm: FIND_PX_PER_MM };
    const match = kind === 'field' ? isRed : isGreen;
    const frames = (kind === 'field'
      ? pairFrames(verticalLines(image, match, { ...options, minLenMm: 40 }), { ...options, widthMm: 204, tolMm: 4 })
      : pairFrames(verticalLines(image, match, { ...options, minLenMm: 20 }), { ...options, widthMm: 25, tolMm: 2.5 }))
      .map((frame) => refineEdges(image, frame, match, options));
    if (!frames.length) return null;

    const art = await renderPage(pdf, {
      width: Math.round(pageMm * ART_PX_PER_MM),
      show: hasArt ? (name) => name === ART_LAYER : null,
      transparent: true,
      signal,
    });
    try {
      const flattened = !hasArt;
      const layer = hasArt ? ART_LAYER : null;
      if (kind === 'field') {
        // Полей на листе одно; если вдруг два — самое крупное.
        const frame = frames.reduce((a, b) => ((b.x1 - b.x0) * (b.y1 - b.y0) > (a.x1 - a.x0) * (a.y1 - a.y0) ? b : a));
        const field = await cut(art.canvas, frame, { flattened });
        return field.empty ? null : { kind, field, layer };
      }
      // Стороны — по порядку зон слева направо: А, Б. Пустая зона пропускается.
      const sides = {};
      const names = ['A', 'B'];
      for (const [index, frame] of frames.slice(0, 2).entries()) {
        const side = await cut(art.canvas, frame, { flattened });
        if (!side.empty) sides[names[index]] = side;
      }
      return Object.keys(sides).length ? { kind, sides, layer } : null;
    } finally {
      art.canvas.width = 0;
    }
  } finally {
    close();
  }
}
