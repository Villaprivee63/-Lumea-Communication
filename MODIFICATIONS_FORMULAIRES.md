# 📋 Modifications des formulaires de contact

## ✅ Modifications effectuées

### 1. Champ "Nom" → "Nom ou entreprise"
- Tous les formulaires affichent maintenant "Nom ou entreprise *" au lieu de "Nom *"
- Permet d'entrer soit un nom personnel, soit un nom d'entreprise

### 2. Sélecteur d'indicatif téléphonique
- Ajout d'un sélecteur d'indicatif avec drapeaux :
  - 🇫🇷 +33 (France)
  - 🇨🇭 +41 (Suisse)
  - 🇪🇸 +34 (Espagne)
- **Valeur par défaut selon la page** :
  - Page FR (`fr/contact.html`) : +33 sélectionné par défaut
  - Page CH (`ch/contact.html`) : +41 sélectionné par défaut
  - Page ES (`es/contacto.html`) : +34 sélectionné par défaut
  - Page racine (`contact.html`) : +33 sélectionné par défaut
- L'utilisateur peut changer l'indicatif si nécessaire
- Le numéro de téléphone est construit automatiquement : `[préfixe] [numéro]`

### 3. Champ "Entreprise" → "Raison de contact"
- Remplacement du champ texte "Entreprise" par un menu déroulant "Raison de contact"
- Options disponibles :
  - Consulting
  - Formation
  - Cybersécurité
  - Création de site
  - Branding
  - Développement
  - Autre
- Traductions pour la version espagnole :
  - Consultoría
  - Formación
  - Ciberseguridad
  - Creación de sitio
  - Branding
  - Desarrollo
  - Otro

### 4. JavaScript mis à jour
- Construction automatique du numéro de téléphone complet avec préfixe
- Traduction automatique de la raison selon la langue de la page
- Envoi de `phone` (numéro complet) et `reason` (raison traduite) à EmailJS

### 5. CSS amélioré
- Styles ajoutés pour les éléments `<select>` pour qu'ils correspondent au design
- Flèche personnalisée pour les selects
- Styles cohérents avec les autres champs du formulaire

## 📧 Mise à jour du template EmailJS requise

Pour que la raison de contact apparaisse dans les emails, ajoutez dans votre template EmailJS :

### Dans la section principale (après l'email) :
```html
{{#reason}}
<div style="color: #3b82f6; font-size: 13px; margin-bottom: 10px; font-weight: 600;">
  📋 Raison : {{reason}}
</div>
{{/reason}}
```

### Dans la section "Informations de contact" :
```html
{{#reason}}
<tr>
  <td style="color: #b8b8b8; font-size: 13px; padding: 5px 0;">Raison :</td>
  <td style="color: #f5f5f5; font-size: 13px; padding: 5px 0; font-weight: 600; color: #3b82f6;">{{reason}}</td>
</tr>
{{/reason}}
```

## 📝 Fichiers modifiés

- ✅ `fr/contact.html`
- ✅ `ch/contact.html`
- ✅ `es/contacto.html`
- ✅ `contact.html` (racine)
- ✅ `assets/js/main.js`
- ✅ `assets/css/styles.css`
- ✅ `TEMPLATE_EMAIL_LUMEA.html` (référence)

## 🧪 Test

1. Testez chaque page de contact
2. Vérifiez que l'indicatif par défaut correspond à la page
3. Testez le changement d'indicatif
4. Testez la sélection d'une raison de contact
5. Envoyez un formulaire et vérifiez que l'email contient :
   - Le numéro de téléphone complet avec préfixe
   - La raison de contact traduite
