module.exports = {
  presets: [
    '@vue/app',
    '@babel/preset-env'
  ],
  env: {
    test: {
      plugins: ['transform-es2015-modules-commonjs']
    }
  }
}
