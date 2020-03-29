import { CFormControl, CInput, CFormLabel } from '../..'
import { render } from '@/tests/test-utils'

// mocks
jest.mock('breadstick/dist/components/Alert/styles.css', () => ({})) // jest tries to import styles and fails...

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
