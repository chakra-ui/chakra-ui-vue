import { CInput, CButton, CDrawer, CDrawerBody, CDrawerFooter, CDrawerHeader, CDrawerOverlay, CDrawerContent, CDrawerCloseButton } from '../../'
import { render, defaultProviders, userEvent, fireEvent, waitMs } from '@/tests/test-utils'
import Vue from 'vue'
import { useId, wrapEvent } from '@/packages/chakra-ui-core/src/utils'

// mocks
jest.mock('@/packages/chakra-ui-core/src/utils/dom.js')
jest.mock('@/packages/chakra-ui-core/src/utils/generators.js')
jest.mock('v-scroll-lock', () => ({}))
jest.mock('@/packages/chakra-ui-core/src/CToast/index.js', () => {})

const renderComponent = (props) => {
  const inlineAttrs = (props && props.inlineAttrs) || ''
  const base = {
    components: { CInput, CButton, CDrawer, CDrawerBody, CDrawerFooter, CDrawerHeader, CDrawerOverlay, CDrawerContent, CDrawerCloseButton },
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
      <CInput data-testid="inputOutsideDrawer" ref="inputOutsideDrawer" placeholder="Type here..." /> 
      <CButton data-testid="buttonOutside" ref="btnRef" @click="isOpen = true">Open Drawer</CButton>

      <CDrawer placement="right" ${inlineAttrs}>
        <CDrawerOverlay />
        <CDrawerContent data-testid="overlay">
          <CDrawerCloseButton data-testid="close-btn" />
          <CDrawerHeader>Create your account</CDrawerHeader>
          <CDrawerBody>
            <CInput data-testid="inputInsideDrawer" ref="inputInsideDrawer" placeholder="Type here..." />
          </CDrawerBody>
          <CDrawerFooter>
            <CButton variant="outline" mr="3" @click="isOpen = false">Cancel</CButton>
            <CButton color="blue">Save</CButton>
          </CDrawerFooter>
        </CDrawerContent>
      </CDrawer>
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

it('should have proper aria', async () => {
  useId.mockReturnValueOnce('1')
  const inlineAttrs = 'isOpen'
  renderComponent({ inlineAttrs })

  await Vue.nextTick()
  const dialog = document.querySelector('section')
  await waitMs()

  expect(dialog).toHaveAttribute('role', 'dialog')
  expect(dialog).toHaveAttribute('aria-modal', 'true')
  expect(dialog).toHaveAttribute('aria-labelledby', 'drawer-1-header')
  expect(dialog).toHaveAttribute('aria-describedby', 'drawer-1-body')
})
