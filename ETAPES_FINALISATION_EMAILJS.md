# 🎯 Étapes finales pour activer le formulaire EmailJS

## ✅ Ce qui est déjà fait
- ✅ Code JavaScript configuré pour EmailJS
- ✅ Script EmailJS ajouté dans toutes les pages de contact
- ✅ Service Outlook configuré (Service ID: `service_h5cz56a`)
- ✅ Template d'email créé

## 📋 Ce qu'il reste à faire

### 1. Récupérer vos identifiants EmailJS

#### A. Service ID (déjà connu)
- **Service ID** : `service_h5cz56a` ✅

#### B. Template ID
1. Dans EmailJS, allez dans **"Modèles d'e-mails"** (Email Templates)
2. Cliquez sur votre template **"Contactez-nous"**
3. Regardez l'URL dans la barre d'adresse, elle ressemble à :
   ```
   https://dashboard.emailjs.com/admin/template/XXXXXXXXX
   ```
   Le `XXXXXXXXX` est votre **Template ID**
   
   OU
   
   Regardez dans les paramètres du template, il devrait être affiché quelque part.

#### C. Public Key
1. Dans EmailJS, allez dans **"Compte"** (Account) → **"General"**
2. Trouvez la section **"Public Key"**
3. **Copiez cette clé** (elle ressemble à : `abcdefghijklmnop`)

### 2. Mettre à jour le code

Une fois que vous avez les 3 identifiants :

1. Ouvrez le fichier : `assets/js/main.js`
2. Trouvez les lignes 157-159 :
   ```javascript
   const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
   const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
   const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
   ```
3. Remplacez par vos vrais identifiants :
   ```javascript
   const EMAILJS_SERVICE_ID = 'service_h5cz56a';
   const EMAILJS_TEMPLATE_ID = 'VOTRE_TEMPLATE_ID_ICI';
   const EMAILJS_PUBLIC_KEY = 'VOTRE_PUBLIC_KEY_ICI';
   ```

### 3. Tester le formulaire

1. Ouvrez une page de contact sur votre site (localement ou en ligne)
2. Remplissez le formulaire avec des données de test
3. Cliquez sur "Envoyer"
4. Vérifiez que :
   - Le message de succès s'affiche
   - Vous recevez bien l'email à `bustoholding@outlook.fr`
   - L'email a le bon format avec toutes les informations

## 🆘 Si ça ne fonctionne pas

### Erreur "EmailJS n'est pas chargé"
- Vérifiez que le script EmailJS est bien inclus dans la page HTML
- Ouvrez la console du navigateur (F12) pour voir les erreurs

### L'email n'est pas envoyé
- Vérifiez que les identifiants sont corrects dans `main.js`
- Vérifiez que le Service ID correspond bien au service configuré
- Vérifiez que le Template ID correspond au template créé
- Vérifiez que la Public Key est correcte

### Les variables ne s'affichent pas dans l'email
- Vérifiez que les noms de variables dans le template EmailJS correspondent exactement :
  - `{{from_name}}`
  - `{{from_email}}`
  - `{{company}}`
  - `{{message}}`
  - `{{reply_to}}`

## 📝 Checklist finale

- [ ] Service ID récupéré : `service_h5cz56a` ✅
- [ ] Template ID récupéré : `_________________`
- [ ] Public Key récupérée : `_________________`
- [ ] Code mis à jour dans `assets/js/main.js`
- [ ] Formulaire testé et fonctionnel
- [ ] Email reçu avec toutes les informations

Une fois tout cela fait, votre formulaire de contact sera **100% fonctionnel** ! 🎉
