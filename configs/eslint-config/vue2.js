module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  extends: ['./base', 'plugin:vue/recommended'],
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  plugins: ['vue'],
}
