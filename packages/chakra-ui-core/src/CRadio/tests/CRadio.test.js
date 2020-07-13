import CRadio from '..'
import { render, userEvent, screen } from '@/tests/test-utils'

const renderComponent = (props) => {
  const inlineAttrs = (props && props.inlineAttrs) || ''
  const base = {
    components: { CRadio },
    template: `<CRadio ${inlineAttrs}>radio</CRadio>`,
    ...props
  }
  return render(base)
}

it('should render correctly', () => {
  const { asFragment } = renderComponent()
  expect(asFragment()).toMatchSnapshot()
})

it('should display a disabled radio', () => {
  const inlineAttrs = 'isDisabled'
  renderComponent({ inlineAttrs })
  const input = screen.getByLabelText('radio')

  expect(input).toHaveAttribute('disabled')
  expect(input.parentNode).toHaveStyle('cursor: not-allowed;')
})

it('should display a radio with a checked state', () => {
  const inlineAttrs = 'isChecked'
  renderComponent({ inlineAttrs })
  const input = screen.getByLabelText('radio')

  expect(input).toBeChecked()
})

it('should display a radio with an unchecked state', () => {
  const inlineAttrs = ':isChecked="false"'
  renderComponent({ inlineAttrs })
  const input = screen.getByLabelText('radio')

  expect(input).not.toBeChecked()
})

test('Uncontrolled - should not check if disabled', async () => {
  const inlineAttrs = 'isDisabled'
  renderComponent({ inlineAttrs })
  const input = screen.getByLabelText('radio')

  expect(input).toBeDisabled()

  await userEvent.click(input)

  expect(input).not.toBeChecked()
})

test('Uncontrolled - should be checked always', async () => {
  renderComponent()
  const input = screen.getByLabelText('radio')

  // click the first time, it's checked
  await userEvent.click(input)
  expect(input).toBeChecked()

  // click the second time, it should be still checked
  await userEvent.click(input)
  expect(input).toBeChecked()
})
