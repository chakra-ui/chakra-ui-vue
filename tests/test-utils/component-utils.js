import * as vtu from '@vue/test-utils'

import defaultProviders from './providers-mock'

const mount = (component, config = {}) => {
  const { provide = {} } = config

  return vtu.mount(component, { ...config, provide: defaultProviders(provide) })
}

export * from '@vue/test-utils'
export { mount }
