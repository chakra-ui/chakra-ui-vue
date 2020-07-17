export default function (options = {}) {
  // Add 'mdx' to build extensions
  this.options.build.additionalExtensions = ['mdx']

  if (this.options.extensions) {
    // Add `mdx` to `extensions` option
    const extensions = this.options.extensions
    !extensions.includes('mdx') && extensions.push('mdx')

    // Add 'mdx' to `build.additionalExtensions`
    this.options.build.additionalExtensions = ['mdx']

    // Extend webpack config
    this.extendBuild((config) => {
      // Here we '.mdx' to webpack's `resolve.extensions` option.
      if (config.resolve.extensions) {
        config.resolve.extensions.push('.mdx')
      } else {
        config.resolve.extensions = ['.mdx']
      }

      // Use `@mdx-js/vue-loader` for `.mdx` files.
      config.module.rules.push({
        test: /\.mdx$/,
        use: [
          'babel-loader',
          '@mdx-js/vue-loader'
        ]
      })
    })
  }
}
