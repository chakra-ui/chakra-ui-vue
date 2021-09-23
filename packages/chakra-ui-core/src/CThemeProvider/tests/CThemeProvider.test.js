import { toCSSVar } from '@chakra-ui/styled-system'
import { mount, shallowMount } from '@vue/test-utils'
import theme from '@chakra-ui/theme-vue'
import CThemeProvider from '..'
import { getElementStyles } from '@/tests/test-utils'

describe('CThemeProvider', () => {
  const ChildComponent = {
    inject: ['$chakraTheme', '$chakraColorMode'],
    render: h => h('div', {})
  }

  it('should be a Vue component', () => {
    const themeProvider = shallowMount(CThemeProvider, {
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
    const themeProvider = shallowMount(CThemeProvider, {
      mocks: {
        $chakra: {
          theme
        }
      },
      slots: {
        default: [ChildComponent]
      }
    })
    expect(themeProvider.find(ChildComponent).vm.$chakraTheme()).toBe(theme)
    expect(themeProvider.find(ChildComponent).vm.$chakraColorMode()).toBe('light')
  })

  it('should inject global Css variables to root', () => {
    const rootKey = ':root'

    mount(CThemeProvider, {
      props: {
        rootKey
      },
      mocks: {
        $chakra: {
          theme: toCSSVar(theme)
        }
      },
      slots: {
        default: [ChildComponent]
      }
    })

    const root = document.querySelector(rootKey)
    expect(getElementStyles(root)).toMatchSnapshot()
  })
})
