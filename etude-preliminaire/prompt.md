
**Prompt :**

"Je souhaite créer un projet Vue.js 3 (Composition API) permettant de générer un CV au format A4, parfaitement optimisé pour l'export en PDF.

**Objectifs techniques :**

1. **Architecture :** Structure le projet pour séparer la logique de rendu du contenu. Utilise un composant `CvPage.vue` principal.
2. **Gestion des données :**

* Importe tout le contenu textuel depuis un fichier `cv-data.json`.
* Importe la configuration stylistique (variables de couleurs, polices, espacements, chemins d'accès aux icônes) depuis un fichier `design-config.json` distinct.

3. **Design et Fidélité :**

* Reprends fidèlement la charte graphique, les couleurs et le fond (background) issus de `background.png`.
* Adopte une mise en page le plus fidèlement possible de `visuel.png` avec une esthétique axée sur la 'Cybersécurité' et la 'Technologie' (utilisation de typographies modernes, styles épurés).
* Intègre proprement `photo.jpg` dans l'en-tête.

4. **Impression & PDF :** - Rédige des feuilles de styles CSS spécifiques pour l'impression (`@media print`). Assure-toi que la mise en page respecte strictement les marges et le format A4.

* Utilise des unités CSS adaptées (cm, mm) pour garantir le rendu à l'impression.

5. **Stack :**

* Vue.js 3, Vite, et du CSS moderne (ou SCSS).
* Le code doit être propre, modulaire et hautement maintenable.

**Livrables attendus :**

* La structure des fichiers (`package.json`, `App.vue`, `components/CvPage.vue`, `assets/`, `data/`).
* Le contenu détaillé du `cv-data.json`.
* Le contenu détaillé du `design-config.json` avec les variables CSS root.
* Un exemple de composant Vue utilisant ces données.

Le projet doit être immédiatement fonctionnel après installation des dépendances."
