import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    hmr: {
      port: 4000,
    },
  },
  plugins: [createVuePlugin()],
})
