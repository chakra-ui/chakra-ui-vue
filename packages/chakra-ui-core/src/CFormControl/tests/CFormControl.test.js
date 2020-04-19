import { CFormControl, CInput, CFormLabel } from '../..'
import { render } from '@/tests/test-utils'

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
