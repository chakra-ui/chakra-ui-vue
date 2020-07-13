import { CInput, CButton, CModal, CModalOverlay, CModalContent, CModalHeader, CModalFooter, CModalBody, CModalCloseButton } from '../..'
import { render, userEvent, fireEvent, waitMs, screen, wait } from '@/tests/test-utils'
import { useId, wrapEvent } from '@/packages/chakra-ui-core/src/utils'

// mocks
jest.mock('@/packages/chakra-ui-core/src/utils/dom.js') // click
jest.mock('@/packages/chakra-ui-core/src/utils/generators.js')

const renderComponent = (props) => {
  const inlineAttrs = (props && props.inlineAttrs) || ''
  const base = {
    components: { CInput, CButton, CModal, CModalOverlay, CModalContent, CModalHeader, CModalFooter, CModalBody, CModalCloseButton },
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
      <CInput data-testid="inputOutsideModal" ref="inputOutsideModal" placeholder="Type here..." /> 
      <CButton data-testid="buttonOutside" ref="btnRef" @click="isOpen = true">Open Modal</CButton>

      <CModal ${inlineAttrs}>
        <CModalOverlay />
        <CModalContent data-testid="overlay">
          <CModalCloseButton data-testid="close-btn" />
          <CModalHeader>Create your account</CModalHeader>

          <CModalBody>
            <CInput data-testid="inputInsideModal" ref="inputInsideModal" placeholder="Type here..." />
          </CModalBody>

          <CModalFooter>
            <CButton variant="outline" mr="3" @click="isOpen = false">Cancel</CButton>
            <CButton color="blue">Save</CButton>
          </CModalFooter>
        </CModalContent>
      </CModal>
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
    const inputInside = screen.getByTestId('inputInsideModal')
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
    await fireEvent.click(overlay.parentElement)
  })

  expect(onClose).toHaveBeenCalled()
})

test('focuses the initial focus ref when opened - initialFocusRef', async () => {
  const inlineAttrs = 'isOpen :on-close="close" :initialFocusRef="()=>$refs.inputInsideModal"'
  renderComponent({ inlineAttrs })

  await waitMs() // render

  await wait(() => {
    expect(screen.getByTestId('inputInsideModal')).toHaveFocus()
  })
})

test('returns focus when closed - finalFocusRef', async () => {
  const inlineAttrs = ':isOpen="isOpen" :on-close="close" :finalFocusRef="$refs.inputOutsideModal"'
  renderComponent({ inlineAttrs, data: () => ({ isOpen: true }) })

  await waitMs() // render

  const inputOutside = screen.getByTestId('inputOutsideModal')
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
    expect(dialog).toHaveAttribute('aria-labelledby', 'modal-1-header')
    expect(dialog).toHaveAttribute('aria-describedby', 'modal-1-body')
  })
})
