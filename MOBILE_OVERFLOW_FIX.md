## Fix du scroll horizontal (mobile)

### Symptôme
- Sur mobile, certaines pages pouvaient **déborder horizontalement** (glissement possible vers la droite).

### Élément(s) fautif(s) identifié(s)
- Le débordement venait principalement du pattern CSS **`width: 100vw` + `left: 50%` + `margin-left: -50vw`** utilisé sur :
  - `.hero`
  - `.section-full`

Ce pattern est une cause classique d’overflow horizontal sur mobile (calcul de `vw`, arrondis sub-pixels, UI browser, etc.), surtout quand il est répété sur beaucoup de sections.

### Corrections appliquées
- **Correction ciblée (cause racine)** dans `assets/css/styles.css` :
  - Remplacement du pattern `100vw`/margins négatives par `width: 100%` et remise à zéro des offsets/margins sur :
    - `.hero`
    - `.section-full`

- **Outil de debug (dev)** dans `assets/js/main.js` :
  - Ajout d’un mode activable via `?overflowDebug=1` qui :
    - liste dans la console les éléments dépassant la viewport
    - surligne en rouge les éléments suspects

- **Protection globale minimale (après fix)** :
  - Ajout de `overflow-x: hidden` sur `html` (le `body` l’avait déjà).

### Pourquoi ça débordait
- `100vw` est souvent légèrement plus large que la zone réellement visible (selon le navigateur / UI / arrondis).
- Combiné aux marges négatives `-50vw`, on force des blocs à “déborder” la largeur réelle, ce qui crée un **scroll horizontal**.

### Comment vérifier
- Ouvrir en local : `fr/index.html?overflowDebug=1`
- Vérifier sur mobile (375/390/360px) :
  - impossibilité de scroller horizontalement
  - absence d’éléments surlignés en rouge par le debug

