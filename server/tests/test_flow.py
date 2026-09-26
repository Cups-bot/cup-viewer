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
        self.assertEqual(anon.call("GET", "api/me")[0], 401)
        self.assertEqual(self.submit(anon)[0], 401)
        self.assertEqual(anon.call("POST", "api/auth/request", {"email": "x@mailinator.com"})[0], 400)
        self.assertEqual(Client(self.server).call("POST", "api/worker/claim")[0], 403)

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
        status, job = user.call("POST", f"api/jobs/{jobs[0]['id']}/unmark")
        self.assertEqual((status, job["marked"]), (200, False))
        self.assertEqual(user.call("GET", "api/me")[1]["balance"]["welcome"], 1)
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

    def test_4_snapshot_and_admin(self):
        user = Client(self.server)
        user.login(EMAIL)
        status, asset = user.call("POST", "api/snapshot-assets", tiny_png(), "image/png")
        self.assertEqual(status, 201)
        state = {"modelId": "HB80-280", "materialId": "coated", "sceneId": "living",
                 "photo": {"preset": "front", "frame": "1:1", "second": {"modelId": "HB80-280", "kind": "pair"}, "angles": [0, 150]}}
        status, pub = user.call("POST", "api/publish-snapshot", {"state": state, "textureAsset": asset["assetId"],
                                                                 "unwrapAsset": asset["assetId"]})
        self.assertEqual(status, 201)
        anon = Client(self.server)
        status, snap = anon.call("GET", f"api/get-snapshot?v={pub['token']}")
        self.assertEqual(status, 200)
        self.assertEqual(snap["state"]["photo"]["angles"], [0, 150])
        self.assertEqual(anon.call("GET", snap["design"]["textureUrl"].lstrip("/"), raw=True)[0], 200)
        users = user.call("GET", "api/admin/users")[1]["users"]
        target = [u for u in users if u["email"] == "guest@example.ru"][0]
        self.assertEqual(user.call("POST", f"api/admin/users/{target['id']}/grant", {"amount": 5, "note": "тест"})[0], 200)
        self.assertEqual(user.call("GET", "api/admin/queue")[0], 200)
        guest = Client(self.server)
        guest.login("guest@example.ru")
        self.assertEqual(guest.call("GET", "api/me")[1]["balance"]["paid"], 5)
        self.assertEqual(guest.call("GET", "api/admin/users")[0], 403)


if __name__ == "__main__":
    unittest.main()
