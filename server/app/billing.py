"""Оплата: подписка (доступ к сайту на срок тарифа + стартовые токены) и
пакеты токенов внутри подписки. Пока тестовая оплата — счёт и подтверждение
одной кнопкой; на этапе Ж подтверждение придёт уведомлением эквайринга.

Правила (владелец, 2026-09-28):
- без оплаченного срока сайт закрыт, даже если токены остались;
- стартовые токены тарифа живут до конца оплаченного срока; продление до
  конца срока их сохраняет, после — сгоревшие списываются, приходят новые;
- пакеты токенов покупаются только при действующей подписке и не сгорают.
"""

from datetime import timedelta

from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel

from . import config, db, tokens
from .security import require_access, require_user, same_origin

router = APIRouter()


def plan_view(row) -> dict:
    return {"id": row["id"], "label": row["label"], "days": row["days"], "priceRub": row["price_rub"],
            "starterTokens": row["starter_tokens"], "active": bool(row["active"])}


def extend_access(con, user_id: int, days: int, starter: int, note: str, payment_id=None) -> str:
    """Срок доступа +days от конца текущего (или от сейчас, если он истёк);
    стартовые токены — до нового конца. Возвращает новый конец срока."""
    user = con.execute("SELECT * FROM users WHERE id = ?", (user_id,)).fetchone()
    until = user["access_until"]
    base = max(db.parse(until), db.now()) if until else db.now()
    new_until = db.iso(base + timedelta(days=days))
    # Сгоревшие стартовые (срок прошёл) не должны ожить с новым сроком.
    left = con.execute(
        "SELECT COALESCE(SUM(amount), 0) FROM token_ops WHERE user_id = ? AND bucket = 'welcome'", (user_id,)
    ).fetchone()[0]
    expired = not user["welcome_expires_at"] or db.parse(user["welcome_expires_at"]) <= db.now()
    if left > 0 and expired:
        tokens.add(con, user_id, "welcome", -left, "expire", note="стартовые сгорели с концом срока")
    con.execute("UPDATE users SET access_until = ?, welcome_expires_at = ? WHERE id = ?", (new_until, new_until, user_id))
    if starter > 0:
        tokens.add(con, user_id, "welcome", starter, "starter", payment_id=payment_id, note=note)
    return new_until


@router.get("/api/plans")
def plans():
    rows = db.connect().execute("SELECT * FROM plans WHERE active = 1 ORDER BY sort, days").fetchall()
    return {"plans": [plan_view(r) for r in rows], "test": True}


class PlanCheckout(BaseModel):
    plan: str


@router.post("/api/subscription/checkout")
def subscription_checkout(body: PlanCheckout, request: Request):
    same_origin(request)
    user = require_user(request)
    con = db.connect()
    plan = con.execute("SELECT * FROM plans WHERE id = ? AND active = 1", (body.plan,)).fetchone()
    if plan is None:
        raise HTTPException(400, "bad_plan")
    cur = con.execute(
        "INSERT INTO payments (user_id, tokens, amount_rub, status, created_at, kind, plan_id, days) "
        "VALUES (?, ?, ?, 'pending', ?, 'plan', ?, ?)",
        (user["id"], plan["starter_tokens"], plan["price_rub"], db.stamp(), plan["id"], plan["days"]),
    )
    return {"paymentId": cur.lastrowid, "test": True}


class Checkout(BaseModel):
    tokens: int


@router.get("/api/payments/packs")
def packs(request: Request):
    require_access(request)
    return {"packs": [{"tokens": t, "priceRub": p} for t, p in config.PACKS.items()], "test": True}


@router.post("/api/payments/checkout")
def checkout(body: Checkout, request: Request):
    same_origin(request)
    user = require_access(request)
    if body.tokens not in config.PACKS:
        raise HTTPException(400, "bad_pack")
    cur = db.connect().execute(
        "INSERT INTO payments (user_id, tokens, amount_rub, status, created_at, kind) VALUES (?, ?, ?, 'pending', ?, 'tokens')",
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
        if pay["kind"] == "plan":
            until = extend_access(con, user["id"], pay["days"], pay["tokens"],
                                  f"стартовые · {pay['plan_id']} (тест)", payment_id=payment_id)
        else:
            tokens.add(con, user["id"], "paid", pay["tokens"], "purchase", payment_id=payment_id,
                       note=f"пакет {pay['tokens']} (тест)")
            until = user["access_until"]
        fresh = con.execute("SELECT * FROM users WHERE id = ?", (user["id"],)).fetchone()
        return {"ok": True, "accessUntil": until, "balance": tokens.balance(con, fresh)}
