import { CButton, CButtonGroup } from '../..'
import { render, defaultProviders } from '@/tests/test-utils'

// mocks
jest.mock('breadstick/dist/components/Alert/styles.css', () => ({})) // jest tries to import styles and fails...

const renderComponent = (props) => {
  const base = {
    components: {
      CButton,
      CButtonGroup
    },
    provide: () => defaultProviders(),
    template: `
    <CButtonGroup>
      <CButton>Button1</CButton>
      <CButton>Button2</CButton>
    </CButtonGroup>`,
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
  expect(getByText('Button1')).toBeInTheDocument()
  expect(getByText('Button2')).toBeInTheDocument()
})
