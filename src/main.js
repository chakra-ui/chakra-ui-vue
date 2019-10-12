import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
// import { provideTheme } from '@/lib/utils'
import Kiwi from './lib/plugin'

Vue.config.productionTip = false

Vue.use(Kiwi)

new Vue({
  // Provide theme to the root of the application
  // render: h => provideTheme(h, App)
  render: h => h(App)
}).$mount('#app')
