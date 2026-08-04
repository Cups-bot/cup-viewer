import * as THREE from 'three';

// Микрорельеф бумаги.
//
// ЗАЧЕМ. Идеально гладкая поверхность отражает свет одинаково по всей стенке, и
// материал читается как пластик или крашеный металл — что угодно, кроме
// картона. Настоящая бумага состоит из волокон: рельеф неразличим по отдельности,
// но он рассеивает блик неровно, и именно эта еле заметная «шероховатость
// света» опознаётся как бумага.
//
// Рельеф не рисуется геометрией — он задаётся картой нормалей: в каждой точке
// она чуть отклоняет направление поверхности, и освещение считается так, будто
// там неровность. Полигонов не прибавляется вовсе.
//
// Карта строится процедурно, в canvas, и весит ноль байт загрузки.

// Сторона карты в пикселях.
const SIZE = 512;
// Сколько раз карта укладывается по стенке стакана.
const REPEAT = 6;

// Значение шума в точке. Три слоя разной частоты — переплетение волокон разного
// размера.
//
// Все три частоты высокие намеренно. Волокно бумаги неразличимо по отдельности:
// на глаз это ровная поверхность, у которой лишь чуть «дрожит» блик. Стоит
// добавить низкую частоту — и вместо бумаги получается штукатурка или кожа:
// крупные пятна глаз читает как рельеф, а не как фактуру материала.
function noiseField(width, height) {
  const field = new Float32Array(width * height);

  const layers = [
    { cells: 32, weight: 0.4 },
    { cells: 96, weight: 0.35 },
    { cells: 192, weight: 0.25 },
  ];

  for (const { cells, weight } of layers) {
    // Решётка случайных значений, между узлами — плавная интерполяция.
    const grid = new Float32Array((cells + 1) * (cells + 1));
    for (let i = 0; i < grid.length; i++) grid[i] = Math.random();

    const smooth = (t) => t * t * (3 - 2 * t);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const gx = (x / width) * cells;
        const gy = (y / height) * cells;
        const x0 = Math.floor(gx);
        const y0 = Math.floor(gy);
        const tx = smooth(gx - x0);
        const ty = smooth(gy - y0);

        // Индексы заворачиваются: карта должна стыковаться сама с собой, иначе
        // по стенке пойдёт видимый шов.
        const ix = (i) => i % cells;
        const iy = (j) => j % cells;
        const at = (i, j) => grid[iy(j) * (cells + 1) + ix(i)];

        const top = at(x0, y0) * (1 - tx) + at(x0 + 1, y0) * tx;
        const bottom = at(x0, y0 + 1) * (1 - tx) + at(x0 + 1, y0 + 1) * tx;
        field[y * width + x] += (top * (1 - ty) + bottom * ty) * weight;
      }
    }
  }

  return field;
}

// Переводит поле высот в карту нормалей: наклон поверхности — это разница
// высот между соседними точками.
function heightToNormalMap(field, size) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext('2d');
  const image = ctx.createImageData(size, size);
  const at = (x, y) => field[((y + size) % size) * size + ((x + size) % size)];

  // Насколько круто трактовать перепад высот. Подобрано так, чтобы рельеф
  // читался на блике и не превращался в чешую.
  const strength = 1.4;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = (at(x + 1, y) - at(x - 1, y)) * strength;
      const dy = (at(x, y + 1) - at(x, y - 1)) * strength;

      // Нормаль (-dx, -dy, 1), нормированная и переведённая в диапазон 0…255.
      const length = Math.hypot(dx, dy, 1);
      const offset = (y * size + x) * 4;
      image.data[offset] = ((-dx / length) * 0.5 + 0.5) * 255;
      image.data[offset + 1] = ((-dy / length) * 0.5 + 0.5) * 255;
      image.data[offset + 2] = (1 / length) * 0.5 * 255 + 127.5;
      image.data[offset + 3] = 255;
    }
  }

  ctx.putImageData(image, 0, 0);
  return canvas;
}

let cached = null;

// Карта нормалей бумаги. Строится один раз на всю страницу.
export function paperNormalMap() {
  if (cached) return cached;

  const field = noiseField(SIZE, SIZE);
  const texture = new THREE.CanvasTexture(heightToNormalMap(field, SIZE));
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(REPEAT, REPEAT);
  // Карта нормалей хранит направления, а не цвет: переводить её через sRGB
  // нельзя, иначе рельеф перекосит.
  texture.colorSpace = THREE.NoColorSpace;
  texture.anisotropy = 4;

  cached = texture;
  return cached;
}

// Вешает микрорельеф на материал. Сила задаётся в конфиге: 0 — гладко.
export function applyPaperSurface(material, scale) {
  if (!('normalScale' in material)) return false;
  if (!scale) return false;

  material.normalMap = paperNormalMap();
  material.normalScale = new THREE.Vector2(scale, scale);
  material.needsUpdate = true;
  return true;
}
