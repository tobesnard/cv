/**
 * @file useCvData.js
 * @description Composable pour la gestion des données brutes et des assets (images, icônes) du CV.
 */
import { ref } from 'vue'
import cvData from '../data/cv-data.json'
import designConfig from '../data/design-config.json'

// Assets (Images & Icônes)
import photoImage from '@/assets/images/photo-profil-ameliore.png'

export function useCvData() {
    const data = ref(cvData)
    const config = ref(designConfig)

    const profilePhoto = photoImage

    return {
        data,
        config,
        profilePhoto
    }
}
