import theme from './utils/theme'
import chakraNuxtModule from '..'

export default {
  rootDir: __dirname,
  modules: [
    chakraNuxtModule
  ],
  chakra: {
    extendTheme: theme
  }
}
