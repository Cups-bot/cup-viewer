"""Панель управления съёмкой: локальный сервер вместо BAT-файлов.

Страница только собирает команду и показывает, что происходит. Считает всё тот
же `mockup/run.py` — никакой второй логики сборки здесь нет и быть не должно,
иначе панель и командная строка начнут расходиться.

Ничего, кроме стандартной библиотеки, не требуется: ни pip, ни интернета.
Сервер слушает только 127.0.0.1, снаружи он недоступен.

    py -3.11 mockup/web/server.py
    py -3.11 mockup/web/server.py --port 8765 --no-browser
"""

import argparse
import glob
import http.server
import json
import os
import queue
import shutil
import socketserver
import subprocess
import sys
import threading
import time
import urllib.parse
import webbrowser

WEB = os.path.dirname(os.path.abspath(__file__))
MOCKUP = os.path.dirname(WEB)
ROOT = os.path.dirname(MOCKUP)
PARAMS = os.path.join(MOCKUP, "params", "shots.json")
OUT = os.path.join(MOCKUP, "out")
ART = os.path.join(MOCKUP, "art")
RUNNER = os.path.join(MOCKUP, "run.py")

# Черновики уходят в свою папку: в mockup/out лежат только готовые кадры, иначе
# обзорная страница смешивает в одну ленту финалы и пробы на 64 сэмплах.
DRAFTS = os.path.join(OUT, "черновики")
QUALITY = {
    "draft": {"title": "черновик", "samples": 64, "resolution": 700, "folder": DRAFTS},
    "work": {"title": "рабочее", "samples": 200, "resolution": 1200, "folder": None},
    "final": {"title": "финал", "samples": None, "resolution": None, "folder": None},
}


def find_blender():
    """Тот же поиск, что и в BAT-файлах: самая новая установка в Program Files."""
    found = []
    for base in (r"C:\Program Files\Blender Foundation",
                 r"C:\Program Files (x86)\Blender Foundation"):
        for path in sorted(glob.glob(os.path.join(base, "Blender*"))):
            exe = os.path.join(path, "blender.exe")
            if os.path.isfile(exe):
                found.append(exe)
    if found:
        return found[-1]
    return shutil.which("blender")


def load_config():
    with open(PARAMS, "r", encoding="utf-8") as fh:
        return json.load(fh)


def read_sets():
    """Фоны читаются из тех же файлов, что видит раннер."""
    sets = []
    directory = os.path.join(MOCKUP, "sets")
    for name in sorted(os.listdir(directory)):
        if not name.endswith(".json"):
            continue
        with open(os.path.join(directory, name), "r", encoding="utf-8") as fh:
            data = json.load(fh)
        source = data.get("source", "blend")
        sets.append({
            "name": name[:-5],
            "title": data.get("title", name[:-5]),
            "source": source,
            "kind": {"blend": "готовая сцена", "greybox": "фотобокс",
                     "authored": "авторская сцена"}.get(source, source),
            "samples": data.get("samples"),
            "resolution": data.get("resolution"),
        })
    return sets


def read_gallery():
    """Готовые кадры и, отдельной пометкой, черновики."""
    items = []
    sources = [(OUT, "out", False), (DRAFTS, "draft", True)]
    for folder, route, draft in sources:
      for png in sorted(glob.glob(os.path.join(folder, "*.png"))):
        stem = os.path.splitext(os.path.basename(png))[0]
        report = os.path.join(folder, stem + ".json")
        info = {}
        if os.path.isfile(report):
            try:
                with open(report, "r", encoding="utf-8") as fh:
                    info = json.load(fh)
            except (OSError, json.JSONDecodeError):
                info = {}
        printed = info.get("print") or {}
        fit = printed.get("fit") or {}
        items.append({
            "stem": stem,
            "draft": draft,
            "url": "/%s/%s" % (route, urllib.parse.quote(os.path.basename(png))),
            "file": os.path.basename(png),
            "bytes": os.path.getsize(png),
            "mtime": os.path.getmtime(png),
            "set": info.get("shot"),
            "cup": info.get("cup"),
            "camera": info.get("camera"),
            "samples": info.get("samples"),
            "resolution": info.get("resolution"),
            "scale": info.get("scale"),
            "print_mode": printed.get("mode"),
            "field_mm": fit.get("field_mm"),
            "on_wall_mm": fit.get("on_wall_mm"),
            "distortion_pct": fit.get("distortion_pct"),
            "warnings": info.get("warnings") or [],
        })
    items.sort(key=lambda i: i["mtime"], reverse=True)
    return items


class Job:
    """Одна очередь заданий: видеокарта в машине одна, параллелить нечего."""

    def __init__(self):
        self.lines = []
        self.lock = threading.Lock()
        self.queue = queue.Queue()
        self.process = None
        self.current = None
        self.pending = []
        self.done = 0
        self.total = 0
        self.stopping = False
        threading.Thread(target=self._worker, daemon=True).start()

    def say(self, text):
        with self.lock:
            self.lines.append(text)
            if len(self.lines) > 4000:
                del self.lines[:1000]

    def submit(self, tasks):
        with self.lock:
            self.pending.extend(t["label"] for t in tasks)
            self.total += len(tasks)
        for task in tasks:
            self.queue.put(task)

    def stop(self):
        self.stopping = True
        while not self.queue.empty():
            try:
                self.queue.get_nowait()
                self.queue.task_done()
            except queue.Empty:
                break
        with self.lock:
            self.pending = []
        process = self.process
        if process and process.poll() is None:
            process.terminate()
            self.say("### остановлено пользователем")

    def state(self):
        with self.lock:
            return {
                "running": self.current is not None,
                "current": self.current,
                "pending": list(self.pending),
                "done": self.done,
                "total": self.total,
                "lines": len(self.lines),
            }

    def tail(self, since):
        with self.lock:
            since = max(0, min(since, len(self.lines)))
            return since + len(self.lines[since:]), self.lines[since:]

    def _worker(self):
        while True:
            task = self.queue.get()
            with self.lock:
                self.current = task["label"]
                if task["label"] in self.pending:
                    self.pending.remove(task["label"])
            self._run(task)
            with self.lock:
                self.current = None
                self.done += 1
                if not self.pending and self.queue.empty():
                    self.done = self.total = 0
                    self.stopping = False
            self.queue.task_done()

    def _run(self, task):
        blender = find_blender()
        if not blender:
            self.say("### Blender не найден в Program Files")
            return
        command = [blender, "-b", "--factory-startup", "--python-exit-code", "1",
                   "-P", RUNNER, "--"] + task["args"]
        self.say("### " + task["label"])
        started = time.time()
        env = dict(os.environ, PYTHONIOENCODING="utf-8")
        try:
            self.process = subprocess.Popen(
                command, cwd=ROOT, env=env, stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT, bufsize=1, text=True,
                encoding="utf-8", errors="replace")
        except OSError as exc:
            self.say("### не удалось запустить Blender: %s" % exc)
            return
        for line in self.process.stdout:
            line = line.rstrip()
            if line:
                self.say(line)
        code = self.process.wait()
        self.process = None
        if code == 0:
            self.say("### готово за %.0f с" % (time.time() - started))
            if not task.get("draft"):
                refresh_overview(self.say)
        elif self.stopping:
            self.say("### прервано")
        else:
            self.say("### ошибка, код %d" % code)


def refresh_overview(say):
    """Обзорная страница пересобирается тем же скриптом, что и из BAT."""
    tool = os.path.join(MOCKUP, "tools", "make_contact_sheet.py")
    if not os.path.isfile(tool):
        return
    try:
        subprocess.run([sys.executable, tool], cwd=ROOT, timeout=60,
                       stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    except (OSError, subprocess.SubprocessError) as exc:
        say("### обзорная страница не пересобралась: %s" % exc)


JOB = Job()


def build_tasks(payload):
    """Собрать аргументы командной строки. Проверки — здесь, а не в браузере."""
    cfg = load_config()
    known = [s["name"] for s in read_sets()]
    cups = [k for k in cfg["cups"] if not k.startswith("_")]

    names = payload.get("sets") or []
    names = [n for n in names if n in known]
    if not names:
        raise ValueError("не выбран ни один фон")
    cup = str(payload.get("cup") or cfg.get("cup_key", "500"))
    if cup not in cups:
        raise ValueError("объём %s не из реестра" % cup)
    mode = payload.get("print") or "none"
    if mode not in ("none", "rect", "cone"):
        raise ValueError("режим печати %s неизвестен" % mode)
    quality = QUALITY.get(payload.get("quality") or "final")
    if quality is None:
        raise ValueError("качество не распознано")

    art = (payload.get("art") or "").strip()
    if art:
        art = os.path.normpath(os.path.join(ROOT, art)) if not os.path.isabs(art) else art
        if not os.path.isfile(art):
            raise ValueError("макет не найден: %s" % art)

    tasks = []
    for name in names:
        args = ["--set", name, "--cup", cup, "--print", mode, "--render"]
        if quality["samples"]:
            args += ["--samples", str(quality["samples"])]
        if quality["resolution"]:
            args += ["--resolution", str(quality["resolution"])]
        if quality["folder"]:
            args += ["--output-dir", quality["folder"]]
        if art and mode != "none":
            args += ["--art", art]
        if payload.get("no_save"):
            args.append("--no-save")
        tasks.append({"label": "%s, %s мл, печать %s, %s"
                                % (name, cup, mode, quality["title"]),
                      "draft": bool(quality["folder"]),
                      "args": args})
    return tasks


class Handler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass

    def _send(self, code, body, mime="application/json; charset=utf-8"):
        if isinstance(body, (dict, list)):
            body = json.dumps(body, ensure_ascii=False).encode("utf-8")
        elif isinstance(body, str):
            body = body.encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", mime)
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def _file(self, folder, name):
        safe = os.path.basename(urllib.parse.unquote(name))
        path = os.path.join(folder, safe)
        if not os.path.isfile(path):
            return self._send(404, {"error": "нет файла"})
        mime = {".png": "image/png", ".jpg": "image/jpeg",
                ".html": "text/html; charset=utf-8"}.get(
                    os.path.splitext(safe)[1].lower(), "application/octet-stream")
        with open(path, "rb") as fh:
            self._send(200, fh.read(), mime)

    def do_GET(self):
        url = urllib.parse.urlparse(self.path)
        query = urllib.parse.parse_qs(url.query)
        if url.path in ("/", "/index.html"):
            with open(os.path.join(WEB, "index.html"), "rb") as fh:
                return self._send(200, fh.read(), "text/html; charset=utf-8")
        if url.path == "/api/state":
            cfg = load_config()
            # Числа качества уезжают на страницу: разница между черновиком и
            # финалом должна быть видна в панели, а не только в документации.
            quality = {}
            for key, spec in QUALITY.items():
                quality[key] = {
                    "title": spec["title"],
                    "samples": spec["samples"],
                    "resolution": spec["resolution"],
                    "folder": os.path.basename(spec["folder"]) if spec["folder"] else None,
                }
            return self._send(200, {
                "sets": read_sets(),
                "cups": sorted(k for k in cfg["cups"] if not k.startswith("_")),
                "cup": cfg.get("cup_key"),
                "print_mode": cfg["print"].get("mode"),
                "quality": quality,
                "blender": find_blender(),
                "art": sorted(os.path.basename(p) for p in
                              glob.glob(os.path.join(ART, "*.png"))),
                "gallery": read_gallery(),
                "job": JOB.state(),
            })
        if url.path == "/api/log":
            since = int((query.get("since") or ["0"])[0])
            cursor, lines = JOB.tail(since)
            return self._send(200, {"cursor": cursor, "lines": lines,
                                    "job": JOB.state()})
        if url.path.startswith("/out/"):
            return self._file(OUT, url.path[5:])
        if url.path.startswith("/draft/"):
            return self._file(DRAFTS, url.path[7:])
        if url.path.startswith("/art/"):
            return self._file(ART, url.path[5:])
        return self._send(404, {"error": "нет такой страницы"})

    def do_POST(self):
        url = urllib.parse.urlparse(self.path)
        length = int(self.headers.get("Content-Length") or 0)
        try:
            payload = json.loads(self.rfile.read(length) or b"{}")
        except json.JSONDecodeError:
            return self._send(400, {"error": "некорректный запрос"})
        if url.path == "/api/render":
            try:
                tasks = build_tasks(payload)
            except ValueError as exc:
                return self._send(400, {"error": str(exc)})
            JOB.submit(tasks)
            return self._send(200, {"queued": [t["label"] for t in tasks]})
        if url.path == "/api/stop":
            JOB.stop()
            return self._send(200, {"stopped": True})
        return self._send(404, {"error": "нет такого действия"})


class Server(socketserver.ThreadingTCPServer):
    allow_reuse_address = True
    daemon_threads = True


def main():
    ap = argparse.ArgumentParser(description="Панель управления съёмкой")
    ap.add_argument("--port", type=int, default=8765)
    ap.add_argument("--no-browser", action="store_true")
    args = ap.parse_args()
    address = ("127.0.0.1", args.port)
    with Server(address, Handler) as httpd:
        url = "http://127.0.0.1:%d/" % args.port
        print("Панель съёмки: " + url)
        print("Blender: " + (find_blender() or "НЕ НАЙДЕН"))
        print("Остановить: Ctrl+C в этом окне.")
        if not args.no_browser:
            threading.Timer(0.6, webbrowser.open, args=(url,)).start()
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nПанель остановлена.")


if __name__ == "__main__":
    main()
