import Icon from '../'
import { render, defaultProviders } from '@/tests/test-utils'
import icons from '@/packages/chakra-ui-core/src/lib/internal-icons'

const renderComponent = (props) => {
  const base = {
    components: { Icon },
    provide: () => defaultProviders({ $icons: { add: icons.add } }),
    template: `<Icon name="add"></Icon>`,
    ...props
  }
  return render(base)
}

it('should render correctly', () => {
  const { asFragment } = renderComponent()

  expect(asFragment()).toMatchSnapshot()
})
