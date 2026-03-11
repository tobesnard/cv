/**
 * @file appStore.js
 * @description Store principal (Pinia) pour la gestion d'état globale de l'application.
 * Gère le thème et l'accès centralisé aux données du CV.
 */
import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { cvService } from '../services/cvService'

// Importations des assets visuels pour le store
import defaultBackgroundImage from '@/assets/images/background.png'

export const useAppStore = defineStore('app', () => {
    // --- ÉTAT (STATE) ---
    /** @type {import('vue').Ref<Object>} Données brutes du CV */
    const cvData = ref(cvService.getCvData())

    /** @type {import('vue').Ref<Object>} Configuration du design */
    const designConfig = ref(cvService.getDesignConfig())

    /** @type {import('vue').Ref<boolean>} État du mode sombre */
    const isDarkMode = ref(designConfig.value?.defaultTheme === 'dark')

    // --- GETTERS ---
    /** Retourne les paramètres du thème actif */
    const currentTheme = computed(() => {
        const themeKey = isDarkMode.value ? 'dark' : 'light'
        return designConfig.value?.themes?.[themeKey] || {}
    })

    /** Détermine l'image de fond à afficher dynamiquement */
    const activeBackgroundImage = computed(() => {
        const themeBg = currentTheme.value?.backgroundImage
        if (themeBg === "") return null
        return themeBg ? defaultBackgroundImage : null
    })

    // --- ACTIONS ---
    /** Alterne entre mode clair et sombre */
    const toggleTheme = () => {
        isDarkMode.value = !isDarkMode.value
    }

    /** Synchronise le thème avec une valeur externe */
    const syncTheme = (themeName) => {
        if (themeName) isDarkMode.value = themeName === 'dark'
    }

    // --- WATCHERS ---
    // Surveille les changements dans la config chargée pour mettre à jour le thème par défaut
    watch(() => designConfig.value?.defaultTheme, (newVal) => {
        syncTheme(newVal)
    })

    return {
        cvData,
        designConfig,
        isDarkMode,
        currentTheme,
        activeBackgroundImage,
        toggleTheme,
        syncTheme
    }
})
