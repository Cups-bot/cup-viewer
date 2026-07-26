import { CONFIG } from './config.js';
import { Viewer } from './Viewer.js';
import { loadOrder } from './data/order.js';
import { renderOrderPanel } from './ui/orderPanel.js';

// Точка входа. Поднимает просмотрщик, забирает данные заказа (Битрикс, endpoint
// или значения по умолчанию — см. js/data/order.js) и применяет их: модель по
// номенклатуре, дизайн, шероховатость по типу картона, правая панель.
//
// Небольшой публичный API для консоли:
//   loadModel('assets/models/8cups.glb');
//   replaceTexture('assets/textures/design.png');
//   setRoughness(0.6);        // 0 — зеркало, 1 — матовая
//   applyOrder({ paper: 'uncoated' });   // подмена данных на лету
// Для постоянных изменений правьте js/config.js и js/data/.
async function bootstrap() {
  const container = document.getElementById('canvas-container');
  if (!container) throw new Error('Нет элемента #canvas-container');

  const viewer = new Viewer(container, CONFIG);
  window.cupViewer = viewer;
  window.loadModel = (url) => viewer.loadModel(url);
  window.replaceTexture = (url) => viewer.textureManager.replaceTexture(url);
  window.setRoughness = (roughness) => viewer.setSurfaceFinish({ roughness });
  window.setMetalness = (metalness) => viewer.setSurfaceFinish({ metalness });
  window.describeSun = () => viewer.describeSun();
  window.applyOrder = (patch) => applyOrder(viewer, { ...window.cupOrder, ...patch });

  // Данные читаем параллельно с подъёмом сцены — HDRI грузится дольше.
  const [order] = await Promise.all([loadOrder(CONFIG), viewer.startEnvironment()]);
  await applyOrder(viewer, order);
}

// Применяет заказ к сцене и к странице. Вызывается и на старте, и из консоли.
async function applyOrder(viewer, order) {
  window.cupOrder = order;
  // Развёртка и другие части интерфейса ждут этого события.
  window.dispatchEvent(new CustomEvent('cup:order', { detail: order }));

  renderOrderPanel(order);

  await viewer.loadModel(order.model);
  // Шероховатость ставится после модели: загрузка сбрасывает материалы.
  viewer.setSurfaceFinish({ roughness: order.roughness });
  await viewer.applyTexture(order.texture);

  return order;
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap, { once: true });
} else {
  bootstrap();
}
