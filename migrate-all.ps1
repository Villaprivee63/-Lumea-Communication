# Script PowerShell pour migrer tous les fichiers HTML vers /ch/, /fr/, /es/

$files = @(
    "formation.html",
    "cybersecurite.html",
    "sites-branding.html",
    "blog.html",
    "article.html",
    "contact.html",
    "mentions-legales.html",
    "confidentialite.html",
    "cookies.html",
    "404.html"
)

# Créer les dossiers si nécessaire
if (-not (Test-Path "ch")) { New-Item -ItemType Directory -Path "ch" }
if (-not (Test-Path "fr")) { New-Item -ItemType Directory -Path "fr" }
if (-not (Test-Path "es")) { New-Item -ItemType Directory -Path "es" }

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "Traitement de $file..."
        
        # Lire le contenu
        $content = Get-Content $file -Raw -Encoding UTF8
        
        # Version CH - Corriger les chemins assets
        $contentCH = $content -replace 'href="assets/', 'href="../assets/'
        $contentCH = $contentCH -replace 'src="assets/', 'src="../assets/'
        $contentCH = $contentCH -replace "url\('assets/", "url('../assets/"
        $contentCH = $contentCH -replace 'url\("assets/', 'url("../assets/'
        $contentCH = $contentCH -replace '<link rel="canonical" href="https://lumea\.ch/([^"]+)"', '<link rel="canonical" href="https://lumea.ch/ch/' + $file + '"'
        
        # Ajouter hreflang
        $hreflang = @"
  
  <!-- Hreflang -->
  <link rel="alternate" hreflang="fr-CH" href="https://lumea.ch/ch/$file">
  <link rel="alternate" hreflang="fr-FR" href="https://lumea.ch/fr/$file">
  <link rel="alternate" hreflang="es-ES" href="https://lumea.ch/es/$file">
  <link rel="alternate" hreflang="x-default" href="https://lumea.ch/ch/$file">
"@
        $contentCH = $contentCH -replace '(<link rel="canonical"[^>]+>)', "`$1$hreflang"
        
        # Ajouter sélecteur de pays dans navbar
        $countrySelector = @'
        <div class="country-selector-nav" style="display: flex; gap: 0.5rem; align-items: center; margin-left: 1rem;">
          <a href="/ch/" class="country-link active" title="Suisse" style="font-size: 1.5rem; text-decoration: none; opacity: 1; border-bottom: 2px solid var(--color-accent-blue);">🇨🇭</a>
          <a href="/fr/" class="country-link" title="France" style="font-size: 1.5rem; text-decoration: none; opacity: 0.7; transition: opacity 0.3s;">🇫🇷</a>
          <a href="/es/" class="country-link" title="España" style="font-size: 1.5rem; text-decoration: none; opacity: 0.7; transition: opacity 0.3s;">🇪🇸</a>
        </div>
'@
        $contentCH = $contentCH -replace '(<div class="nav-right">[\s\S]*?</div>)', "`$1$countrySelector"
        
        # Écrire version CH
        $contentCH | Out-File -FilePath "ch\$file" -Encoding UTF8 -NoNewline
        Write-Host "  ✓ Créé ch\$file"
        
        # Version FR - Adaptations pour France
        $contentFR = $contentCH -replace 'lang="fr-CH"', 'lang="fr-FR"'
        $contentFR = $contentFR -replace 'geo\.region" content="CH"', 'geo.region" content="FR"'
        $contentFR = $contentFR -replace 'og:locale" content="fr_CH"', 'og:locale" content="fr_FR"'
        $contentFR = $contentFR -replace 'Suisse romande', 'France'
        $contentFR = $contentFR -replace 'PME suisses', 'PME françaises'
        $contentFR = $contentFR -replace 'PME suisse', 'PME française'
        $contentFR = $contentFR -replace 'pour dirigeants et PME suisses', 'pour dirigeants et PME françaises'
        $contentFR = $contentFR -replace 'Luméa Communication – Suisse', 'Luméa Communication – France'
        $contentFR = $contentFR -replace 'en Suisse romande', 'en France'
        $contentFR = $contentFR -replace 'Suisse', 'France'
        $contentFR = $contentFR -replace '/ch/', '/fr/'
        $contentFR = $contentFR -replace 'hreflang="fr-CH" href="https://lumea\.ch/ch/', 'hreflang="fr-CH" href="https://lumea.ch/ch/'
        $contentFR = $contentFR -replace 'hreflang="fr-FR" href="https://lumea\.ch/fr/', 'hreflang="fr-FR" href="https://lumea.ch/fr/'
        $contentFR = $contentFR -replace 'country-link active" title="Suisse"', 'country-link" title="Suisse"'
        $contentFR = $contentFR -replace 'country-link" title="France"', 'country-link active" title="France"'
        $contentFR = $contentFR -replace 'opacity: 1; border-bottom: 2px solid', 'opacity: 0.7'
        $contentFR = $contentFR -replace 'opacity: 0.7.*?title="France"', 'opacity: 1; border-bottom: 2px solid var(--color-accent-blue);" title="France"'
        
        # Écrire version FR
        $contentFR | Out-File -FilePath "fr\$file" -Encoding UTF8 -NoNewline
        Write-Host "  ✓ Créé fr\$file"
        
        # Version ES - Adaptations de base (traductions à compléter manuellement)
        $contentES = $contentCH -replace 'lang="fr-CH"', 'lang="es-ES"'
        $contentES = $contentES -replace 'geo\.region" content="CH"', 'geo.region" content="ES"'
        $contentES = $contentES -replace 'og:locale" content="fr_CH"', 'og:locale" content="es_ES"'
        $contentES = $contentES -replace '/ch/', '/es/'
        $contentES = $contentES -replace 'hreflang="es-ES" href="https://lumea\.ch/es/', 'hreflang="es-ES" href="https://lumea.ch/es/'
        $contentES = $contentES -replace 'country-link active" title="Suisse"', 'country-link" title="Suisse"'
        $contentES = $contentES -replace 'country-link" title="España"', 'country-link active" title="España"'
        $contentES = $contentES -replace 'opacity: 1; border-bottom: 2px solid', 'opacity: 0.7'
        $contentES = $contentES -replace 'opacity: 0.7.*?title="España"', 'opacity: 1; border-bottom: 2px solid var(--color-accent-blue);" title="España"'
        
        # Écrire version ES
        $contentES | Out-File -FilePath "es\$file" -Encoding UTF8 -NoNewline
        Write-Host "  ✓ Créé es\$file"
    }
}

Write-Host "`n✅ Migration terminée !"
Write-Host "⚠️  Les traductions espagnoles doivent être complétées manuellement."
