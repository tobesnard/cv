/**
 * @file useDynamicStyles.js
 * @description Composable pour transformer la configuration JSON en styles CSS dynamiques.
 */
import { computed } from 'vue'
import backgroundImage from '@/assets/images/background.png'

export function useDynamicStyles(config, isDarkMode) {

    // 1. Thème actif basé sur le mode sombre/clair
    const currentTheme = computed(() => {
        const themeKey = isDarkMode.value ? 'dark' : 'light'
        return config.value.themes[themeKey]
    })

    const activeBackgroundImage = backgroundImage

    // 2. Fusion des couleurs de base et des couleurs du thème
    const activeColors = computed(() => {
        const { typography, ...themeColors } = currentTheme.value
        return { ...config.value.colors, ...themeColors }
    })

    // 3. Fusion de la typographie de base et des surcharges du thème
    const activeTypography = computed(() => {
        const base = config.value.typography
        const overrides = currentTheme.value.typography || {}
        const merged = {}

        for (const [section, values] of Object.entries(base)) {
            merged[section] = { ...values, ...(overrides[section] || {}) }
        }
        return merged
    })

    /**
     * Génération de l'objet CSS injecté via :style
     * Résout les variables nommées (ex: 'primary' -> var(--color-primary))
     */
    const cssProps = computed(() => {
        const props = {}
        const colors = activeColors.value
        const typography = activeTypography.value
        const fonts = config.value.fonts
        const sizes = config.value.fontSizes
        const weights = config.value.fontWeights
        const lineHeights = config.value.lineHeights
        const letterSpacings = config.value.letterSpacings

        // Injection des couleurs
        Object.entries(colors).forEach(([key, value]) => {
            props[`--color-${key}`] = value
        })

        // Injection des polices système
        if (fonts) {
            Object.entries(fonts).forEach(([key, value]) => {
                props[`--font-family-${key}`] = value
            })
        }

        // Injection de la typographie par section
        Object.entries(typography).forEach(([section, values]) => {
            Object.entries(values).forEach(([prop, value]) => {
                let res = value

                if (prop === 'color' && colors[value]) res = `var(--color-${value})`
                else if (prop === 'family' && fonts?.[value]) res = `var(--font-family-${value})`
                else if (prop === 'size' && sizes?.[value]) res = sizes[value]
                else if (prop === 'weight' && weights?.[value]) res = weights[value]
                else if (prop === 'lineHeight' && lineHeights?.[value]) res = lineHeights[value]
                else if (prop === 'letterSpacing' && letterSpacings?.[value]) res = letterSpacings[value]

                props[`--font-${section}-${prop}`] = res
            })
        })

        return props
    })

    return {
        cssProps,
        currentTheme,
        activeBackgroundImage
    }
}
