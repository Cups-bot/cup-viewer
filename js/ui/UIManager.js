// Владеет всеми взаимодействиями с DOM: панель управления, горячие клавиши,
// индикатор загрузки, всплывающие сообщения, drag & drop. О Three.js не знает —
// только переводит действия пользователя в вызовы привязанных обработчиков.

import { findCup } from '../data/models.js';
import { CupPicker } from './cupPicker.js';

// Расширения файлов, считающиеся 3D-моделями при перетаскивании.
const MODEL_EXTENSIONS = ['.glb', '.gltf'];

// Горячие клавиши → имена действий обработчика.
const SHORTCUTS = {
  b: 'onChangeBackground',
  a: 'onToggleAutoRotate',
  s: 'onScreenshot',
  f: 'onToggleFullscreen',
};

// Клавиши, которые UIManager отрабатывает сам, не беспокоя вьювер: меню
// выгрузки — это разметка страницы, сцена о нём ничего не знает.
//
// Клавиша открывает и закрывает меню, а не запускает запись: шесть секунд
// записи по случайно нажатой букве никому не нужны.
const LOCAL_SHORTCUTS = {
  v: 'toggleExportMenu',
};

// Поля ввода, внутри которых горячие клавиши обязаны молчать. Без этой проверки
// клиент, печатающий в форме правок «сдвинуть логотип», буквой «s» запускал
// скачивание скриншота, «f» — полный экран, «a» — остановку автоповорота.
const TEXT_ENTRY = new Set(['INPUT', 'TEXTAREA', 'SELECT', 'OPTION']);

function isTextEntry(target) {
  if (!target || target.nodeType !== 1) return false;
  return TEXT_ENTRY.has(target.tagName) || target.isContentEditable === true;
}

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
      // Выбор стакана. Необязателен, как и всё ниже: просмотрщик должен
      // подниматься и на странице, где этих элементов нет.
      cupBtn: document.getElementById('cup-btn'),
      cupDialog: document.getElementById('cup-dialog'),
      cupBackdrop: document.getElementById('cup-backdrop'),
      // Слайдера может не быть: на странице согласования поворотом управляет
      // круг под моделью (js/core/turntable.js).
      rotateWrap: document.getElementById('rotate-wrap'),
      rotateSlider: document.getElementById('rotate-slider'),
      // Выгрузка оборота. Тоже необязательна: просмотрщик должен подниматься и
      // на странице, где этой кнопки нет, — поэтому не byId, который бросает.
      exportBtn: document.getElementById('export-btn'),
      exportPopover: document.getElementById('export-popover'),
      exportPhotos: document.getElementById('export-photos'),
      exportStart: document.getElementById('export-start'),
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
  // Контейнер очищается: повторный bind() иначе удваивал бы ряд кружочков.
  #buildSwatches() {
    this.dom.bgSwatches.replaceChildren();
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

  // Кнопка «Выбрать стакан» и окно с карточками (js/ui/cupPicker.js).
  //
  // Выключается флагом ui.modelPicker в js/config.js: на клиентской странице
  // стакан задан заказом, и подменять его там незачем. Тогда кнопки нет, а
  // окно не строится вовсе — рисовать карточки некому и не для кого.
  #buildCupPicker() {
    const { cupBtn, cupDialog, cupBackdrop } = this.dom;
    if (!cupBtn) return;

    if (this.config.ui.modelPicker === false || !cupDialog) {
      cupBtn.hidden = true;
      return;
    }

    this.cupPicker = new CupPicker(cupDialog, {
      backdrop: cupBackdrop,
      onSelect: (id) => this.#call('onSelectCup', id),
      onToggle: (open) => {
        cupBtn.classList.toggle('is-active', open);
        cupBtn.setAttribute('aria-expanded', String(open));
      },
    });

    cupBtn.addEventListener('click', () => this.cupPicker.toggle(cupBtn));
  }

  // Отмечает стакан, который на самом деле стоит в сцене: подсветкой карточки
  // и подписью кнопки. Подпись важна: кнопка иконочная, и без неё текущую
  // модель было бы видно только внутри окна.
  //
  // id === null — модель не из каталога: её задали прямым путём в заказе или
  // перетащили файлом.
  setActiveCup(id) {
    this.cupPicker?.setActive(id);

    const button = this.dom.cupBtn;
    if (!button) return;
    const cup = id ? findCup(id) : null;
    button.dataset.tip = cup ? `Стакан: ${cup.label}` : 'Выбрать стакан';
  }

  // Привязывает события DOM к обработчикам. Обработчики необязательны.
  bind(handlers) {
    this.handlers = handlers;
    const { buttons, textureInput, rotateWrap, rotateSlider } = this.dom;

    this.#buildSwatches();
    this.#buildCupPicker();

    buttons.background.addEventListener('click', () => this.#call('onChangeBackground'));
    buttons.autorotate.addEventListener('click', () => this.#call('onToggleAutoRotate'));
    buttons.screenshot.addEventListener('click', () => this.#call('onScreenshot'));
    buttons.fullscreen.addEventListener('click', () => this.#call('onToggleFullscreen'));

    // Кнопка «Заменить дизайн». Прячется флагом ui.uploadButton в js/config.js
    // — по тому же соображению, по которому выключается приём перетаскиваемых
    // файлов: на клиентской странице подменять согласуемый макет нельзя.
    buttons.texture.hidden = this.config.ui.uploadButton === false;
    buttons.texture.addEventListener('click', () => textureInput.click());
    textureInput.addEventListener('change', (e) => this.#onFilePicked(e));

    this.#bindExportMenu();

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

  // Меню выгрузки оборота: кнопка раскрывает его, галочка добавляет к ролику
  // фотографии, «Записать» запускает выгрузку.
  //
  // Меню раскрывается вверх прямо из панели, без вычисления координат: оно
  // низкое и помещается в сцену целиком. Подсказке «как управлять» позицию
  // приходится считать в js/ui/approval.js только потому, что она высокая и
  // упирается в край сцены с overflow: hidden.
  #bindExportMenu() {
    const { exportBtn, exportPopover, exportPhotos, exportStart } = this.dom;
    if (!exportBtn || !exportPopover) return;

    // Всплытие намеренно не гасим: клик проходит дальше по документу, и
    // подсказка «как управлять» (у неё свой слушатель) успевает закрыться.
    // Своё же меню от этого клика не пострадает — слушатель ниже проверяет,
    // не по кнопке ли попали.
    exportBtn.addEventListener('click', () => this.toggleExportMenu());

    exportStart?.addEventListener('click', () => {
      this.toggleExportMenu(false);
      this.#call('onExportTurn', { photos: exportPhotos?.checked === true });
    });

    // Клик мимо меню и Escape закрывают его — как у подсказки «как управлять».
    //
    // Слушаем на погружении (третий аргумент true), а не на всплытии: кнопка
    // подсказки гасит всплытие у себя (js/ui/approval.js), и на всплытии этот
    // обработчик до клика по ней просто не доходил — подсказка раскрывалась
    // поверх меню, и на экране висели обе карточки разом.
    document.addEventListener(
      'click',
      (event) => {
        if (exportPopover.hidden) return;
        if (exportPopover.contains(event.target) || exportBtn.contains(event.target)) return;
        this.toggleExportMenu(false);
      },
      true,
    );
    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !exportPopover.hidden) this.toggleExportMenu(false);
    });
  }

  // open: true — открыть, false — закрыть, не задан — переключить.
  toggleExportMenu(open) {
    const { exportBtn, exportPopover } = this.dom;
    if (!exportBtn || !exportPopover) return;
    // Пока идёт запись, открывать меню незачем: кнопка в нём всё равно
    // заблокирована.
    if (exportBtn.disabled) return;

    const next = open ?? exportPopover.hidden;
    exportPopover.hidden = !next;
    exportBtn.classList.toggle('is-active', next);
    exportBtn.setAttribute('aria-expanded', String(next));
  }

  // Запись идёт — кнопки выгрузки не должны принимать новые нажатия: вторая
  // запись поверх первой сбила бы угол модели у обеих.
  setExportBusy(busy) {
    const { exportBtn, exportStart } = this.dom;
    if (busy) this.toggleExportMenu(false);
    if (exportBtn) exportBtn.disabled = busy;
    if (exportStart) exportStart.disabled = busy;
  }

  #call(action, ...args) {
    this.handlers[action]?.(...args);
  }

  #onKeyDown(event) {
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    // Пока фокус в поле ввода, клавиши принадлежат тексту, а не сцене.
    if (isTextEntry(event.target)) return;
    // Составляемый символ (китайский/японский ввод, некоторые Android-клавиатуры)
    // приходит отдельным событием — оно не про управление сценой.
    if (event.isComposing || event.keyCode === 229) return;

    const key = event.key.toLowerCase();

    const local = LOCAL_SHORTCUTS[key];
    if (local) {
      this[local]();
      return;
    }

    const action = SHORTCUTS[key];
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
