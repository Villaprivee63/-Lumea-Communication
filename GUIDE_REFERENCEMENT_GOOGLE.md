# 🔍 Guide : Référencer votre site sur Google

## ⚠️ IMPORTANT : HTTPS d'abord !

**Avant de référencer votre site sur Google, assurez-vous que HTTPS est activé !**

Un site "Non sécurisé" sera pénalisé par Google et peut affecter votre référencement.

**Si votre site affiche "Non sécurisé" :**
1. Vérifiez que les DNS sont correctement configurés dans Netlify
2. Activez HTTPS dans Netlify (voir `GUIDE_ACTIVER_HTTPS.md`)
3. Attendez que le certificat SSL soit généré (5-15 minutes)
4. Vérifiez que le site affiche un cadenas vert

**Une fois HTTPS activé, vous pouvez continuer avec ce guide.**

---

## 🎯 Objectif

Faire en sorte que Google découvre, indexe et affiche votre site dans les résultats de recherche.

---

## ✅ Étape 1 : Google Search Console (OBLIGATOIRE)

### 1.1 Créer un compte Google Search Console

1. Allez sur [search.google.com/search-console](https://search.google.com/search-console)
2. Connectez-vous avec votre compte Google
3. Cliquez sur **"Ajouter une propriété"** (Add property)

### 1.2 Ajouter votre site

**Vous avez 2 domaines à ajouter :**
- `lumeacommunication.ch`
- `lumeacommunication.fr`

**Pour chaque domaine :**

1. Entrez l'URL : `https://lumeacommunication.ch` (ou `.fr`)
2. Choisissez **"Préfixe d'URL"** (URL prefix)
3. Cliquez sur **"Continuer"**

### 1.3 Vérifier la propriété du site

Google vous demandera de vérifier que vous êtes propriétaire du site. **3 méthodes possibles :**

#### Méthode A : Fichier HTML (Recommandé)

1. Google vous donnera un fichier HTML à télécharger
2. **Ajoutez ce fichier à la racine de votre site** (dans le dossier principal)
3. **Poussez vers GitHub** :
   ```bash
   git add google*.html
   git commit -m "Ajout fichier vérification Google Search Console"
   git push
   ```
4. Attendez le déploiement Netlify (30 secondes)
5. Dans Google Search Console, cliquez sur **"Vérifier"**

#### Méthode B : Balise meta HTML

1. Google vous donnera une balise `<meta>` à ajouter
2. **Ajoutez-la dans le `<head>` de votre `index.html`**
3. Poussez vers GitHub
4. Vérifiez dans Google Search Console

#### Méthode C : DNS (Si vous gérez les DNS)

1. Google vous donnera un enregistrement TXT à ajouter
2. Ajoutez-le dans la gestion DNS de votre domaine
3. Vérifiez dans Google Search Console

### 1.4 Soumettre le sitemap

Une fois le site vérifié :

1. Dans Google Search Console, allez dans **"Sitemaps"** (menu de gauche)
2. Entrez : `sitemap.xml`
3. Cliquez sur **"Envoyer"** (Submit)

**Répétez pour chaque domaine** (`.ch` et `.fr`)

---

## ✅ Étape 2 : Vérifier et mettre à jour le sitemap

### 2.1 Vérifier le sitemap actuel

Votre sitemap existe déjà (`sitemap.xml`), mais vérifiez qu'il utilise les bons domaines :
- ✅ `https://lumeacommunication.ch` (au lieu de `lumea.ch`)
- ✅ `https://lumeacommunication.fr` (si vous l'avez)

### 2.2 Accéder au sitemap en ligne

Une fois le site en ligne, vérifiez que le sitemap est accessible :
- `https://lumeacommunication.ch/sitemap.xml`
- `https://lumeacommunication.fr/sitemap.xml`

---

## ✅ Étape 3 : Google Analytics (Optionnel mais recommandé)

### 3.1 Créer un compte Google Analytics

1. Allez sur [analytics.google.com](https://analytics.google.com)
2. Connectez-vous avec votre compte Google
3. Cliquez sur **"Commencer la mesure"** (Start measuring)

### 3.2 Créer une propriété

1. Donnez un nom à votre compte (ex: "Luméa Communication")
2. Cliquez sur **"Suivant"**
3. Donnez un nom à la propriété (ex: "Site Web Luméa")
4. Choisissez votre fuseau horaire
5. Cliquez sur **"Suivant"**

### 3.3 Obtenir l'ID de mesure

1. Google vous donnera un **ID de mesure** (ex: `G-XXXXXXXXXX`)
2. Notez cet ID

### 3.4 Ajouter Google Analytics au site

**Je peux vous aider à ajouter le code Google Analytics dans vos pages HTML.**

Le code à ajouter ressemble à :
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## ✅ Étape 4 : Optimisations SEO de base

### 4.1 Vérifier les balises meta

Vérifiez que chaque page a :
- ✅ `<title>` unique et descriptif
- ✅ `<meta name="description">` unique (150-160 caractères)
- ✅ `<meta name="robots" content="index, follow">`

### 4.2 Vérifier les balises hreflang

Votre site a déjà des balises `hreflang` pour les versions CH, FR, ES. Vérifiez qu'elles pointent vers les bons domaines.

### 4.3 Vérifier les images

- ✅ Toutes les images ont un attribut `alt` descriptif
- ✅ Les images sont optimisées (taille raisonnable)

### 4.4 Vérifier la structure

- ✅ Utilisation correcte des balises `<h1>`, `<h2>`, `<h3>`
- ✅ Contenu unique et de qualité
- ✅ Liens internes entre les pages

---

## ✅ Étape 5 : Demander l'indexation

### 5.1 Dans Google Search Console

1. Allez dans **"Inspection d'URL"** (URL Inspection)
2. Entrez l'URL de votre page d'accueil : `https://lumeacommunication.ch/ch/`
3. Cliquez sur **"Demander l'indexation"** (Request indexing)

**Répétez pour les pages importantes :**
- Page d'accueil CH
- Page d'accueil FR
- Pages principales (services, contact, etc.)

### 5.2 Attendre l'indexation

- **Temps d'attente** : Généralement 1-7 jours
- **Vérification** : Recherchez `site:lumeacommunication.ch` sur Google

---

## ✅ Étape 6 : Vérifier l'indexation

### 6.1 Recherche Google

1. Allez sur [google.com](https://www.google.com)
2. Recherchez : `site:lumeacommunication.ch`
3. Vous devriez voir vos pages indexées

### 6.2 Dans Google Search Console

1. Allez dans **"Couverture"** (Coverage)
2. Vérifiez le nombre de pages indexées
3. Vérifiez s'il y a des erreurs

---

## 📊 Checklist complète

### Google Search Console
- [ ] Compte Google Search Console créé
- [ ] Site `lumeacommunication.ch` ajouté et vérifié
- [ ] Site `lumeacommunication.fr` ajouté et vérifié
- [ ] Sitemap soumis pour `.ch`
- [ ] Sitemap soumis pour `.fr`
- [ ] Pages importantes demandées en indexation

### Google Analytics (Optionnel)
- [ ] Compte Google Analytics créé
- [ ] ID de mesure obtenu
- [ ] Code Analytics ajouté au site

### Optimisations SEO
- [ ] Balises meta vérifiées
- [ ] Balises hreflang vérifiées
- [ ] Images avec attributs alt
- [ ] Structure HTML correcte

### Vérification
- [ ] Site accessible en ligne
- [ ] Sitemap accessible (`/sitemap.xml`)
- [ ] Robots.txt accessible (`/robots.txt`)
- [ ] Pages indexées vérifiées sur Google

---

## 🆘 Dépannage

### Le site n'apparaît pas dans Google

- Attendez 1-7 jours (indexation normale)
- Vérifiez que le sitemap est soumis
- Vérifiez qu'il n'y a pas d'erreurs dans Google Search Console
- Vérifiez que `robots.txt` n'interdit pas l'indexation

### Erreurs dans Google Search Console

- Consultez la section **"Couverture"** pour voir les erreurs
- Corrigez les erreurs signalées
- Redemandez l'indexation après correction

### Le sitemap n'est pas accepté

- Vérifiez que le sitemap est accessible en ligne
- Vérifiez le format XML (doit être valide)
- Vérifiez que les URLs dans le sitemap sont accessibles

---

## 🎯 Résultat attendu

Après quelques jours :
- ✅ Votre site apparaît dans les résultats Google
- ✅ Les pages sont indexées
- ✅ Vous pouvez voir les statistiques dans Google Search Console
- ✅ Vous pouvez voir les visites dans Google Analytics (si activé)

---

**Note :** L'indexation peut prendre quelques jours. Soyez patient ! 🚀
