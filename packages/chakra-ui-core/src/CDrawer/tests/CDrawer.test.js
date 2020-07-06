import { CInput, CButton, CDrawer, CDrawerBody, CDrawerFooter, CDrawerHeader, CDrawerOverlay, CDrawerContent, CDrawerCloseButton } from '../../'
import { render, userEvent, fireEvent, waitMs, wait, screen } from '@/tests/test-utils'
import { useId } from '@/packages/chakra-ui-core/src/utils'

// mocks
jest.mock('@/packages/chakra-ui-core/src/utils/generators.js')

const renderComponent = (props) => {
  const inlineAttrs = (props && props.inlineAttrs) || ''
  const base = {
    components: { CInput, CButton, CDrawer, CDrawerBody, CDrawerFooter, CDrawerHeader, CDrawerOverlay, CDrawerContent, CDrawerCloseButton },
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
  const inlineAttrs = 'isOpen'
  const { asFragment } = renderComponent({ inlineAttrs })

  await waitMs() // render

  expect(asFragment(document.body.innerHTML)).toMatchSnapshot()
})

test('clicking the close button calls the onClose callback', async () => {
  const onClose = jest.fn()
  const inlineAttrs = 'isOpen :on-close="close"'
  renderComponent({ inlineAttrs, methods: { close: onClose } })

  await wait(() => {
    userEvent.click(screen.getByTestId('close-btn'))
  })

  expect(onClose).toHaveBeenCalled()
})

test('pressing "esc" calls the onClose callback', async () => {
  const onClose = jest.fn()
  const inlineAttrs = ':isOpen="isOpen" :on-close="close"'
  renderComponent({ inlineAttrs, data: () => ({ isOpen: true }), methods: { close: onClose } })

  await wait(async () => {
    const inputInside = screen.getByTestId('inputInsideDrawer')
    await fireEvent.keyDown(inputInside, { key: 'Escape' })
  })

  expect(onClose).toHaveBeenCalled()
})

test('clicking overlay calls the onClose callback', async () => {
  const onClose = jest.fn()
  const inlineAttrs = ':isOpen="isOpen" :on-close="close"'
  renderComponent({ inlineAttrs, data: () => ({ isOpen: true }), methods: { close: onClose } })

  await wait(async () => {
    const overlay = screen.getByTestId('overlay')
    await fireEvent.click(overlay)
  })

  expect(onClose).toHaveBeenCalled()
})

test('focuses the initial focus ref when opened - initialFocusRef', async () => {
  const inlineAttrs = 'isOpen :on-close="close" :initialFocusRef="()=>$refs.inputInsideDrawer"'
  renderComponent({ inlineAttrs })

  await waitMs() // render

  await wait(() => {
    expect(screen.getByTestId('inputInsideDrawer')).toHaveFocus()
  })
})

test('returns focus when closed - finalFocusRef', async () => {
  const inlineAttrs = ':isOpen="isOpen" :on-close="close" :finalFocusRef="$refs.inputOutsideDrawer"'
  renderComponent({ inlineAttrs, data: () => ({ isOpen: true }) })

  await waitMs() // render

  const inputOutside = screen.getByTestId('inputOutsideDrawer')
  const closeButton = screen.getByTestId('close-btn')

  await fireEvent.click(closeButton)

  await wait(() => {
    expect(inputOutside).toHaveFocus()
  })
})

it('should have proper aria', async () => {
  useId.mockReturnValueOnce('1')
  const inlineAttrs = 'isOpen'
  renderComponent({ inlineAttrs })

  await wait(() => {
    const dialog = screen.getByRole('dialog')

    expect(dialog).toHaveAttribute('role', 'dialog')
    expect(dialog).toHaveAttribute('aria-modal', 'true')
    expect(dialog).toHaveAttribute('aria-labelledby', 'drawer-1-header')
    expect(dialog).toHaveAttribute('aria-describedby', 'drawer-1-body')
  })
})
