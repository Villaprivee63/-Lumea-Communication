# 🔒 Guide : Activer HTTPS sur Netlify

## 🎯 Objectif

Activer HTTPS (SSL/TLS) pour sécuriser votre site `lumeacommunication.ch` et `lumeacommunication.fr`.

## ✅ Étapes pour activer HTTPS

### Étape 1 : Vérifier que le domaine est ajouté dans Netlify

1. Connectez-vous à [app.netlify.com](https://app.netlify.com)
2. Sélectionnez votre site "Luméa Communication"
3. Allez dans **"Domain settings"** (Paramètres du domaine)
4. Vérifiez que `lumeacommunication.ch` et `lumeacommunication.fr` sont bien listés

**Si les domaines ne sont pas là :**
- Cliquez sur **"Add custom domain"**
- Ajoutez `lumeacommunication.ch`
- Ajoutez `lumeacommunication.fr`

### Étape 2 : Configurer les DNS (OBLIGATOIRE)

**⚠️ IMPORTANT :** Netlify ne peut pas générer le certificat SSL tant que les DNS ne sont pas configurés et vérifiés !

**Vous voyez "Vérification DNS externe en attente" ?** → Il faut configurer les DNS d'abord.

**Deux options selon votre registrar :**

#### Option A : ALIAS/ANAME (Recommandé)
Si votre registrar supporte ALIAS/ANAME :
- Créez un enregistrement **ALIAS** pour `lumeacommunication.ch` → `apex-loadbalancer.netlify.com`
- Créez un enregistrement **ALIAS** pour `lumeacommunication.fr` → `apex-loadbalancer.netlify.com`

#### Option B : Enregistrement A (Solution de secours)
Si votre registrar ne supporte pas ALIAS :
- Créez un enregistrement **A** pour `lumeacommunication.ch` → `75.2.60.5`
- Créez un enregistrement **A** pour `lumeacommunication.fr` → `75.2.60.5`

**Pour www :**
- `www.lumeacommunication.ch` → CNAME vers `lumeacommunication.ch`
- `www.lumeacommunication.fr` → CNAME vers `lumeacommunication.fr`

**Où configurer ?**
- Chez votre registrar de domaine (là où vous avez acheté le domaine)
- Cherchez "Gestion DNS" ou "DNS" dans votre compte

**Après configuration :**
- Attendez la propagation DNS (5 min à 48h, généralement 15-30 min)
- Vérifiez sur [whatsmydns.net](https://www.whatsmydns.net)
- Netlify vérifiera automatiquement les DNS

**📖 Guide détaillé :** Voir `GUIDE_CONFIGURATION_DNS.md` pour les instructions complètes.

### Étape 3 : Forcer HTTPS dans Netlify

1. Dans "Domain settings", allez dans l'onglet **"HTTPS"**
2. Activez **"Force HTTPS"** (Forcer HTTPS)
3. Activez **"TLS"** (si disponible)

Netlify va automatiquement :
- Générer un certificat SSL gratuit (Let's Encrypt)
- Rediriger HTTP vers HTTPS
- Renouveler automatiquement le certificat

### Étape 4 : Attendre la génération du certificat

- **Temps d'attente** : Généralement 5-15 minutes
- **Statut** : Dans "Domain settings" → "HTTPS", vous verrez :
  - ⏳ "Certificate provisioning..." (En cours)
  - ✅ "Certificate active" (Actif)

**Si le certificat ne se génère pas :**
- Vérifiez que les DNS sont correctement configurés
- Attendez jusqu'à 24h (propagation DNS)
- Contactez le support Netlify si nécessaire

### Étape 5 : Vérifier que HTTPS fonctionne

1. Visitez `https://lumeacommunication.ch`
2. Vérifiez dans la barre d'adresse :
   - ✅ Cadenas vert (sécurisé)
   - ✅ "Sécurisé" ou "Secure" affiché
   - ❌ Plus de "Non sécurisé"

## 🔧 Configuration automatique

J'ai ajouté des redirections automatiques dans `netlify.toml` pour :
- Rediriger HTTP → HTTPS automatiquement
- Forcer HTTPS sur tous les domaines

Ces redirections sont déjà en place et seront actives après le prochain déploiement.

## 🆘 Dépannage

### Le site affiche toujours "Non sécurisé"

**Causes possibles :**
1. **DNS pas encore propagés** → Attendez 24-48h
2. **Certificat en cours de génération** → Attendez 15-30 minutes
3. **HTTPS non forcé** → Activez "Force HTTPS" dans Netlify
4. **Cache du navigateur** → Videz le cache (Ctrl+F5)

**Solutions :**
1. Vérifiez le statut dans Netlify : "Domain settings" → "HTTPS"
2. Attendez la génération complète du certificat
3. Videz le cache de votre navigateur
4. Testez en navigation privée

### Le certificat ne se génère pas

1. **Vérifiez les DNS** :
   - Utilisez [whatsmydns.net](https://www.whatsmydns.net) pour vérifier la propagation
   - Les DNS doivent pointer vers Netlify

2. **Vérifiez dans Netlify** :
   - "Domain settings" → Vérifiez les erreurs affichées
   - Regardez les logs de déploiement

3. **Contactez le support** :
   - Si après 24h le certificat ne se génère toujours pas
   - Support Netlify : [support.netlify.com](https://support.netlify.com)

## ✅ Checklist

- [ ] Domaines ajoutés dans Netlify
- [ ] DNS configurés correctement
- [ ] "Force HTTPS" activé dans Netlify
- [ ] Certificat SSL généré (statut "Active")
- [ ] Site accessible en HTTPS
- [ ] Cadenas vert visible dans le navigateur
- [ ] Redirections HTTP → HTTPS fonctionnent

## 🎉 Résultat attendu

Après configuration :
- ✅ Site accessible en `https://lumeacommunication.ch`
- ✅ Cadenas vert dans la barre d'adresse
- ✅ "Sécurisé" affiché au lieu de "Non sécurisé"
- ✅ Redirection automatique HTTP → HTTPS
- ✅ Certificat SSL renouvelé automatiquement

---

**Note** : Netlify fournit des certificats SSL gratuits et automatiques. Une fois configuré, vous n'avez rien d'autre à faire ! 🔒✨
