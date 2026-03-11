/**
 * @file useTheme.js
 * @description Composable pour la gestion globale du thème (Clair / Sombre).
 */
import { ref, computed } from 'vue'

export function useTheme(initialTheme = 'dark') {
    const isDarkMode = ref(initialTheme === 'dark')

    const toggleTheme = () => {
        isDarkMode.value = !isDarkMode.value
    }

    // Permet de synchroniser avec une config externe si la valeur de la config change
    const syncTheme = (newConfigTheme) => {
        isDarkMode.value = newConfigTheme === 'dark'
    }

    return {
        isDarkMode,
        toggleTheme,
        syncTheme
    }
}
