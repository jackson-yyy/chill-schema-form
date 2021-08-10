import Vue3JsxPlugin from '@vitejs/plugin-vue-jsx'
import { createVuePlugin } from 'vite-plugin-vue2'
import { build, cleanDist } from './utils'

function buildVueRender() {
  const external = ['vue-demi', 'vue', '@vue/composition-api']
  const pkg = 'vue-render'
  cleanDist(pkg)

  // vue2
  build(
    { pkg, output: 'v2/index.js', clean: false },
    {
      plugins: [
        createVuePlugin({
          jsx: true,
          jsxOptions: {
            compositionAPI: true,
          },
        }),
      ],
      external,
    },
  )

  // vue3
  build(
    { pkg, output: 'v3/index.js', clean: false },
    {
      plugins: [Vue3JsxPlugin()],
      external,
    },
  )
}

build({ pkg: 'core' })
buildVueRender()
