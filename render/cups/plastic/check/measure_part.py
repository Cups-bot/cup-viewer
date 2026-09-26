"""Обмер изделия по файлам завода. Только stdlib, Blender не нужен.

Читает пару файлов одного изделия: .stp (точная геометрия из Siemens NX) и
.obj (триангуляция). Печатает всё, что нужно, чтобы завести параметрический
конфиг нового стакана: габариты, конус, толщину стенки, объём, рёбра, литник,
клеймо и полный список соосных окружностей — это, по сути, таблица углов
профиля.

    py -3.11 measure_part.py "Cup 410ml-...stp"
    py -3.11 measure_part.py 410            # по короткому имени
"""

import collections
import math
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def find_pair(hint):
    """По подсказке (путь или '410') найти пару .stp/.obj в корне проекта."""
    if os.path.isfile(hint):
        stp = hint
    else:
        cands = [f for f in os.listdir(ROOT)
                 if f.lower().endswith(".stp") and hint.lower() in f.lower()]
        if len(cands) != 1:
            raise SystemExit(f"по подсказке {hint!r} найдено {len(cands)} файлов .stp: "
                             f"{cands}")
        stp = os.path.join(ROOT, cands[0])
    obj = os.path.splitext(stp)[0] + ".obj"
    return stp, (obj if os.path.isfile(obj) else None)


# ------------------------------------------------------------------ STEP ---

def toplevel(raw):
    out, depth, cur, in_str = [], 0, [], False
    for ch in raw:
        if in_str:
            cur.append(ch)
            if ch == "'":
                in_str = False
            continue
        if ch == "'":
            in_str = True
            cur.append(ch)
        elif ch == "(":
            depth += 1
            cur.append(ch)
        elif ch == ")":
            depth -= 1
            cur.append(ch)
        elif ch == "," and depth == 0:
            out.append("".join(cur).strip())
            cur = []
        else:
            cur.append(ch)
    if cur:
        out.append("".join(cur).strip())
    return out


def read_step(path):
    text = open(path, "r", encoding="utf-8", errors="replace").read()
    text = re.sub(r"/\*.*?\*/", "", text, flags=re.S)
    body = text[text.find("DATA"):]
    pat = re.compile(r"#(\d+)\s*=\s*([A-Z_0-9]+)\s*\((.*?)\)\s*;", re.S)
    ents = {int(m.group(1)): (m.group(2), m.group(3)) for m in pat.finditer(body)}

    def ref(a):
        a = a.strip()
        return int(a[1:]) if a.startswith("#") else None

    def coords(pid):
        if pid is None or pid not in ents:
            return None
        t, raw = ents[pid]
        if t != "CARTESIAN_POINT":
            return None
        m = re.search(r"\(([^()]*)\)\s*$", raw.strip())
        if not m:
            return None
        try:
            c = [float(x) for x in m.group(1).split(",")]
        except ValueError:
            return None
        return c if len(c) == 3 else None

    verts = [c for c in (coords(ref(toplevel(raw)[1]))
                         for t, raw in ents.values() if t == "VERTEX_POINT") if c]
    z0 = max(v[2] for v in verts)          # изделие лежит в файле вверх дном

    circles, cones, cyls, tori = [], [], [], []
    for t, raw in ents.values():
        if t not in ("CIRCLE", "CONICAL_SURFACE", "CYLINDRICAL_SURFACE",
                     "TOROIDAL_SURFACE"):
            continue
        a = toplevel(raw)
        pid = ref(a[1])
        if pid not in ents or ents[pid][0] != "AXIS2_PLACEMENT_3D":
            continue
        loc = coords(ref(toplevel(ents[pid][1])[1]))
        if loc is None:
            continue
        onaxis = math.hypot(loc[0], loc[1]) < 1e-6
        z = round(z0 - loc[2], 4)
        try:
            if t == "CIRCLE":
                if onaxis:
                    circles.append((z, round(float(a[2]), 4)))
            elif t == "CONICAL_SURFACE":
                cones.append((z, round(float(a[2]), 4), round(float(a[3]), 4), onaxis))
            elif t == "CYLINDRICAL_SURFACE":
                if onaxis:
                    cyls.append((z, round(float(a[2]), 4)))
            else:
                tori.append((z, round(float(a[2]), 4), round(float(a[3]), 4), onaxis))
        except (ValueError, IndexError):
            continue

    pts = [(z0 - v[2], math.hypot(v[0], v[1]),
            math.degrees(math.atan2(v[1], v[0])) % 360.0) for v in verts]
    return pts, sorted(set(circles)), sorted(set(cones)), sorted(set(cyls)), \
        sorted(set(tori)), len(ents)


# ------------------------------------------------------------------- OBJ ---

def read_obj(path):
    vs, fs = [], []
    with open(path, "r", encoding="utf-8", errors="replace") as fh:
        for line in fh:
            if line.startswith("v "):
                p = line.split()
                vs.append((float(p[1]), float(p[2]), float(p[3])))
            elif line.startswith("f "):
                fs.append([int(t.split("/")[0]) - 1 for t in line.split()[1:]])
    span = max(max(v[k] for v in vs) - min(v[k] for v in vs) for k in range(3))
    if span < 10.0:
        vs = [(v[0] * 1000, v[1] * 1000, v[2] * 1000) for v in vs]
    size = [max(v[k] for v in vs) - min(v[k] for v in vs) for k in range(3)]
    ax = max(range(3), key=lambda k: size[k])
    o1, o2 = [k for k in range(3) if k != ax]
    vs = [(v[o1], v[o2], v[ax]) for v in vs]
    cx = (min(v[0] for v in vs) + max(v[0] for v in vs)) / 2.0
    cy = (min(v[1] for v in vs) + max(v[1] for v in vs)) / 2.0
    zlo, zhi = min(v[2] for v in vs), max(v[2] for v in vs)
    rhi = max(math.hypot(v[0] - cx, v[1] - cy) for v in vs if v[2] > zhi - 1)
    rlo = max(math.hypot(v[0] - cx, v[1] - cy) for v in vs if v[2] < zlo + 1)
    flip = rlo > rhi
    vol6 = 0.0
    for f in fs:
        for k in range(1, len(f) - 1):
            a, b, c = vs[f[0]], vs[f[k]], vs[f[k + 1]]
            vol6 += (a[0] * (b[1] * c[2] - b[2] * c[1])
                     - a[1] * (b[0] * c[2] - b[2] * c[0])
                     + a[2] * (b[0] * c[1] - b[1] * c[0]))
    pts = [((zhi - v[2]) if flip else (v[2] - zlo),
            math.hypot(v[0] - cx, v[1] - cy),
            math.degrees(math.atan2(v[1] - cy, v[0] - cx)) % 360.0) for v in vs]
    return pts, abs(vol6) / 6.0, len(vs)


# ---------------------------------------------------------------- разбор ---

def segments(pts, z_lo, z_hi):
    az = sorted({round(a, 1) for z, r, a in pts if z_lo < z < z_hi})
    if len(az) < 3:
        return None
    steps = sorted(b - a for a, b in zip(az, az[1:]) if b - a > 0.05)
    return int(round(360.0 / steps[len(steps) // 2])) if steps else None


def main(argv):
    if not argv:
        print(__doc__)
        return 2
    stp, obj = find_pair(argv[0])
    spts, circles, cones, cyls, tori, n_ent = read_step(stp)
    print("=" * 78)
    print(os.path.basename(stp))
    print("=" * 78)
    print(f"  сущностей в STEP: {n_ent}")

    zs = [p[0] for p in spts]
    rs = [p[1] for p in spts]
    height = max(zs) - min(zs)
    r_top = max(rs)
    r_bot = max(r for z, r, a in spts if z < 0.02)
    print(f"  высота                 {height:9.4f} мм")
    print(f"  диаметр по венчику     {2*r_top:9.4f} мм")
    print(f"  диаметр дна            {2*r_bot:9.4f} мм")

    print(f"  полууглы конусов, °    {sorted({c[2] for c in cones if c[3]})}")

    opts = volume = None
    beta = None
    if obj:
        opts, volume, nv = read_obj(obj)
        # Полуугол стенки нельзя брать «первым подходящим»: среди конусов есть
        # и уклон венчика, и фаски дна. Правильный тот, при котором величина
        # k = r - z*tg(beta) вдоль стенки постоянна: тогда облако точек
        # распадается на два узких горба, наружный и внутренний.
        wall_pts = [(z, r) for z, r, a in opts
                    if 0.15 * height < z < 0.85 * height and r > 0.5 * r_bot]
        best = None
        for cand in sorted({c[2] for c in cones if c[3] and 0.5 < c[2] < 20.0}):
            tb = math.tan(math.radians(cand))
            ks = sorted(r - z * tb for z, r in wall_pts)
            if len(ks) < 40:
                continue
            # правильный угол делает k почти постоянной: весь разброс
            # сводится к толщине стенки. При неверном угле k «разъезжается»
            # пропорционально высоте стакана.
            lo5 = ks[int(len(ks) * 0.05)]
            hi95 = ks[int(len(ks) * 0.95)]
            spread = hi95 - lo5
            if best is None or spread < best[0]:
                best = (spread, cand)
        if best:
            beta = best[1]
            print(f"  полуугол стенки        {beta:9.4f}°  "
                  f"(разброс огибающей {best[0]:.4f} мм)")
        print(f"  объём материала        {volume/1000.0:9.4f} см3  "
              f"(масса при 0.905 = {volume/1000.0*0.905:.3f} г)")
        print(f"  сегментов по кругу в OBJ: {segments(opts, 0.3*height, 0.7*height)}"
              f", вершин {nv}")
        if beta:
            tb = math.tan(math.radians(beta))
            wall = [(z, r) for z, r, a in opts
                    if 0.1 * height < z < 0.9 * height and r > 0.5 * r_bot]
            ks = sorted(r - z * tb for z, r in wall)
            gap, at = 0.0, None
            for a, b in zip(ks, ks[1:]):
                if b - a > gap:
                    gap, at = b - a, (a + b) / 2.0
            if gap > 0.2:
                hi = [k for k in ks if k > at]
                lo = [k for k in ks if k < at]
                k_out, k_in = hi[len(hi) // 2], lo[len(lo) // 2]
                print(f"  радиус конуса на z=0   {k_out:9.4f} мм")
                print(f"  толщина стенки         "
                      f"{(k_out-k_in)*math.cos(math.radians(beta)):9.4f} мм по нормали")

    # --- рёбра -------------------------------------------------------------
    heel = [(a, r, z) for z, r, a in spts if 0.5 < z < 0.06 * height]
    if heel:
        rmax = max(h[1] for h in heel)
        az = sorted(a for a, r, z in heel if r > rmax - 0.6)
        groups, cur = [], [az[0]]
        for x in az[1:]:
            if x - cur[-1] <= 12.0:
                cur.append(x)
            else:
                groups.append(cur)
                cur = [x]
        groups.append(cur)
        if len(groups) > 1 and groups[0][0] < 12.0 and groups[-1][-1] > 348.0:
            groups[0] = [x - 360.0 for x in groups[-1]] + groups[0]
            groups.pop()
        print(f"  рёбер расстыковки      {len(groups)}   азимуты "
              f"{sorted(round(sum(g)/len(g) % 360.0) for g in groups)}")

    # --- клеймо ------------------------------------------------------------
    if opts:
        zone = [z for z, r, a in opts
                if 0.2 * r_bot < r < 0.98 * r_bot and z < 0.05 * height]
        lv = collections.Counter(round(z, 2) for z in zone)
        top2 = [z for z, n in lv.most_common(2)]
        if len(top2) == 2:
            hi, lo = max(top2), min(top2)
            print(f"  клеймо дна: плоскость z {hi:.2f}, дно рельефа z {lo:.2f}, "
                  f"рельеф {hi-lo:.2f} мм   "
                  f"(вершин на уровнях: {lv[hi]}, {lv[lo]})")

    # --- скелет профиля ----------------------------------------------------
    print()
    print("  соосные окружности (высота, радиус) — каркас профиля:")
    for z, r in circles:
        print(f"     z {z:9.3f}   R {r:9.4f}   D {2*r:9.4f}")
    if cyls:
        print("  цилиндрические поверхности:")
        for z, r in cyls:
            print(f"     z {z:9.3f}   R {r:9.4f}")
    tor = [t for t in tori if t[3]]
    if tor:
        print("  торы (скругления венчика и дна): (z, R большой, R малый)")
        for z, r1, r2, _ in tor:
            print(f"     z {z:9.3f}   R {r1:9.4f}   r {r2:9.4f}")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
