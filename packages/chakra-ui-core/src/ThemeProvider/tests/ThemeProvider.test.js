import { shallowMount } from '@vue/test-utils'
import ThemeProvider from '../../ThemeProvider'
import theme from '../../../../chakra-ui-theme/src'

describe('===== ThemeProvider Component =====', () => {
  let themeProvider
  const ChildComponent = {
    inject: ['$theme'],
    render: h => h('div', {})
  }

  it('should be a Vue component', () => {
    themeProvider = shallowMount(ThemeProvider, {
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
    themeProvider = shallowMount(ThemeProvider, {
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
  })
})
