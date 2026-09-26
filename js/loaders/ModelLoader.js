import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { disposeObject, measure, frameObject } from '../utils/helpers.js';
import { applyPaperSurface } from '../core/paperSurface.js';
import { installPrintShading, setPrintWithoutWhite } from '../core/printShading.js';

// Параметры, ради которых картону нужен MeshPhysicalMaterial (в файле он
// MeshStandardMaterial): бархат soft-touch, лак, коэффициент преломления.
const PHYSICAL_PARAMS = ['sheen', 'clearcoat', 'ior', 'specularIntensity'];

// Правила печати для модели без записи каталога: макет ложится на материалы,
// у которых в файле уже есть карта цвета.
const DEFAULT_PRINT = Object.freeze({ materials: [], uv: 0, sheet: false });

// Порядок отрисовки полупрозрачной стенки. Обе очереди идут ПОСЛЕ плоскостей
// тени: иначе тень под стаканом не была бы видна сквозь него, а прозрачный
// стакан без тени под ним выглядит наклейкой.
const BACK_FACES_ORDER = 1;
const FRONT_FACES_ORDER = 2;

// Грузит glTF/GLB и нормализует модель в сцене: центрирует, масштабирует до
// предсказуемого размера, включает тени, находит материалы под текстуру и
// перекадрирует камеру. Владеет текущей моделью и освобождает её перед загрузкой
// новой, чтобы смена модели не текла по памяти GPU.
// Нормали там, где они расходятся с треугольниками. У бумажных моделей нижняя
// полоса внутренней стенки (у шва дна) выгружена с нормалями, вывернутыми
// наружу, при правильно ориентированных гранях. Материал двусторонний, и при
// взгляде сверху полоса освещалась как изнанка — у дна стояло чёрное кольцо.
//
// Лечится пересчётом нормали в вершинах таких треугольников — по всем
// прилегающим граням, с весом по площади. Остальные вершины не трогаются:
// общий computeVertexNormals сгладил бы и те рёбра, что в модели сделаны
// жёсткими. Возвращает число исправленных вершин.
export function repairInvertedNormals(geometry) {
  const index = geometry.index;
  const pos = geometry.attributes.position;
  const nor = geometry.attributes.normal;
  if (!index || !pos || !nor) return 0;
  const a = new THREE.Vector3();
  const b = new THREE.Vector3();
  const c = new THREE.Vector3();
  const n = new THREE.Vector3();
  const m = new THREE.Vector3();
  const faceNormal = (t, target) => {
    a.fromBufferAttribute(pos, index.getX(t));
    b.fromBufferAttribute(pos, index.getX(t + 1)).sub(a);
    c.fromBufferAttribute(pos, index.getX(t + 2)).sub(a);
    // Без нормировки: длина — удвоенная площадь, это и есть вес.
    return target.crossVectors(b, c);
  };

  const broken = new Set();
  for (let t = 0; t < index.count; t += 3) {
    faceNormal(t, n);
    m.fromBufferAttribute(nor, index.getX(t))
      .add(a.fromBufferAttribute(nor, index.getX(t + 1)))
      .add(b.fromBufferAttribute(nor, index.getX(t + 2)));
    if (n.dot(m) < 0) {
      for (let k = 0; k < 3; k++) broken.add(index.getX(t + k));
    }
  }
  if (broken.size === 0) return 0;

  const sums = new Map([...broken].map((i) => [i, new THREE.Vector3()]));
  for (let t = 0; t < index.count; t += 3) {
    const ids = [index.getX(t), index.getX(t + 1), index.getX(t + 2)];
    if (!ids.some((i) => sums.has(i))) continue;
    faceNormal(t, n);
    for (const i of ids) sums.get(i)?.add(n);
  }

  // Модели квантованы: нормаль может лежать в целочисленном атрибуте —
  // тогда он заменяется float-копией.
  let target = nor;
  if (!(nor.array instanceof Float32Array) || nor.isInterleavedBufferAttribute) {
    const array = new Float32Array(nor.count * 3);
    for (let i = 0; i < nor.count; i++) {
      array[i * 3] = nor.getX(i);
      array[i * 3 + 1] = nor.getY(i);
      array[i * 3 + 2] = nor.getZ(i);
    }
    target = new THREE.BufferAttribute(array, 3);
    geometry.setAttribute('normal', target);
  }
  for (const [i, sum] of sums) {
    sum.normalize();
    target.setXYZ(i, sum.x, sum.y, sum.z);
  }
  target.needsUpdate = true;
  return broken.size;
}

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
    // Запись каталога (catalog/models.json) и её правила печати. Для модели не
    // из каталога — null и правила по умолчанию.
    this.cup = null;
    this.print = DEFAULT_PRINT;
    // Материалы, на которые ложится макет, — уникальные экземпляры.
    this.printMaterials = [];
    // Где материалы печати висят на мешах, и их физические копии.
    this.printSlots = [];
    this.physicalCopies = new Map();
    // Непечатный картон бумажной модели: красится вместе с крафтом.
    this.boardMaterials = [];
    // Насколько плотна незапечатанная стенка. У картона — единица, у пластика
    // приходит из справочника. Это читает TextureManager: прозрачность стенки
    // он запекает в сам лист, чтобы печать поверх осталась кроющей.
    this.wallOpacity = 1;
  }

  // Грузит модель, заменяя текущую. onProgress получает 0–100 или -1, если
  // размер неизвестен. cup — запись catalog/models.json (правила печати —
  // textureMapping), material — запись catalog/materials.json.
  load(url, onProgress, cup = null, material = null) {
    return new Promise((resolve, reject) => {
      this.loader.load(
        url,
        (gltf) => resolve(this.#onLoaded(gltf.scene, cup, material)),
        (event) => onProgress?.(event.total > 0 ? (event.loaded / event.total) * 100 : -1),
        (error) => reject(new Error(`Не удалось загрузить модель "${url}": ${error.message ?? error}`)),
      );
    });
  }

  // Нормализует свежий граф сцены и добавляет его в мир.
  #onLoaded(model, cup, material) {
    this.dispose();

    this.cup = cup;
    this.print = cup?.textureMapping ?? DEFAULT_PRINT;
    model.traverse((node) => {
      if (node.isMesh) repairInvertedNormals(node.geometry);
    });
    this.#prepareMaterials(model);
    // Сквозь пластиковую стенку видно заднюю: её рисует отдельный проход.
    if (cup && cup.type !== 'paper') this.#addBackfacePass(model);
    const pivot = this.#normalizeTransform(model);

    this.scene.add(pivot);
    this.currentModel = pivot;

    this.applyMaterial(material);
    this.frameCurrentModel();
    return pivot;
  }

  // Кладёт материал каталога (catalog/materials.json) на материалы, куда
  // ложится макет. Значение null в параметрах оставляет свойство как есть.
  // Возвращает число обновлённых материалов.
  applyMaterial(material) {
    this.material = material ?? null;
    if (!material) return 0;
    if (material.kind === 'plastic') return this.#applyPlasticFinish(material.params);
    const finish = material.params;

    // Картон глухой: лист для него кладётся без прозрачности.
    this.wallOpacity = 1;
    this.#usePhysical(PHYSICAL_PARAMS.some((key) => finish[key] != null));
    const withoutWhite = material.printBlend === 'multiply';

    let updated = 0;
    for (const material of this.printMaterials) {
      // Эти свойства есть только у PBR-материалов.
      if (!('roughness' in material)) continue;
      if (finish.roughness != null) material.roughness = finish.roughness;
      if (finish.metalness != null) material.metalness = finish.metalness;
      // Фактура картона: сила рельефа и крупность зерна приходят из
      // материала каталога. Если у модели есть своя карта
      // рельефа — тиснение, волокно, — меняется только её сила.
      if (finish.relief != null) {
        applyPaperSurface(material, finish.relief, finish.reliefScale, finish.normalScale ?? 1);
      }
      // Цвет картона: у крафта свой, у остальных — тот, что в файле модели.
      const base = material.userData.base;
      if (finish.boardColor) material.color.set(finish.boardColor);
      else if (base) material.color.copy(base.color);
      setPrintWithoutWhite(material, withoutWhite);
      if (material.isMeshPhysicalMaterial) this.#applyPhysicalParams(material, finish);
      material.needsUpdate = true;
      updated++;
    }
    // Картон один на весь стакан: внутренняя сторона и кромка — того же цвета.
    for (const material of this.boardMaterials) {
      material.color.copy(finish.boardColor ? new THREE.Color(finish.boardColor) : material.userData.baseColor);
    }
    return updated;
  }

  // Параметры физического материала: чего нет в каталоге — то из файла.
  #applyPhysicalParams(material, finish) {
    const base = material.userData.base ?? {};
    material.sheen = finish.sheen ?? 0;
    material.sheenRoughness = finish.sheenRoughness ?? 1;
    material.sheenColor.set(finish.sheenColor ?? '#ffffff');
    material.clearcoat = finish.clearcoat ?? 0;
    material.clearcoatRoughness = finish.clearcoatRoughness ?? 0;
    material.ior = finish.ior ?? base.ior ?? 1.5;
    material.specularIntensity = finish.specularIntensity ?? base.specularIntensity ?? 1;
  }

  // Картону из файла нужен физический материал только на время soft-touch и
  // подобных. Экземпляр подменяется в мешах, а не переделывается: прежний
  // MeshStandardMaterial возвращается нетронутым, и кадры обычного картона
  // остаются бит в бит прежними.
  #usePhysical(on) {
    if (this.printSlots.length === 0) return;
    for (const slot of this.printSlots) {
      if (slot.base.isMeshPhysicalMaterial) continue;
      const target = on ? this.#physicalCopy(slot.base) : slot.base;
      const current = slot.index < 0 ? slot.node.material : slot.node.material[slot.index];
      if (current === target) continue;
      target.map = current.map;
      target.envMapIntensity = current.envMapIntensity;
      if (slot.index < 0) slot.node.material = target;
      else slot.node.material[slot.index] = target;
    }
    const active = new Set(
      this.printSlots.map((slot) => (slot.index < 0 ? slot.node.material : slot.node.material[slot.index])),
    );
    this.printMaterials = [...active, ...this.printMaterials.filter((material) => material.userData.backSide)];
  }

  #physicalCopy(base) {
    const cached = this.physicalCopies.get(base);
    if (cached) return cached;
    const physical = new THREE.MeshPhysicalMaterial();
    // copy() физического ждёт физический источник — берём копирование
    // обычного и возвращаем физические define'ы, которые оно затёрло.
    THREE.MeshStandardMaterial.prototype.copy.call(physical, base);
    physical.defines = { STANDARD: '', PHYSICAL: '' };
    physical.userData = { ...base.userData };
    installPrintShading(physical);
    this.physicalCopies.set(base, physical);
    return physical;
  }

  // Пластик из каталога материалов.
  //
  // Стенка полупрозрачна обычным альфа-смешением, а не «стеклом» из файла
  // модели: сквозь стекло видно только фон, и на светлом фоне стакан исчезал
  // целиком. Подробный разбор — docs/rendering.md, «Молочный пластик».
  #applyPlasticFinish(finish) {
    let updated = 0;

    for (const material of this.printMaterials) {
      if (!('roughness' in material)) continue;
      material.color.set(finish.color);
      material.roughness = finish.roughness;
      material.metalness = finish.metalness;

      // Эти свойства есть только у физического материала: у обычного
      // MeshStandardMaterial их нет вовсе.
      if ('transmission' in material) {
        material.transmission = 0;
        material.thickness = 0;
        material.clearcoat = finish.clearcoat;
        material.clearcoatRoughness = finish.clearcoatRoughness;
        material.sheen = finish.sheen;
        material.sheenRoughness = finish.sheenRoughness;
        material.sheenColor.set(finish.color);
        // Коэффициент преломления задаёт силу отражения (F0): у PET он выше,
        // чем у PP. Нет в каталоге — тот, что в файле модели.
        const base = material.userData.base ?? {};
        material.ior = finish.ior ?? base.ior ?? material.ior;
        material.specularIntensity = finish.specularIntensity ?? base.specularIntensity ?? material.specularIntensity;
      }
      setPrintWithoutWhite(material, false);

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

    this.wallOpacity = finish.opacity;
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

  // Во сколько раз дальше эталона встать камере, чтобы стакан выглядел своего
  // размера (config.model.scaleFeel): модель нормализована, и без этого 120 мл
  // во весь кадр не отличить от 500 мл. Ближе эталона — не дальше, чем пока
  // стакан не займёт scaleMaxFill высоты кадра.
  #scaleDistance() {
    const { scaleFeel = 0, scaleReferenceMm, scaleMaxFill = 1, cameraFitOffset } = this.config.model;
    const size = this.cup?.size;
    const real = Math.max(size?.heightMm ?? 0, size?.topMm ?? 0);
    if (!(real > 0) || !(scaleReferenceMm > 0)) return 1;
    return Math.max((scaleReferenceMm / real) ** scaleFeel, 1 / (cameraFitOffset * scaleMaxFill));
  }

  // Перекадрирует камеру вокруг текущей модели, сохраняя угол обзора.
  frameCurrentModel() {
    if (!this.currentModel) return;
    frameObject(
      this.camera,
      this.controls,
      measure(this.currentModel).box,
      this.config.model.cameraFitOffset * this.#scaleDistance(),
      this.config.model.cameraAim,
    );
    // Кадрирование запоминаем: от него считаются пресеты камеры (§12).
    this.framing = {
      target: this.controls.target.clone(),
      distance: this.camera.position.distanceTo(this.controls.target),
    };
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
    this.printSlots = [];
    this.physicalCopies = new Map();
    // Остальной картон бумажной модели — внутренняя сторона, кромка.
    this.boardMaterials = [];
    const paper = this.cup?.type === 'paper';
    const named = new Set(this.print.materials ?? []);
    const seen = new Set();
    const takes = (material) => (named.size > 0 ? named.has(material.name) : Boolean(material.map));

    model.traverse((node) => {
      if (!node.isMesh) return;
      node.castShadow = true;
      node.receiveShadow = true;

      const materials = Array.isArray(node.material) ? node.material : [node.material];
      // Места, где материал печати висит на меше: сюда подставляется
      // физическая копия (см. #usePhysical).
      materials.forEach((material, index) => {
        if (material && takes(material)) {
          this.printSlots.push({ node, index: Array.isArray(node.material) ? index : -1, base: material });
        }
      });
      for (const material of materials) {
        if (!material || seen.has(material)) continue;
        seen.add(material);
        this.#sharpenTextures(material);
        // Рельеф, пришедший в файле, запоминаем ДО того, как его тронет тип
        // картона: у стаканов с тиснением на этой карте держится сам рисунок
        // (см. js/core/paperSurface.js).
        if (material.userData.sourceNormalMap === undefined) {
          material.userData.sourceNormalMap = material.normalMap ?? null;
        }

        if (takes(material)) {
          // Исходные значения — чтобы материал без этих полей в каталоге
          // возвращал то, что было в файле, а не то, что оставил предыдущий.
          material.userData.base = {
            color: material.color.clone(),
            ior: material.ior,
            specularIntensity: material.specularIntensity,
          };
          installPrintShading(material);
          this.printMaterials.push(material);
        } else if (paper && material.color) {
          material.userData.baseColor = material.color.clone();
          this.boardMaterials.push(material);
        }
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
    // Родитель — сцена или подставка фото-сцены (Viewer#standCupInScene).
    this.currentModel.removeFromParent();
    disposeObject(this.currentModel);
    this.currentModel = null;
    this.sourceSize = null;
    this.cup = null;
    this.material = null;
    this.print = DEFAULT_PRINT;
    this.printMaterials = [];
    // Неактивные копии в сцене не висят — их disposeObject не найдёт.
    for (const copy of this.physicalCopies?.values() ?? []) copy.dispose();
    this.physicalCopies = new Map();
    this.printSlots = [];
    this.boardMaterials = [];
    this.wallOpacity = 1;
  }

  // Освобождает и загрузчики: DRACOLoader держит пул worker'ов, которые сами
  // не умирают вместе со страницей-контейнером.
  destroy() {
    this.dispose();
    this.draco.dispose();
  }
}
