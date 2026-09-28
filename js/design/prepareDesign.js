// Файл макета → два растра из одного источника (§16, §49):
//   unwrap — полное разрешение для вкладки «Развёртка» (≤ 8192 по стороне и
//            ≤ 16,7 Мп — предел canvas в iOS Safari; больше — уменьшаем);
//   texture — для 3D; до ≤ 2048 его ужимает TextureManager при загрузке.
//
// Файл никуда не отправляется: всё происходит в браузере (бриф 03b, п. 7).

import {
  MAX_FILE_BYTES,
  dpiOf,
  RECOGNIZED_UNSUPPORTED,
  SIGNATURE_BYTES,
  SUPPORTED_TYPES,
  UNWRAP_LIMITS,
  detectFileType,
  fitWithin,
} from './fileType.js';
import { encodeCanvas } from '../utils/encode.js';

export class DesignError extends Error {
  // reason: 'too-big' | 'unsupported' | 'broken'
  constructor(reason, message) {
    super(message ?? reason);
    this.reason = reason;
  }
}

const abortError = () => new DOMException('Загрузка отменена', 'AbortError');

function throwIfAborted(signal) {
  if (signal?.aborted) throw abortError();
}

const toBlob = (canvas, type, quality) =>
  encodeCanvas(canvas, type, quality).catch(() => {
    throw new DesignError('broken', 'растр не закодировался');
  });

// Картинка больше пределов развёртки — уменьшенная копия того же типа.
async function downscaleImage(file, type, [width, height]) {
  const bitmap = await createImageBitmap(file, { resizeWidth: width, resizeHeight: height, resizeQuality: 'high' });
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  canvas.getContext('2d').drawImage(bitmap, 0, 0);
  bitmap.close();
  try {
    return type === 'jpeg' ? await toBlob(canvas, 'image/jpeg', 0.95) : await toBlob(canvas, 'image/png');
  } finally {
    canvas.width = 0;
  }
}

// model — запись каталога: от её развёртки считается масштаб растра PDF.
// Возвращает { textureUrl, unwrapUrl, width, height, pages, type, layers, dpi, release() }.
// release() освобождает blob-URL — вызывать, когда макет сменился.
export async function prepareDesign(file, model, { signal, onStage } = {}) {
  if (file.size > MAX_FILE_BYTES) throw new DesignError('too-big');

  const head = new Uint8Array(await file.slice(0, SIGNATURE_BYTES).arrayBuffer());
  const type = detectFileType(head);
  if (RECOGNIZED_UNSUPPORTED.includes(type)) throw new DesignError('unsupported');
  if (!SUPPORTED_TYPES.includes(type)) throw new DesignError('broken', `сигнатура не распознана`);
  throwIfAborted(signal);

  const urls = [];
  const track = (blob) => {
    const url = URL.createObjectURL(blob);
    urls.push(url);
    return url;
  };
  const release = () => urls.forEach((url) => URL.revokeObjectURL(url));

  try {
    if (type === 'pdf') {
      onStage?.('pdf');
      const { rasterizePdf, mmToPx } = await import('./pdfRaster.js');
      throwIfAborted(signal);
      const { canvas, pages, layers } = await rasterizePdf(file, {
        targetWidthPx: mmToPx(model.textureMapping.unwrapMm[0]),
        fit: (w, h) => fitWithin(w, h, UNWRAP_LIMITS),
        signal,
        // Бумага под рисунком белая сама; у пластика вне рисунка — пластик.
        transparent: model.type !== 'paper',
      });
      try {
        throwIfAborted(signal);
        const url = track(await toBlob(canvas, 'image/png'));
        return { textureUrl: url, unwrapUrl: url, width: canvas.width, height: canvas.height, pages, type, layers, dpi: null, release };
      } finally {
        canvas.width = 0;
      }
    }

    let bitmap;
    try {
      bitmap = await createImageBitmap(file);
    } catch {
      throw new DesignError('broken', 'картинка не декодируется');
    }
    const { width, height } = bitmap;
    bitmap.close();
    throwIfAborted(signal);

    // 3D берёт исходный файл: TextureManager сам уменьшит его до 2048 тем же
    // путём, что и раньше, — прозрачность PNG ведёт себя как прежде.
    const textureUrl = track(file);
    const [w, h] = fitWithin(width, height, UNWRAP_LIMITS);
    const unwrapUrl = w === width && h === height ? textureUrl : track(await downscaleImage(file, type, [w, h]));
    throwIfAborted(signal);
    // dpi — по исходной ширине картинки на ширину развёртки (PDF — вектор, null).
    const dpi = dpiOf(width, model.textureMapping.unwrapMm[0]);
    return { textureUrl, unwrapUrl, width: w, height: h, pages: 1, type, layers: null, dpi, release };
  } catch (error) {
    release();
    throw error;
  }
}
