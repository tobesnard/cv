/**
 * @file useDynamicStyles.js
 * @description Composable spécialisé dans le calcul des variables CSS dynamiques.
 * Transforme la configuration JSON du design en un objet CSS injecté via :style dans l'application.
 */
import { computed } from 'vue'

/**
 * Composable useDynamicStyles
 * Centralise la conversion des règles de style du design-config vers des propriétés CSS standard.
 *
 * @param {import('vue').Ref<Object>} config - La configuration globale du design (Design system).
 * @param {import('vue').ComputedRef<Object>} currentTheme - Le thème actif (light/dark) extrait via useTheme.
 * @returns {Object} Un objet contenant les propriétés CSS (cssProps) prêtes à l'emploi.
 */
export function useDynamicStyles(config, currentTheme) {

    /** @type {import('vue').ComputedRef<Object>} Fusion des palettes de couleurs globales et thématiques */
    const activeColors = computed(() => {
        const themeValues = currentTheme.value || {}
        // On sépare la typographie des couleurs directes du thème
        const { typography, ...themeColors } = themeValues
        const baseColors = config.value?.colors || {}

        // Les couleurs spécifiques au thème (ex: background) surchargent les couleurs de base
        return { ...baseColors, ...themeColors }
    })

    /** @type {import('vue').ComputedRef<Object>} Fusion de la typographie système et des variations par thème */
    const activeTypography = computed(() => {
        const themeValues = currentTheme.value || {}
        const base = config.value?.typography || {}
        const overrides = themeValues.typography || {}
        const merged = {}

        // Parcours de chaque section typographique (title, subtitle, etc.)
        for (const [section, values] of Object.entries(base)) {
            // Fusion de la config de base avec celle du thème pour cette section précise
            merged[section] = { ...values, ...(overrides[section] || {}) }
        }
        return merged
    })

    /**
     * Génération finale de l'objet de styles injecté dans le composant racine.
     * Cette méthode convertit les jetons du design system en variables CSS injectables (--color-*, --font-*, etc.).
     * @type {import('vue').ComputedRef<Object>}
     */
    const cssProps = computed(() => {
        const props = {}
        const colors = activeColors.value
        const typography = activeTypography.value

        // Raccourcis vers les autres configurations système
        const fonts = config.value?.fonts || {}
        const sizes = config.value?.fontSizes || {}
        const weights = config.value?.fontWeights || {}
        const lineHeights = config.value?.lineHeights || {}
        const letterSpacings = config.value?.letterSpacings || {}

        // Insertion des variables de couleur (--color-primary, --color-background, etc.)
        Object.entries(colors).forEach(([key, value]) => {
            props[`--color-${key}`] = value
        })

        // Insertion des familles de polices (--font-family-primary, etc.)
        Object.entries(fonts).forEach(([key, value]) => {
            props[`--font-family-${key}`] = value
        })

        /**
         * Résolution et insertion des propriétés typographiques par section.
         * Exemple pour la section 'title' : --font-title-size: 20pt
         */
        Object.entries(typography).forEach(([section, values]) => {
            Object.entries(values).forEach(([prop, value]) => {
                let resolvedValue = value

                // Correspondance automatique des jetons (tokens) vers les valeurs réelles
                if (prop === 'color' && colors[value]) {
                    resolvedValue = `var(--color-${value})`
                } else if (prop === 'family' && fonts[value]) {
                    resolvedValue = `var(--font-family-${value})`
                } else if (prop === 'size' && sizes[value]) {
                    resolvedValue = sizes[value]
                } else if (prop === 'weight' && weights[value]) {
                    resolvedValue = weights[value]
                } else if (prop === 'lineHeight' && lineHeights[value]) {
                    resolvedValue = lineHeights[value]
                } else if (prop === 'letterSpacing' && letterSpacings[value]) {
                    resolvedValue = letterSpacings[value]
                }

                props[`--font-${section}-${prop}`] = resolvedValue
            })
        })

        return props
    })

    return {
        cssProps
    }
}
