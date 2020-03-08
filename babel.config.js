module.exports = {
  presets: [
    '@vue/app',
    '@babel/preset-env',
    '@vue/babel-preset-jsx'
  ],
  env: {
    test: {
      plugins: ['transform-es2015-modules-commonjs']
    }
  }
}
