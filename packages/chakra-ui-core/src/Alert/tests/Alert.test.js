import { Alert, AlertIcon, AlertTitle, AlertDescription } from '../../Alert'
import { render, defaultProviders } from '@/tests/test-utils'
import icons from '../../lib/internal-icons'

const renderComponent = (props) => {
  const base = {
    components: { Alert, AlertTitle, AlertDescription, AlertIcon },
    provide: () => defaultProviders({ $icons: { add: icons.add } }),
    template: `
    <Alert>
      <AlertIcon />
      <AlertTitle>alert title</AlertTitle>
      <AlertDescription>alert description</AlertDescription>
    </Alert>`,
    ...props
  }
  return render(base)
}
it('should render correctly', () => {
  const { asFragment } = renderComponent()
  expect(asFragment()).toMatchSnapshot()
})

it('should display title', () => {
  const { getByText } = renderComponent()

  expect(getByText('alert title')).toBeInTheDocument()
})

it('should display description', () => {
  const { getByText } = renderComponent()

  expect(getByText('alert description')).toBeInTheDocument()
})

it('should override icon if set explicitly', () => {
  const { asFragment } = renderComponent({
    template: `
    <Alert status="error">
      <AlertIcon name="add" />
    </Alert>`
  })

  expect(asFragment()).toMatchSnapshot()
})

it('should have role=alert', () => {
  const { getByRole } = renderComponent({
    template: `
    <Alert status="error">
      <AlertIcon name="add" />
    </Alert>`
  })

  getByRole('alert')
})
