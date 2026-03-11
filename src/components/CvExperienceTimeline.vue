<template>
    <div class="timeline-container">
        <div v-for="exp in experiences" :key="exp.entreprise + exp.periode" class="experience-item timeline-item">
            <div class="timeline-dot"></div>
            <div class="exp-header">
                <h4 class="exp-title">
                    <span class="exp-title-main font-section-title">{{ exp.titre }}</span>
                    <span class="exp-company" v-if="exp.entreprise">&nbsp;| {{ exp.entreprise }}</span>
                </h4>
                <span class="exp-period font-date">{{ exp.periode }}</span>
            </div>
            <p class="exp-description">{{ exp.description }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
/**
 * @file CvExperienceTimeline.vue
 * @description Rendu de la frise chronologique des expériences professionnelles.
 */
import type { Experience } from '@/domain/cv.types'

defineProps<{
    experiences: Experience[]
}>()
</script>

<style scoped>
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

.exp-period {
    color: var(--color-primary, #00d4aa);
}

.exp-description {
    margin: 0;
    line-height: 1.4;
    color: var(--color-textMuted);
}
</style>
