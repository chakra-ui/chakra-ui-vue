import Vue from 'vue'
import * as Chakra from '@chakra-ui/vue'
import theme from '@chakra-ui/theme-vue'
import { faGithub, faDiscord, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import {
  faBolt,
  faAnchor,
  faUniversalAccess,
  faCubes,
  faPalette,
  faGlobeAfrica,
  faEnvelope,
  faBars,
  faEdit,
  faSearch,
  faCoffee,
  faExternalLinkAlt,
  faCog
} from '@fortawesome/free-solid-svg-icons'
import Lorem from 'vue-lorem-ipsum'

const breakpoints = ['30em', '48em', '72em', '80em']

breakpoints.sm = breakpoints[0]
breakpoints.md = breakpoints[1]
breakpoints.lg = breakpoints[2]
breakpoints.xl = breakpoints[3]

const customTheme = {}

Vue.use(Chakra.default, {
  theme: {
    ...theme,
    breakpoints
  },
  extendTheme: customTheme,
  icons: {
    iconPack: 'fa',
    iconSet: {
      faGithub,
      faDiscord,
      faAnchor,
      faBolt,
      faUniversalAccess,
      faCubes,
      faPalette,
      faTwitter,
      faLinkedin,
      faGlobeAfrica,
      faEnvelope,
      faBars,
      faEdit,
      faSearch,
      faCoffee,
      faExternalLinkAlt,
      faCog
    },
    extend: {
      storybook: {
        path: `
          <path
            d="M188.665 39.127l1.527-36.716L220.884 0l1.322 37.863a2.387 2.387 0 01-3.864 1.96l-11.835-9.325-14.013 10.63a2.387 2.387 0 01-3.829-2.001zm-39.251 80.853c0 6.227 41.942 3.243 47.572-1.131 0-42.402-22.752-64.684-64.415-64.684-41.662 0-65.005 22.628-65.005 56.57 0 59.117 79.78 60.249 79.78 92.494 0 9.052-4.433 14.426-14.184 14.426-12.705 0-17.729-6.49-17.138-28.552 0-4.786-48.458-6.278-49.936 0-3.762 53.466 29.548 68.887 67.665 68.887 36.935 0 65.892-19.687 65.892-55.326 0-63.36-80.961-61.663-80.961-93.06 0-12.728 9.455-14.425 15.07-14.425 5.909 0 16.546 1.042 15.66 24.801z"
          />`
      }
    }
  }
})

Vue.component('Lorem', Lorem)

Object.keys(Chakra).forEach((key) => {
  if (typeof Chakra[key] === 'object' && Chakra[key].name) {
    Vue.component(Chakra[key].name, Chakra[key])
  }
})
