/**
 * @file cvService.ts
 * @description Service (ou Repository) pour l'accès aux données du CV.
 */
import type { CvData, DesignConfig } from '../domain/cv.types'

// @ts-ignore
import cvDataJson from '../data/cv-data.json'
// @ts-ignore
import designConfigJson from '../data/design-config.json'

export const cvService = {
    getCvData(): CvData {
        return cvDataJson as unknown as CvData
    },

    getDesignConfig(): DesignConfig {
        return designConfigJson as unknown as DesignConfig
    }
}
