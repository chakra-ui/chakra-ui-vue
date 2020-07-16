import { CEditable, CEditableInput, CEditablePreview } from '../..'
import { useId } from '../../utils'
import { render, userEvent, fireEvent, screen } from '@/tests/test-utils'

// mocks
jest.mock('@/packages/chakra-ui-core/src/utils/generators.js')

const renderComponent = (props) => {
  const inlineAttrs = (props && props.inlineAttrs) || ''
  const base = {
    components: { CEditable, CEditableInput, CEditablePreview },
    template: `<CEditable ${inlineAttrs}>
      <CEditablePreview data-testid="preview" />
      <CEditableInput data-testid="input" />
    </CEditable>
    `,
    ...props
  }
  return render(base)
}

it('should render correctly', () => {
  const inlineAttrs = 'defaultValue="testing" '
  const { asFragment } = renderComponent({ inlineAttrs })

  expect(asFragment(document.body.innerHTML)).toMatchSnapshot()
})

it('should render correctly - input', async () => {
  useId.mockReturnValueOnce('1')
  const inlineAttrs = 'defaultValue="testing" '
  const { asFragment } = renderComponent({ inlineAttrs })

  const preview = screen.getByTestId('preview')
  await userEvent.click(preview)

  expect(asFragment(document.body.innerHTML)).toMatchSnapshot()
})

it('uncontrolled: handles callbacks correctly', async () => {
  const onChange = jest.fn()
  const onCancel = jest.fn()
  const onSubmit = jest.fn()
  const onEdit = jest.fn()

  const inlineAttrs = '@edit="onEdit" @change="onChange" @cancel="onCancel" @submit="onSubmit" defaultValue="Hello "'
  renderComponent({ inlineAttrs, methods: { onChange, onCancel, onSubmit, onEdit } })

  const preview = screen.getByTestId('preview')
  await userEvent.click(preview)

  const input = screen.getByTestId('input')

  // calls `onEdit` when preview is focused
  await fireEvent.focus(preview)
  expect(onEdit).toHaveBeenCalled()

  // calls `onChange` with input on change
  await userEvent.type(input, 'World')
  expect(onChange).toHaveBeenCalledWith('Hello World')

  // calls `onCancel` with previous value when "esc" pressed
  await fireEvent.keyDown(input, { key: 'Escape' })
  expect(onCancel).toHaveBeenCalledWith('Hello ')

  // calls `onSubmit` with previous value when "enter" pressed after cancelling
  await fireEvent.keyDown(input, { key: 'Enter' })
  expect(onSubmit).toHaveBeenCalledWith('Hello ')

  // TODO: ⚠️ we should make controlledInput for vue
  // we didn't change the v-model but input.value changes
  // remove this line, previous input value stays and next 2 expect fails
  input.value = 'Hello '

  // returns new value when submitting without cancelling
  await userEvent.type(input, 'World')
  await fireEvent.keyDown(input, { key: 'Enter' })
  expect(onSubmit).toHaveBeenCalledWith('Hello World')

  // cancelling now returns new value
  await fireEvent.keyDown(input, { key: 'Escape' })
  expect(onCancel).toHaveBeenCalledWith('Hello ')
})

it('controlled: handles callbacks correctly', async () => {
  useId.mockReturnValueOnce('1')
  const onChange = jest.fn()
  const onCancel = jest.fn()
  const onSubmit = jest.fn()
  const onEdit = jest.fn()

  const inlineAttrs = '@edit="onEdit" @change="onChange" @cancel="onCancel" @submit="onSubmit" defaultValue="Hello "'
  renderComponent({ inlineAttrs, methods: { onChange, onCancel, onSubmit, onEdit } })

  const preview = screen.getByTestId('preview')

  await fireEvent.touch(preview)
  const input = screen.getByTestId('input')

  // calls `onEdit` when preview is focused
  await fireEvent.focus(preview)
  expect(onEdit).toHaveBeenCalled()

  // calls `onSubmit` with `value`
  await fireEvent.keyDown(input, { key: 'Enter' })
  expect(onSubmit).toHaveBeenCalledWith('Hello ')

  // calls `onCancel` with `value`
  await fireEvent.keyDown(input, { key: 'Escape' })
  expect(onSubmit).toHaveBeenCalledWith('Hello ')

  // calls `onChange` with new input on change
  // await fireEvent.update(input, 'Hello World') // changes all value
  await userEvent.type(input, 'World') // continues typing with previous value

  await fireEvent.keyDown(input, { key: 'Escape' })
  expect(onChange).toHaveBeenCalledWith('Hello World')
})

test('has the proper aria attributes', async () => {
  const inlineAttrs = 'defaultValue=""'
  renderComponent({ inlineAttrs })

  const preview = screen.getByTestId('preview')

  await userEvent.click(preview)
  const input = screen.getByTestId('input')

  // preview and input do not have aria-disabled when `CEditable` is not disabled
  expect(preview).not.toHaveAttribute('aria-disabled')
  expect(input).not.toHaveAttribute('aria-disabled')
})

test('has the proper aria attributes when disabled', () => {
  const inlineAttrs = 'isDisabled defaultValue=""'
  renderComponent({ inlineAttrs })

  const preview = screen.getByTestId('preview')

  // preview does not have aria-disabled when `CEditable` is not disabled
  expect(preview).toHaveAttribute('aria-disabled', 'true')
})
