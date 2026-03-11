/**
 * @file useCvData.js
 * @description Composable pour charger et fournir les données du CV ainsi que la configuration du design.
 * Ce composable centralise l'accès aux données métier via Pinia (State Management).
 */
import { computed } from 'vue'
import { useAppStore } from '../store/appStore'

// Import de l'asset image de profil (résolu par Vite/Webpack)
import photoProfile from '@/assets/images/profilePicture.png'

/**
 * Composable useCvData (Version Pinia)
 * @returns {Object} Un objet contenant les données réactives et les assets du CV.
 */
export function useCvData() {
    /** Accès au store principal de l'application */
    const store = useAppStore()

    /** Les données personnelles du CV (mappées depuis le store) */
    const data = computed(() => store.cvData)

    /** La configuration globale du design (mappée depuis le store) */
    const config = computed(() => store.designConfig)

    /** Le chemin résolu vers la photo de profil */
    const profilePhoto = photoProfile

    /** Action pour changer la locale et rafraîchir les données */
    const setLocale = (locale) => store.setLocale(locale)

    return {
        data,
        config,
        profilePhoto,
        setLocale
    }
}
