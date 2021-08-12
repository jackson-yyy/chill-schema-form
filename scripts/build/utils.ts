import chalk from 'chalk'
import { remove } from 'fs-extra'
import { join } from 'path'
import { OutputOptions, rollup, RollupOptions } from 'rollup'
import { getRollupConfig } from './base.config'

const projectRoot = join(__dirname, '../..')
const packagesRoot = join(projectRoot, 'packages')

export function getPkgRoot(pkg = '') {
  return join(packagesRoot, pkg)
}

export async function cleanDist(pkg = '', distName = 'dist'): Promise<void> {
  const dist = join(getPkgRoot(pkg), distName)
  console.log(chalk.yellow(`cleaning ${dist}`))
  await remove(dist)
  console.log(chalk.yellow(`cleaning ${dist}`))
}

export async function build(
  { pkg = '', output = 'index.js', clean = true },
  config: RollupOptions = {},
): Promise<void> {
  const { output: outputConfigs, ...inputConfig } = getRollupConfig({ pkgRoot: getPkgRoot(pkg), output }, config)
  ;([outputConfigs] as OutputOptions[]).forEach(async outputConfig => {
    try {
      clean && cleanDist(pkg)
      const bundle = await rollup(inputConfig)

      console.log(chalk.yellow(`building package:${pkg}`))
      await bundle.write(outputConfig as OutputOptions)
      console.log(`Success: ${(outputConfig as OutputOptions).file}`)
    } catch (error) {
      console.log(chalk.red(error))
    }
  })
}
