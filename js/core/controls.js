import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

/**
 * Create OrbitControls bound to the renderer's canvas.
 *
 * Note that OrbitControls' own `autoRotate` is deliberately left off: the
 * viewer spins the model instead (see `Viewer`), which keeps the HDRI fixed
 * during the idle animation. Dragging still orbits the camera, moving the
 * view and the lighting together.
 *
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
  controls.autoRotate = false;
  controls.update();

  return controls;
}
