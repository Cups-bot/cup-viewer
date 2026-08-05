import * as THREE from 'three';

// Ключевой источник света — ровно один.
//
// Освещает предмет карта окружения (core/studioEnvironment.js): она даёт и
// заполнение, и блики. Но отбрасывать тень она не умеет — у света «со всех
// сторон» нет направления. Поэтому здесь создаётся один направленный источник,
// который потом наводится вдоль главного софтбокса студии (aimKeyLight). Он
// нужен ради тени и объёма, а не ради яркости.
//
// Ambient-света нет намеренно: он бы размыл окружение, которое и даёт заполнение.
//
// Направление и яркость этого света НЕ задаются в конфиге: они целиком выводятся
// из студии, иначе свет и его же отражение в бликах смотрели бы в разные
// стороны. Куда светит — правится раскладкой софтбоксов в studioEnvironment.js,
// насколько сильно — множителем lighting.keyLight.intensityScale.
export function createLighting(scene, config) {
  const { shadow } = config.lighting;

  const rig = new THREE.Group();
  rig.name = 'LightingRig';

  const light = new THREE.DirectionalLight(0xffffff, 0);
  light.name = 'KeyLight';

  if (config.renderer.shadows) {
    light.castShadow = true;
    light.shadow.mapSize.set(shadow.mapSize, shadow.mapSize);
    // Мягкий край: софтбокс — источник крупный, и резкая тень от него
    // выглядела бы как от точечной лампы.
    light.shadow.radius = shadow.radius;
    light.shadow.blurSamples = shadow.blurSamples;

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
  rig.add(light.target);
  scene.add(rig);
  return rig;
}

// Наводит ключевой свет вдоль главного софтбокса студии, чтобы тень падала
// туда же, куда указывает отражение в бликах. Возвращает наведённый свет.
export function aimKeyLight(rig, keySource, config) {
  const options = config.lighting.keyLight;
  if (!options?.enabled) return null;

  const light = rig.getObjectByName('KeyLight');
  if (!light) return null;

  light.position.copy(keySource.direction).multiplyScalar(options.distance);
  light.target.position.set(0, 0, 0);
  light.target.updateMatrixWorld();

  if (options.useColor) light.color.copy(keySource.color);
  light.intensity = keySource.irradiance * options.intensityScale;

  return light;
}
