// Прямоугольник SIZE → конус на листе макета — та же «оболочка», что у
// дизайнеров в Illustrator (Деформация → Дуга 20 %, Ctrl+C / Ctrl+F в рабочий
// AI): по горизонтали — угол вокруг вершины конуса, по вертикали — радиус.
//
// Параметры — catalog/cups.json → web.textureMapping.rect, подогнаны по шаблону
// Формации: линии видимой зоны и крышки из SIZE ложатся на его контуры ≤ 0,5 мм,
// видимая зона по ширине — ровно оборот стакана (шов сходится на 3D).
// Координаты — мм страницы SIZE, она же лист макета (unwrapMm), Y вниз.
//
// Здесь только арифметика над RGBA-массивами — без DOM, её гоняют unit-тесты.

const RAD = Math.PI / 180;

// Точка SIZE (x, y) → точка листа.
export function sheetPoint(rect, x, y) {
  const w = rect.warp;
  const th = -Math.PI / 2 + w.degPerMm * RAD * (x - w.axisXMm);
  const r = w.midRMm - w.rPerMm * (y - w.midYMm);
  return [w.apexMm[0] + r * Math.cos(th), w.apexMm[1] + r * Math.sin(th)];
}

// Точка листа → точка SIZE.
export function rectPoint(rect, X, Y) {
  const w = rect.warp;
  const dx = X - w.apexMm[0];
  const dy = Y - w.apexMm[1];
  return [
    w.axisXMm + (Math.atan2(dy, dx) + Math.PI / 2) / (w.degPerMm * RAD),
    w.midYMm + (w.midRMm - Math.hypot(dx, dy)) / w.rPerMm,
  ];
}

// Рамка конуса на листе, мм: [x0, y0, x1, y1] — по точкам контура прямоугольника.
export function sheetBounds(rect) {
  const [ax, ay] = rect.atMm;
  const [rw, rh] = rect.sizeMm;
  let x0 = Infinity;
  let y0 = Infinity;
  let x1 = -Infinity;
  let y1 = -Infinity;
  const add = (x, y) => {
    const [X, Y] = sheetPoint(rect, x, y);
    x0 = Math.min(x0, X);
    y0 = Math.min(y0, Y);
    x1 = Math.max(x1, X);
    y1 = Math.max(y1, Y);
  };
  for (let i = 0; i <= 64; i++) {
    const t = i / 64;
    add(ax + rw * t, ay);
    add(ax + rw * t, ay + rh);
    add(ax, ay + rh * t);
    add(ax + rw, ay + rh * t);
  }
  return [x0, y0, x1, y1];
}

// src — { data, width, height }: RGBA прямоугольника, растянутого на rect.sizeMm.
// out — { data, width, height }: лист pageMm при pxPerMm; пишутся только
// пиксели конуса, остальное не трогается (подложка — забота вызывающего).
// Смешивание — с учётом прозрачности, иначе края PNG темнеют.
export function warpRectToSheet(src, out, rect, pxPerMm) {
  const w = rect.warp;
  const [ax, ay] = rect.atMm;
  const kx = src.width / rect.sizeMm[0];
  const ky = src.height / rect.sizeMm[1];
  const k = w.degPerMm * RAD;
  const [bx0, by0, bx1, by1] = sheetBounds(rect);
  const i0 = Math.max(0, Math.floor(bx0 * pxPerMm) - 1);
  const i1 = Math.min(out.width, Math.ceil(bx1 * pxPerMm) + 1);
  const j0 = Math.max(0, Math.floor(by0 * pxPerMm) - 1);
  const j1 = Math.min(out.height, Math.ceil(by1 * pxPerMm) + 1);
  const s = src.data;
  const o = out.data;
  const sw = src.width;
  const sh = src.height;
  for (let j = j0; j < j1; j++) {
    const dy = (j + 0.5) / pxPerMm - w.apexMm[1];
    for (let i = i0; i < i1; i++) {
      const dx = (i + 0.5) / pxPerMm - w.apexMm[0];
      const x = w.axisXMm + (Math.atan2(dy, dx) + Math.PI / 2) / k;
      const y = w.midYMm + (w.midRMm - Math.hypot(dx, dy)) / w.rPerMm;
      const u = (x - ax) * kx - 0.5;
      const v = (y - ay) * ky - 0.5;
      if (u < -0.5 || v < -0.5 || u > sw - 0.5 || v > sh - 0.5) continue;
      const u0 = Math.min(Math.max(Math.floor(u), 0), sw - 1);
      const v0 = Math.min(Math.max(Math.floor(v), 0), sh - 1);
      const u1 = Math.min(u0 + 1, sw - 1);
      const v1 = Math.min(v0 + 1, sh - 1);
      const fu = Math.min(Math.max(u - u0, 0), 1);
      const fv = Math.min(Math.max(v - v0, 0), 1);
      const p00 = (v0 * sw + u0) * 4;
      const p10 = (v0 * sw + u1) * 4;
      const p01 = (v1 * sw + u0) * 4;
      const p11 = (v1 * sw + u1) * 4;
      const w00 = (1 - fu) * (1 - fv) * s[p00 + 3];
      const w10 = fu * (1 - fv) * s[p10 + 3];
      const w01 = (1 - fu) * fv * s[p01 + 3];
      const w11 = fu * fv * s[p11 + 3];
      const a = w00 + w10 + w01 + w11;
      if (a <= 0) continue;
      const r = s[p00] * w00 + s[p10] * w10 + s[p01] * w01 + s[p11] * w11;
      const g = s[p00 + 1] * w00 + s[p10 + 1] * w10 + s[p01 + 1] * w01 + s[p11 + 1] * w11;
      const b = s[p00 + 2] * w00 + s[p10 + 2] * w10 + s[p01 + 2] * w01 + s[p11 + 2] * w11;
      const q = (j * out.width + i) * 4;
      // Поверх подложки (белая бумага или прозрачный лист) — «source-over».
      const alpha = a / 255;
      const keep = 1 - alpha;
      o[q] = r / a * alpha + o[q] * keep;
      o[q + 1] = g / a * alpha + o[q + 1] * keep;
      o[q + 2] = b / a * alpha + o[q + 2] * keep;
      o[q + 3] = a + o[q + 3] * keep;
    }
  }
}

const hexRgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));

// Направляющие SIZE, оставленные клиентом поверх рисунка, — стереть.
// img — { data, width, height } при pxPerMm, его левый верхний угол — точка
// originMm страницы SIZE; guides — из каталога ({ color, x: [мм], y: [мм] }).
// Пиксель полосы у линии считается направляющей, если он — смесь цвета линии
// с тем, что вокруг неё; тогда он заменяется соседями с обеих сторон. Пунктир,
// лёгший под рисунок, и рисунок того же цвета не трогаются. Возвращает,
// сколько пикселей стёрто.
export function eraseGuides(img, guides, pxPerMm, { originMm = [0, 0], halfMm = 0.4, reachMm = 0.65 } = {}) {
  const { data, width, height } = img;
  const half = Math.max(1, Math.round(halfMm * pxPerMm));
  const reach = Math.max(half + 1, Math.round(reachMm * pxPerMm));
  let erased = 0;
  const px = (x, y) => (Math.min(Math.max(y, 0), height - 1) * width + Math.min(Math.max(x, 0), width - 1)) * 4;
  // Одна линия: along — вдоль неё, across — поперёк; at — её место, пиксели.
  const line = (color, at, vertical) => {
    const [gr, gg, gb] = hexRgb(color);
    const length = vertical ? height : width;
    const span = vertical ? width : height;
    if (at < 0 || at >= span) return;
    const pos = (along, across) => (vertical ? px(across, along) : px(along, across));
    for (let along = 0; along < length; along++) {
      const pa = pos(along, at - reach);
      const pb = pos(along, at + reach);
      for (let d = -half; d <= half; d++) {
        if (at + d < 0 || at + d >= span) continue;
        const t = (d + reach) / (2 * reach);
        const p = pos(along, at + d);
        const ir = data[pa] * (1 - t) + data[pb] * t;
        const ig = data[pa + 1] * (1 - t) + data[pb + 1] * t;
        const ib = data[pa + 2] * (1 - t) + data[pb + 2] * t;
        // p = фон + α·(цвет линии − фон): α — доля линии в пикселе.
        const er = gr - ir;
        const eg = gg - ig;
        const eb = gb - ib;
        const e2 = er * er + eg * eg + eb * eb;
        if (e2 < 40 * 40) continue;
        const qr = data[p] - ir;
        const qg = data[p + 1] - ig;
        const qb = data[p + 2] - ib;
        const alpha = (qr * er + qg * eg + qb * eb) / e2;
        if (alpha < 0.12) continue;
        const rr = qr - alpha * er;
        const rg = qg - alpha * eg;
        const rb = qb - alpha * eb;
        if (rr * rr + rg * rg + rb * rb > 28 * 28) continue;
        data[p] = ir;
        data[p + 1] = ig;
        data[p + 2] = ib;
        erased += 1;
      }
    }
  };
  for (const guide of guides) {
    for (const x of guide.x ?? []) line(guide.color, Math.round((x - originMm[0]) * pxPerMm - 0.5), true);
    for (const y of guide.y ?? []) line(guide.color, Math.round((y - originMm[1]) * pxPerMm - 0.5), false);
  }
  return erased;
}
