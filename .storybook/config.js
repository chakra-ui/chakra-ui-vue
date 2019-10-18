import { configure, addDecorator } from '@storybook/vue';
import ThemeProvider from '../src/components/ThemeProvider'
import theme from '../src/lib/theme'

addDecorator(() => ({
  template: `
    <ThemeProvider :theme="theme" color-mode="light">
      <story/>
    </ThemeProvider>
  `,
  data() {
    return {
      theme
    }
  },
  components: { ThemeProvider }
}));

// automatically import all files ending in *.stories.js
configure(require.context('../stories', true, /\.stories\.js$/), module);
