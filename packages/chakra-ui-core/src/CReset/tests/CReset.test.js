import CReset from '../'
import { render } from '@/tests/test-utils'

const renderComponent = (props) => {
  const inlineAttrs = (props && props.inlineAttrs) || ''
  const base = {
    components: { CReset },
    template: `<CReset data-testid="reset" ${inlineAttrs} />`,
    ...props
  }
  return render(base)
}

describe('CReset.vue', () => {
  it('should render correctly', () => {
    const { asFragment } = renderComponent()

    expect(asFragment()).toMatchSnapshot()
  })

  it('should inject global styles', () => {
    renderComponent()

    expect(document.head).toMatchSnapshot()
  })

  it('should accept config prop', () => {
    const inlineAttrs = ':config="cssResetConfig"'
    const cssResetConfig = (_, defaults) => {
      const { light } = defaults
      return {
        ...defaults, light: { ...light, bg: 'pink', color: 'indigo', fontFamily: "'Comic Sans MS'" }
      }
    }

    renderComponent({ inlineAttrs, methods: { cssResetConfig } })

    expect(document.head).toMatchSnapshot()
  })
})
