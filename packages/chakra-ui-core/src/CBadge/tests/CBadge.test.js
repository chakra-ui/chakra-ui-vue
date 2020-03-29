import CBadge from '../'
import { render } from '@/tests/test-utils'

const renderComponent = (props) => {
  const base = {
    components: { CBadge },
    template: `<CBadge>500</CBadge>`,
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
