import Vue3JsxPlugin from '@vitejs/plugin-vue-jsx'
import { createVuePlugin } from 'vite-plugin-vue2'
import { build, buildDts, cleanDist } from './utils'
import execa from 'execa'

async function buildVueRender() {
  const external = ['vue-demi', 'vue', '@vue/composition-api']
  const pkg = 'vue-render'

  const scopeArgs = ['--scope', '@chill-schema-form/vue-render']

  cleanDist(pkg)

  await execa('lerna', ['run', 'switch:vue3', ...scopeArgs], { stdout: 'inherit' }).catch(console.log)

  // vue3
  await build(
    { pkg, output: 'dist/v3/index.js', clean: false },
    {
      plugins: [Vue3JsxPlugin()],
      external,
    },
  )

  await buildDts({ pkg, input: 'dist/v3/index.d.ts', output: 'dist/v3/index.d.ts' })

  await execa('lerna', ['run', 'switch:vue2', ...scopeArgs], { stdout: 'inherit' })

  // vue2
  await build(
    { pkg, output: 'dist/v2/index.js', clean: false },
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

  await buildDts({ pkg, input: 'dist/v2/index.d.ts', output: 'dist/v2/index.d.ts' })

  await execa('lerna', ['run', 'reset:version', ...scopeArgs], { stdout: 'inherit' })
}

build({ pkg: 'core', buildDeclaration: true })
buildVueRender()
