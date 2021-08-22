function readPackage(pkg, context) {
  // 保证vue-template-compiler能加载到vue@2.x
  if (pkg.name === 'vue-template-compiler') {
    pkg.dependencies = {
      ...pkg.dependencies,
      vue: '~2.6.14',
    }
    context.log('add vue@~2.6.14 to dependencies of vue-template-compiler')
  }

  if (/@chill-schema-form\/demo-vue[23]/.test(pkg.name)) {
    pkg.dependencies = {
      ...pkg.dependencies,
      'vue-demi': 'latest',
    }
  }

  return pkg
}

module.exports = {
  hooks: {
    readPackage,
  },
}
