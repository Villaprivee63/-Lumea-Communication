# A exécuter UNE FOIS depuis l'Explorateur (double-clic) pour créer C:\lumea-project
# Ensuite le serveur pourra etre lance depuis Cursor sans probleme d'accents.
$target = $PSScriptRoot
$link = "C:\lumea-project"
if (Test-Path $link) {
    Write-Host "Le raccourci $link existe deja."
} else {
    cmd /c mklink /J $link "$target"
    Write-Host "Raccourci cree : $link -> $target"
}
Write-Host "Vous pouvez fermer cette fenetre."
