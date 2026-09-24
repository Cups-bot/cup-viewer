// Силуэт стакана по габаритам каталога — для карточек пикера и для кнопки
// текущего стакана в левой панели. Рисуется по числам, а не картинкой из
// assets/: новая модель не требует ни рендера, ни выкладки файла.

// Поле рисунка карточки в единицах SVG. Ширина с запасом: самый широкий
// стакан каталога — 89 мм по верху.
export const ART = { width: 96, height: 104, padding: 6 };

// Насколько сплюснут эллипс ободка — отношение полуосей. Смотрим на стакан
// чуть сверху, как камера в самой сцене.
const RIM_SQUASH = 0.17;

// Запас высоты под ободок: он выступает над верхней кромкой на свою полуось.
const RIM_HEADROOM = 1.1;

const SVG_NS = 'http://www.w3.org/2000/svg';

// Общий масштаб: самый высокий стакан каталога занимает поле целиком,
// остальные — пропорционально своему росту.
export function artScale(models) {
  const tallest = Math.max(...models.map((cup) => cup.size.heightMm), 1);
  return (ART.height - ART.padding * 2) / (tallest * RIM_HEADROOM);
}

function svgEl(name, attrs) {
  const node = document.createElementNS(SVG_NS, name);
  for (const [key, value] of Object.entries(attrs)) node.setAttribute(key, value);
  return node;
}

// Силуэт стакана: тень под дном, стенка, приметы типа и эллипс ободка.
//
// Геометрия честная — из size каталога, — поэтому карточки сравнимы между
// собой: у самого маленького бумажного стенка почти отвесная и низкая, у
// пластикового на 650 мл — высокая и узкая.
export function drawCup(cup, scale, { idSuffix = '' } = {}) {
  const svg = svgEl('svg', {
    class: `cup-card__art cup-card__art--${cup.wall ?? 'single'}`,
    viewBox: `0 0 ${ART.width} ${ART.height}`,
    'aria-hidden': 'true',
  });

  const size = cup.size;
  const h = size.heightMm * scale;
  const topR = (size.topMm / 2) * scale;
  const botR = (size.bottomMm / 2) * scale;
  const cx = ART.width / 2;
  // Все стаканы стоят на одной линии — иначе сравнивать их по росту нельзя.
  const baseY = ART.height - ART.padding;
  const topY = baseY - h;
  const rimRy = topR * RIM_SQUASH;
  const botRy = botR * RIM_SQUASH;

  // Стенка: от левой верхней кромки вниз, по дну и обратно вверх. Верх
  // закрывает эллипс ободка, поэтому здесь он оставлен прямым.
  const bodyPath =
    `M${cx - topR} ${topY} L${cx - botR} ${baseY} ` +
    `A${botR} ${botRy} 0 0 0 ${cx + botR} ${baseY} ` +
    `L${cx + topR} ${topY} Z`;

  svg.append(
    // Линия пола: все стаканы стоят на ней, и разница в росте читается как
    // разница в росте, а не как «мелкая картинка» на карточке.
    svgEl('line', {
      class: 'cup-card__floor',
      x1: ART.padding,
      y1: baseY + botRy,
      x2: ART.width - ART.padding,
      y2: baseY + botRy,
    }),
    svgEl('ellipse', {
      class: 'cup-card__shadow',
      cx,
      cy: baseY + botRy * 0.5,
      rx: botR * 1.25,
      ry: botRy * 1.1,
    }),
    svgEl('path', { class: 'cup-card__body', d: bodyPath }),
  );

  // Приметы типа рисуются ВНУТРИ стенки: обрезаем их её же контуром, иначе
  // рисунок тиснения вылезал бы за силуэт.
  const clipId = `cup-clip-${cup.id}${idSuffix}`;
  const defs = svgEl('defs', {});
  const clip = svgEl('clipPath', { id: clipId });
  clip.appendChild(svgEl('path', { d: bodyPath }));
  defs.appendChild(clip);
  svg.appendChild(defs);

  const marks = svgEl('g', { 'clip-path': `url(#${clipId})` });

  if (cup.wall === 'double') {
    // Обёртка двухслойного: она закрывает стенку почти целиком, кроме узкой
    // полосы у дна и самой кромки — по этим двум линиям тип и узнаётся.
    const sleeveTop = topY + h * 0.03;
    const sleeveBottom = baseY - h * 0.11;
    marks.append(
      svgEl('path', {
        class: 'cup-card__sleeve',
        d: `M${cx - topR} ${sleeveTop} L${cx - botR} ${sleeveBottom} L${cx + botR} ${sleeveBottom} L${cx + topR} ${sleeveTop} Z`,
      }),
      svgEl('line', {
        class: 'cup-card__seam',
        x1: cx - botR,
        y1: sleeveBottom,
        x2: cx + botR,
        y2: sleeveBottom,
      }),
    );
  }

  if (cup.wall === 'embossed') {
    // Тиснение: та же сетка ромбов, что на изделии. Рисуется косой решёткой —
    // на карточке в 96 единиц шириной отдельные ромбы уже неразличимы, и важна
    // именно фактура.
    const step = 7;
    const lattice = svgEl('g', { class: 'cup-card__emboss' });
    for (let x = -ART.height; x < ART.width + ART.height; x += step) {
      lattice.append(
        svgEl('line', { x1: x, y1: 0, x2: x + ART.height, y2: ART.height }),
        svgEl('line', { x1: x, y1: ART.height, x2: x + ART.height, y2: 0 }),
      );
    }
    marks.appendChild(lattice);
  }

  svg.appendChild(marks);
  svg.appendChild(
    svgEl('ellipse', { class: 'cup-card__rim', cx, cy: topY, rx: topR, ry: rimRy }),
  );
  return svg;
}
