import path from 'path'
import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 4000,
  },
  plugins: [createVuePlugin()],
  resolve: {
    alias: {
      'vue-render': path.resolve(__dirname, 'node_modules/@chill-schema-form/vue-render/dist/v2'),
    },
  },
})
