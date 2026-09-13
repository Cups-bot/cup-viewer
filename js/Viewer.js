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
import { captureTurn, pickVideoType } from './core/turnCapture.js';
import {
  frameAspectOf,
  frameSizeOf,
  fovFor,
  heightInScene,
  loadPhotoScene,
  loadShadowLayer,
  pickFrame,
  shadowKeyFor,
} from './core/photoScene.js';
import { defaultPaperFinish } from './data/catalog.js';
import { findCup } from './data/models.js';
import { DEFAULT_SCENE_ID } from './data/scenes.js';
import { blankSheetUrl } from './utils/blankSheet.js';
import { createZip } from './utils/zip.js';
import { ModelLoader } from './loaders/ModelLoader.js';
import { TextureManager } from './loaders/TextureManager.js';
import { UIManager } from './ui/UIManager.js';

// Максимальный шаг кадра, который учитывает анимация (сек).
const MAX_FRAME_DELTA = 0.1;

// Яркость панорамы фото-сцены на стакане. Панорама уже несёт свет комнаты,
// поэтому по умолчанию 1; сцена может поправить (scene.environmentIntensity),
// если сверка с эталонным рендером показала расхождение.
function photoEnvIntensity(data) {
  return data?.environmentIntensity ?? 1;
}

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
      onExportTurn: (options) => this.exportTurn(options),
      onToggleFullscreen: () => this.toggleFullscreen(),
      onImageFile: (file) => this.replaceTextureFromFile(file),
      onModelFile: (file) => this.loadModelFromFile(file),
      onSelectCup: (id) => this.selectCup(id),
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

  // Кладёт дизайн на модель.
  //
  // Макета нет — кладём чистый лист, а НЕ оставляем то, что лежит в файле
  // модели: у бумажных стаканов там техническая развёртка с метками вырубки и
  // чужими логотипами, и клиент принимает её за свой макет.
  //
  // Сбой загрузки страницу ронять не должен: модель останется с тем, что на
  // ней уже есть.
  async applyTexture(url) {
    try {
      const updated = await this.textureManager.replaceTexture(url || blankSheetUrl());
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
    // В фото-сцене холст — ровно снимок, вписанный в контейнер, а не весь
    // контейнер: поля вокруг забирает рамка страницы (approve.css), а снимок
    // экрана и выгрузка оборота выходят чистым кадром без пустых полос.
    const [width, height] = this.photo ? this.#photoCanvasSize(w, h) : [w, h];
    this.camera.aspect = aspectOf(width, height);
    this.camera.updateProjectionMatrix();
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
  // cup — позиция каталога (js/data/models.js), если модель пришла оттуда:
  // из неё берутся отделка и правила печати. У файла, брошенного на страницу,
  // её нет.
  async loadModel(url, cup = null) {
    this.ui.showLoader('Загрузка модели…');
    try {
      await this.modelLoader.load(url, (percent) => this.ui.updateProgress(percent), cup);
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
      } else {
        applyEnvironmentIntensity(
          this.modelLoader.currentModel,
          this.config.lighting.environmentIntensity,
        );
        this.#placeGround();
        this.#measureTurntable();
      }
      this.ui.setActiveCup(cup?.id ?? null);
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

  // ── Фото-сцена ──────────────────────────────────────────────────────────
  //
  // Стакан переезжает из студии в настоящую снятую сцену: фон приходит
  // картинкой, свет — панорамой из точки, где стакан стоял при съёмке, камера
  // встаёт ровно туда, где была в Blender. Подробности — в js/core/photoScene.js.
  async enterPhotoScene(id = DEFAULT_SCENE_ID) {
    this.ui.showLoader('Загрузка сцены…');
    try {
      const photo = await loadPhotoScene(id, this.renderer, (percent) =>
        this.ui.updateProgress(percent, 'Загрузка сцены…'),
      );
      this.#applyPhotoScene(photo);
      return photo;
    } catch (error) {
      console.error(error);
      this.ui.showToast('Не удалось открыть сцену', 'error');
      return null;
    } finally {
      this.ui.hideLoader();
    }
  }

  #applyPhotoScene(photo) {
    const { data } = photo;
    // Студийный вид запоминаем на входе: вернуться в 3D нужно туда же, где
    // клиент был, — с его углом облёта и приближением. Смена одной сцены на
    // другую студию не трогает.
    if (!this.photo) this.#saveStudioView();
    this.photo = photo;

    // Стакан живёт в сцене по панораме env.hdr — это линейная яркость
    // комнаты, и без тонмаппинга его блики выбьет в белое. В обычном режиме
    // тонмаппинг выключен ради цветопередачи — там согласуют цвет печати.
    // Фона тонмаппинг не касается: конвейер кладёт снимок под стакан уже
    // после него (см. RenderPipeline#setBackdrop).
    //
    // Какой именно — говорит сцена: стакан обязан пройти ту же кривую, что
    // и в рендере, по которому сцену согласовали. Сцена, сведённая в Blender
    // в Standard, — это обычный sRGB с обрезкой; AgX на ней сжимал белый
    // стакан до серого. Filmic и AgX из Blender в three ближе всего к AgX.
    this.renderer.toneMapping =
      data.view?.transform === 'Standard' ? THREE.LinearToneMapping : THREE.AgXToneMapping;
    this.renderer.toneMappingExposure = 2 ** (data.view?.exposure ?? 0);

    // Свет сцены. Интенсивность здесь полная: панорама снята в этой самой
    // комнате и уже несёт её яркость — ослаблять нечего.
    this.scene.environment = photo.envMap;
    if ('environmentIntensity' in this.scene) this.scene.environmentIntensity = 1;
    applyEnvironmentIntensity(this.modelLoader.currentModel, photoEnvIntensity(data));

    // Ключевой свет наводится по самому яркому пятну панорамы — он нужен
    // ради ТЕНИ, а не ради освещения: освещает сцену сама панорама. В студии
    // источнику отдают восьмую часть яркости софтбокса, и для снятой комнаты
    // этого мало — тень получается еле заметной. Долю задаёт сцена.
    this.sun = photo.sun;
    aimKeyLight(this.lightingRig, photo.sun, {
      ...this.config,
      lighting: {
        ...this.config.lighting,
        keyLight: {
          ...this.config.lighting.keyLight,
          intensityScale: data.shadow?.keyScale ?? 0.5,
        },
      },
    });

    // Пол студии красится в цвет фона и потому невидим; на снятом фоне он
    // стал бы серым диском поперёк стола.
    if (this.floor) this.floor.mesh.visible = false;
    // Заливку сцены убираем: кадр закрывает её целиком.
    this.scene.background = null;

    this.#placePhotoCamera();

    // Зерно поверх кадра: оно есть в снятой сцене и его нет в 3D, и без него
    // стакан читается как наклейка (см. RenderPipeline).
    this.pipeline.setGrain(data.grain ?? 0.03);

    this.#standCupInScene();
    // Через resize, а не сразу раскладкой: холст ужимается до снимка.
    this.resize();
    this.#loadPhotoShadow();
    this.invalidateModel();
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

  // Камера сцены. Облёт выключен: фон плоский, и поворот камеры мгновенно
  // его выдаёт. Крутится только сам стакан — кругом под ним и автоповоротом.
  #placePhotoCamera() {
    const { data } = this.photo ?? {};
    if (!data) return;
    this.controls.enabled = false;
    this.camera.position.set(...data.camera.position);
    this.controls.target.set(...data.camera.target);
    this.camera.lookAt(this.controls.target);
  }

  // Ставит стакан на пол сцены в натуральную величину и подтягивает за ним
  // тени: в этом режиме важны реальные миллиметры, а не привычный размер.
  #standCupInScene() {
    const { data } = this.photo ?? {};
    if (!data) return;

    const cup = this.modelLoader.cup;
    const height = heightInScene(data, cup);
    const origin = data.cup?.origin ?? [0, data.floor?.y ?? 0, 0];

    if (height) {
      const scale = this.modelLoader.setNaturalHeight(height, origin);
      const { x, y, z } = this.modelLoader.sourceSize;
      this.#fitAmbientOcclusion((Math.max(x, y, z) * scale) / this.config.model.targetSize);
    } else {
      this.modelLoader.normalize();
      this.#fitAmbientOcclusion(1);
    }

    this.#placeGround();
    this.#measureTurntable();
  }

  // Радиус и толщина затенения складок заданы в единицах сцены под студийный
  // размер модели (наибольшая сторона — config.model.targetSize). В фото-сцене
  // стакан стоит в натуральную величину и выходит в разы меньше, и прежний
  // радиус заливал темнотой всю внутренность. Масштаб — вслед за моделью.
  #fitAmbientOcclusion(scale) {
    const ao = this.config.quality?.ambientOcclusion ?? {};
    this.pipeline.setAmbientOcclusion({
      radius: (ao.radius ?? 0.06) * scale,
      thickness: (ao.thickness ?? 0.3) * scale,
    });
  }

  // Снимок сцены, вписанный в контейнер w×h без искажений: [ширина, высота].
  // Какой из двух кадров брать, решает форма места на странице.
  #photoCanvasSize(w, h) {
    const frameAspect = frameAspectOf(this.photo.data, pickFrame(aspectOf(w, h)));
    if (w / h >= frameAspect) return [Math.max(1, Math.round(h * frameAspect)), h];
    return [w, Math.max(1, Math.round(w / frameAspect))];
  }

  // Угол камеры и кроп фона под текущую форму сцены.
  #layoutPhotoScene() {
    const { data, backdrops } = this.photo ?? {};
    if (!data) return;

    // Кадр выбирается по месту на странице, угол — по самому холсту: он уже
    // вписан в форму кадра (см. resize).
    const { clientWidth: w, clientHeight: h } = this.container;
    const frame = pickFrame(aspectOf(w, h));
    const size = this.renderer.getSize(new THREE.Vector2());
    const aspect = aspectOf(size.x, size.y);
    const backdrop = backdrops[frame] ?? backdrops.wide;

    // Размер снимка — странице: рамку вокруг него рисует CSS
    // (#canvas-container.has-photo в approve.css).
    this.container.classList.add('has-photo');
    this.container.style.setProperty('--photo-width', `${size.x}px`);
    this.container.style.setProperty('--photo-height', `${size.y}px`);

    this.camera.fov = fovFor(data, frame, aspect);
    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();

    // Тень снимается под оба кадра, поэтому берётся та, что к нему подходит.
    const shadow = this.photoShadow?.[frame] ?? null;
    this.#useBakedShadow(Boolean(shadow));

    this.pipeline.setBackdrop({
      texture: backdrop,
      frameSize: frameSizeOf(aspect, frameAspectOf(data, frame)),
      shadow,
      shadowOpacity: data.shadowOpacity ?? 1,
    });
    this.invalidate();
  }

  // Снятая тень и расчётная — взаимоисключающие: вторая легла бы поверх первой
  // и удвоила её.
  #useBakedShadow(baked) {
    if (this.shadowCatcher) this.shadowCatcher.plane.visible = !baked;
    if (this.ambientShadow) this.ambientShadow.group.visible = !baked;
  }

  // Слой тени под текущую модель. Тень зависит от того, что её отбрасывает,
  // поэтому у каждого объёма он свой; для модели, которую в сцене не снимали
  // (бумажные стаканы), слоя нет — там считается обычная тень.
  async #loadPhotoShadow() {
    this.#setPhotoShadow(await this.#fetchPhotoShadow(this.modelLoader.cup));
  }

  // Слои тени модели под оба кадра; null — у сцены такой тени нет.
  async #fetchPhotoShadow(cup) {
    const { id, data } = this.photo ?? {};
    if (!data) return null;

    const key = shadowKeyFor(cup);
    const [wide, tall] = await Promise.all([
      loadShadowLayer(id, data, key, 'wide'),
      loadShadowLayer(id, data, key, 'tall'),
    ]);
    return wide || tall ? { wide, tall } : null;
  }

  #setPhotoShadow(layers) {
    if (!this.photo) return;
    this.photoShadow = layers;
    this.#layoutPhotoScene();
    this.invalidateModel();
  }

  // Возврат в студию: фон снова плоский цвет, камера снова летает.
  async exitPhotoScene() {
    if (!this.photo) return;
    this.photo = null;

    this.renderer.toneMapping = this.baseToneMapping;
    this.renderer.toneMappingExposure = this.config.renderer.toneMappingExposure;

    if (this.floor) this.floor.mesh.visible = true;
    this.pipeline.setBackdrop(null);
    this.photoShadow = null;
    this.#useBakedShadow(false);
    this.pipeline.setGrain(0);
    this.controls.enabled = true;
    this.container.classList.remove('has-photo');
    this.container.style.removeProperty('--photo-width');
    this.container.style.removeProperty('--photo-height');

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

    this.selectBackground(this.backgroundIndex);
    await this.loadEnvironmentMap();
    applyEnvironmentIntensity(
      this.modelLoader.currentModel,
      this.config.lighting.environmentIntensity,
    );
    this.invalidateModel();
  }

  // Смена стакана выпадающим списком в сцене.
  //
  // ДИЗАЙН НА НОВУЮ МОДЕЛЬ НЕ ПЕРЕНОСИТСЯ. У каждого стакана своя развёртка:
  // та же картинка на соседней модели съезжает, растёт или обрезается — и это
  // выглядит как брак печати, хотя виноват просмотр. Поэтому новая модель
  // приезжает с чистым листом А4, а дизайн кладётся на неё уже осознанно —
  // кнопкой «Заменить дизайн» (см. js/utils/blankSheet.js).
  //
  // ПЕРЕКЛЮЧЕНИЯ ИДУТ ПО ОДНОМУ. Загрузчик кладёт модель в сцену, когда она
  // доехала, а не когда её выбрали: два быстрых клика давали две параллельные
  // загрузки, и в сцене оставалась та, что пришла последней, — не обязательно
  // выбранная. Поэтому выбор, сделанный во время загрузки, только запоминается;
  // промежуточные пропускаются, и после текущей грузится последний.
  selectCup(id) {
    this.pendingCupId = id;
    if (!this.cupSwitch) {
      this.cupSwitch = (async () => {
        while (this.pendingCupId) {
          const next = this.pendingCupId;
          this.pendingCupId = null;
          await this.#switchCup(next);
        }
      })().finally(() => {
        this.cupSwitch = null;
      });
    }
    return this.cupSwitch;
  }

  async #switchCup(id) {
    const cup = findCup(id);
    if (!cup) return;

    // Тень новой модели грузится одновременно с ней: иначе под новым стаканом
    // лежала бы тень прежнего, пока не догрузится своя.
    const shadow = this.photo ? this.#fetchPhotoShadow(cup) : null;

    try {
      await this.loadModel(cup.file, cup);
    } catch {
      // Сообщение уже показано загрузчиком; список возвращаем к тому стакану,
      // который на самом деле стоит в сцене.
      this.ui.setActiveCup(this.modelLoader.cup?.id ?? null);
      return;
    }
    if (shadow) this.#setPhotoShadow(await shadow);

    // Отделка из заказа. Пластик её не примет — каталог велит ему держать
    // собственный материал (см. ModelLoader.applySurfaceFinish).
    if (this.order?.roughness != null) {
      this.setSurfaceFinish({
        roughness: this.order.roughness,
        relief: this.order.relief,
        reliefScale: this.order.reliefScale,
      });
    }

    const sheet = blankSheetUrl();
    await this.applyTexture(sheet);
    // Развёртка показывает то же, что лежит на модели, — значит, тоже лист.
    this.unwrap?.setSource(sheet);
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
    // В фото-сцене исходный вид один — съёмочная точка. Студийное
    // кадрирование увело бы камеру с неё, и стакан разошёлся бы с фоном.
    if (this.photo) this.#placePhotoCamera();
    else this.modelLoader.frameCurrentModel();
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

    const how = await this.#deliver(blob, name, 'image/png');
    if (how === 'shared') return; // системное окно само отчиталось перед пользователем
    this.ui.showToast(how === 'opened' ? 'Снимок открыт в новой вкладке' : 'Снимок сохранён');
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
  async exportTurn({ photos = false } = {}) {
    if (this.exporting) return;

    const model = this.modelLoader.currentModel;
    if (!model) {
      this.ui.showToast('Модель ещё не загружена', 'error');
      return;
    }
    // Записывать нечем и фотографии не просили — выгружать нечего.
    if (!pickVideoType() && !photos) {
      this.ui.showToast('Браузер не умеет записывать видео', 'error');
      return;
    }

    const settings = this.config.turnExport;
    const startAngle = this.getModelRotation();

    this.exporting = true;
    this.ui.setExportBusy(true);
    this.ui.showLoader('Выгрузка оборота');
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
        onProgress: (value, label) => this.ui.updateProgress(value * 100, label),
      });

      await this.#deliverTurn(result, settings);
    } catch (error) {
      console.error(error);
      this.ui.showToast('Не удалось выгрузить оборот', 'error');
    } finally {
      // Стакан возвращается туда, где стоял: выгрузка не должна менять кадр,
      // который клиент только что рассматривал.
      model.rotation.y = THREE.MathUtils.degToRad(startAngle);
      this.turntable?.setHiddenForCapture(false);
      this.exporting = false;
      this.ui.setExportBusy(false);
      this.ui.hideLoader();
      this.invalidateModel();
      this.#startRenderLoop();
    }
  }

  // Раскладывает результат выгрузки по файлам и отдаёт пользователю.
  async #deliverTurn({ video, videoExt, photos }, settings) {
    const base = settings.name;

    if (!video && photos.length === 0) {
      this.ui.showToast('Не удалось выгрузить оборот', 'error');
      return;
    }

    // Один ролик отдаём как есть: архив вокруг единственного файла только
    // добавляет клиенту лишний шаг перед просмотром.
    if (video && photos.length === 0) {
      const how = await this.#deliver(video, `${base}.${videoExt}`, video.type);
      if (how === 'shared') return;
      this.ui.showToast(how === 'opened' ? 'Ролик открыт в новой вкладке' : 'Ролик сохранён');
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
      this.ui.showToast('Архив открыт в новой вкладке');
      return;
    }

    // Отдельно проговариваем случай, когда ролика в архиве нет: человек ставил
    // галочку «плюс фото», то есть ждал и видео тоже.
    this.ui.showToast(
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
