const fs = require('fs');

// ========================
// Dictionnaire enrichi
// ========================
const rules = [
  // --- HTML ---
 // HTMLHint rules
{
  match: "must be self closed",
  message: "❌ **Balise auto-fermante incorrecte** : certaines balises doivent se terminer par `/>`. 💡 Exemple : `<img src='...' />`."
},
{
  match: "Tag must be paired",
  message: "❌ **Balise non fermée** : chaque balise ouvrante doit avoir une balise fermante."
},
{
  match: "alt attribute must be present",
  message: "❌ **Attribut `alt` manquant** : chaque image `<img>` doit avoir un texte alternatif."
},
{
  match: "The <script> tag cannot be used in a <head> tag",
  message: "❌ **Balise `<script>` mal placée** : ne mettez pas vos scripts dans `<head>`. 💡 Placez-les avant `</body>`."
},
{
  match: "Special characters must be escaped",
  message: "❌ **Caractères spéciaux non échappés** : certains caractères doivent être remplacés par leur équivalent HTML."
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
  message: "❌ **Attribut `lang` manquant** sur `<html>`. 💡 Exemple : `<html lang='fr'>`."
},
{
  match: "Heading levels should only increase by one",
  message: "❌ **Mauvaise hiérarchie de titres** : n’utilisez pas `<h3>` directement après `<h1>`."
},
{
  match: "The <section> element should have a heading",
  message: "❌ **Section sans titre** : chaque `<section>` doit contenir un titre (`<h1>`, `<h2>`, etc.)."
},
{
  match: "Attribute name must be lowercase",
  message: "❌ **Nom d'attribut en majuscule** : les attributs doivent être en minuscules."
},
{
  match: "Attribute value must be in double quotes",
  message: "❌ **Valeur d'attribut mal formatée** : utilisez toujours des guillemets doubles autour des valeurs d'attribut."
},
{
  match: "Duplicate attribute",
  message: "❌ **Attribut dupliqué** sur une même balise."
},
{
  match: "The value of attribute",
  message: "❌ **Valeur d'attribut incorrecte ou dangereuse**."
},
{
  match: "Inline style is not allowed",
  message: "❌ **Style inline interdit** : n'utilisez pas de `style=\"...\"` dans vos balises."
},
{
  match: "Inline script is not allowed",
  message: "❌ **Script inline interdit**."
},
{
  match: "Space and tab mixed in indentation",
  message: "❌ **Indentation mixte** : mélange d'espaces et de tabulations."
},
{
  match: "ID must be unique",
  message: "❌ **ID dupliqué** : chaque ID doit être unique dans la page."
},
{
  match: "Tag name must be lowercase",
  message: "❌ **Nom de balise en majuscule** : utilisez des minuscules."
},
{
  match: "The src attribute of",
  message: "❌ **Attribut `src` vide ou incorrect**."
},
{
  match: "Title must be present in",
  message: "❌ **Titre manquant** : ajoutez une balise `<title>` dans `<head>`."
},
{
  match: "img alt attribute must be present",
  message: "❌ **Attribut `alt` manquant sur une image**."
},
{
  match: "href attribute must be absolute or relative",
  message: "❌ **Lien `href` mal formaté**."
},
{
  match: "input elements must have labels",
  message: "❌ **Champ `<input>` sans label**."
},
{
  match: "label elements must have for attribute",
  message: "❌ **Label sans attribut `for`**."
},

  // --- CSS ---
// Stylelint rules
{
  match: "Unexpected missing semicolon",
  message: "❌ **Point-virgule manquant** : il manque un `;` à la fin de la déclaration."
},
{
  match: "Unexpected hex color",
  message: "❌ **Couleur hexadécimale invalide**."
},
{
  match: "Unknown property",
  message: "❌ **Propriété CSS inconnue** : vérifiez l'orthographe."
},
{
  match: "Unexpected unit",
  message: "❌ **Unité inattendue dans une propriété**."
},
{
  match: "Duplicate property",
  message: "❌ **Propriété dupliquée** : évitez de répéter la même règle."
},
{
  match: "Unexpected unknown pseudo-class",
  message: "❌ **Pseudo-classe inconnue** : vérifiez l’orthographe."
},
{
  match: "Unexpected empty source",
  message: "❌ **Fichier CSS vide**."
},
{
  match: "Unexpected extra semicolon",
  message: "❌ **Point-virgule en trop**."
},
{
  match: "Unknown word",
  message: "❌ **Mot inconnu en CSS** : erreur de syntaxe probable."
},
{
  match: "Expected a leading zero",
  message: "❌ **Zéro manquant avant la décimale**."
},
{
  match: "Unexpected duplicate selector",
  message: "❌ **Sélecteur dupliqué**."
},
{
  match: "Expected single space after",
  message: "❌ **Problème d'espacement après une propriété CSS**."
},
{
  match: "Expected closing brace",
  message: "❌ **Accolade fermante manquante**."
},
{
  match: "No unknown at-rules",
  message: "❌ **At-rule inconnu**."
},
{
  match: "Selector should be written in lowercase",
  message: "❌ **Sélecteur en majuscule** : utilisez des minuscules."
},
{
  match: "Unexpected vendor-prefix",
  message: "❌ **Préfixe navigateur interdit**."
},
{
  match: "Expected a selector",
  message: "❌ **Sélecteur manquant ou mal formé**."
},

  // --- Git ---
  // Commitlint rules
  {
    match: "header-max-length",
    message: "❌ **Message de commit trop long** : limitez à 100 caractères."
  },
{
  match: "scope-enum",
  message: "❌ **Scope de commit invalide** : utilisez un scope autorisé (frontend, backend, docs, tests, chore, refactor, style, fix, feat)."
},
{
  match: "branch-name",
  message: "❌ **Nom de branche invalide pour le commit**."
},
{
  match: "type may not be empty",
  message: "❌ **Type de commit manquant**."
},
{
  match: "type must be one of",
  message: "❌ **Type de commit invalide**."
},
{
  match: "subject may not be empty",
  message: "❌ **Message de commit vide**."
},
{
  match: "subject may not be sentence-case",
  message: "❌ **Le sujet du commit doit commencer par une minuscule**."
},
{
  match: "subject may not end with",
  message: "❌ **Le sujet du commit ne doit pas finir par un point**."
},
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

const final = [
  fs.readFileSync('html-feedback.md', 'utf-8'),
  fs.readFileSync('css-feedback.md', 'utf-8'),
  fs.readFileSync('commit-feedback.md', 'utf-8')
].join('\n\n');
fs.writeFileSync('feedback.md', final, 'utf-8');
