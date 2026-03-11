/**
 * @file useTheme.js
 * @description Composable pour la gestion globale du thème (Clair / Sombre).
 */
import { ref, computed } from 'vue'

export function useTheme(config, initialTheme = 'dark') {
    const isDarkMode = ref(initialTheme === 'dark')

    /**
     * Thème actif basé sur le mode sombre/clair extrait de la config.
     * Déplacé de useDynamicStyles vers useTheme pour une meilleure cohésion.
     */
    const currentTheme = computed(() => {
        const themeKey = isDarkMode.value ? 'dark' : 'light'
        return config.value?.themes?.[themeKey] || {}
    })

    const toggleTheme = () => {
        isDarkMode.value = !isDarkMode.value
    }

    // Permet de synchroniser avec une config externe si la valeur de la config change
    const syncTheme = (newConfigTheme) => {
        isDarkMode.value = newConfigTheme === 'dark'
    }

    return {
        isDarkMode,
        currentTheme,
        toggleTheme,
        syncTheme
    }
}
