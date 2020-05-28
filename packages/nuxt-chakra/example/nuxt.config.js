import theme from './utils/theme'
import chakraNuxtModule from '..'

export default {
  rootDir: __dirname,
  srcDir: __dirname,
  modules: [
    chakraNuxtModule
  ],
  chakra: {
    extendTheme: theme
  }
}
