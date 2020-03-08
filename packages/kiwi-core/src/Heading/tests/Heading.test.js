import Heading from '../'
import { render } from '@/tests/test-utils'

const renderComponent = (props) => {
  const base = {
    components: { Heading },
    template: `<Heading>Header</Heading>`,
    ...props
  }
  return render(base)
}

it('should render correctly', () => {
  const { asFragment } = renderComponent()

  expect(asFragment()).toMatchSnapshot()
})
