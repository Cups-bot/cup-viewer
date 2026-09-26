import * as THREE from 'three';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { analyzeSun } from './environment.js';
import { sceneFolder } from '../catalog/catalog.js';
import {
  ASPECTS, box, candidates, cupPoints, fitInto, group, projector, single, spotOk, union, zoomOf,
} from './frame.js';

// Фото-сцена — сцена фотореал-рендера (render/, CupViewer v2): стакан стоит в
// натуральную величину в настоящей снятой сцене, а кадр совпадает с кадром
// рендера Blender.
//
// ИЗ ЧЕГО. Папка catalog/scenes/<id>/, её выгружает
// render/engine/tools/export_preview.py:
//
//   scene.json      камеры ракурсов, окна кадра, оси и карта площадки, свет, цвет;
//   <ракурс>.webp   снимок сцены без стакана — окно с запасом (backdropWindow);
//   env.hdr         панорама из точки стакана: свет сцены, линейный.
//
// КООРДИНАТЫ. scene.json — в мировых осях Blender (Z вверх, единицы сцены).
// Здесь всё переводится в «площадку»: начало — место героя сцены (дно
// стакана), Y вверх, а масштаб — как в студии: эталонный стакан (135 мм)
// высотой в STAGE_UNITS_PER_M · 0,1353 = 0,5 единицы, как модель студии
// (config.model.targetSize). Тогда свет, тени и затенение из конфига ложатся
// на стакан в той же мере, что и в студии, в любой сцене (в «Воде» Blender
// держит стакан в 22 раза крупнее). Сдвиг и масштаб не меняют углов, поэтому
// окна кадра остаются как есть.
//
// КАДР. Камера ракурса неподвижна; стакан другого роста и формат кадра — вырез
// из кадра фона (js/core/frame.js). Снимок фона режется тем же окном.

// Blender Z-вверх → three Y-вверх: (x, y, z) → (x, z, −y).
const BLENDER_TO_THREE = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2);

const toThree = (v) => new THREE.Vector3(v[0], v[2], -v[1]);

// Единиц площадки в метре: эталонный стакан 135,3 мм — 0,5 единицы.
export const STAGE_UNITS_PER_M = 0.5 / 0.1353;
const mm = (v) => (v / 1000) * STAGE_UNITS_PER_M;

// Загруженные сцены: ключ — id, значение — промис (быстрое переключение не
// должно грузить одно и то же дважды).
const loaded = new Map();

function loadTexture(url) {
  return new Promise((resolve, reject) => {
    new THREE.TextureLoader().load(
      url,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        // Кадр — вырез из снимка: края не заворачиваются.
        texture.wrapS = THREE.ClampToEdgeWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;
        resolve(texture);
      },
      undefined,
      () => reject(new Error(`фон сцены не загрузился: ${url}`)),
    );
  });
}

function lightProbe(url, renderer, onProgress) {
  return new Promise((resolve, reject) => {
    new RGBELoader().load(
      url,
      (texture) => {
        // Главный свет ищется до фильтрации: только сырая панорама хранит
        // яркость по пикселям.
        const sun = analyzeSun(texture);
        const pmrem = new THREE.PMREMGenerator(renderer);
        pmrem.compileEquirectangularShader();
        const envMap = pmrem.fromEquirectangular(texture).texture;
        texture.dispose();
        pmrem.dispose();
        resolve({ envMap, sun });
      },
      (event) => onProgress?.(event.total > 0 ? (event.loaded / event.total) * 100 : -1),
      () => reject(new Error(`свет сцены не загрузился: ${url}`)),
    );
  });
}

// Место на площадке (мм вправо по кадру фона, мм вглубь) → точка в метрах.
export function stagePoint(data, posMm = [0, 0], floorMm = 0) {
  const r = toThree(data.stage.right);
  const f = toThree(data.stage.fwd);
  return r.multiplyScalar(mm(posMm[0]))
    .add(f.multiplyScalar(mm(posMm[1])))
    .add(new THREE.Vector3(0, mm(floorMm), 0));
}

// Камера ракурса в площадке: позиция, поворот, ближняя и дальняя плоскости.
function presetCamera(data, preset) {
  const m = new THREE.Matrix4().fromArray(preset.camera.matrix);
  const position = new THREE.Vector3();
  const rotation = new THREE.Quaternion();
  m.decompose(position, rotation, new THREE.Vector3());
  const origin = new THREE.Vector3(...data.stage.origin);
  const k = STAGE_UNITS_PER_M / data.unitsPerM;
  return {
    position: toThree(position.sub(origin).multiplyScalar(k).toArray()),
    quaternion: BLENDER_TO_THREE.clone().multiply(rotation),
    near: preset.camera.near * k,
    far: preset.camera.far * k,
  };
}

// Поворот стакана в сцене (Euler XYZ Blender) — в осях three.
export function cupRotation(data) {
  const [x, y, z] = (data.stage.cupRotationDeg ?? [0, 0, 0]).map(THREE.MathUtils.degToRad);
  const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(x, y, z, 'ZYX'));
  return BLENDER_TO_THREE.clone().multiply(q).multiply(BLENDER_TO_THREE.clone().invert());
}

async function fetchScene(id, renderer, onProgress) {
  const folder = sceneFolder(id);
  const response = await fetch(`${folder}/scene.json`, { credentials: 'same-origin' });
  if (!response.ok) throw new Error(`описание сцены ${id}: HTTP ${response.status}`);
  const data = await response.json();
  if (data.schema !== 1 || data.coords !== 'blender-z-up' || !data.presets?.length) {
    throw new Error(`сцена ${id}: не тот формат scene.json`);
  }
  const light = await lightProbe(`${folder}/${data.environment}`, renderer, onProgress);
  // Направление главного света — из Blender, если он его отдал: лампы в
  // панораму не попадают, и самое яркое пятно на ней — не всегда источник.
  if (data.key?.direction) light.sun.direction = toThree(data.key.direction).normalize();
  // Солнце в панораму не попадает — его сила приходит из Blender (W/м² — та же
  // освещённость в three.js), и ключевой свет ставится ровно на неё. Прочие
  // лампы видны в самой панораме, ключевой свет у них нужен ради тени.
  if (data.key?.type === 'SUN' && data.key.irradiance > 0) {
    light.sun.irradiance = data.key.irradiance;
    light.sun.color = new THREE.Color(...data.key.color);
    light.sun.physical = true;
  }
  const presets = new Map(data.presets.map((p) => [p.id, { ...p, view: presetCamera(data, p) }]));
  return { id, data, presets, envMap: light.envMap, sun: light.sun, backdrops: new Map() };
}

// Грузит сцену: описание и свет. Снимки ракурсов — по требованию (backdropOf).
export function loadPhotoScene(id, renderer, onProgress) {
  if (!loaded.has(id)) {
    loaded.set(
      id,
      fetchScene(id, renderer, onProgress).catch((error) => {
        loaded.delete(id);
        throw error;
      }),
    );
  }
  return loaded.get(id);
}

// Снимок фона ракурса (один на ракурс, кэшируется в сцене).
export function backdropOf(photo, preset) {
  const url = `${sceneFolder(photo.id)}/${preset.backdrop}`;
  if (!photo.backdrops.has(url)) {
    photo.backdrops.set(
      url,
      loadTexture(url).catch((error) => {
        photo.backdrops.delete(url);
        throw error;
      }),
    );
  }
  return photo.backdrops.get(url);
}

// Ракурс сцены по id; неизвестный — первый (кадр как в сцене).
export function presetOf(photo, id) {
  return photo.presets.get(id) ?? photo.presets.values().next().value;
}

// Высота стакана в единицах площадки по каталогу (size.heightMm).
export function cupHeight(cup) {
  const h = cup?.size?.heightMm;
  return h > 0 ? mm(h) : null;
}

// Габарит стакана для кадра и раскладки — из каталога, в мм.
export function cupMetrics(cup) {
  const size = cup?.size ?? {};
  return {
    heightMm: size.heightMm ?? 135,
    rTopMm: (size.topMm ?? 90) / 2,
    rBotMm: (size.bottomMm ?? 60) / 2,
  };
}

function cameraProjector(preset) {
  const view = preset.view;
  return projector(new THREE.Matrix4().compose(view.position, view.quaternion, new THREE.Vector3(1, 1, 1)));
}

function boxOf(tan, base, metrics) {
  return box(cupPoints(base, mm(metrics.rBotMm), mm(metrics.rTopMm), mm(metrics.heightMm)).map(tan));
}

// Кадр под стаканы — как compose.run у рендера. placed — [{ cup, posMm,
// floorMm }], первый — главный. Главный «стоял бы» на месте героя сцены: от
// него доля высоты кадра и точка кадра; одиночный на месте героя — кадр фона,
// отмасштабированный вокруг стакана. aspect — ширина к высоте кадра.
export function frameFor(photo, preset, placed, aspect) {
  const { data } = photo;
  const tan = cameraProjector(preset);
  const hero = cupMetrics(placed[0]?.cup);
  const height = mm(hero.heightMm);
  const zoom = hero.heightMm / data.reference.heightMm;
  const refCentre = tan(new THREE.Vector3(0, mm(data.reference.heightMm) / 2, 0));
  const heroBox = boxOf(tan, new THREE.Vector3(), hero);
  const singleWin = single(preset.baseWindow, refCentre, tan(new THREE.Vector3(0, height / 2, 0)), zoom, aspect,
    data.fit.zoomLimits, heroBox, data.fit.maxW, data.fit.scaleFeel);
  const atOrigin = placed.length === 1 && !placed[0].posMm?.[0] && !placed[0].posMm?.[1] && !placed[0].floorMm;
  let win = singleWin;
  if (!atOrigin) {
    let g = null;
    for (const c of placed) {
      const b = boxOf(tan, stagePoint(data, c.posMm, c.floorMm), cupMetrics(c.cup));
      g = g ? union(g, b) : b;
    }
    win = group(singleWin, heroBox, g, aspect, data.fit.safeW, data.fit.margin);
  }
  const fitted = fitInto(win, preset.backdropWindow);
  const final = fitted ?? win;
  return { window: final, insideBackdrop: Boolean(fitted), zoom: zoomOf(final, preset.baseWindow) };
}

// Места пары — как compose._second у рендера: в одну линию по центру прежнего
// места (главный сдвигается на полшага), потом главный на месте и второй
// сбоку, потом чуть вглубь. Место годится, если есть опора и нет помех (карта
// площадки), а кадр пары влезает в снимок фона. kind — 'pair' | 'side'.
// Возвращает [{ cup, posMm, floorMm }, { … }] или null — второму места нет.
export function layoutPair(photo, preset, heroCup, secondCup, kind, aspect) {
  const grid = photo.data.stage.grid;
  const hero = cupMetrics(heroCup);
  const second = cupMetrics(secondCup);
  let best = null;
  for (const allowStep of [false, true]) {
    for (const [h, s] of candidates(kind, hero, second)) {
      if ((h[0] || h[1]) && !spotOk(grid, hero, h, [], false).ok) continue;
      const check = spotOk(grid, second, s, [{ posMm: h, rTopMm: hero.rTopMm }], allowStep);
      if (!check.ok) continue;
      const floor = Math.abs(check.floorMm) < 0.05 ? 0 : check.floorMm;
      const placed = [{ cup: heroCup, posMm: h, floorMm: 0 }, { cup: secondCup, posMm: s, floorMm: floor }];
      const fit = frameFor(photo, preset, placed, aspect);
      if (fit.insideBackdrop) return placed;
      if (!best || fit.zoom < best.zoom) best = { placed, zoom: fit.zoom };
    }
  }
  return best?.placed ?? null;
}

export { ASPECTS };
