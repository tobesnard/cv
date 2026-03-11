<template>
    <div class="skills-group" v-for="(skills, category) in data" :key="category">
        <h4 class="skills-subtitle font-section-title">
            <span class="skill-marker"></span>
            {{ category }}
        </h4>
        <div class="skills-list">
            <div class="skill-item">
                {{ Array.isArray(skills) ? skills.join(', ') : skills }}
            </div>
        </div>
    </div>
</template>

<script setup>
/**
 * @file CvSkillSection.vue
 * @description Rendu d'une section de compétences (ex: Langages, Outils).
 */
defineProps({
    data: { type: Object, required: true }
})
</script>

<style scoped>
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
</style>
