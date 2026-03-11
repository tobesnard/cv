import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles/main.css'
import { registerPlugins } from './plugins'

// @ts-ignore - plugin PWA virtuel
import { registerSW } from 'virtual:pwa-register'
registerSW({ immediate: true })

const app = createApp(App)

registerPlugins(app)
app.mount('#app')
