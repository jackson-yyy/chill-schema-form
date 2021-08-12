import Vue3JsxPlugin from '@vitejs/plugin-vue-jsx'
import { createVuePlugin } from 'vite-plugin-vue2'
import { build, cleanDist } from './utils'
import execa from 'execa'

async function buildVueRender() {
  const external = ['vue-demi', 'vue', '@vue/composition-api']
  const pkg = 'vue-render'
  cleanDist(pkg)

  await execa('lerna run switch:vue3', ['--scope', '@chill-schema-form/vue-render'], { stdout: 'inherit' })

  // vue3
  await build(
    { pkg, output: 'v3/index.js', clean: false },
    {
      plugins: [Vue3JsxPlugin()],
      external,
    },
  )

  await execa('lerna run switch:vue2', ['--scope', '@chill-schema-form/vue-render'], { stdout: 'inherit' })

  // vue2
  await build(
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
}

build({ pkg: 'core' })
buildVueRender()
