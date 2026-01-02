# Guide de Migration vers Structure Internationale

## ✅ Ce qui a été fait

1. **Page d'accueil racine** (`index.html`) - Sélecteur de pays créé
2. **Script de sélection de langue** (`assets/js/language-selector.js`) - Gestion automatique
3. **Documentation** (`STRUCTURE_INTERNATIONALE.md`) - Architecture détaillée

## 📋 À faire

### Étape 1 : Créer les dossiers
```bash
# Les dossiers ch/, fr/, es/ doivent être créés à la racine
```

### Étape 2 : Déplacer les fichiers existants vers /ch/

Tous les fichiers HTML actuels doivent être déplacés vers `/ch/` :
- `index.html` → `/ch/index.html`
- `consulting.html` → `/ch/consulting.html`
- `formation.html` → `/ch/formation.html`
- `cybersecurite.html` → `/ch/cybersecurite.html`
- `sites-branding.html` → `/ch/sites-branding.html`
- `blog.html` → `/ch/blog.html`
- `article.html` → `/ch/article.html`
- `contact.html` → `/ch/contact.html`
- `mentions-legales.html` → `/ch/mentions-legales.html`
- `confidentialite.html` → `/ch/confidentialite.html`
- `cookies.html` → `/ch/cookies.html`
- `404.html` → `/ch/404.html`

### Étape 3 : Adapter les fichiers /ch/

Pour chaque fichier dans `/ch/`, modifier :

1. **Chemins relatifs** : Les assets restent `../assets/` (un niveau au-dessus)
2. **Hreflang** : Ajouter les balises hreflang
3. **URLs canoniques** : Mettre à jour vers `/ch/page.html`
4. **Sélecteur de pays** : Ajouter dans la navbar

### Étape 4 : Créer les versions /fr/

Pour chaque page dans `/ch/`, créer une version dans `/fr/` avec :

1. **Traduction** : Adapter tous les textes en français de France
2. **Références locales** : Remplacer "Suisse" par "France", "Suisse romande" par "France"
3. **Devise** : CHF → EUR
4. **TVA** : 7.7% → 20%
5. **Langue** : `lang="fr-FR"`
6. **Geo** : `geo.region="FR"`
7. **URLs** : `/ch/` → `/fr/`

### Étape 5 : Créer les versions /es/

Pour chaque page dans `/ch/`, créer une version dans `/es/` avec :

1. **Traduction complète** : Traduire en espagnol
2. **Noms de pages** : 
   - `consulting.html` → `consultoria.html`
   - `formation.html` → `formacion.html`
   - `cybersecurite.html` → `ciberseguridad.html`
   - `sites-branding.html` → `sitios-branding.html`
   - `contact.html` → `contacto.html`
3. **Références locales** : "Suisse" → "España"
4. **Devise** : CHF → EUR
5. **TVA** : 7.7% → 21%
6. **Langue** : `lang="es-ES"`
7. **Geo** : `geo.region="ES"`

### Étape 6 : Ajouter hreflang sur toutes les pages

Chaque page doit avoir :
```html
<link rel="alternate" hreflang="fr-CH" href="https://lumea.ch/ch/page.html">
<link rel="alternate" hreflang="fr-FR" href="https://lumea.ch/fr/page.html">
<link rel="alternate" hreflang="es-ES" href="https://lumea.ch/es/pagina.html">
<link rel="alternate" hreflang="x-default" href="https://lumea.ch/ch/page.html">
```

### Étape 7 : Ajouter le sélecteur de pays dans la navbar

Ajouter dans chaque navbar (après nav-right) :
```html
<div class="country-selector-nav">
  <a href="/ch/" class="country-link" title="Suisse">🇨🇭</a>
  <a href="/fr/" class="country-link" title="France">🇫🇷</a>
  <a href="/es/" class="country-link" title="España">🇪🇸</a>
</div>
```

### Étape 8 : Mettre à jour les liens internes

Tous les liens internes doivent pointer vers la version locale :
- `/ch/consulting.html` (pas `/consulting.html`)
- `/fr/consulting.html`
- `/es/consultoria.html`

### Étape 9 : Mettre à jour sitemap.xml

Ajouter toutes les versions localisées :
```xml
<url>
  <loc>https://lumea.ch/ch/consulting.html</loc>
  <xhtml:link rel="alternate" hreflang="fr-CH" href="https://lumea.ch/ch/consulting.html"/>
  <xhtml:link rel="alternate" hreflang="fr-FR" href="https://lumea.ch/fr/consulting.html"/>
  <xhtml:link rel="alternate" hreflang="es-ES" href="https://lumea.ch/es/consultoria.html"/>
</url>
```

### Étape 10 : Mettre à jour robots.txt

S'assurer que tous les dossiers sont accessibles :
```
User-agent: *
Allow: /ch/
Allow: /fr/
Allow: /es/
Disallow: 
```

## 🎨 CSS pour le sélecteur de pays

Ajouter dans `assets/css/styles.css` :
```css
.country-selector-nav {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-left: 1rem;
}

.country-link {
  font-size: 1.5rem;
  text-decoration: none;
  opacity: 0.7;
  transition: opacity 0.3s;
}

.country-link:hover {
  opacity: 1;
}

.country-link.active {
  opacity: 1;
  border-bottom: 2px solid var(--color-accent-blue);
}
```

## 📝 Checklist par page

Pour chaque page à créer :

- [ ] Fichier créé dans le bon dossier
- [ ] Langue HTML adaptée (`lang="fr-CH"`, `lang="fr-FR"`, `lang="es-ES"`)
- [ ] Meta tags adaptés (geo.region, og:locale)
- [ ] URLs canoniques mises à jour
- [ ] Hreflang ajouté (4 balises)
- [ ] Textes traduits/adaptés
- [ ] Références locales adaptées
- [ ] Devise/TVA adaptées
- [ ] Liens internes mis à jour
- [ ] Sélecteur de pays ajouté
- [ ] Chemins assets corrigés (`../assets/`)

## 🚀 Script d'automatisation (optionnel)

Un script Node.js pourrait être créé pour :
1. Copier les fichiers de `/ch/` vers `/fr/` et `/es/`
2. Remplacer automatiquement les textes communs
3. Adapter les URLs et meta tags
4. Générer les hreflang

## ⚠️ Points d'attention

1. **Assets** : Toujours utiliser `../assets/` depuis les sous-dossiers
2. **Liens** : Toujours utiliser des chemins relatifs avec le préfixe pays
3. **SEO** : Pas de duplicate content - chaque version doit être unique
4. **Performance** : Les assets sont mutualisés, pas de duplication
5. **Maintenance** : Un seul design, mais contenus localisés
