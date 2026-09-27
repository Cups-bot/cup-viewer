"""Исполнитель рендера CupViewer (этап Д, §8 концепции).

Сам приходит на сервер за заданием, считает кадр движком render/ (Blender),
отдаёт PNG. Сбой — сообщает серверу, токены возвращаются сами. Можно запустить
на этом ноутбуке, на ПК с видеокартой или на GPU-сервере — сайт не меняется.

    server/.venv/Scripts/python server/worker.py            ноутбук владельца
    CV_WORKER_PROFILE=cloud server/.venv/Scripts/python server/worker.py
    CV_WORKER_PROFILE=draft …                                 проверки: мелко и быстро

Уровень кадра (Standard, Ultra) и его размер задаёт сервер (config.TIERS);
профиль решает только, сколько сэмплов тянет железо. Нагрузка (ноутбук
владельца, CLAUDE.md): один Blender, приоритет ниже обычного, пауза между
заданиями, а перед новым кадром видеокарта остывает до GPU_COOL_C.
"""

import io
import json
import os
import shutil
import subprocess
import sys
import tempfile
import threading
import time
import urllib.error
import urllib.request
import uuid
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
SERVER = os.environ.get("CV_SERVER", "http://127.0.0.1:8000/").rstrip("/") + "/"
DATA = Path(os.environ.get("CV_DATA", REPO / "server" / "data"))
KEY = os.environ.get("CV_WORKER_KEY") or (DATA / "worker.key").read_text(encoding="utf-8").strip()
NAME = os.environ.get("CV_WORKER_NAME", f"{os.environ.get('COMPUTERNAME', 'worker')}-{os.getpid()}")
BLENDER = os.environ.get("CV_BLENDER", r"C:\Program Files\Blender Foundation\Blender 5.2\blender.exe")
THREADS = os.environ.get("CV_THREADS", "4")
PAUSE = float(os.environ.get("CV_PAUSE", "5"))
TIMEOUT = float(os.environ.get("CV_TIMEOUT_MIN", "40")) * 60
PROFILE = os.environ.get("CV_WORKER_PROFILE", "laptop")
# Сэмплы по уровню; размер — от сервера (px в задании), у draft — свой, мелкий.
# laptop — GTX 1650 Ti 4 ГБ: Standard ≈ 5–6 мин, Ultra ≈ 20–25 мин на кадр
# (замер 2026-09-27); cloud — RTX 4090 и выше.
PROFILES = {
    "draft": {"standard": (48, 800), "ultra": (64, 1000)},
    "laptop": {"standard": (256, None), "ultra": (256, None)},
    "cloud": {"standard": (512, None), "ultra": (1024, None)},
}
LEGACY_SIZES = {"1600": "standard", "3000": "ultra"}
# Видеокарта ноутбука: перед следующим кадром ждём, пока остынет.
GPU_COOL_C = float(os.environ.get("CV_GPU_COOL_C", "72"))


def call(method, path, body=None, ctype="application/json"):
    data = json.dumps(body).encode() if isinstance(body, (dict, list)) else body
    req = urllib.request.Request(SERVER + path, data=data, method=method, headers={
        "X-Worker-Key": KEY, "X-Worker-Name": NAME, "Content-Type": ctype})
    with urllib.request.urlopen(req, timeout=120) as res:
        payload = res.read()
        return res.status, payload


def multipart(fields, files):
    boundary = uuid.uuid4().hex
    out = io.BytesIO()
    for name, value in fields.items():
        out.write(f"--{boundary}\r\nContent-Disposition: form-data; name=\"{name}\"\r\n\r\n{value}\r\n".encode())
    for name, (filename, data) in files.items():
        out.write(f"--{boundary}\r\nContent-Disposition: form-data; name=\"{name}\"; filename=\"{filename}\"\r\n"
                  f"Content-Type: image/png\r\n\r\n".encode())
        out.write(data)
        out.write(b"\r\n")
    out.write(f"--{boundary}--\r\n".encode())
    return out.getvalue(), f"multipart/form-data; boundary={boundary}"


def log(msg):
    print(time.strftime("%H:%M:%S"), msg, flush=True)


def render(task, folder: Path) -> Path:
    job = task["job"]
    for name in task["arts"]:
        _, data = call("GET", f"api/worker/jobs/{task['id']}/files/{name}")
        (folder / name).write_bytes(data)
    (folder / "job.json").write_text(json.dumps(job, ensure_ascii=False, indent=1), encoding="utf-8")
    tier = LEGACY_SIZES.get(task["size"], task["size"])
    samples, resolution = PROFILES.get(PROFILE, PROFILES["laptop"])[tier]
    resolution = resolution or task.get("px") or 2000
    out = folder / "out"
    # --finish: «камера» — кривая, ореол бликов, виньетка, зерно, резкость
    # (render/engine/bk/finish.py); у кадра в цене — всегда.
    cmd = [BLENDER, "-b", "--factory-startup", "-t", THREADS, "--python-exit-code", "1",
           "-P", str(REPO / "render" / "engine" / "run.py"), "--",
           "--job", str(folder / "job.json"), "--render", "--samples", str(samples),
           "--resolution", str(resolution), "--finish", "--no-save", "--output-dir", str(out)]
    flags = getattr(subprocess, "BELOW_NORMAL_PRIORITY_CLASS", 0)
    logfile = (folder / "render.log").open("w", encoding="utf-8", errors="replace")
    proc = subprocess.Popen(cmd, cwd=REPO, stdout=logfile, stderr=subprocess.STDOUT, creationflags=flags)
    if not flags:
        try:
            os.nice(5)
        except (AttributeError, OSError):
            pass
    stop = threading.Event()

    def heartbeat():
        while not stop.wait(30):
            try:
                call("POST", f"api/worker/jobs/{task['id']}/ping")
            except Exception:
                pass

    threading.Thread(target=heartbeat, daemon=True).start()
    try:
        code = proc.wait(timeout=TIMEOUT)
    except subprocess.TimeoutExpired:
        proc.kill()
        raise RuntimeError(f"рендер дольше {TIMEOUT / 60:.0f} мин")
    finally:
        stop.set()
        logfile.close()
    frames = sorted(out.glob("*.png")) if out.exists() else []
    if code != 0 or not frames:
        tail = (folder / "render.log").read_text(encoding="utf-8", errors="replace")[-600:]
        raise RuntimeError(f"Blender: код {code}. {tail}")
    return frames[-1]


def gpu_temp():
    """Температура видеокарты NVIDIA, °C; None — узнать не вышло."""
    try:
        out = subprocess.run(["nvidia-smi", "--query-gpu=temperature.gpu", "--format=csv,noheader,nounits"],
                             capture_output=True, text=True, timeout=10).stdout
        return max(float(v) for v in out.split())
    except (OSError, ValueError, subprocess.SubprocessError):
        return None


def cool_down():
    """Не браться за кадр на горячей видеокарте: ноутбук не для суток под нагрузкой."""
    waited = 0
    while waited < 600:
        t = gpu_temp()
        if t is None or t <= GPU_COOL_C:
            return
        if waited == 0:
            log(f"видеокарта {t:.0f} °C — жду, пока остынет до {GPU_COOL_C:.0f}")
        time.sleep(15)
        waited += 15


def main() -> int:
    log(f"исполнитель {NAME}: {SERVER}, профиль {PROFILE}, потоков {THREADS}")
    while True:
        cool_down()
        try:
            status, payload = call("POST", "api/worker/claim")
        except (urllib.error.URLError, ConnectionError) as err:
            log(f"сервер недоступен: {err}")
            time.sleep(15)
            continue
        if status == 204:
            time.sleep(PAUSE)
            continue
        task = json.loads(payload)
        folder = Path(tempfile.mkdtemp(prefix=f"cv-job-{task['id']}-"))
        started = time.time()
        log(f"задание {task['id']}: {task['job']['set']}, {len(task['job']['cups'])} ст., {task['size']}, {task.get('px')} px")
        try:
            frame = render(task, folder)
            body, ctype = multipart({"seconds": f"{time.time() - started:.1f}"}, {"image": (frame.name, frame.read_bytes())})
            call("POST", f"api/worker/jobs/{task['id']}/done", body, ctype)
            log(f"задание {task['id']}: готово за {time.time() - started:.0f} с")
        except Exception as err:  # любой сбой — токены пользователю назад
            log(f"задание {task['id']}: сбой — {err}")
            try:
                call("POST", f"api/worker/jobs/{task['id']}/fail", {"error": str(err)[:480]})
            except Exception:
                pass
        finally:
            shutil.rmtree(folder, ignore_errors=True)
        time.sleep(PAUSE)


if __name__ == "__main__":
    sys.exit(main())
