import CHeading from '..'
import { render } from '@/tests/test-utils'

const renderComponent = (props) => {
  const base = {
    components: { CHeading },
    template: '<CHeading>Header</CHeading>',
    ...props
  }
  return render(base)
}

it('should render correctly', () => {
  const { asFragment } = renderComponent()

  expect(asFragment()).toMatchSnapshot()
})
