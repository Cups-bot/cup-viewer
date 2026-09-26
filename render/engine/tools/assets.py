"""Тяжёлые файлы движка рендера: вне git, со списком в render/assets.json.

В git лежат код и параметры. Сцены Blender, модели стаканов, текстуры и
тестовые макеты весят сотни мегабайт — они лежат рядом на диске (позже — в
S3), а git знает о них только по списку: путь, размер, SHA-256. По списку
видно, что файла не хватает или он подменён, ещё до того, как упадёт рендер.

    python render/engine/tools/assets.py index    # переписать список по файлам на диске
    python render/engine/tools/assets.py check    # всё ли на месте и совпадает
    python render/engine/tools/assets.py check --fast   # только размеры, без хешей

Что считается тяжёлым — HEAVY ниже; те же правила стоят в .gitignore.
Выгрузки превью (web/scenes, web/cups) и кадры (out/) сюда не входят: их
пересобирают инструменты.
"""

import argparse
import datetime
import fnmatch
import hashlib
import io
import json
import os
import sys

RENDER = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
MANIFEST = os.path.join(RENDER, "assets.json")

# Пути от корня render/, со слешами «/».
HEAVY = (
    "scenes/*",
    "art/*",
    "cups/*.blend", "cups/*.glb", "cups/*.obj", "cups/*.mtl",
    "cups/*.png", "cups/*.jpg", "cups/*.pdf",
    "cups/*/textures/*",
)
SKIP = ("*.blend1", "*/__pycache__/*", "*.pyc")


def heavy(rel: str) -> bool:
    if any(fnmatch.fnmatch(rel, p) for p in SKIP):
        return False
    return any(fnmatch.fnmatch(rel, p) for p in HEAVY)


def scan() -> list:
    out = []
    for root, dirs, files in os.walk(RENDER):
        # кадры render/out — не исходники; а вот cups/plastic/*/out — модели PP
        dirs[:] = [d for d in dirs if d not in (".git", "__pycache__")
                   and not (root == RENDER and d in ("out", "web"))]
        for name in files:
            rel = os.path.relpath(os.path.join(root, name), RENDER).replace(os.sep, "/")
            if heavy(rel):
                out.append(rel)
    return sorted(out)


def sha256(path: str) -> str:
    h = hashlib.sha256()
    with open(path, "rb") as fh:
        for block in iter(lambda: fh.read(1 << 20), b""):
            h.update(block)
    return h.hexdigest()


def index() -> int:
    files = []
    for rel in scan():
        full = os.path.join(RENDER, rel)
        files.append({"path": rel, "bytes": os.path.getsize(full), "sha256": sha256(full)})
    total = sum(f["bytes"] for f in files)
    data = {
        "schema": 1,
        "_about": "Тяжёлые файлы render/ вне git: путь от render/, размер, SHA-256. "
                  "Переписывает engine/tools/assets.py index, проверяет — check.",
        "indexed": datetime.date.today().isoformat(),
        "totalBytes": total,
        "files": files,
    }
    with io.open(MANIFEST, "w", encoding="utf-8", newline="\n") as fh:
        fh.write(json.dumps(data, ensure_ascii=False, indent=1) + "\n")
    print(f"assets.json: {len(files)} файлов, {total / 2 ** 20:.0f} МБ")
    return 0


def check(fast: bool) -> int:
    if not os.path.isfile(MANIFEST):
        print("нет render/assets.json — сначала: assets.py index", file=sys.stderr)
        return 2
    with io.open(MANIFEST, "r", encoding="utf-8") as fh:
        listed = {f["path"]: f for f in json.load(fh)["files"]}
    missing, changed = [], []
    for rel, f in listed.items():
        full = os.path.join(RENDER, rel)
        if not os.path.isfile(full):
            missing.append(rel)
        elif os.path.getsize(full) != f["bytes"] or (not fast and sha256(full) != f["sha256"]):
            changed.append(rel)
    extra = [rel for rel in scan() if rel not in listed]
    for title, rows in (("нет на диске", missing), ("изменились", changed), ("нет в списке", extra)):
        for rel in rows:
            print(f"{title}: {rel}")
    ok = not (missing or changed or extra)
    print(f"{'всё на месте' if ok else 'расхождения'}: {len(listed)} файлов в списке"
          + ("" if not fast else " (только размеры)"))
    return 0 if ok else 1


def main() -> int:
    ap = argparse.ArgumentParser(prog="assets.py")
    ap.add_argument("command", choices=("index", "check"))
    ap.add_argument("--fast", action="store_true", help="check: сверять только размеры")
    args = ap.parse_args()
    return index() if args.command == "index" else check(args.fast)


if __name__ == "__main__":
    sys.exit(main())
