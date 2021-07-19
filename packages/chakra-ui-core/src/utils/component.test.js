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
    const renderFakeComponent = ({ theme, ...props }) => {
      const inlineAttrs = (props && props.inlineAttrs) || ''
      return render({
        template: `<FakeComponent ${inlineAttrs} />`,
        components: {
          FakeComponent
        },
        provide: () => ({
          $chakraTheme: () => toCSSVar(theme),
          $chakraColorMode: () => 'light'
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
  })
})
