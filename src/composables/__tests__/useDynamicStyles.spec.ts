import { describe, it, expect } from 'vitest'
import { ref, computed } from 'vue'
import { useDynamicStyles } from '../useDynamicStyles'
import type { DesignConfig, DesignTheme } from '../../domain/cv.types'

describe('useDynamicStyles', () => {
    it('should generate correct CSS variables from config', () => {
        const mockConfig = ref<DesignConfig>({
            defaultTheme: 'dark',
            themes: {
                dark: {} as DesignTheme,
                light: {} as DesignTheme
            },
            colors: { primary: '#00d4aa' },
            fonts: { primary: 'Roboto' },
            fontSizes: { medium: '12pt' },
            fontWeights: {},
            lineHeights: {},
            letterSpacings: {},
            typography: {
                title: { size: 'medium', color: 'primary' }
            }
        })

        const mockTheme = computed<DesignTheme>(() => ({
            typography: {
                title: { color: 'primary' }
            }
        } as unknown as DesignTheme))

        const { cssProps } = useDynamicStyles(mockConfig, mockTheme)

        expect(cssProps.value['--color-primary']).toBe('#00d4aa')
        expect(cssProps.value['--font-title-size']).toBe('12pt')
        expect(cssProps.value['--font-title-color']).toBe('var(--color-primary)')
    })
})
