import { CAlert, CAlertIcon, CAlertTitle, CAlertDescription, CStack } from '../..'
import { render, screen } from '@/tests/test-utils'

const renderComponent = (props) => {
  const base = {
    components: { CAlert, CAlertTitle, CAlertDescription, CAlertIcon, CStack },
    template: `
    <CAlert>
      <CAlertIcon name="add" />
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

it('should override icon if set explicitly', () => {
  const { asFragment } = renderComponent({
    template: `
    <CAlert status="error">
      <CAlertIcon name="add" />
    </CAlert>`
  })

  expect(asFragment()).toMatchSnapshot()
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

it('should display title', () => {
  renderComponent()

  expect(screen.getByText('alert title')).toBeInTheDocument()
})

it('should display description', () => {
  renderComponent()

  expect(screen.getByText('alert description')).toBeInTheDocument()
})

it('should have role=alert', () => {
  renderComponent({
    template: `
    <CAlert status="error">
      <CAlertIcon name="add" />
    </CAlert>`
  })

  screen.getByRole('alert')
})
