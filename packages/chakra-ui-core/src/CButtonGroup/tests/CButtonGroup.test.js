import { CButton, CButtonGroup } from '../..'
import { render } from '@/tests/test-utils'

const renderComponent = (props) => {
  const base = {
    components: {
      CButton,
      CButtonGroup
    },
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
