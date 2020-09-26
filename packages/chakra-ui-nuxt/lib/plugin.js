import Vue from 'vue'
import { createClientDirective } from '@chakra-ui/vue/src/directives'

const theme = <%= JSON.stringify(options.theme, null, 2) %>

Vue.prototype.$chakra = {
  theme,
  icons: <%= JSON.stringify(options.icons, null, 2) %>
}

Vue.directive('chakra', createClientDirective(theme))

if (process.client) {
  // Toast
  const useToast = require('@chakra-ui/vue/src/CToast').default
  Vue.prototype.$toast = useToast()

  // VScrollLock
  const VScrollLock = require('v-scroll-lock').default
  Vue.use(VScrollLock)
} 
