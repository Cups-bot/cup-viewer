"""Задания рендера: очередь, токены, файлы (§3, §7, §9, §10 концепции).

Пользователь ставит задание с макетами → токены резервируются (это и есть
списание) → исполнитель забирает задание, считает кадр, возвращает его → кадр
в галерее 30 дней. Сбой исполнителя — токены возвращаются сами. Всё — только
при действующей подписке (security.require_access); кадры без знака.
"""

import io
import json
import shutil
import tempfile
import zipfile
from pathlib import Path
from typing import Optional

from fastapi import APIRouter, BackgroundTasks, File, Form, HTTPException, Request, Response, UploadFile
from fastapi.responses import FileResponse
from PIL import Image
from pydantic import BaseModel

from . import catalog, config, db, thumbs, tokens
from .security import require_access, require_worker, same_origin

router = APIRouter()
PNG = b"\x89PNG\r\n\x1a\n"

# Ошибки, которые можно показать человеку как есть; остальное (лог Blender,
# пути на исполнителе) видит только админка.
USER_ERRORS = {"макет не принят", "отменено администратором", "не дождался исполнителя",
               "исполнитель не справился"}
GENERIC_ERROR = "Не получилось посчитать кадр"


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
    # Размер в пикселях: 50 МБ PNG может разжаться в десятки гигабайт и уронить
    # исполнителя. Pillow читает только заголовок.
    try:
        width, height = Image.open(io.BytesIO(data)).size
    except Exception:
        raise HTTPException(415, "unsupported_media")
    if max(width, height) > config.MAX_ART_SIDE or width * height > config.MAX_ART_PIXELS:
        raise HTTPException(413, "too_large")
    folder.mkdir(parents=True, exist_ok=True)
    (folder / name).write_bytes(data)
    return name


# ── очередь: место, ожидаемое время, исполнитель на связи ────────────────────

# Без истории — оценка ноутбука владельца (GTX 1650 Ti); дальше учится на своих кадрах.
FIRST_GUESS_S = {"standard": 360.0, "ultra": 1320.0}


def average_seconds(con, size: str) -> float:
    tier = config.tier_of(size)
    # Старые черновые кадры (1600, 3000) о нынешнем времени ничего не говорят.
    rows = con.execute(
        "SELECT duration_s FROM jobs WHERE status = 'done' AND size = ? AND duration_s IS NOT NULL ORDER BY id DESC LIMIT 20",
        (tier,),
    ).fetchall()
    times = [r[0] for r in rows]
    return sum(times) / len(times) if times else FIRST_GUESS_S.get(tier, 600.0)


def worker_online(con) -> bool:
    """Исполнитель приходит за заданием раз в несколько секунд и шлёт пульс во
    время рендера: нет вестей дольше WORKER_OFFLINE_MIN — он не на связи."""
    row = con.execute("SELECT MAX(seen_at) FROM workers").fetchone()
    return bool(row[0]) and row[0] > db.stamp(minutes=-config.WORKER_OFFLINE_MIN)


def seen_worker(con, name: str) -> None:
    con.execute("INSERT INTO workers (name, seen_at) VALUES (?, ?) "
                "ON CONFLICT(name) DO UPDATE SET seen_at = excluded.seen_at", (name, db.stamp()))


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
        return {"position": len(ahead) + 1, "etaSeconds": round(eta), "workerOnline": worker_online(con)}
    if job["status"] == "rendering":
        spent = (db.now() - db.parse(job["started_at"])).total_seconds() if job["started_at"] else 0
        return {"position": 0, "etaSeconds": round(max(5.0, average_seconds(con, job["size"]) - spent)),
                "workerOnline": True}
    return {}


def job_view(con, job, *, admin: bool = False) -> dict:
    spec = json.loads(job["job_json"])
    folder = job_dir(job["id"])
    done = job["status"] == "done"
    error = job["error"]
    out = {
        "id": job["id"],
        "status": job["status"],
        "size": config.tier_of(job["size"]),
        "cost": job["cost"],
        "bucket": job["bucket"],
        "set": spec["set"],
        "frame": spec["camera"]["frame"],
        "cups": [c["id"] for c in spec["cups"]],
        "createdAt": job["created_at"],
        "finishedAt": job["finished_at"],
        "expiresAt": job["expires_at"],
        "error": (error if error in USER_ERRORS else GENERIC_ERROR) if error else None,
        "seen": bool(job["seen"]),
        "thumbUrl": f"api/jobs/{job['id']}/image?kind=thumb" if done and (folder / "thumb.webp").exists() else None,
        "imageUrl": f"api/jobs/{job['id']}/image?kind=full" if done else None,
    }
    if admin:
        out["errorRaw"] = error
    out.update(queue_info(con, job))
    return out


def own_job(con, user, job_id: int):
    job = con.execute("SELECT * FROM jobs WHERE id = ?", (job_id,)).fetchone()
    if job is None or (job["user_id"] != user["id"] and not user["is_admin"]) or job["status"] == "deleted":
        raise HTTPException(404, "not_found")
    return job


def enqueue(con, user, size: str, spec_json: str, status: str, note: str) -> int:
    """Резерв токенов и запись задания — одно правило для нового кадра и повтора:
    чем платить (tokens.plan) и не больше MAX_ACTIVE_JOBS в работе. Очередь
    общая: все пользователи — подписчики, приоритета по кошельку нет."""
    cost = config.PRICES[size]
    parts = tokens.plan(con, user, cost)
    active = con.execute(
        "SELECT COUNT(*) FROM jobs WHERE user_id = ? AND status IN ('new', 'queued', 'rendering')", (user["id"],),
    ).fetchone()[0]
    if active >= config.MAX_ACTIVE_JOBS:
        raise HTTPException(429, "too_many_jobs")
    cur = con.execute(
        "INSERT INTO jobs (user_id, status, size, cost, bucket, priority, job_json, marked, expires_at, created_at) "
        "VALUES (?, ?, ?, ?, ?, 0, ?, 0, ?, ?)",
        (user["id"], status, size, cost, parts["bucket"], spec_json,
         db.stamp(days=config.RETENTION_DAYS), db.stamp()),
    )
    job_id = cur.lastrowid
    tokens.charge_job(con, user["id"], parts, job_id=job_id, note=note)
    return job_id


def fail_job(con, job, error: str, note: str) -> None:
    con.execute("UPDATE jobs SET status = 'failed', error = ?, finished_at = ?, seen = 0 WHERE id = ?",
                (error, db.stamp(), job["id"]))
    tokens.refund_job(con, job, note)


# ── пользователь ─────────────────────────────────────────────────────────────

@router.post("/api/jobs")
async def create_job(request: Request, job: str = Form(...), size: str = Form("standard"),
                     art0: Optional[UploadFile] = File(None), art1: Optional[UploadFile] = File(None)):
    same_origin(request)
    user = require_access(request)
    size = config.tier_of(size)
    if size not in config.PRICES:
        raise HTTPException(400, "bad_size")
    try:
        spec = catalog.check_job(json.loads(job))
    except json.JSONDecodeError:
        raise HTTPException(400, "bad_job")
    arts = [art0, art1]
    with db.tx() as con:
        job_id = enqueue(con, user, size, json.dumps(spec, ensure_ascii=False), "new", f"кадр {config.TIERS[size]['label']}")
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
            fail_job(con, con.execute("SELECT * FROM jobs WHERE id = ?", (job_id,)).fetchone(),
                     "макет не принят", "макет не принят")
        shutil.rmtree(job_dir(job_id), ignore_errors=True)
        raise
    with db.tx() as con:
        con.execute("UPDATE jobs SET status = 'queued', job_json = ? WHERE id = ?",
                    (json.dumps(spec, ensure_ascii=False), job_id))
        row = con.execute("SELECT * FROM jobs WHERE id = ?", (job_id,)).fetchone()
        return job_view(con, row)


@router.get("/api/jobs")
def list_jobs(request: Request, active: int = 0):
    user = require_access(request)
    con = db.connect()
    where = "status IN ('queued', 'rendering')" if active else "status NOT IN ('deleted', 'new')"
    rows = con.execute(f"SELECT * FROM jobs WHERE user_id = ? AND {where} ORDER BY id DESC LIMIT 200", (user["id"],)).fetchall()
    return {"jobs": [job_view(con, r) for r in rows], "workerOnline": worker_online(con)}


class Seen(BaseModel):
    ids: list[int]


@router.post("/api/jobs/seen")
def mark_seen(body: Seen, request: Request):
    same_origin(request)
    user = require_access(request)
    con = db.connect()
    for job_id in body.ids[:200]:
        con.execute("UPDATE jobs SET seen = 1 WHERE id = ? AND user_id = ?", (job_id, user["id"]))
    return {"ok": True}


def frame_file(job) -> Path:
    return job_dir(job["id"]) / "clean.png"


def frame_name(job) -> str:
    return f"cupviewer_{json.loads(job['job_json'])['set']}_{job['id']}.png"


@router.get("/api/jobs/{job_id}/image")
def job_image(job_id: int, request: Request, kind: str = "full", download: int = 0):
    user = require_access(request)
    job = own_job(db.connect(), user, job_id)
    path = job_dir(job_id) / "thumb.webp" if kind == "thumb" else frame_file(job)
    if job["status"] != "done" or not path.exists():
        raise HTTPException(404, "not_found")
    headers = {"Cache-Control": "private, max-age=300"}
    if download and kind != "thumb":
        return FileResponse(path, media_type="image/png", filename=frame_name(job), headers=headers)
    return FileResponse(path, headers=headers)


def parse_ids(ids: str) -> list[int]:
    try:
        out = [int(x) for x in ids.split(",") if x.strip()]
    except ValueError:
        raise HTTPException(400, "bad_ids")
    if not out or len(out) > 200:
        raise HTTPException(400, "bad_ids")
    return list(dict.fromkeys(out))


@router.get("/api/jobs/archive")
def archive(request: Request, background: BackgroundTasks, ids: str = ""):
    """Выбранные кадры одним ZIP: те же файлы, что «Скачать PNG» у каждого.
    PNG уже сжат — в архиве без сжатия."""
    user = require_access(request)
    con = db.connect()
    jobs = [con.execute("SELECT * FROM jobs WHERE id = ? AND user_id = ? AND status = 'done'", (i, user["id"])).fetchone()
            for i in parse_ids(ids)]
    files = [(frame_file(j), frame_name(j)) for j in jobs if j is not None and frame_file(j).exists()]
    if not files:
        raise HTTPException(404, "not_found")
    tmp = Path(tempfile.mkstemp(prefix="cv-archive-", suffix=".zip")[1])
    with zipfile.ZipFile(tmp, "w", zipfile.ZIP_STORED) as zf:
        for path, name in files:
            zf.write(path, name)
    background.add_task(tmp.unlink, missing_ok=True)
    stamp = db.now().strftime("%Y-%m-%d")
    return FileResponse(tmp, media_type="application/zip", filename=f"cupviewer_{stamp}_{len(files)}.zip",
                        headers={"Cache-Control": "no-store"})


@router.get("/api/jobs/{job_id}/spec")
def job_spec(job_id: int, request: Request):
    """Сцена кадра — вернуть её в редактор («Открыть в редакторе»): стаканы,
    углы, ракурс, формат и адреса макетов, пока они хранятся."""
    user = require_access(request)
    job = own_job(db.connect(), user, job_id)
    spec = json.loads(job["job_json"])
    folder = job_dir(job_id)
    arts = [f"api/jobs/{job_id}/art/{i}" if c.get("art") and (folder / c["art"]).exists() else None
            for i, c in enumerate(spec["cups"])]
    return {"job": spec, "arts": arts}


@router.get("/api/jobs/{job_id}/art/{index}")
def job_art(job_id: int, index: int, request: Request):
    user = require_access(request)
    job = own_job(db.connect(), user, job_id)
    cups = json.loads(job["job_json"])["cups"]
    if not 0 <= index < len(cups) or not cups[index].get("art"):
        raise HTTPException(404, "not_found")
    path = job_dir(job_id) / cups[index]["art"]
    if not path.exists():
        raise HTTPException(404, "not_found")
    return FileResponse(path, headers={"Cache-Control": "private, max-age=300"})


@router.post("/api/jobs/{job_id}/repeat")
def repeat(job_id: int, request: Request):
    """Тот же кадр ещё раз после сбоя — с теми же макетами. Правила те же, что у
    нового кадра (цена, «у бесплатных одно задание»). Готовый кадр повторять
    незачем: рендер тот же — для изменений есть «Открыть в редакторе»."""
    same_origin(request)
    user = require_access(request)
    with db.tx() as con:
        job = own_job(con, user, job_id)
        if job["status"] != "failed":
            raise HTTPException(409, "not_failed")
        src = job_dir(job_id)
        spec = json.loads(job["job_json"])
        if any(c.get("art") and not (src / c["art"]).exists() for c in spec["cups"]):
            raise HTTPException(409, "arts_missing")
        new_id = enqueue(con, user, config.tier_of(job["size"]), job["job_json"], "queued", f"повтор кадра {job_id}")
        dst = job_dir(new_id)
        dst.mkdir(parents=True, exist_ok=True)
        for art in src.glob("art-*"):
            shutil.copyfile(art, dst / art.name)
        return job_view(con, con.execute("SELECT * FROM jobs WHERE id = ?", (new_id,)).fetchone())


def remove(con, job) -> None:
    if job["status"] == "rendering":
        raise HTTPException(409, "rendering")
    if job["status"] in ("new", "queued"):
        tokens.refund_job(con, job, "отмена до рендера")
    con.execute("UPDATE jobs SET status = 'deleted' WHERE id = ?", (job["id"],))


@router.delete("/api/jobs/{job_id}")
def delete_job(job_id: int, request: Request):
    same_origin(request)
    user = require_access(request)
    with db.tx() as con:
        remove(con, own_job(con, user, job_id))
    shutil.rmtree(job_dir(job_id), ignore_errors=True)
    return {"ok": True}


class Ids(BaseModel):
    ids: list[int]


@router.post("/api/jobs/delete")
def delete_many(body: Ids, request: Request):
    """Удалить выбранные: считающиеся пропускаются, стоящие в очереди — с
    возвратом токенов."""
    same_origin(request)
    user = require_access(request)
    removed, skipped = [], 0
    with db.tx() as con:
        for job_id in list(dict.fromkeys(body.ids))[:200]:
            job = con.execute("SELECT * FROM jobs WHERE id = ? AND user_id = ? AND status != 'deleted'",
                              (job_id, user["id"])).fetchone()
            if job is None or job["status"] == "rendering":
                skipped += 1
                continue
            remove(con, job)
            removed.append(job_id)
    for job_id in removed:
        shutil.rmtree(job_dir(job_id), ignore_errors=True)
    return {"removed": len(removed), "skipped": skipped}


# ── исполнитель ──────────────────────────────────────────────────────────────

@router.post("/api/worker/claim")
def claim(request: Request, response: Response):
    worker = require_worker(request)
    with db.tx() as con:
        seen_worker(con, worker)
        job = con.execute("SELECT * FROM jobs WHERE status = 'queued' ORDER BY priority, id LIMIT 1").fetchone()
        if job is None:
            response.status_code = 204
            return None
        con.execute(
            "UPDATE jobs SET status = 'rendering', worker = ?, started_at = ?, heartbeat_at = ?, attempts = attempts + 1 "
            "WHERE id = ?",
            (worker, db.stamp(), db.stamp(), job["id"]),
        )
    spec = json.loads(job["job_json"])
    tier = config.tier_of(job["size"])
    return {"id": job["id"], "size": tier, "px": config.TIERS[tier]["px"], "job": spec,
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
    worker = require_worker(request)
    con = db.connect()
    seen_worker(con, worker)
    con.execute("UPDATE jobs SET heartbeat_at = ? WHERE id = ? AND status = 'rendering'", (db.stamp(), job_id))
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
    thumbs.thumb(clean, folder / "thumb.webp")
    with db.tx() as con:
        con.execute(
            "UPDATE jobs SET status = 'done', finished_at = ?, duration_s = ?, seen = 0 WHERE id = ? AND status = 'rendering'",
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
        fail_job(con, job, body.error[:500], "сбой рендера")
    return {"ok": True}


# ── уборка ───────────────────────────────────────────────────────────────────

def sweep() -> dict:
    """Зависшие у исполнителя — назад в очередь (после STALE_ATTEMPTS попыток —
    сбой с возвратом: такое задание роняет исполнителя); не дождавшиеся
    исполнителя QUEUE_TIMEOUT_HOURS — сбой с возвратом; старше 30 дней — файлы вон."""
    now = db.iso(db.now())
    stale = db.stamp(minutes=-config.STALE_MINUTES)
    with db.tx() as con:
        hung = con.execute("SELECT * FROM jobs WHERE status = 'rendering' AND heartbeat_at < ?", (stale,)).fetchall()
        requeued = 0
        for job in hung:
            if job["attempts"] >= config.STALE_ATTEMPTS:
                fail_job(con, job, "исполнитель не справился", "сбой рендера")
            else:
                con.execute("UPDATE jobs SET status = 'queued', worker = NULL WHERE id = ?", (job["id"],))
                requeued += 1
        waited = con.execute("SELECT * FROM jobs WHERE status = 'queued' AND created_at < ?",
                             (db.stamp(minutes=-60 * config.QUEUE_TIMEOUT_HOURS),)).fetchall()
        for job in waited:
            fail_job(con, job, "не дождался исполнителя", "не дождался исполнителя")
        old = con.execute("SELECT id FROM jobs WHERE expires_at < ? AND status NOT IN ('expired', 'deleted')", (now,)).fetchall()
        for row in old:
            con.execute("UPDATE jobs SET status = 'expired' WHERE id = ?", (row["id"],))
    for row in old:
        shutil.rmtree(job_dir(row["id"]), ignore_errors=True)
    return {"requeued": requeued, "failed": len(hung) - requeued + len(waited), "expired": len(old)}
