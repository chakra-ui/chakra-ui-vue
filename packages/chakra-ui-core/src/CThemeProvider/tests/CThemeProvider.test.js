import { shallowMount } from '@vue/test-utils'
import CThemeProvider from '..'
import theme from '../../../../chakra-ui-theme/src'

describe('===== CThemeProvider Component =====', () => {
  let themeProvider
  const ChildComponent = {
    inject: ['$theme', '$colorMode'],
    render: h => h('div', {})
  }

  it('should be a Vue component', () => {
    themeProvider = shallowMount(CThemeProvider, {
      mocks: {
        $chakra: {
          theme
        }
      },
      slots: {
        default: [ChildComponent]
      }
    })
    expect(themeProvider.isVueInstance()).toBeTruthy()
  })

  it('should provide theme & default color mode to child components', () => {
    themeProvider = shallowMount(CThemeProvider, {
      slots: {
        default: [ChildComponent]
      },
      mocks: {
        $chakra: {
          theme
        }
      },
      propsData: {
        theme
      }
    })
    expect(themeProvider.find(ChildComponent).vm.$theme()).toBe(theme)
    expect(themeProvider.find(ChildComponent).vm.$colorMode()).toBe('light')
  })
})
