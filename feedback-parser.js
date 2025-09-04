const fs = require('fs');

function parseErrors(filePath, outputFile) {
  const errors = fs.readFileSync(filePath, 'utf-8').split('\n');
  let feedback = '';

  errors.forEach(error => {
    if (error.includes('Please use tab for indentation')) {
      feedback += '❌ **Erreur d\'indentation** : Utilisez des tabulations pour l\'indentation.\n';
      feedback += '💡 **Solution** : Configurez votre éditeur pour utiliser des tabulations au lieu d\'espaces.\n\n';
    } else if (error.includes('must be self closed')) {
      feedback += '❌ **Erreur de balise auto-fermante** : Les balises auto-fermantes doivent se terminer par `/>`.\n';
      feedback += '💡 **Solution** : Corrigez les balises comme `<meta>`, `<link>`, et `<img>` pour qu\'elles soient auto-fermantes.\n\n';
    } else if (error.includes('Tag must be paired')) {
      feedback += '❌ **Erreur de balise non fermée** : Chaque balise ouvrante doit avoir une balise fermante correspondante.\n';
      feedback += '💡 **Solution** : Assurez-vous que chaque balise comme `<section>` est correctement fermée par `</section>`.\n\n';
    } else if (error.includes('alt attribute must be present')) {
      feedback += '❌ **Erreur d\'attribut `alt` manquant** : Chaque balise `<img>` doit avoir un attribut `alt`.\n';
      feedback += '💡 **Solution** : Ajoutez un attribut `alt` pour décrire l\'image, par exemple : `<img src="image.jpg" alt="Description de l\'image" />`.\n\n';
    } else if (error.includes('The <script> tag cannot be used in a <head> tag')) {
      feedback += '❌ **Erreur de balise `<script>` dans `<head>`** : Les balises `<script>` ne doivent pas être placées dans `<head>`.\n';
      feedback += '💡 **Solution** : Déplacez les balises `<script>` juste avant la fermeture de `</body>`.\n\n';
    } else if (error.includes('Special characters must be escaped')) {
      feedback += '❌ **Erreur de caractères spéciaux non échappés** : Les caractères spéciaux doivent être échappés.\n';
      feedback += '💡 **Solution** : Remplacez les caractères spéciaux comme `>` par `&gt;`.\n\n';
    } else if (error.includes('Duplicate meta charset')) {
      feedback += '❌ **Erreur de balise `<meta>` dupliquée** : Il y a une balise `<meta charset="utf-8">` dupliquée.\n';
      feedback += '💡 **Solution** : Supprimez la balise `<meta>` dupliquée.\n\n';
    } else if (error.includes('Tag must be paired, missing: [ </p></setion> ]')) {
      feedback += '❌ **Erreur de balise mal fermée** : La balise `<p>` ou `<section>` n\'est pas correctement fermée.\n';
      feedback += '💡 **Solution** : Assurez-vous que chaque balise est correctement fermée.\n\n';
    } else if (error.includes('Unknown property')) {
      feedback += '❌ **Erreur de propriété CSS inconnue** : Une propriété CSS inconnue est utilisée.\n';
      feedback += '💡 **Solution** : Vérifiez l\'orthographe de la propriété.\n\n';
    }
  });

  fs.writeFileSync(outputFile, feedback);
}

// Exemple d'utilisation
parseErrors('html-report.txt', 'html-feedback.md');
parseErrors('css-report.txt', 'css-feedback.md');
