import * as THREE from 'three';

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

  // Текстуры авторизованы в sRGB, свет считается в линейном пространстве,
  // итог тонмаппится обратно в sRGB.
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = toneMappingExposure;

  // Только самозатенение; тень под моделью рисует contactShadow.js.
  if (shadows) {
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  }

  return renderer;
}
