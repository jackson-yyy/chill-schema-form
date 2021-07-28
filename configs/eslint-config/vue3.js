module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  extends: ['./base', 'plugin:vue/vue3-recommended'],
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  plugins: ['vue'],
}
