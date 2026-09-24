// Матрица кадров render:check. Модели — 1 бумажная и 1 PP (PET в каталоге
// нет) × материалы, которые реально есть у каждой × 2 ракурса; плюс кадр
// фото-сцены и кадр развёртки.

// front — студийный вид по умолчанию; top — сверху-сбоку: кромка и контактная тень.
export const FRAMES = [
  { id: 'paper-coated-front', model: 'HB80-280', material: 'coated', view: 'front', fixture: 'patches' },
  { id: 'paper-coated-top', model: 'HB80-280', material: 'coated', view: 'top', fixture: 'lines' },
  { id: 'paper-uncoated-front', model: 'HB80-280', material: 'uncoated', view: 'front', fixture: 'patches' },
  { id: 'paper-uncoated-top', model: 'HB80-280', material: 'uncoated', view: 'top', fixture: 'lines' },
  { id: 'pp-frosted-front', model: 'PP-500', material: 'pp-frosted', view: 'front', fixture: 'patches' },
  { id: 'pp-frosted-top', model: 'PP-500', material: 'pp-frosted', view: 'top', fixture: 'lines' },
  { id: 'scene-cafe', model: 'HB80-280', material: 'uncoated', view: 'scene', scene: 'cafe', fixture: 'gradient' },
  { id: 'unwrap', model: 'HB80-280', material: 'uncoated', view: 'unwrap', fixture: 'lines' },
];

export const CANVAS = { width: 1600, height: 1200 };

// Пороги §58.
export const THRESHOLDS = { diffShare: 0.001, meanDeltaE: 0.5, p99DeltaE: 2.0, pixelmatch: 0.1 };
