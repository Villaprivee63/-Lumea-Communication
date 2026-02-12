# Ouvre le site en local (serveur + navigateur)
# Double-cliquez sur ce fichier ou exécutez-le depuis le dossier du projet.

Set-Location $PSScriptRoot
$port = 8080
$url = "http://localhost:$port/fr/index.html"

Write-Host "Demarrage du serveur sur le port $port..."
Write-Host "Ouverture du site dans le navigateur : $url"
Write-Host "Pour arreter le serveur : fermez cette fenetre ou appuyez sur Ctrl+C"
Write-Host ""

# Ouvrir le navigateur après 1 seconde (le temps que le serveur démarre)
Start-Job -ScriptBlock {
    Start-Sleep -Seconds 1.5
    Start-Process $using:url
} | Out-Null

# Démarrer le serveur (bloquant)
py -m http.server $port
