import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { disposeObject, measure, frameObject } from '../utils/helpers.js';

/**
 * Loads glTF/GLB models and normalises them into the scene:
 * centers the geometry, scales it to a predictable size, enables shadows,
 * discovers texturable materials and re-frames the camera.
 *
 * Owns the currently displayed model and disposes it before loading a new
 * one, so swapping models never leaks GPU memory.
 */
export class ModelLoader {
  /**
   * @param {object} deps
   * @param {THREE.Scene} deps.scene
   * @param {THREE.PerspectiveCamera} deps.camera
   * @param {import('three').OrbitControls} deps.controls
   * @param {import('../config.js').CONFIG} deps.config
   * @param {number} [deps.maxAnisotropy=1] GPU anisotropic filtering limit.
   */
  constructor({ scene, camera, controls, config, maxAnisotropy = 1 }) {
    this.scene = scene;
    this.camera = camera;
    this.controls = controls;
    this.config = config;
    this.maxAnisotropy = maxAnisotropy;

    this.loader = new GLTFLoader();
    // Support Draco-compressed meshes transparently; the decoder is only
    // fetched (lazily, from a CDN) if a model actually needs it.
    const draco = new DRACOLoader();
    draco.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
    this.loader.setDRACOLoader(draco);

    /** @type {THREE.Group | null} */
    this.currentModel = null;
    /** Meshes whose material carries a base-color map — texture swap targets. */
    this.texturableMeshes = [];
  }

  /**
   * Load a model, replacing any currently displayed one.
   * @param {string} url Path to a .gltf/.glb file.
   * @param {(percent: number) => void} [onProgress] 0–100, or -1 when the
   *   total size is unknown.
   * @returns {Promise<THREE.Group>}
   */
  load(url, onProgress) {
    return new Promise((resolve, reject) => {
      this.loader.load(
        url,
        (gltf) => resolve(this.#onLoaded(gltf.scene)),
        (event) => onProgress?.(event.total > 0 ? (event.loaded / event.total) * 100 : -1),
        (error) => reject(new Error(`Failed to load model "${url}": ${error.message ?? error}`)),
      );
    });
  }

  /**
   * Normalise a freshly loaded scene graph and add it to the world.
   * @param {THREE.Group} model
   * @returns {THREE.Group}
   */
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

  /**
   * Set the finish of the meshes the texture is applied to.
   *
   * Only touches `texturableMeshes`, so the rest of the model keeps the
   * materials it was authored with. A `null` value leaves that property
   * alone, which is how you opt out per-property rather than all-or-nothing.
   *
   * @param {{roughness?: number|null, metalness?: number|null}} [finish]
   *   Defaults to `config.texturedSurface`.
   * @returns {number} Number of materials updated.
   */
  applySurfaceFinish(finish = this.config.texturedSurface) {
    if (!finish) return 0;
    let updated = 0;

    for (const mesh of this.texturableMeshes) {
      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      for (const material of materials) {
        // Only PBR materials have these; MeshBasicMaterial and friends do not.
        if (!('roughness' in material)) continue;
        if (finish.roughness != null) material.roughness = finish.roughness;
        if (finish.metalness != null) material.metalness = finish.metalness;
        material.needsUpdate = true;
        updated++;
      }
    }
    return updated;
  }

  /** Re-frame the camera around the current model, keeping the view angle. */
  frameCurrentModel() {
    if (!this.currentModel) return;
    frameObject(
      this.camera,
      this.controls,
      measure(this.currentModel).box,
      this.config.model.cameraFitOffset,
    );
  }

  /**
   * Wrap the model in a pivot that is centred on the origin and scaled so the
   * largest dimension is `targetSize`.
   *
   * The offset has to live on the inner object and the scale on the outer one.
   * Doing both on a single object would apply the (unscaled) offset after the
   * scale — `position` is not affected by an object's own `scale` — leaving the
   * model off-centre. That also gives the spin a correct pivot: rotating the
   * returned group turns the model about its own centre instead of swinging it
   * around a point off to one side.
   *
   * @param {THREE.Group} model
   * @returns {THREE.Group} The pivot to add to the scene.
   */
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

  /** Enable shadows and index materials that can receive a replacement texture. */
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

  /** Raise every map the model ships with to the GPU's anisotropy limit. */
  #sharpenTextures(material) {
    for (const value of Object.values(material)) {
      if (value?.isTexture) {
        value.anisotropy = this.maxAnisotropy;
        value.needsUpdate = true;
      }
    }
  }

  /** Remove and free the current model's GPU resources. */
  dispose() {
    if (!this.currentModel) return;
    this.scene.remove(this.currentModel);
    disposeObject(this.currentModel);
    this.currentModel = null;
    this.texturableMeshes = [];
  }
}
