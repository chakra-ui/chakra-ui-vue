import CCode from '..'
import { render, screen } from '@/tests/test-utils'

const renderComponent = (props) => {
  const base = {
    components: { CCode },
    template: '<CCode>content</CCode>',
    ...props
  }
  return render(base)
}

it('should render correctly', () => {
  const { asFragment } = renderComponent()
  expect(asFragment()).toMatchSnapshot()
})

it('should display children', () => {
  renderComponent()

  expect(screen.getByText('content')).toBeInTheDocument()
})
