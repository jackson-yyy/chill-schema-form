import * as fs from 'fs'
import path from 'path'

const Vue = loadModule('vue')
const VCA = loadModule('@vue/composition-api')

const distDir = path.resolve(__dirname, '../dist')

function checkVue() {
  if (!Vue || typeof Vue.version !== 'string') {
    console.warn('[@chill-schema-from] Vue is not found. Please run "npm install vue" to install.')
    return
  }
  if (!VCA) {
    console.warn(
      '[@chill-schema-from] Composition API plugin is not found. Please run "npm install @vue/composition-api" to install.',
    )
    return
  }

  if (Vue.version.startsWith('2.')) {
    copyFiles(2)
    console.log('[@chill-schema-from] using Vue v2.x')
  } else if (Vue.version.startsWith('3.')) {
    copyFiles(3)
    console.log('[@chill-schema-from] using Vue v3.x')
  } else {
    console.warn(`[@chill-schema-from] Vue version v${Vue.version} is not suppported.`)
  }
}

function loadModule(name: string) {
  try {
    return require(name)
  } catch (e) {
    return undefined
  }
}

function copyFiles(version: number) {
  const dir = path.join(distDir, `v${version}`)
  const files = fs.readdirSync(dir)
  files.forEach(file => {
    fs.writeFileSync(path.join(distDir, file), fs.readFileSync(path.join(dir, file), 'utf-8'))
  })
}

checkVue()
