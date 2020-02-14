import { configure, addDecorator, addParameters } from '@storybook/vue';
import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
import Kiwi, { ThemeProvider } from '../packages/kiwi-core/src'
import theme from '../packages/kiwi-core/src/lib/theme'
import icons from '../packages/kiwi-core/src/lib/internal-icons'
import storyBookTheme from './theme'

import {
  faBraille,
  faAnchor,
  faPlus,
  faUserSlash } from '@fortawesome/free-solid-svg-icons'

import {
  faChevronCircleUp,
  faSearch,
  faTimesCircle } from '@fortawesome/pro-light-svg-icons'

Vue.use(VueCompositionAPI)
Vue.use(Kiwi, {
  icons: {
    iconPack: 'fa',
    iconSet: {
      faBraille,
      faAnchor,
      faPlus,
      faUserSlash,
      faChevronCircleUp,
      faSearch,
      faTimesCircle
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
    <ThemeProvider :theme="theme" :icons="icons" color-mode="light">
      <story/>
    </ThemeProvider>
  `,
  data() {
    return {
      theme,
      icons
    }
  },
  components: { ThemeProvider }
}));

// automatically import all files ending in *.stories.js
configure(require.context('../stories', true, /\.stories\.js$/), module);
