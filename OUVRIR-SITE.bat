@echo off
cd /d "%~dp0"
title Lumea - Ouverture du site

echo.
echo  ========================================
echo   Lumea Communication - Ouverture du site
echo  ========================================
echo.

start "Serveur Lumea" cmd /k "call ^"%~dp0DEMARRER-SERVEUR.bat^""

echo  Demarrage du serveur...
timeout /t 3 /nobreak >nul

echo  Ouverture du site dans le navigateur...
start "" "http://127.0.0.1:8080/fr/index.html"

echo.
echo  Le site doit s'ouvrir. Ne fermez pas la fenetre Serveur Lumea.
echo.
pause
