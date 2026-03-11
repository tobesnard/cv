/**
 * @file useCvActions.ts
 * @description Composable regroupant les actions utilisateur et les fonctionnalités utilitaires (ex: Impression et export PDF).
 */

import html2pdf from 'html2pdf.js'
import { useAppStore } from '../store/appStore'

/**
 * Composable useCvActions
 * Fournit les méthodes d'interaction principales pour l'interface du CV.
 * @returns {Object} Un ensemble de fonctions d'action.
 */
export function useCvActions() {
    const store = useAppStore()

    /**
     * Déclenche la boîte de dialogue d'impression du navigateur.
     */
    const handlePrint = (): void => {
        window.print()
    }

    /**
     * Génère un PDF contenant deux pages : 
     * Page 1 : Version Dark Mode
     * Page 2 : Version Light Mode
     * @param {string} fileName - Le nom du fichier PDF.
     */
    const downloadPDF = async (fileName: string = 'CV_Tony_Besnard.pdf'): Promise<void> => {
        const appElement = document.querySelector('.cv-page') as HTMLElement
        const containerElement = document.querySelector('.cv-container') as HTMLElement
        if (!appElement || !containerElement) return

        const initialDarkMode = store.isDarkMode

        try {
            // Création d'un conteneur temporaire VISIBLE mais hors-champ pour capturer les styles
            const tempWrapper = document.createElement('div')
            tempWrapper.className = 'cv-container pdf-export-mode'
            // Copier les styles de variables CSS du parent
            tempWrapper.setAttribute('style', containerElement.getAttribute('style') || '')

            tempWrapper.style.position = 'fixed'
            tempWrapper.style.left = '0'
            tempWrapper.style.top = '0'
            tempWrapper.style.width = '210mm'
            tempWrapper.style.zIndex = '-1000'
            tempWrapper.style.opacity = '1'
            tempWrapper.style.pointerEvents = 'none'
            tempWrapper.style.background = 'none'
            tempWrapper.style.padding = '0'
            document.body.appendChild(tempWrapper)

            const captureTheme = async (mode: 'dark' | 'light') => {
                store.syncTheme(mode)
                // On met à jour les styles du wrapper pour refléter le nouveau thème (variables CSS)
                await new Promise(resolve => setTimeout(resolve, 600))
                tempWrapper.setAttribute('style', containerElement.getAttribute('style') || '')
                tempWrapper.style.position = 'fixed'
                tempWrapper.style.zIndex = '-1000'
                tempWrapper.style.padding = '0'
                tempWrapper.style.background = 'none'

                const clone = appElement.cloneNode(true) as HTMLElement
                clone.style.position = 'relative'
                clone.style.margin = '0'
                clone.style.boxShadow = 'none'
                return clone
            }

            /** Capturer le Dark Mode **/
            const darkVersion = await captureTheme('dark')
            darkVersion.style.pageBreakAfter = 'always'
            tempWrapper.appendChild(darkVersion)

            /** Capturer le Light Mode **/
            const lightVersion = await captureTheme('light')
            tempWrapper.appendChild(lightVersion)

            const opt = {
                margin: 0,
                filename: fileName,
                image: { type: 'jpeg', quality: 1 },
                html2canvas: {
                    scale: 2,
                    useCORS: true,
                    letterRendering: true,
                    allowTaint: false,
                    scrollY: 0,
                    windowWidth: 1200 // Assure une résolution stable pour le calcul
                },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            }

            // Lancer l'export
            await html2pdf().set(opt).from(tempWrapper).save()

            // Nettoyage
            document.body.removeChild(tempWrapper)

        } catch (error) {
            console.error('Erreur lors de la génération du PDF:', error)
        } finally {
            store.syncTheme(initialDarkMode ? 'dark' : 'light')
        }
    }

    return {
        handlePrint,
        downloadPDF
    }
}
