import * as THREE from 'three';

/**
 * Create the perspective camera.
 * @param {import('../config.js').CONFIG} config
 * @param {number} aspect Initial viewport aspect ratio.
 * @returns {THREE.PerspectiveCamera}
 */
export function createCamera(config, aspect) {
  const { fov, near, far, position } = config.camera;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(position.x, position.y, position.z);
  return camera;
}
