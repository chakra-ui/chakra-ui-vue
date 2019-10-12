import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import Kiwi from './lib/plugin'

Vue.config.productionTip = false

// Install Kiwi plugin
Vue.use(Kiwi)

new Vue({
  // Alternative way to provide theme would be to import { provideTheme } from utils and provide it with render function
  // Provide theme to the root of the application
  // render: h => provideTheme(h, App)
  render: h => h(App)
}).$mount('#app')
