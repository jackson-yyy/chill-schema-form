import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueJsxPlugin from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VueJsxPlugin()],
  resolve: {
    alias: {
      '@chill-schema-form/vue-render': '../../../packages/vue-render/src/index',
    },
  },
})
