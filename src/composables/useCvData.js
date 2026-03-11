/**
 * @file useCvData.js
 * @description Composable pour la gestion des données brutes et des assets (images, icônes) du CV.
 */
import { ref } from 'vue'
import cvData from '../data/cv-data.json'
import designConfig from '../data/design-config.json'

// Assets (Images & Icônes)
import photoImage from '@/assets/images/photo-profil-ameliore.png'
import userIcon from '@/assets/icons/user.svg'
import codeIcon from '@/assets/icons/code.svg'
import briefcaseIcon from '@/assets/icons/briefcase.svg'
import graduationIcon from '@/assets/icons/graduation-cap.svg'
import heartIcon from '@/assets/icons/heart.svg'

export function useCvData() {
    const data = ref(cvData)
    const config = ref(designConfig)

    const icons = {
        user: userIcon,
        code: codeIcon,
        briefcase: briefcaseIcon,
        graduation: graduationIcon,
        heart: heartIcon
    }

    const profilePhoto = photoImage

    return {
        data,
        config,
        icons,
        profilePhoto
    }
}
