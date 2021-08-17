module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  extends: ['./base', 'plugin:vue/vue3-recommended', '@vue/prettier'],
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  plugins: ['vue'],
}
