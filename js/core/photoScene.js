import * as THREE from 'three';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { analyzeSun } from './environment.js';
import { SCENES_ROOT } from '../data/scenes.js';

// Фото-сцена: стакан стоит в настоящей снятой сцене, а не в студии из
// софтбоксов.
//
// КАК ЭТО УСТРОЕНО. Из Blender приезжают три вещи (их снимает
// 3D_plast/mockup/tools/export_web_scene.py):
//
//   backdrop   — кадр сцены БЕЗ стакана и без его тени;
//   env.hdr    — панорама из точки, где стакан стоял: это и есть свет сцены,
//                вместе с цветными отсветами и бликами;
//   scene.json — камера, плоскость пола и масштаб сцены.
//
// Браузер ставит камеру ровно туда, где она была в Blender, кладёт стакан на
// то же место в натуральную величину и освещает его панорамой. Тень и
// затенение у основания считаются здесь же, вживую: запечённая тень зависела
// бы от модели, и её пришлось бы переснимать под каждую позицию каталога.
//
// ПОЧЕМУ КАМЕРА НЕ ДВИГАЕТСЯ. Фон плоский. Любой поворот камеры — и он
// перестаёт совпадать с перспективой стакана. Поэтому в этом режиме крутится
// только сам стакан, а облёт выключен.

// Сцена, которая заметно выше, чем шире, берёт вертикальный кадр. Порог
// подобран так, чтобы телефон и узкий планшет получили его, а десктопная
// колонка — нет.
const TALL_FRAME_BELOW = 0.85;

// Загруженные сцены. Ключ — идентификатор, значение — промис: два быстрых
// переключения подряд не должны грузить одно и то же дважды.
const loaded = new Map();

function backdropTexture(url) {
  return new Promise((resolve, reject) => {
    new THREE.TextureLoader().load(
      url,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        // Кадрирование двигает выборку внутрь картинки, поэтому края не
        // должны заворачиваться.
        texture.wrapS = THREE.ClampToEdgeWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;
        resolve(texture);
      },
      undefined,
      () => reject(new Error(`фон сцены не загрузился: ${url}`)),
    );
  });
}

function lightProbe(url, renderer, onProgress) {
  return new Promise((resolve, reject) => {
    new RGBELoader().load(
      url,
      (texture) => {
        // Направление ключевого света ищется до фильтрации: только сырая
        // панорама хранит яркость по пикселям. Дальше она размыта.
        const sun = analyzeSun(texture);

        const pmrem = new THREE.PMREMGenerator(renderer);
        pmrem.compileEquirectangularShader();
        const envMap = pmrem.fromEquirectangular(texture).texture;

        texture.dispose();
        pmrem.dispose();
        resolve({ envMap, sun });
      },
      (event) => onProgress?.(event.total > 0 ? (event.loaded / event.total) * 100 : -1),
      () => reject(new Error(`свет сцены не загрузился: ${url}`)),
    );
  });
}

async function fetchScene(id, renderer, onProgress) {
  const folder = `${SCENES_ROOT}/${id}`;

  const response = await fetch(`${folder}/scene.json`, { credentials: 'same-origin' });
  if (!response.ok) throw new Error(`описание сцены ${id}: HTTP ${response.status}`);
  const data = await response.json();

  const [wide, tall, light] = await Promise.all([
    backdropTexture(`${folder}/${data.backdrop.wide}`),
    backdropTexture(`${folder}/${data.backdrop.tall}`),
    lightProbe(`${folder}/${data.environment}`, renderer, onProgress),
  ]);

  return { id, data, backdrops: { wide, tall }, envMap: light.envMap, sun: light.sun };
}

// Грузит сцену целиком: фон, свет и описание. Повторный вызов отдаёт готовое.
export function loadPhotoScene(id, renderer, onProgress) {
  if (!loaded.has(id)) {
    loaded.set(
      id,
      fetchScene(id, renderer, onProgress).catch((error) => {
        // Неудачную загрузку не запоминаем: следующая попытка должна пойти
        // по сети заново.
        loaded.delete(id);
        throw error;
      }),
    );
  }
  return loaded.get(id);
}

// Слой запечённой тени для конкретного объёма. Грузится отдельно от сцены:
// он нужен не всегда (у бумажных стаканов его нет) и меняется вместе с моделью.
const shadows = new Map();

// Ключ слоя тени — номенклатура модели, как в каталоге: экспортёр называет
// файлы её же именем (shadow-HB80-280.webp).
export function shadowKeyFor(cup) {
  return cup?.id ?? null;
}

// frame — 'wide' или 'tall': тень снимается под оба кадра, как и фон.
export function loadShadowLayer(sceneId, data, key, frame = 'wide') {
  const entry = key && data.shadows ? data.shadows[key] : null;
  // Раньше на модель приходился один файл, и он был горизонтальным: отдать
  // его вертикальному кадру нельзя — пропорции другие.
  const file = typeof entry === 'string' ? (frame === 'wide' ? entry : null) : entry?.[frame];
  if (!file) return Promise.resolve(null);

  const url = `${SCENES_ROOT}/${sceneId}/${file}`;
  if (!shadows.has(url)) {
    shadows.set(
      url,
      backdropTexture(url).catch((error) => {
        console.warn(`Слой тени не загрузился: ${error.message}`);
        shadows.delete(url);
        return null;
      }),
    );
  }
  return shadows.get(url);
}

// Какой из двух кадров подходит текущей форме сцены на странице.
export function pickFrame(aspect) {
  return aspect < TALL_FRAME_BELOW ? 'tall' : 'wide';
}

// Форма кадра, как он был снят.
export function frameAspectOf(data, frame) {
  const [width, height] = data.frames[frame];
  return width / height;
}

// Вертикальный угол камеры для текущей формы сцены.
//
// Кадр вписывается ЦЕЛИКОМ, а не по заполнению. Фото-сцена — это фотография, и
// показывать её нужно всю: сцены сняты квадратными, а колонка на странице
// заметно шире, и «по заполнению» от кадра оставалась бы узкая полоса поперёк
// середины, из которой стакан вылезал за верхний край. Поля по краям забирает
// фон страницы — снимок лежит на ней, как фотография на столе.
//
// Угол при этом остаётся съёмочным: кадр занимает на экране ровно тот
// угловой размер, с которым его снимали, поэтому перспектива стакана совпадает
// с перспективой фона.
export function fovFor(data, frame, aspect) {
  const fov = data.camera.fov[frame];
  if (aspect >= frameAspectOf(data, frame)) return fov.y;

  // Экран уже кадра: кадр упирается в боковые края, сверху и снизу поля.
  const halfX = THREE.MathUtils.degToRad(fov.x) / 2;
  return THREE.MathUtils.radToDeg(2 * Math.atan(Math.tan(halfX) / aspect));
}

// Какую долю холста занимает кадр: [по ширине, по высоте]. Кадр вписан
// целиком и по центру — с тем же углом, что даёт fovFor, поэтому фон и стакан
// совпадают пиксель в пиксель.
//
// Сам кадр под стакан кладёт конвейер (RenderPipeline#setBackdrop), уже ПОСЛЕ
// тонмаппинга: снимок пришёл из Blender готовым, и второй тонмаппинг в браузере
// проваливал в нём тени и чернил насыщенные места.
export function frameSizeOf(aspect, frameAspect) {
  if (aspect >= frameAspect) return [frameAspect / aspect, 1];
  return [1, aspect / frameAspect];
}

// Высота модели в единицах сцены. Каталог хранит габариты изделия в
// миллиметрах, сцена — сколько миллиметров в её единице.
export function heightInScene(data, cup) {
  const mm = cup?.size?.height;
  const perUnit = data.floor?.mmPerUnit;
  if (!(mm > 0) || !(perUnit > 0)) return null;
  return mm / perUnit;
}
