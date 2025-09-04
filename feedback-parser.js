const fs = require('fs');

function parseErrors(filePath, outputFile) {
  const errors = fs.readFileSync(filePath, 'utf8').split('\n');
  let feedback = '';

  errors.forEach(error => {
    if (error.includes('Unexpected unit')) {
      feedback += '❌ **Erreur CSS** : Tu as utilisé une unité inconnue.\n';
      feedback += '💡 **Astuce** : Utilise des unités comme `px`, `rem`, ou `%`.\n\n';
    } else if (error.includes('Duplicate class')) {
      feedback += '❌ **Erreur CSS** : Une classe est dupliquée.\n';
      feedback += '💡 **Astuce** : Assure-toi que chaque classe est unique.\n\n';
    } else if (error.includes('Empty block')) {
      feedback += '❌ **Erreur CSS** : Un bloc CSS est vide.\n';
      feedback += '💡 **Astuce** : Supprime les blocs CSS vides.\n\n';
    } else if (error.includes('Invalid hex color')) {
      feedback += '❌ **Erreur CSS** : Une couleur hexadécimale est invalide.\n';
      feedback += '💡 **Astuce** : Utilise des couleurs hexadécimales valides (ex: `#FFFFFF`).\n\n';
    } else if (error.includes('Unknown property')) {
      feedback += '❌ **Erreur CSS** : Une propriété inconnue est utilisée.\n';
      feedback += '💡 **Astuce** : Vérifie l\'orthographe de la propriété.\n\n';
    } else if (error.includes('Duplicate selector')) {
      feedback += '❌ **Erreur CSS** : Un sélecteur est dupliqué.\n';
      feedback += '💡 **Astuce** : Assure-toi que chaque sélecteur est unique.\n\n';
    } else if (error.includes('!important')) {
      feedback += '❌ **Erreur CSS** : La déclaration `!important` est utilisée.\n';
      feedback += '💡 **Astuce** : Évite d\'utiliser `!important`.\n\n';
    } else if (error.includes('Missing alt attribute')) {
      feedback += '❌ **Erreur HTML** : Une image n\'a pas d\'attribut `alt`.\n';
      feedback += '💡 **Astuce** : Ajoute un attribut `alt` pour chaque image pour l\'accessibilité.\n\n';
    } else if (error.includes('Duplicate ID')) {
      feedback += '❌ **Erreur HTML** : Un `id` est dupliqué.\n';
      feedback += '💡 **Astuce** : Assure-toi que chaque `id` est unique dans la page.\n\n';
    } else if (error.includes('Empty title tag')) {
      feedback += '❌ **Erreur HTML** : La balise `<title>` est manquante.\n';
      feedback += '💡 **Astuce** : Ajoute une balise `<title>` pour chaque page.\n\n';
    } else if (error.includes('Section lacks heading')) {
      feedback += '❌ **Erreur HTML** : Une balise `<section>` ne contient pas de titre.\n';
      feedback += '💡 **Astuce** : Ajoute un titre (`<h1>` à `<h6>`) dans chaque `<section>`.\n\n';
    } else if (error.includes('Invalid doctype')) {
      feedback += '❌ **Erreur HTML** : Le `<!DOCTYPE>` est invalide.\n';
      feedback += '💡 **Astuce** : Utilise `<!DOCTYPE html>` pour HTML5.\n\n';
    } else if (error.includes('Missing label for input')) {
      feedback += '❌ **Erreur HTML** : Un champ `<input>` n\'a pas de balise `<label>` associée.\n';
      feedback += '💡 **Astuce** : Ajoute une balise `<label>` pour chaque `<input>`.\n\n';
    } else if (error.includes('Label missing for attribute')) {
      feedback += '❌ **Erreur HTML** : Une balise `<label>` n\'a pas d\'attribut `for`.\n';
      feedback += '💡 **Astuce** : Ajoute un attribut `for` pour associer un `<input>`.\n\n';
    } else if (error.includes('Invalid media query')) {
      feedback += '❌ **Erreur CSS** : Une media query est invalide.\n';
      feedback += '💡 **Astuce** : Vérifie la syntaxe de la media query.\n\n';
    } else if (error.includes('Unknown media feature')) {
      feedback += '❌ **Erreur CSS** : Un nom de fonctionnalité media est inconnu.\n';
      feedback += '💡 **Astuce** : Utilise des noms de fonctionnalités media valides.\n\n';
    } else if (error.includes('Unknown pseudo-class')) {
      feedback += '❌ **Erreur CSS** : Une pseudo-classe inconnue est utilisée.\n';
      feedback += '💡 **Astuce** : Utilise uniquement des pseudo-classes valides.\n\n';
    } else if (error.includes('Unknown pseudo-element')) {
      feedback += '❌ **Erreur CSS** : Un pseudo-élément inconnu est utilisé.\n';
      feedback += '💡 **Astuce** : Utilise uniquement des pseudo-éléments valides.\n\n';
    } else if (error.includes('Unknown type selector')) {
      feedback += '❌ **Erreur CSS** : Un type de sélecteur inconnu est utilisé.\n';
      feedback += '💡 **Astuce** : Utilise uniquement des types de sélecteurs valides.\n\n';
    } else if (error.includes('Unit not allowed')) {
      feedback += '❌ **Erreur CSS** : Une unité non autorisée est utilisée.\n';
      feedback += '💡 **Astuce** : Utilise uniquement les unités autorisées (ex: `em`, `rem`, `px`, `%`, `vh`, `vw`).\n\n';
    }
  });

  fs.writeFileSync(outputFile, feedback);
}

// Exemple d'utilisation
parseErrors('css-report.txt', 'css-feedback.md');
parseErrors('html-report.txt', 'html-feedback.md');
