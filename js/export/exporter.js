// Операции экспорта (§20, §29). Модуль грузится динамическим импортом при
// первом открытии окна экспорта (§50); запись оборота подтягивает свой модуль
// ещё позже — при старте записи.
//
// Каждая операция проверяет права режима: в Client Mode доступны только
// текущий кадр, развёртка, 360° и превью (ModeController, export = limited).

import { encodeCanvas } from '../utils/encode.js';
import { createZip } from '../utils/zip.js';
import { MESSAGES } from '../ui/messages.js';

export const IMAGE_SIZES = Object.freeze({
  hd: { label: '1920 × 1080', width: 1920, height: 1080 },
  square: { label: '2048 × 2048', width: 2048, height: 2048 },
  current: { label: 'Текущий вид', width: null, height: null },
});

export const ANGLE_VIEWS = Object.freeze(['front', 'right', 'back', 'left']);
export const ANGLE_SIZE = 2048;
export const JPEG_QUALITY = 0.92;
export const PREVIEW_SIZE = 1200;

export class ExportBusyError extends Error {}

export function createExporter({ state, mode, viewer, feedback }) {
  let busy = false;
  const listeners = new Set();
  const emit = (event) => listeners.forEach((fn) => fn(event));

  // Имя файла — из модели и материала, не из исходника макета. Клиенту —
  // без номенклатуры: код модели ему ни к чему (§25, §59).
  const baseName = () => {
    const { modelId, materialId } = state.get();
    if (mode.mode === 'client') return 'cup';
    return `${modelId ?? 'cup'}_${materialId ?? 'material'}`;
  };

  // Обёртка операции: одна за раз, прогресс и ошибка §42.
  async function run(kind, task) {
    if (busy) return null;
    if (!mode.canExport(kind)) {
      mode.check('export', `экспорт: ${kind}`);
      return null;
    }
    busy = true;
    emit({ type: 'busy', busy: true, kind });
    try {
      return await task((done, total, label) => emit({ type: 'progress', done, total, label }));
    } catch (error) {
      console.error('Экспорт не удался:', error);
      feedback.onToast(MESSAGES.exportFailed, 'error');
      return null;
    } finally {
      busy = false;
      emit({ type: 'busy', busy: false, kind });
    }
  }

  const currentSize = () => {
    const canvas = viewer.renderer.domElement;
    return { width: canvas.width, height: canvas.height };
  };

  async function still({ width, height, view = null, type = 'image/png', quality }) {
    const canvas = viewer.renderStill({ width, height, view });
    try {
      return await encodeCanvas(canvas, type, quality);
    } finally {
      // Холст кадра освобождаем сразу: 2048² — это 16 МБ пикселей.
      canvas.width = 0;
      canvas.height = 0;
    }
  }

  return {
    get busy() {
      return busy;
    },
    on(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },

    // Изображение: PNG | JPG, размер из IMAGE_SIZES. В фото-сцене — только
    // текущий вид: у снимка свой кадр, и другой формат его бы обрезал.
    image({ format = 'png', size = 'current' } = {}) {
      return run('image', async (progress) => {
        const preset = viewer.photo ? IMAGE_SIZES.current : IMAGE_SIZES[size] ?? IMAGE_SIZES.current;
        const { width, height } = preset.width ? preset : currentSize();
        const jpeg = format === 'jpg';
        progress(0, 1, 'Рендер кадра');
        const blob = await still({ width, height, type: jpeg ? 'image/jpeg' : 'image/png', quality: jpeg ? JPEG_QUALITY : undefined });
        progress(1, 1, 'Готово');
        await viewer.deliverFile(blob, `${baseName()}_${width}x${height}.${jpeg ? 'jpg' : 'png'}`, blob.type);
        return blob;
      });
    },

    // Текущий кадр клиента (§29): PNG размером с холст.
    current() {
      return run('current', async (progress) => {
        const { width, height } = currentSize();
        progress(0, 1, 'Рендер кадра');
        const blob = await still({ width, height });
        progress(1, 1, 'Готово');
        await viewer.deliverFile(blob, `${baseName()}_view.png`, 'image/png');
        return blob;
      });
    },

    // 4 ракурса одной дистанции, фона и света — одним ZIP (§20).
    angles() {
      return run('angles', async (progress) => {
        if (viewer.photo) throw new Error('ракурсы снимаются в студии');
        const files = [];
        for (const [index, view] of ANGLE_VIEWS.entries()) {
          progress(index, ANGLE_VIEWS.length, `Кадр ${index + 1} из ${ANGLE_VIEWS.length}`);
          const blob = await still({ width: ANGLE_SIZE, height: ANGLE_SIZE, view });
          files.push({ name: `${baseName()}_${view}.png`, data: new Uint8Array(await blob.arrayBuffer()) });
        }
        progress(ANGLE_VIEWS.length, ANGLE_VIEWS.length, 'Собираем архив');
        const zip = createZip(files);
        await viewer.deliverFile(zip, `${baseName()}_4views.zip`, 'application/zip');
        return files.map((file) => file.name);
      });
    },

    // Превью для мессенджера (§29): JPG квадрат, вид спереди.
    preview() {
      return run('preview', async (progress) => {
        progress(0, 1, 'Рендер кадра');
        const view = viewer.photo ? null : 'front';
        const blob = await still({ width: PREVIEW_SIZE, height: PREVIEW_SIZE, view, type: 'image/jpeg', quality: JPEG_QUALITY });
        await viewer.deliverFile(blob, `${baseName()}_preview.jpg`, 'image/jpeg');
        return blob;
      });
    },

    // Развёртка — PNG того растра, что во вкладке «Развёртка».
    unwrap(image) {
      return run('unwrap', async (progress) => {
        if (!image) throw new Error('развёртки нет');
        progress(0, 1, 'Готовим развёртку');
        const canvas = document.createElement('canvas');
        canvas.width = image.naturalWidth ?? image.width;
        canvas.height = image.naturalHeight ?? image.height;
        canvas.getContext('2d').drawImage(image, 0, 0);
        try {
          const blob = await encodeCanvas(canvas, 'image/png');
          await viewer.deliverFile(blob, `${baseName()}_unwrap.png`, 'image/png');
          return blob;
        } finally {
          canvas.width = 0;
        }
      });
    },

    // 360°: прежняя логика записи (core/turnCapture.js), меняется только
    // обвязка — прогресс с реальным числом кадров.
    turn({ photos = false } = {}) {
      return run('turn', async (progress) => {
        const { fps, duration } = viewer.config.turnExport;
        const total = Math.round(fps * duration);
        await viewer.exportTurn({
          photos,
          onProgress: (value, label) => progress(Math.min(total, Math.round(value * total)), total, label),
        });
        return true;
      });
    },

    // Маленький кадр для превью в окне: без файла и без прав.
    thumbnail({ width, height, view = null }) {
      if (busy) return null;
      const canvas = viewer.renderStill({ width, height, view });
      const url = canvas.toDataURL('image/jpeg', 0.85);
      canvas.width = 0;
      return url;
    },
  };
}
