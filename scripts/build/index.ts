import { join } from 'path'
import { rollup, RollupOptions, OutputOptions } from 'rollup'
import { remove } from 'fs-extra'
import chalk from 'chalk'
import { getBabelConfig, getRollupConfig } from './base.config'
import VueJsxPlugin from '@vitejs/plugin-vue-jsx'

const projectRoot = join(__dirname, '../..')
const packagesRoot = join(projectRoot, 'packages')

function getPkgRoot(pkg = '') {
  return join(packagesRoot, pkg)
}

async function clean(pkg = '', distPath = 'dist'): Promise<void> {
  const dist = join(getPkgRoot(pkg), distPath)
  console.log(chalk.yellow(`cleaning ${dist}`))
  await remove(dist)
  console.log(chalk.yellow(`cleaning ${dist}`))
}

async function build({ pkg = '', iifeName = '' }, config: RollupOptions = {}): Promise<void> {
  const { output: outputConfig, ...inputConfig } = getRollupConfig(getPkgRoot(pkg), iifeName, config)

  const bundle = await rollup(inputConfig)

  console.log(chalk.yellow(`building package:${pkg}`))
  ;(outputConfig as OutputOptions[]).forEach(async outputOptions => {
    try {
      await clean(pkg)
      await bundle.write(outputOptions)
      // await builDts(pkg)
      console.log(`Success: ${outputOptions.file}`)
    } catch (error) {
      console.log(chalk.red(error.msg))
    }
  })
}

function buildVueRender() {
  const vue2BabelConfig = getBabelConfig({
    // presets: [
    //   [
    //     '@vue/babel-preset-jsx',
    //     {
    //       compositionAPI: true,
    //     },
    //   ],
    // ],
    plugins: ['@vue/babel-plugin-jsx'],
  })

  build(
    { pkg: 'vue-render', iifeName: 'ChillSchemaFormVueRender' },
    {
      plugins: [vue2BabelConfig],
      external: ['vue-demi', 'vue'],
    },
  )
}
buildVueRender()
// async function builDts(pkg: string) {
//   const bundle = await rollup({
//     input: path.resolve(getPkgRoot(pkg), 'src/index.ts')
//   })
//   bundle.write({
//     file: path.resolve(getPkgRoot(pkg), `dist/index.d.ts`),
//     format: 'es',
//     plugins: [dts()]
//   })
// }

// build({ pkg: 'core', iifeName: 'ChillSchemaFormCore' })
// build(
//   { pkg: 'vue-render', iifeName: 'ChillSchemaFormVueRender' },
//   {
//     plugins: [VueJsxPlugin()],
//     external: ['vue-demi', 'vue'],
//   },
// )
