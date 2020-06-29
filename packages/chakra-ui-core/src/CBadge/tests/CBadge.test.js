import { CBadge, CStack } from '../..'
import { render } from '@/tests/test-utils'

const renderComponent = (props) => {
  const base = {
    components: { CBadge, CStack },
    template: '<CBadge>500</CBadge>',
    ...props
  }
  return render(base)
}

it('should render correctly', () => {
  const { asFragment } = renderComponent()
  expect(asFragment()).toMatchSnapshot()
})

it('should display children', () => {
  const { getByText } = renderComponent()

  expect(getByText('500')).toBeInTheDocument()
})

it('should apply variant styles corectly', () => {
  const { asFragment } = renderComponent({
    template: `
      <c-stack is-inline>
        <c-badge mx="2" variant="subtle" variant-color="green">Subtle</c-badge>
        <c-badge mx="2" variant="solid" variant-color="green">Solid</c-badge>
        <c-badge mx="2" variant="outline" variant-color="green">Outline</c-badge>
      </c-stack>
    `
  })

  expect(asFragment()).toMatchSnapshot()
})
