"""Обзорная страница по готовым мокапам.

Собирает всё, что лежит в mockup/out, в одну страницу: превью, под ним — чем
именно этот кадр отличается от соседнего. Открывается в браузере, клик по
превью показывает кадр целиком.

Ничего, кроме стандартной библиотеки, не нужно: картинки не пересжимаются, а
подставляются ссылками. Поэтому страница не устаревает — она всегда показывает
те файлы, что лежат рядом с ней.

    py -3.11 mockup/tools/make_contact_sheet.py
"""

import glob
import html
import io
import json
import os
import sys
import time

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "out")
PAGE = os.path.join(OUT, "ОБЗОР.html")

STYLE = """
:root { color-scheme: light dark; }
body { margin: 0; padding: 32px; font: 14px/1.5 system-ui, "Segoe UI", sans-serif;
       background: #f6f6f7; color: #16181d; }
h1 { font-size: 20px; margin: 0 0 4px; }
p.sub { margin: 0 0 28px; color: #6b7076; }
.grid { display: grid; gap: 22px; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); }
figure { margin: 0; background: #fff; border: 1px solid #e3e5e8; border-radius: 10px;
         overflow: hidden; }
figure img { display: block; width: 100%; height: auto; background: #eceef0; }
figcaption { padding: 12px 14px 14px; }
.name { font-weight: 600; }
.meta { margin-top: 6px; color: #6b7076; font-size: 13px; }
.meta b { font-weight: 600; color: #16181d; }
.warn { margin-top: 6px; color: #a33; font-size: 13px; }
.empty { color: #6b7076; }
@media (prefers-color-scheme: dark) {
  body { background: #15171a; color: #e8eaed; }
  figure { background: #1d2024; border-color: #2c3036; }
  figure img { background: #24272c; }
  p.sub, .meta { color: #9aa0a6; }
  .meta b { color: #e8eaed; }
}
"""


def card(image):
    stem = image[:-4]
    name = os.path.basename(stem)
    report = stem + ".json"
    lines = []
    warnings = []
    if os.path.isfile(report):
        with io.open(report, "r", encoding="utf-8") as fh:
            info = json.load(fh)
        lines.append(f"<b>{html.escape(str(info.get('cup', '?')))} мл</b>"
                     f" &middot; фон {html.escape(info.get('shot', '?'))}"
                     f" &middot; сцена {html.escape(info.get('scene', '?'))}")
        printed = info.get("print")
        if printed:
            fit = printed.get("fit", {})
            what = f"печать {html.escape(printed.get('mode', '?'))}"
            if printed.get("mode") == "rect" and "distortion_pct" in fit:
                what += f", искажение {fit['distortion_pct']:+.2f} %"
            elif printed.get("mode") == "cone" and "alpha_deg" in fit:
                what += f", сектор {fit['alpha_deg']} град."
            lines.append(what)
        else:
            lines.append("чистый стакан, без печати")
        res = info.get("resolution", ["?", "?"])
        lines.append(f"{res[0]}&times;{res[1]}, {info.get('samples', '?')} сэмплов")
        if abs(info.get("scale", 1.0) - 1.0) > 1e-9:
            lines.append(f"в сцене уменьшен в {1 / info['scale']:.2f} раза")
        warnings = info.get("warnings") or []
    body = "<br>".join(lines) or "отчёта рядом нет"
    warn = ("<div class='warn'>" + "<br>".join(html.escape(w) for w in warnings) + "</div>"
            if warnings else "")
    file_name = html.escape(os.path.basename(image))
    return (f"<figure><a href='{file_name}'><img src='{file_name}' alt='{file_name}' "
            f"loading='lazy'></a><figcaption><div class='name'>{html.escape(name)}</div>"
            f"<div class='meta'>{body}</div>{warn}</figcaption></figure>")


def main() -> int:
    images = sorted(p for p in glob.glob(os.path.join(OUT, "*.png")))
    when = time.strftime("%d.%m.%Y %H:%M")
    if images:
        grid = "<div class='grid'>" + "".join(card(p) for p in images) + "</div>"
        sub = f"{len(images)} кадров &middot; собрано {when}"
    else:
        grid = "<p class='empty'>В mockup/out пока нет ни одного кадра. Снимите мокап — МОКАП.bat в корне проекта.</p>"
        sub = f"пусто &middot; проверено {when}"
    page = ("<!doctype html><html lang='ru'><head><meta charset='utf-8'>"
            "<meta name='viewport' content='width=device-width, initial-scale=1'>"
            "<title>Мокапы стакана</title><style>" + STYLE + "</style></head><body>"
            "<h1>Мокапы стакана</h1><p class='sub'>" + sub + "</p>" + grid +
            "</body></html>")
    with io.open(PAGE, "w", encoding="utf-8") as fh:
        fh.write(page)
    print(PAGE)
    return 0


if __name__ == "__main__":
    sys.exit(main())
