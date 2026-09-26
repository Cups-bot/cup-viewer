"""Сервер CupViewer v2: API (вход, токены, задания, админка)
и сам сайт — одним процессом, как будет на хостинге (этап Ж).

    server/.venv/Scripts/python -m server          (из корня репозитория)

Сайт отдаётся только из своих папок (config.PUBLIC_*) с теми же заголовками
безопасности и кэша, что у dev-сервера (scripts/serve.mjs, docs/security.md).
"""

import asyncio
import logging
import mimetypes
import re
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import FileResponse, JSONResponse

from . import admin, auth, config, db, jobs
from .security import worker_key

log = logging.getLogger("cupviewer")

TYPES = {
    ".js": "text/javascript; charset=utf-8", ".mjs": "text/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8", ".json": "application/json; charset=utf-8",
    ".html": "text/html; charset=utf-8", ".svg": "image/svg+xml", ".webp": "image/webp",
    ".glb": "model/gltf-binary", ".hdr": "image/vnd.radiance", ".wasm": "application/wasm",
    ".bcmap": "application/octet-stream", ".pfb": "application/octet-stream", ".icc": "application/vnd.iccprofile",
}
SECURITY_HEADERS = {
    "Content-Security-Policy": "; ".join([
        "default-src 'self'", "script-src 'self' 'wasm-unsafe-eval'", "style-src 'self'",
        "img-src 'self' data: blob:", "connect-src 'self' blob:", "worker-src 'self' blob:", "font-src 'self'",
        "object-src 'none'", "base-uri 'none'", "form-action 'self'", "frame-ancestors 'none'",
    ]),
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "same-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=(), interest-cohort=()",
}
CHUNK = re.compile(r"^dist/chunks/.+-[A-Z0-9]{8}\.js$")


async def sweeper() -> None:
    while True:
        try:
            result = await asyncio.to_thread(jobs.sweep)
            if any(result.values()):
                log.warning("уборка: %s", result)
        except Exception:  # уборка не должна ронять сервер
            log.exception("уборка не удалась")
        await asyncio.sleep(600)


@asynccontextmanager
async def lifespan(app: FastAPI):
    db.init()
    worker_key()
    task = asyncio.create_task(sweeper())
    print(f"CupViewer: http://{config.HOST}:{config.PORT}  ·  данные: {config.DATA}", flush=True)
    yield
    task.cancel()


app = FastAPI(title="CupViewer", lifespan=lifespan, docs_url=None, redoc_url=None, openapi_url=None)
for module in (auth, jobs, admin):
    app.include_router(module.router)


@app.middleware("http")
async def headers(request: Request, call_next):
    response = await call_next(request)
    for key, value in SECURITY_HEADERS.items():
        response.headers.setdefault(key, value)
    if request.url.path.startswith("/api/"):
        response.headers.setdefault("Cache-Control", "no-store")
    return response


@app.exception_handler(HTTPException)
async def http_error(request: Request, exc: HTTPException):
    return JSONResponse({"error": exc.detail}, status_code=exc.status_code)


@app.api_route("/api/{rest:path}", methods=["GET", "POST", "PUT", "DELETE"])
def api_missing(rest: str):
    raise HTTPException(404, "not_found")


@app.get("/{path:path}")
def site(path: str):
    relative = path or "index.html"
    parts = relative.split("/")
    # Только прямые пути: «..» (и %2e%2e — Starlette раскодирует его раньше),
    # «.», скрытые файлы, обратный слэш и диск не пропускаем — иначе
    # js/../server/data/… выходит из разрешённой папки к базе и ключам.
    if "\\" in relative or ":" in relative or any(not p or p.startswith(".") for p in parts):
        raise HTTPException(404, "not_found")
    if relative in config.PUBLIC_FILES:
        root = config.REPO
    elif len(parts) > 1 and parts[0] in config.PUBLIC_DIRS:
        root = (config.REPO / parts[0]).resolve()
    else:
        raise HTTPException(404, "not_found")
    target = (config.REPO / relative).resolve()
    if root not in target.parents or not target.is_file():
        raise HTTPException(404, "not_found")
    suffix = target.suffix.lower()
    media = TYPES.get(suffix) or mimetypes.guess_type(target.name)[0] or "application/octet-stream"
    if CHUNK.match(relative):
        cache = "public, max-age=31536000, immutable"
    elif suffix == ".html":
        cache = "no-store"
    else:
        cache = "no-cache"
    return FileResponse(target, media_type=media, headers={"Cache-Control": cache})
