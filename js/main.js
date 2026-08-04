import { CONFIG } from './config.js';
import { Viewer } from './Viewer.js';
import { loadOrder, readLocalOrder, resolveOrder } from './data/order.js';
import { renderOrderPanel } from './ui/orderPanel.js';
import { setViewer, setOrder, getOrder } from './appState.js';
// Интерфейс страницы согласования (вкладки, чек-лист, правки, подсказка).
// Подключается импортом, а не вторым тегом <script>: так вся страница
// собирается в один файл и общее состояние гарантированно одно на всех.
import './ui/approval.js';

// Точка входа. Поднимает просмотрщик, забирает данные заказа (Битрикс, endpoint
// или значения по умолчанию — см. js/data/order.js) и применяет их: модель по
// номенклатуре, дизайн, шероховатость по типу картона, правая панель.
//
// Отладочный API публикуется в window.cupViewer только там, где это разрешено
// config.security.debugApi (по умолчанию — на localhost):
//   cupViewer.order                        // что применилось
//   cupViewer.applyOrder({ paper: 'coated' })
//   cupViewer.applyOrder({ sku: 'DW90-430' })
//   cupViewer.setRoughness(0.35)           // 0 — зеркало, 1 — матовая
//   cupViewer.describeSun()
// Для постоянных изменений правьте js/config.js и js/data/.

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

  // Правую панель заполняем первым делом, ещё до сцены: тексты уже известны
  // (умолчания + напечатанный в страницу заказ), и пустых полей быть не должно.
  // Если заказ придёт с сервера, панель перерисуется данными оттуда.
  renderOrderPanel(readLocalOrder(CONFIG));

  const viewer = new Viewer(container, CONFIG);
  setViewer(viewer);
  if (debugAllowed(CONFIG)) publishDebugApi(viewer);

  // Данные читаем параллельно с подъёмом сцены — HDRI грузится дольше.
  const [order] = await Promise.all([loadOrder(CONFIG), viewer.startEnvironment()]);
  await applyOrder(viewer, order);
}

// Применяет заказ к сцене и к странице. Вызывается и на старте, и из консоли.
async function applyOrder(viewer, order) {
  viewer.setOrder(order);
  // Развёртка и другие части интерфейса ждут этого события.
  setOrder(order);

  renderOrderPanel(order);

  await viewer.loadModel(order.model);
  // Шероховатость ставится после модели: загрузка сбрасывает материалы.
  viewer.setSurfaceFinish({ roughness: order.roughness });
  await viewer.applyTexture(order.texture);

  return order;
}

// Отладочный API. Патч накладывается на ИСХОДНЫЕ значения заказа (order.input),
// после чего справочники прогоняются заново — иначе applyOrder({ paper: … })
// меняло бы поле, но не шероховатость, а applyOrder({ sku: … }) — не модель.
function publishDebugApi(viewer) {
  window.cupViewer = {
    viewer,
    get order() {
      return getOrder();
    },
    applyOrder: (patch) => applyOrder(viewer, resolveOrder({ ...getOrder()?.input, ...patch })),
    loadModel: (url) => viewer.loadModel(url),
    replaceTexture: (url) => viewer.applyTexture(url),
    setRoughness: (roughness) => viewer.setSurfaceFinish({ roughness }),
    setMetalness: (metalness) => viewer.setSurfaceFinish({ metalness }),
    describeSun: () => viewer.describeSun(),
    // Показать только карту затенения складок: так удобно подбирать
    // quality.ambientOcclusion.radius и scale в js/config.js.
    debugAO: (on = true) => viewer.pipeline.showAmbientOcclusionOnly(on),
  };
}

// Сцена не поднялась — клиент не должен смотреть в пустой прямоугольник без
// объяснений. Раньше промис bootstrap() никто не обрабатывал: при переименовании
// любого id в шаблоне страница молча оставалась пустой.
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
    'Если 3D не появится и после обновления страницы, сообщите менеджеру.';

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
