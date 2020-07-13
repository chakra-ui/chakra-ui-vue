import { CInput } from '../..'
import { render, screen, userEvent } from '@/tests/test-utils'

const renderComponent = (props) => {
  const inlineAttrs = (props && props.inlineAttrs) || ''
  const base = {
    data: () => ({ text: 'hello' }),
    components: { CInput },
    template: `<CInput data-testid="input" placeholder="input placeholder" v-model="text" ${inlineAttrs}/>`,
    ...props
  }
  return render(base)
}

test('should render correctly', () => {
  const { asFragment } = renderComponent()
  expect(asFragment()).toMatchSnapshot()
})

test('v-model works', () => {
  renderComponent()
  const input = screen.getByTestId('input')

  userEvent.type(input, ' world')
  expect(input).toHaveValue('hello world')
})

test('readonly input renders correctly', () => {
  renderComponent({ inlineAttrs: 'isReadOnly' })
  const input = screen.getByTestId('input')

  expect(input).toHaveAttribute('readonly')
})

test('disabled input renders correctly', () => {
  renderComponent({ inlineAttrs: 'isDisabled' })
  const input = screen.getByTestId('input')

  expect(input).toHaveAttribute('disabled')
})
