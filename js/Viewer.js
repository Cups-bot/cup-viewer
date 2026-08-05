import * as THREE from 'three';

import { createScene } from './core/scene.js';
import { createCamera } from './core/camera.js';
import { createRenderer } from './core/renderer.js';
import { createLighting, aimKeyLight } from './core/lighting.js';
import { createControls } from './core/controls.js';
import { createFloor } from './core/floor.js';
import { createShadowCatcher } from './core/shadowCatcher.js';
import { createAmbientContactShadow } from './core/ambientContactShadow.js';
import { createTurntable } from './core/turntable.js';
import { loadEnvironment, applyEnvironmentIntensity } from './core/environment.js';
import { loadStudioEnvironment } from './core/studioEnvironment.js';
import { RenderPipeline } from './core/postprocessing.js';
import { HELPER_LAYER } from './core/layers.js';
import { backdropColors, backdropCss, paintBackdrop } from './core/backdrop.js';
import { defaultPaperFinish } from './data/catalog.js';
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
    // Отрисовка по требованию: кадр рисуется, только когда что-то изменилось.
    // Первый кадр нужен всегда, вместе с тенью.
    this.needsRender = true;
    this.modelDirty = true;

    this.#initCore();
    this.#initModules();
  }

  #initCore() {
    const { clientWidth: w, clientHeight: h } = this.container;

    this.scene = createScene();
    // Контейнер без раскладки (скрытая вкладка, display:none) отдаёт 0×0, а
    // 0/0 = NaN, который уходит в aspect и заклинивает рендерер. ResizeObserver
    // исправит это, как только элемент получит реальный размер.
    this.camera = createCamera(this.config, aspectOf(w, h));
    this.renderer = createRenderer(this.config);
    this.renderer.setSize(w, h);
    this.container.appendChild(this.renderer.domElement);

    this.lightingRig = createLighting(this.scene, this.config);
    this.controls = createControls(this.camera, this.renderer.domElement, this.config);
    // Страховка к возвращаемому значению controls.update(): любое изменение
    // камеры обязано приводить к новому кадру.
    this.controls.addEventListener('change', () => this.invalidate());

    if (this.config.floor?.enabled) {
      this.floor = createFloor(this.config);
      this.scene.add(this.floor.mesh);
    }

    if (this.config.shadowCatcher?.enabled) {
      this.shadowCatcher = createShadowCatcher(this.config);
      this.scene.add(this.shadowCatcher.plane);
    }

    if (this.config.ambientShadow?.enabled) {
      this.ambientShadow = createAmbientContactShadow(this.config);
      this.scene.add(this.ambientShadow.group);
    }

    // Основная камера видит и предмет, и вспомогательную обвязку; камера
    // затенения складок внутри конвейера — только предмет (см. core/layers.js).
    this.camera.layers.enable(HELPER_LAYER);

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
    // Аппаратные пределы читаются с живого рендерера: анизотропия и предельная
    // сторона текстуры отличаются от устройства к устройству в разы.
    const maxAnisotropy = this.renderer.capabilities.getMaxAnisotropy();
    const maxTextureSize = this.renderer.capabilities.maxTextureSize;

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
      maxTextureSize,
    });
    this.pipeline = new RenderPipeline({
      renderer: this.renderer,
      scene: this.scene,
      camera: this.camera,
      config: this.config,
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
    this.#watchVisibility();
    this.#handleContextLoss();
    this.#startRenderLoop();
    await this.loadHDRI();
    this.invalidateModel();
  }

  // Кладёт дизайн на модель. Отсутствие файла не должно ронять страницу:
  // модель останется с исходным материалом.
  async applyTexture(url) {
    if (!url) return 0;
    try {
      const updated = await this.textureManager.replaceTexture(url);
      this.invalidateModel();
      return updated;
    } catch (error) {
      console.warn(`Дизайн не загружен: ${error.message}`);
      return 0;
    }
  }

  // Помечает кадр устаревшим: в следующем тике сцена перерисуется.
  invalidate() {
    this.needsRender = true;
  }

  // То же плюс «модель сдвинулась»: значит, надо пересчитать и контактную тень.
  // Тень стоит пяти полноэкранных проходов, поэтому её трогают только когда
  // изменилось то, что она показывает.
  invalidateModel() {
    this.modelDirty = true;
    this.needsRender = true;
  }

  // Цикл отрисовки. Кадр рисуется не всегда, а только когда в сцене что-то
  // изменилось: пока клиент читает характеристики или смотрит развёртку,
  // рисовать одну и ту же картинку 60 раз в секунду незачем — на телефоне это
  // прямой расход батареи.
  #startRenderLoop() {
    // Ссылку могли открыть в фоновой вкладке — тогда цикл поднимется по
    // visibilitychange, когда до неё дойдут руки.
    if (this.frameId || document.hidden) return;
    const clock = new THREE.Clock();

    const tick = () => {
      this.frameId = requestAnimationFrame(tick);
      // Ограничиваем: свёрнутая вкладка ставит rAF на паузу, и первый кадр
      // после возврата отдал бы весь простой одной дельтой — модель дёрнулась бы.
      const delta = Math.min(clock.getDelta(), MAX_FRAME_DELTA);

      if (this.autoRotate && !this.manualRotate && this.modelLoader.currentModel) {
        this.modelLoader.currentModel.rotation.y += this.config.autoRotate.speed * delta;
        this.invalidateModel();
      }

      // Обе возвращают true, пока продолжают что-то двигать: controls —
      // затухающую орбиту, turntable — появление круга и доворот до засечки.
      const cameraMoving = this.controls.update(delta);
      const turntableMoving = this.turntable?.update(this.getModelRotation(), delta);
      if (cameraMoving || turntableMoving) this.invalidate();

      if (!this.needsRender) return;

      if (this.modelDirty) {
        // Затенение у основания пересчитывается только когда модель сдвинулась:
        // это отдельный проход глубины плюс четыре прохода размытия.
        this.ambientShadow?.update(this.renderer, this.scene);
        this.modelDirty = false;
      }
      this.pipeline.render();
      this.needsRender = false;
    };

    tick();
  }

  #stopRenderLoop() {
    if (!this.frameId) return;
    cancelAnimationFrame(this.frameId);
    this.frameId = null;
  }

  // Свёрнутая вкладка и так почти не получает кадров, но браузеры не обещают
  // этого: явная остановка надёжнее. При возврате кадр рисуется заново.
  #watchVisibility() {
    this.onVisibilityChange = () => {
      if (document.hidden) {
        this.#stopRenderLoop();
      } else {
        this.invalidateModel();
        this.#startRenderLoop();
      }
    };
    document.addEventListener('visibilitychange', this.onVisibilityChange);
  }

  // Подгоняет холст под контейнер. Публичный: полноэкранный режим меняет
  // раскладку сам и должен уметь подтолкнуть пересчёт.
  resize() {
    const { clientWidth: w, clientHeight: h } = this.container;
    if (w === 0 || h === 0) return;
    this.camera.aspect = aspectOf(w, h);
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
    this.pipeline.setSize(w, h);
    this.invalidate();
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
    // Ссылки на обработчики держим в полях: без них слушателей не снять,
    // и при повторной сборке страницы они копились бы на мёртвых объектах.
    this.onFullscreenChange = () => {
      const native = document.fullscreenElement || document.webkitFullscreenElement;
      if (!native) this.#setStageFullscreen(target(), false);
      else requestAnimationFrame(() => this.resize());
    };
    document.addEventListener('fullscreenchange', this.onFullscreenChange);
    document.addEventListener('webkitfullscreenchange', this.onFullscreenChange);

    // Там, где режим держится на одном CSS, Escape тоже должен работать.
    this.onEscape = (event) => {
      if (event.key !== 'Escape') return;
      if (document.fullscreenElement || document.webkitFullscreenElement) return;
      const stage = target();
      if (stage.classList.contains('is-fullscreen')) this.#setStageFullscreen(stage, false);
    };
    window.addEventListener('keydown', this.onEscape);
  }

  // Восстановление при потере контекста WebGL.
  #handleContextLoss() {
    const canvas = this.renderer.domElement;
    canvas.addEventListener('webglcontextlost', (event) => {
      event.preventDefault();
      this.#stopRenderLoop();
      this.ui.showToast('Контекст WebGL потерян — восстановление…', 'error');
    });
    canvas.addEventListener('webglcontextrestored', () => {
      this.invalidateModel();
      this.#startRenderLoop();
      this.ui.showToast('Контекст WebGL восстановлен');
    });
  }

  // Поднимает источник отражений. Сбой не критичен: сцена остаётся видимой.
  async loadHDRI() {
    // Студия собирается в памяти мгновенно — индикатор нужен только файлу.
    const fromFile = this.config.lighting.environment === 'hdri';
    if (fromFile) this.ui.showLoader('Загрузка окружения…');
    try {
      await this.loadEnvironmentMap();
    } catch (error) {
      console.error(error);
      this.ui.showToast('Не удалось загрузить окружение', 'error');
    } finally {
      if (fromFile) this.ui.hideLoader();
    }
  }

  // Ставит окружение и передаёт тени параметры ключевого света: направление,
  // ширину полутени и плотность.
  //
  // Источников два, и оба отдают одно и то же: карту и описание света. Поэтому
  // всё, что ниже по течению (наводка ключевого света, подстройка тени),
  // одинаково работает и со студией, и с панорамой из файла.
  async loadEnvironmentMap() {
    const { envMap, sun } =
      this.config.lighting.environment === 'hdri'
        ? await loadEnvironment(this.scene, this.renderer, this.config, (percent) =>
            this.ui.updateProgress(percent, 'Загрузка окружения…'),
          )
        : loadStudioEnvironment(this.scene, this.renderer, this.config);

    this.sun = sun;
    aimKeyLight(this.lightingRig, sun, this.config);
    this.invalidateModel();
    return envMap;
  }

  // Куда смотрит ключевой свет и какой он яркости. Читать из консоли, когда
  // тень или светотень выглядят не так: elevation задаёт длину тени, azimuth —
  // её направление, оба приходят из раскладки студии.
  describeKeyLight() {
    if (!this.sun) return null;
    const { direction, color, irradiance, angularRadius } = this.sun;
    const toDeg = 180 / Math.PI;
    const light = this.lightingRig.getObjectByName('KeyLight');
    return {
      elevation: +(Math.asin(direction.y) * toDeg).toFixed(1),
      azimuth: +(Math.atan2(direction.z, direction.x) * toDeg).toFixed(1),
      color: `#${color.getHexString()}`,
      // Яркость софтбокса в студии и то, что из неё досталось источнику тени.
      softboxIntensity: +irradiance.toFixed(2),
      lightIntensity: +(light?.intensity ?? 0).toFixed(2),
      angularRadius: +(angularRadius * toDeg).toFixed(2),
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
      this.invalidateModel();
    } catch (error) {
      console.error(error);
      this.ui.showToast('Не удалось загрузить модель', 'error');
      throw error;
    } finally {
      this.ui.hideLoader();
    }
  }

  // Ставим плоскость тени и невидимую опору для AO точно на нижнюю точку модели.
  #placeGround() {
    if (!this.modelLoader.currentModel) return;
    const box = new THREE.Box3().setFromObject(this.modelLoader.currentModel);
    this.floor?.setHeight(box.min.y);
    this.shadowCatcher?.setHeight(box.min.y);
    if (this.ambientShadow) this.ambientShadow.group.position.y = box.min.y;
    // Небольшой зазор вниз: точно совпадающие плоскости дают у самого основания
    // рябь от точности буфера глубины.

  }

  // Перетаскивание .glb на страницу: заказная отделка и дизайн сохраняются.
  // Работает только при включённом ui.dragAndDrop (по умолчанию выключен).
  async loadModelFromFile(file) {
    const url = URL.createObjectURL(file);
    const order = this.order;
    try {
      await this.loadModel(url);
      if (order?.roughness != null) {
        this.setSurfaceFinish({
          roughness: order.roughness,
          relief: order.relief,
          reliefScale: order.reliefScale,
        });
      }
      await this.applyTexture(order?.texture);
      this.ui.showToast(`Модель загружена: ${file.name}`);
    } catch (error) {
      console.error(error);
    } finally {
      // Формат .gltf догружает .bin и текстуры ОТНОСИТЕЛЬНО этого адреса, причём
      // уже после того, как разрешился основной промис. Отзыв откладываем на
      // следующий тик после полной обработки, иначе догрузка упирается в
      // отозванный URL.
      setTimeout(() => URL.revokeObjectURL(url), 0);
    }
  }

  // Перетаскивание картинки: дизайн меняется и на модели, и в развёртке.
  async replaceTextureFromFile(file) {
    try {
      const texture = await this.textureManager.loadFromFile(file);
      const updated = this.textureManager.applyTexture(texture);
      this.invalidateModel();
      // Развёртка сама создаёт и отзывает свой blob-URL: раньше он создавался
      // здесь и не отзывался никогда.
      this.unwrap?.setSourceFromFile(file);
      this.ui.showToast(
        updated > 0 ? `Дизайн применён: ${file.name}` : 'В модели нет поверхности для дизайна',
        updated > 0 ? 'success' : 'error',
      );
    } catch (error) {
      console.error(error);
      this.ui.showToast('Не удалось применить дизайн', 'error');
    }
  }

  // Текущий заказ. Держим ссылкой на объект, а не читаем window.cupOrder:
  // страница Битрикса — чужая территория, глобальное имя там могут занять.
  setOrder(order) {
    this.order = order;
  }

  // Подключает вкладку «Развёртка», чтобы перетащенный файл менял и её.
  attachUnwrap(view) {
    this.unwrap = view;
  }

  // Меняет отделку поверхности с текстурой на лету. Возвращает число
  // обновлённых материалов.
  setSurfaceFinish(finish) {
    const updated = this.modelLoader.applySurfaceFinish({
      ...defaultPaperFinish(),
      ...finish,
    });
    if (updated > 0) this.invalidate();
    return updated;
  }

  cycleBackground() {
    const { backgrounds } = this.config;
    this.selectBackground((this.backgroundIndex + 1) % backgrounds.length);
  }

  // Ставит конкретный фон по индексу (выбор кружочком).
  //
  // Цвет ставится в ДВУХ местах одним значением: в сцену и в CSS страницы.
  //
  // В сцену — чтобы кадр был непрозрачным целиком. На прозрачном холсте
  // сглаженный край пола давал светлую волосяную линию: полупрозрачный пиксель
  // раздувается при переводе в sRGB. В CSS — чтобы фон был на месте до запуска
  // скрипта и вокруг холста.
  selectBackground(index) {
    this.backgroundIndex = index;
    const value = this.config.backgrounds[index];

    // Цвета фона держим у себя: тот же фон подкладывается под снимок сцены.
    this.backdrop = backdropColors(value);
    this.scene.background = new THREE.Color(value);

    const stage = this.container.closest('.stage') ?? this.container;
    stage.style.background = backdropCss(this.backdrop);

    // Поворотный круг перекрашивается под фон: на тёмном тёмный контур пропал бы.
    this.floor?.setColor(value);
    this.turntable?.setBackground(new THREE.Color(value));
    this.ui.setActiveBackground(index);
    this.invalidate();
  }

  toggleAutoRotate() {
    this.autoRotate = !this.autoRotate;
    this.ui.setToggleState('autorotate', this.autoRotate);
    this.invalidate();
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
    if (!model) return;
    model.rotation.y = THREE.MathUtils.degToRad(degrees);
    this.invalidateModel();
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
    this.invalidate();
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

  // Снимок сцены.
  //
  // Обычный путь — скачать файл ссылкой с атрибутом download. Так ждёт человек
  // за компьютером: нажал «снимок» — файл лежит в «Загрузках».
  //
  // Системное окно «Поделиться» остаётся только там, где скачать нельзя: на
  // iPhone и iPad Safari игнорирует download и просто открывает картинку в
  // соседней вкладке, откуда её ещё надо ухитриться сохранить. Там окно
  // «Поделиться» — единственный способ положить кадр в «Фото».
  //
  // Раньше окно «Поделиться» вызывалось везде, где браузер его поддерживает,
  // а Windows 11 и macOS его поддерживают — поэтому на компьютере вместо
  // скачивания открывался системный диалог отправки.
  async takeScreenshot() {
    // Через конвейер, а не напрямую: иначе снимок уйдёт без затенения складок и
    // без тонмаппинга — то есть заметно хуже того, что клиент видит на экране.
    this.ambientShadow?.update(this.renderer, this.scene);
    this.pipeline.render();
    const name = this.config.ui.screenshotName;

    const blob = await this.#canvasBlob();
    if (!blob) {
      this.ui.showToast('Не удалось сделать снимок', 'error');
      return;
    }

    if (this.#shouldShareScreenshot()) {
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

  // Отдавать ли снимок через системное «Поделиться» вместо скачивания.
  // Режим задаётся config.ui.screenshotShare: 'auto' | 'never' | 'always'.
  #shouldShareScreenshot() {
    const mode = this.config.ui.screenshotShare ?? 'auto';
    if (mode === 'always') return true;
    if (mode === 'never') return false;

    // 'auto': только там, где скачивание не работает, — Safari на iOS.
    // iPadOS с iOS 13 представляется как Mac, поэтому его ловим по тач-экрану:
    // настольный Mac сенсорных точек не имеет.
    const ua = navigator.userAgent;
    const isIOS =
      /iP(hone|ad|od)/.test(ua) ||
      (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
    return isIOS;
  }

  // Кадр вместе с фоном.
  //
  // Холст просмотрщика прозрачный — фон рисует CSS (см. core/backdrop.js).
  // Поэтому снимать напрямую с холста нельзя: получится стакан на пустоте, а в
  // PNG прозрачность выглядит как чёрный или клетчатый фон в большинстве
  // просмотрщиков. Собираем кадр заново: сначала тот же фон, сверху сцена.
  #canvasBlob() {
    return new Promise((resolve) => {
      try {
        const source = this.renderer.domElement;
        const canvas = document.createElement('canvas');
        canvas.width = source.width;
        canvas.height = source.height;

        const ctx = canvas.getContext('2d');
        paintBackdrop(ctx, canvas.width, canvas.height, this.backdrop);
        ctx.drawImage(source, 0, 0);

        canvas.toBlob((blob) => resolve(blob), 'image/png');
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

  // Освобождает все ресурсы GPU и снимает наблюдателей. Вызывать при удалении
  // страницы со сцены — иначе на чужой странице (Битрикс умеет перерисовывать
  // блоки) остаются жить слушатели, worker'ы Draco и память GPU.
  dispose() {
    this.#stopRenderLoop();
    this.resizeObserver?.disconnect();

    if (this.onVisibilityChange) {
      document.removeEventListener('visibilitychange', this.onVisibilityChange);
    }
    if (this.onFullscreenChange) {
      document.removeEventListener('fullscreenchange', this.onFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', this.onFullscreenChange);
    }
    if (this.onEscape) window.removeEventListener('keydown', this.onEscape);

    this.modelLoader.destroy();
    this.textureManager.dispose();
    this.floor?.dispose();
    this.ambientShadow?.dispose();
    this.turntable?.dispose();
    this.scene.environment?.dispose();
    this.controls.dispose();
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }
}
