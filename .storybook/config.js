import { configure, addDecorator } from '@storybook/vue';
import ThemeProvider from '../src/components/ThemeProvider'
import theme from '../src/lib/theme'
import icons from '../src/lib/plugin/iconsPaths'

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
