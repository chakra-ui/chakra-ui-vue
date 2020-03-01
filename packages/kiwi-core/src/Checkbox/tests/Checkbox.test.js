import Checkbox from '../'
import { render, userEvent } from '@/packages/kiwi-core/src/test-utils'

jest.mock('@/packages/kiwi-core/src/utils/generators.js', () => {
  return {
    useId () {
      return '1'
    }
  }
})

const renderComponent = (props) => {
  const inlineAttrs = (props && props.inlineAttrs) || ''
  const base = {
    components: { Checkbox },
    template: `<Checkbox ${inlineAttrs}>checkbox</Checkbox>`,
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
  const { getByText, container } = renderComponent({ inlineAttrs })
  const input = container.querySelector('input')

  expect(input).toHaveAttribute('disabled')
  expect(getByText('checkbox').parentNode).toHaveStyle('cursor: not-allowed;')
})

it('should display a checkbox with a checked state', () => {
  const inlineAttrs = 'isChecked'
  const { container } = renderComponent({ inlineAttrs })
  const input = container.querySelector('input')

  expect(input).toBeChecked()
})

it('should display a checkbox with an unchecked state', () => {
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
  const checkbox = getByText('checkbox')

  expect(input).toBeDisabled()

  await userEvent.click(checkbox)

  expect(input).not.toBeChecked()
})

test('Uncontrolled - should check and uncheck', async () => {
  const { container, getByText } = renderComponent()
  const input = container.querySelector('input')
  const checkbox = getByText('checkbox')

  // click the first time, it's checked
  await userEvent.click(checkbox)
  expect(input).toBeChecked()

  // click the second time, it's unchecked
  await userEvent.click(checkbox)
  expect(input).not.toBeChecked()
})

test('properly handles v-model', async () => {
  const { getByText, container } = renderComponent(
    {
      data: () => ({
        enable: false
      }),
      template: `
      <div>
        <span>{{enable ? 'enabled' : 'disabled'}}</span>
        <Checkbox v-model="enable" />
      </div>`
    }
  )
  const input = container.querySelector('input')

  expect(getByText('disabled')).toBeInTheDocument()

  await userEvent.click(input)

  expect(getByText('enabled')).toBeInTheDocument()
})
