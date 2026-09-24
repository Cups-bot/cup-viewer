import { validateCatalog } from './validate.js';

// Каталог в памяти: проверенные записи и поиск по id.
export function createCatalog(raw) {
  const { models, materials, backgrounds, scenes, brands, errors } = validateCatalog(raw);
  const index = (list) => new Map(list.map((item) => [item.id, item]));
  const byModel = index(models);
  const byMaterial = index(materials);
  const byBackground = index(backgrounds);
  const byScene = index(scenes);
  const byBrand = index(brands);

  // Стакан, с которого открывается Design Mode без сессии (§11).
  const wanted = raw.models?.defaultModel;
  const defaultModelId = byModel.has(wanted) ? wanted : (models[0]?.id ?? null);

  return Object.freeze({
    defaultModelId,
    models,
    materials,
    backgrounds,
    scenes,
    brands,
    errors,
    model: (id) => byModel.get(id) ?? null,
    material: (id) => byMaterial.get(id) ?? null,
    background: (id) => byBackground.get(id) ?? null,
    scene: (id) => byScene.get(id) ?? null,
    brand: (id) => byBrand.get(id) ?? null,
    materialsFor: (modelId) =>
      (byModel.get(modelId)?.materialCompatibility ?? []).map((id) => byMaterial.get(id)),
  });
}

export const CATALOG_FILES = {
  models: 'catalog/models.json',
  materials: 'catalog/materials.json',
  backgrounds: 'catalog/backgrounds.json',
  scenes: 'catalog/scenes/index.json',
  brands: 'catalog/brands.json',
};

// Путь к папке сцены: там scene.json и её ассеты (§18).
export const sceneFolder = (id) => `catalog/scenes/${id}`;

// Загружает все файлы каталога. Файл, который не пришёл, — ошибка в консоль,
// а не исключение: без брендов, например, Design Mode работает.
export async function loadCatalog(fetchImpl = fetch) {
  const entries = await Promise.all(
    Object.entries(CATALOG_FILES).map(async ([key, url]) => {
      try {
        const response = await fetchImpl(url, { credentials: 'same-origin' });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return [key, await response.json()];
      } catch (error) {
        console.error(`Каталог ${url} не загрузился: ${error.message}`);
        return [key, undefined];
      }
    }),
  );
  const catalog = createCatalog(Object.fromEntries(entries));
  for (const message of catalog.errors) console.error(`Каталог: ${message}`);
  return catalog;
}
