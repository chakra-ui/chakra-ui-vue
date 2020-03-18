import { Input, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '../../'
import { render, defaultProviders, userEvent, fireEvent, waitMs } from '@/tests/test-utils'
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
    components: { Input, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton },
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
        <Input data-testid="inputOutsideModal" ref="inputOutsideModal" placeholder="Type here..." /> 
        <Button data-testid="buttonOutside" ref="btnRef" @click="isOpen = true">Open Modal</Button>

        <Modal ${inlineAttrs}>
            <ModalOverlay />
            <ModalContent data-testid="overlay">
            <ModalCloseButton data-testid="close-btn" />
            <ModalHeader>Create your account</ModalHeader>

            <ModalBody>
                <Input data-testid="inputInsideModal" ref="inputInsideModal" placeholder="Type here..." />
            </ModalBody>

            <ModalFooter>
                <Button variant="outline" mr="3" @click="isOpen = false">Cancel</Button>
                <Button color="blue">Save</Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
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
  const inputInside = getByTestId('inputInsideModal')

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
  const inlineAttrs = `isOpen :on-close="close" :initialFocusRef="()=>$refs.inputInsideModal"`
  const { getByTestId } = renderComponent({ inlineAttrs })

  await Vue.nextTick()
  const inputInside = getByTestId('inputInsideModal')

  await waitMs()
  expect(inputInside).toHaveFocus()
})

test('returns focus when closed - finalFocusRef', async () => {
  const inlineAttrs = `:isOpen="isOpen" :on-close="close" :finalFocusRef="$refs.inputOutsideModal"`
  const { getByTestId } = renderComponent({ inlineAttrs, data: () => ({ isOpen: true }) })

  await Vue.nextTick()
  const inputOutside = getByTestId('inputOutsideModal')
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
