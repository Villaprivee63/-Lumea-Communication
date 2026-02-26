# Correctif prod-only : “page/hero décalé sur un côté” (Netlify/CDN)

## Symptôme (prod uniquement)
- En local : rendu OK (HERO aligné).
- En production (Netlify/CDN) : plusieurs pages semblent “poussées” latéralement (gros vide à gauche, contenu décalé à droite).

## Cause racine
Le site est statique et certaines pages reposent sur des règles CSS **récentes** (ex: `assets/css/styles.css` contient le fix global pour `<img class="hero-bg">`).

En production, les assets CSS/JS étaient servis avec un cache trop long (`max-age=604800` sur CSS/JS, et un cache global `/assets/*` historiquement “immutable”), ce qui fait que :
- le navigateur peut conserver un **ancien** `styles.css` après déploiement,
- la prod affiche alors un layout “ancien” (par exemple : `.hero-bg` redevient un item flex dans `.hero` et pousse le contenu), alors que le local utilise le CSS à jour.

Autrement dit : **mismatch de version CSS entre local et prod** (cache CDN/navigateur), pas un bug “page par page”.

## Preuve / diagnostic
Un mode debug est disponible via `?overflowDebug=1` (voir `assets/js/main.js`), qui log :
- `document.documentElement.clientWidth`
- `document.documentElement.scrollWidth`
- le TOP des éléments problématiques (rect, scrollWidth/clientWidth + styles clés)
- et un check rapide `hero-bg computed` (doit être `position: absolute` si le CSS à jour est chargé)

## Fix global appliqué
Changement des headers Netlify pour **forcer la revalidation** des CSS/JS à chaque navigation (sans fingerprint/hashes) :
- `/assets/css/*` → `Cache-Control: public, max-age=0, must-revalidate`
- `/assets/js/*` → `Cache-Control: public, max-age=0, must-revalidate`
- `/assets/*` (garde-fou) → `Cache-Control: public, max-age=604800` (les règles img/css/js restent plus spécifiques)

Les images restent en cache long (`/assets/img/*` immutable), ce qui conserve les gains perf.

## Fichiers modifiés
- `netlify.toml`
- `assets/js/main.js` (debug via flag uniquement)

## Pages à vérifier en prod
- `/fr/index.html`
- `/fr/services.html`
- `/fr/blog.html`
- `/fr/sites-branding.html`
- `/fr/formation.html`

## Attendu
- Pas de scrollbar horizontale.
- `documentElement.scrollWidth == clientWidth` (ou différence ≤ 1px subpixel).
- HERO identique visuellement au local, sans décalage latéral.

