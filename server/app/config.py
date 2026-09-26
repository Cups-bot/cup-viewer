"""Настройки сервера CupViewer v2 (этапы Г–Е, концепция docs/CONCEPT-v2.md).

Всё, что зависит от места запуска, — из переменных окружения: локально хватает
значений по умолчанию, на сервере (этап Ж) их задаёт окружение.
"""

import os
from pathlib import Path

REPO = Path(__file__).resolve().parents[2]
DATA = Path(os.environ.get("CV_DATA", REPO / "server" / "data")).resolve()
DB_PATH = DATA / "cupviewer.sqlite3"
FILES = DATA / "files"
WORKER_KEY_FILE = DATA / "worker.key"

HOST = os.environ.get("CV_HOST", "127.0.0.1")
PORT = int(os.environ.get("CV_PORT", "8000"))

# Администраторы — по почте (владелец, 2026-09-26).
ADMIN_EMAILS = {e.strip().lower() for e in os.environ.get("CV_ADMINS", "danilkakhudia@gmail.com").split(",") if e.strip()}

# Токены (§3–§4 концепции): цена кадра по размеру, «Убрать знак», приветственные.
PRICES = {"1600": 1, "3000": 3}
UNMARK_PRICE = 1
WELCOME_TOKENS = 3
WELCOME_DAYS = 30
# Пакеты токенов (§5). Цены — заглушка до замера себестоимости (§9).
PACKS = {10: 490, 30: 1290, 100: 3900}

# Хранение (§10): макеты, кадры и ссылки живут 30 дней.
RETENTION_DAYS = 30

# Вход (§6): код из 6 цифр, живёт 10 минут, 5 попыток; не чаще 5 кодов в час
# на почту; не больше 5 новых аккаунтов с одного адреса в сутки.
CODE_TTL_MIN = 10
CODE_ATTEMPTS = 5
CODES_PER_HOUR = 5
ACCOUNTS_PER_IP_DAY = 5
SESSION_DAYS = 30
DISPOSABLE_DOMAINS = {
    "mailinator.com", "yopmail.com", "10minutemail.com", "guerrillamail.com", "sharklasers.com",
    "tempmail.com", "temp-mail.org", "trashmail.com", "getnada.com", "dispostable.com",
    "maildrop.cc", "mohmal.com", "fakeinbox.com", "throwawaymail.com", "emailondeck.com",
}

# Очередь (§9): у бесплатных — одно задание в очереди; зависшее у исполнителя
# (нет вестей 10 минут) возвращается в очередь.
FREE_ACTIVE_JOBS = 1
STALE_MINUTES = 10

# Размер загрузок: макет до 50 МБ (владелец, 2026-09-25), кадр от исполнителя — до 80 МБ.
MAX_ART_BYTES = 50 * 1024 * 1024
MAX_IMAGE_BYTES = 80 * 1024 * 1024

# Что сервер отдаёт как сайт: только страницы и их папки, не весь репозиторий
# (там render/, server/data/, .git).
PUBLIC_FILES = {"index.html", "view.html", "admin.html"}
PUBLIC_DIRS = {"dist", "css", "js", "assets", "catalog"}
