import * as THREE from 'three';

// Ключевой источник света — ровно один.
//
// Освещает предмет карта окружения (core/studioEnvironment.js): она даёт и
// заполнение, и блики. Но отбрасывать тень она не умеет — у света «со всех
// сторон» нет направления. Поэтому здесь создаётся один источник, который потом
// наводится вдоль главного софтбокса студии (aimKeyLight). Он нужен ради тени и
// объёма, а не ради яркости.
//
// Ambient-света нет намеренно: он бы размыл окружение, которое и даёт заполнение.
//
// Направление и яркость этого света НЕ задаются в конфиге: они целиком выводятся
// из студии, иначе свет и его же отражение в бликах смотрели бы в разные
// стороны. Куда светит — правится раскладкой софтбоксов в studioEnvironment.js,
// насколько сильно — множителем lighting.keyLight.intensityScale.
//
// ── ПОЧЕМУ ЭТО ПРОЖЕКТОР, А НЕ «СОЛНЦЕ» ──────────────────────────────────
//
// Раньше здесь стоял DirectionalLight — источник, удалённый в бесконечность.
// У такого света НЕТ падения яркости с расстоянием: верх и низ стенки он
// освещает абсолютно одинаково. Замер это и показывал: по вертикали через
// середину стакана шло 199, 199, 199, 199… на протяжении двухсот с лишним
// пикселей — ровная плашка, которую глаз безошибочно читает как заливку, а не
// как предмет.
//
// Софтбокс в студии стоит не в бесконечности, а в полуметре. Свет от него
// слабеет как квадрат расстояния, и до донышка доходит заметно меньше, чем до
// ободка, — отсюда и вертикальная растяжка на настоящей фотографии. Прожектор
// (SpotLight) с физическим затуханием decay = 2 повторяет это ровно так же и
// при этом, в отличие от RectAreaLight, умеет отбрасывать тень.
//
// Крутизна растяжки настраивается ОДНИМ числом — lighting.keyLight.distance:
// ближе источник — сильнее перепад между ободком и дном. Яркость при этом не
// съезжает: она домножается на квадрат расстояния (см. aimKeyLight), поэтому
// distance управляет только характером света, а не экспозицией.
export function createLighting(scene, config) {
  const { shadow } = config.lighting;

  const rig = new THREE.Group();
  rig.name = 'LightingRig';

  const light = new THREE.SpotLight(0xffffff, 0);
  light.name = 'KeyLight';
  // Физическое затухание: освещённость падает как 1/r². Ради него всё и затеяно.
  light.decay = 2;
  // Без обрезки по дальности: гасить свет на заданном радиусе — приём из
  // игровых движков, в студии такого не бывает.
  light.distance = 0;
  // Мягкий край конуса. Предмет стоит в середине пятна, поэтому на нём самом
  // край не читается; он нужен, чтобы карта теней не обрывалась ступенькой.
  light.penumbra = 1;

  if (config.renderer.shadows) {
    light.castShadow = true;
    light.shadow.mapSize.set(shadow.mapSize, shadow.mapSize);
    // Мягкий край: софтбокс — источник крупный, и резкая тень от него
    // выглядела бы как от точечной лампы.
    light.shadow.radius = shadow.radius;
    light.shadow.camera.near = shadow.near;
    light.shadow.camera.far = shadow.far;
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

  const distance = options.distance;
  light.position.copy(keySource.direction).multiplyScalar(distance);
  light.target.position.set(0, 0, 0);
  light.target.updateMatrixWorld();

  // Раскрытие конуса: ровно на область, которую покрывает карта теней. Угол
  // считается, а не задаётся, иначе конус и фрустум тени расходились бы, и
  // тень обрубалась бы ровной дугой.
  light.angle = Math.atan(config.lighting.shadow.frustum / distance);

  if (options.useColor) light.color.copy(keySource.color);

  // intensityScale задаётся в тех же единицах, что и яркость софтбокса, то есть
  // как ОСВЕЩЁННОСТЬ в центре сцены. У источника с затуханием сила света
  // выражается в канделах, поэтому домножаем на квадрат расстояния: подвинув
  // источник, вы меняете характер света, но не экспозицию кадра.
  light.intensity = keySource.irradiance * options.intensityScale * distance * distance;

  return light;
}
