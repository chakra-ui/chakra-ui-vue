import { configure, addDecorator, addParameters } from '@storybook/vue';
import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
import { ThemeProvider } from 'kiwi-core'
import theme from '../packages/kiwi-core/src/lib/theme'
import icons from '../packages/kiwi-core/src/lib/internal-icons'
import Kiwi from '../packages/kiwi-core/src/plugin'
import storyBookTheme from './theme'

Vue.use(VueCompositionAPI)
Vue.use(Kiwi)

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
