module.exports = {
  extends: ['alloy', 'alloy/typescript'],
  rules: {
    'no-console': 'warn',
    // For ts bug
    'no-undef': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-undef': 'off',
    '@typescript-eslint/no-use-before-define': [
      'error',
      {
        variables: false,
        functions: false,
        classes: false
      }
    ],
    '@typescript-eslint/no-duplicate-imports': 'off'
  }
}
