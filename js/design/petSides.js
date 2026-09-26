// Стороны печати PET → лист развёртки стенки (CupViewer v2, этап В).
//
// Так же, как сборка стакана (render/cups/pet/build_pet.py, compose_print):
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

const toBlobUrl = (canvas) => new Promise((resolve, reject) => {
  canvas.toBlob((blob) => (blob ? resolve(URL.createObjectURL(blob)) : reject(new Error('лист PET не собрался'))), 'image/png');
});

async function loadImage(url) {
  const blob = await (await fetch(url)).blob();
  return createImageBitmap(blob);
}

// Макет PET для состояния: лист в размер видеокарты (textureUrl) и полный —
// для развёртки и задания рендера (unwrapUrl). parts — { A, B }: { url } или
// null, url — растр стороны в полном размере (prepareDesign → unwrapUrl).
export async function composePetDesign(spec, parts, { displayWidth = 2048, fullWidth = 4096 } = {}) {
  const images = {};
  for (const side of Object.keys(spec.deg)) images[side] = parts[side] ? await loadImage(parts[side].url) : null;
  try {
    const display = composeSides(spec, images, displayWidth);
    const full = composeSides(spec, images, fullWidth);
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
