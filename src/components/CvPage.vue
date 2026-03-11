<template>
  <div class="cv-container" :style="cssProps">

    <div class="cv-page font-body">
      <!-- Background -->
      <div v-if="activeBackgroundImage" class="cv-background"
        :style="{ backgroundImage: `url(${activeBackgroundImage})` }"></div>

      <div class="cv-content">
        <!-- Barre d'outils flottante -->
        <CvToolbar :icons="icons" :isDarkMode="isDarkMode" @print="handlePrint" @toggle-theme="toggleTheme"
          @download-pdf="downloadPDF(`CV_${data?.entete?.nom?.replace(' ', '_')}.pdf`)" />

        <!-- État de chargement si les données ne sont pas présentes -->
        <div v-if="!data" class="loading-state">
          {{ $t('status.loading') }}
        </div>

        <!-- En-tête : Informations personnelles et Photo -->
        <CvHeader v-else :entete="{ ...data.entete, titre: data.titre, subtitle: data.subtitle }"
          :profilePhoto="profilePhoto" :icons="icons" />

        <template v-if="data">
          <!-- Section Profil / Résumé -->
          <CvCard :title="$t('sections.profile')" :icon="icons.User" customClass="profile-section">
            <p class="profile-text">{{ data.profil }}</p>
          </CvCard>

          <!-- Grille principale : Compétences et Expériences -->
          <div class="main-grid">
            <!-- Colonne de gauche : Compétences techniques -->
            <div class="left-column">
              <CvCard :title="sectionName" :icon="icons.Code" v-for="(competences, sectionName) in data.competences"
                :key="sectionName">
                <CvSkillSection :data="competences" />
              </CvCard>
            </div>

            <!-- Colonne de droite : Expériences Professionnelles (Timeline) -->
            <div class="right-column-container">
              <CvCard :title="$t('sections.experience')" :icon="icons.Briefcase">
                <CvExperienceTimeline :experiences="data.experience_professionnelle" />
              </CvCard>
            </div>
          </div>

          <!-- Pied de page : Formation et Centres d'intérêt -->
          <CvFooter :formations="data.formation" :centresDInterets="data.centres_d_interets" :icons="icons" />
        </template>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
/**
 * @file CvPage.vue
 * @description Composant principal gérant l'orchestration du CV.
 */

/** Import des sous-composants atomiques */
import CvToolbar from './CvToolbar.vue'
import CvHeader from './CvHeader.vue'
import CvSkillSection from './CvSkillSection.vue'
import CvExperienceTimeline from './CvExperienceTimeline.vue'
import CvFooter from './CvFooter.vue'
import CvCard from './CvCard.vue'

/** Importation des composables métier */
import { useCvData } from '../composables/useCvData'
import { useTheme } from '../composables/useTheme'
import { useDynamicStyles } from '../composables/useDynamicStyles'
import { useCvActions } from '../composables/useCvActions'

/** 1. Chargement des données métier et config via le store */
// @ts-ignore - Temporary ignore until useCvData is fully typed
const { data, config, profilePhoto } = useCvData()

/** 
 * 2. Initialisation du thème (State Management).
 */
const { isDarkMode, currentTheme, icons, activeBackgroundImage, toggleTheme } = useTheme()

/** 
 * 3. Génération des variables CSS dynamiques.
 */
const { cssProps } = useDynamicStyles(config, currentTheme)

/** 
 * 4. Actions utilisateur.
 */
const { handlePrint, downloadPDF } = useCvActions()

</script>

<style scoped>
.cv-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  background: var(--color-background-dark, #050d1a);
}

.cv-page {
  width: 210mm;
  min-height: 297mm;
  position: relative;
  background: var(--color-background, #0a1628);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

.cv-background {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  opacity: 0.4;
  filter: blur(1px);
}

.cv-content {
  position: relative;
  z-index: 1;
  padding: 8mm;
  height: 100%;
}

/* Main Grid */
.main-grid {
  display: grid;
  grid-template-columns: 33fr 67fr;
  gap: 5mm;
  margin-bottom: 4mm;
}

.font-date {
  color: var(--font-date-color) !important;
  font-family: var(--font-date-family) !important;
  font-size: var(--font-date-size) !important;
  font-weight: var(--font-date-weight) !important;
  line-height: var(--font-date-lineHeight) !important;
  letter-spacing: var(--font-date-letterSpacing) !important;
}

.font-title {
  color: var(--font-title-color) !important;
  font-family: var(--font-title-family) !important;
  font-size: var(--font-title-size) !important;
  font-weight: var(--font-title-weight) !important;
  line-height: var(--font-title-lineHeight) !important;
  letter-spacing: var(--font-title-letterSpacing) !important;
}

.font-subtitle {
  color: var(--font-subtitle-color) !important;
  font-family: var(--font-subtitle-family) !important;
  font-size: var(--font-subtitle-size) !important;
  font-weight: var(--font-subtitle-weight) !important;
  line-height: var(--font-subtitle-lineHeight) !important;
  letter-spacing: var(--font-subtitle-letterSpacing) !important;
}

.font-name {
  color: var(--font-name-color) !important;
  font-family: var(--font-name-family) !important;
  font-size: var(--font-name-size) !important;
  font-weight: var(--font-name-weight) !important;
  line-height: var(--font-name-lineHeight) !important;
  letter-spacing: var(--font-name-letterSpacing) !important;
}

.font-contact {
  color: var(--font-contact-color) !important;
  font-family: var(--font-contact-family) !important;
  font-size: var(--font-contact-size) !important;
  font-weight: var(--font-contact-weight) !important;
  line-height: var(--font-contact-lineHeight) !important;
  letter-spacing: var(--font-contact-letterSpacing) !important;
}

.font-section-title {
  color: var(--font-sectionTitle-color) !important;
  font-family: var(--font-cardTitle-family) !important;
  /* Note: Utilise cardTitle car cardTitle gère les titres de sections */
  font-size: var(--font-cardTitle-size) !important;
  font-weight: var(--font-cardTitle-weight) !important;
  line-height: var(--font-cardTitle-lineHeight) !important;
  letter-spacing: var(--font-cardTitle-letterSpacing) !important;
}

.font-card-title {
  color: var(--font-cardTitle-color) !important;
  font-family: var(--font-cardTitle-family) !important;
  font-size: var(--font-cardTitle-size) !important;
  font-weight: var(--font-cardTitle-weight) !important;
  line-height: var(--font-cardTitle-lineHeight) !important;
  letter-spacing: var(--font-cardTitle-letterSpacing) !important;
}

.font-body {
  color: var(--font-body-color) !important;
  font-family: var(--font-body-family) !important;
  font-size: var(--font-body-size) !important;
  font-weight: var(--font-body-weight) !important;
  line-height: var(--font-body-lineHeight) !important;
  letter-spacing: var(--font-body-letterSpacing) !important;
}

/* Propagation des polices dynamiques aux composants enfants */
:deep(.font-date) {
  color: var(--font-date-color) !important;
  font-family: var(--font-date-family) !important;
  font-size: var(--font-date-size) !important;
  font-weight: var(--font-date-weight) !important;
  line-height: var(--font-date-lineHeight) !important;
  letter-spacing: var(--font-date-letterSpacing) !important;
}

:deep(.font-title) {
  color: var(--font-title-color) !important;
  font-family: var(--font-title-family) !important;
  font-size: var(--font-title-size) !important;
  font-weight: var(--font-title-weight) !important;
  line-height: var(--font-title-lineHeight) !important;
  letter-spacing: var(--font-title-letterSpacing) !important;
}

:deep(.font-subtitle) {
  color: var(--font-subtitle-color) !important;
  font-family: var(--font-subtitle-family) !important;
  font-size: var(--font-subtitle-size) !important;
  font-weight: var(--font-subtitle-weight) !important;
  line-height: var(--font-subtitle-lineHeight) !important;
  letter-spacing: var(--font-subtitle-letterSpacing) !important;
}

:deep(.font-name) {
  color: var(--font-name-color) !important;
  font-family: var(--font-name-family) !important;
  font-size: var(--font-name-size) !important;
  font-weight: var(--font-name-weight) !important;
  line-height: var(--font-name-lineHeight) !important;
  letter-spacing: var(--font-name-letterSpacing) !important;
}

:deep(.font-contact) {
  color: var(--font-contact-color) !important;
  font-family: var(--font-contact-family) !important;
  font-size: var(--font-contact-size) !important;
  font-weight: var(--font-contact-weight) !important;
  line-height: var(--font-contact-lineHeight) !important;
  letter-spacing: var(--font-contact-letterSpacing) !important;
}

:deep(.font-section-title) {
  color: var(--font-sectionTitle-color) !important;
  font-family: var(--font-cardTitle-family) !important;
  font-size: var(--font-cardTitle-size) !important;
  font-weight: var(--font-cardTitle-weight) !important;
  line-height: var(--font-cardTitle-lineHeight) !important;
  letter-spacing: var(--font-cardTitle-letterSpacing) !important;
}

:deep(.font-card-title) {
  color: var(--font-cardTitle-color) !important;
  font-family: var(--font-cardTitle-family) !important;
  font-size: var(--font-cardTitle-size) !important;
  font-weight: var(--font-cardTitle-weight) !important;
  line-height: var(--font-cardTitle-lineHeight) !important;
  letter-spacing: var(--font-cardTitle-letterSpacing) !important;
}

:deep(.font-body) {
  color: var(--font-body-color) !important;
  font-family: var(--font-body-family) !important;
  font-size: var(--font-body-size) !important;
  font-weight: var(--font-body-weight) !important;
  line-height: var(--font-body-lineHeight) !important;
  letter-spacing: var(--font-body-letterSpacing) !important;
}

:deep(.font-link) {
  color: var(--font-link-color) !important;
  font-family: var(--font-link-family) !important;
  font-size: var(--font-link-size) !important;
  font-weight: var(--font-link-weight) !important;
  line-height: var(--font-link-lineHeight) !important;
  letter-spacing: var(--font-link-letterSpacing) !important;
}

/* Scoped print: only hide no-print */
@media print {
  .no-print {
    display: none !important;
  }
}

:deep(.font-date) {
  color: var(--font-date-color) !important;
  font-family: var(--font-date-family) !important;
  font-size: var(--font-date-size) !important;
  font-weight: var(--font-date-weight) !important;
  line-height: var(--font-date-lineHeight) !important;
  letter-spacing: var(--font-date-letterSpacing) !important;
}

:deep(.font-title) {
  color: var(--font-title-color) !important;
  font-family: var(--font-title-family) !important;
  font-size: var(--font-title-size) !important;
  font-weight: var(--font-title-weight) !important;
  line-height: var(--font-title-lineHeight) !important;
  letter-spacing: var(--font-title-letterSpacing) !important;
}

:deep(.font-subtitle) {
  color: var(--font-subtitle-color) !important;
  font-family: var(--font-subtitle-family) !important;
  font-size: var(--font-subtitle-size) !important;
  font-weight: var(--font-subtitle-weight) !important;
  line-height: var(--font-subtitle-lineHeight) !important;
  letter-spacing: var(--font-subtitle-letterSpacing) !important;
}

:deep(.font-name) {
  color: var(--font-name-color) !important;
  font-family: var(--font-name-family) !important;
  font-size: var(--font-name-size) !important;
  font-weight: var(--font-name-weight) !important;
  line-height: var(--font-name-lineHeight) !important;
  letter-spacing: var(--font-name-letterSpacing) !important;
}

:deep(.font-contact) {
  color: var(--font-contact-color) !important;
  font-family: var(--font-contact-family) !important;
  font-size: var(--font-contact-size) !important;
  font-weight: var(--font-contact-weight) !important;
  line-height: var(--font-contact-lineHeight) !important;
  letter-spacing: var(--font-contact-letterSpacing) !important;
}

:deep(.font-section-title) {
  color: var(--font-sectionTitle-color) !important;
  font-family: var(--font-cardTitle-family) !important;
  /* Note: Utilise cardTitle car cardTitle gère les titres de sections */
  font-size: var(--font-cardTitle-size) !important;
  font-weight: var(--font-cardTitle-weight) !important;
  line-height: var(--font-cardTitle-lineHeight) !important;
  letter-spacing: var(--font-cardTitle-letterSpacing) !important;
}

:deep(.font-card-title) {
  color: var(--font-cardTitle-color) !important;
  font-family: var(--font-cardTitle-family) !important;
  font-size: var(--font-cardTitle-size) !important;
  font-weight: var(--font-cardTitle-weight) !important;
  line-height: var(--font-cardTitle-lineHeight) !important;
  letter-spacing: var(--font-cardTitle-letterSpacing) !important;
}

:deep(.font-body) {
  color: var(--font-body-color) !important;
  font-family: var(--font-body-family) !important;
  font-size: var(--font-body-size) !important;
  font-weight: var(--font-body-weight) !important;
  line-height: var(--font-body-lineHeight) !important;
  letter-spacing: var(--font-body-letterSpacing) !important;
}

:deep(.font-link) {
  color: var(--font-link-color) !important;
  font-family: var(--font-link-family) !important;
  font-size: var(--font-link-size) !important;
  font-weight: var(--font-link-weight) !important;
  line-height: var(--font-link-lineHeight) !important;
  letter-spacing: var(--font-link-letterSpacing) !important;
}
</style>

<style>
/* Global Print Styles (outside scoped — pas de data-v attribute) */
@media print {
  @page {
    size: A4 portrait;
    margin: 0;
  }

  /* Reset des conteneurs parents */
  html,
  body,
  #app {
    width: 210mm !important;
    height: 297mm !important;
    margin: 0 !important;
    padding: 0 !important;
    overflow: hidden !important;
    background: none !important;
  }

  .cv-container {
    padding: 0 !important;
    margin: 0 !important;
    min-height: 297mm !important;
    height: 297mm !important;
    display: flex !important;
    justify-content: center !important;
    align-items: flex-start !important;
    background: none !important;
    overflow: hidden !important;
  }

  /*
   * Stratégie : on garde le .cv-page à sa taille réelle (210mm de large)
   * et on applique un scale uniforme pour que la hauteur totale
   * tienne dans 297mm. transform-origin en haut à gauche.
   */
  .cv-page {
    width: 210mm !important;
    margin: 0 !important;
    padding: 0 !important;
    position: relative !important;
    display: block !important;
    box-shadow: none !important;
    overflow: visible !important;
    transform-origin: top left !important;
    /* Scale: vertical 0.92 pour tenir en hauteur, horizontal 1.0 pour remplir la largeur A4 */
    transform: scale(1, 0.92) !important;
  }

  .cv-background {
    position: absolute !important;
    inset: 0 !important;
    filter: none !important;
    /* blur casse l'impression */
  }

  /* Désactiver uniquement les effets qui cassent l'impression */
  .cv-card-section {
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
  }

  /* Masquer boutons */
  .no-print,
  .action-buttons {
    display: none !important;
  }

  /* Forcer le rendu des couleurs de fond */
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
}
</style>
