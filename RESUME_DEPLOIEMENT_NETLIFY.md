# 🚀 Résumé rapide : Déploiement Netlify avec 3 domaines

## ✅ Oui, Netlify publie automatiquement !

Une fois configuré, **chaque fois que vous poussez du code sur Git, Netlify déploie automatiquement** sur vos 3 domaines en quelques secondes.

## 📋 Étapes rapides

### 1. Déployer sur Netlify
- Créez un compte sur [netlify.com](https://www.netlify.com)
- Connectez votre repository Git OU déployez manuellement (drag & drop)
- **Un seul site Netlify** contiendra toutes les versions

### 2. Ajouter vos 3 domaines
Dans "Domain settings" → "Add custom domain" :
- Ajoutez `lumea.ch` (ou votre domaine CH)
- Ajoutez `lumea.fr` (ou votre domaine FR)  
- Ajoutez `lumea.es` (ou votre domaine ES)

### 3. Configurer les DNS
Pour chaque domaine :
- **Option A** : Utilisez les serveurs de noms Netlify (recommandé)
- **Option B** : Ajoutez des enregistrements A/CNAME

### 4. C'est tout !
Netlify redirige automatiquement :
- `lumea.ch` → `/ch/` (version suisse)
- `lumea.fr` → `/fr/` (version française)
- `lumea.es` → `/es/` (version espagnole)

## 🔄 Déploiement automatique

**Avec Git** (recommandé) :
```bash
git add .
git commit -m "Mise à jour"
git push
```
→ Netlify déploie automatiquement en ~30 secondes sur les 3 domaines !

**Sans Git** :
- Glissez-déposez votre dossier dans Netlify
- Déploiement immédiat

## 📝 Fichiers de configuration créés

✅ `netlify.toml` - Configuration principale
✅ `_redirects` - Redirections par domaine
✅ `.netlifyignore` - Fichiers à exclure
✅ `GUIDE_DOMAINES_MULTIPLES_NETLIFY.md` - Guide détaillé

## ⚠️ Important

**Modifiez les domaines dans `_redirects`** si vos domaines sont différents :
- Remplacez `lumea.ch` par votre vrai domaine CH
- Remplacez `lumea.fr` par votre vrai domaine FR
- Remplacez `lumea.es` par votre vrai domaine ES

## 🎯 Résultat

- ✅ **Un seul site Netlify** à gérer
- ✅ **Un seul déploiement** met à jour les 3 domaines
- ✅ **HTTPS automatique** pour tous les domaines
- ✅ **Déploiement automatique** avec Git
- ✅ **Gratuit** (plan gratuit suffit)

---

**Besoin d'aide ?** Consultez `GUIDE_DOMAINES_MULTIPLES_NETLIFY.md` pour le guide complet.
