import { CVisuallyHidden, CControlBox, CBox } from '../..'
import { render, userEvent } from '@/tests/test-utils'

const renderComponent = (props) => {
  const inlineAttrs = (props && props.inlineAttrs) || ''
  const type = props.type && `type="${props.type}"`
  const base = {
    components: { CVisuallyHidden, CControlBox, CBox },
    template: `
  <CBox as="label" display="flex" border-color="gray.200" align-items="center" cursor="pointer" for="control-radio">
    <!-- This is the sibling input, it's visually hidden -->
    <CVisuallyHidden as="input" id="control-radio" data-testid="hiddenControl" ${inlineAttrs} ${type} />
  
    <!-- This is the control box with a check icon as children -->
    <CControlBox
      data-testid="control"
      size="24px"
      border="2px"
      bg="white"
      rounded="full"
      border-color="inherit"
      :_checked="{
          bg: 'green.500',
          borderColor: 'green.500'
      }"
      :_hover="{ borderColor: 'gray.300' }"
      :_focus="{ boxShadow: 'outline' }"
      :_disabled="{ opacity: '40%' }"
    >
      <CBox w="50%" h="50%" bg="white" rounded="full" />
    </CControlBox>
  </CBox>
  
    `,
    ...props
  }
  return render(base)
}

it('should render correctly', () => {
  const { asFragment } = renderComponent({ type: 'radio' })
  expect(asFragment()).toMatchSnapshot()
})

test('Uncontrolled radio - should be checked always', async () => {
  const { getByTestId } = renderComponent({ type: 'radio' })
  const control = getByTestId('control')
  const hiddenControl = getByTestId('hiddenControl')

  // click the first time, it's checked
  await userEvent.click(control)
  expect(hiddenControl).toBeChecked()

  // click the second time, it should be still checked
  await userEvent.click(control)
  expect(hiddenControl).toBeChecked()
})

test('Uncontrolled checkbox - should toggle', async () => {
  const { getByTestId } = renderComponent({ type: 'checkbox' })
  const control = getByTestId('control')
  const hiddenControl = getByTestId('hiddenControl')

  // click the first time, it's checked
  await userEvent.click(control)
  expect(hiddenControl).toBeChecked()

  // click the second time, it's unchecked
  await userEvent.click(control)
  expect(hiddenControl).not.toBeChecked()
})

test('controlled checkbox - v-model works', async () => {
  const inlineAttrs = ':checked="checked"'
  const { getByTestId } = renderComponent({ inlineAttrs, type: 'checkbox', data: () => ({ checked: true }) })
  const control = getByTestId('control')
  const hiddenControl = getByTestId('hiddenControl')

  // click the first time, it's checked
  expect(hiddenControl).toBeChecked()

  // click the second time, it's unchecked
  await userEvent.click(control)
  expect(hiddenControl).not.toBeChecked()
})

test('controlled radio - v-model works', async () => {
  const inlineAttrs = ':checked="checked"'
  const { getByTestId } = renderComponent({ inlineAttrs, type: 'radio', data: () => ({ checked: true }) })
  const control = getByTestId('control')
  const hiddenControl = getByTestId('hiddenControl')

  // click the first time, it's checked
  expect(hiddenControl).toBeChecked()

  // click the second time, it should be still checked
  await userEvent.click(control)
  expect(hiddenControl).toBeChecked()
})
