// Кодирование большого canvas в PNG/JPEG вне главного потока.
//
// canvas.toBlob читает пиксели на главном потоке: растр развёртки 3543×2475 —
// это 35 МБ и ~130 мс блокировки (бриф 03b разрешает не больше 200 мс, и это
// вместе с кадром сцены). Снимок canvas (createImageBitmap) уходит в воркер,
// там OffscreenCanvas кодирует его. Нет OffscreenCanvas (Safari до 16.4) —
// прежний toBlob.

const WORKER_SOURCE = `
self.onmessage = async ({ data: { id, bitmap, type, quality } }) => {
  try {
    const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
    canvas.getContext('2d').drawImage(bitmap, 0, 0);
    bitmap.close();
    const blob = await canvas.convertToBlob({ type, quality });
    self.postMessage({ id, blob });
  } catch (error) {
    self.postMessage({ id, error: String(error) });
  }
};
`;

let worker = null;
let nextId = 0;
const pending = new Map();

function getWorker() {
  if (worker) return worker;
  const url = URL.createObjectURL(new Blob([WORKER_SOURCE], { type: 'text/javascript' }));
  worker = new Worker(url);
  URL.revokeObjectURL(url);
  worker.onmessage = ({ data }) => {
    const job = pending.get(data.id);
    pending.delete(data.id);
    if (data.blob) job?.resolve(data.blob);
    else job?.reject(new Error(data.error ?? 'кодирование не удалось'));
  };
  return worker;
}

const canUseWorker = () =>
  typeof OffscreenCanvas === 'function' &&
  typeof OffscreenCanvas.prototype.convertToBlob === 'function' &&
  typeof Worker === 'function';

function toBlobOnMainThread(canvas, type, quality) {
  return new Promise((resolve, reject) =>
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('toBlob вернул null'))), type, quality),
  );
}

export async function encodeCanvas(canvas, type = 'image/png', quality) {
  if (!canUseWorker()) return toBlobOnMainThread(canvas, type, quality);
  let bitmap;
  try {
    bitmap = await createImageBitmap(canvas);
    const id = ++nextId;
    const done = new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
    getWorker().postMessage({ id, bitmap, type, quality }, [bitmap]);
    return await done;
  } catch (error) {
    // Воркер не поднялся (CSP без worker-src blob:) — кодируем по-старому.
    bitmap?.close?.();
    console.warn('Кодирование в воркере не удалось, кодируем на странице:', error);
    return toBlobOnMainThread(canvas, type, quality);
  }
}
