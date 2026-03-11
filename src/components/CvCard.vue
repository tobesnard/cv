<template>
    <section :class="['cv-card-section', customClass]">
        <div v-if="title" class="card-header font-card-title">
            <img v-if="icon" :src="icon" class="card-icon icon" alt="" />
            <h3 class="card-title">{{ title }}</h3>
        </div>
        <div class="card-body">
            <slot />
        </div>
    </section>
</template>

<script setup>
/**
 * @file CvCard.vue
 * @description Composant conteneur pour les sections du CV (Cartes).
 */

defineProps({
    title: {
        type: String,
        default: ''
    },
    icon: {
        type: [String, Object],
        default: null
    },
    customClass: {
        type: String,
        default: ''
    }
})
</script>

<style scoped>
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

.card-title {
    margin: 0;
    text-transform: uppercase;
    line-height: 1;
}

/* On s'assure que les styles de police injectés s'appliquent ici aussi */
:deep(.font-card-title) {
    color: var(--font-cardTitle-color) !important;
    font-family: var(--font-cardTitle-family) !important;
    font-size: var(--font-cardTitle-size) !important;
    font-weight: var(--font-cardTitle-weight) !important;
    line-height: var(--font-cardTitle-lineHeight) !important;
    letter-spacing: var(--font-cardTitle-letterSpacing) !important;
}
</style>