/**
 * @file useCvData.js
 * @description Composable pour charger et fournir les données du CV ainsi que la configuration du design.
 * Ce composable centralise l'accès aux données métier via le Service (Repository Pattern).
 */
import { ref } from 'vue'

// Chargement via le Service de données (Clean Architecture)
import { cvService } from '../services/cvService'

// Import de l'asset image de profil (résolu par Vite/Webpack)
import photoProfile from '@/assets/images/photo-profil-ameliore.png'

/**
 * Composable useCvData
 * @returns {Object} Un objet contenant les données réactives et les assets du CV.
 */
export function useCvData() {
    /** 
     * Accès aux données de manière réactive. 
     * Note: Dans cette implémentation synchrone, on utilise directement les résultats du service.
     */
    const data = ref(cvService.getCvData())

    /** @type {import('vue').Ref<Object>} La configuration globale du design (Design system) */
    const config = ref(cvService.getDesignConfig())

    /** @type {string} Le chemin résolu vers la photo de profil */
    const profilePhoto = photoProfile

    return {
        data,
        config,
        profilePhoto
    }
}
