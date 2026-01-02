# 🌐 Guide : Configurer les DNS dans o2switch pour Netlify

## 🎯 Objectif

Configurer les DNS de `lumeacommunication.fr` (et `.ch`) dans o2switch pour pointer vers Netlify et activer HTTPS.

## 📌 Instructions spécifiques de Netlify

**Netlify demande de configurer :**
- `www CNAME famous-begonia-c8571c.netlify.app.`

**Voir le guide spécifique :** `CONFIGURER_CNAME_O2SWITCH.md`

## 📋 Étapes dans o2switch

### ⚠️ IMPORTANT : Deux méthodes possibles

Vous avez **2 options**. Si Netlify ne vous a pas donné de serveurs DNS, utilisez l'**Option B** (enregistrements DNS) qui est plus simple !

---

## ✅ Option A : Utiliser les serveurs de noms Netlify

**⚠️ Si o2switch ne permet QUE de changer les serveurs DNS, c'est cette option qu'il faut utiliser !**

**Comment obtenir les serveurs DNS de Netlify :**

1. **Dans Netlify :**
   - Allez dans "Domain settings" → Votre domaine (`lumeacommunication.fr` ou `.ch`)
   - Cherchez la section **"DNS configuration"** ou **"Nameservers"**
   - Netlify devrait afficher des serveurs DNS (ex: `dns1.p01.nsone.net`, `dns2.p01.nsone.net`)
   
2. **Si vous ne voyez pas les serveurs DNS dans Netlify :**
   - Netlify utilise parfois des enregistrements DNS au lieu de serveurs DNS
   - Dans ce cas, contactez le support Netlify pour demander les serveurs DNS
   - Ou utilisez cette méthode alternative : Dans Netlify, allez dans "Domain settings" → "DNS" → Activez "Netlify DNS" si disponible

3. **Dans o2switch :**
   - Cliquez sur **"Changer les serveurs DNS"**
   - Remplacez les 4 serveurs actuels par ceux fournis par Netlify
   - Vous n'avez besoin que de 2 serveurs DNS de Netlify (laissez les 2 autres vides ou mettez les mêmes)
   - Cliquez sur **"Changer les DNS"**

4. **Attendez la propagation** : 15-30 minutes (parfois jusqu'à 48h)

---

## ✅ Option B : Configurer les enregistrements DNS (RECOMMANDÉ si pas de serveurs DNS)

**Cette option est plus simple et ne nécessite pas de changer les serveurs DNS !**

**Avantages :**
- ✅ Pas besoin de serveurs DNS de Netlify
- ✅ Gardez la gestion DNS dans o2switch
- ✅ Plus rapide à configurer
- ✅ Moins de risques d'erreur

### Pour `lumeacommunication.fr` :

1. **Dans o2switch, cherchez "Gestion DNS" ou "Zone DNS"**
   - Ne changez PAS les serveurs DNS, gardez-les comme ils sont
   - Cherchez plutôt une section pour ajouter/modifier des enregistrements DNS

2. **Créez un enregistrement A** (c'est la méthode la plus simple) :
   - **Type** : A
   - **Nom** : `@` ou vide (pour la racine du domaine)
   - **Valeur/IP** : `75.2.60.5` (c'est l'IP fournie par Netlify)
   - **TTL** : 3600 (ou laissez la valeur par défaut)
   - Sauvegardez

3. **Pour `www.lumeacommunication.fr`** :
   - **Type** : CNAME
   - **Nom** : `www`
   - **Valeur** : `lumeacommunication.fr`
   - Sauvegardez

**Note :** Si o2switch supporte ALIAS/ANAME, vous pouvez utiliser `apex-loadbalancer.netlify.com` au lieu de l'IP, mais l'enregistrement A fonctionne très bien !

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
