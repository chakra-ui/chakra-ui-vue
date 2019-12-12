module.exports = {
  root: true,
  env: {
    node: true
  },
  plugins: [
    // 'vue-a11y'
  ],
  'extends': [
    'plugin:vue/essential',
    '@vue/standard',
    // 'plugin:vue-a11y/base'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
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
      files: [
        '**/__tests__/*.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
