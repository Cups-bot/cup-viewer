import * as THREE from 'three';
import { HELPER_LAYER } from './layers.js';
import { HorizontalBlurShader } from 'three/addons/shaders/HorizontalBlurShader.js';
import { VerticalBlurShader } from 'three/addons/shaders/VerticalBlurShader.js';

// Затенение от близости к подложке — то, что делает предмет СТОЯЩИМ.
//
// Тень здесь не от лампы. Рядом с основанием стакан загораживает подложке
// половину неба, и она темнеет сама по себе — даже если направленного света
// нет вовсе. Это самое сильное «якорящее» пятно на любой предметной съёмке, и
// без него предмет выглядит наклеенным, сколько бы ни было падающей тени.
//
// Почему это отдельный слой, а не общий расчёт затенения складок (GTAO):
// холст просмотрщика прозрачный, фон рисует CSS. Затенение умножает цвет уже
// нарисованных пикселей, а под стаканом их нет — умножать нечего, прозрачное
// остаётся прозрачным. Нужна поверхность, которая реально рисуется в кадр.
//
// Модель рендерится снизу в offscreen-таргет depth-материалом, изображение
// размывается двумя сепарабельными гауссианами и кладётся на плоскость под
// моделью. Сравнения глубин нет нигде — а значит нет ни shadow acne, ни
// peter-panning, ни light bleeding, и настраивать bias не нужно.
//
// Направления у этого пятна НЕТ и быть не должно: окружение светит со всех
// сторон. Наклон под источник — задача падающей тени (core/shadowCatcher.js).
class AmbientContactShadow {
  constructor(config) {
    const { size, resolution, height, blur, opacity, darkness } = config.ambientShadow;

    this.config = config;
    this.blurAmount = blur;

    this.group = new THREE.Group();
    this.group.name = 'AmbientContactShadow';

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
    // Раньше приёмника падающей тени: обе плоскости прозрачные и глубину не
    // пишут, поэтому порядок между ними задаётся явно, а не случайным порядком
    // обхода сцены.
    this.plane.renderOrder = -2;
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

    // Отдельная камера для размытия. Живёт в той же группе, что и quad,
    // который рендерит.
    this.blurCamera = this.camera.clone();
    this.group.add(this.blurCamera);

    this.depthMaterial = this.#createDepthMaterial(darkness);
    this.horizontalBlur = new THREE.ShaderMaterial(HorizontalBlurShader);
    this.verticalBlur = new THREE.ShaderMaterial(VerticalBlurShader);
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
        console.warn('AmbientContactShadow: шейдер MeshDepthMaterial изменился — тень будет неверной.');
        return;
      }
      shader.fragmentShader = `uniform float darkness;\n${shader.fragmentShader}`.replace(from, to);
    };
    return material;
  }

  // Перерисовывает тень. Вызывается каждый кадр, т.к. модель крутится: один
  // небольшой depth-проход плюс четыре прохода размытия.
  update(renderer, scene) {
    // Пять проходов ниже — это пять вызовов renderer.render(), и каждый из них
    // заново пересчитал бы карту теней ключевого света: она обновляется при
    // любом рендере. Выходило шесть пересчётов на кадр вместо одного — 101 мс
    // против 8. Теням здесь взяться неоткуда (сцена рисуется depth-материалом),
    // поэтому на время прохода обновление карты отключаем.
    const shadowAutoUpdate = renderer.shadowMap.autoUpdate;
    renderer.shadowMap.autoUpdate = false;

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
    renderer.shadowMap.autoUpdate = shadowAutoUpdate;
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

export function createAmbientContactShadow(config) {
  return new AmbientContactShadow(config);
}
