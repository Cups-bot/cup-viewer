"""Миниатюра кадра для «Моих рендеров». Водяного знака больше нет
(владелец, 2026-09-28: сайт по подписке — кадры все без знака)."""

from pathlib import Path

from PIL import Image


def thumb(src: Path, dst: Path, width: int = 480) -> None:
    image = Image.open(src).convert("RGB")
    image.thumbnail((width, width * 2))
    image.save(dst, "WEBP", quality=82)
