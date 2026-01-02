# Script pour ouvrir index.html dans le navigateur
$filePath = Join-Path $PSScriptRoot "index.html"
if (Test-Path $filePath) {
    Start-Process $filePath
    Write-Host "Ouverture de $filePath dans le navigateur..."
} else {
    Write-Host "Erreur: Le fichier index.html n'a pas été trouvé dans $PSScriptRoot"
}
