# Rapport performance (Core Web Vitals) – lumeacommunication.fr

## Stack & contexte

- **Type de site**: HTML/CSS/JS statique (pas de framework, pas de build).
- **Hébergement**: Netlify (voir `netlify.toml`).
- **CSS global**: `assets/css/styles.css` (~57 KB).
- **JS global**: `assets/js/main.js` (~30 KB), `assets/js/analytics.js` (~0.7 KB), `assets/js/blog.js` (blog).
- **Tiers**: Google Analytics 4 (gtag) + EmailJS (formulaire contact).

## Baseline (mesures Lighthouse mobile – lab)

Commandes:

```bash
npm install
npm run perf
```

Sorties générées:

- **Avant (origin/main)**: `docs/perf-avant.md` + JSON dans `.lighthouseci/avant/`
- **Après (HEAD actuel)**: `docs/perf-latest.md` + JSON dans `.lighthouseci/`

### Synthèse avant/après (extraits)

Notes:

- Lighthouse est un test **lab**. Pour **INP terrain**, utiliser CrUX / RUM (GA4 + Web Vitals).
- On suit **TBT** (Total Blocking Time) comme proxy lab de réactivité (corrélé à l’INP mais pas équivalent).

Constats globaux:

- **LCP**: déjà dans la cible sur la majorité des pages (\(< 2.5s\) en lab).
- **CLS**: sous contrôle (\(< 0.1\)) sur les pages mesurées.
- **INP/TBT**: amélioration via réduction du travail JS au chargement et décalage des tiers.

## Audit rapide – 20 facteurs principaux de lenteur / risque CWV

1. **Images hero / LCP**: si en `background-image`, Lighthouse identifie moins bien le LCP et la priorité réseau est moins contrôlable.
2. **Préchargement LCP incomplet**: absence ou mauvais `preload as="image"` sur certaines pages.
3. **Dimensions d’images manquantes**: `width/height` absents \(\rightarrow\) risque CLS.
4. **Images non critiques non lazy**: absence de `loading="lazy"` sur des images hors écran \(\rightarrow\) poids + CPU.
5. **Décodage d’images**: absence de `decoding="async"` \(\rightarrow\) thread principal plus sollicité.
6. **CSS unique “généraliste”**: `styles.css` sert à tout (pages courtes comme Mentions légales) \(\rightarrow\) coût de parsing/unused CSS.
7. **Ressources bloquantes**: CSS reste render-blocking (normal) \(\rightarrow\) LCP sensible au temps de réponse CSS.
8. **JS au chargement**: `main.js` exécute plusieurs init (nav, observer, FAQ, etc.) sur toutes pages.
9. **Logs console en prod**: logs/debug (même “silencieux”) peuvent coûter en lab et polluer.
10. **Tiers GA4 (gtag)**: peut démarrer trop tôt et consommer du main-thread / réseau.
11. **Tiers EmailJS**: si chargé dès le chargement, pénalise INP/TBT sans bénéfice pour les visiteurs non convertis.
12. **Carrousels / UI**: listeners + manip DOM sur pages “Réalisations” \(\rightarrow\) CPU.
13. **DOM dense** (certaines pages longues): plus de style/layout/paint \(\rightarrow\) risque LCP/INP.
14. **Backgrounds de sections**: images de sections non visibles au fold chargées trop tôt.
15. **Polices**: heureusement en system fonts, mais attention à toute future introduction de Google Fonts (risque FOIT/CLS).
16. **Cache/immutable**: bien configuré Netlify côté `/assets/*`, mais attention au versioning si on change des fichiers sans hash.
17. **Compression**: dépend du serveur (Netlify ok); en local sans compression, métriques lab plus pessimistes.
18. **Preconnect/dns-prefetch**: utile uniquement si domaine tiers; inutile (voire bruit) si tout est same-origin.
19. **Attributs inline `onerror`**: utiles pour fallback dev, mais alourdissent le HTML et compliquent le parsing (mineur).
20. **Mesure & garde-fous**: sans commande perf automatisée, régressions fréquentes (images ajoutées, scripts tiers, etc.).

## Plan d’actions par priorité

### P0 (impact immédiat, safe)

- **Images / LCP**
  - Convertir les heroes en `<img>` quand possible (priorité réseau + `fetchpriority="high"`).
  - Ajouter `width/height`, `decoding="async"`, et `loading="lazy"` hors LCP.
  - Lazy-loader les backgrounds de sections hors fold (sans changer le rendu).
  - **Gains attendus**: LCP \(-100 à -400ms\) sur pages concernées, CLS \(\downarrow\).

- **JS / INP**
  - Décaler GA4 après `load`/idle.
  - Charger EmailJS **à la soumission** uniquement.
  - Supprimer logs / debug par défaut.
  - **Gains attendus**: TBT/INP \(\downarrow\) (souvent \(-20 à -150ms\) selon page/appareil).

- **CLS**
  - Assurer que toutes images critiques ont des dimensions fixées.
  - Éviter les patterns qui modifient la mise en page après paint (FOUC, injections tardives).
  - **Gains attendus**: CLS stabilisé \(\le 0.1\).

### P1 (plus profond)

- **CSS**
  - Extraire un “critical CSS” minimal commun (header/hero/buttons) et l’inliner.
  - Charger le reste en CSS principal (en gardant le rendu identique).
  - **Gains attendus**: LCP \(-100 à -300ms\) sur pages courtes, perf score \(\uparrow\).

- **Réduction du coût global**
  - Réduire la complexité CSS (sélecteurs), nettoyer règles peu utilisées.
  - Limiter init JS selon page (feature detection).

### P2 (optionnel / conditionnel)

- **Service Worker** pour cache offline/retours visiteurs (si besoin).
- **RUM** (web-vitals) via GA4 pour mesurer INP/LCP/CLS terrain.

## Implémentations réalisées (dans ce repo)

- **GA4 retardé** pour réduire la contention au chargement:
  - `assets/js/analytics.js`
- **EmailJS chargé à la demande (submit)**:
  - `assets/js/main.js`
  - `fr/contact.html` (suppression du `<script>` EmailJS direct)
- **Lazy-load des backgrounds** via `data-bg`:
  - `assets/js/main.js`
  - `fr/index.html` (sections “services” + “process”)
- **Passage de backgrounds “hero/blog/article” vers `<img>` avec dimensions**:
  - `fr/blog.html`
  - `fr/article.html`
  - `fr/zone-intervention.html`
- **Outillage perf**:
  - `package.json` (`npm run perf`)
  - `tools/perf/static-server.mjs`
  - `tools/perf/run-perf.mjs` (runner “après”)
  - `tools/perf/run-perf-dir.mjs` (runner “avant” / worktree)
  - `docs/perf-avant.md`, `docs/perf-latest.md`

## Checklist de suivi (anti-régression)

- **À chaque ajout d’image**
  - WebP/AVIF, bonne taille, `width/height`, `loading="lazy"` hors LCP, `decoding="async"`.
- **À chaque ajout de script tiers**
  - Charger après interaction / idle / load (selon criticité).
- **À chaque nouvelle page**
  - Hero en `<img>` (si image), `preload` LCP, scripts `defer`, JSON-LD intact.
- **CI / local**
  - Lancer `npm run perf` avant merge/release.

