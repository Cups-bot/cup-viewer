import * as THREE from 'three';

// Управляет base-color текстурой текущей модели: меняет её на месте (без
// перезагрузки модели), целится в меши, помеченные ModelLoader как texturable,
// и освобождает созданные им ранее текстуры, чтобы не течь по памяти GPU.
export class TextureManager {
  constructor({ modelLoader, config, maxAnisotropy = 1, maxTextureSize = 4096 }) {
    this.modelLoader = modelLoader;
    this.config = config;
    this.maxAnisotropy = maxAnisotropy;
    // Потолок стороны текстуры — меньшее из желаемого и аппаратно возможного.
    // Макеты приходят в печатном разрешении (7000 px по ширине — норма), а это
    // и сотни мегабайт видеопамяти, и превышение MAX_TEXTURE_SIZE на мобильных
    // GPU. Без явного ограничения three.js пережимает такую картинку сам —
    // но через <canvas> на главном потоке, с подвисанием интерфейса.
    this.maxSize = Math.min(config.texture?.maxSize ?? 2048, maxTextureSize);
    this.loader = new THREE.TextureLoader();
    // Текстуры, созданные этим менеджером, — для последующего освобождения.
    this.ownedTextures = new Set();
  }

  // Грузит текстуру по любому URL (http, blob: или data:) и приводит её к
  // размеру, который выдержит любое устройство.
  async loadTexture(url) {
    const image = await this.#loadImage(url);
    const texture = new THREE.Texture(image);
    texture.needsUpdate = true;
    return this.#configure(texture);
  }

  // Декодирование с уменьшением. Основной путь — createImageBitmap: он
  // декодирует и масштабирует вне главного потока, поэтому крупный макет не
  // подвешивает страницу. Запасной — обычный <img> через TextureLoader.
  async #loadImage(url) {
    if (typeof createImageBitmap !== 'function') return this.#loadImageElement(url);

    try {
      const response = await fetch(url, { credentials: 'same-origin' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const blob = await response.blob();

      let bitmap = await createImageBitmap(blob);
      const longest = Math.max(bitmap.width, bitmap.height);
      if (longest <= this.maxSize) return bitmap;

      const scale = this.maxSize / longest;
      const width = Math.max(1, Math.round(bitmap.width * scale));
      const height = Math.max(1, Math.round(bitmap.height * scale));

      const resized = await createImageBitmap(blob, {
        resizeWidth: width,
        resizeHeight: height,
        resizeQuality: 'high',
      });
      bitmap.close();
      bitmap = resized;

      // Часть браузеров молча игнорирует resize-опции — тогда дожимаем канвасом.
      if (Math.max(bitmap.width, bitmap.height) > this.maxSize) {
        const drawn = this.#downscaleWithCanvas(bitmap, width, height);
        bitmap.close();
        bitmap = drawn;
      }

      console.info(
        `Макет уменьшен до ${bitmap.width}×${bitmap.height} для 3D ` +
          `(предел ${this.maxSize}px). Крупный исходник для проверки мелкого ` +
          'текста передаётся полем "unwrap".',
      );
      return bitmap;
    } catch (error) {
      // Сеть, CORS или неподдерживаемый формат — пробуем обычным путём.
      console.warn(`Быстрое декодирование макета не удалось (${error.message}), грузим через <img>.`);
      return this.#loadImageElement(url);
    }
  }

  #downscaleWithCanvas(source, width, height) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(source, 0, 0, width, height);
    return canvas;
  }

  #loadImageElement(url) {
    return new Promise((resolve, reject) => {
      this.loader.load(
        url,
        (texture) => {
          const image = texture.image;
          texture.dispose();
          resolve(image);
        },
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
  //
  // Обход идёт по УНИКАЛЬНЫМ материалам, а не по мешам. Два меша модели вполне
  // могут ссылаться на один экземпляр материала (обычное дело для GLB из
  // Blender): при обходе по мешам второй проход видел бы в material.map уже
  // назначенную новую текстуру, считал её «старой» и освобождал с GPU — стакан
  // получался чёрным.
  applyTexture(texture) {
    const meshes = this.modelLoader.texturableMeshes;
    if (meshes.length === 0) return 0;

    const visited = new Set();
    let updated = 0;

    for (const mesh of meshes) {
      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      for (const material of materials) {
        if (!material || visited.has(material)) continue;
        visited.add(material);
        if (!material.map) continue;

        if (material.map !== texture) {
          this.#disposeOwned(material.map);
          material.map = texture;
          material.needsUpdate = true;
        }
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
      this.#release(texture);
      this.ownedTextures.delete(texture);
    }
  }

  // Texture.dispose() отпускает только GPU-ресурс. ImageBitmap живёт отдельно и
  // держит декодированный растр в памяти, пока его не закроют.
  #release(texture) {
    texture.dispose();
    const image = texture.image;
    if (image && typeof image.close === 'function') image.close();
  }

  // Освобождает все текстуры, которыми владеет менеджер.
  dispose() {
    for (const texture of this.ownedTextures) this.#release(texture);
    this.ownedTextures.clear();
  }
}
