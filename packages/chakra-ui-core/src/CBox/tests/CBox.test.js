import CBox from '../'
import { render, screen } from '@/tests/test-utils'

const renderComponent = (props) => {
  const inlineAttrs = (props && props.inlineAttrs) || ''
  const base = {
    components: { CBox },
    template: `<CBox data-testid="box" ${inlineAttrs}>Box Works</CBox>`,
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
  'should display CBox with type as $as',
  ({ as }) => {
    const inlineAttrs = `as=${as}`
    const { asFragment } = renderComponent({ inlineAttrs })
    const box = screen.getByTestId('box')
    expect(box.tagName.toLowerCase()).toEqual(as)
    expect(asFragment()).toMatchSnapshot()
  }
)
