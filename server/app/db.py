"""База SQLite: схема и соединение. Локально — файл в server/data, на сервере
(этап Ж) — PostgreSQL; запросы держим простыми, без особенностей SQLite."""

import sqlite3
import threading
from datetime import datetime, timedelta, timezone

from . import config

SCHEMA = """
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  is_admin INTEGER NOT NULL DEFAULT 0,
  welcome_expires_at TEXT,
  created_ip TEXT,
  created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS login_codes (
  id INTEGER PRIMARY KEY,
  email TEXT NOT NULL,
  code_hash TEXT NOT NULL,
  attempts INTEGER NOT NULL DEFAULT 0,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS sessions (
  token_hash TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL
);
-- Журнал токенов: баланс — сумма. bucket: paid (купленные, не сгорают) или
-- welcome (приветственные, 30 дней). Резерв при постановке в очередь уже и
-- есть списание; при сбое — возврат той же суммы в тот же кошелёк.
CREATE TABLE IF NOT EXISTS token_ops (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  bucket TEXT NOT NULL,
  amount INTEGER NOT NULL,
  kind TEXT NOT NULL,
  job_id INTEGER,
  payment_id INTEGER,
  note TEXT,
  created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS jobs (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  status TEXT NOT NULL,
  size TEXT NOT NULL,
  cost INTEGER NOT NULL,
  bucket TEXT NOT NULL,
  priority INTEGER NOT NULL,
  job_json TEXT NOT NULL,
  worker TEXT,
  heartbeat_at TEXT,
  started_at TEXT,
  finished_at TEXT,
  duration_s REAL,
  error TEXT,
  marked INTEGER NOT NULL DEFAULT 0,
  seen INTEGER NOT NULL DEFAULT 0,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS jobs_queue ON jobs (status, priority, id);
CREATE INDEX IF NOT EXISTS jobs_user ON jobs (user_id, id);
CREATE TABLE IF NOT EXISTS payments (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  tokens INTEGER NOT NULL,
  amount_rub INTEGER NOT NULL,
  status TEXT NOT NULL,
  paid_at TEXT,
  created_at TEXT NOT NULL
);
"""

_local = threading.local()


def now() -> datetime:
    return datetime.now(timezone.utc)


def iso(dt: datetime) -> str:
    return dt.astimezone(timezone.utc).isoformat(timespec="seconds")


def stamp(days: float = 0, minutes: float = 0) -> str:
    return iso(now() + timedelta(days=days, minutes=minutes))


def parse(value: str) -> datetime:
    return datetime.fromisoformat(value)


def connect() -> sqlite3.Connection:
    """Соединение на поток: sqlite3 не любит делиться им между потоками."""
    con = getattr(_local, "con", None)
    if con is None:
        config.DATA.mkdir(parents=True, exist_ok=True)
        con = sqlite3.connect(config.DB_PATH, timeout=15, isolation_level=None)
        con.row_factory = sqlite3.Row
        con.execute("PRAGMA journal_mode=WAL")
        con.execute("PRAGMA foreign_keys=ON")
        _local.con = con
    return con


def init() -> None:
    connect().executescript(SCHEMA)


class tx:
    """Транзакция: BEGIN IMMEDIATE — чтобы резерв токенов не шёл вперегонки."""

    def __enter__(self) -> sqlite3.Connection:
        self.con = connect()
        self.con.execute("BEGIN IMMEDIATE")
        return self.con

    def __exit__(self, kind, value, trace) -> None:
        self.con.execute("COMMIT" if kind is None else "ROLLBACK")
