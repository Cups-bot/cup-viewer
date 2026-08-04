import * as THREE from 'three';

// Фон сцены.
//
// Рисуется НЕ в 3D, а под прозрачным холстом: тонмаппинг применяется ко всему
// кадру целиком вместе с заливкой, и ровный светло-голубой превращался в
// невнятный серый (см. core/scene.js).
//
// Заливка ровная: цвет ровно тот, что записан в config.backgrounds. Пробовали
// добавлять мягкое световое пятно за предметом — от него отказались, фон должен
// оставаться нейтральным.
//
// Один и тот же цвет нужен двум местам: CSS красит им страницу, canvas —
// подкладывает под снимок сцены. Поэтому он описан здесь один раз.

export function backdropColors(value) {
  const base = new THREE.Color(value);
  return { base: `#${base.getHexString()}` };
}

// Значение для CSS-свойства background.
export function backdropCss({ base }) {
  return base;
}

// Тот же фон, залитый в 2D-контекст, — для снимка сцены.
export function paintBackdrop(ctx, width, height, { base }) {
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, width, height);
}
