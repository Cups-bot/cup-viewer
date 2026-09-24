// Цветовые расчёты для render:check: sRGB (8 бит, D65) → CIELAB и ΔE00.
// Без зависимостей. ΔE00 — по Sharma, Wu, Dalal (2005), проверяется
// tests/unit/deltaE.test.mjs на их эталонных парах.

// Опорный белый D65 (2°), Y = 1.
const WHITE = [0.95047, 1.0, 1.08883];

// sRGB 0…255 → линейный 0…1: таблица на все 256 значений.
const LINEAR = new Float64Array(256);
for (let i = 0; i < 256; i++) {
  const c = i / 255;
  LINEAR[i] = c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

const EPSILON = 216 / 24389;
const KAPPA = 24389 / 27;

function f(t) {
  return t > EPSILON ? Math.cbrt(t) : (KAPPA * t + 16) / 116;
}

// [r, g, b] 0…255 → [L, a, b].
export function srgbToLab(r, g, b) {
  const R = LINEAR[r];
  const G = LINEAR[g];
  const B = LINEAR[b];
  const X = 0.4124564 * R + 0.3575761 * G + 0.1804375 * B;
  const Y = 0.2126729 * R + 0.7151522 * G + 0.072175 * B;
  const Z = 0.0193339 * R + 0.119192 * G + 0.9503041 * B;
  const fx = f(X / WHITE[0]);
  const fy = f(Y / WHITE[1]);
  const fz = f(Z / WHITE[2]);
  return [116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)];
}

const DEG = Math.PI / 180;
const POW25_7 = 25 ** 7;

// CIEDE2000, kL = kC = kH = 1.
export function deltaE00([L1, a1, b1], [L2, a2, b2]) {
  const C1 = Math.hypot(a1, b1);
  const C2 = Math.hypot(a2, b2);
  const Cbar = (C1 + C2) / 2;
  const Cbar7 = Cbar ** 7;
  const G = 0.5 * (1 - Math.sqrt(Cbar7 / (Cbar7 + POW25_7)));

  const a1p = (1 + G) * a1;
  const a2p = (1 + G) * a2;
  const C1p = Math.hypot(a1p, b1);
  const C2p = Math.hypot(a2p, b2);

  const hue = (b, a) => {
    if (b === 0 && a === 0) return 0;
    const h = Math.atan2(b, a) / DEG;
    return h >= 0 ? h : h + 360;
  };
  const h1p = hue(b1, a1p);
  const h2p = hue(b2, a2p);

  const dLp = L2 - L1;
  const dCp = C2p - C1p;

  let dhp = 0;
  if (C1p * C2p !== 0) {
    dhp = h2p - h1p;
    if (dhp > 180) dhp -= 360;
    else if (dhp < -180) dhp += 360;
  }
  const dHp = 2 * Math.sqrt(C1p * C2p) * Math.sin((dhp / 2) * DEG);

  const Lbarp = (L1 + L2) / 2;
  const Cbarp = (C1p + C2p) / 2;

  let hbarp = h1p + h2p;
  if (C1p * C2p !== 0) {
    if (Math.abs(h1p - h2p) <= 180) hbarp = (h1p + h2p) / 2;
    else if (h1p + h2p < 360) hbarp = (h1p + h2p + 360) / 2;
    else hbarp = (h1p + h2p - 360) / 2;
  }

  const T =
    1 -
    0.17 * Math.cos((hbarp - 30) * DEG) +
    0.24 * Math.cos(2 * hbarp * DEG) +
    0.32 * Math.cos((3 * hbarp + 6) * DEG) -
    0.2 * Math.cos((4 * hbarp - 63) * DEG);

  const dTheta = 30 * Math.exp(-(((hbarp - 275) / 25) ** 2));
  const Cbarp7 = Cbarp ** 7;
  const RC = 2 * Math.sqrt(Cbarp7 / (Cbarp7 + POW25_7));
  const Lm50 = (Lbarp - 50) ** 2;
  const SL = 1 + (0.015 * Lm50) / Math.sqrt(20 + Lm50);
  const SC = 1 + 0.045 * Cbarp;
  const SH = 1 + 0.015 * Cbarp * T;
  const RT = -Math.sin(2 * dTheta * DEG) * RC;

  const l = dLp / SL;
  const c = dCp / SC;
  const h = dHp / SH;
  return Math.sqrt(l * l + c * c + h * h + RT * c * h);
}

// Две RGBA-картинки одного размера → mean и p99 ΔE00 по всем пикселям.
export function deltaEStats(a, b) {
  const count = a.length / 4;
  const values = new Float32Array(count);
  const cache = new Map();
  const lab = (data, i) => {
    const key = (data[i] << 16) | (data[i + 1] << 8) | data[i + 2];
    let value = cache.get(key);
    if (!value) {
      value = srgbToLab(data[i], data[i + 1], data[i + 2]);
      cache.set(key, value);
    }
    return value;
  };
  let sum = 0;
  for (let p = 0; p < count; p++) {
    const i = p * 4;
    const same = a[i] === b[i] && a[i + 1] === b[i + 1] && a[i + 2] === b[i + 2];
    const d = same ? 0 : deltaE00(lab(a, i), lab(b, i));
    values[p] = d;
    sum += d;
  }
  const perPixel = values.slice();
  values.sort();
  return {
    perPixel,
    mean: sum / count,
    p99: values[Math.min(count - 1, Math.floor(count * 0.99))],
    max: values[count - 1],
  };
}
