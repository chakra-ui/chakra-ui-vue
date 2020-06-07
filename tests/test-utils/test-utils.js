import '@testing-library/jest-dom/extend-expect'
import * as vtl from '@testing-library/vue'
import userEvent from '@testing-library/user-event'

import icons from '@/packages/chakra-ui-core/src/lib/internal-icons'
import theme from '@/packages/chakra-ui-core/src/lib/theme'
const defaultProviders = options => ({
  $chakraTheme: () => theme,
  $chakraColorMode: () => 'light',
  $chakraIcons: icons,
  ...options
})

const render = (component, ...rest) => {
  const defaults = {
    provide: () => defaultProviders()
  }
  const utils = vtl.render({ ...defaults, ...component }, ...rest)
  return {
    ...utils,
    asFragment: (innerHTML = utils.container.innerHTML) => {
      if (typeof document.createRange === 'function') {
        return document
          .createRange()
          .createContextualFragment(innerHTML)
      }

      const template = document.createElement('template')
      template.innerHTML = innerHTML
      return template.content
    }
  }
}

function waitMs (ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export * from '@testing-library/vue'
export {
  render,
  userEvent,
  waitMs,
  defaultProviders
}
