/**
 * Google Analytics 4 (GA4) - Luméa Communication
 * Code conforme aux recommandations Google
 * ID de mesure : G-1G53CJJ2GC
 * 
 * Ce code correspond exactement au code recommandé par Google Analytics
 */

// Charger le script Google tag (gtag.js) de manière asynchrone
(function() {
  'use strict';
  
  // Charger le script gtag.js
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-1G53CJJ2GC';
  document.head.appendChild(script);
  
  // Initialiser dataLayer et gtag
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-1G53CJJ2GC');
})();
