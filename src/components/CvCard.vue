<template>
    <section :class="['cv-card-section', customClass]">
        <div v-if="title" class="card-header font-card-title">
            <!-- Rendu dynamique du composant d'icône -->
            <component v-if="icon" :is="icon" class="card-icon icon" aria-hidden="true" />
            <h3 class="card-title">{{ title }}</h3>
        </div>
        <div class="card-body">
            <slot />
        </div>
    </section>
</template>

<script setup lang="ts">
/**
 * @file CvCard.vue
 * @description Composant conteneur pour les sections du CV.
 */
import type { Component } from 'vue';

interface Props {
    title?: string;
    icon?: string | Component | null | undefined;
    customClass?: string;
}

withDefaults(defineProps<Props>(), {
    title: '',
    icon: null,
    customClass: ''
})
</script>

<style scoped>
.cv-card-section {
    background: var(--color-backgroundCard, var(--color-background-card, rgba(13, 31, 60, 0.4)));
    position: relative;
    margin-bottom: 4mm;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);

    /* Bordure en dégradé compatible impression (mais ne supporte pas nativement le radius) */
    border: 1px solid;
    border-image-source: linear-gradient(135deg, var(--color-primary, #00d4aa) 0%, transparent 100%);
    border-image-slice: 1;

    /* On garde le radius pour l'affichage écran (le background sera arrondi) */
    border-radius: 0 !important;
    border-top-left-radius: var(--card-border-radius-top-left, 10px);
    border-top-right-radius: var(--card-border-radius-top-right, 0px);
}

/* On utilise un masque uniquement à l'écran pour arrondir la bordure dégradée */
@media screen {
    .cv-card-section {
        /* Technique spécifique pour forcer l'arrondi sur un élément avec border-image */
        border-radius: var(--card-border-radius-top-left, 10px) var(--card-border-radius-top-right, 0px) 0 0;
        overflow: hidden;
    }
}

.cv-card-section::before {
    display: none;
}

.card-header {
    background-image: var(--color-cardHeaderGradient);
    padding: 2mm 3mm;
    border-bottom: 1px solid var(--color-borderLight, rgba(0, 212, 170, 0.15));
    display: flex;
    align-items: center;
    gap: 2mm;
    min-height: 28px;
}

.card-icon {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-primary, #00d4aa);
}

.card-body {
    padding: 4mm;
}

.card-title {
    margin: 0;
    text-transform: uppercase;
    line-height: normal;
    display: inline-flex;
    align-items: center;
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

@media screen and (max-width: 768px) {
    .cv-card-section {
        margin-bottom: 0 !important;
    }
}
</style>