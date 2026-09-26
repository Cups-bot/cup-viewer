@echo off
chcp 866 >nul
setlocal enabledelayedexpansion
set PYTHONIOENCODING=cp866
title Мокап стакана

rem ---------------------------------------------------------------------
rem  Съёмка мокапа. Двойной щелчок - и дальше по вопросам.
rem  Всё, что тут спрашивается, есть и ключами командной строки:
rem      mockup\run.py --set living --cup 650 --print rect --render
rem ---------------------------------------------------------------------

set "BLENDER="
for /d %%D in ("C:\Program Files\Blender Foundation\Blender*") do if exist "%%D\blender.exe" set "BLENDER=%%D\blender.exe"
if not defined BLENDER (
  echo Blender не найден в Program Files.
  echo Установите Blender или пропишите путь в этом файле.
  pause
  exit /b 2
)

echo.
echo ==========================================
echo   МОКАП СТАКАНА
echo ==========================================
echo.
echo  ФОН
echo    1  studio     серый фотобокс
echo    2  living     гостиная
echo    3  water      вода
echo    4  podium     подиум
echo    5  spotlight  тёмная студия
echo    6  window     городской подоконник
echo    7  cream      кремовые формы
echo    8  ice        лёд
echo    0  все фоны подряд
echo.
set "SET_NAME=studio"
set "ALL="
set /p "S=Фон [1]: "
if "%S%"=="2" set "SET_NAME=living"
if "%S%"=="3" set "SET_NAME=water"
if "%S%"=="4" set "SET_NAME=podium"
if "%S%"=="5" set "SET_NAME=spotlight"
if "%S%"=="6" set "SET_NAME=window"
if "%S%"=="7" set "SET_NAME=cream"
if "%S%"=="8" set "SET_NAME=ice"
if "%S%"=="0" set "ALL=1"

echo.
echo  ОБЪЁМ    1) 410 мл   2) 500 мл   3) 650 мл
set "CUP=500"
set /p "C=Объём [2]: "
if "%C%"=="1" set "CUP=410"
if "%C%"=="3" set "CUP=650"

echo.
echo  ПЕЧАТЬ   1) чистый стакан   2) прямоугольный макет   3) полная запечатка
set "PRINT=rect"
set /p "P=Печать [2]: "
if "%P%"=="1" set "PRINT=none"
if "%P%"=="3" set "PRINT=cone"

echo.
echo  КАЧЕСТВО 1) черновик 700/64   2) рабочее 1200/200   3) финал 1600/450
set "SAMPLES=450"
set "RES=1600"
set /p "Q=Качество [3]: "
if "%Q%"=="1" ( set "SAMPLES=64"  & set "RES=700" )
if "%Q%"=="2" ( set "SAMPLES=200" & set "RES=1200" )

echo.
if defined ALL (
  echo Считаю все фоны: стакан %CUP% мл, печать %PRINT%, %RES% px / %SAMPLES% сэмплов
  "%BLENDER%" -b --factory-startup --python-exit-code 1 -P "%~dp0mockup\run.py" -- --all --cup %CUP% --print %PRINT% --samples %SAMPLES% --resolution %RES% --render
) else (
  echo Считаю: %SET_NAME%, стакан %CUP% мл, печать %PRINT%, %RES% px / %SAMPLES% сэмплов
  "%BLENDER%" -b --factory-startup --python-exit-code 1 -P "%~dp0mockup\run.py" -- --set %SET_NAME% --cup %CUP% --print %PRINT% --samples %SAMPLES% --resolution %RES% --render
)

set "CODE=%ERRORLEVEL%"
echo.
if "%CODE%"=="0" (
  echo Готово. Кадры и файлы сцен лежат в mockup\out
  rem Обзорная страница: сначала пробуем py, потом python. Обе строки
  rem безопасны: неудачная просто ничего не делает.
  py -3.11 "%~dp0mockup\tools\make_contact_sheet.py" >nul 2>&1
  python "%~dp0mockup\tools\make_contact_sheet.py" >nul 2>&1
  if exist "%~dp0mockup\out\ОБЗОР.html" (
    start "" "%~dp0mockup\out\ОБЗОР.html"
  ) else (
    start "" "%~dp0mockup\out"
  )
) else (
  echo Не собралось, код %CODE%. Сообщение об ошибке выше.
)
pause
