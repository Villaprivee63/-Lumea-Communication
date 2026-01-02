# 📊 Guide : Configurer Google Analytics

## 🎯 Pourquoi Google Analytics ?

**Google Analytics vous permet de :**
- 📈 Suivre le nombre de visiteurs sur votre site
- 🔍 Voir d'où viennent vos visiteurs (pays, sources, etc.)
- 📄 Connaître les pages les plus visitées
- ⏱️ Comprendre le comportement des visiteurs (temps passé, pages vues, etc.)
- 🎯 Mesurer l'efficacité de votre référencement

**C'est complémentaire à Google Search Console :**
- **Google Search Console** = Comment Google voit votre site (indexation, erreurs, etc.)
- **Google Analytics** = Comment les visiteurs utilisent votre site (trafic, comportement, etc.)

---

## ✅ Étape 1 : Créer un compte Google Analytics (5 minutes)

### 1.1 : Accéder à Google Analytics

1. **Allez sur** : [analytics.google.com](https://analytics.google.com)
2. **Connectez-vous** avec votre compte Google (le même que pour Google Search Console)
3. **Cliquez sur "Commencer la mesure"** ou "Créer un compte"

### 1.2 : Créer un compte

1. **Nom du compte** : Entrez "Luméa Communication" (ou un nom de votre choix)
2. **Cochez les cases** pour partager les données avec Google (optionnel)
3. **Cliquez sur "Suivant"**

### 1.3 : Créer une propriété

1. **Nom de la propriété** : Entrez "Luméa Communication" (ou un nom de votre choix)
2. **Fuseau horaire** : Sélectionnez votre fuseau horaire (ex: "Europe/Paris")
3. **Devise** : Sélectionnez votre devise (ex: "EUR")
4. **Cliquez sur "Suivant"**

### 1.4 : Informations sur votre entreprise

1. **Secteur d'activité** : Sélectionnez "Technologie" ou "Services professionnels"
2. **Taille de l'entreprise** : Sélectionnez la taille appropriée
3. **Cliquez sur "Créer"**

### 1.5 : Accepter les conditions

1. **Lisez et acceptez** les conditions d'utilisation
2. **Cliquez sur "J'accepte"**

---

## ✅ Étape 2 : Obtenir le code de suivi (2 minutes)

### 2.1 : Accéder au code de suivi

1. **Dans Google Analytics**, allez dans **"Administration"** (icône d'engrenage en bas à gauche)
2. **Sous "Propriété"**, cliquez sur **"Flux de données"**
3. **Cliquez sur "Ajouter un flux"** → **"Web"**
4. **Entrez les informations :**
   - **URL du site web** : `https://lumeacommunication.ch` (ou `.fr`)
   - **Nom du flux** : "Luméa Communication" (ou un nom de votre choix)
5. **Cliquez sur "Créer un flux"**

### 2.2 : Obtenir l'ID de mesure

1. **Vous verrez votre "ID de mesure"** (format : `G-XXXXXXXXXX`)
2. **Notez cet ID** - vous en aurez besoin pour l'ajouter à votre site

**Ou utilisez Google Analytics 4 (GA4) :**

1. **Dans "Administration"** → **"Propriété"** → **"Informations sur la propriété"**
2. **Vous verrez votre "ID de mesure"** (format : `G-XXXXXXXXXX`)

---

## ✅ Étape 3 : Ajouter le code à votre site (10 minutes)

### Option A : Ajouter dans tous les fichiers HTML (RECOMMANDÉ)

**Je vais vous créer un fichier avec le code à ajouter.**

### Option B : Ajouter via Google Tag Manager (AVANCÉ)

**Plus complexe mais plus flexible - à faire plus tard si nécessaire.**

---

## 🔧 Ce que je vais faire pour vous

**Je vais ajouter le code Google Analytics à votre site :**

1. **Créer un fichier JavaScript** pour Google Analytics
2. **L'ajouter à tous vos fichiers HTML** (index.html, pages CH/FR/ES, etc.)
3. **Configurer pour les deux domaines** (.ch et .fr)

**Vous devrez juste me donner votre ID de mesure** (format : `G-XXXXXXXXXX`)

---

## 📋 Instructions pour vous

### 1. Créez votre compte Google Analytics

1. **Allez sur** [analytics.google.com](https://analytics.google.com)
2. **Créez un compte** (suivez les étapes ci-dessus)
3. **Obtenez votre ID de mesure** (format : `G-XXXXXXXXXX`)

### 2. Donnez-moi votre ID de mesure

**Une fois que vous avez votre ID de mesure, dites-moi :**
- "Mon ID Google Analytics est : G-XXXXXXXXXX"

**Je l'ajouterai automatiquement à tous vos fichiers HTML !**

---

## 🎯 Configuration pour plusieurs domaines

**Vous avez deux domaines (.ch et .fr) :**

**Option 1 : Un seul compte Analytics (RECOMMANDÉ)**
- ✅ Un seul ID de mesure pour les deux domaines
- ✅ Vous verrez le trafic des deux domaines ensemble
- ✅ Plus simple à gérer

**Option 2 : Deux comptes Analytics séparés**
- ✅ Un ID de mesure pour `.ch`
- ✅ Un ID de mesure pour `.fr`
- ✅ Vous verrez le trafic séparément pour chaque domaine
- ⚠️ Plus complexe à gérer

**Je recommande l'Option 1** - un seul compte pour les deux domaines.

---

## ⏱️ Temps nécessaire

- **Créer le compte Google Analytics** : 5 minutes
- **Obtenir l'ID de mesure** : 2 minutes
- **Ajouter le code au site** : 10 minutes (je le ferai pour vous)
- **Total** : ~15-20 minutes

---

## 📊 Après configuration

**Une fois le code ajouté :**

1. **Attendez 24-48 heures** pour que Google Analytics commence à collecter des données
2. **Dans Google Analytics**, allez dans **"Rapports"** → **"Temps réel"**
3. **Vous devriez voir** les visiteurs en temps réel (si quelqu'un visite votre site)

**Données disponibles :**
- **Nombre de visiteurs** par jour/semaine/mois
- **Pages les plus visitées**
- **Sources de trafic** (Google, réseaux sociaux, liens directs, etc.)
- **Pays des visiteurs**
- **Appareils utilisés** (mobile, desktop, tablette)
- **Et bien plus encore !**

---

## 🆘 Besoin d'aide ?

**Si vous avez des questions ou des problèmes :**
- Consultez la documentation Google Analytics
- Contactez le support Google Analytics
- Ou demandez-moi !

---

## 📝 Checklist

- [ ] J'ai créé mon compte Google Analytics
- [ ] J'ai obtenu mon ID de mesure (format : `G-XXXXXXXXXX`)
- [ ] J'ai donné mon ID de mesure pour qu'il soit ajouté au site
- [ ] J'ai vérifié que le code est bien ajouté (après déploiement)
- [ ] J'ai attendu 24-48h pour voir les premières données

---

**Créez votre compte Google Analytics et donnez-moi votre ID de mesure, je l'ajouterai à votre site !** 🚀
