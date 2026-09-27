import * as THREE from 'three';

import { createScene } from './core/scene.js';
import { createCamera } from './core/camera.js';
import { createRenderer } from './core/renderer.js';
import { createLighting, aimKeyLight } from './core/lighting.js';
import { createControls } from './core/controls.js';
import { createShadowCatcher } from './core/shadowCatcher.js';
import { createAmbientContactShadow } from './core/ambientContactShadow.js';
import { createTurntable } from './core/turntable.js';
import { computeCavityOcclusion, installCavityShading, setCavityStrength } from './core/cavityOcclusion.js';
import { loadEnvironment, applyEnvironmentIntensity } from './core/environment.js';
import { loadStudioEnvironment } from './core/studioEnvironment.js';
import { RenderPipeline } from './core/postprocessing.js';
import { HELPER_LAYER } from './core/layers.js';
import {
  backdropColors,
  backdropCss,
  createBackdropScreen,
  paintBackdrop,
} from './core/backdrop.js';
import { VIEWS, createCameraTween, orbitOf, orbitPosition } from './core/cameraViews.js';
import {
  ASPECTS,
  backdropOf,
  cupHeight,
  cupRotation,
  frameFor,
  layoutPair,
  loadPhotoScene,
  presetOf,
  stagePoint,
} from './core/photoScene.js';
import { applyWindow, backdropRect } from './core/frame.js';
import { NEUTRAL_TONE_MAPPING } from './core/postprocessing.js';
import { blankSheetUrl } from './utils/blankSheet.js';
import { MESSAGES } from './ui/messages.js';
import { createZip } from './utils/zip.js';
import { ModelLoader } from './loaders/ModelLoader.js';
import { TextureManager } from './loaders/TextureManager.js';

// Максимальный шаг кадра, который учитывает анимация (сек).
const MAX_FRAME_DELTA = 0.1;

// Яркость панорамы фото-сцены на стакане. Панорама уже несёт свет комнаты,
// поэтому по умолчанию 1; сцена может поправить (environmentIntensity в
// scene.json), если сверка с эталонным рендером показала расхождение.
function photoEnvIntensity(data) {
  return data?.environmentIntensity ?? 1;
}

// Отношение сторон, всегда конечное и положительное.
function aspectOf(width, height) {
  const aspect = width / height;
  return Number.isFinite(aspect) && aspect > 0 ? aspect : 1;
}

// Движок: ядро рендера и загрузчики, цикл отрисовки, фото-сцена, снимок и
// запись оборота. Об интерфейсе не знает — оболочка передаёт каталог и hooks
// и управляет сценой через present(), setBackground() и соседей.
//
// hooks (все необязательны):
//   onLoading(label, percent|null) — идёт загрузка; percent — только реальный;
//   onLoaded()                     — загрузка закончилась;
//   onToast(message, type)         — сообщение человеку ('success' | 'error');
//   onExportBusy(busy)             — запись оборота началась / закончилась;
//   onFullscreen(on)               — полный экран включили или выключили.
export class Viewer {
  constructor(container, config, { catalog, hooks = {} } = {}) {
    this.container = container;
    this.config = config;
    this.catalog = catalog;
    this.hooks = hooks;

    this.frameId = null;
    this.autoRotate = config.autoRotate.enabled;
    // Пока пользователь вручную крутит слайдером — автоповорот на паузе.
    this.manualRotate = false;
    // Скорость докручивания стакана после жеста в фото-сцене, °/с.
    this.spin = 0;
    // Идёт выгрузка оборота: углом модели и отрисовкой распоряжается она, а не
    // обычный цикл (см. exportTurn).
    this.exporting = false;
    // Открытая фото-сцена: снятый фон, его свет и камера. null — обычная
    // студия (см. enterPhotoScene).
    this.photo = null;
    // Отрисовка по требованию: кадр рисуется, только когда что-то изменилось.
    // Первый кадр нужен всегда, вместе с тенью.
    this.needsRender = true;
    this.modelDirty = true;

    this.#initCore();
    this.#initModules();
    this.#trackAsync(['loadHDRI', 'loadModel', 'applyTexture', 'enterPhotoScene', 'exitPhotoScene', 'setPhotoPreset', 'present']);
  }

  // Незавершённые загрузки. whenReady() ждёт, пока их не останется: без этого
  // нельзя снять один и тот же кадр дважды — тень фото-сцены, например,
  // догружается уже после того, как enterPhotoScene вернул управление.
  #pending = new Set();

  // Поколение второго стакана фото-сцены. Сборка ждёт модель и чистый лист, и
  // за это время второй успевают убрать, сменить или уйти в сцену на один
  // стакан; а две сборки подряд оставляли в сцене лишний стакан. Ставит
  // стакан только последняя начатая сборка, и любое снятие отменяет начатые.
  #companionGen = 0;

  #track(promise) {
    this.#pending.add(promise);
    const settle = () => this.#pending.delete(promise);
    promise.then(settle, settle);
    return promise;
  }

  #trackAsync(names) {
    for (const name of names) {
      const original = this[name].bind(this);
      this[name] = (...args) => this.#track(original(...args));
    }
  }

  // Разрешается, когда все начатые загрузки (модель, дизайн, окружение,
  // сцена и её тени) закончились — успешно или нет.
  async whenReady() {
    while (this.#pending.size > 0) await Promise.allSettled([...this.#pending]);
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

    // Тонмаппинг из конфига запоминаем: фото-сцена временно ставит свой, и
    // при возврате в студию нужно вернуть именно этот.
    this.baseToneMapping = this.renderer.toneMapping;

    this.lightingRig = createLighting(this.scene, this.config);
    this.controls = createControls(this.camera, this.renderer.domElement, this.config);
    // Страховка к возвращаемому значению controls.update(): любое изменение
    // камеры обязано приводить к новому кадру.
    this.controls.addEventListener('change', () => this.invalidate());
    // Любой ввод человека прерывает переход камеры к пресету (§12): камера
    // не должна вырываться из рук.
    this.controls.addEventListener('start', () => {
      this.cameraTween = null;
    });

    if (this.config.shadowCatcher?.enabled) {
      this.shadowCatcher = createShadowCatcher(this.config);
      this.scene.add(this.shadowCatcher.plane);
    }

    if (this.config.ambientShadow?.enabled) {
      this.ambientShadow = createAmbientContactShadow(this.config);
      this.scene.add(this.ambientShadow.group);
    }

    // Свёртка прибита к камере: она закрывает кадр целиком и не едет при
    // облёте (см. core/backdrop.js).
    this.backdropScreen = createBackdropScreen();
    this.backdropScreen.fit(this.camera);
    this.camera.add(this.backdropScreen.mesh);

    this.scene.add(this.camera);

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
    this.#bindSceneSpin();
  }

  // В фото-сцене облёт камерой выключен (фон плоский, см. #placePhotoCamera),
  // поэтому перетаскивание по кадру вращает сам стакан — как поворотный круг,
  // только без круга. После отпускания стакан докатывается по инерции.
  #bindSceneSpin() {
    const el = this.renderer.domElement;
    // Полная ширина холста — пол-оборота: так мелкий доворот делается
    // коротким движением, а весь оборот — двумя.
    const degreesPerWidth = 180;
    let drag = null;

    el.addEventListener('pointerdown', (event) => {
      // Бегунок поворотного круга обрабатывает жест сам (turntable.js).
      if (!this.photo || event.defaultPrevented || !event.isPrimary) return;
      if (!this.modelLoader.currentModel) return;
      drag = { id: event.pointerId, x: event.clientX, time: event.timeStamp };
      // Со вторым стаканом крутится тот, по которому начали тянуть; мимо
      // обоих — главный.
      this.spinCup = this.#cupAt(event);
      this.spin = 0;
      this.cameraTween = null;
      this.setManualRotate(true);
      el.setPointerCapture?.(event.pointerId);
      el.style.cursor = 'grabbing';
    });
    el.addEventListener('pointermove', (event) => {
      if (!drag || event.pointerId !== drag.id) return;
      const width = el.clientWidth || 1;
      const degrees = ((event.clientX - drag.x) / width) * degreesPerWidth;
      const seconds = Math.max((event.timeStamp - drag.time) / 1000, 1 / 240);
      this.rotateCupTo(this.spinCup ?? 0, this.getCupRotation(this.spinCup ?? 0) + degrees);
      // Скорость для инерции — сглаженная, иначе последнее дрожание пальца
      // решало бы, куда укатится стакан.
      this.spin = this.spin * 0.6 + (degrees / seconds) * 0.4;
      drag.x = event.clientX;
      drag.time = event.timeStamp;
    });
    const end = (event) => {
      if (!drag || event.pointerId !== drag.id) return;
      const lastMove = drag.time;
      drag = null;
      el.releasePointerCapture?.(event.pointerId);
      el.style.cursor = '';
      // Палец остановился перед отпусканием — значит, катить не нужно.
      if (event.timeStamp - lastMove > 80) this.spin = 0;
      if (this.spin === 0) this.setManualRotate(false);
    };
    el.addEventListener('pointerup', end);
    el.addEventListener('pointercancel', end);
  }

  // Инерция после жеста в фото-сцене: скорость гаснет экспонентой.
  #stepSpin(delta) {
    if (!this.spin) return;
    const cup = this.spinCup ?? 0;
    this.rotateCupTo(cup, this.getCupRotation(cup) + this.spin * delta);
    this.spin *= Math.exp(-delta * 5);
    if (Math.abs(this.spin) < 5) {
      this.spin = 0;
      this.setManualRotate(false);
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
    this.#applyShadingProfile();

    // Стартовый фон — первый в каталоге: кадр не должен ждать оболочку.
    const background = this.catalog?.backgrounds[0];
    if (background) this.setBackground(background);
  }

  // Поднимает сцену: наблюдатели, цикл отрисовки и освещение. Модель и дизайн
  // сюда не входят — их ставит present().
  async startEnvironment() {
    this.#observeResize();
    this.#watchFullscreen();
    this.#watchVisibility();
    this.#handleContextLoss();
    this.#startRenderLoop();
    await this.loadHDRI();
    this.invalidateModel();
  }

  // Кладёт дизайн на модель.
  //
  // Макета нет — кладём чистый лист, а НЕ оставляем то, что лежит в файле
  // модели: у бумажных стаканов там техническая развёртка с метками вырубки и
  // чужими логотипами, и клиент принимает её за свой макет.
  //
  // Сбой загрузки страницу ронять не должен: модель останется с тем, что на
  // ней уже есть. Возвращает число материалов с макетом; null — сбой.
  async applyTexture(url) {
    try {
      const updated = await this.textureManager.replaceTexture(url || blankSheetUrl());
      this.invalidateModel();
      return updated;
    } catch (error) {
      console.warn(`Дизайн не загружен: ${error.message}`);
      return null;
    }
  }

  #emit(name, ...args) {
    this.hooks[name]?.(...args);
  }

  #loading(label, percent = null) {
    this.#emit('onLoading', label, percent);
  }

  #toast(message, type = 'success') {
    this.#emit('onToast', message, type);
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
    //
    // Во время выгрузки оборота цикл стоит: угол там задаётся по часам, и
    // автоповорот, доехавший в промежутке между кадрами, сбил бы и ролик,
    // и углы фотографий.
    if (this.frameId || document.hidden || this.exporting) return;
    const clock = new THREE.Clock();

    const tick = () => {
      this.frameId = requestAnimationFrame(tick);
      // Ограничиваем: свёрнутая вкладка ставит rAF на паузу, и первый кадр
      // после возврата отдал бы весь простой одной дельтой — модель дёрнулась бы.
      const delta = Math.min(clock.getDelta(), MAX_FRAME_DELTA);

      this.#stepSpin(delta);
      // В фото-сцене автоповорота нет: угол стакана уходит в задание рендера,
      // и крутящийся стакан отдал бы в платный кадр случайную сторону.
      if (this.autoRotate && !this.manualRotate && !this.photo && this.modelLoader.currentModel) {
        this.modelLoader.currentModel.rotation.y += this.config.autoRotate.speed * delta;
        this.invalidateModel();
      }

      if (this.cameraTween) {
        if (this.cameraTween.rotatesModel) this.invalidateModel();
        else this.invalidate();
        if (this.cameraTween.step()) this.cameraTween = null;
      }

      // Обе возвращают true, пока продолжают что-то двигать: controls —
      // затухающую орбиту, turntable — появление круга и доворот до засечки.
      // В фото-сцене камера — точная камера Blender: controls.update развернул
      // бы её на цель (lookAt) и потерял бы крен, поэтому орбиту не трогаем.
      const cameraMoving = this.photo ? false : this.controls.update(delta);
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
    // В фото-сцене холст — ровно снимок, вписанный в контейнер, а не весь
    // контейнер: поля вокруг забирает рамка страницы (stage.css), а снимок
    // экрана и выгрузка оборота выходят чистым кадром без пустых полос.
    const [width, height] = this.photo ? this.#photoCanvasSize(w, h) : [w, h];
    this.camera.aspect = aspectOf(width, height);
    this.camera.updateProjectionMatrix();
    // Свёртка закрывает кадр целиком, а её ширина зависит от соотношения сторон.
    this.backdropScreen?.fit(this.camera);
    this.renderer.setSize(width, height);
    this.pipeline.setSize(width, height);
    // У фото-сцены от формы кадра зависит и угол камеры, и кроп фона: их
    // пересчитывать обязательно, иначе перспектива разъедется с фоном.
    if (this.photo) this.#layoutPhotoScene();
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
      this.#toast('Контекст WebGL потерян — восстановление…', 'error');
    });
    canvas.addEventListener('webglcontextrestored', () => {
      this.invalidateModel();
      this.#startRenderLoop();
      this.#toast('Контекст WebGL восстановлен');
    });
  }

  // Поднимает источник отражений. Сбой не критичен: сцена остаётся видимой.
  async loadHDRI() {
    // Студия собирается в памяти мгновенно — индикатор нужен только файлу.
    const fromFile = this.config.lighting.environment === 'hdri';
    if (fromFile) this.#loading('Загрузка окружения…');
    try {
      await this.loadEnvironmentMap();
    } catch (error) {
      console.error(error);
      this.#toast('Не удалось загрузить окружение', 'error');
    } finally {
      if (fromFile) this.#emit('onLoaded');
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
            this.#loading('Загрузка окружения…', percent),
          )
        : loadStudioEnvironment(this.scene, this.renderer, this.config, this.backdrop?.base);

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
  //
  // model — запись catalog/models.json: из неё берутся правила печати
  // (textureMapping); material — запись catalog/materials.json.
  async loadModel(url, model = null, material = null) {
    this.#loading('Загрузка модели…');
    try {
      await this.modelLoader.load(url, (percent) => this.#loading('Загрузка модели…', percent), model, material);
      // Текстуры, которые сделал менеджер, принадлежали уходящей модели, и её
      // уже нет. Видеопамять за них отдаёт сам разбор модели, а вот
      // распакованный растр в обычной памяти (до 12 МБ на макет) держала ссылка
      // в менеджере: пока страница открыта, каждая смена стакана добавляла бы
      // по макету. Освобождаем ПОСЛЕ загрузки: сорвись она раньше, модель
      // осталась бы в сцене без дизайна.
      this.textureManager.dispose();
      if (this.photo) {
        // Загрузчик кадрирует камеру под студию и отдаёт модель студийного
        // размера. В фото-сцене это ломает всё сразу: камера уезжает со
        // съёмочной точки, стакан повисает над столом мимо своей тени. Вернуть
        // надо в том же такте, до первого кадра, иначе прыжок видно.
        applyEnvironmentIntensity(this.modelLoader.currentModel, photoEnvIntensity(this.photo.data));
        this.#placePhotoCamera();
        this.#standCupInScene();
        // Места и кадр зависят от роста стакана (вырез вокруг него).
        this.#layoutCups();
        this.resize();
      } else {
        applyEnvironmentIntensity(
          this.modelLoader.currentModel,
          this.config.lighting.environmentIntensity,
        );
        this.#placeGround();
        this.#measureTurntable();
      }
      this.invalidateModel();
    } catch (error) {
      console.error(error);
      this.#toast(MESSAGES.modelFailed, 'error');
      throw error;
    } finally {
      this.#emit('onLoaded');
    }
  }

  // Ставим плоскость тени и невидимую опору для AO точно на нижнюю точку модели.
  #placeGround() {
    if (!this.modelLoader.currentModel) return;
    const box = new THREE.Box3().setFromObject(this.modelLoader.currentModel);
    this.shadowCatcher?.setHeight(box.min.y);
    if (this.ambientShadow) this.ambientShadow.group.position.y = box.min.y;
    // Небольшой зазор вниз: точно совпадающие плоскости дают у самого основания
    // рябь от точности буфера глубины.

  }

  // ── Фото-сцена ──────────────────────────────────────────────────────────
  //
  // Стакан переезжает из студии в сцену фотореал-рендера: фон — снимок из
  // камеры ракурса, свет — панорама из точки стакана, камера — та же камера,
  // что у Blender, кадр — вырез из снимка (окно, js/core/frame.js). Поэтому то,
  // что видно здесь, совпадает с кадром рендера. Подробности — photoScene.js.
  //
  // options.preset — ракурс сцены (по умолчанию прежний или первый — «как в
  // сцене»); options.frame — формат кадра '1:1' | '3:4' | '4:5'.
  async enterPhotoScene(id, { preset = null, frame = null } = {}) {
    this.#loading('Загрузка сцены…');
    try {
      const photo = await loadPhotoScene(id, this.renderer, (percent) =>
        this.#loading('Загрузка сцены…', percent),
      );
      const chosen = presetOf(photo, preset ?? this.photo?.preset?.id);
      const texture = await backdropOf(photo, chosen);
      this.#applyPhotoScene(photo, chosen, texture, frame ?? this.photo?.frameId ?? '1:1');
      if (this.photoSecond) {
        await this.#buildCompanionSafe();
        this.#layoutCups();
        this.resize();
      }
      return photo;
    } catch (error) {
      console.error(error);
      this.#toast(MESSAGES.sceneFailed, 'error');
      return null;
    } finally {
      this.#emit('onLoaded');
    }
  }

  #applyPhotoScene(photo, preset, texture, frameId) {
    const { data } = photo;
    // Студийный вид запоминаем на входе: вернуться в 3D нужно туда же, где
    // человек был, — с его углом облёта и приближением. Смена одной сцены на
    // другую студию не трогает.
    if (!this.photo) this.#saveStudioView();
    this.photo = { ...photo, preset, backdrop: texture, frameId: ASPECTS[frameId] ? frameId : '1:1' };
    this.#applyShadingProfile();

    // Стакан проходит ту же кривую, что и в кадре рендера: сцены рендера
    // сведены в Blender в Khronos PBR Neutral (своя ветка в SafeOutputPass),
    // экспозиция — сцены. Фона тонмаппинг не касается: конвейер кладёт снимок
    // под стакан уже после него (RenderPipeline#setBackdrop). В студии
    // тонмаппинг прежний — его вернёт exitPhotoScene.
    const transform = data.color?.transform;
    this.renderer.toneMapping =
      transform === 'Khronos PBR Neutral' ? NEUTRAL_TONE_MAPPING
        : transform === 'Standard' ? THREE.LinearToneMapping : THREE.AgXToneMapping;
    this.renderer.toneMappingExposure = 2 ** (data.color?.exposure ?? 0);

    // Свет сцены. Интенсивность полная: панорама снята в этой самой сцене.
    this.scene.environment = photo.envMap;
    applyEnvironmentIntensity(this.modelLoader.currentModel, photoEnvIntensity(data));

    // Ключевой свет нужен ради ТЕНИ: освещает сцену сама панорама.
    this.sun = photo.sun;
    aimKeyLight(this.lightingRig, photo.sun, {
      ...this.config,
      lighting: {
        ...this.config.lighting,
        keyLight: {
          ...this.config.lighting.keyLight,
          intensityScale: data.shadow?.keyScale ?? (photo.sun.physical ? 1 : 0.5),
        },
      },
    });

    // Заливку сцены и свёртку убираем: снятый кадр закрывает их целиком. Поля
    // вокруг снимка — нейтральные (CSS .stage.is-photo), а не цвет студийной
    // подложки; setBackground при выходе вернёт его.
    this.scene.background = null;
    this.backdropScreen.mesh.visible = false;
    const stage = this.container.closest('.stage');
    if (stage) stage.style.background = '';

    // Подставка: поворот стакана в сцене (в «Воде» он наклонён). Место —
    // начало площадки; свой поворот стакан получает уже на ней (rotation.y).
    if (!this.photoStand) {
      this.photoStand = new THREE.Group();
      this.photoStand.name = 'PhotoStand';
      this.scene.add(this.photoStand);
    }
    this.photoStand.position.set(0, 0, 0);
    this.photoStand.quaternion.copy(cupRotation(data));

    this.#placePhotoCamera();
    // Зерно поверх кадра: оно есть в снятой сцене и его нет в 3D.
    this.pipeline.setGrain(data.grain ?? 0.03);
    this.#standCupInScene();
    this.#layoutCups();
    // Через resize: холст ужимается до формы кадра, окно режется под стакан.
    this.resize();
    this.invalidateModel();
  }

  // Ракурс сцены (id из scene.json). Камера встаёт в его точку, фон — его снимок.
  async setPhotoPreset(id) {
    if (!this.photo) return null;
    const preset = presetOf(this.photo, id);
    const texture = await backdropOf(this.photo, preset);
    if (!this.photo) return null;
    this.photo.preset = preset;
    this.photo.backdrop = texture;
    this.#placePhotoCamera();
    // Место пары зависит и от ракурса: кадр пары должен влезть в его снимок.
    this.#layoutCups();
    this.resize();
    this.invalidateModel();
    return preset.id;
  }

  // Формат кадра фото-сцены: '1:1' | '3:4' | '4:5'.
  setPhotoFrame(frameId) {
    if (!this.photo || !ASPECTS[frameId]) return;
    this.photo.frameId = frameId;
    this.#layoutCups();
    this.resize();
    this.invalidateModel();
  }

  // Кадр фото-сцены сейчас — для оболочки и задания рендера: сцена, ракурс,
  // формат, окно, влез ли кадр в снимок фона, крупность к кадру фона.
  photoFrame() {
    const photo = this.photo;
    if (!photo) return null;
    const fit = frameFor(photo, photo.preset, this.#placed(), ASPECTS[photo.frameId]);
    return { scene: photo.id, preset: photo.preset.id, frame: photo.frameId, cups: this.#placed().length, ...fit };
  }

  // Задание рендера для текущей фото-сцены (render/engine/run.py --job):
  // фон, ракурс, формат и стаканы с местами. Места считает сайт (раскладка
  // та же, что у рендера), рендер ставит стаканы туда же.
  // rotate — угол стакана на сайте; соответствие стороне дизайна у Blender —
  // этап В (макет в рендер).
  photoJob() {
    const photo = this.photo;
    if (!photo) return null;
    return {
      set: photo.id,
      camera: { preset: photo.preset.id, frame: photo.frameId },
      cups: this.#placed().map((c, i) => ({
        id: c.cup.id,
        rotate: Math.round(this.getCupRotation(i) * 10) / 10,
        pos_mm: (c.posMm ?? [0, 0]).map((v) => Math.round(v * 10) / 10),
      })),
    };
  }

  // Второй стакан фото-сцены: { model, material, kind: 'pair' | 'side',
  // designUrl } — записи каталога, раскладка и свой макет (null — у пары макет
  // главного, у другого стакана чистый лист); null — убрать. Стаканы не двигаются: места
  // выбирает раскладка, человек только поворачивает.
  async setPhotoSecond(target) {
    this.photoSecond = target?.model ? target : null;
    if (!this.photo) return;
    if (this.photoSecond) await this.#buildCompanionSafe();
    else this.#dropCompanion();
    this.#layoutCups();
    this.resize();
    this.invalidateModel();
  }

  // Поворот стакана фото-сцены: 0 — главный, 1 — второй.
  rotateCupTo(index, degrees) {
    if (index !== 1 || !this.companion) {
      this.rotateModelTo(degrees);
      return;
    }
    this.companion.model.rotation.y = THREE.MathUtils.degToRad(degrees);
    this.invalidateModel();
  }

  // Стаканы фото-сцены — лицом к камере: середина макета (сторона «Спереди»,
  // VIEWS.front) смотрит в точку съёмки. У пары второй — другой стороной
  // (+150°, как при сборке пары), другой стакан — тоже лицом.
  facePhotoCups() {
    if (!this.photo) return;
    const hero = this.#faceAngle(this.modelLoader.currentModel);
    if (hero === null) return;
    this.rotateCupTo(0, hero);
    if (this.companion) {
      const own = this.#faceAngle(this.companion.model) ?? hero;
      this.rotateCupTo(1, this.companion.kind === 'pair' ? own + 150 : own);
    }
  }

  // Угол поворота стакана (rotation.y, градусы), при котором его +Z — лицевая
  // сторона в студии (orbitPosition, азимут 0) — смотрит на камеру. Считается
  // в осях подставки: у наклонённого стакана («Вода») ось своя.
  #faceAngle(model) {
    const stand = model?.parent;
    if (!stand) return null;
    stand.updateWorldMatrix(true, false);
    const eye = stand.worldToLocal(this.camera.position.clone());
    const dx = eye.x - model.position.x;
    const dz = eye.z - model.position.z;
    if (Math.hypot(dx, dz) < 1e-6) return null;
    const degrees = THREE.MathUtils.radToDeg(Math.atan2(dx, dz));
    return ((degrees % 360) + 360) % 360;
  }

  getCupRotation(index) {
    if (index !== 1 || !this.companion) return this.getModelRotation();
    const degrees = THREE.MathUtils.radToDeg(this.companion.model.rotation.y);
    return ((degrees % 360) + 360) % 360;
  }

  // Стаканы сцены с местами: [{ cup, posMm, floorMm }], первый — главный.
  #placed() {
    return this.photo?.placed ?? [{ cup: this.modelLoader.cup, posMm: [0, 0], floorMm: 0 }];
  }

  // Места стаканов в сцене: один — на месте героя; пара — раскладкой, как у
  // рендера. Подставки встают на свои места, кадр — под них.
  #layoutCups() {
    const photo = this.photo;
    if (!photo) return;
    const hero = { cup: this.modelLoader.cup, posMm: [0, 0], floorMm: 0 };
    let placed = [hero];
    if (this.companion) {
      const pair = layoutPair(photo, photo.preset, this.modelLoader.cup, this.companion.cup,
        this.photoSecond?.kind ?? 'pair', ASPECTS[photo.frameId]);
      if (pair) {
        placed = pair;
      } else {
        this.#toast(MESSAGES.secondNoRoom, 'error');
        this.#dropCompanion();
      }
    }
    photo.placed = placed;
    this.photoStand?.position.copy(stagePoint(photo.data, placed[0].posMm, placed[0].floorMm));
    if (this.companion && placed[1]) {
      this.companion.stand.position.copy(stagePoint(photo.data, placed[1].posMm, placed[1].floorMm));
    }
    this.invalidateModel();
  }

  // Собирает второй стакан заново: пара — копия главного (тот же материал и
  // макет), другой объём — своя модель со своим материалом и чистым листом
  // (макет второго стакана — этап В).
  async #buildCompanion() {
    const target = this.photoSecond;
    const hero = this.modelLoader.currentModel;
    if (!this.photo || !target || !hero) return;
    // В сцене на один стакан («Вода», «Подиум», «Кремовые формы») второго нет;
    // желание остаётся — в другой сцене он вернётся.
    if ((this.photo.data.maxCups ?? 2) < 2) {
      this.#dropCompanion();
      return;
    }
    // Угол, выставленный человеком, переживает смену материала или макета, но
    // не смену стакана или раскладки: там второй встаёт по правилу раскладки.
    const same = this.companion && this.companion.cup.id === target.model.id && this.companion.kind === target.kind;
    const keepAngle = same ? this.getCupRotation(1) : null;
    // Копия главного — только для пары без своего макета: у копии материалы
    // общие с главным, а значит, и макет.
    const sameModel = target.model.id === this.modelLoader.cup?.id && !target.designUrl;
    const sheet = target.designUrl ?? blankSheetUrl();
    let companion;
    if (sameModel) {
      this.#dropCompanion();
      companion = { model: hero.clone(true), cup: this.modelLoader.cup, clone: true };
    } else if (this.companion && !this.companion.clone && this.companion.cup.id === target.model.id) {
      companion = this.companion;
      companion.loader.applyMaterial(target.material);
      if (companion.sheet !== sheet) {
        const gen = ++this.#companionGen;
        await companion.textures.replaceTexture(sheet);
        if (gen !== this.#companionGen) return;
        companion.sheet = sheet;
      }
    } else {
      this.#dropCompanion();
      const gen = ++this.#companionGen;
      const stubControls = { target: new THREE.Vector3(), update() {} };
      const loader = new ModelLoader({
        scene: this.scene,
        camera: new THREE.PerspectiveCamera(),
        controls: stubControls,
        config: this.config,
        maxAnisotropy: this.renderer.capabilities.getMaxAnisotropy(),
      });
      try {
        await loader.load(target.model.file, null, target.model, target.material);
      } catch (error) {
        loader.dispose();
        throw error;
      }
      if (gen !== this.#companionGen) {
        loader.dispose();
        return;
      }
      const textures = new TextureManager({
        modelLoader: loader,
        config: this.config,
        maxAnisotropy: this.renderer.capabilities.getMaxAnisotropy(),
        maxTextureSize: this.renderer.capabilities.maxTextureSize,
      });
      // Свой макет или чистый лист, а не то, что лежит в файле модели
      // (техническая развёртка).
      await textures.replaceTexture(sheet);
      if (gen !== this.#companionGen) {
        textures.dispose();
        loader.dispose();
        return;
      }
      companion = { model: loader.currentModel, cup: target.model, loader, textures, clone: false, sheet };
      const height = cupHeight(target.model);
      if (height) loader.setNaturalHeight(height, [0, 0, 0]);
      const model = companion.model;
      if (!model.userData.cavityDone) model.userData.cavityDone = computeCavityOcclusion(model) || 'none';
      model.traverse((object) => {
        if (object.isMesh) installCavityShading(object);
      });
    }
    if (!companion.stand) {
      companion.stand = new THREE.Group();
      companion.stand.name = 'PhotoStand2';
      this.scene.add(companion.stand);
    }
    companion.stand.quaternion.copy(cupRotation(this.photo.data));
    companion.stand.add(companion.model);
    applyEnvironmentIntensity(companion.model, photoEnvIntensity(this.photo.data));
    companion.kind = target.kind;
    this.companion = companion;
    // Пара — второй развёрнут на 150°, чтобы видна была другая сторона
    // дизайна; другой объём — как главный. Уже повёрнутый человеком — как был.
    const heroAngle = this.getCupRotation(0);
    this.rotateCupTo(1, keepAngle ?? (target.kind === 'pair' ? heroAngle + 150 : heroAngle));
    this.#layoutCups();
    this.resize();
  }

  // Второй не загрузился (сеть, файл модели) — в кадре остаётся один главный:
  // сцена не рушится целиком, а желание снимается (photoSecond = null), чтобы
  // состояние узнало об этом и не просило тот же стакан снова и снова.
  async #buildCompanionSafe() {
    try {
      await this.#buildCompanion();
      return true;
    } catch (error) {
      console.error(error);
      this.photoSecond = null;
      this.#dropCompanion();
      this.#toast(MESSAGES.secondFailed, 'error');
      return false;
    }
  }

  #dropCompanion() {
    this.#companionGen++;
    const companion = this.companion;
    if (!companion) return;
    this.companion = null;
    companion.model.removeFromParent();
    if (companion.loader) {
      companion.textures?.dispose();
      companion.loader.dispose();
    }
    companion.stand?.removeFromParent();
    if (this.photo) this.photo.placed = null;
    this.invalidateModel();
  }

  // Какой стакан под указателем: 0 — главный (и мимо обоих), 1 — второй.
  #cupAt(event) {
    if (!this.companion) return 0;
    const rect = this.renderer.domElement.getBoundingClientRect();
    const ndc = new THREE.Vector2(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -((event.clientY - rect.top) / rect.height) * 2 + 1,
    );
    const ray = new THREE.Raycaster();
    ray.setFromCamera(ndc, this.camera);
    const hero = ray.intersectObject(this.modelLoader.currentModel, true)[0];
    const second = ray.intersectObject(this.companion.model, true)[0];
    if (second && (!hero || second.distance < hero.distance)) return 1;
    return 0;
  }

  #saveStudioView() {
    this.studioView = {
      model: this.modelLoader.currentModel,
      position: this.camera.position.clone(),
      target: this.controls.target.clone(),
      fov: this.camera.fov,
      near: this.camera.near,
      far: this.camera.far,
    };
  }

  // Студийный вид, каким он был до фото-сцены. Если стакан в сцене сменили,
  // прежний кадр был под другую модель — тогда кадрируем заново.
  #restoreStudioView() {
    const view = this.studioView;
    this.studioView = null;
    if (!view || view.model !== this.modelLoader.currentModel) {
      this.modelLoader.frameCurrentModel();
      return;
    }
    this.camera.fov = view.fov;
    this.camera.near = view.near;
    this.camera.far = view.far;
    this.camera.position.copy(view.position);
    this.controls.target.copy(view.target);
    this.camera.updateProjectionMatrix();
    this.controls.update();
  }

  // Камера ракурса — точная камера Blender: позиция и поворот как есть, с
  // креном. Облёт выключен: фон плоский, и поворот камеры мгновенно его выдаёт.
  #placePhotoCamera() {
    const view = this.photo?.preset?.view;
    if (!view) return;
    this.controls.enabled = false;
    this.camera.position.copy(view.position);
    this.camera.quaternion.copy(view.quaternion);
    this.camera.near = view.near;
    this.camera.far = view.far;
    this.camera.updateMatrixWorld();
  }

  // Ставит стакан на подставку сцены в натуральную величину и подтягивает за
  // ним тени: в этом режиме важны реальные миллиметры, а не привычный размер.
  #standCupInScene() {
    if (!this.photo) return;
    const model = this.modelLoader.currentModel;
    if (model) this.photoStand.add(model);
    const height = cupHeight(this.modelLoader.cup);
    if (height) {
      const scale = this.modelLoader.setNaturalHeight(height, [0, 0, 0]);
      const { x, y, z } = this.modelLoader.sourceSize;
      this.#fitAmbientOcclusion((Math.max(x, y, z) * scale) / this.config.model.targetSize);
    } else {
      this.modelLoader.normalize();
      this.#fitAmbientOcclusion(1);
    }
    this.#placeGround();
    this.#measureTurntable();
  }

  // Фото-сцены используют исходный профиль тени и затенения; настройки
  // студийного 3D на них не переносятся.
  #applyShadingProfile() {
    const studio = this.photo ? null : this.config.studioShading;
    // Фото-сцена может задать тень сама (scene.json → shadow): у «Серого
    // фотобокса» свет — огромные софтбоксы, и в рендере тень мягкая и светлая.
    // Сцена без этого блока — с исходным профилем, как раньше.
    const scene = this.photo?.data.shadow ?? null;
    this.shadowCatcher?.setOpacity(studio?.shadowOpacity ?? scene?.opacity ?? this.config.shadowCatcher.opacity);
    this.shadowCatcher?.setPenumbra(studio?.shadowPenumbra ?? scene?.penumbra);
    const falloff = studio?.shadowFalloff;
    this.shadowCatcher?.setFalloff(
      falloff?.start ?? this.config.shadowCatcher.falloffStart,
      falloff?.end ?? this.config.shadowCatcher.falloffEnd,
    );
    this.ambientShadow?.setAppearance(studio?.contact ?? {});
    const light = this.lightingRig.getObjectByName('KeyLight');
    if (light) {
      light.shadow.radius = studio?.shadowRadius ?? scene?.radius ?? this.config.lighting.shadow.radius;
      light.shadow.normalBias =
        studio?.shadowNormalBias ?? scene?.normalBias ?? this.config.lighting.shadow.normalBias;
    }
    this.#fitAmbientOcclusion(1);
  }

  // Радиус и толщина затенения складок заданы в единицах сцены под студийный
  // размер модели (наибольшая сторона — config.model.targetSize). В фото-сцене
  // стакан стоит в натуральную величину и выходит в разы меньше, и прежний
  // радиус заливал темнотой всю внутренность. Масштаб — вслед за моделью.
  #fitAmbientOcclusion(scale) {
    const ao = {
      ...this.config.quality?.ambientOcclusion,
      ...(!this.photo ? this.config.studioShading?.ambientOcclusion : null),
    };
    this.pipeline.setAmbientOcclusion({
      ...ao,
      radius: (ao.radius ?? 0.06) * scale,
      thickness: (ao.thickness ?? 0.3) * scale,
    });
  }

  // Холст фото-сцены — форма кадра (формат), вписанная в контейнер w×h.
  #photoCanvasSize(w, h) {
    const frameAspect = ASPECTS[this.photo.frameId] ?? 1;
    if (w / h >= frameAspect) return [Math.max(1, Math.round(h * frameAspect)), h];
    return [w, Math.max(1, Math.round(w / frameAspect))];
  }

  // Окно кадра и вырез фона под текущий холст. target — размер кадра экспорта:
  // тогда окно режется под его форму, а не под страницу.
  #layoutPhotoScene(target = null) {
    const photo = this.photo;
    if (!photo) return;
    const size = target
      ? new THREE.Vector2(target.clientWidth, target.clientHeight)
      : this.renderer.getSize(new THREE.Vector2());

    // Размер снимка — странице: рамку вокруг него рисует CSS
    // (#canvas-container.has-photo в stage.css). Кадр экспорта странице
    // не показывается.
    if (!target) {
      this.container.classList.add('has-photo');
      this.container.style.setProperty('--photo-width', `${size.x}px`);
      this.container.style.setProperty('--photo-height', `${size.y}px`);
    }

    const fit = frameFor(photo, photo.preset, this.#placed(), aspectOf(size.x, size.y));
    applyWindow(this.camera, fit.window);
    this.pipeline.setBackdrop({
      texture: photo.backdrop,
      rect: backdropRect(fit.window, photo.preset.backdropWindow),
    });
    this.invalidate();
  }

  // Возврат в студию: фон снова плоский цвет, камера снова летает.
  async exitPhotoScene() {
    if (!this.photo) return;
    this.photo = null;
    this.spin = 0;
    this.setManualRotate(false);
    this.#applyShadingProfile();

    this.renderer.toneMapping = this.baseToneMapping;
    this.renderer.toneMappingExposure = this.config.renderer.toneMappingExposure;

    this.pipeline.setBackdrop(null);
    this.pipeline.setGrain(0);
    this.camera.clearViewOffset();
    // Второй стакан живёт только в фото-сцене; желание (photoSecond) остаётся.
    this.#dropCompanion();
    this.controls.enabled = true;
    this.container.classList.remove('has-photo');
    this.container.style.removeProperty('--photo-width');
    this.container.style.removeProperty('--photo-height');

    // Стакан — с подставки обратно в сцену, до нормализации: иначе остался бы
    // наклон подставки («Вода»).
    const model = this.modelLoader.currentModel;
    if (model) this.scene.add(model);
    this.photoStand?.removeFromParent();
    this.photoStand = null;

    this.modelLoader.normalize();
    this.#fitAmbientOcclusion(1);
    this.#placeGround();
    this.#measureTurntable();

    // Сначала холст и угол студии — во весь контейнер, — и только потом кадр.
    // Раньше модель кадрировалась ещё с узким углом фото-сцены, а угол
    // возвращался после: расстояние считалось под телеобъектив, показывалось
    // широким, и стакан с каждым возвратом уезжал вдаль.
    this.camera.fov = this.config.camera.fov;
    this.resize();
    this.#restoreStudioView();

    this.setBackground(this.background);
    await this.loadEnvironmentMap();
    applyEnvironmentIntensity(
      this.modelLoader.currentModel,
      this.config.lighting.environmentIntensity,
    );
    this.invalidateModel();
  }

  // Доводит сцену до цели: модель, материал, макет (модель и материал — записи
  // каталога, макет — URL или null для чистого листа).
  //
  // ПЕРЕКЛЮЧЕНИЯ ИДУТ ПО ОДНОМУ. Загрузчик кладёт модель в сцену, когда она
  // доехала, а не когда её выбрали: два быстрых выбора давали две параллельные
  // загрузки, и в сцене оставалась та, что пришла последней, — не обязательно
  // выбранная. Поэтому цель, заданная во время загрузки, только запоминается;
  // промежуточные пропускаются, и после текущего шага сцена идёт к последней.
  //
  // Возвращает { updated, model } — число материалов, получивших макет, и
  // модель, которая реально стоит в сцене (при сбое загрузки — прежняя).
  present(target) {
    this.target = { ...this.target, ...target };
    if (!this.presenting) {
      this.presenting = this.#reconcile().finally(() => {
        this.presenting = null;
      });
    }
    return this.presenting;
  }

  async #reconcile() {
    this.shown ??= { model: null, material: null, designUrl: undefined };
    const shown = this.shown;
    let updated = null;
    for (;;) {
      const target = this.target;
      if (target.model && target.model !== shown.model) {
        try {
          await this.loadModel(target.model.file, target.model, target.material);
        } catch {
          // Сообщение уже показано; цель откатываем к тому, что стоит в сцене.
          this.target = { ...this.target, model: shown.model, material: shown.material };
          continue;
        }
        shown.model = target.model;
        shown.material = target.material;
        // Загрузка сбрасывает материалы: в файле модели лежит техническая
        // развёртка, и макет надо положить заново.
        shown.designUrl = undefined;
        continue;
      }
      if (target.material && target.material !== shown.material) {
        const opacity = this.modelLoader.wallOpacity;
        this.#applyMaterial(target.material);
        shown.material = target.material;
        // Прозрачность стенки пластика запечена в лист макета (TextureManager):
        // у другого пластика она другая — лист кладётся заново.
        if (this.modelLoader.wallOpacity !== opacity) shown.designUrl = undefined;
        continue;
      }
      if (shown.model && target.designUrl !== shown.designUrl) {
        const url = target.designUrl;
        updated = await this.applyTexture(url);
        shown.designUrl = url;
        continue;
      }
      this.#shadeCavity();
      // Второй стакан пары — копия главного: после смены модели, материала или
      // макета копия снимается заново, иначе пара разойдётся.
      if (this.photo && this.photoSecond) await this.#buildCompanionSafe();
      return { updated, model: shown.model };
    }
  }

  // Затенение полости (core/cavityOcclusion.js): атрибут считается один раз на
  // геометрию, хук ставится на каждый новый материал — смена материала
  // подменяет их копиями.
  #shadeCavity() {
    const model = this.modelLoader.currentModel;
    if (!model || this.config.cavityOcclusion?.enabled === false) return;
    if (!model.userData.cavityDone) {
      model.userData.cavityDone = computeCavityOcclusion(model) || 'none';
    }
    model.traverse((object) => {
      if (object.isMesh) installCavityShading(object);
    });
    this.invalidateModel();
  }

  // Подбор силы затенения полости вживую (отладочный API).
  setCavityStrength(value) {
    setCavityStrength(value);
    this.invalidate();
  }

  #applyMaterial(material) {
    const updated = this.modelLoader.applyMaterial(material);
    if (updated > 0) this.invalidate();
    return updated;
  }

  // Подбор отделки вживую из консоли: параметры поверх текущего материала.
  setSurfaceFinish(params) {
    const material = this.modelLoader.material;
    if (!material) return 0;
    return this.#applyMaterial({ ...material, params: { ...material.params, ...params } });
  }

  // Ставит фон — запись catalog/backgrounds.json.
  //
  // Фон ставится в ДВУХ местах одним значением: в сцену и в CSS страницы.
  //
  // В сцену — чтобы кадр был непрозрачным целиком: на прозрачном холсте
  // сглаженный край раздувается при переводе в sRGB и даёт светлую волосяную
  // линию. В CSS — чтобы фон был на месте до запуска скрипта и вокруг холста.
  //
  // Это не заливка, а СВЁРТКА — лист со слабой растяжкой по высоте, как на
  // предметной съёмке (см. core/backdrop.js). Ровная заливка спорила с
  // направленной тенью: тень говорит, что есть стол, а стола в кадре нет.
  setBackground(background) {
    this.background = background;
    const value = background.color;

    // Цвета фона держим у себя: тот же фон подкладывается под снимок сцены.
    this.backdrop = backdropColors(value, background.sweep);
    this.backdropScreen.setColors(this.backdrop);
    // В фото-сцене свёртки нет: её место занимает снятый кадр.
    this.backdropScreen.mesh.visible = !this.photo;
    // Заливка под свёрткой — чтобы кадр был непрозрачным даже там, куда
    // свёртка почему-либо не дотянулась.
    this.scene.background = new THREE.Color(this.backdrop.base);

    // В фото-сцене поля вокруг снимка нейтральные (CSS .stage.is-photo).
    const stage = this.container.closest('.stage') ?? this.container;
    stage.style.background = this.photo ? '' : backdropCss(this.backdrop);

    // Поворотный круг перекрашивается под фон: на тёмном тёмный контур пропал бы.
    this.turntable?.setBackground(new THREE.Color(value));

    // И, главное, пересобирается окружение: подложка светит в сам предмет.
    this.#refreshStudio();
    this.invalidateModel();
  }

  // Пересобирает студию под цвет подложки.
  //
  // ЗАЧЕМ. Предмет стоит не в пустоте: фон под ним и вокруг него отражает свет
  // в его теневую сторону, и цвет этого отсвета — цвет фона. Пока окружение
  // было неизменным, стакан на чёрном фоне оставался снизу таким же светлым,
  // как на белом, и выглядел вырезанным и наклеенным — глаз читает такую
  // картинку как подделку раньше, чем успевает понять, почему.
  //
  // Панорама из файла (lighting.environment: 'hdri') остаётся как есть: она
  // снята в конкретном помещении, и подкрашивать её фоном страницы нечестно.
  #refreshStudio() {
    if (this.config.lighting.environment !== 'studio') return;
    // Фон выбирается ещё в конструкторе, а карта поднимается позже
    // (см. startEnvironment) — до неё пересобирать нечего.
    if (!this.sun) return;

    const previous = this.scene.environment;
    loadStudioEnvironment(this.scene, this.renderer, this.config, this.backdrop?.base);
    previous?.dispose();
  }

  setAutoRotate(on) {
    this.autoRotate = on;
    this.invalidate();
  }

  // Пока человек крутит модель кругом под ней — автоповорот на паузе.
  setManualRotate(active) {
    this.manualRotate = active;
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

  // Возвращает камеру в исходный кадр (двойной клик по сцене, кнопка Reset).
  resetView() {
    // В фото-сцене исходный вид один — съёмочная точка. Студийное
    // кадрирование увело бы камеру с неё, и стакан разошёлся бы с фоном.
    if (this.photo) {
      this.#placePhotoCamera();
      this.invalidate();
      return;
    }
    this.setView('front');
  }

  // Ракурс (§12) для текущей модели: { rotation, position, target } или null.
  // rotation — угол стакана в градусах: к камере встаёт нужная сторона.
  // Камера — на лицевой точке студии на дистанции кадрирования (на ней же
  // снимаются 4 ракурса экспорта, §20); в фото-сцене она стоит в съёмочной
  // точке, и position/target — null.
  //
  // Поворачивается стакан, а не камера: свет и тень остаются на месте, и
  // у всех четырёх ракурсов одна и та же тень.
  viewCamera(name) {
    const view = VIEWS[name];
    const model = this.modelLoader.currentModel;
    const framing = this.modelLoader.framing;
    if (!view || !model || !framing) return null;
    const seam = this.modelLoader.cup?.textureMapping?.seamDeg ?? 180;
    const side = view.azimuth === 'seam' ? seam : view.azimuth;
    const rotation = (((-side % 360) + 360) % 360);
    if (this.photo) return { rotation, position: null, target: null };
    const base = orbitOf(new THREE.Vector3().copy(this.config.camera.position), new THREE.Vector3());
    const elevation = view.elevation ?? base.elevation;
    return {
      rotation,
      target: framing.target.clone(),
      position: orbitPosition(framing.target, framing.distance, 0, elevation),
    };
  }

  // Переводит сцену в ракурс. animate: false — сразу, без перехода.
  setView(name, { animate = true } = {}) {
    const goal = this.viewCamera(name);
    if (!goal) return false;
    this.cameraTween = null;
    if (!animate) {
      this.#applyView(goal);
      return true;
    }
    this.cameraTween = createCameraTween({
      camera: this.camera,
      controls: this.controls,
      model: this.modelLoader.currentModel,
      to: goal,
    });
    this.invalidateModel();
    return true;
  }

  #applyView(goal) {
    const model = this.modelLoader.currentModel;
    if (model) model.rotation.y = THREE.MathUtils.degToRad(goal.rotation);
    if (goal.position) {
      this.controls.target.copy(goal.target);
      this.camera.position.copy(goal.position);
      this.camera.lookAt(goal.target);
      this.controls.update();
    }
    this.invalidateModel();
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

  // Силуэт стаканов фото-сцены: белое на чёрном, тем же окном кадра, без фона,
  // теней, света и постобработки. Для сверки с маской рендера Blender
  // (tests/photoreal/check.mjs): совпадают ли места стаканов и кадр.
  renderSilhouette({ width, height }) {
    return this.#renderFlat({ width, height, art: false });
  }

  // Макет без света: стенка — ровно цвета макета, как он лёг по развёртке,
  // остальное чёрное. Пара к preview_mask.py --art: сайт и рендер сверяют, куда
  // ложится макет и какой стороной стакан смотрит в камеру
  // (tests/photoreal/art-check.mjs).
  renderArt({ width, height }) {
    return this.#renderFlat({ width, height, art: true });
  }

  #renderFlat({ width, height, art }) {
    if (!this.photo) return null;
    const { renderer, scene, camera } = this;
    const hidden = [this.shadowCatcher?.plane, this.ambientShadow?.group].filter((o) => o?.visible);
    const saved = {
      background: scene.background,
      environment: scene.environment,
      override: scene.overrideMaterial,
      toneMapping: renderer.toneMapping,
      ratio: renderer.getPixelRatio(),
    };
    const white = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const black = new THREE.MeshBasicMaterial({ color: 0x000000 });
    // Макет: материал печати → плоский с той же текстурой (тот же UV-набор,
    // сдвиг и повтор); остальное — чёрное. Материалы возвращаются в finally.
    const swapped = [];
    const flat = new Map();
    if (art) {
      // Поля «печатного листа» PP и PET несут прозрачность самой стенки
      // (TextureManager#layOnSheet), краска — полную: ниже порога между ними
      // стенка чёрная, как у рендера (макет с CLIP). Именно чёрная, а не
      // прозрачная: иначе сквозь шов была бы видна печать дальней стенки.
      const flatOf = (material, wall) => {
        if (!flat.has(material)) {
          const threshold = (wall < 1 ? (1 + wall) / 2 : 0.5).toFixed(3);
          const basic = new THREE.MeshBasicMaterial({ map: material.map, side: material.side });
          basic.onBeforeCompile = (shader) => {
            shader.fragmentShader = shader.fragmentShader.replace(
              '#include <map_fragment>',
              `#include <map_fragment>
	diffuseColor.rgb *= step(${threshold}, diffuseColor.a);
	diffuseColor.a = 1.0;`,
            );
          };
          basic.customProgramCacheKey = () => `art-${threshold}`;
          flat.set(material, basic);
        }
        return flat.get(material);
      };
      for (const loader of [this.modelLoader, this.companion?.loader].filter(Boolean)) {
        const print = new Set([...(loader.printMaterials ?? []), ...(loader.physicalCopies?.values() ?? [])]);
        const models = loader === this.modelLoader
          ? [loader.currentModel, this.companion?.clone ? this.companion.model : null]
          : [loader.currentModel];
        for (const model of models.filter(Boolean)) {
          model.traverse((node) => {
            if (!node.isMesh) return;
            swapped.push([node, node.material]);
            // Печать изнутри (копия для полупрозрачного PP) рендер не рисует.
            const pick = (m) => (print.has(m) && m.map && !m.userData.backSide ? flatOf(m, loader.wallOpacity ?? 1) : black);
            node.material = Array.isArray(node.material) ? node.material.map(pick) : pick(node.material);
          });
        }
      }
    }
    this.turntable?.setHiddenForCapture(true);
    for (const object of hidden) object.visible = false;
    scene.background = new THREE.Color(0x000000);
    scene.environment = null;
    scene.overrideMaterial = art ? null : white;
    renderer.toneMapping = THREE.NoToneMapping;
    try {
      renderer.setPixelRatio(1);
      renderer.setSize(width, height, false);
      this.#layoutPhotoScene({ clientWidth: width, clientHeight: height });
      camera.updateMatrixWorld();
      renderer.setRenderTarget(null);
      renderer.render(scene, camera);
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d').drawImage(renderer.domElement, 0, 0, width, height);
      return canvas;
    } finally {
      for (const object of hidden) object.visible = true;
      this.turntable?.setHiddenForCapture(false);
      scene.background = saved.background;
      scene.environment = saved.environment;
      scene.overrideMaterial = saved.override;
      renderer.toneMapping = saved.toneMapping;
      renderer.setPixelRatio(saved.ratio);
      white.dispose();
      black.dispose();
      for (const [node, material] of swapped) node.material = material;
      for (const material of flat.values()) material.dispose();
      this.resize();
      this.invalidateModel();
    }
  }

  // Кадр заданного размера без интерфейса (§20) — холст 2D с фоном.
  //
  // Рисует тот же конвейер, что и экран, — значит, тот же тонмаппинг и то же
  // цветовое пространство. Размер холста WebGL меняется на время одного
  // синхронного такта и тут же возвращается: браузер показывает кадр только
  // после такта, и экранный вид не мигает.
  //
  // Вертикальный угол камеры сохраняется; если при другом соотношении сторон
  // стакан не влезает по ширине, камера отъезжает по своему направлению.
  // view — пресет камеры (§12) или null (текущий вид).
  renderStill({ width, height, view = null }) {
    const { renderer, camera, controls } = this;
    const model = this.modelLoader.currentModel;
    const saved = {
      position: camera.position.clone(),
      target: controls.target.clone(),
      ratio: renderer.getPixelRatio(),
      rotation: model?.rotation.y ?? 0,
    };
    this.cameraTween = null;
    this.turntable?.setHiddenForCapture(true);
    try {
      const goal = view ? this.viewCamera(view) : null;
      if (goal) {
        if (model) {
          model.rotation.y = THREE.MathUtils.degToRad(goal.rotation);
          model.updateMatrixWorld(true);
        }
        if (goal.position) {
          controls.target.copy(goal.target);
          camera.position.copy(goal.position);
          camera.lookAt(goal.target);
        }
      }
      renderer.setPixelRatio(1);
      renderer.setSize(width, height, false);
      this.pipeline.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      this.backdropScreen?.fit(camera);
      // Фото-сцена: снимок, угол и тень — под форму кадра экспорта.
      if (this.photo) this.#layoutPhotoScene({ clientWidth: width, clientHeight: height });
      else this.#keepModelInFrame();
      camera.updateMatrixWorld();

      this.ambientShadow?.update(renderer, this.scene);
      this.pipeline.render();

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      paintBackdrop(ctx, width, height, this.backdrop);
      ctx.drawImage(renderer.domElement, 0, 0, width, height);
      return canvas;
    } finally {
      if (model) {
        model.rotation.y = saved.rotation;
        model.updateMatrixWorld(true);
      }
      if (this.photo) {
        // Камера фото-сцены — точная камера Blender с креном; lookAt его бы потерял.
        this.#placePhotoCamera();
      } else {
        camera.position.copy(saved.position);
        controls.target.copy(saved.target);
        camera.lookAt(saved.target);
      }
      renderer.setPixelRatio(saved.ratio);
      this.turntable?.setHiddenForCapture(false);
      // Размеры холста и конвейера — обратно под контейнер.
      this.resize();
      this.invalidateModel();
      this.pipeline.render();
    }
  }

  // Отодвигает камеру по её направлению, пока все углы габарита модели не
  // окажутся внутри кадра с полем 6 %.
  #keepModelInFrame() {
    const model = this.modelLoader.currentModel;
    if (!model) return;
    const box = new THREE.Box3().setFromObject(model);
    const corners = [];
    for (const x of [box.min.x, box.max.x]) {
      for (const y of [box.min.y, box.max.y]) {
        for (const z of [box.min.z, box.max.z]) corners.push(new THREE.Vector3(x, y, z));
      }
    }
    const { camera, controls } = this;
    const LIMIT = 0.94;
    for (let i = 0; i < 12; i++) {
      camera.updateMatrixWorld();
      const reach = Math.max(...corners.map((corner) => {
        const p = corner.clone().project(camera);
        return Math.max(Math.abs(p.x), Math.abs(p.y));
      }));
      if (reach <= LIMIT) return;
      const offset = camera.position.clone().sub(controls.target);
      camera.position.copy(controls.target).addScaledVector(offset, (reach / LIMIT) * 1.02);
      camera.far = Math.max(camera.far, offset.length() * 40);
      camera.updateProjectionMatrix();
    }
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
    // Экспорт видео уже владеет холстом и скрытием круга. Не запускаем
    // параллельный захват, который мог бы вернуть интерфейс в середине ролика.
    if (this.exporting || this.screenshotting) return;
    this.screenshotting = true;
    this.turntable?.setHiddenForCapture(true);
    // Через конвейер, а не напрямую: иначе снимок уйдёт без затенения складок и
    // без тонмаппинга — то есть заметно хуже того, что клиент видит на экране.
    const name = this.config.ui.screenshotName;
    let blob;
    try {
      this.ambientShadow?.update(this.renderer, this.scene);
      this.pipeline.render();
      blob = await this.#canvasBlob();
    } finally {
      this.turntable?.setHiddenForCapture(false);
      this.screenshotting = false;
      this.invalidate();
    }
    if (!blob) {
      this.#toast(MESSAGES.exportFailed, 'error');
      return;
    }

    const how = await this.#deliver(blob, name, 'image/png');
    if (how === 'shared') return; // системное окно само отчиталось перед пользователем
    this.#toast(how === 'opened' ? 'Снимок открыт в новой вкладке' : 'Снимок сохранён');
  }

  // Отдать файл пользователю снаружи движка (развёртка, экспорт) — тем же
  // путём, что снимок: скачивание или системное «Поделиться» на iOS.
  async deliverFile(blob, name, type) {
    const how = await this.#deliver(blob, name, type);
    if (how === 'shared') return;
    this.#toast(how === 'opened' ? 'Файл открыт в новой вкладке' : 'Файл сохранён');
  }

  // Отдаёт готовый файл пользователю — снимок, ролик или архив.
  //
  // Возвращает, чем всё кончилось: 'shared' (ушло в системное окно, оно само
  // отчиталось), 'downloaded' (легло в «Загрузки») или 'opened' (браузер не
  // умеет скачивать и открыл файл соседней вкладкой).
  async #deliver(blob, name, type) {
    if (this.#shouldShareFile()) {
      const file = new File([blob], name, { type: type ?? blob.type });
      if (navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({ files: [file], title: name });
          return 'shared';
        } catch (error) {
          // Отмену в системном окне за ошибку не считаем.
          if (error?.name === 'AbortError') return 'shared';
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
    // Адрес держим минуту, а не десять секунд, как раньше: ролик и архив весят
    // мегабайты, и на медленном диске браузер к концу десятой секунды может
    // ещё не забрать содержимое — тогда файл сохраняется обрезанным.
    setTimeout(() => URL.revokeObjectURL(url), 60000);

    return canDownload ? 'downloaded' : 'opened';
  }

  // Отдавать ли файл через системное «Поделиться» вместо скачивания.
  // Режим задаётся config.ui.screenshotShare: 'auto' | 'never' | 'always'.
  #shouldShareFile() {
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

  // Выгрузка полного оборота: ролик и, по желанию, кадры через каждые 45°.
  //
  // Оборот начинается с текущего угла — то, что клиент видит перед нажатием,
  // становится первым кадром ролика, и стакан возвращается ровно туда же.
  // Фотографии, наоборот, снимаются от нуля модели: набор должен быть одним и
  // тем же при каждой выгрузке, а имя файла — отвечать реальному повороту.
  //
  // Когда просят и то и другое, всё уходит одним ZIP: девять загрузок подряд
  // браузеры считают подозрительными и половину отбрасывают (js/utils/zip.js).
  //
  // Настройки — js/config.js → turnExport.
  async exportTurn({ photos = false, onProgress } = {}) {
    if (this.exporting || this.screenshotting) return;
    // Модуль записи грузится только при первой записи (§50).
    const { captureTurn, pickVideoType } = await import('./core/turnCapture.js');

    const model = this.modelLoader.currentModel;
    if (!model) {
      this.#toast('Модель ещё не загружена', 'error');
      return;
    }
    // Записывать нечем и фотографии не просили — выгружать нечего.
    if (!pickVideoType() && !photos) {
      this.#toast('Браузер не умеет записывать видео', 'error');
      return;
    }

    const settings = this.config.turnExport;
    const startAngle = this.getModelRotation();

    this.exporting = true;
    this.#emit('onExportBusy', true);
    this.#loading('Выгрузка оборота');
    // Обычный цикл останавливаем: дальше углом и кадрами распоряжается выгрузка,
    // и автоповорот, доехавший между кадрами, сбил бы и ролик, и углы фотографий.
    this.#stopRenderLoop();
    // Круг под стаканом — элемент управления, а не часть предмета: в кадре ему
    // делать нечего.
    this.turntable?.setHiddenForCapture(true);

    try {
      const result = await captureTurn({
        source: this.renderer.domElement,
        backdrop: this.backdrop,
        settings,
        startAngle,
        setAngle: (degrees) => {
          model.rotation.y = THREE.MathUtils.degToRad(degrees);
          model.updateMatrixWorld(true);
        },
        renderFrame: () => {
          // Затенение у основания пересчитывается каждый кадр: модель движется,
          // а иначе тень осталась бы от начального положения.
          this.ambientShadow?.update(this.renderer, this.scene);
          this.pipeline.render();
        },
        photos,
        onProgress: (value, label) => {
          this.#loading(label, value * 100);
          onProgress?.(value, label);
        },
      });

      await this.#deliverTurn(result, settings);
    } catch (error) {
      console.error(error);
      this.#toast(MESSAGES.exportFailed, 'error');
    } finally {
      // Стакан возвращается туда, где стоял: выгрузка не должна менять кадр,
      // который клиент только что рассматривал.
      model.rotation.y = THREE.MathUtils.degToRad(startAngle);
      this.turntable?.setHiddenForCapture(false);
      this.exporting = false;
      this.#emit('onExportBusy', false);
      this.#emit('onLoaded');
      this.invalidateModel();
      this.#startRenderLoop();
    }
  }

  // Раскладывает результат выгрузки по файлам и отдаёт пользователю.
  async #deliverTurn({ video, videoExt, photos }, settings) {
    const base = settings.name;

    if (!video && photos.length === 0) {
      this.#toast(MESSAGES.exportFailed, 'error');
      return;
    }

    // Один ролик отдаём как есть: архив вокруг единственного файла только
    // добавляет клиенту лишний шаг перед просмотром.
    if (video && photos.length === 0) {
      const how = await this.#deliver(video, `${base}.${videoExt}`, video.type);
      if (how === 'shared') return;
      this.#toast(how === 'opened' ? 'Ролик открыт в новой вкладке' : 'Ролик сохранён');
      return;
    }

    const files = [...photos];
    if (video) {
      files.unshift({
        name: `${base}.${videoExt}`,
        data: new Uint8Array(await video.arrayBuffer()),
      });
    }

    const how = await this.#deliver(createZip(files), `${base}.zip`, 'application/zip');
    if (how === 'shared') return;
    if (how === 'opened') {
      this.#toast('Архив открыт в новой вкладке');
      return;
    }

    // Отдельно проговариваем случай, когда ролика в архиве нет: человек ставил
    // галочку «плюс фото», то есть ждал и видео тоже.
    this.#toast(
      video
        ? `Архив сохранён: ролик и ${photos.length} фото`
        : `Браузер не записал видео — сохранены только фото (${photos.length})`,
      video ? 'success' : 'error',
    );
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

  setFullscreen(on) {
    const target = this.container.closest('.stage') ?? this.container;
    if (target.classList.contains('is-fullscreen') !== on) this.toggleFullscreen();
  }

  #setStageFullscreen(target, on) {
    target.classList.toggle('is-fullscreen', on);
    document.body.classList.toggle('has-fullscreen-stage', on);
    this.#emit('onFullscreen', on);
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
    this.backdropScreen?.dispose();
    this.ambientShadow?.dispose();
    this.turntable?.dispose();
    this.scene.environment?.dispose();
    this.controls.dispose();
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }
}
