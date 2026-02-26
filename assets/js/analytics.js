/**
 * Google Analytics 4 (GA4) - Luméa Communication
 * Code conforme aux recommandations Google
 * ID de mesure : G-1G53CJJ2GC
 * 
 * Ce code correspond exactement au code recommandé par Google Analytics
 */

// Charger le script Google tag (gtag.js) de manière asynchrone
// Perf: on retarde l’injection pour réduire la contention au chargement (LCP/INP),
// tout en gardant GA fonctionnel.
(function() {
  'use strict';

  const MEASUREMENT_ID = 'G-1G53CJJ2GC';

  function initGtag() {
    // Éviter les doubles init (ex: navigation bfcache)
    if (window.__lumeaGtagInit) return;
    window.__lumeaGtagInit = true;

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(MEASUREMENT_ID);
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(){ window.dataLayer.push(arguments); }
    window.gtag = window.gtag || gtag;
    window.gtag('js', new Date());
    window.gtag('config', MEASUREMENT_ID);
  }

  function scheduleInit() {
    if (document.visibilityState === 'hidden') return;
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(initGtag, { timeout: 2500 });
    } else {
      setTimeout(initGtag, 1200);
    }
  }

  if (document.readyState === 'complete') scheduleInit();
  else window.addEventListener('load', scheduleInit, { once: true });
})();
