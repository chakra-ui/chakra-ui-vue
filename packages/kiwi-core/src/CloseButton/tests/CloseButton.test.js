import CloseButton from '../'
import { render } from '@/packages/kiwi-core/src/test-utils'

const renderComponent = (props) => {
  const base = {
    components: { CloseButton },
    template: `<CloseButton />`,
    ...props
  }
  return render(base)
}
it('should render correctly', () => {
  const { asFragment } = renderComponent({
    template: `<CloseButton />`
  })
  expect(asFragment()).toMatchSnapshot()
})
it('should allow setting a custom aria-label for the button', () => {
  const { container } = renderComponent({ template: `<CloseButton aria-label="my aria label" />` })

  expect(container.querySelector('button')).toHaveAttribute(
    'aria-label',
    'my aria label'
  )
})

test('a11y - should have aria-label set to "Close"', () => {
  const { container } = renderComponent()

  expect(container.querySelector('button')).toHaveAttribute(
    'aria-label',
    'Close'
  )
})
