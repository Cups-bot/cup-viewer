import * as THREE from 'three';

// Фон сцены.
//
// Рисуется НЕ в 3D, а под прозрачным холстом: тонмаппинг применяется ко всему
// кадру целиком вместе с заливкой, и ровный светло-голубой превращался в
// невнятный серый (см. core/scene.js).
//
// Заливка не плоская, а с мягким световым пятном за предметом — так снимают в
// студии: на фон ставят отдельный источник, и предмет отделяется от него
// перепадом яркости, а не только контуром. На ровной заливке стакан выглядит
// вырезанным и наклеенным.
//
// Одно и то же пятно нужно двум местам: CSS рисует его на странице, canvas —
// при сохранении снимка. Поэтому геометрия пятна описана здесь один раз.

// Центр пятна и его радиус в долях от большей стороны сцены.
const GLOW = { x: 0.5, y: 0.4, radius: 0.85 };
// Насколько центр светлее заливки и насколько края темнее её.
//
// Одного осветления центра мало: на светлом фоне (#eaf5ff) подъём к белому
// почти не виден — цвет и так у верхней границы. Работает именно перепад, и
// набирается он с двух сторон.
const GLOW_LIFT = 0.07;
const EDGE_DROP = 0.09;

// Три цвета градиента: подсвеченный центр, сама заливка и притемнённый край.
export function backdropColors(value) {
  const base = new THREE.Color(value);
  const glow = base.clone().lerp(new THREE.Color(0xffffff), GLOW_LIFT);
  const edge = base.clone().lerp(new THREE.Color(0x000000), EDGE_DROP);
  return {
    base: `#${base.getHexString()}`,
    glow: `#${glow.getHexString()}`,
    edge: `#${edge.getHexString()}`,
  };
}

// Значение для CSS-свойства background.
export function backdropCss({ base, glow, edge }) {
  const { x, y, radius } = GLOW;
  return (
    `radial-gradient(circle at ${x * 100}% ${y * 100}%, ` +
    `${glow} 0%, ${base} ${radius * 55}%, ${edge} ${radius * 100}%)`
  );
}

// Тот же фон, залитый в 2D-контекст, — для снимка сцены.
export function paintBackdrop(ctx, width, height, { base, glow, edge }) {
  const { x, y, radius } = GLOW;
  const cx = width * x;
  const cy = height * y;
  const r = Math.max(width, height) * radius;

  const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
  gradient.addColorStop(0, glow);
  gradient.addColorStop(0.55, base);
  gradient.addColorStop(1, edge);

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}
