/**
 * @file useCvActions.js
 * @description Composable regroupant les actions utilisateur et les fonctionnalités utilitaires (ex: Impression).
 */

/**
 * Composable useCvActions
 * Fournit les méthodes d'interaction principales pour l'interface du CV.
 * @returns {Object} Un ensemble de fonctions d'action.
 */
export function useCvActions() {
    /**
     * Déclenche la boîte de dialogue d'impression du navigateur.
     * Les styles CSS spécifiques à l'impression gèrent la mise en page A4 automatique.
     * @function
     */
    const handlePrint = () => {
        window.print()
    }

    return {
        handlePrint
    }
}
