import { CButton, CAlertDialog, CAlertDialogContent, CAlertDialogBody, CAlertDialogFooter, CAlertDialogOverlay, CAlertDialogHeader } from '../..'
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
    components: { CButton, CAlertDialog, CAlertDialogContent, CAlertDialogBody, CAlertDialogFooter, CAlertDialogOverlay, CAlertDialogHeader },
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
        <CAlertDialog ${inlineAttrs}>
            <CAlertDialogOverlay  />
            <CAlertDialogContent data-testid="overlay">
            <CAlertDialogHeader>Dialog Header</CAlertDialogHeader>
            <CAlertDialogBody>
            Are you sure?
              <Input data-testid="inputInsideDrawer" ref="inputInsideDrawer" placeholder="Type here..." />
            </CAlertDialogBody>
            <CAlertDialogFooter>
                <CButton ref="cancelRef" @click="close" data-testid="close-btn">Cancel</CButton>
                <CButton variantColor="red" @click="close" ml="3">Delete</CButton>
            </CAlertDialogFooter>
            </CAlertDialogContent>
        </CAlertDialog>
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

it('should have proper aria', async () => {
  useId.mockReturnValueOnce('1')
  const inlineAttrs = 'isOpen'
  renderComponent({ inlineAttrs })

  await Vue.nextTick()
  const dialog = document.querySelector('section')
  await waitMs()

  expect(dialog).toHaveAttribute('role', 'alertdialog')
  expect(dialog).toHaveAttribute('aria-modal', 'true')
  expect(dialog).toHaveAttribute('aria-labelledby', 'alert-dialog-1-label')
  expect(dialog).toHaveAttribute('aria-describedby', 'alert-dialog-1-desc')
})
