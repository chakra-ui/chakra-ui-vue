module.exports = {
  root: true,
  env: {
    node: true
  },
  plugins: [
    'testing-library',
    '@emotion'
  ],
  extends: [
    'plugin:vue/essential',
    '@vue/standard',
    '@nuxtjs',
    'plugin:testing-library/recommended',
    'plugin:testing-library/vue'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    curly: 'off',
    'testing-library/no-debug': 'error',
    'testing-library/prefer-screen-queries': 'error',
    'testing-library/await-fire-event': 'error',
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
        ignoredNodes: [
          'TemplateLiteral'
        ]
      }
    ],
    'template-curly-spacing': 0,
    '@emotion/pkg-renaming': 'error'
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  globals: {
    describe: false,
    expect: false,
    it: false
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/*.{j,t}s?(x)'],
      env: {
        jest: true
      }
    }
  ]
}
