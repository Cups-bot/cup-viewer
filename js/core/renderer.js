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
  // Очистка прозрачной. Сам фон рисуется в кадр — заливкой сцены и свёрткой
  // (см. core/backdrop.js), — но в фото-сцене кадр подкладывается отдельным
  // проходом, и тогда холст обязан быть прозрачным.
  renderer.setClearAlpha(0);

  // Текстуры авторизованы в sRGB, свет считается в линейном пространстве,
  // итог тонмаппится обратно в sRGB.
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = TONE_MAPPING[config.renderer.toneMapping] ?? THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = toneMappingExposure;

  // Падающая тень на подложке и самозатенение модели.
  if (shadows) {
    renderer.shadowMap.enabled = true;
    // PCF с управляемым радиусом (lighting.shadow.radius): девять выборок,
    // разнесённых на заданное число текселей. Край получается мягким ровно
    // настолько, насколько попросили.
    //
    // ПОЧЕМУ НЕ VSM, КОТОРЫЙ СТОЯЛ ЗДЕСЬ РАНЬШЕ. VSM хранит не глубину, а её
    // среднее и разброс, и мягкость получает размытием этих величин. Там, где
    // рядом оказываются загораживатели на разной глубине — у стакана это стык
    // донышка со стенкой, — смешанные моменты дают заниженную оценку
    // загороженности, и СКВОЗЬ ТЕНЬ ПРОСТУПАЕТ СВЕТЛЫЙ ПРОЧЕРК. Это известная
    // «утечка» VSM, лечится она только уменьшением радиуса, то есть отказом от
    // той самой мягкости, ради которой VSM и брали. Замер на этой сцене:
    // VSM radius 3,5 — прочерк +6 единиц яркости поперёк тени, виден глазом;
    // PCF того же радиуса — +0,8, то есть шум.
    //
    // PCFSoft (без «Soft» в имени константы ниже) радиус игнорирует: он
    // размывает на фиксированные один-два текселя, и регулировать нечем.
    renderer.shadowMap.type = THREE.PCFShadowMap;
  }

  return renderer;
}
