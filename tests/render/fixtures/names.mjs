// Имя файла фикстуры — общее для генератора (Node) и страницы съёмки (браузер).
export function fixtureName(modelId, kind) {
  return `${modelId}-${kind}.png`;
}
