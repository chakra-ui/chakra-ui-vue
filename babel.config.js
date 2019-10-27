module.exports = {
  presets: [
    '@vue/app',
    '@babel/preset-env'
  ],
  env: {
    development: {
      plugins: ['transform-es2015-modules-commonjs']
    },
    test: {
      plugins: ['transform-es2015-modules-commonjs']
    }
  }
}
