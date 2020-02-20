import { inject, computed } from '@vue/composition-api'

const ThemeProvider = {
  name: 'ThemeProvider',
  props: {
    theme: {
      type: Object,
      default: () => null
    },
    icons: {
      type: Object,
      required: false
    }
  },
  provide () {
    return {
      $theme: () => this.theme,
      $icons: this.icons
    }
  },
  render () {
    return this.$slots.default
  }
}

export function useTheme () {
  const $theme = inject('$theme')
  const theme = computed(() => $theme())
  return {
    theme
  }
}

export function useColorMode () {
  const $colorMode = inject('$colorMode')
  const colorMode = computed(() => $colorMode())
  return colorMode
}

export default ThemeProvider
