# 🚀 Instructions rapides : Configurer DNS dans o2switch

## ⚠️ Si Netlify ne vous a pas donné de serveurs DNS

**Ne changez PAS les serveurs DNS !** Utilisez plutôt les **enregistrements DNS**.

---

## ✅ Solution simple : Enregistrements DNS

### Dans o2switch :

1. **Ne cliquez PAS sur "Changer les serveurs DNS"**
2. **Cherchez plutôt "Gestion DNS" ou "Zone DNS"** dans le menu
3. **Ajoutez ces enregistrements :**

#### Pour `lumeacommunication.fr` :

**Enregistrement A (racine) :**
- **Type** : A
- **Nom** : `@` (ou laissez vide)
- **Valeur/IP** : `75.2.60.5`
- Sauvegardez

**Enregistrement CNAME (www) :**
- **Type** : CNAME
- **Nom** : `www`
- **Valeur** : `lumeacommunication.fr`
- Sauvegardez

#### Répétez pour `lumeacommunication.ch` :

**Enregistrement A (racine) :**
- **Type** : A
- **Nom** : `@` (ou laissez vide)
- **Valeur/IP** : `75.2.60.5`
- Sauvegardez

**Enregistrement CNAME (www) :**
- **Type** : CNAME
- **Nom** : `www`
- **Valeur** : `lumeacommunication.ch`
- Sauvegardez

---

## ⏱️ Après configuration

1. **Attendez 15-30 minutes** (propagation DNS)
2. **Vérifiez** sur [whatsmydns.net](https://www.whatsmydns.net)
3. **Dans Netlify** : Le statut passera à "Vérifié"
4. **Le certificat SSL** se générera automatiquement

---

## 🆘 Si vous ne trouvez pas "Gestion DNS"

- Cherchez "Zone DNS" ou "DNS"
- Ou contactez le support o2switch
- Dites-leur : "Je veux ajouter un enregistrement A pour pointer mon domaine vers Netlify"

---

**C'est tout !** Pas besoin de changer les serveurs DNS si vous utilisez les enregistrements DNS. 🎯
