// Вкладка «Развёртка»: то же изображение, что лежит на модели, показанное
// плоско — с приближением и перетаскиванием. Колесо мыши и щипок двумя пальцами
// масштабируют относительно курсора, двойной клик возвращает исходный вид.

const MIN_SCALE = 1;
const MAX_SCALE = 8;
const WHEEL_SENSITIVITY = 0.0016;

export class UnwrapView {
  constructor(root) {
    this.root = root;
    this.image = root.querySelector('.unwrap__image');
    this.hint = root.querySelector('.unwrap__hint');

    this.scale = 1;
    this.x = 0;
    this.y = 0;
    // Активные касания — по ним считается щипок.
    this.pointers = new Map();
    this.pinchDistance = 0;
    this.dragging = false;

    this.#bind();
    this.#apply();
  }

  // Показывает другой макет. Пустой src оставляет заглушку.
  setSource(src) {
    if (!src) return;
    this.image.src = src;
    this.image.alt = 'Развёртка дизайна';
    this.reset();
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

    // Пока картинка не загрузилась, размеров нет — сбрасываем после загрузки.
    this.image.addEventListener('load', () => this.reset());
    this.image.addEventListener('error', () => {
      if (this.hint) this.hint.textContent = 'Развёртка не загрузилась';
    });
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
    this.#apply();
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
    const next = Math.min(Math.max(this.scale * factor, MIN_SCALE), MAX_SCALE);
    if (next === this.scale) return;

    const rect = this.root.getBoundingClientRect();
    // Координаты точки относительно центра области.
    const px = cx - rect.left - rect.width / 2;
    const py = cy - rect.top - rect.height / 2;
    const ratio = next / this.scale;

    this.x = px - (px - this.x) * ratio;
    this.y = py - (py - this.y) * ratio;
    this.scale = next;
    this.#apply();
  }

  reset() {
    this.scale = 1;
    this.x = 0;
    this.y = 0;
    this.#apply();
  }

  #apply() {
    this.image.style.transform =
      `translate(${this.x.toFixed(1)}px, ${this.y.toFixed(1)}px) scale(${this.scale.toFixed(3)})`;
    // На исходном масштабе таскать нечего — курсор не обещает лишнего.
    this.root.classList.toggle('is-zoomed', this.scale > 1);
  }
}
