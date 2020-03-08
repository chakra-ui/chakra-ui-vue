import Code from '../'
import { render } from '@/tests/test-utils'

const renderComponent = (props) => {
  const base = {
    components: { Code },
    template: `<Code>content</Code>`,
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

  expect(getByText('content')).toBeInTheDocument()
})
