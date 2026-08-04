import * as THREE from 'three';
import { HELPER_LAYER } from './layers.js';
import { HorizontalBlurShader } from 'three/addons/shaders/HorizontalBlurShader.js';
import { VerticalBlurShader } from 'three/addons/shaders/VerticalBlurShader.js';

// Мягкая тень под моделью, нарисованная в текстуру, а не через карту теней.
// Модель рендерится снизу в offscreen-таргет depth-материалом, изображение
// размывается двумя сепарабельными гауссианами и кладётся на плоскость под
// моделью. Сравнения глубин нет нигде — а значит нет ни shadow acne, ни
// peter-panning, ни light bleeding, и настраивать bias не нужно.
// Мягкость и плотность не зашиты: matchToSun() выводит их из HDRI.
class ContactShadow {
  constructor(config) {
    const { size, resolution, height, blur, opacity, darkness } = config.contactShadow;

    this.config = config;
    this.blurAmount = blur;

    this.group = new THREE.Group();
    this.group.name = 'ContactShadow';

    // Оба таргета — обычные RGBA: тень несёт только альфа-канал, цвет всегда
    // чёрный, буфер глубины здесь не нужен.
    const options = { depthBuffer: false, stencilBuffer: false };
    this.target = new THREE.WebGLRenderTarget(resolution, resolution, options);
    this.blurTarget = new THREE.WebGLRenderTarget(resolution, resolution, options);
    this.target.texture.generateMipmaps = false;
    this.blurTarget.texture.generateMipmaps = false;

    // rotateX(PI/2) кладёт плоскость горизонтально, но нормаль смотрит вниз —
    // scale.y = -1 разворачивает её лицом вверх и заодно совмещает текстуру с
    // камерой снизу.
    const geometry = new THREE.PlaneGeometry(size, size).rotateX(Math.PI / 2);

    this.plane = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({
        map: this.target.texture,
        opacity,
        transparent: true,
        // Тень тонирует то, что за ней; она не должна перекрывать модель.
        depthWrite: false,
      }),
    );
    this.plane.scale.y = -1;
    this.plane.renderOrder = -1;
    // Плоскость тени в расчёт затенения складок попадать не должна: иначе AO
    // видит её как сплошной пол и обводит стакан тёмным кольцом по фону.
    // Служебный quad размытия остаётся на нулевом слое — его рисует своя
    // камера (см. #blur).
    this.plane.layers.set(HELPER_LAYER);
    this.group.add(this.plane);

    // Служебный quad для проходов размытия. Той же протяжённости, что и камера.
    this.blurPlane = new THREE.Mesh(geometry);
    this.blurPlane.visible = false;
    this.group.add(this.blurPlane);

    // Ортокамера на полу смотрит вверх и захватывает всё от пола до height.
    this.camera = new THREE.OrthographicCamera(-size / 2, size / 2, size / 2, -size / 2, 0, height);
    this.camera.rotation.x = Math.PI / 2;
    this.group.add(this.camera);

    // Отдельная камера для размытия, без сдвига солнцем, — иначе тень сдвигалась
    // бы каждый кадр. Живёт в той же группе, что и quad, который рендерит.
    this.blurCamera = this.camera.clone();
    this.group.add(this.blurCamera);

    this.depthMaterial = this.#createDepthMaterial(darkness);
    this.horizontalBlur = new THREE.ShaderMaterial(HorizontalBlurShader);
    this.verticalBlur = new THREE.ShaderMaterial(VerticalBlurShader);
    this.shear = new THREE.Matrix4();
  }

  // Depth-материал, пишущий темноту в альфу вместо глубины в RGB. Обычный
  // MeshDepthMaterial выдаёт серую карту глубины; переписываем его выходную
  // строку так, чтобы след модели выходил тёмным, а всё выше пола затухало по
  // высоте — за счёт этого тень поджимается под основание.
  #createDepthMaterial(darkness) {
    const material = new THREE.MeshDepthMaterial();
    material.userData.darkness = { value: darkness };
    material.onBeforeCompile = (shader) => {
      shader.uniforms.darkness = material.userData.darkness;
      const from = 'gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );';
      const to = 'gl_FragColor = vec4( vec3( 0.0 ), ( 1.0 - fragCoordZ ) * darkness );';
      if (!shader.fragmentShader.includes(from)) {
        // Обновление three, переименовавшее эту строку, оставило бы серую плиту
        // на полу — сообщаем об этом вместо тихой поломки.
        console.warn('ContactShadow: шейдер MeshDepthMaterial изменился — тень будет неверной.');
        return;
      }
      shader.fragmentShader = `uniform float darkness;\n${shader.fragmentShader}`.replace(from, to);
    };
    return material;
  }

  // Направляет тень так же, как солнце HDRI, и придаёт ей соответствующие
  // мягкость и плотность — за счёт этого тень читается как часть окружения.
  //
  // Направление: ортокамера, смотрящая вверх, проецирует модель строго вниз
  // (тень в полдень). Сдвиг (shear) её проекции наклоняет лучи — точка на высоте
  // y уезжает на y * s.xz / s.y, ровно туда, куда бросило бы солнце. Сдвига
  // достаточно, т.к. солнечный свет параллельный.
  //
  // Мягкость и плотность берутся из двух замеров analyzeSun: угловой радиус
  // источника задаёт полутень (2·d·tan θ), отношение пик/среднее — глубину ядра.
  matchToSun(sun) {
    const options = this.config.contactShadow;
    if (!options.matchHDRI) return null;

    const s = sun.direction;
    // Ниже горизонта солнца нет, а s.y = 0 увёл бы проекцию в бесконечность —
    // оставляем тень строго вниз.
    if (s.y > 0.05) {
      this.shear.set(1, 0, s.x / s.y, 0, 0, 1, s.z / s.y, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      this.#applyShear();
    }

    const penumbra = 2 * options.receiverDistance * Math.tan(sun.angularRadius);
    // Шейдеры размытия шагают в UV, а их uniform'ы масштабированы на 1/256, так
    // что мировая ширина переводится через протяжённость плоскости.
    const blur = (penumbra / options.size) * 256 * options.blurScale;
    this.blurAmount = Math.min(Math.max(blur, options.minBlur), options.maxBlur);

    const contrast = sun.mean > 0 ? sun.peak / sun.mean : 0;
    // log10(10) = 1 → 0, log10(1000) = 3 → 1: от пасмурного до жёсткого солнца.
    const t = Math.min(Math.max((Math.log10(Math.max(contrast, 1)) - 1) / 2, 0), 1);
    const opacity = options.minOpacity + t * (options.maxOpacity - options.minOpacity);
    this.plane.material.opacity = opacity;

    return { blur: this.blurAmount, opacity, contrast };
  }

  // Пересобирает проекцию со встроенным сдвигом солнца.
  #applyShear() {
    this.camera.updateProjectionMatrix();
    this.camera.projectionMatrix.multiply(this.shear);
    this.camera.projectionMatrixInverse.copy(this.camera.projectionMatrix).invert();
  }

  // Перерисовывает тень. Вызывается каждый кадр, т.к. модель крутится: один
  // небольшой depth-проход плюс четыре прохода размытия.
  update(renderer, scene) {
    // Плоскость показывает таргет, в который сейчас будет рендер, а фон залил бы
    // его сплошным цветом — оба временно убираем из кадра.
    const background = scene.background;
    this.plane.visible = false;
    scene.background = null;
    scene.overrideMaterial = this.depthMaterial;

    // Элементы интерфейса внутри сцены (поворотный круг) тень отбрасывать не
    // должны — прячем их только на время depth-прохода.
    const hidden = [];
    scene.traverse((node) => {
      if (node.visible && node.userData.excludeFromShadow) {
        node.visible = false;
        hidden.push(node);
      }
    });

    renderer.setRenderTarget(this.target);
    renderer.render(scene, this.camera);

    for (const node of hidden) node.visible = true;
    scene.overrideMaterial = null;

    // Два прохода разной ширины: широкий несёт полутень, узкий убирает бандинг
    // от конечного числа отсчётов широкого.
    this.#blur(renderer, this.blurAmount);
    this.#blur(renderer, this.blurAmount * 0.4);

    renderer.setRenderTarget(null);
    scene.background = background;
    this.plane.visible = true;
  }

  // Одна сепарабельная гауссиана: горизонталь в служебный таргет, вертикаль назад.
  #blur(renderer, amount) {
    this.blurPlane.visible = true;

    this.blurPlane.material = this.horizontalBlur;
    this.horizontalBlur.uniforms.tDiffuse.value = this.target.texture;
    this.horizontalBlur.uniforms.h.value = amount / 256;
    renderer.setRenderTarget(this.blurTarget);
    renderer.render(this.blurPlane, this.blurCamera);

    this.blurPlane.material = this.verticalBlur;
    this.verticalBlur.uniforms.tDiffuse.value = this.blurTarget.texture;
    this.verticalBlur.uniforms.v.value = amount / 256;
    renderer.setRenderTarget(this.target);
    renderer.render(this.blurPlane, this.blurCamera);

    this.blurPlane.visible = false;
  }

  // Освобождает все ресурсы GPU этой тени.
  dispose() {
    this.target.dispose();
    this.blurTarget.dispose();
    this.plane.geometry.dispose();
    this.plane.material.dispose();
    this.depthMaterial.dispose();
    this.horizontalBlur.dispose();
    this.verticalBlur.dispose();
  }
}

export function createContactShadow(config) {
  return new ContactShadow(config);
}
