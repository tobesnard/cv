import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

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
        "theme_color": "#131e2e",
        "background_color": "#ffffff",
        "display": "standalone",
        "display_override": ["window-controls-overlay"],
        "start_url": "/cv/",
        "scope": "/cv/",
        "icons": [
          {
            "src": "favicon-192.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "any"
          },
          {
            "src": "favicon-512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "any"
          },
          {
            "src": "favicon-192.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "maskable"
          },
          {
            "src": "favicon-512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
          }
        ],
        "screenshots": [
          {
            "src": "favicon-512.png",
            "sizes": "512x512",
            "type": "image/png",
            "form_factor": "wide",
            "label": "CV Tony BESNARD Desktop"
          },
          {
            "src": "favicon-512.png",
            "sizes": "512x512",
            "type": "image/png",
            "label": "CV Tony BESNARD Mobile"
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
