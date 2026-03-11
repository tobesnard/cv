/**
 * @file useTheme.js
 * @description Composable pour la gestion globale du thème (Clair / Sombre).
 */
import { ref, computed } from 'vue'

// Assets Icônes (lié à l'apparence car leur couleur dépend du mode)
import userIcon from '@/assets/icons/user.svg'
import codeIcon from '@/assets/icons/code.svg'
import briefcaseIcon from '@/assets/icons/briefcase.svg'
import graduationIcon from '@/assets/icons/graduation-cap.svg'
import heartIcon from '@/assets/icons/heart.svg'

export function useTheme(config, initialTheme = 'dark') {
    const isDarkMode = ref(initialTheme === 'dark')

    const icons = {
        user: userIcon,
        code: codeIcon,
        briefcase: briefcaseIcon,
        graduation: graduationIcon,
        heart: heartIcon
    }

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
        icons,
        toggleTheme,
        syncTheme
    }
}
