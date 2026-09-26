"""Сверка неприкосновенных файлов с реестром.

Заводские исходники и файл со сценами — то, по чему сверяется всё остальное.
Если они молча изменились, все отчёты сверки становятся бессмысленными, а
подмену легко не заметить: размер файла может остаться прежним.

    py -3.11 product/check/protected.py

Коды возврата: 0 — всё сходится, 1 — есть расхождения.
"""

import hashlib
import io
import json
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
REGISTRY = os.path.join(ROOT, "docs", "отчёты", "protected_files.json")


def main() -> int:
    if not os.path.isfile(REGISTRY):
        print(f"{REGISTRY}: реестра нет", file=sys.stderr)
        return 1
    with io.open(REGISTRY, "r", encoding="utf-8") as fh:
        registry = json.load(fh)

    missing, changed = [], []
    for entry in registry["files"]:
        path = os.path.join(ROOT, entry["path"])
        if not os.path.isfile(path):
            missing.append(entry["path"])
            continue
        with open(path, "rb") as fh:
            digest = hashlib.sha256(fh.read()).hexdigest()
        if digest != entry["sha256"]:
            changed.append((entry["path"], entry["bytes"], os.path.getsize(path)))

    total = len(registry["files"])
    print(f"Реестр от {registry.get('verified', '?')}: {total} файлов")
    for path in missing:
        print(f"  НЕТ НА МЕСТЕ  {path}")
    for path, was, now in changed:
        print(f"  ИЗМЕНЁН       {path}  было {was} байт, стало {now}")
    if not missing and not changed:
        print("  всё сходится")
        return 0
    print("\nЭти файлы менять нельзя. Верните их из резервной копии или, если "
          "изменение намеренное, пересоберите реестр осознанно.")
    return 1


if __name__ == "__main__":
    sys.exit(main())
