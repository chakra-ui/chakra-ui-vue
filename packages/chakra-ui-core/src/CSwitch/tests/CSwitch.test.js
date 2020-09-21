import CSwitch from '..'
import { render, userEvent, screen } from '@/tests/test-utils'

const renderComponent = ({ inlineAttrs = '', ...props } = { }) => {
  const base = {
    template: `<CSwitch data-testid="switch" ${inlineAttrs} />`,
    components: { CSwitch },
    ...props
  }
  return render(base)
}
it('should render correctly', () => {
  const { asFragment } = renderComponent()
  expect(asFragment()).toMatchSnapshot()
})

it('should switch', async () => {
  renderComponent()

  await userEvent.click(screen.getByTestId('switch'))
  expect(screen.getByRole('checkbox')).toBeChecked()
})

it('should emit a change event', async () => {
  const onChange = jest.fn()
  const inlineAttrs = '@change="handleChange"'
  renderComponent({ inlineAttrs, methods: { handleChange: onChange } })

  await userEvent.click(screen.getByTestId('switch'))

  expect(onChange).toHaveBeenCalledTimes(1)
})

test('properly handles v-model', async () => {
  renderComponent({
    data: () => ({
      enable: false
    }),
    template: `
      <div>
        <span>{{enable ? 'enabled' : 'disabled'}}</span>
        <CSwitch v-model="enable" data-testid="switch" />
      </div>`
  })

  expect(screen.getByText('disabled')).toBeInTheDocument()

  await userEvent.click(screen.getByTestId('switch'))

  expect(screen.getByText('enabled')).toBeInTheDocument()
})

/**
 * Because the CSwitch is a functional component, it
 * handles event emission differently when the
 * consumer uses both v-model and the @change
 * event listener.
 */
it('should emit a change event when v-model + event listener are provided', async () => {
  const onChange = jest.fn()
  renderComponent({
    data: () => ({
      enable: false
    }),
    template: `
      <div>
        <span>{{enable ? 'enabled' : 'disabled'}}</span>
        <CSwitch v-model="enable" data-testid="switch" @change="handleChange" />
      </div>`,
    methods: { handleChange: onChange }
  })

  expect(screen.getByText('disabled')).toBeInTheDocument()
  await userEvent.click(screen.getByTestId('switch'))
  expect(screen.getByText('enabled')).toBeInTheDocument()
  expect(onChange).toHaveBeenCalledTimes(1)
})
