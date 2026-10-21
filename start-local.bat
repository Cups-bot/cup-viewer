@echo off
chcp 65001 >nul
setlocal
rem ─────────────────────────────────────────────────────────────────────────
rem  CupViewer (лёгкая версия) локально — всё одним запуском, каждое в своём окне:
rem    сервер: сайт и рендер без входа и токенов   http://127.0.0.1:8000
rem    исполнитель рендера: Blender, кадр 2000 px на сером фотофоне
rem
rem    start-local.bat            собрать сайт и запустить (что уже работает — не дублирует)
rem    start-local.bat stop       остановить всё запущенное этим файлом
rem    start-local.bat noworker   без исполнителя рендера
rem    start-local.bat dev        и сборка в режиме наблюдения: правки JS и CSS
rem                               сразу в dist (отладочная сборка — перед
rem                               коммитом npm run build)
rem
rem  Кадр по умолчанию — полное качество (~5-6 мин на ноутбуке). Быстрый черновик:
rem    set CV_WORKER_PROFILE=draft  и затем start-local.bat
rem ─────────────────────────────────────────────────────────────────────────
cd /d "%~dp0"

rem Свои процессы узнаём по командной строке: так работает и в Windows
rem Terminal, где заголовков окон cmd.exe не видно.
set "MATCH_SERVER=server\\run\.py"
set "MATCH_WATCH=build\.mjs --watch|npm run watch"
set "MATCH_WORKER=server\\worker\.py"

if /i "%~1"=="stop" goto stop

set "PY=server\.venv\Scripts\python.exe"
if "%CV_PORT%"=="" set "CV_PORT=8000"
if "%CV_WORKER_PROFILE%"=="" set "CV_WORKER_PROFILE=laptop"
if "%CV_BLENDER%"=="" set "CV_BLENDER=C:\Program Files\Blender Foundation\Blender 5.2\blender.exe"
set "URL=http://127.0.0.1:%CV_PORT%/"
rem Исполнитель ходит на этот же сервер.
if "%CV_SERVER%"=="" set "CV_SERVER=%URL%"

echo.
echo  CupViewer — лёгкая версия, локальный запуск
echo  ────────────────────────────

where node >nul 2>nul || (echo  [!] Нет Node.js — поставьте с nodejs.org и запустите снова. & goto fail)

rem ── один раз: библиотеки ────────────────────────────────────────────────
if not exist "node_modules\.bin\esbuild.cmd" (
  echo  • Первый запуск: ставлю библиотеки сайта…
  call npm install || goto fail
)
if not exist "%PY%" (
  where python >nul 2>nul || (echo  [!] Нет Python — поставьте 3.11+ с python.org и запустите снова. & goto fail)
  echo  • Первый запуск: окружение сервера…
  python -m venv server\.venv || goto fail
  "%PY%" -m pip install -q -r server\requirements.txt || goto fail
)

rem ── сборка ─────────────────────────────────────────────────────────────
echo  • Сборка сайта…
call npm run build >nul 2>&1 || (echo  [!] Сборка не прошла — подробности: npm run build & goto fail)

rem ── сервер ─────────────────────────────────────────────────────────────
netstat -ano | findstr /r /c:":%CV_PORT% .*LISTENING" >nul
if errorlevel 1 (
  echo  • Сервер…
  start "CupViewer server" cmd /k ""%PY%" server\run.py"
) else (
  echo  • Порт %CV_PORT% уже занят — сервер работает, второй не запускаю.
)

rem Ждём ответа сервера (до 40 с): исполнителю нужен его ключ.
set /a N=0
:wait
curl -s -o nul "%URL%index.html" && goto up
set /a N+=1
if %N% geq 40 (echo  [!] Сервер не ответил за 40 с — смотрите окно «CupViewer server». & goto fail)
ping -n 2 127.0.0.1 >nul
goto wait
:up

rem ── сборка в режиме наблюдения — только для правки кода ────────────────
if /i not "%~1"=="dev" goto worker
call :running "%MATCH_WATCH%"
if errorlevel 1 (
  echo  • Сборка в режиме наблюдения…
  start "CupViewer watch" /min cmd /k "npm run watch"
)

rem ── исполнитель рендера ────────────────────────────────────────────────
:worker
if /i "%~1"=="noworker" goto open
if not exist "%CV_BLENDER%" (
  echo  • Blender не найден ^(%CV_BLENDER%^) — рендер не запускаю; путь задаёт CV_BLENDER.
  goto open
)
call :running "%MATCH_WORKER%"
if errorlevel 1 (
  echo  • Исполнитель рендера, профиль %CV_WORKER_PROFILE%…
  start "CupViewer worker" /min /belownormal cmd /k ""%PY%" server\worker.py"
) else (
  echo  • Исполнитель рендера уже работает.
)

:open
echo.
echo  Готово: %URL%
echo    кнопка «Рендер» — кадр считает Blender в окне «CupViewer worker»
echo    остановить всё — start-local.bat stop
echo.
if not defined CV_NO_OPEN start "" "%URL%"
endlocal
exit /b 0

rem Есть ли процесс node/python/cmd с такой командной строкой: 0 — есть.
:running
powershell -NoProfile -Command "$p = Get-CimInstance Win32_Process | Where-Object { $_.Name -in 'node.exe','python.exe' -and $_.CommandLine -match '%~1' }; if ($p) { exit 0 } else { exit 1 }"
exit /b %errorlevel%

:stop
echo  Останавливаю CupViewer…
rem Окна cmd с этими командами — вместе со всем деревом (python, node, Blender).
powershell -NoProfile -Command "Get-CimInstance Win32_Process | Where-Object { $_.Name -in 'cmd.exe','node.exe','python.exe' -and $_.CommandLine -match '%MATCH_SERVER%|%MATCH_WATCH%|%MATCH_WORKER%' } | ForEach-Object { taskkill /pid $_.ProcessId /t /f 2>$null | Out-Null }"
echo  Готово.
endlocal
exit /b 0

:fail
echo.
pause
endlocal
exit /b 1
