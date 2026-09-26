// Маленький каталог для unit-тестов: проходит валидатор целиком.
import { createCatalog } from '../../js/catalog/catalog.js';

export function model({ id, type, compat, def }) {
  return {
    id,
    name: id,
    type,
    wall: 'single',
    volumeMl: 280,
    file: `assets/${id}.glb`,
    size: { heightMm: 88, topMm: 80, bottomMm: 57 },
    textureMapping: { materials: ['Paper_Print'], uv: 0, sheet: false, unwrapMm: [300, 210], seamDeg: 180 },
    materialCompatibility: compat,
    defaultMaterial: def,
    printType: 'offset',
    searchTerms: ['бумажный'],
  };
}

export function rawCatalog() {
  return {
    materials: {
      materials: [
        { id: 'coated', name: 'Мелованный', kind: 'paper', params: { roughness: 0.18 } },
        { id: 'uncoated', name: 'Немелованный', kind: 'paper', params: { roughness: 0.85 } },
        { id: 'pp-frosted', name: 'PP', kind: 'plastic', params: { roughness: 0.62 } },
      ],
    },
    models: {
      models: [
        model({ id: 'HB80-280', type: 'paper', compat: ['coated', 'uncoated'], def: 'uncoated' }),
        model({ id: 'PP-500', type: 'pp', compat: ['pp-frosted'], def: 'pp-frosted' }),
      ],
    },
    backgrounds: {
      backgrounds: [
        { id: 'light', name: 'Light', color: '#ffffff', sweep: 0.07, client: true },
        { id: 'gray', name: 'Gray', color: '#777777', sweep: 0.07 },
      ],
    },
    scenes: { scenes: [{ id: 'living', name: 'Гостиная', maxCups: 2, presets: [{ id: 'front', label: 'Как в сцене' }] }] },
    brands: {
      brands: [
        { id: 'mycups', name: 'MyCups', title: 'MyCups', logo: 'a.svg', favicon: 'b.svg', accent: '#e8290c' },
      ],
    },
  };
}

export const catalog = () => createCatalog(rawCatalog());
