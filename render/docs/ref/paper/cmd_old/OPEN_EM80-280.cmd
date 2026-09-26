@echo off
start "" "C:\Program Files\Blender Foundation\Blender 5.2\blender.exe" "%~dp0output\production\EM80-280\EM80-280.blend" --python "%~dp0work\open_project.py"
