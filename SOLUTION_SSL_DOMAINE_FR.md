# 🔧 Solution : Ajouter lumeacommunication.fr au certificat SSL

## 🎯 Problème identifié

**Le certificat SSL ne couvre que :**
- ✅ `*lumeacommunication.ch`
- ✅ `lumeacommunication.ch`

**Mais PAS :**
- ❌ `lumeacommunication.fr` ← **C'est le problème !**

**C'est pourquoi Google Search Console affiche l'erreur SSL pour `.fr`.**

---

## ✅ Solution : Ajouter le domaine .fr

### Étape 1 : Vérifier si le domaine est ajouté

**Dans Netlify → "Gestion du domaine" :**

1. **Regardez la section "Domaines de production"** (en haut de la page)
2. **Vérifiez si `lumeacommunication.fr` apparaît dans la liste**
3. **Si le domaine n'est PAS là :** → Il faut l'ajouter (voir Étape 2)
4. **Si le domaine EST là :** → Il faut renouveler le certificat (voir Étape 3)

---

### Étape 2 : Ajouter le domaine (si pas présent)

**Si `lumeacommunication.fr` n'apparaît pas dans la liste :**

1. **Cliquez sur "Ajouter un alias de domaine"** (bouton visible en haut)
2. **Entrez** : `lumeacommunication.fr`
3. **Cliquez sur "Ajouter"**
4. **Suivez les instructions** pour configurer le DNS :
   - **A record** vers `75.2.60.5` OU
   - **ALIAS** vers `apex-loadbalancer.netlify.com`
5. **Attendez la vérification DNS** (5 minutes à 48h)
6. **Netlify générera automatiquement le certificat** pour `.fr`

---

### Étape 3 : Renouveler le certificat (si domaine déjà présent)

**Si `lumeacommunication.fr` est déjà dans la liste mais pas dans le certificat :**

1. **Dans la section "Certificat SSL/TLS"**
2. **Cliquez sur "Renouvellement du certificat"** (bouton visible)
3. **Attendez 5-15 minutes**
4. **Netlify va générer un nouveau certificat** qui inclura les deux domaines (`.ch` et `.fr`)

---

## 🧪 Vérification

**Après avoir ajouté le domaine ou renouvelé le certificat :**

1. **Attendez 5-15 minutes**
2. **Rechargez la page Netlify**
3. **Vérifiez dans "Certificat SSL/TLS" → "Domaines"**
4. **Vous devriez voir :**
   - ✅ `*lumeacommunication.ch`
   - ✅ `lumeacommunication.ch`
   - ✅ `*lumeacommunication.fr` ← **Doit apparaître maintenant**
   - ✅ `lumeacommunication.fr` ← **Doit apparaître maintenant**

---

## ⏱️ Temps de résolution

**Si le domaine n'est pas ajouté :**
- Ajout du domaine : **Quelques minutes**
- Vérification DNS : **5 minutes à 48h**
- Génération du certificat : **5-15 minutes après vérification DNS**

**Si le domaine est déjà ajouté :**
- Renouvellement du certificat : **5-15 minutes**

**Total estimé : 15 minutes à 48 heures** (selon la propagation DNS)

---

## 🆘 Après correction

**Une fois le certificat mis à jour :**

1. **Attendez 24-48 heures** pour que Google détecte le changement
2. **Dans Google Search Console**, réessayez l'inspection d'URL pour `lumeacommunication.fr`
3. **L'erreur SSL devrait disparaître**
4. **Vous pourrez alors demander l'indexation**

---

## 📋 Checklist

- [ ] J'ai vérifié si `lumeacommunication.fr` est dans la liste des domaines
- [ ] J'ai ajouté le domaine (si nécessaire)
- [ ] J'ai renouvelé le certificat SSL
- [ ] J'ai vérifié que le certificat inclut maintenant `.fr`
- [ ] J'ai attendu 24-48h pour que Google détecte le changement

---

**Vérifiez d'abord si `lumeacommunication.fr` apparaît dans la liste des domaines de production !** 🔍
