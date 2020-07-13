import { CStat, CStatLabel, CStatNumber, CStatHelperText, CStatArrow } from '..'
import { render, screen } from '@/tests/test-utils'

const renderComponent = (props) => {
  const base = {
    components: { CStat, CStatLabel, CStatNumber, CStatHelperText, CStatArrow },
    template: `
      <CStat>
        <CStatLabel>Collected Fees</CStatLabel>
        <CStatNumber>£0.00</CStatNumber>
        <CStatHelperText>Feb 12 - Feb 28</CStatHelperText>
      </CStat>
    `,
    ...props
  }
  return render(base)
}

it('should render correctly', () => {
  const { asFragment } = renderComponent()
  expect(asFragment()).toMatchSnapshot()
})

it('should render children in DOM', () => {
  renderComponent()
  expect(screen.getByText('Collected Fees')).toBeInTheDocument()
})

test('"CStatArrow" should display corresponding icon for "type" prop', () => {
  const types = ['increase', 'decrease']
  const withTypeFragment = (type) => {
    const { asFragment } = renderComponent({
      template: `
        <CStat>
          <CStatLabel>Sent</CStatLabel>
          <CStatNumber>345,670</CStatNumber>
          <CStatHelperText>
            <CStatArrow type="${type}" />
            23.36%
          </CStatHelperText>
        </CStat>
      `
    })
    return asFragment
  }
  types.forEach(type => expect(withTypeFragment(type)()).toMatchSnapshot())
})
