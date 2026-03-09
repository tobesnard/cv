<script setup>
import { ref, computed } from 'vue'
import cvData from '../data/cv-data.json'
import designConfig from '../data/design-config.json'

const data = ref(cvData)
const config = ref(designConfig)

const renderSkillLevel = (level, maxLevel = 5) => {
  return Array.from({ length: maxLevel }, (_, i) => i < level)
}
</script>

<template>
  <div class="cv-container">
    <div class="cv-page">
      <!-- Background -->
      <div class="cv-background" :style="{ backgroundImage: `url(${config.assets.background})` }"></div>

      <!-- Content -->
      <div class="cv-content">
        <!-- Header -->
        <header class="cv-header">
          <div class="header-left">
            <h1 class="title">
              <span class="title-main">{{ data.personal.title }}</span>
              <span class="title-sub">{{ data.personal.subtitle }}</span>
            </h1>
            <h2 class="name">{{ data.personal.name }}</h2>
            <div class="contact-info">
              <div class="contact-item">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>{{ data.personal.address }}</span>
              </div>
              <div class="contact-item">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path
                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z">
                  </path>
                </svg>
                <span>{{ data.personal.phone }}</span>
              </div>
              <div class="contact-item">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path
                    d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22">
                  </path>
                </svg>
                <a :href="data.personal.github" target="_blank" rel="noopener noreferrer">{{
                  data.personal.github.replace('https://', '') }}</a>
              </div>
              <div class="contact-item">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <a :href="'mailto:' + data.personal.email">{{ data.personal.email }}</a>
              </div>
            </div>
          </div>
          <div class="header-right">
            <div class="photo-container">
              <img :src="config.assets.photo" :alt="data.personal.name" class="photo" />
            </div>
          </div>
        </header>

        <!-- Profile Section -->
        <section class="section profile-section">
          <h3 class="section-title">PROFIL</h3>
          <p class="profile-text">{{ data.profile }}</p>
        </section>

        <!-- Main Content Grid -->
        <div class="main-grid">
          <!-- Left Column -->
          <div class="left-column">
            <!-- Competences -->
            <section class="section">
              <h3 class="section-title">COMPETENCES</h3>

              <div class="skills-group">
                <h4 class="skills-subtitle">
                  <span class="skill-icon"></span>
                  Développement
                </h4>
                <div class="skills-list">
                  <div v-for="skill in data.competences.developpement" :key="skill.name" class="skill-item">
                    <span class="skill-icon-box"></span>
                    <span class="skill-name">{{ skill.name }}</span>
                    <div class="skill-level">
                      <span v-for="(filled, index) in renderSkillLevel(skill.level)" :key="index"
                        :class="['level-box', { filled }]"></span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="skills-group">
                <h4 class="skills-subtitle">
                  <span class="skill-icon"></span>
                  Architecture & Conception
                </h4>
                <div class="skills-list">
                  <div v-for="skill in data.competences.architecture" :key="skill.name" class="skill-item">
                    <span class="skill-icon-box"></span>
                    <span class="skill-name">{{ skill.name }}</span>
                    <div class="skill-level">
                      <span v-for="(filled, index) in renderSkillLevel(skill.level)" :key="index"
                        :class="['level-box', { filled }]"></span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <!-- Transverses -->
            <section class="section">
              <h3 class="section-title">TRANSVERSES</h3>
              <div class="transverse-grid">
                <div v-for="skill in data.transverses.pilotage" :key="skill.name" class="transverse-item">
                  <span class="skill-icon-box"></span>
                  <span class="skill-name">{{ skill.name }}</span>
                  <div class="skill-level">
                    <span v-for="(filled, index) in renderSkillLevel(skill.level)" :key="index"
                      :class="['level-box', { filled }]"></span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <!-- Right Column -->
          <div class="right-column">
            <!-- Experience -->
            <section class="section">
              <h3 class="section-title">EXPERIENCE PROFESSIONELLE</h3>

              <div v-for="exp in data.experience" :key="exp.company" class="experience-item">
                <div class="exp-header">
                  <h4 class="exp-company">{{ exp.company }}</h4>
                  <span class="exp-period">{{ exp.period }}</span>
                </div>
                <p v-if="exp.subtitle" class="exp-subtitle">{{ exp.subtitle }}</p>
                <p class="exp-title">{{ exp.title }}</p>
                <ul v-if="exp.tasks.length" class="exp-tasks">
                  <li v-for="(task, index) in exp.tasks" :key="index">{{ task }}</li>
                </ul>
              </div>
            </section>
          </div>
        </div>

        <!-- Footer Grid -->
        <div class="footer-grid">
          <!-- Formation -->
          <section class="section formation-section">
            <h3 class="section-title">FORMATION</h3>
            <div class="formation-list">
              <div v-for="edu in data.formation" :key="edu.year" class="formation-item">
                <span class="formation-year">{{ edu.year }}</span>
                <div class="formation-details">
                  <span class="formation-title">{{ edu.title }}</span>
                  <span v-if="edu.level" class="formation-level">({{ edu.level }})</span>
                  <span class="formation-school"> - {{ edu.school }}</span>
                </div>
              </div>
            </div>
          </section>

          <!-- Interests -->
          <section class="section interests-section">
            <h3 class="section-title">CENTRES D'INTÉRÊT</h3>
            <p class="interests-text">{{ data.interests }}</p>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cv-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  background: #050d1a;
}

.cv-page {
  width: 210mm;
  min-height: 297mm;
  position: relative;
  background: #0a1628;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

.cv-background {
  position: absolute;
  inset: 0;
  background-image: url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/background.png-DSzTWAFYYjrON2NnXoieKBNk9u5swK.jpeg');
  background-size: cover;
  background-position: center;
  opacity: 0.4;
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
  border-bottom: 1px solid rgba(0, 212, 170, 0.2);
}

.header-left {
  flex: 1;
}

.title {
  margin: 0 0 2mm 0;
}

.title-main {
  display: block;
  font-family: 'Rajdhani', sans-serif;
  font-size: 28pt;
  font-weight: 700;
  color: #00d4aa;
  line-height: 1.1;
}

.title-sub {
  display: block;
  font-family: 'Rajdhani', sans-serif;
  font-size: 18pt;
  font-weight: 500;
  color: #ffffff;
}

.name {
  font-family: 'Rajdhani', sans-serif;
  font-size: 22pt;
  font-weight: 600;
  color: #ffffff;
  margin: 3mm 0;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1.5mm;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 2mm;
  font-family: 'Roboto', sans-serif;
  font-size: 9pt;
  color: #94a3b8;
}

.contact-item a {
  color: #00d4aa;
  text-decoration: none;
}

.contact-item .icon {
  width: 12px;
  height: 12px;
  color: #00d4aa;
}

.header-right {
  flex-shrink: 0;
}

.photo-container {
  width: 30mm;
  height: 30mm;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #00d4aa;
  box-shadow: 0 0 20px rgba(0, 212, 170, 0.3);
}

.photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Sections */
.section {
  margin-bottom: 4mm;
}

.section-title {
  font-family: 'Rajdhani', sans-serif;
  font-size: 12pt;
  font-weight: 700;
  color: #00d4aa;
  margin: 0 0 3mm 0;
  padding-bottom: 1.5mm;
  border-bottom: 2px solid #00d4aa;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Profile */
.profile-section {
  background: rgba(13, 31, 60, 0.7);
  padding: 4mm;
  border-radius: 2mm;
  border: 1px solid rgba(0, 212, 170, 0.2);
}

.profile-text {
  font-family: 'Roboto', sans-serif;
  font-size: 9pt;
  color: #e2e8f0;
  line-height: 1.5;
  margin: 0;
}

/* Main Grid */
.main-grid {
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 5mm;
  margin-bottom: 4mm;
}

.left-column,
.right-column {
  background: rgba(13, 31, 60, 0.7);
  padding: 4mm;
  border-radius: 2mm;
  border: 1px solid rgba(0, 212, 170, 0.2);
}

/* Skills */
.skills-group {
  margin-bottom: 3mm;
}

.skills-subtitle {
  font-family: 'Rajdhani', sans-serif;
  font-size: 10pt;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 2mm 0;
  display: flex;
  align-items: center;
  gap: 2mm;
}

.skills-subtitle::before {
  content: '';
  display: inline-block;
  width: 8px;
  height: 8px;
  background: #00d4aa;
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
  font-family: 'Roboto', sans-serif;
  font-size: 8.5pt;
  color: #e2e8f0;
}

.skill-icon-box {
  width: 6px;
  height: 6px;
  background: #00d4aa;
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
  background: rgba(0, 212, 170, 0.2);
  border: 1px solid rgba(0, 212, 170, 0.4);
}

.level-box.filled {
  background: #00d4aa;
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
  color: #e2e8f0;
}

/* Experience */
.experience-item {
  margin-bottom: 4mm;
  padding-bottom: 3mm;
  border-bottom: 1px solid rgba(0, 212, 170, 0.1);
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
  color: #ffffff;
  margin: 0;
}

.exp-period {
  font-family: 'Roboto', sans-serif;
  font-size: 9pt;
  color: #00d4aa;
  font-weight: 500;
}

.exp-subtitle {
  font-family: 'Roboto', sans-serif;
  font-size: 9pt;
  font-style: italic;
  color: #94a3b8;
  margin: 0 0 1mm 0;
}

.exp-title {
  font-family: 'Roboto', sans-serif;
  font-size: 9pt;
  font-weight: 500;
  color: #00d4aa;
  margin: 0 0 2mm 0;
}

.exp-tasks {
  margin: 0;
  padding-left: 4mm;
  font-family: 'Roboto', sans-serif;
  font-size: 8pt;
  color: #cbd5e1;
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
  background: rgba(13, 31, 60, 0.7);
  padding: 4mm;
  border-radius: 2mm;
  border: 1px solid rgba(0, 212, 170, 0.2);
}

.formation-list {
  display: flex;
  flex-direction: column;
  gap: 2mm;
}

.formation-item {
  display: flex;
  gap: 3mm;
  font-family: 'Roboto', sans-serif;
  font-size: 8.5pt;
  color: #e2e8f0;
}

.formation-year {
  font-weight: 700;
  color: #00d4aa;
  min-width: 10mm;
}

.formation-details {
  flex: 1;
}

.formation-title {
  font-weight: 500;
}

.formation-level {
  color: #00d4aa;
}

.formation-school {
  color: #94a3b8;
}

.interests-text {
  font-family: 'Roboto', sans-serif;
  font-size: 8.5pt;
  color: #e2e8f0;
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
