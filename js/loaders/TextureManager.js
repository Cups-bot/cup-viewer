import * as THREE from 'three';

// Управляет base-color текстурой текущей модели: меняет её на месте (без
// перезагрузки модели), целится в меши, помеченные ModelLoader как texturable,
// и освобождает созданные им ранее текстуры, чтобы не течь по памяти GPU.
export class TextureManager {
  constructor({ modelLoader, config, maxAnisotropy = 1 }) {
    this.modelLoader = modelLoader;
    this.config = config;
    this.maxAnisotropy = maxAnisotropy;
    this.loader = new THREE.TextureLoader();
    // Текстуры, созданные этим менеджером, — для последующего освобождения.
    this.ownedTextures = new Set();
  }

  // Грузит текстуру по любому URL (http, blob: или data:).
  loadTexture(url) {
    return new Promise((resolve, reject) => {
      this.loader.load(
        url,
        (texture) => resolve(this.#configure(texture)),
        undefined,
        () => reject(new Error(`Не удалось загрузить текстуру "${url}"`)),
      );
    });
  }

  // Грузит текстуру из выбранного файла. Через blob-URL, который сразу
  // отзывается, — дешевле base64.
  async loadFromFile(file) {
    if (!file.type.startsWith('image/')) {
      throw new Error(`"${file.name}" не является изображением`);
    }
    const url = URL.createObjectURL(file);
    try {
      return await this.loadTexture(url);
    } finally {
      URL.revokeObjectURL(url);
    }
  }

  // Ставит текстуру как base-color каждого texturable-меша. Возвращает число
  // обновлённых материалов.
  applyTexture(texture) {
    const meshes = this.modelLoader.texturableMeshes;
    if (meshes.length === 0) return 0;

    let updated = 0;
    for (const mesh of meshes) {
      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      for (const material of materials) {
        if (!material.map) continue;
        this.#disposeOwned(material.map);
        material.map = texture;
        material.needsUpdate = true;
        updated++;
      }
    }
    return updated;
  }

  // Загрузить текстуру по URL и применить одним вызовом.
  async replaceTexture(url) {
    return this.applyTexture(await this.loadTexture(url));
  }

  // Общие для всех текстур настройки цветового пространства и заворачивания.
  #configure(texture) {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    // UV в glTF авторизованы по конвенции WebGL — не переворачиваем.
    texture.flipY = false;
    texture.anisotropy = this.maxAnisotropy;
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    this.ownedTextures.add(texture);
    return texture;
  }

  // Освобождает текстуру, только если её создал этот менеджер (не исходную).
  #disposeOwned(texture) {
    if (this.ownedTextures.has(texture)) {
      texture.dispose();
      this.ownedTextures.delete(texture);
    }
  }

  // Освобождает все текстуры, которыми владеет менеджер.
  dispose() {
    for (const texture of this.ownedTextures) texture.dispose();
    this.ownedTextures.clear();
  }
}
