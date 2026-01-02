# 🚀 Guide de déploiement sur Netlify - Luméa Communication

## ✨ Pourquoi Netlify ?

Netlify est parfait pour votre site statique car il offre :
- ✅ **Déploiement automatique** depuis Git (GitHub, GitLab, Bitbucket)
- ✅ **HTTPS automatique** et gratuit
- ✅ **CDN global** pour des performances optimales
- ✅ **Formulaires intégrés** (peut remplacer EmailJS si souhaité)
- ✅ **Redirections faciles** via `_redirects` ou `netlify.toml`
- ✅ **Gratuit** pour les sites statiques (100 Go de bande passante/mois)
- ✅ **Configuration simple** - pas besoin de serveur

## 📋 Prérequis

1. **Compte Netlify** : Créez un compte gratuit sur [netlify.com](https://www.netlify.com)
2. **Repository Git** (optionnel mais recommandé) : GitHub, GitLab ou Bitbucket
3. **Fichiers du site** : Tous vos fichiers HTML, CSS, JS, images

## 🚀 Méthode 1 : Déploiement depuis Git (Recommandé)

### Étape 1 : Préparer votre repository Git

1. **Initialiser Git** (si pas déjà fait) :
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Site Luméa Communication"
   ```

2. **Créer un repository** sur GitHub/GitLab/Bitbucket

3. **Pousser votre code** :
   ```bash
   git remote add origin https://github.com/votre-username/lumea-communication.git
   git push -u origin main
   ```

### Étape 2 : Connecter à Netlify

1. Connectez-vous à [app.netlify.com](https://app.netlify.com)
2. Cliquez sur **"Add new site"** → **"Import an existing project"**
3. Choisissez votre provider Git (GitHub, GitLab, Bitbucket)
4. Autorisez Netlify à accéder à votre repository
5. Sélectionnez votre repository `lumea-communication`

### Étape 3 : Configurer le build

**Paramètres de build :**
- **Build command** : (laissez vide - site statique)
- **Publish directory** : `.` (point = racine)

Netlify détectera automatiquement le fichier `netlify.toml` que nous avons créé.

### Étape 4 : Déployer

1. Cliquez sur **"Deploy site"**
2. Netlify va déployer votre site automatiquement
3. Vous obtiendrez une URL temporaire : `https://random-name-123.netlify.app`

### Étape 5 : Configurer le domaine personnalisé

1. Dans les paramètres du site, allez dans **"Domain settings"**
2. Cliquez sur **"Add custom domain"**
3. Entrez votre domaine : `lumea.ch` (ou le domaine de votre choix)
4. Suivez les instructions pour configurer les DNS :
   - **Option A** : Utiliser les serveurs de noms Netlify (recommandé)
     - Netlify vous donnera des serveurs de noms (ex: `dns1.p01.nsone.net`)
     - Configurez-les chez votre registrar de domaine
   - **Option B** : Utiliser un enregistrement DNS
     - Ajoutez un enregistrement A ou CNAME selon les instructions Netlify

5. Attendez la propagation DNS (quelques minutes à 48h)
6. Netlify configurera automatiquement le certificat SSL

## 🚀 Méthode 2 : Déploiement manuel (Drag & Drop)

Si vous ne voulez pas utiliser Git :

1. Connectez-vous à [app.netlify.com](https://app.netlify.com)
2. Cliquez sur **"Add new site"** → **"Deploy manually"**
3. Glissez-déposez votre dossier de site dans la zone de déploiement
4. Netlify va déployer votre site
5. Suivez l'étape 5 ci-dessus pour configurer le domaine

## ⚙️ Configuration avancée

### Fichiers de configuration créés

Nous avons créé deux fichiers de configuration :

1. **`netlify.toml`** : Configuration principale
   - Headers de sécurité
   - Cache pour les assets
   - Redirections
   - Minification CSS/JS

2. **`_redirects`** : Redirections simples
   - Redirections pour les dossiers de pays
   - Page 404 personnalisée

### Formulaires Netlify (Optionnel)

Netlify offre un système de formulaires intégré qui peut remplacer EmailJS :

**Avantages :**
- ✅ Gratuit jusqu'à 100 soumissions/mois
- ✅ Pas besoin de service externe
- ✅ Spam filtering intégré
- ✅ Notifications email automatiques

**Pour l'activer :**
1. Ajoutez `netlify` ou `data-netlify="true"` à votre formulaire
2. Dans Netlify, allez dans **"Forms"** pour voir les soumissions
3. Configurez les notifications email dans les paramètres

**Exemple de formulaire Netlify :**
```html
<form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field">
  <input type="hidden" name="form-name" value="contact">
  <p style="display: none;">
    <label>Ne remplissez pas ce champ : <input name="bot-field"></label>
  </p>
  <!-- Vos champs de formulaire -->
</form>
```

**Note :** Vous pouvez garder EmailJS si vous préférez, les deux fonctionnent bien.

## 📝 Mise à jour des mentions légales

Après le déploiement, mettez à jour les mentions légales avec les informations Netlify :

**Fichiers à modifier :**
- `ch/mentions-legales.html`
- `fr/mentions-legales.html`
- `es/aviso-legal.html`

**À ajouter dans la section "Hébergement" :**
```html
<h2>Hébergement</h2>
<p>Ce site est hébergé par :</p>
<p><strong>Netlify, Inc.</strong></p>
<p>44 Montgomery Street, Suite 300</p>
<p>San Francisco, CA 94104</p>
<p>États-Unis</p>
<p>Site web : <a href="https://www.netlify.com" target="_blank" rel="noopener">www.netlify.com</a></p>
```

## ✅ Checklist de déploiement

### Avant le déploiement
- [ ] Tous les fichiers sont prêts
- [ ] `netlify.toml` est présent à la racine
- [ ] `_redirects` est présent à la racine
- [ ] Tous les liens fonctionnent
- [ ] Les formulaires sont testés (EmailJS ou Netlify Forms)
- [ ] Les images sont optimisées
- [ ] Les mentions légales sont complètes

### Après le déploiement
- [ ] Le site est accessible sur l'URL Netlify
- [ ] Le domaine personnalisé est configuré
- [ ] Le certificat SSL est actif (HTTPS)
- [ ] Toutes les pages se chargent correctement
- [ ] Les formulaires fonctionnent
- [ ] Les redirections fonctionnent
- [ ] La page 404 fonctionne
- [ ] Le sitemap est accessible : `https://lumea.ch/sitemap.xml`
- [ ] Le robots.txt est accessible : `https://lumea.ch/robots.txt`

### Post-publication
- [ ] Soumettre le sitemap à Google Search Console
- [ ] Soumettre le sitemap à Bing Webmaster Tools
- [ ] Tester sur différents appareils
- [ ] Vérifier les performances (PageSpeed Insights)
- [ ] Configurer les notifications de formulaire (si Netlify Forms)

## 🔄 Déploiements automatiques

Avec la méthode Git, chaque fois que vous poussez du code :
1. Netlify détecte automatiquement les changements
2. Déploie automatiquement la nouvelle version
3. Vous pouvez voir l'historique des déploiements dans le dashboard

### Branches de preview

Netlify crée automatiquement des URLs de preview pour chaque pull request :
- Parfait pour tester avant de merger
- Chaque branche a sa propre URL

## 🛠️ Commandes utiles

### Déploiement via CLI Netlify (optionnel)

Si vous préférez utiliser la ligne de commande :

```bash
# Installer Netlify CLI
npm install -g netlify-cli

# Se connecter
netlify login

# Déployer
netlify deploy

# Déployer en production
netlify deploy --prod
```

## 📊 Monitoring et Analytics

Netlify offre des analytics intégrés :
- Visites
- Pages vues
- Top pages
- Sources de trafic

Activez-les dans **"Analytics"** dans le dashboard Netlify.

## 🔒 Sécurité

Les headers de sécurité sont déjà configurés dans `netlify.toml` :
- X-Frame-Options
- X-XSS-Protection
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy

## 💡 Astuces

1. **Cache** : Les assets (CSS, JS, images) sont mis en cache pour 1 an
2. **Minification** : CSS et JS sont automatiquement minifiés
3. **CDN** : Votre site est distribué sur un CDN global
4. **HTTPS** : Automatique et gratuit
5. **Rollback** : Vous pouvez revenir à une version précédente en un clic

## 🆘 Support

- **Documentation Netlify** : [docs.netlify.com](https://docs.netlify.com)
- **Support Netlify** : [support.netlify.com](https://support.netlify.com)
- **Community** : [community.netlify.com](https://community.netlify.com)

## 📝 Notes importantes

1. **Limites du plan gratuit** :
   - 100 Go de bande passante/mois
   - 100 Go de build minutes/mois
   - 100 soumissions de formulaires/mois
   - Suffisant pour la plupart des sites

2. **Fichiers à exclure** (optionnel) :
   - Les fichiers `.md` (documentation)
   - Les scripts de migration (`.ps1`, `.js` de migration)
   - `node_modules/` (si présent)
   - Créez un fichier `.netlifyignore` si nécessaire

3. **Variables d'environnement** :
   - Si vous avez des clés API, utilisez les variables d'environnement Netlify
   - Accessibles dans **"Site settings"** → **"Environment variables"**

---

**Dernière mise à jour :** 2026-01-02
