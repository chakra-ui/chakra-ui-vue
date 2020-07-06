import CCheckbox from '..'
import { render, userEvent, screen } from '@/tests/test-utils'

jest.mock('@/packages/chakra-ui-core/src/utils/generators.js', () => {
  return {
    useId () {
      return '1'
    }
  }
})

const renderComponent = (props) => {
  const inlineAttrs = (props && props.inlineAttrs) || ''
  const base = {
    components: { CCheckbox },
    template: `<CCheckbox ${inlineAttrs}>check</CCheckbox>`,
    ...props
  }
  return render(base)
}

it('should render correctly', () => {
  const { asFragment } = renderComponent()
  expect(asFragment()).toMatchSnapshot()
})

it('should display a disabled checkbox', () => {
  const inlineAttrs = 'isDisabled'
  renderComponent({ inlineAttrs })
  const input = screen.getByLabelText('check')

  expect(input).toHaveAttribute('disabled')
  expect(screen.getByText('check').parentNode).toHaveStyle('cursor: not-allowed;')
})

it('should display a checkbox with a checked state', () => {
  const inlineAttrs = 'isChecked'
  renderComponent({ inlineAttrs })
  const input = screen.getByLabelText('check')

  expect(input).toBeChecked()
})

it('should display a checkbox with an unchecked state', () => {
  const inlineAttrs = ':isChecked="false"'
  renderComponent({ inlineAttrs })
  const input = screen.getByLabelText('check')

  expect(input).not.toBeChecked()
})

it('should have a checked state when setting defaultIsChecked', () => {
  const inlineAttrs = 'defaultIsChecked'
  renderComponent({ inlineAttrs })
  const input = screen.getByLabelText('check')

  expect(input).toBeChecked()
})

test('Uncontrolled - should not check if disabled', async () => {
  const inlineAttrs = 'isDisabled'
  renderComponent({ inlineAttrs })
  const input = screen.getByLabelText('check') // input
  const checkbox = screen.getByText('check') // div with text

  expect(input).toBeDisabled()

  await userEvent.click(checkbox)

  expect(input).not.toBeChecked()
})

test('Uncontrolled - should check and uncheck', async () => {
  renderComponent()
  const input = screen.getByLabelText('check') // input
  const checkbox = screen.getByText('check') // div with text

  // click the first time, it's checked
  await userEvent.click(checkbox)
  expect(input).toBeChecked()

  // click the second time, it's unchecked
  await userEvent.click(checkbox)
  expect(input).not.toBeChecked()
})

test('properly handles v-model', async () => {
  renderComponent({
    data: () => ({
      enable: false
    }),
    template: `
      <div>
        <span>{{enable ? 'enabled' : 'disabled'}}</span>
        <CCheckbox v-model="enable">check</CCheckbox>
      </div>`
  })
  const input = screen.getByLabelText('check') // input

  expect(screen.getByText('disabled')).toBeInTheDocument()

  await userEvent.click(input)

  expect(screen.getByText('enabled')).toBeInTheDocument()
})
