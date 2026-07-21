import * as THREE from 'three';

// Собирает источники света и добавляет их в сцену.
//
// Основное освещение даёт HDRI (environment.js), тень под моделью — contactShadow.js
// без единого источника света. Поэтому риг здесь — задел, а не необходимость: он
// позволяет положить жёсткий ключевой свет поверх окружения через
// sunFromHDRI.intensityScale. При значении 0 он не вносит ничего.
// Ambient-света нет намеренно: он бы размыл IBL, который и даёт заполнение.
export function createLighting(scene, config) {
  const { directional, shadow } = config.lighting;
  const rig = new THREE.Group();
  rig.name = 'LightingRig';

  let keyed = false;

  for (const spec of directional) {
    const light = new THREE.DirectionalLight(spec.color, spec.intensity);
    light.position.set(spec.position.x, spec.position.y, spec.position.z);

    // Ключевой — тот, что назначен отбрасывать тень; имя даём независимо от того,
    // включены ли карты теней, иначе aimLightAtSun не нашёл бы этот свет при
    // выключенных тенях (а это режим по умолчанию).
    if (spec.castShadow && !keyed) {
      light.name = 'KeyLight';
      keyed = true;
    }

    if (spec.castShadow && config.renderer.shadows) {
      light.castShadow = true;
      light.shadow.mapSize.set(shadow.mapSize, shadow.mapSize);

      // Плотно подгоняем камеру теней под модель: стандартный фрустум для
      // модели в 0.5 юнита примерно в 20 раз велик и тратит почти всю карту.
      const cam = light.shadow.camera;
      cam.near = shadow.near;
      cam.far = shadow.far;
      cam.left = -shadow.frustum;
      cam.right = shadow.frustum;
      cam.top = shadow.frustum;
      cam.bottom = -shadow.frustum;
      cam.updateProjectionMatrix();

      light.shadow.bias = shadow.bias;
      light.shadow.normalBias = shadow.normalBias;
    }

    rig.add(light);
  }

  scene.add(rig);
  return rig;
}

// Наводит ключевой свет вдоль солнца, найденного в HDRI, чтобы при включении он
// согласовывался с окружением, а не противоречил ему. Интенсивность по умолчанию
// 0: HDRI уже освещает модель вместе с солнцем. Возвращает наведённый свет.
export function aimLightAtSun(rig, sun, config) {
  const options = config.lighting.sunFromHDRI;
  if (!options?.enabled) return null;

  const light = rig.getObjectByName('KeyLight');
  if (!light) return null;

  light.position.copy(sun.direction).multiplyScalar(options.distance);
  light.target.position.set(0, 0, 0);
  light.target.updateMatrixWorld();
  if (!light.target.parent) rig.add(light.target);

  if (options.useColor) light.color.copy(sun.color);
  light.intensity = sun.irradiance * options.intensityScale;

  return light;
}
