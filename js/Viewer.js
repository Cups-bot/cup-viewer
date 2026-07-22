import * as THREE from 'three';

import { createScene } from './core/scene.js';
import { createCamera } from './core/camera.js';
import { createRenderer } from './core/renderer.js';
import { createLighting, aimLightAtSun } from './core/lighting.js';
import { createControls } from './core/controls.js';
import { createContactShadow } from './core/contactShadow.js';
import { loadEnvironment, applyEnvironmentIntensity } from './core/environment.js';
import { ModelLoader } from './loaders/ModelLoader.js';
import { TextureManager } from './loaders/TextureManager.js';
import { UIManager } from './ui/UIManager.js';

// Максимальный шаг кадра, который учитывает анимация (сек).
const MAX_FRAME_DELTA = 0.1;

// Отношение сторон, всегда конечное и положительное.
function aspectOf(width, height) {
  const aspect = width / height;
  return Number.isFinite(aspect) && aspect > 0 ? aspect : 1;
}

// Собирает ядро рендера, загрузчики и UI, владеет циклом отрисовки и реализует
// действия, которые UI ему делегирует.
export class Viewer {
  constructor(container, config) {
    this.container = container;
    this.config = config;

    this.backgroundIndex = 0;
    this.frameId = null;
    this.autoRotate = config.autoRotate.enabled;
    // Пока пользователь вручную крутит слайдером — автоповорот на паузе.
    this.manualRotate = false;

    this.#initCore();
    this.#initModules();
  }

  #initCore() {
    const { clientWidth: w, clientHeight: h } = this.container;

    this.scene = createScene(this.config);
    // Контейнер без раскладки (скрытая вкладка, display:none) отдаёт 0×0, а
    // 0/0 = NaN, который уходит в aspect и заклинивает рендерер. ResizeObserver
    // исправит это, как только элемент получит реальный размер.
    this.camera = createCamera(this.config, aspectOf(w, h));
    this.renderer = createRenderer(this.config);
    this.renderer.setSize(w, h);
    this.container.appendChild(this.renderer.domElement);

    this.lightingRig = createLighting(this.scene, this.config);
    this.controls = createControls(this.camera, this.renderer.domElement, this.config);

    if (this.config.contactShadow.enabled) {
      this.contactShadow = createContactShadow(this.config);
      this.scene.add(this.contactShadow.group);
    }
  }

  #initModules() {
    // Предел анизотропии — аппаратный, читается с живого рендерера.
    const maxAnisotropy = this.renderer.capabilities.getMaxAnisotropy();

    this.modelLoader = new ModelLoader({
      scene: this.scene,
      camera: this.camera,
      controls: this.controls,
      config: this.config,
      maxAnisotropy,
    });
    this.textureManager = new TextureManager({
      modelLoader: this.modelLoader,
      config: this.config,
      maxAnisotropy,
    });
    this.ui = new UIManager(this.config);

    this.ui.bind({
      onChangeBackground: () => this.cycleBackground(),
      onSelectBackground: (index) => this.selectBackground(index),
      onToggleAutoRotate: () => this.toggleAutoRotate(),
      onManualRotateStart: () => this.setManualRotate(true),
      onManualRotateEnd: () => this.setManualRotate(false),
      onManualRotate: (degrees) => this.rotateModelTo(degrees),
      onScreenshot: () => this.takeScreenshot(),
      onToggleFullscreen: () => this.toggleFullscreen(),
      onImageFile: (file) => this.replaceTextureFromFile(file),
      onModelFile: (file) => this.loadModelFromFile(file),
    });

    this.ui.setActiveBackground(this.backgroundIndex);
  }

  // Загрузка ассетов, запуск наблюдателей и цикла отрисовки.
  async start() {
    this.#observeResize();
    this.#handleContextLoss();
    this.#startRenderLoop();
    await this.loadHDRI();
    await this.loadModel(this.config.assets.model);
    await this.#loadDefaultTexture();
  }

  #startRenderLoop() {
    const clock = new THREE.Clock();
    const tick = () => {
      this.frameId = requestAnimationFrame(tick);
      // Ограничиваем: свёрнутая вкладка ставит rAF на паузу, и первый кадр
      // после возврата отдал бы весь простой одной дельтой — модель дёрнулась бы.
      const delta = Math.min(clock.getDelta(), MAX_FRAME_DELTA);

      if (this.autoRotate && !this.manualRotate && this.modelLoader.currentModel) {
        this.modelLoader.currentModel.rotation.y += this.config.autoRotate.speed * delta;
      }

      this.controls.update(delta);
      // Тень перерисовывается каждый кадр (модель под ней крутится) и до
      // основного рендера — она сначала рисует сцену в свой таргет.
      this.contactShadow?.update(this.renderer, this.scene);
      this.renderer.render(this.scene, this.camera);
    };
    tick();
  }

  // Держим рендерер и камеру в согласии с реальным размером контейнера.
  #observeResize() {
    const onResize = () => {
      const { clientWidth: w, clientHeight: h } = this.container;
      if (w === 0 || h === 0) return;
      this.camera.aspect = aspectOf(w, h);
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    };
    this.resizeObserver = new ResizeObserver(onResize);
    this.resizeObserver.observe(this.container);
  }

  // Восстановление при потере контекста WebGL.
  #handleContextLoss() {
    const canvas = this.renderer.domElement;
    canvas.addEventListener('webglcontextlost', (event) => {
      event.preventDefault();
      if (this.frameId) cancelAnimationFrame(this.frameId);
      this.ui.showToast('Контекст WebGL потерян — восстановление…', 'error');
    });
    canvas.addEventListener('webglcontextrestored', () => {
      this.#startRenderLoop();
      this.ui.showToast('Контекст WebGL восстановлен');
    });
  }

  // Загрузка HDRI. Сбой не критичен: свет продолжает работать.
  async loadHDRI() {
    this.ui.showLoader('Загрузка окружения…');
    try {
      await this.loadEnvironmentMap();
    } catch (error) {
      console.error(error);
      this.ui.showToast('Не удалось загрузить HDRI — работает только свет', 'error');
    } finally {
      this.ui.hideLoader();
    }
  }

  // Грузит HDRI и передаёт тени параметры солнца из карты: направление,
  // ширину и плотность.
  async loadEnvironmentMap() {
    const { envMap, sun } = await loadEnvironment(this.scene, this.renderer, this.config, (percent) =>
      this.ui.updateProgress(percent, 'Загрузка окружения…'),
    );

    this.sun = sun;
    aimLightAtSun(this.lightingRig, sun, this.config);
    this.shadowMatch = this.contactShadow?.matchToSun(sun) ?? null;
    return envMap;
  }

  // Где солнце HDRI и что из него вывелось для тени. Читать из консоли, когда
  // тень выглядит не так: большой angularRadius при низком contrast должен
  // давать мягкую и бледную тень, малый при высоком — резкую и тёмную.
  describeSun() {
    if (!this.sun) return null;
    const { direction, color, irradiance, angularRadius, peak, mean } = this.sun;
    const toDeg = 180 / Math.PI;
    return {
      elevation: +(Math.asin(direction.y) * toDeg).toFixed(1),
      azimuth: +(Math.atan2(direction.z, direction.x) * toDeg).toFixed(1),
      direction: direction.toArray().map((n) => +n.toFixed(3)),
      color: `#${color.getHexString()}`,
      irradiance: +irradiance.toFixed(3),
      angularRadius: +(angularRadius * toDeg).toFixed(2),
      contrast: Math.round(peak / mean),
      shadow: this.shadowMatch && {
        blur: +this.shadowMatch.blur.toFixed(1),
        opacity: +this.shadowMatch.opacity.toFixed(3),
      },
    };
  }

  // Загрузка модели по URL с индикацией прогресса и обработкой ошибок.
  async loadModel(url) {
    this.ui.showLoader('Загрузка модели…');
    try {
      await this.modelLoader.load(url, (percent) => this.ui.updateProgress(percent));
      applyEnvironmentIntensity(
        this.modelLoader.currentModel,
        this.config.lighting.environmentIntensity,
      );
      this.#placeGround();
    } catch (error) {
      console.error(error);
      this.ui.showToast('Не удалось загрузить модель', 'error');
    } finally {
      this.ui.hideLoader();
    }
  }

  // Ставим плоскость тени точно на нижнюю точку модели.
  #placeGround() {
    if (!this.contactShadow || !this.modelLoader.currentModel) return;
    const box = new THREE.Box3().setFromObject(this.modelLoader.currentModel);
    this.contactShadow.group.position.y = box.min.y;
  }

  async loadModelFromFile(file) {
    const url = URL.createObjectURL(file);
    try {
      await this.loadModel(url);
      await this.#loadDefaultTexture();
      this.ui.showToast(`Модель загружена: ${file.name}`);
    } finally {
      URL.revokeObjectURL(url);
    }
  }

  // Применяем текстуру по умолчанию, молча игнорируя её отсутствие.
  async #loadDefaultTexture() {
    try {
      await this.textureManager.replaceTexture(this.config.assets.texture);
    } catch {
      // Текстуры по умолчанию нет — оставляем исходные материалы модели.
    }
  }

  async replaceTextureFromFile(file) {
    try {
      const texture = await this.textureManager.loadFromFile(file);
      const updated = this.textureManager.applyTexture(texture);
      this.ui.showToast(
        updated > 0 ? `Дизайн применён: ${file.name}` : 'В модели нет поверхности для дизайна',
        updated > 0 ? 'success' : 'error',
      );
    } catch (error) {
      console.error(error);
      this.ui.showToast('Не удалось применить дизайн', 'error');
    }
  }

  // Меняет отделку поверхности с текстурой на лету. Возвращает число
  // обновлённых материалов.
  setSurfaceFinish(finish) {
    return this.modelLoader.applySurfaceFinish({
      ...this.config.texturedSurface,
      ...finish,
    });
  }

  cycleBackground() {
    const { backgrounds } = this.config;
    this.selectBackground((this.backgroundIndex + 1) % backgrounds.length);
  }

  // Ставит конкретный фон по индексу (выбор кружочком).
  selectBackground(index) {
    this.backgroundIndex = index;
    this.scene.background = new THREE.Color(this.config.backgrounds[index]);
    this.ui.setActiveBackground(index);
  }

  toggleAutoRotate() {
    this.autoRotate = !this.autoRotate;
    this.ui.setToggleState('autorotate', this.autoRotate);
  }

  // Наведение на слайдер приостанавливает автоповорот; при открытии бегунок
  // подгоняется под текущий угол модели.
  setManualRotate(active) {
    this.manualRotate = active;
    if (active) this.#syncRotationSlider();
  }

  // Поворачивает модель на заданный угол (градусы) вокруг вертикальной оси.
  rotateModelTo(degrees) {
    const model = this.modelLoader.currentModel;
    if (model) model.rotation.y = THREE.MathUtils.degToRad(degrees);
  }

  // Синхронизирует бегунок слайдера с текущим углом модели (0–360°).
  #syncRotationSlider() {
    const model = this.modelLoader.currentModel;
    if (!model) return;
    const degrees = THREE.MathUtils.radToDeg(model.rotation.y);
    this.ui.setRotationSlider(((degrees % 360) + 360) % 360);
  }

  takeScreenshot() {
    this.renderer.render(this.scene, this.camera);
    const link = document.createElement('a');
    link.download = this.config.ui.screenshotName;
    link.href = this.renderer.domElement.toDataURL('image/png');
    link.click();
    this.ui.showToast('Скриншот сохранён');
  }

  toggleFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      this.container.requestFullscreen?.().catch(() => {
        this.ui.showToast('Полноэкранный режим недоступен', 'error');
      });
    }
  }

  // Освобождает все ресурсы GPU и наблюдателей.
  dispose() {
    if (this.frameId) cancelAnimationFrame(this.frameId);
    this.resizeObserver?.disconnect();
    this.modelLoader.dispose();
    this.textureManager.dispose();
    this.scene.environment?.dispose();
    this.contactShadow?.dispose();
    this.controls.dispose();
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }
}
