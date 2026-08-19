import type { CvData, DesignConfig } from '../domain/cv.types'

import cvDataJson from '../data/cv-data.json'
import cvDataEnJson from '../data/cv-data-en.json'
import designConfigJson from '../data/design-config.json'

/*
 * Modifications récentes (depuis le dernier commit):
 * - Ajout du support d'un suffixe `cv` (ex: `cv=java`) permettant de charger
 *   et de fusionner un fichier `cv-data-<suffix>.json` avec le fichier par
 *   défaut `cv-data.json`.
 * - Support de la locale (ex: `cv-data-en.json`) conservé.
 * - Fournit des méthodes synchrones et asynchrones (`getCvData` / `getCvDataAsync`)
 *   avec fallback eager pour être utilisable lors de l'initialisation du store.
 */

// Mapping dynamique compatible avec Vite pour les imports asynchrones
const dataFiles = import.meta.glob('../data/cv-data*.json')
// Importer de façon eager pour pouvoir récupérer des fichiers de données de façon SYNCHRONE
const dataFilesEager = import.meta.glob('../data/cv-data*.json', { eager: true }) as Record<string, { default: CvData }>

/**
 * Merge récursif (profond) : les propriétés de `override` remplacent celles de `base`.
 * - Les objets sont fusionnés récursivement.
 * - Les tableaux et valeurs scalaires de `override` remplacent ceux de `base`.
 */
function mergeDeep<T extends Record<string, any>>(base: T, override: Partial<T>): T {
    const result: any = Array.isArray(base) ? [...(base as any)] : { ...base }

    if (override === undefined || override === null) return result

    for (const key of Object.keys(override)) {
        const oVal = (override as any)[key]
        const bVal = (result as any)[key]

        if (oVal && typeof oVal === 'object' && !Array.isArray(oVal) && bVal && typeof bVal === 'object' && !Array.isArray(bVal)) {
            result[key] = mergeDeep(bVal, oVal)
        } else {
            result[key] = oVal
        }
    }

    return result
}

/**
 * Charge un fichier JSON asynchrone correspondant à la locale et au suffixe.
 * Exemples de combinaison de `locale` et `suffix` :
 * - locale='' suffix='' -> '../data/cv-data.json'
 * - locale='en' suffix='' -> '../data/cv-data-en.json'
 * - locale='' suffix='java' -> '../data/cv-data-java.json'
 */
async function loadJson(locale: string = '', suffix: string = ''): Promise<CvData | undefined> {
    try {
        const fileBase = `cv-data${locale && locale !== 'fr' ? `-${locale}` : ''}${suffix ? `-${suffix}` : ''}`
        const filePath = `../data/${fileBase}.json`

        const loader = (dataFiles as Record<string, () => Promise<{ default: CvData }>>)[filePath]
        if (loader) {
            const module = await loader()
            return module.default
        }

        console.warn(`Fichier introuvable : ${filePath}`)
        return undefined
    } catch (error) {
        console.error("Erreur de chargement du JSON :", error)
        return undefined
    }
}

export const cvService = {
    /**
     * Récupère les données CV asynchronement.
     * Si `cv` est fourni, tente de charger et fusionner `cv-data-<cv>.json`.
     * Retourne toujours un objet `CvData` (avec fallback sur le fichier embarqué).
     */
    async getCvDataAsync(locale: string = 'fr', cv: string = ''): Promise<CvData> {
        const baseData = (await loadJson(locale, '')) ?? (locale === 'en' ? cvDataEnJson : cvDataJson)

        if (!cv) return baseData as CvData

        // Tentative asynchrone d'un fichier spécifique
        const extra = await loadJson(locale, cv)
        if (extra) return mergeDeep(baseData as any, extra as any) as CvData

        // Fallback synchrone via les imports eager (utile pour l'initialisation)
        const filePath = `../data/cv-data${locale && locale !== 'fr' ? `-${locale}` : ''}-${cv}.json`
        const eagerModule = dataFilesEager[filePath]
        if (eagerModule) return mergeDeep(baseData as any, eagerModule.default as any) as CvData

        return baseData as CvData
    },

    /**
     * Récupération synchrone utilisée pour l'initialisation.
     * Utilise les imports eager fournis par Vite pour fournir un fallback
     * sans chargement asynchrone.
     */
    getCvData(locale: string = 'fr', cv: string = ''): CvData {
        const basePath = `../data/cv-data${locale && locale !== 'fr' ? `-${locale}` : ''}.json`
        const eagerBase = dataFilesEager[basePath]
        const base = eagerBase ? eagerBase.default : (locale === 'en' ? cvDataEnJson : cvDataJson)

        if (!cv) return base as CvData

        const extraPath = `../data/cv-data${locale && locale !== 'fr' ? `-${locale}` : ''}-${cv}.json`
        const eagerExtra = dataFilesEager[extraPath]
        if (eagerExtra) return mergeDeep(base as any, eagerExtra.default as any) as CvData

        return base as CvData
    },

    getDesignConfig(): DesignConfig {
        return designConfigJson as unknown as DesignConfig
    }
}