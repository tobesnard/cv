/**
 * @file useDynamicStyles.ts
 * @description Composable spécialisé dans le calcul des variables CSS dynamiques.
 * Transforme la configuration JSON du design en un objet CSS injecté via :style dans l'application.
 */
import { computed, type ComputedRef, type Ref } from 'vue'
import type { DesignConfig, DesignTheme } from '../domain/cv.types'

/**
 * Interface pour les propriétés CSS générées
 */
export type CSSProperties = Record<string, string | number>;

/**
 * Composable useDynamicStyles
 * Centralise la conversion des règles de style du design-config vers des propriétés CSS standard.
 *
 * @param {Ref<DesignConfig | null>} config - La configuration globale du design (Design system).
 * @param {ComputedRef<DesignTheme | null>} currentTheme - Le thème actif (light/dark) extrait via useTheme.
 * @returns {{ cssProps: ComputedRef<CSSProperties> }} Un objet contenant les propriétés CSS (cssProps) prêtes à l'emploi.
 */
export function useDynamicStyles(
    config: Ref<DesignConfig | null>,
    currentTheme: ComputedRef<DesignTheme | null>
): { cssProps: ComputedRef<CSSProperties> } {

    /** Fusion des palettes de couleurs globales et thématiques */
    const activeColors = computed<Record<string, string>>(() => {
        const themeValues = (currentTheme.value || {}) as any
        // On sépare la typographie des couleurs directes du thème
        const { typography: _, ...themeColors } = themeValues
        const baseColors = config.value?.colors || {}

        // Les couleurs spécifiques au thème (ex: background) surchargent les couleurs de base
        return { ...baseColors, ...themeColors }
    })

    /** Fusion de la typographie système et des variations par thème */
    const activeTypography = computed<Record<string, Record<string, string>>>(() => {
        const themeValues = currentTheme.value || {} as DesignTheme
        const base = config.value?.typography || {}
        const overrides = themeValues.typography || {}
        const merged: Record<string, Record<string, string>> = {}

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
     */
    const cssProps = computed<CSSProperties>(() => {
        const props: CSSProperties = {}
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
                let resolvedValue: string | number = value

                // Correspondance automatique des jetons (tokens) vers les valeurs réelles
                if (prop === 'color' && colors[value]) {
                    resolvedValue = `var(--color-${value})`
                } else if (prop === 'family' && fonts[value]) {
                    resolvedValue = `var(--font-family-${value})`
                } else if (prop === 'size' && sizes[value]) {
                    resolvedValue = (sizes as any)[value] || value
                } else if (prop === 'weight' && weights[value]) {
                    resolvedValue = (weights as any)[value] || value
                } else if (prop === 'lineHeight' && lineHeights[value]) {
                    resolvedValue = (lineHeights as any)[value] || value
                } else if (prop === 'letterSpacing' && letterSpacings[value]) {
                    resolvedValue = (letterSpacings as any)[value] || value
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
