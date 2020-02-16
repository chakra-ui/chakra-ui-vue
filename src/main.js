import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import Kiwi from '../packages/kiwi-core/dist/esm'
import theme from '../packages/kiwi-core/src/lib/theme'

// Import FA Icons
import { faCoffee,
  faAmbulance,
  faCalendar,
  faCar,
  faBraille,
  faCaretLeft,
  faAnchor,
  faPlus,
  faUserSlash,
  faBolt,
  faSignInAlt,
  faEnvelope,
  faEyeSlash,
  faEye,
  faLock } from '@fortawesome/free-solid-svg-icons'

import {
  faChevronCircleUp,
  faSearch,
  faTimesCircle } from '@fortawesome/pro-light-svg-icons'

import {
  faGithub
} from '@fortawesome/free-brands-svg-icons'

Vue.config.productionTip = false

// Install Kiwi plugin
Vue.use(Kiwi, {
  theme,
  icons: {
    iconPack: 'fa',
    iconSet: {
      faCalendar,
      faCar,
      faCoffee,
      faBraille,
      faAmbulance,
      faCaretLeft,
      faAnchor,
      faChevronCircleUp,
      faTimesCircle,
      faSearch,
      faPlus,
      faGithub,
      faUserSlash,
      faBolt,
      faSignInAlt,
      faEnvelope,
      faEyeSlash,
      faEye,
      faLock
    },
    extend: {
      'not-allowed': {
        path: `
          <path
            fill="currentColor"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31C15.55 19.37 13.85 20 12 20zm6.31-3.1L7.1 5.69C8.45 4.63 10.15 4 12 4c4.42 0 8 3.58 8 8 0 1.85-.63 3.55-1.69 4.9z"
          />
        `
      }
    }
  }
})

new Vue({
  render: h => h(App)
}).$mount('#app')
