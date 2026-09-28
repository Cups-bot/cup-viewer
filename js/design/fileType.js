// Тип файла макета — по сигнатуре (первым байтам), а не по расширению (§6):
// переименованный .exe → .png не должен дойти до декодера как картинка.
//
//   supported:   png, jpeg, pdf
//   unsupported: postscript (EPS, AI до CS), eps (DOS-заголовок), cdr —
//                формат узнан, но пока не поддерживается (P1)
//   unknown:     всё остальное

export const MAX_FILE_BYTES = 100 * 1024 * 1024;

// Сколько байт нужно для распознавания.
export const SIGNATURE_BYTES = 16;

const startsWith = (bytes, signature, offset = 0) =>
  signature.every((value, index) => bytes[offset + index] === value);

const ascii = (text) => [...text].map((char) => char.charCodeAt(0));

export function detectFileType(bytes) {
  if (startsWith(bytes, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) return 'png';
  if (startsWith(bytes, [0xff, 0xd8, 0xff])) return 'jpeg';
  // Illustrator с «PDF-совместимостью» (по умолчанию с CS) — тоже %PDF:
  // pdf.js показывает его PDF-часть, и это ровно то, что уйдёт в печать.
  if (startsWith(bytes, ascii('%PDF-'))) return 'pdf';
  if (startsWith(bytes, ascii('%!PS'))) return 'postscript';
  if (startsWith(bytes, [0xc5, 0xd0, 0xd3, 0xc6])) return 'eps';
  if (startsWith(bytes, ascii('RIFF')) && startsWith(bytes, ascii('CDR'), 8)) return 'cdr';
  return 'unknown';
}

export const SUPPORTED_TYPES = Object.freeze(['png', 'jpeg', 'pdf']);
export const RECOGNIZED_UNSUPPORTED = Object.freeze(['postscript', 'eps', 'cdr']);

// Предел canvas в iOS Safari: 16 777 216 пикселей площади, 8192 по стороне
// для развёртки (§49). Больше — уменьшаем с сохранением пропорций, не ошибка.
export const UNWRAP_LIMITS = Object.freeze({ maxSide: 8192, maxArea: 16_777_216 });

// Размер, вписанный в пределы: [width, height], целые, ≥ 1.
export function fitWithin(width, height, { maxSide = Infinity, maxArea = Infinity } = {}) {
  let scale = Math.min(1, maxSide / width, maxSide / height, Math.sqrt(maxArea / (width * height)));
  let w = Math.max(1, Math.floor(width * scale));
  let h = Math.max(1, Math.floor(height * scale));
  // Округление вниз по обеим сторонам гарантирует пределы; страховка на
  // случай, когда пропорция совсем вырожденная.
  while (w * h > maxArea) {
    scale *= 0.999;
    w = Math.max(1, Math.floor(width * scale));
    h = Math.max(1, Math.floor(height * scale));
  }
  return [w, h];
}

// Разрешение для печати (владелец, 2026-09-28): картинки меньше 300 dpi в
// печать не принимают. Посмотреть на стакане можно — сайт предупреждает.
export const PRINT_DPI = 300;

// dpi растра шириной px на mm миллиметров печати, округлённо.
export const dpiOf = (px, mm) => Math.round((px / mm) * 25.4);

// Расхождение пропорций макета и развёртки, доля: 0.02 — 2 %.
export function aspectMismatch([width, height], [unwrapWidth, unwrapHeight]) {
  const a = width / height;
  const b = unwrapWidth / unwrapHeight;
  return Math.abs(a - b) / b;
}
