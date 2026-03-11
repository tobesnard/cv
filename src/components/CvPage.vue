<template>
  <div class="cv-container" :style="cssProps">
    <DefineCard v-slot="{ title, icon, customClass, $slots }">
      <section :class="['cv-card-section', customClass]">
        <div v-if="title" class="card-header font-card-title">
          <img v-if="icon" :src="icon" class="card-icon icon" alt="" />
          <h3 class="card-title">{{ title }}</h3>
        </div>
        <div class="card-body">
          <component :is="$slots.default" />
        </div>
      </section>
    </DefineCard>

    <div class="cv-page font-body">
      <!-- Background -->
      <div v-if="activeBackgroundImage" class="cv-background"
        :style="{ backgroundImage: `url(${activeBackgroundImage})` }"></div>

      <!-- Content -->
      <div class="cv-content">
        <!-- Floating Action Buttons (no-print) -->
        <div class="action-buttons no-print">
          <button @click="printPage" class="action-button" title="Imprimer">
            <PrinterIcon :size="20" />
            <span class="button-text">Imprimer</span>
          </button>
          <button @click="toggleTheme" class="action-button" :title="isDarkMode ? 'Light Mode' : 'Dark Mode'">
            <SunIcon v-if="isDarkMode" :size="20" />
            <MoonIcon v-else :size="20" />
            <span class="button-text">{{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}</span>
          </button>
        </div>

        <!-- Header -->
        <header class="cv-header">
          <div class="header-left">
            <h1 class="title">
              <span class="title-main font-title">{{ data.titre.toUpperCase() }}</span>
              <span class="title-sub font-subtitle">{{ data.subtitle }}</span>
            </h1>
            <h2 class="name font-name">{{ data.entete.nom }}</h2>
            <div class="contact-info font-contact">
              <div class="contact-row">
                <div class="contact-item">
                  <img src="@/assets/icons/map-pin.svg" class="icon" alt="Location" />
                  <span>{{ data.entete.adresse }}</span>
                </div>
                <div class="contact-item">
                  <img src="@/assets/icons/phone.svg" class="icon" alt="Phone" />
                  <span>{{ data.entete.telephone }}</span>
                </div>
              </div>
              <div class="contact-row">
                <div class="contact-item">
                  <img src="@/assets/icons/github.svg" class="icon" alt="GitHub" />
                  <a :href="data.entete.github" target="_blank" rel="noopener noreferrer" class="font-link">{{
                    data.entete.github.replace('https://', '') }}</a>
                </div>
                <div class="contact-item">
                  <img src="@/assets/icons/mail.svg" class="icon" alt="Email" />
                  <a :href="'mailto:' + data.entete.email" class="font-link">{{ data.entete.email }}</a>
                </div>
              </div>
            </div>
          </div>
          <div class="header-right">
            <div class="photo-container">
              <div class="photo-wrapper">
                <img :src="config.assets.photo" :alt="data.entete.nom" class="photo" />
              </div>
            </div>
          </div>
        </header>

        <!-- Profile Section -->
        <ReuseCard title="PROFIL" :icon="icons.user" customClass="profile-section">
          <p class="profile-text">{{ data.profil }}</p>
        </ReuseCard>

        <!-- Main Content Grid -->
        <div class="main-grid">
          <!-- Left Column -->
          <div class="left-column">
            <ReuseCard :title="section_name" :icon="icons.code" customClass="transverses-section"
              v-for="(competences, section_name) in data.competences" :key="section_name">
              <div class="skills-group" v-for="(skills, category) in competences" :key="category">
                <h4 class="skills-subtitle font-section-title">
                  <span class="skill-icon"></span>
                  {{ category.toUpperCase() }}
                </h4>
                <div class="skills-list">
                  <div class="skill-item">
                    {{ skills.join(', ') }}
                  </div>
                </div>
              </div>
            </ReuseCard>
          </div>

          <!-- Right Column -->
          <ReuseCard customClass="right-column" :icon="icons.briefcase" title="EXPÉRIENCE PROFESSIONNELLE">
            <section class="section timeline-container">
              <div v-for="exp in data.experience_professionnelle" :key="exp.entreprise"
                class="experience-item timeline-item">
                <div class="timeline-dot"></div>
                <div class="exp-header">
                  <h4 class="exp-title">
                    <span class="exp-title-main font-section-title">
                      {{ exp.titre }}
                    </span>
                    <span class="exp-company" v-if="exp.entreprise">&nbsp;| {{ exp.entreprise || '' }}</span>
                  </h4>
                  <span class="exp-period font-date">
                    {{ exp.periode }}
                  </span>
                </div>
                <p class="profile-text exp-description">{{ exp.description }}</p>
              </div>
            </section>
          </ReuseCard>
        </div>

        <!-- Footer Grid -->
        <div class="footer-grid">
          <!-- Formation -->
          <ReuseCard title="FORMATION" :icon="icons.graduation" customClass="formation-section">
            <div class="formation-list">
              <div v-for="edu in data.formation" :key="edu.annee" class="formation-item">
                <span class="formation-year font-date">{{ edu.annee }}</span>
                <div class="formation-details">
                  <span class="formation-title font-section-title">{{ edu.diplome }}</span>
                  <span class="formation-school font-body"> — {{ edu.etablissement }} </span>
                </div>
              </div>
            </div>
          </ReuseCard>

          <!-- Interests -->
          <ReuseCard title="CENTRES D'INTÉRÊT" :icon="icons.heart" customClass="interests-section">
            <p class="interests-text">{{ data.centres_d_interets }}</p>
          </ReuseCard>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, computed } from 'vue'
import { createReusableTemplate } from '@vueuse/core'
import { Printer as PrinterIcon, Sun as SunIcon, Moon as MoonIcon } from 'lucide-vue-next'
import cvData from '../data/cv-data.json'
import designConfig from '../data/design-config.json'
import backgroundImageDark from '@/assets/images/background.png'
import backgroundImageLight from '@/assets/images/background.png'
import photoImage from '@/assets/images/photo-profil-ameliore.png'

// Import icons
import userIcon from '@/assets/icons/user.svg'
import codeIcon from '@/assets/icons/code.svg'
import briefcaseIcon from '@/assets/icons/briefcase.svg'
import graduationIcon from '@/assets/icons/graduation-cap.svg'
import heartIcon from '@/assets/icons/heart.svg'

const [DefineCard, ReuseCard] = createReusableTemplate()

const data = ref(cvData)
const config = ref(designConfig)
const isDarkMode = ref(config.value.defaultTheme === 'dark')

// Couleurs actives = couleurs partagées + couleurs du thème courant
const currentTheme = computed(() => config.value.themes[isDarkMode.value ? 'dark' : 'light'])

const activeBackgroundImage = computed(() => currentTheme.value.backgroundImage)

const activeColors = computed(() => {
  const { typography, ...themeColors } = currentTheme.value
  return { ...config.value.colors, ...themeColors }
})

// Typography active = base + surcharges du thème courant
const activeTypography = computed(() => {
  const base = config.value.typography
  const overrides = currentTheme.value.typography || {}
  const merged = {}
  for (const [section, values] of Object.entries(base)) {
    merged[section] = { ...values, ...(overrides[section] || {}) }
  }
  return merged
})

const icons = {
  user: userIcon,
  code: codeIcon,
  briefcase: briefcaseIcon,
  graduation: graduationIcon,
  heart: heartIcon
}

// Overwrite asset paths with imported URLs for Vite processing
if (config.value.themes.dark.backgroundImage) config.value.themes.dark.backgroundImage = backgroundImageDark
if (config.value.themes.light.backgroundImage) config.value.themes.light.backgroundImage = backgroundImageLight
config.value.assets.photo = photoImage

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
}

const printPage = () => {
  console.log('Démarrage de l\'impression...');
  const elements = document.querySelectorAll('.cv-card-section, .main-grid, .footer-grid, .profile-section');
  console.log(`Nombre d'éléments de contenu trouvés : ${elements.length}`);
  elements.forEach((el, i) => {
    const style = window.getComputedStyle(el);
    console.log(`Élément ${i} (${el.className}): display=${style.display}, opacity=${style.opacity}, visibility=${style.visibility}`);
  });
  window.print();
}

const renderSkillLevel = (level, maxLevel = 5) => {
  return Array.from({ length: maxLevel }, (_, i) => i < level)
}

const cssProps = computed(() => {
  const props = {}

  // Couleurs (partagées + thème actif)
  Object.entries(activeColors.value).forEach(([key, value]) => {
    props[`--color-${key}`] = value
  })

  // Polices de base
  if (config.value.fonts) {
    Object.entries(config.value.fonts).forEach(([key, value]) => {
      props[`--font-family-${key}`] = value
    })
  }

  // Typographie groupée (base + surcharges du thème)
  Object.entries(activeTypography.value).forEach(([section, values]) => {
    Object.entries(values).forEach(([prop, value]) => {
      // Résolution des couleurs nommées
      if (prop === 'color' && activeColors.value[value]) {
        props[`--font-${section}-${prop}`] = `var(--color-${value})`
      }
      // Résolution des polices nommées (primary, secondary, etc.)
      else if (prop === 'family' && config.value.fonts && config.value.fonts[value]) {
        props[`--font-${section}-${prop}`] = `var(--font-family-${value})`
      }
      // Résolution des tailles nommées (small, medium, etc.)
      else if (prop === 'size' && config.value.fontSizes && config.value.fontSizes[value]) {
        props[`--font-${section}-${prop}`] = config.value.fontSizes[value]
      }
      // Résolution des graisses nommées (regular, bold, etc.)
      else if (prop === 'weight' && config.value.fontWeights && config.value.fontWeights[value]) {
        props[`--font-${section}-${prop}`] = config.value.fontWeights[value]
      }
      // Résolution des hauteurs de ligne nommées (tight, normal, etc.)
      else if (prop === 'lineHeight' && config.value.lineHeights && config.value.lineHeights[value]) {
        props[`--font-${section}-${prop}`] = config.value.lineHeights[value]
      }
      // Résolution des espacements de lettres nommés (none, wide, etc.)
      else if (prop === 'letterSpacing' && config.value.letterSpacings && config.value.letterSpacings[value]) {
        props[`--font-${section}-${prop}`] = config.value.letterSpacings[value]
      }
      else {
        props[`--font-${section}-${prop}`] = value
      }
    })
  })

  return props
})
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

/* Floating Action Buttons */
.action-buttons {
  position: fixed;
  bottom: 30px;
  right: 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  /* Garde les boutons alignés à droite */
  gap: 15px;
  z-index: 1000;
}

.action-button svg {
  display: block;
  width: 20px;
  height: 20px;
  min-width: 20px;
  min-height: 20px;
  stroke-width: 2.5px;
  margin: 0;
  flex-shrink: 0;
}

.action-button {
  background: var(--color-backgroundLight, #0d1f3c);
  border: 1.5px solid var(--color-primary, #00d4aa);
  color: var(--color-primary, #00d4aa);
  padding: 0;
  border-radius: 50px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0;
  overflow: hidden;
  transition: width 0.3s ease, background 0.3s ease, color 0.3s ease;
  white-space: nowrap;
  width: 42px;
  height: 42px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
  line-height: 1;
}

.action-button:hover {
  width: 150px;
  justify-content: flex-start;
  padding-left: 11px;
  gap: 8px;
  background: var(--color-primary, #00d4aa);
  color: var(--color-background, #0a1628);
}

.button-text {
  display: none;
  font-family: var(--font-family-secondary);
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
}

.action-button:hover .button-text {
  display: inline;
}

@media print {
  .no-print {
    display: none !important;
  }
}

/* Header */
.cv-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 5mm;
  padding-bottom: 5mm;
  /* border-bottom: 1px solid var(--color-borderLight, rgba(0, 212, 170, 0.2)); */
  gap: 8mm;
}

.header-left {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.title {
  margin: 0 0 2mm 0;
}

.title-main {
  display: block;
}

.title-sub {
  display: block;
}

.name {
  padding-bottom: 10pt;
  ;
}

.contact-info {
  display: flex;
  flex-direction: column;
}

.contact-row {
  display: flex;
  gap: 4mm;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 2mm;
}

.contact-item a {
  text-decoration: none;
}

.font-link {
  color: var(--font-link-color) !important;
  font-family: var(--font-link-family) !important;
  font-size: var(--font-link-size) !important;
  font-weight: var(--font-link-weight) !important;
  line-height: var(--font-link-lineHeight) !important;
  letter-spacing: var(--font-link-letterSpacing) !important;
}

.contact-item .icon {
  width: 12px;
  height: 12px;
  filter: var(--color-iconFilter);
}

.header-right {
  flex-shrink: 0;
  margin-right: 3mm;
}

.photo-container {
  width: 36mm;
  height: 36mm;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: visible;
  padding: 3mm;
  z-index: 1;
}

.photo-container::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--color-backgroundLight, #14213d);
  border: 4px solid var(--color-primary, #00d4aa);
  border-radius: 5.5mm;
  transform: rotate(45deg);
  z-index: -1;
  box-shadow: 0 0 20px rgba(0, 212, 170, 0.3);
}



.photo {
  width: 80%;
  height: 115%;
  object-fit: cover;
  border-radius: 4mm;
  transform: rotate(-45deg);
  scale: 1.15;
  display: block;
  margin: -7% 10% 0 auto;
}

.photo-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 4mm;
  transform: rotate(45deg);
  background: var(--color-backgroundProfilePicture, white);
}

/* Sections */
.section {
  margin-bottom: 4mm;
}

.card-title {
  margin: 0;
  text-transform: uppercase;
  line-height: 1;
}

/* Card Section Base Style */
.cv-card-section {
  background: var(--color-backgroundCard, rgba(13, 31, 60, 0.4));
  border-radius: 0;
  position: relative;
  margin-bottom: 4mm;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid;
  border-image-source: linear-gradient(135deg, var(--color-primary, #00d4aa) 0%, transparent 100%);
  border-image-slice: 1;
}

.card-header {
  background-image: var(--color-cardHeaderGradient);
  padding: 2mm 3mm;
  border-bottom: 1px solid var(--color-borderLight, rgba(0, 212, 170, 0.15));
  display: flex;
  align-items: center;
  gap: 2mm;
}

.card-icon {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  display: block;
  filter: var(--color-iconFilter);
}

.card-body {
  padding: 4mm;
}

/* Main Grid */
.main-grid {
  display: grid;
  grid-template-columns: 33fr 67fr;
  gap: 5mm;
  margin-bottom: 4mm;
}

/* Skills */
.skills-group {
  margin-bottom: 3mm;
}

.skills-subtitle {
  margin: 0 0 2mm 0;
  display: flex;
  align-items: center;
  gap: 1mm;
}

.skills-subtitle::before {
  content: '';
  display: inline-block;
  width: 8px;
  height: 8px;
  background: var(--color-primary, #00d4aa);
}

.skills-list {
  display: flex;
  flex-direction: column;
  gap: 1.5mm;
}

.skill-item {
  display: flex;
  align-items: center;
  gap: 2mm;
}

/* Experience */
.timeline-container {
  position: relative;
  padding-left: 6mm;
  margin-left: 2mm;
  border-left: 1px solid var(--color-border, rgba(0, 212, 170, 0.3));
}

.experience-item {
  position: relative;
  margin-bottom: 5mm;
  padding-bottom: 2mm;
}

.timeline-dot {
  position: absolute;
  left: calc(-6mm - 4.5px);
  top: 1.5mm;
  width: 8px;
  height: 8px;
  background: var(--color-primary, #00d4aa);
  border-radius: 50%;
  box-shadow: 0 0 8px var(--color-primary, #00d4aa);
}

.experience-item:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
}

.exp-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 1mm;
}

.exp-title {
  margin: 0;
  display: flex;
  align-items: baseline;
  color: var(--color-sectionTitle, #00b894);
}

.exp-company {
  color: var(--color-primary, #00b894);
  margin: 0;
}

.exp-period,
.formation-year {
  color: var(--color-primary, #00d4aa);
}

.exp-subtitle {
  color: var(--color-textMuted, #94a3b8);
  margin: 0 0 1mm 0;
}

.exp-tasks {
  margin: 0;
  padding-left: 4mm;
  color: var(--color-textSecondary, #cbd5e1);
  line-height: 1.4;
}

.exp-tasks li {
  margin-bottom: 1mm;
}

/* Footer Grid */
.footer-grid {
  display: grid;
  grid-template-columns: 67fr 33fr;
  gap: 5mm;
}

.formation-list {
  display: flex;
  flex-direction: column;
  gap: 2mm;
}

.formation-item {
  display: flex;
  align-items: center;
  /* gap: 3mm; */
  color: var(--color-textMuted, #e2e8f0);
}

.formation-year {
  color: var(--color-primary, #00d4aa);
  min-width: 10mm;
}

.formation-details {
  flex: 1;
}

.interests-text {
  margin: 0;
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



/* Scoped print: only hide no-print */
@media print {
  .no-print {
    display: none !important;
  }
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
