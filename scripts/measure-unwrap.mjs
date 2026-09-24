// Меряет физический размер развёртки печатного материала модели: сколько
// миллиметров стенки приходится на всю ширину и высоту UV-квадрата 0…1.
//
// Зачем: макет рисуется под развёртку, и от её размеров зависят масштаб
// растра PDF, проверка пропорций загруженного файла и фикстуры render:check.
//
// Как: развёртка стакана изометрична — стенка раскатывается на плоскость без
// растяжения, а плоскость вписана в страницу с шагом W мм по u и H мм по v.
// Тогда для любого ребра треугольника |dP|² = W²·du² + H²·dv², и W², H²
// находятся линейным МНК по всем рёбрам печатного материала.
//
//   node scripts/measure-unwrap.mjs <file.glb> <материал> <uv> <высота, мм>
//   node scripts/measure-unwrap.mjs --catalog      (все модели каталога)
import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const COMPONENTS = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4, MAT4: 16 };
const TYPES = {
  5120: [Int8Array, 127],
  5121: [Uint8Array, 255],
  5122: [Int16Array, 32767],
  5123: [Uint16Array, 65535],
  5125: [Uint32Array, 1],
  5126: [Float32Array, 1],
};

function parseGlb(buffer) {
  const jsonLength = buffer.readUInt32LE(12);
  const json = JSON.parse(buffer.subarray(20, 20 + jsonLength).toString('utf8'));
  const binStart = 20 + jsonLength + 8;
  const binLength = buffer.readUInt32LE(20 + jsonLength);
  return { json, bin: buffer.subarray(binStart, binStart + binLength) };
}

function readAccessor({ json, bin }, index) {
  const accessor = json.accessors[index];
  const view = json.bufferViews[accessor.bufferView];
  const [Type, max] = TYPES[accessor.componentType];
  const size = COMPONENTS[accessor.type];
  const stride = view.byteStride || Type.BYTES_PER_ELEMENT * size;
  const base = (view.byteOffset ?? 0) + (accessor.byteOffset ?? 0);
  const out = new Float64Array(accessor.count * size);
  const data = new DataView(bin.buffer, bin.byteOffset, bin.byteLength);
  const read = {
    5120: (o) => data.getInt8(o),
    5121: (o) => data.getUint8(o),
    5122: (o) => data.getInt16(o, true),
    5123: (o) => data.getUint16(o, true),
    5125: (o) => data.getUint32(o, true),
    5126: (o) => data.getFloat32(o, true),
  }[accessor.componentType];
  for (let i = 0; i < accessor.count; i++) {
    for (let c = 0; c < size; c++) {
      let value = read(base + i * stride + c * Type.BYTES_PER_ELEMENT);
      if (accessor.normalized) value = Math.max(value / max, -1);
      out[i * size + c] = value;
    }
  }
  return { values: out, size, count: accessor.count };
}

function multiply(a, b) {
  const out = new Array(16).fill(0);
  for (let r = 0; r < 4; r++)
    for (let c = 0; c < 4; c++)
      for (let k = 0; k < 4; k++) out[c * 4 + r] += a[k * 4 + r] * b[c * 4 + k];
  return out;
}

function localMatrix(node) {
  if (node.matrix) return node.matrix;
  const [tx, ty, tz] = node.translation ?? [0, 0, 0];
  const [x, y, z, w] = node.rotation ?? [0, 0, 0, 1];
  const [sx, sy, sz] = node.scale ?? [1, 1, 1];
  return [
    (1 - 2 * (y * y + z * z)) * sx, 2 * (x * y + z * w) * sx, 2 * (x * z - y * w) * sx, 0,
    2 * (x * y - z * w) * sy, (1 - 2 * (x * x + z * z)) * sy, 2 * (y * z + x * w) * sy, 0,
    2 * (x * z + y * w) * sz, 2 * (y * z - x * w) * sz, (1 - 2 * (x * x + y * y)) * sz, 0,
    tx, ty, tz, 1,
  ];
}

function transform(m, x, y, z) {
  return [
    m[0] * x + m[4] * y + m[8] * z + m[12],
    m[1] * x + m[5] * y + m[9] * z + m[13],
    m[2] * x + m[6] * y + m[10] * z + m[14],
  ];
}

// Все примитивы модели в мировых координатах: [{ material, positions, uvs, indices }].
function collectPrimitives(glb, uvChannel) {
  const { json } = glb;
  const result = [];
  const visit = (index, parent) => {
    const node = json.nodes[index];
    const world = multiply(parent, localMatrix(node));
    if (node.mesh !== undefined) {
      for (const primitive of json.meshes[node.mesh].primitives) {
        const position = readAccessor(glb, primitive.attributes.POSITION);
        const uvIndex = primitive.attributes[`TEXCOORD_${uvChannel}`];
        const uv = uvIndex === undefined ? null : readAccessor(glb, uvIndex);
        const indices = primitive.indices === undefined ? null : readAccessor(glb, primitive.indices).values;
        const positions = new Float64Array(position.count * 3);
        for (let i = 0; i < position.count; i++) {
          const p = transform(world, ...position.values.subarray(i * 3, i * 3 + 3));
          positions.set(p, i * 3);
        }
        result.push({
          material: json.materials?.[primitive.material]?.name ?? null,
          positions,
          uvs: uv?.values ?? null,
          indices,
          count: position.count,
        });
      }
    }
    for (const child of node.children ?? []) visit(child, world);
  };
  const identity = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
  for (const index of json.scenes[json.scene ?? 0].nodes) visit(index, identity);
  return result;
}

export async function measureUnwrap({ file, materials, uv, heightMm }) {
  const glb = parseGlb(await readFile(resolve(root, file)));
  const primitives = collectPrimitives(glb, uv);

  const min = [Infinity, Infinity, Infinity];
  const max = [-Infinity, -Infinity, -Infinity];
  for (const { positions } of primitives) {
    for (let i = 0; i < positions.length; i++) {
      min[i % 3] = Math.min(min[i % 3], positions[i]);
      max[i % 3] = Math.max(max[i % 3], positions[i]);
    }
  }
  const [minY, maxY] = [min[1], max[1]];
  // Ось стакана — центр габарита: азимут шва считается вокруг неё.
  const cx = (min[0] + max[0]) / 2;
  const cz = (min[2] + max[2]) / 2;
  const mmPerUnit = heightMm / (maxY - minY);

  // Нормальные уравнения для [W², H²].
  let a11 = 0, a12 = 0, a22 = 0, b1 = 0, b2 = 0, edges = 0;
  const wanted = new Set(materials);
  for (const prim of primitives) {
    if (!wanted.has(prim.material) || !prim.uvs) continue;
    const tri = prim.indices ?? Array.from({ length: prim.count }, (_, i) => i);
    for (let t = 0; t + 2 < tri.length; t += 3) {
      for (const [i, j] of [[tri[t], tri[t + 1]], [tri[t + 1], tri[t + 2]], [tri[t + 2], tri[t]]]) {
        const du = prim.uvs[i * 2] - prim.uvs[j * 2];
        const dv = prim.uvs[i * 2 + 1] - prim.uvs[j * 2 + 1];
        const dx = (prim.positions[i * 3] - prim.positions[j * 3]) * mmPerUnit;
        const dy = (prim.positions[i * 3 + 1] - prim.positions[j * 3 + 1]) * mmPerUnit;
        const dz = (prim.positions[i * 3 + 2] - prim.positions[j * 3 + 2]) * mmPerUnit;
        const d2 = dx * dx + dy * dy + dz * dz;
        const u2 = du * du;
        const v2 = dv * dv;
        if (u2 + v2 === 0) continue;
        // Вес 1/d²: без него длинные рёбра задавили бы оценку.
        const w = 1 / Math.max(d2, 1e-9);
        a11 += w * u2 * u2; a12 += w * u2 * v2; a22 += w * v2 * v2;
        b1 += w * u2 * d2; b2 += w * v2 * d2;
        edges++;
      }
    }
  }
  // Шов — там, где сходятся края развёртки u = min и u = max. У бумажного
  // стакана они совпадают; у PP этикетка не замыкается, и шов — середина
  // незапечатанного промежутка. Азимут считается от +Z модели (туда смотрит
  // камера вида «спереди»), как азимут пресетов камеры.
  // Только печатная область UV 0…1: у PP венчик и дно вынесены за её пределы.
  const inPrint = (uvs, i) => uvs[i * 2] >= -1e-3 && uvs[i * 2] <= 1.001 && uvs[i * 2 + 1] >= -1e-3 && uvs[i * 2 + 1] <= 1.001;
  let uMin = Infinity;
  let uMax = -Infinity;
  for (const prim of primitives) {
    if (!wanted.has(prim.material) || !prim.uvs) continue;
    for (let i = 0; i < prim.count; i++) {
      if (!inPrint(prim.uvs, i)) continue;
      uMin = Math.min(uMin, prim.uvs[i * 2]);
      uMax = Math.max(uMax, prim.uvs[i * 2]);
    }
  }
  const edgeDirection = (edge) => {
    let ex = 0;
    let ez = 0;
    for (const prim of primitives) {
      if (!wanted.has(prim.material) || !prim.uvs) continue;
      for (let i = 0; i < prim.count; i++) {
        if (!inPrint(prim.uvs, i) || Math.abs(prim.uvs[i * 2] - edge) > 0.002) continue;
        const x = prim.positions[i * 3] - cx;
        const z = prim.positions[i * 3 + 2] - cz;
        const r = Math.hypot(x, z) || 1;
        ex += x / r;
        ez += z / r;
      }
    }
    const length = Math.hypot(ex, ez) || 1;
    return [ex / length, ez / length];
  };
  const [ax, az] = edgeDirection(uMin);
  const [bx, bz] = edgeDirection(uMax);
  const seamDeg = Math.round(((Math.atan2(ax + bx, az + bz) * 180) / Math.PI + 360) % 360) % 360;

  const det = a11 * a22 - a12 * a12;
  const W2 = (b1 * a22 - b2 * a12) / det;
  const H2 = (a11 * b2 - a12 * b1) / det;
  return {
    widthMm: Math.round(Math.sqrt(W2) * 10) / 10,
    heightMm: Math.round(Math.sqrt(H2) * 10) / 10,
    seamDeg,
    edges,
  };
}

async function main() {
  const args = process.argv.slice(2);
  if (args[0] === '--catalog') {
    const catalog = JSON.parse(await readFile(resolve(root, 'catalog/models.json'), 'utf8'));
    for (const model of catalog.models) {
      const m = await measureUnwrap({
        file: model.file,
        materials: model.textureMapping.materials,
        uv: model.textureMapping.uv,
        heightMm: model.size.heightMm,
      });
      console.log(`${model.id.padEnd(10)} ${String(m.widthMm).padStart(7)} × ${String(m.heightMm).padEnd(7)} мм  шов ${String(m.seamDeg).padStart(3)}°  (${m.edges} рёбер)`);
    }
    return;
  }
  const [file, material, uv, heightMm] = args;
  console.log(await measureUnwrap({ file, materials: [material], uv: Number(uv), heightMm: Number(heightMm) }));
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
