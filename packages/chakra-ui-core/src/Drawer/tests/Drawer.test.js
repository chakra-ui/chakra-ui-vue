import { Input, Button, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton } from '../../'
import { render, defaultProviders, userEvent, fireEvent, waitMs } from '@/tests/test-utils'
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
    components: { Input, Button, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton },
    provide: () => defaultProviders(),
    data: () => ({
      isOpen: false
    }),
    methods: {
      close () {
        this.isOpen = false
      }
    },
    template: `
    <div>
        <Input data-testid="inputOutsideDrawer" ref="inputOutsideDrawer" placeholder="Type here..." /> 
        <Button data-testid="buttonOutside" ref="btnRef" @click="isOpen = true">Open Drawer</Button>

        <Drawer placement="right" ${inlineAttrs}>
            <DrawerOverlay />
            <DrawerContent data-testid="overlay">
            <DrawerCloseButton data-testid="close-btn" />
            <DrawerHeader>Create your account</DrawerHeader>

            <DrawerBody>
                <Input data-testid="inputInsideDrawer" ref="inputInsideDrawer" placeholder="Type here..." />
            </DrawerBody>

            <DrawerFooter>
                <Button variant="outline" mr="3" @click="isOpen = false">Cancel</Button>
                <Button color="blue">Save</Button>
            </DrawerFooter>
            </DrawerContent>
        </Drawer>
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

test('focuses the initial focus ref when opened - initialFocusRef', async () => {
  const inlineAttrs = `isOpen :on-close="close" :initialFocusRef="()=>$refs.inputInsideDrawer"`
  const { getByTestId } = renderComponent({ inlineAttrs })

  await Vue.nextTick()
  const inputInside = getByTestId('inputInsideDrawer')

  await waitMs()
  expect(inputInside).toHaveFocus()
})

test('returns focus when closed - finalFocusRef', async () => {
  const inlineAttrs = `:isOpen="isOpen" :on-close="close" :finalFocusRef="$refs.inputOutsideDrawer"`
  const { getByTestId } = renderComponent({ inlineAttrs, data: () => ({ isOpen: true }) })

  await Vue.nextTick()
  const inputOutside = getByTestId('inputOutsideDrawer')
  const closeButton = getByTestId('close-btn')

  await userEvent.click(closeButton)
  await waitMs()

  expect(inputOutside).toHaveFocus()
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
