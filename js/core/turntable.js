import * as THREE from 'three';
import { HELPER_LAYER } from './layers.js';

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

// Цвета совпадают с макетом страницы согласования. На тёмном фоне тёмный круг
// пропадает, поэтому держим вторую, светлую пару (см. setBackground).
const INK = 0x1c1c1e;
const PAPER = 0xffffff;
const BRAND = 0xe8290c;

// Насколько прозрачны контур и засечки на светлом и на тёмном фоне.
const THEMES = {
  light: { color: INK, ring: 0.18, ticks: 0.3 },
  dark: { color: PAPER, ring: 0.32, ticks: 0.55 },
};

// Доворот до точки — за это время (сек).
const SNAP_DURATION = 0.45;

// Перевод между углом поворота модели и углом точки на кольце — и обратно.
//
// Поворот вокруг +Y на угол θ переводит точку (1, 0, 0) в (cos θ, 0, −sin θ):
// бок стакана уезжает в сторону −Z. А точка на кольце с углом φ лежит в
// (cos φ, 0, +sin φ). То есть у одного и того же угла знаки противоположны, и
// бегунок, поставленный «в лоб» на угол модели, ехал по кругу навстречу самому
// стакану. Отсюда минус: угол на кольце — это минус угол поворота модели.
//
// Обе функции — одна и та же операция, но названы по направлению перевода:
// у вызова должно быть видно, что во что переводится.
const toRingAngle = (modelDegrees) => -modelDegrees;
const toModelAngle = (ringDegrees) => -ringDegrees;

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
    // Круг убран на время выгрузки оборота (см. setHiddenForCapture).
    this.capturing = false;
    // Плавное появление: 0 — скрыт, 1 — виден.
    this.fade = 0;
    this.theme = THEMES.light;
    // Доворот до нажатой засечки: { from, to, time } в градусах и секундах.
    this.snap = null;

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

    // Круг — интерфейс, а не предмет: он не должен участвовать в расчёте
    // затенения складок (см. core/layers.js). Луч курсора по умолчанию видит
    // только нулевой слой, поэтому ему этот слой включаем отдельно — иначе по
    // бегунку и засечкам перестанет попадать мышь.
    this.group.traverse((node) => node.layers.set(HELPER_LAYER));
    this.raycaster.layers.enable(HELPER_LAYER);

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

    // Засечки — один InstancedMesh вместо двух десятков мешей. Рядом — второй,
    // невидимый и заметно крупнее: по видимой точке в 2 мм не попасть ни мышью,
    // ни пальцем, а луч ловит именно его.
    const tickMatrices = [];
    const matrix = new THREE.Matrix4();
    for (let i = 0; i < TICKS; i++) {
      const angle = (i / TICKS) * Math.PI * 2;
      matrix.setPosition(Math.cos(angle), 0, Math.sin(angle));
      tickMatrices.push(matrix.clone());
    }

    const fill = (mesh) => {
      tickMatrices.forEach((m, i) => mesh.setMatrixAt(i, m));
      mesh.instanceMatrix.needsUpdate = true;
      this.group.add(mesh);
      return mesh;
    };

    this.dots = fill(
      new THREE.InstancedMesh(new THREE.SphereGeometry(0.018, 8, 6), this.materials.ticks, TICKS),
    );
    this.tickTargets = fill(
      new THREE.InstancedMesh(
        new THREE.SphereGeometry(0.075, 6, 4),
        new THREE.MeshBasicMaterial({ visible: false }),
        TICKS,
      ),
    );

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

  // Подстраивает круг под фон сцены: на тёмном тёмный контур не виден.
  // Порог — по воспринимаемой яркости фона.
  setBackground(color) {
    const luminance = 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;
    this.theme = luminance < 0.4 ? THEMES.dark : THEMES.light;
    this.materials.ring.color.setHex(this.theme.color);
    this.materials.ticks.color.setHex(this.theme.color);
    // Прозрачность пересчитается в ближайшем update по текущему fade.
    this.#applyFade();
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

  // Индекс засечки под курсором или null.
  #hitTick(event) {
    if (!this.visible || !this.metrics) return null;
    this.#updatePointer(event);
    const [hit] = this.raycaster.intersectObject(this.tickTargets, false);
    return hit ? hit.instanceId ?? null : null;
  }

  #onPointerDown(event) {
    if (this.#hitsKnob(event)) {
      event.preventDefault();
      this.dragging = true;
      this.snap = null;
      this.domElement.setPointerCapture?.(event.pointerId);
      // Пока тянем бегунок, орбита камеры не должна перехватывать тот же жест.
      this.controls.enabled = false;
      this.onDragStart?.();
      this.#rotateToPointer(event);
      return;
    }

    // Нажатие по засечке — доворот модели ровно к этой точке.
    const tick = this.#hitTick(event);
    if (tick === null) return;
    event.preventDefault();
    // Засечка i стоит на кольце под углом (i / TICKS) · 360°; доворачиваем
    // модель так, чтобы бегунок встал именно туда.
    this.#snapTo(toModelAngle((tick / TICKS) * 360));
  }

  // Плавный доворот по кратчайшей дуге.
  #snapTo(targetDegrees) {
    const from = this.currentRotation ?? 0;
    let delta = ((targetDegrees - from) % 360 + 540) % 360 - 180;
    if (Math.abs(delta) < 0.1) return;
    this.snap = { from, to: from + delta, time: 0 };
    this.onDragStart?.();
  }

  #onPointerMove(event) {
    if (this.dragging) {
      this.#rotateToPointer(event);
      return;
    }
    // Курсор подсказывает, что бегунок можно взять, а засечку — нажать.
    if (this.visible) {
      if (this.#hitsKnob(event)) this.domElement.style.cursor = 'grab';
      else this.domElement.style.cursor = this.#hitTick(event) !== null ? 'pointer' : '';
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
    this.onRotate?.(toModelAngle((Math.atan2(dz, dx) * 180) / Math.PI));
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

  // Убирает круг с кадра на время выгрузки оборота. Круг — элемент управления,
  // а не часть предмета: в ролике и на фотографиях ему делать нечего.
  //
  // Своё состояние (показан, закреплён кнопкой) при этом не трогается — после
  // выгрузки круг возвращается сам, тем же кадром, каким возобновляется
  // отрисовка.
  setHiddenForCapture(hidden) {
    this.capturing = hidden;
    if (hidden) this.group.visible = false;
  }

  hide() {
    if (this.dragging || this.pinned) return;
    this.visible = false;
    this.domElement.style.cursor = '';
  }

  // Раскладывает текущий fade по материалам с учётом темы.
  #applyFade() {
    const { ring, ticks, knob, knobRing } = this.materials;
    ring.opacity = this.theme.ring * this.fade;
    ticks.opacity = this.theme.ticks * this.fade;
    knob.opacity = this.fade;
    knobRing.opacity = this.fade;
  }

  // Вызывается каждый кадр: бегунок следует за углом модели, идёт доворот до
  // нажатой засечки, круг плавно появляется и исчезает.
  //
  // Возвращает true, пока сам что-то двигает (затухание, доворот). По этому
  // признаку Viewer решает, нужен ли новый кадр: когда круг спрятан и ничего не
  // анимируется, перерисовывать нечего.
  update(rotationDegrees, delta = 0.016) {
    this.currentRotation = rotationDegrees;
    let animating = false;

    const target = this.visible ? 1 : 0;
    if (this.fade !== target) {
      const step = delta / 0.2; // ~200 мс на переход
      this.fade = target > this.fade
        ? Math.min(this.fade + step, 1)
        : Math.max(this.fade - step, 0);
      this.#applyFade();
      animating = true;
    }

    if (this.snap) {
      this.snap.time += delta;
      const t = Math.min(this.snap.time / SNAP_DURATION, 1);
      // easeOutCubic — быстрый старт, мягкая остановка.
      const eased = 1 - (1 - t) ** 3;
      this.onRotate?.(this.snap.from + (this.snap.to - this.snap.from) * eased);
      if (t >= 1) {
        this.snap = null;
        this.onDragEnd?.();
      }
      animating = true;
    }

    this.group.visible = !this.capturing && this.fade > 0.001 && !!this.metrics;
    if (!this.group.visible) return animating;

    const angle = (toRingAngle(rotationDegrees) * Math.PI) / 180;
    this.knob.position.set(Math.cos(angle), 0, Math.sin(angle));
    // Билборд: кружок всегда развёрнут к камере и остаётся круглым при любом
    // ракурсе. Масштаб группы неравномерным не бывает, поэтому хватает копии
    // поворота камеры.
    this.knob.quaternion.copy(this.camera.quaternion);
    return animating;
  }

  dispose() {
    this.group.traverse((node) => {
      if (node.geometry) node.geometry.dispose();
    });
    for (const material of Object.values(this.materials)) material.dispose();
    this.knobTarget.material.dispose();
    this.tickTargets.material.dispose();
    this.group.removeFromParent();
  }
}

export function createTurntable(params) {
  return new Turntable(params);
}
