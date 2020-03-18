import { Button, AlertDialog, AlertDialogContent, AlertDialogBody, AlertDialogFooter, AlertDialogOverlay, AlertDialogHeader, Portal } from '../../'
import { render, defaultProviders, userEvent, fireEvent } from '@/tests/test-utils'
import Vue from 'vue'
import { useId, wrapEvent } from '@/packages/chakra-ui-core/src/utils'

// mocks
jest.mock('@/packages/chakra-ui-core/src/utils/dom.js')
jest.mock('@/packages/chakra-ui-core/src/utils/generators.js')
jest.mock('v-scroll-lock', () => ({}))
jest.mock('@/packages/chakra-ui-core/src/Toast/index.js', () => {})

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
            <AlertDialogOverlay  />
            <AlertDialogContent data-testid="overlay">
            <AlertDialogHeader>Dialog Header</AlertDialogHeader>
            <AlertDialogBody>
            Are you sure?
              <Input data-testid="inputInsideDrawer" ref="inputInsideDrawer" placeholder="Type here..." />
            </AlertDialogBody>
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
  userEvent.click(getByTestId('close-btn'))

  expect(onClose).toHaveBeenCalled()
})

test('pressing "esc" calls the onClose callback', async () => {
  const onClose = jest.fn()
  const inlineAttrs = `:isOpen="isOpen" :on-close="close"`
  const { getByTestId } = renderComponent({ inlineAttrs, data: () => ({ isOpen: true }), methods: { close: onClose } })

  await Vue.nextTick()
  const inputInside = getByTestId('inputInsideDrawer')

  fireEvent.keyDown(inputInside, { key: 'Escape' })

  expect(onClose).toHaveBeenCalled()
})

test('clicking overlay calls the onClose callback', async () => {
  const onClose = jest.fn()
  const inlineAttrs = `:isOpen="isOpen" :on-close="close"`
  const { getByTestId } = renderComponent({ inlineAttrs, data: () => ({ isOpen: true }), methods: { close: onClose } })

  await Vue.nextTick()
  const overlay = getByTestId('overlay')

  userEvent.click(overlay)

  expect(onClose).toHaveBeenCalled()
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
