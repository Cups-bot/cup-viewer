import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// OrbitControls на холсте рендерера. Собственный autoRotate выключен намеренно:
// просмотрщик крутит модель, а не камеру, — так HDRI остаётся неподвижной.
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
