"""Токены: журнал операций, баланс по кошелькам, списание (§3–§5 концепции).

Кошельков два: paid — купленные и начисленные админом, не сгорают; welcome —
приветственные, 3 на 30 дней. Кадр оплачивается целиком из одного кошелька:
сначала из купленных (кадр без знака), если их не хватает — из приветственных
(кадр со знаком; чистый хранится, «Убрать знак» — 1 токен).
"""

from typing import Optional

from fastapi import HTTPException

from . import db


def balance(con, user) -> dict:
    rows = con.execute(
        "SELECT bucket, COALESCE(SUM(amount), 0) AS total FROM token_ops WHERE user_id = ? GROUP BY bucket",
        (user["id"],),
    ).fetchall()
    sums = {r["bucket"]: r["total"] for r in rows}
    expires = user["welcome_expires_at"]
    live = bool(expires) and db.parse(expires) > db.now()
    return {
        "paid": max(0, sums.get("paid", 0)),
        "welcome": max(0, sums.get("welcome", 0)) if live else 0,
        "welcomeExpiresAt": expires if live and sums.get("welcome", 0) > 0 else None,
    }


def add(con, user_id: int, bucket: str, amount: int, kind: str, *, job_id: Optional[int] = None,
        payment_id: Optional[int] = None, note: Optional[str] = None) -> None:
    con.execute(
        "INSERT INTO token_ops (user_id, bucket, amount, kind, job_id, payment_id, note, created_at) "
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        (user_id, bucket, amount, kind, job_id, payment_id, note, db.stamp()),
    )


def pick_bucket(con, user, cost: int) -> str:
    """Кошелёк под списание: купленные, если хватает, иначе приветственные."""
    b = balance(con, user)
    if b["paid"] >= cost:
        return "paid"
    if b["welcome"] >= cost:
        return "welcome"
    raise HTTPException(402, "not_enough_tokens")


def charge(con, user, cost: int, kind: str, *, job_id: Optional[int] = None, note: Optional[str] = None) -> str:
    bucket = pick_bucket(con, user, cost)
    add(con, user["id"], bucket, -cost, kind, job_id=job_id, note=note)
    return bucket
