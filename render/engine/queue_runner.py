"""Очередь «Фотореала» на этом компьютере: кадры из папки — по одному.

Панель в Blender (studio_panel.py) кладёт задание папкой в <кадры>/очередь/;
здесь они считаются тем же раннером, что и у сайта (run.py --job --render
--finish), в фоне, с пониженным приоритетом, одним Blender за раз, и перед
каждым кадром видеокарта остывает (ноутбук владельца: GTX 1650 Ti).
Черновики — вне очереди, первыми, и готовый кадр сразу открывается.

Работает без Blender с панелью: его можно закрыть — очередь досчитается.
Запуск вручную (досчитать оставшееся):

    <python> queue_runner.py <папка кадров> <blender.exe>
"""

import datetime
import json
import os
import shutil
import subprocess
import sys
import threading
import time

ENGINE = os.path.dirname(os.path.abspath(__file__))
RUN = os.path.join(ENGINE, "run.py")
QUEUE = "очередь"
LOCK = "runner.lock"
HEARTBEAT_S = 10
COOL_C = 72                 # как у исполнителя сайта (server/worker.py GPU_COOL_C)
COOL_MAX_S = 15 * 60
PAUSE_S = 5
THREADS = "4"
BELOW_NORMAL = 0x00004000


def read(path, default=None):
    try:
        with open(path, "r", encoding="utf-8") as fh:
            return json.load(fh)
    except (OSError, ValueError):
        return default


def write(path, data):
    tmp = path + ".tmp"
    with open(tmp, "w", encoding="utf-8") as fh:
        json.dump(data, fh, ensure_ascii=False, indent=1)
    os.replace(tmp, path)


def alive(root):
    """Идёт ли уже очередь: её пульс — время файла runner.lock."""
    lock = os.path.join(root, QUEUE, LOCK)
    try:
        return time.time() - os.path.getmtime(lock) < 3 * HEARTBEAT_S
    except OSError:
        return False


def pending(root):
    q = os.path.join(root, QUEUE)
    jobs = []
    for name in os.listdir(q) if os.path.isdir(q) else []:
        folder = os.path.join(q, name)
        meta = read(os.path.join(folder, "meta.json"))
        if not meta:
            continue
        state = (read(os.path.join(folder, "status.json")) or {}).get("state", "waiting")
        if state == "waiting":
            jobs.append((meta.get("priority", 1), meta.get("created", ""), folder, meta))
    jobs.sort(key=lambda j: (j[0], j[1]))
    return jobs


def gpu_temp():
    try:
        out = subprocess.run(["nvidia-smi", "--query-gpu=temperature.gpu", "--format=csv,noheader,nounits"],
                             capture_output=True, text=True, timeout=10,
                             creationflags=getattr(subprocess, "CREATE_NO_WINDOW", 0))
        return int(out.stdout.strip().splitlines()[0])
    except Exception:
        return None


def cool_down():
    t0 = time.time()
    while time.time() - t0 < COOL_MAX_S:
        t = gpu_temp()
        if t is None or t <= COOL_C:
            return
        print(f"  видеокарта {t} °C — жду остывания до {COOL_C} °C…", flush=True)
        time.sleep(20)


def tail(path, n=12):
    try:
        with open(path, "r", encoding="utf-8", errors="replace") as fh:
            return "".join(fh.readlines()[-n:]).strip()
    except OSError:
        return ""


def render(folder, meta, blender):
    status = os.path.join(folder, "status.json")
    started = time.time()
    write(status, {"state": "rendering", "started": started})
    cmd = [blender, "-b", "--factory-startup", "-t", THREADS, "--python-exit-code", "1", "-P", RUN, "--",
           "--job", os.path.join(folder, "job.json"), "--render", "--finish",
           "--samples", str(meta["samples"]), "--resolution", str(meta["resolution"]),
           "--no-save", "--output-dir", folder]
    with open(os.path.join(folder, "log.txt"), "w", encoding="utf-8", errors="replace") as log, \
            open(os.path.join(folder, "err.txt"), "w", encoding="utf-8", errors="replace") as err:
        code = subprocess.run(cmd, stdout=log, stderr=err, cwd=ENGINE,
                              creationflags=BELOW_NORMAL | getattr(subprocess, "CREATE_NO_WINDOW", 0)).returncode
    minutes = (time.time() - started) / 60
    pngs = sorted((f for f in os.listdir(folder) if f.lower().endswith(".png")),
                  key=lambda f: os.path.getmtime(os.path.join(folder, f)))
    if code or not pngs:
        why = tail(os.path.join(folder, "err.txt")) or tail(os.path.join(folder, "log.txt"))
        write(status, {"state": "failed", "started": started, "minutes": round(minutes, 1),
                       "error": why[-1500:] or f"Blender завершился с кодом {code}"})
        return None
    day = datetime.date.today().isoformat()
    dest_dir = os.path.join(os.path.dirname(os.path.dirname(folder)), day)
    os.makedirs(dest_dir, exist_ok=True)
    dest = os.path.join(dest_dir, f"{datetime.datetime.now():%H-%M} {meta['name']}.png")
    shutil.copy2(os.path.join(folder, pngs[-1]), dest)
    write(status, {"state": "done", "started": started, "minutes": round(minutes, 1), "image": dest})
    return dest


def main():
    root, blender = sys.argv[1], sys.argv[2]
    q = os.path.join(root, QUEUE)
    os.makedirs(q, exist_ok=True)
    if alive(root):
        print("Очередь уже считается в другом окне.")
        return 0
    lock = os.path.join(q, LOCK)
    stop = threading.Event()

    def beat():
        while not stop.is_set():
            with open(lock, "w", encoding="utf-8") as fh:
                fh.write(str(os.getpid()))
            stop.wait(HEARTBEAT_S)

    threading.Thread(target=beat, daemon=True).start()
    # Прошлая очередь оборвалась посреди кадра (окно закрыли) — кадр снова ждёт.
    for name in os.listdir(q):
        status = os.path.join(q, name, "status.json")
        if (read(status) or {}).get("state") == "rendering":
            write(status, {"state": "waiting"})
    print("Очередь «Фотореала»: кадры по одному, видеокарта остывает между ними.")
    print("Окно можно свернуть. Закрыть — остановить очередь (текущий кадр прервётся).")
    print("Готовые кадры —", root, flush=True)
    try:
        idle = 0
        while True:
            jobs = pending(root)
            if not jobs:
                idle += 1
                if idle > 3:
                    break
                time.sleep(PAUSE_S)
                continue
            idle = 0
            _, _, folder, meta = jobs[0]
            print(f"\n{datetime.datetime.now():%H:%M} {meta['name']} — осталось в очереди: {len(jobs)}", flush=True)
            cool_down()
            dest = render(folder, meta, blender)
            state = read(os.path.join(folder, "status.json")) or {}
            if dest:
                print(f"  готово за {state.get('minutes')} мин: {dest}", flush=True)
                if meta.get("open"):
                    os.startfile(dest)
            else:
                print(f"  не получилось:\n{state.get('error', '')}", flush=True)
            time.sleep(PAUSE_S)
    finally:
        stop.set()
        try:
            os.remove(lock)
        except OSError:
            pass
    print("\nОчередь пуста.", flush=True)
    return 0


if __name__ == "__main__":
    sys.exit(main())
