import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './assets/styles/main.css'
import { i18n } from './i18n'

// @ts-ignore - plugin PWA virtuel
import { registerSW } from 'virtual:pwa-register'
registerSW({ immediate: true })

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(i18n)
app.mount('#app')
