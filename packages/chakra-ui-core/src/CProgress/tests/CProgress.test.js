import { CProgress, CProgressLabel } from '../..'
import { render } from '@/tests/test-utils'

const renderComponent = (props) => {
  const base = {
    components: {
      CProgress,
      CProgressLabel
    },
    template: '<CProgress rounded="sm" color="green" size="sm" data-testid="progress" :value="40" />',
    ...props
  }
  return render(base)
}

it('should render correctly', () => {
  const { asFragment } = renderComponent()
  expect(asFragment()).toMatchSnapshot()
})

it('should have the correct width', () => {
  const { queryByRole } = renderComponent()

  expect(queryByRole('progressbar')).toHaveStyle('width: 40%')
})

it('should display a label', () => {
  const { queryByText } = renderComponent({
    template: `
  <CProgress :value="40">
    <CProgressLabel>Label</CProgressLabel>
  </CProgress>`
  })

  expect(queryByText('Label')).toBeInTheDocument()
})

test('a11y - progress has a "role" set to "progressbar"', () => {
  const { queryByRole } = renderComponent()
  expect(queryByRole('progressbar')).toBeInTheDocument()
})

test('a11y - progress has a "aria-valuenow" set to the percentage completion value', () => {
  const { queryByRole } = renderComponent()

  expect(queryByRole('progressbar')).toHaveAttribute(
    'aria-valuenow',
    '40'
  )
})
