import Vue from 'vue'
import { createClientDirective } from '@chakra-ui/vue/src/directives'
import { localColorModeObserver as colorModeObserver, mode } from '@chakra-ui/vue'
import { toCSSVar } from '@chakra-ui/styled-system'
import { mergeWith as merge } from '@chakra-ui/utils'
import defaultTheme from '@chakra-ui/theme-vue'


const extendTheme = <%= (function() {
  // keep a list of serialized functions
  const functions = []

  // json replacer - returns a placeholder for functions
  const jsonReplacer = (key, val) => {
    if (typeof val === 'function') {
      functions.push(val.toString())
      return "{func_" + (functions.length - 1) + "}"
    }
    return val
  };

  // regex replacer - replaces placeholders with functions
  const funcReplacer = (match, id) => {
    return functions[id]
  }

  const result = JSON
    .stringify(options.extendTheme || {}, jsonReplacer, 2)
    .replace(/"\{func_(\d+)\}"/g, funcReplacer)

  return result
})() %>

// Recursively merge extended theme variables
const mergedTheme = toCSSVar(merge(defaultTheme, extendTheme))

Vue.prototype.$chakra = {
  theme: mergedTheme,
  icons: <%= JSON.stringify(options.icons, null, 2) %>
}

Vue.mixin({
  computed: {
    chakraColorMode () {
      return colorModeObserver.colorMode
    },
    chakraTheme () {
      return colorModeObserver.theme
    },
    chakraToggleColorMode () {
      return colorModeObserver.toggleColorMode
    },
    $mode: vm => (lightValue, darkValue) => mode(lightValue, darkValue, colorModeObserver)
  }
})

Vue.directive('chakra', createClientDirective(mergedTheme))

if (process.client) {
  // Toast
  const useToast = require('@chakra-ui/vue/src/CToast').default
  Vue.prototype.$toast = useToast()

  // VScrollLock
  const VScrollLock = require('v-scroll-lock').default
  Vue.use(VScrollLock)
}
