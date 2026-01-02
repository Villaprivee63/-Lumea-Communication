# Migration vers Structure Internationale

## 🚀 Utilisation du script de migration

### 1. Installer Node.js (si pas déjà installé)
Télécharger depuis https://nodejs.org/

### 2. Exécuter le script
```bash
npm install
npm run migrate
```

Le script va :
- ✅ Créer les dossiers `/ch/`, `/fr/`, `/es/`
- ✅ Copier et adapter tous les fichiers HTML
- ✅ Ajouter hreflang sur toutes les pages
- ✅ Ajouter le sélecteur de pays dans la navbar
- ✅ Corriger les chemins assets (`../assets/`)
- ✅ Mettre à jour les URLs canoniques

### 3. Après la migration

#### À faire manuellement :

1. **Traductions espagnoles** : Les fichiers `/es/` sont créés mais les textes doivent être traduits en espagnol

2. **Adaptations par pays** :
   - **CH** : Garder les références "Suisse", CHF, TVA 7.7%
   - **FR** : Adapter "France", EUR, TVA 20%
   - **ES** : Adapter "España", EUR, TVA 21%

3. **Vérifier les liens internes** : S'assurer que tous les liens pointent vers la bonne version locale

4. **Mettre à jour sitemap.xml** : Ajouter toutes les versions localisées

5. **Mettre à jour robots.txt** : S'assurer que tous les dossiers sont accessibles

## 📝 Structure finale

```
lumea-communication.ch/
├── index.html (sélecteur de pays)
├── ch/
│   ├── index.html
│   ├── consulting.html
│   └── ...
├── fr/
│   ├── index.html
│   ├── consulting.html
│   └── ...
├── es/
│   ├── index.html
│   ├── consultoria.html
│   └── ...
└── assets/ (mutualisé)
```

## ⚠️ Notes importantes

- Les fichiers originaux à la racine peuvent être supprimés après vérification
- Les assets restent à la racine et sont partagés
- Chaque page a maintenant hreflang et sélecteur de pays
- Les chemins assets sont corrigés automatiquement (`../assets/`)
