"""Каталог для проверки заданий: сцены, ракурсы и стаканы — те же файлы, что у
сайта и рендера (catalog/). Цену и допустимость задания решает сервер:
браузеру не доверяем (§3 концепции)."""

import json
from functools import lru_cache

from fastapi import HTTPException

from . import config

FRAMES = {"1:1", "3:4", "4:5"}


@lru_cache(maxsize=1)
def load() -> dict:
    cups = json.loads((config.REPO / "catalog" / "cups.json").read_text(encoding="utf-8"))["cups"]
    scenes_index = json.loads((config.REPO / "catalog" / "scenes" / "index.json").read_text(encoding="utf-8"))
    scenes = {}
    for s in scenes_index["scenes"]:
        scenes[s["id"]] = {"presets": {p["id"] for p in s.get("presets", [])}, "maxCups": s.get("maxCups", 2)}
    return {
        "cups": {c["id"]: c for c in cups if c.get("web") and c.get("render")},
        "scenes": scenes,
    }


def check_job(job: dict) -> dict:
    """Задание сайта (viewer.photoJob + картон, печать) → чистое задание рендера."""
    cat = load()
    if not isinstance(job, dict):
        raise HTTPException(400, "bad_job")
    scene = cat["scenes"].get(job.get("set"))
    if scene is None:
        raise HTTPException(400, "bad_scene")
    camera = job.get("camera") or {}
    preset = camera.get("preset")
    frame = camera.get("frame") or "1:1"
    if preset not in scene["presets"] or frame not in FRAMES:
        raise HTTPException(400, "bad_camera")
    cups = job.get("cups")
    if not isinstance(cups, list) or not 1 <= len(cups) <= min(2, scene["maxCups"]):
        raise HTTPException(400, "bad_cups")
    clean = []
    for cup in cups:
        entry = cat["cups"].get(cup.get("id"))
        if entry is None:
            raise HTTPException(400, "bad_cup")
        out = {"id": entry["id"]}
        rotate = cup.get("rotate", 0)
        if not isinstance(rotate, (int, float)):
            raise HTTPException(400, "bad_rotate")
        out["rotate"] = float(rotate) % 360.0
        pos = cup.get("pos_mm")
        if pos is not None:
            if not (isinstance(pos, list) and len(pos) == 2 and all(isinstance(v, (int, float)) and abs(v) < 1000 for v in pos)):
                raise HTTPException(400, "bad_pos")
            out["pos_mm"] = [float(pos[0]), float(pos[1])]
        board = cup.get("board")
        if board is not None:
            if entry["type"] != "paper" or board not in entry.get("materialCompatibility", []):
                raise HTTPException(400, "bad_board")
            out["board"] = board
        if cup.get("print") == "none":
            out["print"] = "none"
        elif cup.get("print") == "pad":
            # Тампопечать PP: своя полоса у рендера (render.print.pad).
            if entry["type"] != "pp" or not (entry.get("render") or {}).get("print", {}).get("pad"):
                raise HTTPException(400, "bad_print")
            out["print"] = "pad"
        clean.append(out)
    return {"set": job["set"], "camera": {"preset": preset, "frame": frame}, "cups": clean}
