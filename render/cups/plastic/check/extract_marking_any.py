"""Извлечение клейма дна из векторов чертежа -> params/bottom_marking.json.

На листе клеймо нарисовано обводкой глифов, и экспорт разложил каждый контур
на отдельные пути по одному сегменту. Скрипт разбивает безье, сшивает
фрагменты по совпадающим концам с допуском, приводит координаты в миллиметры
относительно оси стакана и сохраняет замкнутые петли. Дальше build.py делает
из них выпуклый рельеф средствами кривых Blender (заливка с дырками по
чётности вложенности — как в буквах P, A, 5).

PyMuPDF нужен только здесь, один раз. Сама модель работает по готовому JSON.

    python extract_marking.py <путь к PDF> [<путь к cup500>]
"""

import json
import math
import os
import sys
import collections
from collections import defaultdict

try:
    import fitz
except ImportError:
    sys.exit("нужен PyMuPDF: py -m pip install pymupdf")

USAGE = """Извлечь клеймо дна из чертежа в JSON петель.

    python extract_marking_any.py <чертёж.pdf> <куда.json> [r_bottom_mm]

Центр нижнего вида находится сам: на листе это точка, вокруг которой лежит
больше всего концентрических круглых путей. Проверено на чертеже 500 мл —
совпадает с найденным вручную центром до сотых.

Нужен PyMuPDF. В Python 3.10 этой машины он есть: запускать через `python`.
"""

if len(sys.argv) < 3:
    sys.exit(USAGE)
PDF = sys.argv[1]
OUT = sys.argv[2]
R_BOTTOM = float(sys.argv[3]) if len(sys.argv) > 3 else 28.34

MM = 25.4 / 72.0


def find_view_centre(page):
    """Центр нижнего вида: сгусток центров концентрических круглых путей."""
    votes = collections.Counter()
    for g in page.get_drawings():
        r = g["rect"]
        w, h = r.width, r.height
        if w < 5.0 or abs(w - h) > 0.03 * max(w, h):
            continue
        rad = min(w, h) / 2.0 * MM
        if not 5.0 < rad < 40.0:
            continue
        votes[(round((r.x0 + r.x1) / 2.0, 1), round((r.y0 + r.y1) / 2.0, 1))] += 1
    if not votes:
        sys.exit("на листе не найдено круглых путей: центр вида не определить")
    # нижний вид лежит в левой половине листа, справа обычно вид сверху
    left = [(c, n) for c, n in votes.items() if c[0] < page.rect.width / 2.0]
    best = max(left or list(votes.items()), key=lambda t: t[1])
    return best[0][0], best[0][1], best[1]


_doc0 = fitz.open(PDF)
CX, CY, _votes = find_view_centre(_doc0[0])
_doc0.close()
HALF = 140.0
VIEW = (CX - HALF, CY - HALF, CX + HALF, CY + HALF)
R_LO, R_HI = 8.0, R_BOTTOM - 1.19
print("центр нижнего вида: %.2f, %.2f pt (голосов %d); кольцо клейма %.2f..%.2f мм"
      % (CX, CY, _votes, R_LO, R_HI))

BEZ = 8
TOL = 2.0e-3                     # допуск сшивки концов, мм


def bez(p0, p1, p2, p3, n=BEZ):
    for i in range(1, n + 1):
        t = i / n
        m = 1.0 - t
        yield (m ** 3 * p0[0] + 3 * m * m * t * p1[0] + 3 * m * t * t * p2[0] + t ** 3 * p3[0],
               m ** 3 * p0[1] + 3 * m * m * t * p1[1] + 3 * m * t * t * p2[1] + t ** 3 * p3[1])


def to_mm(a):
    """pt -> мм от оси стакана; ось Y листа вниз, разворачиваем вверх."""
    return ((a[0] - CX) * MM, (CY - a[1]) * MM)


doc = fitz.open(PDF)
page = doc[0]

frags = []
for g in page.get_drawings():
    # bbox группы не фильтруем: экспорт складывает в одну группу пути со всего
    # листа, и по её габариту клеймо не отобрать. Отбор идёт по фрагментам.
    cur = []
    for it in g["items"]:
        if it[0] == "l":
            seg = [(it[1].x, it[1].y), (it[2].x, it[2].y)]
        elif it[0] == "c":
            a = (it[1].x, it[1].y)
            seg = [a] + list(bez(a, (it[2].x, it[2].y), (it[3].x, it[3].y), (it[4].x, it[4].y)))
        else:
            continue
        if cur and math.hypot(cur[-1][0] - seg[0][0], cur[-1][1] - seg[0][1]) < 1e-9:
            cur += seg[1:]
        else:
            if len(cur) >= 2:
                frags.append(cur)
            cur = list(seg)
    if len(cur) >= 2:
        frags.append(cur)

# только фрагменты, целиком лежащие в кольце клейма, и не куски окружностей вида
work = []
circles = 0
for f in frags:
    m = [to_mm(a) for a in f]
    if not all(VIEW[0] <= a[0] <= VIEW[2] and VIEW[1] <= a[1] <= VIEW[3] for a in f):
        continue
    rs = [math.hypot(x, y) for x, y in m]
    if min(rs) < R_LO or max(rs) > R_HI:
        continue
    work.append(m)

# Окружности дна и штриховые линии тоже попадают в кольцо клейма. И те и
# другие лежат на постоянном радиусе от оси, причём помногу на одном и том же.
# Буквы такого не дают: их штрихи радиус не держат. Поэтому радиусы, на
# которых скопилось три и более дуговых фрагмента, считаются линиями чертежа
# и выбрасываются целиком.
import collections as _c
arcish = []
for i, m in enumerate(work):
    rs = [math.hypot(x, y) for x, y in m]
    if max(rs) - min(rs) < 0.05:
        arcish.append((i, sum(rs) / len(rs)))
bins = _c.Counter(round(r / 0.1) for _, r in arcish)
drop = {i for i, r in arcish if bins[round(r / 0.1)] >= 3}
circles = len(drop)
work = [m for i, m in enumerate(work) if i not in drop]
print("фрагментов всего %d; в кольце клейма %d; отброшено дуг окружностей %d"
      % (len(frags), len(work), circles))

# --- сшивка по концам ------------------------------------------------------
CELL = TOL * 2.0


def cells(p):
    cx, cy = int(math.floor(p[0] / CELL)), int(math.floor(p[1] / CELL))
    for dx in (-1, 0, 1):
        for dy in (-1, 0, 1):
            yield (cx + dx, cy + dy)


index = defaultdict(list)
for i, f in enumerate(work):
    for end in (0, -1):
        index[(int(math.floor(f[end][0] / CELL)), int(math.floor(f[end][1] / CELL)))].append(i)


def near(p, exclude):
    seen = set()
    for c in cells(p):
        for j in index.get(c, ()):
            if j in exclude or j in seen:
                continue
            seen.add(j)
            f = work[j]
            for end in (0, -1):
                if math.hypot(f[end][0] - p[0], f[end][1] - p[1]) <= TOL:
                    return j, end
    return None


used = set()
loops = []
open_chains = 0
for i in range(len(work)):
    if i in used:
        continue
    chain = list(work[i])
    used.add(i)
    while True:
        hit = near(chain[-1], used)
        if hit is None:
            break
        j, end = hit
        used.add(j)
        f = work[j]
        chain += (f[1:] if end == 0 else list(reversed(f))[1:])
    while True:
        hit = near(chain[0], used)
        if hit is None:
            break
        j, end = hit
        used.add(j)
        f = work[j]
        chain = (list(reversed(f))[:-1] if end == 0 else f[:-1]) + chain
    if math.hypot(chain[0][0] - chain[-1][0], chain[0][1] - chain[-1][1]) <= TOL * 4:
        chain = chain[:-1]
    else:
        open_chains += 1
    if len(chain) >= 3:
        loops.append(chain)


def area(loop):
    s = 0.0
    for a, b in zip(loop, loop[1:] + loop[:1]):
        s += a[0] * b[1] - b[0] * a[1]
    return s / 2.0


loops = [l for l in loops if abs(area(l)) > 2e-3]
# Знак клейма мал: самая крупная буква укладывается в несколько миллиметров.
# Концентрические окружности дна, попавшие в то же кольцо, отсекаются по
# габариту петли — на чертеже 500 мл этот фильтр ничего не меняет.
GLYPH_MAX_MM = 12.0
kept, dropped = [], 0
for l in loops:
    w = max(p[0] for p in l) - min(p[0] for p in l)
    h = max(p[1] for p in l) - min(p[1] for p in l)
    if max(w, h) > GLYPH_MAX_MM:
        dropped += 1
        continue
    kept.append(l)
loops = kept
print("замкнутых петель %d (отброшено крупных %d), незамкнутых цепочек %d"
      % (len(loops), dropped, open_chains))
xs = [p[0] for l in loops for p in l]
ys = [p[1] for l in loops for p in l]
rs = [math.hypot(*p) for l in loops for p in l]
print("точек %d; габарит X %.2f..%.2f  Y %.2f..%.2f  R %.2f..%.2f мм; площадь знаков %.2f мм2"
      % (sum(len(l) for l in loops), min(xs), max(xs), min(ys), max(ys),
         min(rs), max(rs), sum(abs(area(l)) for l in loops)))

data = {
    "_about": [
        "Клеймо дна, извлечённое из векторной геометрии чертежа 252214 (нижний вид).",
        "Координаты в миллиметрах в плоскости дна, начало — на оси стакана,",
        "оси как на листе: X вправо, Y вверх, взгляд снаружи на дно.",
        "Петли замкнутые; заливка по чётности вложенности даёт дырки в буквах.",
        "Генерируется extract_marking.py, вручную не правится.",
    ],
    "source": {
        "pdf": os.path.basename(PDF),
        "view_centre_pt": [CX, CY],
        "annulus_mm": [R_LO, R_HI],
        "bezier_segments": BEZ,
        "weld_tolerance_mm": TOL,
    },
    "units": "mm",
    "loops": [[[round(x, 4), round(y, 4)] for x, y in l] for l in loops],
}
path = OUT
os.makedirs(os.path.dirname(os.path.abspath(path)) or ".", exist_ok=True)
with open(path, "w", encoding="utf-8") as fh:
    json.dump(data, fh, ensure_ascii=False, separators=(",", ":"))
print("записано: %s (%.0f КБ)" % (path, os.path.getsize(path) / 1024))
