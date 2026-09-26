"""Вход по почте и одноразовому коду (§6 концепции). Без паролей.

Локально письма не уходят: код печатается в консоль сервера. После первого
входа — 3 приветственных токена на 30 дней, один раз на почту.
"""

import logging
import re
import secrets

from fastapi import APIRouter, HTTPException, Request, Response
from pydantic import BaseModel

from . import config, db, tokens
from .security import SESSION_COOKIE, current_user, same_origin, sha256

log = logging.getLogger("cupviewer")
router = APIRouter()
EMAIL_RE = re.compile(r"^[^@\s]{1,64}@[^@\s]{1,190}\.[a-zа-яё]{2,}$", re.IGNORECASE)


class CodeRequest(BaseModel):
    email: str


class CodeCheck(BaseModel):
    email: str
    code: str


def normalize(email: str) -> str:
    email = (email or "").strip().lower()
    if not EMAIL_RE.match(email):
        raise HTTPException(400, "bad_email")
    if email.split("@", 1)[1] in config.DISPOSABLE_DOMAINS:
        raise HTTPException(400, "disposable_email")
    return email


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
        "balance": tokens.balance(con, user),
        "activeJobs": active,
        "unseenJobs": unseen,
        "prices": config.PRICES,
        "unmarkPrice": config.UNMARK_PRICE,
    }


@router.post("/api/auth/request")
def request_code(body: CodeRequest, request: Request):
    same_origin(request)
    email = normalize(body.email)
    con = db.connect()
    recent = con.execute(
        "SELECT COUNT(*) FROM login_codes WHERE email = ? AND created_at > ?", (email, db.stamp(minutes=-60))
    ).fetchone()[0]
    if recent >= config.CODES_PER_HOUR:
        raise HTTPException(429, "too_many_codes")
    code = f"{secrets.randbelow(10 ** 6):06d}"
    con.execute(
        "INSERT INTO login_codes (email, code_hash, expires_at, created_at) VALUES (?, ?, ?, ?)",
        (email, sha256(f"{email}:{code}"), db.stamp(minutes=config.CODE_TTL_MIN), db.stamp()),
    )
    # Письма — на этапе Ж; пока код виден в консоли сервера.
    log.warning("КОД ВХОДА для %s: %s", email, code)
    print(f"\n=== Код входа для {email}: {code} ===\n", flush=True)
    return {"sent": True, "ttlMinutes": config.CODE_TTL_MIN}


@router.post("/api/auth/verify")
def verify_code(body: CodeCheck, request: Request, response: Response):
    same_origin(request)
    email = normalize(body.email)
    code = re.sub(r"\D", "", body.code or "")
    ip = request.client.host if request.client else ""
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
        user = con.execute("SELECT * FROM users WHERE email = ?", (email,)).fetchone()
        if user is None:
            fresh = con.execute(
                "SELECT COUNT(*) FROM users WHERE created_ip = ? AND created_at > ?", (ip, db.stamp(days=-1))
            ).fetchone()[0]
            if fresh >= config.ACCOUNTS_PER_IP_DAY and email not in config.ADMIN_EMAILS:
                raise HTTPException(429, "too_many_accounts")
            con.execute(
                "INSERT INTO users (email, is_admin, welcome_expires_at, created_ip, created_at) VALUES (?, ?, ?, ?, ?)",
                (email, int(email in config.ADMIN_EMAILS), db.stamp(days=config.WELCOME_DAYS), ip, db.stamp()),
            )
            user = con.execute("SELECT * FROM users WHERE email = ?", (email,)).fetchone()
            tokens.add(con, user["id"], "welcome", config.WELCOME_TOKENS, "welcome", note="приветственные")
        elif bool(user["is_admin"]) != (email in config.ADMIN_EMAILS):
            con.execute("UPDATE users SET is_admin = ? WHERE id = ?", (int(email in config.ADMIN_EMAILS), user["id"]))
            user = con.execute("SELECT * FROM users WHERE id = ?", (user["id"],)).fetchone()
        token = secrets.token_urlsafe(32)
        con.execute(
            "INSERT INTO sessions (token_hash, user_id, expires_at, created_at) VALUES (?, ?, ?, ?)",
            (sha256(token), user["id"], db.stamp(days=config.SESSION_DAYS), db.stamp()),
        )
        payload = me_payload(con, user)
    response.set_cookie(
        SESSION_COOKIE, token, max_age=config.SESSION_DAYS * 86400, httponly=True, samesite="lax",
        secure=request.url.scheme == "https", path="/",
    )
    return payload


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
