module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  rules: {
    'comment-empty-line-before': null,
    'declaration-empty-line-before': null,
    'function-name-case': ['lower', { ignoreFunctions: ['/colorPalette/'] }],
    'no-invalid-double-slash-comments': null,
    'no-descending-specificity': null,
  },
}
