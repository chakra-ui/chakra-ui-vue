import { CircularProgress, CircularProgressLabel } from '@/packages/kiwi-core/src/CircularProgress'
import { render, defaultProviders } from '@/packages/kiwi-core/src/test-utils'

const renderComponent = (props) => {
  const base = {
    components: {
      CircularProgress,
      CircularProgressLabel
    },
    provide: () => defaultProviders(),
    template: `
    <CircularProgress :value="40" data-testid="CircularProgress" />`,
    ...props
  }
  return render(base)
}

it('should render correctly', () => {
  const { asFragment } = renderComponent()
  expect(asFragment()).toMatchSnapshot()
})

it('should display a label', () => {
  const { queryByText } = renderComponent({ template: `
  <CircularProgress :value="40">
    <CircularProgressLabel>40%</CircularProgressLabel>
  </CircularProgress>`
  })

  expect(queryByText('40%')).toBeInTheDocument()
})

test('a11y - progress has a "role" set to "progressbar"', () => {
  const { queryByRole } = renderComponent()

  expect(queryByRole('progressbar')).toBeInTheDocument()
})

test('a11y - progress has a "aria-valuenow" set to the percentage completion value', () => {
  const { queryByTestId } = renderComponent()

  expect(queryByTestId('CircularProgress')).toHaveAttribute(
    'aria-valuenow',
    '40'
  )
})
