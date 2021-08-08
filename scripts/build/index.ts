import { join } from 'path'
import { rollup, RollupOptions, OutputOptions } from 'rollup'
import { remove } from 'fs-extra'
import chalk from 'chalk'
import { getRollupConfig } from './base.config'

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

async function build({
  pkg = '',
  iifeName = '',
}, config: RollupOptions = {}): Promise<void> {
  const {
    output: outputConfig,
    ...inputConfig
  } = getRollupConfig(getPkgRoot(pkg), iifeName, config)

  const bundle = await rollup(inputConfig)

  console.log(chalk.yellow(`building package:${pkg}`));
  (outputConfig as OutputOptions[]).forEach(async outputOptions => {
    try {
      await clean(pkg)
      await bundle.write(outputOptions)
      console.log(`Success: ${outputOptions.file}`)
    } catch (error) {
      console.log(chalk.red(error.msg))
    }
  })
}

build({ pkg: 'core', iifeName: 'ChillSchemaFormCore' })
build({ pkg: 'vue2-render', iifeName: 'ChillSchemaFormVue2Render' })
build({ pkg: 'vue3-render', iifeName: 'ChillSchemaFormVue3Render' })
