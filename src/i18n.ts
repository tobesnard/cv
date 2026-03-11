import { createI18n } from 'vue-i18n'

const messages = {
    fr: {
        sections: {
            profile: 'PROFIL',
            experience: 'EXPÉRIENCE PROFESSIONNELLE',
            skills: 'COMPÉTENCES',
            education: 'FORMATION',
            interests: 'CENTRES D\'INTÉRÊT'
        },
        actions: {
            print: 'Imprimer',
            toggleTheme: 'Changer de thème',
            downloadPdf: 'Télécharger PDF'
        },
        status: {
            loading: 'Chargement des données...'
        }
    },
    en: {
        sections: {
            profile: 'PROFILE',
            experience: 'WORK EXPERIENCE',
            skills: 'SKILLS',
            education: 'EDUCATION',
            interests: 'INTERESTS'
        },
        actions: {
            print: 'Print',
            toggleTheme: 'Toggle Theme',
            downloadPdf: 'Download PDF'
        },
        status: {
            loading: 'Loading data...'
        }
    }
}

export const i18n = createI18n({
    legacy: false,
    locale: 'fr',
    fallbackLocale: 'en',
    messages
})
