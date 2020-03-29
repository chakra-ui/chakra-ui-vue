import { CButton } from '../..'
import { render, defaultProviders } from '@/tests/test-utils'

// mocks
jest.mock('breadstick/dist/components/Alert/styles.css', () => ({})) // jest tries to import styles and fails...

const renderComponent = (props) => {
  const base = {
    components: {
      CButton
    },
    provide: () => ({
      ...defaultProviders(),
      $chakraIcons: {
        'email': {
          path: `
              <path
                fill="currentColor"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31C15.55 19.37 13.85 20 12 20zm6.31-3.1L7.1 5.69C8.45 4.63 10.15 4 12 4c4.42 0 8 3.58 8 8 0 1.85-.63 3.55-1.69 4.9z"
              />
            `
        }
      }
    }),
    template: `<CButton>Works</CButton>`,
    ...props
  }
  return render(base)
}

it('should render correctly', () => {
  const { asFragment } = renderComponent()
  expect(asFragment()).toMatchSnapshot()
})

it('should display children', () => {
  const { getByText } = renderComponent({ template: '<CButton><span>Works</span></CButton>' })
  expect(getByText('Works')).toBeInTheDocument()
})

it('should display button with left icon', () => {
  const { container, asFragment } = renderComponent({ template: '<CButton leftIcon="email">Email</CButton>' })
  expect(container.querySelector('button > svg')).toBeInTheDocument()
  expect(asFragment()).toMatchSnapshot()
})

it('should display button with right icon', () => {
  const { container, asFragment } = renderComponent({ template: '<CButton rightIcon="email">Email</CButton>' })
  expect(container.querySelector('button > svg')).toBeInTheDocument()
  expect(asFragment()).toMatchSnapshot()
})

it('should display spinner and hide text', () => {
  const { getByTestId, container } = renderComponent({ template: `<CButton isLoading data-testid="btn">CButton</CButton>` })
  const button = getByTestId('btn')

  expect(button).toHaveAttribute('disabled')
  expect(button).toHaveAttribute('aria-disabled', 'true')

  const spinner = container.querySelector('[chakra-button-spinner]')
  expect(spinner).toBeInTheDocument()
  expect(button).toHaveStyle('opacity: 0.4')
})

it('should display spinner with text', () => {
  const { getByText, container } = renderComponent({ template: `<CButton isLoading loadingText="Submitting" data-testid="Spinner">Button</CButton>` })

  expect(getByText('Submitting')).toBeInTheDocument()
  const spinner = container.querySelector('[chakra-button-spinner]')
  expect(spinner).toBeInTheDocument()
})

it('should display a disabled button', () => {
  const { getByText } = renderComponent({ template: `<CButton isDisabled>Button</CButton>` })

  expect(getByText('Button')).toHaveAttribute('disabled')
})
