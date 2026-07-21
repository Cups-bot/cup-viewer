import * as THREE from 'three';
import { EXRLoader } from 'three/addons/loaders/EXRLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

// Пиксели ярче этой доли пика считаются частью солнца.
const SUN_THRESHOLD = 0.25;
// Половина окна поиска вокруг пика, в долях высоты карты.
const SUN_WINDOW = 0.06;

// Загрузчик по расширению файла — .exr и .hdr грузятся одинаково.
function loaderFor(url) {
  return url.toLowerCase().endsWith('.exr') ? new EXRLoader() : new RGBELoader();
}

// Декодирование одного half-float (HDR-загрузчики отдают Uint16).
function halfToFloat(h) {
  const sign = (h & 0x8000) >> 15;
  const exponent = (h & 0x7c00) >> 10;
  const fraction = h & 0x03ff;
  if (exponent === 0) return (sign ? -1 : 1) * 2 ** -14 * (fraction / 1024);
  if (exponent === 31) return fraction ? NaN : (sign ? -1 : 1) * Infinity;
  return (sign ? -1 : 1) * 2 ** (exponent - 15) * (1 + fraction / 1024);
}

// Ищет самый яркий источник (солнце) в equirectangular-HDRI.
// Направление — по конвенции equirectUv() three.js:
//   u = atan2(z, x) / 2π + 0.5      v = asin(y) / π + 0.5
// Загрузчики отдают данные с flipY: true, поэтому строка 0 — верх карты (зенит).
// Центроид берётся по окну вокруг пика, а не по всей карте, чтобы второй яркий
// участок (градиент неба, окно) не увёл результат в сторону.
export function analyzeSun(texture) {
  const { width: w, height: h, data } = texture.image;
  const isHalf = data instanceof Uint16Array;
  const at = (i) => (isHalf ? halfToFloat(data[i]) : data[i]);
  const stride = data.length / (w * h);

  const luminance = new Float32Array(w * h);
  let peak = 0;
  let peakIndex = 0;
  let mean = 0;

  for (let i = 0; i < w * h; i++) {
    const o = i * stride;
    const value = 0.2126 * at(o) + 0.7152 * at(o + 1) + 0.0722 * at(o + 2);
    luminance[i] = value;
    mean += value;
    if (value > peak) {
      peak = value;
      peakIndex = i;
    }
  }
  mean /= w * h;

  const threshold = peak * SUN_THRESHOLD;
  const peakRow = Math.floor(peakIndex / w);
  const peakCol = peakIndex % w;
  const window = Math.max(4, Math.round(h * SUN_WINDOW));

  const dir = new THREE.Vector3();
  const color = new THREE.Color(0, 0, 0);
  // Телесный угол одного текселя на экваторе; масштабируется на cos(широты) по
  // строкам, т.к. строки у полюсов покрывают меньше неба, чем на экваторе.
  const texelSolidAngle = ((2 * Math.PI) / w) * (Math.PI / h);
  let weight = 0;
  let irradiance = 0;
  let pixels = 0;

  for (let r = Math.max(0, peakRow - window); r < Math.min(h, peakRow + window); r++) {
    for (let c = peakCol - window; c < peakCol + window; c++) {
      const col = (c + w) % w; // карта заворачивается по горизонтали
      const i = r * w + col;
      const value = luminance[i];
      if (value < threshold) continue;

      const u = (col + 0.5) / w;
      const v = 1 - (r + 0.5) / h;
      const phi = (u - 0.5) * 2 * Math.PI;
      const theta = (v - 0.5) * Math.PI;
      const cosTheta = Math.cos(theta);

      dir.x += value * cosTheta * Math.cos(phi);
      dir.y += value * Math.sin(theta);
      dir.z += value * cosTheta * Math.sin(phi);
      weight += value;

      const o = i * stride;
      color.r += at(o);
      color.g += at(o + 1);
      color.b += at(o + 2);

      irradiance += value * texelSolidAngle * cosTheta;
      pixels++;
    }
  }

  if (weight === 0) {
    return {
      direction: new THREE.Vector3(0, 1, 0),
      color: new THREE.Color(1, 1, 1),
      irradiance: 0,
      angularRadius: 0,
      peak,
      mean,
    };
  }

  dir.normalize();
  // Нормируем по ярчайшему каналу: свет несёт оттенок, общий уровень — дело
  // интенсивности.
  const brightest = Math.max(color.r, color.g, color.b) || 1;
  color.multiplyScalar(1 / brightest);

  // Диск равной площади с пятном, выраженный через угол.
  const angularRadius = Math.sqrt((pixels * texelSolidAngle) / Math.PI);

  return { direction: dir, color, irradiance, angularRadius, peak, mean };
}

// Грузит equirectangular-HDRI и ставит её источником IBL для сцены.
// Карта пред-фильтруется PMREMGenerator (для каждого уровня шероховатости — свой
// корректно размытый мип, иначе глянец и шероховатость «искрят»). Результат идёт
// только в scene.environment, но не в scene.background: фон остаётся управляемым
// плоским цветом, а модель освещена полным диапазоном HDRI.
export function loadEnvironment(scene, renderer, config, onProgress) {
  const url = config.assets.hdri;

  return new Promise((resolve, reject) => {
    loaderFor(url).load(
      url,
      (texture) => {
        // Солнце ищем до dispose: это единственный момент, когда доступна сырая
        // яркость по пикселям — кубическая карта дальше уже размыта.
        const sun = analyzeSun(texture);

        // Фильтруем один раз, затем освобождаем и генератор, и сырую текстуру:
        // дальше нужна только небольшая кубическая карта.
        const pmrem = new THREE.PMREMGenerator(renderer);
        pmrem.compileEquirectangularShader();
        const envMap = pmrem.fromEquirectangular(texture).texture;

        texture.dispose();
        pmrem.dispose();

        scene.environment = envMap;
        if ('environmentIntensity' in scene) {
          scene.environmentIntensity = config.lighting.environmentIntensity;
        }

        resolve({ envMap, sun });
      },
      (event) => onProgress?.(event.total > 0 ? (event.loaded / event.total) * 100 : -1),
      (error) => reject(new Error(`Не удалось загрузить HDRI "${url}": ${error?.message ?? error}`)),
    );
  });
}

// Применяет envMapIntensity ко всем материалам объекта. На three r160
// scene.environment подхватывается автоматически, но интенсивность на материалах
// приходится задавать явно ради единообразия.
export function applyEnvironmentIntensity(root, intensity) {
  root.traverse((node) => {
    if (!node.isMesh || !node.material) return;
    const materials = Array.isArray(node.material) ? node.material : [node.material];
    for (const material of materials) {
      if (!('envMapIntensity' in material)) continue;
      material.envMapIntensity = intensity;
      material.needsUpdate = true;
    }
  });
}
