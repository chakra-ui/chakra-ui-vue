import { CTextarea } from '../..'
import { render, screen, userEvent } from '@/tests/test-utils'

const renderComponent = (props) => {
  const inlineAttrs = (props && props.inlineAttrs) || ''
  const base = {
    data: () => ({ text: 'hello' }),
    components: { CTextarea },
    template: `<CTextarea data-testid="textarea" placeholder="textarea placeholder" v-model="text" ${inlineAttrs}/>`,
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
  const textarea = screen.getByTestId('textarea')

  userEvent.type(textarea, ' world')
  expect(textarea).toHaveValue('hello world')
})

test('readonly textarea renders correctly', () => {
  renderComponent({ inlineAttrs: 'isReadOnly' })
  const textarea = screen.getByTestId('textarea')

  expect(textarea).toHaveAttribute('readonly')
})

test('disabled textarea renders correctly', () => {
  renderComponent({ inlineAttrs: 'isDisabled' })
  const textarea = screen.getByTestId('textarea')

  expect(textarea).toHaveAttribute('disabled')
})
