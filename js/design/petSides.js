// Стороны тампопечати → лист развёртки стенки (CupViewer v2).
//
// Два вида листа (js/catalog/printModes.js):
//   PET  — развёртка по азимуту (ниже, composeSides);
//   BM   — полоса зоны на развёртке UVPrint, та же, что у шелкотрафарета
//          (composeBand): стороны А и Б — в четверти окружности от середины.
// Картинка стороны заранее приведена к форме зоны (fitToZone): логотип — по
// центру без растяжения, вырезка из шаблона — как есть.
//
// PET так же, как сборка стакана (render/cups/pet/build_pet.py, compose_print):
// u — азимут от +X по кругу, v — высота z/H снизу вверх; сторона — поле
// widthMm по дуге на своём радиусе и zMm по высоте, центр — азимут deg. Лист
// ложится на развёртку модели сайта (та же UVMap, render/engine/tools/
// export_site_cups.py) и в полном размере уходит в задание рендера — рендер
// подставляет его вместо печати из файла модели. Вне сторон лист прозрачный:
// там PET остаётся прозрачным. Сторон может быть одна или две.

// Радиус наружной стенки на высоте z: профиль [[r, z], …] — ломаная, как
// numpy.interp у сборки (за краями — крайние значения).
function radiusAt(profile, z) {
  if (z <= profile[0][1]) return profile[0][0];
  for (let i = 1; i < profile.length; i++) {
    const [r1, z1] = profile[i];
    const [r0, z0] = profile[i - 1];
    if (z <= z1) return r0 + ((r1 - r0) * (z - z0)) / (z1 - z0);
  }
  return profile[profile.length - 1][0];
}

// images — { A, B }: картинки сторон (что умеет drawImage) или null.
// width — ширина листа в пикселях; высота — по пропорциям стенки.
export function composeSides(spec, images, width) {
  const { widthMm, zMm: [z0, z1], heightMm: H, deg, profileMm } = spec;
  const diameter = 2 * Math.max(...profileMm.map((p) => p[0]));
  const height = Math.max(64, Math.round((width * H) / (Math.PI * diameter) / 64) * 64);
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const g = canvas.getContext('2d');
  g.imageSmoothingEnabled = true;
  g.imageSmoothingQuality = 'high';
  for (const [side, azimuth] of Object.entries(deg)) {
    const image = images[side];
    if (!image) continue;
    const iw = image.width;
    const ih = image.height;
    const uc = (((azimuth % 360) + 360) % 360) / 360;
    // Строка листа — одна высота стакана: на ней сторона — отрезок дуги.
    for (let row = 0; row < height; row++) {
      const z = (1 - (row + 0.5) / height) * H;
      if (z < z0 || z >= z1) continue;
      const span = widthMm / (2 * Math.PI * radiusAt(profileMm, z));
      const sy = Math.min(ih - 1, Math.max(0, (1 - (z - z0) / (z1 - z0)) * ih - 0.5));
      const dx = (uc - span / 2) * width;
      // Поле у шва (u = 0) продолжается с другого края листа.
      for (const shift of [-width, 0, width]) {
        if (dx + shift + span * width < 0 || dx + shift > width) continue;
        g.drawImage(image, 0, sy, iw, 1, dx + shift, row, span * width, 1);
      }
    }
  }
  return canvas;
}

// BM: лист = поле полосы зоны (fieldMm, та же доля развёртки, что задаёт
// textureMapping.field); сторона — прямоугольник zoneMm по центру своей
// четверти, на всю высоту полосы (полоса и есть зона по высоте).
export function composeBand(spec, images, width) {
  const [fw, fh] = spec.fieldMm;
  const [zw] = spec.zoneMm;
  const height = Math.max(16, Math.round((width * fh) / fw));
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const g = canvas.getContext('2d');
  g.imageSmoothingEnabled = true;
  g.imageSmoothingQuality = 'high';
  const pxPerMm = width / fw;
  for (const [side, offset] of Object.entries(spec.offsetMm)) {
    const image = images[side];
    if (!image) continue;
    const x = (fw / 2 + offset - zw / 2) * pxPerMm;
    g.drawImage(image, x, 0, zw * pxPerMm, height);
  }
  return canvas;
}

const compose = (spec, images, width) => (spec.kind === 'band' ? composeBand : composeSides)(spec, images, width);

// Картинка стороны → форма зоны [ширина, высота] мм. fit:
//   'fill'   — вырезка из шаблона: она и есть зона, кладётся как есть;
//   'center' — логотип (PNG, JPG, PDF без шаблона): пустые прозрачные поля
//              обрезаются, остальное вписывается по центру без растяжения
//              (владелец, 2026-09-27).
// Возвращает { url, width, height, release }.
export async function fitToZone(url, zoneMm, fit = 'center') {
  const bitmap = await loadImage(url);
  try {
    const [zw, zh] = zoneMm;
    // 12 px/мм — около 300 dpi: мелкий текст логотипа не мылится.
    const width = Math.round(zw * 12);
    const height = Math.round(zh * 12);
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const g = canvas.getContext('2d');
    g.imageSmoothingEnabled = true;
    g.imageSmoothingQuality = 'high';
    if (fit === 'fill') {
      g.drawImage(bitmap, 0, 0, width, height);
    } else {
      const [sx, sy, sw, sh] = opaqueBox(bitmap);
      const scale = Math.min(width / sw, height / sh);
      const dw = sw * scale;
      const dh = sh * scale;
      g.drawImage(bitmap, sx, sy, sw, sh, (width - dw) / 2, (height - dh) / 2, dw, dh);
    }
    const out = await toBlobUrl(canvas);
    canvas.width = 0;
    return { url: out, width, height, release: () => URL.revokeObjectURL(out) };
  } finally {
    bitmap.close?.();
  }
}

// Где в картинке есть что-то непрозрачное: [x, y, w, h]. Считается по копии
// до 1024 px — у логотипа поля важны, а не точность до пикселя.
function opaqueBox(bitmap) {
  const k = Math.min(1, 1024 / Math.max(bitmap.width, bitmap.height));
  const w = Math.max(1, Math.round(bitmap.width * k));
  const h = Math.max(1, Math.round(bitmap.height * k));
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const g = canvas.getContext('2d', { willReadFrequently: true });
  g.drawImage(bitmap, 0, 0, w, h);
  const { data } = g.getImageData(0, 0, w, h);
  canvas.width = 0;
  let x0 = w;
  let y0 = h;
  let x1 = -1;
  let y1 = -1;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (data[(y * w + x) * 4 + 3] < 8) continue;
      if (x < x0) x0 = x;
      if (x > x1) x1 = x;
      if (y < y0) y0 = y;
      if (y > y1) y1 = y;
    }
  }
  if (x1 < 0) return [0, 0, bitmap.width, bitmap.height];
  // Запас в пиксель копии — край логотипа не срезается округлением.
  const fx = bitmap.width / w;
  const fy = bitmap.height / h;
  const sx = Math.max(0, (x0 - 1) * fx);
  const sy = Math.max(0, (y0 - 1) * fy);
  return [sx, sy, Math.min(bitmap.width, (x1 + 2) * fx) - sx, Math.min(bitmap.height, (y1 + 2) * fy) - sy];
}

const toBlobUrl = (canvas) => new Promise((resolve, reject) => {
  canvas.toBlob((blob) => (blob ? resolve(URL.createObjectURL(blob)) : reject(new Error('лист PET не собрался'))), 'image/png');
});

async function loadImage(url) {
  const blob = await (await fetch(url)).blob();
  return createImageBitmap(blob);
}

// Макет тампопечати для состояния: лист в размер видеокарты (textureUrl) и
// полный — для развёртки и задания рендера (unwrapUrl). parts — { A, B }:
// { url } или null, url — картинка стороны в форме зоны (fitToZone).
export async function composePetDesign(spec, parts, { displayWidth = 2048, fullWidth = 4096 } = {}) {
  const images = {};
  for (const side of Object.keys(spec.deg)) images[side] = parts[side] ? await loadImage(parts[side].url) : null;
  try {
    const display = compose(spec, images, displayWidth);
    const full = compose(spec, images, fullWidth);
    const textureUrl = await toBlobUrl(display);
    const unwrapUrl = await toBlobUrl(full);
    const size = { width: full.width, height: full.height };
    display.width = 0;
    full.width = 0;
    return {
      textureUrl,
      unwrapUrl,
      ...size,
      release: () => {
        URL.revokeObjectURL(textureUrl);
        URL.revokeObjectURL(unwrapUrl);
      },
    };
  } finally {
    for (const image of Object.values(images)) image?.close?.();
  }
}
