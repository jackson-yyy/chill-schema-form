import chalk from 'chalk'
import { remove } from 'fs-extra'
import { join, resolve } from 'path'
import { OutputOptions, rollup, RollupOptions } from 'rollup'
import { getRollupConfig } from './base.config'
import dts from 'rollup-plugin-dts'

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
  { pkg = '', output = 'dist/index.js', clean = true, buildDeclaration = false },
  config: RollupOptions = {},
): Promise<void> {
  const configs = getRollupConfig({ pkg, output }, config)
  try {
    clean && cleanDist(pkg)
    for (let { output: outputConfigs, ...inputConfig } of configs) {
      const bundle = await rollup(inputConfig)

      console.log(chalk.yellow(`building package:${pkg}`))
      await bundle.write(outputConfigs as OutputOptions)
      console.log(`Success: ${(outputConfigs as OutputOptions).file}`)

      buildDeclaration && (await buildDts({ pkg }))
    }
  } catch (error) {
    console.log(chalk.red(error))
  }
}

export async function buildDts({ pkg = '', input = 'dist/index.d.ts', output = 'dist/index.d.ts' }) {
  const pkgRoot = getPkgRoot(pkg)

  const { output: outputConfigs, ...inputConfig } = {
    input: resolve(pkgRoot, input),
    plugins: [dts()],
    output: {
      file: resolve(pkgRoot, output),
      format: 'es',
    },
  }

  try {
    const bundle = await rollup(inputConfig)
    console.log(chalk.yellow(`building dts:${pkg}`))
    await bundle.write(outputConfigs as OutputOptions)
    console.log(`Success: ${outputConfigs.file}`)
  } catch (error) {
    console.log(chalk.red(error))
  }
}
