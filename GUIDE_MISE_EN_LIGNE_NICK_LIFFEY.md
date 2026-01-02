# 🚀 Guide de mise en ligne - Nick Liffey

## ✅ Ce qui est déjà fait

- ✅ Structure internationale (CH, FR, ES)
- ✅ Sitemap.xml et robots.txt configurés
- ✅ EmailJS configuré dans le code JavaScript
- ✅ Pages principales créées
- ✅ SEO et meta tags en place
- ✅ Design responsive

## 🔴 CRITIQUE - À compléter avant la mise en ligne

### 1. **Informations légales complètes** ⚠️ OBLIGATOIRE

**Fichiers à modifier :**
- `ch/mentions-legales.html` (ligne 108)
- `fr/mentions-legales.html` (ligne 108)
- `es/aviso-legal.html` (ligne 109)

**À ajouter :**
- Raison sociale complète
- Adresse du siège social
- Numéro d'identification (IDE pour la Suisse, SIRET pour la France, CIF pour l'Espagne)
- Numéro RCS (si applicable)
- Capital social (si applicable)

**Exemple de format :**
```html
<h2>Éditeur du site</h2>
<p><strong>Luméa Communication – Suisse</strong></p>
<p>Raison sociale : [À compléter]</p>
<p>Adresse : [Adresse complète]</p>
<p>Numéro IDE : [À compléter]</p>
<p>RCS : [Si applicable]</p>
```

### 2. **Informations d'hébergement - Nick Liffey** ⚠️ OBLIGATOIRE

**Fichiers à modifier :**
- `ch/mentions-legales.html` (ligne 111)
- `fr/mentions-legales.html` (ligne 111)
- `es/aviso-legal.html` (ligne 112)

**À ajouter :**
- Nom de l'hébergeur : **Nick Liffey**
- Adresse de l'hébergeur : [À compléter avec l'adresse fournie par Nick Liffey]
- Site web : [URL du site de Nick Liffey si disponible]

**Exemple de format :**
```html
<h2>Hébergement</h2>
<p>Ce site est hébergé par :</p>
<p><strong>Nick Liffey</strong></p>
<p>Adresse : [Adresse complète de Nick Liffey]</p>
<p>Site web : [URL si disponible]</p>
```

### 3. **Coordonnées de contact complètes** ⚠️ RECOMMANDÉ

**Fichiers à modifier :**
- `ch/contact.html` (ligne 102)
- `fr/contact.html` (ligne 102)
- `es/contacto.html` (ligne 147)

**À compléter :**
- Adresse postale complète
- Numéro de téléphone
- Email : `bustholding@outlook.fr` (déjà présent)
- Horaires d'ouverture (optionnel mais recommandé)

**Format actuel à améliorer :**
```html
<h4>Luméa Group</h4>
<p>Contactez-nous via le formulaire ci-contre ou directement par email :</p>
<p><a href="mailto:bustholding@outlook.fr">bustholding@outlook.fr</a></p>
<!-- Ajouter : -->
<p>Téléphone : [Numéro]</p>
<p>Adresse : [Adresse complète]</p>
```

### 4. **Vérification EmailJS** ⚠️ À TESTER

**Configuration actuelle dans `assets/js/main.js` :**
- Service ID : `service_h5cz56a`
- Template ID : `template_1lznmjc`
- Public Key : `CVJWmgYc1uNOsPXCK`

**À vérifier :**
- [ ] Le script EmailJS est bien chargé dans toutes les pages de contact
- [ ] Tester l'envoi d'un formulaire de test
- [ ] Vérifier que les emails arrivent correctement

**Pages à vérifier :**
- `ch/contact.html`
- `fr/contact.html`
- `es/contacto.html`

**Vérifier la présence du script EmailJS dans le `<head>` :**
```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
```

## 🟡 IMPORTANT - À vérifier avant publication

### 5. **Liens internes**
- [ ] Tester tous les liens de navigation
- [ ] Vérifier que tous les liens relatifs fonctionnent
- [ ] Vérifier les liens entre versions (CH, FR, ES)

### 6. **Images**
- [ ] Vérifier que toutes les images se chargent correctement
- [ ] Optimiser les images si nécessaire (compression)
- [ ] Vérifier les attributs `alt` sur toutes les images

### 7. **Test de compatibilité**
- [ ] Tester sur différents navigateurs (Chrome, Firefox, Safari, Edge)
- [ ] Tester sur mobile (iPhone, Android)
- [ ] Tester sur tablette

### 8. **Performance**
- [ ] Vérifier les temps de chargement
- [ ] Optimiser les images si nécessaire
- [ ] Minifier CSS/JS (optionnel)

## 🟢 OPTIONNEL - Améliorations post-publication

### 9. **Analytics**
- [ ] Ajouter Google Analytics ou autre outil d'analyse
- [ ] Configurer les événements de conversion

### 10. **Réseaux sociaux**
- [ ] Ajouter les liens vers les réseaux sociaux (si applicable)
- [ ] Vérifier que les Open Graph tags fonctionnent

## 📋 Checklist finale avant upload

- [ ] Informations légales complètes (raison sociale, adresse, numéros)
- [ ] Informations d'hébergement Nick Liffey ajoutées
- [ ] Coordonnées de contact complètes
- [ ] EmailJS testé et fonctionnel
- [ ] Tous les liens testés
- [ ] Images vérifiées
- [ ] Test sur différents navigateurs
- [ ] Test sur mobile
- [ ] Sitemap.xml à jour (date de publication)
- [ ] robots.txt vérifié

## 🚀 Étapes de déploiement avec Nick Liffey

### 1. Préparer les fichiers
- [ ] Compresser tous les fichiers du site
- [ ] Vérifier qu'il n'y a pas de fichiers de développement (`.md`, scripts de migration, etc.)

### 2. Upload vers Nick Liffey
- [ ] Se connecter à l'interface d'hébergement Nick Liffey
- [ ] Uploader tous les fichiers dans le répertoire racine (ou `public_html` selon la configuration)
- [ ] Vérifier que la structure est correcte :
  ```
  /
  ├── index.html
  ├── ch/
  ├── fr/
  ├── es/
  ├── assets/
  ├── robots.txt
  └── sitemap.xml
  ```

### 3. Configuration DNS
- [ ] Configurer le domaine `lumea.ch` (ou le domaine choisi)
- [ ] Vérifier que le domaine pointe vers le serveur Nick Liffey
- [ ] Attendre la propagation DNS (24-48h)

### 4. Configuration SSL/HTTPS
- [ ] Activer le certificat SSL (généralement automatique avec Nick Liffey)
- [ ] Vérifier que le site est accessible en HTTPS
- [ ] Forcer HTTPS si nécessaire (redirection)

### 5. Tests post-publication
- [ ] Tester toutes les pages
- [ ] Tester les formulaires de contact
- [ ] Vérifier que le sitemap est accessible : `https://lumea.ch/sitemap.xml`
- [ ] Vérifier que robots.txt est accessible : `https://lumea.ch/robots.txt`
- [ ] Tester sur différents appareils

### 6. Soumission aux moteurs de recherche
- [ ] Soumettre le sitemap à Google Search Console
- [ ] Soumettre le sitemap à Bing Webmaster Tools
- [ ] Vérifier l'indexation des pages

## 📞 Support Nick Liffey

Si vous avez besoin d'aide pour la configuration avec Nick Liffey :
- Consultez leur documentation
- Contactez leur support technique
- Vérifiez leurs guides de déploiement

## ⚠️ Notes importantes

1. **Sauvegarde** : Faites une sauvegarde complète du site avant tout changement
2. **Test en local** : Testez tout en local avant de mettre en ligne
3. **Informations sensibles** : Ne commitez jamais de clés API ou mots de passe dans le code
4. **Mentions légales** : Obligatoires en Suisse, France et Espagne - à compléter absolument

## 📝 Fichiers à ne PAS uploader (optionnel)

Vous pouvez exclure ces fichiers lors de l'upload :
- `*.md` (fichiers de documentation)
- `*.ps1` (scripts PowerShell)
- `*.js` (scripts de migration)
- `package.json` (si pas nécessaire)
- `node_modules/` (si présent)

---

**Dernière mise à jour :** 2026-01-02
