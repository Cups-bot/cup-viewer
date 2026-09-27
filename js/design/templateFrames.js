// Рамки шаблона Формации на растре листа: вертикальные пунктирные линии
// своего цвета, их пары на заданном расстоянии и точные верх и низ рамки.
// Чистые функции над { data, width, height } (ImageData) — без pdf.js и DOM,
// поэтому проверяются юнит-тестами (tests/unit/templateFrames.test.mjs).

// Цвета пунктиров шаблона — чистые и яркие. Порог строгий: тёмно-зелёный или
// приглушённо-красный логотип (Pantone 3425 C, 1805 C) за шаблон не сойдёт.
export const isRed = (r, g, b) => r >= 200 && g <= 110 && b <= 120;
export const isGreen = (r, g, b) => g >= 140 && r <= 100 && g - b >= 40;

// Вертикальные пунктирные линии цвета match: в каждом столбце — самый длинный
// отрезок, где разрывы между штрихами не больше gapMm, а закрашено не меньше
// трети. Соседние столбцы (толщина линии) сливаются в одну линию.
export function verticalLines(image, match, { pxPerMm, minLenMm, gapMm = 3 }) {
  const { data, width, height } = image;
  const minLen = minLenMm * pxPerMm;
  const gap = gapMm * pxPerMm;
  const found = [];
  for (let x = 0; x < width; x++) {
    let start = -1;
    let last = -1;
    let hits = 0;
    let best = null;
    const close = () => {
      if (start < 0) return;
      const length = last - start + 1;
      if (length >= minLen && hits >= length / 3 && (!best || length > best.y1 - best.y0)) best = { y0: start, y1: last };
    };
    for (let y = 0; y < height; y++) {
      const i = (y * width + x) * 4;
      if (data[i + 3] < 128 || !match(data[i], data[i + 1], data[i + 2])) continue;
      if (start >= 0 && y - last > gap) {
        close();
        start = -1;
      }
      if (start < 0) {
        start = y;
        hits = 0;
      }
      last = y;
      hits += 1;
    }
    close();
    if (best) found.push({ x, ...best });
  }
  const lines = [];
  for (const col of found) {
    const prev = lines.at(-1);
    if (prev && col.x - prev.x1 <= 2) {
      prev.x1 = col.x;
      prev.y0 = Math.min(prev.y0, col.y0);
      prev.y1 = Math.max(prev.y1, col.y1);
    } else {
      lines.push({ x0: col.x, x1: col.x, y0: col.y0, y1: col.y1 });
    }
  }
  return lines.map((l) => ({ x: (l.x0 + l.x1) / 2, y0: l.y0, y1: l.y1 }));
}

// Пары линий на расстоянии widthMm (± tolMm), перекрытые по высоте хотя бы на
// 70 % — прямоугольники рамок, слева направо. Каждая линия — в одной паре.
export function pairFrames(lines, { pxPerMm, widthMm, tolMm }) {
  const sorted = [...lines].sort((a, b) => a.x - b.x);
  const used = new Set();
  const frames = [];
  for (let i = 0; i < sorted.length; i++) {
    if (used.has(i)) continue;
    for (let j = i + 1; j < sorted.length; j++) {
      if (used.has(j)) continue;
      const a = sorted[i];
      const b = sorted[j];
      const dx = (b.x - a.x) / pxPerMm;
      if (dx > widthMm + tolMm) break;
      if (dx < widthMm - tolMm) continue;
      const y0 = Math.max(a.y0, b.y0);
      const y1 = Math.min(a.y1, b.y1);
      const shorter = Math.min(a.y1 - a.y0, b.y1 - b.y0);
      if (y1 - y0 < 0.7 * shorter) continue;
      frames.push({ x0: a.x, x1: b.x, y0, y1 });
      used.add(i);
      used.add(j);
      break;
    }
  }
  return frames;
}

// Точные верх и низ рамки: у вертикального пунктира концы штрихов не доходят
// до угла (до штриха с промежутком, ~3 мм). Горизонтальный край — строка
// около найденного, где пунктира больше всего между двумя вертикалями.
export function refineEdges(image, frame, match, { pxPerMm, searchMm = 4 }) {
  const { data, width, height } = image;
  const x0 = Math.round(frame.x0);
  const x1 = Math.round(frame.x1);
  const span = Math.max(1, x1 - x0);
  const count = (y) => {
    let n = 0;
    for (let x = x0; x <= x1; x++) {
      const i = (y * width + x) * 4;
      if (data[i + 3] >= 128 && match(data[i], data[i + 1], data[i + 2])) n += 1;
    }
    return n;
  };
  const best = (from, to) => {
    let row = null;
    let most = 0.25 * span;
    for (let y = Math.max(0, from); y <= Math.min(height - 1, to); y++) {
      const n = count(y);
      if (n > most) {
        most = n;
        row = y;
      }
    }
    return row;
  };
  const d = Math.round(searchMm * pxPerMm);
  const top = best(Math.round(frame.y0) - d, Math.round(frame.y0) + d);
  const bottom = best(Math.round(frame.y1) - d, Math.round(frame.y1) + d);
  return { ...frame, y0: top ?? frame.y0, y1: bottom ?? frame.y1 };
}
