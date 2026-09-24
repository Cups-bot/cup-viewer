// Общее состояние страницы: вьювер и вкладка «Развёртка».
//
// У страницы два входа — js/main.js (сцена) и js/ui/stage.js (вкладки,
// развёртка). Через window они друг друга не ищут: глобальное имя может занять
// чужой скрипт и подменить поведение вьювера.
//
// Модуль ES — singleton в пределах документа: оба входа импортируют этот файл и
// получают один и тот же объект, ничего не публикуя наружу.

const viewerWaiters = new Set();

const state = {
  viewer: null,
  unwrap: null,
};

export function getViewer() {
  return state.viewer;
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

export function setUnwrap(view) {
  state.unwrap = view;
  state.viewer?.attachUnwrap(view);
}
