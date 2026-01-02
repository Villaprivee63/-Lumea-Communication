# 🌍 Guide : Configuration de 3 domaines sur Netlify (CH, FR, ES)

## 📋 Vue d'ensemble

Vous avez **3 domaines différents** :
- **lumea.ch** (ou votre domaine CH) → doit afficher `/ch/`
- **lumea.fr** (ou votre domaine FR) → doit afficher `/fr/`
- **lumea.es** (ou votre domaine ES) → doit afficher `/es/`

**Bonne nouvelle** : Netlify peut gérer plusieurs domaines sur un seul site et rediriger automatiquement vers la bonne version !

## 🚀 Configuration étape par étape

### Étape 1 : Déployer votre site sur Netlify

1. **Connectez votre repository Git** à Netlify (ou déployez manuellement)
2. **Un seul site Netlify** contiendra toutes les versions (CH, FR, ES)
3. Netlify vous donnera une URL temporaire : `https://votre-site-123.netlify.app`

### Étape 2 : Ajouter les 3 domaines

Dans le dashboard Netlify de votre site :

1. Allez dans **"Domain settings"**
2. Cliquez sur **"Add custom domain"**
3. Ajoutez votre **premier domaine** (ex: `lumea.ch`)
4. Répétez pour les **deux autres domaines** :
   - `lumea.fr`
   - `lumea.es`

**Important** : Vous pouvez ajouter plusieurs domaines au même site Netlify !

### Étape 3 : Configurer les DNS

Pour chaque domaine, vous avez **2 options** :

#### Option A : Utiliser les serveurs de noms Netlify (Recommandé)

1. Netlify vous donnera des serveurs de noms (ex: `dns1.p01.nsone.net`)
2. Configurez ces serveurs chez votre registrar de domaine
3. Netlify gérera automatiquement tous les enregistrements DNS

#### Option B : Utiliser des enregistrements DNS

Pour chaque domaine, ajoutez un enregistrement :

**Type A** (IPv4) :
- Nom : `@` (ou vide pour la racine)
- Valeur : L'adresse IP fournie par Netlify

**Type CNAME** (pour www) :
- Nom : `www`
- Valeur : `votre-site-123.netlify.app`

### Étape 4 : Redirections automatiques par domaine

La configuration dans `netlify.toml` est déjà prête ! Elle redirige automatiquement :

- **lumea.ch** → `/ch/`
- **lumea.fr** → `/fr/`
- **lumea.es** → `/es/`

**Comment ça fonctionne** :
- Quand quelqu'un visite `lumea.ch`, Netlify détecte le domaine
- Il redirige automatiquement vers `/ch/index.html`
- Même chose pour les autres domaines

### Étape 5 : Personnaliser les domaines (si nécessaire)

Si vos domaines sont différents (ex: `lumea.ch`, `lumea-france.fr`, `lumea-espana.es`), modifiez `netlify.toml` :

```toml
# Remplacez "lumea.fr" par votre vrai domaine FR
[[redirects]]
  from = "https://votre-domaine-fr.fr/*"
  to = "/fr/:splat"
  status = 200
  conditions = {Host = "votre-domaine-fr.fr"}
```

## ✅ Déploiement automatique

### Oui, Netlify publie automatiquement !

**Avec Git (recommandé)** :

1. **Connectez votre repository** (GitHub, GitLab, Bitbucket) à Netlify
2. **Chaque fois que vous poussez du code** :
   ```bash
   git add .
   git commit -m "Mise à jour du site"
   git push
   ```
3. **Netlify détecte automatiquement** les changements
4. **Netlify déploie automatiquement** en quelques secondes
5. **Vos 3 domaines sont mis à jour automatiquement** !

**Sans Git (déploiement manuel)** :

1. Modifiez vos fichiers localement
2. Connectez-vous à Netlify
3. Glissez-déposez votre dossier dans "Deploy manually"
4. Netlify déploie immédiatement

## 🔄 Workflow recommandé

### Développement local
```bash
# Modifier vos fichiers
# Tester en local
# Ouvrir index.html dans le navigateur
```

### Déploiement
```bash
# Si vous utilisez Git :
git add .
git commit -m "Description des changements"
git push

# Netlify déploie automatiquement en ~30 secondes
# Vos 3 domaines sont mis à jour automatiquement !
```

## 📝 Exemple de configuration complète

### Vos domaines
- **CH** : `lumea.ch` → affiche `/ch/`
- **FR** : `lumea.fr` → affiche `/fr/`
- **ES** : `lumea.es` → affiche `/es/`

### Ce qui se passe

1. **Visiteur sur lumea.ch** :
   - Netlify détecte le domaine `lumea.ch`
   - Redirige vers `/ch/index.html`
   - L'utilisateur voit la version suisse

2. **Visiteur sur lumea.fr** :
   - Netlify détecte le domaine `lumea.fr`
   - Redirige vers `/fr/index.html`
   - L'utilisateur voit la version française

3. **Visiteur sur lumea.es** :
   - Netlify détecte le domaine `lumea.es`
   - Redirige vers `/es/index.html`
   - L'utilisateur voit la version espagnole

## 🎯 Avantages de cette configuration

✅ **Un seul site Netlify** à gérer
✅ **Un seul déploiement** met à jour les 3 domaines
✅ **HTTPS automatique** pour tous les domaines
✅ **CDN global** pour tous les domaines
✅ **Gratuit** (plan gratuit suffit)
✅ **Déploiement automatique** avec Git

## ⚙️ Configuration avancée

### Redirection de la racine

Si quelqu'un visite `lumea.ch/` (sans chemin), Netlify peut :
- **Option 1** : Afficher le sélecteur de pays (`index.html`)
- **Option 2** : Rediriger directement vers `/ch/`

La configuration actuelle utilise l'Option 1 (sélecteur de pays).

Pour forcer la redirection vers `/ch/` sur `lumea.ch/`, ajoutez dans `netlify.toml` :

```toml
[[redirects]]
  from = "https://lumea.ch/"
  to = "/ch/"
  status = 301
  conditions = {Host = "lumea.ch"}
```

### Gestion du www

Netlify gère automatiquement `www.lumea.ch` et `lumea.ch` :
- Les deux pointent vers le même site
- Vous pouvez forcer une redirection (www → non-www ou inversement)

Dans "Domain settings" → "HTTPS" → "Force HTTPS" et "Redirects"

## 🔍 Vérification

Après configuration, testez :

1. **lumea.ch** → doit afficher la version CH
2. **lumea.fr** → doit afficher la version FR
3. **lumea.es** → doit afficher la version ES
4. **HTTPS** → doit fonctionner sur tous les domaines
5. **www.lumea.ch** → doit fonctionner aussi

## 📊 Monitoring

Dans le dashboard Netlify :
- **Analytics** : Voir les visites par domaine
- **Forms** : Voir les soumissions de formulaires
- **Deploys** : Voir l'historique des déploiements

## 🆘 Dépannage

### Le domaine ne redirige pas correctement

1. Vérifiez que le domaine est bien ajouté dans Netlify
2. Vérifiez la configuration DNS (peut prendre 24-48h)
3. Vérifiez que `netlify.toml` contient les bonnes redirections
4. Vérifiez les logs de déploiement dans Netlify

### Le certificat SSL ne fonctionne pas

1. Attendez quelques minutes (génération automatique)
2. Vérifiez que les DNS sont correctement configurés
3. Forcez HTTPS dans "Domain settings" → "HTTPS"

### Les changements ne s'affichent pas

1. Vérifiez que le déploiement est terminé (dashboard Netlify)
2. Videz le cache de votre navigateur (Ctrl+F5)
3. Vérifiez les logs de déploiement pour les erreurs

## 📝 Checklist finale

- [ ] Site déployé sur Netlify
- [ ] 3 domaines ajoutés dans Netlify
- [ ] DNS configurés pour chaque domaine
- [ ] Certificats SSL actifs (HTTPS)
- [ ] Redirections testées (chaque domaine → bonne version)
- [ ] Déploiement automatique configuré (si Git)
- [ ] Formulaires testés sur chaque version
- [ ] Analytics activés (optionnel)

## 💡 Astuces

1. **Un seul repository Git** : Tous vos fichiers sont dans un seul repo
2. **Un seul déploiement** : `git push` met à jour les 3 domaines
3. **Branches de preview** : Netlify crée des URLs de preview pour chaque pull request
4. **Rollback facile** : Vous pouvez revenir à une version précédente en un clic

---

**Résumé** : Oui, Netlify publie automatiquement ! Connectez Git, poussez votre code, et Netlify déploie automatiquement sur vos 3 domaines en quelques secondes. 🚀
