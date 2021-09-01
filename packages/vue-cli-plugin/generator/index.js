const chakraPkg = require('@chakra-ui/vue/package.json')
const emotionPkg = require('@emotion/css/package.json')
const chakraLoaderPkg = require('chakra-loader/package.json')
const registerChakraVuePlugin = require('./helpers/register-chakra-vue-plugin')
const addChakraLoaderConfig = require('./helpers/add-chakra-loader-config')

module.exports = (api, options) => {
  api.extendPackage({
    dependencies: {
      '@chakra-ui/vue': `^${chakraPkg.version}`,
      '@emotion/css': `^${emotionPkg.version}`
    }
  })

  if (options.addChakraLoader) {
    api.extendPackage({
      devDependencies: {
        'chakra-loader': `^${chakraLoaderPkg.version}`
      }
    })
  }

  api.injectImports(api.entryFile, 'import Chakra from \'@chakra-ui/vue\'')

  api.render('./template', {
    hasVueRouter: options.hasVueRouter,
    hasChakraLoader: options.addChakraLoader
  })
  api.onCreateComplete(() => {
    registerChakraVuePlugin(api)

    if (options.addChakraLoader) {
      addChakraLoaderConfig(api)
    }
  })

  api.exitLog('Chakra UI Vue is ready')
  api.exitLog('Join the community on Discord - https://discord.gg/Tv8Jca')
}
