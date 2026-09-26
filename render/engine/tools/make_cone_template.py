"""Шаблон развёртки конуса под полную запечатку. Только stdlib.

Геометрия берётся из отчёта cup500 (out/verify.json), поэтому шаблон всегда
согласован с последней сборкой модели. Сам cup500 при этом только читается.

Что рисуется:
  * чёрный контур — граница развёртки стенки. Всё, что внутри, попадает на
    стакан; всё, что снаружи, обрезается;
  * две прямые чёрные стороны сектора — это стык. На изделии они сходятся,
    поэтому рисунок у одной стороны должен продолжать рисунок у другой;
  * оранжевый контур — видимая часть: то, что остаётся на виду, когда стаканы
    вложены друг в друга. Важное лучше держать внутри неё;
  * сетка через 10 мм, каждая пятая линия красная. Дуги — это высота по
    образующей, лучи — длина по окружности.

Фон прозрачный: альфа работает маской краски, и вне линий остаётся голый
матовый PP. Шаблон можно и просто подставить как макет — тогда на стакане
будет видна сама сетка.

    py -3.11 make_cone_template.py [<ширина, px>] [<verify.json>] [<имя файла>]
"""

import json
import math
import os
import struct
import sys
import zlib

# Скрипт лежит в mockup/tools, пишет в mockup/art, отчёт читает из product.
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEFAULT_VERIFY = os.path.normpath(
    os.path.join(ROOT, os.pardir, "product", "cup500", "out", "verify.json"))
STEP_MM = 10.0
MAJOR = 5

CLEAR = bytes((0, 0, 0, 0))
GRID = bytes((150, 150, 152, 255))
GRID_MAJOR = bytes((206, 42, 42, 255))
EDGE = bytes((18, 18, 20, 255))
VISIBLE = bytes((232, 132, 26, 255))


def write_png(path, buf, w, h):
    raw = bytearray()
    stride = w * 4
    for y in range(h):
        raw.append(0)
        raw += buf[y * stride:(y + 1) * stride]

    def chunk(tag, data):
        return (struct.pack(">I", len(data)) + tag + data
                + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF))

    png = (b"\x89PNG\r\n\x1a\n"
           + chunk(b"IHDR", struct.pack(">IIBBBBB", w, h, 8, 6, 0, 0, 0))
           + chunk(b"IDAT", zlib.compress(bytes(raw), 6))
           + chunk(b"IEND", b""))
    with open(path, "wb") as fh:
        fh.write(png)


def main(argv):
    width = int(argv[0]) if argv else 4096
    verify = argv[1] if len(argv) > 1 else DEFAULT_VERIFY
    if not os.path.isfile(verify):
        print(f"{verify}: не найден отчёт cup500", file=sys.stderr)
        return 2
    with open(verify, "r", encoding="utf-8") as fh:
        report = json.load(fh)
    try:
        band = report["uv_bands"]["value"]["full"]
        vis = report["uv_bands"]["value"].get("visible")
        island = report["uv_island_bounds"]["value"]["wall"]
        fit = report["uv_fit"]["value"]["wall"]
    except (KeyError, TypeError):
        print(f"{verify}: в отчёте нет uv_bands, uv_island_bounds или uv_fit",
              file=sys.stderr)
        return 2

    # посадка сектора в атласе, как её кладёт cup500
    scale, dx, dy = fit["scale"], fit["dx"], fit["dy"]
    cx, cy = 0.5 * scale + dx, 0.5 * scale + dy
    k_out = 0.5 * scale
    uv_per_mm = k_out / band["r_out_mm"]
    r_in, r_out = band["r_in_mm"], band["r_out_mm"]
    half = math.radians(band["alpha_deg"]) / 2.0

    # остров стенки растягивается на весь холст
    iu0, iv0, iu1, iv1 = island
    iw, ih = iu1 - iu0, iv1 - iv0
    height = max(1, int(round(width * ih / iw)))
    buf = bytearray(CLEAR * (width * height))
    stride = width * 4

    def stamp(r_mm, psi, rgba, t):
        """Точка развёртки (радиус, угол) -> пиксель холста."""
        rho = r_mm * uv_per_mm
        u = cx + rho * math.sin(psi)
        v = cy + rho * math.cos(psi)
        px = int(round((u - iu0) / iw * (width - 1)))
        py = int(round((1.0 - (v - iv0) / ih) * (height - 1)))
        for oy in range(-t, t + 1):
            yy = py + oy
            if not 0 <= yy < height:
                continue
            for ox in range(-t, t + 1):
                xx = px + ox
                if 0 <= xx < width:
                    off = yy * stride + xx * 4
                    buf[off:off + 4] = rgba

    def arc(r_mm, rgba, t):
        n = max(64, int(2.0 * half * r_mm * uv_per_mm * width))
        for i in range(n + 1):
            stamp(r_mm, -half + 2.0 * half * i / n, rgba, t)

    def ray(psi, rgba, t):
        n = max(64, int((r_out - r_in) * uv_per_mm * height * 1.5))
        for i in range(n + 1):
            stamp(r_in + (r_out - r_in) * i / n, psi, rgba, t)

    # сетка: дуги по образующей и лучи по окружности
    idx = int(math.ceil(r_in / STEP_MM))
    while idx * STEP_MM <= r_out + 1e-9:
        major = (idx % MAJOR == 0)
        arc(idx * STEP_MM, GRID_MAJOR if major else GRID, 1 if major else 0)
        idx += 1

    d_psi = STEP_MM / r_out
    j_max = int(math.floor(half / d_psi))
    for j in range(-j_max, j_max + 1):
        major = (j % MAJOR == 0)
        ray(j * d_psi, GRID_MAJOR if major else GRID, 1 if major else 0)

    # видимая часть
    if vis:
        arc(vis["r_in_mm"], VISIBLE, 2)
        arc(vis["r_out_mm"], VISIBLE, 2)

    # граница развёртки: дуги дна и венчика плюс две стороны стыка
    arc(r_in, EDGE, 2)
    arc(r_out, EDGE, 2)
    ray(-half, EDGE, 2)
    ray(half, EDGE, 2)

    os.makedirs(os.path.join(ROOT, "art"), exist_ok=True)
    name = argv[2] if len(argv) > 2 else "cone_template.png"
    path = os.path.join(ROOT, "art", name)
    write_png(path, buf, width, height)
    arc_len = 2.0 * half * r_out
    print("%s  %dx%d px  пропорция %.4f:1" % (path, width, height, iw / ih))
    print("  сектор: угол %.3f град., радиусы %.2f..%.2f мм, образующая %.2f мм"
          % (band["alpha_deg"], r_in, r_out, band["slant_mm"]))
    print("  дуга венчика %.2f мм, дуга дна %.2f мм, сетка через %g мм"
          % (arc_len, 2.0 * half * r_in, STEP_MM))
    if vis:
        print("  видимая часть: радиусы %.2f..%.2f мм (z %.2f..%.2f мм)"
              % (vis["r_in_mm"], vis["r_out_mm"],
                 vis["z_range_mm"][0], vis["z_range_mm"][1]))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
