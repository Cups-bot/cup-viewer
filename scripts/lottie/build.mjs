// Lottie-анимации интерфейса — в манере colorcups.ru: плоский линейный рисунок,
// тёмный контур, краски CMYK, синие искры. Рисуются кодом, а не в After
// Effects: так их можно править числами и держать в одном стиле.
//
//   node scripts/lottie/build.mjs   → assets/lottie/*.json
//
// Цвета-метки INK и PAPER подменяются под тему при загрузке (js/ui/lottie.js):
// в тёмной теме контур светлый, а «бумага» — цвета карточки.

import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = resolve(dirname(fileURLToPath(import.meta.url)), '../../assets/lottie');
const FPS = 60;

const hex = (h) => [1, 3, 5].map((i) => Math.round((parseInt(h.slice(i, i + 2), 16) / 255) * 1000) / 1000).concat(1);
export const INK = hex('#1d1d1f');
export const PAPER = hex('#ffffff');
const CYAN = hex('#00a3e0');
const MAGENTA = hex('#e6007e');
const YELLOW = hex('#ffd400');
const BLUE = hex('#0071e3');
const STROKE = 2.6;

// ── Примитивы формата ───────────────────────────────────────────────────

const val = (k) => ({ a: 0, k });
const list = (x) => (Array.isArray(x) ? x : [x]);
const EASE = {
  out: { o: { x: [0.22], y: [1] }, i: { x: [0.36], y: [1] } },
  inOut: { o: { x: [0.45], y: [0] }, i: { x: [0.55], y: [1] } },
  back: { o: { x: [0.34], y: [1.56] }, i: { x: [0.64], y: [1] } },
  lin: { o: { x: [0], y: [0] }, i: { x: [1], y: [1] } },
};

// frames: [[кадр, значение, изгиб?], ...] — изгиб действует до следующего ключа.
function anim(frames) {
  return {
    a: 1,
    k: frames.map(([t, value, ease = EASE.out], index) =>
      index < frames.length - 1 ? { t, s: list(value), o: ease.o, i: ease.i } : { t, s: list(value) },
    ),
  };
}

const prop = (x) => (x && typeof x === 'object' && 'a' in x ? x : val(x));

function transform({ p = [0, 0], a = [0, 0], s = [100, 100], r = 0, o = 100 } = {}) {
  return { ty: 'tr', p: prop(p), a: prop(a), s: prop(s), r: prop(r), o: prop(o), sk: val(0), sa: val(0) };
}

const group = (nm, items, tr) => ({ ty: 'gr', nm, it: [...items, transform(tr)] });
const fill = (c, o = 100) => ({ ty: 'fl', c: val(c), o: prop(o), r: 1, bm: 0 });
const stroke = (c, w = STROKE, o = 100) => ({ ty: 'st', c: val(c), o: prop(o), w: val(w), lc: 2, lj: 2, ml: 4, bm: 0 });
const rect = (cx, cy, w, h, r = 0) => ({ ty: 'rc', d: 1, p: val([cx, cy]), s: prop([w, h]), r: val(r) });
const ellipse = (cx, cy, w, h) => ({ ty: 'el', d: 1, p: val([cx, cy]), s: prop([w, h]) });
const trim = (e, s = 0) => ({ ty: 'tm', s: prop(s), e: prop(e), o: val(0), m: 1 });

function path(points, closed = true) {
  const zero = points.map(() => [0, 0]);
  return { ty: 'sh', ks: val({ i: zero, o: zero, v: points, c: closed }) };
}

// Дуга эллипса кривыми Безье (для стрелки оборота).
function arc(cx, cy, rx, ry, from, to, steps = 4) {
  const v = [];
  const i = [];
  const o = [];
  const k = (4 / 3) * Math.tan((to - from) / steps / 4);
  for (let n = 0; n <= steps; n++) {
    const t = from + ((to - from) * n) / steps;
    const x = cx + rx * Math.cos(t);
    const y = cy + ry * Math.sin(t);
    const dx = -rx * Math.sin(t) * k;
    const dy = ry * Math.cos(t) * k;
    v.push([x, y]);
    i.push([-dx, -dy]);
    o.push([dx, dy]);
  }
  return { ty: 'sh', ks: val({ i, o, v, c: false }) };
}

let layerIndex = 0;
function layer(nm, shapes, { ip = 0, op, p = [0, 0], a = [0, 0], s = [100, 100], r = 0, o = 100 } = {}) {
  layerIndex += 1;
  return {
    ddd: 0,
    ind: layerIndex,
    ty: 4,
    nm,
    sr: 1,
    ks: { o: prop(o), r: prop(r), p: prop(p), a: prop(a), s: prop(s) },
    ao: 0,
    shapes,
    ip,
    op,
    st: 0,
    bm: 0,
  };
}

function doc(nm, w, h, op, layers) {
  layerIndex = 0;
  // Слои в Lottie рисуются сверху вниз: первый в списке — поверх остальных.
  return { v: '5.7.4', fr: FPS, ip: 0, op, w, h, nm, ddd: 0, assets: [], layers };
}

// ── Стакан ──────────────────────────────────────────────────────────────

// Контур стакана: корпус-трапеция и ободок. Точки — от центра дна.
function cupShape({ cx, bottom, height, top, base }) {
  const y0 = bottom - height;
  const body = path([
    [cx - top / 2, y0 + 3],
    [cx - base / 2, bottom],
    [cx + base / 2, bottom],
    [cx + top / 2, y0 + 3],
  ]);
  const rim = rect(cx, y0 + 1.5, top + 6, 6, 3);
  return { body, rim, y0 };
}

// Полосы печати внутри стакана — трапеции по конусу стенки, снизу вверх.
function bands(cup, colors, { from, step, grow = 16 }) {
  const { cx, bottom, height, top, base } = cup;
  const inner = height - 8;
  const band = inner / colors.length;
  const widthAt = (y) => base + ((top - base) * (bottom - y)) / height;
  return colors.map((color, n) => {
    const y1 = bottom - 2 - band * n;
    const y0 = y1 - band + 0.6;
    const w1 = widthAt(y1) - 5;
    const w0 = widthAt(y0) - 5;
    const shape = path([
      [cx - w0 / 2, y0],
      [cx - w1 / 2, y1],
      [cx + w1 / 2, y1],
      [cx + w0 / 2, y0],
    ]);
    const t = from + step * n;
    return group(`band ${n + 1}`, [shape, fill(color)], {
      p: [cx, y1],
      a: [cx, y1],
      s: anim([[0, [100, 0]], [t, [100, 0], EASE.out], [t + grow, [100, 100]]]),
    });
  });
}

function cupLayer(nm, cup, { op, paper = true, extra = [], tr = {} }) {
  const { body, rim } = cupShape(cup);
  const outline = group('outline', [body, stroke(INK), ...(paper ? [fill(PAPER)] : [])]);
  const rimGroup = group('rim', [rim, stroke(INK), fill(PAPER)]);
  return layer(nm, [rimGroup, ...extra, outline], { op, ...tr });
}

// Искра «+» — как у colorcups: появляется, крутится и гаснет.
function spark(nm, x, y, at, { op, size = 7, color = BLUE } = {}) {
  const bar = (w, h) => rect(0, 0, w, h, 1);
  return layer(
    nm,
    [group('plus', [bar(size * 2, 2.4), bar(2.4, size * 2), fill(color)])],
    {
      op,
      p: [x, y],
      s: anim([[0, [0, 0]], [at, [0, 0], EASE.back], [at + 14, [100, 100]], [at + 40, [100, 100], EASE.inOut], [at + 54, [0, 0]]]),
      r: anim([[at, 0, EASE.out], [at + 54, 90]]),
    },
  );
}

// Появление с пружиной и уход в конце цикла — цикл замыкается без скачка.
const popIn = (at, end) =>
  anim([[0, [0, 0]], [at, [0, 0], EASE.back], [at + 18, [100, 100]], [end - 16, [100, 100], EASE.inOut], [end, [0, 0]]]);
const fadeOut = (end) => anim([[0, 100], [end - 14, 100, EASE.inOut], [end, 0]]);

// ── Анимации ────────────────────────────────────────────────────────────

// «Выберите стакан»: три стакана разного роста, средний выбирается и
// получает печать.
function pick() {
  const W = 220;
  const H = 150;
  const OP = 240;
  const floor = 126;
  const cups = [
    { cx: 42, bottom: floor, height: 50, top: 40, base: 28 },
    { cx: 110, bottom: floor, height: 70, top: 48, base: 32 },
    { cx: 178, bottom: floor, height: 90, top: 44, base: 28 },
  ];
  const layers = [];
  // Рамка выбора вокруг среднего — рисуется обводкой.
  const sel = cups[1];
  layers.push(
    layer('select', [group('ring', [rect(sel.cx, floor - sel.height / 2 - 3, sel.top + 22, sel.height + 26, 14), trim(anim([[0, 0], [70, 0, EASE.inOut], [100, 100]])), stroke(BLUE, 2.4)])], { op: OP, o: fadeOut(OP) }),
    layer('check', [group('tick', [path([[-4, 0.5], [-1, 3.5], [4.5, -2.5]], false), stroke(hex('#ffffff'), 2.2)]), group('dot', [ellipse(0, 0, 18, 18), fill(BLUE)])], {
      op: OP,
      p: [sel.cx + sel.top / 2 + 11, floor - sel.height - 16],
      s: popIn(98, OP),
    }),
    spark('spark', sel.cx - sel.top / 2 - 18, floor - sel.height - 6, 130, { op: OP }),
  );
  cups.forEach((cup, n) => {
    const extra = n === 1 ? bands(cup, [CYAN, MAGENTA, YELLOW], { from: 110, step: 12 }) : [];
    layers.push(
      cupLayer(`cup ${n + 1}`, cup, {
        op: OP,
        extra,
        tr: { p: [cup.cx, floor], a: [cup.cx, floor], s: popIn(6 + n * 10, OP) },
      }),
    );
  });
  layers.push(layer('floor', [group('line', [path([[16, floor + 1.5], [W - 16, floor + 1.5]], false), stroke(INK, 1.6, 25)])], { op: OP, o: fadeOut(OP) }));
  return doc('pick', W, H, OP, layers);
}

// «Загрузить макет»: лист с краской опускается в стакан и ложится на стенку.
function wrap() {
  const W = 160;
  const H = 130;
  const OP = 200;
  const cup = { cx: 80, bottom: 118, height: 66, top: 52, base: 36 };
  const sheet = group('sheet', [
    group('stripes', [
      group('c', [rect(-14, 0, 12, 26, 1.5), fill(CYAN)]),
      group('m', [rect(0, 0, 12, 26, 1.5), fill(MAGENTA)]),
      group('y', [rect(14, 0, 12, 26, 1.5), fill(YELLOW)]),
    ]),
    group('paper', [rect(0, 0, 50, 36, 5), stroke(INK), fill(PAPER)]),
  ]);
  const layers = [
    spark('spark', 126, 50, 128, { op: OP }),
    layer('sheet', [sheet], {
      op: OP,
      p: anim([[0, [80, -30]], [8, [80, -30], EASE.back], [36, [80, 30]], [58, [80, 30], EASE.inOut], [84, [80, 86]]]),
      s: anim([[58, [100, 100], EASE.inOut], [84, [50, 35]]]),
      o: anim([[74, 100, EASE.inOut], [86, 0]]),
    }),
    cupLayer('cup', cup, {
      op: OP,
      extra: bands(cup, [CYAN, MAGENTA, YELLOW], { from: 84, step: 10 }),
      tr: { p: [cup.cx, cup.bottom], a: [cup.cx, cup.bottom], s: popIn(20, OP) },
    }),
  ];
  return doc('wrap', W, H, OP, layers);
}

// Загрузка клиента: контур стакана рисуется, стенка «запечатывается».
function print() {
  const W = 120;
  const H = 130;
  const OP = 180;
  const cup = { cx: 60, bottom: 116, height: 84, top: 60, base: 40 };
  const { body, rim } = cupShape(cup);
  const draw = anim([[0, 0], [6, 0, EASE.inOut], [46, 100]]);
  const layers = [
    spark('spark', 96, 30, 112, { op: OP }),
    layer('outline', [group('rim', [rim, trim(draw), stroke(INK)]), group('body', [body, trim(draw), stroke(INK)])], { op: OP, o: fadeOut(OP) }),
    layer('print', bands(cup, [CYAN, MAGENTA, YELLOW, hex('#35a17a')], { from: 44, step: 12 }), { op: OP, o: fadeOut(OP) }),
    layer('paper', [group('paper', [body, fill(PAPER)])], { op: OP, o: anim([[0, 0], [30, 0, EASE.inOut], [46, 100], [OP - 14, 100, EASE.inOut], [OP, 0]]) }),
  ];
  return doc('print', W, H, OP, layers);
}

// Метка на стенке вращающегося стакана: проходит слева направо, сужаясь у
// краёв, и уходит «за стакан». Две метки со сдвигом в полцикла — одна видна
// всегда.
function logoPatch(color, phase, OP) {
  const half = OP / 2;
  const t0 = phase % OP;
  const x = (t) => {
    const u = ((t - t0 + OP) % OP) / half;
    return u <= 1 ? 17 + 14 * (0.5 - Math.cos(Math.PI * u) / 2) : 17;
  };
  const w = (t) => {
    const u = ((t - t0 + OP) % OP) / half;
    return u <= 1 ? 25 + 75 * Math.sin(Math.PI * u) : 25;
  };
  const visible = (t) => (((t - t0 + OP) % OP) / half <= 1 ? 100 : 0);
  const times = Array.from({ length: 13 }, (_, n) => Math.round((OP * n) / 12));
  const hold = { o: { x: [0], y: [0] }, i: { x: [1], y: [1] } };
  return group(`patch ${phase}`, [rect(0, 0, 8, 8, 2), fill(color)], {
    p: anim(times.map((t) => [t, [x(t), 24], EASE.lin])),
    a: [0, 0],
    s: anim(times.map((t) => [t, [w(t), 100], EASE.lin])),
    o: { a: 1, k: times.map((t, n) => (n < times.length - 1 ? { t, s: [visible(t)], h: 1, ...hold } : { t, s: [visible(t)] })) },
  });
}

// Видео: стакан покачивается, полосы печати бегут по стенке навстречу друг
// другу и сужаются у края — так читается поворот цилиндра; под ним стрелка.
function turn() {
  const W = 48;
  const H = 48;
  const OP = 120;
  const cup = { cx: 24, bottom: 36, height: 26, top: 22, base: 15 };
  const layers = [
    layer('arrow', [
      group('arc', [arc(24, 38, 17, 5, Math.PI * 0.15, Math.PI * 0.95), trim(anim([[0, 0, EASE.inOut], [50, 100], [OP, 100]]), anim([[40, 0, EASE.inOut], [100, 100], [OP, 100]])), stroke(BLUE, 2)]),
    ], { op: OP }),
    cupLayer('cup', cup, {
      op: OP,
      extra: [logoPatch(CYAN, 0, OP), logoPatch(MAGENTA, OP / 2, OP)],
      tr: { r: anim([[0, -3, EASE.inOut], [OP / 2, 3, EASE.inOut], [OP, -3]]), p: [24, 36], a: [24, 36] },
    }),
  ];
  return doc('turn', W, H, OP, layers);
}

// Фото: рамка видоискателя сжимается вокруг стакана, вспышка.
function shot() {
  const W = 48;
  const H = 48;
  const OP = 120;
  const cup = { cx: 24, bottom: 35, height: 22, top: 18, base: 12 };
  const corner = (x, y, dx, dy) => path([[x + dx * 6, y], [x, y], [x, y + dy * 6]], false);
  const corners = group('corners', [corner(8, 8, 1, 1), corner(40, 8, -1, 1), corner(8, 40, 1, -1), corner(40, 40, -1, -1), stroke(BLUE, 2.4)], {
    p: [24, 24],
    a: [24, 24],
    s: anim([[0, [125, 125], EASE.back], [26, [100, 100]], [90, [100, 100], EASE.inOut], [OP, [125, 125]]]),
  });
  const layers = [
    layer('flash', [group('flash', [ellipse(24, 24, 44, 44), fill(hex('#ffffff'))])], { op: OP, o: anim([[0, 0], [30, 0, EASE.out], [34, 55, EASE.out], [56, 0]]) }),
    layer('frame', [corners], { op: OP }),
    cupLayer('cup', cup, { op: OP, extra: bands(cup, [CYAN, MAGENTA], { from: 40, step: 8, grow: 12 }) }),
  ];
  return doc('shot', W, H, OP, layers);
}

await mkdir(OUT, { recursive: true });
for (const build of [pick, wrap, print, turn, shot]) {
  const data = build();
  await writeFile(resolve(OUT, `${data.nm}.json`), JSON.stringify(data));
  console.log(`${data.nm}.json  ${data.w}×${data.h}, ${(data.op / FPS).toFixed(1)} с`);
}
