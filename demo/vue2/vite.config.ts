import { resolve } from 'path'
import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 4000,
  },
  /**
   * 取消@chill-schema-form/vue-render的预编译，项目中当做源码引入，
   * 将vue-demi当做external，用当前node_modules下的vue-demi作为源，保证vue2/3可以同时启动
   */
  optimizeDeps: {
    include: ['vue-demi'],
    exclude: ['@chill-schema-form/vue-render'],
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
      '@chill-schema-form/vue-render': resolve(__dirname, '../../packages/vue-render/src/index.ts'),
    },
  },
})
