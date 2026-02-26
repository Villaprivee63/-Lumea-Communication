# CLS Fix Report – HERO + header (cross-device)

## Cause principale (prod) – preuve par symptômes

- **Symptôme observé**: menu “Services” affiché avec des **puces** + styles incohérents au chargement (desktop et mobile).
- **Cause racine la plus probable**: **CSS/JS servis en cache long `immutable`** (Netlify) sans versioning par hash → certains clients gardent un `styles.css`/`main.js` ancien après déploiement.
- **Impact CLS**: le HTML s’affiche brièvement avec styles par défaut (list-style, espacements, tailles), puis “saute” quand le bon CSS finit par s’appliquer (ou ne s’applique pas si cache stale).

## Autre cause CLS mobile (iOS Safari)

- **`vh` dynamique**: iOS Safari modifie `vh` quand la barre d’adresse apparaît/disparaît → HERO “bouge” au scroll.
- Correctif: utiliser `svh` (small viewport height) quand supporté pour stabiliser la hauteur.

## Correctifs globaux implémentés (durables)

### 1) Cache headers Netlify (éviter stale CSS/JS)

- **Changement**: suppression de `immutable` sur `/assets/css/*` et `/assets/js/*` (on conserve un cache long, mais pas “figé”).
- **Pourquoi**: sans fichiers hashés (ex: `styles.abc123.css`), `immutable` est dangereux pour la stabilité visuelle.
- **Fichier**: `netlify.toml`

### 2) Header stable (réserver la hauteur)

- **Changement**: `min-height` sur `.navbar` + `min-height` cohérent sur `.nav-inner` via variables CSS.
- **Objectif**: empêcher toute variation de hauteur du header au chargement (source fréquente de CLS).
- **Fichier**: `assets/css/styles.css`

### 3) HERO stable (réserver la hauteur + iOS)

- **Changement**:
  - `.hero { min-height: var(--hero-min-h) }`
  - `@supports (height: 100svh) { .hero { min-height: var(--hero-min-h-svh) } }`
  - Les pages définissent la hauteur attendue via `style="--hero-min-h: …; --hero-min-h-svh: …"` (au lieu de `min-height: …vh`).
- **Objectif**: supprimer les shifts liés à `vh` et uniformiser la règle.
- **Fichiers**: `assets/css/styles.css` + pages HERO:
  - `fr/services.html`
  - `fr/sites-branding.html`
  - `fr/consulting.html`
  - `fr/developpement.html`
  - `fr/cybersecurite.html`
  - `fr/formation.html`
  - `fr/realisations.html`
  - `fr/blog.html`
  - `fr/zone-intervention.html`

## Tests automatiques

- **Commande**: `npm run perf`
- **Seuil ajouté**: **CLS < 0.1** sur les pages clés (le script échoue si dépassement).
- **Fichier**: `tools/perf/run-perf.mjs`

## Validation (avant/après)

- Baseline “avant”: `docs/perf-avant.md`
- Baseline “après”: `docs/perf-latest.md`

> Note: Lighthouse est un test lab. Le bug de “stale CSS” est surtout visible en prod/caches réels (il peut ne pas se reproduire en lab local).

