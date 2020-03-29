import { CAlert, CAlertIcon, CAlertTitle, CAlertDescription } from '..'
import { render, defaultProviders } from '@/tests/test-utils'
import icons from '../../lib/internal-icons'

const renderComponent = (props) => {
  const base = {
    components: { CAlert, CAlertTitle, CAlertDescription, CAlertIcon },
    provide: () => defaultProviders({ $icons: { add: icons.add } }),
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
