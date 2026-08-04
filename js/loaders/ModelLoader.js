import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { disposeObject, measure, frameObject } from '../utils/helpers.js';

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
    // Меши, чей материал несёт base-color map, — цели для смены текстуры.
    this.texturableMeshes = [];
  }

  // Грузит модель, заменяя текущую. onProgress получает 0–100 или -1, если
  // размер неизвестен.
  load(url, onProgress) {
    return new Promise((resolve, reject) => {
      this.loader.load(
        url,
        (gltf) => resolve(this.#onLoaded(gltf.scene)),
        (event) => onProgress?.(event.total > 0 ? (event.loaded / event.total) * 100 : -1),
        (error) => reject(new Error(`Не удалось загрузить модель "${url}": ${error.message ?? error}`)),
      );
    });
  }

  // Нормализует свежий граф сцены и добавляет его в мир.
  #onLoaded(model) {
    this.dispose();

    this.#prepareMaterials(model);
    const pivot = this.#normalizeTransform(model);

    this.scene.add(pivot);
    this.currentModel = pivot;

    this.applySurfaceFinish();
    this.frameCurrentModel();
    return pivot;
  }

  // Задаёт отделку мешей, на которые ложится текстура. Трогает только
  // texturableMeshes; значение null оставляет свойство как есть. Возвращает
  // число обновлённых материалов.
  applySurfaceFinish(finish = this.config.texturedSurface) {
    if (!finish) return 0;
    let updated = 0;

    for (const mesh of this.texturableMeshes) {
      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      for (const material of materials) {
        // Эти свойства есть только у PBR-материалов.
        if (!('roughness' in material)) continue;
        if (finish.roughness != null) material.roughness = finish.roughness;
        if (finish.metalness != null) material.metalness = finish.metalness;
        material.needsUpdate = true;
        updated++;
      }
    }
    return updated;
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

    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) pivot.scale.setScalar(this.config.model.targetSize / maxDim);

    return pivot;
  }

  // Включает тени и индексирует материалы под замену текстуры.
  #prepareMaterials(model) {
    this.texturableMeshes = [];
    model.traverse((node) => {
      if (!node.isMesh) return;
      node.castShadow = true;
      node.receiveShadow = true;

      const materials = Array.isArray(node.material) ? node.material : [node.material];
      for (const material of materials) {
        if (material) this.#sharpenTextures(material);
      }
      if (materials.some((m) => m?.map)) this.texturableMeshes.push(node);
    });
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
    this.texturableMeshes = [];
  }

  // Освобождает и загрузчики: DRACOLoader держит пул worker'ов, которые сами
  // не умирают вместе со страницей-контейнером.
  destroy() {
    this.dispose();
    this.draco.dispose();
  }
}
