/**
 * @file useCvData.js
 * @description Composable pour charger et fournir les données du CV ainsi que la configuration du design.
 * Ce composable centralise l'accès aux données statiques (JSON) et aux assets globaux.
 */
import { ref } from 'vue'

// Chargement des données statiques du CV et de la configuration du design
import cvDataJson from '../data/cv-data.json'
import designConfigJson from '../data/design-config.json'

// Import de l'asset image de profil (résolu par Vite/Webpack)
import photoProfile from '@/assets/images/photo-profil-ameliore.png'

/**
 * Composable useCvData
 * @returns {Object} Un objet contenant les données réactives et les assets du CV.
 */
export function useCvData() {
    /** @type {import('vue').Ref<Object>} Les données personnelles du CV (expériences, compétences, etc.) */
    const data = ref(cvDataJson)

    /** @type {import('vue').Ref<Object>} La configuration globale du design (couleurs, thèmes, polices) */
    const config = ref(designConfigJson)

    /** @type {string} Le chemin résolu vers la photo de profil */
    const profilePhoto = photoProfile

    return {
        data,
        config,
        profilePhoto
    }
}
