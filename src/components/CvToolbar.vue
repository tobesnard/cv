<template>
    <!-- Barre d'outils flottante (masquée à l'impression) -->
    <div class="action-buttons no-print">
        <button @click="$emit('download-pdf')" class="action-button" title="Télécharger le PDF">
            <component :is="icons.download" :size="20" />
            <span class="button-text">{{ $t('actions.downloadPdf') }}</span>
        </button>
        <button @click="$emit('print')" class="action-button" title="Imprimer le CV">
            <component :is="icons.printer" :size="20" />
            <span class="button-text">{{ $t('actions.print') }}</span>
        </button>
        <button @click="$emit('toggle-theme')" class="action-button"
            :title="isDarkMode ? $t('actions.toggleTheme') : $t('actions.toggleTheme')">
            <component :is="isDarkMode ? icons.sun : icons.moon" :size="20" />
            <span class="button-text">{{ isDarkMode ? 'Mode Clair' : 'Mode Sombre' }}</span>
        </button>
    </div>
</template>

<script setup lang="ts">
/**
 * @file CvToolbar.vue
 * @description Composant pour la barre d'outils flottante (Impression, Thème).
 */
import type { Component } from 'vue';

interface Props {
    icons: Record<string, Component>;
    isDarkMode: boolean;
}

defineProps<Props>()

defineEmits<{
    (e: 'print'): void;
    (e: 'toggle-theme'): void;
    (e: 'download-pdf'): void;
}>()
</script>

<style scoped>
.action-buttons {
    position: fixed;
    bottom: 30px;
    right: 30px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 15px;
    z-index: 1000;
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

/* On s'assure que le SVG est bien stylisé */
.action-button :deep(svg) {
    display: block;
    width: 20px;
    height: 20px;
    min-width: 20px;
    min-height: 20px;
    stroke-width: 2.5px;
    margin: 0;
    flex-shrink: 0;
}

@media print {
    .no-print {
        display: none !important;
    }
}
</style>
