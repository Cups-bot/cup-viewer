// Операции экспорта (§20, §29). Модуль грузится динамическим импортом при
// первом открытии окна экспорта (§50); запись оборота подтягивает свой модуль
// ещё позже — при старте записи.
//
// Каждая операция проверяет права режима (ModeController, export). Набор у
// сотрудника и клиента один: фото 2048×2048, 4 ракурса, оборот, развёртка.

import { encodeCanvas } from '../utils/encode.js';
import { createZip } from '../utils/zip.js';
import { MESSAGES } from '../ui/messages.js';

export const ANGLE_VIEWS = Object.freeze(['front', 'right', 'back', 'left']);
// Размер стороны кадра: и одиночное фото, и ракурсы — квадрат 2048.
export const PHOTO_SIZE = 2048;

export class ExportBusyError extends Error {}

export function createExporter({ state, mode, viewer, feedback }) {
  let busy = false;
  const listeners = new Set();
  const emit = (event) => listeners.forEach((fn) => fn(event));

  // Имя файла — из модели и материала, не из исходника макета (§25).
  const baseName = () => {
    const { modelId, materialId } = state.get();
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

  async function still({ width, height, view = null }) {
    const canvas = viewer.renderStill({ width, height, view });
    try {
      return await encodeCanvas(canvas, 'image/png');
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

    // Фото: PNG 2048×2048 текущего вида, без интерфейса. В фото-сцене
    // снимок снят квадратом — кадр выходит без полей.
    photo() {
      return run('photo', async (progress) => {
        progress(0, 1, 'Рендер кадра');
        const blob = await still({ width: PHOTO_SIZE, height: PHOTO_SIZE });
        progress(1, 1, 'Готово');
        await viewer.deliverFile(blob, `${baseName()}_${PHOTO_SIZE}.png`, 'image/png');
        return blob;
      });
    },

    // 4 ракурса одной дистанции, фона и света — одним ZIP (§20). Поворачивается
    // сам стакан, поэтому тень у всех четырёх одна.
    angles() {
      return run('angles', async (progress) => {
        const files = [];
        for (const [index, view] of ANGLE_VIEWS.entries()) {
          progress(index, ANGLE_VIEWS.length, `Кадр ${index + 1} из ${ANGLE_VIEWS.length}`);
          const blob = await still({ width: PHOTO_SIZE, height: PHOTO_SIZE, view });
          files.push({ name: `${baseName()}_${view}.png`, data: new Uint8Array(await blob.arrayBuffer()) });
        }
        progress(ANGLE_VIEWS.length, ANGLE_VIEWS.length, 'Собираем архив');
        const zip = createZip(files);
        await viewer.deliverFile(zip, `${baseName()}_4views.zip`, 'application/zip');
        return files.map((file) => file.name);
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
