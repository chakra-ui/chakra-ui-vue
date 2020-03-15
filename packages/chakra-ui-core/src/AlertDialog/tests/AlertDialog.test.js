import { Button, AlertDialog, AlertDialogContent, AlertDialogBody, AlertDialogFooter, AlertDialogOverlay, AlertDialogHeader, Portal } from '../../'
import { render, defaultProviders, userEvent, fireEvent } from '@/tests/test-utils'
import Vue from 'vue'
import { useId, wrapEvent } from '@/packages/chakra-ui-core/src/utils'

// mocks
jest.mock('@/packages/chakra-ui-core/src/utils/dom.js')
jest.mock('@/packages/chakra-ui-core/src/utils/generators.js')
jest.mock('v-scroll-lock', () => ({}))
jest.mock('breadstick/dist/components/Alert/styles.css', () => ({}))

const renderComponent = (props) => {
  const inlineAttrs = (props && props.inlineAttrs) || ''
  const base = {
    components: { Portal, Button, AlertDialog, AlertDialogContent, AlertDialogBody, AlertDialogFooter, AlertDialogOverlay, AlertDialogHeader },
    provide: () => defaultProviders(),
    data: () => ({
      isOpen: false
    }),
    methods: {
      open () {
        this.isOpen = true
      },
      close () {
        this.isOpen = false
      }
    },
    template: `
    <div>
        <AlertDialog ${inlineAttrs}>
            <AlertDialogOverlay data-testid="overlay" />
            <AlertDialogContent data-testid="content">
            <AlertDialogHeader>Dialog Header</AlertDialogHeader>
            <AlertDialogBody>Are you sure?</AlertDialogBody>
            <AlertDialogFooter>
                <Button ref="cancelRef" @click="close" data-testid="close-btn">Cancel</Button>
                <Button variantColor="red" @click="close" ml="3">Delete</Button>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </div>
    `,
    ...props
  }
  return render(base, {}, vue => vue.directive('scroll-lock', jest.fn()))
}

it('should render correctly', async () => {
  useId.mockReturnValueOnce('1')
  wrapEvent.mockImplementation(() => jest.fn())
  const inlineAttrs = 'isOpen'
  const { asFragment } = renderComponent({ inlineAttrs })

  await Vue.nextTick()

  expect(asFragment(document.body.innerHTML)).toMatchSnapshot()
})

test('clicking the close button calls the onClose callback', async () => {
  const onClose = jest.fn()
  const inlineAttrs = `isOpen :on-close="close"`
  const { getByTestId } = renderComponent({ inlineAttrs, methods: { close: onClose } })

  await Vue.nextTick()
  // click the close button
  await userEvent.click(getByTestId('close-btn'))

  expect(onClose).toHaveBeenCalled()
})

// TODO: closeOnOverlayClick doesnt work
// ⚠️ remove skip
test.skip('clicking overlay or pressing "esc" calls the onClose callback', async () => {
  const onClose = jest.fn()
  const inlineAttrs = `isOpen :on-close="close" :closeOnOverlayClick="true"`
  const { getByTestId } = renderComponent({ inlineAttrs, methods: { close: onClose } })

  await Vue.nextTick()
  const overlay = getByTestId('overlay')

  await userEvent.click(overlay)
  await fireEvent.keyDown(overlay, { key: 'Escape', keyCode: 27 })

  expect(onClose).toHaveBeenCalledTimes(2)
})

// TODO: Focus
// ⚠️ remove skip
test.skip('returns focus when closed', async () => {
  const onClose = jest.fn()
  const { getByTestId } = renderComponent({
    data: () => ({ isOpen: true }),
    methods: { close: onClose, open () { this.isOpen = true } },
    template: `
    <div>
        <AlertDialog 
          :is-open="isOpen"
          :least-destructive-ref="$refs.cancelRef"
          :finalFocusRef="$refs.buttonRef"
          :initialFocusRef="$refs.inputRef"
          :on-close="close"
        >
            <AlertDialogContent data-testid="content">
            <AlertDialogHeader>Dialog Header</AlertDialogHeader>
            <AlertDialogBody>
            body
            <input data-testid="input" type="text" ref="inputRef" />
            </AlertDialogBody>
            <AlertDialogFooter>
                <Button ref="cancelRef" @click="close" data-testid="close-btn">Cancel</Button>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        <Button @click="open" data-testid="button">Delete Customer</Button>
    </div>
  ` })

  const button = getByTestId('button')

  // make sure button isn't focused at the start
  expect(document.activeElement).not.toEqual(button)

  // open and close the modal
  await userEvent.click(button)
  await userEvent.click(getByTestId('close-btn'))

  expect(document.activeElement).toEqual(button)
})

// TODO: focus works on browser but not in here...
// ⚠️ remove skip
test.skip('focuses the initial focus ref when opened', async () => {
  const onClose = jest.fn()
  const { getByTestId } = renderComponent({
    data: () => ({ isOpen: true }),
    methods: { close: onClose, open () { this.isOpen = true } },
    template: `
      <div>
          <AlertDialog 
            :is-open="isOpen"
            :least-destructive-ref="$refs.cancelRef"
            :initialFocusRef="$refs.inputRef"
            :on-close="close"
          >
              <AlertDialogContent data-testid="content">
              <AlertDialogHeader>Dialog Header</AlertDialogHeader>
              <AlertDialogBody>
                body
                <input data-testid="input" type="text" ref="inputRef" />
              </AlertDialogBody>
              <AlertDialogFooter>
                  <Button ref="cancelRef" @click="close" data-testid="close-btn">Cancel</Button>
              </AlertDialogFooter>
              </AlertDialogContent>
          </AlertDialog>
          <Button @click="open" data-testid="button">Delete Customer</Button>
      </div>
    ` })

  // click button, opening the modal
  await userEvent.click(getByTestId('button'))
  await Vue.nextTick()

  const input = getByTestId('input')
  // input is now the active element
  expect(document.activeElement).toEqual(input)
})

// TODO: A11y
// ⚠️ remove skip
it.skip('should have proper aria', async () => {
  const inlineAttrs = 'isOpen'
  const { getByTestId } = renderComponent({ inlineAttrs })

  await Vue.nextTick()
  const dialog = getByTestId('content') // eslint-disable-line

  // TODO: A11y role dialog or alertdialog?
  // expect(dialog).toHaveAttribute('role', 'dialog')
  // TODO: A11y aria modal?
  // expect(dialog).toHaveAttribute('aria-modal', 'true')
  // TODO: describedBy?
  // expect(dialog).toHaveAttribute('aria-describedby', 'chakra-dialog--body-3')
})
