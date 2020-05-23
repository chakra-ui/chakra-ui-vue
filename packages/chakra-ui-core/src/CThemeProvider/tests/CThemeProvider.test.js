import { shallowMount } from '@vue/test-utils'
import theme from '../../../../chakra-ui-theme/src'
import CThemeProvider from '..'

describe('===== CThemeProvider Component =====', () => {
  let themeProvider
  const ChildComponent = {
    inject: ['$chakraTheme', '$chakraColorMode'],
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
    expect(themeProvider.find(ChildComponent).vm.$chakraTheme()).toBe(theme)
    expect(themeProvider.find(ChildComponent).vm.$chakraColorMode()).toBe('light')
  })
})
