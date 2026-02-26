# Rapport correctif “décalage latéral du HERO” (global)

## Symptôme
Sur plusieurs pages (ex: `fr/index.html`, `fr/services.html`, `fr/blog.html`, `fr/sites-branding.html`, `fr/formation.html`), le HERO ou son contenu apparaissait **décalé latéralement** (contenu “poussé” / non centré).

## Cause racine (preuve)
Plusieurs pages utilisent un HERO avec cette structure :

- `<section class="hero">`
  - `<img class="hero-bg" ...>`
  - `<div class="hero-content">...</div>`

Or, dans `assets/css/styles.css`, `.hero` est un conteneur **flex** :

- `display: flex; align-items: center; justify-content: center;`

Sans règle CSS dédiée, l’élément `<img class="hero-bg">` devient un **item flex dans le flux** (au même niveau que `.hero-content`) et prend de la place horizontale, ce qui **pousse** le contenu du HERO (effet d’offset latéral) sur toutes les pages qui ont ce pattern.

## Correctif global
Ajout d’un style global pour que `.hero-bg` soit réellement un fond “full cover” et **ne participe plus au layout** :

- `.hero > .hero-bg { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; z-index:0; }`

Le gradient/overlay (`.hero::before` / `.hero::after`) reste au-dessus (z-index:1), et le contenu au-dessus (z-index:2), donc **pas de changement esthétique**, uniquement la stabilité/alignement.

## Fichiers modifiés
- `assets/css/styles.css`

## Pages vérifiées (structure concernée)
- `fr/index.html`
- `fr/services.html`
- `fr/blog.html`
- `fr/sites-branding.html`
- `fr/formation.html`
- + autres pages “services” et pages internes utilisant `<img class="hero-bg">`

## Aide debug (débordement horizontal)
Le projet contient déjà un mode debug activable via `?overflowDebug=1` (console + outline) pour lister rapidement les éléments qui dépassent la viewport.

