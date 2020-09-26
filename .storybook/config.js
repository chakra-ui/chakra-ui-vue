import { configure, addDecorator, addParameters } from '@storybook/vue';
import Vue from 'vue'
import VueLive from 'vue-live'
import Lorem from 'vue-lorem-ipsum'
import Chakra from '../packages/chakra-ui-core/src'
import Canvas from './components/Canvas.vue'
import storyBookTheme from './theme'

import {
  faBraille,
  faAnchor,
  faPlus,
  faCoffee,
  faAmbulance,
  faCalendar,
  faCar,
  faCaretLeft,
  faBolt,
  faUserSlash,
  faCheckCircle,
  faCog,
  faLock,
  faEye,
  faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import {
  faChevronCircleUp,
  faSearch,
  faTimesCircle } from '@fortawesome/pro-light-svg-icons'

import {
  faGithub
} from '@fortawesome/free-brands-svg-icons'

import {
  faDiscord
} from '@fortawesome/free-brands-svg-icons'

Vue.use(Chakra, {
  extendTheme: {
    fonts: {
      heading: "'Comic Sans MS'",
      body: "'Comic Sans MS'",
      monospace: "'Comic Sans MS'"
    }
  },
  icons: {
    iconPack: 'fa',
    iconSet: {
      faBraille,
      faAnchor,
      faPlus,
      faCoffee,
      faAmbulance,
      faCalendar,
      faCar,
      faCaretLeft,
      faBolt,
      faUserSlash,
      faChevronCircleUp,
      faSearch,
      faTimesCircle,
      faGithub,
      faDiscord,
      faCheckCircle,
      faCog,
      faLock,
      faEye,
      faEyeSlash
    }
  }
})

addParameters({
  options: {
   theme: storyBookTheme,
   storySort: (a, b) =>
      a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
 }
})

addDecorator(() => ({
  template: `
    <Canvas>
      <story/>
    </Canvas>
  `,
  components: { Canvas }
}));

// For playground
Vue.use(VueLive)

Vue.component('Lorem', Lorem)

function loadStories() {
  const req = require.context('../packages/chakra-ui-core/src', true, /\.stories\.(js|mdx)$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
