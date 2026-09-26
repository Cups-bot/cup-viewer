"""Оплата (заглушка до эквайринга, §5) и админка (§2): пользователи, токены,
очередь, платежи."""

from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel

from . import config, db, jobs, tokens
from .security import require_admin, require_user, same_origin

router = APIRouter()


# ── пакеты токенов: пока тестовая оплата ─────────────────────────────────────

class Checkout(BaseModel):
    tokens: int


@router.get("/api/payments/packs")
def packs():
    return {"packs": [{"tokens": t, "priceRub": p} for t, p in config.PACKS.items()], "test": True}


@router.post("/api/payments/checkout")
def checkout(body: Checkout, request: Request):
    same_origin(request)
    user = require_user(request)
    if body.tokens not in config.PACKS:
        raise HTTPException(400, "bad_pack")
    cur = db.connect().execute(
        "INSERT INTO payments (user_id, tokens, amount_rub, status, created_at) VALUES (?, ?, ?, 'pending', ?)",
        (user["id"], body.tokens, config.PACKS[body.tokens], db.stamp()),
    )
    return {"paymentId": cur.lastrowid, "test": True}


@router.post("/api/payments/{payment_id}/confirm")
def confirm(payment_id: int, request: Request):
    """Тестовая оплата: на этапе Ж её заменит уведомление платёжного сервиса."""
    same_origin(request)
    user = require_user(request)
    with db.tx() as con:
        pay = con.execute("SELECT * FROM payments WHERE id = ? AND user_id = ?", (payment_id, user["id"])).fetchone()
        if pay is None or pay["status"] != "pending":
            raise HTTPException(409, "not_pending")
        con.execute("UPDATE payments SET status = 'paid', paid_at = ? WHERE id = ?", (db.stamp(), payment_id))
        tokens.add(con, user["id"], "paid", pay["tokens"], "purchase", payment_id=payment_id,
                   note=f"пакет {pay['tokens']} (тест)")
        return {"ok": True, "balance": tokens.balance(con, user)}


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
                    "balance": tokens.balance(con, u), "jobs": counts["total"] or 0, "done": counts["done"] or 0})
    return {"users": out}


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
