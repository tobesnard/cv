/**
 * @file useCvActions.js
 * @description Composable regroupant les actions utilisateur (Impression).
 */

export function useCvActions() {
    /**
     * Déclenche la boîte de dialogue d'impression native.
     */
    const handlePrint = () => {
        window.print()
    }

    return {
        handlePrint
    }
}
