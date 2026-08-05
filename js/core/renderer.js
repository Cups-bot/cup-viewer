import * as THREE from 'three';

// Способы сжатия яркости в диапазон экрана (config.renderer.toneMapping).
const TONE_MAPPING = {
  aces: THREE.ACESFilmicToneMapping,
  agx: THREE.AgXToneMapping,
  none: THREE.NoToneMapping,
};

// WebGL-рендерер с физически корректным цветовым конвейером: вывод в sRGB,
// тонмаппинг ACES Filmic, ограниченный pixel ratio.
export function createRenderer(config) {
  const { antialias, preserveDrawingBuffer, alpha, maxPixelRatio, toneMappingExposure, shadows } =
    config.renderer;

  const renderer = new THREE.WebGLRenderer({
    antialias,
    preserveDrawingBuffer,
    alpha,
    // Просим дискретную видеокарту на ноутбуках с двумя GPU.
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxPixelRatio));
  // Холст прозрачный: цвет за сценой рисует CSS, иначе тонмаппинг перекрасил бы
  // фон (см. core/scene.js).
  renderer.setClearAlpha(0);

  // Текстуры авторизованы в sRGB, свет считается в линейном пространстве,
  // итог тонмаппится обратно в sRGB.
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = TONE_MAPPING[config.renderer.toneMapping] ?? THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = toneMappingExposure;

  // Падающая тень на подложке и самозатенение модели.
  if (shadows) {
    renderer.shadowMap.enabled = true;
    // VSM даёт по-настоящему мягкий край с управляемым радиусом размытия.
    // PCFSoft размывает на фиксированную величину в один-два текселя — для
    // тени от крупного софтбокса этого мало, край выходит жёстким.
    renderer.shadowMap.type = THREE.VSMShadowMap;
  }

  return renderer;
}
