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
    adresse: string;
    telephone: string;
    email: string;
    github: string;
}

export interface SkillGroup {
    [key: string]: string[];
}

export interface Competences {
    [key: string]: SkillGroup;
}

export interface Experience {
    titre: string;
    entreprise: string | null;
    periode: string;
    description: string;
}

export interface Formation {
    annee: number | string;
    diplome: string;
    etablissement: string;
    lieu?: string;
}

export interface CvData {
    titre: string;
    subtitle: string;
    entete: Entete;
    profil: string;
    competences: Competences;
    experience_professionnelle: Experience[];
    formation: Formation[];
    centres_d_interets: string | string[];
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
