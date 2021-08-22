import { resolve } from 'path'
import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 4000,
  },
  plugins: [
    createVuePlugin({
      jsx: true,
      jsxOptions: {
        compositionAPI: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@chill-schema-form/vue-render': resolve(__dirname, './node_modules/@chill-schema-form/vue-render/src/index'),
    },
  },
})
