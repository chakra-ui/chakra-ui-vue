import Vue from 'vue'

// Bind theme and icons to prototype
Vue.prototype.$chakra = {
  theme: <%= JSON.stringify(options.theme, null, 2) %>,
  icons: <%= JSON.stringify(options.icons, null, 2) %>
}

if (process.client) {
  // Toast
  const useToast = require('@chakra-ui/vue/src/CToast').default
  Vue.prototype.$toast = useToast()

  // VScrollLock
  const VScrollLock = require('v-scroll-lock').default
  Vue.use(VScrollLock)
}
