import { configure, addDecorator } from '@storybook/vue';
import Vue from 'vue'
import ThemeProvider from 'kiwi'
import theme from '../src/lib/theme'
import icons from '../src/lib/plugin/iconsPaths'
import Kiwi from '../src/lib/plugin'

Vue.use(Kiwi)

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
