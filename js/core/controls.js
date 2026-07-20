import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

/**
 * Create OrbitControls bound to the renderer's canvas.
 * @param {import('three').PerspectiveCamera} camera
 * @param {HTMLElement} domElement
 * @param {import('../config.js').CONFIG} config
 * @returns {OrbitControls}
 */
export function createControls(camera, domElement, config) {
  const c = config.controls;
  const controls = new OrbitControls(camera, domElement);

  controls.enableDamping = c.enableDamping;
  controls.dampingFactor = c.dampingFactor;
  controls.minDistance = c.minDistance;
  controls.maxDistance = c.maxDistance;
  controls.maxPolarAngle = c.maxPolarAngle;
  controls.enablePan = c.enablePan;
  controls.autoRotate = c.autoRotate;
  controls.autoRotateSpeed = c.autoRotateSpeed;
  controls.update();

  return controls;
}
