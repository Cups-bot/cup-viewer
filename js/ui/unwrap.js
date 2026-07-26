// Вкладка «Развёртка»: то же изображение, что лежит на модели, показанное
// плоско — с приближением и перетаскиванием. Колесо мыши и щипок двумя пальцами
// масштабируют относительно курсора, двойной клик возвращает исходный вид.
//
// Рисуем в <canvas> и перерисовываем на каждом шаге зума. Раньше здесь был <img>
// с transform: scale() — браузер растягивал уже готовый растр (в Safari и на
// телефонах он ещё и растрирован под масштаб 1), и «приближение» показывало не
// детали макета, а увеличенные пиксели экрана. Canvas каждый раз рисует из
// исходного файла и в физических пикселях устройства: резкость упирается только
// в разрешение самого макета.

const MIN_ZOOM = 1;
// Дальше 1:1 пикселей макета смотреть нечего — там уже не детали, а мыло.
// Немного за единицу пускаем: разглядеть контур буквы это помогает.
const NATIVE_HEADROOM = 1.5;
// У мелкого макета 1:1 наступает почти сразу, но совсем без зума неудобно.
const MIN_MAX_ZOOM = 2;
const MAX_ZOOM = 40;
const WHEEL_SENSITIVITY = 0.0016;
// Доля области, в которую вписывается макет на исходном виде.
const FIT_WIDTH = 0.82;
const FIT_HEIGHT = 0.78;
const PAPER_RADIUS = 4;
// Ниже этой ширины предупреждаем: мелкий текст на такой развёртке не проверить.
const LOW_RES_WIDTH = 1500;

export class UnwrapView {
  constructor(root) {
    this.root = root;
    this.canvas = root.querySelector('.unwrap__canvas');
    this.ctx = this.canvas?.getContext('2d') ?? null;
    this.hint = root.querySelector('.unwrap__hint');
    this.meta = root.querySelector('.unwrap__meta');
    // Подсказку про жесты пишет разметка — запоминаем, чтобы вернуть её после
    // сообщения об ошибке.
    this.hintText = this.hint?.textContent ?? '';

    this.image = null;
    this.zoom = 1;
    // Сдвиг макета относительно вписанного положения, в CSS-пикселях.
    this.x = 0;
    this.y = 0;

    this.width = 0;
    this.height = 0;
    this.dpr = 0;
    // CSS-пикселей на пиксель макета на исходном виде.
    this.fitScale = 1;

    // Активные касания — по ним считается щипок.
    this.pointers = new Map();
    this.pinchDistance = 0;
    this.dragging = false;

    this.#bind();
    this.#measure();
    this.#render();
  }

  // Показывает другой макет. Пустой src оставляет то, что уже показано.
  setSource(src) {
    if (!src) return;

    // crossOrigin не ставим: пиксели обратно не читаем, «грязный» канвас нам не
    // мешает, а лишний заголовок сломал бы загрузку с хранилища без CORS.
    const image = new Image();
    image.decoding = 'async';
    image.addEventListener('load', () => {
      this.image = image;
      if (this.hint) this.hint.textContent = this.hintText;
      this.reset();
    });
    image.addEventListener('error', () => {
      if (this.hint) this.hint.textContent = 'Развёртка не загрузилась';
    });
    image.src = src;
  }

  #bind() {
    const el = this.root;

    el.addEventListener('wheel', (e) => this.#onWheel(e), { passive: false });
    el.addEventListener('pointerdown', (e) => this.#onPointerDown(e));
    el.addEventListener('pointermove', (e) => this.#onPointerMove(e));
    const up = (e) => this.#onPointerUp(e);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
    el.addEventListener('dblclick', () => this.reset());

    // Пока вкладка скрыта, у области нет размеров: считаем их, когда она
    // появится и когда меняется окно.
    if (typeof ResizeObserver === 'function') {
      this.observer = new ResizeObserver(() => this.#resize());
      this.observer.observe(el);
    }
    // Переезд окна на экран с другой плотностью пикселей ResizeObserver
    // не заметит: размеры в CSS-пикселях те же, а растр нужен другой.
    window.addEventListener('resize', () => this.#resize());
  }

  #onWheel(event) {
    event.preventDefault();
    // Масштабируем к точке под курсором, а не к центру.
    this.#zoomAt(event.clientX, event.clientY, Math.exp(-event.deltaY * WHEEL_SENSITIVITY));
  }

  #onPointerDown(event) {
    this.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    this.root.setPointerCapture?.(event.pointerId);

    if (this.pointers.size === 2) {
      this.pinchDistance = this.#pointerDistance();
      this.dragging = false;
      return;
    }
    this.dragging = true;
    this.root.classList.add('is-dragging');
  }

  #onPointerMove(event) {
    const previous = this.pointers.get(event.pointerId);
    if (!previous) return;
    this.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

    // Щипок: меняем масштаб по изменению расстояния между пальцами.
    if (this.pointers.size === 2) {
      const distance = this.#pointerDistance();
      if (this.pinchDistance > 0 && distance > 0) {
        const [a, b] = [...this.pointers.values()];
        this.#zoomAt((a.x + b.x) / 2, (a.y + b.y) / 2, distance / this.pinchDistance);
      }
      this.pinchDistance = distance;
      return;
    }

    if (!this.dragging) return;
    this.x += event.clientX - previous.x;
    this.y += event.clientY - previous.y;
    this.#clamp();
    this.#render();
  }

  #onPointerUp(event) {
    this.pointers.delete(event.pointerId);
    this.root.releasePointerCapture?.(event.pointerId);
    if (this.pointers.size < 2) this.pinchDistance = 0;
    if (this.pointers.size === 0) {
      this.dragging = false;
      this.root.classList.remove('is-dragging');
    }
  }

  #pointerDistance() {
    const [a, b] = [...this.pointers.values()];
    return Math.hypot(a.x - b.x, a.y - b.y);
  }

  // Масштабирование с сохранением точки (cx, cy) на месте.
  #zoomAt(cx, cy, factor) {
    const next = Math.min(Math.max(this.zoom * factor, MIN_ZOOM), this.#maxZoom());
    if (next === this.zoom) return;

    const rect = this.root.getBoundingClientRect();
    // Координаты точки относительно центра области.
    const px = cx - rect.left - rect.width / 2;
    const py = cy - rect.top - rect.height / 2;
    const ratio = next / this.zoom;

    this.x = px - (px - this.x) * ratio;
    this.y = py - (py - this.y) * ratio;
    this.zoom = next;
    this.#clamp();
    this.#render();
  }

  reset() {
    this.zoom = 1;
    this.x = 0;
    this.y = 0;
    this.#measure();
    this.#render();
  }

  // Пересчёт после изменения размеров области или плотности экрана.
  #resize() {
    if (!this.#measure()) return;
    this.#clamp();
    this.#render();
  }

  // Размеры области и растра. Возвращает false, если показывать некуда
  // (вкладка скрыта — тогда пересчёт придёт от ResizeObserver).
  #measure() {
    const width = this.root.clientWidth;
    const height = this.root.clientHeight;
    const dpr = window.devicePixelRatio || 1;
    if (!width || !height || !this.canvas) return false;

    this.width = width;
    this.height = height;
    this.dpr = dpr;

    // Растр канваса — в физических пикселях: иначе мыло на любом retina-экране.
    const pixelWidth = Math.round(width * dpr);
    const pixelHeight = Math.round(height * dpr);
    if (this.canvas.width !== pixelWidth || this.canvas.height !== pixelHeight) {
      this.canvas.width = pixelWidth;
      this.canvas.height = pixelHeight;
    }

    if (this.image) {
      this.fitScale = Math.min(
        (width * FIT_WIDTH) / this.image.naturalWidth,
        (height * FIT_HEIGHT) / this.image.naturalHeight,
      );
    }
    return true;
  }

  // Зум, при котором пиксель макета равен пикселю экрана.
  #nativeZoom() {
    if (!this.image || !this.fitScale) return 1;
    return 1 / (this.fitScale * this.dpr);
  }

  #maxZoom() {
    if (!this.image) return MIN_MAX_ZOOM;
    return Math.min(Math.max(this.#nativeZoom() * NATIVE_HEADROOM, MIN_MAX_ZOOM), MAX_ZOOM);
  }

  // Не даём утащить макет за пределы области: то, что не влезает, ездит,
  // остальное стоит по центру.
  #clamp() {
    if (!this.image) return;
    const scale = this.fitScale * this.zoom;
    const limitX = Math.max((this.image.naturalWidth * scale - this.width) / 2, 0);
    const limitY = Math.max((this.image.naturalHeight * scale - this.height) / 2, 0);
    this.x = Math.min(Math.max(this.x, -limitX), limitX);
    this.y = Math.min(Math.max(this.y, -limitY), limitY);
  }

  #render() {
    const ctx = this.ctx;
    if (!ctx) return;
    if (!this.width || !this.height) {
      // Размеров ещё нет — рисовать нечего, вернёмся по ResizeObserver.
      this.#updateMeta();
      return;
    }

    // Дальше считаем в CSS-пикселях, растягивание до физических берёт на себя
    // матрица преобразования.
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    ctx.clearRect(0, 0, this.width, this.height);
    this.#updateMeta();
    // На исходном масштабе таскать нечего — курсор не обещает лишнего.
    this.root.classList.toggle('is-zoomed', this.zoom > 1);
    if (!this.image) return;

    const scale = this.fitScale * this.zoom;
    const w = this.image.naturalWidth * scale;
    const h = this.image.naturalHeight * scale;
    const x = (this.width - w) / 2 + this.x;
    const y = (this.height - h) / 2 + this.y;

    // Лист под макетом: он же виден по краям, если пропорции не совпали.
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.12)';
    ctx.shadowBlur = 30;
    ctx.shadowOffsetY = 10;
    ctx.fillStyle = '#fff';
    this.#paperPath(ctx, x, y, w, h);
    ctx.fill();
    ctx.restore();

    ctx.save();
    this.#paperPath(ctx, x, y, w, h);
    ctx.clip();
    // Крупный макет ужимается ступенчато самим браузером — качество заметно
    // выше, чем у ближайшего соседа.
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(this.image, x, y, w, h);
    ctx.restore();
  }

  #paperPath(ctx, x, y, w, h) {
    const radius = Math.min(PAPER_RADIUS, w / 2, h / 2);
    ctx.beginPath();
    if (typeof ctx.roundRect === 'function') {
      ctx.roundRect(x, y, w, h, radius);
    } else {
      ctx.rect(x, y, w, h);
    }
  }

  // Строка под макетом: размер файла и текущий масштаб относительно 1:1.
  // Заодно честно говорит, когда разрешения макета не хватает для проверки.
  #updateMeta() {
    if (!this.meta) return;
    if (!this.image) {
      this.meta.textContent = '';
      return;
    }

    const { naturalWidth: iw, naturalHeight: ih } = this.image;
    const percent = Math.round((this.zoom / this.#nativeZoom()) * 100);

    if (iw < LOW_RES_WIDTH) {
      parts.push('для проверки мелкого текста нужен файл от 2000 px по ширине');
    }

    this.root.classList.toggle('is-lowres', iw < LOW_RES_WIDTH);
  }
}

const HINT_TEXT = 'Колесо мыши — приблизить, перетаскивание — сдвинуть, двойной клик — исходный вид';
