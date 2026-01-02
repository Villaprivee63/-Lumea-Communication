/**
 * Sélecteur de langue/pays pour Luméa Communication
 * Gère la détection automatique et le changement de pays
 */

(function() {
  'use strict';

  // Configuration des pays disponibles
  const countries = {
    'ch': { lang: 'fr-CH', name: 'Suisse', flag: '🇨🇭' },
    'fr': { lang: 'fr-FR', name: 'France', flag: '🇫🇷' },
    'es': { lang: 'es-ES', name: 'España', flag: '🇪🇸' }
  };

  // Détection du pays actuel depuis l'URL
  function getCurrentCountry() {
    const path = window.location.pathname;
    const match = path.match(/^\/(ch|fr|es)\//);
    return match ? match[1] : null;
  }

  // Détection automatique de la langue du navigateur
  function detectBrowserLanguage() {
    const lang = navigator.language || navigator.userLanguage;
    if (lang.startsWith('es')) return 'es';
    if (lang.startsWith('fr')) {
      // Par défaut, rediriger vers la Suisse pour les francophones
      return 'ch';
    }
    return 'ch'; // Par défaut
  }

  // Redirection vers un pays spécifique
  function redirectToCountry(country) {
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(/^\/(ch|fr|es)\//, `/${country}/`);
    if (newPath !== currentPath) {
      window.location.href = newPath;
    } else {
      // Si on est à la racine, rediriger vers la page d'accueil du pays
      window.location.href = `/${country}/`;
    }
  }

  // Sauvegarder le choix de l'utilisateur
  function saveCountryPreference(country) {
    localStorage.setItem('lumea-country', country);
  }

  // Récupérer le pays sauvegardé
  function getSavedCountry() {
    return localStorage.getItem('lumea-country');
  }

  // Initialisation
  function init() {
    // Si on est sur la page racine, ne pas rediriger automatiquement
    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
      return;
    }

    // Si un pays est sauvegardé et qu'on n'est pas déjà sur ce pays
    const savedCountry = getSavedCountry();
    const currentCountry = getCurrentCountry();
    
    if (savedCountry && savedCountry !== currentCountry) {
      // Optionnel : rediriger vers le pays sauvegardé
      // redirectToCountry(savedCountry);
    }
  }

  // Exposer les fonctions globalement
  window.LumeaLanguage = {
    redirectToCountry,
    saveCountryPreference,
    getCurrentCountry,
    detectBrowserLanguage,
    countries
  };

  // Initialiser au chargement
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
