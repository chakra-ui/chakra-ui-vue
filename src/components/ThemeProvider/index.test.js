import { shallowMount } from '@vue/test-utils'
import ThemeProvider from '../ThemeProvider'
import Theme from '../../../kiwi.config'

describe('===== ThemeProvider Component =====', () => {
  let themeProvider
  const ChildComponent = {
    inject: ['KiwiTheme'],
    render: h => h('div', {})
  }

  it('should be a Vue component', () => {
    themeProvider = shallowMount(ThemeProvider, {
      slots: {
        default: [ChildComponent]
      }
    })
    expect(themeProvider.isVueInstance()).toBeTruthy()
  })

  it('should provide theme to child components', () => {
    themeProvider = shallowMount(ThemeProvider, {
      slots: {
        default: [ChildComponent]
      }
    })
    expect(themeProvider.find(ChildComponent).vm.KiwiTheme).toBe(Theme)
  })
})
