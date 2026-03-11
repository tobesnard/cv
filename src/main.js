import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles/main.css'

// Enregistrement automatique du Service Worker pour la PWA
import { registerSW } from 'virtual:pwa-register'
registerSW({ immediate: true })

createApp(App).mount('#app')
