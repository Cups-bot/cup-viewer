// Общее состояние страницы: вьювер, текущий заказ и вкладка «Развёртка».
//
// У страницы два входа — js/main.js (сцена и данные) и js/ui/approval.js
// (интерфейс согласования). Раньше они находили друг друга через window:
// approval.js в цикле опрашивал window.cupViewer, Viewer дотягивался до
// window.cupUnwrap, заказ лежал в window.cupOrder. На чужой странице (а страница
// Битрикса — чужая) это и конфликт имён, и возможность подменить поведение
// вьювера сторонним скриптом.
//
// Модуль ES — singleton в пределах документа: оба входа импортируют этот файл и
// получают один и тот же объект, ничего не публикуя наружу.

const viewerWaiters = new Set();
const orderListeners = new Set();

const state = {
  viewer: null,
  order: null,
  unwrap: null,
};

export function getViewer() {
  return state.viewer;
}

export function getOrder() {
  return state.order;
}

export function getUnwrap() {
  return state.unwrap;
}

// Вызывает callback, когда вьювер появится — сразу, если он уже есть.
// Замена опросу через requestAnimationFrame: тот не срабатывал вовсе, если
// ссылку открыли в фоновой вкладке (браузер не выдаёт там кадры).
export function whenViewer(callback) {
  if (state.viewer) {
    callback(state.viewer);
    return;
  }
  viewerWaiters.add(callback);
}

export function setViewer(viewer) {
  state.viewer = viewer;
  // Развёртка могла подняться раньше сцены — тогда связываем их здесь.
  if (state.unwrap) viewer.attachUnwrap(state.unwrap);
  for (const callback of viewerWaiters) callback(viewer);
  viewerWaiters.clear();
}

// Подписка на заказ. Если заказ уже применён, callback вызывается немедленно —
// порядок загрузки модулей на это влиять не должен.
export function onOrder(callback) {
  orderListeners.add(callback);
  if (state.order) callback(state.order);
  return () => orderListeners.delete(callback);
}

export function setOrder(order) {
  state.order = order;
  for (const callback of orderListeners) callback(order);
}

export function setUnwrap(view) {
  state.unwrap = view;
  state.viewer?.attachUnwrap(view);
}
