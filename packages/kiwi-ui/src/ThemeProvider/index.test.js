import { shallowMount } from '@vue/test-utils'
import ThemeProvider from '../ThemeProvider'
import Theme from '../../../kiwi.config'

describe('===== ThemeProvider Component =====', () => {
  let themeProvider
  const ChildComponent = {
    inject: ['$theme', '$colorMode'],
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

  it('should provide theme & default color mode to child components', () => {
    themeProvider = shallowMount(ThemeProvider, {
      slots: {
        default: [ChildComponent]
      },
      propsData: {
        theme: Theme,
        colorMode: 'light'
      }
    })
    expect(themeProvider.find(ChildComponent).vm.$theme()).toBe(Theme)
    expect(themeProvider.find(ChildComponent).vm.$colorMode).toBe('light')
  })
})
