function readPackage(pkg, context) {
  //
  if (pkg.name === 'vue-template-compiler') {
    pkg.dependencies = {
      ...pkg.dependencies,
      vue: '~2.6.14',
    }
    context.log('add vue@~2.6.14 to dependencies of vue-template-compiler')
  }

  if (pkg.name === '@chill-schema-form/vue-render') {
    let { 'vue-demi': vueDemi, ...dep } = pkg.dependencies
    pkg.dependencies = dep
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
