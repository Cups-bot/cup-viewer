import * as THREE from 'three';

// Чистые вспомогательные функции без собственного состояния.

// Рекурсивно освобождает геометрии, материалы и их текстуры под объектом, чтобы
// вернуть память GPU при смене модели на лету.
export function disposeObject(root) {
  root.traverse((node) => {
    if (node.geometry) node.geometry.dispose();
    if (!node.material) return;
    const materials = Array.isArray(node.material) ? node.material : [node.material];
    for (const material of materials) disposeMaterial(material);
  });
}

// Освобождает материал и все его текстуры.
export function disposeMaterial(material) {
  for (const value of Object.values(material)) {
    if (value && value.isTexture) value.dispose();
  }
  material.dispose();
}

// Bounding box, центр и размер объекта за один проход.
export function measure(object) {
  const box = new THREE.Box3().setFromObject(object);
  return {
    box,
    center: box.getCenter(new THREE.Vector3()),
    size: box.getSize(new THREE.Vector3()),
  };
}

// Ставит перспективную камеру так, чтобы объект помещался в кадр, сохраняя
// текущее направление взгляда. offset — множитель отступа вокруг объекта.
export function frameObject(camera, controls, box, offset = 1.3) {
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z);

  const fitHeightDistance = maxDim / (2 * Math.tan((Math.PI * camera.fov) / 360));
  const aspect = Number.isFinite(camera.aspect) && camera.aspect > 0 ? camera.aspect : 1;
  const fitWidthDistance = fitHeightDistance / aspect;
  // Пустой или вырожденный box иначе поставил бы камеру в NaN, что тихо портит
  // все матрицы дальше и заклинивает рендерер.
  const fitted = offset * Math.max(fitHeightDistance, fitWidthDistance);
  const distance = Number.isFinite(fitted) && fitted > 0 ? fitted : 1;

  const direction = camera.position.clone().sub(controls.target).normalize();
  controls.target.copy(center);
  camera.position.copy(center).addScaledVector(direction, distance);

  camera.near = distance / 100;
  camera.far = distance * 100;
  camera.updateProjectionMatrix();
  controls.update();
}
