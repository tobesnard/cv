/**
 * @file cv.types.ts
 * @description Définitions des types métier pour le CV (Domain).
 */

export interface ContactInfo {
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    website?: string;
}

export interface Entete {
    nom: string;
    titre: string;
    subtitle: string;
    contact: ContactInfo;
}

export interface CompetenceDetail {
    nom: string;
    niveau: string;
}

export interface Experience {
    poste: string;
    entreprise: string;
    periode: string;
    missions: string[];
}

export interface Formation {
    annee: string;
    diplome: string;
    etablissement: string;
}

export interface CvData {
    entete: Entete;
    profil: string;
    competences: Record<string, CompetenceDetail[]>;
    experience_professionnelle: Experience[];
    formation: Formation[];
    centres_d_interets: string[];
}

export interface DesignTheme {
    backgroundImage: string;
    iconFilter: string;
    cardHeaderGradient: string;
    background: string;
    backgroundLight: string;
    backgroundCard: string;
    backgroundDark: string;
    text: string;
    textMuted: string;
    textSecondary: string;
    border: string;
    borderLight: string;
    backgroundProfilePicture: string;
    sectionTitle: string;
    typography: Record<string, Record<string, string>>;
}

export interface DesignConfig {
    defaultTheme: string;
    themes: Record<'dark' | 'light', DesignTheme>;
    colors: Record<string, string>;
    fonts: Record<string, string>;
    fontSizes: Record<string, string>;
    fontWeights: Record<string, string | number>;
    lineHeights: Record<string, string | number>;
    letterSpacings: Record<string, string>;
    typography: Record<string, Record<string, string>>;
}
