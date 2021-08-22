import execa from 'execa'
import { unlink, symlink } from 'fs/promises'
import path from 'path'

const nodeModulesRoot = path.resolve(__dirname, '..', 'node_modules')
const vueRoot = path.join(nodeModulesRoot, 'vue')

export async function switchVueVersion(version: string) {
  try {
    await unlink(vueRoot)
  } catch (error) {
    // empty block
  }

  if (!['2', '3'].includes(version)) {
    console.warn(`[@chill-schema-form/vue-render] Only support version 2 or 3, got ${version}`)
    return
  }

  await symlink(path.join(nodeModulesRoot, `vue${version}`), vueRoot, 'dir')

  await execa('vue-demi-switch', [version])

  console.log(`[@chill-schema-form/vue-render] Switched to Version ${version}`)
}

export async function fixVueVersion() {
  const packageJson = require('../package.json')
  const reg = /[^\d]?(\d).*/
  const vueVersion = packageJson.devDependencies.vue as string
  vueVersion.match(reg)

  switchVueVersion(RegExp.$1)
}
