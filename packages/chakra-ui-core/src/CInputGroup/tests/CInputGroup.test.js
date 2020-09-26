import { CInputGroup, CInputLeftElement, CInputRightElement, CInput, CIcon } from '../..'
import { render } from '@/tests/test-utils'

const renderComponent = (props) => {
  const base = {
    data: () => ({ text: 'hello' }),
    components: { CInputGroup, CInputLeftElement, CInputRightElement, CInput, CIcon },
    template: `
      <c-input-group>
        <c-input-left-element color="gray.300" fontSize="1.2em">¥</c-input-left-element>
        <c-input placeholder="Enter amount" />
        <c-input-right-element><c-icon name="check" color="green.500" /></c-input-right-element>
      </c-input-group>
    `,
    ...props
  }
  return render(base)
}

test('should render correctly', () => {
  const { asFragment } = renderComponent()
  expect(asFragment()).toMatchSnapshot()
})
