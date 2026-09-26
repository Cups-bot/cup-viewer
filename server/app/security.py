"""Общие проверки запросов: сессия, свой источник, ключ исполнителя."""

import hashlib
import hmac
import secrets

from fastapi import HTTPException, Request

from . import config, db

SESSION_COOKIE = "cv_session"


def sha256(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def same_origin(request: Request) -> None:
    """Запись — только со своей страницы (как у dev-сервера ссылок)."""
    origin = request.headers.get("origin")
    if origin and origin != f"{request.url.scheme}://{request.headers.get('host')}":
        raise HTTPException(403, "forbidden")


def current_user(request: Request):
    token = request.cookies.get(SESSION_COOKIE)
    if not token:
        return None
    row = db.connect().execute(
        "SELECT u.* FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.token_hash = ? AND s.expires_at > ?",
        (sha256(token), db.iso(db.now())),
    ).fetchone()
    return row


def require_user(request: Request):
    user = current_user(request)
    if user is None:
        raise HTTPException(401, "login_required")
    return user


def require_admin(request: Request):
    user = require_user(request)
    if not user["is_admin"]:
        raise HTTPException(403, "admin_only")
    return user


def worker_key() -> str:
    """Ключ исполнителя: общий секрет сервера и исполнителя (локально — файл)."""
    path = config.WORKER_KEY_FILE
    if not path.exists():
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(secrets.token_urlsafe(32), encoding="utf-8")
    return path.read_text(encoding="utf-8").strip()


def require_worker(request: Request) -> str:
    key = request.headers.get("x-worker-key", "")
    if not hmac.compare_digest(key, worker_key()):
        raise HTTPException(403, "worker_only")
    return request.headers.get("x-worker-name", "worker")[:60]
