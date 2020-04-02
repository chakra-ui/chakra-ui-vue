import { CAlert, CAlertIcon, CAlertTitle, CAlertDescription, CStack } from '../..'
import { render, defaultProviders } from '@/tests/test-utils'
import icons from '../../lib/internal-icons'

// mocks
jest.mock('breadstick/dist/components/Alert/styles.css', () => ({})) // jest tries to import styles and fails...

const renderComponent = (props) => {
  const base = {
    components: { CAlert, CAlertTitle, CAlertDescription, CAlertIcon, CStack },
    provide: () => defaultProviders({ $chakraIcons: { add: icons.add } }),
    template: `
    <CAlert>
      <CAlertIcon />
      <CAlertTitle>alert title</CAlertTitle>
      <CAlertDescription>alert description</CAlertDescription>
    </CAlert>`,
    ...props
  }
  return render(base)
}
it('should render correctly', () => {
  const { asFragment } = renderComponent()
  expect(asFragment()).toMatchSnapshot()
})

it('should display title', () => {
  const { getByText } = renderComponent()

  expect(getByText('alert title')).toBeInTheDocument()
})

it('should display description', () => {
  const { getByText } = renderComponent()

  expect(getByText('alert description')).toBeInTheDocument()
})

it('should override icon if set explicitly', () => {
  const { asFragment } = renderComponent({
    template: `
    <CAlert status="error">
      <CAlertIcon name="add" />
    </CAlert>`
  })

  expect(asFragment()).toMatchSnapshot()
})

it('should have role=alert', () => {
  const { getByRole } = renderComponent({
    template: `
    <CAlert status="error">
      <CAlertIcon name="add" />
    </CAlert>`
  })

  getByRole('alert')
})

it('should render correct variant styles', () => {
  const { asFragment } = renderComponent({
    template: `
    <CStack>
      <CAlert status="success" variant="subtle">
        <CAlertIcon />
        Data uploaded to the server. Fire on!
      </CAlert>
      <CAlert status="success" variant="solid">
        <CAlertIcon />
        Data uploaded to the server. Fire on!
      </CAlert>
      <CAlert status="success" variant="left-accent">
        <CAlertIcon />
        Data uploaded to the server. Fire on!
      </CAlert>
      <CAlert status="success" variant="top-accent">
        <CAlertIcon />
        Data uploaded to the server. Fire on!
      </CAlert>
    </CStack>
    `
  })

  expect(asFragment()).toMatchSnapshot()
})
