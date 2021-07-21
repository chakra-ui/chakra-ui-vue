import defaultTheme from '@chakra-ui/theme-vue'
import { toCSSVar } from '@chakra-ui/styled-system'
import { createStyledAttrsMixin } from './components'
import { render } from '@/tests/test-utils'

describe('createStyledAttrsMixin', () => {
  const FakeComponent = {
    name: 'FakeComponent',
    mixins: [createStyledAttrsMixin('FakeComponent', true)],
    render (h) {
      return h(
        'div',
        {
          class: this.className,
          attrs: this.computedAttrs
        },
        'Fake component'
      )
    }
  }

  describe('baseStyle', () => {
    const renderFakeComponent = ({ theme, colorMode, ...props }) => {
      const inlineAttrs = (props && props.inlineAttrs) || ''
      return render({
        template: `<FakeComponent ${inlineAttrs} />`,
        components: {
          FakeComponent
        },
        provide: () => ({
          $chakraTheme: () => toCSSVar(theme),
          $chakraColorMode: () => colorMode || 'light'
        }),
        ...props
      })
    }

    it('should use theme.baseStyle if given', () => {
      const { asFragment } = renderFakeComponent({
        theme: {
          ...defaultTheme,
          baseStyle: {
            FakeComponent: {
              bg: 'red.400',
              color: 'gray.200'
            }
          }
        }
      })
      expect(asFragment()).toMatchSnapshot()
    })

    it('should be overiden by props', () => {
      const { asFragment } = renderFakeComponent({
        inlineAttrs: 'bg="blue.200"',
        theme: {
          ...defaultTheme,
          baseStyle: {
            FakeComponent: {
              bg: 'red.400',
              color: 'gray.200'
            }
          }
        }
      })
      expect(asFragment()).toMatchSnapshot()
    })

    it('should accept baseStyle as a function', () => {
      const theme = {
        ...defaultTheme,
        baseStyle: {
          FakeComponent: ({ colorMode, theme }) => ({
            bg: colorMode === 'light' ? 'red.400' : 'red.200',
            color: colorMode === 'light' ? 'black' : 'white',
            border: `2px solid ${
              colorMode === 'light'
                ? theme.color.blue[600]
                : theme.colors.blue[200]
            }`
          })
        }
      }

      // light mode
      const lightWrapper = renderFakeComponent({
        theme,
        colorMode: 'light',
        inlineAttrs: 'bg="blue.200"'
      })
      expect(lightWrapper.asFragment()).toMatchSnapshot()

      // dark mode
      const darkWrapper = renderFakeComponent({
        theme,
        colorMode: 'dark',
        inlineAttrs: 'bg="vue.200"'
      })
      expect(darkWrapper.asFragment()).toMatchSnapshot()
    })
  })
})
