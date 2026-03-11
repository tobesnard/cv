import { describe, it, expect, vi } from 'vitest'
import { ref, computed } from 'vue'
import { useDynamicStyles } from '../composables/useDynamicStyles'

describe('useDynamicStyles', () => {
    it('should generate correct CSS variables from config', () => {
        const mockConfig = ref({
            colors: { primary: '#00d4aa' },
            fonts: { primary: 'Roboto' },
            fontSizes: { medium: '12pt' },
            typography: {
                title: { size: 'medium', color: 'primary' }
            }
        })

        const mockTheme = ref({
            typography: {
                title: { color: 'primary' } // Override or match
            }
        })

        const { cssProps } = useDynamicStyles(mockConfig, mockTheme)

        expect(cssProps.value['--color-primary']).toBe('#00d4aa')
        expect(cssProps.value['--font-title-size']).toBe('12pt')
        expect(cssProps.value['--font-title-color']).toBe('var(--color-primary)')
    })
})
