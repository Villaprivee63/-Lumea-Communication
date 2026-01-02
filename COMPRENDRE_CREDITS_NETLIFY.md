# 💰 Comprendre les crédits Netlify

## 🎯 Qu'est-ce qu'un crédit Netlify ?

Les **crédits Netlify** sont une unité de mesure pour l'utilisation des ressources sur la plateforme.

---

## 📊 Ce que représentent les crédits

### 1 crédit = 1 minute de build

**Les crédits sont principalement utilisés pour :**
- ⚙️ **Builds** (constructions) : Chaque minute de build = 1 crédit
- 📦 **Déploiements** : Les déploiements utilisent des crédits selon leur durée
- 🤖 **Agent Runners** : Utilisation des agents IA
- 🔄 **Fonctions serverless** : Exécution des fonctions

### Exemples concrets :

**Build simple (site statique) :**
- Durée : ~1-2 minutes
- Crédits utilisés : 1-2 crédits

**Build complexe (avec compilation) :**
- Durée : ~5-10 minutes
- Crédits utilisés : 5-10 crédits

**Build très complexe :**
- Durée : ~15-20 minutes
- Crédits utilisés : 15-20 crédits

---

## 📈 Plans et crédits

### Plan Gratuit :
- **Crédits :** Limité (varie selon l'utilisation)
- **Problème :** Facile de dépasser la limite

### Plan "Vie personnelle" (9 $/mois) :
- **Crédits :** 1 000 crédits/mois
- **Équivalent :** ~1 000 minutes de build/mois
- **Exemple :** ~33 builds de 30 minutes, ou ~100 builds de 10 minutes

### Plan Pro (20 $/mois) :
- **Crédits :** 3 000 crédits/mois
- **Équivalent :** ~3 000 minutes de build/mois
- **Exemple :** ~100 builds de 30 minutes, ou ~300 builds de 10 minutes

---

## 🔍 Calcul pour votre site

### Votre site "Luméa Communication" :

**Type de site :** Site statique (HTML, CSS, JS)
**Durée de build typique :** 1-3 minutes
**Crédits par déploiement :** 1-3 crédits

### Avec 1 000 crédits/mois (Plan "Vie personnelle") :

- **~333 déploiements** de 3 minutes
- **~1 000 déploiements** de 1 minute
- **Suffisant pour :** Déploiements fréquents (plusieurs par jour)

### Avec 3 000 crédits/mois (Plan Pro) :

- **~1 000 déploiements** de 3 minutes
- **~3 000 déploiements** de 1 minute
- **Suffisant pour :** Déploiements très fréquents (plusieurs par heure)

---

## ⚠️ Ce qui consomme des crédits

### Consommation normale :
- ✅ **Déploiements automatiques** (git push) : 1-3 crédits
- ✅ **Builds de site statique** : 1-5 crédits
- ✅ **Déploiements manuels** : 1-3 crédits

### Consommation élevée :
- ⚠️ **Builds complexes** (compilation, tests) : 10-30 crédits
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
- 1 déploiement/jour × 3 crédits = 3 crédits/jour
- 30 jours × 3 = **90 crédits/mois** ✅ Suffisant

**Scénario 2 : Déploiements fréquents**
- 5 déploiements/jour × 3 crédits = 15 crédits/jour
- 30 jours × 15 = **450 crédits/mois** ✅ Suffisant

**Scénario 3 : Déploiements très fréquents**
- 10 déploiements/jour × 3 crédits = 30 crédits/jour
- 30 jours × 30 = **900 crédits/mois** ⚠️ Proche de la limite

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

**100 crédits = 100 minutes de build**

**Pour votre site statique :**
- 1 déploiement = ~1-3 crédits
- 1 000 crédits = ~333-1 000 déploiements
- 3 000 crédits = ~1 000-3 000 déploiements

**Recommandation :**
- **Plan "Vie personnelle"** si déploiements modérés
- **Plan Pro** si vous voulez une marge de sécurité et des fonctionnalités avancées

---

**Note :** Les crédits se réinitialisent chaque mois. Si vous dépassez la limite, vous devez attendre le mois prochain (plan gratuit) ou mettre à niveau (plan payant).
