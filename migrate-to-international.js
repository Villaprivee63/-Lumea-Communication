/**
 * Script de migration vers structure internationale
 * Génère les versions /ch/, /fr/, /es/ à partir des fichiers existants
 */

const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  sourceDir: '.',
  targetDirs: {
    ch: './ch',
    fr: './fr',
    es: './es'
  },
  htmlFiles: [
    'index.html',
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
  ],
  // Mapping des noms de fichiers pour l'Espagne
  esFileMapping: {
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
    '404.html': '404.html',
    'index.html': 'index.html'
  }
};

// Fonction pour créer les dossiers
function createDirectories() {
  Object.values(config.targetDirs).forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`✓ Dossier créé: ${dir}`);
    }
  });
}

// Fonction pour adapter le contenu pour /ch/
function adaptForCH(content) {
  // Ajouter hreflang
  const hreflang = `
  <!-- Hreflang -->
  <link rel="alternate" hreflang="fr-CH" href="https://lumea.ch/ch/${path.basename(content.match(/<link rel="canonical" href="https:\/\/lumea\.ch\/([^"]+)">/)?.[1] || '')}">
  <link rel="alternate" hreflang="fr-FR" href="https://lumea.ch/fr/${path.basename(content.match(/<link rel="canonical" href="https:\/\/lumea\.ch\/([^"]+)">/)?.[1] || '')}">
  <link rel="alternate" hreflang="es-ES" href="https://lumea.ch/es/${config.esFileMapping[path.basename(content.match(/<link rel="canonical" href="https:\/\/lumea\.ch\/([^"]+)">/)?.[1] || '')] || path.basename(content.match(/<link rel="canonical" href="https:\/\/lumea\.ch\/([^"]+)">/)?.[1] || '')}">
  <link rel="alternate" hreflang="x-default" href="https://lumea.ch/ch/${path.basename(content.match(/<link rel="canonical" href="https:\/\/lumea\.ch\/([^"]+)">/)?.[1] || '')}">
`;
  
  // Corriger les chemins assets
  content = content.replace(/href="assets\//g, 'href="../assets/');
  content = content.replace(/src="assets\//g, 'src="../assets/');
  content = content.replace(/url\('assets\//g, "url('../assets/");
  content = content.replace(/url\("assets\//g, 'url("../assets/');
  
  // Mettre à jour les URLs canoniques
  content = content.replace(/<link rel="canonical" href="https:\/\/lumea\.ch\/([^"]+)">/g, (match, url) => {
    const filename = path.basename(url);
    return `<link rel="canonical" href="https://lumea.ch/ch/${filename}">`;
  });
  
  // Ajouter hreflang après canonical
  content = content.replace(/(<link rel="canonical"[^>]+>)/, `$1${hreflang}`);
  
  // Ajouter sélecteur de pays dans navbar (après nav-right)
  const countrySelector = `
        <div class="country-selector-nav" style="display: flex; gap: 0.5rem; align-items: center; margin-left: 1rem;">
          <a href="/ch/" class="country-link" title="Suisse" style="font-size: 1.5rem; text-decoration: none; opacity: 0.7; transition: opacity 0.3s;">🇨🇭</a>
          <a href="/fr/" class="country-link" title="France" style="font-size: 1.5rem; text-decoration: none; opacity: 0.7; transition: opacity 0.3s;">🇫🇷</a>
          <a href="/es/" class="country-link" title="España" style="font-size: 1.5rem; text-decoration: none; opacity: 0.7; transition: opacity 0.3s;">🇪🇸</a>
        </div>
`;
  content = content.replace(/(<div class="nav-right">[\s\S]*?<\/div>)/, `$1${countrySelector}`);
  
  // Mettre à jour les liens internes pour pointer vers /ch/
  content = content.replace(/href="([^"]+\.html)"/g, (match, url) => {
    if (url.startsWith('http') || url.startsWith('/')) return match;
    return `href="${url}"`;
  });
  
  return content;
}

// Fonction pour adapter le contenu pour /fr/
function adaptForFR(content) {
  // Remplacements de base
  content = content.replace(/lang="fr-CH"/g, 'lang="fr-FR"');
  content = content.replace(/geo\.region" content="CH"/g, 'geo.region" content="FR"');
  content = content.replace(/og:locale" content="fr_CH"/g, 'og:locale" content="fr_FR"');
  content = content.replace(/Suisse/g, 'France');
  content = content.replace(/suisse/g, 'français');
  content = content.replace(/Suisse romande/g, 'France');
  content = content.replace(/PME suisses/g, 'PME françaises');
  content = content.replace(/Luméa Communication – Suisse/g, 'Luméa Communication – France');
  
  // Corriger les chemins assets
  content = content.replace(/href="assets\//g, 'href="../assets/');
  content = content.replace(/src="assets\//g, 'src="../assets/');
  content = content.replace(/url\('assets\//g, "url('../assets/");
  content = content.replace(/url\("assets\//g, 'url("../assets/');
  
  // Mettre à jour les URLs canoniques
  content = content.replace(/<link rel="canonical" href="https:\/\/lumea\.ch\/([^"]+)">/g, (match, url) => {
    const filename = path.basename(url);
    return `<link rel="canonical" href="https://lumea.ch/fr/${filename}">`;
  });
  
  // Ajouter hreflang
  const hreflang = `
  <!-- Hreflang -->
  <link rel="alternate" hreflang="fr-CH" href="https://lumea.ch/ch/${path.basename(content.match(/<link rel="canonical" href="https:\/\/lumea\.ch\/fr\/([^"]+)">/)?.[1] || '')}">
  <link rel="alternate" hreflang="fr-FR" href="https://lumea.ch/fr/${path.basename(content.match(/<link rel="canonical" href="https:\/\/lumea\.ch\/fr\/([^"]+)">/)?.[1] || '')}">
  <link rel="alternate" hreflang="es-ES" href="https://lumea.ch/es/${config.esFileMapping[path.basename(content.match(/<link rel="canonical" href="https:\/\/lumea\.ch\/fr\/([^"]+)">/)?.[1] || '')] || path.basename(content.match(/<link rel="canonical" href="https:\/\/lumea\.ch\/fr\/([^"]+)">/)?.[1] || '')}">
  <link rel="alternate" hreflang="x-default" href="https://lumea.ch/ch/${path.basename(content.match(/<link rel="canonical" href="https:\/\/lumea\.ch\/fr\/([^"]+)">/)?.[1] || '')}">
`;
  content = content.replace(/(<link rel="canonical"[^>]+>)/, `$1${hreflang}`);
  
  // Ajouter sélecteur de pays
  const countrySelector = `
        <div class="country-selector-nav" style="display: flex; gap: 0.5rem; align-items: center; margin-left: 1rem;">
          <a href="/ch/" class="country-link" title="Suisse" style="font-size: 1.5rem; text-decoration: none; opacity: 0.7; transition: opacity 0.3s;">🇨🇭</a>
          <a href="/fr/" class="country-link active" title="France" style="font-size: 1.5rem; text-decoration: none; opacity: 1; border-bottom: 2px solid var(--color-accent-blue);">🇫🇷</a>
          <a href="/es/" class="country-link" title="España" style="font-size: 1.5rem; text-decoration: none; opacity: 0.7; transition: opacity 0.3s;">🇪🇸</a>
        </div>
`;
  content = content.replace(/(<div class="nav-right">[\s\S]*?<\/div>)/, `$1${countrySelector}`);
  
  return content;
}

// Fonction pour adapter le contenu pour /es/
function adaptForES(content, filename) {
  const esFilename = config.esFileMapping[filename] || filename;
  
  // Traductions de base (à compléter manuellement)
  content = content.replace(/lang="fr-CH"/g, 'lang="es-ES"');
  content = content.replace(/geo\.region" content="CH"/g, 'geo.region" content="ES"');
  content = content.replace(/og:locale" content="fr_CH"/g, 'og:locale" content="es_ES"');
  
  // Corriger les chemins assets
  content = content.replace(/href="assets\//g, 'href="../assets/');
  content = content.replace(/src="assets\//g, 'src="../assets/');
  content = content.replace(/url\('assets\//g, "url('../assets/");
  content = content.replace(/url\("assets\//g, 'url("../assets/');
  
  // Mettre à jour les URLs canoniques
  content = content.replace(/<link rel="canonical" href="https:\/\/lumea\.ch\/([^"]+)">/g, `<link rel="canonical" href="https://lumea.ch/es/${esFilename}">`);
  
  // Ajouter hreflang
  const hreflang = `
  <!-- Hreflang -->
  <link rel="alternate" hreflang="fr-CH" href="https://lumea.ch/ch/${filename}">
  <link rel="alternate" hreflang="fr-FR" href="https://lumea.ch/fr/${filename}">
  <link rel="alternate" hreflang="es-ES" href="https://lumea.ch/es/${esFilename}">
  <link rel="alternate" hreflang="x-default" href="https://lumea.ch/ch/${filename}">
`;
  content = content.replace(/(<link rel="canonical"[^>]+>)/, `$1${hreflang}`);
  
  // Ajouter sélecteur de pays
  const countrySelector = `
        <div class="country-selector-nav" style="display: flex; gap: 0.5rem; align-items: center; margin-left: 1rem;">
          <a href="/ch/" class="country-link" title="Suisse" style="font-size: 1.5rem; text-decoration: none; opacity: 0.7; transition: opacity 0.3s;">🇨🇭</a>
          <a href="/fr/" class="country-link" title="France" style="font-size: 1.5rem; text-decoration: none; opacity: 0.7; transition: opacity 0.3s;">🇫🇷</a>
          <a href="/es/" class="country-link active" title="España" style="font-size: 1.5rem; text-decoration: none; opacity: 1; border-bottom: 2px solid var(--color-accent-blue);">🇪🇸</a>
        </div>
`;
  content = content.replace(/(<div class="nav-right">[\s\S]*?<\/div>)/, `$1${countrySelector}`);
  
  return { content, filename: esFilename };
}

// Fonction principale
function migrate() {
  console.log('🚀 Début de la migration vers structure internationale...\n');
  
  createDirectories();
  
  config.htmlFiles.forEach(filename => {
    const sourcePath = path.join(config.sourceDir, filename);
    
    if (!fs.existsSync(sourcePath)) {
      console.log(`⚠️  Fichier non trouvé: ${filename}`);
      return;
    }
    
    const sourceContent = fs.readFileSync(sourcePath, 'utf8');
    
    // Version CH
    const chContent = adaptForCH(sourceContent);
    const chPath = path.join(config.targetDirs.ch, filename);
    fs.writeFileSync(chPath, chContent, 'utf8');
    console.log(`✓ ${filename} → /ch/${filename}`);
    
    // Version FR
    const frContent = adaptForFR(sourceContent);
    const frPath = path.join(config.targetDirs.fr, filename);
    fs.writeFileSync(frPath, frContent, 'utf8');
    console.log(`✓ ${filename} → /fr/${filename}`);
    
    // Version ES
    const { content: esContent, filename: esFilename } = adaptForES(sourceContent, filename);
    const esPath = path.join(config.targetDirs.es, esFilename);
    fs.writeFileSync(esPath, esContent, 'utf8');
    console.log(`✓ ${filename} → /es/${esFilename}`);
  });
  
  console.log('\n✅ Migration terminée !');
  console.log('\n⚠️  IMPORTANT: Les traductions espagnoles doivent être complétées manuellement.');
  console.log('⚠️  Vérifiez et adaptez les contenus pour chaque pays.');
}

// Exécuter
if (require.main === module) {
  migrate();
}

module.exports = { migrate, adaptForCH, adaptForFR, adaptForES };
