import { CCircularProgress, CCircularProgressLabel } from '../..'
import { render } from '@/tests/test-utils'

const renderComponent = (props) => {
  const base = {
    components: {
      CCircularProgress,
      CCircularProgressLabel
    },
    template: `
    <CCircularProgress :value="40" data-testid="CircularProgress" />`,
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
  <CCircularProgress :value="40">
    <CCircularProgressLabel>40%</CCircularProgressLabel>
  </CCircularProgress>`
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
