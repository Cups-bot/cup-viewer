"""Ссылки клиенту — контракт scripts/snapshotApi.mjs, перенесённый как есть
(§8 концепции): страницы не меняются, меняется только сервер.

  POST /api/snapshot-assets     тело — PNG/JPEG → { assetId }          (после входа)
  POST /api/publish-snapshot    { state, textureAsset, unwrapAsset,
                                  texture2Asset?, unwrap2Asset? } → { token }   (после входа)
  GET  /api/get-snapshot?v=…    → { schemaVersion, state, design, design2 }
  GET  /api/asset?a=…&e=…&s=…   подписанная ссылка на растр, TTL 1 ч

Токен — 128 случайных бит, в базе только его SHA-256. Ссылка и растры живут
30 дней (§10). Исходник макета сюда не приходит — только производные растры.
"""

import base64
import hashlib
import hmac
import json
import re
import secrets
import time

from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import FileResponse, JSONResponse

from . import config, db
from .security import require_user, same_origin, sha256

router = APIRouter()
TOKEN_RE = re.compile(r"^[A-Za-z0-9_-]{22,64}$")
ASSET_RE = re.compile(r"^[A-Za-z0-9_-]{22}$")
STATE_FIELDS = ["modelId", "materialId", "backgroundId", "sceneId", "brandId", "title"]
MAX_ASSET_BYTES = 64 * 1024 * 1024
TTL_SECONDS = 3600
# Ключ подписи — в памяти: после перезапуска старые адреса растров истекают,
# а сам snapshot по токену открывается как прежде.
SECRET = secrets.token_bytes(32)


def b64(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).decode("ascii").rstrip("=")


def sign(asset_id: str, expires: int) -> str:
    return b64(hmac.new(SECRET, f"{asset_id}.{expires}".encode(), hashlib.sha256).digest())


def signed_url(asset_id: str) -> str:
    expires = int(time.time()) + TTL_SECONDS
    return f"/api/asset?a={asset_id}&e={expires}&s={sign(asset_id, expires)}"


def asset_path(asset_id):
    if not ASSET_RE.match(asset_id or ""):
        return None
    row = db.connect().execute("SELECT ext FROM assets WHERE id = ? AND expires_at > ?", (asset_id, db.iso(db.now()))).fetchone()
    if row is None:
        return None
    path = config.FILES / "assets" / f"{asset_id}.{row['ext']}"
    return path if path.exists() else None


@router.post("/api/snapshot-assets")
async def upload_asset(request: Request):
    same_origin(request)
    user = require_user(request)
    body = await request.body()
    if len(body) > MAX_ASSET_BYTES:
        raise HTTPException(413, "too_large")
    if body.startswith(b"\x89PNG\r\n\x1a\n"):
        ext = "png"
    elif body[:3] == b"\xff\xd8\xff":
        ext = "jpg"
    else:
        raise HTTPException(415, "unsupported_media")
    asset_id = b64(secrets.token_bytes(16))
    folder = config.FILES / "assets"
    folder.mkdir(parents=True, exist_ok=True)
    (folder / f"{asset_id}.{ext}").write_bytes(body)
    db.connect().execute(
        "INSERT INTO assets (id, user_id, ext, expires_at, created_at) VALUES (?, ?, ?, ?, ?)",
        (asset_id, user["id"], ext, db.stamp(days=config.RETENTION_DAYS), db.stamp()),
    )
    return JSONResponse({"assetId": asset_id}, status_code=201)


def _photo(photo):
    """Раскладка «Фотореала»: форму проверяет и страница клиента (viewerState)."""
    if photo is None:
        return None
    short = lambda v: v is None or (isinstance(v, str) and len(v) <= 40)
    second = photo.get("second") if isinstance(photo, dict) else None
    angles = photo.get("angles") if isinstance(photo, dict) else None
    ok = (isinstance(photo, dict) and short(photo.get("preset")) and short(photo.get("frame"))
          and (second is None or (isinstance(second, dict) and short(second.get("modelId")) and short(second.get("kind"))))
          and (angles is None or (isinstance(angles, list) and len(angles) <= 2
                                  and all(isinstance(a, (int, float)) for a in angles))))
    if not ok:
        raise HTTPException(400, "bad_photo")
    return {"preset": photo.get("preset"), "frame": photo.get("frame"),
            "second": {"modelId": second["modelId"], "kind": second.get("kind")} if second else None,
            "angles": angles}


@router.post("/api/publish-snapshot")
async def publish(request: Request):
    same_origin(request)
    user = require_user(request)
    raw = await request.body()
    if len(raw) > 64 * 1024:
        raise HTTPException(413, "too_large")
    data = json.loads(raw.decode("utf-8"))
    state = {}
    for key in STATE_FIELDS:
        value = (data.get("state") or {}).get(key)
        if value is None:
            continue
        if not isinstance(value, str) or len(value) > 200:
            raise HTTPException(400, f"bad_{key}")
        state[key] = value
    if not state.get("modelId"):
        raise HTTPException(400, "bad_modelId")
    photo = _photo((data.get("state") or {}).get("photo"))
    if photo:
        state["photo"] = photo
    pairs = [("textureAsset", "unwrapAsset"), ("texture2Asset", "unwrap2Asset")]
    stored = {}
    for tex, unw in pairs:
        if data.get(tex) or data.get(unw):
            if not asset_path(data.get(tex)) or not asset_path(data.get(unw)):
                raise HTTPException(409, "assets_missing")
            stored[tex], stored[unw] = data[tex], data[unw]
    token = b64(secrets.token_bytes(16))
    db.connect().execute(
        "INSERT INTO snapshots (token_hash, user_id, state_json, texture_asset, unwrap_asset, texture2_asset, "
        "unwrap2_asset, expires_at, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        (sha256(token), user["id"], json.dumps(state, ensure_ascii=False), stored.get("textureAsset"),
         stored.get("unwrapAsset"), stored.get("texture2Asset"), stored.get("unwrap2Asset"),
         db.stamp(days=config.RETENTION_DAYS), db.stamp()),
    )
    return JSONResponse({"token": token}, status_code=201)


@router.get("/api/get-snapshot")
def get_snapshot(v: str = ""):
    if not TOKEN_RE.match(v):
        raise HTTPException(404, "not_found")
    row = db.connect().execute(
        "SELECT * FROM snapshots WHERE token_hash = ? AND expires_at > ?", (sha256(v), db.iso(db.now()))
    ).fetchone()
    if row is None:
        raise HTTPException(404, "not_found")
    pair = lambda t, u: {"textureUrl": signed_url(row[t]), "unwrapUrl": signed_url(row[u])} if row[t] else None
    return {"schemaVersion": 1, "state": json.loads(row["state_json"]),
            "design": pair("texture_asset", "unwrap_asset"), "design2": pair("texture2_asset", "unwrap2_asset")}


@router.get("/api/asset")
def asset(a: str = "", e: int = 0, s: str = ""):
    valid = e > time.time() and hmac.compare_digest(s.encode(), sign(a, e).encode())
    path = asset_path(a) if valid else None
    if path is None:
        raise HTTPException(403, "expired_or_invalid")
    return FileResponse(path, headers={"Cache-Control": "private, max-age=3600"})
