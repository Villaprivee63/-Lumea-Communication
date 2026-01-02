# Script PowerShell pour uploader vers GitHub
# Exécutez ce script dans PowerShell depuis le dossier "Lumea Communication"

Write-Host "Initialisation du repository Git..." -ForegroundColor Green
git init

Write-Host "Ajout de tous les fichiers..." -ForegroundColor Green
git add .

Write-Host "Création du commit initial..." -ForegroundColor Green
git commit -m "Initial commit - Site Luméa Communication"

Write-Host "Configuration de la branche main..." -ForegroundColor Green
git branch -M main

Write-Host "Ajout du remote GitHub..." -ForegroundColor Green
git remote add origin https://github.com/Villaprivee63/-Lumea-Communication.git

Write-Host "Upload vers GitHub..." -ForegroundColor Green
git push -u origin main

Write-Host "Terminé ! Vos fichiers sont maintenant sur GitHub." -ForegroundColor Green
