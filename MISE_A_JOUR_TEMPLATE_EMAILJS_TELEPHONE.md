# 📞 Mise à jour du template EmailJS pour inclure le téléphone

## ✅ Ce qui a été fait

1. ✅ Champ téléphone ajouté dans tous les formulaires de contact :
   - `fr/contact.html` (placeholder: +33 6 12 34 56 78)
   - `ch/contact.html` (placeholder: +41 79 123 45 67)
   - `es/contacto.html` (placeholder: +34 612 34 56 78)
   - `contact.html` (racine, placeholder: +33 6 12 34 56 78)

2. ✅ JavaScript mis à jour pour envoyer le téléphone à EmailJS

## 📋 Action requise : Mettre à jour le template EmailJS

Vous devez maintenant ajouter le champ téléphone dans votre template EmailJS.

### Étapes :

1. Allez dans EmailJS → **"Modèles d'e-mails"** → **"Contactez-nous"**

2. Dans l'onglet **"Contenu"**, trouvez la section où s'affiche `{{from_email}}`

3. Ajoutez après `{{from_email}}` (avant "Entreprise") :

```html
<div style="color: #b8b8b8; font-size: 13px; margin-bottom: 10px;">
  📞 {{phone}}
</div>
```

4. Dans la section **"Informations de contact"** (en bas), ajoutez après "Email" :

```html
<tr>
  <td style="color: #b8b8b8; font-size: 13px; padding: 5px 0;">Téléphone :</td>
  <td style="color: #f5f5f5; font-size: 13px; padding: 5px 0;">
    <a href="tel:{{phone}}" style="color: #3b82f6; text-decoration: none;">{{phone}}</a>
  </td>
</tr>
```

5. **Sauvegardez** le template

### Note importante

Le téléphone est un champ **optionnel** dans le formulaire. Si l'utilisateur ne le remplit pas, la variable `{{phone}}` sera vide dans l'email. C'est normal et le template l'affichera seulement s'il est rempli.

## 🧪 Test

Après avoir mis à jour le template :
1. Remplissez un formulaire de contact avec un numéro de téléphone
2. Envoyez le message
3. Vérifiez que l'email reçu contient bien le numéro de téléphone
