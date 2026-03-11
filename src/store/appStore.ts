/**
 * @file appStore.ts
 * @description Store principal (Pinia) pour la gestion d'état globale de l'application.
 */
import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { cvService } from '../services/cvService'
import type { CvData, DesignConfig, DesignTheme } from '../domain/cv.types'

// @ts-ignore - Image asset import
import defaultBackgroundImage from '@/assets/images/background.png'

export const useAppStore = defineStore('app', () => {
    // --- ÉTAT (STATE) ---
    const cvData = ref<CvData>(cvService.getCvData() as CvData)
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
    const toggleTheme = () => {
        isDarkMode.value = !isDarkMode.value
    }

    const syncTheme = (themeName: string) => {
        if (themeName) isDarkMode.value = themeName === 'dark'
    }

    // --- WATCHERS ---
    watch(() => designConfig.value?.defaultTheme, (newVal) => {
        if (newVal) syncTheme(newVal)
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
