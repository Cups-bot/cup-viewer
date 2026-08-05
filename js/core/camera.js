import * as THREE from 'three';

// Ближняя и дальняя плоскости на момент создания камеры. В конфиг они не
// вынесены намеренно: кадрирование под модель (utils/helpers.js → frameObject)
// пересчитывает их по её размеру при каждой загрузке, так что любое значение
// отсюда живёт до первой модели. Настройка, которая всегда перезаписывается, в
// конфиге только сбивает с толку.
const INITIAL_NEAR = 0.1;
const INITIAL_FAR = 100;

// Перспективная камера.
export function createCamera(config, aspect) {
  const { fov, position } = config.camera;
  const camera = new THREE.PerspectiveCamera(fov, aspect, INITIAL_NEAR, INITIAL_FAR);
  camera.position.set(position.x, position.y, position.z);
  return camera;
}
