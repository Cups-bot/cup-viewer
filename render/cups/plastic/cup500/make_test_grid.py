"""Тестовые сетки для ручной проверки UV. Только stdlib.

Два режима, по числу UV-слоёв модели:

  print  (по умолчанию) — прямоугольный макет под шелкографию, слой UVPrint.
          Шаг 10 мм: по вертикали вдоль образующей, по горизонтали по
          центральной линии поля. На стакане клетки должны читаться ровными
          горизонтальными поясами, а стык — попадать в зазор.

  sector — кольцевой сектор под слой UVMap (режим uv.mode = cone_sector).
          Дуги постоянного s через 10 мм и радиальные лучи через 10 мм дуги
          на R_out.

Геометрия берётся из out/verify.json, поэтому картинка всегда согласована с
последней сборкой.

    python make_test_grid.py [print|sector] [<путь к cup500>] [<ширина, px>]
"""

import json
import math
import os
import struct
import sys
import zlib

argv = [a for a in sys.argv[1:]]
MODE = argv.pop(0) if argv and argv[0] in ("print", "sector") else "print"
ROOT = argv.pop(0) if argv else os.path.dirname(os.path.abspath(__file__))
WIDTH = int(argv.pop(0)) if argv else 4096
STEP_MM = 10.0
MAJOR = 5

params = json.load(open(os.path.join(ROOT, "params", "cup_500ml.json"), encoding="utf-8"))
report = json.load(open(os.path.join(ROOT, "out", "verify.json"), encoding="utf-8"))

WHITE = bytes((250, 250, 250))
OUTSIDE = bytes((196, 200, 204))
LINE = bytes((24, 24, 24))
RED = bytes((206, 42, 42))


def write_png(path, buf, w, h, channels=3):
    raw = bytearray()
    stride = w * channels
    for y in range(h):
        raw.append(0)
        raw += buf[y * stride:(y + 1) * stride]

    def chunk(tag, data):
        return (struct.pack(">I", len(data)) + tag + data
                + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF))

    png = (b"\x89PNG\r\n\x1a\n"
           + chunk(b"IHDR", struct.pack(">IIBBBBB", w, h, 8,
                                        6 if channels == 4 else 2, 0, 0, 0))
           + chunk(b"IDAT", zlib.compress(bytes(raw), 6))
           + chunk(b"IEND", b""))
    with open(path, "wb") as fh:
        fh.write(png)


# ---------------------------------------------------------------------------
# прямоугольный макет под шелкографию
# ---------------------------------------------------------------------------

def build_print(width):
    """Прямоугольный макет с альфой: линии — краска, между ними прозрачно.

    Альфа обязательна: материал берёт по ней маску краски и переключает
    шероховатость и пропускание, поэтому вне линий остаётся матовый
    полупрозрачный PP, как на непечатных участках реального стакана.
    """
    band = report["print_band"]["value"]
    w_mm = band["centerline_length_mm"]
    h_mm = band["height_along_generator_mm"]
    height = max(1, int(round(width * h_mm / w_mm)))
    CLEAR = bytes((0, 0, 0, 0))
    INK = bytes((18, 18, 20, 255))
    INK_MAJOR = bytes((196, 32, 32, 255))
    buf = bytearray(CLEAR * width * height)
    stride = width * 4

    def vline(x, rgba, t):
        for xx in range(max(0, x - t), min(width, x + t + 1)):
            for y in range(height):
                i = y * stride + xx * 4
                buf[i:i + 4] = rgba

    def hline(y, rgba, t):
        for yy in range(max(0, y - t), min(height, y + t + 1)):
            buf[yy * stride:(yy + 1) * stride] = rgba * width

    px_per_mm = (width - 1) / w_mm
    thin = max(1, int(round(0.30 * px_per_mm / 2.0)))     # штрих 0.30 мм
    thick = max(2, int(round(0.60 * px_per_mm / 2.0)))    # штрих 0.60 мм
    n_v = int(math.floor(w_mm / STEP_MM))
    for k in range(n_v + 1):
        x = int(round(k * STEP_MM / w_mm * (width - 1)))
        vline(x, INK_MAJOR if k % MAJOR == 0 else INK, thick if k % MAJOR == 0 else thin)
    n_h = int(math.floor(h_mm / STEP_MM))
    for k in range(n_h + 1):
        y = int(round((1.0 - k * STEP_MM / h_mm) * (height - 1)))
        hline(y, INK_MAJOR if k % MAJOR == 0 else INK, thick if k % MAJOR == 0 else thin)

    # сплошная плашка 40x30 мм: по ней видно укрывистость и глянец краски
    px0 = int(round(0.25 * (width - 1)))
    px1 = int(round((0.25 * w_mm + 40.0) / w_mm * (width - 1)))
    py0 = int(round((1.0 - 60.0 / h_mm) * (height - 1)))
    py1 = int(round((1.0 - 30.0 / h_mm) * (height - 1)))
    for yy in range(max(0, py0), min(height, py1 + 1)):
        i0 = yy * stride + max(0, px0) * 4
        i1 = yy * stride + min(width - 1, px1) * 4 + 4
        buf[i0:i1] = INK * ((i1 - i0) // 4)

    path = os.path.join(ROOT, "out", "test_grid_print.png")
    write_png(path, buf, width, height, channels=4)
    print("%s  %dx%d px RGBA  поле %.1f x %.1f мм (по центральной линии), шаг %.0f мм, "
          "красная каждые %.0f мм; зазор на стыке %.1f мм снизу и %.1f сверху"
          % (path, width, height, w_mm, h_mm, STEP_MM, STEP_MM * MAJOR,
             band["seam_gap_mm"]["bottom"], band["seam_gap_mm"]["top"]))


# ---------------------------------------------------------------------------
# кольцевой сектор под UVMap
# ---------------------------------------------------------------------------

def build_sector(size):
    band = report["uv_bands"]["value"][params["uv"]["band"]]
    fit = report["uv_fit"]["value"]["wall"]
    alpha = math.radians(band["alpha_deg"])
    half = alpha / 2.0
    r_in, r_out = band["r_in_mm"], band["r_out_mm"]
    scale, dx, dy = fit["scale"], fit["dx"], fit["dy"]
    cx = 0.5 * scale + dx
    cy = 0.5 * scale + dy
    k_out = 0.5 * scale
    uv_per_mm = k_out / r_out
    k_in = r_in * uv_per_mm

    stride = size * 3
    buf = bytearray(OUTSIDE * size * size)
    white_row = WHITE * size
    tan_half = math.tan(half)

    for py in range(size):
        v = 1.0 - py / (size - 1)
        ry = v - cy
        if ry <= 0.0 or ry > k_out:
            continue
        b = math.sqrt(max(0.0, k_out * k_out - ry * ry))
        a = math.sqrt(max(0.0, k_in * k_in - ry * ry))
        hi = min(b, ry * tan_half)
        if hi <= a:
            continue
        row = py * stride
        for sign in (-1, 1):
            u0 = cx + sign * (a if sign > 0 else hi)
            u1 = cx + sign * (hi if sign > 0 else a)
            p0 = max(0, int(math.ceil(u0 * (size - 1))))
            p1 = min(size - 1, int(math.floor(u1 * (size - 1))))
            if p1 >= p0:
                buf[row + p0 * 3: row + (p1 + 1) * 3] = white_row[: (p1 - p0 + 1) * 3]

    def stamp(u, v, rgb, t):
        px = int(round(u * (size - 1)))
        py = int(round((1.0 - v) * (size - 1)))
        for oy in range(-t, t + 1):
            yy = py + oy
            if not 0 <= yy < size:
                continue
            x0 = max(0, px - t)
            x1 = min(size - 1, px + t)
            buf[yy * stride + x0 * 3: yy * stride + (x1 + 1) * 3] = rgb * (x1 - x0 + 1)

    n = 3 * size
    idx = int(math.ceil(r_in / STEP_MM))
    while idx * STEP_MM <= r_out + 1e-9:
        rgb, t = (RED, 2) if idx % MAJOR == 0 else (LINE, 1)
        rad = idx * STEP_MM * uv_per_mm
        for i in range(n + 1):
            phi = -half + alpha * i / n
            stamp(cx + rad * math.sin(phi), cy + rad * math.cos(phi), rgb, t)
        idx += 1

    d_phi = STEP_MM / r_out
    for j in range(-int(math.floor(half / d_phi)), int(math.floor(half / d_phi)) + 1):
        phi = j * d_phi
        rgb, t = (RED, 2) if j % MAJOR == 0 else (LINE, 1)
        for i in range(n + 1):
            rad = (r_in + (r_out - r_in) * i / n) * uv_per_mm
            stamp(cx + rad * math.sin(phi), cy + rad * math.cos(phi), rgb, t)

    path = os.path.join(ROOT, "out", "test_grid_sector.png")
    write_png(path, buf, size, size)
    print("%s  %dx%d  alpha=%.3f град, R_in=%.2f, R_out=%.2f мм, шаг %.0f мм"
          % (path, size, size, math.degrees(alpha), r_in, r_out, STEP_MM))


if MODE == "print":
    build_print(WIDTH)
else:
    build_sector(WIDTH)
