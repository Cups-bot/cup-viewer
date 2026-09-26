import * as THREE from 'three';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { analyzeSun } from './environment.js';
import { sceneFolder } from '../catalog/catalog.js';
import { ASPECTS, cupPoints, box, fitInto, projector, single, zoomOf } from './frame.js';

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
// стакана), Y вверх, единица — метр. Сдвиг и масштаб не меняют углов, поэтому
// окна кадра остаются как есть, а свет, тени и затенение работают в тех же
// метрах в любой сцене (в сцене «Вода» Blender держит стакан в 22 раза крупнее).
//
// КАДР. Камера ракурса неподвижна; стакан другого роста и формат кадра — вырез
// из кадра фона (js/core/frame.js). Снимок фона режется тем же окном.

// Blender Z-вверх → three Y-вверх: (x, y, z) → (x, z, −y).
const BLENDER_TO_THREE = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2);

const toThree = (v) => new THREE.Vector3(v[0], v[2], -v[1]);

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
  return r.multiplyScalar(posMm[0] / 1000)
    .add(f.multiplyScalar(posMm[1] / 1000))
    .add(new THREE.Vector3(0, floorMm / 1000, 0));
}

// Камера ракурса в площадке: позиция, поворот, ближняя и дальняя плоскости.
function presetCamera(data, preset) {
  const m = new THREE.Matrix4().fromArray(preset.camera.matrix);
  const position = new THREE.Vector3();
  const rotation = new THREE.Quaternion();
  m.decompose(position, rotation, new THREE.Vector3());
  const origin = new THREE.Vector3(...data.stage.origin);
  const s = data.unitsPerM;
  return {
    position: toThree(position.sub(origin).divideScalar(s).toArray()),
    quaternion: BLENDER_TO_THREE.clone().multiply(rotation),
    near: preset.camera.near / s,
    far: preset.camera.far / s,
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

// Высота стакана в метрах по каталогу (size.heightMm).
export function cupHeight(cup) {
  const mm = cup?.size?.heightMm;
  return mm > 0 ? mm / 1000 : null;
}

// Кадр под главный стакан, стоящий на месте героя сцены: окно, влез ли он в
// снимок фона, во сколько раз крупнее кадра фона. Рендер считает так же
// (compose.run): стакан занимает ту долю кадра, что эталон, центр — там же.
export function frameFor(photo, preset, cup, aspect) {
  const { data } = photo;
  // aspect — ширина к высоте кадра (ASPECTS[формат] или форма холста экспорта).
  const view = preset.view;
  const matrix = new THREE.Matrix4().compose(view.position, view.quaternion, new THREE.Vector3(1, 1, 1));
  const tan = projector(matrix);
  const height = cupHeight(cup) ?? data.reference.heightMm / 1000;
  const centre = tan(new THREE.Vector3(0, height / 2, 0));
  const zoom = (height * 1000) / data.reference.heightMm;
  const win = single(preset.baseWindow, centre, zoom, aspect, data.fit.zoomLimits);
  const fitted = fitInto(win, preset.backdropWindow);
  const final = fitted ?? win;
  return { window: final, insideBackdrop: Boolean(fitted), zoom: zoomOf(final, preset.baseWindow) };
}

// Рамка стакана на кадре (тангенсы) — пригодится раскладке пары.
export function cupBox(preset, base, cup) {
  const view = preset.view;
  const matrix = new THREE.Matrix4().compose(view.position, view.quaternion, new THREE.Vector3(1, 1, 1));
  const tan = projector(matrix);
  const top = (cup.size.topMm ?? 0) / 2000;
  const bottom = (cup.size.bottomMm ?? 0) / 2000;
  return box(cupPoints(base, bottom, top, cupHeight(cup)).map(tan));
}

export { ASPECTS };
