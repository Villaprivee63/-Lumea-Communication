# 📧 Configuration EmailJS pour les formulaires de contact

## 🚀 Pourquoi EmailJS ?

EmailJS est une solution plus fiable que Formspree, avec :
- ✅ **200 emails/mois gratuits** (vs 50 pour Formspree)
- ✅ **Plus stable** et moins de bugs
- ✅ **Configuration simple** via dashboard
- ✅ **Support de plusieurs services email** (Gmail, Outlook, etc.)

## 📋 Étapes de configuration

### 1. Créer un compte EmailJS
1. Allez sur https://www.emailjs.com
2. Cliquez sur "Sign Up" (gratuit)
3. Créez un compte avec votre email

### 2. Ajouter un service email
1. Une fois connecté, allez dans **"Email Services"**
2. Cliquez sur **"Add New Service"**
3. Choisissez votre service :
   - **Gmail** (recommandé pour débuter)
   - **Outlook**
   - **Yahoo**
   - Ou un service transactionnel (SendGrid, Mailgun, etc.)
4. Suivez les instructions pour connecter votre compte email
5. **Notez votre Service ID** (ex: `service_abc123`)

### 3. Créer un template d'email
1. Allez dans **"Email Templates"**
2. Cliquez sur **"Create New Template"**
3. Configurez le template :
   - **Subject** : `Nouveau message depuis le site Luméa`
   - **Content** : Utilisez les variables suivantes :
     ```
     Nouveau message de contact
     
     Nom: {{from_name}}
     Email: {{from_email}}
     Entreprise: {{company}}
     
     Message:
     {{message}}
     
     ---
     Répondre à: {{reply_to}}
     ```
4. **Important** : Utilisez exactement ces noms de variables :
   - `{{from_name}}`
   - `{{from_email}}`
   - `{{company}}`
   - `{{message}}`
   - `{{reply_to}}`
5. Sauvegardez le template
6. **Notez votre Template ID** (ex: `template_xyz789`)

### 4. Récupérer votre clé publique
1. Allez dans **"Account"** → **"General"**
2. Trouvez votre **"Public Key"**
3. **Copiez cette clé** (ex: `abcdefghijklmnop`)

### 5. Ajouter le script EmailJS dans vos pages HTML

Vous devez ajouter le script EmailJS dans toutes les pages de contact :

**Pour `ch/contact.html`, `fr/contact.html`, `es/contacto.html` :**

Ajoutez cette ligne **AVANT** le script `main.js` dans le `<head>` ou juste avant `</body>` :

```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
```

**Exemple complet :**
```html
<!-- EmailJS SDK -->
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
<!-- Votre script principal -->
<script src="../assets/js/main.js" defer></script>
```

### 6. Configurer les identifiants dans le code

1. Ouvrez le fichier `assets/js/main.js`
2. Trouvez les lignes (vers la ligne 157) :
   ```javascript
   const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
   const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
   const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
   ```
3. Remplacez par vos identifiants réels :
   ```javascript
   const EMAILJS_SERVICE_ID = 'service_abc123';
   const EMAILJS_TEMPLATE_ID = 'template_xyz789';
   const EMAILJS_PUBLIC_KEY = 'abcdefghijklmnop';
   ```

## ✅ Test du formulaire

1. Ouvrez une page de contact sur votre site
2. Remplissez et envoyez un formulaire de test
3. Vérifiez que vous recevez bien l'email
4. Vérifiez que tous les champs sont bien remplis dans l'email

## 🔒 Sécurité

- La **Public Key** peut être visible dans le code JavaScript (c'est normal)
- EmailJS limite automatiquement les envois pour éviter le spam
- Vous pouvez activer des restrictions supplémentaires dans le dashboard EmailJS

## 📊 Limites du plan gratuit

- **200 emails par mois** (gratuit)
- **2 services email** (gratuit)
- **10 templates** (gratuit)

Si vous dépassez ces limites, vous devrez passer au plan payant.

## 🆘 Dépannage

### L'email n'est pas envoyé
- Vérifiez que le script EmailJS est bien chargé dans la page
- Vérifiez que les IDs sont corrects dans `main.js`
- Ouvrez la console du navigateur (F12) pour voir les erreurs

### Erreur "EmailJS n'est pas chargé"
- Vérifiez que le script EmailJS est bien inclus dans la page HTML
- Vérifiez que le script est chargé avant `main.js`

### Les variables ne s'affichent pas dans l'email
- Vérifiez que les noms de variables dans le template EmailJS correspondent exactement à ceux dans le code
- Les variables doivent être entre `{{` et `}}` dans le template

## 📝 Notes importantes

- **Ne partagez jamais votre Private Key** (seulement la Public Key est nécessaire)
- Les emails sont envoyés depuis votre compte email configuré
- Vous pouvez configurer plusieurs templates pour différents types de messages
