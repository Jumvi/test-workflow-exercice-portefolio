const fs = require('fs');

// ========================
// Dictionnaire enrichi
// ========================
const rules = [
  // --- HTML ---
  {
    match: "Please use tab for indentation",
    message: "❌ **Indentation incorrecte** : utilisez des tabulations au lieu d'espaces.\n💡 Configurez votre éditeur pour uniformiser l'indentation."
  },
  {
    match: "must be self closed",
    message: "❌ **Balise auto-fermante incorrecte** : certaines balises doivent se terminer par `/>`.\n💡 Exemple : `<img src='...' />`."
  },
  {
    match: "Tag must be paired",
    message: "❌ **Balise non fermée** : chaque balise ouvrante doit avoir une balise fermante.\n💡 Exemple : `<section>` doit être fermé par `</section>`."
  },
  {
    match: "alt attribute must be present",
    message: "❌ **Attribut `alt` manquant** : chaque image `<img>` doit avoir un texte alternatif.\n💡 Exemple : `<img src='logo.png' alt='Logo du site' />`."
  },
  {
    match: "The <script> tag cannot be used in a <head> tag",
    message: "❌ **Balise `<script>` mal placée** : ne mettez pas vos scripts dans `<head>`.\n💡 Placez-les avant `</body>`."
  },
  {
    match: "Special characters must be escaped",
    message: "❌ **Caractères spéciaux non échappés** : certains caractères doivent être remplacés par leur équivalent HTML.\n💡 Exemple : `>` devient `&gt;`."
  },
  {
    match: "Duplicate meta charset",
    message: "❌ **Meta charset dupliqué** : une seule balise `<meta charset='UTF-8'>` est autorisée."
  },
  {
    match: "Missing doctype",
    message: "❌ **Doctype manquant** : ajoutez `<!DOCTYPE html>` en haut du fichier."
  },
  {
    match: "Missing lang attribute",
    message: "❌ **Attribut `lang` manquant** sur `<html>`.\n💡 Exemple : `<html lang='fr'>`."
  },
  {
    match: "Heading levels should only increase by one",
    message: "❌ **Mauvaise hiérarchie de titres** : n’utilisez pas `<h3>` directement après `<h1>`.\n💡 Respectez la progression : h1 → h2 → h3."
  },

  // --- CSS ---
  {
    match: "Unknown property",
    message: "❌ **Propriété CSS inconnue** : vérifiez l'orthographe.\n💡 Exemple : `colr` → `color`."
  },
  {
    match: "Unexpected unit",
    message: "❌ **Unité inattendue** : vous utilisez une unité invalide.\n💡 Vérifiez si l’unité px/em/rem est correcte."
  },
  {
    match: "Expected a leading zero",
    message: "❌ **Zéro manquant** : écrivez `0.5rem` au lieu de `.5rem`."
  },
  {
    match: "Duplicate property",
    message: "❌ **Propriété dupliquée** : évitez de répéter la même règle dans un bloc.\n💡 Conservez la dernière version ou fusionnez-les."
  },
  {
    match: "Unknown pseudo-class",
    message: "❌ **Pseudo-classe inconnue** : vérifiez l’orthographe (`:hover`, `:focus`, etc.)."
  },
  {
    match: "Expected closing brace",
    message: "❌ **Accolade fermante manquante** dans votre fichier CSS."
  },
  {
    match: "Unexpected token",
    message: "❌ **Erreur de syntaxe CSS** : un caractère inattendu a été trouvé."
  },

  // --- Git ---
  {
    match: "subject may not be empty",
    message: "❌ **Message de commit vide** : un commit doit avoir un message clair."
  },
  {
    match: "type may not be empty",
    message: "❌ **Type de commit manquant** : utilisez un préfixe (`feat:`, `fix:`, `docs:`, etc.)."
  },
  {
    match: "type must be one of",
    message: "❌ **Type de commit invalide** : utilisez uniquement `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`."
  },
  {
    match: "subject may not be sentence-case",
    message: "❌ **Message de commit incorrect** : le sujet doit être écrit en minuscules."
  },
  {
    match: "subject may not end with",
    message: "❌ **Message de commit incorrect** : ne terminez pas par un point ou un caractère spécial."
  }
];

// ========================
// Fonction de parsing
// ========================
function parseErrors(inputFile, outputFile, sectionTitle) {
  let content = fs.readFileSync(inputFile, 'utf-8');
  content = content.replace(/\u001b\[.*?m/g, '');

  const lines = content.split('\n');
  let feedbacks = {};
  let hasError = false;

  lines.forEach(line => {
    rules.forEach(rule => {
      if (line.toLowerCase().includes(rule.match.toLowerCase())) {
        hasError = true;
        if (!feedbacks[rule.message]) feedbacks[rule.message] = [];
        // Extraire la ligne si possible
        const m = line.match(/L(\d+)\s*\|/); // ex: "L13 |"
        if (m) feedbacks[rule.message].push(`ligne ${m[1]}`);
      }
    });
  });

  let feedback = `# ${sectionTitle}\n\n`;
  if (!hasError) {
    feedback += "✅ Aucun problème détecté ! 🎉\n";
  } else {
    Object.entries(feedbacks).forEach(([msg, occurences]) => {
      feedback += `- ${msg}`;
      if (occurences.length > 0) {
        feedback += ` (trouvé sur ${occurences.join(', ')})`;
      }
      feedback += '\n\n';
    });
  }

  fs.writeFileSync(outputFile, feedback, 'utf-8');
  console.log(`Feedback généré dans ${outputFile}`);
}

// Exemple d’utilisation
parseErrors('html-report.txt', 'html-feedback.md', 'Feedback HTML');
parseErrors('css-report.txt', 'css-feedback.md', 'Feedback CSS');
parseErrors('commit-report.txt', 'commit-feedback.md', 'Feedback Commit');

// ========================
// Exemple d’utilisation
// ========================
parseErrors('html-report.txt', 'html-feedback.md');
parseErrors('css-report.txt', 'css-feedback.md');
parseErrors('commit-report.txt', 'commit-feedback.md');
