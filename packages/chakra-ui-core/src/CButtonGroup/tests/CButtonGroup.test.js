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

it('should attach buttons when `is-attached` is passed', () => {
  const { asFragment, getByText } = renderComponent({
    template: `
    <CButtonGroup isAttached>
      <CButton>Button1</CButton>
      <CButton>Button2</CButton>
    </CButtonGroup>`
  })

  const button = getByText('Button1')
  expect(button).toHaveStyle('border-top-right-radius: 0; border-bottom-right-radius: 0;')
  expect(asFragment()).toMatchSnapshot()
})

it('should display children', () => {
  const { getByText } = renderComponent()
  expect(getByText('Button1')).toBeInTheDocument()
  expect(getByText('Button2')).toBeInTheDocument()
})
