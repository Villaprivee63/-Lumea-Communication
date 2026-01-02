# Luméa Communication – Suisse

Site web statique pour Luméa Communication – Suisse. Consulting digital, formation et cybersécurité préventive pour dirigeants et PME suisses.

## Structure du projet

```
/
├── index.html
├── consulting.html
├── formation.html
├── cybersecurite.html
├── blog.html
├── article.html
├── contact.html
├── mentions-legales.html
├── confidentialite.html
├── cookies.html
├── 404.html
├── sitemap.xml
├── robots.txt
├── README.md
└── assets/
    ├── css/
    │   └── styles.css
    ├── js/
    │   ├── main.js
    │   └── blog.js
    └── img/
        ├── logo/
        │   └── logo.svg (à ajouter)
        └── photos/
            ├── hero.jpg (à ajouter)
            ├── consulting-1.jpg (à ajouter)
            ├── consulting-2.jpg (à ajouter)
            ├── formation-1.jpg (à ajouter)
            ├── formation-2.jpg (à ajouter)
            ├── cyber-1.jpg (à ajouter)
            ├── cyber-2.jpg (à ajouter)
            ├── trust.jpg (à ajouter)
            ├── method.jpg (à ajouter)
            ├── contact.jpg (à ajouter)
            └── blog.jpg (à ajouter)
```

## Installation

1. Téléchargez ou clonez ce projet
2. Ajoutez vos images dans les dossiers `assets/img/logo/` et `assets/img/photos/`
3. Ouvrez `index.html` dans un navigateur web

## Utilisation

Le site est entièrement statique et fonctionne en local. Il suffit d'ouvrir `index.html` dans un navigateur pour voir le site.

### Images requises

Assurez-vous d'ajouter les images suivantes :

**Logo :**
- `assets/img/logo/logo.svg`

**Photos :**
- `assets/img/photos/hero.jpg`
- `assets/img/photos/consulting-1.jpg`
- `assets/img/photos/consulting-2.jpg`
- `assets/img/photos/formation-1.jpg`
- `assets/img/photos/formation-2.jpg`
- `assets/img/photos/cyber-1.jpg`
- `assets/img/photos/cyber-2.jpg`
- `assets/img/photos/trust.jpg`
- `assets/img/photos/method.jpg`
- `assets/img/photos/contact.jpg`
- `assets/img/photos/blog.jpg`

Si une image est manquante, un fallback élégant (dégradé CSS) sera affiché, mais le chemin doit rester présent dans le code.

## Caractéristiques

- **Design premium** : Style sombre avec accents néon discrets (bleu/violet/magenta) et touches or subtiles
- **Responsive** : Adapté mobile, tablette et desktop
- **Performance** : CSS optimisé, JS léger
- **Accessibilité** : Contrastes, focus visibles, aria, navigation clavier
- **Full-width** : Layout premium avec conteneurs larges (max-width 1440px)
- **SEO** : Meta tags, sitemap.xml, robots.txt

## Technologies

- HTML5
- CSS3 (variables CSS, grid, flexbox)
- JavaScript vanilla (pas de framework)
- Pas de dépendances externes

## Fonctionnalités JavaScript

- Menu mobile (burger)
- Scroll reveal (IntersectionObserver)
- Accordéon FAQ
- Bandeau cookies avec localStorage
- Smooth scroll pour ancres
- Filtres blog (côté client)
- Formulaire contact (simulation, pas de backend)

## Personnalisation

### Couleurs

Les couleurs sont définies dans `assets/css/styles.css` via les variables CSS (`:root`). Modifiez-les selon vos besoins.

### Contenu

Tous les contenus sont dans les fichiers HTML. Modifiez-les directement selon vos besoins.

### Images

Remplacez les images dans `assets/img/` par vos propres visuels. Les noms de fichiers doivent correspondre exactement à ceux listés ci-dessus.

## Notes importantes

- Le site est conçu pour fonctionner **entièrement en local** (ouvrir `index.html` dans un navigateur)
- Aucun CDN ou service externe n'est requis
- Le formulaire de contact est une simulation (pas de backend)
- Les textes légaux (mentions légales, confidentialité, cookies) contiennent des placeholders à compléter

## Support

Pour toute question ou modification, contactez l'équipe de développement.

---

© Luméa Communication – Suisse




