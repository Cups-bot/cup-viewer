"""Сверка нашей модели с официальной геометрией изделия. Только stdlib.

Читает два файла завода:
  * STEP (.stp) — точное граничное представление из Siemens NX. Из него
    берутся аналитические величины: полуугол конуса, радиусы окружностей,
    углы фасок литника;
  * OBJ — триангуляция того же тела. По ней считается объём и профиль.

Сравнивает с нашей моделью cup500. Ничего не меняет, только печатает отчёт.

    py -3.11 compare_official.py [> report.txt]
"""

import collections
import importlib.util
import json
import math
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Какой объём сверять: аргумент командной строки, по умолчанию 500.
_ML = (sys.argv[1] if len(sys.argv) > 1 else "500").strip()
_CUPS = {
    "500": ("Cup 500ml-004-252214-new part 3D-Rev06-20260121",
            "cup500", "cup_500ml.json", "cup_500ml.obj"),
    "410": ("Cup 410ml-003-252215-new part 3D-Rev06-20260121",
            "cup410", "cup_410ml.json", "Cup_410ml.obj"),
    "650": ("Cup 650ml-005-252213-new part 3D-Rev06-20260121",
            "cup650", "cup_650ml.json", "Cup_650ml.obj"),
}
if _ML not in _CUPS:
    raise SystemExit(f"неизвестный объём {_ML!r}, есть: {', '.join(sorted(_CUPS))}")
_base, _folder, _params, _objname = _CUPS[_ML]
# Заводские исходники лежат отдельной папкой: их нельзя ни менять, ни путать
# с нашими экспортами, поэтому они и вынесены из папки изделия.
FACTORY = os.path.normpath(os.path.join(ROOT, os.pardir, "factory"))
STEP = os.path.join(FACTORY, _base + ".stp")
OBJ = os.path.join(FACTORY, _base + ".obj")
CUP = os.path.join(ROOT, _folder)
OURS_OBJ = os.path.join(CUP, "out", _objname)
PARAMS_NAME = _params


# ---------------------------------------------------------------- STEP -----

def read_step(path):
    text = open(path, "r", encoding="utf-8", errors="replace").read()
    text = re.sub(r"/\*.*?\*/", "", text, flags=re.S)
    body = text[text.find("DATA"):]
    pat = re.compile(r"#(\d+)\s*=\s*([A-Z_0-9]+)\s*\((.*?)\)\s*;", re.S)
    return {int(m.group(1)): (m.group(2), m.group(3)) for m in pat.finditer(body)}


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


def _ref(a):
    a = a.strip()
    return int(a[1:]) if a.startswith("#") else None


def step_geometry(ents):
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

    verts = [c for c in (coords(_ref(toplevel(raw)[1]))
                         for t, raw in ents.values() if t == "VERTEX_POINT") if c]
    z0 = max(v[2] for v in verts)          # в файле изделие стоит вверх дном

    cones = []
    for t, raw in ents.values():
        if t != "CONICAL_SURFACE":
            continue
        a = toplevel(raw)
        pid = _ref(a[1])
        loc = None
        if pid in ents and ents[pid][0] == "AXIS2_PLACEMENT_3D":
            loc = coords(_ref(toplevel(ents[pid][1])[1]))
        try:
            r, semi = float(a[2]), float(a[3])
        except (ValueError, IndexError):
            continue
        if loc is None:
            continue
        cones.append((round(z0 - loc[2], 3), round(r, 4), round(semi, 4)))

    circles = []
    for t, raw in ents.values():
        if t != "CIRCLE":
            continue
        a = toplevel(raw)
        pid = _ref(a[1])
        if pid not in ents or ents[pid][0] != "AXIS2_PLACEMENT_3D":
            continue
        loc = coords(_ref(toplevel(ents[pid][1])[1]))
        try:
            r = float(a[2])
        except ValueError:
            continue
        if loc is None or math.hypot(loc[0], loc[1]) > 1e-6:
            continue
        circles.append((round(z0 - loc[2], 4), round(r, 4)))

    pts = [(z0 - v[2], math.hypot(v[0], v[1]),
            math.degrees(math.atan2(v[1], v[0])) % 360.0) for v in verts]
    return pts, sorted(set(cones)), sorted(set(circles))


# ----------------------------------------------------------------- OBJ -----

def read_obj(path):
    vs, fs = [], []
    with open(path, "r", encoding="utf-8", errors="replace") as fh:
        for line in fh:
            if line.startswith("v "):
                p = line.split()
                vs.append((float(p[1]), float(p[2]), float(p[3])))
            elif line.startswith("f "):
                fs.append([int(tok.split("/")[0]) - 1 for tok in line.split()[1:]])
    span = max(max(v[k] for v in vs) - min(v[k] for v in vs) for k in range(3))
    if span < 10.0:                      # файл в метрах
        vs = [(v[0] * 1000.0, v[1] * 1000.0, v[2] * 1000.0) for v in vs]
    size = [max(v[k] for v in vs) - min(v[k] for v in vs) for k in range(3)]
    ax = max(range(3), key=lambda k: size[k])
    o1, o2 = [k for k in range(3) if k != ax]
    vs = [(v[o1], v[o2], v[ax]) for v in vs]
    cx = (min(v[0] for v in vs) + max(v[0] for v in vs)) / 2.0
    cy = (min(v[1] for v in vs) + max(v[1] for v in vs)) / 2.0
    zlo, zhi = min(v[2] for v in vs), max(v[2] for v in vs)
    r_hi = max(math.hypot(v[0] - cx, v[1] - cy) for v in vs if v[2] > zhi - 1.0)
    r_lo = max(math.hypot(v[0] - cx, v[1] - cy) for v in vs if v[2] < zlo + 1.0)
    flip = r_lo > r_hi                   # широкий конец должен быть сверху
    pts = [((zhi - v[2]) if flip else (v[2] - zlo),
            math.hypot(v[0] - cx, v[1] - cy),
            math.degrees(math.atan2(v[1] - cy, v[0] - cx)) % 360.0) for v in vs]
    vol6 = 0.0
    for f in fs:
        for k in range(1, len(f) - 1):
            a, b, c = vs[f[0]], vs[f[k]], vs[f[k + 1]]
            vol6 += (a[0] * (b[1] * c[2] - b[2] * c[1])
                     - a[1] * (b[0] * c[2] - b[2] * c[0])
                     + a[2] * (b[0] * c[1] - b[1] * c[0]))
    return pts, abs(vol6) / 6.0, "XYZ"[ax], flip


def segments(pts):
    """Сколько сегментов по кругу в сетке: по шагу азимута на гладкой стенке."""
    az = sorted({round(a, 1) for z, r, a in pts if 40.0 < z < 100.0})
    if len(az) < 3:
        return None
    steps = sorted(b - a for a, b in zip(az, az[1:]) if b - a > 0.05)
    if not steps:
        return None
    step = steps[len(steps) // 2]        # медиана устойчивее минимума
    return int(round(360.0 / step))


def facet_factor(n):
    """Во сколько раз гранёная оболочка обмеряется меньше гладкой."""
    if not n:
        return 1.0
    return n * math.sin(2.0 * math.pi / n) / (2.0 * math.pi)


# ---------------------------------------------------------------- отчёт ----

def main():
    for p in (STEP, OBJ):
        if not os.path.isfile(p):
            print(f"не найден файл завода: {p}", file=sys.stderr)
            return 2

    spec = importlib.util.spec_from_file_location(
        "cup_profile", os.path.join(ROOT, "cup500", "src", "profile.py"))
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    params = mod.load_params(os.path.join(CUP, "params", PARAMS_NAME))
    rep = json.load(open(os.path.join(CUP, "out", "verify.json"), encoding="utf-8"))

    ents = read_step(STEP)
    spts, cones, circles = step_geometry(ents)
    opts, vol_mm3, oax, oflip = read_obj(OBJ)
    mypts = read_obj(OURS_OBJ)[0] if os.path.isfile(OURS_OBJ) else None

    def val(k):
        v = rep.get(k)
        return v["value"] if isinstance(v, dict) else v

    line = "=" * 78
    print(line)
    print(f"СВЕРКА МОДЕЛИ {_folder} С ОФИЦИАЛЬНОЙ ГЕОМЕТРИЕЙ ИЗДЕЛИЯ")
    print(line)
    print(f"  STEP: {os.path.basename(STEP)}")
    print(f"        Siemens NX 10.0, AP214, мм, {len(ents)} сущностей")
    print(f"  OBJ:  {os.path.basename(OBJ)}")
    print(f"        триангуляция, ось {oax}"
          f"{', в файле перевёрнут' if oflip else ''}")

    # --- полуугол конуса из STEP ------------------------------------------
    # Среди конусов STEP есть уклон венчика и фаски дна. Стенке отвечает тот,
    # что ближе всего к углу нашей модели: сам угол и проверяется ниже.
    our_beta = math.degrees(mod.cone_half_angle(params))
    cand = [c[2] for c in cones if 0.5 < c[2] < 20.0]
    beta = min(cand, key=lambda a: abs(a - our_beta)) if cand else None

    # --- огибающая конуса по OBJ ------------------------------------------
    tb = math.tan(math.radians(beta)) if beta else 0.0
    # пояс стенки задаётся долями высоты, а не числами от 500-го изделия
    _H = max(p[0] for p in opts)
    _rb = max(r for z, r, a in opts if z < 0.05)
    wall = [(z, r) for z, r, a in opts
            if 0.12 * _H <= z <= 0.88 * _H and r > 0.5 * _rb]
    ks = sorted(r - z * tb for z, r in wall)
    # k постоянна вдоль образующей, поэтому распределение двугорбое:
    # наружная поверхность и внутренняя. Ищем разрыв между горбами.
    k_out = k_in = None
    if len(ks) > 40:
        gap, at = 0.0, None
        for a, b in zip(ks, ks[1:]):
            if b - a > gap:
                gap, at = b - a, (a + b) / 2.0
        if gap > 0.2:
            hi = [k for k in ks if k > at]
            lo = [k for k in ks if k < at]
            k_out = hi[len(hi) // 2]
            k_in = lo[len(lo) // 2]
        else:
            k_out = ks[-1]

    print()
    print(line)
    print("1. ГАБАРИТЫ И КОНУС")
    print(line)
    zs = [p[0] for p in opts]
    rs = [p[1] for p in opts]
    r_bottom = max(r for z, r, a in opts if z < 0.05)
    rows = [
        ("высота, мм", max(zs) - min(zs), val("height_mm")),
        ("диаметр по венчику, мм", 2 * max(rs), val("d_top_mm")),
        ("диаметр дна, мм", 2 * r_bottom, val("d_bottom_mm")),
        ("полуугол конуса, °", beta, val("cone_half_angle_deg")),
        ("радиус конуса на z=0, мм", k_out, mod.cone_r_out(params, 0.0)),
        (f"радиус на z={_H*.4:.2f}, мм", k_out + _H*.4 * tb, mod.cone_r_out(params, _H*.4)),
        (f"радиус на z={_H*.8:.2f}, мм", k_out + _H*.8 * tb, mod.cone_r_out(params, _H*.8)),
    ]
    print(f"  {'величина':30} {'изделие':>12} {'наша':>12} {'разница':>11}")
    for label, a, b in rows:
        print(f"  {label:30} {a:12.4f} {b:12.4f} {a - b:11.4f}")

    # --- стенка ------------------------------------------------------------
    print()
    print(line)
    print("2. ТОЛЩИНА СТЕНКИ")
    print(line)
    if k_in is not None:
        horiz = k_out - k_in
        norm = horiz * math.cos(math.radians(beta))
        our_norm = mod.wall_thickness_at(params, 60.0)
        our_horiz = our_norm / math.cos(math.radians(beta))
        print(f"  изделие: {horiz:.4f} мм по горизонтали = {norm:.4f} мм по нормали")
        print(f"  наша:    {our_horiz:.4f} мм по горизонтали = {our_norm:.4f} мм по нормали")
        print()
        if abs(norm - our_norm) < 0.02:
            print(f"  Совпадает: {our_norm:.4f} мм по нормали в обоих телах.")
        else:
            print(f"  РАСХОЖДЕНИЕ {norm - our_norm:+.4f} мм.")

    # --- объём и масса -----------------------------------------------------
    print()
    print(line)
    print("3. ОБЪЁМ И МАССА")
    print(line)
    vol_cm3 = vol_mm3 / 1000.0
    our_vol = val("material_volume_cm3")
    dens = params["material"]["density_g_cm3"]
    print(f"  {'величина':30} {'изделие':>12} {'наша':>12} {'разница':>11}")
    print(f"  {'объём материала, см3':30} {vol_cm3:12.4f} {our_vol:12.4f} "
          f"{vol_cm3 - our_vol:11.4f}")
    print(f"  {'масса при 0.905 г/см3, г':30} {vol_cm3*dens:12.4f} "
          f"{val('mass_g'):12.4f} {vol_cm3*dens - val('mass_g'):11.4f}")
    print(f"  отношение объёмов: {our_vol/vol_cm3:.5f}  "
          f"({(our_vol/vol_cm3 - 1)*100:+.2f} %)")
    print()
    print("  Откуда разница. Оба числа посчитаны по треугольным сеткам, а")
    print("  гранёная оболочка всегда обмеряется меньше гладкой: вписанный")
    print("  n-угольник имеет площадь на n*sin(2pi/n)/(2pi) меньше круга, и")
    print("  наружная с внутренней поверхностью уменьшаются одинаково.")
    n_prod = segments(opts)
    n_ours = segments(mypts) if mypts else None
    f_prod = facet_factor(n_prod)
    print(f"     сегментов по кругу: изделие {n_prod}, поправка {f_prod:.5f}")
    corr_prod = vol_cm3 / f_prod
    if n_ours:
        f_ours = facet_factor(n_ours)
        print(f"     сегментов по кругу: наша {n_ours}, поправка {f_ours:.5f}")
        corr_ours = our_vol / f_ours
        print(f"     с поправкой: изделие {corr_prod:.4f}, наша {corr_ours:.4f} см3, "
              f"разница {(corr_ours/corr_prod - 1)*100:+.2f} %")
    print()
    print(f"  Вклад клейма дна: у нас рельеф {params['marking']['relief_mm']} мм, "
          f"объём {val('marking_volume_mm3'):.2f} мм3.")
    target = params['drawing'].get('part_weight_g_stated')
    print()
    if target:
        print(f"  Масса в конфиге: {target} г.")
        print("  Источник: " + params['drawing'].get('_src', {}).get('part_weight_g_stated', 'не указан'))
        print(f"     из объёма изделия нужна плотность {target/vol_cm3:.4f} г/см3")
        print(f"     из нашего объёма  — {target/our_vol:.4f} г/см3")
    print(f"     в конфиге стоит {dens} г/см3")

    # --- рёбра -------------------------------------------------------------
    print()
    print(line)
    print("4. РЁБРА РАССТЫКОВКИ")
    print(line)
    # Счёт выступов надёжнее брать из STEP: там вершины стоят только на рёбрах
    # фигуры, а гладкое кольцо вершин не имеет. В триангуляции же вершины
    # раскиданы равномерно, и выступ от кольца по ним не отличить.
    sheel = [(a, r) for z, r, a in spts if 0.5 < z < 6.5]
    srmax = max(r for a, r in sheel)
    saz = sorted(a for a, r in sheel if r > srmax - 0.6)
    sgroups, cur = [], [saz[0]]
    for x in saz[1:]:
        if x - cur[-1] <= 12.0:
            cur.append(x)
        else:
            sgroups.append(cur)
            cur = [x]
    sgroups.append(cur)
    if len(sgroups) > 1 and sgroups[0][0] < 12.0 and sgroups[-1][-1] > 348.0:
        sgroups[0] = sgroups[-1] + sgroups[0]
        sgroups.pop()
    print(f"  по STEP изделия: обособленных выступов {len(sgroups)}, "
          f"азимуты {[round(sum(g)/len(g) % 360.0) for g in sgroups]}")
    print(f"  в нашем конфиге rib_count = {val('rib_count')}, "
          f"azimuth_start = {params['geometry']['ribs']['azimuth_start_deg']}°")
    print()
    print("  вылет ребра над стенкой, по триангуляциям:")
    for name, pts in (("изделие", opts), ("наша модель", mypts or [])):
        heel = [(a, r) for z, r, a in pts if 5.5 < z < 6.8]
        if not heel:
            continue
        rmax = max(r for a, r in heel)
        rmin = min(r for a, r in heel)
        az = sorted(a for a, r in heel if r > rmax - 0.15 * (rmax - rmin))
        groups, cur = [], [az[0]]
        for x in az[1:]:
            if x - cur[-1] <= 15.0:
                cur.append(x)
            else:
                groups.append(cur)
                cur = [x]
        groups.append(cur)
        if len(groups) > 1 and groups[0][0] < 15.0 and groups[-1][-1] > 345.0:
            groups[0] = groups[-1] + groups[0]
            groups.pop()
        print(f"     {name:14} диаметр по рёбрам {2*rmax:8.4f} мм, "
              f"по стенке рядом {2*rmin:8.4f} мм, вылет {rmax - rmin:5.3f} мм")

    # --- литник ------------------------------------------------------------
    print()
    print(line)
    print("5. ЛИТНИК И ФАСКИ ДНА (аналитика из STEP)")
    print(line)
    g = params["geometry"]["bottom"]
    checks = [
        ("площадка литника, R", [r for z, r in circles if abs(z - g["gate_land_z_mm"]) < 0.05],
         g["gate_land_r_mm"]),
        ("пятак литника, R", [r for z, r in circles if abs(z - g["gate_pad_z_mm"]) < 0.05],
         g["gate_pad_r_mm"]),
    ]
    for label, found, ours in checks:
        got = min(found, key=lambda r: abs(r - ours)) if found else None
        if got is None:
            print(f"  {label:26} в STEP не найдено на нашей высоте, наша {ours}")
        else:
            print(f"  {label:26} STEP {got:8.4f}   наша {ours:8.4f}   "
                  f"разница {got - ours:8.4f}")
    angles = sorted({c[2] for c in cones})
    print(f"  углы конических фасок в STEP: {angles}")
    print(f"  у нас: фаска литника {g['chamfer_gate_deg']}°, "
          f"фаска дна {g['chamfer_outer_deg']}°")

    # --- профиль -----------------------------------------------------------
    print()
    print(line)
    print("6. КЛЕЙМО ДНА")
    print(line)
    for name, pts in (("изделие", opts), ("наша модель", mypts or [])):
        zone = [z for z, r, a in pts if 6.0 < r < 27.0 and z < 4.0]
        if not zone:
            continue
        levels = collections.Counter(round(z, 2) for z in zone)
        big = sorted((z for z, n in levels.items() if n > 300))[:2]
        if len(big) == 2:
            print(f"  {name:14} плоскость дна z {max(big):.2f} мм, "
                  f"дно рельефа z {min(big):.2f} мм, рельеф {max(big)-min(big):.2f} мм")
        else:
            print(f"  {name:14} уровней не разделить: {sorted(levels)[:4]}")
    print(f"  в нашем конфиге marking.relief_mm = {params['marking']['relief_mm']}, "
          f"raised = {params['marking']['raised']}")

    print()
    print(line)
    print("7. ПРОФИЛЬ ЦЕЛИКОМ")
    print(line)
    if mypts:
        diffs = []
        z = 0.0
        while z <= _H:
            a = [r for zz, r, _ in opts if abs(zz - z) <= 0.75]
            b = [r for zz, r, _ in mypts if abs(zz - z) <= 0.75]
            # сечения, где в окно попал только литник, к стенке отношения
            # не имеют: сравниваем наружный контур, а он всегда шире 20 мм
            if len(a) > 3 and len(b) > 3 and max(a) > 20.0 and max(b) > 20.0:
                diffs.append((z, max(a) - max(b)))
            z += 0.5
        vals = sorted(abs(d) for _, d in diffs)
        print(f"  сечений сопоставлено: {len(diffs)}")
        if vals:
            med = vals[len(vals) // 2]
            p95 = vals[int(len(vals) * 0.95)]
            print(f"  расхождение наружного радиуса: медиана {med:.4f} мм, "
                  f"95-й процентиль {p95:.4f} мм, максимум {vals[-1]:.4f} мм")
            bad = sorted(diffs, key=lambda t: -abs(t[1]))[:4]
            print("  самые большие расхождения:")
            for z, d in bad:
                print(f"     z {z:6.1f} мм   {d:+.4f} мм")
            print("  Оговорка: у сглаженного конуса вершины стоят кольцами, и в")
            print("  сечении между кольцами выборка попадает на внутреннюю")
            print("  поверхность вместо наружной. Такие места дают ложные 0.5 мм.")
    else:
        print(f"  {OURS_OBJ} не найден — экспортируйте модель из cup500")

    print()
    print(line)
    print("ВЫВОД")
    print(line)
    print(f"  Стакан {_ML} мл; проверенная высота профиля: {_H:.4f} мм.")
    print(f"  Максимальное расхождение габаритов: {max(abs(a-b) for _, a, b in rows[:3]):.4f} мм.")
    print(f"  Расхождение полуугла конуса: {abs(beta-our_beta):.4f} град.")
    print(f"  Разница объёма материала: {(our_vol/vol_cm3-1)*100:+.2f} %.")
    if n_ours:
        print(f"  С оценочной поправкой на гранение: {(corr_ours/corr_prod-1)*100:+.2f} %.")
    print("  Это числовая сверка, а не автоматическое заключение о совпадении.")
    print("  Ограничения выборки профиля указаны в разделе 7; рельеф клейма — в разделе 6.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
