// Затенение полости стакана — рассеянный свет внутрь приходит только через
// горловину, и чем глубже точка, тем меньше неба она видит. Дно у стенки
// темнеет плавно, а не тёмным кольцом.
//
// ПОЧЕМУ НЕ ТОЛЬКО GTAO. Экранное затенение видит угол «стенка — дно» как
// складку шириной в свой радиус и обводит дно ровной тёмной полосой: при
// взгляде сверху она читалась как чёрное пятно. На фотографии такого нет —
// у дна лишь тонкая линия шва, а темнеет стакан постепенно, по глубине.
//
// КАК СЧИТАЕТСЯ. По вершинам, обращённым внутрь, строится профиль полости —
// радиус от высоты — и уровень дна. Из каждой внутренней вершины в полусферу
// вокруг нормали пускаются лучи (косинусное распределение): луч, вышедший через
// горловину, видит небо, упёршийся в стенку или дно — нет. Доля вышедших и
// есть открытость точки. Считается один раз на геометрию, на процессоре,
// за десятки миллисекунд; результат — атрибут вершин, в шейдере он гасит
// только рассеянную (непрямую) составляющую, как карта AO. Прямой свет
// ключевого источника по-прежнему решает карта теней.

import * as THREE from 'three';

const RAYS = 96;
const BINS = 32;
// Сила эффекта: 1 — физическая доля неба. Меньше единицы оставляет место
// отражённому от белых стенок свету, которого лучи не учитывают: картон
// светлый, и полость в жизни заметно светлее чистой геометрии. Общая на все
// материалы — uniform, чтобы подбирать вживую (setCavityStrength).
const STRENGTH = { value: 0.4 };

export function setCavityStrength(value) {
  STRENGTH.value = value;
}

const ATTRIBUTE = 'cavity';

// Косинусное распределение по полусфере — фиксированный набор, чтобы кадр
// был детерминированным (render:check сравнивает бит в бит).
const HEMISPHERE = (() => {
  const dirs = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < RAYS; i++) {
    const u = (i + 0.5) / RAYS;
    const r = Math.sqrt(u);
    const phi = i * golden;
    dirs.push([r * Math.cos(phi), Math.sqrt(1 - u), r * Math.sin(phi)]);
  }
  return dirs;
})();

// Профиль полости модели в её мировых координатах: ось — вертикаль через
// центр габарита.
function measureCavity(meshes) {
  const box = new THREE.Box3();
  for (const mesh of meshes) box.expandByObject(mesh);
  const center = box.getCenter(new THREE.Vector3());
  const height = box.max.y - box.min.y;
  const bins = Array.from({ length: BINS }, () => []);
  let floor = Infinity;

  const p = new THREE.Vector3();
  const n = new THREE.Vector3();
  const normalMatrix = new THREE.Matrix3();
  for (const mesh of meshes) {
    const pos = mesh.geometry.attributes.position;
    const nor = mesh.geometry.attributes.normal;
    if (!nor) continue;
    normalMatrix.getNormalMatrix(mesh.matrixWorld);
    for (let i = 0; i < pos.count; i++) {
      p.fromBufferAttribute(pos, i).applyMatrix4(mesh.matrixWorld);
      n.fromBufferAttribute(nor, i).applyMatrix3(normalMatrix).normalize();
      const dx = p.x - center.x;
      const dz = p.z - center.z;
      const radius = Math.hypot(dx, dz);
      // Стенка изнутри: нормаль смотрит к оси.
      if (radius > 1e-4 && (n.x * dx + n.z * dz) / radius < -0.5) {
        const bin = Math.min(BINS - 1, Math.floor(((p.y - box.min.y) / height) * BINS));
        bins[bin].push(radius);
      }
      // Дно изнутри: нормаль вверх, ближе к оси.
      if (n.y > 0.8 && p.y < box.min.y + height * 0.5) floor = Math.min(floor, p.y);
    }
  }

  // Медиана по высоте; пустые полосы — от соседей.
  const radii = bins.map((list) => {
    if (list.length === 0) return null;
    list.sort((a, b) => a - b);
    return list[Math.floor(list.length / 2)];
  });
  const known = radii.map((r, i) => [i, r]).filter(([, r]) => r != null);
  if (known.length < 2 || !Number.isFinite(floor)) return null;
  for (let i = 0; i < BINS; i++) {
    if (radii[i] != null) continue;
    const below = [...known].reverse().find(([j]) => j < i);
    const above = known.find(([j]) => j > i);
    radii[i] = below && above ? (below[1] + above[1]) / 2 : (below ?? above)[1];
  }
  return { center, bottom: box.min.y, top: box.max.y, height, radii, floor };
}

function radiusAt(cavity, y) {
  const t = ((y - cavity.bottom) / cavity.height) * BINS - 0.5;
  const i = Math.max(0, Math.min(BINS - 1, Math.floor(t)));
  const j = Math.min(BINS - 1, i + 1);
  const f = Math.max(0, Math.min(1, t - i));
  return cavity.radii[i] * (1 - f) + cavity.radii[j] * f;
}

// Открытость точки: доля лучей, вышедших через горловину.
function openness(cavity, px, py, pz, nx, ny, nz) {
  // Базис вокруг нормали.
  const up = Math.abs(ny) < 0.9 ? [0, 1, 0] : [1, 0, 0];
  let tx = up[1] * nz - up[2] * ny;
  let ty = up[2] * nx - up[0] * nz;
  let tz = up[0] * ny - up[1] * nx;
  const tl = Math.hypot(tx, ty, tz) || 1;
  tx /= tl;
  ty /= tl;
  tz /= tl;
  const bx = ny * tz - nz * ty;
  const by = nz * tx - nx * tz;
  const bz = nx * ty - ny * tx;

  const step = cavity.height / 48;
  let open = 0;
  for (const [a, h, c] of HEMISPHERE) {
    const dx = tx * a + nx * h + bx * c;
    const dy = ty * a + ny * h + by * c;
    const dz = tz * a + nz * h + bz * c;
    // Старт чуть над поверхностью: собственная стенка лучу не помеха.
    let x = px + nx * step * 0.5;
    let y = py + ny * step * 0.5;
    let z = pz + nz * step * 0.5;
    let hit = false;
    for (let k = 0; k < 160; k++) {
      x += dx * step;
      y += dy * step;
      z += dz * step;
      if (y >= cavity.top) break;
      if (y <= cavity.floor) {
        hit = true;
        break;
      }
      if (Math.hypot(x - cavity.center.x, z - cavity.center.z) > radiusAt(cavity, y)) {
        hit = true;
        break;
      }
    }
    if (!hit) open += 1;
  }
  return open / RAYS;
}

// Считает атрибут cavity (закрытость) для всех сеток модели. Снаружи — 0.
export function computeCavityOcclusion(model) {
  const meshes = [];
  model.updateMatrixWorld(true);
  model.traverse((object) => {
    if (object.isMesh && object.geometry?.attributes?.normal) meshes.push(object);
  });
  const cavity = measureCavity(meshes);
  if (!cavity) return false;

  const p = new THREE.Vector3();
  const n = new THREE.Vector3();
  const normalMatrix = new THREE.Matrix3();
  for (const mesh of meshes) {
    const { geometry } = mesh;
    if (geometry.attributes[ATTRIBUTE]) continue;
    const pos = geometry.attributes.position;
    const nor = geometry.attributes.normal;
    // Закрытость: 0 — открытое небо, 1 — полностью загорожено.
    const values = new Float32Array(pos.count);
    normalMatrix.getNormalMatrix(mesh.matrixWorld);
    for (let i = 0; i < pos.count; i++) {
      p.fromBufferAttribute(pos, i).applyMatrix4(mesh.matrixWorld);
      n.fromBufferAttribute(nor, i).applyMatrix3(normalMatrix).normalize();
      const dx = p.x - cavity.center.x;
      const dz = p.z - cavity.center.z;
      const radius = Math.hypot(dx, dz);
      const inward = radius < 1e-4 || (n.x * dx + n.z * dz) / radius < 0.3;
      const inside = radius <= radiusAt(cavity, p.y) * 1.03 && p.y >= cavity.floor - cavity.height * 0.01;
      if (!inward || !inside || p.y >= cavity.top - cavity.height * 0.01) continue;
      values[i] = 1 - openness(cavity, p.x, p.y, p.z, n.x, n.y, n.z);
    }
    geometry.setAttribute(ATTRIBUTE, new THREE.BufferAttribute(values, 1));
  }
  return true;
}

const VERTEX_DECL = /* glsl */ `
attribute float cavity;
varying float vCavity;
`;

const FRAGMENT_DECL = /* glsl */ `
varying float vCavity;
uniform float cavityStrength;
`;

// Как aomap_fragment, но из атрибута: гасится только рассеянный свет.
const FRAGMENT_APPLY = /* glsl */ `
#include <aomap_fragment>
{
	float cavityOcclusion = 1.0 - vCavity * cavityStrength;
	reflectedLight.indirectDiffuse *= cavityOcclusion;
	#if defined( USE_CLEARCOAT )
		clearcoatSpecularIndirect *= cavityOcclusion;
	#endif
	#if defined( USE_SHEEN )
		sheenSpecularIndirect *= cavityOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float cavityDotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( cavityDotNV, cavityOcclusion, material.roughness );
	#endif
}
`;

// Ставит хук на материал сетки с атрибутом cavity. Прежний хук (печать крафта,
// core/printShading.js) не теряется — вызывается первым.
export function installCavityShading(mesh) {
  if (!mesh.geometry?.attributes?.[ATTRIBUTE]) return;
  const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
  for (const material of materials) {
    if (!material || material.userData.cavityShading) continue;
    if (!material.isMeshStandardMaterial) continue;
    const previous = material.onBeforeCompile;
    material.onBeforeCompile = (shader, renderer) => {
      previous?.call(material, shader, renderer);
      shader.uniforms.cavityStrength = STRENGTH;
      shader.vertexShader = VERTEX_DECL + shader.vertexShader.replace(
        '#include <begin_vertex>',
        '#include <begin_vertex>\n\tvCavity = cavity;',
      );
      shader.fragmentShader = FRAGMENT_DECL + shader.fragmentShader.replace('#include <aomap_fragment>', FRAGMENT_APPLY);
    };
    const previousKey = material.customProgramCacheKey?.bind(material);
    material.customProgramCacheKey = () => `${previousKey?.() ?? ''}|cavity`;
    material.userData.cavityShading = true;
    material.needsUpdate = true;
  }
}
