"""Запуск сервера CupViewer: server/.venv/Scripts/python -m server (из корня репозитория)."""

import logging

import uvicorn

from server.app import config

logging.basicConfig(level=logging.WARNING, format="%(asctime)s %(message)s")
uvicorn.run("server.app.main:app", host=config.HOST, port=config.PORT, log_level="warning")
