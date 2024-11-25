import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 1337
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "./build/scss/_variables.scss" as *;
          @use "./build/scss/_themes.scss" as *;
        `
      }
    }
  }
}) 