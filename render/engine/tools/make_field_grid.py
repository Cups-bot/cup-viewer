"""Тестовая сетка под объявленный формат макета. Только stdlib.

Формат берётся из params/shots.json, ключ print.field_mm — то есть сетка
всегда согласована с тем, во что реально будет вписываться макет.

Шаг 10 мм, каждая пятая линия красная, вокруг поля рамка. Чёрный
прямоугольник слева от центра — метка ориентации: по ней на рендере видно,
не отзеркалена ли развёртка.

Фон прозрачный: альфа работает маской краски, и вне линий должен остаться
голый матовый PP.

    py -3.11 make_field_grid.py [<ширина, px>] [<shots.json>] [<мм по ширине> <мм по высоте>]
"""

import json
import os
import struct
import sys
import zlib

# Скрипт лежит в mockup/tools, а конфиг и макеты — на уровень выше.
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STEP_MM = 10.0
MAJOR = 5
MARKER_MM = (40.0, 30.0)
MARKER_ORIGIN_MM = (60.0, 40.0)

CLEAR = bytes((0, 0, 0, 0))
INK = bytes((18, 18, 20, 255))
INK_MAJOR = bytes((206, 42, 42, 255))
INK_FRAME = bytes((18, 18, 20, 255))


def write_png(path, buf, w, h):
    raw = bytearray()
    stride = w * 4
    for y in range(h):
        raw.append(0)
        raw += buf[y * stride:(y + 1) * stride]

    def chunk(tag, data):
        return (struct.pack(">I", len(data)) + tag
                + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF))

    def full(tag, data):
        return (struct.pack(">I", len(data)) + tag + data
                + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF))

    png = (b"\x89PNG\r\n\x1a\n"
           + full(b"IHDR", struct.pack(">IIBBBBB", w, h, 8, 6, 0, 0, 0))
           + full(b"IDAT", zlib.compress(bytes(raw), 6))
           + full(b"IEND", b""))
    with open(path, "wb") as fh:
        fh.write(png)


def main(argv):
    width = int(argv[0]) if argv else 4096
    params = argv[1] if len(argv) > 1 else os.path.join(ROOT, "params", "shots.json")
    with open(params, "r", encoding="utf-8") as fh:
        cfg = json.load(fh)
    field = (cfg.get("print") or {}).get("field_mm")
    if len(argv) > 3:
        # формат можно задать прямо: у каждого объёма он свой
        field = [float(argv[2]), float(argv[3])]
    if not field:
        print("формат не задан: укажите ширину и высоту в мм третьим и "
              "четвёртым аргументом", file=sys.stderr)
        return 2
    fw, fh_mm = float(field[0]), float(field[1])
    height = max(1, int(round(width * fh_mm / fw)))
    px_per_mm = width / fw

    buf = bytearray(CLEAR * (width * height))
    stride = width * 4

    def hline(y, x0, x1, rgba, t):
        for oy in range(-t, t + 1):
            yy = y + oy
            if not 0 <= yy < height:
                continue
            a = max(0, x0)
            b = min(width - 1, x1)
            if b >= a:
                buf[yy * stride + a * 4: yy * stride + (b + 1) * 4] = rgba * (b - a + 1)

    def vline(x, y0, y1, rgba, t):
        for ox in range(-t, t + 1):
            xx = x + ox
            if not 0 <= xx < width:
                continue
            for yy in range(max(0, y0), min(height - 1, y1) + 1):
                off = yy * stride + xx * 4
                buf[off:off + 4] = rgba

    def rect(x0, y0, x1, y1, rgba):
        for yy in range(max(0, y0), min(height - 1, y1) + 1):
            a, b = max(0, x0), min(width - 1, x1)
            buf[yy * stride + a * 4: yy * stride + (b + 1) * 4] = rgba * (b - a + 1)

    n_v = int(round(fw / STEP_MM))
    n_h = int(round(fh_mm / STEP_MM))
    for i in range(n_v + 1):
        x = int(round(i * STEP_MM * px_per_mm))
        x = min(x, width - 1)
        major = (i % MAJOR == 0)
        vline(x, 0, height - 1, INK_MAJOR if major else INK, 2 if major else 1)
    for j in range(n_h + 1):
        y = int(round((fh_mm - j * STEP_MM) * px_per_mm))
        y = min(max(y, 0), height - 1)
        major = (j % MAJOR == 0)
        hline(y, 0, width - 1, INK_MAJOR if major else INK, 2 if major else 1)

    # рамка поля: по ней на рендере видно, где макет кончается
    hline(1, 0, width - 1, INK_FRAME, 1)
    hline(height - 2, 0, width - 1, INK_FRAME, 1)
    vline(1, 0, height - 1, INK_FRAME, 1)
    vline(width - 2, 0, height - 1, INK_FRAME, 1)

    mx, my = MARKER_ORIGIN_MM
    mw, mh = MARKER_MM
    rect(int(round(mx * px_per_mm)), int(round((fh_mm - my - mh) * px_per_mm)),
         int(round((mx + mw) * px_per_mm)), int(round((fh_mm - my) * px_per_mm)), INK)

    os.makedirs(os.path.join(ROOT, "art"), exist_ok=True)
    name = "field_grid_%gx%g.png" % (fw, fh_mm)
    path = os.path.join(ROOT, "art", name)
    write_png(path, buf, width, height)
    print("%s  %dx%d px  поле %g x %g мм (%.4f:1), шаг %g мм, красная каждые %g мм"
          % (path, width, height, fw, fh_mm, fw / fh_mm, STEP_MM, STEP_MM * MAJOR))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
