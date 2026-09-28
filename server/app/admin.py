"""Админка (§2): пользователи и их доступ, токены, тарифы подписки, очередь,
платежи. Оплата — server/app/billing.py."""

import re

from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel

from . import billing, db, jobs, tokens
from .security import require_admin, same_origin

router = APIRouter()


# ── админка ──────────────────────────────────────────────────────────────────

@router.get("/api/admin/users")
def users(request: Request, q: str = ""):
    require_admin(request)
    con = db.connect()
    rows = con.execute(
        "SELECT * FROM users WHERE email LIKE ? ORDER BY id DESC LIMIT 300", (f"%{q.strip().lower()}%",)
    ).fetchall()
    out = []
    for u in rows:
        counts = con.execute(
            "SELECT COUNT(*) AS total, SUM(status = 'done') AS done FROM jobs WHERE user_id = ?", (u["id"],)
        ).fetchone()
        out.append({"id": u["id"], "email": u["email"], "isAdmin": bool(u["is_admin"]), "createdAt": u["created_at"],
                    "accessUntil": u["access_until"], "hasPassword": bool(u["password_hash"]),
                    "balance": tokens.balance(con, u), "jobs": counts["total"] or 0, "done": counts["done"] or 0})
    return {"users": out}


class Access(BaseModel):
    days: int
    starterTokens: int = 0


@router.post("/api/admin/users/{user_id}/access")
def access(user_id: int, body: Access, request: Request):
    """Продлить доступ вручную (оплата по счёту, подарок): +days к сроку и
    стартовые токены до его конца. Отрицательные дни — укоротить срок."""
    same_origin(request)
    admin = require_admin(request)
    if body.days == 0 or abs(body.days) > 3650 or not 0 <= body.starterTokens <= 1000:
        raise HTTPException(400, "bad_amount")
    with db.tx() as con:
        if con.execute("SELECT 1 FROM users WHERE id = ?", (user_id,)).fetchone() is None:
            raise HTTPException(404, "not_found")
        until = billing.extend_access(con, user_id, body.days, body.starterTokens, f"стартовые · админ {admin['email']}")
    return {"accessUntil": until}


# ── тарифы подписки ──────────────────────────────────────────────────────────

class Plan(BaseModel):
    label: str
    days: int
    priceRub: int
    starterTokens: int = 0
    active: bool = True


def check_plan(body: Plan) -> None:
    if not body.label.strip() or not 1 <= body.days <= 3650 or not 0 <= body.priceRub <= 10_000_000             or not 0 <= body.starterTokens <= 10000:
        raise HTTPException(400, "bad_plan")


@router.get("/api/admin/plans")
def admin_plans(request: Request):
    require_admin(request)
    rows = db.connect().execute("SELECT * FROM plans ORDER BY sort, days").fetchall()
    return {"plans": [billing.plan_view(r) for r in rows]}


@router.post("/api/admin/plans")
def create_plan(body: Plan, request: Request):
    same_origin(request)
    require_admin(request)
    check_plan(body)
    con = db.connect()
    base = re.sub(r"[^a-z0-9]+", "-", body.label.lower()).strip("-") or "plan"
    plan_id = f"{base}-{body.days}d"
    while con.execute("SELECT 1 FROM plans WHERE id = ?", (plan_id,)).fetchone():
        plan_id += "x"
    sort = con.execute("SELECT COALESCE(MAX(sort), 0) + 1 FROM plans").fetchone()[0]
    con.execute("INSERT INTO plans (id, label, days, price_rub, starter_tokens, active, sort) VALUES (?, ?, ?, ?, ?, ?, ?)",
                (plan_id, body.label.strip()[:60], body.days, body.priceRub, body.starterTokens, int(body.active), sort))
    return {"id": plan_id}


@router.put("/api/admin/plans/{plan_id}")
def update_plan(plan_id: str, body: Plan, request: Request):
    """Цена, срок и стартовые токены — для новых оплат; оплаченное не меняется."""
    same_origin(request)
    require_admin(request)
    check_plan(body)
    cur = db.connect().execute(
        "UPDATE plans SET label = ?, days = ?, price_rub = ?, starter_tokens = ?, active = ? WHERE id = ?",
        (body.label.strip()[:60], body.days, body.priceRub, body.starterTokens, int(body.active), plan_id),
    )
    if cur.rowcount == 0:
        raise HTTPException(404, "not_found")
    return {"ok": True}


class Grant(BaseModel):
    amount: int
    note: str = ""


@router.post("/api/admin/users/{user_id}/grant")
def grant(user_id: int, body: Grant, request: Request):
    """Начислить (+) или вернуть/снять (−) купленные токены — с записью в журнал."""
    same_origin(request)
    admin = require_admin(request)
    if body.amount == 0 or abs(body.amount) > 10000:
        raise HTTPException(400, "bad_amount")
    with db.tx() as con:
        user = con.execute("SELECT * FROM users WHERE id = ?", (user_id,)).fetchone()
        if user is None:
            raise HTTPException(404, "not_found")
        if body.amount < 0 and tokens.balance(con, user)["paid"] < -body.amount:
            raise HTTPException(409, "not_enough_tokens")
        tokens.add(con, user_id, "paid", body.amount, "grant" if body.amount > 0 else "revoke",
                   note=(body.note or "")[:200] + f" · {admin['email']}")
        return {"balance": tokens.balance(con, user)}


@router.get("/api/admin/users/{user_id}/ops")
def ops(user_id: int, request: Request):
    require_admin(request)
    rows = db.connect().execute(
        "SELECT * FROM token_ops WHERE user_id = ? ORDER BY id DESC LIMIT 200", (user_id,)
    ).fetchall()
    return {"ops": [dict(r) for r in rows]}


@router.get("/api/admin/queue")
def queue(request: Request):
    require_admin(request)
    con = db.connect()
    rows = con.execute(
        "SELECT j.*, u.email FROM jobs j JOIN users u ON u.id = j.user_id "
        "WHERE j.status IN ('queued', 'rendering', 'failed', 'done') ORDER BY j.id DESC LIMIT 100"
    ).fetchall()
    out = []
    for r in rows:
        view = jobs.job_view(con, r, admin=True)
        view.update({"email": r["email"], "worker": r["worker"], "durationS": r["duration_s"]})
        out.append(view)
    return {"jobs": out}


@router.post("/api/admin/jobs/{job_id}/cancel")
def cancel(job_id: int, request: Request):
    same_origin(request)
    require_admin(request)
    with db.tx() as con:
        job = con.execute("SELECT * FROM jobs WHERE id = ?", (job_id,)).fetchone()
        if job is None or job["status"] not in ("queued", "rendering"):
            raise HTTPException(409, "not_active")
        jobs.fail_job(con, job, "отменено администратором", "отмена админом")
    return {"ok": True}


@router.get("/api/admin/payments")
def payments(request: Request):
    require_admin(request)
    rows = db.connect().execute(
        "SELECT p.*, u.email FROM payments p JOIN users u ON u.id = p.user_id ORDER BY p.id DESC LIMIT 200"
    ).fetchall()
    return {"payments": [dict(r) for r in rows]}
