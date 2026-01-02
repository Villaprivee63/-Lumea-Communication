# 🔧 Configuration CNAME dans o2switch selon Netlify

## 🎯 Ce que Netlify demande

D'après votre écran Netlify, il faut configurer :

**Enregistrement CNAME :**
- **Nom** : `www`
- **Type** : CNAME
- **Valeur** : `famous-begonia-c8571c.netlify.app.`

---

## ⚠️ Problème : o2switch ne permet que de changer les serveurs DNS

Si o2switch ne vous permet que de changer les serveurs DNS (et pas de gérer les enregistrements DNS individuels), vous avez **2 options** :

---

## ✅ Option 1 : Contacter le support o2switch

**Demandez au support o2switch :**

1. "Je veux ajouter un enregistrement CNAME pour `www.lumeacommunication.ch` qui pointe vers `famous-begonia-c8571c.netlify.app`"
2. "Comment puis-je accéder à la gestion des enregistrements DNS (CNAME, A) dans votre interface ?"
3. "Y a-t-il une section 'Zone DNS' ou 'Gestion DNS' que je ne vois pas ?"

**Ils peuvent :**
- Vous donner accès à une interface de gestion DNS
- Configurer l'enregistrement CNAME pour vous
- Vous expliquer comment faire

---

## ✅ Option 2 : Utiliser les serveurs DNS de Netlify

**Si o2switch ne permet vraiment que de changer les serveurs DNS :**

1. **Dans Netlify :**
   - Allez dans "Domain settings" → Votre domaine
   - Cherchez "DNS" ou "Netlify DNS"
   - Activez "Netlify DNS" si disponible
   - Cela devrait vous donner des serveurs DNS

2. **Dans o2switch :**
   - Cliquez sur "Changer les serveurs DNS"
   - Remplacez les serveurs par ceux de Netlify
   - Netlify gérera alors automatiquement tous les enregistrements DNS

**⚠️ Attention :** Cette méthode change complètement la gestion DNS vers Netlify. Assurez-vous que c'est ce que vous voulez.

---

## 🔍 Chercher dans o2switch

**Avant de changer les serveurs DNS, vérifiez s'il y a une section cachée :**

1. **Dans le menu du domaine**, cherchez :
   - "Zone DNS"
   - "Gestion DNS"
   - "Enregistrements DNS"
   - "DNS avancé"
   - "Configuration DNS"

2. **Dans les paramètres du domaine**, cherchez :
   - Un onglet "DNS"
   - Un bouton "Gérer les enregistrements DNS"
   - Un lien "Configuration avancée"

3. **Contactez le support o2switch** si vous ne trouvez rien

---

## 📋 Si vous trouvez la gestion DNS dans o2switch

**Configurez ces enregistrements :**

### Pour `lumeacommunication.ch` :

**Enregistrement CNAME (www) :**
- **Type** : CNAME
- **Nom** : `www`
- **Valeur** : `famous-begonia-c8571c.netlify.app.` (avec le point final)
- Sauvegardez

**Enregistrement A (racine) :**
- **Type** : A
- **Nom** : `@` (ou vide pour la racine)
- **Valeur/IP** : `75.2.60.5`
- Sauvegardez

### Répétez pour `lumeacommunication.fr` :

**Enregistrement CNAME (www) :**
- **Type** : CNAME
- **Nom** : `www`
- **Valeur** : `famous-begonia-c8571c.netlify.app.` (avec le point final)
- Sauvegardez

**Enregistrement A (racine) :**
- **Type** : A
- **Nom** : `@` (ou vide)
- **Valeur/IP** : `75.2.60.5`
- Sauvegardez

---

## ⏱️ Après configuration

1. **Attendez 15-30 minutes** (propagation DNS)
2. **Vérifiez** sur [whatsmydns.net](https://www.whatsmydns.net)
3. **Dans Netlify** : Le statut devrait passer à "Vérifié"
4. **Le certificat SSL** se générera automatiquement

---

## 🆘 Si vous ne trouvez toujours pas

**Contactez le support o2switch :**
- Email ou chat support
- Dites-leur : "Je dois configurer un enregistrement CNAME pour www qui pointe vers Netlify, mais je ne trouve pas l'interface de gestion DNS dans votre espace client"
- Ils vous guideront ou configureront pour vous

---

**Note importante :** Le point final (`.`) dans `famous-begonia-c8571c.netlify.app.` est important. Certains systèmes DNS le demandent, d'autres non. Essayez d'abord sans le point, et si ça ne fonctionne pas, ajoutez-le.
