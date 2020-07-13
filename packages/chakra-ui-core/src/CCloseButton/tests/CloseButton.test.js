import CloseButton from '../'
import { render, screen } from '@/tests/test-utils'

const renderComponent = (props) => {
  const base = {
    components: { CloseButton },
    template: '<CloseButton />',
    ...props
  }
  return render(base)
}
it('should render correctly', () => {
  const { asFragment } = renderComponent()
  expect(asFragment()).toMatchSnapshot()
})
it('should allow setting a custom aria-label for the button', () => {
  renderComponent({ template: '<CloseButton aria-label="my aria label" />' })

  expect(screen.getByLabelText('my aria label')).toHaveAttribute(
    'aria-label',
    'my aria label'
  )
})

test('a11y - should have aria-label set to "Close"', () => {
  renderComponent()

  expect(screen.getByLabelText('Close')).toHaveAttribute(
    'aria-label',
    'Close'
  )
})
