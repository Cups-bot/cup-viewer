# Дизайны печати для пластикового стакана 500 мл

## 8 окружений × 1 и 2 плашечных цвета × плоский прямоугольник 2:1

Дата исследования: 7 сентября 2026 года.

Это концептуальный prompt-pack для генерации **плоских принтов**, а не мокапов. Каждый вариант рассчитан на перенос на полупрозрачный/молочный пластиковый стакан 500 мл. Прозрачная или белёсая поверхность стакана не считается печатной краской.

## Главная идея серии

Восемь стаканов должны восприниматься как коллекция: у каждого свой мир, но одна дисциплина. Общий код серии:

- один сильный визуальный механизм вместо набора декоративных эффектов;
- две точки узнавания на окружности: главный знак примерно на 25% ширины и вторичный примерно на 75%;
- прозрачный пластик работает как полноценный третий материал — незапечатанные участки пропускают напиток и свет;
- принт не требует стыковки: у левого и правого края есть спокойные незапечатанные зоны, никакая линия или буква не должна продолжаться через технологический разрыв;
- сложность создаётся ритмом, масштабом, негативным пространством, штрихом и наложением двух плашек, а не фотографиями и RGB-эффектами;
- логотип и копирайт добавляются в Illustrator после генерации, чтобы не зависеть от ошибок AI-текста.

## Что показал рынок и как это применено

В актуальном отчёте Pentawards 2025–2026 заметны несколько направлений, особенно полезных для стакана: **Upfront Font** — упаковка получает лицо через крупную графическую форму; **Display Drama** — несколько единиц складываются в заметную визуальную систему; **fashionization** — упаковку хочется держать, фотографировать и коллекционировать; также растут игровые, «дофаминовые», космические и скульптурные мотивы. Источники: [Pentawards Trends Reports](https://pentawards.com/live/en/page/pentawards-trends-reports), [обзор десяти трендов 2026](https://roastbrief.us/10-global-shifts-redefining-packaging-as-art-experience-and-cultural-influence-for-2026/).

Для русскоязычного рынка характерна формула «минимализм / тихая роскошь / генеративная графика», а стакан всё чаще рассматривается как часть единой коммуникации бренда, а не место для одинокого логотипа. Источник: [обзор трендов дизайна стаканов](https://promo.mycoffeecups.ru/blog/trendy-dizayna-minimalizm-tikhaya-roskosh-i-generativnaya-grafika).

Вывод для этой серии: не копировать буквальные «кофейные зёрна», листья и волны из стоков. Вместо этого каждый принт превращает физику конкретной сцены — свет, лёд, воду, город, интерьер — в собственный графический язык. За счёт повторяемого каркаса восемь дизайнов можно продавать как лимитированную коллекцию или выбирать по типу заведения.

## Важное про печать и отсутствие стыковки

Типовые требования поставщиков холодных стаканов: векторная графика, отдельная плашка на каждый цвет, Pantone/PMS, фактический шаблон зоны печати; градиенты и фотографии для обычной шелкографии не подходят. На некоторых линиях между концами круговой печатной формы остаётся около 1/8 дюйма, а сплошная круговая заливка может быть недоступна. Источники: [HT Printers — cup artwork guidelines](https://htprinters.com/printing/resources/artwork-guidelines.html), [Sleeve A Message — cold cup specifications](https://sleeveamessage.com/cup-design-specs/).

Поэтому здесь «без стыковки по шву» означает:

- слева и справа оставлять по 4–6% ширины как незапечатанный **seam buffer**;
- мотивы у краёв заканчивать точкой, коротким штрихом или отдельным модулем;
- не проводить через край горизонтальные полосы, окружности, рамки, слова или контуры;
- не делать сплошную фоновую заливку;
- главные элементы держать в двух безопасных фронтальных полях, а технологический разрыв превращать в намеренную паузу.

Для концептов ниже принят консервативный минимум: позитивная линия от 0,8 мм, негативный просвет от 1,2 мм, мелкий текст не генерировать. Реальные ограничения нужно подтвердить у выбранной типографии. Финальная форма печати для конического стакана строится по их шаблону: прямоугольник 2:1 — композиционный мастер, не готовый препресс.

## Технический стандарт для всех генераций

- Холст: **4096 × 2048 px**, landscape, строго 2:1.
- Результат: только плоская прямоугольная графика, фронтальный ортографический вид.
- Не изображать стакан, крышку, напиток, руки, стол, интерьер, мокап, тени, блики пластика, перспективу или 3D.
- Не делать рамку по периметру и не ставить технические метки.
- Верхняя и нижняя спокойные зоны: по 6% высоты.
- Левая и правая зоны без стыковки: по 5% ширины.
- Только указанные плашечные цвета и незапечатанная прозрачная основа.
- Без градиентов, полупрозрачности, blur, glow, фотографии, реалистических текстур, CMYK-смешения и случайных дополнительных оттенков.
- Векторный характер: замкнутые формы, чистые контуры, пригодность к трассировке и ручной сборке в Illustrator.
- Не генерировать слова, логотипы, псевдобуквы, штрихкоды и мелкие подписи. Вместо них оставлять спокойные бренд-зоны.

---

# 01. STUDIO — «OPTICAL STANDARD / Оптический эталон»

**Исходная сцена:** `studio_500ml_clean.png` — нейтральный серый фотобокс, ровный мягкий свет, чистая форма стакана.

**Маркетинговая роль:** универсальный премиальный стакан для кофейной сети, кейтеринга, выставки или B2B-линейки. Он должен выглядеть точным, современным и уверенным даже без яркого окружения.

**Сильный ход:** калибровочные дуги и оптические поля собираются в абстрактный знак линзы. При повороте стакана ритм «фокусируется» и «расфокусируется».

**Рекомендуемый копирайт для ручной верстки:** «Чистая форма. Сильный вкус.» / `CLEAN FORM. FULL FLAVOR.`

### 01A — один цвет

Цвет: насыщенный графит, ориентир Pantone Black 7 C.

```text
Create a premium one-spot-color wrap artwork for a 500 ml translucent plastic cup. Output ONLY the flat rectangular print design, orthographic front view, exact 2:1 landscape ratio, 4096 × 2048 px; no cup mockup and no environment.

Concept: OPTICAL STANDARD — a precise visual calibration system transformed into a memorable beverage identity. Use a single solid graphite spot ink on an otherwise unprinted transparent substrate. Build two large off-center optical “lens” events at 25% and 75% of the canvas width. Each event is made from clean concentric arcs, cropped circles, short radial ticks and progressively spaced contour bands. The first lens feels sharply focused and dense; the second opens into generous negative space. Connect the two areas only through a few isolated calibration dots and short dashes, never through one continuous line.

The artwork must read from three distances: from far away, two bold circular silhouettes; at arm’s length, a sophisticated rhythm of arcs; up close, precise micro-ticks. Reserve a calm rectangular brand window inside each lens, but render no text or fake letters. Use asymmetry and controlled negative space, not decorative symmetry. Keep the design suitable for vector tracing and screen printing: solid shapes only, minimum positive line about 0.8 mm, minimum reversed gap about 1.2 mm, no halftones.

Seam-safe construction: leave the outermost 5% on both left and right completely unprinted; no motif should touch or visually continue across those edges. Leave 6% calm space at top and bottom. No full flood background.

Strict exclusions: no gradients, no gray tints, no opacity, no glow, no shadows, no photographs, no 3D, no perspective, no frame, no registration marks, no words, no logo, no barcode, no extra color. Crisp agency-grade flat vector poster language, exact one-color artwork plus transparent substrate.
```

### 01B — два цвета

Цвета: графит Pantone Black 7 C + сигнальный красно-оранжевый Pantone 172 C.

```text
Create a high-end two-spot-color wrap artwork for a 500 ml translucent plastic cup. Output ONLY a flat 4096 × 2048 px rectangular design, exact 2:1 landscape ratio, orthographic and ready to be rebuilt as vector art; do not show a cup or mockup.

Concept: OPTICAL STANDARD / SIGNAL LOCK. Use exactly two solid inks: deep graphite and signal vermilion; all remaining areas are unprinted transparent cup material. At 25% width, construct a large graphite optical lens from bold concentric arcs and stepped contour bands. At 75% width, create a second, more open lens in graphite. The vermilion acts like an active measurement signal: one offset crescent, three oversized target dots, and a short sequence of rectangular pulses that cross selected graphite forms. Where colors meet, use generous registration-tolerant overlaps of at least 1.5 mm or clear knockout gaps; never depend on hairline alignment. Any overlap may create a controlled darker third visual tone, but physically only two inks are used.

Make the design visually iconic from a distance and technically fascinating up close. Provide one calm brand window within each lens and one narrow copy lane below the visual center, but generate no text. Use one dominant gesture, not a collage. The composition should feel like precision instrumentation translated into premium hospitality branding.

Seam-safe: outer 5% on left and right stays completely unprinted; terminate pulses and arcs before those zones, with no continuous element that must reconnect. Top and bottom 6% remain quiet. No full-wrap solid background.

Strictly exclude gradients, transparency within inks, shadows, glow, blur, photographic texture, raster noise, perspective, cup render, typography, pseudo-letters, barcode, border, extra hues or CMYK effects. Exactly graphite + vermilion + unprinted substrate, clean closed vector shapes, screen-printable line weights.
```

---

# 02. S12 CREAM — «SOFT MONOLITH / Мягкий монолит»

**Исходная сцена:** `s12_cream_500ml_clean.png` — тёплая кремовая архитектура, мягкие арки и скульптурные объёмы.

**Маркетинговая роль:** specialty coffee, десертный бар, отель, бьюти- или lifestyle-коллаборация. Дизайн должен быть тактильным на вид, спокойным, но фотогеничным.

**Сильный ход:** непрерывное ощущение сложенной ленты создаётся отдельными «лепестками», которые не требуют соединения на шве.

**Копирайт:** «Мягкий вкус. Яркий момент.» / `SOFT TASTE. BRIGHT MOMENT.`

### 02A — один цвет

Цвет: обожжённая терракота, ориентир Pantone 7586 C.

```text
Design a one-spot-color premium wrap graphic for a 500 ml translucent plastic cup. Return ONLY the flat artwork as a 4096 × 2048 px landscape rectangle, exact 2:1 ratio, orthographic view; no mockup, cup, drink or interior.

Concept: SOFT MONOLITH — warm sculptural architecture reduced to one memorable ink gesture. Use one solid burnt-terracotta spot color and the unprinted transparent substrate. Build a family of oversized folded-ribbon silhouettes: broad rounded arches, deep cut-out notches and soft monolithic “petals.” The shapes must feel carved from one warm material, not like generic blobs. Organize them into two hero clusters centered near 25% and 75% width. Each cluster contains one dominant arch and two smaller counter-shapes; large negative apertures create the sensation of light passing through an architectural pavilion.

Add a restrained secondary layer of sparse contour lines inside only two forms, with wide spacing and robust printable weight. No gradients or shading: depth must come entirely from overlaps, cut-outs and scale contrast. Leave one quiet capsule-shaped brand field in the first cluster and one vertical copy field in the second, but do not generate text. The result should feel editorial, tactile, hospitality-led and collectible — quiet luxury with a strong silhouette rather than beige minimalism.

Seam-safe: keep the outermost 5% of both side edges fully unprinted. Every ribbon ends as an independent rounded cap before the seam buffer; nothing needs to align around the cup. Keep 6% clear space at top and bottom. Avoid a solid background flood.

Exactly one ink only. No additional beige, brown or shadow tones, no opacity, halftone, noise, photograph, fabric texture, 3D render, perspective, border, logo, readable text or fake typography. Clean vector-like closed shapes, minimum 0.8 mm positive strokes and 1.2 mm negative gaps.
```

### 02B — два цвета

Цвета: терракота Pantone 7586 C + глубокий эспрессо Pantone 476 C.

```text
Create a sophisticated two-spot-color wrap design for a 500 ml translucent plastic cup. Output ONLY a flat 2:1 landscape artwork, 4096 × 2048 px, orthographic; never show the physical cup or a scene.

Concept: SOFT MONOLITH / SHADOW COURTYARD. Use exactly two solid spot inks: warm terracotta and deep espresso brown, with unprinted transparent substrate as open light. Construct two asymmetric architectural clusters near 25% and 75% width. Terracotta forms are large folded arches and inflated paper-like petals. Espresso appears only as deliberate “shadow cuts”: heavy crescent notches, a few short contour bands and one bold groundless portal shape. The second ink must occupy no more than 28% of the printed area so it reads as depth and focus, not as a second wallpaper.

Create a cinematic rhythm without gradients: terracotta shapes partially overlap espresso shapes with 1.5–2 mm registration-tolerant traps; elsewhere use generous knockout gaps. The whole image should suggest warm afternoon light moving across sculptural plaster, translated into precise screen-print geometry. Include two calm unprinted brand windows placed on opposite halves for visibility from multiple angles, and one narrow horizontal campaign-copy lane, but generate no text.

Seam-safe: keep 5% completely blank at both left and right edges, and end every form with an intentional rounded or angled cap before that zone. No line, arch or word may depend on joining across the seam. Keep 6% top and bottom quiet. No full background flood.

Strictly two colors only. No gradients, opacity, third brown, cream ink, shadow simulation, photographic texture, realistic paper, 3D, cup mockup, perspective, decorative border, typography, symbols that resemble letters, barcode or tiny details. Bold vector forms, minimum printable line and gap sizes.
```

---

# 03. S14 URBAN — «CITY PAUSE / Городская пауза»

**Исходная сцена:** `s14_urban_500ml_clean.png` — холодный городской фон, жёсткое солнечное пятно и диагональная тень.

**Маркетинговая роль:** городской takeaway, транспортный хаб, кампус, коворкинг. Стакан должен быть заметен в руке и читаться как короткая пауза внутри быстрого города.

**Сильный ход:** перспектива улиц превращается в ритм остановок — блоки движения обрываются перед намеренной «паузой».

**Копирайт:** «Пауза в ритме города.» / `CITY MOVES. YOU PAUSE.`

### 03A — один цвет

Цвет: асфальтовый чёрный, ориентир Pantone Black 7 C.

```text
Create a one-spot-color urban wrap graphic for a 500 ml translucent plastic cup. Output ONLY the flat rectangular print artwork, 4096 × 2048 px, exact 2:1 landscape aspect ratio, orthographic view; no cup, no environment and no presentation board.

Concept: CITY PAUSE — the speed of a city interrupted by one deliberate moment of silence. Use one solid asphalt-black spot ink plus unprinted transparent substrate. Construct an asymmetric system of thick perspective bars, compressed street-grid modules, crosswalk fragments and building-height blocks. The pattern accelerates from sparse to dense toward a large unprinted vertical “pause” near 25% width, then restarts at a different rhythm and resolves into a second quieter pause near 75% width. No literal skyline, cars, windows or map labels; this is an abstract urban identity with real directional energy.

Make three scales work together: bold diagonal bands visible across a room, mid-size rectangular blocks at hand distance, and a few robust micro-ticks suggesting transit timing. Preserve two brand fields inside the quiet pauses and a small route-like copy lane, but render no letters or words. The design should feel sharp, editorial and metropolitan, with the confidence of wayfinding graphics and the tension of hard sunlight across concrete.

Seam-safe: leave the outer 5% on both side edges unprinted. All directional bands must stop decisively before these zones; no horizontal stripe or line may require continuation across the cup seam. Leave 6% clear at top and bottom. No full flood coating.

Use exactly one solid ink, no gray, no halftone, no gradient, no blur, no distressed texture, no graffiti cliché, no stock skyline, no photography, no 3D, no perspective mockup, no border, no logo or text. Clean vector geometry, minimum positive line 0.8 mm, reversed gap 1.2 mm.
```

### 03B — два цвета

Цвета: асфальтовый Pantone Black 7 C + safety orange Pantone 1655 C.

```text
Design a bold two-spot-color wrap artwork for a 500 ml translucent plastic cup. Return ONLY a flat 4096 × 2048 px landscape rectangle, exact 2:1 ratio, orthographic and vector-like; do not render a cup, drink, table, city photo or mockup.

Concept: CITY PAUSE / SIGNAL CROSSING. Use exactly two solid spot inks: asphalt black and safety orange, with all other areas unprinted. Black builds the city’s mass: perspective slabs, compressed grid blocks and hard diagonal shadows. Orange behaves as live wayfinding: a short sequence of oversized dots, crossing bars and two angular route changes. Create a clear unprinted pause at 25% width and a second at 75%; those pauses are the brand fields visible from opposite sides of the cup.

The orange must never merely outline the black. It should interrupt, reroute and activate it, occupying roughly 20–25% of printed area. Use either 1.5 mm overprint overlaps or generous knockouts so slight two-color registration variation still looks intentional. The composition should suggest “movement stops here” and remain recognizable in a hand, on a tray, and in a group of stacked cups. Avoid literal traffic signs and generic cyberpunk graphics.

Seam-safe: keep the outermost 5% of left and right sides fully blank; every route, bar and grid ends before the buffer. Do not create any element that expects edge-to-edge alignment. Keep 6% top and bottom quiet. No wraparound solid background.

No gradients, opacity, third color, tiny lines, photo grain, realistic concrete, glow, shadow, 3D, cup mockup, text, pseudo-lettering, logo, icons, QR code or border. Exactly black + orange + unprinted substrate, bold closed vector forms suitable for spot-color screen printing.
```

---

# 04. SPOTLIGHT — «TASTE ON STAGE / Вкус на сцене»

**Исходная сцена:** `spotlight_500ml_clean.png` — почти чёрный фон, жёсткий луч и театральная светотень.

**Маркетинговая роль:** ночное мероприятие, концерт, бар, премьера, премиальный кейтеринг. Это самый драматичный и «инстаграмный» принт серии.

**Сильный ход:** стакан превращается в сцену, а незапечатанный пластик — в луч света.

**Копирайт:** «В центре вкуса.» / `TASTE TAKES THE STAGE.`

### 04A — один цвет

Цвет: глубокий чёрный, ориентир Pantone Black 6 C.

```text
Create a dramatic one-spot-color wrap design for a 500 ml translucent plastic cup. Output ONLY the flat print artwork as a 4096 × 2048 px 2:1 landscape rectangle, orthographic view; absolutely no cup mockup, stage render or background.

Concept: TASTE ON STAGE — opaque darkness cut by unprinted beams of light. Use one solid deep-black spot ink and the transparent substrate as the only light tone. Build two large black “curtains” or eclipse masses positioned around 25% and 75% width. Carve through them with broad unprinted wedges, crescents and one sharply angled spotlight aperture. The apertures must feel intentional and theatrical, not like random abstract blobs. A few solid black discs and short bars create a rhythm like stage cues; keep detail sparse and high-impact.

From far away the artwork should read as black mass plus one unmistakable beam. At hand distance, reveal a secondary sequence of circular cut-outs that suggests applause, camera flashes or a countdown without using icons. Leave a calm unprinted brand window at the focal end of each beam and a narrow copy zone beneath one aperture, but do not generate text. Make the silhouette daring enough for nightlife and refined enough for a gallery opening.

Seam-safe: outer 5% of both left and right edges must remain unprinted. Black masses must end before the seam buffer as independent vertical cuts; no stripe, crescent or contour may need to reconnect. Leave 6% quiet at top and bottom. Avoid full-wrap black flood.

Exactly one black ink. No gray, no halftones, no gradient, no glow, no blur, no light-ray rendering, no photographic grain, no 3D, no cup, no typography, no fake logo, no stars, no border. Use robust closed vector shapes and generous negative gaps for reliable screen printing.
```

### 04B — два цвета

Цвета: глубокий чёрный Pantone Black 6 C + флуоресцентный жёлтый Pantone 803 C (или обычный Pantone 116 C, если fluorescent ink недоступна).

```text
Design an unforgettable two-spot-color wrap artwork for a 500 ml translucent plastic cup. Return ONLY flat orthographic artwork, 4096 × 2048 px, exact 2:1 landscape ratio; no product mockup, no lighting scene and no presentation elements.

Concept: TASTE ON STAGE / LIVE BEAM. Use exactly two solid spot inks: deep black and fluorescent signal yellow, with transparent unprinted substrate. Black forms two monumental eclipse-like stage masses around the two main viewing zones. Yellow is a rare live signal: one thick diagonal beam, two circular flare markers and a compact sequence of rectangular cue lights. The yellow beam should pass through black using wide knockouts and a few registration-tolerant overlaps, creating the feeling that the cup itself emits a controlled flash.

Keep black dominant at about 70% of printed area and yellow rare enough to feel electric. Use a single dramatic diagonal across each viewing field, but stop it before the seam areas. Provide two unprinted brand windows at 25% and 75% width, one partly framed by black and one touched by yellow. Generate no words; typography will be added later. The result must feel like an event identity, stage poster and collectible merch object condensed into one cup graphic.

Seam-safe: both outer 5% side bands remain completely blank. No beam or bar may touch the left or right edge or require joining. Keep 6% clear at top and bottom. Do not use a full background flood.

Strictly black + yellow only; no gradient, glow, transparency, third hue, gray shading, raster texture, photograph, 3D, cup render, fake text, logo, starburst cliché, border or thin hairlines. Vector-like closed forms, minimum 0.8 mm positive detail and 1.2 mm reverse gaps; overlaps at least 1.5 mm where used.
```

---

# 05. LIVING — «SLOW GROWTH / Живой ритм»

**Исходная сцена:** `living_500ml_clean.png` — дерево, мягкое окно, зелень и домашнее тёплое спокойствие.

**Маркетинговая роль:** brunch, wellness, matcha/tea, bakery, local café. Дизайн должен быть человечным и природным, но не уходить в банальные листья.

**Сильный ход:** рост растения показан как маршрут и годовые кольца — ботаника встречается с инфографикой.

**Копирайт:** «Свежесть, которая остаётся.» / `GROWN FOR THE MOMENT.`

### 05A — один цвет

Цвет: глубокий лесной зелёный, ориентир Pantone 3435 C.

```text
Create a refined one-spot-color wrap illustration for a 500 ml translucent plastic cup. Output ONLY the flat rectangular artwork, exact 2:1 landscape ratio, 4096 × 2048 px, orthographic; no cup, beverage, plant photograph, wood table or mockup.

Concept: SLOW GROWTH — botanical life expressed as a measured path rather than decorative leaves. Use one solid forest-green spot ink plus unprinted transparent substrate. Build two large organic “growth maps” near 25% and 75% width. Each map combines broad seed-like forms, branching routes with rounded terminals, and a small number of nested rings inspired by wood growth. The branches should behave like a modern transit diagram: deliberate junctions, clear hierarchy and generous spacing. Avoid realistic foliage, herb illustrations and eco-stock symbols.

Create one strong leaf-shaped negative aperture inside each growth map, but make it geometric enough to feel proprietary. The first cluster is dense and grounded; the second rises vertically with more air. Add a few detached seed dots to guide rotation without making an all-over pattern. Reserve an unprinted brand window inside the main aperture and a second calm copy field opposite it, but render no text. The mood is warm, local, restorative and quietly premium.

Seam-safe: leave 5% unprinted at both left and right edges. All routes terminate in visible round nodes before those buffers; none of them should reconnect across the seam. Leave 6% quiet space at top and bottom. No solid background flood.

Exactly one green ink only. No gradients, green tints, halftones, watercolor, grain, wood texture, photographic plants, linework thinner than 0.8 mm, negative gaps under 1.2 mm, 3D, perspective, cup mockup, text, logo, recycling icon or border. Clean expressive vector forms with screen-print discipline.
```

### 05B — два цвета

Цвета: лесной Pantone 3435 C + тёплый кирпичный Pantone 7608 C.

```text
Create a premium two-spot-color wrap artwork for a 500 ml translucent plastic cup. Output ONLY the flat 4096 × 2048 px rectangular design, exact 2:1 landscape ratio, orthographic and vector-like; no cup or lifestyle scene.

Concept: SLOW GROWTH / SEASON MAP. Use exactly two solid spot inks: deep forest green and warm brick red; all other areas are unprinted substrate. Green builds two botanical route systems with rounded branches, growth-ring modules and large seed-like silhouettes. Brick red marks moments in the cycle: oversized fruit dots, two short arc segments and a few square “harvest” nodes. The red should never become generic decoration; each red element must sit at a meaningful junction or endpoint.

Place the two main compositions around 25% and 75% width so the cup has a recognizable face from opposite sides. One cluster feels rooted and dense, the other open and ascending. Use controlled overlaps of at least 1.5 mm or clear knockout gaps, making registration variation harmless. Leave calm unprinted spaces for a logo and short campaign line, but generate no typography. The overall result should resemble a contemporary botanical atlas crossed with a beautifully designed neighborhood map — warm, intelligent and collectible.

Seam-safe: reserve the outer 5% on left and right as blank plastic. Every branch ends in a dot before those bands; no route or contour crosses an edge. Keep 6% top and bottom quiet. No flood background.

Exactly forest green + brick red only. No gradients, opacity, third tone except a physical overprint overlap, photo texture, watercolor, realistic leaf drawing, eco badge, globe, recycling symbol, cup render, shadow, perspective, words, pseudo-letters, barcode or frame. Bold closed vector shapes with reliable minimum line and gap sizes.
```

---

# 06. WATER — «RIPPLE ENGINE / Двигатель волны»

**Исходная сцена:** `water_500ml_clean.png` — стакан завис над бирюзовой водной поверхностью и кольцами отражения.

**Маркетинговая роль:** вода, лимонад, isotonic, summer activation, sport/wellness. В руке рисунок должен казаться движущимся при повороте.

**Сильный ход:** волна превращается в оптический прибор — кольца сжимаются в импульс и снова раскрываются.

**Копирайт:** «Поймай волну.» / `CATCH THE WAVE.`

### 06A — один цвет

Цвет: яркий cyan, ориентир Pantone 3125 C.

```text
Design a one-spot-color wrap graphic for a 500 ml translucent plastic cup. Output ONLY a flat 4096 × 2048 px landscape rectangle, exact 2:1 ratio, orthographic view; do not show water, a cup mockup, a splash or any 3D scene.

Concept: RIPPLE ENGINE — the physics of a water ring turned into a proprietary kinetic identity. Use one solid bright-cyan spot ink and unprinted transparent substrate. Build two main ripple engines centered near 25% and 75% width. Each engine begins as a broad incomplete oval, compresses into a tight waveform, then releases into detached droplets and short arc fragments. The shapes should be graphic and engineered, not naturalistic. Vary line spacing to imply acceleration while keeping every line the same solid ink and safely printable.

At a distance, the two incomplete ovals form memorable eye-like symbols. At hand distance, the compressed wave sections create an optical motion effect when the cup rotates. Add only five to seven detached droplet modules across the full composition; avoid an all-over bubble pattern. Reserve two large unprinted brand apertures inside the ripple centers and one short copy lane below the first engine, but render no text.

Seam-safe: outermost 5% on left and right remains fully unprinted. Every oval is intentionally incomplete and ends with a blunt or rounded cap before the seam buffers; no ring is expected to close around the cup. Keep 6% clear at top and bottom. No full flood background.

Exactly one cyan ink only. No gradient, lighter blue, opacity, halftone, glow, realistic water, splash photography, bubbles with highlights, shadow, 3D, perspective, cup, logo, words, pseudo-text or border. Clean closed vector-like shapes, positive details at least 0.8 mm and negative gaps at least 1.2 mm.
```

### 06B — два цвета

Цвета: cyan Pantone 3125 C + глубокий ультрамарин Pantone 2746 C.

```text
Create a high-impact two-spot-color wrap design for a 500 ml translucent plastic cup. Return ONLY flat orthographic artwork at 4096 × 2048 px, exact 2:1 landscape ratio; no product mockup, water render or presentation frame.

Concept: RIPPLE ENGINE / DEEP CURRENT. Use exactly two solid spot inks: bright cyan and deep ultramarine, with the transparent cup left visible as negative space. Cyan creates broad incomplete ripple ovals and energetic droplets. Ultramarine creates the hidden current: compressed waveform bands, two deep crescents and short directional chevrons nested inside the cyan structures. The second color must make the design feel deeper and faster rather than simply adding outlines.

Build one dominant ripple engine at 25% width and one inverted engine at 75%. Use wide overlaps of 1.5–2 mm at selected intersections to form a controlled darker zone, while other intersections use clean knockouts. Keep the overall composition open enough that the drink color can participate through the unprinted substrate. Provide calm central apertures for a wordmark and short claim, but render no typography. The result should feel sporty, refreshing and technically premium — a hydration brand with a visual asset recognizable without a logo.

Seam-safe: leave 5% blank on both side edges. All ovals remain deliberately open and all waveform bands terminate before the seam buffer; nothing must align across the wrap break. Leave 6% top and bottom quiet. No flood fill.

Only cyan + ultramarine. No gradients, transparency inside ink, third blue, glow, blur, photorealistic water, foam, bubbles with highlights, 3D, cup mockup, logo, text, icons, frame or hairlines. Vector-style closed geometry with robust print tolerances.
```

---

# 07. PODIUM — «ORBIT PROTOCOL / Орбитальный протокол»

**Исходная сцена:** `podium_500ml_clean.png` — чёрный технологичный пьедестал и световая лента, проходящая вокруг героя.

**Маркетинговая роль:** запуск продукта, gaming/esports, tech conference, бренд-зона, limited drop. Стакан должен ощущаться как часть кампании, а не сувенир с логотипом.

**Сильный ход:** орбита распадается на автономные дуги и узлы; при повороте стакана зритель как будто отслеживает сигнал.

**Копирайт:** «Запуск нового вкуса.» / `LAUNCH THE FLAVOR.`

### 07A — один цвет

Цвет: глубокий чёрный, ориентир Pantone Black 6 C.

```text
Create a one-spot-color technology-event wrap artwork for a 500 ml translucent plastic cup. Output ONLY the flat rectangular design, 4096 × 2048 px, exact 2:1 landscape ratio, orthographic; no cup, podium, neon ribbon, room or mockup.

Concept: ORBIT PROTOCOL — a launch sequence expressed through monumental orbital fragments and precise signal nodes. Use one solid deep-black spot ink plus unprinted transparent substrate. Construct two independent orbital systems at 25% and 75% width. Each system has one thick incomplete ellipse, one sharply offset crescent, three large signal nodes and several short circuit-like connectors. The first orbit feels compressed and ready to launch; the second expands and sheds modules into open space. Keep all ellipses deliberately incomplete so the composition never relies on joining around the seam.

Make the design feel engineered but not like generic circuit-board wallpaper. There should be one unmistakable hero curve, a disciplined hierarchy and large breathing zones. Create a hexagonal or rectangular unprinted brand aperture inside each orbit and one short status-copy lane, but render no text, digits or interface labels. At a distance the cup should read as an iconic black orbital mark; up close the node logic rewards inspection.

Seam-safe: keep the outer 5% at both left and right completely unprinted. Every orbit and connector terminates well before these bands, with rounded or square endpoints. Keep 6% top and bottom quiet. No full-wrap background flood.

One black ink only. No gray, halftone, gradient, glow, neon simulation, thin circuit traces, sci-fi UI clutter, stars, planet illustration, photography, 3D, cup render, text, logo, QR code, barcode or border. Bold vector geometry, minimum 0.8 mm positive details and 1.2 mm reversed gaps.
```

### 07B — два цвета

Цвета: чёрный Pantone Black 6 C + яркий neon green Pantone 802 C (или Pantone 375 C для стандартной краски).

```text
Design a collectible two-spot-color wrap graphic for a 500 ml translucent plastic cup. Return ONLY the flat artwork at 4096 × 2048 px, exact 2:1 landscape ratio, orthographic and vector-like; never show a cup, stage or lighting mockup.

Concept: ORBIT PROTOCOL / ACTIVE SIGNAL. Use exactly two solid spot inks: deep black and neon green, plus unprinted transparent substrate. Black creates two heavy incomplete orbital masses around 25% and 75% width: thick ellipses, offset crescents and blocky launch modules. Neon green is the active signal that advances through the system as a sequence of three large nodes, one bent pulse bar and two short arc fragments. Green should occupy no more than 18% of the printed area and appear at decisive points, never as a decorative outline.

Use 1.5–2 mm registration-tolerant overlaps at selected node contacts and generous knockouts elsewhere. Make one orbit compact and tense, the other expanded and celebratory, suggesting before/after launch. Preserve two calm unprinted brand apertures and a narrow campaign-copy lane, but do not render letters or numbers. The visual should work as event merch: bold in photographs, recognizable from across a room, detailed enough to invite rotation in the hand.

Seam-safe: left and right outer 5% must remain fully blank. All ellipses are intentionally broken and every pulse ends before the seam buffers. Keep 6% quiet at top and bottom. No flood-coated background.

Exactly black + neon green only. No gradient, glow, opacity, third hue, realistic light, sci-fi interface clutter, micro-circuit texture, stars, planet, 3D, cup mockup, logo, words, pseudo-type, QR code, border or tiny details. Clean screen-printable vector forms with robust line and gap widths.
```

---

# 08. S07 ICE — «FREEZE INDEX / Индекс холода»

**Исходная сцена:** `s07_ice_500ml_clean.png` — холодный синий свет, крупный ледяной блок, капли и отражения.

**Маркетинговая роль:** iced drinks, cold brew, bubble tea, summer menu, energy/cold-chain activation. Визуальный сигнал должен буквально обещать холод до того, как человек видит напиток.

**Сильный ход:** не рисовать лёд, а показать «давление холода» — кристаллическая решётка уплотняется и раскалывается вокруг двух холодовых ядер.

**Копирайт:** «Холод говорит громче.» / `COLD HITS DIFFERENT.`

### 08A — один цвет

Цвет: тёмный арктический синий, ориентир Pantone 2965 C.

```text
Create a one-spot-color cold-drink wrap artwork for a 500 ml translucent plastic cup. Output ONLY a flat 4096 × 2048 px landscape rectangle, exact 2:1 ratio, orthographic; no cup mockup, ice cube, condensation, beverage or scene.

Concept: FREEZE INDEX — the pressure pattern inside ice translated into a proprietary crystalline identity. Use one solid arctic-navy spot ink and unprinted transparent substrate. Build two large fractured “cold cores” at 25% and 75% width. Each core is made from a small number of bold angular plates, thick branching fracture lines and large triangular negative apertures. The first core is dense and compressed; the second breaks outward into seven or fewer detached shards. Avoid generic snowflakes, mountain peaks and realistic ice drawings.

The design must feel both sharp and controlled. From far away, two dark crystalline emblems; at arm’s length, the fracture rhythm suggests extreme cold; up close, carefully spaced pressure ticks add precision. Create one calm unprinted brand field inside each core and a short horizontal copy lane between selected plates, but render no words. Use strong scale contrast and ample transparent space so the real drink can glow through the pattern.

Seam-safe: reserve the outer 5% at left and right as entirely unprinted. All shards and fracture lines end well before these buffers; nothing must reconnect across the seam. Keep 6% top and bottom quiet. No full-wrap solid background.

Exactly one navy ink only. No blue tints, gradient, opacity, halftone, glow, realistic frost, condensation drops, photographic texture, snowflake icon, 3D, cup, perspective, logo, text, barcode or border. Bold closed vector-like forms, minimum 0.8 mm positive line and 1.2 mm reversed gap.
```

### 08B — два цвета

Цвета: арктический тёмно-синий Pantone 2965 C + ледяной cyan Pantone 306 C.

```text
Design a premium two-spot-color wrap graphic for a 500 ml translucent plastic cup. Return ONLY flat orthographic artwork, 4096 × 2048 px, exact 2:1 landscape ratio; no product mockup, ice render or presentation board.

Concept: FREEZE INDEX / THERMAL FRACTURE. Use exactly two solid spot inks: arctic navy and ice cyan, with unprinted transparent substrate. Navy creates two heavy crystalline cold cores at 25% and 75% width using angular plates and thick fracture branches. Cyan maps the active temperature change: a few offset edge plates, three pressure rings made of broken polygonal arcs, and six or fewer sharp signal shards. Cyan should look like energy travelling through the fracture, not like a shadow or outline.

Allow selected cyan plates to overlap navy with wide 1.5–2 mm traps, producing one intentional deep overlap tone while keeping the physical print to two inks. Other color contacts use generous knockout gaps. Make the first core compact and sub-zero, the second exploding into controlled open space. Reserve two unprinted brand apertures and one calm copy lane but generate no typography. The finished language should feel fast, cold and premium, suitable for an iced menu launch rather than winter decoration.

Seam-safe: keep the outermost 5% of both side edges blank. Every polygon, ring and fracture line terminates before the seam buffers; no element expects alignment around the cup. Keep 6% clear at top and bottom. No flood background.

Exactly navy + cyan only. No gradients, opacity, third blue, glow, blur, realistic ice, snow, frost texture, condensation, 3D, cup mockup, mountain or snowflake cliché, logo, text, pseudo-letters, QR code or frame. Clean vector-ready shapes with robust screen-print line and gap sizes.
```

---

## Система бренда поверх принтов

После выбора графики логотип и текст лучше добавлять вручную, а не просить генератор рисовать буквы.

Рекомендуемая структура на окружности:

1. На 25% ширины — основной логотип или название, ширина поля 14–18% холста.
2. На 75% ширины — повторный знак, короткий слоган или маркер вкуса.
3. Нижняя строка — сайт/соцсеть/объём только при необходимости; не мельче ограничений типографии.
4. У краёв — никакой обязательной информации.
5. Для серии использовать одну гарнитуру и одну позиционную сетку; характер меняет графика, а не типографическая система.

## Как выбирать между 16 вариантами

| Задача | Самый сильный вариант |
|---|---|
| Универсальная фирменная система | 01B OPTICAL STANDARD |
| Премиальная кофейня / десерт | 02B SOFT MONOLITH |
| Массовый городской takeaway | 03B CITY PAUSE |
| Ивент / ночной бар / концерт | 04B TASTE ON STAGE |
| Wellness / matcha / local café | 05B SLOW GROWTH |
| Лимонад / вода / sport | 06B RIPPLE ENGINE |
| Tech / gaming / launch | 07B ORBIT PROTOCOL |
| Iced menu / cold brew / bubble tea | 08B FREEZE INDEX |

Если нужен один главный кандидат всей серии, начинать с **01B**: нейтральная сцена честно показывает печать, а графика достаточно самостоятельна, чтобы затем адаптироваться в 1 цвет. Для самой заметной рекламной фотографии — **04B** или **07B**. Для наиболее широкого коммерческого применения — **03B** или **06B**.

## Приёмка результата генерации

Вариант проходит дальше, только если:

- на изображении действительно один плоский прямоугольник 2:1, а не стакан;
- цветов физически ровно 1 или 2, не считая незапечатанного фона;
- левый и правый край спокойны, ничего не нужно стыковать;
- главный образ читается в маленьком превью;
- на 25% и 75% ширины есть две узнаваемые точки для разных ракурсов стакана;
- нет псевдотекста, случайных логотипов, рамки, градиента и фотографической фактуры;
- мелкие детали можно без потери смысла укрупнить до требований типографии;
- дизайн сохраняет характер именно своей сцены и не выглядит взаимозаменяемым с соседними.

## Производственный следующий шаг

1. Сгенерировать по 3 варианта каждого выбранного промпта с одинаковым seed/стилевым референсом.
2. Отобрать по одному через тест «3 секунды» и наложить на UV/мокап стакана.
3. Проверить фронт, поворот 90°, поворот 180° и технологическую паузу.
4. Перерисовать выбранный вариант в Illustrator замкнутыми векторными формами.
5. Разделить на 1 или 2 named spot swatches, согласовать Pantone, минимальные линии, реальные поля и разрыв с типографией.
6. Сделать физическую цветопробу: экранный Pantone здесь задаёт намерение, а не гарантирует результат на конкретном пластике.
