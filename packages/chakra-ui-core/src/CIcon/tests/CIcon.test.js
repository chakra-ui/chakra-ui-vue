import CIcon from '..'
import { render } from '@/tests/test-utils'

const renderComponent = (props) => {
  const base = {
    components: { CIcon },
    template: '<CIcon name="add"></CIcon>',
    ...props
  }
  return render(base)
}

it('should render correctly', () => {
  const { asFragment } = renderComponent()

  expect(asFragment()).toMatchSnapshot()
})
