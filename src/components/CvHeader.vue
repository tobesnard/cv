<template>
    <header class="cv-header">
        <div class="header-left">
            <h1 class="title">
                <span class="title-main font-title">{{ entete.titre?.toUpperCase() }}</span>
                <span class="title-sub font-subtitle">{{ entete.subtitle }}</span>
            </h1>
            <h2 class="name font-name">{{ entete.nom }}</h2>

            <!-- Informations de contact -->
            <div class="contact-info font-contact">
                <div class="contact-row">
                    <div class="contact-item">
                        <img src="@/assets/icons/map-pin.svg" class="icon" alt="Localisation" />
                        <span>{{ entete.adresse }}</span>
                    </div>
                    <div class="contact-item">
                        <img src="@/assets/icons/phone.svg" class="icon" alt="Téléphone" />
                        <span>{{ entete.telephone }}</span>
                    </div>
                </div>
                <div class="contact-row">
                    <div class="contact-item">
                        <img src="@/assets/icons/github.svg" class="icon" alt="GitHub" />
                        <a v-if="entete.github" :href="entete.github" target="_blank" rel="noopener noreferrer"
                            class="font-link">
                            {{ entete.github.replace('https://', '') }}
                        </a>
                    </div>
                    <div class="contact-item">
                        <img src="@/assets/icons/mail.svg" class="icon" alt="Email" />
                        <a v-if="entete.email" :href="'mailto:' + entete.email" class="font-link">
                            {{ entete.email }}
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <!-- Photo de profil -->
        <div class="header-right">
            <div class="photo-container">
                <div class="photo-wrapper">
                    <img :src="profilePhoto" :alt="'Photo de ' + entete.nom" class="photo" />
                </div>
            </div>
        </div>
    </header>
</template>

<script setup>
/**
 * @file CvHeader.vue
 * @description Sous-composant pour l'en-tête du CV (Infos perso + Photo).
 */
defineProps({
    entete: { type: Object, required: true },
    profilePhoto: { type: String, required: true }
})
</script>

<style scoped>
/* Styles extraits de CvPage.vue relatifs au header */
.cv-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 5mm;
    padding-bottom: 5mm;
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

.title-main,
.title-sub {
    display: block;
}

.name {
    padding-bottom: 10pt;
}

.contact-info {
    display: flex;
    flex-direction: column;
}

.contact-row {
    display: flex;
    gap: 4mm;
}

.contact-item {
    display: flex;
    align-items: center;
    gap: 2mm;
}

.contact-item a {
    text-decoration: none;
}

.contact-item .icon {
    width: 12px;
    height: 12px;
    filter: var(--color-iconFilter);
}

.header-right {
    flex-shrink: 0;
    margin-right: 3mm;
}

.photo-container {
    width: 36mm;
    height: 36mm;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: visible;
    padding: 3mm;
    z-index: 1;
}

.photo-container::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--color-backgroundLight, #14213d);
    border: 4px solid var(--color-primary, #00d4aa);
    border-radius: 5.5mm;
    transform: rotate(45deg);
    z-index: -1;
    box-shadow: 0 0 20px rgba(0, 212, 170, 0.3);
}

.photo {
    width: 80%;
    height: 115%;
    object-fit: cover;
    border-radius: 4mm;
    transform: rotate(-45deg);
    scale: 1.15;
    display: block;
    margin: -7% 10% 0 auto;
}

.photo-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 4mm;
    transform: rotate(45deg);
    background: var(--color-backgroundProfilePicture, white);
}
</style>
