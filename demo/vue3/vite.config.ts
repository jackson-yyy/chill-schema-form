import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueJsxPlugin from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VueJsxPlugin()],
  resolve: {
    alias: {
      '@chill-schema-form/vue-render': resolve(__dirname, './node_modules/@chill-schema-form/vue-render/src/index'),
    },
  },
})
