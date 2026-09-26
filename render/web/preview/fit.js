// Кадр как окно на плоскости изображения — та же математика, что
// engine/bk/frame.py и engine/bk/compose.py. Числа должны совпадать с рендером:
// это проверяет web/preview/check.html.
//
// Окно — [x0, x1, y0, y1] в тангенсах углов от оси камеры: x вправо, y вверх.
// Координаты мира — Blender (Z вверх), как в scene.json.

import * as THREE from 'three';

export const ASPECTS = { '1:1': 1, '3:4': 0.75, '4:5': 0.8 };

export const size = (w) => [w[1] - w[0], w[3] - w[2]];
export const centre = (w) => [(w[0] + w[1]) / 2, (w[2] + w[3]) / 2];
export const union = (a, b) => [Math.min(a[0], b[0]), Math.max(a[1], b[1]), Math.min(a[2], b[2]), Math.max(a[3], b[3])];

export function box(points) {
  let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
  for (const [x, y] of points) {
    x0 = Math.min(x0, x); x1 = Math.max(x1, x);
    y0 = Math.min(y0, y); y1 = Math.max(y1, y);
  }
  return [x0, x1, y0, y1];
}

export function scaleAbout(w, c, kx, ky) {
  return [c[0] + (w[0] - c[0]) * kx, c[0] + (w[1] - c[0]) * kx,
          c[1] + (w[2] - c[1]) * ky, c[1] + (w[3] - c[1]) * ky];
}

// Точки контура стакана-усечённого конуса: кольцо дна и кольцо кромки.
export function cupPoints(base, rBot, rTop, height, n = 24) {
  const out = [];
  for (let k = 0; k < n; k++) {
    const a = (2 * Math.PI * k) / n;
    const c = Math.cos(a), s = Math.sin(a);
    out.push([base[0] + c * rBot, base[1] + s * rBot, base[2]]);
    out.push([base[0] + c * rTop, base[1] + s * rTop, base[2] + height]);
  }
  return out;
}

// Проектор: точка мира → тангенсы в камере ракурса.
export function projector(cameraMatrix) {
  const inv = new THREE.Matrix4().fromArray(cameraMatrix).invert();
  const v = new THREE.Vector3();
  return (p) => {
    v.set(p[0], p[1], p[2]).applyMatrix4(inv);
    const z = v.z < -1e-9 ? -v.z : 1e-9;
    return [v.x / z, v.y / z];
  };
}

// Кадр одиночного стакана: кадр фона, отмасштабированный вокруг стакана.
export function single(base, cupCentre, zoom, aspect, limits) {
  const [w0, h0] = size(base);
  const k = Math.max(limits[0], Math.min(limits[1], zoom));
  return scaleAbout(base, cupCentre, (aspect * k * h0) / w0, k);
}

// Кадр под группу: главный — как в одиночном кадре, группа влезает по ширине.
export function group(singleWin, heroBox, groupBox, aspect, safeW, margin) {
  const [sw, sh] = size(singleWin);
  const hh = size(heroBox)[1];
  const frac = hh / sh;
  const hc = centre(heroBox);
  const tx = (hc[0] - singleWin[0]) / sw, ty = (hc[1] - singleWin[2]) / sh;
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
  const [w, h] = size(win), [aw, ah] = size(area);
  if (w > aw * (1 + 1e-6) || h > ah * (1 + 1e-6)) return null;
  const x0 = Math.min(Math.max(win[0], area[0]), area[1] - w);
  const y0 = Math.min(Math.max(win[2], area[2]), area[3] - h);
  return [x0, x0 + w, y0, y0 + h];
}

export const zoomOf = (win, base) => size(win)[1] / size(base)[1];

// Точка дна стакана в мире по месту на площадке (мм вправо, мм вглубь) и
// высоте опоры (мм от пола героя).
export function stagePoint(scene, posMm, floorMm = 0) {
  const { origin, right, fwd } = scene.stage;
  const k = 0.001 * scene.unitsPerM;
  return [
    origin[0] + (right[0] * posMm[0] + fwd[0] * posMm[1]) * k,
    origin[1] + (right[1] * posMm[0] + fwd[1] * posMm[1]) * k,
    origin[2] + floorMm * k,
  ];
}

// Кадр под стаканы — как compose.run: главный «стоял бы» на месте героя,
// от него доля высоты и точка кадра; одиночный на месте героя — кадр как есть.
// cups: [{info (из web/cups/index.json), posMm, floorMm}], первый — главный.
export function frameFor(scene, preset, cups, frameId) {
  const aspect = ASPECTS[frameId];
  const s = scene.unitsPerM;
  const fit = scene.fit;
  const base = preset.baseWindow;
  const area = preset.backdropWindow;
  const tan = projector(preset.camera.matrix);
  const tanBox = (c, b) => box(cupPoints(b, c.info.rBotMm * 0.001 * s, c.info.rTopMm * 0.001 * s,
                                          c.info.heightMm * 0.001 * s).map(tan));
  const hero = cups[0];
  const origin = scene.stage.origin;
  const hMid = [origin[0], origin[1], origin[2] + hero.info.heightMm * 0.001 * s * 0.5];
  const singleWin = single(base, tan(hMid), hero.info.heightMm / scene.reference.heightMm, aspect, fit.zoomLimits);
  const heroBox0 = tanBox(hero, origin);
  const placed = cups.map((c) => [c, stagePoint(scene, c.posMm, c.floorMm)]);
  let win;
  const atOrigin = placed.length === 1 && !placed[0][0].posMm[0] && !placed[0][0].posMm[1] && !placed[0][0].floorMm;
  if (atOrigin) {
    win = singleWin;
  } else {
    let g = null;
    for (const [c, b] of placed) {
      const bb = tanBox(c, b);
      g = g ? union(g, bb) : bb;
    }
    win = group(singleWin, heroBox0, g, aspect, fit.safeW, fit.margin);
  }
  const fitted = fitInto(win, area);
  return { window: fitted || win, insideBackdrop: Boolean(fitted), zoom: zoomOf(fitted || win, base) };
}

// ---------------------------------------------------------------------------
// Площадка: карта высот из scene.json и проверка места — как group.spot_ok
// ---------------------------------------------------------------------------

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

export function decodeGrid(grid) {
  if (!grid.values) {
    grid.values = decodeLayer(grid.heights, grid.n, grid);
    grid.ceilValues = grid.ceil ? decodeLayer(grid.ceil, grid.n, grid) : null;
  }
  return grid;
}

function sample(scene, layer, xMm, yMm) {
  const g = decodeGrid(scene.stage.grid);
  const i = Math.round((xMm + g.halfMm) / g.stepMm);
  const j = Math.round((yMm + g.halfMm) / g.stepMm);
  if (i < 0 || j < 0 || i >= g.n || j >= g.n) return undefined;
  return (layer === 'ceil' ? g.ceilValues : g.values)?.[j * g.n + i];
}

// Нижняя помеха над полом героя в точке, мм; Infinity — пусто до верха карты.
export function ceilAt(scene, xMm, yMm) {
  const v = sample(scene, 'ceil', xMm, yMm);
  return v === undefined || Number.isNaN(v) ? Infinity : v;
}

// Высота опоры в точке площадки, мм от пола героя; NaN — опоры нет или вне карты.
export function heightAt(scene, xMm, yMm) {
  const v = sample(scene, 'support', xMm, yMm);
  return v === undefined ? NaN : v;
}

// Годится ли место: ровная опора под дном, пусто над следом, не в другом
// стакане. allowStep — можно на ступеньку ниже (до 60 % роста).
export function spotOk(scene, info, posMm, others = [], allowStep = false, floorMm = 0) {
  const H = info.heightMm;
  const tol = Math.max(0.02 * H, 1.5);
  const reach = (allowStep ? 0.6 : 0) * H;
  for (const o of others) {
    const d = Math.hypot(posMm[0] - o.posMm[0], posMm[1] - o.posMm[1]);
    if (d < info.rTopMm + o.info.rTopMm + GAP_MM) return { ok: false, why: 'стаканы пересекаются', floorMm };
  }
  const zs = [];
  for (let k = 0; k < 9; k++) {
    const a = (2 * Math.PI * k) / 8;
    const r = k < 8 ? info.rBotMm * 0.9 : 0;
    const z = heightAt(scene, posMm[0] + Math.cos(a) * r, posMm[1] + Math.sin(a) * r);
    if (!(z <= floorMm + tol) || z < floorMm - tol - reach) {
      return { ok: false, why: 'нет опоры под дном', floorMm };
    }
    zs.push(z);
  }
  if (Math.max(...zs) - Math.min(...zs) > tol) return { ok: false, why: 'опора неровная', floorMm };
  const floor = zs.reduce((s, v) => s + v, 0) / zs.length;
  // помеха над следом: луч вверх от пола (карта ceil) упирается ниже кромки
  for (let k = 0; k < 12; k++) {
    const a = (2 * Math.PI * k) / 12;
    const z = ceilAt(scene, posMm[0] + Math.cos(a) * info.rTopMm * 1.05, posMm[1] + Math.sin(a) * info.rTopMm * 1.05);
    if (z < floor + 0.99 * H) return { ok: false, why: 'мешает декор сцены', floorMm: floor };
  }
  return { ok: true, why: '', floorMm: floor };
}

// Варианты раскладки, мм (вправо, вглубь): [сдвиг главного, место второго] —
// как group.candidates: в одну линию по центру прежнего места, потом сбоку.
export function candidates(layout, hero, second) {
  const base = hero.rTopMm + second.rTopMm + GAP_MM;
  const d = base * (layout === 'pair' ? 1.18 : 1.12);
  const out = [[[-d / 2, 0], [d / 2, 0]], [[d / 2, 0], [-d / 2, 0]], [[0, 0], [d, 0]], [[0, 0], [-d, 0]]];
  for (const a of [80, -80, 100, -100, 70, -70]) {
    out.push([[0, 0], [d * Math.sin((a * Math.PI) / 180), d * Math.cos((a * Math.PI) / 180)]]);
  }
  return out;
}
