import * as THREE from 'three';

// Перспективная камера.
export function createCamera(config, aspect) {
  const { fov, near, far, position } = config.camera;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(position.x, position.y, position.z);
  return camera;
}
