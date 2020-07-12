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
