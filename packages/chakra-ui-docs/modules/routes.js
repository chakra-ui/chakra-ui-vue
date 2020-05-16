export default async function buildRoutes (options = {}) {
  this.options.build.additionalExtensions = ['mdx']

  if (this.options.extensions) {
    const extensions = this.options.extensions
    !extensions.includes('mdx') && extensions.push('mdx')

    this.options.build.additionalExtensions = ['mdx']

    this.extendBuild((config) => {
      if (config.resolve.extensions) {
        config.resolve.extensions.push('.mdx')
      } else {
        config.resolve.extensions = ['.mdx']
      }

      config.module.rules.push({
        test: /\.mdx$/,
        use: [
          'babel-loader',
          'mdx-vue-loader'
        ]
      })
    })
  }
}
