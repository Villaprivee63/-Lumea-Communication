# Structure Internationale - Luméa Communication

## Architecture

```
lumea-communication.ch/
│
├── index.html (sélecteur de pays)
│
├── /ch/ (Suisse - Français)
│   ├── index.html
│   ├── consulting.html
│   ├── formation.html
│   ├── cybersecurite.html
│   ├── sites-branding.html
│   ├── blog.html
│   ├── contact.html
│   └── ...
│
├── /fr/ (France - Français)
│   ├── index.html
│   ├── consulting.html
│   ├── formation.html
│   ├── cybersecurite.html
│   ├── sites-branding.html
│   ├── blog.html
│   ├── contact.html
│   └── ...
│
├── /es/ (Espagne - Español)
│   ├── index.html
│   ├── consultoria.html
│   ├── formacion.html
│   ├── ciberseguridad.html
│   ├── sitios-branding.html
│   ├── blog.html
│   ├── contacto.html
│   └── ...
│
└── assets/ (mutualisé)
    ├── css/
    ├── js/
    └── img/
```

## Éléments à adapter par pays

### 1. Meta tags et SEO
- `lang` : fr-CH, fr-FR, es-ES
- `geo.region` : CH, FR, ES
- `og:locale` : fr_CH, fr_FR, es_ES
- URLs canoniques : `/ch/`, `/fr/`, `/es/`
- Hreflang sur toutes les pages

### 2. Contenus
- Textes traduits et adaptés
- Références locales (Suisse romande, France, Espagne)
- Devises : CHF, EUR
- TVA : 7.7% (CH), 20% (FR), 21% (ES)
- Numéros de téléphone locaux

### 3. Navigation
- Sélecteur de pays dans la navbar
- Liens internes pointant vers la bonne version
- Footer avec liens vers autres pays

### 4. Structured Data
- `addressCountry` : CH, FR, ES
- `areaServed` adapté
- `inLanguage` : fr-CH, fr-FR, es-ES

## Hreflang

Chaque page doit avoir :
```html
<link rel="alternate" hreflang="fr-CH" href="https://lumea.ch/ch/page.html">
<link rel="alternate" hreflang="fr-FR" href="https://lumea.ch/fr/page.html">
<link rel="alternate" hreflang="es-ES" href="https://lumea.ch/es/pagina.html">
<link rel="alternate" hreflang="x-default" href="https://lumea.ch/ch/page.html">
```

## Sélecteur de pays

À ajouter dans la navbar de chaque page :
```html
<div class="country-selector">
  <a href="/ch/" class="country-link">🇨🇭 CH</a>
  <a href="/fr/" class="country-link">🇫🇷 FR</a>
  <a href="/es/" class="country-link">🇪🇸 ES</a>
</div>
```

## Prochaines étapes

1. ✅ Page d'accueil racine créée (sélecteur de pays)
2. ⏳ Déplacer fichiers existants vers /ch/
3. ⏳ Créer versions /fr/ (traduction française)
4. ⏳ Créer versions /es/ (traduction espagnole)
5. ⏳ Ajouter hreflang sur toutes les pages
6. ⏳ Ajouter sélecteur de pays dans navigation
7. ⏳ Mettre à jour sitemap.xml
8. ⏳ Mettre à jour robots.txt
