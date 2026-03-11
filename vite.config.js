import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/cv/',
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json,jsonc}'],
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024 // Limite augmentée à 4 Mo pour la photo de profil
      },
      manifest: {
        "name": "CV Tony BESNARD - Lead Développeur Full-Stack",
        "short_name": "CV Tony BESNARD",
        "description": "CV de Tony BESNARD, Lead Développeur Full-Stack et Pilotage de Projets.",
        "theme_color": "#0d1f3c",
        "background_color": "#ffffff",
        "display": "standalone",
        "start_url": "/cv/",
        "scope": "/cv/",
        "icons": [
          {
            "src": "/cv/favicon.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "any"
          },
          {
            "src": "/cv/favicon.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "any"
          },
          {
            "src": "/cv/favicon.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "maskable"
          },
          {
            "src": "/cv/favicon.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
