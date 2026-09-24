// Сессия Design Mode (§11): какой стакан, материал и фон стояли в прошлый раз.
// Макет не сохраняется — он живёт только в памяти вкладки.
//
// localStorage может быть недоступен (приватный режим, запрет cookies) —
// тогда страница просто открывается с пустой сценой.

const KEY = 'cv.session.v1';

export function loadSession(catalog) {
  let saved = null;
  try {
    saved = JSON.parse(localStorage.getItem(KEY) ?? 'null');
  } catch {
    return {};
  }
  if (!saved || typeof saved !== 'object') return {};
  // Каталог мог измениться с прошлого раза: неизвестное пропускаем.
  const model = catalog.model(saved.modelId);
  const session = {};
  if (model) {
    session.modelId = model.id;
    if (model.materialCompatibility.includes(saved.materialId)) session.materialId = saved.materialId;
  }
  if (catalog.background(saved.backgroundId)) session.backgroundId = saved.backgroundId;
  return session;
}

export function saveSession({ modelId, materialId, backgroundId }) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ modelId, materialId, backgroundId }));
  } catch {
    // Сохранить не вышло — в следующий раз откроется пустая сцена.
  }
}
