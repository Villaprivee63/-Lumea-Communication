# Serveur local pour prévisualiser le site (depuis le dossier du script)
Set-Location $PSScriptRoot
$port = 8080
Write-Host "Demarrage du serveur sur http://localhost:$port"
Write-Host "Page FR: http://localhost:$port/fr/index.html"
Write-Host "Arreter avec Ctrl+C"
if (Get-Command py -ErrorAction SilentlyContinue) {
    py -m http.server $port
} elseif (Get-Command python -ErrorAction SilentlyContinue) {
    python -m http.server $port
} else {
    Write-Host "Python non trouve. Installez Python ou utilisez l'extension Live Server."
    exit 1
}
