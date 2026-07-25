import * as THREE from 'three';

// Поворотный круг под моделью — объект сцены, а не оверлей. Живёт в 3D именно
// ради перекрытия: дальняя дуга уходит за стакан по буферу глубины, как
// настоящее кольцо на столе. Плоский SVG поверх холста так не умеет.
//
// Радиус меряется один раз на модель (см. Viewer.measureTurntable) — иначе
// axis-aligned bounding box вращающегося стакана «дышал» бы, и круг пульсировал.
//
// Бегунок стоит на том же угле, на который повёрнута модель; перетаскивание
// пересекает луч курсора с полом и переводит точку обратно в угол.

const TICKS = 24;
const RING_SEGMENTS = 128;

// Цвета совпадают с макетом страницы согласования.
const INK = 0x1c1c1e;
const BRAND = 0xe8290c;

class Turntable {
  constructor({ scene, camera, controls, domElement, config, onRotate, onDragStart, onDragEnd }) {
    this.camera = camera;
    this.controls = controls;
    this.domElement = domElement;
    this.options = config.turntable;
    this.onRotate = onRotate;
    this.onDragStart = onDragStart;
    this.onDragEnd = onDragEnd;

    this.metrics = null;
    this.visible = false;
    this.pinned = false;
    this.dragging = false;
    // Плавное появление: 0 — скрыт, 1 — виден.
    this.fade = 0;

    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();
    this.floor = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    this.hit = new THREE.Vector3();

    this.group = new THREE.Group();
    this.group.name = 'Turntable';
    this.group.visible = false;
    // Круг — часть интерфейса, а не сцены: в тень он попадать не должен.
    this.group.userData.excludeFromShadow = true;

    this.#build();
    scene.add(this.group);
    this.#bind();
  }

  #build() {
    this.materials = {
      ring: this.#material(INK, 0.18),
      ticks: this.#material(INK, 0.3),
      knob: this.#material(BRAND, 1),
      knobRing: this.#material(0xffffff, 1),
    };

    // Единичные размеры: реальный масштаб задаётся group.scale по радиусу.
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1, 0.006, 6, RING_SEGMENTS).rotateX(Math.PI / 2),
      this.materials.ring,
    );
    this.group.add(ring);

    // Засечки — один InstancedMesh вместо два десятка мешей.
    const dots = new THREE.InstancedMesh(
      new THREE.SphereGeometry(0.018, 8, 6),
      this.materials.ticks,
      TICKS,
    );
    const matrix = new THREE.Matrix4();
    for (let i = 0; i < TICKS; i++) {
      const angle = (i / TICKS) * Math.PI * 2;
      matrix.setPosition(Math.cos(angle), 0, Math.sin(angle));
      dots.setMatrixAt(i, matrix);
    }
    dots.instanceMatrix.needsUpdate = true;
    this.group.add(dots);

    // Бегунок: белая подложка и красный кружок поверх. Диски развёрнуты к
    // камере (см. update) — иначе лёжа на полу они читались бы как сплюснутые
    // эллипсы, а не как кружок из макета.
    this.knob = new THREE.Group();
    const base = new THREE.Mesh(new THREE.CircleGeometry(0.085, 32), this.materials.knobRing);
    const cap = new THREE.Mesh(new THREE.CircleGeometry(0.062, 32), this.materials.knob);
    cap.position.z = 0.001;
    this.knob.add(base, cap);
    this.group.add(this.knob);

    // Мишень для луча — заметно крупнее видимого кружка, чтобы попадать пальцем.
    this.knobTarget = new THREE.Mesh(
      new THREE.SphereGeometry(0.16, 8, 6),
      new THREE.MeshBasicMaterial({ visible: false }),
    );
    this.knob.add(this.knobTarget);
  }

  #material(color, opacity) {
    return new THREE.MeshBasicMaterial({
      color,
      opacity,
      transparent: true,
      // Цвета интерфейса не должны уезжать в тонмаппинге сцены.
      toneMapped: false,
    });
  }

  // Радиус и высота основания приходят от Viewer один раз на модель.
  setMetrics(metrics) {
    this.metrics = metrics;
    if (!metrics) {
      this.group.visible = false;
      return;
    }
    const { center, baseY, radius } = metrics;
    // Небольшой подъём над полом, чтобы не спорить с плоскостью тени.
    this.group.position.set(center.x, baseY + radius * this.options.lift, center.z);
    this.group.scale.setScalar(radius);
    this.floor.constant = -this.group.position.y;
  }

  #bind() {
    const el = this.domElement;
    el.addEventListener('pointerdown', (e) => this.#onPointerDown(e));
    el.addEventListener('pointermove', (e) => this.#onPointerMove(e));
    el.addEventListener('pointerup', (e) => this.#onPointerUp(e));
    el.addEventListener('pointercancel', (e) => this.#onPointerUp(e));
  }

  #updatePointer(event) {
    const rect = this.domElement.getBoundingClientRect();
    this.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    this.raycaster.setFromCamera(this.pointer, this.camera);
  }

  #hitsKnob(event) {
    if (!this.visible || !this.metrics) return false;
    this.#updatePointer(event);
    return this.raycaster.intersectObject(this.knobTarget, false).length > 0;
  }

  #onPointerDown(event) {
    if (!this.#hitsKnob(event)) return;
    event.preventDefault();
    this.dragging = true;
    this.domElement.setPointerCapture?.(event.pointerId);
    // Пока тянем бегунок, орбита камеры не должна перехватывать тот же жест.
    this.controls.enabled = false;
    this.onDragStart?.();
    this.#rotateToPointer(event);
  }

  #onPointerMove(event) {
    if (this.dragging) {
      this.#rotateToPointer(event);
      return;
    }
    // Курсор-«рука» подсказывает, что за кружок можно взяться.
    if (this.visible) {
      this.domElement.style.cursor = this.#hitsKnob(event) ? 'grab' : '';
    }
  }

  #onPointerUp(event) {
    if (!this.dragging) return;
    this.dragging = false;
    this.domElement.releasePointerCapture?.(event.pointerId);
    this.controls.enabled = true;
    this.domElement.style.cursor = '';
    this.onDragEnd?.();
    if (!this.pinned) this.hide();
  }

  // Луч курсора × плоскость пола → точка → угол вокруг центра круга.
  #rotateToPointer(event) {
    if (!this.metrics) return;
    this.#updatePointer(event);
    if (!this.raycaster.ray.intersectPlane(this.floor, this.hit)) return;

    const dx = this.hit.x - this.group.position.x;
    const dz = this.hit.z - this.group.position.z;
    this.onRotate?.((Math.atan2(dz, dx) * 180) / Math.PI);
  }

  togglePinned() {
    this.pinned = !this.pinned;
    if (this.pinned) this.show();
    else if (!this.dragging) this.hide();
    return this.pinned;
  }

  show() {
    this.visible = true;
  }

  hide() {
    if (this.dragging || this.pinned) return;
    this.visible = false;
    this.domElement.style.cursor = '';
  }

  // Вызывается каждый кадр: бегунок следует за углом модели, круг плавно
  // появляется и исчезает.
  update(rotationDegrees, delta = 0.016) {
    const target = this.visible ? 1 : 0;
    if (this.fade !== target) {
      const step = delta / 0.2; // ~200 мс на переход
      this.fade = target > this.fade
        ? Math.min(this.fade + step, 1)
        : Math.max(this.fade - step, 0);

      const { ring, ticks, knob, knobRing } = this.materials;
      ring.opacity = 0.18 * this.fade;
      ticks.opacity = 0.3 * this.fade;
      knob.opacity = this.fade;
      knobRing.opacity = this.fade;
    }

    this.group.visible = this.fade > 0.001 && !!this.metrics;
    if (!this.group.visible) return;

    const angle = (rotationDegrees * Math.PI) / 180;
    this.knob.position.set(Math.cos(angle), 0, Math.sin(angle));
    // Билборд: кружок всегда развёрнут к камере и остаётся круглым при любом
    // ракурсе. Масштаб группы неравномерным не бывает, поэтому хватает копии
    // поворота камеры.
    this.knob.quaternion.copy(this.camera.quaternion);
  }

  dispose() {
    this.group.traverse((node) => {
      if (node.geometry) node.geometry.dispose();
    });
    for (const material of Object.values(this.materials)) material.dispose();
    this.knobTarget.material.dispose();
    this.group.removeFromParent();
  }
}

export function createTurntable(params) {
  return new Turntable(params);
}
