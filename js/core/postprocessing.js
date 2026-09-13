import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { GTAOPass } from 'three/addons/postprocessing/GTAOPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { OutputShader } from 'three/addons/shaders/OutputShader.js';
import { OBJECT_LAYER } from './layers.js';

// Конвейер отрисовки: сцена → затенение складок (AO) → тонмаппинг на экран.
//
// ЗАЧЕМ. Без ambient occlusion предмет выглядит плоским: свет из окружения
// приходит со всех сторон одинаково, и места, куда он физически не мог бы
// достать — внутренний угол стакана, стык стенки с донышком, зазор под
// ободком, — остаются такими же светлыми, как открытая стенка. Глаз читает это
// как «наклейка», а не «предмет». AO находит такие места по глубине и нормалям
// в уже отрисованном кадре и притемняет их.
//
// Взят GTAO (ground-truth AO) — из трёх реализаций в three.js он даёт самый
// правдоподобный результат при сравнимой цене.
//
// ПОРЯДОК ПРОХОДОВ ВАЖЕН. AO должен применяться к линейному изображению, ДО
// тонмаппинга: если притемнять уже сжатую в экранный диапазон картинку, тени
// уходят в грязь. Поэтому OutputPass (тонмаппинг + перевод в sRGB) стоит
// последним, а рендер до него идёт в буфер с расширенным диапазоном.
//
// Три.js сам отключает тонмаппинг, когда рисует не на экран, а в буфер, — так
// что двойного применения не происходит.

// Зерно поверх всего кадра — шов между снятой сценой и живым стаканом.
//
// В фотографии зерно есть всегда, в компьютерной картинке его нет вовсе, и
// именно эта разница выдаёт «наклейку» раньше, чем несовпадение света или
// перспективы. Поэтому зерно кладётся ПОСЛЕ тонмаппинга и на весь кадр сразу —
// и на фон, и на стакан: общий знаменатель важнее правдоподобия самого зерна.
//
// Вне фото-сцены сила равна нулю, и проход просто копирует кадр.
const GrainShader = {
  uniforms: {
    tDiffuse: { value: null },
    amount: { value: 0 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float amount;
    varying vec2 vUv;

    // Зерно неподвижно: кадр перерисовывается по требованию, и «живой» шум
    // мерцал бы при каждом повороте, притягивая к себе всё внимание.
    float grain(vec2 uv) {
      return fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
    }

    void main() {
      vec4 color = texture2D(tDiffuse, vUv);
      if (amount > 0.0) {
        float n = grain(vUv) - 0.5;
        // В тенях зерно заметнее, чем в светах, — как на плёнке.
        float weight = 1.0 - 0.6 * dot(color.rgb, vec3(0.2126, 0.7152, 0.0722));
        // Кадр с умноженной на покрытие альфой: на пустых полях холста зерну
        // места нет, иначе там проступает цветной шум поверх страницы.
        color.rgb += n * amount * weight * color.a;
      }
      gl_FragColor = color;
    }
  `,
};

// Выход конвейера: тонмаппинг и перевод в sRGB — как у OutputPass из three,
// с двумя поправками.
//
// 1. ОТРИЦАТЕЛЬНЫЕ ЦВЕТА. AgX считает в широком охвате Rec.2020 и в конце
//    возвращается в sRGB; у насыщенных цветов (тёмная жёлто-зелёная листва,
//    чистый жёлтый в печати) один из каналов уходит в минус. Дальше sRGB-кривая
//    берёт от него pow(), в GLSL это NaN, и пиксель становится ЧЁРНЫМ. На фото
//    это выглядело как дыры в растениях. Отсекаем минус до перевода.
//
// 2. КРАЙ МОДЕЛИ. Холст прозрачный, и цвет на краю силуэта уже умножен на
//    покрытие. Тонмаппинг и sRGB-кривая нелинейны: применённые к умноженному
//    цвету, они высветляют край — вокруг стакана появляется светлая кайма.
//    Поэтому цвет сначала делится на покрытие, а после перевода умножается
//    обратно.
const OUTPUT_FRAGMENT = /* glsl */ `
  precision highp float;

  uniform sampler2D tDiffuse;

  #include <tonemapping_pars_fragment>
  #include <colorspace_pars_fragment>

  varying vec2 vUv;

  void main() {
    gl_FragColor = texture2D( tDiffuse, vUv );
    float coverage = gl_FragColor.a;
    if ( coverage > 0.0 ) gl_FragColor.rgb /= coverage;

    #ifdef LINEAR_TONE_MAPPING
      gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
    #elif defined( REINHARD_TONE_MAPPING )
      gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
    #elif defined( CINEON_TONE_MAPPING )
      gl_FragColor.rgb = OptimizedCineonToneMapping( gl_FragColor.rgb );
    #elif defined( ACES_FILMIC_TONE_MAPPING )
      gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
    #elif defined( AGX_TONE_MAPPING )
      gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
    #endif

    gl_FragColor.rgb = max( gl_FragColor.rgb, vec3( 0.0 ) );

    #ifdef SRGB_TRANSFER
      gl_FragColor = sRGBTransferOETF( gl_FragColor );
    #endif

    gl_FragColor.rgb *= coverage;
  }
`;

class SafeOutputPass extends OutputPass {
  constructor() {
    super();
    // Дефайны тонмаппинга OutputPass выставляет сам при первой отрисовке —
    // подменяем только текст шейдера, до компиляции.
    this.material.fragmentShader = OUTPUT_FRAGMENT;
    this.material.vertexShader = OutputShader.vertexShader;
  }
}

// Снятый кадр фото-сцены под стаканом.
//
// ПОЧЕМУ ОТДЕЛЬНЫМ ПРОХОДОМ, ПОСЛЕ ТОНМАППИНГА. Кадр уже снят и уже прошёл
// тонмаппинг в Blender. Пока он висел плоскостью внутри сцены, браузер
// накладывал на него второй: тени проваливались, света теряли цвет, а
// насыщенные места чернели (см. SafeOutputPass). Здесь он кладётся под готовый
// стакан как есть, пиксель в пиксель, и тонмаппинг достаётся только стакану.
//
// Тень ложится на кадр в ЛИНЕЙНОМ пространстве обычным alpha-over — ровно так,
// как её считал экспортёр (export_photo_scene.py → shadow_layer), поэтому
// плотность совпадает с рендером без подгонки. Стакан — поверх, уже в экранном
// пространстве, как в любом фоторедакторе.
const BackdropShader = {
  uniforms: {
    tDiffuse: { value: null },
    backdrop: { value: null },
    shadow: { value: null },
    hasBackdrop: { value: false },
    hasShadow: { value: false },
    shadowOpacity: { value: 1 },
    // Доля холста, которую занимает кадр по ширине и высоте: кадр вписан
    // целиком и по центру (см. photoScene.fovFor).
    frameSize: { value: new THREE.Vector2(1, 1) },
  },
  vertexShader: GrainShader.vertexShader,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform sampler2D backdrop;
    uniform sampler2D shadow;
    uniform bool hasBackdrop;
    uniform bool hasShadow;
    uniform float shadowOpacity;
    uniform vec2 frameSize;
    varying vec2 vUv;

    vec3 toDisplay(vec3 c) {
      c = max(c, vec3(0.0));
      return mix(pow(c, vec3(0.41666)) * 1.055 - vec3(0.055), c * 12.92,
                 vec3(lessThanEqual(c, vec3(0.0031308))));
    }

    void main() {
      vec4 cup = texture2D(tDiffuse, vUv);
      vec2 uv = (vUv - 0.5) / frameSize + 0.5;
      // Выборки — до ветвления: уровни мипмапа считаются по производным, а
      // внутри условия они не определены.
      vec3 room = texture2D(backdrop, uv).rgb;
      vec4 shade = texture2D(shadow, uv);

      bool inside = all(greaterThanEqual(uv, vec2(0.0))) && all(lessThanEqual(uv, vec2(1.0)));
      if (!hasBackdrop || !inside) {
        gl_FragColor = cup;
        return;
      }
      if (hasShadow) room = mix(room, shade.rgb, clamp(shade.a * shadowOpacity, 0.0, 1.0));
      gl_FragColor = vec4(cup.rgb + toDisplay(room) * (1.0 - cup.a), 1.0);
    }
  `,
};

export class RenderPipeline {
  constructor({ renderer, scene, camera, config }) {
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;
    this.config = config;

    const quality = config.quality ?? {};
    this.enabled = quality.postProcessing !== false;

    if (!this.enabled) return;

    const size = renderer.getDrawingBufferSize(new THREE.Vector2());

    // Собственный буфер вместо стандартного: нужен и расширенный диапазон
    // (HalfFloat), и аппаратное сглаживание. Композер по умолчанию создаёт
    // буфер без сглаживания, и края модели становятся лестницей — при переходе
    // на постобработку это первое, что бросается в глаза.
    this.target = new THREE.WebGLRenderTarget(size.x, size.y, {
      type: THREE.HalfFloatType,
      samples: quality.msaaSamples ?? 4,
    });

    this.composer = new EffectComposer(renderer, this.target);
    this.composer.setPixelRatio(renderer.getPixelRatio());

    this.renderPass = new RenderPass(scene, camera);
    this.composer.addPass(this.renderPass);

    // Отдельная камера для AO — копия основной, но без вспомогательной обвязки:
    // плоскости теней и поворотный круг в расчёте участвовать не должны. Сам
    // пол (core/floor.js) в расчёт входит — на нём и появляется затенение у
    // контакта.
    this.aoCamera = camera.clone();
    this.aoCamera.layers.set(OBJECT_LAYER);

    this.gtao = new GTAOPass(scene, this.aoCamera, size.x, size.y);
    this.gtao.output = GTAOPass.OUTPUT.Default;
    // Шумоподавление поверх затенения. Значения по умолчанию рассчитаны на
    // крупные сцены; у нас один предмет крупным планом, и на границе его
    // силуэта оставалась рябь.
    this.gtao.updatePdMaterial({
      lumaPhi: 10,
      depthPhi: 2,
      normalPhi: 3,
      radius: 8,
      rings: 4,
      samples: 16,
    });
    this.setAmbientOcclusion(quality.ambientOcclusion ?? {});
    this.composer.addPass(this.gtao);

    // Тонмаппинг и перевод в sRGB. Настройки берёт с рендерера, поэтому
    // config.renderer.toneMapping продолжает работать как раньше.
    this.composer.addPass(new SafeOutputPass());

    // Снятый кадр фото-сцены — под стакан, уже после тонмаппинга. В студии
    // проход выключен и в цепочке не участвует.
    this.backdrop = new ShaderPass(BackdropShader);
    this.backdrop.enabled = false;
    this.composer.addPass(this.backdrop);

    // Зерно — последним, уже по готовому кадру.
    this.grain = new ShaderPass(GrainShader);
    this.composer.addPass(this.grain);
  }

  // Параметры затенения складок. radius — в мировых единицах: модель
  // нормализована к размеру 0.5, поэтому осмысленные значения — сотые доли.
  setAmbientOcclusion(options = {}) {
    if (!this.gtao) return;
    const ao = { ...(this.config.quality?.ambientOcclusion ?? {}), ...options };

    this.gtao.enabled = ao.enabled !== false;
    this.gtao.blendIntensity = ao.intensity ?? 1;
    this.gtao.updateGtaoMaterial({
      radius: ao.radius ?? 0.06,
      distanceExponent: ao.distanceExponent ?? 1,
      thickness: ao.thickness ?? 0.3,
      scale: ao.scale ?? 1,
      samples: ao.samples ?? 16,
      screenSpaceRadius: false,
    });
  }

  // Показать только карту AO — чтобы подбирать radius и scale вживую.
  // Из консоли: cupViewer.debugAO(true)
  showAmbientOcclusionOnly(on) {
    if (!this.gtao) return;
    this.gtao.output = on ? GTAOPass.OUTPUT.Denoise : GTAOPass.OUTPUT.Default;
  }

  // Кадр фото-сцены под стаканом; null — убрать. frameSize — доля холста,
  // которую кадр занимает по ширине и высоте, shadow — слой запечённой тени
  // (или null), shadowOpacity — её плотность (scene.shadowOpacity).
  //
  // Фон живёт только в конвейере: с выключенной постобработкой
  // (quality.postProcessing: false) фото-сцена останется без кадра.
  setBackdrop(layer) {
    if (!this.backdrop) return;
    const u = this.backdrop.uniforms;
    this.backdrop.enabled = Boolean(layer?.texture);
    u.backdrop.value = layer?.texture ?? null;
    u.hasBackdrop.value = Boolean(layer?.texture);
    u.shadow.value = layer?.shadow ?? null;
    u.hasShadow.value = Boolean(layer?.shadow);
    u.shadowOpacity.value = layer?.shadowOpacity ?? 1;
    u.frameSize.value.set(...(layer?.frameSize ?? [1, 1]));
  }

  // Сила зерна: 0 — выключено. Ставится фото-сценой.
  setGrain(amount) {
    if (this.grain) this.grain.uniforms.amount.value = Math.max(0, amount ?? 0);
  }

  render() {
    if (!this.enabled) {
      this.renderer.render(this.scene, this.camera);
      return;
    }
    // Камера AO повторяет основную, но со своей маской слоёв. copy() переносит
    // и маску, поэтому её приходится восстанавливать после каждого копирования.
    this.aoCamera.copy(this.camera);
    this.aoCamera.layers.set(OBJECT_LAYER);
    this.composer.render();
  }

  setSize(width, height) {
    if (!this.enabled) return;
    const ratio = this.renderer.getPixelRatio();
    this.composer.setPixelRatio(ratio);
    this.composer.setSize(width, height);
    this.gtao.setSize(width * ratio, height * ratio);
  }

  dispose() {
    if (!this.enabled) return;
    this.gtao.dispose?.();
    this.composer.dispose?.();
    this.target.dispose();
  }
}
