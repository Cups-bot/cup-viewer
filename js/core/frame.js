import * as THREE from 'three';

// Кадр фото-сцены как окно на плоскости изображения — та же математика, что
// у рендера (render/engine/bk/frame.py и compose.py). Окно — [x0, x1, y0, y1]
// в тангенсах углов от оси камеры: x вправо, y вверх. Камера сцены стоит на
// месте; стакан другого роста, пара и формат кадра — это вырез из кадра фона,
// как кадрирование фотографии. Поэтому снимок фона под стаканами режется тем
// же окном и совпадает с рендером.
//
// Пространство здесь — «площадка» (см. photoScene.js): начало — место героя
// сцены, ось Y — вверх, единица — как в студии (эталонный стакан — 0,5, photoScene.js).

export const ASPECTS = Object.freeze({ '1:1': 1, '3:4': 0.75, '4:5': 0.8 });

export const size = (w) => [w[1] - w[0], w[3] - w[2]];
export const centre = (w) => [(w[0] + w[1]) / 2, (w[2] + w[3]) / 2];
export const union = (a, b) => [
  Math.min(a[0], b[0]), Math.max(a[1], b[1]), Math.min(a[2], b[2]), Math.max(a[3], b[3]),
];

export function box(points) {
  let x0 = Infinity;
  let x1 = -Infinity;
  let y0 = Infinity;
  let y1 = -Infinity;
  for (const [x, y] of points) {
    x0 = Math.min(x0, x);
    x1 = Math.max(x1, x);
    y0 = Math.min(y0, y);
    y1 = Math.max(y1, y);
  }
  return [x0, x1, y0, y1];
}

export function scaleAbout(w, c, kx, ky) {
  return [
    c[0] + (w[0] - c[0]) * kx, c[0] + (w[1] - c[0]) * kx,
    c[1] + (w[2] - c[1]) * ky, c[1] + (w[3] - c[1]) * ky,
  ];
}

// Точки контура стакана — усечённого конуса: кольцо дна и кольцо кромки. По
// ним считается рамка стакана в кадре; рендер берёт те же точки.
export function cupPoints(base, rBot, rTop, height, n = 24) {
  const out = [];
  for (let k = 0; k < n; k++) {
    const a = (2 * Math.PI * k) / n;
    const c = Math.cos(a);
    const s = Math.sin(a);
    out.push(new THREE.Vector3(base.x + c * rBot, base.y, base.z + s * rBot));
    out.push(new THREE.Vector3(base.x + c * rTop, base.y + height, base.z + s * rTop));
  }
  return out;
}

// Точка мира → тангенсы в камере с мировой матрицей matrixWorld.
export function projector(matrixWorld) {
  const inverse = matrixWorld.clone().invert();
  const v = new THREE.Vector3();
  return (point) => {
    v.copy(point).applyMatrix4(inverse);
    const z = v.z < -1e-9 ? -v.z : 1e-9;
    return [v.x / z, v.y / z];
  };
}

// Кадр одиночного стакана: кадр фона, отмасштабированный вокруг центра
// стакана. zoom — рост стакана к эталону; узкий формат обрезает бока.
export function single(base, cupCentre, zoom, aspect, limits) {
  const [w0, h0] = size(base);
  const k = Math.max(limits[0], Math.min(limits[1], zoom));
  return scaleAbout(base, cupCentre, (aspect * k * h0) / w0, k);
}

// Кадр под группу: главный — как в одиночном кадре, группа влезает по ширине.
export function group(singleWin, heroBox, groupBox, aspect, safeW, margin) {
  const [sw, sh] = size(singleWin);
  const frac = size(heroBox)[1] / sh;
  const hc = centre(heroBox);
  const tx = (hc[0] - singleWin[0]) / sw;
  const ty = (hc[1] - singleWin[2]) / sh;
  const [gw, gh] = size(groupBox);
  const gc = centre(groupBox);
  const height = Math.max(gh / frac, gw / (safeW * aspect));
  const width = height * aspect;
  let x0 = gc[0] - tx * width;
  const y0 = gc[1] - ty * height;
  if (gw <= (1 - 2 * margin) * width) {
    x0 = Math.min(Math.max(x0, groupBox[1] - (1 - margin) * width), groupBox[0] - margin * width);
  }
  return [x0, x0 + width, y0, y0 + height];
}

// Сдвинуть окно внутрь снимка фона; null — окно больше снимка.
export function fitInto(win, area) {
  const [w, h] = size(win);
  const [aw, ah] = size(area);
  if (w > aw * (1 + 1e-6) || h > ah * (1 + 1e-6)) return null;
  const x0 = Math.min(Math.max(win[0], area[0]), area[1] - w);
  const y0 = Math.min(Math.max(win[2], area[2]), area[3] - h);
  return [x0, x0 + w, y0, y0 + h];
}

export const zoomOf = (win, base) => size(win)[1] / size(base)[1];

// Проекция камеры ровно на окно. Полный кадр — симметричный квадрат,
// вмещающий окно; окно — вырез из него (setViewOffset). Вырез переживает любой
// updateProjectionMatrix(), поэтому кадр не собьют ни resize, ни экспорт.
export function applyWindow(camera, win) {
  const [x0, x1, y0, y1] = win;
  const t = Math.max(Math.abs(x0), Math.abs(x1), Math.abs(y0), Math.abs(y1)) * 1.0001;
  const full = 10000;
  camera.fov = THREE.MathUtils.radToDeg(2 * Math.atan(t));
  camera.aspect = 1;
  camera.zoom = 1;
  camera.filmOffset = 0;
  camera.setViewOffset(
    full,
    full,
    ((x0 + t) / (2 * t)) * full,
    ((t - y1) / (2 * t)) * full,
    ((x1 - x0) / (2 * t)) * full,
    ((y1 - y0) / (2 * t)) * full,
  );
  camera.updateProjectionMatrix();
}

// Где окно лежит в снимке фона: [u0, v0, du, dv] — доли снимка (v снизу).
export function backdropRect(win, area) {
  const [aw, ah] = size(area);
  return [(win[0] - area[0]) / aw, (win[2] - area[2]) / ah, (win[1] - win[0]) / aw, (win[3] - win[2]) / ah];
}

// ── Площадка: карта из scene.json и проверка места — как group.spot_ok ─────
//
// Карта — сетка в мм площадки (x вправо по кадру фона, y вглубь): support —
// высота опоры под лучом сверху, ceil — нижняя помеха над полом героя. Рендер
// проверяет место лучами по самой сцене; здесь — та же проверка по карте.

export const GAP_MM = 3;

function decodeLayer(b64, n, grid) {
  const bin = atob(b64);
  const values = new Float32Array(n * n);
  for (let i = 0; i < n * n; i++) {
    let v = bin.charCodeAt(2 * i) | (bin.charCodeAt(2 * i + 1) << 8);
    if (v >= 0x8000) v -= 0x10000;
    values[i] = v === grid.noHit ? NaN : v * grid.scale;
  }
  return values;
}

const decoded = new WeakMap();

function layers(grid) {
  if (!decoded.has(grid)) {
    decoded.set(grid, {
      support: decodeLayer(grid.heights, grid.n, grid),
      ceil: grid.ceil ? decodeLayer(grid.ceil, grid.n, grid) : null,
    });
  }
  return decoded.get(grid);
}

function sample(grid, layer, xMm, yMm) {
  const i = Math.round((xMm + grid.halfMm) / grid.stepMm);
  const j = Math.round((yMm + grid.halfMm) / grid.stepMm);
  if (i < 0 || j < 0 || i >= grid.n || j >= grid.n) return undefined;
  return layers(grid)[layer]?.[j * grid.n + i];
}

// Годится ли место (мм площадки) стакану { heightMm, rTopMm, rBotMm }: ровная
// опора под дном, пусто над следом, не в другом стакане. allowStep — можно на
// ступеньку ниже, не глубже 60 % роста. Возвращает { ok, why, floorMm }.
export function spotOk(grid, cup, posMm, others = [], allowStep = false, floorMm = 0) {
  const H = cup.heightMm;
  const tol = Math.max(0.02 * H, 1.5);
  const reach = (allowStep ? 0.6 : 0) * H;
  for (const o of others) {
    const d = Math.hypot(posMm[0] - o.posMm[0], posMm[1] - o.posMm[1]);
    if (d < cup.rTopMm + o.rTopMm + GAP_MM) return { ok: false, why: 'стаканы пересекаются', floorMm };
  }
  const zs = [];
  for (let k = 0; k < 9; k++) {
    const a = (2 * Math.PI * k) / 8;
    const r = k < 8 ? cup.rBotMm * 0.9 : 0;
    const z = sample(grid, 'support', posMm[0] + Math.cos(a) * r, posMm[1] + Math.sin(a) * r);
    if (z === undefined || !(z <= floorMm + tol) || z < floorMm - tol - reach) {
      return { ok: false, why: 'нет опоры под дном', floorMm };
    }
    zs.push(z);
  }
  if (Math.max(...zs) - Math.min(...zs) > tol) return { ok: false, why: 'опора неровная', floorMm };
  const floor = zs.reduce((s, v) => s + v, 0) / zs.length;
  for (let k = 0; k < 12; k++) {
    const a = (2 * Math.PI * k) / 12;
    const z = sample(grid, 'ceil', posMm[0] + Math.cos(a) * cup.rTopMm * 1.05, posMm[1] + Math.sin(a) * cup.rTopMm * 1.05);
    if (z !== undefined && !Number.isNaN(z) && z < floor + 0.99 * H) {
      return { ok: false, why: 'мешает декор сцены', floorMm: floor };
    }
  }
  return { ok: true, why: '', floorMm: floor };
}

// Варианты раскладки пары, мм (вправо, вглубь): [сдвиг главного, место
// второго] — как group.candidates: в одну линию по центру прежнего места,
// потом главный на месте и второй сбоку, потом чуть вглубь или вперёд.
export function candidates(kind, hero, second) {
  const base = hero.rTopMm + second.rTopMm + GAP_MM;
  const d = base * (kind === 'pair' ? 1.18 : 1.12);
  const out = [[[-d / 2, 0], [d / 2, 0]], [[d / 2, 0], [-d / 2, 0]], [[0, 0], [d, 0]], [[0, 0], [-d, 0]]];
  for (const a of [80, -80, 100, -100, 70, -70]) {
    const r = THREE.MathUtils.degToRad(a);
    out.push([[0, 0], [d * Math.sin(r), d * Math.cos(r)]]);
  }
  return out;
}
