import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './assets/styles/main.css'

// Enregistrement automatique du Service Worker pour la PWA
import { registerSW } from 'virtual:pwa-register'
registerSW({ immediate: true })

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.mount('#app')
