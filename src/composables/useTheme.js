/**
 * @file useTheme.js
 * @description Composable pour la gestion globale du thème visuel (Clair / Sombre).
 * Gère le changement d'état, la synchronisation avec la configuration et l'accès aux ressources visuelles associées.
 */
import { ref, computed, watch } from 'vue'
import { Printer as PrinterIcon, Sun as SunIcon, Moon as MoonIcon } from 'lucide-vue-next'

// Importations des assets visuels (images et icônes statiques)
import defaultBackgroundImage from '@/assets/images/background.png'
import userIcon from '@/assets/icons/user.svg'
import codeIcon from '@/assets/icons/code.svg'
import briefcaseIcon from '@/assets/icons/briefcase.svg'
import graduationIcon from '@/assets/icons/graduation-cap.svg'
import heartIcon from '@/assets/icons/heart.svg'

/**
 * Composable useTheme
 * Centralise les données et actions liées à l'apparence graphique du CV.
 *
 * @param {import('vue').Ref<Object>} config - La configuration du design JSON réactive.
 * @param {string} initialTheme - Le thème par défaut ('dark' ou 'light').
 * @returns {Object} Un ensemble d'états et de fonctions pour gérer l'affichage.
 */
export function useTheme(config, initialTheme = 'dark') {
    /** @type {import('vue').Ref<boolean>} État interne : true si le mode sombre est actif */
    const isDarkMode = ref(initialTheme === 'dark')

    /**
     * Dictionnaire centralisé des icônes utilisées dans l'interface.
     * Inclut les fichiers SVG locaux et les composants de la librairie Lucide.
     * @type {Object}
     */
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

    /**
     * Retourne les paramètres du thème actif basés sur l'état sombre/clair.
     * Sert de source de données pour useDynamicStyles.
     * @returns {Object} L'objet de configuration du thème courant dans design-config.json.
     */
    const currentTheme = computed(() => {
        const themeKey = isDarkMode.value ? 'dark' : 'light'
        return config.value?.themes?.[themeKey] || {}
    })

    /**
     * Détermine l'image de fond à afficher dynamiquement.
     * @returns {string|null} URL de l'image de fond configurée pour le thème actif, ou null si vide.
     */
    const activeBackgroundImage = computed(() => {
        return currentTheme.value?.backgroundImage || null
    })

    /**
     * Alterne entre le mode clair et le mode sombre par inversion du booléen.
     * @function
     */
    const toggleTheme = () => {
        isDarkMode.value = !isDarkMode.value
    }

    /**
     * Force la synchronisation de l'état local avec une valeur de configuration externe.
     * @param {string} newConfigTheme - La valeur textuelle du thème ('dark' ou 'light').
     * @function
     */
    const syncTheme = (newConfigTheme) => {
        isDarkMode.value = newConfigTheme === 'dark'
    }

    /**
     * Surveillance automatique de la configuration par défaut du thème.
     * Permet de répercuter un changement s'opérant dans le fichier de config chargé à la volée.
     */
    watch(() => config.value?.defaultTheme, (newVal) => {
        if (newVal) syncTheme(newVal)
    })

    return {
        isDarkMode,
        currentTheme,
        icons,
        activeBackgroundImage,
        toggleTheme,
        syncTheme
    }
}
