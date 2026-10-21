"""Общие проверки запросов: сессия, доступ по подписке, пароли, свой
источник, ключ исполнителя."""

import base64
import hashlib
import hmac
import secrets

from fastapi import HTTPException, Request

from . import config, db

SESSION_COOKIE = "cv_session"


def sha256(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


# Пароль — scrypt из стандартной библиотеки (без новых зависимостей):
# «scrypt$N$r$p$соль$хеш», соль своя у каждого пароля.
SCRYPT = {"n": 2 ** 14, "r": 8, "p": 1}


def hash_password(password: str) -> str:
    salt = secrets.token_bytes(16)
    digest = hashlib.scrypt(password.encode("utf-8"), salt=salt, dklen=32, **SCRYPT)
    b64 = lambda raw: base64.b64encode(raw).decode("ascii")
    return f"scrypt${SCRYPT['n']}${SCRYPT['r']}${SCRYPT['p']}${b64(salt)}${b64(digest)}"


def check_password(password: str, stored) -> bool:
    try:
        _, n, r, p, salt, digest = (stored or "").split("$")
        got = hashlib.scrypt(password.encode("utf-8"), salt=base64.b64decode(salt), dklen=32,
                             n=int(n), r=int(r), p=int(p))
    except (ValueError, TypeError):
        return False
    return hmac.compare_digest(got, base64.b64decode(digest))


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


def has_access(user) -> bool:
    """Доступ к сайту — оплаченный срок не истёк (админу — всегда)."""
    if user is None:
        return False
    if user["is_admin"]:
        return True
    until = user["access_until"]
    return bool(until) and db.parse(until) > db.now()


def local_user():
    """Лёгкая версия: все запросы — от одного локального пользователя."""
    con = db.connect()
    con.execute("INSERT OR IGNORE INTO users (email, is_admin, created_at, access_until) VALUES (?, 0, ?, ?)",
                (config.LITE_EMAIL, db.stamp(), "9999-12-31T00:00:00+00:00"))
    return con.execute("SELECT * FROM users WHERE email = ?", (config.LITE_EMAIL,)).fetchone()


def require_access(request: Request):
    """Пользователь с действующей подпиской: иначе 401 (не вошёл) или 402."""
    if config.LITE:
        return local_user()
    user = require_user(request)
    if not has_access(user):
        raise HTTPException(402, "subscription_required")
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
