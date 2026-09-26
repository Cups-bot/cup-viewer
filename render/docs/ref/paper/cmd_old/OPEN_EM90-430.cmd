@echo off
start "" "C:\Program Files\Blender Foundation\Blender 5.2\blender.exe" "%~dp0output\production\EM90-430\EM90-430.blend" --python "%~dp0work\open_project.py"
