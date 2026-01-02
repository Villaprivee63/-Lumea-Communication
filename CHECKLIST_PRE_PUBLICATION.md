# ✅ CHECKLIST PRÉ-PUBLICATION - Luméa Communication

## 🔴 CRITIQUE - À FAIRE AVANT PUBLICATION

### 1. **FORMULAIRES DE CONTACT** ⚠️
- [ ] **Configurer un système d'envoi d'email pour les formulaires**
  - Options recommandées :
    - **Formspree** (gratuit jusqu'à 50 soumissions/mois) : https://formspree.io
    - **EmailJS** (gratuit jusqu'à 200 emails/mois) : https://www.emailjs.com
    - **Backend personnalisé** (PHP, Node.js, etc.)
  - Actuellement : Les formulaires simulent juste l'envoi (pas de backend)
  - Fichiers à modifier : `assets/js/main.js` (lignes 153-178)
  - Pages concernées : Toutes les pages `contact.html` et `contacto.html` (CH, FR, ES)

### 2. **COORDONNÉES DE CONTACT** ⚠️
- [ ] **Ajouter les coordonnées complètes dans toutes les pages de contact**
  - Adresse postale complète
  - Numéro de téléphone
  - Adresse email
  - Horaires d'ouverture (optionnel)
  - Fichiers à compléter :
    - `ch/contact.html` (ligne 102)
    - `fr/contact.html` (ligne 102)
    - `es/contacto.html` (ligne 147)

### 3. **MENTIONS LÉGALES** ⚠️
- [ ] **Compléter les informations légales dans toutes les versions**
  - Raison sociale complète
  - Adresse du siège social
  - Numéro d'identification (SIRET, IDE, etc.)
  - Numéro RCS (si applicable)
  - Fichiers à compléter :
    - `ch/mentions-legales.html` (ligne 108)
    - `fr/mentions-legales.html` (ligne 108)
    - `es/aviso-legal.html` (ligne 109)

### 4. **INFORMATIONS D'HÉBERGEMENT** ⚠️
- [ ] **Ajouter les informations d'hébergement dans les mentions légales**
  - Nom de l'hébergeur
  - Adresse de l'hébergeur
  - Fichiers à compléter :
    - `ch/mentions-legales.html` (ligne 111)
    - `fr/mentions-legales.html` (ligne 111)
    - `es/aviso-legal.html` (ligne 112)

## 🟡 IMPORTANT - À VÉRIFIER

### 5. **SITEMAP.XML** ✅ (CORRIGÉ)
- [x] Ajout des pages de développement manquantes
- [ ] Vérifier que toutes les pages sont présentes
- [ ] Mettre à jour la date `lastmod` avec la date de publication réelle

### 6. **ROBOTS.TXT** ✅
- [x] Fichier présent et correctement configuré
- [x] Référence au sitemap présente

### 7. **IMAGES** ✅
- [x] Toutes les images référencées existent dans `assets/img/photos/`
- [x] Toutes les images ont des attributs `alt` descriptifs
- [ ] Vérifier que les images sont optimisées (compression, format WebP si possible)

### 8. **LIENS INTERNES**
- [ ] Tester tous les liens de navigation
- [ ] Vérifier que tous les liens relatifs fonctionnent
- [ ] Vérifier les liens entre versions (CH, FR, ES)

### 9. **COMPATIBILITÉ MOBILE**
- [ ] Tester sur différents appareils (iPhone, Android, tablette)
- [ ] Vérifier que le menu mobile fonctionne
- [ ] Vérifier que tous les formulaires sont utilisables sur mobile

### 10. **PERFORMANCE**
- [ ] Optimiser les images (compression, lazy loading déjà en place)
- [ ] Minifier le CSS et JavaScript (optionnel mais recommandé)
- [ ] Vérifier les temps de chargement

### 11. **SÉCURITÉ**
- [ ] Vérifier qu'il n'y a pas de données sensibles dans le code
- [ ] S'assurer que les formulaires ont une protection anti-spam (reCAPTCHA recommandé)
- [ ] Vérifier les headers de sécurité (HTTPS, CSP, etc.)

### 12. **ACCESSIBILITÉ**
- [x] Attributs `alt` sur toutes les images
- [x] Attributs `aria-label` sur les éléments interactifs
- [x] Structure HTML sémantique
- [ ] Tester avec un lecteur d'écran
- [ ] Vérifier le contraste des couleurs

## 🟢 OPTIONNEL - AMÉLIORATIONS

### 13. **ANALYTICS**
- [ ] Ajouter Google Analytics ou autre outil d'analyse
- [ ] Configurer les événements de conversion

### 14. **RÉSEAUX SOCIAUX**
- [ ] Ajouter les liens vers les réseaux sociaux (si applicable)
- [ ] Vérifier que les Open Graph tags fonctionnent correctement

### 15. **TEST FINAL**
- [ ] Tester sur différents navigateurs (Chrome, Firefox, Safari, Edge)
- [ ] Tester sur différentes tailles d'écran
- [ ] Vérifier que tous les formulaires fonctionnent
- [ ] Vérifier que tous les liens fonctionnent
- [ ] Vérifier l'orthographe et la grammaire

## 📝 NOTES IMPORTANTES

1. **Formulaires** : Actuellement, les formulaires affichent juste un message de confirmation. Il faut absolument configurer un système d'envoi d'email avant la publication.

2. **Coordonnées** : Les placeholders doivent être remplacés par les vraies coordonnées avant publication.

3. **Mentions légales** : Obligatoires en France, Suisse et Espagne. Les informations doivent être complètes et exactes.

4. **Hébergement** : Les informations d'hébergement sont obligatoires dans les mentions légales en France.

## 🚀 APRÈS PUBLICATION

- [ ] Soumettre le sitemap à Google Search Console
- [ ] Soumettre le sitemap à Bing Webmaster Tools
- [ ] Vérifier l'indexation des pages
- [ ] Configurer les redirections 301 si nécessaire
- [ ] Mettre en place un système de monitoring (uptime, erreurs, etc.)
