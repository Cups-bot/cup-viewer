"""Сквозная проверка сервера: живой процесс на временной базе, запросы как у
страницы и исполнителя. Только стандартная библиотека.

    server/.venv/Scripts/python -m unittest server.tests.test_flow -v
"""

import io
import json
import os
import re
import socket
import subprocess
import sys
import tempfile
import threading
import time
import unittest
import urllib.error
import urllib.request
import uuid
import zipfile
from http.cookiejar import CookieJar
from pathlib import Path

REPO = Path(__file__).resolve().parents[2]
EMAIL = "owner@example.ru"


def free_port() -> int:
    with socket.socket() as s:
        s.bind(("127.0.0.1", 0))
        return s.getsockname()[1]


def tiny_png(w=64, h=48, color=(200, 60, 40)) -> bytes:
    from PIL import Image
    buf = io.BytesIO()
    Image.new("RGB", (w, h), color).save(buf, "PNG")
    return buf.getvalue()


def multipart(fields: dict, files: dict):
    boundary = uuid.uuid4().hex
    out = io.BytesIO()
    for name, value in fields.items():
        out.write(f"--{boundary}\r\nContent-Disposition: form-data; name=\"{name}\"\r\n\r\n{value}\r\n".encode())
    for name, (filename, data, mime) in files.items():
        out.write(f"--{boundary}\r\nContent-Disposition: form-data; name=\"{name}\"; filename=\"{filename}\"\r\n"
                  f"Content-Type: {mime}\r\n\r\n".encode())
        out.write(data)
        out.write(b"\r\n")
    out.write(f"--{boundary}--\r\n".encode())
    return out.getvalue(), f"multipart/form-data; boundary={boundary}"


class Server:
    def __init__(self):
        self.data = tempfile.mkdtemp(prefix="cv-test-")
        self.port = free_port()
        env = dict(os.environ, CV_DATA=self.data, CV_PORT=str(self.port), CV_ADMINS=EMAIL, PYTHONIOENCODING="utf-8")
        self.proc = subprocess.Popen([sys.executable, "-m", "server"], cwd=REPO, env=env,
                                     stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True, encoding="utf-8")
        self.lines = []
        threading.Thread(target=self._read, daemon=True).start()
        deadline = time.time() + 20
        while time.time() < deadline:
            try:
                urllib.request.urlopen(f"{self.base}index.html", timeout=1)
                return
            except Exception:
                time.sleep(0.2)
        raise RuntimeError("сервер не поднялся:\n" + "".join(self.lines))

    def _read(self):
        for line in self.proc.stdout:
            self.lines.append(line)

    @property
    def base(self):
        return f"http://127.0.0.1:{self.port}/"

    def code_for(self, email):
        for _ in range(50):
            for line in reversed(self.lines):
                m = re.search(rf"Код входа для {re.escape(email)}: (\d{{6}})", line)
                if m:
                    return m.group(1)
            time.sleep(0.1)
        raise RuntimeError("кода нет в консоли")

    def stop(self):
        self.proc.terminate()
        self.proc.wait(10)


class Client:
    def __init__(self, server, headers=None):
        self.server = server
        self.opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(CookieJar()))
        self.headers = headers or {}

    def call(self, method, path, body=None, ctype="application/json", raw=False):
        data = json.dumps(body).encode() if body is not None and ctype == "application/json" else body
        req = urllib.request.Request(self.server.base + path, data=data, method=method,
                                     headers={"Content-Type": ctype, **self.headers})
        try:
            with self.opener.open(req, timeout=30) as res:
                payload = res.read()
                return res.status, (payload if raw else (json.loads(payload) if payload else None))
        except urllib.error.HTTPError as err:
            payload = err.read()
            return err.code, (json.loads(payload) if payload.startswith(b"{") else payload)

    def login(self, email):
        assert self.call("POST", "api/auth/request", {"email": email})[0] == 200
        status, me = self.call("POST", "api/auth/verify", {"email": email, "code": self.server.code_for(email)})
        assert status == 200, me
        return me


JOB = {"set": "living", "camera": {"preset": "front", "frame": "4:5"},
       "cups": [{"id": "HB80-280", "rotate": 0, "pos_mm": [-49, 0], "board": "coated"},
                {"id": "HB80-280", "rotate": 150, "pos_mm": [49, 0], "board": "coated"}]}


class Flow(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.server = Server()
        key = (Path(cls.server.data) / "worker.key").read_text(encoding="utf-8").strip()
        cls.worker = Client(cls.server, {"X-Worker-Key": key, "X-Worker-Name": "test"})

    @classmethod
    def tearDownClass(cls):
        cls.server.stop()

    def submit(self, user, size="1600", art=True):
        fields = {"job": json.dumps(JOB), "size": size}
        files = {"art0": ("art.png", tiny_png(), "image/png")} if art else {}
        body, ctype = multipart(fields, files)
        return user.call("POST", "api/jobs", body, ctype)

    def finish(self, job_id):
        body, ctype = multipart({"seconds": "12.5"}, {"image": ("frame.png", tiny_png(400, 500), "image/png")})
        return self.worker.call("POST", f"api/worker/jobs/{job_id}/done", body, ctype)

    def test_1_site_and_guards(self):
        anon = Client(self.server)
        self.assertEqual(anon.call("GET", "index.html", raw=True)[0], 200)
        self.assertEqual(anon.call("GET", "server/data/cupviewer.sqlite3", raw=True)[0], 404)
        self.assertEqual(anon.call("GET", "render/README.md", raw=True)[0], 404)
        # Выход за папки сайта — 404 в любом написании (urllib шлёт путь как есть).
        for path in ["js/../server/data/worker.key", "js/%2e%2e/server/data/worker.key", "js/..%2fserver/app/config.py",
                     "catalog/../.git/config", "assets/../server/app/config.py", "js/..%5cserver/app/config.py",
                     "dist/.gitignore", "view.html"]:
            self.assertEqual(anon.call("GET", path, raw=True)[0], 404, path)
        # vendor — Draco (PET, EM90-530) и pdf.js (макеты PDF): без них не открываются.
        self.assertEqual(anon.call("GET", "vendor/draco/draco_decoder.wasm", raw=True)[0], 200)
        self.assertEqual(anon.call("GET", "vendor/pdfjs/pdf.worker.min.mjs", raw=True)[0], 200)
        self.assertEqual(anon.call("GET", "api/me")[0], 401)
        self.assertEqual(self.submit(anon)[0], 401)
        self.assertEqual(anon.call("POST", "api/auth/request", {"email": "x@mailinator.com"})[0], 400)
        self.assertEqual(Client(self.server).call("POST", "api/worker/claim")[0], 403)
        # Код: после 5 неверных попыток верный уже не принимается — нужен новый.
        brute = Client(self.server)
        self.assertEqual(brute.call("POST", "api/auth/request", {"email": "brute@example.ru"})[0], 200)
        code = self.server.code_for("brute@example.ru")
        wrong = "000000" if code != "000000" else "111111"
        for _ in range(5):
            self.assertEqual(brute.call("POST", "api/auth/verify", {"email": "brute@example.ru", "code": wrong})[1]["error"], "bad_code")
        self.assertEqual(brute.call("POST", "api/auth/verify", {"email": "brute@example.ru", "code": code})[1]["error"], "code_expired")
        self.assertEqual(brute.call("GET", "api/me")[0], 401)

    def test_2_welcome_render_unmark(self):
        user = Client(self.server)
        me = user.login(EMAIL)
        self.assertEqual(me["balance"]["welcome"], 3)
        self.assertTrue(me["isAdmin"])
        status, job = self.submit(user)
        self.assertEqual(status, 200, job)
        self.assertEqual((job["status"], job["bucket"], job["position"]), ("queued", "welcome", 1))
        # У бесплатных — одно задание в очереди.
        self.assertEqual(self.submit(user)[0], 429)
        status, claim = self.worker.call("POST", "api/worker/claim")
        self.assertEqual(status, 200)
        self.assertEqual(claim["job"]["cups"][0]["art"], "art-1.png")
        # Второй стакан без своего макета — без печати (пара получает макет на странице).
        self.assertEqual(claim["job"]["cups"][1].get("print"), "none")
        self.assertEqual(self.worker.call("GET", f"api/worker/jobs/{claim['id']}/files/art-1.png", raw=True)[0], 200)
        self.assertEqual(self.finish(claim["id"])[0], 200)
        jobs = user.call("GET", "api/jobs")[1]["jobs"]
        self.assertEqual((jobs[0]["status"], jobs[0]["marked"]), ("done", True))
        self.assertEqual(user.call("GET", jobs[0]["imageUrl"], raw=True)[0], 200)
        self.assertEqual(user.call("GET", jobs[0]["thumbUrl"], raw=True)[0], 200)
        self.assertEqual(user.call("GET", "api/me")[1]["balance"]["welcome"], 2)
        marked_image = user.call("GET", jobs[0]["imageUrl"], raw=True)[1]
        marked_thumb = user.call("GET", jobs[0]["thumbUrl"], raw=True)[1]
        self.assertNotEqual(marked_image, tiny_png(400, 500))
        # Знак снимается только купленными токенами (владелец, 2026-09-27).
        status, err = user.call("POST", f"api/jobs/{jobs[0]['id']}/unmark")
        self.assertEqual((status, err["error"]), (402, "paid_tokens_required"))
        me = user.call("GET", "api/me")[1]
        users = user.call("GET", "api/admin/users")[1]["users"]
        own = [u for u in users if u["email"] == EMAIL][0]
        self.assertEqual(user.call("POST", f"api/admin/users/{own['id']}/grant", {"amount": 1, "note": "тест знака"})[0], 200)
        status, job = user.call("POST", f"api/jobs/{jobs[0]['id']}/unmark")
        self.assertEqual((status, job["marked"]), (200, False))
        after = user.call("GET", "api/me")[1]["balance"]
        self.assertEqual((after["paid"], after["welcome"]), (0, me["balance"]["welcome"]))
        # Новый адрес (кэш браузера не отдаст кадр со знаком), кадр и миниатюра — чистые.
        self.assertNotEqual(job["imageUrl"], jobs[0]["imageUrl"])
        self.assertEqual(user.call("GET", job["imageUrl"], raw=True)[1], tiny_png(400, 500))
        self.assertNotEqual(user.call("GET", job["thumbUrl"], raw=True)[1], marked_thumb)
        # Чужой кадр не виден.
        other = Client(self.server)
        other.login("guest@example.ru")
        self.assertEqual(other.call("GET", jobs[0]["imageUrl"], raw=True)[0], 404)

    def test_3_failure_refund_and_purchase(self):
        user = Client(self.server)
        user.login(EMAIL)
        before = user.call("GET", "api/me")[1]["balance"]
        status, job = self.submit(user)
        self.assertEqual(status, 200, job)
        claim = self.worker.call("POST", "api/worker/claim")[1]
        self.assertEqual(self.worker.call("POST", f"api/worker/jobs/{claim['id']}/fail", {"error": "Blender упал"})[0], 200)
        self.assertEqual(user.call("GET", "api/me")[1]["balance"], before)
        # Не хватает токенов на кадр для печати (3) — 402; тестовая оплата пакета.
        self.assertEqual(self.submit(user, "3000")[0], 402)
        pay = user.call("POST", "api/payments/checkout", {"tokens": 10})[1]
        self.assertEqual(user.call("POST", f"api/payments/{pay['paymentId']}/confirm")[0], 200)
        self.assertEqual(user.call("GET", "api/me")[1]["balance"]["paid"], 10)
        status, job = self.submit(user, "3000")
        self.assertEqual((status, job["bucket"], job["cost"]), (200, "paid", 3))
        claim = self.worker.call("POST", "api/worker/claim")[1]
        self.finish(claim["id"])
        done = [j for j in user.call("GET", "api/jobs")[1]["jobs"] if j["id"] == claim["id"]][0]
        self.assertFalse(done["marked"])
        # Отмена задания в очереди возвращает токены.
        status, job = self.submit(user)
        self.assertEqual(user.call("DELETE", f"api/jobs/{job['id']}")[0], 200)
        self.assertEqual(user.call("GET", "api/me")[1]["balance"]["paid"], 7)

    def test_4_no_links_and_admin(self):
        user = Client(self.server)
        user.login(EMAIL)
        # Ссылок клиенту нет (владелец, 2026-09-27: общий сервис).
        self.assertEqual(user.call("POST", "api/snapshot-assets", tiny_png(), "image/png")[0], 404)
        self.assertEqual(user.call("POST", "api/publish-snapshot", {"state": {"modelId": "HB80-280"}})[0], 404)
        users = user.call("GET", "api/admin/users")[1]["users"]
        target = [u for u in users if u["email"] == "guest@example.ru"][0]
        self.assertEqual(user.call("POST", f"api/admin/users/{target['id']}/grant", {"amount": 5, "note": "тест"})[0], 200)
        self.assertEqual(user.call("GET", "api/admin/queue")[0], 200)
        guest = Client(self.server)
        guest.login("guest@example.ru")
        self.assertEqual(guest.call("GET", "api/me")[1]["balance"]["paid"], 5)
        self.assertEqual(guest.call("GET", "api/admin/users")[0], 403)


    def test_5_mixed_repeat_errors_gallery(self):
        admin = Client(self.server)
        admin.login(EMAIL)
        user = Client(self.server)
        user.login("mix@example.ru")
        uid = [u for u in admin.call("GET", "api/admin/users")[1]["users"] if u["email"] == "mix@example.ru"][0]["id"]
        # Приветственный кадр, потом 2 купленных: в шапке 4, кадр за 3 — вместе.
        status, first = self.submit(user)
        self.assertEqual((status, first["bucket"]), (200, "welcome"))
        claim = self.worker.call("POST", "api/worker/claim")[1]
        self.finish(claim["id"])
        admin.call("POST", f"api/admin/users/{uid}/grant", {"amount": 2, "note": "тест"})
        before = user.call("GET", "api/me")[1]["balance"]
        self.assertEqual((before["paid"], before["welcome"]), (2, 2))
        status, mixed = self.submit(user, "3000")
        self.assertEqual((status, mixed["bucket"], mixed["marked"], mixed["workerOnline"]), (200, "mixed", True, True))
        after = user.call("GET", "api/me")[1]["balance"]
        self.assertEqual((after["paid"], after["welcome"]), (0, 1))
        # Сбой: пользователю — понятный текст, админке — как есть; токены — в те же кошельки.
        claim = self.worker.call("POST", "api/worker/claim")[1]
        self.worker.call("POST", f"api/worker/jobs/{claim['id']}/fail", {"error": "Blender: код 1. D:\\secret\\path"})
        failed = [j for j in user.call("GET", "api/jobs")[1]["jobs"] if j["id"] == mixed["id"]][0]
        self.assertEqual(failed["error"], "Не получилось посчитать кадр")
        self.assertNotIn("errorRaw", failed)
        raw = [j for j in admin.call("GET", "api/admin/queue")[1]["jobs"] if j["id"] == mixed["id"]][0]
        self.assertIn("D:\\secret", raw["errorRaw"])
        self.assertEqual(user.call("GET", "api/me")[1]["balance"], before)
        # «Повторить» — только сбой, и с правилом «у бесплатных одно задание».
        self.assertEqual(user.call("POST", f"api/jobs/{first['id']}/repeat")[1]["error"], "not_failed")
        status, again = user.call("POST", f"api/jobs/{mixed['id']}/repeat")
        self.assertEqual((status, again["bucket"]), (200, "mixed"))
        admin.call("POST", f"api/admin/users/{uid}/grant", {"amount": 2, "note": "тест"})
        self.assertEqual(user.call("POST", f"api/jobs/{mixed['id']}/repeat")[1]["error"], "one_free_job_at_a_time")
        # Второй готовый кадр, архив выбранных, сцена для редактора.
        claim = self.worker.call("POST", "api/worker/claim")[1]
        self.finish(claim["id"])
        status, archive = user.call("GET", f"api/jobs/archive?ids={first['id']},{again['id']},999999", raw=True)
        self.assertEqual(status, 200)
        with zipfile.ZipFile(io.BytesIO(archive)) as zf:
            self.assertEqual(sorted(zf.namelist()), sorted([f"cupviewer_living_{first['id']}.png", f"cupviewer_living_{again['id']}.png"]))
        stranger = Client(self.server)
        stranger.login("stranger@example.ru")
        self.assertEqual(stranger.call("GET", f"api/jobs/archive?ids={first['id']}", raw=True)[0], 404)
        status, spec = user.call("GET", f"api/jobs/{again['id']}/spec")
        self.assertEqual((status, spec["job"]["set"], spec["job"]["cups"][0]["rotate"]), (200, "living", 0.0))
        self.assertEqual(user.call("GET", spec["arts"][0], raw=True)[1], tiny_png())
        # Удалить выбранные: готовые — сразу, стоящее в очереди — с возвратом.
        admin.call("POST", f"api/admin/users/{uid}/grant", {"amount": 1, "note": "тест"})
        queued = self.submit(user)[1]
        paid_before = user.call("GET", "api/me")[1]["balance"]["paid"]
        status, res = user.call("POST", "api/jobs/delete", {"ids": [first["id"], queued["id"]]})
        self.assertEqual((status, res["removed"]), (200, 2))
        self.assertEqual(user.call("GET", "api/me")[1]["balance"]["paid"], paid_before + 1)
        # Макет больше 16384 px по стороне не принимается (исполнитель упал бы по памяти).
        body, ctype = multipart({"job": json.dumps(JOB), "size": "1600"},
                                {"art0": ("art.png", tiny_png(17000, 4), "image/png")})
        status, err = user.call("POST", "api/jobs", body, ctype)
        self.assertEqual((status, err["error"]), (413, "too_large"))


    def test_6_pad_print(self):
        # Тампопечать BM: print «pad» доходит до исполнителя (своя полоса у рендера);
        # у PET и бумаги такого варианта нет.
        user = Client(self.server)
        user.login("pad@example.ru")
        job = {"set": "studio", "camera": {"preset": "front", "frame": "1:1"},
               "cups": [{"id": "BM90-410", "rotate": 0, "print": "pad"}]}
        body, ctype = multipart({"job": json.dumps(job), "size": "1600"}, {"art0": ("art.png", tiny_png(), "image/png")})
        status, made = user.call("POST", "api/jobs", body, ctype)
        self.assertEqual(status, 200, made)
        claim = self.worker.call("POST", "api/worker/claim")[1]
        self.assertEqual((claim["id"], claim["job"]["cups"][0]["print"]), (made["id"], "pad"))
        self.finish(claim["id"])
        for cup in ({"id": "PG95-400", "print": "pad"}, {"id": "HB80-280", "print": "pad"}):
            bad = dict(job, cups=[cup])
            body, ctype = multipart({"job": json.dumps(bad), "size": "1600"}, {})
            status, err = user.call("POST", "api/jobs", body, ctype)
            self.assertEqual((status, err["error"]), (400, "bad_print"), cup)


class Sweep(unittest.TestCase):
    """Уборка в том же процессе, на своей временной базе."""

    def test_stale_attempts_and_queue_timeout(self):
        os.environ["CV_DATA"] = tempfile.mkdtemp(prefix="cv-sweep-")
        from server.app import config, db, jobs, tokens
        db.init()
        con = db.connect()
        con.execute("INSERT INTO users (email, created_at) VALUES ('s@example.ru', ?)", (db.stamp(),))
        user = con.execute("SELECT * FROM users").fetchone()
        tokens.add(con, user["id"], "paid", 5, "grant")
        spec = json.dumps({"set": "living", "camera": {"preset": "front", "frame": "1:1"}, "cups": [{"id": "HB80-280"}]})
        with db.tx() as tx:
            hung = jobs.enqueue(tx, user, "1600", spec, "queued", "тест")
            waiting = jobs.enqueue(tx, user, "1600", spec, "queued", "тест")
        long_ago = db.stamp(minutes=-60 * (config.QUEUE_TIMEOUT_HOURS + 1))
        con.execute("UPDATE jobs SET status = 'rendering', attempts = ?, heartbeat_at = ? WHERE id = ?",
                    (config.STALE_ATTEMPTS, long_ago, hung))
        con.execute("UPDATE jobs SET created_at = ? WHERE id = ?", (long_ago, waiting))
        result = jobs.sweep()
        self.assertEqual((result["requeued"], result["failed"]), (0, 2))
        states = {r["id"]: (r["status"], r["error"]) for r in con.execute("SELECT id, status, error FROM jobs")}
        self.assertEqual(states[hung], ("failed", "исполнитель не справился"))
        self.assertEqual(states[waiting], ("failed", "не дождался исполнителя"))
        self.assertEqual(tokens.balance(con, user)["paid"], 5)
        # Исполнитель: ни разу не выходил — не на связи; пришёл — на связи.
        self.assertFalse(jobs.worker_online(con))
        jobs.seen_worker(con, "тест")
        self.assertTrue(jobs.worker_online(con))


if __name__ == "__main__":
    unittest.main()
