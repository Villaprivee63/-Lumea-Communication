@echo off
cd /d "%~dp0"
title Serveur local - Ne pas fermer
where py >nul 2>nul && set "PYCMD=py" || set "PYCMD=python"
%PYCMD% serve.py
pause
