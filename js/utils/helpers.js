import * as THREE from 'three';

/**
 * Pure, reusable helpers with no viewer state of their own.
 * Keeping them isolated makes them trivial to test and share.
 */

/**
 * Recursively dispose geometries, materials and their textures under an
 * object so the GPU memory it held is released. Prevents leaks when a model
 * is swapped out at runtime.
 * @param {THREE.Object3D} root
 */
export function disposeObject(root) {
  root.traverse((node) => {
    if (node.geometry) node.geometry.dispose();
    if (!node.material) return;
    const materials = Array.isArray(node.material) ? node.material : [node.material];
    for (const material of materials) disposeMaterial(material);
  });
}

/**
 * Dispose a material and every texture it references.
 * @param {THREE.Material} material
 */
export function disposeMaterial(material) {
  for (const value of Object.values(material)) {
    if (value && value.isTexture) value.dispose();
  }
  material.dispose();
}

/**
 * Compute the bounding box, center and size of an object in one pass.
 * @param {THREE.Object3D} object
 */
export function measure(object) {
  const box = new THREE.Box3().setFromObject(object);
  return {
    box,
    center: box.getCenter(new THREE.Vector3()),
    size: box.getSize(new THREE.Vector3()),
  };
}

/**
 * Position a perspective camera so the given bounding sphere fits the frame,
 * keeping the camera's current viewing direction.
 * @param {THREE.PerspectiveCamera} camera
 * @param {import('three').OrbitControls} controls
 * @param {THREE.Box3} box
 * @param {number} [offset=1.3] Margin multiplier around the object.
 */
export function frameObject(camera, controls, box, offset = 1.3) {
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z);

  const fitHeightDistance = maxDim / (2 * Math.tan((Math.PI * camera.fov) / 360));
  const fitWidthDistance = fitHeightDistance / camera.aspect;
  const distance = offset * Math.max(fitHeightDistance, fitWidthDistance);

  const direction = camera.position.clone().sub(controls.target).normalize();
  controls.target.copy(center);
  camera.position.copy(center).addScaledVector(direction, distance);

  camera.near = distance / 100;
  camera.far = distance * 100;
  camera.updateProjectionMatrix();
  controls.update();
}
