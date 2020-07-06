import CIconButton from '..'
import { render, screen } from '@/tests/test-utils'

const renderComponent = (props) => {
  const inlineAttrs = (props && props.inlineAttrs) || ''
  const base = {
    components: { CIconButton },
    template: `<CIconButton aria-label="Phone" variant-color="blue" icon="phone" data-testid="btn" ${inlineAttrs} />`,
    ...props
  }
  return render(base)
}

it('should render correctly', () => {
  const { asFragment } = renderComponent()

  expect(asFragment()).toMatchSnapshot()
})

it('should display spinner and hide the icon', () => {
  const inlineAttrs = 'isLoading'
  const { container } = renderComponent({ inlineAttrs })

  const button = screen.getByTestId('btn')

  expect(button).toHaveAttribute('disabled')
  expect(button).toHaveAttribute('aria-disabled', 'true')

  // TODO: find a way to easily grab the spinner element
  // Maybe? expect(screen.getByTestId('Spinner')).toBeInTheDocument()
  expect(button).toHaveStyle('opacity: 0.4')
  expect(container.querySelector('button > div')).toBeInTheDocument()
})

it('should change icon', () => {
  const { asFragment } = renderComponent({
    template: `
    <CIconButton aria-label="Phone" variant-color="blue" icon="add" data-testid="btn" />`
  })

  expect(asFragment()).toMatchSnapshot()
})
