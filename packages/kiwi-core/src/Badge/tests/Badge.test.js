import Badge from '../'
import { render } from '@/packages/kiwi-core/src/test-utils'

const renderComponent = (props) => {
  const base = {
    components: { Badge },
    template: `<Badge>500</Badge>`,
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
