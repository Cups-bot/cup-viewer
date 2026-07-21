/**
 * Owns every DOM interaction: the control panel, keyboard shortcuts,
 * loader, toasts and drag & drop. It knows nothing about Three.js — it only
 * translates user intent into calls on the handler object it is bound to,
 * keeping presentation cleanly separated from viewer logic.
 */

/** File extensions treated as 3D models on drag & drop. */
const MODEL_EXTENSIONS = ['.glb', '.gltf'];

/** Keyboard shortcuts → handler action names. */
const SHORTCUTS = {
  b: 'onChangeBackground',
  a: 'onToggleAutoRotate',
  s: 'onScreenshot',
  f: 'onToggleFullscreen',
};

export class UIManager {
  /** @param {import('../config.js').CONFIG} config */
  constructor(config) {
    this.config = config;
    this.dom = this.#queryElements();
    /** @type {Partial<Record<string, Function>>} */
    this.handlers = {};
    this.dragDepth = 0;
  }

  #queryElements() {
    const byId = (id) => {
      const el = document.getElementById(id);
      if (!el) throw new Error(`UIManager: missing element #${id}`);
      return el;
    };
    return {
      loader: byId('loader'),
      loaderText: byId('loader-text'),
      dropOverlay: byId('drop-overlay'),
      textureInput: byId('texture-input'),
      buttons: {
        background: byId('bg-btn'),
        autorotate: byId('autorotate-btn'),
        screenshot: byId('screenshot-btn'),
        fullscreen: byId('fullscreen-btn'),
        texture: byId('texture-btn'),
      },
    };
  }

  /**
   * Wire DOM events to the given handlers. Handlers are optional; only the
   * provided ones are invoked.
   * @param {object} handlers
   */
  bind(handlers) {
    this.handlers = handlers;
    const { buttons, textureInput } = this.dom;

    buttons.background.addEventListener('click', () => this.#call('onChangeBackground'));
    buttons.autorotate.addEventListener('click', () => this.#call('onToggleAutoRotate'));
    buttons.screenshot.addEventListener('click', () => this.#call('onScreenshot'));
    buttons.fullscreen.addEventListener('click', () => this.#call('onToggleFullscreen'));

    buttons.texture.addEventListener('click', () => textureInput.click());
    textureInput.addEventListener('change', (e) => this.#onFilePicked(e));

    window.addEventListener('keydown', (e) => this.#onKeyDown(e));
    this.#bindDragAndDrop();
  }

  #call(action, ...args) {
    this.handlers[action]?.(...args);
  }

  #onKeyDown(event) {
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    const action = SHORTCUTS[event.key.toLowerCase()];
    if (action) this.#call(action);
  }

  #onFilePicked(event) {
    const file = event.target.files?.[0];
    if (file) this.#call('onImageFile', file);
    event.target.value = ''; // allow re-selecting the same file
  }

  /* -------------------------------------------------------------------- */
  /* Drag & drop                                                          */
  /* -------------------------------------------------------------------- */

  #bindDragAndDrop() {
    // Enter/leave use a depth counter so nested elements don't flicker.
    window.addEventListener('dragenter', (e) => {
      e.preventDefault();
      if (++this.dragDepth === 1) this.dom.dropOverlay.hidden = false;
    });
    window.addEventListener('dragover', (e) => e.preventDefault());
    window.addEventListener('dragleave', (e) => {
      e.preventDefault();
      if (--this.dragDepth <= 0) this.#hideDropOverlay();
    });
    window.addEventListener('drop', (e) => this.#onDrop(e));
  }

  #onDrop(event) {
    event.preventDefault();
    this.#hideDropOverlay();

    const file = event.dataTransfer?.files?.[0];
    if (!file) return;

    const name = file.name.toLowerCase();
    if (MODEL_EXTENSIONS.some((ext) => name.endsWith(ext))) {
      this.#call('onModelFile', file);
    } else if (file.type.startsWith('image/')) {
      this.#call('onImageFile', file);
    } else {
      this.showToast('Unsupported file type', 'error');
    }
  }

  #hideDropOverlay() {
    this.dragDepth = 0;
    this.dom.dropOverlay.hidden = true;
  }

  /* -------------------------------------------------------------------- */
  /* Feedback: loader, toasts, button state                              */
  /* -------------------------------------------------------------------- */

  showLoader(text = 'Loading…') {
    this.dom.loaderText.textContent = text;
    this.dom.loader.hidden = false;
  }

  /**
   * @param {number} percent 0–100, or -1 when total is unknown.
   * @param {string} [label='Loading…'] Prefix shown before the percentage.
   */
  updateProgress(percent, label = 'Loading…') {
    this.dom.loaderText.textContent =
      percent >= 0 ? `${label} ${Math.round(percent)}%` : label;
  }

  hideLoader() {
    this.dom.loader.hidden = true;
  }

  /**
   * @param {string} message
   * @param {'success' | 'error'} [type='success']
   */
  showToast(message, type = 'success') {
    document.querySelector('.toast')?.remove();
    const toast = document.createElement('div');
    toast.className = type === 'error' ? 'toast toast--error' : 'toast';
    toast.setAttribute('role', 'status');
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), this.config.ui.toastDuration);
  }

  /**
   * Reflect a toggle's state on its button (visual + ARIA).
   * @param {'autorotate'} name
   * @param {boolean} active
   */
  setToggleState(name, active) {
    const button = this.dom.buttons[name];
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  }
}
