import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  root: 'client',
  server: {
    port: 3000,
    open: true
  },
  build: {
    target: 'es2020',
    outDir: '../dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          excalibur: ['excalibur']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['excalibur']
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'client/src'),
      '@shared': path.resolve(__dirname, 'shared'),
      '@assets': path.resolve(__dirname, 'client/src/assets')
    }
  }
}) 