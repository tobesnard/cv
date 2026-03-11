/**
 * @file useCvActions.js
 * @description Composable pour les actions utilisateur telles que l'impression.
 */

export function useCvActions() {
    /**
     * Gère le déclenchement de l'impression du document.
     * Cette fonction lance simplement l'impression système du navigateur.
     */
    const handlePrint = () => {
        window.print()
    }

    return {
        handlePrint
    }
}
