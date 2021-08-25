import Vue from 'vue'
import { createClientDirective } from '@chakra-ui/vue/src/directives'
import { colorModeObserver } from '@chakra-ui/vue/src/utils'
import { toCSSVar } from '@chakra-ui/styled-system'
import { mergeWith as merge } from '@chakra-ui/utils'
import defaultTheme from '@chakra-ui/theme-vue'


const extendTheme = <%= JSON.stringify(options.extendTheme || {}, null, 2) %>

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
