import CDivider from '..'
import { render } from '@/tests/test-utils'

const renderComponent = (props) => {
  const inlineAttrs = (props && props.inlineAttrs) || ''
  const base = {
    components: { CDivider },
    template: `<CDivider data-testid="divider" ${inlineAttrs} />`,
    ...props
  }
  return render(base)
}

it('should render correctly', () => {
  const { asFragment } = renderComponent()

  expect(asFragment()).toMatchSnapshot()
})

it('should change orientation', () => {
  const inlineAttrs = 'orientation="vertical"'
  const { asFragment } = renderComponent({ inlineAttrs })

  expect(asFragment()).toMatchSnapshot()
})

it('should have corresponding aria-orientation attribute', () => {
  const inlineAttrs = 'orientation="horizontal"'
  const { asFragment, getByTestId } = renderComponent({ inlineAttrs })

  const divider = getByTestId('divider')
  expect(divider).toHaveAttribute('aria-orientation', 'horizontal')
  expect(asFragment()).toMatchSnapshot()
})
