// Матрица кадров render:check. Модели — 1 бумажная и 1 PP (PET в каталоге
// нет) × материалы, которые реально есть у каждой × 2 ракурса; плюс кадр
// фото-сцены и кадр развёртки.

// front — студийный вид по умолчанию; top — сверху-сбоку: кромка и контактная тень.
export const FRAMES = [
  { id: 'paper-coated-front', model: 'HB80-280', material: 'coated', view: 'front', fixture: 'patches' },
  { id: 'paper-coated-top', model: 'HB80-280', material: 'coated', view: 'top', fixture: 'lines' },
  { id: 'paper-uncoated-front', model: 'HB80-280', material: 'uncoated', view: 'front', fixture: 'patches' },
  { id: 'paper-uncoated-top', model: 'HB80-280', material: 'uncoated', view: 'top', fixture: 'lines' },
  { id: 'pp-frosted-front', model: 'BM90-500', material: 'pp-frosted', view: 'front', fixture: 'patches' },
  { id: 'pp-frosted-top', model: 'BM90-500', material: 'pp-frosted', view: 'top', fixture: 'lines' },
  { id: 'scene-cafe', model: 'HB80-280', material: 'uncoated', view: 'scene', scene: 'cafe', fixture: 'gradient' },
  { id: 'unwrap', model: 'HB80-280', material: 'uncoated', view: 'unwrap', fixture: 'lines' },
  // Экспорт (§20, бриф 05 п. 3): окно другого размера, кадр 1600×1200 через
  // renderStill — должен совпасть с экранным кадром по порогам §58.
  {
    id: 'export-still',
    model: 'HB80-280',
    material: 'coated',
    view: 'export',
    fixture: 'patches',
    container: [1100, 800],
    compareTo: 'paper-coated-front',
  },
];

// Кандидаты — кадры новых материалов (этап 04). В сравнение не входят, пока
// человек не дал «ок» на эталоны: npm run render:candidates снимает их в
// tests/render/candidates/. PET-моделей в каталоге нет — PET clear снимается
// на геометрии BM90-500 как замена.
export const CANDIDATE_FRAMES = [
  { id: 'paper-softtouch-front', model: 'HB80-280', material: 'soft-touch', view: 'front', fixture: 'patches' },
  { id: 'paper-softtouch-top', model: 'HB80-280', material: 'soft-touch', view: 'top', fixture: 'lines' },
  { id: 'paper-kraft-front', model: 'HB80-280', material: 'kraft', view: 'front', fixture: 'patches' },
  { id: 'paper-kraft-top', model: 'HB80-280', material: 'kraft', view: 'top', fixture: 'lines' },
  { id: 'pet-clear-front', model: 'BM90-500', material: 'pet-clear', view: 'front', fixture: 'patches' },
  { id: 'pet-clear-top', model: 'BM90-500', material: 'pet-clear', view: 'top', fixture: 'lines' },
];

export const CANVAS = { width: 1600, height: 1200 };

// Пороги §58.
export const THRESHOLDS = { diffShare: 0.001, meanDeltaE: 0.5, p99DeltaE: 2.0, pixelmatch: 0.1 };
