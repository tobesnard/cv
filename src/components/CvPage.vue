<template>
  <div class="cv-container" :style="cssProps">
    <DefineCard v-slot="{ title, customClass, $slots }">
      <section :class="['cv-card-section', customClass]">
        <div v-if="title" class="card-header">
          <h3 class="section-title">{{ title.toUpperCase() }}</h3>
        </div>
        <div class="card-body">
          <component :is="$slots.default" />
        </div>
      </section>
    </DefineCard>

    <div class="cv-page">
      <!-- Background -->
      <div class="cv-background" :style="{ backgroundImage: `url(${config.assets.background})` }"></div>

      <!-- Content -->
      <div class="cv-content">
        <!-- Header -->
        <header class="cv-header">
          <div class="header-left">
            <h1 class="title">
              <span class="title-main">{{ data.titre }}</span>
              <span class="title-sub">{{ data.subtitle }}</span>
              <hr>
            </h1>
            <h2 class="name">{{ data.entete.nom }}</h2>
            <div class="contact-info">
              <div class="contact-item">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>{{ data.entete.adresse }}</span>
              </div>
              <div class="contact-item">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path
                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z">
                  </path>
                </svg>
                <span>{{ data.entete.telephone }}</span>
              </div>
              <div class="contact-item">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path
                    d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22">
                  </path>
                </svg>
                <a :href="data.entete.github" target="_blank" rel="noopener noreferrer">{{
                  data.entete.github.replace('https://', '') }}</a>
              </div>
              <div class="contact-item">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <a :href="'mailto:' + data.entete.email">{{ data.entete.email }}</a>
              </div>
            </div>
          </div>
          <div class="header-right">
            <div class="photo-container">
              <img :src="config.assets.photo" :alt="data.entete.nom" class="photo" />
            </div>
          </div>
        </header>

        <!-- Profile Section -->
        <ReuseCard title="PROFIL" customClass="profile-section">
          <p class="profile-text">{{ data.profil }}</p>
        </ReuseCard>

        <!-- Main Content Grid -->
        <div class="main-grid">
          <!-- Left Column -->
          <div customClass="left-column">

            <ReuseCard :title="section_name" customClass="transverses-section"
              v-for="(competences, section_name) in data.competences" :key="title">

              <div class="skills-group" v-for="(skills, category) in competences" :key="category">
                <h4 class="skills-subtitle">
                  <span class="skill-icon"></span>
                  {{ category }}
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
          <ReuseCard customClass="right-column" title="EXPÉRIENCE PROFESSIONNELLE">
            <!-- Experience -->
            <section class="section">

              <div v-for="exp in data.experience_professionnelle" :key="exp.entreprise" class="experience-item">
                <div class="exp-header">
                  <h4 class="skills-subtitle exp-title">
                    <span class="skill-icon"></span>
                    {{ exp.titre }} | {{ exp.entreprise || '' }} ({{ exp.periode }})
                  </h4>
                </div>
                <p class="profile-text" style="font-size: 8.5pt; opacity: 0.9;">{{ exp.description }}</p>
              </div>
            </section>
          </ReuseCard>
        </div>

        <!-- Footer Grid -->
        <div class="footer-grid">
          <!-- Formation -->
          <ReuseCard title="FORMATION" customClass="formation-section">
            <div class="formation-list">
              <div v-for="edu in data.formation" :key="edu.annee" class="formation-item">
                <span class="formation-year">{{ edu.annee }}</span>
                <div class="formation-details">
                  <span class="formation-title">{{ edu.diplome }}</span>
                  <span class="formation-school"> - {{ edu.etablissement }} </span>
                </div>
              </div>
            </div>
          </ReuseCard>

          <!-- Interests -->
          <ReuseCard title="CENTRES D'INTÉRÊT" customClass="interests-section">
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
import cvData from '../data/cv-data.json'
import designConfig from '../data/design-config.json'
import backgroundImage from '@/assets/images/background.png'
import photoImage from '@/assets/images/photo.jpg'

const [DefineCard, ReuseCard] = createReusableTemplate()

const data = ref(cvData)
const config = ref(designConfig)

// Overwrite asset paths with imported URLs for Vite processing
config.value.assets.background = backgroundImage
config.value.assets.photo = photoImage

const renderSkillLevel = (level, maxLevel = 5) => {
  return Array.from({ length: maxLevel }, (_, i) => i < level)
}

const cssProps = computed(() => {
  const props = {}

  // Couleurs
  Object.entries(config.value.colors).forEach(([key, value]) => {
    props[`--color-${key}`] = value
  })

  // Polices
  Object.entries(config.value.fonts).forEach(([key, value]) => {
    props[`--font-${key}`] = value
  })

  // Tailles
  Object.entries(config.value.fontSizes).forEach(([key, value]) => {
    props[`--size-${key}`] = value
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

/* Header */
.cv-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 5mm;
  padding-bottom: 5mm;
  border-bottom: 1px solid var(--color-borderLight, rgba(0, 212, 170, 0.2));
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
  font-family: var(--font-heading, 'Rajdhani', sans-serif);
  font-size: var(--size-titleMain, 22pt);
  font-weight: 700;
  color: var(--color-primary, #00d4aa);
  line-height: 1.1;
}

.title-sub {
  display: block;
  font-family: var(--font-heading, 'Rajdhani', sans-serif);
  font-size: var(--size-titleSub, 14pt);
  font-weight: 500;
  color: var(--color-text, #ffffff);
}

.name {
  font-family: var(--font-heading, 'Rajdhani', sans-serif);
  font-size: var(--size-name, 18pt);
  font-weight: 600;
  color: var(--color-text, #ffffff);
  /* margin: 2mm 0; */
}

.contact-info {
  display: flex;
  flex-direction: column;
  /* gap: 1.5mm; */
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 2mm;
  font-family: var(--font-body, 'Roboto', sans-serif);
  font-size: var(--size-body, 9pt);
  color: var(--color-textMuted, #94a3b8);
}

.contact-item a {
  color: var(--color-primary, #00d4aa);
  text-decoration: none;
}

.contact-item .icon {
  width: 12px;
  height: 12px;
  color: var(--color-primary, #00d4aa);
}

.header-right {
  flex-shrink: 0;
}

.photo-container {
  width: 35mm;
  height: 35mm;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: visible;
}

.photo-container::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--color-primary, #00d4aa);
  clip-path: polygon(29% 0%, 71% 0%, 100% 29%, 100% 71%, 71% 100%, 29% 100%, 0% 71%, 0% 29%, 29% 0%, 29.5% 1%, 1% 29.5%, 1% 70.5%, 29.5% 99%, 70.5% 99%, 99% 70.5%, 99% 29.5%, 70.5% 1%, 29.5% 1%);
  z-index: 2;
}

.photo-container::after {
  content: '';
  position: absolute;
  inset: 4px;
  background: var(--color-primary, #00d4aa);
  clip-path: polygon(29% 0%, 71% 0%, 100% 29%, 100% 71%, 71% 100%, 29% 100%, 0% 71%, 0% 29%, 29% 0%, 29.5% 1%, 1% 29.5%, 1% 70.5%, 29.5% 99%, 70.5% 99%, 99% 70.5%, 99% 29.5%, 70.5% 1%, 29.5% 1%);
  z-index: 2;
  opacity: 0.6;
}

.photo {
  width: calc(100% - 14px);
  height: calc(100% - 14px);
  object-fit: cover;
  clip-path: polygon(29% 0%, 71% 0%, 100% 29%, 100% 71%, 71% 100%, 29% 100%, 0% 71%, 0% 29%);
  background: var(--color-background, #0a1628);
}

/* Sections */
.section {
  margin-bottom: 4mm;
}

.section-title {
  font-family: var(--font-heading, 'Rajdhani', sans-serif);
  font-size: var(--size-sectionTitle, 12pt);
  font-weight: 700;
  color: var(--color-primary, #00d4aa);
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Card Section Base Style */
.cv-card-section {
  background: var(--color-backgroundCard, rgba(13, 31, 60, 0.4));
  border-radius: 0;
  position: relative;
  margin-bottom: 4mm;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  /* Bordure en dégradé */
  border: 1px solid;
  border-image-source: linear-gradient(135deg, var(--color-primary, #00d4aa) 0%, transparent 100%);
  border-image-slice: 1;
}

.card-header {
  background: rgba(0, 0, 0, 0.3);
  /* Plus foncé que la card */
  padding: 1mm 3mm;
  border-bottom: 1px solid var(--color-borderLight, rgba(0, 212, 170, 0.15));
}

.card-body {
  padding: 4mm;
}

/* Profile */
.profile-text {
  font-family: var(--font-body, 'Roboto', sans-serif);
  font-size: var(--size-body, 9pt);
  color: var(--color-textMuted, #e2e8f0);
  line-height: 1.5;
  margin: 0;
}

/* Main Grid */
.main-grid {
  display: grid;
  grid-template-columns: 0.7fr 1.5fr;
  gap: 5mm;
  margin-bottom: 4mm;
}

.left-column,
.right-column {
  margin-bottom: 0;
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
  font-family: var(--font-body, 'Roboto', sans-serif);
  font-size: var(--size-body, 8.5pt);
  color: var(--color-textMuted, #e2e8f0);
}

.skill-icon-box {
  width: 6px;
  height: 6px;
  background: var(--color-primary, #00d4aa);
  flex-shrink: 0;
}

.skill-name {
  flex: 1;
}

.skill-level {
  display: flex;
  gap: 1mm;
}

.level-box {
  width: 8px;
  height: 8px;
  background: var(--color-borderLight, rgba(0, 212, 170, 0.2));
  border: 1px solid var(--color-border, rgba(0, 212, 170, 0.4));
}

.level-box.filled {
  background: var(--color-primary, #00d4aa);
}

/* Transverses */
.transverse-grid {
  display: flex;
  flex-direction: column;
  gap: 2mm;
}

.transverse-item {
  display: flex;
  align-items: center;
  gap: 2mm;
  font-family: 'Roboto', sans-serif;
  font-size: 8.5pt;
  color: var(--color-textMuted, #e2e8f0);
}

/* Experience */
.experience-item {
  margin-bottom: 4mm;
  padding-bottom: 3mm;
  border-bottom: 1px solid var(--color-borderLight, rgba(0, 212, 170, 0.1));
}

.experience-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.exp-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 1mm;
}

.exp-company {
  font-family: 'Rajdhani', sans-serif;
  font-size: 11pt;
  font-weight: 600;
  color: var(--color-text, #ffffff);
  margin: 0;
}

.exp-period {
  font-family: 'Roboto', sans-serif;
  font-size: 9pt;
  color: var(--color-primary, #00d4aa);
  font-weight: 500;
}

.exp-subtitle {
  font-family: var(--font-body, 'Roboto', sans-serif);
  font-size: var(--size-body, 9pt);
  font-style: italic;
  color: var(--color-textMuted, #94a3b8);
  margin: 0 0 1mm 0;
}

.exp-title,
.skills-subtitle {
  font-family: var(--font-body, 'Roboto', sans-serif);
  font-size: var(--size-body, 9pt);
  font-weight: 500;
  color: var(--color-primary, #00d4aa);
  margin: 0 0 2mm 0;
}

.exp-tasks {
  margin: 0;
  padding-left: 4mm;
  font-family: var(--font-body, 'Roboto', sans-serif);
  font-size: var(--size-small, 8pt);
  color: var(--color-textSecondary, #cbd5e1);
  line-height: 1.5;
}

.exp-tasks li {
  margin-bottom: 1mm;
}

/* Footer Grid */
.footer-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 5mm;
}

.formation-section,
.interests-section {
  margin-bottom: 0;
}

.formation-list {
  display: flex;
  flex-direction: column;
  gap: 2mm;
}

.formation-item {
  display: flex;
  gap: 3mm;
  font-family: var(--font-body, 'Roboto', sans-serif);
  font-size: var(--size-body, 8.5pt);
  color: var(--color-textMuted, #e2e8f0);
}

.formation-year {
  font-weight: 700;
  color: var(--color-primary, #00d4aa);
  min-width: 10mm;
}

.formation-details {
  flex: 1;
}

.formation-title {
  font-weight: 500;
}

.formation-level {
  color: var(--color-primary, #00d4aa);
}

.formation-school {
  color: var(--color-textMuted, #94a3b8);
}

.interests-text {
  font-family: var(--font-body, 'Roboto', sans-serif);
  font-size: var(--size-body, 8.5pt);
  color: var(--color-textMuted, #e2e8f0);
  line-height: 1.5;
  margin: 0;
}

/* Print Styles */
@media print {
  @page {
    size: A4 portrait;
    margin: 0;
  }

  html,
  body {
    width: 210mm;
    height: 297mm;
    margin: 0;
    padding: 0;
  }

  .cv-container {
    padding: 0;
    min-height: auto;
    background: none;
  }

  .cv-page {
    width: 210mm;
    height: 297mm;
    min-height: 297mm;
    max-height: 297mm;
    box-shadow: none;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .cv-background {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .section {
    break-inside: avoid;
  }
}
</style>
