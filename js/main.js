import { CONFIG } from './config.js';
import { Viewer } from './Viewer.js';
import { DEFAULT_PAPER } from './data/catalog.js';
import { findCup } from './data/models.js';
import { setViewer } from './appState.js';
// Вкладки, фото-сцены, развёртка и подсказка. Подключается импортом, а не
// вторым тегом <script>: так вся страница собирается в один файл и общее
// состояние гарантированно одно на всех.
import './ui/stage.js';

// Точка входа: поднимает просмотрщик и ставит стартовый стакан с чистым листом.
//
// Отладочный API публикуется в window.cupViewer только там, где это разрешено
// config.security.debugApi (по умолчанию — на localhost):
//   cupViewer.selectCup('PP-500')          // другой стакан, как из списка
//   cupViewer.selectPaper('coated')        // другой картон
//   cupViewer.setRoughness(0.35)           // 0 — зеркало, 1 — матовая
//   cupViewer.setRelief(0.3)               // сила фактуры картона
//   cupViewer.describeKeyLight()
// Для постоянных изменений правьте js/config.js и js/data/.

// С какого стакана открывается страница.
const START_CUP_ID = 'DW80-280';

function debugAllowed(config) {
  const mode = config.security?.debugApi ?? 'never';
  if (mode === 'always') return true;
  if (mode === 'never') return false;
  const { hostname } = window.location;
  return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]';
}

async function bootstrap() {
  const container = document.getElementById('canvas-container');
  if (!container) throw new Error('Нет элемента #canvas-container');

  const viewer = new Viewer(container, CONFIG);
  setViewer(viewer);
  if (debugAllowed(CONFIG)) publishDebugApi(viewer);

  await viewer.startEnvironment();
  const cup = findCup(START_CUP_ID);
  await viewer.loadModel(cup.file, cup);
  // Картон ставится после модели: загрузка сбрасывает материалы.
  viewer.selectPaper(DEFAULT_PAPER);
  await viewer.applyTexture(null);
}

function publishDebugApi(viewer) {
  window.cupViewer = {
    viewer,
    loadModel: (url) => viewer.loadModel(url),
    selectCup: (id) => viewer.selectCup(id),
    selectPaper: (key) => viewer.selectPaper(key),
    replaceTexture: (url) => viewer.applyTexture(url),
    setRoughness: (roughness) => viewer.setSurfaceFinish({ roughness }),
    setMetalness: (metalness) => viewer.setSurfaceFinish({ metalness }),
    setRelief: (relief) => viewer.setSurfaceFinish({ relief }),
    setReliefScale: (reliefScale) => viewer.setSurfaceFinish({ reliefScale }),
    describeKeyLight: () => viewer.describeKeyLight(),
    // Показать только карту затенения складок: так удобно подбирать
    // quality.ambientOcclusion.radius и scale в js/config.js.
    debugAO: (on = true) => viewer.pipeline.showAmbientOcclusionOnly(on),
  };
}

// Сцена не поднялась — человек не должен смотреть в пустой прямоугольник без
// объяснений.
function showStartupFailure(error) {
  console.error('Просмотрщик не запустился:', error);

  const host = document.getElementById('stage') ?? document.body;
  if (host.querySelector('.startup-error')) return;

  const box = document.createElement('div');
  box.className = 'startup-error';
  box.setAttribute('role', 'alert');

  const title = document.createElement('p');
  title.className = 'startup-error__title';
  title.textContent = 'Не удалось показать 3D-модель';

  const text = document.createElement('p');
  text.className = 'startup-error__text';
  text.textContent =
    'Проверьте вкладку «Развёртка» — макет там открывается плоско. ' +
    'Если 3D не появится и после обновления страницы, напишите разработчику.';

  box.append(title, text);
  host.appendChild(box);
}

function start() {
  bootstrap().catch(showStartupFailure);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start, { once: true });
} else {
  start();
}
