# Script pour corriger la navbar mobile - Déplacer navbar-toggle de nav-right vers nav-left
# Sur mobile : header (hamburger) à gauche, contactar au milieu, langues à droite

$htmlFiles = Get-ChildItem -Path . -Filter "*.html" -Recurse | Where-Object { 
    $_.FullName -notmatch "node_modules|\.git|TEMPLATE_EMAIL" 
}

$fixedCount = 0
$skippedCount = 0

foreach ($file in $htmlFiles) {
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    $originalContent = $content
    $modified = $false
    
    # Pattern 1: nav-left vide, navbar-toggle dans nav-right (avec country-selector)
    if ($content -match '(?s)(<div class="nav-left"></div>.*?<div class="nav-right">.*?)(<button class="navbar-toggle"[^>]*>☰</button>\s*</div>)') {
        $toggleButton = $matches[2]
        
        # Extraire le texte du bouton avec ses attributs
        if ($toggleButton -match '(<button class="navbar-toggle"[^>]*>☰</button>)') {
            $buttonHtml = $matches[1]
            
            # Déterminer l'aria-label selon la langue
            $ariaLabel = "Menu mobile"
            if ($content -match 'Menú móvil') {
                $ariaLabel = "Menú móvil"
            } elseif ($content -match 'Menu mobile') {
                $ariaLabel = "Menu mobile"
            }
            
            # Créer le bouton avec le bon aria-label
            if ($buttonHtml -match 'aria-label="([^"]*)"') {
                $ariaLabel = $matches[1]
            }
            
            $newButton = "        <button class=`"navbar-toggle`" aria-label=`"$ariaLabel`" aria-expanded=`"false`">☰</button>"
            
            # Retirer le bouton de nav-right
            $content = $content -replace [regex]::Escape($toggleButton), ""
            
            # Ajouter le bouton dans nav-left
            $content = $content -replace [regex]::Escape('<div class="nav-left"></div>'), "<div class=`"nav-left`">`n$newButton`n      </div>"
            
            $modified = $true
        }
    }
    # Pattern 2: nav-left vide, navbar-toggle dans nav-right (sans country-selector, juste après navbar-cta)
    elseif ($content -match '(?s)(<div class="nav-left"></div>.*?<div class="nav-right">.*?<a href="[^"]*" class="btn btn-primary navbar-cta">[^<]*</a>\s*)(<button class="navbar-toggle"[^>]*>☰</button>)') {
        $toggleButton = $matches[2]
        
        if ($toggleButton -match '(<button class="navbar-toggle"[^>]*>☰</button>)') {
            $buttonHtml = $matches[1]
            
            # Déterminer l'aria-label
            $ariaLabel = "Menu mobile"
            if ($buttonHtml -match 'aria-label="([^"]*)"') {
                $ariaLabel = $matches[1]
            }
            
            $newButton = "        <button class=`"navbar-toggle`" aria-label=`"$ariaLabel`" aria-expanded=`"false`">☰</button>"
            
            # Retirer le bouton de nav-right
            $content = $content -replace [regex]::Escape($toggleButton), ""
            
            # Ajouter le bouton dans nav-left
            $content = $content -replace [regex]::Escape('<div class="nav-left"></div>'), "<div class=`"nav-left`">`n$newButton`n      </div>"
            
            $modified = $true
        }
    }
    
    if ($modified) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        Write-Host "✅ Corrigé: $($file.FullName)" -ForegroundColor Green
        $fixedCount++
    } else {
        $skippedCount++
    }
}

Write-Host "`n📊 Résumé:" -ForegroundColor Cyan
Write-Host "   Fichiers corrigés: $fixedCount" -ForegroundColor Green
Write-Host "   Fichiers ignorés: $skippedCount" -ForegroundColor Yellow
