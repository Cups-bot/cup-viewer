// Владеет всеми взаимодействиями с DOM: панель управления, горячие клавиши,
// индикатор загрузки, всплывающие сообщения, drag & drop. О Three.js не знает —
// только переводит действия пользователя в вызовы привязанных обработчиков.

// Расширения файлов, считающиеся 3D-моделями при перетаскивании.
const MODEL_EXTENSIONS = ['.glb', '.gltf'];

// Горячие клавиши → имена действий обработчика.
const SHORTCUTS = {
  b: 'onChangeBackground',
  a: 'onToggleAutoRotate',
  s: 'onScreenshot',
  f: 'onToggleFullscreen',
};

export class UIManager {
  constructor(config) {
    this.config = config;
    this.dom = this.#queryElements();
    this.handlers = {};
    this.dragDepth = 0;
  }

  #queryElements() {
    const byId = (id) => {
      const el = document.getElementById(id);
      if (!el) throw new Error(`UIManager: нет элемента #${id}`);
      return el;
    };
    return {
      loader: byId('loader'),
      loaderText: byId('loader-text'),
      dropOverlay: byId('drop-overlay'),
      textureInput: byId('texture-input'),
      bgSwatches: byId('bg-swatches'),
      // Слайдера может не быть: на странице согласования поворотом управляет
      // круг под моделью (js/ui/turntable.js).
      rotateWrap: document.getElementById('rotate-wrap'),
      rotateSlider: document.getElementById('rotate-slider'),
      buttons: {
        background: byId('bg-btn'),
        autorotate: byId('autorotate-btn'),
        screenshot: byId('screenshot-btn'),
        fullscreen: byId('fullscreen-btn'),
        texture: byId('texture-btn'),
      },
    };
  }

  // Строит кружочки фонов из config.backgrounds. Клик по кружочку выбирает фон.
  #buildSwatches() {
    this.swatches = this.config.backgrounds.map((color, index) => {
      const swatch = document.createElement('button');
      swatch.type = 'button';
      swatch.className = 'swatch';
      swatch.style.background = color;
      swatch.setAttribute('role', 'menuitem');
      swatch.setAttribute('aria-label', `Фон ${color}`);
      swatch.addEventListener('click', () => this.#call('onSelectBackground', index));
      this.dom.bgSwatches.appendChild(swatch);
      return swatch;
    });
  }

  // Привязывает события DOM к обработчикам. Обработчики необязательны.
  bind(handlers) {
    this.handlers = handlers;
    const { buttons, textureInput, rotateWrap, rotateSlider } = this.dom;

    this.#buildSwatches();

    buttons.background.addEventListener('click', () => this.#call('onChangeBackground'));
    buttons.autorotate.addEventListener('click', () => this.#call('onToggleAutoRotate'));
    buttons.screenshot.addEventListener('click', () => this.#call('onScreenshot'));
    buttons.fullscreen.addEventListener('click', () => this.#call('onToggleFullscreen'));

    buttons.texture.addEventListener('click', () => textureInput.click());
    textureInput.addEventListener('change', (e) => this.#onFilePicked(e));

    // Слайдер поворота: пока курсор над панелькой — автоповорот на паузе, чтобы
    // не спорить с ручным вращением.
    if (rotateWrap && rotateSlider) {
      rotateWrap.addEventListener('mouseenter', () => this.#call('onManualRotateStart'));
      rotateWrap.addEventListener('mouseleave', () => this.#call('onManualRotateEnd'));
      rotateSlider.addEventListener('input', () =>
        this.#call('onManualRotate', Number(rotateSlider.value)),
      );
    }

    window.addEventListener('keydown', (e) => this.#onKeyDown(e));
    // Приём файлов выключается флагом ui.dragAndDrop в js/config.js.
    if (this.config.ui.dragAndDrop !== false) this.#bindDragAndDrop();
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
    event.target.value = ''; // чтобы можно было выбрать тот же файл повторно
  }

  #bindDragAndDrop() {
    // Enter/leave через счётчик глубины, чтобы вложенные элементы не мигали.
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
      this.showToast('Неподдерживаемый тип файла', 'error');
    }
  }

  #hideDropOverlay() {
    this.dragDepth = 0;
    this.dom.dropOverlay.hidden = true;
  }

  showLoader(text = 'Загрузка…') {
    this.dom.loaderText.textContent = text;
    this.dom.loader.hidden = false;
  }

  // percent: 0–100 или -1, если общий размер неизвестен.
  updateProgress(percent, label = 'Загрузка…') {
    this.dom.loaderText.textContent =
      percent >= 0 ? `${label} ${Math.round(percent)}%` : label;
  }

  hideLoader() {
    this.dom.loader.hidden = true;
  }

  showToast(message, type = 'success') {
    document.querySelector('.toast')?.remove();
    const toast = document.createElement('div');
    toast.className = type === 'error' ? 'toast toast--error' : 'toast';
    toast.setAttribute('role', 'status');
    toast.textContent = message;
    document.body.appendChild(toast);

    // Видимость держится классом, а не анимацией. Раньше сообщение жило только
    // внутри keyframes с fill-mode: forwards, и при «уменьшить движение»
    // (на телефонах это включено сплошь и рядом) анимация схлопывалась в
    // 0.01 мс — тост мгновенно долетал до финального кадра с opacity: 0 и
    // оставался невидимым.
    const duration = this.config.ui.toastDuration;
    setTimeout(() => toast.classList.add('is-leaving'), Math.max(duration - 300, 0));
    setTimeout(() => toast.remove(), duration);
  }

  // Отражает состояние переключателя на кнопке (вид + ARIA).
  setToggleState(name, active) {
    const button = this.dom.buttons[name];
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  }

  // Подсвечивает кружочек текущего фона.
  setActiveBackground(index) {
    this.swatches?.forEach((swatch, i) => {
      swatch.classList.toggle('is-active', i === index);
    });
  }

  // Ставит бегунок слайдера на текущий угол поворота (в градусах).
  setRotationSlider(degrees) {
    if (this.dom.rotateSlider) this.dom.rotateSlider.value = String(Math.round(degrees));
  }
}
