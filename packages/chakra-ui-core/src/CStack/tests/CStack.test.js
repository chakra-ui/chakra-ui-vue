import { CStack, CBox, CHeading, CText } from '../..'
import { render, getTagName } from '@/tests/test-utils'

const renderComponent = (props) => {
  const inlineAttrs = (props && props.inlineAttrs) || ''
  const base = {
    components: { CStack, CBox, CHeading, CText },
    template: `
    <CStack data-testid="stack" ${inlineAttrs}>
      <CBox p="5" data-testid="stack-child-1" shadow="md" border-width="1px">
        <CHeading font-size="xl">Plan Money</CHeading>
        <CText mt="4">The future can be even brighter but a goal without a plan is just a wish</CText>
      </CBox>
      <CBox p="5" data-testid="stack-child-2" shadow="md" border-width="1px">
        <CHeading font-size="xl">Save Money</CHeading>
        <CText mt="4">You deserve good things. With a whooping 10-15% interest rate per annum, grow your savings on your own terms with our completely automated process</CText>
      </CBox>
    </CStack>`,
    ...props
  }
  return render(base)
}

it('should render correctly', () => {
  const { asFragment } = renderComponent()
  expect(asFragment()).toMatchSnapshot()
})

it('should default to vertical stack', () => {
  const { getByTestId } = renderComponent()
  const stack = getByTestId('stack')
  expect(stack).toHaveStyle('display: flex')
  expect(stack).toHaveStyle('flex-direction: column')
})

it('should not space last child', () => {
  const { getByTestId } = renderComponent()
  const stack = getByTestId('stack')
  expect(stack).not.toHaveStyle('margin-bottom: 0.5rem')
})

it('should should stack horizontally if isInline', () => {
  const inlineAttrs = 'is-inline'
  const { getByTestId } = renderComponent({ inlineAttrs })
  const stack = getByTestId('stack')
  expect(stack).toHaveStyle('display: flex')
  expect(stack).toHaveStyle('flex-direction: row')
})

// Cannot use `it.each` because it cannot accept
// component as interpolated variable

it.each`
  as
  ${'section'}
  ${'nav'}}
`(
  'should render CStack with element as $as',
  ({ as }) => {
    const inlineAttrs = `as="${as}"`
    const { asFragment, getByTestId } = renderComponent({ inlineAttrs })
    const stack = getByTestId('stack')
    expect(getTagName(stack)).toEqual(as)
    expect(asFragment()).toMatchSnapshot()
  }
)
