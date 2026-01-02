/**
 * Script pour créer la structure internationale complète
 * Copie et adapte tous les fichiers HTML vers /ch/, /fr/, /es/
 */

const fs = require('fs');
const path = require('path');

const filesToMigrate = [
  'consulting.html',
  'formation.html',
  'cybersecurite.html',
  'sites-branding.html',
  'blog.html',
  'article.html',
  'contact.html',
  'mentions-legales.html',
  'confidentialite.html',
  'cookies.html',
  '404.html'
];

// Mapping des noms de fichiers pour l'Espagne
const esFileNames = {
  'consulting.html': 'consultoria.html',
  'formation.html': 'formacion.html',
  'cybersecurite.html': 'ciberseguridad.html',
  'sites-branding.html': 'sitios-branding.html',
  'contact.html': 'contacto.html',
  'mentions-legales.html': 'aviso-legal.html',
  'confidentialite.html': 'privacidad.html',
  'cookies.html': 'cookies.html',
  'blog.html': 'blog.html',
  'article.html': 'articulo.html',
  '404.html': '404.html'
};

function adaptForCH(content, filename) {
  // Corriger les chemins assets
  content = content.replace(/href="assets\//g, 'href="../assets/');
  content = content.replace(/src="assets\//g, 'src="../assets/');
  content = content.replace(/url\('assets\//g, "url('../assets/");
  content = content.replace(/url\("assets\//g, 'url("../assets/');
  
  // Mettre à jour URLs canoniques
  content = content.replace(/<link rel="canonical" href="https:\/\/lumea\.ch\/([^"]+)">/g, 
    `<link rel="canonical" href="https://lumea.ch/ch/${filename}">`);
  
  // Ajouter hreflang après canonical
  const hreflang = `
  <!-- Hreflang -->
  <link rel="alternate" hreflang="fr-CH" href="https://lumea.ch/ch/${filename}">
  <link rel="alternate" hreflang="fr-FR" href="https://lumea.ch/fr/${filename}">
  <link rel="alternate" hreflang="es-ES" href="https://lumea.ch/es/${esFileNames[filename] || filename}">
  <link rel="alternate" hreflang="x-default" href="https://lumea.ch/ch/${filename}">`;
  
  content = content.replace(/(<link rel="canonical"[^>]+>)/, `$1${hreflang}`);
  
  // Ajouter sélecteur de pays dans navbar
  const countrySelector = `
        <div class="country-selector-nav" style="display: flex; gap: 0.5rem; align-items: center; margin-left: 1rem;">
          <a href="/ch/" class="country-link active" title="Suisse" style="font-size: 1.5rem; text-decoration: none; opacity: 1; border-bottom: 2px solid var(--color-accent-blue);">🇨🇭</a>
          <a href="/fr/" class="country-link" title="France" style="font-size: 1.5rem; text-decoration: none; opacity: 0.7; transition: opacity 0.3s;">🇫🇷</a>
          <a href="/es/" class="country-link" title="España" style="font-size: 1.5rem; text-decoration: none; opacity: 0.7; transition: opacity 0.3s;">🇪🇸</a>
        </div>`;
  
  // Insérer après nav-right
  content = content.replace(/(<div class="nav-right">[\s\S]*?<\/div>)/, `$1${countrySelector}`);
  
  return content;
}

function adaptForFR(content, filename) {
  // Remplacements de texte
  content = content.replace(/lang="fr-CH"/g, 'lang="fr-FR"');
  content = content.replace(/geo\.region" content="CH"/g, 'geo.region" content="FR"');
  content = content.replace(/og:locale" content="fr_CH"/g, 'og:locale" content="fr_FR"');
  content = content.replace(/Suisse romande/g, 'France');
  content = content.replace(/PME suisses/g, 'PME françaises');
  content = content.replace(/PME suisse/g, 'PME française');
  content = content.replace(/pour dirigeants et PME suisses/g, 'pour dirigeants et PME françaises');
  content = content.replace(/Luméa Communication – Suisse/g, 'Luméa Communication – France');
  content = content.replace(/en Suisse romande/g, 'en France');
  content = content.replace(/Suisse/g, 'France');
  
  // Corriger les chemins assets
  content = content.replace(/href="assets\//g, 'href="../assets/');
  content = content.replace(/src="assets\//g, 'src="../assets/');
  content = content.replace(/url\('assets\//g, "url('../assets/");
  content = content.replace(/url\("assets\//g, 'url("../assets/');
  
  // Mettre à jour URLs canoniques
  content = content.replace(/<link rel="canonical" href="https:\/\/lumea\.ch\/([^"]+)">/g, 
    `<link rel="canonical" href="https://lumea.ch/fr/${filename}">`);
  
  // Ajouter hreflang
  const hreflang = `
  <!-- Hreflang -->
  <link rel="alternate" hreflang="fr-CH" href="https://lumea.ch/ch/${filename}">
  <link rel="alternate" hreflang="fr-FR" href="https://lumea.ch/fr/${filename}">
  <link rel="alternate" hreflang="es-ES" href="https://lumea.ch/es/${esFileNames[filename] || filename}">
  <link rel="alternate" hreflang="x-default" href="https://lumea.ch/ch/${filename}">`;
  
  content = content.replace(/(<link rel="canonical"[^>]+>)/, `$1${hreflang}`);
  
  // Ajouter sélecteur de pays
  const countrySelector = `
        <div class="country-selector-nav" style="display: flex; gap: 0.5rem; align-items: center; margin-left: 1rem;">
          <a href="/ch/" class="country-link" title="Suisse" style="font-size: 1.5rem; text-decoration: none; opacity: 0.7; transition: opacity 0.3s;">🇨🇭</a>
          <a href="/fr/" class="country-link active" title="France" style="font-size: 1.5rem; text-decoration: none; opacity: 1; border-bottom: 2px solid var(--color-accent-blue);">🇫🇷</a>
          <a href="/es/" class="country-link" title="España" style="font-size: 1.5rem; text-decoration: none; opacity: 0.7; transition: opacity 0.3s;">🇪🇸</a>
        </div>`;
  
  content = content.replace(/(<div class="nav-right">[\s\S]*?<\/div>)/, `$1${countrySelector}`);
  
  return content;
}

function adaptForES(content, filename) {
  const esFilename = esFileNames[filename] || filename;
  
  // Remplacements de base
  content = content.replace(/lang="fr-CH"/g, 'lang="es-ES"');
  content = content.replace(/geo\.region" content="CH"/g, 'geo.region" content="ES"');
  content = content.replace(/og:locale" content="fr_CH"/g, 'og:locale" content="es_ES"');
  
  // Corriger les chemins assets
  content = content.replace(/href="assets\//g, 'href="../assets/');
  content = content.replace(/src="assets\//g, 'src="../assets/');
  content = content.replace(/url\('assets\//g, "url('../assets/");
  content = content.replace(/url\("assets\//g, 'url("../assets/');
  
  // Mettre à jour URLs canoniques
  content = content.replace(/<link rel="canonical" href="https:\/\/lumea\.ch\/([^"]+)">/g, 
    `<link rel="canonical" href="https://lumea.ch/es/${esFilename}">`);
  
  // Ajouter hreflang
  const hreflang = `
  <!-- Hreflang -->
  <link rel="alternate" hreflang="fr-CH" href="https://lumea.ch/ch/${filename}">
  <link rel="alternate" hreflang="fr-FR" href="https://lumea.ch/fr/${filename}">
  <link rel="alternate" hreflang="es-ES" href="https://lumea.ch/es/${esFilename}">
  <link rel="alternate" hreflang="x-default" href="https://lumea.ch/ch/${filename}">`;
  
  content = content.replace(/(<link rel="canonical"[^>]+>)/, `$1${hreflang}`);
  
  // Ajouter sélecteur de pays
  const countrySelector = `
        <div class="country-selector-nav" style="display: flex; gap: 0.5rem; align-items: center; margin-left: 1rem;">
          <a href="/ch/" class="country-link" title="Suisse" style="font-size: 1.5rem; text-decoration: none; opacity: 0.7; transition: opacity 0.3s;">🇨🇭</a>
          <a href="/fr/" class="country-link" title="France" style="font-size: 1.5rem; text-decoration: none; opacity: 0.7; transition: opacity 0.3s;">🇫🇷</a>
          <a href="/es/" class="country-link active" title="España" style="font-size: 1.5rem; text-decoration: none; opacity: 1; border-bottom: 2px solid var(--color-accent-blue);">🇪🇸</a>
        </div>`;
  
  content = content.replace(/(<div class="nav-right">[\s\S]*?<\/div>)/, `$1${countrySelector}`);
  
  // Note: Les traductions espagnoles doivent être faites manuellement
  // Ce script prépare juste la structure
  
  return { content, filename: esFilename };
}

// Créer les dossiers
['ch', 'fr', 'es'].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✓ Dossier créé: ${dir}`);
  }
});

// Traiter chaque fichier
filesToMigrate.forEach(filename => {
  const sourcePath = path.join('.', filename);
  
  if (!fs.existsSync(sourcePath)) {
    console.log(`⚠️  Fichier non trouvé: ${filename}`);
    return;
  }
  
  const sourceContent = fs.readFileSync(sourcePath, 'utf8');
  
  // Version CH
  const chContent = adaptForCH(sourceContent, filename);
  const chPath = path.join('ch', filename);
  fs.writeFileSync(chPath, chContent, 'utf8');
  console.log(`✓ ${filename} → /ch/${filename}`);
  
  // Version FR
  const frContent = adaptForFR(sourceContent, filename);
  const frPath = path.join('fr', filename);
  fs.writeFileSync(frPath, frContent, 'utf8');
  console.log(`✓ ${filename} → /fr/${filename}`);
  
  // Version ES
  const { content: esContent, filename: esFilename } = adaptForES(sourceContent, filename);
  const esPath = path.join('es', esFilename);
  fs.writeFileSync(esPath, esContent, 'utf8');
  console.log(`✓ ${filename} → /es/${esFilename}`);
});

console.log('\n✅ Migration terminée !');
console.log('⚠️  Les traductions espagnoles doivent être complétées manuellement.');
