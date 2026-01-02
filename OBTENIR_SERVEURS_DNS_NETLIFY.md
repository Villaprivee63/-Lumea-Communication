# 🔍 Comment obtenir les serveurs DNS de Netlify

## 🎯 Si o2switch ne permet que de changer les serveurs DNS

Si votre interface o2switch ne propose que "Changer les serveurs DNS" (et pas de gestion d'enregistrements DNS), vous devez utiliser les serveurs DNS de Netlify.

---

## 📋 Méthode 1 : Dans l'interface Netlify

### Étape 1 : Accéder aux paramètres DNS

1. Connectez-vous à [app.netlify.com](https://app.netlify.com)
2. Sélectionnez votre site "Luméa Communication"
3. Allez dans **"Domain settings"** (Paramètres du domaine)
4. Cliquez sur votre domaine (`lumeacommunication.fr` ou `.ch`)

### Étape 2 : Chercher les serveurs DNS

**Cherchez dans les sections suivantes :**

1. **"DNS configuration"** ou **"DNS"**
   - Netlify peut afficher les serveurs DNS ici
   - Format : `dns1.p01.nsone.net`, `dns2.p01.nsone.net`

2. **"Nameservers"** ou **"Serveurs de noms"**
   - Section dédiée aux serveurs DNS

3. **"Netlify DNS"**
   - Si vous voyez une option "Activer Netlify DNS", activez-la
   - Cela peut afficher les serveurs DNS

### Étape 3 : Si vous ne trouvez pas les serveurs DNS

**Netlify utilise parfois des enregistrements DNS au lieu de serveurs DNS.**

**Solutions :**

1. **Contactez le support Netlify :**
   - Support : [support.netlify.com](https://support.netlify.com)
   - Demandez : "J'ai besoin des serveurs DNS pour pointer mon domaine vers Netlify"

2. **Vérifiez dans "Domain settings" → "DNS" :**
   - Activez "Netlify DNS" si disponible
   - Cela peut générer des serveurs DNS

---

## 📋 Méthode 2 : Utiliser les serveurs DNS par défaut de Netlify

**Si Netlify ne vous donne pas de serveurs DNS spécifiques, vous pouvez essayer ces serveurs DNS génériques :**

**Serveurs DNS Netlify (exemples) :**
- `dns1.p01.nsone.net`
- `dns2.p01.nsone.net`

**⚠️ Attention :** Ces serveurs peuvent ne pas fonctionner pour tous les sites. Il vaut mieux obtenir les serveurs DNS spécifiques à votre site depuis Netlify.

---

## 📋 Méthode 3 : Contacter le support o2switch

**Si vous ne trouvez pas les serveurs DNS dans Netlify :**

1. Contactez le support o2switch
2. Dites-leur : "Je veux pointer mon domaine vers Netlify, mais je n'ai que l'option de changer les serveurs DNS. Comment puis-je ajouter des enregistrements DNS (type A) ?"
3. Ils peuvent vous donner accès à une interface de gestion DNS plus complète

---

## ✅ Une fois que vous avez les serveurs DNS

### Dans o2switch :

1. Cliquez sur **"Changer les serveurs DNS"**
2. Remplacez les serveurs actuels par ceux de Netlify
3. Vous avez besoin de **2 serveurs DNS minimum**
4. Si o2switch demande 4 serveurs, mettez les 2 mêmes serveurs deux fois, ou laissez les 2 autres vides
5. Cliquez sur **"Changer les DNS"**

### Exemple :

**Serveurs DNS Netlify :**
- Serveur DNS 1 : `dns1.p01.nsone.net`
- Serveur DNS 2 : `dns2.p01.nsone.net`
- Serveur DNS 3 : (laissez vide ou répétez DNS 1)
- Serveur DNS 4 : (laissez vide ou répétez DNS 2)

---

## ⏱️ Après configuration

1. **Attendez la propagation** : 15-30 minutes (parfois jusqu'à 48h)
2. **Vérifiez** sur [whatsmydns.net](https://www.whatsmydns.net)
3. **Dans Netlify** : Le statut devrait passer à "Vérifié"
4. **Le certificat SSL** se générera automatiquement

---

## 🆘 Dépannage

### Je ne trouve pas les serveurs DNS dans Netlify

- Contactez le support Netlify
- Ou vérifiez si Netlify utilise des enregistrements DNS au lieu de serveurs DNS

### Les serveurs DNS ne fonctionnent pas

- Vérifiez qu'il n'y a pas d'erreurs de frappe
- Attendez jusqu'à 48h pour la propagation
- Contactez le support Netlify pour vérifier

---

**Note :** Si possible, demandez au support o2switch comment accéder à la gestion des enregistrements DNS (type A, CNAME) au lieu de changer les serveurs DNS. C'est souvent plus simple et plus flexible.
