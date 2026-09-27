// «Имитация картона»: макет — таким, каким его напечатают на картоне.
//
// Профиль тот же, что у Color Palette (colorcups): для цвета макета подбираются
// краски, которые дают его на экране, и показывается, как они лягут на этот
// картон (Absolute Colorimetric — картон не белый). Подбор на пиксель стоит
// дорого, поэтому он заранее запечён в куб 33³ на картон
// (scripts/bake-proof.mjs → catalog/proof/), а пиксели берутся из куба
// трилинейно — как applyProof в Color Palette. Тот же куб берёт рендер
// (render/engine/bk/proof.py), поэтому «Фотореал» совпадает с кадром.
//
// Какой картон у материала — поле proof в catalog/materials.json; нет поля
// (крафт, пластик) — имитировать нечем.

const FOLDER = 'catalog/proof';

const cubes = new Map();

// Куб картона: { side, data } — RGB печати по узлам, r-major.
export function loadCube(key) {
  if (!cubes.has(key)) {
    const task = (async () => {
      const response = await fetch(`${FOLDER}/${key}.cube.gz`, { credentials: 'same-origin' });
      if (!response.ok) throw new Error(`профиль «${key}» не загрузился (HTTP ${response.status})`);
      let bytes = new Uint8Array(await response.arrayBuffer());
      // Сервер мог отдать файл уже распакованным (Content-Encoding) — тогда
      // сигнатуры gzip в начале нет.
      if (bytes[0] === 0x1f && bytes[1] === 0x8b) bytes = await gunzip(bytes);
      const side = Math.round(Math.cbrt(bytes.length / 3));
      if (side ** 3 * 3 !== bytes.length) throw new Error(`профиль «${key}»: размер ${bytes.length} — не куб`);
      return { side, data: bytes };
    })();
    // Неудачу не кэшируем: со следующего раза сеть может ожить.
    task.catch(() => cubes.delete(key));
    cubes.set(key, task);
  }
  return cubes.get(key);
}

async function gunzip(bytes) {
  const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

// Пиксели RGBA через куб на месте, байты from…to (кратны четырём).
// Прозрачность не трогаем: у краски её нет, а логотип на пустом фоне — законный
// макет.
export function applyCube(pixels, cube, from = 0, to = pixels.length) {
  const { side, data } = cube;
  const scale = (side - 1) / 255;
  const last = side - 2;
  const plane = side * side * 3;
  const row = side * 3;
  for (let i = from; i < to; i += 4) {
    const px = pixels[i] * scale;
    const py = pixels[i + 1] * scale;
    const pz = pixels[i + 2] * scale;
    const x0 = Math.min(px | 0, last);
    const y0 = Math.min(py | 0, last);
    const z0 = Math.min(pz | 0, last);
    const fx = px - x0;
    const fy = py - y0;
    const fz = pz - z0;
    const base = x0 * plane + y0 * row + z0 * 3;
    for (let c = 0; c < 3; c++) {
      const o = base + c;
      const c00 = data[o] + (data[o + 3] - data[o]) * fz;
      const c01 = data[o + row] + (data[o + row + 3] - data[o + row]) * fz;
      const c10 = data[o + plane] + (data[o + plane + 3] - data[o + plane]) * fz;
      const c11 = data[o + plane + row] + (data[o + plane + row + 3] - data[o + plane + row]) * fz;
      const c0 = c00 + (c01 - c00) * fy;
      const c1 = c10 + (c11 - c10) * fy;
      pixels[i + c] = c0 + (c1 - c0) * fx;
    }
  }
}

// Кусок в миллион байт — четверть миллиона пикселей: между кусками страница
// успевает отрисовать кадр, и полноразмерная развёртка не подвешивает её.
const CHUNK = 4 * 250_000;
const nextFrame = () => new Promise((resolve) => setTimeout(resolve, 0));

async function decode(url, maxSide) {
  const blob = await (await fetch(url)).blob();
  const probe = await createImageBitmap(blob);
  const k = Math.min(1, maxSide / Math.max(probe.width, probe.height));
  if (k >= 1) return probe;
  const width = Math.max(1, Math.round(probe.width * k));
  const height = Math.max(1, Math.round(probe.height * k));
  probe.close();
  return createImageBitmap(blob, { resizeWidth: width, resizeHeight: height, resizeQuality: 'high' });
}

// Готовые адреса: макет × картон × размер. Держим несколько последних —
// переключатель и смена картона туда-обратно отвечают сразу.
const made = new Map();
const KEEP = 12;

// Адрес (blob:) картинки url в печати на картоне key. maxSide — потолок
// стороны: 3D-текстуре хватает 2048, развёртке нужен полный размер.
export function proofedUrl(url, key, { maxSide = 8192 } = {}) {
  const id = `${key}|${maxSide}|${url}`;
  if (made.has(id)) {
    const task = made.get(id);
    made.delete(id);
    made.set(id, task);
    return task;
  }
  const task = (async () => {
    const [cube, bitmap] = await Promise.all([loadCube(key), decode(url, maxSide)]);
    const canvas = document.createElement('canvas');
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(bitmap, 0, 0);
    bitmap.close();
    const image = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for (let from = 0; from < image.data.length; from += CHUNK) {
      applyCube(image.data, cube, from, Math.min(image.data.length, from + CHUNK));
      await nextFrame();
    }
    ctx.putImageData(image, 0, 0);
    const blob = await new Promise((resolve, reject) =>
      canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('не удалось собрать картинку'))), 'image/png'));
    return URL.createObjectURL(blob);
  })();
  task.catch(() => made.delete(id));
  made.set(id, task);
  while (made.size > KEEP) {
    const [oldest, stale] = made.entries().next().value;
    made.delete(oldest);
    stale.then((u) => URL.revokeObjectURL(u), () => {});
  }
  return task;
}
