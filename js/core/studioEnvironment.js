import * as THREE from 'three';

// Студийное окружение для отражений — то, что раньше давал файл HDRI.
//
// ЗАЧЕМ ЭТО ВООБЩЕ НУЖНО. Блик на мелованном картоне — это не «свет», а
// ОТРАЖЕНИЕ окружающих предметов. Точечная лампа отражается в глянце как точка,
// и поверхность читается как пластик. Настоящий предметный фотограф ставит
// софтбоксы — большие светящиеся прямоугольники, — и глянец отражает их
// вытянутыми мягкими полосами. Именно эти полосы мозг опознаёт как «лощёная
// бумага». Поэтому окружение убирать нельзя: без него мелованный и немелованный
// картон будут выглядеть одинаково.
//
// ПОЧЕМУ НЕ ФАЙЛ. Панорама реального помещения весит мегабайты и тянет за собой
// случайные детали: окна, мебель, цветные стены — они отражаются в стакане и
// пачкают цвет макета. Студия, собранная из нескольких прямоугольников, весит
// НОЛЬ байт, даёт чистый нейтральный свет и полностью управляема: подвинуть
// софтбокс — одна строка ниже.
//
// Сцена собирается один раз, прогоняется через PMREMGenerator (он раскладывает
// её по уровням шероховатости) и дальше не существует — в памяти остаётся
// только небольшая кубическая карта.

// ── Раскладка студии ──────────────────────────────────────────────────────
// Координаты в условных единицах; важно только направление и угловой размер,
// потому что карта снимается из одной точки. Камера смотрит на стакан
// со стороны +Z, поэтому «перед» — это +Z.
//
// intensity — яркость. Значения больше 1 законны: карта хранится в формате с
// расширенным диапазоном, и именно превышение единицы даёт настоящий блик.

// Фон вокруг: задаёт общий уровень заполняющего света.
const SURROUND = {
  // Верх светлее низа — из-за этого у цилиндра появляется вертикальный градиент,
  // и он перестаёт выглядеть плоской вырезкой.
  //
  // Уровень намеренно низкий. Ровный сильный фон со всех сторон освещает и
  // освещённую, и теневую сторону одинаково — предмет становится плоской
  // белой вырезкой. Форму даёт разница между ключевым софтбоксом и фоном,
  // поэтому фон держим слабым, а перепад — большим.
  ceiling: 0.32,
  walls: 0.1,
  floor: 0.03,
  size: 14,
};

// Софтбоксы. rotationY — поворот вокруг вертикали в градусах: 0 — панель
// смотрит на стакан спереди, 90 — слева, -90 — справа.
const SOFTBOXES = [
  // Ключевой: крупный, слева-сверху-спереди. Даёт основную форму и главный блик.
  // Высота подъёма (elevation) заодно задаёт, куда ляжет контактная тень: чем
  // выше источник, тем ближе тень поджата к основанию. На 28° стакан отбрасывал
  // тень почти в полкадра и выглядел висящим.
  { name: 'key', width: 4, height: 6, distance: 6, rotationY: 38, elevation: 52, intensity: 11 },

  // Заполняющий: справа, крупнее и слабее — снимает провал в тенях, но своего
  // выраженного блика не даёт.
  { name: 'fill', width: 7, height: 7, distance: 7, rotationY: -58, elevation: 8, intensity: 0.8 },

  // Контровой сзади-сверху: обводит силуэт светлым кантом и отделяет стакан
  // от фона.
  { name: 'rim', width: 5, height: 3, distance: 6, rotationY: 168, elevation: 42, intensity: 6 },

  // Две узкие вертикальные полосы. Ради них всё и затевалось: на глянце они
  // отражаются длинными чёткими штрихами вдоль стенки стакана — тот самый
  // признак лощёной бумаги. На немелованном картоне (roughness 0.8) они
  // размазываются в еле заметное свечение, и разница между картонами видна.
  { name: 'streak-l', width: 0.5, height: 8, distance: 5, rotationY: 72, elevation: 12, intensity: 14 },
  { name: 'streak-r', width: 0.35, height: 7, distance: 5, rotationY: -30, elevation: 18, intensity: 10 },
];

// Материал светящейся панели: обычный «безразличный к свету» материал, чей цвет
// поднят выше единицы. Так же устроены студийные окружения в самом three.js.
function panelMaterial(intensity) {
  const material = new THREE.MeshBasicMaterial();
  material.color.setScalar(intensity);
  material.side = THREE.DoubleSide;
  return material;
}

function addPanel(scene, box) {
  const { width, height, distance, rotationY, elevation, intensity } = box;
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(width, height), panelMaterial(intensity));

  const azimuth = THREE.MathUtils.degToRad(rotationY);
  const pitch = THREE.MathUtils.degToRad(elevation);

  // Панель ставится на сферу вокруг центра и разворачивается лицом к центру.
  mesh.position.set(
    Math.sin(azimuth) * Math.cos(pitch) * distance,
    Math.sin(pitch) * distance,
    Math.cos(azimuth) * Math.cos(pitch) * distance,
  );
  mesh.lookAt(0, 0, 0);
  mesh.name = box.name;
  scene.add(mesh);
  return mesh;
}

// Коробка вокруг сцены. Грани разной яркости — отсюда градиент «светлее сверху».
function addSurround(scene) {
  const { size, ceiling, walls, floor } = SURROUND;
  const half = size / 2;

  const faces = [
    { intensity: ceiling, position: [0, half, 0], rotation: [Math.PI / 2, 0, 0] },
    { intensity: floor, position: [0, -half, 0], rotation: [-Math.PI / 2, 0, 0] },
    { intensity: walls, position: [0, 0, -half], rotation: [0, 0, 0] },
    { intensity: walls * 0.85, position: [0, 0, half], rotation: [0, Math.PI, 0] },
    { intensity: walls * 1.1, position: [-half, 0, 0], rotation: [0, Math.PI / 2, 0] },
    { intensity: walls * 0.9, position: [half, 0, 0], rotation: [0, -Math.PI / 2, 0] },
  ];

  for (const face of faces) {
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(size, size), panelMaterial(face.intensity));
    mesh.position.set(...face.position);
    mesh.rotation.set(...face.rotation);
    scene.add(mesh);
  }
}

// Описание «солнца» студии для контактной тени.
//
// Тень под стаканом умеет подстраиваться под источник света: направление, ширину
// полутени и плотность она берёт из этого объекта (см. core/contactShadow.js).
// Раньше эти числа искались в панораме перебором пикселей; здесь ключевой
// софтбокс известен заранее, поэтому они просто считаются из его раскладки.
function describeKeyLight() {
  const key = SOFTBOXES[0];
  const azimuth = THREE.MathUtils.degToRad(key.rotationY);
  const pitch = THREE.MathUtils.degToRad(key.elevation);

  const direction = new THREE.Vector3(
    Math.sin(azimuth) * Math.cos(pitch),
    Math.sin(pitch),
    Math.cos(azimuth) * Math.cos(pitch),
  ).normalize();

  // Угловой радиус источника: чем крупнее софтбокс относительно расстояния, тем
  // мягче край тени. Диск равной площади с прямоугольником.
  const angularRadius = Math.atan(Math.sqrt((key.width * key.height) / Math.PI) / key.distance);

  // Отношение «ключ / общий уровень» задаёт плотность тени: у студии с мягким
  // заполнением тень не должна быть угольно-чёрной.
  const ambient = (SURROUND.ceiling + SURROUND.walls * 4 + SURROUND.floor) / 6;

  return {
    direction,
    color: new THREE.Color(1, 1, 1),
    irradiance: key.intensity,
    angularRadius,
    peak: key.intensity,
    mean: ambient,
  };
}

// Собирает студию, прогоняет её через PMREM и ставит источником освещения сцены.
// Возвращает то же, что загрузка панорамы: карту и описание ключевого света —
// поэтому всё, что ниже по течению, менять не пришлось.
export function loadStudioEnvironment(scene, renderer, config) {
  const studio = new THREE.Scene();
  addSurround(studio);
  for (const box of SOFTBOXES) addPanel(studio, box);

  const pmrem = new THREE.PMREMGenerator(renderer);
  pmrem.compileEquirectangularShader();
  // sigma = 0: панели уже мягкие сами по себе, дополнительное размытие только
  // съело бы чёткость узких полос-бликов.
  const envMap = pmrem.fromScene(studio, 0, 0.1, 100).texture;
  pmrem.dispose();

  // Сцена-студия больше не нужна: карта снята.
  studio.traverse((node) => {
    if (node.isMesh) {
      node.geometry.dispose();
      node.material.dispose();
    }
  });

  scene.environment = envMap;
  if ('environmentIntensity' in scene) {
    scene.environmentIntensity = config.lighting.environmentIntensity;
  }

  return { envMap, sun: describeKeyLight() };
}
