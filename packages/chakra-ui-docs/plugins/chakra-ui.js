import Vue from 'vue'
import Kiwi from 'chakra-ui-core'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

Vue.use(Kiwi, {
  icons: {
    iconPack: 'fa',
    iconSet: {
      faGithub
    }
  }
})
