import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

import { resolveSiteUrl, seo } from './build/seo.js'

const SITE_URL = resolveSiteUrl()

// No dev proxy and no API target: v2 has no backend. Content is bundled from
// src/data, so the dev server serves the finished site directly.
export default defineConfig({
  plugins: [react(), seo(SITE_URL)],
  define: {
    'import.meta.env.VITE_SITE_URL': JSON.stringify(SITE_URL),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        // Split as in v1: the framework and the motion library change far
        // less often than the site itself, so they cache independently.
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
  },
})
