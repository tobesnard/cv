/**
 * @file appStore.ts
 * @description Store principal (Pinia) pour la gestion d'état globale de l'application.
 */
/*
 * Modifications récentes (depuis le dernier commit):
 * - Suppression de l'initialisation asynchrone du store.
 * - Ajout du support d'un paramètre URL `cv` (ex: `?cv=java`) exposé via `currentCv`.
 * - Ajout des actions `loadCvDataAsync(locale, cv)` et `setCv(cv)` pour
 *   recharger/mettre à jour les données CV en tenant compte du paramètre `cv`.
 * - `cvData` est initialisé de façon synchrone via `cvService.getCvData(...)`
 *   puis rafraîchi en tâche de fond de manière asynchrone.
 */
import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { cvService } from '../services/cvService'
import type { CvData, DesignConfig, DesignTheme } from '../domain/cv.types'

// @ts-ignore - Image asset import
import defaultBackgroundImage from '@/assets/images/background.png'

export const useAppStore = defineStore('app', () => {
    // --- ÉTAT (STATE) ---
    const currentLocale = ref<string>('fr')
    // Récupérer le paramètre `cv` depuis l'URL si présent
    const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams()
    // `currentCv` contient le suffixe optionnel permettant de charger un CV
    // spécialisé (ex: 'java' -> `cv-data-java.json`). Exposé publiquement.
    const currentCv = ref<string>(urlParams.get('cv') || '')
    // Initialise avec le fallback synchrone puis recharge async en tâche de fond
    const cvData = ref<CvData>(cvService.getCvData(currentLocale.value, currentCv.value) as CvData)
    const designConfig = ref<DesignConfig>(cvService.getDesignConfig() as DesignConfig)
    const isDarkMode = ref<boolean>(designConfig.value?.defaultTheme === 'dark')

    // --- GETTERS ---
    const currentTheme = computed<DesignTheme>(() => {
        const themeKey = isDarkMode.value ? 'dark' : 'light'
        return designConfig.value?.themes?.[themeKey] as DesignTheme
    })

    const activeBackgroundImage = computed<string | null>(() => {
        const themeBg = currentTheme.value?.backgroundImage
        if (themeBg === "") return null
        return themeBg ? defaultBackgroundImage : null
    })

    // --- ACTIONS ---
    /**
     * Change la locale et recharge les données CV en tenant compte du CV actif.
     */
    const setLocale = (locale: string) => {
        currentLocale.value = locale
        // charge immédiatement le fallback synchrone puis tente de récupérer la version async
        cvData.value = cvService.getCvData(locale, currentCv.value)
        void loadCvDataAsync(locale, currentCv.value)
    }

    const toggleTheme = () => {
        isDarkMode.value = !isDarkMode.value
    }

    /**
     * Définit le CV actif (suffixe) et met à jour l'URL sans rechargement.
     * Recharge ensuite les données (sync fallback + async refresh).
     */
    const setCv = (cv: string) => {
        currentCv.value = cv
        // Mettre à jour l'URL sans recharger la page
        try {
            if (typeof window !== 'undefined' && 'history' in window) {
                const url = new URL(window.location.href)
                if (cv) url.searchParams.set('cv', cv)
                else url.searchParams.delete('cv')
                window.history.replaceState({}, '', url.toString())
            }
        } catch (e) {
            // ignore - compatibilité navigateurs ou SSR
        }

        // Mise à jour immédiate + tentative de rafraîchissement async
        cvData.value = cvService.getCvData(currentLocale.value, currentCv.value)
        void loadCvDataAsync(currentLocale.value, currentCv.value)
    }

    const syncTheme = (themeName: string) => {
        if (themeName) isDarkMode.value = themeName === 'dark'
    }

    // --- WATCHERS ---
    watch(() => designConfig.value?.defaultTheme, (newVal) => {
        if (newVal) syncTheme(newVal)
    })

    // --- ACTIONS ASYNC ---
    /**
     * Charge les données CV en asynchrone et met à jour `cvData`.
     * Utilisée au démarrage et lors des changements de `locale` ou `cv`.
     */
    const loadCvDataAsync = async (locale: string = currentLocale.value, cv: string = currentCv.value) => {
        try {
            const data = await cvService.getCvDataAsync(locale, cv)
            if (data) cvData.value = data
        } catch (error) {
            console.error('Erreur lors du chargement async des données CV :', error)
        }
    }

    // Lancer le chargement async en tâche de fond au démarrage du store
    void loadCvDataAsync()

    return {
        currentLocale,
        currentCv,
        cvData,
        designConfig,
        isDarkMode,
        currentTheme,
        activeBackgroundImage,
        toggleTheme,
        setCv,
        syncTheme,
        setLocale
    }
})
