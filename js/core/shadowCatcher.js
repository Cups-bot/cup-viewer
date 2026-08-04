import * as THREE from 'three';
import { HELPER_LAYER } from './layers.js';

// Плоскость, на которую падает тень от предмета.
//
// ПОЧЕМУ НЕ ПРЕЖНЯЯ «КОНТАКТНАЯ ТЕНЬ». Тот способ рисовал модель сверху в
// текстуру, размывал её и клал под стакан. Получалось мягкое пятно —
// приблизительно там, где надо, но это не тень: у неё нет источника, нет формы
// предмета в проекции и нет края. Ради направления её приходилось «сдвигать»
// матрицей, и от любого наклона она расплывалась в кляксу.
//
// Здесь тень настоящая: ключевой источник света рисует сцену со своей стороны,
// и всё, что от него закрыто, оказывается в тени. Отсюда и форма (проекция
// стакана, а не круглое пятно), и направление, и мягкий, но читаемый край.
//
// Плоскость невидима сама по себе: ShadowMaterial рисует ТОЛЬКО тень, в
// остальных местах остаётся прозрачным. Поэтому под стаканом не появляется
// «стол», а на фоне видна одна тень.

export function createShadowCatcher(config) {
  const options = config.shadowCatcher;

  const material = new THREE.ShadowMaterial();
  material.opacity = options.opacity;
  material.transparent = true;
  // Плоскость лежит в самом низу сцены; глубину она не пишет, чтобы не спорить
  // с затенением складок на подложке.
  material.depthWrite = false;

  const plane = new THREE.Mesh(new THREE.PlaneGeometry(options.size, options.size), material);
  plane.rotation.x = -Math.PI / 2;
  plane.receiveShadow = true;
  plane.renderOrder = -1;
  // Слой обвязки: расчёт затенения складок эту плоскость видеть не должен,
  // иначе она обводит стакан тёмным кольцом по фону (см. core/layers.js).
  plane.layers.set(HELPER_LAYER);
  plane.name = 'ShadowCatcher';

  return {
    plane,

    // Ставится на нижнюю точку модели.
    setHeight(y) {
      plane.position.y = y;
    },

    setOpacity(value) {
      material.opacity = value;
    },

    dispose() {
      plane.geometry.dispose();
      material.dispose();
      plane.removeFromParent();
    },
  };
}
