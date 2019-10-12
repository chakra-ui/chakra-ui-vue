import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import { provideTheme } from '@/lib/utils'

Vue.config.productionTip = false

new Vue({
  // Provide theme to the root of the application
  render: h => provideTheme(h, App)
}).$mount('#app')
