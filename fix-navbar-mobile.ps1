# Script pour corriger la navbar mobile - Déplacer navbar-toggle dans nav-left
# Pour tous les fichiers HTML dans ch/, fr/, es/

$files = Get-ChildItem -Path "." -Filter "*.html" -Recurse | Where-Object {
    $_.FullName -match "\\ch\\|\\fr\\|\\es\\" -and 
    $_.FullName -notmatch "node_modules"
}

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $originalContent = $content
    
    # Pattern 1: nav-left vide, puis nav-right avec navbar-toggle à la fin (avec country-selector)
    if ($content -match '(?s)(<div class="nav-left"></div>.*?<div class="nav-right">.*?)(<button class="navbar-toggle"[^>]*>☰</button>\s*</div>\s*</div>\s*</nav>)') {
        $beforeNavRight = $matches[1]
        $afterNavRight = $matches[2]
        
        # Extraire le bouton navbar-toggle
        if ($beforeNavRight -match '(<button class="navbar-toggle"[^>]*>☰</button>)') {
            $toggleButton = $matches[1]
            $beforeNavRightWithoutToggle = $beforeNavRight -replace [regex]::Escape($toggleButton), ""
            $beforeNavRightWithoutToggle = $beforeNavRightWithoutToggle -replace '\s+</div>\s*$', ""
            
            # Nouveau contenu
            $newContent = $content -replace [regex]::Escape('<div class="nav-left"></div>'), "<div class=`"nav-left`">`n        $toggleButton`n      </div>"
            $newContent = $newContent -replace [regex]::Escape($toggleButton), "", 1
            
            if ($newContent -ne $originalContent) {
                Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8 -NoNewline
                Write-Host "Updated: $($file.FullName)"
            }
        }
    }
    # Pattern 2: nav-left vide, puis nav-right avec navbar-toggle (sans country-selector)
    elseif ($content -match '(?s)(<div class="nav-left"></div>.*?<div class="nav-right">.*?<a href="[^"]*" class="btn btn-primary navbar-cta">[^<]*</a>\s*)(<button class="navbar-toggle"[^>]*>☰</button>)') {
        $beforeToggle = $matches[1]
        $toggleButton = $matches[2]
        
        $newContent = $content -replace [regex]::Escape('<div class="nav-left"></div>'), "<div class=`"nav-left`">`n        $toggleButton`n      </div>"
        $newContent = $newContent -replace [regex]::Escape($toggleButton), "", 1
        
        if ($newContent -ne $originalContent) {
            Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8 -NoNewline
            Write-Host "Updated: $($file.FullName)"
        }
    }
}

Write-Host "Done!"
