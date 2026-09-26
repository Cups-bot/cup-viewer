"""Локальный сервер превью: раздаёт корень проекта на 127.0.0.1.

Только стандартная библиотека (ТЗ §7). Типы файлов заданы явно: на Windows
модуль mimetypes берёт их из реестра, и .js там бывает text/plain — тогда
браузер не загрузит ES-модуль. На этапе 4 сюда же добавится API панели.

    python web/serve.py            # http://127.0.0.1:8765/web/preview/
    python web/serve.py --port 9000
"""

import argparse
import functools
import http.server
import os

PROJECT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

TYPES = {
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".mjs": "text/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".webp": "image/webp",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".svg": "image/svg+xml",
    ".hdr": "application/octet-stream",
    ".glb": "model/gltf-binary",
    ".wasm": "application/wasm",
}


class Handler(http.server.SimpleHTTPRequestHandler):
    def guess_type(self, path):
        return TYPES.get(os.path.splitext(path)[1].lower()) or super().guess_type(path)

    def end_headers(self):
        # превью и проверки должны видеть свежие выгрузки сразу
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def do_POST(self):
        """POST /api/snapshot?name=<имя> — PNG превью в out/preview_snapshots/.

        Для сверки «превью ↔ рендер» глазами: снимок кадра превью ложится
        рядом с кадрами рендера. Имя — только буквы, цифры, _ и -.
        """
        from urllib.parse import parse_qs, urlparse
        url = urlparse(self.path)
        name = (parse_qs(url.query).get("name") or [""])[0]
        if url.path != "/api/snapshot" or not name or not all(c.isalnum() or c in "_-" for c in name):
            self.send_error(400, "нужен /api/snapshot?name=<буквы, цифры, _ ->")
            return
        size = int(self.headers.get("Content-Length") or 0)
        if not 0 < size <= 20 * 1024 * 1024:
            self.send_error(413)
            return
        data = self.rfile.read(size)
        if not data.startswith(b"\x89PNG"):
            self.send_error(415, "ждали PNG")
            return
        folder = os.path.join(PROJECT, "out", "preview_snapshots")
        os.makedirs(folder, exist_ok=True)
        with open(os.path.join(folder, name + ".png"), "wb") as fh:
            fh.write(data)
        self.send_response(204)
        self.end_headers()

    def log_message(self, fmt, *args):
        if args and str(args[1]).startswith(("4", "5")):
            super().log_message(fmt, *args)


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--port", type=int, default=8765)
    args = ap.parse_args()
    handler = functools.partial(Handler, directory=PROJECT)
    server = http.server.ThreadingHTTPServer(("127.0.0.1", args.port), handler)
    print(f"render/: http://127.0.0.1:{args.port}/web/preview/  (корень {PROJECT})", flush=True)
    server.serve_forever()


if __name__ == "__main__":
    main()
