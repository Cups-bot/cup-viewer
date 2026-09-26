"""Водяной знак кадра за приветственный токен (§4 концепции): небольшой
полупрозрачный знак сайта в углу. Чистый кадр хранится рядом — «Убрать
знак» просто отдаёт его, видеокарту не занимает."""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

FONTS = ["arialbd.ttf", "Arial Bold.ttf", "DejaVuSans-Bold.ttf", "LiberationSans-Bold.ttf", "arial.ttf"]


def _font(size: int):
    for name in FONTS:
        try:
            return ImageFont.truetype(name, size)
        except OSError:
            continue
    return ImageFont.load_default(size=size)


def mark(src: Path, dst: Path) -> None:
    image = Image.open(src).convert("RGBA")
    w, h = image.size
    size = max(14, round(min(w, h) * 0.032))
    font = _font(size)
    text = "CupViewer"
    pad = round(size * 0.9)
    layer = Image.new("RGBA", image.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    tw = draw.textlength(text, font=font)
    # Стаканчик слева от надписи — трапеция с кромкой, как значок сайта.
    cw = size * 0.72
    x1 = w - pad - tw
    x0 = x1 - cw - size * 0.35
    y0 = h - pad - size
    cup = [(x0, y0 + size * 0.12), (x0 + cw, y0 + size * 0.12), (x0 + cw * 0.84, y0 + size), (x0 + cw * 0.16, y0 + size)]
    shadow = Image.new("RGBA", image.size, (0, 0, 0, 0))
    sd = ImageDraw.Draw(shadow)
    sd.polygon(cup, fill=(0, 0, 0, 90))
    sd.text((x1, y0 - size * 0.12), text, font=font, fill=(0, 0, 0, 90))
    shadow = shadow.filter(ImageFilter.GaussianBlur(max(1, size // 8)))
    draw.polygon(cup, fill=(255, 255, 255, 150))
    draw.rectangle([x0 - size * 0.05, y0 + size * 0.04, x0 + cw + size * 0.05, y0 + size * 0.14], fill=(255, 255, 255, 170))
    draw.text((x1, y0 - size * 0.12), text, font=font, fill=(255, 255, 255, 150))
    out = Image.alpha_composite(Image.alpha_composite(image, shadow), layer)
    out.convert("RGB").save(dst, "PNG", optimize=True)


def thumb(src: Path, dst: Path, width: int = 480) -> None:
    image = Image.open(src).convert("RGB")
    image.thumbnail((width, width * 2))
    image.save(dst, "WEBP", quality=82)
