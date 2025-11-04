import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  optimizeDeps: {
    exclude: ["web-tree-sitter"]
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      workbox: {
        maximumFileSizeToCacheInBytes: 30000000
      },
      manifest: {
        name: 'PyPENエディター',
        theme_color: '#fff',
        display: 'standalone',
        lang: 'ja-jp',
        icons: [
          {
            src: 'icon.ico',
            sizes: '144x144',
            type: 'image/vnd.microsoft.icon'
          }, {
            src: 'icon.png',
            sizes: '144x144',
            type: 'image/png'
          }
        ],
        file_handlers: [
          {
            action: "./",
            accept: {
              "text/pypen": [".PyPEN"],
            }
          }
        ]
      }
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    }
  },
})
