import * as THREE from 'three';

// Пресеты ракурса (§12). Азимут — сторона стакана, которая встаёт к камере:
// от лицевой (+Z при нулевом повороте), по часовой стрелке при взгляде
// сверху. Поворачивается сам стакан, а камера уходит на лицевую точку: свет
// и тень стоят на месте, и все ракурсы получаются с одной и той же тенью.
// Возвышение — над горизонтом; null — «как у студийного вида по умолчанию».
export const VIEWS = Object.freeze({
  front: { azimuth: 0, elevation: null },
  right: { azimuth: 90, elevation: null },
  back: { azimuth: 180, elevation: null },
  left: { azimuth: 270, elevation: null },
  top: { azimuth: 0, elevation: 62 },
  // Азимут шва берётся из каталога: textureMapping.seamDeg.
  seam: { azimuth: 'seam', elevation: null },
});

export const VIEW_NAMES = Object.freeze(Object.keys(VIEWS));

// Длительность перехода: в окне 250–400 мс, которое задаёт §12.
export const VIEW_TRANSITION_MS = 320;

const DEG = Math.PI / 180;

// Точка камеры на сфере вокруг target.
export function orbitPosition(target, distance, azimuthDeg, elevationDeg) {
  const az = azimuthDeg * DEG;
  const el = elevationDeg * DEG;
  return new THREE.Vector3(
    target.x + distance * Math.cos(el) * Math.sin(az),
    target.y + distance * Math.sin(el),
    target.z + distance * Math.cos(el) * Math.cos(az),
  );
}

// Сферические координаты камеры относительно target, в градусах.
export function orbitOf(position, target) {
  const offset = position.clone().sub(target);
  const distance = offset.length();
  return {
    distance,
    azimuth: Math.atan2(offset.x, offset.z) / DEG,
    elevation: Math.asin(THREE.MathUtils.clamp(offset.y / (distance || 1), -1, 1)) / DEG,
  };
}

const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

// Кратчайшая разница углов в градусах: −180…180.
export function shortestDelta(from, to) {
  let delta = (to - from) % 360;
  if (delta > 180) delta -= 360;
  if (delta < -180) delta += 360;
  return delta;
}

// Переход к ракурсу: камера по сфере (азимут кратчайшим путём, дистанция и
// возвышение линейно), стакан — поворотом к нужной стороне. to.position и
// to.target — цель камеры, null — камера стоит (фото-сцена); to.rotation —
// угол модели в градусах, null — модель не трогать. step() возвращает true,
// когда переход закончен.
export function createCameraTween({ camera, controls, model = null, to, duration = VIEW_TRANSITION_MS, now = performance.now() }) {
  const moveCamera = Boolean(to.position);
  const fromTarget = controls.target.clone();
  const from = orbitOf(camera.position, fromTarget);
  const toOrbit = moveCamera ? orbitOf(to.position, to.target) : from;
  const delta = shortestDelta(from.azimuth, toOrbit.azimuth);
  const fromRotation = model ? THREE.MathUtils.radToDeg(model.rotation.y) : 0;
  const turn = model && to.rotation != null ? shortestDelta(fromRotation, to.rotation) : 0;
  const start = now;

  return {
    // Стакан поворачивается — значит, двигаются и его тени.
    rotatesModel: turn !== 0,
    step(time = performance.now()) {
      const t = Math.min(1, (time - start) / duration);
      const k = easeInOutCubic(t);
      if (moveCamera) {
        const target = fromTarget.clone().lerp(to.target, k);
        const azimuth = from.azimuth + delta * k;
        const elevation = from.elevation + (toOrbit.elevation - from.elevation) * k;
        const distance = from.distance + (toOrbit.distance - from.distance) * k;
        controls.target.copy(target);
        camera.position.copy(orbitPosition(target, distance, azimuth, elevation));
        camera.lookAt(target);
      }
      if (turn !== 0) model.rotation.y = THREE.MathUtils.degToRad(fromRotation + turn * k);
      return t >= 1;
    },
  };
}
