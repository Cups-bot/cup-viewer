"""Вход по почте и паролю (владелец, 2026-09-28: сайт целиком — по логину и
паролю, после оплаты доступа). Пароль — scrypt (security.py).

Забытый пароль — код из 6 цифр на почту. Локально письма не уходят: код
печатается в консоль сервера (письма — этап Ж). Код подтверждает, что почта
своя, и задаёт новый пароль — им же пароль ставят аккаунты, заведённые ещё
входом по коду (до подписки).
"""

import logging
import re
import secrets

from fastapi import APIRouter, HTTPException, Request, Response
from pydantic import BaseModel

from . import config, db, tokens
from .security import SESSION_COOKIE, check_password, current_user, has_access, hash_password, same_origin, sha256

log = logging.getLogger("cupviewer")
router = APIRouter()
EMAIL_RE = re.compile(r"^[^@\s]{1,64}@[^@\s]{1,190}\.[a-zа-яё]{2,}$", re.IGNORECASE)


class Credentials(BaseModel):
    email: str
    password: str


class CodeRequest(BaseModel):
    email: str


class Reset(BaseModel):
    email: str
    code: str
    password: str


def normalize(email: str) -> str:
    email = (email or "").strip().lower()
    if not EMAIL_RE.match(email):
        raise HTTPException(400, "bad_email")
    if email.split("@", 1)[1] in config.DISPOSABLE_DOMAINS:
        raise HTTPException(400, "disposable_email")
    return email


def check_new_password(password: str) -> str:
    password = password or ""
    if len(password) < config.PASSWORD_MIN or len(password) > 200:
        raise HTTPException(400, "weak_password")
    return password


def me_payload(con, user) -> dict:
    active = con.execute(
        "SELECT COUNT(*) FROM jobs WHERE user_id = ? AND status IN ('queued', 'rendering')", (user["id"],)
    ).fetchone()[0]
    unseen = con.execute(
        "SELECT COUNT(*) FROM jobs WHERE user_id = ? AND status IN ('done', 'failed') AND seen = 0", (user["id"],)
    ).fetchone()[0]
    return {
        "email": user["email"],
        "isAdmin": bool(user["is_admin"]),
        "access": {"active": has_access(user), "until": user["access_until"]},
        "balance": tokens.balance(con, user),
        "activeJobs": active,
        "unseenJobs": unseen,
        "prices": config.PRICES,
        "tiers": config.TIERS,
    }


def start_session(con, user, request: Request, response: Response) -> dict:
    token = secrets.token_urlsafe(32)
    con.execute(
        "INSERT INTO sessions (token_hash, user_id, expires_at, created_at) VALUES (?, ?, ?, ?)",
        (sha256(token), user["id"], db.stamp(days=config.SESSION_DAYS), db.stamp()),
    )
    response.set_cookie(
        SESSION_COOKIE, token, max_age=config.SESSION_DAYS * 86400, httponly=True, samesite="lax",
        secure=request.url.scheme == "https", path="/",
    )
    return me_payload(con, user)


def sync_admin(con, user):
    """Админ — по почте (config.ADMIN_EMAILS): список мог поменяться."""
    if bool(user["is_admin"]) != (user["email"] in config.ADMIN_EMAILS):
        con.execute("UPDATE users SET is_admin = ? WHERE id = ?", (int(user["email"] in config.ADMIN_EMAILS), user["id"]))
        user = con.execute("SELECT * FROM users WHERE id = ?", (user["id"],)).fetchone()
    return user


@router.post("/api/auth/register")
def register(body: Credentials, request: Request, response: Response):
    same_origin(request)
    email = normalize(body.email)
    password = check_new_password(body.password)
    ip = request.client.host if request.client else ""
    with db.tx() as con:
        if con.execute("SELECT 1 FROM users WHERE email = ?", (email,)).fetchone():
            raise HTTPException(409, "email_taken")
        fresh = con.execute(
            "SELECT COUNT(*) FROM users WHERE created_ip = ? AND created_at > ?", (ip, db.stamp(days=-1))
        ).fetchone()[0]
        if fresh >= config.ACCOUNTS_PER_IP_DAY and email not in config.ADMIN_EMAILS:
            raise HTTPException(429, "too_many_accounts")
        # Токенов при регистрации нет: стартовые приходят с оплатой доступа.
        con.execute(
            "INSERT INTO users (email, is_admin, created_ip, created_at, password_hash) VALUES (?, ?, ?, ?, ?)",
            (email, int(email in config.ADMIN_EMAILS), ip, db.stamp(), hash_password(password)),
        )
        user = con.execute("SELECT * FROM users WHERE email = ?", (email,)).fetchone()
        return start_session(con, user, request, response)


@router.post("/api/auth/login")
def login(body: Credentials, request: Request, response: Response):
    same_origin(request)
    email = normalize(body.email)
    con = db.connect()
    fails = con.execute(
        "SELECT COUNT(*) FROM login_fails WHERE email = ? AND created_at > ?",
        (email, db.stamp(minutes=-config.LOGIN_FAILS_MINUTES)),
    ).fetchone()[0]
    if fails >= config.LOGIN_FAILS:
        raise HTTPException(429, "too_many_attempts")
    user = con.execute("SELECT * FROM users WHERE email = ?", (email,)).fetchone()
    if user is not None and not user["password_hash"]:
        # Аккаунт заведён входом по коду, до паролей: пароль задаётся сбросом.
        raise HTTPException(400, "password_not_set")
    if user is None or not check_password(body.password or "", user["password_hash"]):
        con.execute("INSERT INTO login_fails (email, created_at) VALUES (?, ?)", (email, db.stamp()))
        raise HTTPException(400, "bad_login")
    with db.tx() as con:
        con.execute("DELETE FROM login_fails WHERE email = ?", (email,))
        user = sync_admin(con, user)
        return start_session(con, user, request, response)


@router.post("/api/auth/request")
def request_code(body: CodeRequest, request: Request):
    """Код для сброса пароля. Ответ один и тот же, есть такая почта или нет."""
    same_origin(request)
    email = normalize(body.email)
    con = db.connect()
    recent = con.execute(
        "SELECT COUNT(*) FROM login_codes WHERE email = ? AND created_at > ?", (email, db.stamp(minutes=-60))
    ).fetchone()[0]
    if recent >= config.CODES_PER_HOUR:
        raise HTTPException(429, "too_many_codes")
    if con.execute("SELECT 1 FROM users WHERE email = ?", (email,)).fetchone():
        code = f"{secrets.randbelow(10 ** 6):06d}"
        con.execute(
            "INSERT INTO login_codes (email, code_hash, expires_at, created_at) VALUES (?, ?, ?, ?)",
            (email, sha256(f"{email}:{code}"), db.stamp(minutes=config.CODE_TTL_MIN), db.stamp()),
        )
        # Письма — на этапе Ж; пока код виден в консоли сервера.
        log.warning("КОД СБРОСА ПАРОЛЯ для %s: %s", email, code)
        print(f"\n=== Код сброса пароля для {email}: {code} ===\n", flush=True)
    # console — код в консоли, а не в письме (до этапа Ж): страница так и скажет.
    return {"sent": True, "ttlMinutes": config.CODE_TTL_MIN, "console": True}


@router.post("/api/auth/reset")
def reset(body: Reset, request: Request, response: Response):
    same_origin(request)
    email = normalize(body.email)
    password = check_new_password(body.password)
    code = re.sub(r"\D", "", body.code or "")
    # Неверная попытка засчитывается отдельной транзакцией и до ответа: ошибка,
    # брошенная внутри db.tx(), откатила бы и сам счётчик — код тогда можно
    # было бы подбирать без предела.
    with db.tx() as con:
        row = con.execute(
            "SELECT * FROM login_codes WHERE email = ? AND expires_at > ? ORDER BY id DESC LIMIT 1",
            (email, db.iso(db.now())),
        ).fetchone()
        expired = row is None or row["attempts"] >= config.CODE_ATTEMPTS
        wrong = not expired and row["code_hash"] != sha256(f"{email}:{code}")
        if wrong:
            con.execute("UPDATE login_codes SET attempts = attempts + 1 WHERE id = ?", (row["id"],))
    if expired:
        raise HTTPException(400, "code_expired")
    if wrong:
        raise HTTPException(400, "bad_code")
    with db.tx() as con:
        # Тот же код мог уйти в дело параллельным запросом — сверяем заново.
        if con.execute("SELECT 1 FROM login_codes WHERE id = ?", (row["id"],)).fetchone() is None:
            raise HTTPException(400, "code_expired")
        con.execute("DELETE FROM login_codes WHERE email = ?", (email,))
        con.execute("DELETE FROM login_fails WHERE email = ?", (email,))
        user = con.execute("SELECT * FROM users WHERE email = ?", (email,)).fetchone()
        if user is None:
            raise HTTPException(400, "code_expired")
        con.execute("UPDATE users SET password_hash = ? WHERE id = ?", (hash_password(password), user["id"]))
        # Новый пароль — старые сессии (на чужих устройствах) закрываются.
        con.execute("DELETE FROM sessions WHERE user_id = ?", (user["id"],))
        user = sync_admin(con, con.execute("SELECT * FROM users WHERE id = ?", (user["id"],)).fetchone())
        return start_session(con, user, request, response)


@router.post("/api/auth/logout")
def logout(request: Request, response: Response):
    same_origin(request)
    token = request.cookies.get(SESSION_COOKIE)
    if token:
        db.connect().execute("DELETE FROM sessions WHERE token_hash = ?", (sha256(token),))
    response.delete_cookie(SESSION_COOKIE, path="/")
    return {"ok": True}


@router.get("/api/me")
def me(request: Request):
    user = current_user(request)
    if user is None:
        raise HTTPException(401, "login_required")
    return me_payload(db.connect(), user)
