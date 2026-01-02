# 🌐 Guide : Configurer les DNS dans o2switch pour Netlify

## 🎯 Objectif

Configurer les DNS de `lumeacommunication.fr` (et `.ch`) dans o2switch pour pointer vers Netlify et activer HTTPS.

## 📋 Étapes dans o2switch

### Étape 1 : Accéder à la gestion DNS

1. Dans votre interface o2switch, vous êtes déjà sur la page du domaine
2. Cliquez sur **"Changer les serveurs DNS"** (Change DNS servers)
   - Ou cherchez "Gestion DNS" / "DNS" dans le menu

### Étape 2 : Choisir la méthode

Vous avez **2 options** :

---

## ✅ Option A : Utiliser les serveurs de noms Netlify (Recommandé)

**Avantages :**
- Netlify gère automatiquement tous les enregistrements DNS
- Plus simple à configurer
- Gestion centralisée dans Netlify

**Comment faire :**

1. Dans Netlify :
   - Allez dans "Domain settings" → Votre domaine
   - Cherchez la section "DNS configuration"
   - Netlify vous donnera des serveurs de noms (ex: `dns1.p01.nsone.net`, `dns2.p01.nsone.net`)

2. Dans o2switch :
   - Cliquez sur "Changer les serveurs DNS"
   - Remplacez les serveurs actuels par ceux fournis par Netlify
   - Sauvegardez

3. Attendez la propagation (15-30 minutes)

---

## ✅ Option B : Configurer les enregistrements DNS (Alternative)

**Si vous préférez garder la gestion DNS dans o2switch :**

### Pour `lumeacommunication.fr` :

1. Dans o2switch, allez dans "Gestion DNS" ou "Zone DNS"
2. Vérifiez si o2switch supporte **ALIAS** ou **ANAME** :
   - **Si OUI** : Créez un enregistrement ALIAS/ANAME
     - Type : ALIAS (ou ANAME)
     - Nom : `@` ou vide (pour la racine)
     - Valeur : `apex-loadbalancer.netlify.com`
   - **Si NON** : Créez un enregistrement A
     - Type : A
     - Nom : `@` ou vide (pour la racine)
     - Valeur : `75.2.60.5` (IP fournie par Netlify)

3. Pour `www.lumeacommunication.fr` :
   - Type : CNAME
   - Nom : `www`
   - Valeur : `lumeacommunication.fr`

### Répétez pour `lumeacommunication.ch` :

1. Allez sur la page de gestion de `lumeacommunication.ch` dans o2switch
2. Configurez les mêmes enregistrements :
   - ALIAS/ANAME vers `apex-loadbalancer.netlify.com` OU
   - A vers `75.2.60.5`
   - CNAME `www` vers `lumeacommunication.ch`

---

## ⏱️ Après configuration

1. **Attendez la propagation DNS** : 15-30 minutes (parfois jusqu'à 48h)
2. **Vérifiez la propagation** :
   - Allez sur [whatsmydns.net](https://www.whatsmydns.net)
   - Entrez `lumeacommunication.fr`
   - Vérifiez que les DNS pointent vers Netlify
3. **Dans Netlify** :
   - Allez dans "Domain settings"
   - Le statut devrait passer de "En attente" à "Vérifié"
   - Le certificat SSL va se générer automatiquement

---

## 🔒 Activation HTTPS

Une fois les DNS vérifiés dans Netlify :

1. Dans Netlify → "Domain settings" → "HTTPS"
2. Activez **"Activez les certificats TLS automatiques"**
3. Netlify générera le certificat (5-15 minutes)
4. Activez **"Force HTTPS"**

---

## 🆘 Dépannage

### Je ne trouve pas "Gestion DNS" dans o2switch

- Cherchez "Zone DNS" ou "DNS"
- Ou contactez le support o2switch : ils peuvent vous guider

### Les DNS ne se propagent pas

- Attendez jusqu'à 48h (propagation normale)
- Vérifiez qu'il n'y a pas d'erreurs de frappe
- Utilisez [whatsmydns.net](https://www.whatsmydns.net) pour vérifier

### Le certificat SSL ne se génère pas

- Vérifiez que les DNS sont bien propagés
- Attendez 15-30 minutes après la propagation
- Vérifiez dans Netlify qu'il n'y a pas d'erreurs

---

## ✅ Checklist

- [ ] Accédé à la gestion DNS dans o2switch
- [ ] Choisi la méthode (serveurs Netlify OU enregistrements DNS)
- [ ] Configuré les DNS pour `.fr`
- [ ] Configuré les DNS pour `.ch`
- [ ] Attendu la propagation DNS
- [ ] Vérifié la propagation sur whatsmydns.net
- [ ] DNS vérifiés dans Netlify
- [ ] Certificat SSL généré
- [ ] HTTPS activé et fonctionnel

---

**Note** : Si vous avez des difficultés, contactez le support o2switch. Ils peuvent vous aider à configurer les DNS correctement.
