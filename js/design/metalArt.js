// Макет на металлизированном картоне: белый фон развёртки — голый металл.
//
// Шаблоны развёртки рисуют дугу стакана залитой белым (бумага), а рисунок
// кладут поверх; буквы логотипа часто — вырезы, сквозь которые видна та же
// белая заливка (CHIN CHIN, владелец 2026-10-22). На металле белое — белила,
// и стакан выходил белым целиком. Правило: белое, соединённое с краем листа
// или прозрачным полем, — фон, на металле это металл; белое внутри рисунка
// (буквы в плашке, рамки) — белила.

// Почти белое: сглаженный край плашки на белом фоне тоже уходит в фон.
const WHITE = 228;

// canvas меняется на месте: фон становится прозрачным.
export function clearPaperWhite(canvas) {
  const { width, height } = canvas;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  const image = ctx.getImageData(0, 0, width, height);
  const px = image.data;
  const n = width * height;
  // 0 — не тронут, 1 — фон (прозрачное или белое, соединённое с краем).
  const seen = new Uint8Array(n);
  const queue = new Uint32Array(n);
  let head = 0;
  let tail = 0;
  const clear = (i) => px[i * 4 + 3] < 128;
  const white = (i) => {
    const p = i * 4;
    return px[p + 3] >= 128 && px[p] >= WHITE && px[p + 1] >= WHITE && px[p + 2] >= WHITE;
  };
  const push = (i) => {
    if (seen[i] || !(clear(i) || white(i))) return;
    seen[i] = 1;
    queue[tail++] = i;
  };
  for (let x = 0; x < width; x++) {
    push(x);
    push((height - 1) * width + x);
  }
  for (let y = 0; y < height; y++) {
    push(y * width);
    push(y * width + width - 1);
  }
  for (let i = 0; i < n; i++) if (clear(i)) push(i);
  while (head < tail) {
    const i = queue[head++];
    const x = i % width;
    if (x > 0) push(i - 1);
    if (x < width - 1) push(i + 1);
    if (i >= width) push(i - width);
    if (i < n - width) push(i + width);
  }
  let cleared = 0;
  for (let i = 0; i < n; i++) {
    if (seen[i] && px[i * 4 + 3] >= 128) cleared++;
    if (seen[i]) px[i * 4 + 3] = 0;
  }
  ctx.putImageData(image, 0, 0);
  return cleared;
}
