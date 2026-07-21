import * as THREE from 'three';

import { createScene } from './core/scene.js';
import { createCamera } from './core/camera.js';
import { createRenderer } from './core/renderer.js';
import { createLighting } from './core/lighting.js';
import { createControls } from './core/controls.js';
import { createGround } from './core/ground.js';
import { loadEnvironment, applyEnvironmentIntensity } from './core/environment.js';
import { ModelLoader } from './loaders/ModelLoader.js';
import { TextureManager } from './loaders/TextureManager.js';
import { UIManager } from './ui/UIManager.js';

/** Longest frame step the animation will honour, in seconds. */
const MAX_FRAME_DELTA = 0.1;

/**
 * Top-level application object. It composes the rendering core, the loaders
 * and the UI, owns the animation loop, and implements the viewer actions the
 * UI delegates to it. This is the only place that knows about all the pieces.
 */
export class Viewer {
  /**
   * @param {HTMLElement} container Element the canvas is appended to.
   * @param {import('./config.js').CONFIG} config
   */
  constructor(container, config) {
    this.container = container;
    this.config = config;

    this.#initCore();
    this.#initModules();

    this.backgroundIndex = 0;
    this.frameId = null;
    this.autoRotate = config.autoRotate.enabled;
  }

  /** Create scene, camera, renderer, lighting, ground and controls. */
  #initCore() {
    const { clientWidth: w, clientHeight: h } = this.container;

    this.scene = createScene(this.config);
    this.camera = createCamera(this.config, w / h);
    this.renderer = createRenderer(this.config);
    this.renderer.setSize(w, h);
    this.container.appendChild(this.renderer.domElement);

    createLighting(this.scene, this.config);
    this.controls = createControls(this.camera, this.renderer.domElement, this.config);

    if (this.config.ground.enabled) {
      this.ground = createGround(this.config);
      this.scene.add(this.ground);
    }
  }

  /** Create loaders and UI, then wire UI actions to viewer methods. */
  #initModules() {
    // Sharpest possible textures at grazing angles — the value is a GPU limit,
    // so it has to be read from the live renderer rather than hard-coded.
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
      onToggleAutoRotate: () => this.toggleAutoRotate(),
      onScreenshot: () => this.takeScreenshot(),
      onToggleFullscreen: () => this.toggleFullscreen(),
      onImageFile: (file) => this.replaceTextureFromFile(file),
      onModelFile: (file) => this.loadModelFromFile(file),
    });
  }

  /* -------------------------------------------------------------------- */
  /* Lifecycle                                                            */
  /* -------------------------------------------------------------------- */

  /** Load default assets, start observers and the render loop. */
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
      // Clamp: a backgrounded tab pauses rAF, so the first frame back reports
      // the whole gap as one delta and the model would visibly jump.
      const delta = Math.min(clock.getDelta(), MAX_FRAME_DELTA);

      // Spin the model, not the camera: the HDRI stays put, so highlights and
      // reflections stay anchored to the environment while the cup turns.
      // Mouse-dragging orbits the camera instead, moving everything together.
      if (this.autoRotate && this.modelLoader.currentModel) {
        this.modelLoader.currentModel.rotation.y += this.config.autoRotate.speed * delta;
      }

      this.controls.update(delta);
      this.renderer.render(this.scene, this.camera);
    };
    tick();
  }

  /** Keep renderer and camera in sync with the container's real size. */
  #observeResize() {
    const onResize = () => {
      const { clientWidth: w, clientHeight: h } = this.container;
      if (w === 0 || h === 0) return;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    };
    this.resizeObserver = new ResizeObserver(onResize);
    this.resizeObserver.observe(this.container);
  }

  /** Recover gracefully if the browser drops the WebGL context. */
  #handleContextLoss() {
    const canvas = this.renderer.domElement;
    canvas.addEventListener('webglcontextlost', (event) => {
      event.preventDefault();
      if (this.frameId) cancelAnimationFrame(this.frameId);
      this.ui.showToast('WebGL context lost — attempting to recover…', 'error');
    });
    canvas.addEventListener('webglcontextrestored', () => {
      this.#startRenderLoop();
      this.ui.showToast('WebGL context restored');
    });
  }

  /* -------------------------------------------------------------------- */
  /* Loading                                                              */
  /* -------------------------------------------------------------------- */

  /** Load and pre-filter the HDRI. Failure is non-fatal: lights still work. */
  async loadHDRI() {
    this.ui.showLoader('Loading environment…');
    try {
      await this.loadEnvironmentMap();
    } catch (error) {
      console.error(error);
      this.ui.showToast('Failed to load HDRI — falling back to lights only', 'error');
    } finally {
      this.ui.hideLoader();
    }
  }

  /** @returns {Promise<THREE.Texture>} */
  loadEnvironmentMap() {
    return loadEnvironment(this.scene, this.renderer, this.config, (percent) =>
      this.ui.updateProgress(percent, 'Loading environment…'),
    );
  }

  /**
   * Load a model by URL, with UI progress and error feedback.
   * @param {string} url
   */
  async loadModel(url) {
    this.ui.showLoader('Loading model…');
    try {
      await this.modelLoader.load(url, (percent) => this.ui.updateProgress(percent));
      applyEnvironmentIntensity(
        this.modelLoader.currentModel,
        this.config.lighting.environmentIntensity,
      );
      this.#placeGround();
    } catch (error) {
      console.error(error);
      this.ui.showToast('Failed to load model', 'error');
    } finally {
      this.ui.hideLoader();
    }
  }

  /** Sit the shadow catcher exactly at the model's lowest point. */
  #placeGround() {
    if (!this.ground || !this.modelLoader.currentModel) return;
    const box = new THREE.Box3().setFromObject(this.modelLoader.currentModel);
    this.ground.position.y = box.min.y;
  }

  /** @param {File} file A dropped .glb/.gltf file. */
  async loadModelFromFile(file) {
    const url = URL.createObjectURL(file);
    try {
      await this.loadModel(url);
      await this.#loadDefaultTexture();
      this.ui.showToast(`Loaded model: ${file.name}`);
    } finally {
      URL.revokeObjectURL(url);
    }
  }

  /** Apply the configured default texture, ignoring absence silently. */
  async #loadDefaultTexture() {
    try {
      await this.textureManager.replaceTexture(this.config.assets.texture);
    } catch {
      /* No default texture — keep the model's original materials. */
    }
  }

  /** @param {File} file An image file (input or drag & drop). */
  async replaceTextureFromFile(file) {
    try {
      const texture = await this.textureManager.loadFromFile(file);
      const updated = this.textureManager.applyTexture(texture);
      this.ui.showToast(
        updated > 0 ? `Texture applied: ${file.name}` : 'No texturable material in this model',
        updated > 0 ? 'success' : 'error',
      );
    } catch (error) {
      console.error(error);
      this.ui.showToast('Failed to apply texture', 'error');
    }
  }

  /* -------------------------------------------------------------------- */
  /* Viewer actions                                                       */
  /* -------------------------------------------------------------------- */

  /**
   * Change the finish of the textured surface at runtime.
   * @param {{roughness?: number|null, metalness?: number|null}} finish
   * @returns {number} Number of materials updated.
   */
  setSurfaceFinish(finish) {
    return this.modelLoader.applySurfaceFinish({
      ...this.config.texturedSurface,
      ...finish,
    });
  }

  cycleBackground() {
    const { backgrounds } = this.config;
    this.backgroundIndex = (this.backgroundIndex + 1) % backgrounds.length;
    this.scene.background = new THREE.Color(backgrounds[this.backgroundIndex]);
  }

  toggleAutoRotate() {
    this.autoRotate = !this.autoRotate;
    this.ui.setToggleState('autorotate', this.autoRotate);
  }

  takeScreenshot() {
    this.renderer.render(this.scene, this.camera);
    const link = document.createElement('a');
    link.download = this.config.ui.screenshotName;
    link.href = this.renderer.domElement.toDataURL('image/png');
    link.click();
    this.ui.showToast('Screenshot saved');
  }

  toggleFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      this.container.requestFullscreen?.().catch(() => {
        this.ui.showToast('Fullscreen not available', 'error');
      });
    }
  }

  /** Release all GPU resources and observers. */
  dispose() {
    if (this.frameId) cancelAnimationFrame(this.frameId);
    this.resizeObserver?.disconnect();
    this.modelLoader.dispose();
    this.textureManager.dispose();
    this.scene.environment?.dispose();
    this.ground?.geometry.dispose();
    this.ground?.material.dispose();
    this.controls.dispose();
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }
}
