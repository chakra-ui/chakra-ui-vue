import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import ThemeProvider from './components/ThemeContext/index.js'

Vue.config.productionTip = false

new Vue({
  render: h => h(ThemeProvider, {}, [h(App)])
}).$mount('#app')
