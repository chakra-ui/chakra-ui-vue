import { CButton } from '../..'
import { render, userEvent, screen } from '@/tests/test-utils'

const renderComponent = (props) => {
  const base = {
    components: {
      CButton
    },
    template: '<CButton>Works</CButton>',
    ...props
  }
  return render(base)
}

describe('CButton', () => {
  it('should render correctly', () => {
    const { asFragment } = renderComponent()
    expect(asFragment()).toMatchSnapshot()
  })

  it('should display button with left icon', () => {
    const { asFragment } = renderComponent({
      template: '<CButton leftIcon="email">Email</CButton>'
    })
    expect(asFragment()).toMatchSnapshot()
  })

  it('should display button with right icon', () => {
    const { asFragment } = renderComponent({
      template: '<CButton rightIcon="email">Email</CButton>'
    })
    expect(asFragment()).toMatchSnapshot()
  })

  it('should display spinner and hide text', () => {
    const { container } = renderComponent({
      template: '<CButton isLoading data-testid="btn">CButton</CButton>'
    })
    const button = screen.getByTestId('btn')

    expect(button).toHaveAttribute('disabled')
    expect(button).toHaveAttribute('aria-disabled', 'true')

    const spinner = container.querySelector('[data-chakra-component=CSpinner]')
    expect(spinner).toBeInTheDocument()
    expect(button).toHaveStyle('opacity: 0.4')
  })

  it('should display spinner with text', () => {
    const { container } = renderComponent({
      template:
      '<CButton isLoading loadingText="Submitting" data-testid="Spinner">Button</CButton>'
    })

    expect(screen.getByText('Submitting')).toBeInTheDocument()
    const spinner = container.querySelector('[data-chakra-component=CSpinner]')
    expect(spinner).toBeInTheDocument()
  })

  it('should display a disabled button', () => {
    renderComponent({ template: '<CButton isDisabled>Button</CButton>' })

    expect(screen.getByText('Button')).toHaveAttribute('disabled')
  })

  it('should support custom color', () => {
    renderComponent({ template: '<CButton color="#fafafa">Button</CButton>' })

    expect(screen.getByText('Button')).toHaveStyle({
      color: '#fafafa'
    })
  })

  it('should emit "click" event', () => {
    const handleClick = jest.fn()
    renderComponent({
      template: '<CButton @click="handleClick" data-testid="btn"></CButton>',
      methods: {
        handleClick
      }
    })

    const button = screen.getByTestId('btn')

    userEvent.click(button)
    expect(handleClick).toHaveBeenCalled()
  })
})
