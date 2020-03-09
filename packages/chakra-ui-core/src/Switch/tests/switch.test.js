import Switch from '../'
import { render, userEvent } from '@/tests/test-utils'

const renderComponent = (props) => {
  const base = {
    components: { Toggle: Switch },
    ...props
  }
  return render(base)
}
it('should render correctly', () => {
  const { asFragment } = renderComponent(
    {
      template: `
    <Toggle />
    `
    }
  )
  expect(asFragment()).toMatchSnapshot()
})

it('should switch', async () => {
  const { getByTestId, getByRole } = renderComponent(
    {
      template: `<Toggle data-testid="label" />`
    }
  )
  const label = getByTestId('label')
  const input = getByRole('checkbox')
  await userEvent.click(label)
  expect(input).toBeChecked()
})

it('should emit a change event', async () => {
  const spy = jest.fn()
  const { getByTestId } = renderComponent(
    {
      methods: {
        handleChange: spy
      },
      template: `<Toggle data-testid="label" @change="handleChange"  /> `
    }
  )

  const label = getByTestId('label')
  await userEvent.click(label)

  expect(spy).toHaveBeenCalledTimes(1)
})

test('properly handles v-model', async () => {
  const { getByTestId, getByText } = renderComponent(
    {
      data: () => ({
        enable: false
      }),
      template: `
      <div>
        <span>{{enable ? 'enabled' : 'disabled'}}</span>
        <Toggle v-model="enable" data-testid="label" />
      </div>`
    }
  )
  const label = getByTestId('label')

  expect(getByText('disabled')).toBeInTheDocument()

  await userEvent.click(label)

  expect(getByText('enabled')).toBeInTheDocument()
})
