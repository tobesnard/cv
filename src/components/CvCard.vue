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
    position: relative;
    margin-bottom: 4mm;
    border-top-left-radius: var(--card-border-radius-top-left, 4px);
    border-top-right-radius: var(--card-border-radius-top-right, 0px);
    overflow: hidden;
}

.cv-card-section::before {
    content: "";
    position: absolute;
    inset: 0;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
    padding: 1px;
    /* Épaisseur de la bordure */
    background: linear-gradient(135deg, var(--color-primary, #00d4aa) 0%, transparent 100%);
    -webkit-mask:
        linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
    mask:
        linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
    z-index: 2;
}

.card-header {
    background-image: var(--color-cardHeaderGradient);
    background-color: var(--color-backgroundCard, rgba(13, 31, 60, 0.4));
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    padding: 2mm 3mm;
    border-bottom: 1px solid var(--color-borderLight, rgba(0, 212, 170, 0.15));
    display: flex;
    align-items: center;
    gap: 2mm;
    min-height: 28px;
    /* Force une hauteur minimale cohérente pour l'alignement */
    border-top-left-radius: var(--card-border-radius-top-left, 4px);
    border-top-right-radius: var(--card-border-radius-top-right, 0px);
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
    background-color: var(--color-backgroundCard, rgba(13, 31, 60, 0.4));
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
}

.card-title {
    margin: 0;
    padding: 0;
    text-transform: uppercase;
    line-height: 0.85;
    /* Réduit pour remonter artificiellement la baseline et coller au bas */
    display: inline-flex;
    align-items: flex-end;
    align-self: flex-end;
    height: auto;
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