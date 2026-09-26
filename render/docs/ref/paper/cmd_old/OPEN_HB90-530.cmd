@echo off
start "" "C:\Program Files\Blender Foundation\Blender 5.2\blender.exe" "%~dp0output\production\HB90-530\HB90-530.blend" --python "%~dp0work\open_project.py"
