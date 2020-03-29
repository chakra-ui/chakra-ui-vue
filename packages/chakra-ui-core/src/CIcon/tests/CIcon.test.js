import CIcon from '..'
import { render, defaultProviders } from '@/tests/test-utils'
import icons from '@/packages/chakra-ui-core/src/lib/internal-icons'

const renderComponent = (props) => {
  const base = {
    components: { CIcon },
    provide: () => defaultProviders({ $chakraIcons: { add: icons.add } }),
    template: `<CIcon name="add"></CIcon>`,
    ...props
  }
  return render(base)
}

it('should render correctly', () => {
  const { asFragment } = renderComponent()

  expect(asFragment()).toMatchSnapshot()
})
