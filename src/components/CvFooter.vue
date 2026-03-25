<template>
    <div class="footer-grid">
        <CvCard :title="$t('sections.education')" :icon="icons.Graduation" customClass="formation-section">
            <div class="formation-list">
                <div v-for="edu in formations" :key="edu.annee + edu.diplome" class="formation-item">
                    <span v-if="displayDates" class="formation-year font-date">{{ edu.annee }}</span>
                    <div class="formation-details">
                        <span class="formation-title font-section-title">{{ edu.diplome }}</span>
                        <span class="formation-school font-body"> — {{ edu.etablissement }} </span>
                    </div>
                </div>
            </div>
        </CvCard>

        <CvCard :title="$t('sections.interests')" :icon="icons.Heart" customClass="interests-section">
            <p class="interests-text">{{ centresDInterets }}</p>
        </CvCard>
    </div>
</template>

<script setup lang="ts">
/**
 * @file CvFooter.vue
 * @description Pied de page du CV : Formation et Centres d'intérêt.
 */
import { onMounted, ref } from 'vue';
import type { Formation } from '@/domain/cv.types';
import CvCard from './CvCard.vue';
import type { Component } from 'vue';

defineProps<{
    formations: Formation[];
    centresDInterets: string;
    icons: Record<string, Component>;
}>();

const displayDates = ref(false);

onMounted(() => {
    const urlParams = new URLSearchParams(window.location.search);
    displayDates.value = urlParams.has('date') && urlParams.get('date') !== '0';
});
</script>

<style scoped>
.footer-grid {
    display: grid;
    grid-template-columns: 67fr 33fr;
    gap: 5mm;
}

@media screen and (max-width: 768px) {
    .footer-grid {
        grid-template-columns: 1fr;
        gap: 15px;
        display: flex;
        flex-direction: column;
    }

    .formation-section {
        order: 4;
        /* Après les compétences */
    }

    .interests-section {
        order: 5;
    }
}

.formation-list {
    display: flex;
    flex-direction: column;
    gap: 2mm;
}

.formation-item {
    display: flex;
    align-items: center;
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

.formation-school {
    margin-left: 2px;
}
</style>
