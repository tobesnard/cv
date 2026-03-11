/**
 * @file useTheme.js
 * @description Composable pour la gestion simplifiée des ressources du thème (Icônes).
 * Délègue maintenant la logique d'état principale à Pinia.
 */
import { computed } from 'vue'
import { useAppStore } from '../store/appStore'
import { Printer as PrinterIcon, Sun as SunIcon, Moon as MoonIcon } from 'lucide-vue-next'

// Icônes SVG locales
import userIcon from '@/assets/icons/user.svg'
import codeIcon from '@/assets/icons/code.svg'
import briefcaseIcon from '@/assets/icons/briefcase.svg'
import graduationIcon from '@/assets/icons/graduation-cap.svg'
import heartIcon from '@/assets/icons/heart.svg'

/**
 * Composable useTheme (Version Pinia)
 * @returns {Object} Un ensemble d'états et d'icônes réactifs basés sur le store.
 */
export function useTheme() {
    /** Accès au store principal de l'application */
    const store = useAppStore()

    /** Dictionnaire des icônes utilisées dans l'interface */
    const icons = {
        user: userIcon,
        code: codeIcon,
        briefcase: briefcaseIcon,
        graduation: graduationIcon,
        heart: heartIcon,
        printer: PrinterIcon,
        sun: SunIcon,
        moon: MoonIcon
    }

    /** Mapping direct vers l'état du store pour une utilisation identique à l'ancienne version */
    const isDarkMode = computed(() => store.isDarkMode)
    const currentTheme = computed(() => store.currentTheme)
    const activeBackgroundImage = computed(() => store.activeBackgroundImage)
    const toggleTheme = store.toggleTheme

    return {
        isDarkMode,
        currentTheme,
        icons,
        activeBackgroundImage,
        toggleTheme
    }
}
