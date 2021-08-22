import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  /**
   * 取消@chill-schema-form/vue-render的预编译，项目中当做源码引入，
   * 将vue-demi当做external，用当前node_modules下的vue-demi作为源，保证vue2/3可以同时启动
   */
  optimizeDeps: {
    include: ['vue-demi'],
    exclude: ['@chill-schema-form/vue-render'],
  },
  resolve: {
    alias: {
      '@chill-schema-form/vue-render': resolve(__dirname, '../../packages/vue-render/src/index.ts'),
    },
  },
})
