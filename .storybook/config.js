import { configure, addDecorator, addParameters } from '@storybook/vue';
import Vue from 'vue'
import Chakra, { CThemeProvider, CColorModeProvider, CReset } from '../packages/chakra-ui-core/src'
import Canvas from './components/Canvas.vue'
import theme from '../packages/chakra-ui-core/src/lib/theme'
import icons from '../packages/chakra-ui-core/src/lib/internal-icons'
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

Vue.use(Chakra, {
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
    <Canvas :theme="theme">
      <story/>
    </Canvas>
  `,
  data() {
    return {
      theme,
    }
  },
  components: { CThemeProvider, CColorModeProvider, CReset, Canvas }
}));


function loadStories() {
  const req = require.context('../packages/chakra-ui-core/src', true, /\.stories\.(js|mdx)$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
