/**
 * @file cvService.js
 * @description Service (ou Repository) pour l'accès aux données du CV.
 * Isole la provenance des données (Local JSON, API, CMS) du reste de l'application.
 */

// Import direct des JSON pour cette implémentation "Local Repository"
import cvDataJson from '../data/cv-data.json'
import designConfigJson from '../data/design-config.json'

/**
 * Service pour la récupération des données métier et configuration.
 */
export const cvService = {
    /**
     * Récupère l'ensemble des données du CV.
     * @returns {Object} Les données du CV.
     */
    getCvData() {
        return cvDataJson
    },

    /**
     * Récupère la configuration du design.
     * @returns {Object} Les données de design.
     */
    getDesignConfig() {
        return designConfigJson
    }
}
