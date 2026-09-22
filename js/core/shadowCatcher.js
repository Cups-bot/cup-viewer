import * as THREE from 'three';
import { HELPER_LAYER } from './layers.js';

// Плоскость, на которую падает тень от предмета.
//
// ПОЧЕМУ НЕ ПРЕЖНЯЯ «КОНТАКТНАЯ ТЕНЬ». Тот способ рисовал модель сверху в
// текстуру, размывал её и клал под стакан. Получалось мягкое пятно —
// приблизительно там, где надо, но это не тень: у неё нет источника, нет формы
// предмета в проекции и нет края. Ради направления её приходилось «сдвигать»
// матрицей, и от любого наклона она расплывалась в кляксу.
//
// Здесь тень настоящая: ключевой источник света рисует сцену со своей стороны,
// и всё, что от него закрыто, оказывается в тени. Отсюда и форма (проекция
// стакана, а не круглое пятно), и направление, и мягкий, но читаемый край.
//
// Плоскость невидима сама по себе: ShadowMaterial рисует ТОЛЬКО тень, в
// остальных местах остаётся прозрачным. Поэтому под стаканом не появляется
// «стол», а на фоне видна одна тень.
//
// ── ДВЕ ПОПРАВКИ, БЕЗ КОТОРЫХ ТЕНЬ ВЫГЛЯДИТ НАРИСОВАННОЙ ────────────────
//
// 1. ПЛОТНОСТЬ ПАДАЕТ С УДАЛЕНИЕМ. Карта теней отвечает на вопрос «видно ли
//    отсюда источник» — да или нет, одинаково в сантиметре от предмета и в
//    полуметре. Получается ровная серая плита с чёткой границей: замер по
//    строке давал 187, 187, 187, 187, 187 подряд через весь след. У настоящей
//    тени так не бывает: чем дальше от предмета, тем больше рассеянного света
//    со всех сторон доходит до подложки и тем светлее тень, а её край
//    размывается тем сильнее, чем длиннее «пролёт». Поэтому плотность здесь
//    гасится по расстоянию от основания предмета.
//
// 2. ТЕНЬ НЕ ЧЁРНАЯ. В тени предмет освещён только рассеянным светом, а он
//    в студии холоднее ключевого. На фотографии тень всегда чуть уходит в
//    синеву — и именно это отличает её от «заливки серым по фону».

// Вершинный шейдер ShadowMaterial дополняется одной строкой: положение точки в
// собственных координатах плоскости. По нему в пиксельном шейдере считается
// расстояние до оси предмета — плоскость центрирована под моделью.
const VERTEX_HOOK = {
  from: '#include <begin_vertex>',
  to: '#include <begin_vertex>\n\tvPlanePos = position.xy;',
};

// Итоговая строка ShadowMaterial: прозрачность равна плотности тени.
// Домножаем её на затухание по расстоянию.
const FRAGMENT_HOOK = {
  from: 'gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );',
  to: `float dist = length( vPlanePos );
    float reach = 1.0 - smoothstep( falloffStart, falloffEnd, dist );
    gl_FragColor = vec4( color, opacity * reach * ( 1.0 - studioShadowMask(dist) ) );`,
};

// Отдельная мягкость приёмника не размывает самозатенение ободка и стенки.
// 48 распределённых выборок вместо редкой сетки PCF: у дна край собранный,
// вдали широкая полутень. В фото-режиме сохраняется штатный getShadowMask().
const STUDIO_SHADOW = `
uniform vec2 studioPenumbra;
uniform bool studioShadowEnabled;
float studioShadowMask(float distanceFromBase) {
  float result = getShadowMask();
  #if defined(USE_SHADOWMAP) && NUM_SPOT_LIGHT_SHADOWS > 0
    if (studioShadowEnabled && receiveShadow) {
      vec3 coord = vSpotLightCoord[0].xyz / vSpotLightCoord[0].w;
      coord.z += spotLightShadows[0].shadowBias;
      result = 1.0;
      if (coord.z <= 1.0 && coord.x >= 0.0 && coord.x <= 1.0 && coord.y >= 0.0 && coord.y <= 1.0) {
      float spread = mix(studioPenumbra.x, studioPenumbra.y,
        smoothstep(0.1, 0.65, distanceFromBase));
      vec2 texel = spread / spotLightShadows[0].shadowMapSize;
      float visibility = 0.0;
      #pragma unroll_loop_start
      for (int i = 0; i < 48; i++) {
        {
        float t = (float(UNROLLED_LOOP_INDEX) + 0.5) / 48.0;
        float radius = sqrt(-2.0 * log(1.0 - t * 0.98)) * 0.5;
        float angle = float(UNROLLED_LOOP_INDEX) * 2.39996323;
        vec2 offset = vec2(cos(angle), sin(angle)) * radius * texel;
        visibility += texture2DCompare(spotShadowMap[0], coord.xy + offset, coord.z);
        }
      }
      #pragma unroll_loop_end
      result = visibility / 48.0;
      }
    }
  #endif
  return result;
}
`;

export function createShadowCatcher(config) {
  const options = config.shadowCatcher;

  // Плоскость обязана целиком помещаться в освещённую область: за её границей
  // теней не существует, и выборка размазывает наружу краевой тексель.
  const limit = config.lighting.shadow.frustum * 2;
  if (options.size > limit) {
    console.warn(
      `shadowCatcher.size (${options.size}) больше области карты теней (${limit}). ` +
        'По кадру пойдёт бледная полоса — уменьшите размер или поднимите lighting.shadow.frustum.',
    );
  }

  const material = new THREE.ShadowMaterial();
  material.color.set(options.tint ?? '#000000');
  material.opacity = options.opacity;
  material.transparent = true;
  // Плоскость лежит в самом низу сцены; глубину она не пишет, чтобы не спорить
  // с затенением складок на подложке.
  material.depthWrite = false;

  const uniforms = {
    falloffStart: { value: options.falloffStart ?? 0.2 },
    falloffEnd: { value: options.falloffEnd ?? 1 },
    studioPenumbra: { value: new THREE.Vector2(2, 42) },
    studioShadowEnabled: { value: false },
  };

  material.onBeforeCompile = (shader) => {
    shader.uniforms.falloffStart = uniforms.falloffStart;
    shader.uniforms.falloffEnd = uniforms.falloffEnd;
    shader.uniforms.studioPenumbra = uniforms.studioPenumbra;
    shader.uniforms.studioShadowEnabled = uniforms.studioShadowEnabled;

    if (!shader.vertexShader.includes(VERTEX_HOOK.from) || !shader.fragmentShader.includes(FRAGMENT_HOOK.from)) {
      // Обновление three, переписавшее ShadowMaterial, оставило бы тень без
      // затухания — сообщаем об этом вместо тихой потери эффекта.
      console.warn('ShadowCatcher: шейдер ShadowMaterial изменился — тень будет без затухания.');
      return;
    }

    shader.vertexShader = `varying vec2 vPlanePos;\n${shader.vertexShader}`.replace(
      VERTEX_HOOK.from,
      VERTEX_HOOK.to,
    );
    shader.fragmentShader =
      `uniform float falloffStart;\nuniform float falloffEnd;\nvarying vec2 vPlanePos;\n${shader.fragmentShader}`.replace(
        FRAGMENT_HOOK.from,
        FRAGMENT_HOOK.to,
      ).replace('#include <shadowmask_pars_fragment>', '#include <shadowmask_pars_fragment>\n' + STUDIO_SHADOW);
  };

  const plane = new THREE.Mesh(new THREE.PlaneGeometry(options.size, options.size), material);
  plane.rotation.x = -Math.PI / 2;
  plane.receiveShadow = true;
  plane.renderOrder = -1;
  // Слой обвязки: расчёт затенения складок эту плоскость видеть не должен,
  // иначе она обводит стакан тёмным кольцом по фону (см. core/layers.js).
  plane.layers.set(HELPER_LAYER);
  plane.name = 'ShadowCatcher';

  return {
    plane,

    // Ставится на нижнюю точку модели.
    setHeight(y) {
      plane.position.y = y;
    },

    setOpacity(value) {
      material.opacity = value;
    },

    setPenumbra(options) {
      uniforms.studioShadowEnabled.value = !!options;
      if (options) uniforms.studioPenumbra.value.set(options.near, options.far);
    },

    // Расстояния, на которых тень начинает гаснуть и гаснет полностью.
    // Фото-сцены сюда не заходят: там тень запечена в кадр.
    setFalloff(start, end) {
      if (start != null) uniforms.falloffStart.value = start;
      if (end != null) uniforms.falloffEnd.value = end;
    },

    dispose() {
      plane.geometry.dispose();
      material.dispose();
      plane.removeFromParent();
    },
  };
}
