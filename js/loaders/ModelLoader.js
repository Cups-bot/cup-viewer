import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { disposeObject, measure, frameObject } from '../utils/helpers.js';
import { applyPaperSurface } from '../core/paperSurface.js';
import { PLASTIC_FINISH, defaultPaperFinish } from '../data/catalog.js';
import { DEFAULT_PRINT } from '../data/models.js';

// Порядок отрисовки полупрозрачной стенки. Обе очереди идут ПОСЛЕ плоскостей
// тени: иначе тень под стаканом не была бы видна сквозь него, а прозрачный
// стакан без тени под ним выглядит наклейкой.
const BACK_FACES_ORDER = 1;
const FRONT_FACES_ORDER = 2;

// Грузит glTF/GLB и нормализует модель в сцене: центрирует, масштабирует до
// предсказуемого размера, включает тени, находит материалы под текстуру и
// перекадрирует камеру. Владеет текущей моделью и освобождает её перед загрузкой
// новой, чтобы смена модели не текла по памяти GPU.
export class ModelLoader {
  constructor({ scene, camera, controls, config, maxAnisotropy = 1 }) {
    this.scene = scene;
    this.camera = camera;
    this.controls = controls;
    this.config = config;
    this.maxAnisotropy = maxAnisotropy;

    this.loader = new GLTFLoader();
    // Прозрачная поддержка Draco-сжатия. Декодер грузится лениво — только если
    // модель действительно сжата, — и берётся со своего домена: сторонний CDN
    // на клиентской странице это и точка отказа, и канал подмены кода.
    this.draco = new DRACOLoader();
    this.draco.setDecoderPath(config.assets.dracoDecoder);
    this.loader.setDRACOLoader(this.draco);

    this.currentModel = null;
    // Позиция каталога (js/data/models.js) и её правила печати. Для модели не
    // из каталога — null и правила по умолчанию.
    this.cup = null;
    this.print = DEFAULT_PRINT;
    // Материалы, на которые ложится макет, — уникальные экземпляры.
    this.printMaterials = [];
    // Насколько плотна незапечатанная стенка. У картона — единица, у пластика
    // приходит из справочника. Это читает TextureManager: прозрачность стенки
    // он запекает в сам лист, чтобы печать поверх осталась кроющей.
    this.wallOpacity = 1;
  }

  // Грузит модель, заменяя текущую. onProgress получает 0–100 или -1, если
  // размер неизвестен. cup — позиция каталога: из неё берутся отделка и правила
  // печати; для чужого файла (перетащенного на страницу) её нет.
  load(url, onProgress, cup = null) {
    return new Promise((resolve, reject) => {
      this.loader.load(
        url,
        (gltf) => resolve(this.#onLoaded(gltf.scene, cup)),
        (event) => onProgress?.(event.total > 0 ? (event.loaded / event.total) * 100 : -1),
        (error) => reject(new Error(`Не удалось загрузить модель "${url}": ${error.message ?? error}`)),
      );
    });
  }

  // Нормализует свежий граф сцены и добавляет его в мир.
  #onLoaded(model, cup) {
    this.dispose();

    this.cup = cup;
    this.print = cup?.print ?? DEFAULT_PRINT;
    this.#prepareMaterials(model);
    if (this.cup?.finish === 'plastic') this.#addBackfacePass(model);
    const pivot = this.#normalizeTransform(model);

    this.scene.add(pivot);
    this.currentModel = pivot;

    this.applySurfaceFinish();
    this.frameCurrentModel();
    return pivot;
  }

  // Задаёт отделку материалов, на которые ложится макет. Значение null
  // оставляет свойство как есть. Возвращает число обновлённых материалов.
  //
  // Без аргумента берётся отделка картона по умолчанию из справочника
  // (js/data/catalog.js). Она живёт доли секунды — до применения заказа, — но
  // задавать её вторым набором чисел в конфиге нельзя: они разъезжаются
  // с справочником и потом никто не может понять, какое из значений работает.
  applySurfaceFinish(finish = defaultPaperFinish()) {
    const kind = this.cup?.finish ?? 'paper';
    // Материал из файла трогать не велено.
    if (kind === 'own') return 0;
    // Пластик картонной отделки не принимает НИ ОТ КОГО — ни от заказа, ни от
    // отладочного API: тип бумаги к полипропилену отношения не имеет.
    if (kind === 'plastic') return this.#applyPlasticFinish();
    if (!finish) return 0;

    // Картон глухой: лист для него кладётся без прозрачности.
    this.wallOpacity = 1;

    let updated = 0;
    for (const material of this.printMaterials) {
      // Эти свойства есть только у PBR-материалов.
      if (!('roughness' in material)) continue;
      if (finish.roughness != null) material.roughness = finish.roughness;
      if (finish.metalness != null) material.metalness = finish.metalness;
      // Фактура картона: сила рельефа и крупность зерна приходят из типа
      // бумаги (см. js/data/catalog.js).
      if (finish.relief != null) {
        applyPaperSurface(material, finish.relief, finish.reliefScale);
      }
      material.needsUpdate = true;
      updated++;
    }
    return updated;
  }

  // Молочный полипропилен из справочника (js/data/catalog.js).
  //
  // Стенка полупрозрачна обычным альфа-смешением, а не «стеклом» из файла
  // модели: сквозь стекло видно только фон, и на светлом фоне стакан исчезал
  // целиком. Подробный разбор — рядом с PLASTIC_FINISH.
  #applyPlasticFinish() {
    let updated = 0;

    for (const material of this.printMaterials) {
      if (!('roughness' in material)) continue;
      material.color.set(PLASTIC_FINISH.color);
      material.roughness = PLASTIC_FINISH.roughness;
      material.metalness = PLASTIC_FINISH.metalness;

      // Эти свойства есть только у физического материала: у обычного
      // MeshStandardMaterial их нет вовсе.
      if ('transmission' in material) {
        material.transmission = 0;
        material.thickness = 0;
        material.clearcoat = PLASTIC_FINISH.clearcoat;
        material.clearcoatRoughness = PLASTIC_FINISH.clearcoatRoughness;
        material.sheen = PLASTIC_FINISH.sheen;
        material.sheenRoughness = PLASTIC_FINISH.sheenRoughness;
        material.sheenColor.set(PLASTIC_FINISH.color);
      }

      material.transparent = true;
      // Прозрачность приходит ИЗ МАКЕТА, а не отсюда: незапечатанная стенка
      // молочная, а печать по ней кроющая (см. TextureManager). Поэтому у
      // самого материала она полная.
      material.opacity = 1;

      // ГЛУБИНУ ПИШЕМ — и это главное, чем молочный пластик отличается от
      // стекла. Стенка, записавшая глубину, закрывает собой то, что за ней:
      // сквозь неё видно, что фон стал темнее или светлее, но не видно ни дна,
      // ни клейма на нём, ни обратной стороны печати. Ровно так молочный
      // полипропилен и выглядит на фотографиях изделия (3D_plast/ref): он
      // рассеивает свет, а не пропускает изображение.
      //
      // Без записи глубины стакан превращался в витрину: сквозь переднюю
      // стенку читалось дно со всеми насечками — стекло, а не пластик.
      material.depthWrite = true;
      material.side = material.userData.backSide ? THREE.BackSide : THREE.FrontSide;
      material.needsUpdate = true;
      updated++;
    }

    this.wallOpacity = PLASTIC_FINISH.opacity;
    return updated;
  }

  // Второй проход по ЗАДНИМ граням полупрозрачной стенки.
  //
  // Нужен для взгляда СВЕРХУ, в стакан: внутренняя поверхность стенки — это
  // как раз задние грани, и без них в кадре оказывалась дыра, сквозь которую
  // виден фон. Одним мешем с THREE.DoubleSide это не решается: альфа-смешение
  // не сортирует грани внутри меша, и порядок получается случайным.
  //
  // Поэтому задние грани рисуются отдельным мешем раньше передних — с той же
  // геометрией (лишней памяти это не стоит) и клоном материала, который
  // попадает в printMaterials: иначе макет лёг бы только на наружную сторону.
  #addBackfacePass(model) {
    const meshes = [];
    model.traverse((node) => {
      if (!node.isMesh) return;
      const materials = Array.isArray(node.material) ? node.material : [node.material];
      if (materials.some((material) => this.printMaterials.includes(material))) meshes.push(node);
    });

    for (const node of meshes) {
      const source = Array.isArray(node.material) ? node.material[0] : node.material;
      const material = source.clone();
      material.userData.backSide = true;

      const back = new THREE.Mesh(node.geometry, material);
      back.name = `${node.name}__back`;
      // Тень уже отбрасывает передний меш, а геометрия у них общая.
      back.castShadow = false;
      back.receiveShadow = true;
      back.renderOrder = BACK_FACES_ORDER;
      node.renderOrder = FRONT_FACES_ORDER;

      node.parent.add(back);
      this.printMaterials.push(material);
    }
  }

  // Перекадрирует камеру вокруг текущей модели, сохраняя угол обзора.
  frameCurrentModel() {
    if (!this.currentModel) return;
    frameObject(
      this.camera,
      this.controls,
      measure(this.currentModel).box,
      this.config.model.cameraFitOffset,
    );
  }

  // Оборачивает модель в pivot, центрированный на начале координат и
  // масштабированный так, что наибольшая сторона равна targetSize. Смещение —
  // на внутреннем объекте, масштаб — на внешнем: иначе несмасштабированное
  // смещение применилось бы после масштаба, и модель ушла бы от центра. Так же
  // задаётся верный центр вращения для автоповорота.
  #normalizeTransform(model) {
    const { center, size } = measure(model);
    model.position.sub(center);

    const pivot = new THREE.Group();
    pivot.name = 'ModelPivot';
    pivot.add(model);

    // Габариты ДО масштабирования. По ним фото-сцена ставит модель в
    // натуральную величину: там важен не «предсказуемый размер», а реальные
    // миллиметры относительно снятой комнаты (js/core/photoScene.js).
    this.sourceSize = size.clone();
    this.normalize(pivot);

    return pivot;
  }

  // Обычный вид: наибольшая сторона равна config.model.targetSize, модель
  // стоит в начале координат.
  normalize(model = this.currentModel) {
    if (!model || !this.sourceSize) return;
    const { x, y, z } = this.sourceSize;
    const maxDim = Math.max(x, y, z);
    model.scale.setScalar(maxDim > 0 ? this.config.model.targetSize / maxDim : 1);
    model.position.set(0, 0, 0);
  }

  // Натуральная величина: высота модели — ровно heightUnits единиц сцены,
  // основание — в точке origin. Так стакан встаёт на стол снятой сцены и
  // оказывается настолько большим, насколько он большой на самом деле:
  // 650 мл выше 410 мл, бумажный ниже пластикового.
  setNaturalHeight(heightUnits, origin = [0, 0, 0]) {
    const model = this.currentModel;
    if (!model || !this.sourceSize || !(this.sourceSize.y > 0)) return 0;

    const scale = heightUnits / this.sourceSize.y;
    model.scale.setScalar(scale);
    // Модель центрирована, поэтому её низ лежит на половине высоты ниже центра.
    model.position.set(origin[0], origin[1] + (this.sourceSize.y * scale) / 2, origin[2]);
    return scale;
  }

  // Включает тени и находит материалы, на которые ляжет макет.
  //
  // Кого считать печатной поверхностью, говорит каталог (js/data/models.js):
  // у модели может быть материал, готовый принять картинку, но без картинки —
  // так устроен пластиковый стакан, где печать идёт по отдельному UV-набору.
  // Молчит каталог — остаётся прежнее правило: макет ложится туда, где картинка
  // уже лежит в самом файле.
  //
  // Список собирается по УНИКАЛЬНЫМ материалам, а не по мешам: два меша модели
  // вполне могут ссылаться на один экземпляр материала (обычное дело для GLB из
  // Blender), и тогда замена текстуры обходила бы его дважды.
  #prepareMaterials(model) {
    this.printMaterials = [];
    const named = new Set(this.print.materials ?? []);
    const seen = new Set();

    model.traverse((node) => {
      if (!node.isMesh) return;
      node.castShadow = true;
      node.receiveShadow = true;

      const materials = Array.isArray(node.material) ? node.material : [node.material];
      for (const material of materials) {
        if (!material || seen.has(material)) continue;
        seen.add(material);
        this.#sharpenTextures(material);

        const takesPrint = named.size > 0 ? named.has(material.name) : Boolean(material.map);
        if (takesPrint) this.printMaterials.push(material);
      }
    });

    if (named.size > 0 && this.printMaterials.length === 0) {
      console.warn(
        `Каталог: в модели нет материалов «${[...named].join('», «')}» — ` +
          'макет класть некуда. Проверьте print.materials в js/data/models.js.',
      );
    }
  }

  // Поднимает анизотропию всех текстур модели до аппаратного предела.
  #sharpenTextures(material) {
    for (const value of Object.values(material)) {
      if (value?.isTexture) {
        value.anisotropy = this.maxAnisotropy;
        value.needsUpdate = true;
      }
    }
  }

  // Убирает текущую модель и освобождает её ресурсы GPU.
  dispose() {
    if (!this.currentModel) return;
    this.scene.remove(this.currentModel);
    disposeObject(this.currentModel);
    this.currentModel = null;
    this.sourceSize = null;
    this.cup = null;
    this.print = DEFAULT_PRINT;
    this.printMaterials = [];
    this.wallOpacity = 1;
  }

  // Освобождает и загрузчики: DRACOLoader держит пул worker'ов, которые сами
  // не умирают вместе со страницей-контейнером.
  destroy() {
    this.dispose();
    this.draco.dispose();
  }
}
