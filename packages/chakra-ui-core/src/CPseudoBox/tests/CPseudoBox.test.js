import CPseudoBox from '../'
import { render, getTagName, screen } from '@/tests/test-utils'

const renderComponent = (props) => {
  const inlineAttrs = (props && props.inlineAttrs) || ''
  const base = {
    components: { CPseudoBox },
    template: `<CPseudoBox data-testid="pseudobox" ${inlineAttrs}>Box Works</CPseudoBox>`,
    ...props
  }
  return render(base)
}

it('should render correctly', () => {
  const { asFragment } = renderComponent()
  expect(asFragment()).toMatchSnapshot()
})

it('should change the style', () => {
  const inlineAttrs = `
  d="flex" :w="['auto']" px="5" py="5" shadow="lg"
  my="5" mb="5" rounded="sm" font-family="body"
  background-color="blue.200" color="blue.700"`
  const { asFragment } = renderComponent({ inlineAttrs })
  
  expect(asFragment()).toMatchSnapshot()
})

it.each`
  as
  ${'header'}
  ${'p'}}
`(
  'should display Box with type as $as',
  ({ as }) => {
    const inlineAttrs = `as=${as}`
    const { asFragment } = renderComponent({ inlineAttrs })
    expect(getTagName(screen.getByTestId('pseudobox'))).toEqual(as)
    expect(asFragment()).toMatchSnapshot()
  }
)

// TODO: How to test _hover or focus styles?
