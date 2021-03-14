import { CGrid } from '..'
import { render } from '@/tests/test-utils'

const renderComponent = (props) => {
  const inlineAttrs = (props && props.inlineAttrs) || ''
  const base = {
    components: { CGrid },
    template: `<CGrid ${inlineAttrs}>Grid Me</CGrid>`,
    ...props
  }
  return render(base)
}

it('should render correctly', () => {
  const { asFragment } = renderComponent()

  expect(asFragment()).toMatchSnapshot()
})

it('should change gap', () => {
  const inlineAttrs = 'w="600px" template-columns="repeat(5, 1fr)" gap="6"'
  const { asFragment } = renderComponent({ inlineAttrs })

  expect(asFragment()).toMatchSnapshot()
})
