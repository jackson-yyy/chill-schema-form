
import { join } from "path";
import { getRollupConfig } from './base.config';
import { rollup, RollupOptions, OutputOptions } from 'rollup'
import { remove } from "fs-extra";
import chalk from "chalk";

const projectRoot = join(__dirname, '../..')
const packagesRoot = join(projectRoot, 'packages')

function getPkgRoot (pkg = '') {
  return join(packagesRoot, pkg)
}

async function clean (pkg = '', distPath = 'dist'): Promise<void> {
  const dist = join(getPkgRoot(pkg), distPath)
  console.log(chalk.yellow(`cleaning ${dist}`))
  await remove(dist)
    .then(() => console.log(chalk.yellow(`cleaning ${dist}`)))
    .catch(err => console.log(chalk.red(err.msg)))
}

export async function build({
  pkg = '',
  iifeName = ''
}, config: RollupOptions = {}): Promise<void> {
  const {output: outputConfig, ...inputConfig} = getRollupConfig(getPkgRoot(pkg), iifeName, config)

  const bundle = await rollup(inputConfig);

  console.log(chalk.yellow(`building package:${pkg}`));
  (outputConfig as OutputOptions[]).forEach(async (outputOptions) => {
    await clean(pkg)
  
    await bundle.write(outputOptions)
      .catch(err => console.log(chalk.red(err.msg)))
  
    console.log(`Success: ${outputOptions.file}`);
  })
      
}

build({pkg: 'core', iifeName: 'ChillSchemaFormCore'})
build({pkg: 'vue2-render', iifeName: 'ChillSchemaFormVue2Render'})
build({pkg: 'vue3-render', iifeName: 'ChillSchemaFormVue3Render'})