/**
 * @file useCvData.ts
 * @description Composable pour charger et fournir les données du CV ainsi que la configuration du design.
 * Ce composable centralise l'accès aux données métier via Pinia (State Management).
 */
import { computed, type ComputedRef } from 'vue'
import { useAppStore } from '../store/appStore'
import type { CvData, DesignConfig } from '../domain/cv.types'

// Import de l'asset image de profil (résolu par Vite/Webpack)
import photoProfile from '@/assets/images/photo-profil-ameliore.png'

/**
 * Interface de retour pour le composable useCvData
 */
interface UseCvDataReturn {
    data: ComputedRef<CvData | null>;
    config: ComputedRef<DesignConfig | null>;
    profilePhoto: string;
}

/**
 * Composable useCvData (Version Pinia)
 * @returns {UseCvDataReturn} Un objet contenant les données réactives et les assets du CV.
 */
export function useCvData(): UseCvDataReturn {
    /** Accès au store principal de l'application */
    const store = useAppStore()

    /** Les données personnelles du CV (mappées depuis le store) */
    const data = computed(() => store.cvData as CvData)

    /** La configuration globale du design (mappée depuis le store) */
    const config = computed(() => store.designConfig as DesignConfig)

    /** Le chemin résolu vers la photo de profil */
    const profilePhoto = photoProfile as string

    return {
        data,
        config,
        profilePhoto
    }
}
