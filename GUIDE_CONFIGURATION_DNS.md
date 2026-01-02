# 🌐 Guide : Configuration DNS pour Netlify

## 🎯 Pourquoi configurer les DNS ?

Netlify doit vérifier que votre domaine (`lumeacommunication.ch` et `lumeacommunication.fr`) pointe bien vers ses serveurs avant de pouvoir :
- ✅ Générer le certificat SSL/HTTPS
- ✅ Activer votre site sur votre domaine
- ✅ Sécuriser votre site

**Sans DNS correctement configurés, le certificat SSL ne peut pas être généré !**

## 📌 Votre registrar : o2switch

Si vous utilisez **o2switch** comme registrar, consultez le guide spécifique : **`GUIDE_DNS_O2SWITCH.md`**

## 📋 Configuration DNS selon Netlify

D'après votre écran Netlify, voici ce qu'il faut faire :

### Pour `lumeacommunication.fr` (et `.ch`)

Netlify vous propose **2 options** :

---

## ✅ Option 1 : ALIAS/ANAME (Recommandé)

**Si votre registrar supporte ALIAS, ANAME ou CNAME aplati :**

1. Connectez-vous à votre registrar de domaine (où vous avez acheté `lumeacommunication.fr` et `.ch`)
2. Allez dans la gestion DNS de votre domaine
3. Créez un enregistrement **ALIAS** (ou ANAME) :
   - **Type** : ALIAS (ou ANAME)
   - **Nom** : `lumeacommunication.fr` (ou laissez vide pour la racine)
   - **Valeur** : `apex-loadbalancer.netlify.com`
   - **TTL** : 3600 (ou valeur par défaut)

**Répétez pour :**
- `lumeacommunication.ch` → ALIAS vers `apex-loadbalancer.netlify.com`
- `lumeacommunication.fr` → ALIAS vers `apex-loadbalancer.netlify.com`

**Pour www :**
- `www.lumeacommunication.ch` → CNAME vers `lumeacommunication.ch`
- `www.lumeacommunication.fr` → CNAME vers `lumeacommunication.fr`

---

## 🔄 Option 2 : Enregistrement A (Solution de secours)

**Si votre registrar ne supporte pas ALIAS/ANAME :**

1. Connectez-vous à votre registrar de domaine
2. Allez dans la gestion DNS
3. Créez un enregistrement **A** :
   - **Type** : A
   - **Nom** : `lumeacommunication.fr` (ou laissez vide pour la racine)
   - **Valeur** : `75.2.60.5` (adresse IP fournie par Netlify)
   - **TTL** : 3600 (ou valeur par défaut)

**Répétez pour :**
- `lumeacommunication.ch` → A vers `75.2.60.5`
- `lumeacommunication.fr` → A vers `75.2.60.5`

**Pour www :**
- `www.lumeacommunication.ch` → CNAME vers `lumeacommunication.ch`
- `www.lumeacommunication.fr` → CNAME vers `lumeacommunication.fr`

---

## ⏱️ Après configuration DNS

1. **Attendez la propagation DNS** : 5 minutes à 48 heures
   - Généralement 15-30 minutes
   - Parfois jusqu'à 24-48h selon le registrar

2. **Vérifiez la propagation** :
   - Utilisez [whatsmydns.net](https://www.whatsmydns.net)
   - Entrez votre domaine
   - Vérifiez que les DNS pointent vers Netlify

3. **Dans Netlify** :
   - Allez dans "Domain settings"
   - Le statut devrait passer de "En attente" à "Vérifié"
   - Le certificat SSL va se générer automatiquement

---

## 🔒 Activation du certificat SSL

Une fois les DNS vérifiés :

1. Dans Netlify → "Domain settings" → "HTTPS"
2. Activez **"Activez les certificats TLS automatiques"**
3. Netlify va générer le certificat automatiquement (5-15 minutes)
4. Activez **"Force HTTPS"** pour rediriger HTTP → HTTPS

---

## 🆘 Dépannage

### Les DNS ne se propagent pas

- Attendez jusqu'à 48h (propagation normale)
- Vérifiez que vous avez bien enregistré les DNS chez votre registrar
- Vérifiez qu'il n'y a pas d'erreurs de frappe

### Le certificat SSL ne se génère pas

- Vérifiez que les DNS sont bien propagés (whatsmydns.net)
- Attendez 15-30 minutes après la propagation DNS
- Vérifiez dans Netlify qu'il n'y a pas d'erreurs affichées

### Comment savoir quel registrar j'utilise ?

- C'est là où vous avez acheté votre domaine
- Exemples : OVH, Gandi, Namecheap, GoDaddy, etc.
- Connectez-vous à votre compte et cherchez "Gestion DNS" ou "DNS"

---

## ✅ Checklist

- [ ] Identifié mon registrar de domaine
- [ ] Configuré les DNS (ALIAS ou A) pour `.ch`
- [ ] Configuré les DNS (ALIAS ou A) pour `.fr`
- [ ] Configuré les CNAME pour `www.`
- [ ] Attendu la propagation DNS
- [ ] Vérifié la propagation sur whatsmydns.net
- [ ] DNS vérifiés dans Netlify
- [ ] Certificat SSL généré
- [ ] HTTPS activé et fonctionnel

---

**Résumé** : Configurez les DNS chez votre registrar, attendez la propagation, puis Netlify générera automatiquement le certificat SSL ! 🔒✨
