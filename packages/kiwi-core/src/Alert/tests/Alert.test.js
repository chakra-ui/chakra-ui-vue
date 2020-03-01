import { Alert, AlertIcon, AlertTitle, AlertDescription } from '../'
import { render } from '@/packages/kiwi-core/src/test-utils'

const renderComponent = (props) => {
  const base = {
    components: { Alert, AlertTitle, AlertDescription, AlertIcon },
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
