import { injectGlobal } from 'vue-styled-components'
import { onMounted } from '@vue/composition-api'
import { useColorMode, useTheme } from '../ThemeProvider'
import { useTailwindPreflight } from './preflight'
// import canUseDOM from 'can-use-dom'

const defaultConfig = theme => ({
  light: {
    color: theme.colors.gray[800],
    bg: undefined,
    borderColor: theme.colors.gray[200],
    placeholderColor: theme.colors.gray[400]
  },
  dark: {
    color: theme.colors.whiteAlpha[900],
    bg: theme.colors.gray[800],
    borderColor: theme.colors.whiteAlpha[300],
    placeholderColor: theme.colors.whiteAlpha[400]
  }
})

export default {
  name: 'CSSReset',
  props: {
    config: Object
  },
  setup (props) {
    const colorMode = useColorMode()
    const { theme } = useTheme()
    const _defaultConfig = defaultConfig(theme.value)

    const _config = props.config
      ? props.config(theme.value, _defaultConfig)
      : defaultConfig(theme.value)
    const { color, bg, borderColor, placeholderColor } = _config[colorMode]

    /**
     * Commmented out because I still need some information about buttons
     * in Firefox and Safari on MacOS. Maybe it's intentional that when you click a button,
     * It by default doesn not become the active element.
     */
    // const focusFirefoxButtonsOnClick = () => {
    //   document.addEventListener('click', function (event) {
    //     if (event.target.matches('button')) {
    //       event.target.focus()
    //     }
    //   })
    // }

    onMounted(() => {
      // canUseDOM && focusFirefoxButtonsOnClick()
      useTailwindPreflight(theme)
      injectGlobal`
      html {
        line-height: 1.5;
        color: ${color};
        background-color: ${bg};
      }

      *,
      *::before,
      *::after {
        border-width: 0;
        border-style: solid;
        border-color: ${borderColor};
      }

      input:-ms-input-placeholder,
      textarea:-ms-input-placeholder {
        color: ${placeholderColor};
      }

      input::-ms-input-placeholder,
      textarea::-ms-input-placeholder {
        color: ${placeholderColor};
      }

      input::placeholder,
      textarea::placeholder {
        color: ${placeholderColor};
      }
    `
    })

    return () => {
      return null
    }
  }
}
