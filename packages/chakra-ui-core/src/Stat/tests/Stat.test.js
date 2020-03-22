import { Stat, StatLabel, StatNumber, StatHelperText, StatArrow } from '..'
import { render, defaultProviders } from '@/tests/test-utils'
import internalIcons from '../../lib/internal-icons.js'

const { 'triangle-up': increase, 'triangle-down': decrease } = internalIcons

const renderComponent = (props) => {
  const base = {
    components: { Stat, StatLabel, StatNumber, StatHelperText, StatArrow },
    provide: () => ({
      ...defaultProviders(),
      $icons: {
        'triangle-up': increase,
        'triangle-down': decrease
      }
    }),
    template: `
      <Stat>
        <StatLabel>Collected Fees</StatLabel>
        <StatNumber>£0.00</StatNumber>
        <StatHelperText>Feb 12 - Feb 28</StatHelperText>
      </Stat>
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
  const { getByText } = renderComponent()
  expect(getByText('Collected Fees')).toBeInTheDocument()
})

test('"StatArrow" should display corresponding icon for "type" prop', () => {
  const types = ['increase', 'decrease']
  const withTypeFragment = type => {
    const { asFragment } = renderComponent({
      template: `
        <Stat>
          <StatLabel>Sent</StatLabel>
          <StatNumber>345,670</StatNumber>
          <StatHelperText>
            <StatArrow type="${type}" />
            23.36%
          </StatHelperText>
        </Stat>
      `
    })
    return asFragment
  }
  types.forEach(type => expect(withTypeFragment(type)()).toMatchSnapshot())
})
