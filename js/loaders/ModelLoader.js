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
   */
  constructor({ scene, camera, controls, config }) {
    this.scene = scene;
    this.camera = camera;
    this.controls = controls;
    this.config = config;

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

    this.#normalizeTransform(model);
    this.#prepareMaterials(model);

    this.scene.add(model);
    this.currentModel = model;

    this.frameCurrentModel();
    return model;
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

  /** Center at the origin and scale so the largest dimension is `targetSize`. */
  #normalizeTransform(model) {
    const { center, size } = measure(model);
    model.position.sub(center);

    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) model.scale.setScalar(this.config.model.targetSize / maxDim);
  }

  /** Enable shadows and index materials that can receive a replacement texture. */
  #prepareMaterials(model) {
    this.texturableMeshes = [];
    model.traverse((node) => {
      if (!node.isMesh) return;
      node.castShadow = true;
      node.receiveShadow = true;

      const materials = Array.isArray(node.material) ? node.material : [node.material];
      if (materials.some((m) => m?.map)) this.texturableMeshes.push(node);
    });
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
