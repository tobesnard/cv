<template>
    <div class="footer-grid">
        <CvCard title="FORMATION" :icon="icons.graduation" customClass="formation-section">
            <div class="formation-list">
                <div v-for="edu in formations" :key="edu.annee + edu.diplome" class="formation-item">
                    <span class="formation-year font-date">{{ edu.annee }}</span>
                    <div class="formation-details">
                        <span class="formation-title font-section-title">{{ edu.diplome }}</span>
                        <span class="formation-school font-body"> — {{ edu.etablissement }} </span>
                    </div>
                </div>
            </div>
        </CvCard>

        <CvCard title="CENTRES D'INTÉRÊT" :icon="icons.heart" customClass="interests-section">
            <p class="interests-text">{{ centresDInterets }}</p>
        </CvCard>
    </div>
</template>

<script setup>
/**
 * @file CvFooter.vue
 * @description Pied de page du CV : Formation et Centres d'intérêt.
 */
import CvCard from './CvCard.vue'

defineProps({
    formations: { type: Array, required: true },
    centresDInterets: { type: String, required: true },
    icons: { type: Object, required: true }
})
</script>

<style scoped>
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
