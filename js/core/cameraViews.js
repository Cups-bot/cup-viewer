import * as THREE from 'three';

// Пресеты камеры (§12). Азимут — от лицевой стороны модели (+Z при нулевом
// повороте), по часовой стрелке при взгляде сверху; возвышение — над
// горизонтом. null — «как у студийного вида по умолчанию».
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

// Переход камеры по сфере: азимут идёт кратчайшим путём, дистанция и
// возвышение — линейно по сглаженному времени. step() возвращает true, когда
// переход закончен.
export function createCameraTween({ camera, controls, to, duration = VIEW_TRANSITION_MS, now = performance.now() }) {
  const fromTarget = controls.target.clone();
  const from = orbitOf(camera.position, fromTarget);
  const toOrbit = orbitOf(to.position, to.target);
  let delta = (toOrbit.azimuth - from.azimuth) % 360;
  if (delta > 180) delta -= 360;
  if (delta < -180) delta += 360;
  const start = now;

  return {
    step(time = performance.now()) {
      const t = Math.min(1, (time - start) / duration);
      const k = easeInOutCubic(t);
      const target = fromTarget.clone().lerp(to.target, k);
      const azimuth = from.azimuth + delta * k;
      const elevation = from.elevation + (toOrbit.elevation - from.elevation) * k;
      const distance = from.distance + (toOrbit.distance - from.distance) * k;
      controls.target.copy(target);
      camera.position.copy(orbitPosition(target, distance, azimuth, elevation));
      camera.lookAt(target);
      return t >= 1;
    },
  };
}
