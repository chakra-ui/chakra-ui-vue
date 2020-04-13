import { CVisuallyHidden, CControlBox, CBox } from '../..'
import { render, userEvent } from '@/tests/test-utils'

// its because when we load components from `../..`
jest.mock('@/packages/chakra-ui-core/src/CToast/index.js', () => {})

const renderComponent = (props) => {
  const inlineAttrs = (props && props.inlineAttrs) || ''
  const base = {
    components: { CVisuallyHidden, CControlBox, CBox },
    template: `
  <CBox as="label" display="flex" border-color="gray.200" align-items="center" cursor="pointer" for="control-radio">
    <!-- This is the sibling input, it's visually hidden -->
    <CVisuallyHidden as="input" id="control-radio" data-testid="hiddenControl" ${inlineAttrs} />
  
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
      ${inlineAttrs}
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
  const inlineAttrs = `type="radio"`
  const { asFragment } = renderComponent({ inlineAttrs })
  expect(asFragment()).toMatchSnapshot()
})

test('Uncontrolled radio - should be checked always', async () => {
  const inlineAttrs = `type="radio"`
  const { container, getByTestId } = renderComponent({ inlineAttrs })
  const input = container.querySelector('input')
  const control = getByTestId('control')
  const hiddenControl = getByTestId('hiddenControl')

  // click the first time, it's checked
  await userEvent.click(control)
  expect(input).toBeChecked()
  expect(hiddenControl).toBeChecked()

  // click the second time, it should be still checked
  await userEvent.click(control)
  expect(input).toBeChecked()
  expect(hiddenControl).toBeChecked()
})

test('Uncontrolled checkbox - should be checked always', async () => {
  const inlineAttrs = `type="checkbox"`
  const { container, getByTestId } = renderComponent({ inlineAttrs })
  const input = container.querySelector('input')
  const control = getByTestId('control')
  const hiddenControl = getByTestId('hiddenControl')

  // click the first time, it's checked
  await userEvent.click(control)
  expect(input).toBeChecked()
  expect(hiddenControl).toBeChecked()

  // click the second time, it's unchecked
  await userEvent.click(control)
  expect(input).not.toBeChecked()
  expect(hiddenControl).not.toBeChecked()
})
