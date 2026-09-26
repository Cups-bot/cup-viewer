"""Задания рендера: очередь, токены, файлы (§3, §7, §9, §10 концепции).

Пользователь ставит задание с макетами → токены резервируются (это и есть
списание) → исполнитель забирает задание, считает кадр, возвращает его → кадр
в галерее 30 дней. Сбой исполнителя — токены возвращаются сами. Купленные
токены идут в очереди раньше приветственных; у бесплатных — одно задание.
"""

import json
import shutil
from pathlib import Path
from typing import Optional

from fastapi import APIRouter, File, Form, HTTPException, Request, Response, UploadFile
from fastapi.responses import FileResponse
from pydantic import BaseModel

from . import catalog, config, db, tokens, watermark
from .security import require_user, require_worker, same_origin

router = APIRouter()
PNG = b"\x89PNG\r\n\x1a\n"


def job_dir(job_id: int) -> Path:
    return config.FILES / "jobs" / str(job_id)


def art_ext(head: bytes) -> str:
    if head.startswith(PNG):
        return "png"
    if head[:3] == b"\xff\xd8\xff":
        return "jpg"
    raise HTTPException(415, "unsupported_media")


async def save_upload(upload: UploadFile, folder: Path, stem: str, limit: int) -> str:
    data = await upload.read(limit + 1)
    if len(data) > limit:
        raise HTTPException(413, "too_large")
    name = f"{stem}.{art_ext(data[:8])}"
    folder.mkdir(parents=True, exist_ok=True)
    (folder / name).write_bytes(data)
    return name


# ── очередь: место и ожидаемое время ─────────────────────────────────────────

def average_seconds(con, size: str) -> float:
    rows = con.execute(
        "SELECT duration_s FROM jobs WHERE status = 'done' AND size = ? AND duration_s IS NOT NULL ORDER BY id DESC LIMIT 20",
        (size,),
    ).fetchall()
    times = [r[0] for r in rows]
    # Без истории — оценка черновика на ноутбуке; дальше учится на своих кадрах.
    return sum(times) / len(times) if times else (60.0 if size == "1600" else 180.0)


def queue_info(con, job) -> dict:
    if job["status"] == "queued":
        ahead = con.execute(
            "SELECT size FROM jobs WHERE status = 'queued' AND (priority < ? OR (priority = ? AND id < ?))",
            (job["priority"], job["priority"], job["id"]),
        ).fetchall()
        running = con.execute("SELECT size, started_at FROM jobs WHERE status = 'rendering'").fetchall()
        eta = sum(average_seconds(con, r["size"]) for r in ahead) + average_seconds(con, job["size"])
        for r in running:
            spent = (db.now() - db.parse(r["started_at"])).total_seconds() if r["started_at"] else 0
            eta += max(0.0, average_seconds(con, r["size"]) - spent)
        return {"position": len(ahead) + 1, "etaSeconds": round(eta)}
    if job["status"] == "rendering":
        spent = (db.now() - db.parse(job["started_at"])).total_seconds() if job["started_at"] else 0
        return {"position": 0, "etaSeconds": round(max(5.0, average_seconds(con, job["size"]) - spent))}
    return {}


def job_view(con, job) -> dict:
    spec = json.loads(job["job_json"])
    folder = job_dir(job["id"])
    done = job["status"] == "done"
    out = {
        "id": job["id"],
        "status": job["status"],
        "size": job["size"],
        "cost": job["cost"],
        "bucket": job["bucket"],
        "marked": bool(job["marked"]),
        "set": spec["set"],
        "frame": spec["camera"]["frame"],
        "cups": [c["id"] for c in spec["cups"]],
        "createdAt": job["created_at"],
        "finishedAt": job["finished_at"],
        "expiresAt": job["expires_at"],
        "error": job["error"],
        "seen": bool(job["seen"]),
        "thumbUrl": f"api/jobs/{job['id']}/image?kind=thumb" if done and (folder / "thumb.webp").exists() else None,
        "imageUrl": f"api/jobs/{job['id']}/image" if done else None,
    }
    out.update(queue_info(con, job))
    return out


def own_job(con, user, job_id: int):
    job = con.execute("SELECT * FROM jobs WHERE id = ?", (job_id,)).fetchone()
    if job is None or (job["user_id"] != user["id"] and not user["is_admin"]) or job["status"] == "deleted":
        raise HTTPException(404, "not_found")
    return job


# ── пользователь ─────────────────────────────────────────────────────────────

@router.post("/api/jobs")
async def create_job(request: Request, job: str = Form(...), size: str = Form("1600"),
                     art0: Optional[UploadFile] = File(None), art1: Optional[UploadFile] = File(None)):
    same_origin(request)
    user = require_user(request)
    if size not in config.PRICES:
        raise HTTPException(400, "bad_size")
    try:
        spec = catalog.check_job(json.loads(job))
    except json.JSONDecodeError:
        raise HTTPException(400, "bad_job")
    arts = [art0, art1]
    cost = config.PRICES[size]
    with db.tx() as con:
        bucket = tokens.pick_bucket(con, user, cost)
        if bucket == "welcome":
            active = con.execute(
                "SELECT COUNT(*) FROM jobs WHERE user_id = ? AND bucket = 'welcome' AND status IN ('queued', 'rendering')",
                (user["id"],),
            ).fetchone()[0]
            if active >= config.FREE_ACTIVE_JOBS:
                raise HTTPException(429, "one_free_job_at_a_time")
        cur = con.execute(
            "INSERT INTO jobs (user_id, status, size, cost, bucket, priority, job_json, marked, expires_at, created_at) "
            "VALUES (?, 'new', ?, ?, ?, ?, ?, ?, ?, ?)",
            (user["id"], size, cost, bucket, 0 if bucket == "paid" else 1, json.dumps(spec, ensure_ascii=False),
             int(bucket == "welcome"), db.stamp(days=config.RETENTION_DAYS), db.stamp()),
        )
        job_id = cur.lastrowid
        tokens.add(con, user["id"], bucket, -cost, "render", job_id=job_id, note=f"кадр {size}")
    # Макеты — после резерва: задание без файлов не уходит в очередь.
    try:
        folder = job_dir(job_id)
        for index, cup in enumerate(spec["cups"]):
            upload = arts[index] if index < len(arts) else None
            if upload is not None and cup.get("print") != "none":
                cup["art"] = await save_upload(upload, folder, f"art-{index + 1}", config.MAX_ART_BYTES)
            elif cup.get("print") != "none":
                cup["print"] = "none"
    except HTTPException:
        with db.tx() as con:
            con.execute("UPDATE jobs SET status = 'failed', error = 'макет не принят' WHERE id = ?", (job_id,))
            tokens.add(con, user["id"], bucket, cost, "refund", job_id=job_id, note="макет не принят")
        shutil.rmtree(job_dir(job_id), ignore_errors=True)
        raise
    with db.tx() as con:
        con.execute("UPDATE jobs SET status = 'queued', job_json = ? WHERE id = ?",
                    (json.dumps(spec, ensure_ascii=False), job_id))
        row = con.execute("SELECT * FROM jobs WHERE id = ?", (job_id,)).fetchone()
        return job_view(con, row)


@router.get("/api/jobs")
def list_jobs(request: Request, active: int = 0):
    user = require_user(request)
    con = db.connect()
    where = "status IN ('queued', 'rendering')" if active else "status NOT IN ('deleted', 'new')"
    rows = con.execute(f"SELECT * FROM jobs WHERE user_id = ? AND {where} ORDER BY id DESC LIMIT 200", (user["id"],)).fetchall()
    return {"jobs": [job_view(con, r) for r in rows]}


class Seen(BaseModel):
    ids: list[int]


@router.post("/api/jobs/seen")
def mark_seen(body: Seen, request: Request):
    same_origin(request)
    user = require_user(request)
    con = db.connect()
    for job_id in body.ids[:200]:
        con.execute("UPDATE jobs SET seen = 1 WHERE id = ? AND user_id = ?", (job_id, user["id"]))
    return {"ok": True}


@router.get("/api/jobs/{job_id}/image")
def job_image(job_id: int, request: Request, kind: str = "full", download: int = 0):
    user = require_user(request)
    job = own_job(db.connect(), user, job_id)
    folder = job_dir(job_id)
    if kind == "thumb":
        path = folder / "thumb.webp"
    else:
        path = folder / ("marked.png" if job["marked"] else "clean.png")
    if job["status"] != "done" or not path.exists():
        raise HTTPException(404, "not_found")
    spec = json.loads(job["job_json"])
    name = f"cupviewer_{spec['set']}_{job_id}.png" if kind != "thumb" else None
    headers = {"Cache-Control": "private, max-age=300"}
    if download and name:
        return FileResponse(path, media_type="image/png", filename=name, headers=headers)
    return FileResponse(path, headers=headers)


@router.post("/api/jobs/{job_id}/unmark")
def unmark(job_id: int, request: Request):
    same_origin(request)
    user = require_user(request)
    with db.tx() as con:
        job = own_job(con, user, job_id)
        if job["status"] != "done" or not job["marked"]:
            raise HTTPException(409, "not_marked")
        owner = con.execute("SELECT * FROM users WHERE id = ?", (job["user_id"],)).fetchone()
        tokens.charge(con, owner, config.UNMARK_PRICE, "unmark", job_id=job_id, note="убрать знак")
        con.execute("UPDATE jobs SET marked = 0 WHERE id = ?", (job_id,))
        return job_view(con, con.execute("SELECT * FROM jobs WHERE id = ?", (job_id,)).fetchone())


@router.post("/api/jobs/{job_id}/repeat")
def repeat(job_id: int, request: Request):
    """Тот же кадр ещё раз (другой исполнитель, сбой) — с теми же макетами, за ту же цену."""
    same_origin(request)
    user = require_user(request)
    with db.tx() as con:
        job = own_job(con, user, job_id)
        bucket = tokens.pick_bucket(con, user, job["cost"])
        cur = con.execute(
            "INSERT INTO jobs (user_id, status, size, cost, bucket, priority, job_json, marked, expires_at, created_at) "
            "VALUES (?, 'queued', ?, ?, ?, ?, ?, ?, ?, ?)",
            (user["id"], job["size"], job["cost"], bucket, 0 if bucket == "paid" else 1, job["job_json"],
             int(bucket == "welcome"), db.stamp(days=config.RETENTION_DAYS), db.stamp()),
        )
        new_id = cur.lastrowid
        tokens.add(con, user["id"], bucket, -job["cost"], "render", job_id=new_id, note=f"повтор кадра {job_id}")
        src = job_dir(job_id)
        dst = job_dir(new_id)
        dst.mkdir(parents=True, exist_ok=True)
        for art in src.glob("art-*"):
            shutil.copyfile(art, dst / art.name)
        return job_view(con, con.execute("SELECT * FROM jobs WHERE id = ?", (new_id,)).fetchone())


@router.delete("/api/jobs/{job_id}")
def delete_job(job_id: int, request: Request):
    same_origin(request)
    user = require_user(request)
    with db.tx() as con:
        job = own_job(con, user, job_id)
        if job["status"] == "rendering":
            raise HTTPException(409, "rendering")
        if job["status"] == "queued":
            tokens.add(con, job["user_id"], job["bucket"], job["cost"], "refund", job_id=job_id, note="отмена до рендера")
        con.execute("UPDATE jobs SET status = 'deleted' WHERE id = ?", (job_id,))
    shutil.rmtree(job_dir(job_id), ignore_errors=True)
    return {"ok": True}


# ── исполнитель ──────────────────────────────────────────────────────────────

@router.post("/api/worker/claim")
def claim(request: Request, response: Response):
    worker = require_worker(request)
    with db.tx() as con:
        job = con.execute("SELECT * FROM jobs WHERE status = 'queued' ORDER BY priority, id LIMIT 1").fetchone()
        if job is None:
            response.status_code = 204
            return None
        con.execute(
            "UPDATE jobs SET status = 'rendering', worker = ?, started_at = ?, heartbeat_at = ? WHERE id = ?",
            (worker, db.stamp(), db.stamp(), job["id"]),
        )
    spec = json.loads(job["job_json"])
    return {"id": job["id"], "size": job["size"], "job": spec,
            "arts": [c["art"] for c in spec["cups"] if c.get("art")]}


@router.get("/api/worker/jobs/{job_id}/files/{name}")
def worker_file(job_id: int, name: str, request: Request):
    require_worker(request)
    if "/" in name or "\\" in name or not name.startswith("art-"):
        raise HTTPException(400, "bad_name")
    path = job_dir(job_id) / name
    if not path.exists():
        raise HTTPException(404, "not_found")
    return FileResponse(path)


@router.post("/api/worker/jobs/{job_id}/ping")
def ping(job_id: int, request: Request):
    require_worker(request)
    db.connect().execute("UPDATE jobs SET heartbeat_at = ? WHERE id = ? AND status = 'rendering'", (db.stamp(), job_id))
    return {"ok": True}


@router.post("/api/worker/jobs/{job_id}/done")
async def done(job_id: int, request: Request, image: UploadFile = File(...), seconds: float = Form(0)):
    require_worker(request)
    con = db.connect()
    job = con.execute("SELECT * FROM jobs WHERE id = ?", (job_id,)).fetchone()
    if job is None or job["status"] != "rendering":
        raise HTTPException(409, "not_rendering")
    folder = job_dir(job_id)
    data = await image.read(config.MAX_IMAGE_BYTES + 1)
    if len(data) > config.MAX_IMAGE_BYTES or not data.startswith(PNG):
        raise HTTPException(415, "bad_image")
    folder.mkdir(parents=True, exist_ok=True)
    clean = folder / "clean.png"
    clean.write_bytes(data)
    if job["bucket"] == "welcome":
        watermark.mark(clean, folder / "marked.png")
    watermark.thumb(folder / ("marked.png" if job["bucket"] == "welcome" else "clean.png"), folder / "thumb.webp")
    with db.tx() as con:
        con.execute(
            "UPDATE jobs SET status = 'done', finished_at = ?, duration_s = ?, seen = 0 WHERE id = ?",
            (db.stamp(), float(seconds) or None, job_id),
        )
    return {"ok": True}


class Failure(BaseModel):
    error: str


@router.post("/api/worker/jobs/{job_id}/fail")
def fail(job_id: int, body: Failure, request: Request):
    require_worker(request)
    with db.tx() as con:
        job = con.execute("SELECT * FROM jobs WHERE id = ?", (job_id,)).fetchone()
        if job is None or job["status"] != "rendering":
            raise HTTPException(409, "not_rendering")
        con.execute("UPDATE jobs SET status = 'failed', finished_at = ?, error = ?, seen = 0 WHERE id = ?",
                    (db.stamp(), body.error[:500], job_id))
        tokens.add(con, job["user_id"], job["bucket"], job["cost"], "refund", job_id=job_id, note="сбой рендера")
    return {"ok": True}


# ── уборка ───────────────────────────────────────────────────────────────────

def sweep() -> dict:
    """Зависшие у исполнителя — назад в очередь; старше 30 дней — файлы вон."""
    now = db.iso(db.now())
    stale = db.stamp(minutes=-config.STALE_MINUTES)
    with db.tx() as con:
        requeued = con.execute(
            "UPDATE jobs SET status = 'queued', worker = NULL WHERE status = 'rendering' AND heartbeat_at < ?", (stale,)
        ).rowcount
        old = con.execute("SELECT id FROM jobs WHERE expires_at < ? AND status NOT IN ('expired', 'deleted')", (now,)).fetchall()
        for row in old:
            con.execute("UPDATE jobs SET status = 'expired' WHERE id = ?", (row["id"],))
    for row in old:
        shutil.rmtree(job_dir(row["id"]), ignore_errors=True)
    return {"requeued": requeued, "expired": len(old)}
