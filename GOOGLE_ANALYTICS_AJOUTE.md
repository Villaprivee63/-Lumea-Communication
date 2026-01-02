# ✅ Google Analytics ajouté à votre site

## 🎉 Ce qui a été fait

**J'ai ajouté Google Analytics à votre site :**

1. ✅ **ID de mesure configuré** : `G-1G53CJJ2GC`
2. ✅ **Fichier créé** : `assets/js/analytics.js`
3. ✅ **Script ajouté** aux fichiers HTML principaux :
   - `index.html` (racine)
   - `ch/index.html`
   - `fr/index.html`
   - `es/index.html`

---

## ⚠️ Action requise : Ajouter aux autres fichiers HTML

**Le script a été ajouté aux fichiers principaux, mais il faut l'ajouter aux autres fichiers HTML.**

**Pour chaque fichier HTML qui contient :**
```html
<script src="assets/js/main.js" defer></script>
```

**Ajoutez juste avant :**
```html
<script src="assets/js/analytics.js" defer></script>
```

**Pour les fichiers dans les sous-dossiers (ch/, fr/, es/) qui contiennent :**
```html
<script src="../assets/js/main.js" defer></script>
```

**Ajoutez juste avant :**
```html
<script src="../assets/js/analytics.js" defer></script>
```

---

## 🚀 Déployer les modifications

**Une fois que vous avez ajouté le script à tous les fichiers HTML :**

1. **Commitez les modifications** :
   ```bash
   git add .
   git commit -m "Ajout: Google Analytics (G-1G53CJJ2GC)"
   git push
   ```

2. **Netlify déploiera automatiquement** (2-5 minutes)

3. **Attendez 24-48 heures** pour que Google Analytics commence à collecter des données

---

## 📊 Vérifier que ça fonctionne

**Après le déploiement :**

1. **Visitez votre site** : `https://lumeacommunication.ch/` ou `https://lumeacommunication.fr/`
2. **Dans Google Analytics**, allez dans **"Rapports"** → **"Temps réel"**
3. **Vous devriez voir** votre visite en temps réel (si vous visitez le site)

**Si vous ne voyez rien :**
- Attendez 24-48 heures (Google Analytics peut prendre du temps)
- Vérifiez que le script est bien présent dans le code source de la page (F12 → Sources)

---

## 📋 Checklist

- [x] ID de mesure configuré : `G-1G53CJJ2GC`
- [x] Fichier `assets/js/analytics.js` créé
- [x] Script ajouté aux fichiers principaux (index.html)
- [ ] Script ajouté à tous les autres fichiers HTML
- [ ] Modifications commitées et poussées sur GitHub
- [ ] Site déployé sur Netlify
- [ ] Vérifié dans Google Analytics après 24-48h

---

## 🎯 Prochaines étapes

**Une fois que tout est déployé :**

1. **Attendez 24-48 heures** pour que Google Analytics commence à collecter des données
2. **Dans Google Analytics**, explorez les rapports :
   - **"Rapports"** → **"Temps réel"** : Visiteurs en temps réel
   - **"Rapports"** → **"Acquisition"** : D'où viennent vos visiteurs
   - **"Rapports"** → **"Engagement"** : Pages les plus visitées
   - **"Rapports"** → **"Démographie"** : Pays des visiteurs

---

**Votre site est maintenant configuré pour Google Analytics !** 📊

**Commitez et poussez les modifications pour déployer sur Netlify.** 🚀
