# 💰 Comprendre les crédits Netlify

## 🎯 Qu'est-ce qu'un crédit Netlify ?

Les **crédits Netlify** sont une unité de mesure pour l'utilisation des ressources sur la plateforme.

---

## 📊 Ce que représentent les crédits

**Les crédits Netlify sont utilisés pour :**

### 1. Déploiements en production
- **1 déploiement en production = 15 crédits**
- Peu importe la durée du build (1 minute ou 30 minutes)
- Chaque `git push` qui déclenche un déploiement = 15 crédits

### 2. Bande passante (trafic)
- **1 GB de données servies = 10 crédits**
- Inclut : pages web, images, CSS, JS, fichiers téléchargés
- Chaque visite consomme de la bande passante

### 3. Autres services
- 🤖 **Agent Runners** : Selon l'utilisation
- 🔄 **Fonctions serverless** : Selon l'exécution
- 📊 **Analytics** : Selon le plan

### Exemples concrets :

**Déploiement simple (site statique) :**
- 1 déploiement = **15 crédits**
- Peu importe si le build prend 30 secondes ou 5 minutes

**Bande passante :**
- 100 visiteurs × 2 MB par visite = 200 MB = 0.2 GB = **2 crédits**
- 1 000 visiteurs × 2 MB = 2 GB = **20 crédits**

---

## 📈 Plans et crédits

### Plan Gratuit :
- **Crédits :** 300 crédits/mois
- **Équivalent :** ~20 déploiements (300 ÷ 15) ou ~30 GB de bande passante
- **Problème :** Limite très basse, facile à dépasser

### Plan "Vie personnelle" (9 $/mois) :
- **Crédits :** 1 000 crédits/mois
- **Équivalent :** ~66 déploiements (1 000 ÷ 15) ou ~100 GB de bande passante
- **Exemple :** ~2 déploiements/jour ou ~3 GB de trafic/jour

### Plan Pro (20 $/mois) :
- **Crédits :** 3 000 crédits/mois
- **Équivalent :** ~200 déploiements (3 000 ÷ 15) ou ~300 GB de bande passante
- **Exemple :** ~6-7 déploiements/jour ou ~10 GB de trafic/jour

---

## 🔍 Calcul pour votre site

### Votre site "Luméa Communication" :

**Type de site :** Site statique (HTML, CSS, JS)
**Crédits par déploiement :** 15 crédits (fixe, peu importe la durée)

### Avec 1 000 crédits/mois (Plan "Vie personnelle") :

- **~66 déploiements** (1 000 ÷ 15)
- **OU ~100 GB de bande passante** (1 000 ÷ 10)
- **Suffisant pour :** ~2 déploiements/jour + trafic modéré

### Avec 3 000 crédits/mois (Plan Pro) :

- **~200 déploiements** (3 000 ÷ 15)
- **OU ~300 GB de bande passante** (3 000 ÷ 10)
- **Suffisant pour :** ~6-7 déploiements/jour + trafic important

---

## ⚠️ Ce qui consomme des crédits

### Consommation normale :
- ✅ **Déploiements automatiques** (git push) : **15 crédits** par déploiement
- ✅ **Déploiements manuels** : **15 crédits** par déploiement
- ✅ **Bande passante** : **10 crédits** par GB de données servies

### Consommation élevée :
- ⚠️ **Beaucoup de déploiements** : Chaque déploiement = 15 crédits
- ⚠️ **Trafic important** : 1 GB = 10 crédits
- ⚠️ **Agent Runners** (IA) : Variable selon l'utilisation
- ⚠️ **Fonctions serverless** : Selon l'exécution

---

## 💡 Pourquoi vous avez dépassé la limite

**Causes possibles :**
1. **Beaucoup de déploiements** : Chaque `git push` = 1 déploiement
2. **Builds longs** : Si vos builds prennent du temps
3. **Tests automatiques** : Si vous avez des tests qui s'exécutent
4. **Agent Runners** : Si vous utilisez les agents IA

**Avec le plan gratuit :**
- Limite très basse
- Facile à dépasser avec un usage normal

---

## 📊 Comparaison pratique

### Plan "Vie personnelle" (1 000 crédits) :

**Scénario 1 : Déploiements quotidiens**
- 1 déploiement/jour × 15 crédits = 15 crédits/jour
- 30 jours × 15 = **450 crédits/mois** ✅ Suffisant

**Scénario 2 : Déploiements fréquents**
- 2 déploiements/jour × 15 crédits = 30 crédits/jour
- 30 jours × 30 = **900 crédits/mois** ⚠️ Proche de la limite

**Scénario 3 : Déploiements + trafic**
- 1 déploiement/jour = 15 crédits/jour
- + 2 GB de trafic/jour = 20 crédits/jour
- Total = 35 crédits/jour × 30 = **1 050 crédits/mois** ❌ Dépassement

### Plan Pro (3 000 crédits) :

**Tous les scénarios ci-dessus** ✅ Suffisant avec marge

### Plan Pro (3 000 crédits) :

**Tous les scénarios ci-dessus** ✅ Suffisant avec marge

---

## 🎯 Recommandation pour votre site

**Pour "Luméa Communication" (site statique) :**

### Plan "Vie personnelle" (1 000 crédits) :
- ✅ **Suffisant si** : Déploiements modérés (quelques par jour)
- ⚠️ **Risque si** : Déploiements très fréquents ou builds longs
- 💰 **Coût :** 9 $/mois

### Plan Pro (3 000 crédits) :
- ✅ **Suffisant pour** : Déploiements très fréquents
- ✅ **Marge de sécurité** : 3× plus de crédits
- ✅ **Fonctionnalités avancées** : Analytics, etc.
- 💰 **Coût :** 20 $/mois

---

## 💡 Conclusion

**100 crédits représentent :**
- **~6-7 déploiements** (100 ÷ 15)
- **OU ~10 GB de bande passante** (100 ÷ 10)

**Pour votre site statique :**
- 1 déploiement = **15 crédits** (fixe)
- 1 000 crédits = **~66 déploiements** ou **~100 GB de trafic**
- 3 000 crédits = **~200 déploiements** ou **~300 GB de trafic**

**Recommandation :**
- **Plan "Vie personnelle"** si déploiements modérés
- **Plan Pro** si vous voulez une marge de sécurité et des fonctionnalités avancées

---

**Note :** Les crédits se réinitialisent chaque mois. Si vous dépassez la limite, vous devez attendre le mois prochain (plan gratuit) ou mettre à niveau (plan payant).
