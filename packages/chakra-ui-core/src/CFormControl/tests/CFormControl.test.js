import { CFormControl, CInput, CFormLabel } from '../..'
import { render, screen } from '@/tests/test-utils'

const renderComponent = (props) => {
  const inlineAttrs = (props && props.inlineAttrs) || ''
  const base = {
    components: { CFormControl, CFormLabel, CInput },
    template: `
    <CFormControl ${inlineAttrs}>
      <CFormLabel for="fname">First name</CFormLabel>
      <CInput id="fname" placeholder="First name" />
    </CFormControl>`,
    ...props
  }
  return render(base)
}

it('should render correctly', () => {
  const { asFragment } = renderComponent()

  expect(asFragment()).toMatchSnapshot()
})

it('should provide formcontrol state via scoped slot', () => {
  renderComponent({
    template: `
    <CFormControl isRequired isReadOnly #default="props">
      <pre data-testid="pre">
        {{ props }}
      </pre>
    </CFormControl>`
  })

  const pre = screen.getByTestId('pre')
  expect(JSON.parse(pre.textContent, null, 2)).toEqual({
    isInvalid: false,
    isRequired: true,
    isDisabled: false,
    isReadOnly: true
  })
})
