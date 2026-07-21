import { CONFIG } from './config.js';
import { Viewer } from './Viewer.js';

// Точка входа. Запускает просмотрщик и открывает небольшой публичный API,
// чтобы модель или текстуру можно было сменить одной строкой из консоли:
//   loadModel('assets/models/8cups.glb');
//   replaceTexture('assets/textures/mockup.jpg');
//   setRoughness(0.6);   // 0 — зеркало, 1 — матовая
// Для постоянных изменений правьте js/config.js.
function bootstrap() {
  const container = document.getElementById('canvas-container');
  if (!container) throw new Error('Нет элемента #canvas-container');

  const viewer = new Viewer(container, CONFIG);
  viewer.start();

  window.cupViewer = viewer;
  window.loadModel = (url) => viewer.loadModel(url);
  window.replaceTexture = (url) => viewer.textureManager.replaceTexture(url);
  window.setRoughness = (roughness) => viewer.setSurfaceFinish({ roughness });
  window.setMetalness = (metalness) => viewer.setSurfaceFinish({ metalness });
  window.describeSun = () => viewer.describeSun();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap, { once: true });
} else {
  bootstrap();
}
