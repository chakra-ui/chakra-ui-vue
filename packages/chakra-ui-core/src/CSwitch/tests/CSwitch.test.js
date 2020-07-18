import CSwitch from '..'
import { render, userEvent } from '@/tests/test-utils'

const renderComponent = (props) => {
  const base = {
    components: { CSwitch },
    ...props
  }
  return render(base)
}
it('should render correctly', () => {
  const { asFragment } = renderComponent(
    {
      template: `
    <CSwitch />
    `
    }
  )
  expect(asFragment()).toMatchSnapshot()
})

it('should switch', async () => {
  const { getByTestId, getByRole } = renderComponent(
    {
      template: '<CSwitch data-testid="label" />'
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
      template: '<CSwitch data-testid="label" @change="handleChange"  /> '
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
        <CSwitch v-model="enable" data-testid="label" />
      </div>`
    }
  )
  const label = getByTestId('label')

  expect(getByText('disabled')).toBeInTheDocument()

  await userEvent.click(label)

  expect(getByText('enabled')).toBeInTheDocument()
})
