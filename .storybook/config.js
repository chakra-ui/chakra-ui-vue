import { configure, addDecorator, addParameters } from '@storybook/vue';
import Vue from 'vue'
import Kiwi, { ThemeProvider, ColorModeProvider, CSSReset } from '../packages/chakra-ui-core/src'
import Canvas from '../src/components/Canvas.vue'
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
  faCog } from '@fortawesome/free-solid-svg-icons'

import {
  faChevronCircleUp,
  faSearch,
  faTimesCircle } from '@fortawesome/pro-light-svg-icons'

import {
  faGithub
} from '@fortawesome/free-brands-svg-icons'

Vue.use(Kiwi, {
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
      faCog
    }
  }
})

addParameters({
  options: {
   theme: storyBookTheme
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
  components: { ThemeProvider, ColorModeProvider, CSSReset, Canvas }
}));

// automatically import all files ending in *.stories.js
configure(require.context('../stories', true, /\.stories\.js$/), module);
