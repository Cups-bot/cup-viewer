import * as THREE from 'three';
import { blankSheetUrl } from '../utils/blankSheet.js';

// Управляет base-color текстурой текущей модели: меняет её на месте (без
// перезагрузки модели), целится в материалы, отмеченные ModelLoader как
// печатные, и освобождает созданные им ранее текстуры, чтобы не течь по памяти
// GPU.
//
// Куда именно ложится макет — на какие материалы и на какой UV-набор — решает
// каталог моделей (js/data/models.js); сюда это приходит через ModelLoader.

// Поле вокруг макета на «печатном листе» — доля стороны с каждого края.
// Десяти процентов хватает с запасом: у пластикового стакана геометрия вокруг
// печатного прямоугольника уходит по UV примерно на 0.2 за его границу.
const SHEET_MARGIN = 0.1;

// Сторона листа, на котором печатать нечего. От такой текстуры нужна одна
// прозрачность — растру хватает нескольких пикселей.
const EMPTY_SHEET_PX = 64;

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
    const sheet = this.modelLoader.print?.sheet === true;
    // На «печатном листе» макет занимает не весь растр, а его середину, поэтому
    // ужимаем его заранее: лист вместе с полями обязан уложиться в тот же
    // потолок стороны.
    const limit = sheet ? Math.round(this.maxSize * (1 - 2 * SHEET_MARGIN)) : this.maxSize;

    // Пустой лист на печатный лист не кладётся вовсе: печати нет — значит и
    // краски на стенке нет, остаётся один материал. Для картона это ничего не
    // меняет (лист там обычный белый), а у пластика даёт чистую молочную стенку.
    const empty = sheet && url === blankSheetUrl();
    const image = empty ? null : await this.#loadImage(url, limit);

    const texture = new THREE.Texture(sheet ? this.#layOnSheet(image) : image);
    texture.needsUpdate = true;
    return this.#configure(texture);
  }

  // Кладёт макет на середину печатного листа и возвращает <canvas>.
  // image === null — печати нет, остаётся один лист.
  //
  // Нужно моделям с прямоугольной печатью (print.sheet в js/data/models.js): у
  // них вся непечатаемая геометрия — венчик, дно, рёбра расстыковки — отставлена
  // по UV за пределы макета. Без полей видеокарта размазала бы по ней крайний
  // пиксель макета, и у стакана появлялся бы цветной венчик неизвестно откуда.
  //
  // ЛИСТ НЕСЁТ ЕЩЁ И ПРОЗРАЧНОСТЬ — ту, с которой рисуется незапечатанная
  // стенка (modelLoader.wallOpacity). Так у полупрозрачного пластика печать
  // остаётся кроющей: под краской стенка глухая, рядом с ней — молочная. Если
  // бы прозрачность задавал материал, сквозь макет просвечивал бы фон, и цвет
  // печати менялся бы от фона к фону — ровно то, ради чего страницу и открывают.
  // У картона wallOpacity равна единице, и лист выходит обычным белым.
  #layOnSheet(image) {
    const wall = this.modelLoader.wallOpacity ?? 1;
    const inner = 1 - 2 * SHEET_MARGIN;

    const width = image ? image.naturalWidth ?? image.width : EMPTY_SHEET_PX;
    const height = image ? image.naturalHeight ?? image.height : EMPTY_SHEET_PX;

    const canvas = document.createElement('canvas');
    canvas.width = Math.round(width / inner);
    canvas.height = Math.round(height / inner);

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = `rgba(255, 255, 255, ${wall})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (image) {
      // Краска кроющая: там, где она есть, лист становится непрозрачным. Если в
      // макете есть собственная прозрачность (логотип на пустом фоне), сквозь
      // неё так и будет виден материал — как в жизни.
      ctx.drawImage(
        image,
        Math.round(canvas.width * SHEET_MARGIN),
        Math.round(canvas.height * SHEET_MARGIN),
        width,
        height,
      );
      // Исходный растр дальше не нужен: в видеопамять уедет лист.
      image.close?.();
    }

    return canvas;
  }

  // Декодирование с уменьшением. Основной путь — createImageBitmap: он
  // декодирует и масштабирует вне главного потока, поэтому крупный макет не
  // подвешивает страницу. Запасной — обычный <img> через TextureLoader.
  async #loadImage(url, limit) {
    // Картинку, нарисованную самой страницей (пустой лист — data:-адрес), через
    // fetch не забираем. Заголовок Content-Security-Policy чужой страницы
    // обычно разрешает connect-src только «self» и blob:, и такой запрос
    // отбивается браузером: в консоли клиента появляются две красные строки,
    // а картинка всё равно уезжает в запасной путь. Уменьшать её не нужно —
    // страница нарисовала ровно тот размер, который ей нужен.
    if (url.startsWith('data:')) return this.#loadImageElement(url);
    if (typeof createImageBitmap !== 'function') return this.#loadImageElement(url);

    try {
      const response = await fetch(url, { credentials: 'same-origin' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const blob = await response.blob();

      let bitmap = await createImageBitmap(blob);
      const longest = Math.max(bitmap.width, bitmap.height);
      if (longest <= limit) return bitmap;

      const scale = limit / longest;
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
      if (Math.max(bitmap.width, bitmap.height) > limit) {
        const drawn = this.#downscaleWithCanvas(bitmap, width, height);
        bitmap.close();
        bitmap = drawn;
      }

      console.info(
        `Макет уменьшен до ${bitmap.width}×${bitmap.height} для 3D ` +
          `(предел ${limit}px). Крупный исходник для проверки мелкого ` +
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

  // Ставит текстуру как base-color каждому печатному материалу модели.
  // Возвращает число обновлённых материалов.
  //
  // Список материалов собирает ModelLoader — по каталогу моделей или, если
  // каталог молчит, по наличию картинки в самом файле. Он же следит, чтобы
  // материал не попал в список дважды: два меша модели вполне могут ссылаться
  // на один экземпляр (обычное дело для GLB из Blender), и второй проход
  // принял бы уже назначенную новую текстуру за старую и освободил её с GPU —
  // стакан получался чёрным.
  applyTexture(texture) {
    const materials = this.modelLoader.printMaterials;
    if (materials.length === 0) return 0;

    let updated = 0;
    for (const material of materials) {
      if (material.map !== texture) {
        this.#disposeOwned(material.map);
        material.map = texture;
        // Материал мог прийти из файла вообще без картинки (так устроен
        // пластик): для него это не просто другая текстура, а другая программа
        // шейдера. Без needsUpdate он остался бы чистым.
        material.needsUpdate = true;
      }
      updated++;
    }
    return updated;
  }

  // Загрузить текстуру по URL и применить одним вызовом.
  async replaceTexture(url) {
    return this.applyTexture(await this.loadTexture(url));
  }

  // Общие для всех текстур настройки цветового пространства и заворачивания.
  // Плюс то, что зависит от модели: номер UV-набора и укладка на печатный лист.
  #configure(texture) {
    const print = this.modelLoader.print ?? {};

    texture.colorSpace = THREE.SRGBColorSpace;
    // Какой UV-набор читать: 0 — TEXCOORD_0, 1 — TEXCOORD_1. У пластикового
    // стакана их два: полная запечатка конусом и прямоугольная печать по стенке.
    texture.channel = print.uv ?? 0;

    if (print.sheet) {
      // Макет лежит в середине листа — сдвигаем и сжимаем выборку ровно на
      // поля, чтобы печатный прямоугольник модели совпал с ним встык. Всё, что
      // за прямоугольником, упирается в край листа, поэтому заворачивание здесь
      // «до края», а не по кругу: по кругу непечатаемая геометрия получила бы
      // кусок макета.
      const inner = 1 - 2 * SHEET_MARGIN;
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;
      texture.repeat.set(inner, inner);
      texture.offset.set(SHEET_MARGIN, SHEET_MARGIN);
    } else {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
    }
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
