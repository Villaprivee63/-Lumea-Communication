# 🎯 Plan d'action - Que faire maintenant

## ✅ Étape 1 : Vérifier que `.fr` fonctionne (2 minutes)

**Testez dans votre navigateur :**

1. **Allez sur** : `https://lumeacommunication.fr/` (sans www)
2. **Regardez l'icône de cadenas** dans la barre d'adresse :
   - ✅ **Cadenas vert** = SSL OK → Passez à l'Étape 2
   - ⚠️ **Avertissement** = Propagation en cours → Attendez 5-15 min puis réessayez
   - ❌ **"Non sécurisé"** = Problème → Attendez 15 min ou renouvelez le certificat dans Netlify

**Si le SSL fonctionne :** ✅ Continuez avec l'Étape 2

**Si le SSL ne fonctionne pas encore :** ⏳ Attendez 15 minutes puis réessayez

---

## ✅ Étape 2 : Soumettre le sitemap pour `.ch` (2 minutes)

**Le domaine `.ch` fonctionne parfaitement, travaillons dessus :**

1. **Ouvrez Google Search Console** : [search.google.com/search-console](https://search.google.com/search-console)

2. **Changez de propriété** :
   - Cliquez sur le **menu déroulant en haut à gauche** (où il y a `https://lumeacommunication.fr/`)
   - **Sélectionnez** `https://lumeacommunication.ch/`
   - **Si vous ne le voyez pas** : Cliquez sur "Ajouter une propriété" et ajoutez `https://lumeacommunication.ch/`

3. **Allez dans "Indexation" → "Sitemaps"**

4. **Dans le champ "Saisir l'URL du sitemap"**, entrez : `sitemap.xml`

5. **Cliquez sur "ENVOYER"**

6. **Attendez quelques minutes** que Google traite le sitemap

**Résultat attendu :** État "Opération effectuée" avec ~40 pages découvertes

---

## ✅ Étape 3 : Demander l'indexation pour `.ch` (5-10 minutes)

**Pages prioritaires à indexer pour `lumeacommunication.ch` :**

```
https://lumeacommunication.ch/ch/
https://lumeacommunication.ch/ch/consulting.html
https://lumeacommunication.ch/ch/formation.html
https://lumeacommunication.ch/ch/cybersecurite.html
https://lumeacommunication.ch/ch/contact.html
```

**Comment faire :**

1. **Dans Google Search Console** (pour `.ch`), allez dans **"Inspection de l'URL"**

2. **Pour chaque URL de la liste ci-dessus :**
   - **Copiez l'URL** (ex: `https://lumeacommunication.ch/ch/`)
   - **Collez-la** dans le champ "Inspection de l'URL"
   - **Appuyez sur Entrée** ou cliquez sur la loupe
   - **Attendez** que Google analyse l'URL (quelques secondes)
   - **Si l'URL n'est pas indexée**, cliquez sur **"Demander l'indexation"**
   - **Répétez** pour la prochaine URL

**⚠️ Important :** Google limite à ~10 demandes d'indexation par jour et par propriété. Vous avez 5 URLs, donc c'est parfait !

---

## ✅ Étape 4 : Vérifier `.fr` dans Google Search Console (après SSL corrigé)

**Une fois que le SSL fonctionne pour `.fr` (cadenas vert) :**

1. **Dans Google Search Console**, sélectionnez `https://lumeacommunication.fr/`

2. **Allez dans "Inspection de l'URL"**

3. **Testez** : `https://lumeacommunication.fr/fr/`

4. **Vérifiez que l'erreur SSL a disparu** (ne devrait plus dire "Certificat SSL incorrect")

5. **Si OK, demandez l'indexation** des pages prioritaires pour `.fr` :

```
https://lumeacommunication.fr/fr/
https://lumeacommunication.fr/fr/consulting.html
https://lumeacommunication.fr/fr/formation.html
https://lumeacommunication.fr/fr/cybersecurite.html
https://lumeacommunication.fr/fr/contact.html
```

---

## 📋 Checklist rapide

**À faire maintenant :**
- [ ] Vérifier que `https://lumeacommunication.fr/` fonctionne avec SSL
- [ ] Soumettre le sitemap pour `lumeacommunication.ch` dans Google Search Console
- [ ] Demander l'indexation des 5 pages prioritaires pour `.ch`

**À faire après (si SSL `.fr` corrigé) :**
- [ ] Vérifier dans Google Search Console que l'erreur SSL a disparu pour `.fr`
- [ ] Demander l'indexation des 5 pages prioritaires pour `.fr`

---

## ⏱️ Temps nécessaire

- **Vérification SSL `.fr`** : 2 minutes
- **Sitemap pour `.ch`** : 2 minutes
- **Indexation pour `.ch`** : 5-10 minutes
- **Total** : ~10-15 minutes

---

## 🎯 Ordre d'exécution

**1. MAINTENANT :**
   - ✅ Vérifier `.fr` (2 min)
   - ✅ Sitemap pour `.ch` (2 min)
   - ✅ Indexation pour `.ch` (5-10 min)

**2. DANS 15-30 MINUTES (si SSL `.fr` corrigé) :**
   - ✅ Vérifier dans Google Search Console que l'erreur SSL a disparu
   - ✅ Indexation pour `.fr` (5-10 min)

---

**Commencez par l'Étape 1 : Vérifiez que `.fr` fonctionne, puis passez à l'Étape 2 !** 🚀
