/**
 * @file cvService.ts
 * @description Service (ou Repository) pour l'accès aux données du CV.
 */
import type { CvData, DesignConfig } from '../domain/cv.types'

// @ts-ignore
import cvDataJson from '../data/cv-data.json'
// @ts-ignore
import cvDataEnJson from '../data/cv-data-en.json'
// @ts-ignore
import designConfigJson from '../data/design-config.json'

export const cvService = {
    getCvData(locale: string = 'fr'): CvData {
        if (locale === 'en') return cvDataEnJson as unknown as CvData
        return cvDataJson as unknown as CvData
    },

    getDesignConfig(): DesignConfig {
        return designConfigJson as unknown as DesignConfig
    }
}
