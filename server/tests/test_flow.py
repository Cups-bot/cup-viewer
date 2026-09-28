"""Сквозная проверка сервера: живой процесс на временной базе, запросы как у
страницы и исполнителя. Только стандартная библиотека.

    server/.venv/Scripts/python -m unittest server.tests.test_flow -v
"""

import io
import json
import os
import re
import socket
import sqlite3
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
from datetime import datetime, timedelta, timezone
from http.cookiejar import CookieJar
from pathlib import Path

REPO = Path(__file__).resolve().parents[2]
EMAIL = "owner@example.ru"
PASSWORD = "secret-pass-1"


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
        # Экономика сценариев ниже — кадр Standard за 1 токен, Ultra за 3; тариф
        # «Месяц» — 3 стартовых токена. Аккаунтов с одного адреса — сколько нужно.
        env = dict(os.environ, CV_DATA=self.data, CV_PORT=str(self.port), CV_ADMINS=EMAIL, PYTHONIOENCODING="utf-8",
                   CV_PRICE_STANDARD="1", CV_PRICE_ULTRA="3", CV_ACCOUNTS_PER_IP_DAY="100")
        self.proc = subprocess.Popen([sys.executable, "-m", "server"], cwd=REPO, env=env,
                                     stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True, encoding="utf-8")
        self.lines = []
        threading.Thread(target=self._read, daemon=True).start()
        deadline = time.time() + 20
        while time.time() < deadline:
            try:
                urllib.request.urlopen(f"{self.base}login.html", timeout=1)
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

    def db(self):
        return sqlite3.connect(Path(self.data) / "cupviewer.sqlite3", isolation_level=None)

    def code_for(self, email, skip=0):
        """Код сброса пароля из консоли; skip — сколько кодов этой почте уже взято."""
        pattern = re.compile(rf"Код сброса пароля для {re.escape(email)}: (\d{{6}})")
        for _ in range(50):
            found = [m.group(1) for m in (pattern.search(line) for line in self.lines) if m]
            if len(found) > skip:
                return found[-1]
            time.sleep(0.1)
        raise RuntimeError("кода нет в консоли")

    def stop(self):
        self.proc.terminate()
        self.proc.wait(10)


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *args, **kwargs):
        return None


class Client:
    def __init__(self, server, headers=None):
        self.server = server
        self.opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(CookieJar()), NoRedirect())
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
            if err.code in (301, 302):
                return err.code, err.headers.get("Location")
            return err.code, (json.loads(payload) if payload.startswith(b"{") else payload)

    def signup(self, email, password=PASSWORD, plan="month"):
        """Регистрация (или вход, если уже есть) и, если plan, — оплата тарифа."""
        status, me = self.call("POST", "api/auth/register", {"email": email, "password": password})
        if status == 409:
            status, me = self.call("POST", "api/auth/login", {"email": email, "password": password})
        assert status == 200, me
        if plan:
            pay = self.call("POST", "api/subscription/checkout", {"plan": plan})[1]
            status, res = self.call("POST", f"api/payments/{pay['paymentId']}/confirm")
            assert status == 200, res
            me = self.call("GET", "api/me")[1]
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
        cls.admin = Client(cls.server)
        cls.admin.signup(EMAIL, plan=None)

    @classmethod
    def tearDownClass(cls):
        cls.server.stop()

    def uid(self, email):
        return [u for u in self.admin.call("GET", "api/admin/users")[1]["users"] if u["email"] == email][0]["id"]

    def submit(self, user, size="standard", art=True):
        fields = {"job": json.dumps(JOB), "size": size}
        files = {"art0": ("art.png", tiny_png(), "image/png")} if art else {}
        body, ctype = multipart(fields, files)
        return user.call("POST", "api/jobs", body, ctype)

    def finish(self, job_id):
        body, ctype = multipart({"seconds": "12.5"}, {"image": ("frame.png", tiny_png(400, 500), "image/png")})
        return self.worker.call("POST", f"api/worker/jobs/{job_id}/done", body, ctype)

    def test_1_site_and_guards(self):
        anon = Client(self.server)
        # Сайт закрыт: страница — на вход, данные — 403; вход, стили, код — открыты.
        self.assertEqual(anon.call("GET", "index.html", raw=True), (302, "login.html"))
        self.assertEqual(anon.call("GET", "", raw=True), (302, "login.html"))
        self.assertEqual(anon.call("GET", "admin.html", raw=True)[0], 302)
        for path in ["login.html", "css/app.css", "dist/login.js", "assets/icons/sprite.svg"]:
            self.assertEqual(anon.call("GET", path, raw=True)[0], 200, path)
        for path in ["assets/models/cups/HB80-280.glb", "catalog/models.json", "vendor/draco/draco_decoder.wasm",
                     "assets/templates/DW80-280-SIZE.pdf"]:
            self.assertEqual(anon.call("GET", path, raw=True)[0], 403, path)
        self.assertEqual(anon.call("GET", "server/data/cupviewer.sqlite3", raw=True)[0], 404)
        self.assertEqual(anon.call("GET", "render/README.md", raw=True)[0], 404)
        # Выход за папки сайта — 404 в любом написании (urllib шлёт путь как есть).
        for path in ["js/../server/data/worker.key", "js/%2e%2e/server/data/worker.key", "js/..%2fserver/app/config.py",
                     "catalog/../.git/config", "assets/../server/app/config.py", "js/..%5cserver/app/config.py",
                     "dist/.gitignore", "view.html"]:
            self.assertEqual(anon.call("GET", path, raw=True)[0], 404, path)
        self.assertEqual(anon.call("GET", "api/me")[0], 401)
        self.assertEqual(self.submit(anon)[0], 401)
        self.assertEqual(anon.call("POST", "api/auth/register", {"email": "x@mailinator.com", "password": PASSWORD})[0], 400)
        self.assertEqual(anon.call("GET", "api/plans")[0], 200)
        self.assertEqual(Client(self.server).call("POST", "api/worker/claim")[0], 403)
        # Регистрация: короткий пароль, занятая почта.
        weak = anon.call("POST", "api/auth/register", {"email": "new@example.ru", "password": "short"})
        self.assertEqual(weak[1]["error"], "weak_password")
        fresh = Client(self.server)
        me = fresh.signup("new@example.ru", plan=None)
        self.assertEqual((me["access"]["active"], me["balance"]["welcome"], me["balance"]["paid"]), (False, 0, 0))
        taken = anon.call("POST", "api/auth/register", {"email": "new@example.ru", "password": PASSWORD})
        self.assertEqual(taken[1]["error"], "email_taken")
        # Вошёл, но не оплатил: сайт и данные закрыты, кадр, пакеты и галерея — 402.
        self.assertEqual(fresh.call("GET", "index.html", raw=True)[0], 302)
        self.assertEqual(fresh.call("GET", "catalog/models.json", raw=True)[0], 403)
        self.assertEqual(self.submit(fresh)[1]["error"], "subscription_required")
        self.assertEqual(fresh.call("GET", "api/payments/packs")[0], 402)
        self.assertEqual(fresh.call("GET", "api/jobs")[0], 402)
        # Пароль: неверный — bad_login; 10 неверных за 15 минут — стоп.
        other = Client(self.server)
        wrong_login = {"email": "new@example.ru", "password": "wrong-pass"}
        for _ in range(10):
            self.assertEqual(other.call("POST", "api/auth/login", wrong_login)[1]["error"], "bad_login")
        right_login = {"email": "new@example.ru", "password": PASSWORD}
        self.assertEqual(other.call("POST", "api/auth/login", right_login)[1]["error"], "too_many_attempts")
        # Сброс пароля кодом: 5 неверных — код сгорел; новый код — новый пароль и вход.
        self.assertEqual(other.call("POST", "api/auth/request", {"email": "new@example.ru"})[0], 200)
        code = self.server.code_for("new@example.ru")
        wrong = "000000" if code != "000000" else "111111"
        reset = lambda c: other.call("POST", "api/auth/reset", {"email": "new@example.ru", "code": c, "password": "new-password"})
        for _ in range(5):
            self.assertEqual(reset(wrong)[1]["error"], "bad_code")
        self.assertEqual(reset(code)[1]["error"], "code_expired")
        other.call("POST", "api/auth/request", {"email": "new@example.ru"})
        status, me = reset(self.server.code_for("new@example.ru", skip=1))
        self.assertEqual((status, me["email"]), (200, "new@example.ru"))
        # Сброс закрыл прежние сессии; со старым паролем не войти, с новым — да.
        self.assertEqual(fresh.call("GET", "api/me")[0], 401)
        self.assertEqual(anon.call("POST", "api/auth/login", right_login)[1]["error"], "bad_login")
        self.assertEqual(anon.call("POST", "api/auth/login", {"email": "new@example.ru", "password": "new-password"})[0], 200)
        # Неизвестная почта: ответ тот же.
        self.assertEqual(anon.call("POST", "api/auth/request", {"email": "nobody@example.ru"})[0], 200)

    def test_2_subscribe_render(self):
        plans = Client(self.server).call("GET", "api/plans")[1]["plans"]
        month = [p for p in plans if p["id"] == "month"][0]
        self.assertEqual((month["days"], month["starterTokens"]), (30, 3))
        user = Client(self.server)
        me = user.signup("client@example.ru")
        self.assertTrue(me["access"]["active"])
        until = datetime.fromisoformat(me["access"]["until"])
        self.assertAlmostEqual((until - datetime.now(timezone.utc)).days, 29, delta=1)
        self.assertEqual((me["balance"]["welcome"], me["balance"]["paid"]), (3, 0))
        # С подпиской — сайт и данные открыты, админка — нет.
        self.assertEqual(user.call("GET", "index.html", raw=True)[0], 200)
        self.assertEqual(user.call("GET", "catalog/models.json", raw=True)[0], 200)
        self.assertEqual(user.call("GET", "vendor/draco/draco_decoder.wasm", raw=True)[0], 200)
        self.assertEqual(user.call("GET", "admin.html", raw=True)[0], 302)
        status, job = self.submit(user)
        self.assertEqual(status, 200, job)
        self.assertEqual((job["status"], job["bucket"], job["position"]), ("queued", "welcome", 1))
        self.assertNotIn("marked", job)
        status, claim = self.worker.call("POST", "api/worker/claim")
        self.assertEqual(status, 200)
        self.assertEqual(claim["job"]["cups"][0]["art"], "art-1.png")
        # Второй стакан без своего макета — без печати (пара получает макет на странице).
        self.assertEqual(claim["job"]["cups"][1].get("print"), "none")
        self.assertEqual(self.worker.call("GET", f"api/worker/jobs/{claim['id']}/files/art-1.png", raw=True)[0], 200)
        self.assertEqual(self.finish(claim["id"])[0], 200)
        jobs = user.call("GET", "api/jobs")[1]["jobs"]
        self.assertEqual(jobs[0]["status"], "done")
        # Кадр — без знака: ровно то, что прислал исполнитель.
        self.assertEqual(user.call("GET", jobs[0]["imageUrl"], raw=True)[1], tiny_png(400, 500))
        self.assertEqual(user.call("GET", jobs[0]["thumbUrl"], raw=True)[0], 200)
        self.assertEqual(user.call("GET", "api/me")[1]["balance"]["welcome"], 2)
        self.assertEqual(user.call("POST", f"api/jobs/{jobs[0]['id']}/unmark")[0], 404)
        # Чужой кадр не виден и подписчику.
        guest = Client(self.server)
        guest.signup("guest@example.ru")
        self.assertEqual(guest.call("GET", jobs[0]["imageUrl"], raw=True)[0], 404)
        # Не больше трёх заданий в работе.
        self.admin.call("POST", f"api/admin/users/{self.uid('guest@example.ru')}/grant", {"amount": 10, "note": "тест"})
        for _ in range(3):
            self.assertEqual(self.submit(guest)[0], 200)
        self.assertEqual(self.submit(guest)[1]["error"], "too_many_jobs")
        for _ in range(3):
            claim = self.worker.call("POST", "api/worker/claim")[1]
            self.finish(claim["id"])

    def test_3_failure_refund_purchase_and_expiry(self):
        user = Client(self.server)
        user.signup("buyer@example.ru")
        before = user.call("GET", "api/me")[1]["balance"]
        status, job = self.submit(user)
        self.assertEqual(status, 200, job)
        claim = self.worker.call("POST", "api/worker/claim")[1]
        self.assertEqual(self.worker.call("POST", f"api/worker/jobs/{claim['id']}/fail", {"error": "Blender упал"})[0], 200)
        self.assertEqual(user.call("GET", "api/me")[1]["balance"], before)
        # Пакет внутри подписки: тестовая оплата.
        pay = user.call("POST", "api/payments/checkout", {"tokens": 10})[1]
        self.assertEqual(user.call("POST", f"api/payments/{pay['paymentId']}/confirm")[0], 200)
        self.assertEqual(user.call("GET", "api/me")[1]["balance"]["paid"], 10)
        # Сначала тратятся стартовые (сгорают с концом срока), потом купленные.
        status, job = self.submit(user, "ultra")
        self.assertEqual((status, job["bucket"], job["cost"]), (200, "welcome", 3))
        claim = self.worker.call("POST", "api/worker/claim")[1]
        self.finish(claim["id"])
        status, job = self.submit(user, "ultra")
        self.assertEqual((status, job["bucket"]), (200, "paid"))
        claim = self.worker.call("POST", "api/worker/claim")[1]
        self.finish(claim["id"])
        # Отмена задания в очереди возвращает токены.
        status, job = self.submit(user)
        self.assertEqual(user.call("DELETE", f"api/jobs/{job['id']}")[0], 200)
        self.assertEqual(user.call("GET", "api/me")[1]["balance"]["paid"], 7)
        # Срок кончился: сайт закрыт при токенах на балансе, стартовые сгорели.
        past = (datetime.now(timezone.utc) - timedelta(days=1)).isoformat(timespec="seconds")
        self.server.db().execute("UPDATE users SET access_until = ?, welcome_expires_at = ? WHERE email = ?",
                                 (past, past, "buyer@example.ru"))
        me = user.call("GET", "api/me")[1]
        self.assertEqual((me["access"]["active"], me["balance"]["paid"], me["balance"]["welcome"]), (False, 7, 0))
        self.assertEqual(self.submit(user)[1]["error"], "subscription_required")
        self.assertEqual(user.call("GET", "api/jobs")[0], 402)
        self.assertEqual(user.call("GET", "index.html", raw=True)[0], 302)
        # Продление: срок от сегодня, стартовые — новые 3, прежние 3 не ожили.
        pay = user.call("POST", "api/subscription/checkout", {"plan": "month"})[1]
        user.call("POST", f"api/payments/{pay['paymentId']}/confirm")
        me = user.call("GET", "api/me")[1]
        self.assertEqual((me["access"]["active"], me["balance"]["paid"], me["balance"]["welcome"]), (True, 7, 3))
        # Продление до конца срока — срок прибавляется, стартовые копятся.
        pay = user.call("POST", "api/subscription/checkout", {"plan": "month"})[1]
        user.call("POST", f"api/payments/{pay['paymentId']}/confirm")
        me2 = user.call("GET", "api/me")[1]
        gained = datetime.fromisoformat(me2["access"]["until"]) - datetime.fromisoformat(me["access"]["until"])
        self.assertEqual((gained.days, me2["balance"]["welcome"]), (30, 6))

    def test_4_admin(self):
        user = Client(self.server)
        user.signup("guest@example.ru")
        # Ссылок клиенту нет (владелец, 2026-09-27: общий сервис).
        self.assertEqual(user.call("POST", "api/snapshot-assets", tiny_png(), "image/png")[0], 404)
        self.assertEqual(user.call("GET", "api/admin/users")[0], 403)
        self.assertEqual(user.call("PUT", "api/admin/plans/month", {"label": "x", "days": 1, "priceRub": 1})[0], 403)
        # Админ: сайт открыт без подписки, админка тоже.
        self.assertEqual(self.admin.call("GET", "index.html", raw=True)[0], 200)
        self.assertEqual(self.admin.call("GET", "admin.html", raw=True)[0], 200)
        users = self.admin.call("GET", "api/admin/users")[1]["users"]
        guest = [u for u in users if u["email"] == "guest@example.ru"][0]
        self.assertTrue(guest["accessUntil"] and guest["hasPassword"])
        # Доступ вручную: +10 дней и 2 стартовых; минус — укоротить до прошлого.
        before = datetime.fromisoformat(guest["accessUntil"])
        res = self.admin.call("POST", f"api/admin/users/{guest['id']}/access", {"days": 10, "starterTokens": 2})[1]
        self.assertEqual((datetime.fromisoformat(res["accessUntil"]) - before).days, 10)
        self.admin.call("POST", f"api/admin/users/{guest['id']}/access", {"days": -100})
        self.assertFalse(user.call("GET", "api/me")[1]["access"]["active"])
        self.admin.call("POST", f"api/admin/users/{guest['id']}/access", {"days": 30})
        self.assertTrue(user.call("GET", "api/me")[1]["access"]["active"])
        # Тарифы: правка цены, новый тариф; выключенный не виден клиенту.
        month = {"label": "Месяц", "days": 30, "priceRub": 1490, "starterTokens": 3}
        self.assertEqual(self.admin.call("PUT", "api/admin/plans/month", month)[0], 200)
        made = self.admin.call("POST", "api/admin/plans",
                               {"label": "Year", "days": 365, "priceRub": 9900, "starterTokens": 40, "active": False})[1]
        public = {p["id"]: p for p in Client(self.server).call("GET", "api/plans")[1]["plans"]}
        self.assertEqual(public["month"]["priceRub"], 1490)
        self.assertNotIn(made["id"], public)
        self.assertEqual(len(self.admin.call("GET", "api/admin/plans")[1]["plans"]), 3)
        self.assertEqual(self.admin.call("PUT", "api/admin/plans/month", {"label": "", "days": 0, "priceRub": 1})[0], 400)
        self.assertEqual(self.admin.call("GET", "api/admin/queue")[0], 200)
        self.assertEqual(self.admin.call("GET", "api/admin/payments")[0], 200)

    def test_5_mixed_repeat_errors_gallery(self):
        user = Client(self.server)
        user.signup("mix@example.ru")
        uid = self.uid("mix@example.ru")
        # Стартовый кадр, потом 2 купленных: в шапке 4, кадр за 3 — вместе
        # (сначала стартовые, остаток — купленными).
        status, first = self.submit(user)
        self.assertEqual((status, first["bucket"]), (200, "welcome"))
        claim = self.worker.call("POST", "api/worker/claim")[1]
        self.finish(claim["id"])
        self.admin.call("POST", f"api/admin/users/{uid}/grant", {"amount": 2, "note": "тест"})
        before = user.call("GET", "api/me")[1]["balance"]
        self.assertEqual((before["paid"], before["welcome"]), (2, 2))
        status, mixed = self.submit(user, "ultra")
        self.assertEqual((status, mixed["bucket"], mixed["workerOnline"]), (200, "mixed", True))
        after = user.call("GET", "api/me")[1]["balance"]
        self.assertEqual((after["paid"], after["welcome"]), (1, 0))
        # Сбой: пользователю — понятный текст, админке — как есть; токены — в те же кошельки.
        claim = self.worker.call("POST", "api/worker/claim")[1]
        self.worker.call("POST", f"api/worker/jobs/{claim['id']}/fail", {"error": "Blender: код 1. D:\\secret\\path"})
        failed = [j for j in user.call("GET", "api/jobs")[1]["jobs"] if j["id"] == mixed["id"]][0]
        self.assertEqual(failed["error"], "Не получилось посчитать кадр")
        self.assertNotIn("errorRaw", failed)
        raw = [j for j in self.admin.call("GET", "api/admin/queue")[1]["jobs"] if j["id"] == mixed["id"]][0]
        self.assertIn("D:\\secret", raw["errorRaw"])
        self.assertEqual(user.call("GET", "api/me")[1]["balance"], before)
        # «Повторить» — только сбой.
        self.assertEqual(user.call("POST", f"api/jobs/{first['id']}/repeat")[1]["error"], "not_failed")
        status, again = user.call("POST", f"api/jobs/{mixed['id']}/repeat")
        self.assertEqual((status, again["bucket"]), (200, "mixed"))
        # Второй готовый кадр, архив выбранных, сцена для редактора.
        claim = self.worker.call("POST", "api/worker/claim")[1]
        self.finish(claim["id"])
        status, archive = user.call("GET", f"api/jobs/archive?ids={first['id']},{again['id']},999999", raw=True)
        self.assertEqual(status, 200)
        with zipfile.ZipFile(io.BytesIO(archive)) as zf:
            self.assertEqual(sorted(zf.namelist()),
                             sorted([f"cupviewer_living_{first['id']}.png", f"cupviewer_living_{again['id']}.png"]))
        stranger = Client(self.server)
        stranger.signup("stranger@example.ru")
        self.assertEqual(stranger.call("GET", f"api/jobs/archive?ids={first['id']}", raw=True)[0], 404)
        status, spec = user.call("GET", f"api/jobs/{again['id']}/spec")
        self.assertEqual((status, spec["job"]["set"], spec["job"]["cups"][0]["rotate"]), (200, "living", 0.0))
        self.assertEqual(user.call("GET", spec["arts"][0], raw=True)[1], tiny_png())
        # Удалить выбранные: готовые — сразу, стоящее в очереди — с возвратом.
        self.admin.call("POST", f"api/admin/users/{uid}/grant", {"amount": 1, "note": "тест"})
        queued = self.submit(user)[1]
        paid_before = user.call("GET", "api/me")[1]["balance"]["paid"]
        status, res = user.call("POST", "api/jobs/delete", {"ids": [first["id"], queued["id"]]})
        self.assertEqual((status, res["removed"]), (200, 2))
        self.assertEqual(user.call("GET", "api/me")[1]["balance"]["paid"], paid_before + 1)
        # Макет больше 16384 px по стороне не принимается (исполнитель упал бы по памяти).
        body, ctype = multipart({"job": json.dumps(JOB), "size": "standard"},
                                {"art0": ("art.png", tiny_png(17000, 4), "image/png")})
        status, err = user.call("POST", "api/jobs", body, ctype)
        self.assertEqual((status, err["error"]), (413, "too_large"))

    def test_6_pad_print(self):
        # Тампопечать BM: print «pad» доходит до исполнителя (своя полоса у рендера);
        # у PET и бумаги такого варианта нет.
        user = Client(self.server)
        user.signup("pad@example.ru")
        job = {"set": "studio", "camera": {"preset": "front", "frame": "1:1"},
               "cups": [{"id": "BM90-410", "rotate": 0, "print": "pad"}]}
        body, ctype = multipart({"job": json.dumps(job), "size": "standard"}, {"art0": ("art.png", tiny_png(), "image/png")})
        status, made = user.call("POST", "api/jobs", body, ctype)
        self.assertEqual(status, 200, made)
        claim = self.worker.call("POST", "api/worker/claim")[1]
        self.assertEqual((claim["id"], claim["job"]["cups"][0]["print"]), (made["id"], "pad"))
        self.finish(claim["id"])
        for cup in ({"id": "PG95-400", "print": "pad"}, {"id": "HB80-280", "print": "pad"}):
            bad = dict(job, cups=[cup])
            body, ctype = multipart({"job": json.dumps(bad), "size": "standard"}, {})
            status, err = user.call("POST", "api/jobs", body, ctype)
            self.assertEqual((status, err["error"]), (400, "bad_print"), cup)

    def test_7_proof(self):
        # «Имитация картона» доходит до исполнителя; у крафта и пластика профиля нет.
        user = Client(self.server)
        user.signup("proof@example.ru")
        job = {"set": "studio", "camera": {"preset": "front", "frame": "1:1"},
               "cups": [{"id": "HB80-280", "rotate": 0, "board": "soft-touch", "proof": True}]}
        body, ctype = multipart({"job": json.dumps(job), "size": "standard"}, {"art0": ("art.png", tiny_png(), "image/png")})
        status, made = user.call("POST", "api/jobs", body, ctype)
        self.assertEqual(status, 200, made)
        claim = self.worker.call("POST", "api/worker/claim")[1]
        self.assertEqual((claim["id"], claim["job"]["cups"][0].get("proof")), (made["id"], True))
        self.finish(claim["id"])
        for cup in ({"id": "HB80-280", "board": "kraft", "proof": True}, {"id": "BM90-500", "proof": True}):
            bad = dict(job, cups=[cup])
            body, ctype = multipart({"job": json.dumps(bad), "size": "standard"}, {})
            status, err = user.call("POST", "api/jobs", body, ctype)
            self.assertEqual((status, err["error"]), (400, "bad_proof"), cup)


class Sweep(unittest.TestCase):
    """Уборка в том же процессе, на своей временной базе. Папка данных задаётся
    до первого импорта server.app — иначе config возьмёт рабочую базу."""

    @classmethod
    def setUpClass(cls):
        os.environ["CV_DATA"] = tempfile.mkdtemp(prefix="cv-sweep-")
        from server.app import config
        if not str(config.DATA).startswith(tempfile.gettempdir()):
            raise RuntimeError(f"тест открыл бы рабочую базу: {config.DATA}")

    def test_stale_attempts_and_queue_timeout(self):
        from server.app import config, db, jobs, tokens
        db.init()
        con = db.connect()
        con.execute("INSERT INTO users (email, created_at) VALUES ('s@example.ru', ?)", (db.stamp(),))
        user = con.execute("SELECT * FROM users").fetchone()
        tokens.add(con, user["id"], "paid", 5, "grant")
        spec = json.dumps({"set": "living", "camera": {"preset": "front", "frame": "1:1"}, "cups": [{"id": "HB80-280"}]})
        with db.tx() as tx:
            hung = jobs.enqueue(tx, user, "standard", spec, "queued", "тест")
            waiting = jobs.enqueue(tx, user, "standard", spec, "queued", "тест")
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

    def test_passwords(self):
        from server.app.security import check_password, hash_password
        stored = hash_password("верный пароль")
        self.assertTrue(stored.startswith("scrypt$"))
        self.assertTrue(check_password("верный пароль", stored))
        self.assertFalse(check_password("неверный", stored))
        self.assertFalse(check_password("верный пароль", None))
        self.assertNotEqual(stored, hash_password("верный пароль"))

    def test_tiers(self):
        # Уровни (владелец, 2026-09-27): Standard 2 токена, Ultra 5; старые кадры
        # по пикселям — те же уровни.
        from server.app import config
        self.assertEqual({t: (v["label"], v["price"]) for t, v in config.TIERS.items()},
                         {"standard": ("Standard", 2), "ultra": ("Ultra", 5)})
        self.assertEqual((config.tier_of("1600"), config.tier_of("3000"), config.tier_of("ultra")),
                         ("standard", "ultra", "ultra"))


if __name__ == "__main__":
    unittest.main()
