import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/vue'

import theme from '@/packages/chakra-ui-core/src/lib/theme'

const defaultProviders = (options) => ({
  $theme: () => theme,
  $colorMode: () => 'light',
  $icons: {},
  ...options
})

const customRender = (component, ...rest) => {
  const defaults = {
    provide: () => defaultProviders()
  }
  const utils = render({ ...defaults, ...component }, ...rest)
  return {
    ...utils,
    asFragment: () => {
      if (typeof document.createRange === 'function') {
        return document
          .createRange()
          .createContextualFragment(utils.container.innerHTML)
      }

      const template = document.createElement('template')
      template.innerHTML = utils.container.innerHTML
      return template.content
    }
  }
}

export { default as userEvent } from '@testing-library/user-event'
export { fireEvent } from '@testing-library/vue'
export {
  customRender as render,
  defaultProviders
}
