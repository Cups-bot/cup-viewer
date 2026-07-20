import * as THREE from 'three';

import { createScene } from './core/scene.js';
import { createCamera } from './core/camera.js';
import { createRenderer } from './core/renderer.js';
import { createLighting } from './core/lighting.js';
import { createControls } from './core/controls.js';
import { ModelLoader } from './loaders/ModelLoader.js';
import { TextureManager } from './loaders/TextureManager.js';
import { UIManager } from './ui/UIManager.js';
import { forEachMaterial } from './utils/helpers.js';

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
    this.wireframe = false;
    this.frameId = null;
  }

  /** Create scene, camera, renderer, lighting and controls. */
  #initCore() {
    const { clientWidth: w, clientHeight: h } = this.container;

    this.scene = createScene(this.config);
    this.camera = createCamera(this.config, w / h);
    this.renderer = createRenderer(this.config);
    this.renderer.setSize(w, h);
    this.container.appendChild(this.renderer.domElement);

    createLighting(this.scene, this.config);
    this.controls = createControls(this.camera, this.renderer.domElement, this.config);
  }

  /** Create loaders and UI, then wire UI actions to viewer methods. */
  #initModules() {
    this.modelLoader = new ModelLoader({
      scene: this.scene,
      camera: this.camera,
      controls: this.controls,
      config: this.config,
    });
    this.textureManager = new TextureManager({ modelLoader: this.modelLoader, config: this.config });
    this.ui = new UIManager(this.config);

    this.ui.bind({
      onResetCamera: () => this.resetCamera(),
      onChangeBackground: () => this.cycleBackground(),
      onToggleWireframe: () => this.toggleWireframe(),
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
    await this.loadModel(this.config.assets.model);
    await this.#loadDefaultTexture();
  }

  #startRenderLoop() {
    const clock = new THREE.Clock();
    const tick = () => {
      this.frameId = requestAnimationFrame(tick);
      this.controls.update(clock.getDelta());
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

  /**
   * Load a model by URL, with UI progress and error feedback.
   * @param {string} url
   */
  async loadModel(url) {
    this.ui.showLoader('Loading model…');
    try {
      await this.modelLoader.load(url, (percent) => this.ui.updateProgress(percent));
      this.applyWireframe(this.wireframe);
    } catch (error) {
      console.error(error);
      this.ui.showToast('Failed to load model', 'error');
    } finally {
      this.ui.hideLoader();
    }
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

  resetCamera() {
    const { position } = this.config.camera;
    // Restore the default view direction, then re-fit so any model frames well.
    this.controls.target.set(0, 0, 0);
    this.camera.position.set(position.x, position.y, position.z);
    if (this.modelLoader.currentModel) {
      this.modelLoader.frameCurrentModel();
    } else {
      this.controls.update();
    }
  }

  cycleBackground() {
    const { backgrounds } = this.config;
    this.backgroundIndex = (this.backgroundIndex + 1) % backgrounds.length;
    this.scene.background = new THREE.Color(backgrounds[this.backgroundIndex]);
  }

  toggleWireframe() {
    this.applyWireframe(!this.wireframe);
  }

  /** @param {boolean} enabled */
  applyWireframe(enabled) {
    this.wireframe = enabled;
    if (this.modelLoader.currentModel) {
      forEachMaterial(this.modelLoader.currentModel, (material) => {
        material.wireframe = enabled;
      });
    }
    this.ui.setToggleState('wireframe', enabled);
  }

  toggleAutoRotate() {
    this.controls.autoRotate = !this.controls.autoRotate;
    this.ui.setToggleState('autorotate', this.controls.autoRotate);
  }

  takeScreenshot() {
    this.renderer.render(this.scene, this.camera);
    const link = document.createElement('a');
    link.download = this.config.ui.screenshotName;
    link.href = this.renderer.domElement.toDataURL('image/png');
    link.click();
    this.ui.showToast('Screenshot saved 📸');
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
    this.controls.dispose();
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }
}
