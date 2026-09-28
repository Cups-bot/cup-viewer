"""Токены: журнал операций, баланс по кошелькам, списание (§3–§5 концепции).

Кошельков два: paid — купленные и начисленные админом, не сгорают; welcome —
стартовые токены подписки, живут до конца оплаченного срока (billing.py).
Кадр оплачивается сначала стартовыми — они сгорают с концом срока, купленные
нет; не хватает — купленными; не хватает ни тех, ни других по отдельности —
вместе (bucket mixed): в шапке сумма, и кадр по сумме должен запускаться.
Кадры все без знака (владелец, 2026-09-28).
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


def plan(con, user, cost: int) -> dict:
    """Чем платить за кадр: {bucket, paid, welcome}. bucket — paid | welcome | mixed."""
    b = balance(con, user)
    if b["welcome"] >= cost:
        return {"bucket": "welcome", "paid": 0, "welcome": cost}
    if b["paid"] >= cost:
        return {"bucket": "paid", "paid": cost, "welcome": 0}
    if b["paid"] + b["welcome"] >= cost:
        return {"bucket": "mixed", "paid": cost - b["welcome"], "welcome": b["welcome"]}
    raise HTTPException(402, "not_enough_tokens")


def charge_job(con, user_id: int, parts: dict, *, job_id: int, note: str) -> None:
    for bucket in ("paid", "welcome"):
        if parts[bucket]:
            add(con, user_id, bucket, -parts[bucket], "render", job_id=job_id, note=note)


def refund_job(con, job, note: str) -> None:
    """Возврат ровно того, что списали за задание, в те же кошельки."""
    rows = con.execute(
        "SELECT bucket, SUM(amount) AS total FROM token_ops WHERE job_id = ? AND kind = 'render' GROUP BY bucket",
        (job["id"],),
    ).fetchall()
    for row in rows:
        if row["total"] < 0:
            add(con, job["user_id"], row["bucket"], -row["total"], "refund", job_id=job["id"], note=note)
