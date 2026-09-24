import * as THREE from 'three';
import { HELPER_LAYER } from './layers.js';

// Фон сцены.
//
// Один и тот же фон нужен трём местам: CSS красит им страницу, сцена — холст,
// canvas — подкладывает под снимок сцены. Поэтому он описан здесь один раз.
//
// ── ПОЧЕМУ ФОН НЕ РОВНЫЙ ────────────────────────────────────────────────
//
// Раньше это была одна заливка: ровный цвет от края до края. И пока под
// стаканом не было тени, это работало — предмет читался вырезкой на плашке,
// как в карточке товара.
//
// С появлением направленной тени ровная заливка стала противоречием: тень
// говорит, что есть стол, а стола в кадре нет. Глаз ловит это раньше, чем
// успевает сформулировать, и весь кадр читается собранным из кусков.
//
// Настоящая предметная съёмка идёт на СВЁРТКЕ — листе, который лежит под
// предметом и плавно загибается вверх за ним. Свёртку освещает тот же свет,
// что и предмет, поэтому она никогда не бывает ровной: у основания предмета,
// куда бьёт ключ, она светлее, кверху уходит в полутон. Эта растяжка и есть
// единственное, что сообщает о наличии поверхности, — больше ничего в кадре
// про неё не говорит.
//
// Растяжка НАМЕРЕННО СЛАБАЯ (см. config.backgroundSweep). Страница нужна для
// сверки цвета, и фон здесь — не декорация: серый #777777 выбран как
// средний серый ISO 3664, на фоне которого оценивают цветопробу. Сильная
// растяжка сделала бы соседство с макетом разным сверху и снизу, и одна и та
// же заливка читалась бы двумя разными цветами. Несколько процентов дают
// поверхность, но не мешают сравнению.
//
// backgroundSweep: 0 возвращает прежнюю ровную заливку — и в CSS, и в сцене,
// и в снимке, одним числом.

// Доли высоты кадра, на которых стоят опорные точки растяжки. Линия «горизонта»
// — там, где свёртка загибается вверх; чуть ниже середины, как в кадре.
const HORIZON = 0.62;

// Насколько низ светлее горизонта относительно того, насколько верх темнее.
// Свет у основания предмета собран в пятно, а вниз-вперёд подложка уходит от
// источника, поэтому подъём меньше спада.
const FLOOR_LIFT = 0.35;

// Три цвета растяжки из одного базового. sweep — доля, на которую темнеет верх.
export function backdropColors(value, sweep = 0) {
  const base = new THREE.Color(value);
  const amount = Math.max(0, Math.min(0.4, sweep ?? 0));

  // Масштабируется ЛИНЕЙНАЯ яркость, а не экранное число: подложка темнеет
  // потому, что на неё падает меньше света, а не потому, что её перекрасили.
  const shade = (factor) => {
    const shaded = base.clone().convertSRGBToLinear().multiplyScalar(factor).convertLinearToSRGB();
    return `#${shaded.getHexString()}`;
  };

  return {
    base: `#${base.getHexString()}`,
    top: shade(1 - amount),
    bottom: shade(1 + amount * FLOOR_LIFT),
    flat: amount === 0,
  };
}

// Значение для CSS-свойства background.
export function backdropCss(colors) {
  if (colors.flat) return colors.base;
  return (
    `linear-gradient(180deg, ${colors.top} 0%, ${colors.base} ${Math.round(HORIZON * 100)}%, ` +
    `${colors.bottom} 100%)`
  );
}

// Заливает растяжку в переданный 2D-контекст.
function paint(ctx, width, height, colors) {
  if (colors.flat) {
    ctx.fillStyle = colors.base;
  } else {
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, colors.top);
    gradient.addColorStop(HORIZON, colors.base);
    gradient.addColorStop(1, colors.bottom);
    ctx.fillStyle = gradient;
  }
  ctx.fillRect(0, 0, width, height);
}

// Тот же фон, залитый в 2D-контекст, — для снимка сцены.
export function paintBackdrop(ctx, width, height, colors) {
  paint(ctx, width, height, colors);
}

// Свёртка в самой сцене: прямоугольник, прибитый к камере и закрывающий кадр
// целиком.
//
// ПОЧЕМУ НЕ scene.background С ТЕКСТУРОЙ, как напрашивается. Текстурный фон
// three рисует служебным полноэкранным мешем, и этот меш живёт в обычном списке
// отрисовки. Затенение складок (GTAOPass) снимает глубину сцены, подменив всем
// материал через scene.overrideMaterial, — и служебный меш подменяется вместе
// со всеми. Со своим материалом он занимает весь кадр и глубины не пишет, а с
// чужим превращается в обычную плоскость 2×2 в начале координат, то есть ровно
// там, где стоит стакан. Затенение считает по ней и гасит кадр в чёрный;
// проверено — с текстурным фоном и включённым AO кадр выходил полностью чёрным.
//
// Поэтому свёртка — наш собственный меш на СЛУЖЕБНОМ СЛОЕ: камера затенения
// его не видит (см. core/layers.js), и подмена материала до него не доходит.
//
// Глубину меш не проверяет и не пишет, рисуется первым — значит, его положение
// вдоль взгляда ни на что не влияет, и подгонять его под near/far камеры не
// нужно. Достаточно закрыть поле зрения на выбранном удалении.
const SCREEN_DISTANCE = 1;

export function createBackdropScreen() {
  // Текстура-растяжка: один пиксель в ширину, 256 в высоту. По горизонтали
  // растяжки нет, и растягивать один пиксель на весь кадр ничего не стоит.
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  const texture = new THREE.CanvasTexture(canvas);
  // Цвет записан экранными числами — значит, это sRGB; three переведёт его в
  // рабочее линейное пространство сам.
  texture.colorSpace = THREE.SRGBColorSpace;

  const material = new THREE.MeshBasicMaterial({
    map: texture,
    depthTest: false,
    depthWrite: false,
    fog: false,
    toneMapped: true,
  });

  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
  mesh.name = 'Backdrop';
  mesh.position.z = -SCREEN_DISTANCE;
  // Рисуется раньше всего остального, включая плоскости теней.
  mesh.renderOrder = -1000;
  // Меш прибит к камере и всегда в кадре — отсечение по пирамиде видимости для
  // него лишняя работа, а на краю кадра ещё и источник мерцания.
  mesh.frustumCulled = false;
  mesh.layers.set(HELPER_LAYER);

  return {
    mesh,

    // Перекрашивает свёртку. Пересобирать меш при смене фона не нужно.
    setColors(colors) {
      paint(ctx, 1, 256, colors);
      texture.needsUpdate = true;
    },

    // Подгоняет размер под поле зрения камеры. Зовётся при каждом изменении
    // размера сцены: от соотношения сторон зависит ширина.
    fit(camera) {
      const height = 2 * SCREEN_DISTANCE * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2);
      mesh.scale.set(height * camera.aspect, height, 1);
    },

    dispose() {
      mesh.geometry.dispose();
      material.dispose();
      texture.dispose();
      mesh.removeFromParent();
    },
  };
}
