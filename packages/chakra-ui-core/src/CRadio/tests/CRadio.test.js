import CRadio from '..'
import { render, userEvent } from '@/tests/test-utils'

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
  const { getByText, container } = renderComponent({ inlineAttrs })
  const input = container.querySelector('input')

  expect(input).toHaveAttribute('disabled')
  expect(getByText('radio').parentNode).toHaveStyle('cursor: not-allowed;')
})

it('should display a radio with a checked state', () => {
  const inlineAttrs = 'defaultIsChecked'
  const { container } = renderComponent({ inlineAttrs })
  const input = container.querySelector('input')

  expect(input).toBeChecked()
})

it('should display a radio with an unchecked state', () => {
  const inlineAttrs = ':isChecked="false"'
  const { container } = renderComponent({ inlineAttrs })
  const input = container.querySelector('input')

  expect(input).not.toBeChecked()
})

it('should have a checked state when setting defaultIsChecked', () => {
  const inlineAttrs = 'defaultIsChecked'
  const { container } = renderComponent({ inlineAttrs })
  const input = container.querySelector('input')

  expect(input).toBeChecked()
})

test('Uncontrolled - should not check if disabled', async () => {
  const inlineAttrs = 'isDisabled'
  const { container, getByText } = renderComponent({ inlineAttrs })
  const input = container.querySelector('input')
  const radio = getByText('radio')

  expect(input).toBeDisabled()

  await userEvent.click(radio)

  expect(input).not.toBeChecked()
})

test('Uncontrolled - should be checked always', async () => {
  const { container, getByText } = renderComponent()
  const input = container.querySelector('input')
  const radio = getByText('radio')

  // click the first time, it's checked
  await userEvent.click(radio)
  expect(input).toBeChecked()

  // click the second time, it should be still checked
  await userEvent.click(radio)
  expect(input).toBeChecked()
})
