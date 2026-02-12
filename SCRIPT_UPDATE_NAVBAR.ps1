# Script pour mettre à jour tous les fichiers HTML - Déplacer navbar-toggle dans nav-left
# Pour tous les fichiers dans ch/, fr/, es/

$basePath = "c:\Luméa\Sites luméa\Lumea Communication"

# Trouver tous les fichiers HTML dans ch/, fr/, es/
$files = Get-ChildItem -Path $basePath -Filter "*.html" -Recurse | Where-Object {
    ($_.FullName -match "\\ch\\|\\fr\\|\\es\\") -and 
    ($_.FullName -notmatch "node_modules|\.git")
}

$updatedCount = 0

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $originalContent = $content
    
    # Vérifier si le fichier a nav-left vide ET navbar-toggle dans nav-right
    if ($content -match '<div class="nav-left"></div>' -and $content -match '<button class="navbar-toggle"[^>]*>☰</button>') {
        # Extraire le bouton navbar-toggle avec son aria-label
        if ($content -match '(<button class="navbar-toggle"[^>]*>☰</button>)') {
            $toggleButton = $matches[1]
            
            # Remplacer nav-left vide par nav-left avec le bouton
            $newContent = $content -replace '<div class="nav-left"></div>', "<div class=`"nav-left`">`n        $toggleButton`n      </div>"
            
            # Supprimer le bouton de nav-right (première occurrence seulement)
            $newContent = $newContent -replace [regex]::Escape($toggleButton), "", 1
            
            if ($newContent -ne $originalContent) {
                Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8 -NoNewline
                Write-Host "✓ Mis à jour: $($file.Name)"
                $updatedCount++
            }
        }
    }
}

Write-Host "`nTotal de fichiers mis à jour: $updatedCount"
