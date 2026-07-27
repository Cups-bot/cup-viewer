import * as THREE from 'three';

import { createScene } from './core/scene.js';
import { createCamera } from './core/camera.js';
import { createRenderer } from './core/renderer.js';
import { createLighting, aimLightAtSun } from './core/lighting.js';
import { createControls } from './core/controls.js';
import { createContactShadow } from './core/contactShadow.js';
import { createTurntable } from './core/turntable.js';
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

    if (this.config.turntable.enabled) {
      this.turntable = createTurntable({
        scene: this.scene,
        camera: this.camera,
        controls: this.controls,
        domElement: this.renderer.domElement,
        config: this.config,
        onRotate: (degrees) => this.rotateModelTo(degrees),
        onDragStart: () => this.setManualRotate(true),
        onDragEnd: () => this.setManualRotate(false),
      });
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

    // Через selectBackground, а не setActiveBackground: заодно задаёт тему
    // поворотного круга под стартовый фон.
    this.selectBackground(this.backgroundIndex);
  }

  // Поднимает сцену: наблюдатели, цикл отрисовки и освещение. Модель и дизайн
  // сюда не входят — они приходят из данных заказа (см. js/main.js).
  async startEnvironment() {
    this.#observeResize();
    this.#watchFullscreen();
    this.#handleContextLoss();
    this.#startRenderLoop();
    await this.loadHDRI();
  }

  // Полный запуск на ассетах из конфига — когда данных заказа нет.
  async start() {
    await this.startEnvironment();
    await this.loadModel(this.config.assets.model);
    await this.applyTexture(this.config.assets.texture);
  }

  // Кладёт дизайн на модель. Отсутствие файла не должно ронять страницу:
  // модель останется с исходным материалом.
  async applyTexture(url) {
    if (!url) return 0;
    try {
      return await this.textureManager.replaceTexture(url);
    } catch (error) {
      console.warn(`Дизайн не загружен: ${error.message}`);
      return 0;
    }
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
      this.turntable?.update(this.getModelRotation(), delta);
      // Тень перерисовывается каждый кадр (модель под ней крутится) и до
      // основного рендера — она сначала рисует сцену в свой таргет.
      this.contactShadow?.update(this.renderer, this.scene);
      this.renderer.render(this.scene, this.camera);
    };
    tick();
  }

  // Подгоняет холст под контейнер. Публичный: полноэкранный режим меняет
  // раскладку сам и должен уметь подтолкнуть пересчёт.
  resize() {
    const { clientWidth: w, clientHeight: h } = this.container;
    if (w === 0 || h === 0) return;
    this.camera.aspect = aspectOf(w, h);
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }

  // Держим рендерер и камеру в согласии с реальным размером контейнера.
  #observeResize() {
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(this.container);
  }

  // Кнопка полного экрана должна показывать правду и тогда, когда режим
  // выключили мимо неё: клавишей Escape или системным жестом.
  #watchFullscreen() {
    const target = () => this.container.closest('.stage') ?? this.container;

    // Выход мимо кнопки — Escape в браузере или системный жест — должен снимать
    // и класс, и подсветку кнопки.
    const sync = () => {
      const native = document.fullscreenElement || document.webkitFullscreenElement;
      if (!native) this.#setStageFullscreen(target(), false);
      else requestAnimationFrame(() => this.resize());
    };
    document.addEventListener('fullscreenchange', sync);
    document.addEventListener('webkitfullscreenchange', sync);

    // Там, где режим держится на одном CSS, Escape тоже должен работать.
    window.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      if (document.fullscreenElement || document.webkitFullscreenElement) return;
      const stage = target();
      if (stage.classList.contains('is-fullscreen')) this.#setStageFullscreen(stage, false);
    });
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
      this.#measureTurntable();
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

  // Перетаскивание .glb на страницу: заказная отделка и дизайн сохраняются.
  async loadModelFromFile(file) {
    const url = URL.createObjectURL(file);
    const order = window.cupOrder;
    try {
      await this.loadModel(url);
      if (order?.roughness != null) this.setSurfaceFinish({ roughness: order.roughness });
      await this.applyTexture(order?.texture ?? this.config.assets.texture);
      this.ui.showToast(`Модель загружена: ${file.name}`);
    } finally {
      URL.revokeObjectURL(url);
    }
  }

  // Перетаскивание картинки: дизайн меняется и на модели, и в развёртке.
  async replaceTextureFromFile(file) {
    try {
      const texture = await this.textureManager.loadFromFile(file);
      const updated = this.textureManager.applyTexture(texture);
      window.cupUnwrap?.setSource(URL.createObjectURL(file));
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
    const color = new THREE.Color(this.config.backgrounds[index]);
    this.scene.background = color;
    // Поворотный круг перекрашивается под фон: на тёмном тёмный контур пропал бы.
    this.turntable?.setBackground(color);
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

  // Текущий угол поворота модели в градусах (0–360).
  getModelRotation() {
    const model = this.modelLoader.currentModel;
    if (!model) return 0;
    const degrees = THREE.MathUtils.radToDeg(model.rotation.y);
    return ((degrees % 360) + 360) % 360;
  }

  // Возвращает камеру в исходный кадр (двойной клик по сцене).
  resetView() {
    this.modelLoader.frameCurrentModel();
  }

  // Меряет след модели для поворотного круга — один раз на загрузку. Замер
  // делается при нулевом угле: axis-aligned box вращающейся модели меняет
  // размер, и круг, посчитанный покадрово, пульсировал бы.
  #measureTurntable() {
    if (!this.turntable) return;
    const model = this.modelLoader.currentModel;
    if (!model) {
      this.turntable.setMetrics(null);
      return;
    }

    const rotation = model.rotation.y;
    model.rotation.y = 0;
    model.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(model);
    model.rotation.y = rotation;
    model.updateMatrixWorld(true);

    if (box.isEmpty()) {
      this.turntable.setMetrics(null);
      return;
    }

    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const radius = (Math.max(size.x, size.z) / 2) * this.config.turntable.radiusScale;
    this.turntable.setMetrics({ center, baseY: box.min.y, radius });
  }

  // Синхронизирует бегунок слайдера с текущим углом модели (0–360°).
  #syncRotationSlider() {
    const model = this.modelLoader.currentModel;
    if (!model) return;
    this.ui.setRotationSlider(this.getModelRotation());
  }

  // Снимок сцены. На телефоне ссылка с download не срабатывает: Safari игнорирует
  // атрибут и просто открывает data-URL, а сам URL на большом холсте выходит
  // огромным. Поэтому кадр отдаётся файлом: сначала системным «Поделиться»
  // (там же «Сохранить в фото»), и только потом обычной ссылкой.
  async takeScreenshot() {
    this.renderer.render(this.scene, this.camera);
    const name = this.config.ui.screenshotName;

    const blob = await this.#canvasBlob();
    if (!blob) {
      this.ui.showToast('Не удалось сделать снимок', 'error');
      return;
    }

    const file = new File([blob], name, { type: 'image/png' });
    if (navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({ files: [file], title: name });
        return; // системное окно само отчитается перед пользователем
      } catch (error) {
        // Отмену в системном окне за ошибку не считаем.
        if (error?.name === 'AbortError') return;
      }
    }

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const canDownload = 'download' in link;
    link.href = url;
    link.download = name;
    link.rel = 'noopener';
    if (!canDownload) link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 10000);

    this.ui.showToast(canDownload ? 'Снимок сохранён' : 'Снимок открыт в новой вкладке');
  }

  #canvasBlob() {
    return new Promise((resolve) => {
      try {
        this.renderer.domElement.toBlob((blob) => resolve(blob), 'image/png');
      } catch (error) {
        console.error(error);
        resolve(null);
      }
    });
  }

  // Полный экран. Настоящий Fullscreen API есть не везде: на iPhone его нет
  // совсем, поэтому запасной вариант — растянуть сцену на всё окно средствами
  // CSS. Снаружи разницы нет, кнопка работает на любом устройстве.
  toggleFullscreen() {
    const target = this.container.closest('.stage') ?? this.container;

    if (target.classList.contains('is-fullscreen')) {
      (document.exitFullscreen?.() ?? document.webkitExitFullscreen?.());
      this.#setStageFullscreen(target, false);
      return;
    }

    // Класс вешаем в любом случае: он и растягивает сцену там, где настоящего
    // полного экрана нет, и задаёт размеры там, где он есть — иначе браузер
    // разворачивает элемент, а он остаётся прежней высоты посреди чёрного поля.
    this.#setStageFullscreen(target, true);

    const request = target.requestFullscreen?.bind(target) ??
                    target.webkitRequestFullscreen?.bind(target);
    // Без Fullscreen API (так на iPhone) остаёмся на одном CSS — снаружи
    // поведение то же, только браузерная обвязка не прячется.
    if (request) Promise.resolve(request()).catch(() => {});
  }

  #setStageFullscreen(target, on) {
    target.classList.toggle('is-fullscreen', on);
    document.body.classList.toggle('has-fullscreen-stage', on);
    this.ui.setToggleState('fullscreen', on);
    // Холст слушает размер контейнера сам (ResizeObserver), но на iOS смена
    // раскладки приходит с задержкой — подталкиваем следующим кадром.
    requestAnimationFrame(() => this.resize());
  }

  // Освобождает все ресурсы GPU и наблюдателей.
  dispose() {
    if (this.frameId) cancelAnimationFrame(this.frameId);
    this.resizeObserver?.disconnect();
    this.modelLoader.dispose();
    this.textureManager.dispose();
    this.turntable?.dispose();
    this.scene.environment?.dispose();
    this.contactShadow?.dispose();
    this.controls.dispose();
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }
}
