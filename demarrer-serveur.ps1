# Démarre uniquement le serveur local (pour utiliser le navigateur intégré Cursor)
# Double-cliquez sur ce fichier dans l'Explorateur Windows, puis dans Cursor :
# Ctrl+Shift+P > Simple Browser: Show > http://localhost:8080/fr/index.html

Set-Location $PSScriptRoot
$port = 8080
Write-Host "=============================================="
Write-Host "  Serveur demarre sur http://localhost:$port"
Write-Host "  Page FR : http://localhost:$port/fr/index.html"
Write-Host "=============================================="
Write-Host "Dans Cursor : Ctrl+Shift+P > Simple Browser: Show"
Write-Host "Collez l'URL ci-dessus dans le Simple Browser."
Write-Host "Arreter le serveur : fermez cette fenetre (Ctrl+C)"
Write-Host ""
py -m http.server $port
