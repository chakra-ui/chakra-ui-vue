import { CButton, CButtonGroup } from '../..'
import { render, screen } from '@/tests/test-utils'

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
  const { asFragment } = renderComponent({
    template: `
    <CButtonGroup isAttached>
      <CButton>Button1</CButton>
      <CButton>Button2</CButton>
    </CButtonGroup>`
  })

  const button = screen.getByText('Button1')
  expect(button).toHaveStyle('border-top-right-radius: 0px; border-bottom-right-radius: 0px;')
  expect(asFragment()).toMatchSnapshot()
})

it('should display children', () => {
  renderComponent()
  expect(screen.getByText('Button1')).toBeInTheDocument()
  expect(screen.getByText('Button2')).toBeInTheDocument()
})
