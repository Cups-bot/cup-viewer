// Поворотный круг под моделью: эллипс в перспективе с бегунком-кружком.
// Заменяет обычный ползунок — тянешь кружок по кругу, вращается только стакан
// (свет и камера стоят на месте). Появляется при наведении на сцену или по
// кнопке в панели.
//
// Круг рисуется в SVG поверх холста по геометрии, которую отдаёт
// Viewer.getTurntableGeometry(): центр основания модели и два базисных вектора
// проекции пола. Точка под углом a — center + cos(a)·ex + sin(a)·ez.

const SVG_NS = 'http://www.w3.org/2000/svg';
// Точек на контуре: достаточно, чтобы кривая читалась гладкой при любом ракурсе.
const OUTLINE_STEPS = 72;
// Засечки по кругу — как деления на поворотном столе.
const TICKS = 24;

export class Turntable {
  constructor({ stage, viewer }) {
    this.stage = stage;
    this.viewer = viewer;

    this.visible = false;
    this.pinned = false; // включён кнопкой — не прячется по уходу курсора
    this.dragging = false;
    this.frameId = null;

    this.#build();
    this.#bind();
  }

  #build() {
    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('class', 'turntable');
    svg.setAttribute('aria-hidden', 'true');

    this.outline = document.createElementNS(SVG_NS, 'path');
    this.outline.setAttribute('class', 'turntable__ring');

    this.ticksGroup = document.createElementNS(SVG_NS, 'g');
    this.ticksGroup.setAttribute('class', 'turntable__ticks');
    this.ticks = Array.from({ length: TICKS }, () => {
      const dot = document.createElementNS(SVG_NS, 'circle');
      dot.setAttribute('r', '2');
      this.ticksGroup.appendChild(dot);
      return dot;
    });

    this.knob = document.createElementNS(SVG_NS, 'circle');
    this.knob.setAttribute('class', 'turntable__knob');
    this.knob.setAttribute('r', '13');

    svg.append(this.outline, this.ticksGroup, this.knob);
    this.svg = svg;
    this.stage.appendChild(svg);
  }

  #bind() {
    // Наведение на сцену показывает круг; уход прячет, если он не закреплён.
    this.stage.addEventListener('pointerenter', () => this.show());
    this.stage.addEventListener('pointerleave', () => {
      if (!this.pinned && !this.dragging) this.hide();
    });

    // Перетаскивание бегунка. pointer capture — чтобы курсор мог уходить за
    // пределы кружка и круг всё равно продолжал вращаться.
    this.knob.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      event.stopPropagation();
      this.dragging = true;
      this.knob.setPointerCapture(event.pointerId);
      this.svg.classList.add('is-dragging');
      // Пауза автоповорота, пока крутим вручную.
      this.viewer.setManualRotate(true);
      this.#rotateToPointer(event);
    });

    this.knob.addEventListener('pointermove', (event) => {
      if (this.dragging) this.#rotateToPointer(event);
    });

    const stop = (event) => {
      if (!this.dragging) return;
      this.dragging = false;
      this.knob.releasePointerCapture?.(event.pointerId);
      this.svg.classList.remove('is-dragging');
      this.viewer.setManualRotate(false);
      if (!this.pinned) this.hide();
    };
    this.knob.addEventListener('pointerup', stop);
    this.knob.addEventListener('pointercancel', stop);
  }

  // Переводит позицию курсора в угол поворота модели: раскладывает вектор от
  // центра круга по базису (ex, ez) и берёт атан отношения координат.
  #rotateToPointer(event) {
    const geometry = this.viewer.getTurntableGeometry();
    if (!geometry) return;

    const rect = this.svg.getBoundingClientRect();
    const px = event.clientX - rect.left - geometry.cx;
    const py = event.clientY - rect.top - geometry.cy;

    const { ex, ez } = geometry;
    const det = ex.x * ez.y - ez.x * ex.y;
    if (!det) return;
    const u = (px * ez.y - ez.x * py) / det;
    const v = (ex.x * py - px * ex.y) / det;

    this.viewer.rotateModelTo((Math.atan2(v, u) * 180) / Math.PI);
  }

  // Кнопка в панели: закрепляет круг на экране.
  togglePinned() {
    this.pinned = !this.pinned;
    if (this.pinned) this.show();
    else if (!this.dragging) this.hide();
    return this.pinned;
  }

  show() {
    if (this.visible) return;
    this.visible = true;
    this.svg.classList.add('is-visible');
    this.#startLoop();
  }

  hide() {
    if (!this.visible) return;
    this.visible = false;
    this.svg.classList.remove('is-visible');
    this.#stopLoop();
  }

  // Пока круг виден, он каждый кадр пересчитывается: модель крутится, камера
  // облетает — эллипс и бегунок должны следовать за ними.
  #startLoop() {
    if (this.frameId) return;
    const tick = () => {
      this.frameId = requestAnimationFrame(tick);
      this.#draw();
    };
    tick();
  }

  #stopLoop() {
    if (!this.frameId) return;
    cancelAnimationFrame(this.frameId);
    this.frameId = null;
  }

  #draw() {
    const geometry = this.viewer.getTurntableGeometry();
    if (!geometry) {
      this.svg.style.opacity = '0';
      return;
    }
    this.svg.style.opacity = '';

    const { cx, cy, ex, ez } = geometry;
    const pointAt = (angle) => ({
      x: cx + Math.cos(angle) * ex.x + Math.sin(angle) * ez.x,
      y: cy + Math.cos(angle) * ex.y + Math.sin(angle) * ez.y,
    });

    // Контур круга.
    let path = '';
    for (let i = 0; i < OUTLINE_STEPS; i++) {
      const p = pointAt((i / OUTLINE_STEPS) * Math.PI * 2);
      path += `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
    }
    this.outline.setAttribute('d', `${path}Z`);

    // Засечки.
    this.ticks.forEach((dot, i) => {
      const p = pointAt((i / TICKS) * Math.PI * 2);
      dot.setAttribute('cx', p.x.toFixed(1));
      dot.setAttribute('cy', p.y.toFixed(1));
    });

    // Бегунок стоит на том же угле, на который повёрнута модель.
    const knob = pointAt((this.viewer.getModelRotation() * Math.PI) / 180);
    this.knob.setAttribute('cx', knob.x.toFixed(1));
    this.knob.setAttribute('cy', knob.y.toFixed(1));
  }

  dispose() {
    this.#stopLoop();
    this.svg.remove();
  }
}
