import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import Kiwi from './lib/plugin'

Vue.config.productionTip = false

// Install Kiwi plugin
Vue.use(Kiwi, {
  theme: {
    primary: 'hsl(209, 100%, 50%)',
    secondary: 'hsl(278, 100%, 69%)',
    success: 'hsl(160, 100%, 43%)',
    warning: 'hsl(40, 100%, 50%)',
    danger: 'hsl(350, 100%, 56%)',
    light: 'hsl(208, 100%, 94%)',
    dark: 'hsl(221, 15%, 29%)'
  }
})

new Vue({
  // Alternative way to provide theme would be to import { provideTheme } from utils and provide it with render function
  // Provide theme to the root of the application
  // render: h => provideTheme(h, App)
  render: h => h(App)
}).$mount('#app')
