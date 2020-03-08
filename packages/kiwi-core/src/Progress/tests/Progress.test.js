import { Progress, ProgressLabel } from '../'
import { render, defaultProviders } from '@/tests/test-utils'

const renderComponent = (props) => {
  const base = {
    components: {
      KProgress: Progress,
      KProgressLabel: ProgressLabel
    },
    provide: () => defaultProviders(),
    template: `<KProgress rounded="sm" color="green" size="sm" data-testid="progress" :value="40" />`,
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
  const { queryByText } = renderComponent({ template: `
  <KProgress :value="40">
    <KProgressLabel>Label</KProgressLabel>
  </KProgress>`
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
