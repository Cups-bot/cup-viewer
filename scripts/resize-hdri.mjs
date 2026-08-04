// Уменьшение карты освещения (Radiance .hdr).
//
// Зачем. HDRI грузится при каждом открытии страницы и блокирует показ сцены:
// пока она едет, клиент видит «Загрузка окружения…». Исходные 2048×1024 — это
// 6,8 МБ несжатого RGBE, на мобильном интернете секунды белого экрана.
//
// Почему это не портит картинку. Карта всё равно проходит через PMREMGenerator,
// который сворачивает её в небольшую пред-фильтрованную кубическую карту:
// освещение материалов от исходного разрешения почти не зависит.
//
// Что здесь важно не сломать. js/core/environment.js ищет в карте солнце и
// выводит из него направление, мягкость и плотность контактной тени. Усреднение
// при уменьшении «размазывает» яркое пятно, и контраст (peak/mean) падает — а
// от него зависит плотность тени. Поэтому скрипт печатает замеры до и после:
// если contrast просел на порядок, надо брать разрешение повыше.
//
// Запуск:
//   node scripts/resize-hdri.mjs assets/hdri/main.hdr 512
//   node scripts/resize-hdri.mjs assets/hdri/main.hdr 512 --write

import { readFile, writeFile, rename } from 'node:fs/promises';
import { resolve } from 'node:path';

// ── Чтение Radiance .hdr ───────────────────────────────────────────────────

function parseHeader(buf) {
  let offset = 0;
  let line = '';
  let width = 0;
  let height = 0;

  const readLine = () => {
    const start = offset;
    while (buf[offset] !== 0x0a) offset++;
    const text = buf.toString('latin1', start, offset);
    offset++;
    return text;
  };

  if (!readLine().startsWith('#?')) throw new Error('Это не Radiance .hdr');

  // Заголовок заканчивается пустой строкой, следом идёт строка с размерами.
  while ((line = readLine()) !== '') {
    if (line.startsWith('FORMAT=') && !line.includes('32-bit_rle_rgbe')) {
      throw new Error(`Поддерживается только 32-bit_rle_rgbe, а тут ${line}`);
    }
  }

  const size = readLine().trim();
  const match = size.match(/^-Y\s+(\d+)\s+\+X\s+(\d+)$/);
  if (!match) throw new Error(`Неожиданный порядок строк: "${size}"`);
  height = Number(match[1]);
  width = Number(match[2]);

  return { width, height, dataOffset: offset };
}

// Возвращает Float32Array длиной width*height*3 в линейном пространстве.
function decode(buf, { width, height, dataOffset }) {
  const out = new Float32Array(width * height * 3);
  const scanline = new Uint8Array(width * 4);
  let offset = dataOffset;

  for (let y = 0; y < height; y++) {
    // Адаптивный RLE («new RLE»): маркер 2,2,высокий байт,низкий байт.
    const isRle =
      buf[offset] === 2 && buf[offset + 1] === 2 && ((buf[offset + 2] << 8) | buf[offset + 3]) === width;

    if (isRle) {
      offset += 4;
      // Каналы лежат по отдельности: сначала все R, потом все G и т.д.
      for (let channel = 0; channel < 4; channel++) {
        let x = 0;
        while (x < width) {
          const count = buf[offset++];
          if (count > 128) {
            // Повтор одного значения.
            const value = buf[offset++];
            for (let i = 0; i < count - 128; i++) scanline[(x++) * 4 + channel] = value;
          } else {
            // Прямая последовательность.
            for (let i = 0; i < count; i++) scanline[(x++) * 4 + channel] = buf[offset++];
          }
        }
      }
    } else {
      // Плоская строка без сжатия.
      for (let x = 0; x < width; x++) {
        scanline[x * 4 + 0] = buf[offset++];
        scanline[x * 4 + 1] = buf[offset++];
        scanline[x * 4 + 2] = buf[offset++];
        scanline[x * 4 + 3] = buf[offset++];
      }
    }

    // RGBE → линейный float.
    for (let x = 0; x < width; x++) {
      const e = scanline[x * 4 + 3];
      const scale = e === 0 ? 0 : 2 ** (e - 136); // 2^(e-128) / 256
      const i = (y * width + x) * 3;
      out[i + 0] = scanline[x * 4 + 0] * scale;
      out[i + 1] = scanline[x * 4 + 1] * scale;
      out[i + 2] = scanline[x * 4 + 2] * scale;
    }
  }

  return out;
}

// ── Уменьшение ─────────────────────────────────────────────────────────────

// Усреднение по блоку — энергетически корректно для карты освещения: суммарная
// светимость неба сохраняется, меняется только детализация.
function downsample(pixels, width, height, factor) {
  const w = Math.round(width / factor);
  const h = Math.round(height / factor);
  const out = new Float32Array(w * h * 3);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let r = 0;
      let g = 0;
      let b = 0;
      let n = 0;
      for (let sy = y * factor; sy < Math.min((y + 1) * factor, height); sy++) {
        for (let sx = x * factor; sx < Math.min((x + 1) * factor, width); sx++) {
          const i = (sy * width + sx) * 3;
          r += pixels[i];
          g += pixels[i + 1];
          b += pixels[i + 2];
          n++;
        }
      }
      const o = (y * w + x) * 3;
      out[o] = r / n;
      out[o + 1] = g / n;
      out[o + 2] = b / n;
    }
  }

  return { pixels: out, width: w, height: h };
}

// ── Запись Radiance .hdr ───────────────────────────────────────────────────

function encode(pixels, width, height) {
  const header = Buffer.from(
    `#?RADIANCE\nFORMAT=32-bit_rle_rgbe\nSOFTWARE=cup-viewer/scripts/resize-hdri.mjs\n\n-Y ${height} +X ${width}\n`,
    'latin1',
  );

  // Пишем плоскими строками без RLE: файл на четверть больше сжатого, зато
  // кодировщик занимает пять строк и его нечему ломать. После уменьшения размер
  // всё равно на порядок меньше исходного.
  const body = Buffer.allocUnsafe(width * height * 4);
  let offset = 0;

  for (let i = 0; i < width * height; i++) {
    const r = pixels[i * 3];
    const g = pixels[i * 3 + 1];
    const b = pixels[i * 3 + 2];
    const max = Math.max(r, g, b);

    if (max < 1e-32) {
      body[offset++] = 0;
      body[offset++] = 0;
      body[offset++] = 0;
      body[offset++] = 0;
      continue;
    }

    const exponent = Math.ceil(Math.log2(max));
    const scale = 256 / 2 ** exponent;
    body[offset++] = Math.min(255, Math.floor(r * scale));
    body[offset++] = Math.min(255, Math.floor(g * scale));
    body[offset++] = Math.min(255, Math.floor(b * scale));
    body[offset++] = exponent + 128;
  }

  return Buffer.concat([header, body]);
}

// ── Замеры, по которым видно, не сломалась ли тень ─────────────────────────

function measure(pixels, width, height) {
  let peak = 0;
  let sum = 0;
  for (let i = 0; i < width * height; i++) {
    const y = 0.2126 * pixels[i * 3] + 0.7152 * pixels[i * 3 + 1] + 0.0722 * pixels[i * 3 + 2];
    sum += y;
    if (y > peak) peak = y;
  }
  const mean = sum / (width * height);
  return { peak, mean, contrast: peak / mean };
}

// ── Точка входа ────────────────────────────────────────────────────────────

const [inputArg, sizeArg] = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const write = process.argv.includes('--write');

if (!inputArg) {
  console.error('Использование: node scripts/resize-hdri.mjs <файл.hdr> [ширина] [--write]');
  process.exit(1);
}

const path = resolve(process.cwd(), inputArg);
const buf = await readFile(path);
const meta = parseHeader(buf);
const pixels = decode(buf, meta);

const before = measure(pixels, meta.width, meta.height);
console.log(`Исходник: ${meta.width}×${meta.height}, ${(buf.length / 1024 / 1024).toFixed(2)} МБ`);
console.log(`  peak ${before.peak.toFixed(1)} · mean ${before.mean.toFixed(3)} · contrast ${Math.round(before.contrast)}`);

// Без указанной ширины просто показываем варианты — решение за человеком.
const targets = sizeArg ? [Number(sizeArg)] : [1024, 512, 256];

for (const target of targets) {
  const factor = Math.round(meta.width / target);
  if (factor < 1) {
    console.log(`  ${target}: исходник и так меньше, пропускаем`);
    continue;
  }

  const small = downsample(pixels, meta.width, meta.height, factor);
  const after = measure(small.pixels, small.width, small.height);
  const encoded = encode(small.pixels, small.width, small.height);

  console.log(
    `→ ${small.width}×${small.height}: ${(encoded.length / 1024).toFixed(0)} КБ ` +
      `(${(buf.length / encoded.length).toFixed(1)}× меньше) · ` +
      `contrast ${Math.round(after.contrast)} ` +
      `(${((after.contrast / before.contrast) * 100).toFixed(0)} % от исходного)`,
  );

  if (write && sizeArg) {
    await rename(path, `${path}.original`);
    await writeFile(path, encoded);
    console.log(`Записано: ${inputArg} (исходник сохранён как ${inputArg}.original)`);
  }
}
