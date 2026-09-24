// Сидированный Math.random для страницы съёмки. Импортируется ПЕРВЫМ: шум
// денойзера GTAO (SimplexNoise) и процедурное волокно бумаги берут
// Math.random при создании, и без сида каждый прогон давал бы свой кадр.
let state = 0x9e3779b9;
Math.random = () => {
  // mulberry32
  state = (state + 0x6d2b79f5) | 0;
  let t = Math.imul(state ^ (state >>> 15), 1 | state);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
